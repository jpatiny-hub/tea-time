import type { ThemeLesson } from '../types'
import { extra } from './edition-content.ts'

// ---------------------------------------------------------------------------
// Thèmes & culture : des leçons autonomes autour d'une fête ou d'un sujet culturel.
// Règle : ne jamais changer l'`id` d'un exercice existant (il porte ta progression).
// ---------------------------------------------------------------------------

const halloween: ThemeLesson = {
  id: 'th-halloween',
  title: 'Halloween',
  icon: '🎃',
  summary: 'Origines, traditions, films cultes, superstitions et expressions « qui font peur » (très utiles au bureau).',
  intro:
    "Halloween, c'est l'occasion idéale de découvrir des références culturelles que tout anglophone connaît, des expressions idiomatiques qu'on entend aussi au travail (skeleton staff, ghosting, dead in the water…) et de réviser les temps du récit en racontant une histoire qui fait peur.",
  season: { from: '10-01', to: '11-10' },
  culture: [
    {
      title: "D'où vient Halloween ?",
      explanation:
        "Halloween vient de **Samhain**, une fête celte (Irlande, Écosse) qui marquait la fin des récoltes : on croyait que, cette nuit-là, les esprits des morts revenaient sur terre. L'Église a ensuite placé la Toussaint (**All Saints' Day** ou **All Hallows' Day**) le 1er novembre : la veille est devenue **All Hallows' Eve**, abrégé en **Halloween**. Les immigrés irlandais et écossais ont apporté la fête aux États-Unis au XIXe siècle, qui l'ont ensuite exportée dans le monde entier.",
      examples: [
        { en: "Halloween is short for All Hallows' Eve.", fr: 'Halloween est l\'abréviation de « All Hallows\' Eve ».' },
        { en: "Jack-o'-lanterns were originally carved from turnips.", fr: 'Les premières lanternes étaient taillées dans des navets.' },
        { en: 'Irish immigrants brought the tradition to America.', fr: 'Ce sont les immigrés irlandais qui ont apporté la tradition en Amérique.' },
      ],
    },
    {
      title: 'Les traditions',
      explanation: 'Ce qu\'on fait le 31 octobre dans les pays anglophones, et comment on le dit.',
      examples: [],
      table: {
        head: ['En anglais', 'Ce que c\'est'],
        rows: [
          ['to go trick-or-treating', 'Les enfants déguisés sonnent aux portes : « Trick or treat! » (des bonbons ou un sort)'],
          ["to carve a jack-o'-lantern", 'Évider et sculpter une citrouille, puis y mettre une bougie'],
          ['to dress up (as a witch)', 'Se déguiser (en sorcière) — le déguisement = a costume'],
          ['a haunted house', 'Une maison hantée (souvent une attraction : on paie pour avoir peur)'],
          ['bobbing for apples', 'Attraper avec les dents des pommes qui flottent dans une bassine (UK, Irlande)'],
          ['a costume party', 'Une soirée déguisée'],
          ['a corn maze / a pumpkin patch', 'Un labyrinthe de maïs / un champ de citrouilles où l\'on choisit la sienne (US)'],
        ],
      },
    },
    {
      title: 'Les références à connaître',
      explanation:
        "Ces œuvres reviennent sans cesse dans les conversations, les blagues et les publicités. Piège classique : **Frankenstein** est le nom du savant, pas de la créature (« Frankenstein's monster »).",
      examples: [
        { en: 'Who you gonna call? Ghostbusters!', note: 'Ghostbusters (1984) — la chanson du film' },
        { en: "Here's Johnny!", note: 'The Shining (Stanley Kubrick, 1980), d\'après Stephen King' },
        { en: 'I see dead people.', note: 'The Sixth Sense (1999)' },
        { en: "It's alive! It's alive!", note: 'Frankenstein (film de 1931), d\'après le roman de Mary Shelley (1818)' },
        { en: "They're here!", note: 'Poltergeist (1982)' },
        { en: 'Be afraid. Be very afraid.', note: 'The Fly (1986) — devenue une expression pour plaisanter' },
        { en: 'Quoth the Raven, "Nevermore."', note: 'The Raven, poème d\'Edgar Allan Poe (1845)' },
      ],
      table: {
        head: ['Référence', 'Ce qu\'il faut savoir'],
        rows: [
          ['Dracula (Bram Stoker, 1897)', 'Le vampire de Transylvanie ; a inventé l\'image moderne du vampire'],
          ['The Legend of Sleepy Hollow (1820)', 'Washington Irving : le cavalier sans tête (the Headless Horseman)'],
          ['Thriller (Michael Jackson, 1982)', 'Le clip des zombies, dansé dans toutes les soirées d\'Halloween'],
          ['Halloween (John Carpenter, 1978)', 'Michael Myers, le masque blanc : le film d\'horreur « slasher » de référence'],
          ['Psycho (Hitchcock, 1960)', 'La scène de la douche et le Bates Motel'],
          ['The Addams Family / Wednesday', 'La famille gothique ; la série « Wednesday » (2022) l\'a remise à la mode'],
          ['Hocus Pocus, The Nightmare Before Christmas (1993)', 'Les films d\'Halloween « familiaux » que les Américains revoient chaque année'],
          ['Stranger Things', 'Série Netflix : années 80, monstres et vélos — l\'épisode d\'Halloween est culte'],
        ],
      },
    },
    {
      title: 'Au Royaume-Uni : Bonfire Night (5 novembre)',
      explanation:
        "Quelques jours après Halloween, les Britanniques fêtent **Guy Fawkes Night** : en 1605, Guy Fawkes et des conspirateurs catholiques ont tenté de faire sauter le Parlement (**the Gunpowder Plot**, la Conspiration des poudres). Le complot a échoué ; depuis, on allume de grands feux (**bonfires**), on tire des feux d'artifice et on brûle parfois une effigie de Guy Fawkes. Son masque est devenu célèbre grâce au film « V for Vendetta ».",
      examples: [
        { en: 'Remember, remember the fifth of November, gunpowder, treason and plot.', note: 'La comptine que tous les enfants britanniques connaissent' },
        { en: 'We went to see the fireworks on Bonfire Night.', fr: 'On est allés voir le feu d\'artifice le soir du 5 novembre.' },
      ],
    },
    {
      title: 'Superstitions… et first conditional',
      explanation:
        "Les superstitions s'expriment presque toujours avec le **first conditional** : **If + présent, will + base verbale**. Pour conjurer le sort, les Britanniques disent **touch wood** et les Américains **knock on wood** (« je touche du bois »).",
      examples: [
        { en: "If you break a mirror, you'll have seven years of bad luck.", fr: 'Si tu casses un miroir, tu auras sept ans de malheur.' },
        { en: "If a black cat crosses your path, you'll have bad luck.", note: 'Au Royaume-Uni, le chat noir porte souvent… bonheur !' },
        { en: "Don't open an umbrella indoors — it'll bring bad luck.", fr: 'N\'ouvre pas un parapluie à l\'intérieur.' },
        { en: "Friday the 13th is considered unlucky.", note: 'unlucky = qui porte malheur ; ✗ unchance' },
        { en: "I've never had a car accident, touch wood.", fr: 'Je n\'ai jamais eu d\'accident, je touche du bois.' },
      ],
    },
    {
      title: 'Raconter une histoire qui fait peur : les temps du récit',
      explanation:
        "Une bonne histoire de fantômes, c'est l'exercice parfait pour les temps du passé : le **past continuous** plante le décor, le **past simple** fait avancer l'action, le **past perfect** remonte à ce qui s'était passé avant.",
      examples: [
        { en: 'It was raining, and the wind was howling.', note: 'Décor → past continuous' },
        { en: 'Suddenly, the door slammed shut.', note: 'Événement → past simple' },
        { en: 'I was walking home when I heard footsteps behind me.', note: 'Action en cours (was walking) interrompue (heard)' },
        { en: 'I realised that someone had moved the candles.', note: 'Avant un autre moment du passé → past perfect' },
        { en: 'All of a sudden… / Out of nowhere… / My heart was pounding.', fr: 'Tout à coup… / Sorti de nulle part… / Mon cœur battait la chamade.' },
      ],
    },
    {
      title: "Déduire : « It must have been the wind! »",
      explanation:
        "Pour expliquer un bruit étrange, on fait des hypothèses avec les **modaux de déduction au passé** : **must have** (j'en suis sûr), **might / could have** (c'est possible), **can't / couldn't have** (c'est impossible) + participe passé. C'est le lien avec ton module « Making Assumptions ».",
      examples: [
        { en: 'It must have been the wind.', fr: 'Ça a dû être le vent (j\'en suis sûr).' },
        { en: 'It might have been a cat.', fr: 'C\'était peut-être un chat.' },
        { en: "It can't have been a ghost — ghosts don't exist!", fr: 'Ça ne peut pas être un fantôme !', note: '✗ It mustn\'t have been' },
      ],
    },
    {
      title: 'Scared ou scary ? Costume ou disguise ?',
      explanation:
        "Adjectifs en **-ed** = ce qu'on ressent (I'm scared, frightened, terrified) ; en **-ing** ou **-y** = ce qui provoque l'émotion (a scary film, a frightening noise, a terrifying story). Avoir peur DE = **scared OF / afraid OF**. Nuances : **spooky** = un peu effrayant, pour s'amuser ; **creepy** = malsain, qui met mal à l'aise ; **eerie** = étrange et inquiétant. Et pour une fête, on porte **a costume** ; **a disguise** sert à ne pas être reconnu.",
      examples: [
        { en: "I'm scared of spiders.", note: '✗ I\'m scary of spiders / afraid from spiders' },
        { en: 'The film was so scary that I couldn\'t sleep.' },
        { en: "I'm going to dress up as a vampire.", note: '✗ I\'m going to disguise myself as a vampire' },
      ],
    },
  ],
  deckIds: ['halloween', 'halloween-idioms'],
  speaking: [
    { id: 'th-halloween-sp-01', question: 'Do people celebrate Halloween where you live? How has that changed since you were a child?', focus: 'Present perfect pour le changement (it has become…, more people have started…) et used to pour le passé.' },
    { id: 'th-halloween-sp-02', question: 'Tell me about a time when you were really scared.', focus: 'Past continuous pour le décor, past simple pour les événements.' },
    { id: 'th-halloween-sp-03', question: "What's the scariest film or series you've ever watched? Would you recommend it?", focus: 'Superlatif + present perfect (the scariest… I\'ve ever seen).' },
    { id: 'th-halloween-sp-04', question: 'Are you superstitious? Describe a superstition from Belgium or France and explain where it might come from.', focus: 'First conditional (If you…, you\'ll…) et modaux de déduction (it might come from…).' },
    { id: 'th-halloween-sp-05', question: 'You hear a strange noise in the lab late at night. What could it be? Make at least three assumptions.', focus: 'It might be… / It must be… / It can\'t be…' },
    { id: 'th-halloween-sp-06', question: 'Should companies organise Halloween parties or costume days at work? Give arguments for and against.', focus: 'Expressions du module « Opinions » : On the one hand… / Personally, I feel that…' },
  ],
  readingId: 'r-halloween',
  dialogueId: 'd-halloween-party',
  writingTaskIds: ['w-halloween-story'],
  exercises: [
    // --- Culture
    {
      kind: 'mcq', id: 'th-halloween-01', level: 'B2', tags: ['culture'],
      prompt: 'The word "Halloween" comes from…',
      options: ["All Hallows' Eve, the evening before All Saints' Day", 'the name of a Celtic witch', 'an American TV show', 'an old word for "pumpkin"'],
      answer: 0,
      explanation: "Hallow = saint (vieil anglais), eve = veille. All Hallows' Eve → Hallowe'en → Halloween.",
    },
    {
      kind: 'mcq', id: 'th-halloween-02', level: 'B2', tags: ['culture'],
      prompt: "In Ireland, the first jack-o'-lanterns were carved from…",
      options: ['turnips', 'pumpkins', 'apples', 'melons'],
      answer: 0,
      explanation: 'Des navets ! Les immigrés irlandais ont adopté la citrouille aux États-Unis, plus grosse et plus facile à creuser.',
    },
    {
      kind: 'mcq', id: 'th-halloween-03', level: 'B2', tags: ['culture'],
      prompt: 'In Mary Shelley\'s novel, who is Frankenstein?',
      options: ['The scientist who creates the creature', 'The monster', 'A vampire from Transylvania', 'The Headless Horseman'],
      answer: 0,
      explanation: 'Victor Frankenstein est le savant. La créature n\'a pas de nom : on dit « Frankenstein\'s monster ».',
    },
    {
      kind: 'mcq', id: 'th-halloween-04', level: 'B2', tags: ['culture'],
      prompt: '"Who you gonna call?" Which film is this famous line from?',
      options: ['Ghostbusters', 'The Shining', 'Psycho', 'Dracula'],
      answer: 0,
      explanation: 'Ghostbusters (1984). « Gonna » = going to, à l\'oral uniquement.',
    },
    {
      kind: 'mcq', id: 'th-halloween-05', level: 'B2+', tags: ['culture'],
      prompt: 'What do British people celebrate on 5 November?',
      options: ['Bonfire Night (Guy Fawkes Night)', 'Halloween', "All Saints' Day", 'Thanksgiving'],
      answer: 0,
      explanation: 'La Conspiration des poudres de 1605 : feux de joie et feux d\'artifice. « Remember, remember the fifth of November… »',
    },
    {
      kind: 'mcq', id: 'th-halloween-06', level: 'B2+', tags: ['culture'],
      prompt: 'To avoid bad luck after saying something positive, a British person says…',
      options: ['Touch wood!', 'Break a leg!', 'Trick or treat!', 'Fingers down!'],
      answer: 0,
      explanation: '« Touch wood » (UK) / « knock on wood » (US) = je touche du bois. « Break a leg! » = bonne chance (avant un spectacle).',
    },
    // --- Vocabulaire et adjectifs
    {
      kind: 'mcq', id: 'th-halloween-07', level: 'B2', tags: ['word-choice'],
      prompt: "I don't like horror films. I'm too ___.",
      options: ['easily scared', 'easily scary', 'scaring', 'scarily'],
      answer: 0,
      explanation: '-ed = ce que je ressens (scared) ; -y / -ing = ce qui fait peur (a scary film).',
    },
    {
      kind: 'gap', id: 'th-halloween-08', level: 'B2', tags: ['word-choice'],
      prompt: 'The film was so ___ that I slept with the light on.',
      hint: 'qui fait peur',
      answers: ['scary', 'frightening', 'terrifying', 'creepy', 'spooky', 'horrifying'],
      explanation: 'Adjectif qui décrit ce qui provoque la peur : scary, frightening, terrifying (✗ scared, frightened).',
    },
    {
      kind: 'gap', id: 'th-halloween-09', level: 'B2', tags: ['prepositions'],
      prompt: 'My daughter is scared ___ the dark.',
      answers: ['of'],
      explanation: 'Scared OF, afraid OF, frightened OF, terrified OF.',
    },
    {
      kind: 'fix', id: 'th-halloween-10', level: 'B2', tags: ['false-friends'],
      wrong: "I'm going to disguise myself as a witch for the party.",
      answers: ["I'm going to dress up as a witch for the party.", 'I am going to dress up as a witch for the party.', "I'll dress up as a witch for the party.", "I'm dressing up as a witch for the party."],
      explanation: 'Se déguiser (pour une fête) = DRESS UP AS. « Disguise yourself » = se déguiser pour ne pas être reconnu (un espion, un voleur).',
    },
    {
      kind: 'fix', id: 'th-halloween-11', level: 'B2', tags: ['prepositions'],
      wrong: 'Do you believe to ghosts?',
      answers: ['Do you believe in ghosts?'],
      explanation: 'Croire AUX fantômes = believe IN ghosts. (Believe someone = croire ce que dit qqn.)',
    },
    {
      kind: 'fix', id: 'th-halloween-12', level: 'B2', tags: ['spelling'],
      wrong: 'People say the old house at the end of the street is hunted.',
      answers: ['People say the old house at the end of the street is haunted.', 'People say that the old house at the end of the street is haunted.'],
      explanation: 'HAUNTED = hanté ; HUNTED = chassé. À l\'oral, attention au « h » expiré et au son « aw » : HAWN-tid.',
    },
    {
      kind: 'fix', id: 'th-halloween-13', level: 'B2', tags: ['word-choice'],
      wrong: 'What is your Halloween disguise this year?',
      answers: ['What is your Halloween costume this year?', "What's your Halloween costume this year?"],
      explanation: 'Le déguisement d\'une fête = a costume. (Un costume-cravate = a suit.)',
    },
    // --- Expressions
    {
      kind: 'mcq', id: 'th-halloween-14', level: 'B2+', tags: ['idioms'],
      prompt: '"The office is a ghost town on Friday afternoons." This means that…',
      options: ['almost nobody is there', 'the office is haunted', 'people tell ghost stories', 'the office is very old'],
      answer: 0,
    },
    {
      kind: 'mcq', id: 'th-halloween-15', level: 'B2+', tags: ['idioms'],
      prompt: '"The candidate ghosted us after the second interview." What did the candidate do?',
      options: ['Stopped answering without any explanation', 'Accepted the job', 'Sent a polite refusal', 'Dressed up as a ghost'],
      answer: 0,
    },
    {
      kind: 'gap', id: 'th-halloween-16', level: 'C1', tags: ['idioms'],
      prompt: 'Between Christmas and New Year, we only have a ___ staff in the lab.',
      hint: 'effectif réduit au minimum',
      answers: ['skeleton'],
      explanation: 'A skeleton staff / a skeleton crew = le personnel minimum pour faire tourner le service.',
    },
    {
      kind: 'gap', id: 'th-halloween-17', level: 'C1', tags: ['idioms'],
      prompt: 'Nobody wants to work the ___ shift, from 10 p.m. to 6 a.m.',
      hint: 'le poste de nuit',
      answers: ['graveyard', 'night'],
      explanation: 'The graveyard shift = le poste de nuit (familier). « The night shift » est le terme neutre.',
    },
    {
      kind: 'mcq', id: 'th-halloween-18', level: 'C1', tags: ['idioms'],
      prompt: '"After fifteen years, the old centrifuge finally gave up the ghost." The centrifuge…',
      options: ['stopped working for good', 'started making strange noises', 'was replaced too early', 'was haunted'],
      answer: 0,
    },
    {
      kind: 'gap', id: 'th-halloween-19', level: 'B2+', tags: ['idioms'],
      prompt: "If the printer jams again, just restart it — that usually does the ___.",
      hint: "ça fait l'affaire",
      answers: ['trick', 'job'],
      explanation: 'To do the trick (ou to do the job) = faire l\'affaire, régler le problème.',
    },
    {
      kind: 'gap', id: 'th-halloween-20', level: 'C1', tags: ['idioms'],
      prompt: 'Without funding, the new project is dead in the ___.',
      answers: ['water'],
      explanation: 'Dead in the water = au point mort, sans avenir (comme un bateau sans vent).',
    },
    {
      kind: 'gap', id: 'th-halloween-21', level: 'B2+', tags: ['idioms'],
      prompt: 'After months of arguing, the two managers finally buried the ___.',
      answers: ['hatchet'],
      explanation: 'To bury the hatchet = enterrer la hache de guerre.',
    },
    {
      kind: 'mcq', id: 'th-halloween-22', level: 'C1', tags: ['idioms'],
      prompt: '"Let\'s find the root cause of the deviation, not start a ___."',
      options: ['witch hunt', 'ghost town', 'skeleton crew', 'graveyard shift'],
      answer: 0,
      explanation: 'A witch hunt = une chasse aux sorcières : chercher un coupable plutôt qu\'une cause. Très utile en qualité (blame-free culture).',
    },
    {
      kind: 'transform', id: 'th-halloween-23', level: 'C1', tags: ['idioms'],
      instruction: 'Garde le même sens en utilisant l\'expression « scare the living daylights out of ». Commence par « The fire alarm… ».',
      prompt: 'The fire alarm frightened me terribly.',
      answers: ['The fire alarm scared the living daylights out of me.'],
      explanation: 'To scare the living daylights out of someone = faire une peur bleue à quelqu\'un.',
    },
    {
      kind: 'gap', id: 'th-halloween-24', level: 'C1', tags: ['idioms'],
      prompt: 'Everyone seems to have a skeleton in the ___.',
      hint: 'un cadavre dans le placard',
      answers: ['closet', 'cupboard'],
      explanation: 'A skeleton in the closet (US) / in the cupboard (UK) = un secret honteux.',
    },
    // --- Grammaire : superstitions, récit, déduction
    {
      kind: 'gap', id: 'th-halloween-25', level: 'B2', tags: ['conditionals'],
      prompt: 'If you break a mirror, you ___ seven years of bad luck.',
      hint: 'have',
      answers: ['will have', "'ll have", 'will get'],
      explanation: 'First conditional : If + présent, WILL + base verbale. ✗ If you will break.',
    },
    {
      kind: 'gap', id: 'th-halloween-26', level: 'B2', tags: ['past-continuous'],
      prompt: 'I ___ home through the park when I heard footsteps behind me.',
      hint: 'walk',
      answers: ['was walking'],
      explanation: 'Action en cours (past continuous) interrompue par un événement (past simple : heard).',
    },
    {
      kind: 'gap', id: 'th-halloween-27', level: 'B2', tags: ['past-simple'],
      prompt: 'I turned around, but there ___ nobody there.',
      hint: 'be',
      answers: ['was'],
      explanation: 'Récit d\'événements terminés → past simple. « Nobody » est déjà négatif : ✗ there wasn\'t nobody.',
    },
    {
      kind: 'gap', id: 'th-halloween-28', level: 'B2+', tags: ['past-perfect'],
      prompt: 'When I came back to the lab, I realised that someone ___ the samples.',
      hint: 'move',
      answers: ['had moved', 'had touched'],
      explanation: 'Le déplacement s\'est produit AVANT « I realised » → past perfect (had + participe passé).',
    },
    {
      kind: 'transform', id: 'th-halloween-29', level: 'B2+', tags: ['modals-deduction'],
      instruction: 'Même sens, avec un modal de déduction au passé. Commence par « It… ».',
      prompt: "I'm sure it was the wind.",
      answers: ['It must have been the wind.', "It must've been the wind."],
      explanation: 'Certitude sur le passé = MUST HAVE + participe passé.',
    },
    {
      kind: 'transform', id: 'th-halloween-30', level: 'B2+', tags: ['modals-deduction'],
      instruction: 'Même sens, avec un modal de déduction au passé. Commence par « It… ».',
      prompt: "I'm sure it wasn't a ghost.",
      answers: ["It can't have been a ghost.", "It couldn't have been a ghost.", 'It cannot have been a ghost.', 'It could not have been a ghost.'],
      explanation: 'Impossibilité dans le passé = CAN\'T / COULDN\'T HAVE + participe passé (✗ mustn\'t have).',
    },
    {
      kind: 'mcq', id: 'th-halloween-31', level: 'B2+', tags: ['modals-deduction'],
      prompt: 'The lights went out and the door slammed. "It ___ been the storm — the power is down in the whole street."',
      options: ['must have', "can't have", 'should have', 'mustn\'t have'],
      answer: 0,
      explanation: 'Indice concret (toute la rue est privée de courant) → déduction sûre : must have been.',
    },
    {
      kind: 'transform', id: 'th-halloween-32', level: 'C1', tags: ['pp-vs-ps', 'present-perfect'],
      instruction: 'Même sens. Commence par « Halloween has… » (present perfect + since).',
      prompt: 'Halloween became popular in Belgium in the late 1990s, and it is still popular today.',
      answers: ['Halloween has been popular in Belgium since the late 1990s.', 'Halloween has been popular in Belgium since the late nineties.'],
      explanation: 'Situation qui commence dans le passé et dure encore → present perfect + SINCE (point de départ).',
    },
  ],
}

// Les thèmes actuels sont de niveau B2 → C1 : réservés à l'accès Jojo pour l'instant.
export const themes: ThemeLesson[] = extra ? [] : [halloween]

/** Le thème de saison (s'il y en a un) à mettre en avant sur l'accueil. */
export function seasonalTheme(date = new Date()): ThemeLesson | undefined {
  const md = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return themes.find((t) => t.season && md >= t.season.from && md <= t.season.to)
}
