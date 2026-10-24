// Contenu propre à chaque accès (hors Jojo, dont les fichiers historiques restent dans src/data/*.ts).
// Chaque accès (juju, maman, nunu) fournit la même structure ; les fichiers de src/data/ choisissent
// la version de l'accès en cours : `extra ? extra.xxx : valeurJojo`.
import type { ChangelogEntry, CourseModule, Dialogue, Exercise, GrammarGroup, GrammarLesson, IrregularVerb, PronunciationItem, ReadingText, VocabDeck, WritingTask } from '../types.ts'
import { EDITION } from '../edition.ts'

export interface EditionUi {
  coursesLabel: string
  coursesDesc: string
  tensesDesc: string
  tenseLabSubtitle: string
  /** Défi mis en avant au Labo des temps (étiquette d'exercices, titre, sous-titre). */
  challenge: { tag: string; title: string; sub: string }
  /** Sujet d'écrit proposé au Labo des temps (raconter au passé…). */
  writingTaskId: string | null
  /** Page « Verbes irréguliers » : titre et phrase de présentation. */
  verbsTitle: string
}

export interface EditionContent {
  grammarLessons: GrammarLesson[]
  grammarGroups: { id: GrammarGroup; title: string; icon: string; description: string }[]
  decks: VocabDeck[]
  modules: CourseModule[]
  readingTexts: ReadingText[]
  dialogues: Dialogue[]
  writingTasks: WritingTask[]
  /** Petites phrases à traduire (page « Traduction »). */
  translations: Exercise[]
  pronunciation: PronunciationItem[]
  changelog: ChangelogEntry[]
  /** Paquets dans lesquels piocher l'« expression du jour ». */
  expressionDeckIds: string[]
  /** Verbes irréguliers propres à l'accès (sinon : la liste anglaise des niveaux 1 et 2). */
  irregularVerbs?: IrregularVerb[]
  /** Traductions françaises des phrases d'exemple du vocabulaire (clé = la phrase). */
  examplesFr?: Record<string, string>
  ui: EditionUi
}

/**
 * Contenu de l'accès en cours, ou null pour Jojo.
 * Chargé à la demande (import dynamique + await de niveau supérieur) : le contenu des autres accès n'est pas
 * analysé au démarrage, chaque accès a son propre fichier JavaScript.
 */
export const extra: EditionContent | null =
  EDITION.id === 'jujularage'
    ? (await import('./juju/index.ts')).jujuContent
    : EDITION.id === 'maman'
      ? (await import('./maman/index.ts')).mamanContent
      : EDITION.id === 'nunu'
        ? (await import('./nunu/index.ts')).nunuContent
        : null
