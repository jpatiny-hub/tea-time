import type { GrammarLesson } from '../../types'
import { lexieGrammar } from './lexie.ts'

// Accès Jujularage (A1 → A2) : les bases, expliquées simplement, avec des exemples tirés de ses passions.
// Règle : ne jamais changer l'`id` d'un exercice existant (il porte la progression).

const coreLessons: GrammarLesson[] = [
  // ------------------------------------------------------------------ LES BASES
  {
    id: 'jj-g-be',
    order: 1,
    group: 'structures',
    title: 'To be : am, is, are',
    level: 'A1',
    summary: 'Le verbe « être » : le verbe le plus utilisé en anglais.',
    tag: 'be',
    points: [
      {
        title: 'Les formes',
        explanation: '**I am**, **you are**, **he / she / it is**, **we are**, **they are**. À l\'oral, on contracte presque toujours : I\'m, you\'re, he\'s, it\'s, we\'re, they\'re.',
        examples: [
          { en: "I'm Julien. I'm a scientist.", fr: 'Je suis Julien. Je suis scientifique.', note: 'Un métier prend « a » : I\'m a scientist (✗ I\'m scientist).' },
          { en: 'My dog is very friendly.', fr: 'Mon chien est très gentil.' },
          { en: "We're from Belgium.", fr: 'Nous sommes de Belgique.' },
        ],
        table: {
          head: ['', 'Affirmatif', 'Négatif', 'Question'],
          rows: [
            ['I', "I'm", "I'm not", 'Am I…?'],
            ['you / we / they', "you're", "you aren't", 'Are you…?'],
            ['he / she / it', "she's", "she isn't", 'Is she…?'],
          ],
        },
      },
      {
        title: 'Attention : « avoir » en français = « be » en anglais',
        explanation: 'Pour l\'âge, la faim, la soif, le froid, le chaud, la peur, on utilise **be** : I\'m 30 (✗ I have 30 years), I\'m hungry, I\'m cold, I\'m thirsty.',
        examples: [
          { en: "I'm 32 years old.", fr: "J'ai 32 ans." },
          { en: "Are you thirsty? Let's have a beer!", fr: 'Tu as soif ? Prenons une bière !' },
          { en: "I'm cold.", fr: "J'ai froid." },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-be-01', level: 'A1', prompt: 'I ___ a scientist.', answers: ['am', "'m"], explanation: 'I → am.' },
      { kind: 'gap', id: 'jj-g-be-02', level: 'A1', prompt: 'My brother ___ a teacher.', answers: ['is', "'s"], explanation: 'He / she / it (my brother) → is.' },
      { kind: 'gap', id: 'jj-g-be-03', level: 'A1', prompt: 'We ___ from Liège.', answers: ['are', "'re"], explanation: 'We → are.' },
      { kind: 'gap', id: 'jj-g-be-04', level: 'A1', prompt: 'The cats ___ hungry.', answers: ['are'], explanation: 'Pluriel (they) → are.' },
      { kind: 'mcq', id: 'jj-g-be-05', level: 'A1', prompt: 'Comment dit-on « J\'ai 30 ans » ?', options: ["I'm 30.", 'I have 30 years.', 'I have 30.', 'I am 30 years.'], answer: 0, explanation: "L'âge se dit avec BE : I'm 30 (ou I'm 30 years old)." },
      { kind: 'gap', id: 'jj-g-be-06', level: 'A1', prompt: 'She ___ (not) at home today.', hint: 'négatif', answers: ["isn't", 'is not', "'s not"], explanation: 'Négatif : is not = isn\'t.' },
      { kind: 'gap', id: 'jj-g-be-07', level: 'A1', prompt: '___ you thirsty?', answers: ['Are'], explanation: 'Question : on inverse → Are you…?' },
      { kind: 'fix', id: 'jj-g-be-08', level: 'A1', wrong: 'I have cold.', answers: ["I'm cold.", 'I am cold.'], explanation: 'Avoir froid = BE cold.' },
      { kind: 'fix', id: 'jj-g-be-09', level: 'A1', wrong: 'He is biologist.', answers: ['He is a biologist.', "He's a biologist."], explanation: 'Devant un métier : a / an.' },
    ],
  },
  {
    id: 'jj-g-have',
    order: 2,
    group: 'structures',
    title: 'Have / have got',
    level: 'A1',
    summary: 'Posséder, avoir de la famille, des animaux.',
    tag: 'have',
    points: [
      {
        title: 'I have / she has',
        explanation: 'Avec he / she / it, **have** devient **has**. En anglais britannique, on dit aussi souvent **have got** (I\'ve got, she\'s got). Négatif : I don\'t have (ou I haven\'t got). Question : Do you have…? (ou Have you got…?).',
        examples: [
          { en: 'I have two sisters.', fr: "J'ai deux sœurs." },
          { en: 'She has a black cat.', fr: 'Elle a un chat noir.' },
          { en: "We've got a big garden.", fr: 'Nous avons un grand jardin.' },
          { en: "I don't have a car.", fr: "Je n'ai pas de voiture." },
          { en: 'Do you have any pets?', fr: 'Tu as des animaux ?' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-have-01', level: 'A1', prompt: 'My sister ___ two dogs.', answers: ['has', "has got", "'s got"], explanation: 'She → has.' },
      { kind: 'gap', id: 'jj-g-have-02', level: 'A1', prompt: 'I ___ a brother and a sister.', answers: ['have', 'have got', "'ve got"], explanation: 'I → have.' },
      { kind: 'gap', id: 'jj-g-have-03', level: 'A1', prompt: 'We ___ (not) a garden.', hint: 'négatif', answers: ["don't have", 'do not have', "haven't got", 'have not got'], explanation: "Négatif : don't have (ou haven't got)." },
      { kind: 'gap', id: 'jj-g-have-04', level: 'A1', prompt: '___ you have any pets?', answers: ['Do'], explanation: 'Question avec have : Do you have…?' },
      { kind: 'fix', id: 'jj-g-have-05', level: 'A1', wrong: 'He have a new bike.', answers: ['He has a new bike.', "He's got a new bike.", 'He has got a new bike.'], explanation: 'He / she / it → HAS.' },
      { kind: 'mcq', id: 'jj-g-have-06', level: 'A2', prompt: "Choisis la phrase correcte :", options: ["Does she have a car?", 'Has she a car?', 'Do she have a car?', 'She has a car?'], answer: 0, explanation: 'Question au présent avec he / she : DOES + have.' },
    ],
  },
  {
    id: 'jj-g-articles',
    order: 3,
    group: 'mots',
    title: 'A, an, the et les pluriels',
    level: 'A1',
    summary: 'Un, une, le, la, les… et comment former le pluriel.',
    tag: 'articles',
    points: [
      {
        title: 'A ou an ?',
        explanation: '**a** devant un son consonne (a dog, a beer), **an** devant un son voyelle (an apple, an hour, an IPA). **the** = le, la, les (une chose précise).',
        examples: [
          { en: 'a cat, a house, a pint', fr: 'un chat, une maison, une pinte' },
          { en: 'an elephant, an egg, an hour', note: '« hour » : le h est muet → an' },
          { en: 'The beer in this pub is excellent.', fr: 'La bière dans ce pub est excellente.' },
        ],
      },
      {
        title: 'Les pluriels',
        explanation: 'On ajoute **-s** (dogs), **-es** après s, sh, ch, x (boxes, glasses), **-ies** après consonne + y (family → families). Quelques pluriels irréguliers très courants : **man → men, woman → women, child → children, mouse → mice, foot → feet, tooth → teeth, sheep → sheep, fish → fish**.',
        examples: [
          { en: 'two bottles, three glasses, four puppies' },
          { en: 'The children love the mice in the lab.', note: 'children, mice : irréguliers' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-articles-01', level: 'A1', prompt: "I'd like ___ apple.", answers: ['an'], explanation: 'Son voyelle → an.' },
      { kind: 'gap', id: 'jj-g-articles-02', level: 'A1', prompt: 'She has ___ horse.', answers: ['a'], explanation: 'Son consonne → a.' },
      { kind: 'gap', id: 'jj-g-articles-03', level: 'A2', prompt: 'The meeting lasts ___ hour.', answers: ['an'], explanation: '« hour » commence par un son voyelle (h muet) → an.' },
      { kind: 'gap', id: 'jj-g-articles-04', level: 'A1', prompt: 'one child, two ___', answers: ['children'], explanation: 'child → children (irrégulier).' },
      { kind: 'gap', id: 'jj-g-articles-05', level: 'A1', prompt: 'one mouse, three ___', answers: ['mice'], explanation: 'mouse → mice (irrégulier).' },
      { kind: 'gap', id: 'jj-g-articles-06', level: 'A1', prompt: 'one glass, two ___', answers: ['glasses'], explanation: 'Après -ss → -es.' },
      { kind: 'gap', id: 'jj-g-articles-07', level: 'A2', prompt: 'one family, two ___', answers: ['families'], explanation: 'consonne + y → -ies.' },
      { kind: 'fix', id: 'jj-g-articles-08', level: 'A2', wrong: 'I have two sheeps and three fishes.', answers: ['I have two sheep and three fish.', "I've got two sheep and three fish."], explanation: 'sheep et fish ne changent pas au pluriel.' },
    ],
  },
  {
    id: 'jj-g-possessives',
    order: 4,
    group: 'mots',
    title: "My, your, his, her… et le 's",
    level: 'A1',
    summary: 'Dire à qui appartient quelque chose.',
    tag: 'possessives',
    points: [
      {
        title: 'Les adjectifs possessifs',
        explanation: '**my, your, his** (à lui), **her** (à elle), **its** (à un animal / une chose), **our, their**. Attention : en anglais, on choisit selon le PROPRIÉTAIRE, pas selon l\'objet : sa mère (à lui) = **his** mother ; sa mère (à elle) = **her** mother.',
        examples: [
          { en: 'This is my brother. His name is Tom.', fr: 'Voici mon frère. Il s\'appelle Tom.' },
          { en: 'This is my sister. Her husband is a brewer.', fr: 'Voici ma sœur. Son mari est brasseur.' },
          { en: 'The dog is eating its food.' },
        ],
      },
      {
        title: "Le 's (génitif)",
        explanation: 'Pour les personnes et les animaux : **le propriétaire + \'s + la chose**. « La voiture de mon père » = my father\'s car. Au pluriel en -s : my parents\' house.',
        examples: [
          { en: "my father's car", fr: 'la voiture de mon père' },
          { en: "Julie's dog", fr: 'le chien de Julie' },
          { en: "my parents' house", fr: 'la maison de mes parents' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-poss-01', level: 'A1', prompt: 'This is Paul and this is ___ wife, Anna.', answers: ['his'], explanation: 'La femme de Paul (un homme) → his.' },
      { kind: 'gap', id: 'jj-g-poss-02', level: 'A1', prompt: 'This is Anna and this is ___ husband, Paul.', answers: ['her'], explanation: "Le mari d'Anna (une femme) → her." },
      { kind: 'gap', id: 'jj-g-poss-03', level: 'A1', prompt: 'We love ___ new house.', answers: ['our'], explanation: 'We → our.' },
      { kind: 'gap', id: 'jj-g-poss-04', level: 'A1', prompt: 'They are washing ___ car.', answers: ['their'], explanation: 'They → their.' },
      { kind: 'transform', id: 'jj-g-poss-05', level: 'A2', instruction: "Traduis avec le 's.", prompt: 'le chien de mon frère', answers: ["my brother's dog"], explanation: "Propriétaire + 's + chose." },
      { kind: 'transform', id: 'jj-g-poss-06', level: 'A2', instruction: "Traduis avec le 's.", prompt: 'la maison de mes parents', answers: ["my parents' house"], explanation: "Pluriel en -s → apostrophe seule : parents'." },
      { kind: 'fix', id: 'jj-g-poss-07', level: 'A2', wrong: 'My sister loves his cat.', answers: ['My sister loves her cat.'], explanation: 'Le chat de ma sœur (une femme) → her.' },
    ],
  },
  {
    id: 'jj-g-there-is',
    order: 5,
    group: 'structures',
    title: 'There is / there are',
    level: 'A1',
    summary: 'Dire ce qu\'il y a quelque part (« il y a »).',
    tag: 'there-is',
    points: [
      {
        title: 'Il y a…',
        explanation: '**There is** (there\'s) + singulier ; **there are** + pluriel. Négatif : there isn\'t / there aren\'t. Question : Is there…? / Are there…? Avec **some** (affirmatif) et **any** (négatif et question).',
        examples: [
          { en: "There's a big fridge in the kitchen.", fr: 'Il y a un grand frigo dans la cuisine.' },
          { en: 'There are three bedrooms in my house.', fr: 'Il y a trois chambres dans ma maison.' },
          { en: "There isn't any beer in the fridge!", fr: "Il n'y a pas de bière dans le frigo !" },
          { en: 'Are there any good pubs near here?', fr: 'Il y a de bons pubs près d\'ici ?' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-there-01', level: 'A1', prompt: 'There ___ a dog in the garden.', answers: ['is', "'s"], explanation: 'Singulier → there is.' },
      { kind: 'gap', id: 'jj-g-there-02', level: 'A1', prompt: 'There ___ two bathrooms in the house.', answers: ['are'], explanation: 'Pluriel → there are.' },
      { kind: 'gap', id: 'jj-g-there-03', level: 'A2', prompt: "There aren't ___ bottles left.", answers: ['any'], explanation: 'Négatif → any.' },
      { kind: 'gap', id: 'jj-g-there-04', level: 'A2', prompt: 'There are ___ glasses on the table.', answers: ['some', 'two', 'three', 'four', 'five'], explanation: 'Affirmatif pluriel → some (des, quelques).' },
      { kind: 'gap', id: 'jj-g-there-05', level: 'A1', prompt: '___ there a bioreactor in this room?', answers: ['Is'], explanation: 'Question au singulier → Is there…?' },
      { kind: 'transform', id: 'jj-g-there-06', level: 'A1', instruction: 'Traduis en anglais.', prompt: 'Il y a un chat sur le canapé.', answers: ["There's a cat on the sofa.", 'There is a cat on the sofa.', 'There is a cat on the couch.'], explanation: 'Il y a = there is ; sur = on.' },
      { kind: 'fix', id: 'jj-g-there-07', level: 'A1', wrong: 'It has three bedrooms in my flat.', answers: ['There are three bedrooms in my flat.', 'My flat has three bedrooms.'], explanation: '« Il y a » = THERE ARE (✗ it has).' },
    ],
  },
  {
    id: 'jj-g-prepositions',
    order: 6,
    group: 'mots',
    title: 'In, on, at (lieu et temps)',
    level: 'A2',
    summary: 'Les trois petites prépositions qu\'on utilise tout le temps.',
    tag: 'prepositions',
    points: [
      {
        title: 'Le temps',
        explanation: '**at** + heure (at 8 o\'clock, at night, at the weekend) ; **on** + jour / date (on Monday, on 5 May) ; **in** + mois, saison, année, partie de journée (in July, in summer, in 2024, in the morning).',
        examples: [
          { en: 'I start work at 7 a.m.', fr: 'Je commence le travail à 7 h.' },
          { en: 'We play football on Saturdays.', fr: 'On joue au foot le samedi.' },
          { en: 'My birthday is in March.', fr: 'Mon anniversaire est en mars.' },
        ],
      },
      {
        title: 'Le lieu',
        explanation: '**in** = dans (in the fridge, in Belgium) ; **on** = sur (on the table, on the wall) ; **at** = à un endroit précis (at home, at work, at the pub).',
        examples: [
          { en: "The samples are in the freezer.", fr: 'Les échantillons sont dans le congélateur.' },
          { en: 'The keys are on the table.', fr: 'Les clés sont sur la table.' },
          { en: "I'm at work. See you at the pub!", fr: 'Je suis au travail. On se voit au pub !' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-prep-01', level: 'A1', prompt: 'The match starts ___ 8 p.m.', answers: ['at'], explanation: 'Heure → at.' },
      { kind: 'gap', id: 'jj-g-prep-02', level: 'A1', prompt: 'I go to the gym ___ Mondays.', answers: ['on'], explanation: 'Jour → on.' },
      { kind: 'gap', id: 'jj-g-prep-03', level: 'A1', prompt: 'We go on holiday ___ August.', answers: ['in'], explanation: 'Mois → in.' },
      { kind: 'gap', id: 'jj-g-prep-04', level: 'A1', prompt: 'The milk is ___ the fridge.', answers: ['in'], explanation: 'Dans → in.' },
      { kind: 'gap', id: 'jj-g-prep-05', level: 'A1', prompt: "I'm ___ home tonight.", answers: ['at'], explanation: 'at home (sans « the »).' },
      { kind: 'gap', id: 'jj-g-prep-06', level: 'A2', prompt: 'There is a picture ___ the wall.', answers: ['on'], explanation: 'Sur une surface → on.' },
      { kind: 'gap', id: 'jj-g-prep-07', level: 'A2', prompt: 'I drink coffee ___ the morning.', answers: ['in'], explanation: 'in the morning / in the afternoon / in the evening (mais at night).' },
      { kind: 'fix', id: 'jj-g-prep-08', level: 'A2', wrong: 'I work in the lab on 7 a.m. at Monday.', answers: ['I work in the lab at 7 a.m. on Monday.', 'I work in the lab at 7 a.m. on Mondays.'], explanation: 'Heure → at ; jour → on.' },
    ],
  },
  {
    id: 'jj-g-can',
    order: 7,
    group: 'structures',
    title: "Can / can't",
    level: 'A1',
    summary: 'Dire ce qu\'on sait faire, demander poliment.',
    tag: 'can',
    points: [
      {
        title: 'Pouvoir, savoir faire',
        explanation: '**can** + verbe sans « to » : I can swim. Même forme pour toutes les personnes (✗ he cans). Négatif : **can\'t** (cannot). Question : **Can you…?** Pour demander poliment : **Can I…? / Could you…?**',
        examples: [
          { en: 'I can brew my own beer.', fr: 'Je sais brasser ma propre bière.' },
          { en: "She can't swim.", fr: 'Elle ne sait pas nager.' },
          { en: 'Can you help me, please?', fr: "Tu peux m'aider, s'il te plaît ?" },
          { en: 'Could I have a pint of lager, please?', fr: 'Je pourrais avoir une pinte de blonde ?' },
        ],
      },
    ],
    exercises: [
      { kind: 'fix', id: 'jj-g-can-01', level: 'A1', wrong: 'He cans play the guitar.', answers: ['He can play the guitar.'], explanation: 'Can ne prend jamais de -s.' },
      { kind: 'fix', id: 'jj-g-can-02', level: 'A1', wrong: 'I can to speak a little English.', answers: ['I can speak a little English.'], explanation: 'Can + verbe SANS « to ».' },
      { kind: 'gap', id: 'jj-g-can-03', level: 'A1', prompt: "I'm sorry, I ___ come tonight.", hint: 'négatif', answers: ["can't", 'cannot', 'can not'], explanation: "Négatif : can't." },
      { kind: 'transform', id: 'jj-g-can-04', level: 'A1', instruction: 'Traduis en anglais.', prompt: 'Tu peux répéter, s\'il te plaît ?', answers: ['Can you repeat, please?', 'Can you repeat that, please?', 'Could you repeat, please?', 'Could you repeat that, please?', 'Can you say that again, please?'], explanation: 'Demande polie : Can you / Could you + verbe.' },
      { kind: 'transform', id: 'jj-g-can-05', level: 'A2', instruction: 'Traduis en anglais.', prompt: 'Je pourrais avoir une bière, s\'il vous plaît ?', answers: ['Could I have a beer, please?', 'Can I have a beer, please?', 'Could I get a beer, please?', 'Can I get a beer, please?'], explanation: 'Commander poliment : Could I have…?' },
    ],
  },
  {
    id: 'jj-g-questions',
    order: 8,
    group: 'structures',
    title: 'Poser des questions',
    level: 'A1',
    summary: 'What, where, when, who, why, how… et la place des mots.',
    tag: 'questions',
    points: [
      {
        title: 'Les mots interrogatifs',
        explanation: '**What** (quoi), **Where** (où), **When** (quand), **Who** (qui), **Why** (pourquoi), **How** (comment), **How much / How many** (combien, indénombrable / dénombrable), **How old** (quel âge), **How often** (à quelle fréquence).',
        examples: [
          { en: 'What do you do?', fr: 'Que fais-tu (comme métier) ?' },
          { en: 'Where do you live?', fr: 'Où habites-tu ?' },
          { en: 'How many beers do you know?', fr: 'Combien de bières connais-tu ?' },
          { en: 'How old is your dog?', fr: 'Quel âge a ton chien ?' },
        ],
      },
      {
        title: "L'ordre : mot interrogatif + auxiliaire + sujet + verbe",
        explanation: 'Au présent simple, on utilise **do / does** : Where **do** you work? Where **does** he work? Avec be : Where **are** you?',
        examples: [
          { en: 'Where does your sister live?', note: '✗ Where your sister lives?' },
          { en: 'Why are you tired?' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-q-01', level: 'A1', prompt: '___ do you live? — In Liège.', answers: ['Where'], explanation: 'Un lieu → Where.' },
      { kind: 'gap', id: 'jj-g-q-02', level: 'A1', prompt: '___ old are you? — I\'m 32.', answers: ['How'], explanation: "L'âge → How old." },
      { kind: 'gap', id: 'jj-g-q-03', level: 'A2', prompt: 'How ___ brothers do you have?', answers: ['many'], explanation: 'Dénombrable (brothers) → How many.' },
      { kind: 'gap', id: 'jj-g-q-04', level: 'A2', prompt: 'How ___ is a pint here? — Five euros.', answers: ['much'], explanation: 'Le prix → How much.' },
      { kind: 'gap', id: 'jj-g-q-05', level: 'A1', prompt: 'Where ___ your brother work?', answers: ['does'], explanation: 'He / she → does.' },
      { kind: 'fix', id: 'jj-g-q-06', level: 'A2', wrong: 'What you do at work?', answers: ['What do you do at work?'], explanation: 'Il faut l\'auxiliaire : What DO you do…?' },
      { kind: 'transform', id: 'jj-g-q-07', level: 'A1', instruction: 'Traduis en anglais.', prompt: 'Pourquoi es-tu fatigué ?', answers: ['Why are you tired?'], explanation: 'Why + are + you.' },
    ],
  },
  {
    id: 'jj-g-comparatives',
    order: 9,
    group: 'structures',
    title: 'Comparer : bigger, more…, the best',
    level: 'A2',
    summary: 'Plus grand, plus amer, la meilleure bière…',
    tag: 'comparison',
    points: [
      {
        title: 'Le comparatif',
        explanation: 'Mots courts : **-er + than** (strong → stronger than). Mots longs : **more + adjectif + than** (more expensive than). Irréguliers : **good → better**, **bad → worse**.',
        examples: [
          { en: 'A stout is darker than a lager.', fr: 'Une stout est plus foncée qu\'une blonde.' },
          { en: 'This IPA is more bitter than that one.', fr: 'Cette IPA est plus amère que celle-là.' },
          { en: 'Belgian beer is better than English beer!', fr: 'La bière belge est meilleure que la bière anglaise !' },
        ],
      },
      {
        title: 'Le superlatif',
        explanation: '**the + -est** (the strongest) ou **the most + adjectif** (the most famous). Irréguliers : **the best**, **the worst**.',
        examples: [
          { en: 'Westvleteren 12 is one of the best beers in the world.' },
          { en: 'This is the most interesting job in the company.' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-comp-01', level: 'A2', prompt: 'My dog is ___ than my cat.', hint: 'big', answers: ['bigger'], explanation: 'big → bigger (on double le g).' },
      { kind: 'gap', id: 'jj-g-comp-02', level: 'A2', prompt: 'This beer is ___ than the other one.', hint: 'good', answers: ['better'], explanation: 'good → better (irrégulier).' },
      { kind: 'gap', id: 'jj-g-comp-03', level: 'A2', prompt: 'Biology is ___ than chemistry for me.', hint: 'interesting', answers: ['more interesting'], explanation: 'Mot long → more interesting.' },
      { kind: 'gap', id: 'jj-g-comp-04', level: 'A2', prompt: 'It is ___ beer in the bar.', hint: 'strong', answers: ['the strongest'], explanation: 'Superlatif : the strongest.' },
      { kind: 'gap', id: 'jj-g-comp-05', level: 'A2', prompt: 'He is ___ player in the team.', hint: 'good', answers: ['the best'], explanation: 'good → the best.' },
      { kind: 'fix', id: 'jj-g-comp-06', level: 'A2', wrong: 'A stout is more dark that a lager.', answers: ['A stout is darker than a lager.'], explanation: 'Mot court → darker ; « que » = THAN.' },
    ],
  },
  // ------------------------------------------------------------------ LES TEMPS
  {
    id: 'jj-g-present-simple',
    order: 20,
    group: 'temps',
    title: 'Le present simple',
    level: 'A1',
    summary: 'Les habitudes, les vérités, ce qu\'on fait d\'habitude.',
    tag: 'present',
    points: [
      {
        title: 'La forme',
        explanation: 'Verbe de base pour I / you / we / they. **Avec he / she / it, on ajoute -s** : I work → she work**s**, he watch**es**, it stud**ies**. Négatif : **don\'t / doesn\'t** + verbe. Question : **Do / Does** + sujet + verbe.',
        examples: [
          { en: 'I work in a lab.', fr: 'Je travaille dans un labo.' },
          { en: 'My brother works in a brewery.', fr: 'Mon frère travaille dans une brasserie.', note: 'he → works' },
          { en: "She doesn't like coffee.", fr: "Elle n'aime pas le café.", note: 'doesn\'t + like (sans -s)' },
          { en: 'Do you play football?', fr: 'Tu joues au foot ?' },
        ],
      },
      {
        title: 'Quand l\'utiliser',
        explanation: 'Pour les habitudes et ce qui est toujours vrai. Souvent avec **always, usually, often, sometimes, never** (placés devant le verbe) et **every day, on Mondays…**',
        examples: [
          { en: 'I usually drink a beer on Fridays.', fr: 'Je bois généralement une bière le vendredi.' },
          { en: 'Yeast converts sugar into alcohol.', fr: 'La levure transforme le sucre en alcool.', note: 'Vérité scientifique' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-ps-01', level: 'A1', prompt: 'She ___ in a laboratory.', hint: 'work', answers: ['works'], explanation: 'She → works (-s).' },
      { kind: 'gap', id: 'jj-g-ps-02', level: 'A1', prompt: 'My parents ___ in Namur.', hint: 'live', answers: ['live'], explanation: 'They → live (pas de -s).' },
      { kind: 'gap', id: 'jj-g-ps-03', level: 'A1', prompt: 'He ___ football every Sunday.', hint: 'watch', answers: ['watches'], explanation: 'Après -ch → -es.' },
      { kind: 'gap', id: 'jj-g-ps-04', level: 'A1', prompt: 'I ___ like wine. I prefer beer.', hint: 'négatif', answers: ["don't", 'do not'], explanation: "I → don't." },
      { kind: 'gap', id: 'jj-g-ps-05', level: 'A1', prompt: 'My cat ___ like water.', hint: 'négatif', answers: ["doesn't", 'does not'], explanation: "It → doesn't." },
      { kind: 'gap', id: 'jj-g-ps-06', level: 'A1', prompt: '___ your sister speak English?', answers: ['Does'], explanation: 'Question avec she → Does.' },
      { kind: 'fix', id: 'jj-g-ps-07', level: 'A1', wrong: 'He drink a beer every evening.', answers: ['He drinks a beer every evening.'], explanation: 'He → drinkS.' },
      { kind: 'fix', id: 'jj-g-ps-08', level: 'A2', wrong: "She doesn't works on Fridays.", answers: ["She doesn't work on Fridays.", 'She does not work on Fridays.'], explanation: 'Après doesn\'t, le verbe ne prend plus de -s.' },
      { kind: 'mcq', id: 'jj-g-ps-09', level: 'A2', prompt: 'Où placer « always » ? « I ___ check the pH ___. »', options: ['I always check the pH.', 'I check always the pH.', 'Always I check the pH.', 'I check the pH always.'], answer: 0, explanation: 'Les adverbes de fréquence se placent devant le verbe.' },
      { kind: 'transform', id: 'jj-g-ps-10', level: 'A1', instruction: 'Traduis en anglais.', prompt: 'Mon frère joue au football le samedi.', answers: ['My brother plays football on Saturdays.', 'My brother plays football on Saturday.', 'My brother plays soccer on Saturdays.'], explanation: 'He → plays ; le samedi = on Saturdays.' },
    ],
  },
  {
    id: 'jj-g-present-continuous',
    order: 21,
    group: 'temps',
    title: 'Le present continuous',
    level: 'A1',
    summary: 'Ce qui se passe maintenant : I\'m working.',
    tag: 'present',
    points: [
      {
        title: 'La forme : am / is / are + verbe-ing',
        explanation: 'I\'m working, she\'s drinking, they\'re playing. Orthographe : make → making (on enlève le e), run → running, swim → swimming (on double la consonne).',
        examples: [
          { en: "I'm cleaning the bioreactor.", fr: 'Je suis en train de nettoyer le bioréacteur.' },
          { en: "The kids are playing in the garden.", fr: 'Les enfants jouent dans le jardin (en ce moment).' },
          { en: "Are you watching the match?", fr: 'Tu regardes le match ?' },
        ],
      },
      {
        title: 'Quand l\'utiliser',
        explanation: 'Pour une action **en cours maintenant** (now, right now, at the moment, look!) ou une situation temporaire (this week).',
        examples: [
          { en: "Look! The dog is eating my sandwich!" },
          { en: "I'm working on a new project this week." },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-pc-01', level: 'A1', prompt: 'Be quiet! The baby ___.', hint: 'sleep', answers: ['is sleeping', "'s sleeping"], explanation: 'Maintenant → is sleeping.' },
      { kind: 'gap', id: 'jj-g-pc-02', level: 'A1', prompt: 'I ___ a beer right now.', hint: 'drink', answers: ['am drinking', "'m drinking"], explanation: 'Right now → am drinking.' },
      { kind: 'gap', id: 'jj-g-pc-03', level: 'A1', prompt: 'They ___ in the pool at the moment.', hint: 'swim', answers: ['are swimming', "'re swimming"], explanation: 'swim → swimming (double m).' },
      { kind: 'gap', id: 'jj-g-pc-04', level: 'A2', prompt: 'What ___ you doing?', answers: ['are'], explanation: 'Question : What are you doing?' },
      { kind: 'gap', id: 'jj-g-pc-05', level: 'A2', prompt: "She ___ (not) working today, she's ill.", hint: 'négatif', answers: ["isn't", 'is not', "'s not"], explanation: "Négatif : isn't working." },
      { kind: 'fix', id: 'jj-g-pc-06', level: 'A1', wrong: 'I am make a cake.', answers: ["I'm making a cake.", 'I am making a cake.'], explanation: 'am + verbe-ING (make → making).' },
      { kind: 'transform', id: 'jj-g-pc-07', level: 'A1', instruction: 'Traduis en anglais.', prompt: 'Je regarde le match (en ce moment).', answers: ["I'm watching the match.", "I'm watching the game.", 'I am watching the match.', 'I am watching the game.'], explanation: 'Action en cours → present continuous.' },
    ],
  },
  {
    id: 'jj-g-simple-vs-continuous',
    order: 22,
    group: 'temps',
    title: 'Present simple ou continuous ?',
    level: 'A2',
    summary: 'Habitude ou maintenant ?',
    tag: 'present',
    points: [
      {
        title: 'La différence',
        explanation: 'Present simple = **habitude, en général** (every day, usually). Present continuous = **maintenant, en ce moment** (now, today, at the moment). Certains verbes ne se mettent presque jamais en -ing : **like, love, hate, want, know, understand, need**.',
        examples: [
          { en: "I usually drink lager, but today I'm drinking a stout.", fr: "D'habitude je bois de la blonde, mais aujourd'hui je bois une stout." },
          { en: 'I understand now.', note: '✗ I\'m understanding' },
        ],
      },
    ],
    exercises: [
      { kind: 'mcq', id: 'jj-g-svc-01', level: 'A2', prompt: 'He ___ to work every day.', options: ['cycles', 'is cycling'], answer: 0, explanation: 'Every day → habitude → present simple.' },
      { kind: 'mcq', id: 'jj-g-svc-02', level: 'A2', prompt: 'Shh! I ___ on the phone.', options: ["'m talking", 'talk'], answer: 0, explanation: 'Maintenant → present continuous.' },
      { kind: 'mcq', id: 'jj-g-svc-03', level: 'A2', prompt: 'I ___ this beer. It\'s delicious!', options: ['love', "'m loving"], answer: 0, explanation: 'Love : verbe d\'état → present simple.' },
      { kind: 'gap', id: 'jj-g-svc-04', level: 'A2', prompt: 'Today I ___ from home.', hint: 'work', answers: ['am working', "'m working"], explanation: 'Today (temporaire) → present continuous.' },
      { kind: 'gap', id: 'jj-g-svc-05', level: 'A2', prompt: 'Bacteria ___ very fast.', hint: 'grow', answers: ['grow'], explanation: 'Vérité générale → present simple.' },
      { kind: 'fix', id: 'jj-g-svc-06', level: 'A2', wrong: "I'm knowing the answer.", answers: ['I know the answer.'], explanation: 'Know ne se met pas au continuous.' },
    ],
  },
  {
    id: 'jj-g-past-be',
    order: 23,
    group: 'temps',
    title: 'Le passé de be : was / were',
    level: 'A1',
    summary: 'J\'étais, tu étais, c\'était…',
    tag: 'past-simple',
    points: [
      {
        title: 'Was ou were ?',
        explanation: '**I / he / she / it was** ; **you / we / they were**. Négatif : wasn\'t / weren\'t. Question : Was it…? Were you…?',
        examples: [
          { en: 'The match was great!', fr: 'Le match était génial !' },
          { en: 'We were at the pub last night.', fr: 'On était au pub hier soir.' },
          { en: "I wasn't tired.", fr: "Je n'étais pas fatigué." },
          { en: 'Were you at work yesterday?', fr: 'Tu étais au travail hier ?' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-pb-01', level: 'A1', prompt: 'The beer ___ very good.', answers: ['was'], explanation: 'It → was.' },
      { kind: 'gap', id: 'jj-g-pb-02', level: 'A1', prompt: 'My friends ___ at the concert.', answers: ['were'], explanation: 'They → were.' },
      { kind: 'gap', id: 'jj-g-pb-03', level: 'A1', prompt: 'I ___ at home yesterday.', answers: ['was'], explanation: 'I → was.' },
      { kind: 'gap', id: 'jj-g-pb-04', level: 'A1', prompt: '___ you tired after the match?', answers: ['Were'], explanation: 'You → Were.' },
      { kind: 'fix', id: 'jj-g-pb-05', level: 'A1', wrong: 'We was very happy.', answers: ['We were very happy.'], explanation: 'We → were.' },
    ],
  },
  {
    id: 'jj-g-past-simple',
    order: 24,
    group: 'temps',
    title: 'Le past simple',
    level: 'A2',
    summary: 'Raconter ce qui s\'est passé (hier, la semaine dernière…).',
    tag: 'past-simple',
    points: [
      {
        title: 'Verbes réguliers : -ed',
        explanation: 'work → work**ed**, play → play**ed**, stop → stop**ped**, study → stud**ied**. Même forme pour toutes les personnes. On l\'utilise avec un moment terminé : **yesterday, last week, in 2020, two days ago**.',
        examples: [
          { en: 'I watched the match yesterday.', fr: "J'ai regardé le match hier.", note: 'En français on dit souvent « j\'ai regardé » : en anglais, c\'est le past simple.' },
          { en: 'We visited a brewery last weekend.', fr: 'Nous avons visité une brasserie le week-end dernier.' },
        ],
      },
      {
        title: 'Les verbes irréguliers les plus courants',
        explanation: 'Il faut les apprendre par cœur (voir la page « Verbes irréguliers ») : go → **went**, have → **had**, do → **did**, make → **made**, see → **saw**, drink → **drank**, eat → **ate**, buy → **bought**, get → **got**, take → **took**.',
        examples: [
          { en: 'I went to Brussels and I drank a gueuze.', fr: "Je suis allé à Bruxelles et j'ai bu une gueuze." },
          { en: 'We had a great time.' },
        ],
      },
      {
        title: 'Négatif et question : did',
        explanation: 'Négatif : **didn\'t + verbe de base** (I didn\'t go). Question : **Did + sujet + verbe de base** (Did you go?). Le verbe reprend sa forme de base car « did » porte déjà le passé.',
        examples: [
          { en: "I didn't see the goal.", note: '✗ I didn\'t saw' },
          { en: 'Did you like the beer?' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-past-01', level: 'A2', prompt: 'I ___ football yesterday.', hint: 'play', answers: ['played'], explanation: 'Régulier : played.' },
      { kind: 'gap', id: 'jj-g-past-02', level: 'A2', prompt: 'We ___ to the pub last night.', hint: 'go', answers: ['went'], explanation: 'go → went.' },
      { kind: 'gap', id: 'jj-g-past-03', level: 'A2', prompt: 'She ___ a new bike last week.', hint: 'buy', answers: ['bought'], explanation: 'buy → bought.' },
      { kind: 'gap', id: 'jj-g-past-04', level: 'A2', prompt: 'I ___ three beers at the festival.', hint: 'drink', answers: ['drank', 'had'], explanation: 'drink → drank.' },
      { kind: 'gap', id: 'jj-g-past-05', level: 'A2', prompt: 'They ___ the bioreactor two days ago.', hint: 'clean', answers: ['cleaned'], explanation: 'Régulier : cleaned.' },
      { kind: 'gap', id: 'jj-g-past-06', level: 'A2', prompt: "I ___ (not) see the goal.", hint: 'négatif', answers: ["didn't", 'did not'], explanation: "Négatif : didn't + see." },
      { kind: 'gap', id: 'jj-g-past-07', level: 'A2', prompt: '___ you watch the match yesterday?', answers: ['Did'], explanation: 'Question au passé : Did.' },
      { kind: 'fix', id: 'jj-g-past-08', level: 'A2', wrong: "I didn't went to work yesterday.", answers: ["I didn't go to work yesterday.", 'I did not go to work yesterday.'], explanation: "Après didn't → verbe de base (go)." },
      { kind: 'fix', id: 'jj-g-past-09', level: 'A2', wrong: 'Yesterday I have visited a brewery.', answers: ['Yesterday I visited a brewery.', 'I visited a brewery yesterday.'], explanation: 'Yesterday (moment terminé) → past simple, pas « have visited ».' },
      { kind: 'transform', id: 'jj-g-past-10', level: 'A2', instruction: 'Traduis en anglais.', prompt: "J'ai mangé une pizza hier soir.", answers: ['I ate a pizza last night.', 'I had a pizza last night.', 'I ate a pizza yesterday evening.', 'I had a pizza yesterday evening.', 'I ate pizza last night.', 'I had pizza last night.'], explanation: '« J\'ai mangé » + hier soir → past simple : ate (ou had).' },
    ],
  },
  {
    id: 'jj-g-future',
    order: 25,
    group: 'temps',
    title: 'Le futur : going to et will',
    level: 'A2',
    summary: 'Parler de ses projets et faire des prédictions.',
    tag: 'future',
    points: [
      {
        title: 'Be going to : un projet décidé',
        explanation: '**am / is / are + going to + verbe** : ce qu\'on a déjà prévu.',
        examples: [
          { en: "I'm going to brew a new beer this weekend.", fr: 'Je vais brasser une nouvelle bière ce week-end.' },
          { en: 'We are going to watch the match on Saturday.' },
        ],
      },
      {
        title: 'Will : décision immédiate, promesse, prédiction',
        explanation: '**will + verbe** (I\'ll, she\'ll) pour une décision prise maintenant, une promesse ou une prédiction. Négatif : **won\'t**.',
        examples: [
          { en: "It's cold. I'll close the window.", fr: 'Il fait froid. Je vais fermer la fenêtre (je décide maintenant).' },
          { en: "Don't worry, I'll help you.", fr: "Ne t'inquiète pas, je t'aiderai." },
          { en: "I think Belgium will win.", fr: 'Je pense que la Belgique va gagner.' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-fut-01', level: 'A2', prompt: "I've decided: I ___ buy a new bike next month.", answers: ['am going to', "'m going to"], explanation: 'Projet décidé → going to.' },
      { kind: 'gap', id: 'jj-g-fut-02', level: 'A2', prompt: "The phone is ringing. — I ___ answer it!", answers: ['will', "'ll"], explanation: 'Décision immédiate → will.' },
      { kind: 'gap', id: 'jj-g-fut-03', level: 'A2', prompt: 'I think it ___ rain tomorrow.', answers: ['will'], explanation: 'Prédiction (I think) → will.' },
      { kind: 'gap', id: 'jj-g-fut-04', level: 'A2', prompt: 'We ___ visit a brewery on Saturday. We booked it last week.', answers: ['are going to', "'re going to"], explanation: 'Projet prévu → going to.' },
      { kind: 'fix', id: 'jj-g-fut-05', level: 'A2', wrong: 'I will to call you tomorrow.', answers: ["I'll call you tomorrow.", 'I will call you tomorrow.'], explanation: 'Will + verbe SANS « to ».' },
      { kind: 'transform', id: 'jj-g-fut-06', level: 'A2', instruction: 'Traduis en anglais avec « going to ».', prompt: 'Je vais jouer au tennis demain.', answers: ["I'm going to play tennis tomorrow.", 'I am going to play tennis tomorrow.'], explanation: 'Projet : be going to + verbe.' },
    ],
  },
  {
    id: 'jj-g-present-perfect-intro',
    order: 26,
    group: 'temps',
    title: 'Découverte : le present perfect (B1)',
    level: 'B1',
    summary: 'Have you ever…? Pour parler de ses expériences.',
    tag: 'present-perfect',
    points: [
      {
        title: 'Have you ever…?',
        explanation: '**have / has + participe passé** pour parler d\'une expérience dans la vie, SANS dire quand : Have you ever been to Ireland? Dès qu\'on dit quand (yesterday, in 2019), on repasse au past simple.',
        examples: [
          { en: 'Have you ever tasted a Trappist beer?', fr: 'As-tu déjà goûté une trappiste ?' },
          { en: "I've never been to London.", fr: 'Je ne suis jamais allé à Londres.' },
          { en: 'I went to London in 2019.', note: 'Date précise → past simple' },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-pp-01', level: 'B1', prompt: 'Have you ever ___ to Ireland?', hint: 'be', answers: ['been'], explanation: 'be → been (participe passé).' },
      { kind: 'gap', id: 'jj-g-pp-02', level: 'B1', prompt: "I've never ___ a Guinness.", hint: 'drink', answers: ['drunk', 'tasted', 'had', 'tried'], explanation: 'drink → drank → drunk.' },
      { kind: 'mcq', id: 'jj-g-pp-03', level: 'B1', prompt: 'I ___ to Dublin last year.', options: ['went', 'have been', 'have gone'], answer: 0, explanation: 'Last year (moment précis) → past simple.' },
    ],
  },
]

export const jujuGrammarLessons: GrammarLesson[] = [...coreLessons, ...lexieGrammar]

export const jujuGrammarGroups = [
  { id: 'temps' as const, title: 'Les temps', icon: '⏳', description: 'Present simple, continuous, passé, futur.' },
  { id: 'structures' as const, title: 'Les bases', icon: '🧱', description: 'Be, have, there is, can, les questions, comparer.' },
  { id: 'mots' as const, title: 'Petits mots', icon: '🔤', description: 'A / an / the, pluriels, possessifs, in / on / at.' },
]
