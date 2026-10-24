import { attachDialogueFr, attachReadingFr } from '../translations.ts'
import { jujuDialoguesFr, jujuReadingsFr } from './translations.ts'
import type { Dialogue, ReadingText, WritingTask } from '../../types'
import { lexieDialogue, lexieReading } from './lexie.ts'

// Accès Jujularage : textes courts (A1 → A2), dialogues et sujets d'écriture.

const coreReadingTexts: ReadingText[] = [
  {
    id: 'jj-r-julien',
    title: 'Hello, my name is Julien',
    level: 'A1',
    module: 'jj-me',
    paragraphs: [
      "Hello! My name is Julien and I'm 32 years old. I'm Belgian and I live in a small town near Liège with my girlfriend and our dog, Max.",
      'I am a scientist. I work for a company that produces plasmid DNA. I usually start work at seven in the morning, and I finish at half past three.',
      'I have one brother and one sister. My brother, Thomas, is older than me. He lives in Brussels and he works in a bank. My sister, Léa, is a nurse. She has two children, so I am an uncle!',
      "In my free time, I love beer. I often visit small breweries and I sometimes brew my own beer in my garage. I also like sports: I play football on Saturdays and I watch the matches on TV with my friends.",
    ],
    glossary: [
      { en: 'a small town', fr: 'une petite ville' },
      { en: 'a company', fr: 'une entreprise' },
      { en: 'older than me', fr: 'plus âgé que moi' },
      { en: 'free time', fr: 'temps libre' },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-r-julien-q1', prompt: 'Where does Julien live?', options: ['Near Liège', 'In Brussels', 'In London', 'In Namur'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-julien-q2', prompt: 'What is his sister\'s job?', options: ['She is a nurse', 'She works in a bank', 'She is a scientist', 'She is a brewer'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-julien-q3', prompt: 'Why is Julien an uncle?', options: ['Because his sister has two children', 'Because he has a dog', 'Because he is 32', 'Because his brother is older'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-julien-q4', prompt: '"He lives in Brussels." Why is there an -s on "lives"?', options: ['Because the subject is "he"', 'Because it is plural', 'Because it is in the past', 'Because Brussels ends with an s'], answer: 0, tags: ['present'] },
    ],
  },
  {
    id: 'jj-r-max',
    title: 'Max, the clever dog',
    level: 'A2',
    module: 'jj-home',
    paragraphs: [
      'Max is a four-year-old dog. He is black and white, with a long tail and very big ears. He lives in a house with a big garden, and his favourite place is the sofa in the living room — but he is not allowed on it!',
      'Every morning, Max waits next to the door. When his owner takes the keys, Max knows that it is time for a walk. They walk for thirty minutes in the park near the house.',
      'Last Sunday, something funny happened. The family had lunch in the garden. When they came back to the kitchen, the cheese was not on the table anymore. Nobody saw anything, but Max was sleeping under the table with a very happy face…',
    ],
    glossary: [
      { en: 'a tail', fr: 'une queue' },
      { en: 'not allowed', fr: 'pas autorisé' },
      { en: 'an owner', fr: 'un propriétaire, un maître' },
      { en: 'not … anymore', fr: 'ne … plus' },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-r-max-q1', prompt: 'What colour is Max?', options: ['Black and white', 'Brown', 'Grey', 'Black'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-max-q2', prompt: 'How does Max know it is time for a walk?', options: ['His owner takes the keys', 'He hears the radio', 'He sees the sun', 'The children call him'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-max-q3', prompt: 'Who probably ate the cheese?', options: ['Max', 'The children', 'The cat', 'Nobody'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-max-q4', prompt: '"The family had lunch in the garden." Which tense is "had"?', options: ['Past simple', 'Present simple', 'Future', 'Present continuous'], answer: 0, tags: ['past-simple'] },
    ],
  },
  {
    id: 'jj-r-brewery',
    title: 'A visit to a Trappist brewery',
    level: 'A2',
    module: 'jj-beer',
    paragraphs: [
      'Belgium has five Trappist breweries: Chimay, Orval, Rochefort, Westmalle and Westvleteren. Trappist beers are brewed by monks, or under their control, inside the walls of an abbey.',
      'Last month, I visited a brewery with my friends. The guide explained the four ingredients of beer: water, malt, hops and yeast. The malt gives the colour and the sugar. The hops give bitterness and aroma. The yeast transforms the sugar into alcohol and gas.',
      'First, the brewers mix the malt with hot water. Then they boil this liquid, called the wort, with the hops. After that, they cool it and add the yeast. The beer ferments for about a week. Finally, they put it in bottles, where it continues to ferment a little.',
      'At the end of the visit, we tasted three beers. My favourite was the dark one: it tasted of caramel and dried fruit. It was stronger than I expected — 10%!',
    ],
    glossary: [
      { en: 'a monk', fr: 'un moine' },
      { en: 'inside the walls', fr: "à l'intérieur des murs" },
      { en: 'to cool', fr: 'refroidir' },
      { en: 'dried fruit', fr: 'fruits secs' },
      { en: 'than I expected', fr: "que ce que j'imaginais" },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-r-brewery-q1', prompt: 'What are the four ingredients of beer?', options: ['Water, malt, hops and yeast', 'Water, sugar, fruit and gas', 'Malt, wine, yeast and salt', 'Water, wheat, coffee and hops'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-brewery-q2', prompt: 'What do the hops give?', options: ['Bitterness and aroma', 'Colour and sugar', 'Alcohol and gas', 'Foam only'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-brewery-q3', prompt: 'What is the wort?', options: ['The liquid that is boiled with the hops', 'The bottle', 'A type of yeast', 'The name of a monk'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-brewery-q4', prompt: 'What did the writer think of the dark beer?', options: ['It was stronger than expected', 'It was too sweet', 'It was very light', 'It tasted of lemon'], answer: 0 },
    ],
  },
  {
    id: 'jj-r-plasmid',
    title: 'How do we make a plasmid?',
    level: 'A2',
    module: 'jj-cdmo',
    paragraphs: [
      'A plasmid is a small circle of DNA. Bacteria have plasmids naturally, and scientists use them to carry a gene. Today, plasmids are very important for gene therapy, mRNA vaccines and cell therapies.',
      'A CDMO is a company that develops and manufactures products for other companies, its clients. In a plasmid CDMO, the work starts with a cell bank: small tubes of E. coli bacteria that contain the plasmid, kept in a freezer at −80 °C.',
      'First, the team grows the bacteria in a bioreactor. The bacteria multiply and make many copies of the plasmid. After about one or two days, the operators harvest the cells. Then they break the cells — this is called lysis — to release the plasmid.',
      'After that, the plasmid is purified, usually by chromatography, and filtered. Finally, the quality control team tests the batch. If everything is OK, the plasmid is sent to the client. Everything is done in clean rooms, following GMP rules.',
    ],
    glossary: [
      { en: 'to carry', fr: 'porter, transporter' },
      { en: 'to manufacture', fr: 'fabriquer' },
      { en: 'a cell bank', fr: 'une banque de cellules' },
      { en: 'to multiply', fr: 'se multiplier' },
      { en: 'to release', fr: 'libérer' },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-r-plasmid-q1', prompt: 'What is a plasmid?', options: ['A small circle of DNA', 'A type of bacteria', 'A machine', 'A protein'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-plasmid-q2', prompt: 'What is a CDMO?', options: ['A company that manufactures products for other companies', 'A hospital', 'A university lab', 'A type of vaccine'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-plasmid-q3', prompt: 'What is "lysis"?', options: ['Breaking the cells to release the plasmid', 'Growing the bacteria', 'Testing the batch', 'Freezing the cells'], answer: 0 },
      { kind: 'mcq', id: 'jj-r-plasmid-q4', prompt: 'Who tests the batch at the end?', options: ['The quality control team', 'The client', 'The bacteria', 'The brewer'], answer: 0 },
    ],
  },
]

export const jujuReadingTexts: ReadingText[] = attachReadingFr([...coreReadingTexts, lexieReading], jujuReadingsFr)

const coreDialogues: Dialogue[] = [
  {
    id: 'jj-d-new-colleague',
    title: 'Meeting a new colleague',
    level: 'A1',
    module: 'jj-me',
    context: 'Julien meets Sarah, a new colleague from England, at the coffee machine.',
    lines: [
      { speaker: 'Sarah', text: "Hi! I'm Sarah. I'm new here." },
      { speaker: 'Julien', text: "Hi Sarah, I'm Julien. Nice to meet you! Welcome to the team." },
      { speaker: 'Sarah', text: 'Thank you! What do you do here?' },
      { speaker: 'Julien', text: "I work in production. I'm responsible for the fermentation. And you?" },
      { speaker: 'Sarah', text: "I'm in quality control. Where are you from?" },
      { speaker: 'Julien', text: "I'm from Belgium, I live near Liège. Where are you from?" },
      { speaker: 'Sarah', text: "I'm from Manchester. I moved here last month." },
      { speaker: 'Julien', text: 'Great! Do you like Belgian beer?' },
      { speaker: 'Sarah', text: "I love it! But it's very strong." },
      { speaker: 'Julien', text: "Ha ha, yes! Some colleagues go to the pub on Friday. Do you want to come?" },
      { speaker: 'Sarah', text: 'Sounds good! See you on Friday.' },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-d-new-colleague-q1', prompt: 'Where does Sarah work?', options: ['In quality control', 'In production', 'In a pub', 'In Manchester'], answer: 0 },
      { kind: 'mcq', id: 'jj-d-new-colleague-q2', prompt: 'Where is Sarah from?', options: ['Manchester', 'Liège', 'London', 'Dublin'], answer: 0 },
      { kind: 'mcq', id: 'jj-d-new-colleague-q3', prompt: 'What is the plan for Friday?', options: ['Going to the pub with colleagues', 'A football match', 'A meeting with a client', 'Visiting a brewery'], answer: 0 },
    ],
  },
  {
    id: 'jj-d-pub',
    title: 'At the pub in Dublin',
    level: 'A2',
    module: 'jj-beer',
    context: 'Julien and his friend Tom are in a pub in Dublin.',
    lines: [
      { speaker: 'Barman', text: 'Hi guys, what can I get you?' },
      { speaker: 'Julien', text: 'Hi! What do you have on tap?' },
      { speaker: 'Barman', text: 'We have Guinness, a local red ale, an IPA and a lager.' },
      { speaker: 'Julien', text: "Can I try the red ale first, please?" },
      { speaker: 'Barman', text: 'Sure, here you go.' },
      { speaker: 'Julien', text: "Mmm, it's quite sweet, it tastes of caramel. I'll have a pint of that, please." },
      { speaker: 'Tom', text: "And a pint of Guinness for me. It's my round, Julien!" },
      { speaker: 'Barman', text: "That's eleven euros fifty, please." },
      { speaker: 'Tom', text: 'Here you are. Cheers!' },
      { speaker: 'Barman', text: 'Cheers, lads. Enjoy!' },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-d-pub-q1', prompt: 'What does Julien order?', options: ['A pint of red ale', 'A Guinness', 'An IPA', 'A lager'], answer: 0 },
      { kind: 'mcq', id: 'jj-d-pub-q2', prompt: 'Who pays?', options: ['Tom', 'Julien', 'The barman', 'They pay half each'], answer: 0, explanation: "« It's my round » = c'est ma tournée." },
      { kind: 'mcq', id: 'jj-d-pub-q3', prompt: 'How does Julien describe the red ale?', options: ['Sweet, with a caramel taste', 'Very bitter', 'Sour', 'Too strong'], answer: 0 },
    ],
  },
  {
    id: 'jj-d-match',
    title: 'Did you watch the match?',
    level: 'A2',
    module: 'jj-sports',
    context: 'Monday morning at work. Julien talks with his colleague Mike about the weekend.',
    lines: [
      { speaker: 'Mike', text: 'Morning, Julien! Did you have a good weekend?' },
      { speaker: 'Julien', text: 'Yes, great! On Saturday I played football with my team, and on Sunday I watched the big match on TV.' },
      { speaker: 'Mike', text: 'Me too! What a match! Did you see the second goal?' },
      { speaker: 'Julien', text: 'Yes, it was amazing! He scored from thirty metres.' },
      { speaker: 'Mike', text: 'And your team? Did you win?' },
      { speaker: 'Julien', text: "No, we lost 2–1. The referee was terrible! But I scored our goal." },
      { speaker: 'Mike', text: 'Well done! When is your next match?' },
      { speaker: 'Julien', text: "Next Saturday. I think we'll win this time!" },
    ],
    questions: [
      { kind: 'mcq', id: 'jj-d-match-q1', prompt: 'What did Julien do on Saturday?', options: ['He played football', 'He watched a match on TV', 'He went to the pub', 'He worked'], answer: 0 },
      { kind: 'mcq', id: 'jj-d-match-q2', prompt: "What was the result of Julien's match?", options: ['They lost 2–1', 'They won 2–1', 'It was a draw', 'They won 3–0'], answer: 0 },
      { kind: 'mcq', id: 'jj-d-match-q3', prompt: '"Did you win?" Which tense is it?', options: ['Past simple (question)', 'Present simple', 'Future', 'Present continuous'], answer: 0, tags: ['past-simple'] },
    ],
  },
]

export const jujuDialogues: Dialogue[] = attachDialogueFr([...coreDialogues, lexieDialogue], jujuDialoguesFr)

export const jujuWritingTasks: WritingTask[] = [
  {
    id: 'jj-w-introduce',
    module: 'jj-me',
    level: 'A1',
    type: 'email',
    title: 'Te présenter à un nouveau collègue',
    prompt: 'Write a short e-mail to a new colleague from England. Introduce yourself: your name, age, where you live, your job, your family and your hobbies.',
    tipsFr: "Utilise I'm… / I live… / I work… / I have… / I like… N'oublie pas le -s avec he / she (my brother works…).",
    minWords: 40,
    maxWords: 100,
    targetPhrases: ["I'm", 'I live', 'I work', 'I have', 'I like'],
    checklist: ['Une formule pour commencer (Hi …,) et pour finir (See you soon, …)', 'Ton âge avec « I\'m » (pas « I have »)', 'Un métier avec « a » : I\'m a scientist', 'Au moins un -s avec he / she'],
    model: `Hi Sarah,

Welcome to the team! I'm Julien and I'm 32 years old. I live near Liège with my girlfriend and our dog, Max.

I'm a scientist and I work in production. I have one brother and one sister. My brother lives in Brussels.

In my free time, I like beer and football. I play football every Saturday.

See you soon,
Julien`,
  },
  {
    id: 'jj-w-home',
    module: 'jj-home',
    level: 'A2',
    type: 'story',
    title: 'Décrire ta maison et ton animal',
    prompt: 'Describe your home: how many rooms are there, what is your favourite room and why? Then describe your pet (or the pet you would like to have).',
    tipsFr: 'There is / there are, in / on / upstairs / downstairs, et les adjectifs DEVANT le nom (a big garden, a black dog).',
    minWords: 50,
    maxWords: 120,
    targetPhrases: ['There is', 'There are', 'upstairs', 'my favourite'],
    checklist: ['There is + singulier, there are + pluriel', 'Les adjectifs devant le nom et sans -s', 'His / her pour l\'animal (ou its)'],
    model: `I live in a house near Liège. There are three bedrooms upstairs and there is a big kitchen downstairs. There is also a small garden behind the house.

My favourite room is the kitchen because we cook and we eat together there. There is a big table and a lot of plants.

I have a dog called Max. He is four years old. He is black and white, and he has very big ears. He loves the garden, and his favourite place is the sofa!`,
  },
  {
    id: 'jj-w-routine',
    module: 'jj-day',
    level: 'A2',
    type: 'story',
    title: 'Ta journée type',
    prompt: 'Describe a normal working day. What time do you get up? What do you do in the morning, at lunch and in the evening?',
    tipsFr: 'Present simple + heures (at 7 o\'clock, at half past six) + connecteurs (first, then, after that, finally) + adverbes (usually, always, sometimes).',
    minWords: 60,
    maxWords: 130,
    targetPhrases: ['First', 'Then', 'After that', 'Finally', 'usually'],
    checklist: ['Les heures avec « at »', 'Au moins 3 connecteurs', 'Les adverbes de fréquence devant le verbe'],
    model: `I usually get up at six o'clock. First, I have a coffee and I take my dog for a walk. Then I drive to work. I start at seven.

In the morning, I prepare the bioreactor and I check the fermentation. At half past twelve, I have lunch with my colleagues in the canteen.

After that, I fill in the batch records. I finish at half past three. In the evening, I sometimes go to the gym or I watch football with friends. Finally, I go to bed at about eleven.`,
  },
  {
    id: 'jj-w-beer',
    module: 'jj-beer',
    level: 'A2',
    type: 'review',
    title: 'Présenter ta bière préférée',
    prompt: 'Describe your favourite beer for an English beer website: its name, where it comes from, its colour, smell and taste, and why you like it. Compare it with another beer.',
    tipsFr: 'It is golden / dark…, it smells of…, it tastes of…, it is stronger / more bitter than… + because.',
    minWords: 60,
    maxWords: 140,
    targetPhrases: ['It tastes of', 'It smells of', 'than', 'because'],
    checklist: ['Couleur, odeur, goût', 'Au moins un comparatif (stronger than, more bitter than)', 'Une raison avec « because »'],
    model: `My favourite beer is Orval. It comes from a Trappist abbey in the south of Belgium.

It is amber, with a big white head. It smells of hops and flowers, and it tastes a bit bitter and a bit sour. It is very dry.

It is not as strong as a Westmalle Tripel — only 6.2% — but it is more complex than a normal lager. I like it because its taste changes when the bottle gets older. It is perfect with cheese!`,
  },
  {
    id: 'jj-w-weekend',
    module: 'jj-sports',
    level: 'A2',
    type: 'story',
    title: 'Raconter ton week-end (au passé)',
    prompt: 'Write about your last weekend. Where did you go? What did you do? Who were you with? Was it good?',
    tipsFr: 'Past simple ! Verbes réguliers en -ed (played, watched) et irréguliers (went, had, saw, drank, ate). Négatif : didn\'t + verbe de base.',
    minWords: 60,
    maxWords: 140,
    targetPhrases: ['went', 'was', 'played', 'had', "didn't"],
    checklist: ['Tous les verbes au past simple', 'Au moins 3 verbes irréguliers', 'Une phrase négative avec didn\'t + verbe de base'],
    model: `Last weekend was great. On Saturday morning, I played football with my team. We won 3–1 and I scored a goal!

In the afternoon, I went to a beer festival in Liège with my friends. We tasted a lot of beers and we ate Belgian fries. I didn't drink too much because I was tired.

On Sunday, I stayed at home. I watched the match on TV and I took my dog for a long walk in the forest. It was a perfect weekend.`,
  },
  {
    id: 'jj-w-experiment',
    module: 'jj-science',
    level: 'A2',
    type: 'procedure',
    title: 'Décrire une expérience simple',
    prompt: 'Describe a simple experiment or lab procedure, step by step (for example: preparing a culture medium, or growing bacteria on a Petri dish).',
    tipsFr: "Pour des consignes : l'impératif (Weigh…, Mix…, Heat…). Pour raconter : le past simple (we weighed, we mixed). Connecteurs : first, then, after that, finally.",
    minWords: 50,
    maxWords: 130,
    targetPhrases: ['First', 'Then', 'After that', 'Finally'],
    checklist: ['Les étapes dans l\'ordre', 'Au moins 3 connecteurs', 'Des verbes précis : weigh, mix, heat, measure, check'],
    model: `How to prepare a culture medium

First, put on your lab coat and gloves. Then weigh the powder and add it to one litre of water. Mix well until the powder dissolves.

After that, check the pH and adjust it if necessary. Then put the bottle in the autoclave for twenty minutes at 121 °C.

Finally, let the medium cool down and label the bottle with the date and your name.`,
  },
  {
    id: 'jj-w-job',
    module: 'jj-cdmo',
    level: 'A2',
    type: 'email',
    title: 'Expliquer ton travail',
    prompt: 'A friend from Canada asks you: "What do you do exactly?" Write a short message to explain your job: your company, what you produce, what you do every day and what you are working on this week.',
    tipsFr: 'Present simple pour le travail habituel (we produce, I check), present continuous pour cette semaine (this week I\'m working on…).',
    minWords: 60,
    maxWords: 140,
    targetPhrases: ['I work', 'We produce', 'every day', 'this week'],
    checklist: ['Present simple pour l\'habitude', 'Present continuous pour cette semaine', 'Au moins 3 mots du paquet « Mon travail en CDMO »'],
    model: `Hi Emma,

I work for a CDMO near Liège. A CDMO is a company that produces things for other companies. We produce plasmid DNA, which is used for gene therapy and vaccines.

I work in the fermentation team. Every day, I prepare the bioreactors, I grow the bacteria and I check the pH and the temperature. I work in a clean room, so I wear a special gown.

This week, I'm working on a new batch for an American client. It's a big project!

Talk soon,
Julien`,
  },
]
