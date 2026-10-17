import type { CourseModule, Dialogue, GrammarLesson, ReadingText, VocabDeck, VocabItem } from '../../types'

// Parcours « Lexie 👶 » (accès Jujularage) : parler anglais à un tout-petit, au fil de la journée.
// 6 étapes progressives : mots doux → repas → change, bain et dodo → s'habiller et sortir
// → jouer et chanter → émotions et sécurité.
// Règle : ne jamais changer l'`id` d'un contenu existant (il porte la progression).

const tr = 'Traduis en anglais (tu parles à Lexie).'
const GROUP = 'Lexie 👶 — Parler anglais avec bébé'

// ---------------------------------------------------------------------------- Vocabulaire

const lexieLove: VocabItem[] = [
  { id: 'lx-sweetie', en: 'sweetie / sweetheart', fr: 'ma chérie, mon cœur', level: 'A1', example: 'Good morning, sweetie!' },
  { id: 'lx-baby-girl', en: 'baby girl', fr: 'ma petite fille, ma puce', level: 'A1', example: "Come here, baby girl." },
  { id: 'lx-i-love-you', en: 'I love you', fr: "je t'aime", level: 'A1', example: 'I love you so much!' },
  { id: 'lx-good-girl', en: 'good girl!', fr: "c'est bien ! (bravo ma fille)", level: 'A1', example: 'You ate everything, good girl!' },
  { id: 'lx-well-done', en: 'well done! / great job!', fr: 'bravo !', level: 'A1', example: 'You did it! Well done!' },
  { id: 'lx-daddys-here', en: "Daddy's here", fr: 'papa est là', level: 'A1', example: "Don't cry, Daddy's here." },
  { id: 'lx-mummy', en: 'Mummy / Mommy', fr: 'maman', level: 'A1', example: 'Where is Mummy?', note: 'UK : Mummy ; US : Mommy.' },
  { id: 'lx-hug', en: 'a hug / a cuddle', fr: 'un câlin', level: 'A1', example: 'Do you want a cuddle?' },
  { id: 'lx-kiss', en: 'a kiss', fr: 'un bisou', level: 'A1', example: 'Give Daddy a kiss!' },
  { id: 'lx-smile', en: 'to smile', fr: 'sourire', level: 'A1', example: 'Look at you smiling!' },
  { id: 'lx-clever', en: 'clever', fr: 'malin, intelligent', level: 'A2', example: 'What a clever girl!' },
  { id: 'lx-beautiful', en: 'beautiful', fr: 'belle, magnifique', level: 'A1', example: 'You look beautiful today.' },
]

const lexieMeals: VocabItem[] = [
  { id: 'lx-bottle', en: 'a bottle', fr: 'un biberon', level: 'A1', example: "It's time for your bottle." },
  { id: 'lx-milk', en: 'milk', fr: 'lait', level: 'A1', example: 'Do you want some milk?' },
  { id: 'lx-to-drink', en: 'to drink', fr: 'boire', level: 'A1', example: 'Drink your milk, sweetie.' },
  { id: 'lx-to-eat', en: 'to eat', fr: 'manger', level: 'A1', example: "Let's eat!" },
  { id: 'lx-hungry', en: 'hungry', fr: 'qui a faim', level: 'A1', example: 'Are you hungry?' },
  { id: 'lx-high-chair', en: 'a high chair', fr: 'une chaise haute', level: 'A2', example: 'Sit in your high chair.' },
  { id: 'lx-bib', en: 'a bib', fr: 'un bavoir, une bavette', level: 'A2', example: "Let's put your bib on." },
  { id: 'lx-spoon', en: 'a spoon', fr: 'une cuillère', level: 'A1', example: 'Open wide! Here comes the spoon!' },
  { id: 'lx-yummy', en: 'yummy!', fr: 'miam ! (c\'est bon !)', level: 'A1', example: 'Mmm, yummy!' },
  { id: 'lx-all-gone', en: 'all gone!', fr: 'tout est fini ! (il n\'y en a plus)', level: 'A1', example: 'All gone! Good girl!' },
  { id: 'lx-more', en: 'more', fr: 'encore (plus)', level: 'A1', example: 'Do you want more?' },
  { id: 'lx-to-burp', en: 'to burp', fr: 'faire son rot', level: 'A2', example: "Let's burp, then you can sleep." },
  { id: 'lx-snack', en: 'a snack', fr: 'un goûter, une collation', level: 'A2', example: 'Snack time! A banana or an apple?' },
  { id: 'lx-water', en: 'water', fr: 'eau', level: 'A1', example: 'Do you want some water?' },
  { id: 'lx-porridge', en: 'porridge / baby food', fr: 'bouillie, petit pot', level: 'A2', example: 'Your porridge is too hot. Let\'s blow on it.' },
]

