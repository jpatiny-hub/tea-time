import type { GrammarGroup, GrammarLesson, GrammarPoint, Level } from '../../types.ts'
import { gap, mcq, fix, translators, withIds, type ExDraft } from '../theme-builder.ts'

// Accès Maman (anglais A1 → A2/B1) : les bases de la grammaire, expliquées simplement,
// avec des exemples de la vie de tous les jours. Chaque leçon a ses exercices.
// ⚠️ Ids des exercices = position : toujours AJOUTER À LA FIN d'une leçon (voir theme-builder.ts).

const { to: tr } = translators('anglais')

interface LessonDef {
  id: string
  order: number
  group: GrammarGroup
  title: string
  level: Level
  summary: string
  tag: string
  points: GrammarPoint[]
  exercises: ExDraft[]
}

const lesson = (d: LessonDef): GrammarLesson => ({
  id: d.id, order: d.order, group: d.group, title: d.title, level: d.level, summary: d.summary, tag: d.tag, points: d.points,
  exercises: withIds(d.id, d.exercises, d.level),
})

export const mamanGrammarLessons: GrammarLesson[] = [
  // ======================================================================= LES BASES
  lesson({
    id: 'mm-g-be', order: 1, group: 'structures', title: 'To be : am, is, are', level: 'A1', tag: 'be',
    summary: 'Le verbe « être » : se présenter, dire son âge, ce qu’on ressent.',
    points: [
      {
        title: 'Les formes',
        explanation: '**I am**, **you are**, **he / she / it is**, **we are**, **they are**. À l’oral et dans les messages, on contracte : I’m, you’re, he’s, she’s, it’s, we’re, they’re. Négatif : **not** (I’m not, she isn’t, they aren’t). Question : on **inverse** (Are you ready? Is she at home?).',
        examples: [
          { en: 'I’m Anne. I’m from Belgium.', fr: 'Je m’appelle Anne. Je viens de Belgique.' },
          { en: 'The shops are open today.', fr: 'Les magasins sont ouverts aujourd’hui.' },
          { en: 'Is your sister at home?', fr: 'Ta sœur est-elle à la maison ?' },
        ],
        table: { head: ['', 'Affirmatif', 'Négatif', 'Question'], rows: [['I', 'I’m', 'I’m not', 'Am I…?'], ['you / we / they', 'you’re', 'you aren’t', 'Are you…?'], ['he / she / it', 'she’s', 'she isn’t', 'Is she…?']] },
      },
      {
        title: 'En français on « a », en anglais on « est »',
        explanation: 'L’âge, la faim, la soif, le froid, le chaud, la peur, la chance : on utilise **be**, jamais « have ». I’m 62. I’m hungry. I’m cold. I’m afraid of spiders.',
        examples: [
          { en: 'I’m 62 years old.', fr: 'J’ai 62 ans.' },
          { en: 'Are you cold? I’m a bit hot.', fr: 'Tu as froid ? Moi, j’ai un peu chaud.' },
        ],
      },
    ],
    exercises: [
      gap('I ___ very happy today.', ['am', '’m', "'m"], 'Rappel : I → am.'),
      gap('Our neighbours ___ very kind.', ['are'], 'Rappel : they / les voisins → are.'),
      gap('My husband ___ at work at the moment.', ['is', '’s', "'s"], 'Rappel : he → is.'),
      gap('___ you tired? — No, I’m fine.', ['Are'], 'Question : on inverse → Are you…?'),
      gap('The soup ___ hot! Be careful.', ['is', '’s', "'s"], 'Rappel : it → is.'),
      mcq('Comment dit-on « J’ai froid » ?', ['I’m cold.', 'I have cold.', 'I have cold feelings.', 'I am the cold.'], 'On dit I AM cold : le froid, le chaud, la faim… se disent avec BE.'),
      fix('I have 62 years.', ['I am 62.', 'I’m 62.', 'I am 62 years old.', 'I’m 62 years old.'], 'L’âge se dit avec BE : I’m 62.'),
      fix('She not is at home.', ['She isn’t at home.', 'She is not at home.', 'She’s not at home.'], 'Le négatif de be : is NOT / isn’t, après le verbe.'),
      tr('Nous sommes très contents.', ['We are very happy.', 'We’re very happy.', 'We are very glad.', 'We’re very glad.']),
      tr('Où est la gare ?', ['Where is the station?', 'Where’s the station?', 'Where is the train station?', 'Where’s the train station?']),
    ],
  }),
  lesson({
    id: 'mm-g-have', order: 2, group: 'structures', title: 'Have / have got', level: 'A1', tag: 'have',
    summary: 'Avoir, posséder… et manger, boire, prendre : « have breakfast ».',
    points: [
      {
        title: 'Posséder',
        explanation: '**I / you / we / they have**, **he / she / it has**. En anglais britannique, on dit souvent **have got** (I’ve got, she’s got). Négatif : don’t have / haven’t got. Question : Do you have…? / Have you got…?',
        examples: [
          { en: 'I have two grandchildren.', fr: 'J’ai deux petits-enfants.' },
          { en: 'She has a lovely garden.', fr: 'Elle a un joli jardin.' },
          { en: 'Have you got a pen?', fr: 'Tu as un stylo ?' },
        ],
      },
      {
        title: 'Have = manger, boire, prendre',
        explanation: '**Have** s’utilise aussi pour les repas et les activités : have breakfast, have a coffee, have a shower, have a good time, have a look. Dans ce cas, pas de « have got », et on fait la question avec **do**.',
        examples: [
          { en: 'We have lunch at noon.', fr: 'Nous déjeunons à midi.' },
          { en: 'Do you have a shower in the morning?', fr: 'Tu prends une douche le matin ?' },
        ],
      },
    ],
    exercises: [
      gap('My sister ___ a very big family.', ['has', 'has got', '’s got', "'s got"], 'Rappel : he / she / it → HAS.'),
      gap('We ___ two cats and a dog.', ['have', 'have got', '’ve got', "'ve got"], 'Rappel : we → have.'),
      gap('I ___ (not) a car. I take the bus.', ['don’t have', "don't have", 'do not have', 'haven’t got', "haven't got", 'have not got'], 'Négatif : don’t have ou haven’t got.', { hint: 'négatif' }),
      gap('___ you have any brothers or sisters?', ['Do'], 'Question avec have : Do you have…?'),
      gap('What time do you ___ breakfast?', ['have'], 'Les repas se disent avec HAVE : have breakfast / lunch / dinner.'),
      fix('She have a new bike.', ['She has a new bike.', 'She’s got a new bike.', 'She has got a new bike.'], 'Avec she / he / it : HAS.'),
      fix('We eat lunch at one o’clock every day.', ['We have lunch at one o’clock every day.', 'We have lunch at one every day.'], 'On préfère « have lunch » : have = prendre un repas.'),
      tr('Tu as des animaux ?', ['Do you have any pets?', 'Have you got any pets?', 'Have you any pets?']),
      tr('Je prends un café.', ['I’m having a coffee.', 'I am having a coffee.', 'I have a coffee.', 'I’ll have a coffee.']),
    ],
  }),
  lesson({
    id: 'mm-g-articles', order: 3, group: 'mots', title: 'A, an, the — pluriels — this, that', level: 'A1', tag: 'articles',
    summary: 'Un, une, le, la, les · le pluriel · celui-ci, celui-là.',
    points: [
      {
        title: 'A / an / the',
        explanation: '**a** devant un son consonne (a book, a house), **an** devant un son voyelle (an apple, an egg, an hour — le « h » est muet). **the** = le / la / les, pour une chose précise qu’on connaît déjà. Pour parler de quelque chose en général, **pas d’article** : I like coffee. Children need love.',
        examples: [
          { en: 'I bought a book and an umbrella.', fr: 'J’ai acheté un livre et un parapluie.' },
          { en: 'The book is on the table.', fr: 'Le livre est sur la table.' },
          { en: 'I love flowers.', fr: 'J’aime les fleurs (en général).' },
        ],
      },
      {
        title: 'Le pluriel',
        explanation: '**-s** (cat → cats), **-es** après s, sh, ch, x (box → boxes), **-ies** après consonne + y (baby → babies). Irréguliers à connaître : **man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice, person → people**. Ne changent pas : sheep, fish.',
        examples: [
          { en: 'two boxes, three babies, four children' },
          { en: 'These people are very friendly.', fr: 'Ces gens sont très sympathiques.' },
        ],
      },
      {
        title: 'This / that / these / those',
        explanation: '**this / these** : proche de moi. **that / those** : plus loin. This is my house. Those are my neighbours.',
        examples: [
          { en: 'Can I try this one, please?', fr: 'Je peux essayer celui-ci, s’il vous plaît ?' },
          { en: 'Who are those women over there?', fr: 'Qui sont ces femmes, là-bas ?' },
        ],
      },
    ],
    exercises: [
      gap('I’d like ___ orange, please.', ['an'], 'Rappel : son voyelle → AN.'),
      gap('She is ___ teacher at the local school.', ['a'], 'Un métier prend « a » : she is a teacher.'),
      gap('We waited for ___ hour.', ['an'], 'Le « h » de hour est muet → AN hour.'),
      gap('one child, three ___', ['children'], 'child → children (irrégulier).'),
      gap('one family, two ___', ['families'], 'consonne + y → -ies.'),
      gap('one man, two ___', ['men'], 'man → men (irrégulier).'),
      gap('___ are my keys, over there. (loin)', ['Those'], 'Loin → THOSE (these est pour ce qui est proche).', { hint: 'les clés sont loin' }),
      fix('I have two sheeps and three fishes.', ['I have two sheep and three fish.', 'I’ve got two sheep and three fish.'], 'Sheep et fish ne changent pas au pluriel.'),
      fix('The life is expensive in this city.', ['Life is expensive in this city.'], 'En général : pas d’article (life, money, love, people…).'),
      tr('Une pomme et un oignon.', ['An apple and an onion.', 'An apple and an onion']),
    ],
  }),
  lesson({
    id: 'mm-g-pronouns', order: 4, group: 'mots', title: 'Pronoms et possessifs : I / me / my / mine', level: 'A1', tag: 'pronouns',
    summary: 'Sujet, complément, possessif… et le « ’s » pour dire « de ».',
    points: [
      {
        title: 'Sujet, complément, possessif',
        explanation: 'Sujet : I, you, he, she, it, we, they. Complément (après un verbe ou une préposition) : **me, you, him, her, it, us, them**. Adjectif possessif (avant un nom) : **my, your, his, her, its, our, their**. En anglais, on choisit selon le PROPRIÉTAIRE : sa mère (à lui) = his mother ; sa mère (à elle) = her mother.',
        examples: [
          { en: 'Can you help me? I’m calling my son.', fr: 'Tu peux m’aider ? J’appelle mon fils.' },
          { en: 'We love them and they love us.', fr: 'Nous les aimons et ils nous aiment.' },
        ],
        table: { head: ['Sujet', 'Complément', 'Possessif'], rows: [['I', 'me', 'my'], ['you', 'you', 'your'], ['he / she', 'him / her', 'his / her'], ['we', 'us', 'our'], ['they', 'them', 'their']] },
      },
      {
        title: 'Le ’s : « de »',
        explanation: 'Pour une personne ou un animal : **le propriétaire + ’s + la chose**. Le chien de ma sœur = my sister’s dog. Pluriel en -s : l’apostrophe seule (my parents’ house).',
        examples: [{ en: 'This is my daughter’s husband.', fr: 'Voici le mari de ma fille.' }],
      },
    ],
    exercises: [
      gap('Can you help ___, please? I can’t find my glasses.', ['me'], 'Complément de « help » → ME.'),
      gap('I love my grandchildren and I see ___ every week.', ['them'], 'Les petits-enfants (pluriel) → THEM.'),
      gap('This is my sister. ___ husband is a doctor.', ['Her'], 'Le mari de ma sœur (une femme) → HER.'),
      gap('Paul and I live here with ___ children.', ['our'], 'Paul et moi → OUR children.'),
      gap('The cat is licking ___ paws.', ['its'], 'Pour un animal ou une chose : ITS (sans apostrophe).'),
      fix('My sister loves his cat very much. (the cat is hers)', ['My sister loves her cat very much.'], 'Le chat de ma sœur → HER cat.'),
      fix('Its my brother’s car.', ['It’s my brother’s car.', 'It is my brother’s car.'], 'It’s (= it is) prend une apostrophe ; its (possessif) n’en a pas.'),
      tr('La maison de mes parents est grande.', ['My parents’ house is big.', 'My parents’ house is large.', 'My parents’ house is very big.']),
      tr('Je te l’ai dit, à toi et à elle.', ['I told you and her.', 'I told it to you and her.']),
    ],
  }),
  lesson({
    id: 'mm-g-there-is', order: 5, group: 'structures', title: 'There is / there are — some, any', level: 'A1', tag: 'there-is',
    summary: 'Dire ce qu’il y a quelque part.',
    points: [
      {
        title: 'Il y a…',
        explanation: '**There is** (there’s) + singulier ; **there are** + pluriel. Négatif : there isn’t / there aren’t. Question : **Is there…? Are there…?** On emploie **some** dans une phrase affirmative et **any** dans une question ou une phrase négative.',
        examples: [
          { en: 'There’s a bakery near my house.', fr: 'Il y a une boulangerie près de chez moi.' },
          { en: 'There are some apples in the bowl.', fr: 'Il y a des pommes dans le saladier.' },
          { en: 'Is there any milk? — No, there isn’t any.', fr: 'Il y a du lait ? — Non, il n’y en a pas.' },
        ],
      },
    ],
    exercises: [
      gap('There ___ a market in the town every Saturday.', ['is', '’s', "'s"], 'Un seul marché → there IS.'),
      gap('There ___ three bedrooms in my flat.', ['are'], 'Pluriel → there ARE.'),
      gap('Is there ___ bread left?', ['any'], 'Question → ANY.'),
      gap('There isn’t ___ sugar in the cupboard.', ['any'], 'Négatif → ANY.'),
      gap('There are ___ flowers in the garden. They’re beautiful!', ['some'], 'Affirmatif → SOME.'),
      fix('It has a big park in this town.', ['There is a big park in this town.', 'There’s a big park in this town.'], '« Il y a » = THERE IS (✗ it has).'),
      fix('Are there a post office near here?', ['Is there a post office near here?'], 'Singulier → IS there.'),
      tr('Il y a un bon restaurant au coin de la rue.', ['There is a good restaurant on the corner.', 'There’s a good restaurant on the corner.', 'There is a good restaurant around the corner.', 'There’s a good restaurant around the corner.']),
    ],
  }),
  lesson({
    id: 'mm-g-countable', order: 6, group: 'mots', title: 'Much, many, a lot of, a few, a little', level: 'A2', tag: 'countable',
    summary: 'Parler de quantités : compter ou pas ?',
    points: [
      {
        title: 'Dénombrable ou indénombrable ?',
        explanation: 'On compte les **apples, books, people** (dénombrables : many, a few, how many). On ne compte pas **water, money, time, information, bread** (indénombrables : much, a little, how much). **A lot of** marche avec les deux. Dans une phrase affirmative, on préfère **a lot of** à much / many.',
        examples: [
          { en: 'How many eggs do we need? — Six.', fr: 'Combien d’œufs faut-il ? — Six.' },
          { en: 'How much sugar do you want? — Just a little.', fr: 'Combien de sucre ? — Juste un peu.' },
          { en: 'We have a lot of time.', fr: 'Nous avons beaucoup de temps.' },
        ],
      },
    ],
    exercises: [
      gap('How ___ money do you need?', ['much'], 'Money est indénombrable → MUCH.'),
      gap('How ___ people are coming to dinner?', ['many'], 'People se compte → MANY.'),
      gap('I only have ___ few friends here.', ['a'], 'A few = quelques (dénombrable).'),
      gap('Would you like some milk? — Just ___ little, please.', ['a'], 'A little = un peu (indénombrable).'),
      gap('We don’t have ___ time. Hurry up!', ['much', 'a lot of', 'any'], 'Négatif : much (ou any). A lot of marche aussi.'),
      fix('I have many work to do today.', ['I have a lot of work to do today.', 'I have much work to do today.', 'I have lots of work to do today.'], 'Work est indénombrable : pas « many ». Dites a lot of work.'),
      fix('She gave me many informations.', ['She gave me a lot of information.', 'She gave me much information.', 'She gave me lots of information.'], 'Information est indénombrable : pas de -s, pas « many ».'),
      tr('Il y a beaucoup de monde en ville aujourd’hui.', ['There are a lot of people in town today.', 'There are lots of people in town today.', 'There are many people in town today.', 'There are a lot of people in the town today.']),
    ],
  }),
  lesson({
    id: 'mm-g-prep-place', order: 7, group: 'mots', title: 'Prépositions de lieu : in, on, at, next to…', level: 'A1', tag: 'prepositions',
    summary: 'Dire où sont les choses et les gens.',
    points: [
      {
        title: 'In, on, at',
        explanation: '**in** = dans, à l’intérieur (in the kitchen, in Belgium, in a car). **on** = sur, sur une surface ou une ligne (on the table, on the wall, on the first floor, on the bus). **at** = à un endroit précis (at home, at work, at the station, at the door).',
        examples: [
          { en: 'The keys are in my bag.', fr: 'Les clés sont dans mon sac.' },
          { en: 'There’s a picture on the wall.', fr: 'Il y a un tableau au mur.' },
          { en: 'I’m at the bus stop.', fr: 'Je suis à l’arrêt de bus.' },
        ],
      },
      {
        title: 'Pour se repérer',
        explanation: '**next to** (à côté de), **between** (entre), **in front of** (devant), **behind** (derrière), **opposite** (en face de), **near** (près de), **under** (sous), **above** (au-dessus).',
        examples: [{ en: 'The pharmacy is opposite the bank, next to the café.', fr: 'La pharmacie est en face de la banque, à côté du café.' }],
      },
    ],
    exercises: [
      gap('My glasses are ___ the table.', ['on'], 'Sur une surface → ON.'),
      gap('She lives ___ Brussels.', ['in'], 'Une ville, un pays → IN.'),
      gap('I’ll wait for you ___ the station.', ['at'], 'Un endroit précis → AT.'),
      gap('The post office is ___ the bank and the library.', ['between'], 'Entre deux choses → BETWEEN.'),
      gap('The school is ___ the church. (en face)', ['opposite'], 'En face de → OPPOSITE.', { hint: 'en face de' }),
      gap('We live ___ the second floor.', ['on'], 'Un étage : ON the second floor.'),
      fix('I’m in home all afternoon.', ['I’m at home all afternoon.', 'I am at home all afternoon.', 'I’m home all afternoon.'], '« À la maison » = AT home (✗ in home).'),
      fix('She is waiting you in front the shop.', ['She is waiting for you in front of the shop.', 'She’s waiting for you in front of the shop.'], 'Wait FOR someone ; in front OF.'),
      tr('Le chat est sous la table.', ['The cat is under the table.', 'The cat’s under the table.']),
    ],
  }),
  lesson({
    id: 'mm-g-prep-time', order: 8, group: 'mots', title: 'Prépositions de temps : at, on, in, for, since, ago…', level: 'A2', tag: 'prepositions',
    summary: 'L’heure, le jour, le mois… et la durée.',
    points: [
      {
        title: 'At, on, in',
        explanation: '**at** + heure ou moment précis (at 8 o’clock, at noon, at night, at the weekend). **on** + jour ou date (on Monday, on 5 May, on my birthday). **in** + mois, saison, année, moment de la journée (in June, in winter, in 2024, in the morning).',
        examples: [
          { en: 'I get up at 7 and go shopping on Saturdays.', fr: 'Je me lève à 7 h et je fais les courses le samedi.' },
          { en: 'My birthday is in March.', fr: 'Mon anniversaire est en mars.' },
        ],
      },
      {
        title: 'Durée : for, since, ago, during',
        explanation: '**for** + durée (for two hours, for ten years). **since** + point de départ (since 2015, since Monday). **ago** + durée, pour le passé (two years ago). **during** + un événement (during the holidays).',
        examples: [
          { en: 'I’ve lived here for twenty years, since 2005.', fr: 'J’habite ici depuis vingt ans, depuis 2005.' },
          { en: 'We moved here five years ago.', fr: 'Nous avons emménagé ici il y a cinq ans.' },
        ],
      },
    ],
    exercises: [
      gap('The shop opens ___ nine o’clock.', ['at'], 'Une heure → AT.'),
      gap('We usually visit my mother ___ Sundays.', ['on'], 'Un jour → ON.'),
      gap('It is very hot ___ August.', ['in'], 'Un mois → IN.'),
      gap('I’ve known her ___ 1998.', ['since'], 'Une année de départ → SINCE.'),
      gap('We’ve been married ___ thirty years.', ['for'], 'Une durée → FOR.'),
      gap('He moved to Spain three years ___.', ['ago'], 'ago se place à la fin : three years AGO.'),
      gap('I read a lot ___ the holidays.', ['during'], 'Pendant un événement → DURING.'),
      fix('I get up in 7 o’clock on the morning.', ['I get up at 7 o’clock in the morning.', 'I get up at seven in the morning.', 'I get up at 7 in the morning.'], 'At + heure ; in the morning.'),
      fix('I live here since ten years.', ['I have lived here for ten years.', 'I’ve lived here for ten years.', 'I have lived here since ten years ago.'], 'Durée → FOR (since = point de départ). Et on utilise le present perfect.'),
      tr('Elle est née en 1960, au mois de mai.', ['She was born in 1960, in May.', 'She was born in May 1960.', 'She was born in May, 1960.']),
    ],
  }),
  lesson({
    id: 'mm-g-questions', order: 9, group: 'structures', title: 'Poser des questions', level: 'A1', tag: 'questions',
    summary: 'What, where, when, who, why, how… et la place des mots.',
    points: [
      {
        title: 'Les mots interrogatifs',
        explanation: '**What** (quoi, quel), **Where** (où), **When** (quand), **Who** (qui), **Why** (pourquoi), **How** (comment), **Which** (lequel), **Whose** (à qui). Avec how : **How much** (prix, quantité indénombrable), **How many** (nombre), **How old**, **How long**, **How often**.',
        examples: [
          { en: 'How much is this scarf?', fr: 'Combien coûte ce foulard ?' },
          { en: 'How often do you call your daughter?', fr: 'À quelle fréquence appelles-tu ta fille ?' },
        ],
      },
      {
        title: 'L’ordre des mots',
        explanation: 'Mot interrogatif + **auxiliaire** (do / does / did, be, have, can…) + **sujet** + verbe. Au présent simple : **do / does**. Au passé simple : **did** (et le verbe reprend sa forme de base). Pour poser une question sur le **sujet** (« qui a fait… ? »), pas d’auxiliaire : Who lives here? Attention à la préposition qui reste **à la fin** : Who are you talking to?',
        examples: [
          { en: 'Where does your son live?', fr: 'Où habite ton fils ?', note: '✗ Where your son lives?' },
          { en: 'What did you buy? — Who told you?' },
          { en: 'Who are you waiting for?', fr: 'Qui attends-tu ?' },
        ],
      },
    ],
    exercises: [
      gap('___ do you live? — In Liège.', ['Where'], 'Un lieu → WHERE.'),
      gap('___ old is your dog? — Seven.', ['How'], 'L’âge → HOW old.'),
      gap('How ___ does a ticket cost?', ['much'], 'Un prix → HOW MUCH.'),
      gap('Where ___ your sister work?', ['does'], 'she → DOES.'),
      gap('What time ___ you get up yesterday?', ['did'], 'Passé → DID (+ verbe de base).'),
      gap('___ are you talking to? — To my neighbour.', ['Who'], 'Qui → WHO (et la préposition TO reste à la fin).'),
      fix('Where lives your brother?', ['Where does your brother live?'], 'Il faut l’auxiliaire DOES + sujet + verbe de base.'),
      fix('What you want for dinner?', ['What do you want for dinner?'], 'Il manque l’auxiliaire DO.'),
      fix('Did you went to the market?', ['Did you go to the market?'], 'Après DID, le verbe reprend sa forme de base (go).'),
      tr('À quelle heure ouvre la pharmacie ?', ['What time does the pharmacy open?', 'When does the pharmacy open?', 'What time does the chemist open?', 'What time does the chemist’s open?']),
    ],
  }),
  lesson({
    id: 'mm-g-modals', order: 10, group: 'structures', title: 'Can, must, have to, should', level: 'A1', tag: 'can',
    summary: 'Pouvoir, devoir, il faut : ce qu’on sait faire, ce qu’on doit faire.',
    points: [
      {
        title: 'Can / can’t / could',
        explanation: '**can** + verbe (sans « to » et sans -s) : I can drive. Négatif : **can’t**. Question : Can you…? Pour demander poliment : **Could you…? Could I…?** Passé de can : **could** (I could swim when I was six).',
        examples: [
          { en: 'She can speak three languages.', fr: 'Elle parle trois langues.' },
          { en: 'Could you open the window, please?', fr: 'Pourriez-vous ouvrir la fenêtre, s’il vous plaît ?' },
        ],
      },
      {
        title: 'Must, have to, should',
        explanation: '**have to** = il faut, je suis obligé (I have to go). **must** = obligation forte, souvent règle ou conseil appuyé (You must wear a seat belt). **mustn’t** = interdit ! **don’t have to** = ce n’est pas obligatoire (≠ mustn’t). **should** = il vaudrait mieux, conseil (You should see a doctor).',
        examples: [
          { en: 'You mustn’t park here. It’s forbidden.', fr: 'Vous ne devez pas vous garer ici.' },
          { en: 'You don’t have to come. It’s optional.', fr: 'Tu n’es pas obligé de venir.' },
          { en: 'You should drink more water.', fr: 'Tu devrais boire plus d’eau.' },
        ],
      },
    ],
    exercises: [
      fix('He cans play the piano very well.', ['He can play the piano very well.'], 'CAN ne prend jamais de -s.'),
      fix('I can to speak a little English.', ['I can speak a little English.'], 'Après CAN : le verbe SANS « to ».'),
      gap('You ___ drive on the left in England. (obligation)', ['must', 'have to'], 'Une règle → must / have to.'),
      gap('You ___ smoke here. It’s forbidden.', ['mustn’t', "mustn't", 'must not', 'can’t', "can't", 'cannot'], 'Interdit → mustn’t (ou can’t).'),
      gap('You ___ come early. The meeting is at ten. (pas obligé)', ['don’t have to', "don't have to", 'do not have to'], 'Pas obligatoire → don’t have to.', { hint: 'pas obligé' }),
      gap('You look tired. You ___ go to bed early.', ['should'], 'Un conseil → SHOULD.'),
      mcq('Quelle phrase veut dire « Tu n’es pas obligé de venir » ?', ['You don’t have to come.', 'You mustn’t come.', 'You can’t come.', 'You shouldn’t come.'], 'mustn’t = interdit ; don’t have to = pas obligatoire.'),
      tr('Pourriez-vous m’aider, s’il vous plaît ?', ['Could you help me, please?', 'Can you help me, please?', 'Could you give me a hand, please?']),
    ],
  }),
  // ======================================================================= LES TEMPS
  lesson({
    id: 'mm-g-present-simple', order: 20, group: 'temps', title: 'Le present simple', level: 'A1', tag: 'present',
    summary: 'Les habitudes, les faits, ce qu’on fait d’habitude.',
    points: [
      {
        title: 'La forme',
        explanation: 'Le verbe de base avec I / you / we / they. **Avec he / she / it : on ajoute -s** (works), **-es** après s, sh, ch, x, o (watches, goes), **-ies** après consonne + y (studies). Négatif : **don’t / doesn’t + verbe de base** (pas de -s : she doesn’t work). Question : **Do / Does + sujet + verbe de base**.',
        examples: [
          { en: 'I walk to the shops every morning.', fr: 'Je vais à pied aux magasins chaque matin.' },
          { en: 'My husband works in a factory.', fr: 'Mon mari travaille dans une usine.' },
          { en: 'She doesn’t like coffee. Does she like tea?', fr: 'Elle n’aime pas le café. Aime-t-elle le thé ?' },
        ],
      },
      {
        title: 'Quand l’utiliser',
        explanation: 'Pour les **habitudes** et les **vérités**. Mots fréquents : **always, usually, often, sometimes, never** (avant le verbe, après be), **every day, on Mondays, once a week**.',
        examples: [
          { en: 'We always have dinner at seven.', fr: 'Nous dînons toujours à sept heures.' },
          { en: 'The shops close at six.', fr: 'Les magasins ferment à dix-huit heures.' },
        ],
      },
    ],
    exercises: [
      gap('My neighbour ___ in the garden every evening.', ['works', 'sits', 'walks'], 'Rappel : he / she / it → verbe + S.', { hint: 'work' }),
      gap('The children ___ to school by bus.', ['go'], 'Pluriel (they) : pas de -s.', { hint: 'go' }),
      gap('He ___ his teeth twice a day.', ['brushes'], 'Après -sh → -ES.', { hint: 'brush' }),
      gap('She ___ (not) like loud music.', ['doesn’t', "doesn't", 'does not'], 'Négatif avec she → doesn’t + verbe de base.', { hint: 'négatif' }),
      gap('___ your son live near you?', ['Does'], 'Question avec he → Does + verbe de base.'),
      gap('I ___ drink coffee in the evening. It keeps me awake. (jamais)', ['never'], 'Never se place avant le verbe.', { hint: 'jamais' }),
      fix('She go to the market on Saturdays.', ['She goes to the market on Saturdays.'], 'she / he / it → GOES.'),
      fix('He doesn’t likes fish.', ['He doesn’t like fish.', 'He does not like fish.'], 'Après doesn’t, le verbe est à la forme de base (pas de -s).'),
      fix('I go always to the bakery in the morning.', ['I always go to the bakery in the morning.'], 'L’adverbe de fréquence se place AVANT le verbe.'),
      tr('Mon frère habite près de la mer.', ['My brother lives near the sea.', 'My brother lives by the sea.', 'My brother lives close to the sea.']),
    ],
  }),
  lesson({
    id: 'mm-g-present-continuous', order: 21, group: 'temps', title: 'Le present continuous', level: 'A1', tag: 'present',
    summary: 'Ce qui se passe maintenant : I’m cooking.',
    points: [
      {
        title: 'La forme : am / is / are + verbe-ing',
        explanation: 'I’m cooking, she’s reading, they’re waiting. Orthographe : make → making (on enlève le e), sit → sitting (on double la consonne), lie → lying. Négatif : I’m not cooking. Question : Are you cooking?',
        examples: [
          { en: 'I’m making soup at the moment.', fr: 'Je fais de la soupe en ce moment.' },
          { en: 'Look! It’s raining.', fr: 'Regarde ! Il pleut.' },
          { en: 'What are you doing?', fr: 'Que fais-tu ?' },
        ],
      },
      {
        title: 'Quand l’utiliser',
        explanation: 'Pour une action **en cours maintenant** (now, at the moment, look!, listen!) ou une situation **temporaire** (this week, these days). On l’emploie aussi pour un **projet proche et prévu** : I’m seeing the doctor tomorrow.',
        examples: [{ en: 'We’re staying with friends this week.', fr: 'Nous logeons chez des amis cette semaine.' }],
      },
    ],
    exercises: [
      gap('Be quiet! The baby ___.', ['is sleeping', '’s sleeping', "'s sleeping"], 'Maintenant → is sleeping.', { hint: 'sleep' }),
      gap('I ___ a cake right now.', ['am making', '’m making', "'m making"], 'make → making (on enlève le e).', { hint: 'make' }),
      gap('They ___ in the garden at the moment.', ['are sitting', '’re sitting', "'re sitting"], 'sit → sitting (on double le t).', { hint: 'sit' }),
      gap('What ___ you doing this afternoon?', ['are'], 'Question : What are you doing?'),
      gap('She ___ (not) working today. She’s ill.', ['isn’t', "isn't", 'is not', '’s not', "'s not"], 'Négatif : isn’t working.', { hint: 'négatif' }),
      fix('I am watch the news.', ['I’m watching the news.', 'I am watching the news.'], 'am + verbe-ING.'),
      fix('Why you are laughing?', ['Why are you laughing?'], 'Question : on inverse are et you.'),
      tr('Je suis en train de préparer le dîner.', ['I’m cooking dinner.', 'I am cooking dinner.', 'I’m making dinner.', 'I am making dinner.', 'I’m preparing dinner.', 'I am preparing dinner.', 'I’m getting dinner ready.']),
    ],
  }),
  lesson({
    id: 'mm-g-simple-vs-continuous', order: 22, group: 'temps', title: 'Present simple ou continuous ?', level: 'A2', tag: 'present',
    summary: 'Habitude ou maintenant ? Et les verbes qui ne se mettent pas en -ing.',
    points: [
      {
        title: 'La différence',
        explanation: 'Present **simple** = habitude, en général (every day, usually). Present **continuous** = maintenant, en ce moment (now, today, this week). Certains verbes d’état ne se mettent presque jamais en -ing : **like, love, hate, want, need, know, understand, believe, prefer**.',
        examples: [
          { en: 'I usually walk to work, but today I’m taking the bus.', fr: 'D’habitude je vais au travail à pied, mais aujourd’hui je prends le bus.' },
          { en: 'I know the answer. I understand now.', note: '✗ I’m knowing — ✗ I’m understanding' },
        ],
      },
    ],
    exercises: [
      mcq('He ___ the dishes every evening.', ['does', 'is doing'], 'Every evening → habitude → present simple.'),
      mcq('Shh! I ___ on the phone.', ['’m talking', 'talk'], 'Maintenant → present continuous.'),
      mcq('I ___ this soup. It’s delicious!', ['love', '’m loving'], 'Love : verbe d’état → present simple.'),
      gap('Today I ___ at home because it’s raining.', ['am staying', '’m staying', "'m staying"], 'Aujourd’hui (temporaire) → continuous.', { hint: 'stay' }),
      gap('Water ___ at 100 degrees.', ['boils'], 'Vérité générale → present simple.', { hint: 'boil' }),
      fix('I’m wanting a cup of tea.', ['I want a cup of tea.'], 'Want ne se met pas au continuous.'),
      fix('She watches TV at the moment.', ['She is watching TV at the moment.', 'She’s watching TV at the moment.', 'She is watching TV right now.', 'She’s watching TV right now.'], 'At the moment → present continuous.'),
    ],
  }),
  lesson({
    id: 'mm-g-past-simple', order: 23, group: 'temps', title: 'Le past simple', level: 'A2', tag: 'past-simple',
    summary: 'Raconter ce qui s’est passé : hier, la semaine dernière, en 2019.',
    points: [
      {
        title: 'Was / were, et les verbes réguliers',
        explanation: '**I / he / she / it was**, **you / we / they were**. Les verbes réguliers prennent **-ed** : work → worked, play → played, stop → stopped, study → studied. On l’utilise avec un moment terminé : **yesterday, last week, in 2019, two days ago**. En français on dit souvent « j’ai fait » : en anglais, c’est le past simple.',
        examples: [
          { en: 'I called my sister yesterday.', fr: 'J’ai appelé ma sœur hier.' },
          { en: 'We were in Paris last summer.', fr: 'Nous étions à Paris l’été dernier.' },
        ],
      },
      {
        title: 'Les verbes irréguliers les plus courants',
        explanation: 'À apprendre par cœur (voir « Verbes irréguliers ») : go → **went**, have → **had**, do → **did**, make → **made**, see → **saw**, eat → **ate**, drink → **drank**, buy → **bought**, get → **got**, take → **took**, come → **came**, give → **gave**, say → **said**, tell → **told**, think → **thought**, leave → **left**.',
        examples: [{ en: 'We went to the market and bought some fish.', fr: 'Nous sommes allés au marché et nous avons acheté du poisson.' }],
      },
      {
        title: 'Négatif et question : did',
        explanation: 'Négatif : **didn’t + verbe de base** (I didn’t go). Question : **Did + sujet + verbe de base** (Did you go?). Après did, le verbe revient à sa forme de base car « did » porte déjà le passé.',
        examples: [{ en: 'I didn’t see the film. Did you enjoy it?', note: '✗ I didn’t saw' }],
      },
    ],
    exercises: [
      gap('I ___ my daughter last night.', ['called', 'phoned', 'rang', 'saw', 'met'], 'Verbe régulier → -ED (call → called).', { hint: 'call' }),
      gap('We ___ to the seaside last summer.', ['went'], 'go → went (irrégulier).', { hint: 'go' }),
      gap('She ___ a beautiful scarf at the market.', ['bought'], 'buy → bought.', { hint: 'buy' }),
      gap('Yesterday I ___ a lovely soup.', ['made', 'ate', 'had', 'cooked'], 'make → made, eat → ate, have → had.', { hint: 'make' }),
      gap('The children ___ very tired after the trip.', ['were'], 'Pluriel → were.'),
      gap('I ___ (not) sleep well last night.', ['didn’t', "didn't", 'did not'], 'Négatif : didn’t + verbe de base.', { hint: 'négatif' }),
      gap('___ you enjoy the party?', ['Did'], 'Question au passé : Did.'),
      fix('Yesterday I have visited my aunt.', ['Yesterday I visited my aunt.', 'I visited my aunt yesterday.'], 'Yesterday = moment terminé → past simple (pas « have visited »).'),
      fix('She didn’t came to the party.', ['She didn’t come to the party.', 'She did not come to the party.'], 'Après didn’t : verbe de base (come).'),
      tr('Nous avons mangé au restaurant hier soir.', ['We ate at a restaurant last night.', 'We had dinner at a restaurant last night.', 'We ate in a restaurant last night.', 'We had dinner in a restaurant last night.', 'We ate at the restaurant last night.', 'We had dinner at the restaurant last night.', 'We ate out last night.']),
    ],
  }),
  lesson({
    id: 'mm-g-past-continuous', order: 24, group: 'temps', title: 'Le past continuous : j’étais en train de…', level: 'A2', tag: 'past-simple',
    summary: 'Décrire le décor d’une histoire : « it was raining when… ».',
    points: [
      {
        title: 'Was / were + verbe-ing',
        explanation: 'Pour une action **en cours dans le passé**, souvent interrompue par un événement (past simple) : I **was cooking** when the phone **rang**. Le past continuous plante le décor, le past simple fait avancer l’histoire. Mots utiles : **while** (pendant que), **when** (quand), **as**.',
        examples: [
          { en: 'It was raining and the wind was blowing.', fr: 'Il pleuvait et le vent soufflait.' },
          { en: 'I was walking home when I met an old friend.', fr: 'Je rentrais à pied quand j’ai croisé une vieille amie.' },
        ],
      },
    ],
    exercises: [
      gap('I ___ the dishes when the phone rang.', ['was doing', 'was washing'], 'Action en cours → was + -ING.', { hint: 'do' }),
      gap('While we ___ lunch, it started to rain.', ['were having', 'were eating'], 'We → WERE + -ing.', { hint: 'have' }),
      gap('She ___ (not) listening when I spoke to her.', ['wasn’t', "wasn't", 'was not'], 'Négatif : wasn’t listening.', { hint: 'négatif' }),
      gap('What ___ you doing at eight o’clock last night?', ['were'], 'Question : What were you doing?'),
      fix('I cooked dinner when you called.', ['I was cooking dinner when you called.'], 'L’action en cours (cooking) → was cooking ; l’interruption (called) → past simple.'),
      fix('They were having a picnic when it was starting to rain.', ['They were having a picnic when it started to rain.'], 'L’événement qui interrompt → past simple (started).'),
      tr('Pendant que je faisais les courses, il a commencé à pleuvoir.', ['While I was shopping, it started to rain.', 'While I was doing the shopping, it started to rain.', 'It started to rain while I was shopping.', 'It started to rain while I was doing the shopping.']),
    ],
  }),
  lesson({
    id: 'mm-g-future', order: 25, group: 'temps', title: 'Le futur : going to, will, et le présent pour un projet', level: 'A2', tag: 'future',
    summary: 'Parler de ses projets, de ses décisions et de ses prévisions.',
    points: [
      {
        title: 'Be going to : un projet décidé',
        explanation: '**am / is / are + going to + verbe** : ce qu’on a déjà prévu, ou ce qu’on voit venir (Look at the clouds: it’s going to rain). On peut aussi utiliser le **present continuous** pour un rendez-vous organisé : I’m seeing the doctor on Friday.',
        examples: [
          { en: 'We’re going to visit my sister in June.', fr: 'Nous allons rendre visite à ma sœur en juin.' },
          { en: 'I’m meeting Anna at four.', fr: 'Je retrouve Anna à quatre heures.' },
        ],
      },
      {
        title: 'Will : décision immédiate, promesse, prédiction',
        explanation: '**will + verbe** (I’ll, she’ll), négatif **won’t**. Pour une décision prise **à l’instant** (I’ll have the soup), une promesse (I’ll call you), une prédiction avec I think / probably (It will probably rain).',
        examples: [
          { en: 'The phone is ringing. — I’ll get it!', fr: 'Le téléphone sonne. — J’y vais !' },
          { en: 'I think it will be sunny tomorrow.', fr: 'Je pense qu’il fera beau demain.' },
        ],
      },
    ],
    exercises: [
      gap('I’ve decided: I ___ buy a new coat next week.', ['am going to', '’m going to', "'m going to"], 'Projet décidé → going to.'),
      gap('The bag is heavy. — Don’t worry, I ___ carry it.', ['will', '’ll', "'ll"], 'Décision immédiate → will.'),
      gap('We ___ visit our friends in Spain next month. We booked the tickets.', ['are going to', '’re going to', "'re going to"], 'Projet prévu → going to.'),
      gap('I think she ___ like the present.', ['will', '’ll', "'ll"], 'Prédiction avec « I think » → will.'),
      gap('Look at those clouds! It ___ rain.', ['is going to', '’s going to', "'s going to"], 'On le voit venir → going to.'),
      fix('I will to call you tomorrow.', ['I’ll call you tomorrow.', 'I will call you tomorrow.'], 'WILL + verbe sans « to ».'),
      fix('Tomorrow I go to the dentist.', ['Tomorrow I’m going to the dentist.', 'Tomorrow I am going to the dentist.', 'Tomorrow I’m going to go to the dentist.', 'Tomorrow I’m seeing the dentist.'], 'Un projet → be going to (ou present continuous).'),
      tr('Demain, nous allons faire une promenade.', ['Tomorrow we are going to go for a walk.', 'Tomorrow we’re going to go for a walk.', 'Tomorrow we are going for a walk.', 'Tomorrow we’re going for a walk.', 'We are going to go for a walk tomorrow.', 'We’re going to go for a walk tomorrow.', 'We are going for a walk tomorrow.', 'We’re going for a walk tomorrow.', 'Tomorrow we are going to take a walk.', 'Tomorrow we’re going to take a walk.']),
    ],
  }),
  lesson({
    id: 'mm-g-present-perfect', order: 26, group: 'temps', title: 'Le present perfect : have + participe passé', level: 'B1', tag: 'present-perfect',
    summary: 'Les expériences, ce qui vient de se passer, ce qui dure depuis longtemps.',
    points: [
      {
        title: 'La forme',
        explanation: '**have / has + participe passé**. Participe des verbes réguliers : -ed (worked). Irréguliers à connaître : be → **been**, go → **gone / been**, do → **done**, see → **seen**, eat → **eaten**, have → **had**, make → **made**, buy → **bought**, write → **written**, lose → **lost**. Négatif : haven’t / hasn’t. Question : Have you…? Has she…?',
        examples: [
          { en: 'I’ve lost my keys.', fr: 'J’ai perdu mes clés (et je ne les ai pas).' },
          { en: 'Has she called you yet?', fr: 'T’a-t-elle déjà appelé ?' },
        ],
      },
      {
        title: 'Quand l’utiliser ?',
        explanation: '**1) Expérience de vie** (sans dire quand) : Have you ever been to Italy? — I’ve never seen the sea. **2) Résultat présent** : I’ve broken my glasses. **3) Récent** : I’ve just arrived. **already** (déjà), **yet** (pas encore / déjà ? en question). **4) Durée jusqu’à maintenant** : I’ve lived here **for** ten years / **since** 2015.',
        examples: [
          { en: 'I’ve just finished lunch. I’ve already washed up.', fr: 'Je viens de finir de déjeuner. J’ai déjà fait la vaisselle.' },
          { en: 'We haven’t decided yet.', fr: 'Nous n’avons pas encore décidé.' },
        ],
      },
      {
        title: 'Present perfect ou past simple ?',
        explanation: 'Si on dit **quand** (yesterday, last week, in 2019, two years ago), on utilise le **past simple**. Pas d’indication de moment → present perfect. I **went** to Rome in 2019. — I **have been** to Rome.',
        examples: [{ en: 'Have you ever eaten snails? — Yes, I tried them last year.', note: 'ever → present perfect ; last year → past simple' }],
      },
    ],
    exercises: [
      gap('Have you ever ___ to Scotland? (be)', ['been'], 'be → been.'),
      gap('I’ve never ___ a kangaroo. (see)', ['seen'], 'see → seen (participe passé).'),
      gap('She has ___ finished her homework. (déjà)', ['already'], 'Already = déjà (dans une phrase affirmative).', { hint: 'déjà' }),
      gap('Have you called the doctor ___? (déjà ?)', ['yet'], 'Yet = déjà ? (question) / pas encore (négatif).', { hint: 'déjà ?' }),
      gap('We’ve lived in this house ___ 2010.', ['since'], 'Point de départ → SINCE.'),
      gap('He’s been a nurse ___ twenty years.', ['for'], 'Une durée → FOR.'),
      gap('I’ve ___ lost my phone! Can you call it? (à l’instant)', ['just'], 'Just = à l’instant.', { hint: 'à l’instant' }),
      fix('I have seen him yesterday.', ['I saw him yesterday.'], 'Yesterday = moment précis → past simple.'),
      fix('I’m living here since ten years.', ['I have lived here for ten years.', 'I’ve lived here for ten years.'], 'Situation qui dure → present perfect + FOR.'),
      mcq('I ___ to Dublin in 2019.', ['went', 'have been', 'have gone'], 'In 2019 (moment précis) → past simple.'),
    ],
  }),
  // ======================================================================= MOTS ET PHRASES
  lesson({
    id: 'mm-g-comparatives', order: 11, group: 'structures', title: 'Comparer : bigger, more…, the best', level: 'A2', tag: 'comparison',
    summary: 'Plus grand, plus cher, le meilleur, aussi… que.',
    points: [
      {
        title: 'Comparatif et superlatif',
        explanation: 'Mots courts : **-er than** (cheap → cheaper than), **the -est** (the cheapest). Mots longs : **more … than** (more expensive), **the most …** (the most beautiful). Irréguliers : **good → better → the best**, **bad → worse → the worst**. Égalité : **as … as** (as tall as).',
        examples: [
          { en: 'The market is cheaper than the supermarket.', fr: 'Le marché est moins cher que le supermarché.' },
          { en: 'This is the most beautiful village in the region.', fr: 'C’est le plus beau village de la région.' },
          { en: 'My garden is as big as yours.', fr: 'Mon jardin est aussi grand que le tien.' },
        ],
      },
    ],
    exercises: [
      gap('My new flat is ___ than the old one. (big)', ['bigger'], 'big → bigger (on double le g).', { hint: 'big' }),
      gap('This cake is ___ than the other one. (good)', ['better'], 'good → better (irrégulier).', { hint: 'good' }),
      gap('Trains are ___ than buses. (expensive)', ['more expensive'], 'Mot long → more + adjectif.', { hint: 'expensive' }),
      gap('It is the ___ day of the year. (hot)', ['hottest'], 'Superlatif : the hottest (on double le t).', { hint: 'hot' }),
      gap('She is as tall ___ her mother.', ['as'], 'Égalité : as … AS.'),
      fix('Belgian chocolate is more good than Swiss chocolate.', ['Belgian chocolate is better than Swiss chocolate.'], 'good → better.'),
      fix('This street is more narrow that the other one.', ['This street is narrower than the other one.'], 'Mot court → narrower ; « que » = THAN.'),
      tr('C’est le meilleur restaurant de la ville.', ['It is the best restaurant in town.', 'It’s the best restaurant in town.', 'It is the best restaurant in the town.', 'It’s the best restaurant in the town.', 'It is the best restaurant in the city.', 'It’s the best restaurant in the city.']),
    ],
  }),
  lesson({
    id: 'mm-g-adj-adv', order: 12, group: 'mots', title: 'Adjectifs et adverbes : slow / slowly, good / well', level: 'A2', tag: 'adverbs',
    summary: 'Décrire une chose ou une manière de faire : très, trop, assez.',
    points: [
      {
        title: 'Adjectif ou adverbe ?',
        explanation: 'L’**adjectif** décrit un nom, et se place **devant** (a slow driver). L’**adverbe** décrit un verbe, et se forme souvent avec **-ly** (slowly, carefully). Attention : **good** (adjectif) → **well** (adverbe) : She is a good cook. She cooks well. Et **fast / hard / late** ne changent pas : He drives fast.',
        examples: [
          { en: 'He is a careful driver. He drives carefully.', fr: 'C’est un conducteur prudent. Il conduit prudemment.' },
          { en: 'She speaks English very well.', fr: 'Elle parle très bien anglais.' },
        ],
      },
      {
        title: 'Very, too, enough',
        explanation: '**very** = très. **too** = trop (un excès, un problème) : It’s too hot. **adjectif + enough** = assez : It’s warm enough. **not … enough** = pas assez.',
        examples: [{ en: 'The coffee is too hot. I can’t drink it.', fr: 'Le café est trop chaud : je ne peux pas le boire.' }],
      },
    ],
    exercises: [
      gap('He drives very ___. (slow)', ['slowly'], 'Après un verbe → adverbe : slowly.', { hint: 'slow' }),
      gap('She is a very ___ cook. (good)', ['good'], 'Devant un nom → adjectif : good.', { hint: 'good' }),
      gap('She cooks ___. (good)', ['well'], 'Après un verbe → adverbe : WELL (pas « goodly »).', { hint: 'good' }),
      gap('The soup is ___ hot. I can’t eat it.', ['too'], 'Excès → TOO.'),
      gap('Is the water warm ___ for a swim?', ['enough'], 'Adjectif + ENOUGH.'),
      fix('She speaks English very good.', ['She speaks English very well.', 'She speaks very good English.'], 'Après un verbe → WELL (adverbe). On peut aussi mettre l’adjectif devant le nom : very good English.'),
      fix('She walks very slow.', ['She walks very slowly.'], 'Adverbe (-ly) pour décrire le verbe.'),
      tr('Il fait trop froid pour sortir.', ['It’s too cold to go out.', 'It is too cold to go out.', 'It’s too cold to go outside.', 'It is too cold to go outside.']),
    ],
  }),
  lesson({
    id: 'mm-g-connectors', order: 13, group: 'mots', title: 'And, but, because, so, when, if…', level: 'A2', tag: 'linking',
    summary: 'Relier ses idées pour parler plus naturellement.',
    points: [
      {
        title: 'Les petits mots qui relient',
        explanation: '**and** (et), **but** (mais), **or** (ou), **because** (parce que : donne la cause), **so** (alors, donc : donne la conséquence), **when** (quand), **while** (pendant que), **before / after** (avant / après), **then** (ensuite), **also** (aussi), **however** (cependant).',
        examples: [
          { en: 'I was tired, so I went to bed early.', fr: 'J’étais fatiguée, alors je me suis couchée tôt.' },
          { en: 'I went to bed early because I was tired.', fr: 'Je me suis couchée tôt parce que j’étais fatiguée.' },
        ],
      },
      {
        title: 'If : la condition',
        explanation: '**If + présent, will + verbe** pour une possibilité réelle : If it rains, we’ll stay at home. Jamais « will » après if !',
        examples: [{ en: 'If you come at six, I’ll make dinner.', fr: 'Si tu viens à six heures, je ferai le dîner.' }],
      },
    ],
    exercises: [
      gap('I stayed at home ___ it was raining.', ['because'], 'Cause → because.'),
      gap('It was raining, ___ I stayed at home.', ['so'], 'Conséquence → so.'),
      gap('I like tea, ___ my husband prefers coffee.', ['but'], 'Opposition → but.'),
      gap('First I do the shopping, ___ I cook lunch.', ['then', 'and then', 'after that'], 'Ensuite → then / after that.'),
      gap('If it ___ tomorrow, we’ll stay at home.', ['rains', 'is raining'], 'If + présent (pas will).', { hint: 'rain' }),
      fix('If it will rain, we will stay at home.', ['If it rains, we will stay at home.', 'If it rains, we’ll stay at home.'], 'Après IF : présent, pas « will ».'),
      fix('I’m tired because so I’m going to bed.', ['I’m tired, so I’m going to bed.', 'I am tired, so I am going to bed.', 'I’m going to bed because I’m tired.', 'I am going to bed because I am tired.'], 'Choisir : because OU so, pas les deux.'),
      tr('Je suis allée au marché parce que j’avais besoin de légumes.', ['I went to the market because I needed some vegetables.', 'I went to the market because I needed vegetables.', 'I went to the market because I needed to buy vegetables.']),
    ],
  }),
  lesson({
    id: 'mm-g-polite', order: 14, group: 'structures', title: 'Demander poliment, proposer, suggérer', level: 'A2', tag: 'politeness',
    summary: 'Could you…? Would you like…? Shall we…? Let’s…',
    points: [
      {
        title: 'Demander et proposer',
        explanation: '**Could you…? / Can you…?** (demander un service), **Could I…? / Can I…?** (demander la permission), **Would you like…?** (proposer : Would you like some tea?), **I’d like…** (je voudrais), **Do you mind if I…? / Would you mind…-ing?** (poli). Ajoutez toujours **please** et **thank you**.',
        examples: [
          { en: 'Could you tell me the way to the station, please?', fr: 'Pourriez-vous m’indiquer le chemin de la gare, s’il vous plaît ?' },
          { en: 'Would you like a biscuit? — Yes, please.', fr: 'Voulez-vous un biscuit ? — Oui, volontiers.' },
          { en: 'I’d like a coffee, please.', fr: 'Je voudrais un café, s’il vous plaît.' },
        ],
      },
      {
        title: 'Suggérer',
        explanation: '**Let’s + verbe** (Let’s go!), **Shall we + verbe ?** (Shall we sit here?), **How about + -ing ?** (How about having lunch?), **Why don’t we + verbe ?**',
        examples: [{ en: 'Why don’t we visit the castle this afternoon?', fr: 'Et si nous visitions le château cet après-midi ?' }],
      },
    ],
    exercises: [
      gap('___ you like some more coffee?', ['Would'], 'Proposer → Would you like…?'),
      gap('I’d ___ a table for two, please.', ['like'], 'I’d like = je voudrais.'),
      gap('___ I open the window? It’s very hot in here.', ['Shall', 'Can', 'Could', 'May'], 'Proposer : Shall I…? / Can I…? / Could I…?'),
      gap('___ go to the beach this afternoon! (allons)', ['Let’s', "Let's"], 'Let’s + verbe = allons…'),
      gap('How about ___ a walk after lunch?', ['taking', 'having', 'going for'], 'How about + -ING.', { hint: 'take' }),
      fix('I want a coffee, please.', ['I’d like a coffee, please.', 'I would like a coffee, please.'], '« I want » est trop direct : on dit I’d like.'),
      fix('Give me the bill.', ['Could I have the bill, please?', 'Can I have the bill, please?', 'Could we have the bill, please?', 'Can we have the bill, please?', 'Could you bring me the bill, please?'], 'Pour demander poliment : Could I…, please?'),
      tr('Voulez-vous un peu de thé ?', ['Would you like some tea?', 'Would you like a little tea?', 'Would you like a cup of tea?', 'Would you like a bit of tea?']),
    ],
  }),
  lesson({
    id: 'mm-g-verb-patterns', order: 15, group: 'structures', title: 'Aimer, vouloir, aller : like doing, want to do', level: 'A2', tag: 'gerund-inf',
    summary: 'Quel verbe après quel verbe : -ing ou to + verbe ?',
    points: [
      {
        title: 'Verbe + -ing',
        explanation: 'Après **like, love, enjoy, hate, don’t mind, finish, stop, start** : on utilise le verbe en **-ing**. I enjoy cooking. She loves walking. Après **want, need, hope, decide, would like, learn** : **to + verbe**. I want to learn English. I’d like to visit London.',
        examples: [
          { en: 'I enjoy cooking, but I don’t like washing up.', fr: 'J’aime cuisiner, mais je n’aime pas faire la vaisselle.' },
          { en: 'I want to buy a new bike.', fr: 'Je veux acheter un nouveau vélo.' },
          { en: 'I’d like to speak to the manager.', fr: 'Je voudrais parler au directeur.' },
        ],
      },
    ],
    exercises: [
      gap('I enjoy ___ in the garden. (work)', ['working'], 'Enjoy + -ING.', { hint: 'work' }),
      gap('She wants ___ a new dress. (buy)', ['to buy'], 'Want + TO + verbe.', { hint: 'buy' }),
      gap('We decided ___ the train. (take)', ['to take'], 'Decide + TO + verbe.', { hint: 'take' }),
      gap('He finished ___ the kitchen at six. (clean)', ['cleaning'], 'Finish + -ING.', { hint: 'clean' }),
      gap('I’d like ___ a table for tonight. (book)', ['to book'], 'Would like + TO + verbe.', { hint: 'book' }),
      fix('I want learn English.', ['I want to learn English.'], 'Want + TO + verbe.'),
      fix('She likes to dancing.', ['She likes dancing.', 'She likes to dance.'], 'Like + -ing (ou like + to dance, mais pas les deux).'),
      tr('J’aime lire le soir.', ['I like reading in the evening.', 'I like to read in the evening.', 'I love reading in the evening.', 'I love to read in the evening.', 'I like reading at night.', 'I enjoy reading in the evening.']),
    ],
  }),
]

export const mamanGrammarGroups: { id: GrammarGroup; title: string; icon: string; description: string }[] = [
  { id: 'temps', title: 'Les temps', icon: '⏳', description: 'Présent, passé, futur, present perfect.' },
  { id: 'structures', title: 'Les bases', icon: '🧱', description: 'Be, have, there is, questions, can / must, comparer…' },
  { id: 'mots', title: 'Petits mots', icon: '🔤', description: 'A / an / the, pluriels, pronoms, prépositions, quantités…' },
]
