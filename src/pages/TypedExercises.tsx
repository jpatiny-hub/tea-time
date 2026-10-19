import { useState } from 'react'
import { drillExercises } from '../data/content'
import { modules } from '../data/modules'
import { getProgress, useProgress } from '../lib/store'
import { masteredCount } from '../lib/progress'
import { pickExercises } from '../lib/select'
import { shuffle } from '../lib/text'
import type { Exercise } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, btnSecondary, card, cardLink, IconTile, Page, ProgressBar, Section } from '../components/ui'

const TYPES: { id: string; icon: string; title: string; desc: string; match: (e: Exercise) => boolean }[] = [
  { id: 'cloze', icon: '📝', title: 'Textes à trous', desc: 'Un petit texte à compléter : plusieurs trous à remplir.', match: (e) => e.kind === 'cloze' },
  { id: 'fix', icon: '🩹', title: 'Phrases à corriger', desc: 'Une phrase avec une erreur : réécris-la correctement.', match: (e) => e.kind === 'fix' },
  { id: 'gap', icon: '✏️', title: 'Phrases à compléter', desc: 'Il manque un mot : le bon temps, la bonne préposition…', match: (e) => e.kind === 'gap' },
  { id: 'transform', icon: '🔤', title: 'Traductions', desc: 'Des phrases du quotidien à traduire.', match: (e) => e.kind === 'transform' },
  { id: 'mcq', icon: '✅', title: 'Questions à choix', desc: 'Choisis la bonne réponse parmi plusieurs.', match: (e) => e.kind === 'mcq' },
]

/** Exercices regroupés par type, ou par thème : pour travailler le même geste ou le même sujet à la suite. */
export function TypedExercises() {
  const data = useProgress()
  const [run, setRun] = useState<Exercise[] | null>(null)
  if (run) return <ExerciseRunner items={run} title="Exercices" onExit={() => setRun(null)} />

  const all = drillExercises.map((r) => r.exercise)
  const themed = modules.filter((m) => m.exercises.length > 0)

  return (
    <Page title="🧩 Exercices" subtitle="Choisis un type d'exercice, ou un thème qui mélange vocabulaire, grammaire et petits rappels." back={{ to: '/pratique', label: 'Pratique' }}>
      <div className={card}>
        <p className="font-semibold">Mélange du jour</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">12 exercices de tous les types, en commençant par ceux à revoir.</p>
        <button onClick={() => setRun(pickExercises(all.filter((e) => e.kind !== 'card'), getProgress(), 12))} className={`${btnPrimary} mt-3`}>Commencer</button>
      </div>

      <Section title="Par type d'exercice">
        {TYPES.map((t) => {
          const pool = all.filter(t.match)
          if (pool.length === 0) return null
          const ids = pool.map((e) => e.id)
          return (
            <div key={t.id} className={card}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold">{t.icon} {t.title}</p>
                <span className="text-xs text-gray-500">{masteredCount(data, ids)}/{ids.length} acquis</span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
              <div className="mt-2"><ProgressBar value={masteredCount(data, ids)} max={ids.length} tone="green" /></div>
              <button onClick={() => setRun(pickExercises(pool, getProgress(), 10))} className={`${btnSecondary} mt-3`}>S'entraîner (10)</button>
            </div>
          )
        })}
      </Section>

      {themed.length > 0 && (
        <Section title="Par thème (tout mélangé)">
          {themed.map((m) => {
            const ids = m.exercises.map((e) => e.id)
            return (
              <button key={m.id} onClick={() => setRun(shuffle(m.exercises))} className={`${cardLink} flex w-full items-center gap-3 text-left`}>
                <IconTile icon={m.icon} />
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">{m.title}</span>
                  <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{m.exercises.length} exercices · {masteredCount(data, ids)} acquis</span>
                </span>
                <span className="text-sm font-bold text-indigo-600">▶</span>
              </button>
            )
          })}
        </Section>
      )}
    </Page>
  )
}