const lexieCare: VocabItem[] = [
  { id: 'lx-nappy', en: 'a nappy / a diaper', fr: 'une couche', level: 'A2', example: 'Let me change your nappy.', note: 'UK : nappy ; US : diaper.' },
  { id: 'lx-to-change', en: 'to change (a nappy)', fr: 'changer (une couche)', level: 'A2', example: "Time to change your nappy!" },
  { id: 'lx-bath', en: 'a bath', fr: 'un bain', level: 'A1', example: "It's bath time!" },
  { id: 'lx-to-wash', en: 'to wash', fr: 'laver', level: 'A1', example: "Let's wash your hands." },
  { id: 'lx-towel', en: 'a towel', fr: 'une serviette (de bain)', level: 'A1', example: 'Here is your towel.' },
  { id: 'lx-toothbrush', en: 'a toothbrush', fr: 'une brosse à dents', level: 'A2', example: "Let's brush your teeth." },
  { id: 'lx-pyjamas', en: 'pyjamas', fr: 'pyjama', level: 'A1', example: 'Put your pyjamas on.', note: 'Toujours au pluriel : your pyjamas (US : pajamas).' },
  { id: 'lx-sleepy', en: 'sleepy / tired', fr: 'qui a sommeil, fatigué', level: 'A1', example: 'Are you sleepy?' },
  { id: 'lx-nap', en: 'a nap', fr: 'une sieste', level: 'A2', example: "It's nap time." },
  { id: 'lx-cot', en: 'a cot / a crib', fr: 'un lit de bébé', level: 'A2', example: 'Lexie is sleeping in her cot.', note: 'UK : cot ; US : crib.' },
  { id: 'lx-dummy', en: 'a dummy / a pacifier', fr: 'une tétine, une sucette', level: 'A2', example: "Where's your dummy?", note: 'UK : dummy ; US : pacifier.' },
  { id: 'lx-blanket', en: 'a blanket', fr: 'une couverture, un doudou-couverture', level: 'A2', example: 'Here is your blanket.' },
  { id: 'lx-teddy', en: 'a teddy / a cuddly toy', fr: 'un doudou, une peluche', level: 'A1', example: "Don't forget your teddy!" },
  { id: 'lx-night-night', en: 'night night / sleep tight', fr: 'bonne nuit (fais de beaux rêves)', level: 'A1', example: 'Night night, sweetie. Sleep tight!' },
  { id: 'lx-to-wake-up', en: 'to wake up', fr: 'se réveiller', level: 'A1', example: "Oh, you're awake! Did you wake up?" },
]

const lexieOut: VocabItem[] = [
  { id: 'lx-nursery', en: 'nursery / daycare', fr: 'crèche', level: 'A2', example: "We're going to nursery.", note: 'UK : nursery ; US : daycare.' },
  { id: 'lx-childminder', en: 'a childminder / a babysitter', fr: 'une gardienne, une accueillante', level: 'A2', example: 'Your childminder is very nice.' },
  { id: 'lx-coat', en: 'a coat', fr: 'un manteau', level: 'A1', example: 'Put your coat on, it\'s cold.' },
  { id: 'lx-shoes', en: 'shoes', fr: 'chaussures', level: 'A1', example: "Where are your shoes?" },
  { id: 'lx-hat', en: 'a hat', fr: 'un bonnet, un chapeau', level: 'A1', example: 'Hat on!' },
  { id: 'lx-socks', en: 'socks', fr: 'chaussettes', level: 'A1', example: 'One sock, two socks!' },
  { id: 'lx-to-get-dressed', en: 'to get dressed', fr: "s'habiller", level: 'A2', example: "Let's get dressed!" },
  { id: 'lx-buggy', en: 'a buggy / a pram / a stroller', fr: 'une poussette, un landau', level: 'A2', example: 'Sit in your buggy.', note: 'UK : buggy, pram ; US : stroller.' },
  { id: 'lx-car-seat', en: 'a car seat', fr: 'un siège auto', level: 'A2', example: 'Into your car seat!' },
  { id: 'lx-park', en: 'the park', fr: 'le parc', level: 'A1', example: "Let's go to the park!" },
  { id: 'lx-swing', en: 'a swing', fr: 'une balançoire', level: 'A2', example: 'Do you want to go on the swing?' },
  { id: 'lx-slide', en: 'a slide', fr: 'un toboggan', level: 'A2', example: 'Down the slide! Wheee!' },
  { id: 'lx-bye-bye', en: 'bye-bye! / see you later!', fr: 'au revoir ! / à tout à l\'heure !', level: 'A1', example: 'Wave bye-bye! See you later!' },
  { id: 'lx-to-wave', en: 'to wave', fr: 'faire coucou de la main', level: 'A2', example: 'Wave to Grandma!' },
]

const lexiePlay: VocabItem[] = [
  { id: 'lx-to-play', en: 'to play', fr: 'jouer', level: 'A1', example: "Let's play!" },
  { id: 'lx-toy', en: 'a toy', fr: 'un jouet', level: 'A1', example: 'Where is your toy?' },
  { id: 'lx-ball', en: 'a ball', fr: 'un ballon, une balle', level: 'A1', example: 'Throw the ball!' },
  { id: 'lx-blocks', en: 'blocks', fr: 'cubes (de construction)', level: 'A2', example: "Let's build a tower with your blocks." },
  { id: 'lx-book', en: 'a book', fr: 'un livre', level: 'A1', example: "Let's read a book." },
  { id: 'lx-peekaboo', en: 'peekaboo!', fr: 'coucou, caché !', level: 'A1', example: 'Where is Lexie? Peekaboo!' },
  { id: 'lx-to-clap', en: 'to clap (your hands)', fr: 'taper des mains', level: 'A2', example: 'Clap your hands!' },
  { id: 'lx-to-sing', en: 'to sing', fr: 'chanter', level: 'A1', example: "Let's sing a song!" },
  { id: 'lx-nursery-rhyme', en: 'a nursery rhyme', fr: 'une comptine', level: 'A2', example: 'Twinkle, Twinkle, Little Star is a nursery rhyme.' },
  { id: 'lx-your-turn', en: 'your turn / my turn', fr: 'à toi / à moi', level: 'A2', example: 'Your turn! Now my turn!' },
  { id: 'lx-to-share', en: 'to share', fr: 'partager', level: 'A2', example: 'Can you share with your friend?' },
  { id: 'lx-to-tidy-up', en: 'to tidy up', fr: 'ranger', level: 'A2', example: "Let's tidy up your toys." },
  { id: 'lx-what-does-the-cow-say', en: 'what does the cow say?', fr: 'que fait la vache ?', level: 'A1', example: 'What does the cow say? Moo!' },
  { id: 'lx-one-two-three', en: 'one, two, three!', fr: 'un, deux, trois !', level: 'A1', example: 'One, two, three… jump!' },
]

