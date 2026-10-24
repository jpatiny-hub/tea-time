import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addXp } from '../lib/progress'
import { dailyKey, buildDailySession, isDailyDone } from '../lib/daily'
import { catchUpExercises } from '../lib/daily'
import { updateProgress, useProgress } from '../lib/store'
import { TAG_LABELS } from '../data/content'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, card, hero, Page } from '../components/ui'

const DAILY_XP = 15

export function DailySession() {
  const data = useProgress()
  const navigate = useNavigate()
  const [plan] = useState(() => buildDailySession(data))
  const [run, setRun] = useState(false)
  const done = isDailyDone(data)

  if (run) {
    return (
      <ExerciseRunner
        items={plan.items}
        title="Ma session du jour"
        resumeKey={dailyKey()}
        onExit={() => navigate('/')}
        onFinish={() => {
          if (isDailyDone(data)) return
          updateProgress((d) => ({ ...d, steps: { ...d.steps, [dailyKey()]: true } }))
          addXp(DAILY_XP)
        }}
        catchUp={(misses) => catchUpExercises(misses, new Set(plan.items.map((e) => e.id)))}
      />
    )
  }

  const p = plan.parts
  return (
    <Page title="Ma session du jour" subtitle="Environ 10 minutes : on révise, on corrige son point faible, on découvre un peu de nouveau, on écoute." back={{ to: '/', label: 'Accueil' }}>
      <div className={`${hero} text-center`}>
        <p className="text-4xl">{done ? '✅' : '🌟'}</p>
        <p className="mt-1 text-xl font-extrabold">{done ? 'Session du jour terminée !' : `${plan.items.length} exercices pour aujourd’hui`}</p>
        <p className="mt-1 text-sm text-white/85">{done ? 'Tu peux en refaire une pour t’entraîner encore.' : `+${DAILY_XP} XP de bonus à la fin`}</p>
      </div>
      <ul className={`${card} mt-4 space-y-2 text-sm`}>
        {p.review > 0 && <li>🔁 <b>{p.review}</b> à réviser (juste avant de les oublier)</li>}
        {p.weak > 0 && <li>🎯 <b>{p.weak}</b> sur ton point faible{p.tag ? ` : ${TAG_LABELS[p.tag] ?? p.tag}` : ''}</li>}
        {p.fresh > 0 && <li>✨ <b>{p.fresh}</b> nouveaux, là où tu en es dans le parcours</li>}
        {p.listen > 0 && <li>🎧 <b>{p.listen}</b> d’écoute</li>}
        <li className="text-xs text-gray-500 dark:text-gray-400">Tu peux quitter à tout moment : la série sera reprise là où tu t’es arrêté.</li>
      </ul>
      <button onClick={() => setRun(true)} className={`${btnPrimary} mt-4`}>{done ? 'Refaire une session' : 'Commencer'}</button>
    </Page>
  )
}
