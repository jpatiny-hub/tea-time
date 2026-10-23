import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vocabCard } from '../data/content'
import { useProgress } from '../lib/store'
import { masteredCount } from '../lib/progress'
import { myWordItems, removeMyWord } from '../lib/mywords'
import { shuffle } from '../lib/text'
import type { CardExercise } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, card, Page, ProgressBar, SpeakButton } from '../components/ui'

/** « Mes mots à retravailler » : les mots ajoutés en touchant un mot dans un exercice. */
export function MyWords() {
  const data = useProgress()
  const [run, setRun] = useState<CardExercise[] | null>(null)
  const items = myWordItems(data)
  const ids = items.map((i) => i.id)

  if (run) return <ExerciseRunner items={run} title="Mes mots à retravailler" onExit={() => setRun(null)} />

  return (
    <Page title="⭐ Mes mots à retravailler" subtitle={items.length > 0 ? `${items.length} mot${items.length > 1 ? 's' : ''} · ${masteredCount(data, ids)} acquis` : undefined} back={{ to: '/vocabulaire', label: 'Vocabulaire' }}>
      {items.length === 0 ? (
        <div className={`${card} text-sm text-gray-600 dark:text-gray-300`}>
          <p className="font-bold">Ta liste est vide pour l’instant.</p>
          <p className="mt-1">Pendant un exercice, un dialogue ou une lecture, touche un mot que tu ne connais pas : sa traduction s’affiche et tu peux l’ajouter ici. Tu pourras ensuite le travailler avec des cartes, et il reviendra dans la révision.</p>
          <p className="mt-2 text-xs text-gray-400">Si le réglage est désactivé : Progrès → Réglages → Aide vocabulaire.</p>
        </div>
      ) : (
        <>
          <button onClick={() => setRun(shuffle(items).map((it) => vocabCard(it, Math.random() < 0.5 ? 'en-fr' : 'fr-en')))} className={btnPrimary}>🃏 S’entraîner ({items.length})</button>
          <ProgressBar value={masteredCount(data, ids)} max={ids.length} tone="green" />
          <ul className="mt-4 space-y-2">
            {items.map((w) => (
              <li key={w.id} className={`${card} flex items-start justify-between gap-2`}>
                <div className="min-w-0">
                  <p className="font-extrabold">{w.en} <span className="font-semibold text-emerald-700 dark:text-emerald-300">— {w.fr}</span></p>
                  {w.example && <p className="mt-0.5 text-xs italic text-gray-500 dark:text-gray-400">« {w.example} »</p>}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <SpeakButton text={w.en} small />
                  <button onClick={() => removeMyWord(w.en)} aria-label={`Retirer ${w.en}`} className="rounded-full bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">✕</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-6 text-center text-xs text-gray-400"><Link to="/vocabulaire" className="underline">Retour au vocabulaire</Link></p>
    </Page>
  )
}
