// Rappel quotidien, 100 % local (aucun serveur) :
// 1. Fichier agenda (.ics) : un événement quotidien avec alarme — fiable sur tous les téléphones.
// 2. Notification de l'appli installée (Chrome Android, « periodic background sync ») : c'est Chrome qui
//    choisit le moment (≈ une fois par jour), et rien n'est envoyé si un exercice a déjà été fait ce jour-là.
//    Le service worker lit l'état dans IndexedDB (public/reminder-sw.js).
import { EDITION } from '../edition'
import { todayKey } from './text'

const DB = 'english-app-reminder'

export interface ReminderEditionState {
  enabled: boolean
  hour: number
  lastActive: string | null
  lastNotified?: string | null
  url: string
  messages: { title: string; body: string }[]
}

const MESSAGES: Record<string, { title: string; body: string }[]> = {
  jojo: [
    { title: '🫖 Tea time… and English time!', body: 'Ta révision du jour t\'attend. Quelques minutes suffisent.' },
    { title: '📚 Keep the streak going!', body: 'Une petite session pour garder ta série de jours ?' },
    { title: '⏳ Past simple or present perfect?', body: 'Viens t\'entraîner 5 minutes au Labo des temps.' },
  ],
  maman: [
    { title: '🌼 Hello! Time for a little English', body: 'Quelques minutes d\'anglais aujourd\'hui ? Ta révision t\'attend.' },
    { title: '☕ A cup of tea and some English?', body: 'Un petit exercice avec ta tasse de thé, ça te dit ?' },
    { title: '📖 Your English moment', body: 'Un peu chaque jour, c\'est comme ça qu\'on apprend. Viens réviser !' },
  ],
  nunu: [
    { title: '🌷 Tijd voor Nederlands!', body: 'Quelques minutes de néerlandais aujourd\'hui ? Ta révision t\'attend.' },
    { title: '🧇 Een klein oefeningetje?', body: 'Un petit exercice avec un café, ça te dit ? Stap voor stap !' },
    { title: '🚲 Goedendag!', body: 'Un peu chaque jour, et bientôt tu parleras avec les enfants. Viens réviser !' },
  ],
  jujularage: [
    { title: '🍺 Cheers! Time for English', body: '5 minutes d\'anglais aujourd\'hui ? Ta révision t\'attend.' },
    { title: '⚽ Kick-off!', body: 'Petit match d\'anglais du jour : quelques exercices et de l\'XP à gagner.' },
    { title: '🧬 Daily dose of English', body: 'Comme une culture : un peu chaque jour, et ça pousse ! Viens réviser.' },
    { title: '🐶 Woof! Max wants to practise', body: 'Quelques mots et une phrase à traduire, ça te dit ?' },
  ],
}

