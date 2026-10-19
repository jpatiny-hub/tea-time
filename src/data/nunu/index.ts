import type { EditionContent } from '../edition-content.ts'
import { nunuGrammarGroups, nunuGrammarLessons } from './grammar-3.ts'
import { familyTheme, helloTheme, numbersTheme, timeTheme } from './themes-1.ts'
import { eatOutTheme, foodTheme, homeTheme, kidsTheme } from './themes-2.ts'
import { healthTheme, neighboursTheme, schoolTheme, shoppingTheme, townTheme, weatherTheme } from './themes-3.ts'
import { nunuDialogues, nunuReadingTexts, nunuWritingTasks } from './texts.ts'
import { nunuChangelog, nunuIrregularVerbs, nunuPronunciation, nunuSharedDecks, nunuTranslations } from './extra.ts'

// Ordre des thèmes : des premiers mots vers les situations de la vie quotidienne.
// ⚠️ Ne jamais retirer ni renommer un thème (les ids portent la progression) ; en ajouter À LA FIN.
const themes = [helloTheme, numbersTheme, timeTheme, familyTheme, kidsTheme, homeTheme, foodTheme, eatOutTheme, townTheme, shoppingTheme, schoolTheme, healthTheme, weatherTheme, neighboursTheme]

export const nunuContent: EditionContent = {
  grammarLessons: nunuGrammarLessons,
  grammarGroups: nunuGrammarGroups,
  decks: [...themes.map((t) => t.deck), ...nunuSharedDecks],
  modules: themes.map((t) => t.module),
  readingTexts: nunuReadingTexts,
  dialogues: nunuDialogues,
  writingTasks: nunuWritingTasks,
  translations: nunuTranslations,
  pronunciation: nunuPronunciation,
  changelog: nunuChangelog,
  expressionDeckIds: ['nn-deck-phrases'],
  irregularVerbs: nunuIrregularVerbs,
  ui: {
    coursesLabel: 'Mes thèmes',
    coursesDesc: 'Se présenter, les enfants, la maison, la ville…',
    tensesDesc: 'Présent, passé, futur',
    tenseLabSubtitle: 'Présent, passé et futur en néerlandais : des fiches simples, des exercices et tes statistiques.',
    challenge: { tag: 'nl-order', title: 'Où met-on le verbe ?', sub: 'Toujours en deuxième position !' },
    writingTaskId: 'nn-w-weekend',
    verbsTitle: 'Onregelmatige werkwoorden',
  },
}
