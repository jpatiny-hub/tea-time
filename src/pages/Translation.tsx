import { useState } from 'react'
import { translationExercises } from '../data/content'
import { EDITION } from '../edition'
import { getProgress, useProgress } from '../lib/store'
import { masteredCount } from '../lib/progress'
import { pickExercises } from '../lib/select'
import type { Exercise } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, btnSecondary, card, Page, ProgressBar } from '../components/ui'

/** Petites phrases à traduire (français ↔ anglais). */
export function Translation() {
  const data = useProgress()
  const [run, setRun] = useState<Exercise[] | null>(null)
  if (run) return <ExerciseRunner items={run} title="Traduction" onExit={() => setRun(null)} />

  const ids = translationExercises.map((e) => e.id)
  const toEn = translationExercises.filter((e) => e.kind === 'transform' && e.instruction.includes(EDITION.langName))
  const toFr = translationExercises.filter((e) => e.kind === 'transform' && e.instruction.includes('français'))
  const mastered = masteredCount(data, ids)

  return (
    <Page title="🔤 Petites phrases à traduire" subtitle="Des phrases du quotidien à traduire. Les majuscules, la ponctuation, les contractions (I'm / I am) et une petite faute de frappe sont acceptées." back={{ to: '/pratique', label: 'Pratique' }}>
      <div className={card}>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">{translationExercises.length} phrases</span>
          <span className="text-xs text-gray-500">{mastered} acquises</span>
        </div>
        <div className="mt-2"><ProgressBar value={mastered} max={ids.length} tone="green" /></div>
        <button onClick={() => setRun(pickExercises(translationExercises, getProgress(), 10))} className={`${btnPrimary} mt-3`}>Série de 10</button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={() => setRun(pickExercises(toEn, getProgress(), 10))} className={btnSecondary}>🇫🇷 → {EDITION.lang === 'nl' ? '🇳🇱' : '🇬🇧'}</button>
          <button onClick={() => setRun(pickExercises(toFr, getProgress(), 10))} className={btnSecondary}>{EDITION.lang === 'nl' ? '🇳🇱' : '🇬🇧'} → 🇫🇷</button>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Si ta traduction est correcte mais différente de la réponse proposée, tu peux la valider toi-même.</p>
      </div>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">D'autres phrases à traduire se trouvent dans chaque module (onglet Cours).</p>
    </Page>
  )
}
