import type { Exercise } from '../types'
import { extra } from './edition-content.ts'

// « Trouver les bonnes formulations » : exercices de reformulation pour passer du B2 au C1.
// Pour les réécritures libres (transform), plusieurs réponses sont acceptées et on peut
// toujours valider soi-même une formulation différente mais correcte.
const jojo_styleExercises: Exercise[] = [
  // --- Le plus naturel ---
  {
    kind: 'mcq', id: 'st-01', tags: ['register'], prompt: 'Which sounds the most natural in a meeting?',
    options: ["I'd like to bring up one more point.", 'I want to say one more point.', 'I have one more point to tell.', 'I would like to add one more point to say.'], answer: 0,
    explanation: 'Bring up / raise a point = aborder un point.',
  },
  {
    kind: 'mcq', id: 'st-02', tags: ['register'], prompt: 'You need information from a colleague. The most natural e-mail opening is:',
    options: ['I was wondering if you could send me the latest figures.', 'I want the latest figures.', 'Give me please the latest figures.', 'I need that you send me the latest figures.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-03', tags: ['collocations'], prompt: '« Nous devons respecter l\'échéance. »',
    options: ['We need to meet the deadline.', 'We need to respect the deadline.', 'We need to hold the deadline.', 'We need to follow the deadline.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-04', tags: ['collocations'], prompt: '« Elle a soulevé un point important. »',
    options: ['She raised an important point.', 'She rose an important point.', 'She lifted an important point.', 'She made up an important point.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-05', tags: ['register'], prompt: 'Which is the best way to disagree with your manager?',
    options: ["I see your point, but I'm not entirely convinced it would work.", "You're wrong.", "No, I don't agree at all.", "That's a bad idea."], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-06', tags: ['word-choice'], prompt: '« Je vous tiendrai au courant. »',
    options: ["I'll keep you posted.", "I'll hold you current.", "I'll keep you in the current.", "I'll tell you the current."], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-07', tags: ['word-choice'], prompt: '« Il faut tenir compte du délai de livraison. »',
    options: ['We need to take the delivery time into account.', 'We need to hold the delivery delay in count.', 'We need to count the delivery delay.', 'We need to take account the delivery delay.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-08', tags: ['word-choice'], prompt: 'Most natural way to end a meeting:',
    options: ["Right, I think that's everything. Thanks, everyone.", 'The meeting is finished now, you can go.', 'It is the end of this meeting.', 'We have terminated the meeting.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-09', tags: ['word-choice'], prompt: '« À mon avis, c\'est une bonne idée. » — the most natural spoken option:',
    options: ["In my view, it's a good idea.", "At my opinion, it's a good idea.", "In my opinion, it's a good idea for me.", "According to me, it's a good idea."], answer: 0,
    explanation: '« According to me » est une faute typique de francophone : « according to » s\'emploie pour citer les autres (according to the report).',
  },
  {
    kind: 'mcq', id: 'st-10', tags: ['word-choice'], prompt: '« Ça dépend de la situation. »',
    options: ['It depends on the situation.', 'It depends of the situation.', 'It is depending of the situation.', 'It depends from the situation.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-11', tags: ['word-choice'], prompt: '« J\'ai hâte de vous voir. »',
    options: ['I look forward to seeing you.', 'I look forward to see you.', 'I have haste to see you.', 'I am impatient to see you.'], answer: 0,
  },
  {
    kind: 'mcq', id: 'st-12', tags: ['word-choice'], prompt: '« Je suis d\'accord avec toi. »',
    options: ['I agree with you.', 'I am agree with you.', 'I am agreed with you.', 'I agree you.'], answer: 0,
  },
  // --- Réécritures ---
  {
    kind: 'transform', id: 'st-13', tags: ['register'], level: 'B2+', instruction: 'Rends cette phrase plus professionnelle.',
    prompt: 'The results are really bad.',
    answers: ['The results are disappointing.', 'The results fell short of our expectations.', 'The results are far from satisfactory.', "The results didn't meet our expectations.", 'The results are not satisfactory.'],
  },
  {
    kind: 'transform', id: 'st-14', tags: ['register'], level: 'B2+', instruction: 'Rends cette demande plus polie.',
    prompt: 'Can you send me the file?',
    answers: ['Could you send me the file, please?', 'Would you mind sending me the file?', 'I was wondering if you could send me the file.', 'Would it be possible to send me the file?', 'Could you please send me the file?', 'Could you send me the file?'],
  },
  {
    kind: 'transform', id: 'st-15', tags: ['register'], level: 'B2+', instruction: 'Remplace « a lot » par une formulation plus précise.',
    prompt: 'The price went up a lot.',
    answers: ['The price rose sharply.', 'The price increased sharply.', 'The price increased significantly.', 'The price rose significantly.', 'There was a sharp increase in the price.', 'The price increased dramatically.'],
  },
  {
    kind: 'transform', id: 'st-16', tags: ['register'], level: 'C1', instruction: 'Réécris de façon plus nuancée (hedging).',
    prompt: 'This method is the best.',
    answers: ['This method seems to be the most effective.', 'This method is arguably the best.', 'This method appears to be the most effective.', 'This method is probably the best.', 'This method would seem to be the best.'],
  },
  {
    kind: 'transform', id: 'st-17', tags: ['linking'], level: 'B2+', instruction: 'Relie avec « whereas ».',
    prompt: 'Some employees love remote work. Others miss the office.',
    answers: ['Some employees love remote work, whereas others miss the office.', 'Whereas some employees love remote work, others miss the office.'],
  },
  {
    kind: 'transform', id: 'st-18', tags: ['linking'], level: 'B2+', instruction: 'Réécris avec « due to ».',
    prompt: 'The delivery was late because there was a strike.',
    answers: ['The delivery was late due to a strike.', 'Due to a strike, the delivery was late.', 'The delivery was delayed due to a strike.'],
  },
  {
    kind: 'transform', id: 'st-19', tags: ['register'], level: 'B2+', instruction: 'Remplace le phrasal verb par un verbe plus formel.',
    prompt: 'We need to find out why the test failed.',
    answers: ['We need to determine why the test failed.', 'We need to establish why the test failed.', 'We need to identify why the test failed.', 'We need to investigate why the test failed.'],
  },
  {
    kind: 'transform', id: 'st-20', tags: ['register'], level: 'B2+', instruction: 'Remplace le phrasal verb par un verbe plus formel.',
    prompt: 'The meeting has been put off until next week.',
    answers: ['The meeting has been postponed until next week.', 'The meeting has been postponed to next week.', 'The meeting has been rescheduled for next week.'],
  },
  {
    kind: 'transform', id: 'st-21', tags: ['word-choice'], level: 'B2+', instruction: 'Évite la répétition de « very » : choisis un adjectif plus fort.',
    prompt: 'I was very tired after the marathon.',
    answers: ['I was exhausted after the marathon.', 'I was worn out after the marathon.', 'I was drained after the marathon.', 'I was shattered after the marathon.'],
  },
  {
    kind: 'transform', id: 'st-22', tags: ['word-choice'], level: 'B2+', instruction: 'Choisis un adjectif plus fort que « very good ».',
    prompt: 'The presentation was very good.',
    answers: ['The presentation was excellent.', 'The presentation was outstanding.', 'The presentation was superb.', 'The presentation was brilliant.', 'The presentation was impressive.'],
  },
  {
    kind: 'transform', id: 'st-23', tags: ['word-choice'], level: 'B2+', instruction: 'Choisis un adjectif plus fort que « very important ».',
    prompt: 'Communication is very important for the team.',
    answers: ['Communication is essential for the team.', 'Communication is crucial for the team.', 'Communication is vital for the team.', 'Communication is key for the team.', 'Communication is critical for the team.'],
  },
  {
    kind: 'transform', id: 'st-24', tags: ['inversion'], level: 'C1', instruction: 'Mets en valeur avec « What… is… ».',
    prompt: 'We really need better communication in the team.',
    answers: ['What we really need is better communication in the team.', 'What we really need in the team is better communication.', 'What the team really needs is better communication.'],
    explanation: 'Phrase clivée : What + sujet + verbe + is + élément mis en valeur. On met en relief ce qui suit « is ».',
  },
  {
    kind: 'transform', id: 'st-25', tags: ['register'], level: 'B2+', instruction: 'Rends ce début d\'e-mail formel.',
    prompt: 'Hi, I\'m writing because I want to complain about the delivery.',
    answers: ['Dear Sir or Madam, I am writing to complain about the delivery.', 'Dear Sir or Madam, I am writing to express my dissatisfaction with the delivery.', 'Dear Sir/Madam, I am writing to complain about the delivery.', 'I am writing to complain about the delivery.', 'I am writing to express my dissatisfaction with the delivery.'],
  },
  {
    kind: 'transform', id: 'st-26', tags: ['word-choice'], level: 'B2', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Ça vaut la peine d\'essayer.',
    answers: ["It's worth a try.", 'It is worth a try.', "It's worth trying.", 'It is worth trying.'],
  },
  {
    kind: 'transform', id: 'st-27', tags: ['word-choice'], level: 'B2', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Je n\'ai pas eu le temps de le faire.',
    answers: ["I didn't have time to do it.", "I haven't had time to do it.", "I didn't have the time to do it.", "I haven't had the time to do it."],
  },
  {
    kind: 'transform', id: 'st-28', tags: ['word-choice'], level: 'B2+', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'On se tient au courant.',
    answers: ["Let's keep each other posted.", "Let's stay in touch.", "Let's keep in touch.", "We'll keep each other posted.", "Let's keep each other updated."],
  },
  {
    kind: 'transform', id: 'st-29', tags: ['word-choice'], level: 'B2+', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Il est en train de se passer quelque chose d\'important.',
    answers: ['Something important is happening.', 'Something important is going on.', 'Something big is happening.', 'Something important is taking place.'],
  },
  {
    kind: 'transform', id: 'st-30', tags: ['word-choice'], level: 'B2+', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Ça ne me dérange pas.',
    answers: ["I don't mind.", "It doesn't bother me.", "That's fine with me.", 'I do not mind.'],
  },
  {
    kind: 'transform', id: 'st-31', tags: ['word-choice'], level: 'B2+', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Au fur et à mesure, on s\'est rendu compte que c\'était plus compliqué.',
    answers: ['Gradually, we realized it was more complicated.', 'As we went along, we realized it was more complicated.', 'Over time, we realized it was more complicated.', 'As time went on, we realized it was more complicated.', 'Gradually, we realised it was more complicated.'],
  },
  {
    kind: 'transform', id: 'st-32', tags: ['word-choice'], level: 'C1', instruction: 'Traduis naturellement (pas mot à mot).',
    prompt: 'Il faut dire que le budget était serré.',
    answers: ['Admittedly, the budget was tight.', 'It has to be said that the budget was tight.', 'To be fair, the budget was tight.', 'Granted, the budget was tight.'],
  },
]

// « Changer de perspective » : dire EXACTEMENT la même chose avec un autre point de vue.
// Chaque consigne impose le début de la phrase ou le mot à utiliser, pour éviter les ambiguïtés.
const jojo_perspectiveExercises: Exercise[] = [
  {
    kind: 'transform', id: 'pe-01', tags: ['perspective', 'comparison'], level: 'B2', instruction: 'Même sens, autre point de vue : commence par « I… ».',
    prompt: 'My brother is older than me.',
    answers: ['I am younger than my brother.', "I'm younger than my brother."],
    explanation: 'On inverse le sujet ET l\'adjectif (older → younger) : le sens reste le même.',
  },
  {
    kind: 'transform', id: 'pe-02', tags: ['perspective', 'comparison'], level: 'B2', instruction: 'Même sens : commence par « Lab B… ».',
    prompt: 'Lab A is not as big as Lab B.',
    answers: ['Lab B is bigger than Lab A.', 'Lab B is larger than Lab A.'],
    explanation: '« A is not as big as B » = B est plus grand que A.',
  },
  {
    kind: 'transform', id: 'pe-03', tags: ['perspective', 'comparison'], level: 'B2', instruction: 'Même sens, avec « not as… as » et l\'adjectif « cheap ».',
    prompt: 'The new process is more expensive than the old one.',
    answers: ['The new process is not as cheap as the old one.', "The new process isn't as cheap as the old one."],
    explanation: 'Plus cher = pas aussi bon marché. C\'est le piège de « Your car is cheaper than mine » : avec « not as… as », on garde le sujet mais on prend l\'adjectif contraire (ou on inverse les sujets).',
  },
  {
    kind: 'transform', id: 'pe-04', tags: ['perspective', 'comparison'], level: 'B2+', instruction: 'Même sens : commence par « More people… ».',
    prompt: 'Fewer people came this year than last year.',
    answers: ['More people came last year than this year.'],
    explanation: 'On inverse les deux termes de la comparaison (fewer → more, this year ↔ last year).',
  },
  {
    kind: 'transform', id: 'pe-05', tags: ['perspective', 'word-choice'], level: 'B2', instruction: 'Même situation, du point de vue de l\'emprunteur : commence par « I borrowed… ».',
    prompt: 'Paul lent me his laptop.',
    answers: ["I borrowed Paul's laptop.", 'I borrowed a laptop from Paul.', 'I borrowed his laptop from Paul.', "I borrowed Paul's laptop from him."],
    explanation: 'LEND something TO someone (prêter) ↔ BORROW something FROM someone (emprunter).',
  },
  {
    kind: 'transform', id: 'pe-06', tags: ['perspective', 'word-choice'], level: 'B2', instruction: 'Même situation, du point de vue de l\'acheteur : commence par « We bought… ».',
    prompt: 'The supplier sold us the reagents.',
    answers: ['We bought the reagents from the supplier.'],
    explanation: 'SELL something TO someone ↔ BUY something FROM someone.',
  },
  {
    kind: 'transform', id: 'pe-07', tags: ['perspective', 'past-perfect'], level: 'B2+', instruction: 'Même sens : commence par « When we arrived at the station, … ».',
    prompt: 'The train left before we arrived at the station.',
    answers: ['When we arrived at the station, the train had already left.', 'When we arrived at the station, the train had left.'],
    explanation: 'En partant de l\'arrivée, le départ du train devient antérieur → past perfect (had already left).',
  },
  {
    kind: 'transform', id: 'pe-08', tags: ['perspective', 'present-perfect', 'since-for'], level: 'B2', instruction: 'Même sens : commence par « She has… » (on parle de maintenant).',
    prompt: 'She started working here three years ago.',
    answers: ['She has worked here for three years.', 'She has been working here for three years.', "She's worked here for three years.", "She's been working here for three years.", 'She has worked here for 3 years.', 'She has been working here for 3 years.'],
    explanation: '« Started … ago » (past simple, point de départ) ↔ « has worked … for » (present perfect, durée jusqu\'à maintenant).',
  },
  {
    kind: 'transform', id: 'pe-09', tags: ['perspective', 'past-simple', 'since-for'], level: 'B2+', instruction: 'Même sens : commence par « The last time… ».',
    prompt: "I haven't seen him since March.",
    answers: ['The last time I saw him was in March.'],
    explanation: '« I haven\'t… since » (present perfect) ↔ « The last time I + PAST SIMPLE was… ».',
  },
  {
    kind: 'transform', id: 'pe-10', tags: ['perspective', 'present-perfect', 'since-for'], level: 'B2+', instruction: 'Même sens : commence par « I haven\'t… ».',
    prompt: "It's been 20 years since I last went on a roller coaster.",
    answers: ["I haven't been on a roller coaster for 20 years.", "I haven't been on a roller coaster in 20 years.", "I haven't gone on a roller coaster for 20 years.", "I haven't gone on a roller coaster in 20 years.", 'I have not been on a roller coaster for 20 years.'],
    explanation: 'Trois façons de dire la même chose : It\'s been 20 years since I last went… / I haven\'t been… for 20 years / The last time I went… was 20 years ago.',
  },
  {
    kind: 'transform', id: 'pe-11', tags: ['perspective', 'passive'], level: 'B2', instruction: 'Même sens, au passif : commence par « This award… ».',
    prompt: 'Nobody has ever won this award twice.',
    answers: ['This award has never been won twice.', 'This award has never been won twice by anyone.'],
    explanation: '« Nobody has ever… » → au passif, la négation passe sur le verbe : has never been won.',
  },
  {
    kind: 'transform', id: 'pe-12', tags: ['perspective', 'passive', 'gerund-inf'], level: 'C1', instruction: 'Même sens, du point de vue de la personne : commence par « I was… ».',
    prompt: 'The manager made me rewrite the report.',
    answers: ['I was made to rewrite the report.', 'I was made to rewrite the report by the manager.', 'I was made to rewrite the report by my manager.'],
    explanation: 'Make someone DO (sans to) → au passif : be made TO do (le « to » réapparaît !).',
  },
  {
    kind: 'transform', id: 'pe-13', tags: ['perspective', 'word-choice'], level: 'B2', instruction: 'Même sens, avec « not … enough ».',
    prompt: 'The meeting is too short for us to discuss everything.',
    answers: ['The meeting is not long enough for us to discuss everything.', "The meeting isn't long enough for us to discuss everything.", "The meeting isn't long enough to discuss everything."],
    explanation: 'too + adjectif ↔ not + adjectif CONTRAIRE + enough (too short = not long enough).',
  },
  {
    kind: 'transform', id: 'pe-14', tags: ['perspective', 'word-choice'], level: 'B2', instruction: 'Même sens, avec « not … enough ».',
    prompt: 'He is too young to drive.',
    answers: ['He is not old enough to drive.', "He isn't old enough to drive.", "He's not old enough to drive."],
    explanation: 'too young = not old enough.',
  },
  {
    kind: 'transform', id: 'pe-15', tags: ['perspective', 'conditionals'], level: 'B2+', instruction: 'Même sens : commence par « Unless… ».',
    prompt: "If you don't book now, there won't be any seats left.",
    answers: ["Unless you book now, there won't be any seats left.", 'Unless you book now, there will not be any seats left.', 'Unless you book now, there will be no seats left.'],
    explanation: 'Unless = if … not : on retire la négation du verbe.',
  },
  {
    kind: 'transform', id: 'pe-16', tags: ['perspective', 'reported'], level: 'B2+', instruction: 'Même sens, au discours direct : commence par « "I… ».',
    prompt: 'She told me she had finished the report.',
    answers: ['"I have finished the report," she told me.', '"I\'ve finished the report," she told me.', '"I have finished the report," she said.', '"I finished the report," she told me.', '"I\'ve finished the report," she said.'],
    explanation: 'Discours indirect → direct : le past perfect redevient present perfect (ou past simple).',
  },
]

// « Synonymes » : varier son vocabulaire et monter en précision.
const jojo_synonymExercises: Exercise[] = [
  { kind: 'mcq', id: 'sy-01', tags: ['synonyms'], level: 'C1', prompt: 'Which word is closest in meaning to « to mitigate » (the risk)?', options: ['to reduce', 'to ignore', 'to measure', 'to increase'], answer: 0, explanation: 'Mitigate = reduce, lessen, alleviate.' },
  { kind: 'mcq', id: 'sy-02', tags: ['synonyms'], level: 'B2+', prompt: 'Affordable housing is « scarce ». Closest meaning?', options: ['rare / in short supply', 'expensive', 'dangerous', 'far away'], answer: 0 },
  { kind: 'mcq', id: 'sy-03', tags: ['synonyms'], level: 'B2+', prompt: 'Short-term rentals are « lucrative ». Closest meaning?', options: ['profitable', 'illegal', 'popular', 'risky'], answer: 0 },
  { kind: 'mcq', id: 'sy-04', tags: ['synonyms'], level: 'B2+', prompt: 'The software integrates « seamlessly ». Closest meaning?', options: ['smoothly, without problems', 'slowly', 'partially', 'secretly'], answer: 0 },
  { kind: 'mcq', id: 'sy-05', tags: ['synonyms'], level: 'B2', prompt: 'Who is going to « handle » the complaint? Closest meaning?', options: ['deal with', 'look at', 'write', 'refuse'], answer: 0 },
  { kind: 'mcq', id: 'sy-06', tags: ['synonyms'], level: 'B2+', prompt: 'The article « prompted » a discussion. Closest meaning?', options: ['triggered / sparked', 'stopped', 'summarised', 'avoided'], answer: 0 },
  { kind: 'mcq', id: 'sy-07', tags: ['synonyms'], level: 'B2', prompt: 'Increase the distance « gradually ». Closest meaning?', options: ['progressively, little by little', 'quickly', 'suddenly', 'rarely'], answer: 0 },
  { kind: 'mcq', id: 'sy-08', tags: ['synonyms'], level: 'B2', prompt: 'Our clients are « mainly » hospitals. Closest meaning?', options: ['mostly / primarily', 'only', 'never', 'sometimes'], answer: 0 },
  { kind: 'mcq', id: 'sy-09', tags: ['synonyms'], level: 'B2+', prompt: 'The hall can « accommodate » 250 people. Closest meaning?', options: ['hold / welcome', 'refuse', 'feed', 'count'], answer: 0 },
  { kind: 'mcq', id: 'sy-10', tags: ['synonyms'], level: 'B2+', prompt: 'There is a lot « at stake ». Closest meaning?', options: ['to lose or gain / in play', 'to eat', 'to check', 'to buy'], answer: 0 },
  { kind: 'mcq', id: 'sy-11', tags: ['synonyms'], level: 'B2', prompt: 'Working from home is more « convenient ». Closest meaning?', options: ['practical', 'polite', 'appropriate', 'expensive'], answer: 0, explanation: 'Convenient = practical, handy (≠ convenable).' },
  { kind: 'mcq', id: 'sy-12', tags: ['synonyms'], level: 'B2+', prompt: 'We need to « retrieve » the old data. Closest meaning?', options: ['recover / get back', 'delete', 'publish', 'analyse'], answer: 0 },
  { kind: 'mcq', id: 'sy-13', tags: ['synonyms'], level: 'C1', prompt: 'The city is trying to « tackle » the housing crisis. Closest meaning?', options: ['address / deal with', 'ignore', 'describe', 'cause'], answer: 0 },
  { kind: 'mcq', id: 'sy-14', tags: ['synonyms'], level: 'B2', prompt: 'You have to « gather » information. Closest meaning?', options: ['collect', 'hide', 'share', 'forget'], answer: 0 },
  { kind: 'mcq', id: 'sy-15', tags: ['synonyms'], level: 'C1', prompt: 'The delay could « jeopardize » the launch. Closest meaning?', options: ['put at risk / endanger', 'speed up', 'confirm', 'announce'], answer: 0 },
  { kind: 'mcq', id: 'sy-16', tags: ['synonyms'], level: 'B2', prompt: 'It was very « tiring ». Closest meaning?', options: ['exhausting', 'boring', 'tired', 'relaxing'], answer: 0, explanation: 'Tiring = exhausting (la chose fatigue). Tired = fatigué (la personne).' },
  { kind: 'gap', id: 'sy-17', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'There has been a ___ increase in rents. (synonyme plus précis de « big »)', answers: ['significant', 'substantial', 'considerable', 'sharp', 'major', 'dramatic', 'marked', 'steep'] },
  { kind: 'gap', id: 'sy-18', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'Could you ___ me with the installation? (synonyme formel de « help »)', answers: ['assist', 'support'] },
  { kind: 'gap', id: 'sy-19', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'The results clearly ___ the need for more staff. (synonyme de « show »)', answers: ['demonstrate', 'highlight', 'indicate', 'reveal', 'illustrate', 'prove', 'underline', 'emphasise', 'emphasize'] },
  { kind: 'gap', id: 'sy-20', tags: ['synonyms', 'register'], level: 'B2', prompt: 'We need to ___ the necessary approvals. (synonyme formel de « get »)', answers: ['obtain', 'secure', 'receive', 'acquire'] },
  { kind: 'gap', id: 'sy-21', tags: ['synonyms', 'register'], level: 'B2', prompt: 'This process ___ a lot of focus. (synonyme de « needs »)', answers: ['requires', 'demands', 'takes', 'involves'] },
  { kind: 'gap', id: 'sy-22', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'We will ___ the new product in March. (synonyme de « start selling »)', answers: ['launch', 'release', 'introduce', 'roll out'] },
  { kind: 'gap', id: 'sy-23', tags: ['synonyms', 'register'], level: 'B2', prompt: 'We have ___ time to finish the project. (synonyme formel de « enough »)', answers: ['sufficient', 'adequate', 'ample'] },
  { kind: 'gap', id: 'sy-24', tags: ['synonyms', 'register'], level: 'B2', prompt: 'IT managed to ___ the problem in ten minutes. (synonyme de « fix »)', answers: ['solve', 'resolve', 'sort out', 'repair', 'address'] },
  { kind: 'gap', id: 'sy-25', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'We need to ___ the budget at the next meeting. (synonyme de « talk about », sans préposition)', answers: ['discuss', 'review', 'address', 'examine'], explanation: '« Discuss » s\'emploie sans « about ».' },
  { kind: 'gap', id: 'sy-26', tags: ['synonyms', 'register'], level: 'B2+', prompt: 'Good communication is ___ for the team. (synonyme fort de « very important »)', answers: ['essential', 'crucial', 'vital', 'key', 'critical', 'paramount'] },
  { kind: 'gap', id: 'sy-27', tags: ['synonyms'], level: 'B2', prompt: 'The delivery is two days ___ . (synonyme de « late »)', answers: ['behind schedule', 'overdue', 'delayed'] },
  { kind: 'gap', id: 'sy-28', tags: ['synonyms'], level: 'B2+', prompt: 'I ___ that the problem is related to the price. (synonyme de « think », pour une supposition)', answers: ['suspect', 'assume', 'believe', 'suppose', 'guess', 'imagine', 'reckon'] },
  {
    kind: 'transform', id: 'sy-29', tags: ['synonyms', 'register'], level: 'B2+', instruction: 'Remplace « problem » par un synonyme et « fix » par un verbe plus précis.',
    prompt: 'We had a problem with the freezer, but we fixed it.',
    answers: ['We had an issue with the freezer, but we resolved it.', 'We had an issue with the freezer, but we solved it.', 'We had an issue with the freezer, but we sorted it out.', 'We had an issue with the freezer, but we repaired it.', 'We ran into an issue with the freezer, but we resolved it.', 'We had a malfunction with the freezer, but we repaired it.', 'We had a fault with the freezer, but we repaired it.'],
  },
  {
    kind: 'transform', id: 'sy-30', tags: ['synonyms', 'register'], level: 'C1', instruction: 'Évite de répéter « important » : utilise deux synonymes différents.',
    prompt: 'Quality is important and training is important too.',
    answers: ['Quality is essential and training is crucial too.', 'Quality is crucial and training is essential too.', 'Quality is essential and training is vital too.', 'Quality is vital and training is essential too.', 'Quality is crucial and training is vital too.', 'Quality is vital and training is crucial too.', 'Quality is key and training is essential too.', 'Quality is essential and training is key too.'],
    explanation: 'Plusieurs combinaisons sont possibles : essential, crucial, vital, key, critical… Si la tienne est correcte, valide-la toi-même.',
  },
]

// Séries de niveau B2 → C1 : réservées à l'accès Jojo.
export const styleExercises: Exercise[] = extra ? [] : jojo_styleExercises
export const perspectiveExercises: Exercise[] = extra ? [] : jojo_perspectiveExercises
export const synonymExercises: Exercise[] = extra ? [] : jojo_synonymExercises
