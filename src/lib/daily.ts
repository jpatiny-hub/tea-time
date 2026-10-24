// « Ma session du jour » : une série d'environ 12 exercices qui mélange
// 1) ce qui est à réviser (répétition espacée), 2) le point faible du moment, 3) un peu de nouveau
// (là où on en est dans le parcours), 4) de l'écoute. Elle se refait chaque jour.
import type { Exercise, VocabItem } from '../types'
import { allVocab } from '../data/vocabulary.ts'
import { drillExercises, exercisesWithTag, getExercise, vocabCard } from '../data/content.ts'
import { isDue } from './srs'
import { weakTags } from './progress'
import { pickExercises } from './select'
import { listenMcq, nextStep, pathUnits, sortByDifficulty, unitWords } from './path.ts'
import { shuffle, todayKey } from './text.ts'
import type { ProgressData } from './store'

export const DAILY_SIZE = 12

export const dailyKey = (d = new Date()) => `daily:${todayKey(d)}`
export const isDailyDone = (data: ProgressData) => !!data.steps[dailyKey()]

export interface DailyPlan {
  items: Exercise[]
  /** Ce qui compose la session, pour l'afficher avant de commencer. */
  parts: { review: number; weak: number; fresh: number; listen: number; tag?: string }
}

export function buildDailySession(data: ProgressData): DailyPlan {
  const taken = new Set<string>()
  const out: Exercise[] = []
  const add = (list: Exercise[], max: number): number => {
    let n = 0
    for (const ex of list) {
      if (n >= max || out.length >= DAILY_SIZE) break
      if (taken.has(ex.id)) continue
      taken.add(ex.id)
      out.push(ex)
      n++
    }
    return n
  }

  // 1) À réviser : les plus en retard d'abord.
  const now = Date.now()
  const due = Object.entries(data.srs)
    .filter(([id, s]) => !id.startsWith('lesson:') && isDue(s, now))
    .sort((a, b) => a[1].due.localeCompare(b[1].due))
    .map(([id]) => getExercise(id)?.exercise)
    .filter((e): e is Exercise => !!e)
  const review = add(due, 5)

  // 2) Le point faible du moment (les deux étiquettes les moins bien réussies).
  let weak = 0
  let weakTag: string | undefined
  for (const t of weakTags(data, 3).filter((x) => x.rate < 0.8).slice(0, 2)) {
    weakTag ??= t.tag
    weak += add(pickExercises(exercisesWithTag(t.tag).map((r) => r.exercise), data, 3), 2)
  }

  // 3) Du nouveau : les exercices pas encore faits de la leçon en cours.
  const next = nextStep(data)
  const unit = next?.unit ?? pathUnits[0]
  const fresh = add(sortByDifficulty(unit.module.exercises).filter((e) => !data.attempts[e.id]), 3)

  // 4) De l'écoute, sur des mots déjà rencontrés.
  const seenWords: VocabItem[] = allVocab.filter((v) => data.srs[v.id])
  const pool = seenWords.length >= 4 ? seenWords : unitWords(unit)
  const listen = add(shuffle(pool).slice(0, 2).map((w) => listenMcq(w, pool, 'ld')), 2)

  // Compléter jusqu'à la taille voulue avec des exercices de la leçon en cours, puis du fond commun.
  if (out.length < DAILY_SIZE) add(pickExercises(unit.module.exercises, data, DAILY_SIZE), DAILY_SIZE)
  if (out.length < 8) add(shuffle(drillExercises.map((r) => r.exercise)), 8 - out.length)
  // Une carte de vocabulaire (français → langue apprise) pour finir sur de l'écriture.
  const w = shuffle(seenWords)[0]
  if (w && out.length < DAILY_SIZE + 1) add([vocabCard(w, 'fr-en')], 1)

  return { items: out, parts: { review, weak, fresh, listen, tag: weakTag } }
}

/**
 * Rattrapage ciblé après une série : de nouveaux exercices sur les notions ratées, présentés autrement.
 * - exercice de grammaire / phrase : d'autres exercices de la même notion (étiquette) ;
 * - mot de vocabulaire : le même mot sous une autre forme (écoute, phrase à compléter, carte à écrire).
 */
export function catchUpExercises(misses: Exercise[], exclude: Set<string>): Exercise[] {
  const out: Exercise[] = []
  const seen = new Set(exclude)
  const push = (ex: Exercise | null | undefined) => {
    if (ex && !seen.has(ex.id) && out.length < 8) {
      seen.add(ex.id)
      out.push(ex)
    }
  }
  const tagsDone = new Set<string>()
  for (const m of misses) {
    const wordId = m.id.includes('~') ? m.id.split('~')[0] : m.kind === 'card' ? m.id : null
    const word = wordId ? allVocab.find((v) => v.id === wordId) : undefined
    if (word) {
      push(vocabCard(word, m.kind === 'card' && m.direction === 'fr-en' ? 'en-fr' : 'fr-en'))
      continue
    }
    for (const tag of m.tags ?? []) {
      if (tag === 'vocab' || tagsDone.has(tag)) continue
      tagsDone.add(tag)
      shuffle(exercisesWithTag(tag).map((r) => r.exercise)).slice(0, 3).forEach(push)
    }
  }
  return sortByDifficulty(out)
}
