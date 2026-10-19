import type { GrammarLesson } from '../../types.ts'
import { gap, mcq, fix, translators } from '../theme-builder.ts'
import { lesson } from './lesson.ts'

// Nunu — grammaire, partie 1 : les sons, les pronoms, zijn, hebben, de / het, le pluriel, le diminutif.
// Convention : dans les données, le champ « en » d'un mot ou d'un exemple contient le NÉERLANDAIS.

const { to: tr } = translators('néerlandais')

export const nunuGrammar1: GrammarLesson[] = [
  lesson({
    id: 'nn-g-sounds', order: 1, group: 'mots', title: 'Les sons et l’orthographe', level: 'A1', tag: 'nl-sounds',
    summary: 'Les sons difficiles (g, ui, eu, ij) et la règle des voyelles doubles.',
    points: [
      {
        title: 'Les sons qui n’existent pas en français',
        explanation: '**g** et **ch** : un son râpeux au fond de la gorge (goed, acht). En Belgique, le g est plus doux qu’aux Pays-Bas. **ui** (huis) : entre « eu » et « i », lèvres arrondies. **eu** (deur) : comme « peur ». **oe** (goed) : comme « ou ». **ij** et **ei** (trein, ijs) : comme « è-i ». **ou** et **au** (koud, auto) : comme « a-ou ». **sch** (school) : s + ch. **j** : comme le « y » de « yes ». **w** : entre v et w. **-en** à la fin (lopen) : on prononce « eu(n) », presque sans le n.',
        examples: [
          { en: 'goed, goedemorgen', fr: 'bien, bonjour (le matin)' },
          { en: 'huis, muis, kruis', fr: 'maison, souris, croix' },
          { en: 'trein, ijs, mijn', fr: 'train, glace, mon' },
        ],
      },
      {
        title: 'Une voyelle longue : une ou deux lettres ?',
        explanation: 'Une voyelle **longue** s’écrit avec **deux lettres** quand la syllabe est fermée par une consonne : **maan**, **boom**. Au pluriel, la syllabe s’ouvre, donc **une seule lettre** suffit : **manen**, **bomen**. À l’inverse, une voyelle **courte** s’écrit avec **une lettre** (man), et on **double la consonne** quand la syllabe s’ouvre (mannen). Retenez : maan → manen (long) ; man → mannen (court).',
        examples: [
          { en: 'de maan → de manen', fr: 'la lune → les lunes' },
          { en: 'de man → de mannen', fr: 'l’homme → les hommes' },
          { en: 'het boek → de boeken', fr: 'le livre → les livres' },
        ],
      },
    ],
    exercises: [
      mcq('Le mot « goed » (bien) se prononce avec le son…', ['« ou » (comme dans « mou »)', '« o » (comme dans « mot »)', '« eu » (comme dans « peur »)', '« i » (comme dans « si »)'], 'oe = « ou ». Goed ≈ « ghout » (avec le g râpeux).'),
      mcq('Le mot « deur » (porte) se prononce avec le son…', ['« eu » (comme dans « peur »)', '« ou »', '« é »', '« ai »'], 'eu = « eu » comme dans « peur ».'),
      mcq('Comment se prononce « ij » dans « ijs » (glace) ?', ['comme « è-i »', 'comme « i »', 'comme « é »', 'comme « ou »'], 'ij et ei se prononcent pareil : « è-i ». De trein, het ijs, mijn.'),
      mcq('Quelle est la bonne orthographe du pluriel de « maan » (lune) ?', ['manen', 'maanen', 'mannen', 'maannen'], 'Voyelle longue : la syllabe s’ouvre au pluriel → une seule lettre : manen.'),
      mcq('Quelle est la bonne orthographe du pluriel de « man » (homme) ?', ['mannen', 'manen', 'maanen', 'manne'], 'Voyelle courte : on double la consonne au pluriel : mannen.'),
      gap('het boek → de ___ (les livres)', ['boeken'], 'Voyelle longue (oe) : une seule lettre au pluriel → boeken (✗ boekken).', { hint: 'pluriel de boek', tags: ['nl-spelling'] }),
      gap('de bom → de ___ (les bombes)', ['bommen'], 'Voyelle courte (o) : on double le m → bommen.', { hint: 'pluriel de bom', tags: ['nl-spelling'] }),
      fix('Het is een groot hhuis.', ['Het is een groot huis.'], 'Une seule h : huis.', { tags: ['nl-spelling'] }),
    ],
  }),
  lesson({
    id: 'nn-g-pronouns', order: 2, group: 'mots', title: 'Les pronoms : ik, jij, hij…', level: 'A1', tag: 'nl-pronouns',
    summary: 'Je, tu, il, elle… et la différence entre « je » et « u ».',
    points: [
      {
        title: 'Les pronoms sujets',
        explanation: '**ik** (je), **jij / je** (tu), **u** (vous, poli), **hij** (il), **zij / ze** (elle), **het** (cela / il neutre), **wij / we** (nous), **jullie** (vous, plusieurs amis), **zij / ze** (ils, elles). La forme courte (**je, ze, we**) est la plus courante ; la forme longue (**jij, zij, wij**) sert à appuyer : « Jij of ik ? ».',
        examples: [
          { en: 'Ik heet Nunu. Hoe heet jij?', fr: 'Je m’appelle Nunu. Et toi, comment tu t’appelles ?' },
          { en: 'Wij wonen in Gent. Zij wonen in Brugge.', fr: 'Nous habitons à Gand. Eux habitent à Bruges.' },
        ],
        table: { head: ['', 'Singulier', 'Pluriel'], rows: [['1re personne', 'ik', 'wij / we'], ['2e personne', 'jij / je · u (poli)', 'jullie · u'], ['3e personne', 'hij · zij / ze · het', 'zij / ze']] },
      },
      {
        title: 'Je ou u ? Et « ge / gij » en Flandre',
        explanation: '**je / jij** : à un ami, à la famille, à un enfant, entre personnes du même âge dans un cadre décontracté. **u** : à un inconnu plus âgé, à un client, à un médecin, par politesse. **En Flandre**, à l’oral, beaucoup de gens disent **ge / gij** au lieu de je / jij. Vous allez l’entendre ; vous pouvez continuer à dire **je / jij**, tout le monde vous comprendra.',
        examples: [
          { en: 'Kunt u mij helpen, alstublieft?', fr: 'Pouvez-vous m’aider, s’il vous plaît ? (poli)' },
          { en: 'Kun je me helpen?', fr: 'Tu peux m’aider ? (ami, enfant)' },
        ],
      },
    ],
    exercises: [
      gap('___ heet Nunu. (je)', ['Ik'], 'Je = IK.', { tags: ['nl-pronouns'] }),
      gap('Hoe heet ___? (tu)', ['je', 'jij'], 'Tu : je (court) ou jij. Après le verbe on emploie surtout je.', { tags: ['nl-pronouns'] }),
      gap('Mijn man en ik: ___ wonen in Luik. (nous)', ['wij', 'we'], 'Nous = WIJ / WE.', { tags: ['nl-pronouns'] }),
      gap('Mijn dochter is thuis. ___ is ziek. (elle)', ['Ze', 'Zij'], 'Elle = ZE / ZIJ.', { tags: ['nl-pronouns'] }),
      mcq('À un médecin que vous ne connaissez pas, vous dites plutôt…', ['u', 'jij', 'ik', 'wij'], 'Pour un inconnu ou par respect : u (Kunt u…, Hebt u…).'),
      mcq('À votre enfant, vous dites…', ['je / jij', 'u', 'hij', 'zij'], 'À un enfant ou un ami : je / jij.'),
      mcq('Que veut dire « Hij is mijn man » ?', ['Il est mon mari.', 'Elle est ma femme.', 'Je suis son mari.', 'Ils sont mes maris.'], 'Hij = il ; man = homme, mari.'),
    ],
  }),
  lesson({
    id: 'nn-g-zijn', order: 3, group: 'structures', title: 'Le verbe zijn : être', level: 'A1', tag: 'nl-order',
    summary: 'Ik ben, jij bent, hij is… pour se présenter et décrire.',
    points: [
      {
        title: 'La conjugaison',
        explanation: '**ik ben**, **jij bent / je bent**, **u bent**, **hij / zij / het is**, **wij zijn**, **jullie zijn**, **zij zijn**. Question : on inverse le verbe et le sujet. Avec je, le -t disparaît : « **Ben je** moe ? » (mais « Bent u moe ? »). Négation : **niet** après le verbe (Ik ben niet moe).',
        examples: [
          { en: 'Ik ben Anna en ik ben Belgisch.', fr: 'Je suis Anna et je suis belge.' },
          { en: 'Bent u de buurman?', fr: 'Êtes-vous le voisin ?' },
          { en: 'Wij zijn niet thuis.', fr: 'Nous ne sommes pas à la maison.' },
        ],
        table: { head: ['', 'zijn'], rows: [['ik', 'ben'], ['jij / je', 'bent'], ['hij / zij / het', 'is'], ['wij / jullie / zij', 'zijn']] },
      },
    ],
    exercises: [
      gap('Ik ___ Anna.', ['ben'], 'ik → ben.', { tags: ['nl-order'] }),
      gap('Hij ___ mijn zoon.', ['is'], 'hij → is.', { tags: ['nl-order'] }),
      gap('Wij ___ thuis.', ['zijn'], 'wij → zijn.', { tags: ['nl-order'] }),
      gap('___ je moe? (tu es fatiguée ?)', ['Ben'], 'Question avec je : Ben je… (sans -t).', { tags: ['nl-order'] }),
      gap('___ u de moeder van Emma? (vous)', ['Bent'], 'Avec u : bent.', { tags: ['nl-order'] }),
      fix('Ik is moe.', ['Ik ben moe.'], 'ik → ben (jamais « is »).', { tags: ['nl-order'] }),
      fix('Zij zijn mijn dochter.', ['Zij is mijn dochter.', 'Ze is mijn dochter.'], 'Une seule fille → elle EST : zij is.', { tags: ['nl-order'] }),
      mcq('Que veut dire « Ik ben moe » ?', ['Je suis fatiguée.', 'J’ai faim.', 'Je suis contente.', 'J’ai froid.'], 'moe = fatigué.'),
      tr('Je suis Anna.', ['Ik ben Anna.', 'Ik heet Anna.', 'Mijn naam is Anna.'], 'Pour se présenter : Ik ben… / Ik heet…'),
    ],
  }),
  lesson({
    id: 'nn-g-hebben', order: 4, group: 'structures', title: 'Le verbe hebben : avoir', level: 'A1', tag: 'nl-order',
    summary: 'Ik heb, jij hebt, hij heeft… : la famille, la faim, la soif, le froid.',
    points: [
      {
        title: 'La conjugaison',
        explanation: '**ik heb**, **jij hebt / je hebt**, **u hebt / heeft**, **hij / zij / het heeft**, **wij / jullie / zij hebben**. Question avec je : « **Heb je** een hond ? » (sans -t). Négation : **geen** + nom (Ik heb **geen** auto).',
        examples: [
          { en: 'Ik heb twee kinderen.', fr: 'J’ai deux enfants.' },
          { en: 'Heb je honger?', fr: 'Tu as faim ?' },
          { en: 'Zij heeft een kat.', fr: 'Elle a un chat.' },
        ],
        table: { head: ['', 'hebben'], rows: [['ik', 'heb'], ['jij / je', 'hebt'], ['hij / zij / het', 'heeft'], ['wij / jullie / zij', 'hebben']] },
      },
      {
        title: 'Expressions : faim, soif, froid, chaud',
        explanation: '**Honger hebben** (avoir faim), **dorst hebben** (avoir soif), **het koud hebben** (avoir froid), **het warm hebben** (avoir chaud), **slaap hebben** (avoir sommeil), **zin hebben in** (avoir envie de). Remarquez le « het » devant koud / warm.',
        examples: [
          { en: 'Ik heb honger en dorst.', fr: 'J’ai faim et soif.' },
          { en: 'Heb je het koud? Doe je jas aan.', fr: 'Tu as froid ? Mets ton manteau.' },
        ],
      },
    ],
    exercises: [
      gap('Ik ___ twee zonen.', ['heb'], 'ik → heb.', { tags: ['nl-order'] }),
      gap('Hij ___ een nieuwe fiets.', ['heeft'], 'hij → heeft.', { tags: ['nl-order'] }),
      gap('Wij ___ een kat en een hond.', ['hebben'], 'wij → hebben.', { tags: ['nl-order'] }),
      gap('___ je dorst? (tu as soif ?)', ['Heb'], 'Question avec je : Heb je… (sans -t).', { tags: ['nl-order'] }),
      gap('Mijn dochter heeft ___. (faim)', ['honger'], 'Honger hebben = avoir faim.', { hint: 'faim', tags: ['nl-order'] }),
      fix('Ik hebt een broer.', ['Ik heb een broer.'], 'ik → heb (sans -t).', { tags: ['nl-order'] }),
      fix('Ze hebben een zus. (une seule personne)', ['Ze heeft een zus.', 'Zij heeft een zus.'], 'Une seule personne → heeft.', { tags: ['nl-order'] }),
      tr('J’ai froid.', ['Ik heb het koud.'], 'Avoir froid = het koud hebben.'),
      tr('Nous avons trois enfants.', ['Wij hebben drie kinderen.', 'We hebben drie kinderen.'], 'wij / we → hebben. Enfants = kinderen.'),
    ],
  }),
  lesson({
    id: 'nn-g-articles', order: 5, group: 'mots', title: 'De, het, een : les articles', level: 'A1', tag: 'de-het',
    summary: 'Le, la, un, une… et le grand mystère « de ou het ? ».',
    points: [
      {
        title: 'De, het, een',
        explanation: 'Il y a **deux articles définis** : **de** (masculin et féminin, comme « le / la ») et **het** (neutre, comme « le »). Au **pluriel**, c’est toujours **de**. L’article indéfini est **een** (un / une) pour tous. Environ deux noms sur trois sont des **de-woorden**. Il n’y a pas de règle parfaite : **apprenez chaque nom avec son article** (de hond, het huis).',
        examples: [
          { en: 'de man, de vrouw, de tafel, de auto', fr: 'l’homme, la femme, la table, la voiture' },
          { en: 'het huis, het kind, het boek, het water', fr: 'la maison, l’enfant, le livre, l’eau' },
          { en: 'de huizen, de kinderen', fr: 'les maisons, les enfants (pluriel : toujours de)' },
        ],
      },
      {
        title: 'Quelques repères',
        explanation: 'Tous les **diminutifs** (-je) sont **het** : het huisje, het meisje. Les noms de **langues** : het Nederlands, het Frans. Les **jours, mois, saisons** : de maandag, de zomer. Et **het** sert aussi de pronom neutre : « Het regent » (il pleut), « Het is mooi » (c’est beau).',
        examples: [{ en: 'het meisje, het kindje, het Nederlands', fr: 'la fille, le bébé, le néerlandais' }],
      },
    ],
    exercises: [
      mcq('Quel est l’article de « huis » (maison) ?', ['het huis', 'de huis', 'een huis (seulement)', 'het huisen'], 'Het huis (mais de huizen au pluriel).', { tags: ['de-het'] }),
      mcq('Quel est l’article de « tafel » (table) ?', ['de tafel', 'het tafel', 'het tafels', 'les tafel'], 'De tafel.', { tags: ['de-het'] }),
      mcq('Quel est l’article de « kind » (enfant) ?', ['het kind', 'de kind', 'een kinds', 'de kinds'], 'Het kind (de kinderen au pluriel).', { tags: ['de-het'] }),
      mcq('Quel est l’article de « moeder » (mère) ?', ['de moeder', 'het moeder', 'het moeders', 'de moeden'], 'De moeder.', { tags: ['de-het'] }),
      mcq('Quel est l’article de « meisje » (fille) ?', ['het meisje', 'de meisje', 'de meisjes (singulier)', 'een meisjes'], 'Les diminutifs en -je sont toujours het.', { tags: ['de-het'] }),
      gap('___ auto is nieuw. (la voiture)', ['De'], 'De auto.', { tags: ['de-het'] }),
      gap('___ water is koud. (l’eau)', ['Het'], 'Het water.', { tags: ['de-het'] }),
      gap('Ik heb ___ hond. (un chien)', ['een'], 'Un / une = EEN.', { tags: ['de-het'] }),
      gap('___ kinderen spelen buiten. (les enfants)', ['De'], 'Pluriel = toujours DE.', { tags: ['de-het'] }),
      fix('Ik zie de huis.', ['Ik zie het huis.'], 'Het huis.', { tags: ['de-het'] }),
    ],
  }),
  lesson({
    id: 'nn-g-plural', order: 6, group: 'mots', title: 'Le pluriel : -en et -s', level: 'A1', tag: 'plural',
    summary: 'Deux terminaisons seulement… et quelques petits changements.',
    points: [
      {
        title: '-en (le plus fréquent) et -s',
        explanation: 'Presque tous les noms prennent **-en** : hond → honden, boek → boeken. On ajoute **-s** après **-er, -el, -em, -en, -je** (moeder → moeders, tafel → tafels, meisje → meisjes) et après une **voyelle** en ’s : foto → foto’s, auto → auto’s, baby → baby’s, oma → oma’s. Rappel : au pluriel, c’est **de** (de honden).',
        examples: [
          { en: 'één hond → twee honden', fr: 'un chien → deux chiens' },
          { en: 'één moeder → twee moeders', fr: 'une mère → deux mères' },
          { en: 'één auto → drie auto’s', fr: 'une voiture → trois voitures' },
        ],
      },
      {
        title: 'Petits changements et exceptions utiles',
        explanation: 'Quelques lettres changent : **s → z** (huis → huizen), **f → v** (brief → brieven). Voyelle longue → une lettre (maan → manen). Voyelle courte → consonne doublée (man → mannen). Et quelques pluriels particuliers très utiles : **kind → kinderen** (enfants), **ei → eieren** (œufs), **stad → steden** (villes), **dag → dagen** (jours).',
        examples: [
          { en: 'het huis → de huizen', fr: 'les maisons' },
          { en: 'het kind → de kinderen', fr: 'les enfants' },
          { en: 'de brief → de brieven', fr: 'les lettres' },
        ],
      },
    ],
    exercises: [
      gap('de hond → twee ___', ['honden'], 'Pluriel normal : -en.', { hint: 'pluriel', tags: ['plural'] }),
      gap('het huis → drie ___', ['huizen'], 's → z devant -en : huizen.', { hint: 'pluriel', tags: ['plural'] }),
      gap('het kind → twee ___', ['kinderen'], 'Pluriel particulier : kinderen.', { hint: 'pluriel', tags: ['plural'] }),
      gap('de auto → twee ___', ['auto’s', 'auto\'s', 'autos'], 'Après une voyelle : -’s → auto’s.', { hint: 'pluriel', tags: ['plural'] }),
      gap('de moeder → twee ___', ['moeders'], 'Après -er : -s → moeders.', { hint: 'pluriel', tags: ['plural'] }),
      gap('de tafel → drie ___', ['tafels'], 'Après -el : -s → tafels.', { hint: 'pluriel', tags: ['plural'] }),
      gap('de brief → vier ___', ['brieven'], 'f → v : brieven.', { hint: 'pluriel', tags: ['plural'] }),
      fix('Ik heb twee kind.', ['Ik heb twee kinderen.'], 'Après un nombre > 1 : pluriel → kinderen.', { tags: ['plural'] }),
      fix('De kinders spelen buiten.', ['De kinderen spelen buiten.'], 'Pluriel de kind : kinderen.', { tags: ['plural'] }),
      mcq('Quel est le pluriel de « ei » (œuf) ?', ['eieren', 'eien', 'eis', 'eiers'], 'Pluriel particulier : eieren.', { tags: ['plural'] }),
    ],
  }),
  lesson({
    id: 'nn-g-diminutive', order: 7, group: 'mots', title: 'Le diminutif : -je, -tje, -pje', level: 'A1', tag: 'nl-diminutive',
    summary: 'Het huisje, het kindje, een kusje : le diminutif adoré des Néerlandophones, surtout avec les enfants.',
    points: [
      {
        title: 'Pourquoi c’est si utile',
        explanation: 'En néerlandais, on ajoute **-je** à un nom pour dire « petit » ou pour rendre la chose **mignonne, affectueuse** : **een koekje** (un petit gâteau), **een kusje** (un petit bisou), **een slaapje** (un petit somme). Les diminutifs sont **toujours het**, et leur pluriel est **-s** (de huisjes). On les utilise **tout le temps** avec les enfants et pour être poli : « een kopje koffie ».',
        examples: [
          { en: 'het huis → het huisje', fr: 'la maison → la petite maison' },
          { en: 'de kus → het kusje', fr: 'le bisou → le petit bisou' },
          { en: 'een kopje koffie, een koekje', fr: 'une (petite) tasse de café, un petit gâteau' },
        ],
      },
      {
        title: 'Quelle terminaison ?',
        explanation: '**-je** : le cas normal (huis → huisje, boek → boekje). **-tje** après **l, n, r** précédés d’une voyelle longue ou d’une diphtongue (stoel → stoeltje, trein → treintje, deur → deurtje). **-pje** après **m** précédé d’une voyelle longue (boom → boompje). **-etje** après **l, n, r, m, ng** précédés d’une voyelle **courte** : bal → balletje, man → mannetje, ring → ringetje.',
        examples: [
          { en: 'stoel → stoeltje · boom → boompje · man → mannetje', fr: 'petite chaise · petit arbre · petit bonhomme' },
        ],
      },
    ],
    exercises: [
      gap('het huis → het ___', ['huisje'], 'Cas normal : -je.', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de koek → het ___ (petit gâteau)', ['koekje'], 'Cas normal : -je.', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de kus → het ___ (petit bisou)', ['kusje'], 'Cas normal : -je.', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de stoel → het ___', ['stoeltje'], 'Voyelle longue + l → -tje.', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de boom → het ___', ['boompje'], 'Voyelle longue + m → -pje.', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de man → het ___', ['mannetje'], 'Voyelle courte + n → -etje (et on double le n).', { hint: 'petit', tags: ['nl-diminutive'] }),
      gap('de bal → het ___', ['balletje'], 'Voyelle courte + l → -etje (et on double le l).', { hint: 'petit', tags: ['nl-diminutive'] }),
      mcq('Quel article pour « meisje » ?', ['het', 'de', 'een seulement', 'les'], 'Tous les diminutifs sont het.', { tags: ['de-het'] }),
      mcq('Que veut dire « een kopje thee » ?', ['une tasse de thé', 'une grande théière', 'un thé glacé', 'un thé froid'], 'Kopje = petite tasse (diminutif de kop). On l’emploie par politesse.'),
      tr('Un petit bisou ?', ['Een kusje?', 'Een kusje'], 'Le diminutif : kus → kusje.'),
    ],
  }),
]
