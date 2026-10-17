// Niveaux visés : on part du B2 (niveau actuel) pour aller vers le C1 (marge de progression).
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'B2+' | 'C1'

// Les 5 grands thèmes des cours (fiches EN-B2 d'Accent Lang).
// Modules de Jojo : 'company' | 'problems' | 'opinions' | 'assumptions' | 'process' | 'explanations' ;
// ceux de Jujularage commencent par 'jj-'.
export type ModuleId = string

// ---------------------------------------------------------------------------
// Exercices — un format commun utilisé partout (grammaire, corrections, style…)
// L'`id` DOIT rester stable dans le temps : c'est lui qui porte la progression.
// ---------------------------------------------------------------------------

interface ExerciseBase {
  id: string
  level?: Level
  /** Étiquettes pour les statistiques de points faibles (ex. 'past-simple', 'present-perfect'). */
  tags?: string[]
  /** Explication affichée après la réponse (en français). */
  explanation?: string
}

/** Question à choix multiples. */
export interface McqExercise extends ExerciseBase {
  kind: 'mcq'
  prompt: string
  options: string[]
  answer: number
}

/** Phrase à trou : `prompt` contient `___`, l'utilisateur tape uniquement le morceau manquant. */
export interface GapExercise extends ExerciseBase {
  kind: 'gap'
  prompt: string
  answers: string[]
  hint?: string
}

/** Correction d'erreur : on montre une phrase fautive, l'utilisateur la réécrit correctement. */
export interface FixExercise extends ExerciseBase {
  kind: 'fix'
  wrong: string
  answers: string[]
  context?: string
}

/** Transformation libre : traduire, reformuler, passer au registre formel… */
export interface TransformExercise extends ExerciseBase {
  kind: 'transform'
  instruction: string
  prompt: string
  answers: string[]
}

/** Carte de vocabulaire (générée à partir d'un VocabItem). */
export interface CardExercise extends ExerciseBase {
  kind: 'card'
  /** Sens de la carte : l'utilisateur écrit la traduction de `front`. */
  direction: 'en-fr' | 'fr-en'
  front: string
  back: string
  example?: string
  note?: string
  /** Texte à prononcer par la synthèse vocale (toujours la version anglaise). */
  speak: string
}

export type Exercise = McqExercise | GapExercise | FixExercise | TransformExercise | CardExercise

// ---------------------------------------------------------------------------
// Grammaire
// ---------------------------------------------------------------------------

export interface GrammarExample {
  en: string
  fr?: string
  /** Petite remarque sous l'exemple (ex. « ✗ I have seen him yesterday »). */
  note?: string
}

export interface GrammarPoint {
  title: string
  explanation: string
  examples: GrammarExample[]
  table?: { head: string[]; rows: string[][] }
}

export type GrammarGroup = 'temps' | 'structures' | 'mots' | 'style'

export interface GrammarLesson {
  id: string
  order: number
  group: GrammarGroup
  title: string
  level: Level
  summary: string
  /** Étiquette appliquée par défaut aux exercices de la leçon (statistiques de points faibles). */
  tag: string
  points: GrammarPoint[]
  exercises: Exercise[]
}

// ---------------------------------------------------------------------------
// Vocabulaire
// ---------------------------------------------------------------------------

export interface VocabItem {
  id: string
  en: string
  fr: string
  level: Level
  example?: string
  note?: string
}

export interface VocabDeck {
  id: string
  title: string
  icon: string
  description: string
  kind: 'cours' | 'decouverte'
  items: VocabItem[]
}

export interface PronunciationItem {
  id: string
  word: string
  /** Guide de prononciation (syllabe accentuée en majuscules), ex. « RESS-uh-pee ». */
  guide: string
  tip?: string
  example?: string
}

// ---------------------------------------------------------------------------
// Cours : une séance = une fiche datée (Vocabulary / Pronunciation / Mistakes / Others)
// ---------------------------------------------------------------------------

