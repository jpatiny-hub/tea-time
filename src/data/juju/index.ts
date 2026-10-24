import { jujuExamplesFr } from './examples-fr.ts'
import type { EditionContent } from '../edition-content.ts'
import { jujuGrammarGroups, jujuGrammarLessons } from './grammar.ts'
import { jujuDecks } from './vocabulary.ts'
import { jujuModules } from './modules.ts'
import { jujuDialogues, jujuReadingTexts, jujuWritingTasks } from './texts.ts'
import { jujuChangelog, jujuPronunciation, jujuTranslations } from './extra.ts'

export const jujuContent: EditionContent = {
  grammarLessons: jujuGrammarLessons,
  grammarGroups: jujuGrammarGroups,
  decks: jujuDecks,
  modules: jujuModules,
  readingTexts: jujuReadingTexts,
  dialogues: jujuDialogues,
  writingTasks: jujuWritingTasks,
  translations: jujuTranslations,
  pronunciation: jujuPronunciation,
  changelog: jujuChangelog,
  examplesFr: jujuExamplesFr,
  expressionDeckIds: ['jj-idioms', 'jj-fluency'],
  ui: {
    coursesLabel: 'Mes modules',
    coursesDesc: 'Famille, bière, sport, CDMO…',
    tensesDesc: 'Présent, passé, futur',
    tenseLabSubtitle: 'Le présent (simple et continuous), le passé et le futur : des fiches simples, des exercices et tes statistiques.',
    challenge: { tag: 'present', title: 'Present simple ou continuous ?', sub: 'Habitude ou maintenant ?' },
    writingTaskId: 'jj-w-weekend',
    verbsTitle: 'Verbes irréguliers',
  },
}