const lexieFeelings: VocabItem[] = [
  { id: 'lx-careful', en: 'careful!', fr: 'attention ! (fais attention)', level: 'A1', example: 'Careful! Hold my hand.' },
  { id: 'lx-hot', en: "hot! don't touch!", fr: 'chaud ! ne touche pas !', level: 'A1', example: "Hot! Don't touch the oven!" },
  { id: 'lx-gentle', en: 'gentle', fr: 'doucement (avec douceur)', level: 'A2', example: 'Be gentle with the cat.' },
  { id: 'lx-hurt', en: 'does it hurt?', fr: 'ça fait mal ?', level: 'A2', example: 'Oh no, you fell. Does it hurt?' },
  { id: 'lx-kiss-better', en: "let me kiss it better", fr: 'je fais un bisou magique (pour que ça guérisse)', level: 'A2', example: "Poor you! Let me kiss it better." },
  { id: 'lx-its-ok', en: "it's OK / you're OK", fr: "ça va, c'est rien", level: 'A1', example: "Shh, it's OK, you're OK." },
  { id: 'lx-sad', en: 'sad', fr: 'triste', level: 'A1', example: 'Are you sad?' },
  { id: 'lx-happy', en: 'happy', fr: 'content, heureux', level: 'A1', example: 'You look so happy!' },
  { id: 'lx-scared', en: 'scared', fr: 'qui a peur', level: 'A1', example: "Are you scared? Daddy's here." },
  { id: 'lx-angry', en: 'cross / angry', fr: 'fâché, en colère', level: 'A2', example: "I know you're cross." },
  { id: 'lx-sorry', en: 'say sorry', fr: 'dis pardon', level: 'A2', example: 'You pushed him. Say sorry.' },
  { id: 'lx-please-thank-you', en: 'say please / say thank you', fr: "dis s'il te plaît / dis merci", level: 'A1', example: 'What do you say? Thank you!' },
  { id: 'lx-no', en: "no, we don't do that", fr: 'non, on ne fait pas ça', level: 'A2', example: "No biting! We don't do that." },
]

export const lexieDecks: VocabDeck[] = [
  { id: 'lx-deck-love', title: 'Lexie · Les mots doux', icon: '💕', description: 'Sweetie, good girl, cuddle… pour encourager et rassurer.', kind: 'decouverte', items: lexieLove },
  { id: 'lx-deck-meals', title: 'Lexie · Les repas', icon: '🍼', description: 'Biberon, chaise haute, bavoir, « all gone! »', kind: 'decouverte', items: lexieMeals },
  { id: 'lx-deck-care', title: 'Lexie · Change, bain & dodo', icon: '🛁', description: 'Couche, bain, pyjama, sieste, doudou, « night night ».', kind: 'decouverte', items: lexieCare },
  { id: 'lx-deck-out', title: 'Lexie · S\'habiller & sortir', icon: '🧥', description: 'Crèche, manteau, poussette, parc, balançoire.', kind: 'decouverte', items: lexieOut },
  { id: 'lx-deck-play', title: 'Lexie · Jouer & chanter', icon: '🧸', description: 'Jouets, coucou-caché, comptines, à toi / à moi.', kind: 'decouverte', items: lexiePlay },
  { id: 'lx-deck-feelings', title: 'Lexie · Émotions & sécurité', icon: '🤗', description: 'Attention, chaud, ça fait mal ?, dis merci…', kind: 'decouverte', items: lexieFeelings },
]

// ---------------------------------------------------------------------------- Grammaire utile