function appUrl(): string {
  return `${location.origin}${import.meta.env.BASE_URL}?acces=${EDITION.id}`
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore('kv')
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function readAll(): Promise<Record<string, ReminderEditionState>> {
  try {
    const db = await openDb()
    return await new Promise((resolve) => {
      const r = db.transaction('kv', 'readonly').objectStore('kv').get('editions')
      r.onsuccess = () => resolve((r.result as Record<string, ReminderEditionState>) ?? {})
      r.onerror = () => resolve({})
    })
  } catch {
    return {}
  }
}

async function writeAll(all: Record<string, ReminderEditionState>) {
  try {
    const db = await openDb()
    await new Promise<void>((resolve) => {
      const tx = db.transaction('kv', 'readwrite')
      tx.objectStore('kv').put(all, 'editions')
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    // IndexedDB indisponible (navigation privée…) : pas de notification, l'agenda reste possible
  }
}

/** Met à jour l'état de l'accès en cours pour le service worker. */
export async function syncReminderState(enabled: boolean, hour: number, activeToday: boolean) {
  if (typeof indexedDB === 'undefined') return
  const all = await readAll()
  const prev = all[EDITION.id]
  all[EDITION.id] = {
    enabled,
    hour,
    lastActive: activeToday ? todayKey() : (prev?.lastActive ?? null),
    lastNotified: prev?.lastNotified ?? null,
    url: appUrl(),
    messages: MESSAGES[EDITION.id] ?? MESSAGES.jojo,
  }
  await writeAll(all)
}

export type ReminderSupport = 'full' | 'notifications-only' | 'none'

/** Ce que l'appareil sait faire. */
export function reminderSupport(): ReminderSupport {
  if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator)) return 'none'
  return 'periodicSync' in ServiceWorkerRegistration.prototype ? 'full' : 'notifications-only'
}

export function isInstalled(): boolean {
  try {
    return window.matchMedia('(display-mode: standalone)').matches
  } catch {
    return false
  }
}

interface PeriodicSyncManager {
  register(tag: string, options: { minInterval: number }): Promise<void>
  unregister(tag: string): Promise<void>
}

/** Active les notifications. Renvoie un message d'état à afficher. */
export async function enableNotifications(): Promise<{ ok: boolean; message: string }> {
  if (reminderSupport() === 'none') return { ok: false, message: 'Ce navigateur ne gère pas les notifications. Utilise le rappel dans l\'agenda.' }
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return { ok: false, message: 'Notifications refusées. Tu peux les autoriser dans les réglages du navigateur (cadenas à côté de l\'adresse), ou utiliser le rappel dans l\'agenda.' }
  const reg = await navigator.serviceWorker.ready
  const periodicSync = (reg as ServiceWorkerRegistration & { periodicSync?: PeriodicSyncManager }).periodicSync
  if (!periodicSync) return { ok: true, message: 'Notifications autorisées, mais ce navigateur ne peut pas réveiller l\'appli tout seul : ajoute aussi le rappel dans l\'agenda.' }
  try {
    await periodicSync.register('daily-reminder', { minInterval: 12 * 60 * 60 * 1000 })
    return {
      ok: true,
      message: isInstalled()
        ? 'Rappel activé ✓ Chrome enverra la notification une fois par jour, après l\'heure choisie, si tu n\'as pas encore fait d\'exercice.'
        : 'Presque ! Installe l\'appli (menu Chrome → Installer) pour que les rappels fonctionnent, ou ajoute le rappel dans l\'agenda.',
    }
  } catch {
    return { ok: true, message: 'Notifications autorisées, mais Chrome n\'accepte les rappels automatiques que pour une appli installée et utilisée régulièrement. En attendant, ajoute le rappel dans l\'agenda.' }
  }
}

export async function disableNotifications() {
  try {
    const reg = await navigator.serviceWorker.ready
    const periodicSync = (reg as ServiceWorkerRegistration & { periodicSync?: PeriodicSyncManager }).periodicSync
    await periodicSync?.unregister('daily-reminder')
  } catch {
    // rien à faire
  }
}

/** Notification d'essai, immédiate. */
export async function testNotification(): Promise<boolean> {
  if (reminderSupport() === 'none' || Notification.permission !== 'granted') return false
  const reg = await navigator.serviceWorker.ready
  const list = MESSAGES[EDITION.id] ?? MESSAGES.jojo
  const msg = list[Math.floor(Math.random() * list.length)]
  await reg.showNotification(msg.title, { body: msg.body, icon: `${import.meta.env.BASE_URL}icons/icon-192-tea.png`, tag: 'daily-reminder-test', data: { url: appUrl() } })
  return true
}

/** Fichier agenda : un événement chaque jour à l'heure choisie, avec une alarme et le lien de l'appli. */
export function downloadCalendarReminder(hour: number) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const d = new Date()
  const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')
  const url = appUrl()
  const title = EDITION.reminderTitle
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//English Tea Time//Rappel//FR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:english-reminder-${EDITION.id}@tea-time`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${date}T${pad(hour)}0000`,
    `DTEND:${date}T${pad(hour)}1500`,
    'RRULE:FREQ=DAILY',
    `SUMMARY:${title}`,
    `DESCRIPTION:10 minutes d'anglais : ${url}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${title}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'rappel-anglais.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}
