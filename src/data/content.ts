// Registre central : relie chaque id de contenu à son exercice et à sa provenance.
import type { CardExercise, Exercise, GapExercise, VocabItem } from '../types'
import { grammarLessons } from './grammar.ts'
import { sessions } from './sessions/index.ts'
import { modules } from './modules.ts'
import { perspectiveExercises, styleExercises, synonymExercises } from './style.ts'
import { irregularVerbs } from './irregular-verbs.ts'
import { allVocab, deckOfVocab } from './vocabulary.ts'
import { readingTexts } from './reading.ts'
import { dialogues } from './dialogues.ts'
import { themes } from './themes.ts'
import { extra } from './edition-content.ts'
import { isDutch } from '../edition.ts'
import { formatDateFr } from '../lib/text.ts'

export interface ExerciseSource {
  label: string
  link: string
}

export interface RegisteredExercise {
  exercise: Exercise
  source: ExerciseSource
}

// Tous les temps et formes verbales : utilisés par le « Labo des temps ».
export const TENSE_TAGS = [
  'present',
  'past-simple',
  'past-continuous',
  'present-perfect',
  'pp-vs-ps',
  'since-for',
  'pp-continuous',
  'past-perfect',
  'used-to',
  'future',
  'conditionals',
  'irregular',
]

export const TAG_LABELS: Record<string, string> = {
  present: 'Présent simple / continu',
  'past-simple': 'Past simple',
  'past-continuous': 'Past continuous',
  'present-perfect': 'Present perfect',
  'pp-vs-ps': 'Past simple ou present perfect ?',
  'since-for': 'Since / for / ago',
  'pp-continuous': 'Present perfect continuous',
  'past-perfect': 'Past perfect',
  'used-to': 'Used to / would',
  future: 'Futurs',
  conditionals: 'Conditionnels',
  irregular: 'Verbes irréguliers',
  'modals-deduction': 'Modaux de déduction',
  suggestions: 'Suggestions',
  passive: 'Passif',
  'gerund-inf': 'Gérondif / infinitif',
  relatives: 'Relatives',
  reported: 'Discours indirect',
  comparison: 'Comparaisons',
  countable: 'Dénombrables / indénombrables',
  quantifiers: 'Most, each, every…',
  prepositions: 'Prépositions',
  'word-choice': 'Choix du mot',
  'false-friends': 'Faux-amis',
  'make-do': 'Make / do',
  collocations: 'Collocations',
  'phrasal-verbs': 'Phrasal verbs',
  'word-order': 'Ordre des mots',
  articles: 'Articles',
  pronouns: 'Pronoms',
  spelling: 'Orthographe',
  linking: 'Connecteurs',
  register: 'Registre',
  inversion: 'Mise en relief',
  'indirect-questions': 'Questions indirectes',
  perspective: 'Changer de perspective',
  synonyms: 'Synonymes',
  vocab: 'Vocabulaire',
  idioms: 'Idiomes',
  be: 'Le verbe be',
  have: 'Have / have got',
  possessives: 'Possessifs',
  'there-is': 'There is / there are',
  can: 'Can',
  questions: 'Les questions',
  translation: 'Traduction',
  imperative: 'Impératif (parler à un enfant)',
  politeness: 'Politesse',
  plural: 'Pluriels',
  adverbs: 'Adverbes',
  'nl-order': 'Ordre des mots',
  'de-het': 'De ou het ?',
  'nl-negation': 'Négation (niet / geen)',
  'nl-modals': 'Verbes modaux',
  'nl-separable': 'Verbes à particule séparable',
  'nl-diminutive': 'Diminutif (-je)',
  'nl-numbers': 'Nombres et heures',
  'nl-spelling': 'Orthographe',
  'nl-pronouns': 'Pronoms',
  'nl-prepositions': 'Prépositions',
  'nl-questions': 'Poser des questions',
  'nl-er': 'Le petit mot « er »',
  'nl-polite': 'Politesse (je / u)',
  'nl-sounds': 'Prononciation',
  culture: 'Culture',
}

// Accès Nunu : les mêmes étiquettes de temps portent les noms néerlandais.
if (isDutch) {
  Object.assign(TAG_LABELS, {
    present: 'Présent (tegenwoordige tijd)',
    'past-simple': 'Imparfait (verleden tijd)',
    'present-perfect': 'Passé composé (perfectum)',
    future: 'Futur (gaan + infinitif)',
    irregular: 'Verbes irréguliers',
  })
}

function withTags(ex: Exercise, extra: string[]): Exercise {
  const tags = Array.from(new Set([...(ex.tags ?? []), ...extra]))
  return { ...ex, tags }
}

