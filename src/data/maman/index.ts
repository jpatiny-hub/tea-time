import type { EditionContent } from '../edition-content.ts'
import { mamanGrammarGroups, mamanGrammarLessons } from './grammar.ts'
import { dayTheme, eatOutTheme, foodTheme, homeTheme, meTheme } from './themes-1.ts'
import { clothesTheme, friendsTheme, healthTheme, townTheme, travelTheme } from './themes-2.ts'
import { hobbiesTheme, phoneTheme, weatherTheme, workTheme } from './themes-3.ts'
import { mamanDialogues, mamanReadingTexts, mamanWritingTasks } from './texts.ts'
import { mamanChangelog, mamanPronunciation, mamanSharedDecks, mamanTranslations } from './extra.ts'

// Ordre des thèmes : de la vie de tous les jours vers les situations plus variées.
// ⚠️ Ne jamais retirer ni renommer un thème (les ids portent la progression) ; en ajouter À LA FIN.
const themes = [meTheme, homeTheme, dayTheme, foodTheme, eatOutTheme, clothesTheme, townTheme, friendsTheme, travelTheme, healthTheme, weatherTheme, hobbiesTheme, phoneTheme, workTheme]

export const mamanContent: EditionContent = {
  grammarLessons: mamanGrammarLessons,
  grammarGroups: mamanGrammarGroups,
  decks: [...themes.map((t) => t.deck), ...mamanSharedDecks],
  modules: themes.map((t) => t.module),
  readingTexts: mamanReadingTexts,
  dialogues: mamanDialogues,
  writingTasks: mamanWritingTasks,
  translations: mamanTranslations,
  pronunciation: mamanPronunciation,
  changelog: mamanChangelog,
  expressionDeckIds: ['mm-deck-phrases'],
  ui: {
    coursesLabel: 'Mes thèmes',
    coursesDesc: 'Famille, maison, voyages, santé…',
    tensesDesc: 'Présent, passé, futur, present perfect',
    tenseLabSubtitle: 'Présent simple et continu, passé, futur et present perfect : des fiches simples, des exercices et tes statistiques.',
    challenge: { tag: 'present', title: 'Present simple ou continuous ?', sub: 'Habitude ou maintenant ?' },
    writingTaskId: 'mm-w-weekend',
    verbsTitle: 'Verbes irréguliers',
  },
}