export const lexieGrammar: GrammarLesson[] = [
  {
    id: 'jj-g-imperative',
    order: 10,
    group: 'structures',
    title: "Parler à un enfant : Let's…, Don't…, Do you want…?",
    level: 'A1',
    summary: "L'impératif et les petites questions : 80 % de ce qu'on dit à un tout-petit.",
    tag: 'imperative',
    points: [
      {
        title: "L'impératif",
        explanation: 'Le verbe seul, sans sujet : **Come here!**, **Sit down.**, **Open wide!** Pour interdire : **Don\'t** + verbe : **Don\'t touch!** Pour proposer de faire ensemble : **Let\'s** + verbe : **Let\'s go!**',
        examples: [
          { en: 'Come here, sweetie.', fr: 'Viens ici, ma chérie.' },
          { en: "Don't touch, it's hot!", fr: "Ne touche pas, c'est chaud !" },
          { en: "Let's read a book.", fr: 'Lisons un livre.' },
        ],
      },
      {
        title: 'Les petites questions',
        explanation: '**Do you want…?** (tu veux… ?), **Where is…?** (où est… ?), **What\'s this?** (qu\'est-ce que c\'est ?), **Are you…?** (tu es… / tu as… ?). Avec un tout-petit, on pose la question… et on répond souvent soi-même : c\'est comme ça qu\'il apprend !',
        examples: [
          { en: 'Do you want more milk? Yes? OK!' },
          { en: "Where's your teddy? There it is!" },
          { en: "What's this? It's a dog! Woof woof!" },
        ],
      },
    ],
    exercises: [
      { kind: 'gap', id: 'jj-g-imp-01', level: 'A1', prompt: "___ touch! It's hot!", answers: ["Don't", 'Do not'], explanation: 'Interdire : Don\'t + verbe.' },
      { kind: 'gap', id: 'jj-g-imp-02', level: 'A1', prompt: "___ go to the park!", hint: 'proposer de faire ensemble', answers: ["Let's"], explanation: "Let's + verbe = allons…, faisons…" },
      { kind: 'gap', id: 'jj-g-imp-03', level: 'A1', prompt: '___ you want some water?', answers: ['Do'], explanation: 'Question : Do you want…?' },
      { kind: 'gap', id: 'jj-g-imp-04', level: 'A1', prompt: "___ is your teddy?", hint: 'où', answers: ['Where'], explanation: 'Où = Where.' },
      { kind: 'fix', id: 'jj-g-imp-05', level: 'A1', wrong: "Not touch the cat's tail!", answers: ["Don't touch the cat's tail!", "Do not touch the cat's tail!"], explanation: 'Interdire : Don\'t + verbe (✗ Not touch).' },
      { kind: 'fix', id: 'jj-g-imp-06', level: 'A2', wrong: 'You want a cuddle?', answers: ['Do you want a cuddle?'], explanation: 'À l\'écrit, la question prend « Do ». (À l\'oral, avec l\'intonation, « You want a cuddle? » s\'entend, mais apprends d\'abord la forme complète.)' },
    ],
  },
]

// ---------------------------------------------------------------------------- Modules

