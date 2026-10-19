import type { GrammarLesson } from '../../types.ts'
import { gap, mcq, fix, translators } from '../theme-builder.ts'
import { lesson } from './lesson.ts'

// Nunu — grammaire, partie 2 : le présent, l'ordre des mots, la négation, les questions, les verbes modaux, les verbes séparables.

const { to: tr } = translators('néerlandais')

export const nunuGrammar2: GrammarLesson[] = [
  lesson({
    id: 'nn-g-present', order: 20, group: 'temps', title: 'Le présent : werken, wonen, spelen…', level: 'A1', tag: 'present',
    summary: 'Une seule règle à retenir : ik = le radical, jij / hij = radical + t, wij / zij = l’infinitif.',
    points: [
      {
        title: 'La règle de base',
        explanation: 'On prend l’infinitif (werken) et on retire **-en** : c’est le **radical** (werk). **ik** : radical (ik werk). **jij, u, hij, zij, het** : radical + **t** (jij werkt, hij werkt). **wij, jullie, zij** (pluriel) : l’infinitif (wij werken). Si le radical finit déjà par **t**, on n’ajoute rien (hij wacht). **Après l’inversion avec je**, le **t** disparaît : « Werk je ? » (mais « Werkt hij ? », « Werkt u ? »).',
        examples: [
          { en: 'Ik woon in Luik. Hij woont in Gent. Wij wonen in Brugge.', fr: 'J’habite à Liège. Il habite à Gand. Nous habitons à Bruges.' },
          { en: 'Werk je vandaag? — Ja, ik werk de hele dag.', fr: 'Tu travailles aujourd’hui ? — Oui, je travaille toute la journée.' },
        ],
        table: { head: ['', 'werken (radical : werk)'], rows: [['ik', 'werk'], ['jij / je', 'werkt'], ['hij / zij / het', 'werkt'], ['wij / jullie / zij', 'werken']] },
      },
      {
        title: 'Radicaux : l’orthographe (voyelles longues)',
        explanation: 'Le radical suit la règle des voyelles : **wonen → woon**, **maken → maak**, **spelen → speel**, **eten → eet**, **lezen → lees**, **slapen → slaap**, **lopen → loop**, **koken → kook**. Quelques verbes très courants sont **irréguliers** : **zijn** (ben, bent, is, zijn), **hebben** (heb, hebt, heeft, hebben), **gaan** (ga, gaat, gaan), **doen** (doe, doet, doen), **zien** (zie, ziet, zien), **kunnen**, **willen**, **moeten**, **mogen** (voir les modaux).',
        examples: [
          { en: 'Wat doe je? Ik lees een boek en mijn zoon speelt.', fr: 'Qu’est-ce que tu fais ? Je lis un livre et mon fils joue.' },
          { en: 'De kinderen slapen. Papa kookt.', fr: 'Les enfants dorment. Papa cuisine.' },
        ],
      },
    ],
    exercises: [
      gap('Ik ___ in Luik. (wonen)', ['woon'], 'ik → radical : woon (voyelle longue = deux o).', { tags: ['present'] }),
      gap('Hij ___ in een winkel. (werken)', ['werkt'], 'hij → radical + t : werkt.', { tags: ['present'] }),
      gap('Wij ___ koffie. (drinken)', ['drinken'], 'wij → infinitif : drinken.', { tags: ['present'] }),
      gap('Mijn dochter ___ een boek. (lezen)', ['leest'], 'lezen → radical lees + t : leest.', { tags: ['present'] }),
      gap('De kinderen ___ buiten. (spelen)', ['spelen'], 'Pluriel → infinitif : spelen.', { tags: ['present'] }),
      gap('Wat ___ je? (doen)', ['doe'], 'Après l’inversion avec je : pas de -t → doe je ?', { tags: ['present'] }),
      gap('___ je koffie? (drinken)', ['Drink'], 'Question avec je : radical sans t → Drink je ?', { tags: ['present'] }),
      gap('Hoe ___ jij? (heten)', ['heet'], 'Heten : radical heet ; après inversion avec jij, pas de -t.', { tags: ['present'] }),
      fix('Ik werkt vandaag thuis.', ['Ik werk vandaag thuis.'], 'ik → radical sans t.', { tags: ['present'] }),
      fix('Hij woon in Gent.', ['Hij woont in Gent.'], 'hij → radical + t.', { tags: ['present'] }),
      fix('Wij werkt veel.', ['Wij werken veel.', 'We werken veel.'], 'wij → infinitif : werken.', { tags: ['present'] }),
      tr('Ik werk in Luik.', ['Ik werk in Luik.', 'Ik werk in Luik'], 'Je travaille : ik werk.'),
      tr('Elle lit un livre.', ['Zij leest een boek.', 'Ze leest een boek.'], 'lezen → leest.'),
    ],
  }),
  lesson({
    id: 'nn-g-order', order: 8, group: 'structures', title: 'L’ordre des mots : le verbe en 2e position', level: 'A1', tag: 'nl-order',
    summary: 'La règle d’or : dans une phrase simple, le verbe est toujours en deuxième position.',
    points: [
      {
        title: 'Le verbe en 2e position',
        explanation: 'Phrase normale : **sujet + verbe + reste** (Ik drink koffie). Mais si on commence par autre chose (un mot de temps, de lieu…), le **verbe reste en 2e position** et le **sujet passe derrière** : **Vandaag drink ik koffie** (✗ Vandaag ik drink). C’est la règle la plus importante du néerlandais !',
        examples: [
          { en: 'Ik ga morgen naar Gent.', fr: 'Je vais demain à Gand.' },
          { en: 'Morgen ga ik naar Gent.', fr: 'Demain, je vais à Gand. (verbe 2e, sujet derrière)' },
          { en: 'In de zomer wonen wij in Spanje.', fr: 'En été, nous habitons en Espagne.' },
        ],
      },
      {
        title: 'Les questions : le verbe en 1re position',
        explanation: 'Question oui / non : **verbe + sujet** (Drink je koffie ?). Avec un mot interrogatif : **mot interrogatif + verbe + sujet** (Wat drink je ?). L’ordre des compléments (A2) : **temps, manière, lieu** — Ik ga **morgen** **met de bus** **naar school**.',
        examples: [
          { en: 'Heb je honger? — Waar woon je?', fr: 'Tu as faim ? — Où habites-tu ?' },
          { en: 'Ik fiets elke dag naar mijn werk.', fr: 'Je vais à vélo à mon travail tous les jours.' },
        ],
      },
    ],
    exercises: [
      fix('Vandaag ik werk thuis.', ['Vandaag werk ik thuis.'], 'Après un mot de temps, le verbe reste en 2e position : werk ik.', { tags: ['nl-order'] }),
      fix('Morgen wij gaan naar Gent.', ['Morgen gaan wij naar Gent.', 'Morgen gaan we naar Gent.'], 'Verbe en 2e position : Morgen gaan wij.', { tags: ['nl-order'] }),
      fix('In de zomer ik woon in Spanje.', ['In de zomer woon ik in Spanje.'], 'Verbe en 2e position.', { tags: ['nl-order'] }),
      fix('Je drinkt koffie?', ['Drink je koffie?', 'Drinkt u koffie?', 'Drinkt hij koffie?'], 'Question oui / non : verbe d’abord, et sans -t avec je : Drink je koffie ?', { tags: ['nl-order'] }),
      gap('Morgen ___ ik naar de markt. (gaan)', ['ga'], 'Verbe en 2e position, ik → ga.', { tags: ['nl-order'] }),
      gap('Waar ___ je? (wonen)', ['woon'], 'Mot interrogatif + verbe + sujet : Waar woon je ?', { tags: ['nl-order'] }),
      mcq('Quelle phrase est correcte ?', ['Op zondag eet ik bij mijn moeder.', 'Op zondag ik eet bij mijn moeder.', 'Op zondag bij mijn moeder eet ik.', 'Op zondag eten bij mijn moeder ik.'], 'Le verbe (eet) est en 2e position, le sujet (ik) vient après.', { tags: ['nl-order'] }),
      tr('Demain, je travaille à la maison.', ['Morgen werk ik thuis.', 'Morgen werk ik thuis'], 'Morgen (1er) + verbe + ik.'),
    ],
  }),
  lesson({
    id: 'nn-g-negation', order: 9, group: 'structures', title: 'Dire non : niet et geen', level: 'A1', tag: 'nl-negation',
    summary: 'Geen avec un nom, niet pour le reste.',
    points: [
      {
        title: 'Geen ou niet ?',
        explanation: '**geen** (= ne… pas de / aucun) se met devant un nom qui aurait eu **een** ou **pas d’article** : Ik heb **geen** auto. Ik drink **geen** koffie. **niet** se met dans tous les **autres cas** : avec un verbe (Ik werk **niet**), un adjectif (Het is **niet** groot), un nom précédé de **de / het / mijn / jouw…** (Ik zie de hond **niet**). **Niet** se place en général **à la fin**, mais **avant** un adjectif, un adverbe ou une préposition.',
        examples: [
          { en: 'Ik heb geen tijd. — Ik heb geen kinderen.', fr: 'Je n’ai pas le temps. — Je n’ai pas d’enfants.' },
          { en: 'Hij werkt niet. — Het huis is niet groot.', fr: 'Il ne travaille pas. — La maison n’est pas grande.' },
          { en: 'Ik zie mijn sleutels niet.', fr: 'Je ne vois pas mes clés.' },
        ],
      },
    ],
    exercises: [
      gap('Ik heb ___ auto. (pas de)', ['geen'], 'Nom sans article défini (een auto) → GEEN.', { tags: ['nl-negation'] }),
      gap('Hij drinkt ___ koffie. (pas de)', ['geen'], 'Koffie sans article → GEEN.', { tags: ['nl-negation'] }),
      gap('Wij werken vandaag ___. (pas)', ['niet'], 'Après un verbe → NIET.', { tags: ['nl-negation'] }),
      gap('Het huis is ___ groot. (pas)', ['niet'], 'Avant un adjectif → NIET.', { tags: ['nl-negation'] }),
      gap('Ik zie de hond ___ . (pas)', ['niet'], 'Nom avec « de » → NIET (à la fin).', { tags: ['nl-negation'] }),
      fix('Ik heb niet kinderen.', ['Ik heb geen kinderen.'], 'Nom sans article → geen.', { tags: ['nl-negation'] }),
      fix('Ik werk geen vandaag.', ['Ik werk vandaag niet.'], 'Avec un verbe → niet (à la fin).', { tags: ['nl-negation'] }),
      fix('Hij heeft niet een auto.', ['Hij heeft geen auto.'], 'Niet een → geen.', { tags: ['nl-negation'] }),
      tr('Je n’ai pas de chien.', ['Ik heb geen hond.'], 'Pas de + nom = geen.'),
      tr('Elle ne travaille pas aujourd’hui.', ['Zij werkt vandaag niet.', 'Ze werkt vandaag niet.'], 'Verbe → niet, en fin de phrase.'),
    ],
  }),
  lesson({
    id: 'nn-g-questions', order: 10, group: 'structures', title: 'Poser des questions : wie, wat, waar…', level: 'A1', tag: 'nl-questions',
    summary: 'Les mots interrogatifs et l’ordre : mot interrogatif + verbe + sujet.',
    points: [
      {
        title: 'Les mots interrogatifs',
        explanation: '**wie** (qui), **wat** (quoi, que), **waar** (où), **wanneer** (quand), **waarom** (pourquoi), **hoe** (comment), **welk / welke** (quel / quelle), **hoeveel** (combien), **hoe laat** (à quelle heure), **hoe oud** (quel âge), **hoe lang** (combien de temps). L’ordre : **mot interrogatif + verbe + sujet**. Réponse : **omdat** (parce que).',
        examples: [
          { en: 'Waar woon je? — Hoe heet je zoon?', fr: 'Où habites-tu ? — Comment s’appelle ton fils ?' },
          { en: 'Hoe laat is het? — Hoeveel kost dit?', fr: 'Quelle heure est-il ? — Combien ça coûte ?' },
          { en: 'Waarom ben je moe? — Omdat ik niet slaap.', fr: 'Pourquoi es-tu fatiguée ? — Parce que je ne dors pas.' },
        ],
      },
    ],
    exercises: [
      gap('___ heet je? (comment)', ['Hoe'], 'Comment s’appelle… = Hoe heet…', { tags: ['nl-questions'] }),
      gap('___ woon je? (où)', ['Waar'], 'Où = WAAR.', { tags: ['nl-questions'] }),
      gap('___ is dat? — Dat is mijn buurman. (qui)', ['Wie'], 'Qui = WIE.', { tags: ['nl-questions'] }),
      gap('___ kost dit? (combien)', ['Hoeveel'], 'Combien = HOEVEEL.', { tags: ['nl-questions'] }),
      gap('___ laat is het? (quelle heure)', ['Hoe'], 'Quelle heure est-il ? = Hoe laat is het ?', { tags: ['nl-questions'] }),
      gap('___ ben je moe? — Omdat ik niet goed slaap. (pourquoi)', ['Waarom'], 'Pourquoi = WAAROM ; réponse avec OMDAT.', { tags: ['nl-questions'] }),
      fix('Waar je woont?', ['Waar woon je?'], 'Mot interrogatif + verbe + sujet (et sans -t avec je).', { tags: ['nl-questions'] }),
      fix('Wat kost het hoeveel?', ['Hoeveel kost het?'], 'Combien ça coûte = Hoeveel kost het ?', { tags: ['nl-questions'] }),
      mcq('Comment demande-t-on « Quel âge as-tu ? » ?', ['Hoe oud ben je?', 'Wat oud ben je?', 'Hoeveel jaar heb je?', 'Welke oud ben je?'], 'On dit : Hoe oud ben je ? (et on utilise zijn, pas hebben).', { tags: ['nl-questions'] }),
      tr('Où est la gare ?', ['Waar is het station?', 'Waar is het station'], 'Waar + is + het station. Het station est un het-woord.'),
      tr('Comment ça va ?', ['Hoe gaat het?', 'Hoe gaat het met je?', 'Hoe gaat het met jou?', 'Hoe gaat het met u?'], 'Hoe gaat het ? = comment ça va ? (aussi Hoe gaat het met u / je ?)'),
    ],
  }),
  lesson({
    id: 'nn-g-modals', order: 11, group: 'structures', title: 'Kunnen, willen, moeten, mogen', level: 'A1', tag: 'nl-modals',
    summary: 'Pouvoir, vouloir, devoir, avoir le droit : demander, proposer, refuser.',
    points: [
      {
        title: 'Les quatre verbes essentiels',
        explanation: '**kunnen** (pouvoir, savoir) : ik **kan**, jij **kunt / kan** (kun je ?), hij **kan**, wij **kunnen**. **willen** (vouloir) : ik **wil**, jij **wilt / wil** (wil je ?), hij **wil**, wij **willen**. **moeten** (devoir) : ik **moet**, jij **moet**, hij **moet**, wij **moeten**. **mogen** (avoir le droit) : ik **mag**, jij **mag**, hij **mag**, wij **mogen**. L’autre verbe (l’infinitif) se place **à la fin** de la phrase.',
        examples: [
          { en: 'Ik kan goed zwemmen.', fr: 'Je sais bien nager.' },
          { en: 'Ik wil graag een kop koffie.', fr: 'Je voudrais bien une tasse de café.' },
          { en: 'Je moet je handen wassen.', fr: 'Tu dois te laver les mains.' },
        ],
      },
      {
        title: 'Demander poliment',
        explanation: '**Mag ik…?** (puis-je…) : Mag ik een glas water? **Kunt u / Kun je … ?** (pouvez-vous / peux-tu…) : Kunt u mij helpen? **Ik wil graag…** (je voudrais) : Ik wil graag een broodje. **Graag** (avec plaisir) et **alstublieft / alsjeblieft** (s’il vous plaît / s’il te plaît) rendent tout poli.',
        examples: [
          { en: 'Mag ik uw naam, alstublieft?', fr: 'Puis-je avoir votre nom, s’il vous plaît ?' },
          { en: 'Kun je de deur dichtdoen, alsjeblieft?', fr: 'Tu peux fermer la porte, s’il te plaît ?' },
        ],
      },
    ],
    exercises: [
      gap('Ik ___ goed zwemmen. (kunnen)', ['kan'], 'ik → kan.', { tags: ['nl-modals'] }),
      gap('___ je me helpen? (kunnen)', ['Kun', 'Kan'], 'Avec je en inversion : Kun je… ? (ou Kan je…?).', { tags: ['nl-modals'] }),
      gap('Wij ___ naar huis. (moeten)', ['moeten'], 'wij → moeten : Wij moeten naar huis.', { tags: ['nl-modals'] }),
      gap('Mijn zoon ___ nog niet naar buiten. (mogen)', ['mag'], 'hij / mijn zoon → mag.', { tags: ['nl-modals'] }),
      gap('Ik ___ graag een kop thee. (willen)', ['wil'], 'ik → wil.', { tags: ['nl-modals'] }),
      gap('___ ik een glas water, alstublieft? (puis-je)', ['Mag'], 'Mag ik… ? = puis-je… ?', { tags: ['nl-modals'] }),
      fix('Ik kan zwemmen goed.', ['Ik kan goed zwemmen.'], 'L’infinitif (zwemmen) va à la fin.', { tags: ['nl-modals'] }),
      fix('Ik wil een koffie graag.', ['Ik wil graag een koffie.', 'Ik wil graag koffie.', 'Ik wil graag een kopje koffie.'], 'Graag se place devant le complément : Ik wil graag een koffie.', { tags: ['nl-modals'] }),
      tr('Puis-je avoir un verre d’eau, s’il vous plaît ?', ['Mag ik een glas water, alstublieft?', 'Mag ik een glas water alstublieft?', 'Mag ik een glas water, alsjeblieft?', 'Mag ik een glas water?', 'Mag ik alstublieft een glas water?'], 'Mag ik… + alstublieft.'),
      tr('Je voudrais un café.', ['Ik wil graag een koffie.', 'Ik wil graag koffie.', 'Ik wil graag een kopje koffie.', 'Ik zou graag een koffie willen.'], 'Ik wil graag… = je voudrais…'),
    ],
  }),
  lesson({
    id: 'nn-g-separable', order: 12, group: 'temps', title: 'Les verbes à particule séparable', level: 'A2', tag: 'nl-separable',
    summary: 'Opstaan, aankomen, meenemen… : la particule part à la fin de la phrase.',
    points: [
      {
        title: 'Séparé au présent',
        explanation: 'Beaucoup de verbes sont formés d’une **particule** + un verbe : **op|staan** (se lever), **aan|komen** (arriver), **mee|nemen** (emporter), **op|ruimen** (ranger), **af|wassen** (faire la vaisselle), **in|stappen** (monter dans). Au présent, **le verbe reste en 2e position** et **la particule part à la fin** : Ik **sta** om zeven uur **op**. À l’infinitif (avec kunnen, moeten, willen, gaan), le verbe se recolle : Ik moet vroeg **opstaan**.',
        examples: [
          { en: 'Ik sta om zeven uur op.', fr: 'Je me lève à sept heures.' },
          { en: 'De trein komt om vijf uur aan.', fr: 'Le train arrive à cinq heures.' },
          { en: 'Wij moeten de kinderen meenemen.', fr: 'Nous devons emmener les enfants.' },
        ],
      },
    ],
    exercises: [
      gap('Ik sta om zeven uur ___. (opstaan)', ['op'], 'La particule op part à la fin.', { tags: ['nl-separable'] }),
      gap('De trein komt om vijf uur ___. (aankomen)', ['aan'], 'La particule aan part à la fin.', { tags: ['nl-separable'] }),
      gap('Ik moet vroeg ___. (se lever)', ['opstaan'], 'Avec un modal (moet), le verbe reste entier à l’infinitif : opstaan.', { tags: ['nl-separable'] }),
      gap('Wij ruimen de kamer ___. (opruimen)', ['op'], 'La particule op à la fin.', { tags: ['nl-separable'] }),
      gap('Mijn man wast de vaat ___. (afwassen)', ['af'], 'La particule af part à la fin : wast … af.', { tags: ['nl-separable'] }),
      fix('Ik opsta om zeven uur.', ['Ik sta om zeven uur op.'], 'Au présent le verbe se sépare : sta … op.', { tags: ['nl-separable'] }),
      fix('Hij aankomt om vijf uur.', ['Hij komt om vijf uur aan.'], 'Au présent, le verbe se sépare : komt … aan.', { tags: ['nl-separable'], level: 'A2' }),
      tr('Je me lève à sept heures.', ['Ik sta om zeven uur op.', 'Ik sta om 7 uur op.', 'Ik sta om zeven uur op'], 'Ik sta … op.'),
    ],
  }),
]
