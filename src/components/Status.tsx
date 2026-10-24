import { useEffect, useState } from 'react'
import { hasAnyProgress, latestSnapshot, restoreSnapshot, type Snapshot } from '../lib/backup'
import { formatDateFr } from '../lib/text'
import { btnPrimary, card } from './ui'

function useOnline(): boolean {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  return online
}

/** Bandeau rassurant quand il n'y a pas de connexion : l'appli et la progression restent disponibles. */
export function OfflineBanner() {
  if (useOnline()) return null
  return (
    <div className="mt-3 rounded-2xl bg-sky-50 p-3 text-sm text-sky-900 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-100 dark:ring-sky-500/30" role="status">
      📴 <b>Pas de connexion</b> : tout fonctionne quand même, et ta progression est enregistrée sur ton téléphone.
    </div>
  )
}

/** État du mode hors ligne (page Progrès). */
export function OfflineStatus() {
  const online = useOnline()
  const [ready, setReady] = useState<boolean | null>(null)
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      setReady(false)
      return
    }
    setReady(!!navigator.serviceWorker.controller)
    void navigator.serviceWorker.ready.then(() => setReady(true)).catch(() => setReady(false))
  }, [])
  return (
    <div className="text-xs text-gray-500 dark:text-gray-400">
      {online ? '🟢 En ligne' : '📴 Hors ligne'} · Mode hors ligne : {ready === null ? '…' : ready ? 'prêt ✓ (l’appli s’ouvre sans connexion)' : 'pas encore prêt (ouvre l’appli une fois avec du réseau)'}
    </div>
  )
}

/**
 * Si la progression a disparu (stockage du navigateur vidé) alors qu'un instantané automatique existe
 * encore sur l'appareil, on propose de la retrouver.
 */
export function RecoveryBanner() {
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const [msg, setMsg] = useState('')
  useEffect(() => {
    if (hasAnyProgress()) return
    void latestSnapshot().then((s) => s && setSnap(s))
  }, [])
  if (!snap) return msg ? <p className="mt-3 text-sm font-semibold">{msg}</p> : null
  return (
    <div className={`${card} mt-3`}>
      <p className="font-bold">💾 Ta progression a été retrouvée</p>
      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">Une sauvegarde automatique du {formatDateFr(snap.date)} existe encore sur cet appareil. Veux-tu la restaurer ?</p>
      <button
        onClick={() => {
          setMsg(restoreSnapshot(snap) ? '✓ Progression restaurée.' : '✗ Impossible de restaurer.')
          setSnap(null)
        }}
        className={`${btnPrimary} mt-3`}
      >
        Restaurer ma progression
      </button>
    </div>
  )
}
