import type { GrammarGroup, GrammarLesson } from '../../types.ts'
import { gap, mcq, fix, translators } from '../theme-builder.ts'
import { lesson } from './lesson.ts'
import { nunuGrammar1 } from './grammar-1.ts'
import { nunuGrammar2 } from './grammar-2.ts'

// Nunu — grammaire, partie 3 : les possessifs, er is / er zijn, les adjectifs, les prépositions, le passé, le futur.

const { to: tr } = translators('néerlandais')

const part3: GrammarLesson[] = [
  lesson({
    id: 'nn-g-possessives', order: 13, group: 'mots', title: 'Mon, ton, son… : mijn, jouw, zijn', level: 'A1', tag: 'nl-pronouns',
    summary: 'Les adjectifs possessifs, et « ons / onze » qui dépend du mot.',
    points: [
      {
        title: 'Les formes',
        explanation: '**mijn** (mon, ma, mes), **jouw / je** (ton, ta, tes), **uw** (votre, poli), **zijn** (son, sa, ses : à lui), **haar** (son, sa, ses : à elle), **ons / onze** (notre, nos), **jullie** (votre, vos : plusieurs personnes), **hun** (leur, leurs). Comme en anglais, on choisit selon le **propriétaire** : sa mère (à lui) = **zijn** moeder ; sa mère (à elle) = **haar** moeder. **Ons** s’emploie devant un **het-woord au singulier** (ons huis) ; **onze** devant un **de-woord** ou un **pluriel** (onze auto, onze kinderen).',
        examples: [
          { en: 'Dit is mijn man en dat is zijn broer.', fr: 'Voici mon mari et voici son frère.' },
          { en: 'Dit is mijn dochter. Haar man heet Tom.', fr: 'Voici ma fille. Son mari s’appelle Tom.' },
          { en: 'Ons huis is klein, maar onze tuin is groot.', fr: 'Notre maison est petite, mais notre jardin est grand.' },
        ],
      },
    ],
    exercises: [
      gap('Dit is ___ zoon. (mon)', ['mijn'], 'Mon = MIJN.', { tags: ['nl-pronouns'] }),
      gap('Hoe heet ___ dochter? (ta, à toi)', ['je', 'jouw'], 'Ta = JE / JOUW.', { tags: ['nl-pronouns'] }),
      gap('Mijn zus heeft een hond. ___ hond is zwart. (sa, à elle)', ['Haar'], 'Sa (à elle) = HAAR.', { tags: ['nl-pronouns'] }),
      gap('Wij hebben een huis. ___ huis is groot. (notre)', ['Ons'], 'Het huis → ons huis.', { tags: ['nl-pronouns'] }),
      gap('Wij hebben een auto. ___ auto is nieuw. (notre)', ['Onze'], 'De auto → onze auto.', { tags: ['nl-pronouns'] }),
      gap('Dat zijn ___ kinderen. (nos)', ['onze'], 'Pluriel → onze.', { tags: ['nl-pronouns'] }),
      fix('Dit is ons auto.', ['Dit is onze auto.'], 'De auto → onze (ons seulement avec un het-woord au singulier).', { tags: ['nl-pronouns'] }),
      tr('C’est notre maison.', ['Dit is ons huis.', 'Dat is ons huis.', 'Het is ons huis.', 'Dit is ons huis'], 'Het huis → ons huis.'),
    ],
  }),
  lesson({
    id: 'nn-g-er-is', order: 14, group: 'structures', title: 'Er is / er zijn : il y a', level: 'A1', tag: 'nl-er',
    summary: 'Il y a un chat dans le jardin : le petit mot « er ».',
    points: [
      {
        title: 'Il y a',
        explanation: '**Er is** + singulier, **er zijn** + pluriel. C’est l’équivalent de « il y a ». Au singulier comme au pluriel, on utilise le verbe **zijn** (jamais « hebben »). Négation : **Er is geen melk** (il n’y a pas de lait). Question : **Is er melk ?** / **Zijn er kinderen ?**',
        examples: [
          { en: 'Er is een kat in de tuin.', fr: 'Il y a un chat dans le jardin.' },
          { en: 'Er zijn twee kinderen op straat.', fr: 'Il y a deux enfants dans la rue.' },
          { en: 'Is er nog melk? — Nee, er is geen melk meer.', fr: 'Y a-t-il encore du lait ? — Non, il n’y a plus de lait.' },
        ],
      },
    ],
    exercises: [
      gap('___ is een hond in de tuin.', ['Er'], 'Il y a = ER IS.', { tags: ['nl-er'] }),
      gap('Er ___ drie kinderen in de kamer. (zijn)', ['zijn'], 'Pluriel → er ZIJN.', { tags: ['nl-er'] }),
      gap('Is er ___ melk? (encore)', ['nog'], 'Nog = encore.', { tags: ['nl-er'] }),
      gap('Er is ___ brood. (pas de)', ['geen'], 'Pas de + nom → geen.', { tags: ['nl-er'] }),
      fix('Het is een hond in de tuin.', ['Er is een hond in de tuin.'], 'Il y a = ER IS (pas « het is »).', { tags: ['nl-er'] }),
      fix('Er heeft twee kinderen in de tuin.', ['Er zijn twee kinderen in de tuin.'], 'Il y a = er zijn (zijn, pas hebben).', { tags: ['nl-er'] }),
      tr('Il y a un bon restaurant ici.', ['Er is hier een goed restaurant.', 'Hier is een goed restaurant.', 'Er is een goed restaurant hier.'], 'Er is + nom.'),
      tr('Il n’y a pas de lait.', ['Er is geen melk.'], 'Er is geen + nom.'),
    ],
  }),
  lesson({
    id: 'nn-g-adjectives', order: 15, group: 'mots', title: 'Les adjectifs : groot, grote, groter', level: 'A2', tag: 'nl-order',
    summary: 'Quand ajouter -e ? Et comment comparer.',
    points: [
      {
        title: 'Avec ou sans -e',
        explanation: 'Après **zijn** (verbe être), l’adjectif ne change pas : **Het huis is groot.** Devant un nom, on ajoute **-e** : **de grote tafel**, **de leuke kinderen**, **het grote huis**. **Exception** : devant un **het-woord singulier avec « een » ou sans article**, pas de -e : **een groot huis**, **groot huis**. (Mais : een grote tafel, une table = de-woord.) Orthographe : **groot → grote** (une seule o), **goed → goede**, **oud → oude**.',
        examples: [
          { en: 'De tafel is groot. → een grote tafel', fr: 'La table est grande. → une grande table' },
          { en: 'Het huis is oud. → een oud huis · het oude huis', fr: 'La maison est vieille. → une vieille maison · la vieille maison' },
        ],
      },
      {
        title: 'Comparer',
        explanation: 'Comparatif : **-er + dan** (groot → groter dan). Superlatif : **-st** (het grootst) ou **de / het + -ste**. Irréguliers : **goed → beter → best**, **veel → meer → meest**, **graag → liever → liefst**. « Aussi… que » : **net zo … als** (net zo groot als).',
        examples: [
          { en: 'Mijn zoon is groter dan mijn dochter.', fr: 'Mon fils est plus grand que ma fille.' },
          { en: 'Dit is de beste soep van de stad.', fr: 'C’est la meilleure soupe de la ville.' },
        ],
      },
    ],
    exercises: [
      gap('Een ___ tafel. (groot — de tafel)', ['grote'], 'De tafel = de-woord → grote.', { tags: ['nl-order'] }),
      gap('Een ___ huis. (groot — het huis)', ['groot'], 'Een + het-woord singulier → pas de -e : groot.', { tags: ['nl-order'] }),
      gap('Het ___ huis is mooi. (oud)', ['oude'], 'Het + adjectif + nom → -e : oude.', { tags: ['nl-order'] }),
      gap('De kinderen zijn ___. (leuk)', ['leuk'], 'Après zijn : pas de -e.', { tags: ['nl-order'] }),
      gap('Mijn zoon is ___ dan mijn dochter. (groot)', ['groter'], 'Comparatif : -er.', { tags: ['nl-order'] }),
      gap('Dit is het ___ restaurant. (goed — le meilleur)', ['beste'], 'goed → beter → best (het beste).', { tags: ['nl-order'] }),
      fix('Een groot tafel.', ['Een grote tafel.'], 'De tafel = de-woord → grote.', { tags: ['nl-order'] }),
      fix('Een grote huis.', ['Een groot huis.'], 'Het huis = het-woord + een → groot (sans -e).', { tags: ['nl-order'] }),
      tr('Le grand chien.', ['De grote hond.'], 'De hond → de grote hond.'),
    ],
  }),
  lesson({
    id: 'nn-g-prepositions', order: 16, group: 'mots', title: 'Les prépositions : in, op, aan, naar, bij…', level: 'A1', tag: 'nl-prepositions',
    summary: 'Où, quand, avec quoi : les petits mots indispensables.',
    points: [
      {
        title: 'Lieu : in, op, aan, bij, naar, uit, van',
        explanation: '**in** (dans, à l’intérieur : in de keuken, in Luik), **op** (sur ; aussi à l’école, au marché : op de tafel, op school), **aan** (à / contre : aan de muur, aan tafel), **bij** (chez / auprès de : bij de dokter, bij mijn moeder), **naar** (vers, à, mouvement : naar school, naar huis, naar de winkel), **uit** (de, hors de : uit België), **van** (de : de la part de, possession : de fiets van mijn zoon). **Thuis** = à la maison, **naar huis** = (aller) à la maison.',
        examples: [
          { en: 'Ik woon in Luik. Ik kom uit België.', fr: 'J’habite à Liège. Je viens de Belgique.' },
          { en: 'Mijn kinderen zijn op school. Ik ga naar school.', fr: 'Mes enfants sont à l’école. Je vais à l’école.' },
          { en: 'Wij eten bij mijn moeder.', fr: 'Nous mangeons chez ma mère.' },
        ],
      },
      {
        title: 'Temps et manière : om, op, in, met',
        explanation: '**om** + heure (om acht uur), **op** + jour (op maandag, op zondag), **in** + mois / saison / année (in juni, in de zomer, in 2024), **met** (avec : met de bus, met mijn man), **voor** (pour, devant, avant : voor de kinderen), **na** (après), **tot** (jusqu’à), **van… tot** (de… à).',
        examples: [
          { en: 'Ik sta om zeven uur op. Op zondag slapen wij lang.', fr: 'Je me lève à sept heures. Le dimanche nous dormons longtemps.' },
          { en: 'Ik ga met de bus naar het werk.', fr: 'Je vais au travail en bus.' },
        ],
      },
    ],
    exercises: [
      gap('Ik woon ___ Luik.', ['in'], 'Une ville → IN.', { tags: ['nl-prepositions'] }),
      gap('Ik kom ___ België.', ['uit'], 'Venir de (pays, ville) → UIT.', { tags: ['nl-prepositions'] }),
      gap('De kinderen zijn ___ school.', ['op'], 'À l’école (lieu) → OP school.', { tags: ['nl-prepositions'] }),
      gap('Ik ga ___ school. (mouvement)', ['naar'], 'Mouvement vers → NAAR.', { tags: ['nl-prepositions'] }),
      gap('Wij gaan ___ de dokter.', ['naar'], 'Aller chez le médecin : naar de dokter.', { tags: ['nl-prepositions'] }),
      gap('Hij is ___ de dokter. (chez)', ['bij'], 'Chez quelqu’un → BIJ.', { tags: ['nl-prepositions'] }),
      gap('Wij eten ___ zes uur. (à)', ['om'], 'À + heure → OM.', { tags: ['nl-prepositions'] }),
      gap('___ maandag werk ik thuis. (le)', ['Op'], 'Jour de la semaine → OP.', { tags: ['nl-prepositions'] }),
      gap('Ik ga ___ de bus naar het werk.', ['met'], 'En bus = MET de bus.', { tags: ['nl-prepositions'] }),
      fix('Ik woon op Luik.', ['Ik woon in Luik.'], 'Une ville → in.', { tags: ['nl-prepositions'] }),
      fix('Ik ga in huis.', ['Ik ga naar huis.'], 'Rentrer à la maison = naar huis.', { tags: ['nl-prepositions'] }),
      tr('Je vais à l’école à vélo.', ['Ik ga met de fiets naar school.', 'Ik ga op de fiets naar school.', 'Ik fiets naar school.', 'Ik ga met de fiets naar school'], 'Naar school + met de fiets (ou : Ik fiets naar school).'),
    ],
  }),
  lesson({
    id: 'nn-g-past', order: 23, group: 'temps', title: 'Le passé : ik heb gewerkt, ik was', level: 'A2', tag: 'past-simple',
    summary: 'Le plus utile à l’oral : « hebben / zijn + participe passé ».',
    points: [
      {
        title: 'Le perfectum : hebben / zijn + participe passé',
        explanation: 'À l’oral, on raconte ce qui s’est passé avec **hebben** (ou **zijn**) conjugué en 2e position, et le **participe passé à la fin** : **Ik heb gisteren gewerkt.** Le participe se forme : **ge- + radical + t ou d** (werken → gewerkt, spelen → gespeeld). Choix t / d : si le radical finit par **t, k, f, s, ch, p** (« **’t kofschip** »), on met **-t** ; sinon **-d**. **Zijn** s’emploie avec les verbes de **mouvement** ou de **changement** : ik **ben** gegaan, ik **ben** gekomen, ik **ben** geweest. Les verbes en **be-, ver-, ont-, her-** n’ajoutent pas ge- (vertellen → verteld).',
        examples: [
          { en: 'Wij hebben koffie gedronken.', fr: 'Nous avons bu du café.' },
          { en: 'Ik ben gisteren naar Gent gegaan.', fr: 'Je suis allée hier à Gand.' },
          { en: 'Hij heeft gewerkt, zij hebben gespeeld.', fr: 'Il a travaillé, ils ont joué.' },
        ],
      },
      {
        title: 'L’imparfait : was, had, ging…',
        explanation: 'Pour les verbes les plus courants, on utilise souvent l’**imparfait** : **ik was / wij waren** (zijn), **ik had / wij hadden** (hebben), **ik kon**, **ik wilde**, **ik moest**, **ik ging / wij gingen**. Pour les verbes réguliers : radical + **-te / -de** (singulier), **-ten / -den** (pluriel) : ik werkte, wij werkten ; ik woonde, wij woonden.',
        examples: [
          { en: 'Gisteren was ik moe. Ik had hoofdpijn.', fr: 'Hier j’étais fatiguée. J’avais mal à la tête.' },
          { en: 'Wij woonden vroeger in Namen.', fr: 'Nous habitions autrefois à Namur.' },
        ],
      },
    ],
    exercises: [
      gap('Ik heb gisteren ___. (werken — participe)', ['gewerkt'], 'werk finit par k → -t : gewerkt.', { tags: ['past-simple'] }),
      gap('Wij hebben samen ___. (spelen — participe)', ['gespeeld'], 'speel finit par l → -d : gespeeld.', { tags: ['past-simple'] }),
      gap('Zij heeft een boek ___. (lezen — participe)', ['gelezen'], 'lezen → gelezen (irrégulier).', { tags: ['past-simple'] }),
      gap('Ik ben naar Gent ___. (gaan — participe)', ['gegaan'], 'gaan → gegaan (avec ZIJN).', { tags: ['past-simple'] }),
      gap('Gisteren ___ ik moe. (zijn — imparfait)', ['was'], 'zijn → was.', { tags: ['past-simple'] }),
      gap('Wij ___ vroeger in Namen. (wonen — imparfait)', ['woonden'], 'Pluriel : radical + den → woonden.', { tags: ['past-simple'] }),
      gap('Ik ___ hoofdpijn gisteren. (hebben — imparfait)', ['had'], 'hebben → had.', { tags: ['past-simple'] }),
      fix('Ik heb gisteren gaan naar Gent.', ['Ik ben gisteren naar Gent gegaan.'], 'Gaan (mouvement) → ik BEN … gegaan, participe à la fin.', { tags: ['past-simple'] }),
      fix('Wij hebben gewerkt koffie.', ['Wij hebben koffie gedronken.', 'We hebben koffie gedronken.'], 'Le participe passé de drinken est gedronken, placé à la fin.', { tags: ['past-simple'] }),
      tr('Hier, j’ai travaillé.', ['Gisteren heb ik gewerkt.', 'Ik heb gisteren gewerkt.'], 'Gisteren heb ik gewerkt : verbe en 2e position, participe à la fin.'),
      tr('Nous avons mangé au restaurant.', ['Wij hebben in een restaurant gegeten.', 'We hebben in een restaurant gegeten.', 'Wij hebben in het restaurant gegeten.', 'We hebben in het restaurant gegeten.', 'Wij hebben in een restaurant gegeten', 'Wij hebben in restaurant gegeten.', 'We hebben in restaurant gegeten.'], 'eten → gegeten.'),
      mcq('Quelle phrase est correcte ? (« Hier, j’ai travaillé. »)', ['Gisteren heb ik gewerkt.', 'Gisteren ik heb gewerkt.', 'Gisteren werkt ik gehad.', 'Gisteren heb ik werken.'], 'Verbe conjugué en 2e position (heb), participe passé à la fin (gewerkt).', { tags: ['past-simple'] }),
    ],
  }),
  lesson({
    id: 'nn-g-future', order: 24, group: 'temps', title: 'Le futur : gaan, zullen, et le présent', level: 'A2', tag: 'future',
    summary: 'Pour parler de demain : le plus simple est le présent + « morgen ».',
    points: [
      {
        title: 'Trois façons de parler de l’avenir',
        explanation: '**1) Le présent + un mot de temps** (très courant) : **Morgen werk ik thuis.** **2) gaan + infinitif** (projet, intention) : **Ik ga morgen naar Gent.** L’infinitif se place **à la fin**. **3) zullen** (prédiction, proposition) : **Het zal regenen** (il pleuvra) ; **Zullen we koffie drinken ?** (si on prenait un café ?).',
        examples: [
          { en: 'Morgen gaan wij naar het zwembad.', fr: 'Demain nous allons à la piscine.' },
          { en: 'Ik ga een taart bakken.', fr: 'Je vais faire un gâteau.' },
          { en: 'Zullen we een wandeling maken?', fr: 'Si on faisait une promenade ?' },
        ],
      },
    ],
    exercises: [
      gap('Morgen ___ ik naar Gent. (gaan)', ['ga'], 'Verbe en 2e position : ga ik.', { tags: ['future'] }),
      gap('Wij gaan morgen koffie ___. (drinken)', ['drinken'], 'L’infinitif à la fin : drinken.', { tags: ['future'] }),
      gap('Ik ga een taart ___. (bakken)', ['bakken'], 'gaan + … + infinitif à la fin.', { tags: ['future'] }),
      gap('___ we een wandeling maken? (si on…)', ['Zullen'], 'Zullen we… ? = si on… ?', { tags: ['future'] }),
      fix('Ik ga morgen werken naar Gent.', ['Ik ga morgen naar Gent.'], 'On ne dit pas « werken » ici : Ik ga morgen naar Gent.', { tags: ['future'] }),
      fix('Morgen ik ga naar de markt.', ['Morgen ga ik naar de markt.'], 'Verbe en 2e position.', { tags: ['future'] }),
      tr('Demain, nous allons au parc.', ['Morgen gaan wij naar het park.', 'Morgen gaan we naar het park.', 'Morgen gaan wij naar de speeltuin.', 'Morgen gaan we naar de speeltuin.', 'Wij gaan morgen naar het park.', 'We gaan morgen naar het park.'], 'Morgen gaan wij naar het park.'),
      tr('Si on prenait un café ?', ['Zullen we koffie drinken?', 'Zullen we een koffie drinken?', 'Zullen we een kopje koffie drinken?', 'Zullen we koffie gaan drinken?'], 'Zullen we… ? = si on… ?'),
    ],
  }),
]

export const nunuGrammarLessons: GrammarLesson[] = [...nunuGrammar1, ...nunuGrammar2, ...part3]

export const nunuGrammarGroups: { id: GrammarGroup; title: string; icon: string; description: string }[] = [
  { id: 'temps', title: 'Les verbes', icon: '⏳', description: 'Présent, passé, futur, verbes séparables.' },
  { id: 'structures', title: 'Les phrases', icon: '🧱', description: 'Être, avoir, ordre des mots, négation, questions, modaux.' },
  { id: 'mots', title: 'Les mots', icon: '🔤', description: 'Sons, pronoms, de / het, pluriels, diminutifs, prépositions.' },
]