// --- Verbes irréguliers → exercices à trous générés ---------------------------------

function combos(forms: string): string[] {
  return forms.split(' / ').map((f) => f.trim())
}

export function irregularExercise(verb: (typeof irregularVerbs)[number]): GapExercise {
  const pasts = combos(verb.past)
  const parts = combos(verb.participle)
  const answers: string[] = []
  for (const p of pasts) for (const pp of parts) answers.push(`${p} ${pp}`)
  answers.push(`${verb.past} ${verb.participle}`)
  return {
    kind: 'gap',
    id: `irr-${verb.base}`,
    prompt: `${verb.base} → ___ (prétérit puis participe passé, séparés par un espace)`,
    hint: verb.fr,
    answers,
    tags: ['irregular'],
    level: verb.tier === 3 ? 'C1' : verb.tier === 2 ? 'B2+' : 'B2',
    explanation: `${verb.base} → ${verb.past} → ${verb.participle}`,
  }
}

// --- Vocabulaire → cartes ---------------------------------------------------------

export function vocabCard(item: VocabItem, direction: 'en-fr' | 'fr-en'): CardExercise {
  return {
    kind: 'card',
    id: item.id,
    direction,
    level: item.level,
    tags: ['vocab'],
    front: direction === 'en-fr' ? item.en : item.fr,
    back: direction === 'en-fr' ? item.fr : item.en,
    example: item.example,
    note: item.note,
    speak: item.en,
  }
}

// --- Construction du registre ------------------------------------------------------

const registry = new Map<string, RegisteredExercise>()

function register(ex: Exercise, source: ExerciseSource) {
  registry.set(ex.id, { exercise: ex, source })
}

for (const lesson of grammarLessons) {
  for (const ex of lesson.exercises) {
    register(withTags(ex, [lesson.tag]), { label: `Grammaire · ${lesson.title}`, link: `/grammaire/${lesson.id}` })
  }
}

for (const s of sessions) {
  for (const ex of s.corrections) {
    register(ex, { label: `Correction · cours du ${formatDateFr(s.date)}`, link: `/cours/seance/${s.id}` })
  }
}

for (const m of modules) {
  for (const ex of m.exercises) {
    register(ex, { label: `Module · ${m.title}`, link: `/cours/module/${m.id}` })
  }
}

/** Petites phrases à traduire (accès Jujularage). */
export const translationExercises: Exercise[] = extra ? extra.translations : []

for (const ex of translationExercises) {
  register(withTags(ex, ['translation']), { label: 'Traduction', link: '/pratique/traduction' })
}

for (const t of themes) {
  for (const ex of t.exercises) {
    register(ex, { label: `Thème · ${t.title}`, link: `/themes/${t.id}` })
  }
}

for (const ex of perspectiveExercises) {
  register(ex, { label: 'Changer de perspective', link: '/pratique/reformulation' })
}

for (const ex of synonymExercises) {
  register(ex, { label: 'Synonymes', link: '/pratique/reformulation' })
}

for (const ex of styleExercises) {
  register(ex, { label: 'Reformulation', link: '/pratique/reformulation' })
}

for (const v of irregularVerbs) {
  register(irregularExercise(v), { label: 'Verbes irréguliers', link: '/temps/verbes' })
}

for (const t of readingTexts) {
  for (const q of t.questions) register(q, { label: `Lecture · ${t.title}`, link: `/pratique/lecture/${t.id}` })
}

for (const d of dialogues) {
  for (const q of d.questions) register(q, { label: `Écoute · ${d.title}`, link: `/pratique/ecoute/${d.id}` })
}

export function getExercise(id: string): RegisteredExercise | undefined {
  const found = registry.get(id)
  if (found) return found
  const vocab = allVocab.find((v) => v.id === id)
  if (vocab) {
    const deck = deckOfVocab(id)
    return { exercise: vocabCard(vocab, 'en-fr'), source: { label: `Vocabulaire · ${deck?.title ?? ''}`, link: `/vocabulaire/${deck?.id ?? ''}` } }
  }
  return undefined
}

export const allExercises: RegisteredExercise[] = Array.from(registry.values())

/** Exercices « de fond » (hors questions de lecture / écoute), utilisés pour les défis et la révision. */
export const drillExercises: RegisteredExercise[] = allExercises.filter(
  (r) => !r.source.link.startsWith('/pratique/lecture') && !r.source.link.startsWith('/pratique/ecoute'),
)

export function exercisesWithTag(tag: string): RegisteredExercise[] {
  return drillExercises.filter((r) => r.exercise.tags?.includes(tag))
}

export const allCorrections = sessions.flatMap((s) => s.corrections)
