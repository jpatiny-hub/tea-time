import { useState } from 'react'
import { updateProgress, useProgress } from '../lib/store'
import { disableNotifications, downloadCalendarReminder, enableNotifications, isInstalled, reminderSupport, testNotification } from '../lib/reminder'
import { btnPrimary, btnSecondary } from './ui'

const HOURS = [7, 8, 9, 12, 17, 18, 19, 20, 21]

/** Réglages du rappel quotidien (Progrès → Réglages, et encart de l'accueil). */
export function ReminderSettings({ compact = false }: { compact?: boolean }) {
  const data = useProgress()
  const { reminderEnabled, reminderHour } = data.settings
  const [status, setStatus] = useState<string | null>(null)
  const support = reminderSupport()

  function set(patch: Partial<typeof data.settings>) {
    updateProgress((d) => ({ ...d, settings: { ...d.settings, ...patch } }))
  }

  async function toggle() {
    if (reminderEnabled) {
      await disableNotifications()
      set({ reminderEnabled: false })
      setStatus('Rappel désactivé.')
      return
    }
    const res = await enableNotifications()
    set({ reminderEnabled: res.ok })
    setStatus(res.message)
  }

  return (
    <div className={compact ? '' : 'border-y border-gray-100 py-4 dark:border-gray-800'}>
      {!compact && <p className="text-sm font-semibold">🔔 Rappel quotidien</p>}
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Heure souhaitée :
      </p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {HOURS.map((h) => (
          <button key={h} onClick={() => set({ reminderHour: h })} className={`rounded-xl px-2.5 py-1.5 text-xs font-bold ${reminderHour === h ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
            {h} h
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2">
        <button onClick={() => downloadCalendarReminder(reminderHour)} className={btnPrimary}>📅 Ajouter un rappel à mon agenda</button>
        <p className="-mt-1 text-[0.6875rem] text-gray-500 dark:text-gray-400">
          Le plus fiable : ouvre le fichier téléchargé, puis « Ajouter » dans l'agenda. Une alarme sonnera chaque jour à {reminderHour} h avec le lien de l'appli.
        </p>
        {support !== 'none' && (
          <>
            <button onClick={toggle} className={btnSecondary}>
              {reminderEnabled ? '🔕 Désactiver les notifications' : '🔔 Activer les notifications de l\'appli'}
            </button>
            <p className="-mt-1 text-[0.6875rem] text-gray-500 dark:text-gray-400">
              {isInstalled() ? '' : 'Fonctionne seulement avec l\'appli installée (Android, Chrome). '}
              Chrome choisit le moment exact (une fois par jour au plus, après {reminderHour} h), et ne t'embête pas si tu as déjà fait un exercice ce jour-là.
            </p>
            {reminderEnabled && (
              <button onClick={async () => setStatus((await testNotification()) ? 'Notification d\'essai envoyée.' : 'Impossible d\'envoyer la notification : vérifie l\'autorisation.')} className="text-xs font-semibold text-indigo-600 underline dark:text-indigo-300">
                Envoyer une notification d'essai
              </button>
            )}
          </>
        )}
        {status && <p className="rounded-xl bg-indigo-50 p-2 text-xs text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-100">{status}</p>}
      </div>
    </div>
  )
}
