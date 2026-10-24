// Filets de sécurité pour la progression (tout reste sur l'appareil, aucun serveur) :
// 1) un instantané automatique par jour dans IndexedDB (les 7 derniers), qui permet de retrouver sa progression
//    si le stockage principal a été vidé alors que celui-ci a survécu ;
// 2) l'envoi de la sauvegarde en un geste (partage : WhatsApp, e-mail, Drive…) ou son téléchargement.
import { exportBackup, getProgress, importBackup, STORAGE_KEY } from './store'
import { todayKey } from './text'

const DB = 'tea-time-backup'
const STORE = 'snapshots'
const KEEP = 7

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx<T>(db: IDBDatabase, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

const hasProgress = () => {
  const d = getProgress()
  return d.xp > 0 || Object.keys(d.attempts).length > 0
}

/** Instantané du jour (au plus un par jour), les plus anciens sont supprimés. */
export async function saveSnapshot() {
  try {
    if (!hasProgress() || typeof indexedDB === 'undefined') return
    const db = await open()
    const key = `${STORAGE_KEY}|${todayKey()}`
    if ((await tx(db, 'readonly', (s) => s.count(key))) > 0) return
    await tx(db, 'readwrite', (s) => s.put(JSON.stringify(getProgress()), key))
    const keys = ((await tx(db, 'readonly', (s) => s.getAllKeys())) as string[]).filter((k) => k.startsWith(`${STORAGE_KEY}|`)).sort()
    for (const k of keys.slice(0, Math.max(0, keys.length - KEEP))) await tx(db, 'readwrite', (s) => s.delete(k))
  } catch {
    // IndexedDB indisponible (navigation privée…) : sans importance
  }
}

export interface Snapshot {
  date: string
  json: string
}

/** Dernier instantané de cet accès, s'il y en a un. */
export async function latestSnapshot(): Promise<Snapshot | null> {
  try {
    if (typeof indexedDB === 'undefined') return null
    const db = await open()
    const keys = ((await tx(db, 'readonly', (s) => s.getAllKeys())) as string[]).filter((k) => k.startsWith(`${STORAGE_KEY}|`)).sort()
    const last = keys[keys.length - 1]
    if (!last) return null
    const json = (await tx(db, 'readonly', (s) => s.get(last))) as string
    return { date: last.split('|')[1], json }
  } catch {
    return null
  }
}

/** Remet en place un instantané (il contient directement les données, pas le format du fichier de sauvegarde). */
export function restoreSnapshot(snap: Snapshot): boolean {
  try {
    const data = JSON.parse(snap.json)
    return importBackup(JSON.stringify({ app: 'english-application', schema: data.schema, exportedAt: snap.date, data })).ok
  } catch {
    return false
  }
}

export const hasAnyProgress = hasProgress

/** Envoie le fichier de sauvegarde par le menu de partage du téléphone ; à défaut, le télécharge. */
export async function shareBackup(): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const json = exportBackup()
  const name = `tea-time-progress-${todayKey()}.json`
  const file = new File([json], name, { type: 'application/json' })
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Ma sauvegarde Tea Time', text: 'Ma progression (à garder précieusement).' })
      return 'shared'
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled'
  }
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
