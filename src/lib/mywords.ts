// « Mes mots à retravailler » : les mots que l'utilisateur ajoute en les touchant dans un exercice.
// Ils deviennent des cartes de vocabulaire (ids `mw-…`) qui entrent dans la répétition espacée comme les autres.
import { setExerciseResolver, vocabCard } from '../data/content'
import { slug } from './text'
import { getProgress, updateProgress, type MyWord, type ProgressData } from './store'
import type { VocabItem } from '../types'

export const myWordId = (key: string) => `mw-${slug(key) || key}`

export function addMyWord(key: string, fr: string, example?: string) {
  const k = key.toLowerCase()
  updateProgress((d) => ({ ...d, myWords: { ...d.myWords, [k]: { en: k, fr: fr.trim(), added: new Date().toISOString(), example } } }))
}

export function removeMyWord(key: string) {
  updateProgress((d) => {
    const next = { ...d.myWords }
    delete next[key.toLowerCase()]
    return { ...d, myWords: next }
  })
}

export function myWordItems(data: Pick<ProgressData, 'myWords'>): VocabItem[] {
  return Object.values(data.myWords)
    .sort((a, b) => b.added.localeCompare(a.added))
    .map((w: MyWord) => ({ id: myWordId(w.en), en: w.en, fr: w.fr, level: 'A1' as const, example: w.example }))
}

setExerciseResolver((id) => {
  if (!id.startsWith('mw-')) return undefined
  const item = myWordItems(getProgress()).find((w) => w.id === id)
  return item ? { exercise: vocabCard(item, 'en-fr'), source: { label: 'Mes mots à retravailler', link: '/vocabulaire/mes-mots' } } : undefined
})