export const lexieModules: CourseModule[] = [
  {
    id: 'jj-lexie-1',
    group: GROUP,
    title: 'Lexie 1 · Hello, sweetie!',
    titleFr: 'Les mots doux, saluer, encourager',
    icon: '💕',
    description: 'Les premiers mots à dire tous les jours : bonjour, je t\'aime, bravo, papa est là.',
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-love'],
    keyPhrases: [
      { title: 'Good morning!', titleFr: 'Le bonjour du matin', phrases: ['Good morning, sweetie!', 'Did you sleep well?', 'Look at you! You\'re awake!', 'Come here, give Daddy a cuddle.'] },
      { title: 'Love & praise', titleFr: 'Mots doux et encouragements', phrases: ['I love you so much.', 'Good girl!', 'Well done! You did it!', 'What a clever girl!', 'You\'re so beautiful.'] },
      { title: 'Comfort', titleFr: 'Rassurer', phrases: ["Daddy's here.", "Shh, it's OK.", "Don't cry, sweetie.", 'Mummy is coming back soon.'] },
    ],
    speaking: [
      { id: 'jj-lexie-1-sp-01', question: 'Say good morning to Lexie and ask if she slept well.', focus: 'Good morning…, Did you sleep well?' },
      { id: 'jj-lexie-1-sp-02', question: 'Lexie just stood up for the first time. Congratulate her!', focus: 'Well done!, Good girl!, You did it!' },
      { id: 'jj-lexie-1-sp-03', question: 'Lexie is crying. Comfort her in English.', focus: "Daddy's here, it's OK…" },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-be'],
    readingId: 'jj-r-lexie-tips',
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-1-01', level: 'A1', instruction: tr, prompt: 'Bonjour ma chérie !', answers: ['Good morning, sweetie!', 'Good morning, sweetheart!', 'Hello, sweetie!', 'Hello, sweetheart!', 'Morning, sweetie!'] },
      { kind: 'transform', id: 'jj-lexie-1-02', level: 'A1', instruction: tr, prompt: "Je t'aime.", answers: ['I love you.'] },
      { kind: 'transform', id: 'jj-lexie-1-03', level: 'A1', instruction: tr, prompt: 'Bravo, tu as réussi !', answers: ['Well done, you did it!', 'Well done! You did it!', 'Great job, you did it!', 'Great job! You did it!', 'Good job, you did it!'] },
      { kind: 'transform', id: 'jj-lexie-1-04', level: 'A1', instruction: tr, prompt: 'Papa est là.', answers: ["Daddy's here.", 'Daddy is here.', "Dad's here.", 'Dad is here.'] },
      { kind: 'transform', id: 'jj-lexie-1-05', level: 'A2', instruction: tr, prompt: 'Tu as bien dormi ?', answers: ['Did you sleep well?'], explanation: 'Question au passé : Did + sujet + verbe de base.' },
      { kind: 'mcq', id: 'jj-lexie-1-06', level: 'A1', prompt: 'Lexie pleure. Que dis-tu ?', options: ["Shh, it's OK, Daddy's here.", 'Well done!', 'All gone!', "Let's go to the park!"], answer: 0 },
      { kind: 'mcq', id: 'jj-lexie-1-07', level: 'A1', prompt: '« Give Daddy a cuddle » veut dire :', options: ['Fais un câlin à papa', 'Donne le doudou à papa', 'Donne à manger à papa', 'Dis au revoir à papa'], answer: 0 },
    ],
  },
  {
    id: 'jj-lexie-2',
    group: GROUP,
    title: 'Lexie 2 · Feeding time',
    titleFr: 'Le biberon et les repas',
    icon: '🍼',
    description: 'Le biberon, la chaise haute, la cuillère, « encore ? » et « tout est fini ! ».',
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-meals'],
    keyPhrases: [
      { title: 'The bottle', titleFr: 'Le biberon', phrases: ["It's time for your bottle.", 'Are you hungry?', 'Drink your milk, sweetie.', "Let's burp.", 'Is it too hot? Let me check.'] },
      { title: 'Mealtime', titleFr: 'À table', phrases: ['Sit in your high chair.', "Let's put your bib on.", 'Open wide! Here comes the spoon!', 'Mmm, yummy!', 'Do you want more?', 'All gone! Good girl!'] },
      { title: 'Snack time', titleFr: 'Le goûter', phrases: ['Snack time!', 'A banana or an apple?', 'Do you want some water?', 'Careful, it\'s hot. Let\'s blow on it.'] },
    ],
    speaking: [
      { id: 'jj-lexie-2-sp-01', question: "Give Lexie her bottle. Describe what you're doing.", focus: "It's time for…, drink your milk…" },
      { id: 'jj-lexie-2-sp-02', question: 'Feed Lexie her lunch, spoon by spoon.', focus: 'Open wide!, yummy!, more?, all gone!' },
      { id: 'jj-lexie-2-sp-03', question: 'Offer Lexie a choice for her snack.', focus: 'Do you want… or …?' },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-questions'],
    dialogueId: 'jj-d-lexie-morning',
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-2-01', level: 'A1', instruction: tr, prompt: "C'est l'heure de ton biberon.", answers: ["It's time for your bottle.", 'It is time for your bottle.', "It's bottle time."] },
      { kind: 'transform', id: 'jj-lexie-2-02', level: 'A1', instruction: tr, prompt: 'Tu as faim ?', answers: ['Are you hungry?'], explanation: 'Avoir faim = BE hungry.' },
      { kind: 'transform', id: 'jj-lexie-2-03', level: 'A1', instruction: tr, prompt: 'Tu en veux encore ?', answers: ['Do you want more?', 'Do you want some more?', 'More?'] },
      { kind: 'transform', id: 'jj-lexie-2-04', level: 'A1', instruction: tr, prompt: "Tout est fini ! C'est bien !", answers: ['All gone! Good girl!', 'All gone! Well done!', 'All gone! Good job!'] },
      { kind: 'transform', id: 'jj-lexie-2-05', level: 'A2', instruction: tr, prompt: 'Assieds-toi dans ta chaise haute.', answers: ['Sit in your high chair.', 'Sit down in your high chair.'] },
      { kind: 'transform', id: 'jj-lexie-2-06', level: 'A2', instruction: tr, prompt: 'Ouvre grand la bouche !', answers: ['Open wide!', 'Open your mouth!', 'Open your mouth wide!'] },
      { kind: 'mcq', id: 'jj-lexie-2-07', level: 'A2', prompt: '« Un bavoir » se dit :', options: ['a bib', 'a bob', 'a bottle', 'a spoon'], answer: 0 },
      { kind: 'gap', id: 'jj-lexie-2-08', level: 'A2', prompt: "Let's put your ___ on before you eat.", hint: 'bavoir', answers: ['bib'] },
    ],
  },
  {
    id: 'jj-lexie-3',
    group: GROUP,
    title: 'Lexie 3 · Nappy, bath & bedtime',
    titleFr: 'Le change, le bain et le dodo',
    icon: '🛁',
    description: 'Changer la couche, prendre le bain, se brosser les dents, mettre le pyjama, faire dodo.',
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-care'],
    keyPhrases: [
      { title: 'Nappy change', titleFr: 'Le change', phrases: ["Let me change your nappy.", 'Lie down, please.', 'Phew, that\'s stinky!', 'All clean!'] },
      { title: 'Bath time', titleFr: "L'heure du bain", phrases: ["It's bath time!", 'Is the water warm?', "Let's wash your hair.", 'Splash, splash!', 'Here is your towel.'] },
      { title: 'Bedtime', titleFr: "L'heure du dodo", phrases: ['Put your pyjamas on.', "Let's brush your teeth.", 'Are you sleepy?', "Here's your teddy.", 'Night night, sleep tight!'] },
    ],
    speaking: [
      { id: 'jj-lexie-3-sp-01', question: 'Describe bath time with Lexie, step by step.', focus: "It's bath time!, let's wash…, here is your towel." },
      { id: 'jj-lexie-3-sp-02', question: 'Put Lexie to bed: pyjamas, teeth, teddy, goodnight.', focus: 'First…, then…, night night.' },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-present-continuous'],
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-3-01', level: 'A2', instruction: tr, prompt: 'Je vais changer ta couche.', answers: ["Let me change your nappy.", "I'm going to change your nappy.", "I'll change your nappy.", "Let me change your diaper.", "I'm going to change your diaper."] },
      { kind: 'transform', id: 'jj-lexie-3-02', level: 'A1', instruction: tr, prompt: "C'est l'heure du bain !", answers: ["It's bath time!", 'It is bath time!', "It's time for your bath!", 'Bath time!'] },
      { kind: 'transform', id: 'jj-lexie-3-03', level: 'A2', instruction: tr, prompt: 'Mets ton pyjama.', answers: ['Put your pyjamas on.', 'Put on your pyjamas.', 'Put your pajamas on.', 'Put on your pajamas.'], explanation: 'Pyjamas : toujours au pluriel en anglais.' },
      { kind: 'transform', id: 'jj-lexie-3-04', level: 'A2', instruction: tr, prompt: 'On va se brosser les dents.', answers: ["Let's brush your teeth.", "Let's brush our teeth.", "We're going to brush your teeth."] },
      { kind: 'transform', id: 'jj-lexie-3-05', level: 'A1', instruction: tr, prompt: 'Tu as sommeil ?', answers: ['Are you sleepy?', 'Are you tired?'] },
      { kind: 'transform', id: 'jj-lexie-3-06', level: 'A1', instruction: tr, prompt: 'Bonne nuit, dors bien !', answers: ['Night night, sleep tight!', 'Good night, sleep well!', 'Good night, sleep tight!', 'Night night, sleep well!'] },
      { kind: 'mcq', id: 'jj-lexie-3-07', level: 'A2', prompt: '« Une tétine » en anglais britannique :', options: ['a dummy', 'a teddy', 'a nappy', 'a bib'], answer: 0, explanation: 'UK : dummy ; US : pacifier.' },
      { kind: 'mcq', id: 'jj-lexie-3-08', level: 'A2', prompt: '« Une couche » en anglais britannique :', options: ['a nappy', 'a napkin', 'a nap', 'a towel'], answer: 0, explanation: 'UK : nappy ; US : diaper. (A nap = une sieste !)' },
    ],
  },
  {
    id: 'jj-lexie-4',
    group: GROUP,
    title: 'Lexie 4 · Getting dressed & going out',
    titleFr: "S'habiller, la crèche, le parc",
    icon: '🧥',
    description: "S'habiller, aller à la crèche, la poussette, le siège auto, le parc et dire au revoir.",
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-out'],
    keyPhrases: [
      { title: 'Getting dressed', titleFr: "S'habiller", phrases: ["Let's get dressed!", 'Arms up!', 'Put your coat on, it\'s cold.', 'Where are your shoes?', 'Hat on!'] },
      { title: 'Going to nursery', titleFr: 'Aller à la crèche', phrases: ["We're going to nursery.", 'Into your car seat!', "I'll pick you up after work.", 'Wave bye-bye!', 'See you later, sweetie!'] },
      { title: 'At the park', titleFr: 'Au parc', phrases: ["Let's go to the park!", 'Do you want to go on the swing?', 'Down the slide! Wheee!', 'Hold my hand.', "It's time to go home."] },
    ],
    speaking: [
      { id: 'jj-lexie-4-sp-01', question: 'Get Lexie ready to go out: clothes, coat, shoes, hat.', focus: "Let's…, put your … on." },
      { id: 'jj-lexie-4-sp-02', question: 'Drop Lexie at nursery and say goodbye.', focus: "I'll pick you up…, see you later!" },
      { id: 'jj-lexie-4-sp-03', question: 'Tell Lexie what she is doing at the park.', focus: "Present continuous : You're going down the slide!" },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-future', 'jj-g-present-continuous'],
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-4-01', level: 'A2', instruction: tr, prompt: 'On va à la crèche.', answers: ["We're going to nursery.", "We're going to the nursery.", "We're going to daycare.", 'We are going to nursery.', "Let's go to nursery."] },
      { kind: 'transform', id: 'jj-lexie-4-02', level: 'A1', instruction: tr, prompt: 'Mets ton manteau, il fait froid.', answers: ["Put your coat on, it's cold.", "Put on your coat, it's cold.", 'Put your coat on, it is cold.'] },
      { kind: 'transform', id: 'jj-lexie-4-03', level: 'A1', instruction: tr, prompt: 'Où sont tes chaussures ?', answers: ['Where are your shoes?'] },
      { kind: 'transform', id: 'jj-lexie-4-04', level: 'A2', instruction: tr, prompt: 'Je viens te chercher après le travail.', answers: ["I'll pick you up after work.", 'I will pick you up after work.', "I'm picking you up after work.", "I'll come and get you after work."], explanation: 'Venir chercher qqn = pick someone up.' },
      { kind: 'transform', id: 'jj-lexie-4-05', level: 'A1', instruction: tr, prompt: 'Donne-moi la main.', answers: ['Hold my hand.', 'Give me your hand.'] },
      { kind: 'transform', id: 'jj-lexie-4-06', level: 'A2', instruction: tr, prompt: 'Tu veux aller sur la balançoire ?', answers: ['Do you want to go on the swing?', 'Do you want to go on the swings?'] },
      { kind: 'mcq', id: 'jj-lexie-4-07', level: 'A2', prompt: '« La crèche » se dit en anglais britannique :', options: ['nursery', 'creche school', 'kindergarten', 'baby school'], answer: 0, explanation: 'UK : nursery ; US : daycare.' },
      { kind: 'mcq', id: 'jj-lexie-4-08', level: 'A2', prompt: "« Arms up! » s'utilise pour :", options: ['Mettre un pull ou un t-shirt', 'Dire bonjour', 'Aller au lit', 'Manger'], answer: 0 },
    ],
  },
  {
    id: 'jj-lexie-5',
    group: GROUP,
    title: 'Lexie 5 · Play & sing',
    titleFr: 'Jouer, chanter, les premiers mots',
    icon: '🧸',
    description: 'Coucou-caché, les jouets, les cris des animaux, compter, les comptines anglaises.',
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-play'],
    keyPhrases: [
      { title: 'Playing', titleFr: 'Jouer', phrases: ["Let's play!", 'Where is Lexie? Peekaboo!', 'Throw the ball!', "Let's build a tower.", 'Your turn! Now my turn!', "Let's tidy up your toys."] },
      { title: 'First words', titleFr: 'Les premiers mots', phrases: ["What's this? It's a dog!", 'What does the cow say? Moo!', 'What colour is it? It\'s red!', 'One, two, three!', 'Can you say "ball"?'] },
      { title: 'Nursery rhymes', titleFr: 'Les comptines', phrases: ['Twinkle, twinkle, little star, how I wonder what you are.', 'Old MacDonald had a farm, E-I-E-I-O!', 'Head, shoulders, knees and toes.', 'Row, row, row your boat, gently down the stream.', 'The wheels on the bus go round and round.'] },
    ],
    speaking: [
      { id: 'jj-lexie-5-sp-01', question: 'Play peekaboo with Lexie.', focus: 'Where is Lexie? Peekaboo! There you are!' },
      { id: 'jj-lexie-5-sp-02', question: "Look at a picture book with Lexie. Name the animals and their sounds.", focus: "What's this? What does the … say?" },
      { id: 'jj-lexie-5-sp-03', question: 'Sing "Twinkle, Twinkle, Little Star" (use the listening button to learn it).', focus: 'Rythme et prononciation.' },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-questions', 'jj-g-articles'],
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-5-01', level: 'A1', instruction: tr, prompt: 'On joue ?', answers: ["Let's play!", "Let's play?", 'Do you want to play?', 'Shall we play?'] },
      { kind: 'transform', id: 'jj-lexie-5-02', level: 'A1', instruction: tr, prompt: "Qu'est-ce que c'est ? C'est un chat !", answers: ["What's this? It's a cat!", 'What is this? It is a cat!', "What's that? It's a cat!"] },
      { kind: 'transform', id: 'jj-lexie-5-03', level: 'A2', instruction: tr, prompt: 'Que fait le chien ? Wouf !', answers: ['What does the dog say? Woof!', 'What does the dog say? Woof woof!'] },
      { kind: 'transform', id: 'jj-lexie-5-04', level: 'A2', instruction: tr, prompt: 'À toi ! Maintenant, à moi !', answers: ['Your turn! Now my turn!', "Your turn! Now it's my turn!", 'Your turn! My turn now!'] },
      { kind: 'transform', id: 'jj-lexie-5-05', level: 'A2', instruction: tr, prompt: 'On range tes jouets.', answers: ["Let's tidy up your toys.", "Let's tidy your toys.", "Let's put your toys away.", "Let's tidy up."] },
      { kind: 'mcq', id: 'jj-lexie-5-06', level: 'A1', prompt: 'What does the cow say?', options: ['Moo!', 'Woof!', 'Meow!', 'Quack!'], answer: 0 },
      { kind: 'mcq', id: 'jj-lexie-5-07', level: 'A1', prompt: 'What does the duck say?', options: ['Quack!', 'Oink!', 'Baa!', 'Moo!'], answer: 0, explanation: 'Cochon : oink ; mouton : baa ; chat : meow ; chien : woof.' },
      { kind: 'gap', id: 'jj-lexie-5-08', level: 'A2', prompt: 'Twinkle, twinkle, little ___, how I wonder what you are.', answers: ['star'] },
      { kind: 'gap', id: 'jj-lexie-5-09', level: 'A2', prompt: 'Head, shoulders, knees and ___.', answers: ['toes'] },
    ],
  },
  {
    id: 'jj-lexie-6',
    group: GROUP,
    title: 'Lexie 6 · Feelings & safety',
    titleFr: 'Les émotions, la sécurité, la politesse',
    icon: '🤗',
    description: 'Attention !, chaud !, ça fait mal ?, doucement, dis merci : les phrases des petits bobos et des grandes émotions.',
    keyPhrasesFromCourse: false,
    deckIds: ['lx-deck-feelings'],
    keyPhrases: [
      { title: 'Safety', titleFr: 'Sécurité', phrases: ['Careful!', "Hot! Don't touch!", 'Hold my hand.', 'Stop! Wait for Daddy.', 'Be gentle with the cat.'] },
      { title: 'Little accidents', titleFr: 'Les petits bobos', phrases: ['Oops! Are you OK?', 'Does it hurt?', 'Poor you! Let me kiss it better.', "You're OK. You're very brave."] },
      { title: 'Feelings & manners', titleFr: 'Émotions et politesse', phrases: ['Are you sad?', "I know you're cross.", 'What do you say? Thank you!', 'Say please.', "No biting! We don't do that."] },
    ],
    speaking: [
      { id: 'jj-lexie-6-sp-01', question: 'Lexie falls in the park. Comfort her.', focus: 'Are you OK? Does it hurt? Let me kiss it better.' },
      { id: 'jj-lexie-6-sp-02', question: 'Lexie wants to touch the oven. Stop her and explain.', focus: "Don't…, it's hot!" },
      { id: 'jj-lexie-6-sp-03', question: 'Teach Lexie to say please and thank you.', focus: 'What do you say?' },
    ],
    grammarLessonIds: ['jj-g-imperative', 'jj-g-can'],
    writingTaskIds: [],
    exercises: [
      { kind: 'transform', id: 'jj-lexie-6-01', level: 'A1', instruction: tr, prompt: 'Attention !', answers: ['Careful!', 'Be careful!', 'Watch out!'] },
      { kind: 'transform', id: 'jj-lexie-6-02', level: 'A1', instruction: tr, prompt: 'Chaud ! Ne touche pas !', answers: ["Hot! Don't touch!", "It's hot! Don't touch!", 'Hot! Do not touch!'] },
      { kind: 'transform', id: 'jj-lexie-6-03', level: 'A2', instruction: tr, prompt: 'Ça fait mal ?', answers: ['Does it hurt?'] },
      { kind: 'transform', id: 'jj-lexie-6-04', level: 'A2', instruction: tr, prompt: 'Doucement avec le chat.', answers: ['Be gentle with the cat.', 'Gently with the cat.'] },
      { kind: 'transform', id: 'jj-lexie-6-05', level: 'A2', instruction: tr, prompt: 'Qu\'est-ce qu\'on dit ? Merci !', answers: ['What do you say? Thank you!', 'What do we say? Thank you!'] },
      { kind: 'transform', id: 'jj-lexie-6-06', level: 'A2', instruction: tr, prompt: 'Tu es très courageuse.', answers: ["You're very brave.", 'You are very brave.', "You're so brave."] },
      { kind: 'mcq', id: 'jj-lexie-6-07', level: 'A2', prompt: '« Let me kiss it better » se dit quand :', options: ["L'enfant s'est fait un petit bobo", "L'enfant va dormir", "L'enfant a fini de manger", "L'enfant part à la crèche"], answer: 0 },
      { kind: 'fix', id: 'jj-lexie-6-08', level: 'A2', wrong: 'Make attention, it is hot!', answers: ["Careful, it's hot!", 'Be careful, it is hot!', "Be careful, it's hot!", 'Careful, it is hot!'], explanation: 'Faire attention = BE careful (✗ make attention).' },
    ],
  },
]