export interface CourseSession {
  id: string
  /** Date ISO de la séance (AAAA-MM-JJ). */
  date: string
  title: string
  module: ModuleId
  vocabulary: VocabItem[]
  pronunciation: PronunciationItem[]
  /** Les phrases corrigées par le professeur, transformées en exercices de correction. */
  corrections: FixExercise[]
  /** La rubrique « Others » de la fiche : petits points de langue. */
  notes: GrammarPoint[]
  /** Leçons de grammaire de l'appli liées aux notes de la séance. */
  grammarLinks?: string[]
}

export interface KeyPhraseGroup {
  title: string
  titleFr: string
  phrases: string[]
}

export interface SpeakingPrompt {
  id: string
  question: string
  /** Consigne de temps / structure pour pousser la progression (ex. « Utilise le present perfect »). */
  focus?: string
}

export interface CourseModule {
  id: ModuleId
  title: string
  titleFr: string
  icon: string
  description: string
  keyPhrases: KeyPhraseGroup[]
  /** true quand les expressions viennent de la fiche du cours, false si complétées par l'appli. */
  keyPhrasesFromCourse: boolean
  speaking: SpeakingPrompt[]
  grammarLessonIds: string[]
  readingId?: string
  dialogueId?: string
  writingTaskIds: string[]
  exercises: Exercise[]
  /** Paquets de vocabulaire liés au module (en plus du vocabulaire des séances). */
  deckIds?: string[]
  /** Parcours auquel appartient le module (affiché à part dans « Cours »), ex. « Lexie 👶 ». */
  group?: string
}

export type ModuleStep =
  | 'phrases'
  | 'vocabulaire'
  | 'grammaire'
  | 'corrections'
  | 'prononciation'
  | 'ecoute'
  | 'lecture'
  | 'oral'
  | 'ecrit'

// ---------------------------------------------------------------------------
// Pratique : écrit, lecture, écoute
// ---------------------------------------------------------------------------

export interface WritingTask {
  id: string
  module?: ModuleId
  level: Level
  type: 'email' | 'report' | 'essay' | 'story' | 'procedure' | 'proposal' | 'review'
  title: string
  /** Consigne en anglais (comme à l'examen). */
  prompt: string
  /** Aide en français. */
  tipsFr: string
  minWords: number
  maxWords: number
  /** Expressions à placer : détectées automatiquement dans le texte. */
  targetPhrases: string[]
  /** Points à vérifier soi-même avant de terminer. */
  checklist: string[]
  model: string
}

export interface ReadingText {
  id: string
  title: string
  level: Level
  module?: ModuleId
  paragraphs: string[]
  glossary: { en: string; fr: string }[]
  questions: McqExercise[]
}

export interface Dialogue {
  id: string
  title: string
  level: Level
  module?: ModuleId
  context: string
  lines: { speaker: string; text: string }[]
  questions: McqExercise[]
}

export interface IrregularVerb {
  base: string
  past: string
  participle: string
  fr: string
  /** 1 = incontournable, 2 = courant, 3 = avancé. */
  tier: 1 | 2 | 3
}

export interface ChangelogEntry {
  version: number
  date: string
  title: string
  changes: string[]
}

// ---------------------------------------------------------------------------
// Thèmes & culture (Halloween, Noël…) : une leçon autonome, hors cours.
// ---------------------------------------------------------------------------

export interface ThemeLesson {
  id: string
  title: string
  icon: string
  /** Phrase d'accroche affichée dans la liste des thèmes. */
  summary: string
  intro: string
  /** Période (MM-JJ) pendant laquelle le thème est mis en avant sur l'accueil. */
  season?: { from: string; to: string }
  /** Références culturelles, traditions et petits points de langue. */
  culture: GrammarPoint[]
  /** Paquets de vocabulaire (ids de `discoveryDecks`). */
  deckIds: string[]
  speaking: SpeakingPrompt[]
  readingId?: string
  dialogueId?: string
  writingTaskIds: string[]
  exercises: Exercise[]
}
