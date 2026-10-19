// Outils pour écrire du contenu « par thème » en peu de lignes (accès Maman et Nunu).
//
// Un thème = un module de l'onglet Cours + un paquet de vocabulaire + des exercices MÊLÉS
// (traductions, phrases à compléter, à corriger, textes à trous, questions) qui reprennent le
// vocabulaire du thème en révisant la grammaire (temps, prépositions, questions…).
//
// ⚠️ Les ids sont fabriqués à partir de la POSITION : `${thème}-01`, `${thème}-02`…
// Pour ajouter des exercices à un thème : toujours AJOUTER À LA FIN de la liste.
// Ne jamais insérer au milieu, réordonner ou supprimer (la progression est liée aux ids).
// Les mots, eux, ont un id tiré du mot lui-même (`${thème}-${mot}`) : leur ordre est libre.
import type { ClozeExercise, CourseModule, Exercise, FixExercise, GapExercise, KeyPhraseGroup, Level, McqExercise, TransformExercise, VocabDeck, VocabItem } from '../types.ts'
import { slug } from '../lib/text.ts'

// ---------------------------------------------------------------- exercices (brouillons sans id)

type Draft<T> = Omit<T, 'id'>
export type ExDraft = Draft<GapExercise> | Draft<McqExercise> | Draft<FixExercise> | Draft<TransformExercise> | Draft<ClozeExercise>

export interface ExOpts {
  level?: Level
  tags?: string[]
  hint?: string
}

/** Phrase à compléter : `___` = le mot manquant. */
export const gap = (prompt: string, answers: string[], explanation?: string, o: ExOpts = {}): Draft<GapExercise> => ({
  kind: 'gap', prompt, answers, explanation, level: o.level, tags: o.tags, hint: o.hint,
})

/** Question à choix multiples : la PREMIÈRE option est la bonne (l'appli mélange l'ordre à l'affichage). */
export const mcq = (prompt: string, options: string[], explanation?: string, o: ExOpts = {}): Draft<McqExercise> => ({
  kind: 'mcq', prompt, options, answer: 0, explanation, level: o.level, tags: o.tags,
})

/** Phrase fautive à corriger. */
export const fix = (wrong: string, answers: string[], explanation?: string, o: ExOpts = {}): Draft<FixExercise> => ({
  kind: 'fix', wrong, answers, explanation, level: o.level, tags: o.tags,
})

/** Texte à trous : plusieurs `___`, une série de réponses acceptées par trou. */
export const cloze = (text: string, blanks: string[][], explanation?: string, o: ExOpts = {}): Draft<ClozeExercise> => ({
  kind: 'cloze', text, blanks, explanation, level: o.level, tags: o.tags, hint: o.hint,
})

/** Fabrique les traducteurs d'une langue : français → langue apprise, et l'inverse. */
export function translators(langName: string) {
  const to = (prompt: string, answers: string[], explanation?: string, o: ExOpts = {}): Draft<TransformExercise> => ({
    kind: 'transform', instruction: `Traduis en ${langName}.`, prompt, answers, explanation, level: o.level, tags: o.tags,
  })
  const back = (prompt: string, answers: string[], explanation?: string, o: ExOpts = {}): Draft<TransformExercise> => ({
    kind: 'transform', instruction: 'Traduis en français.', prompt, answers, explanation, level: o.level, tags: o.tags,
  })
  return { to, back }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Donne un id stable (par position) et un niveau par défaut à une liste de brouillons. */
export function withIds(prefix: string, drafts: ExDraft[], level: Level = 'A1'): Exercise[] {
  return drafts.map((d, i) => ({ ...d, id: `${prefix}-${pad(i + 1)}`, level: d.level ?? level }) as Exercise)
}

// ---------------------------------------------------------------- vocabulaire

/** [mot, traduction, exemple?, remarque?, niveau?] */
export type Word = [en: string, fr: string, example?: string, note?: string, level?: Level]

export function wordItems(prefix: string, words: Word[], level: Level = 'A1'): VocabItem[] {
  const used = new Set<string>()
  return words.map(([en, fr, example, note, lvl]) => {
    let id = `${prefix}-${slug(en) || 'x'}`
    while (used.has(id)) id += '-2'
    used.add(id)
    return { id, en, fr, level: lvl ?? level, example, note }
  })
}

// ---------------------------------------------------------------- thèmes

export interface ThemeDef {
  /** Identifiant court et stable (ex. « mm-home »). */
  id: string
  icon: string
  title: string
  titleFr: string
  description: string
  /** Parcours dans l'onglet Cours (facultatif). */
  group?: string
  words: Word[]
  /** [titre, titre en français, phrases] */
  phrases: [title: string, titleFr: string, phrases: string[]][]
  /** [question, consigne] */
  speaking: [question: string, focus?: string][]
  /** Leçons de grammaire liées. */
  grammar: string[]
  readingId?: string
  dialogueId?: string
  writing?: string[]
  /** Exercices mêlés, en brouillon (voir plus haut). */
  exercises: ExDraft[]
  level?: Level
}

export function buildTheme(d: ThemeDef): { module: CourseModule; deck: VocabDeck } {
  const level = d.level ?? 'A1'
  const deckId = `${d.id}-words`
  const keyPhrases: KeyPhraseGroup[] = d.phrases.map(([title, titleFr, phrases]) => ({ title, titleFr, phrases }))
  const module: CourseModule = {
    id: d.id,
    group: d.group,
    title: d.title,
    titleFr: d.titleFr,
    icon: d.icon,
    description: d.description,
    keyPhrasesFromCourse: false,
    deckIds: [deckId],
    keyPhrases,
    speaking: d.speaking.map(([question, focus], i) => ({ id: `${d.id}-sp-${pad(i + 1)}`, question, focus })),
    grammarLessonIds: d.grammar,
    readingId: d.readingId,
    dialogueId: d.dialogueId,
    writingTaskIds: d.writing ?? [],
    exercises: withIds(d.id, d.exercises, level),
  }
  const deck: VocabDeck = {
    id: deckId,
    title: d.title,
    icon: d.icon,
    description: d.titleFr,
    kind: 'decouverte',
    items: wordItems(d.id, d.words, level),
  }
  return { module, deck }
}