// ---------------------------------------------------------------------------- Lecture et dialogue

export const lexieReading: ReadingText = {
  id: 'jj-r-lexie-tips',
  title: 'Speaking English with your baby: 5 simple tips',
  level: 'A2',
  module: 'jj-lexie-1',
  paragraphs: [
    'Babies can learn two languages at the same time. Their brains are made for it! You don\'t need perfect English: your baby needs your voice, your love and lots of repetition.',
    'Tip 1: Choose a moment. Many parents use the "one parent, one language" method, but you can also choose moments: English at bath time, at breakfast or for the bedtime story.',
    'Tip 2: Talk about what you are doing. "I\'m opening the fridge. Here\'s the milk. It\'s cold!" Babies learn words when they see the action at the same time.',
    'Tip 3: Repeat, repeat, repeat. Use the same little phrases every day: "Good morning!", "All gone!", "Night night!". Repetition is not boring for a baby — it is how she learns.',
    'Tip 4: Sing! Nursery rhymes have rhythm and simple words. "Twinkle, Twinkle, Little Star" and "Head, Shoulders, Knees and Toes" are perfect. Tip 5: Have fun. If you are relaxed and happy, your baby will love English too.',
  ],
  glossary: [
    { en: 'the brain', fr: 'le cerveau' },
    { en: 'repetition', fr: 'la répétition' },
    { en: 'the bedtime story', fr: "l'histoire du soir" },
    { en: 'boring', fr: 'ennuyeux' },
    { en: 'relaxed', fr: 'détendu' },
  ],
  questions: [
    { kind: 'mcq', id: 'jj-r-lexie-tips-q1', prompt: 'Do you need perfect English to speak to your baby?', options: ['No, your voice and repetition are more important', 'Yes, always', 'Only at bedtime', 'Only if the baby is older'], answer: 0 },
    { kind: 'mcq', id: 'jj-r-lexie-tips-q2', prompt: 'What is tip 2?', options: ['Talk about what you are doing', 'Speak only English', 'Watch TV in English', 'Read the newspaper'], answer: 0 },
    { kind: 'mcq', id: 'jj-r-lexie-tips-q3', prompt: 'Why are nursery rhymes good?', options: ['They have rhythm and simple words', 'They are very long', 'They are in French', 'They help babies sleep all night'], answer: 0 },
  ],
}

export const lexieDialogue: Dialogue = {
  id: 'jj-d-lexie-morning',
  title: 'A morning with Lexie',
  level: 'A1',
  module: 'jj-lexie-2',
  context: 'Daddy (Julien) wakes up Lexie and gives her breakfast. Lexie is one year old: she answers with sounds and first words.',
  lines: [
    { speaker: 'Daddy', text: 'Good morning, sweetie! Did you sleep well?' },
    { speaker: 'Lexie', text: 'Dada!' },
    { speaker: 'Daddy', text: "Yes, Daddy's here! Come here, give me a cuddle. Let me change your nappy first." },
    { speaker: 'Daddy', text: "All clean! Now, are you hungry? It's time for your bottle." },
    { speaker: 'Lexie', text: 'Mmm!' },
    { speaker: 'Daddy', text: 'Drink your milk. Good girl! Now sit in your high chair. Do you want a banana?' },
    { speaker: 'Lexie', text: 'Nana!' },
    { speaker: 'Daddy', text: "Banana, yes! Here you are. Mmm, yummy! All gone! Well done!" },
    { speaker: 'Daddy', text: "Let's get dressed. Arms up! Put your coat on. We're going to nursery. Wave bye-bye to the cat!" },
  ],
  questions: [
    { kind: 'mcq', id: 'jj-d-lexie-morning-q1', prompt: 'What does Daddy do first?', options: ['He changes her nappy', 'He gives her a banana', 'He puts her coat on', 'He sings a song'], answer: 0 },
    { kind: 'mcq', id: 'jj-d-lexie-morning-q2', prompt: 'What does Lexie eat?', options: ['A banana', 'An apple', 'Porridge', 'Bread'], answer: 0 },
    { kind: 'mcq', id: 'jj-d-lexie-morning-q3', prompt: 'Where are they going?', options: ['To nursery', 'To the park', 'To the doctor', 'To Grandma\'s house'], answer: 0 },
  ],
}

