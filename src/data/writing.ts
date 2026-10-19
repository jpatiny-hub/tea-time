import type { WritingTask } from '../types'
import { extra } from './edition-content.ts'

const jojoWritingTasks: WritingTask[] = [
  {
    id: 'w-company-email',
    module: 'company',
    level: 'B2',
    type: 'email',
    title: 'Présenter ton entreprise à un nouveau partenaire',
    prompt: 'A potential partner from Canada has asked you to introduce your company before a first video call. Write an e-mail describing what your company does, how it is organized, who your clients are and what makes it different.',
    tipsFr: "Registre professionnel mais chaleureux. Présent simple pour les faits, present perfect pour l'évolution (has grown, has developed), past simple pour la date de création.",
    minWords: 150,
    maxWords: 220,
    targetPhrases: [
      'Our company is organized into',
      'Each department is responsible for',
      'Our clients include',
      'We prioritize',
      'What sets us apart',
      'I look forward to',
    ],
    checklist: [
      "Formule d'ouverture et de clôture professionnelles",
      'Au moins un past simple (création) et un present perfect (évolution)',
      'Structure en paragraphes : activité → organisation → clients → valeurs',
      'Pas de « informations », « a research », « formation »',
    ],
    model: `Dear Ms Tremblay,

Thank you for your interest in working with us. Ahead of our call next Tuesday, I would like to give you a brief overview of our company.

Northbridge Biologics was founded in 2004 and has since grown into a team of about 450 people. We develop and produce enzymes and diagnostic kits for the pharmaceutical and food sectors. Our company is organized into five departments, and each department is responsible for its own budget. There is close collaboration between R&D and production, which allows us to scale up new products quickly.

Our clients include hospitals, universities and several large vaccine manufacturers in Europe and North America. We prioritize quality and transparency, and our teams are highly skilled in fermentation and purification.

What sets us apart from our competitors is our flexibility: we can adapt our processes to very specific client requirements.

I look forward to discussing possible collaborations with you.

Kind regards,
[Your name]`,
  },
  {
    id: 'w-company-2050',
    module: 'company',
    level: 'C1',
    type: 'essay',
    title: 'Ton entreprise en 2050',
    prompt: 'Imagine your company in 2050. Describe what it does, what it looks like and how things have changed compared to today.',
    tipsFr: 'Parfait pour les futurs avancés : will be + -ing (en cours en 2050), will have + participe (terminé avant 2050), be likely to, might.',
    minWords: 150,
    maxWords: 250,
    targetPhrases: ['will have', 'will be', 'is likely to', 'might', 'By 2050', 'I would imagine that'],
    checklist: [
      'Au moins deux « will have + participe passé » (future perfect)',
      'Au moins un « will be + -ing » (future continuous)',
      'Des modaux de probabilité (might, is likely to, could)',
      'Une conclusion personnelle (opinion)',
    ],
    model: `By 2050, I would imagine that our company will have changed beyond recognition. Most of the repetitive laboratory work will have been automated, and robots will be running experiments 24 hours a day. Scientists will be spending most of their time designing new molecules and analysing data rather than pipetting.

The company is likely to be smaller in terms of staff but much larger in terms of output. Our production sites might be located closer to patients, as small, modular bioreactors will have replaced the huge tanks we use today. Many employees will be working remotely, and meetings will probably take place in virtual reality.

However, some things will not have changed. Quality and patient safety will still be our top priorities, and human judgement will remain essential when things go wrong.

Personally, I find this vision both exciting and slightly worrying: technology will certainly make us more efficient, but we will need to make sure that we don't lose the human interaction that makes our work meaningful.`,
  },
  {
    id: 'w-problems-incident',
    module: 'problems',
    level: 'B2+',
    type: 'report',
    title: "Rapport d'incident",
    prompt: 'Write a short incident report about a problem that happened at work (for example, a freezer failure, a delivery error or an IT problem). Describe what happened, the consequences, the actions taken and the lessons learned.',
    tipsFr: 'Le temps roi ici, c\'est le past simple (récit), avec le past perfect pour les causes antérieures (the sensor had failed) et le present perfect pour ce qui a changé depuis (we have introduced).',
    minWords: 150,
    maxWords: 250,
    targetPhrases: [
      'We ran into a problem with',
      'As a result',
      'To solve the issue',
      'In the end, we managed to',
      'This problem can be avoided by',
      'Since then, we have',
      'Looking back',
    ],
    checklist: [
      'Past simple pour la chronologie des faits',
      'Au moins un past perfect pour une cause antérieure',
      'Au moins un present perfect pour les mesures prises depuis',
      'Structure : faits → conséquences → actions → leçons',
      'Un passif (was detected, has been replaced…)',
    ],
    model: `Incident report – Freezer failure, Building B

On the night of 12 March, the -80 °C freezer in Lab 3 stopped working. The alarm went off at 2 a.m., but nobody received the notification because the phone number in the system had not been updated after a colleague left the company.

As a result, the temperature rose to -20 °C, and about 150 samples were exposed to unacceptable conditions. When the technician arrived at 7 a.m., the samples were immediately transferred to a backup freezer.

To solve the issue, we replaced the faulty compressor and updated the alarm contact list. In the end, we managed to save around two thirds of the samples, after a quality assessment confirmed that they had not been affected.

This problem can be avoided by checking the alarm system every month. Since then, we have introduced a monthly test of all freezer alarms, and each contact list is now reviewed whenever someone joins or leaves the team.

Looking back, I think we underestimated the importance of the notification system. This experience taught us that the equipment is only as reliable as the procedures around it.`,
  },
  {
    id: 'w-problems-complaint',
    module: 'problems',
    level: 'B2',
    type: 'email',
    title: 'E-mail de réclamation',
    prompt: 'You ordered laboratory equipment three weeks ago. It arrived late and one item was damaged. Write a formal complaint e-mail explaining the problem, its consequences for your work, and what you expect the supplier to do.',
    tipsFr: 'Registre formel. Past simple pour les faits, present perfect pour le bilan (we have not received…), et formules polies mais fermes (I would be grateful if…).',
    minWords: 130,
    maxWords: 200,
    targetPhrases: ['I am writing to', 'As a result', 'This caused', 'I would be grateful if', 'I look forward to'],
    checklist: [
      'Ouverture formelle (Dear Sir or Madam / Dear Mr X)',
      'Faits datés au past simple',
      'Une demande claire (remplacement, remboursement…)',
      'Ton ferme mais poli',
    ],
    model: `Dear Sir or Madam,

I am writing to complain about order no. 45872, which I placed on 2 May.

According to your confirmation, the equipment was due to arrive on 9 May. However, it was only delivered on 23 May, two weeks late. Moreover, when we opened the boxes, we discovered that one of the pipette controllers was damaged and cannot be used.

This caused significant problems for our team, as we had to postpone a series of experiments. As a result, one of our projects is now behind schedule.

I would be grateful if you could replace the damaged item as soon as possible and explain what measures you will take to prevent this from happening again. Given the inconvenience, I would also appreciate a discount on our next order.

I look forward to hearing from you.

Yours faithfully,
[Your name]`,
  },
  {
    id: 'w-opinions-essay',
    module: 'opinions',
    level: 'B2+',
    type: 'essay',
    title: 'Essai argumenté : le télétravail',
    prompt: '"Companies should allow employees to work remotely as much as they want." To what extent do you agree? Give arguments for and against, and your own opinion.',
    tipsFr: 'Plan classique : introduction → arguments pour → arguments contre → conclusion avec ton avis. Varie les connecteurs (However, Moreover, Whereas, As a result).',
    minWords: 200,
    maxWords: 300,
    targetPhrases: [
      "I'm inclined to think that",
      'I would argue that',
      'One of the main advantages is that',
      'The downside is that',
      'That may be true to some extent, but',
      'However',
      'All things considered',
    ],
    checklist: [
      'Introduction qui reformule le sujet',
      'Au moins 4 connecteurs différents',
      'Arguments justifiés (because / due to / this is mainly due to)',
      'Conclusion avec un avis clair',
      'Pas de « according to me »',
    ],
    model: `Since the pandemic, remote work has become common in many sectors, and many employees would now like to work from home as often as they wish. However, is total freedom really the best solution?

On the one hand, there is a strong case for flexibility. One of the main advantages is that employees save time and money on commuting, which improves their work-life balance. Moreover, many people find it easier to focus at home, especially on tasks that require a lot of concentration. As a result, they are often more efficient.

On the other hand, the downside is that collaboration and team spirit can suffer. Spontaneous conversations, which often lead to new ideas, rarely happen on video calls. In addition, young employees tend to learn faster when they sit next to experienced colleagues.

That may be true to some extent, but I would argue that these problems can be solved by organising a few days a week in the office. All things considered, I'm inclined to think that a well-organised hybrid model is the most viable option: it gives employees the flexibility they need while preserving the human interaction that makes a team work.`,
  },
  {
    id: 'w-opinions-4day',
    module: 'opinions',
    level: 'B2+',
    type: 'proposal',
    title: 'Semaine de 4 jours : ton avis au comité',
    prompt: 'Your company is considering adopting a 4-day workweek. The management team has asked employees to share their opinion. Write a short message giving your view, with arguments and a suggestion.',
    tipsFr: 'Utilise le 2e conditionnel pour les hypothèses (If we adopted…, people would…) et les expressions d\'opinion du cours.',
    minWords: 120,
    maxWords: 200,
    targetPhrases: ['My overall impression is that', 'If we adopted', 'would', 'There\'s a strong case for', "I'd suggest"],
    checklist: [
      'Au moins deux phrases au 2e conditionnel (If + prétérit, would)',
      'Un avis clair et nuancé',
      'Une suggestion concrète (suggest + -ing ou suggest that…)',
    ],
    model: `Dear management team,

Thank you for asking for our opinion on the 4-day workweek.

My overall impression is that it could be very positive for our team. If we adopted a 4-day week, people would probably be more motivated and less tired, and absenteeism might decrease. There's a strong case for it in terms of recruitment, too: it would make us more attractive than our competitors.

However, I'm not entirely convinced that it would work for every department. In production and quality control, some tasks cannot wait, so we would need to organise rotations carefully.

I'd suggest running a six-month pilot in two departments first. This would allow us to measure the impact on productivity before making a final decision.

Best regards,
[Your name]`,
  },
  {
    id: 'w-assumptions-proposal',
    module: 'assumptions',
    level: 'B2+',
    type: 'proposal',
    title: 'Proposition : un projet en difficulté',
    prompt: "A project in your department is behind schedule: the manager didn't create a proper timeline and there are not enough people. Write a short proposal to your director explaining what you assume the causes are and suggesting solutions.",
    tipsFr: 'Modaux de déduction (must have, might be), suggestions (I would suggest + -ing, it might be worth…) et un 3e conditionnel pour ce qui aurait pu être évité.',
    minWords: 150,
    maxWords: 250,
    targetPhrases: ['I assume that', 'must have', 'might be', 'I would suggest', 'It might be worth', 'If we had'],
    checklist: [
      'Au moins une déduction au passé (must have / can\'t have + participe)',
      'Au moins deux formulations de suggestion différentes',
      'Un 3e conditionnel (If we had…, we would have…)',
      'Suggest + -ing (pas « suggest to »)',
    ],
    model: `Subject: Proposal – getting the Alpha project back on track

As you know, the Alpha project is currently three weeks behind schedule. I assume that the main cause is the lack of a detailed timeline: the initial planning must have underestimated the time needed for the validation phase. It might also be related to the fact that two team members left in the spring and were never replaced.

If we had identified these risks earlier, we would probably have avoided most of the delay. However, I believe the situation can still be improved.

First, I would suggest drawing up a new timeline with clear milestones and a person responsible for each task. Second, it might be worth hiring a temporary technician for the next three months. Finally, a short weekly meeting would help everyone stay on the same page.

I would be happy to discuss these ideas with you.

Best regards,
[Your name]`,
  },
  {
    id: 'w-assumptions-regret',
    module: 'assumptions',
    level: 'C1',
    type: 'story',
    title: 'Et si… ? Une décision que tu regrettes',
    prompt: 'Write about a decision you regret (or a situation that went wrong). Explain what happened, what you should have done and what would have happened if you had acted differently.',
    tipsFr: 'Récit au past simple / past continuous, puis regrets : should have, I wish I had, If I had…, I would have… Mixte possible : If I had…, I would be… now.',
    minWords: 150,
    maxWords: 250,
    targetPhrases: ['should have', 'If I had', 'would have', 'I wish I had', 'Looking back'],
    checklist: [
      'Récit au past simple + past continuous',
      'Au moins deux « should have + participe »',
      'Au moins un 3e conditionnel',
      'Un conditionnel mixte (If I had…, I would be… now) — bonus C1',
    ],
    model: `A few years ago, I was offered a position in a research centre in Canada. I was working in a small lab at the time, and my daughters were still very young, so I turned the offer down without really thinking about it.

Looking back, I think I should have taken more time to consider it. I should have discussed it with my family instead of deciding on my own. If I had accepted, we would have lived abroad for a few years, and my daughters would have become bilingual. I might even be working in a completely different field now.

At the same time, I know that if I had left, I wouldn't have met some of the colleagues who taught me so much, and I wouldn't be in the position I am in today.

I wish I had been braver, but I've learned something important from this experience: when a big opportunity comes, it's worth exploring it properly before saying no.`,
  },
  {
    id: 'w-process-procedure',
    module: 'process',
    level: 'B2+',
    type: 'procedure',
    title: 'Rédiger une procédure',
    prompt: 'Write clear instructions for a new colleague explaining how to perform a routine task in your lab (for example, preparing samples, starting a fermentation run or cleaning a piece of equipment).',
    tipsFr: 'Séquence claire (First, Next, Once you have…, Finally), impératif et passif (The samples are then…), consignes de sécurité (Make sure…, Be careful not to…).',
    minWords: 150,
    maxWords: 250,
    targetPhrases: ['First of all', 'Once you have', 'Make sure', 'Be careful not to', 'is then', 'This ensures that', 'Finally'],
    checklist: [
      'Au moins 5 marqueurs de séquence',
      'Au moins deux verbes au passif',
      'Before / After + -ing (pas + to)',
      'Une consigne de sécurité',
    ],
    model: `How to prepare samples for HPLC analysis

First of all, make sure you are wearing gloves, safety glasses and a lab coat. Before starting, check that the balance has been calibrated that morning.

To begin with, take the samples out of the fridge and let them reach room temperature for about 15 minutes. Next, weigh 50 mg of each sample and transfer it into a labelled tube. Be careful not to mix up the tubes: every label must include the batch number and the date.

Once you have added 5 ml of solvent to each tube, vortex them for 30 seconds. The tubes are then centrifuged at 4,000 rpm for 10 minutes. This ensures that no particles are injected into the column.

After centrifuging the samples, transfer the supernatant into HPLC vials. Finally, record everything in the logbook and place the vials in the autosampler.

If anything unusual happens, don't hesitate to ask a colleague — it is always better to check than to guess.`,
  },
  {
    id: 'w-process-event',
    module: 'process',
    level: 'B2',
    type: 'procedure',
    title: 'Organiser un événement étape par étape',
    prompt: 'Explain to a friend how to organise a successful birthday party (or a team event), from the first idea to the day itself.',
    tipsFr: 'Séquence + conseils (It\'s a good idea to…, Don\'t forget to…). Glisse du vocabulaire vu en cours : send out invitations, caterer, venue, checklist, as a precaution.',
    minWords: 130,
    maxWords: 200,
    targetPhrases: ['The first step is to', 'After that', "Don't forget to", "It's a good idea to", 'as a precaution', 'Finally'],
    checklist: [
      'Au moins 5 étapes ordonnées',
      'Des conseils (should, it\'s a good idea to…)',
      'Au moins 3 mots de vocabulaire des cours',
    ],
    model: `Organising a birthday party is not as difficult as it seems if you follow a few simple steps.

The first step is to decide on a budget and a date. After that, you need to find a venue: a room in a restaurant, a garden or even your own living room. It's a good idea to send out the invitations at least three weeks in advance so that people can plan ahead.

Once you know how many people are coming, you can book a caterer or decide what you will cook yourself. Don't forget to ask your guests about allergies! Then think about decorations, music and, if there are children, maybe an inflatable castle.

As a precaution, always have a plan B for the weather. Finally, make a checklist of everything you need to do on the day — otherwise, you will definitely forget something. And most importantly, remember to enjoy the party yourself!`,
  },
  {
    id: 'w-weekend-story',
    level: 'B2',
    type: 'story',
    title: 'Raconter ton week-end (spécial past simple)',
    prompt: 'Write about what you did last weekend (or during your last holiday): where you went, who you were with, what happened and how you felt.',
    tipsFr: 'Exercice 100 % past simple et past continuous. Relis-toi : chaque « have + participe » avec un moment passé terminé (last weekend, on Saturday) est une erreur !',
    minWords: 120,
    maxWords: 200,
    targetPhrases: ['Last weekend', 'On Saturday', 'was', 'went', 'had a great time', 'while'],
    checklist: [
      'Aucun present perfect avec un moment passé terminé',
      'Au moins 6 verbes irréguliers au prétérit',
      'Au moins un past continuous (I was… when…)',
      'Des adverbes de temps (then, after that, in the end)',
    ],
    model: `Last weekend was really busy but great fun. On Saturday morning, my grandson came to my house, and we began building a huge Lego set together. It took us almost three hours!

In the afternoon, we went to a flea market near Liège. While we were walking between the stalls, I found an old lamp that I bought for five euros. My grandson chose a book about dinosaurs.

On Sunday, it was my daughter's birthday, so we had a family lunch at a small restaurant. The food was excellent and we had a great time. After lunch, we went for a walk along the river, but it suddenly started raining and we got completely wet.

In the end, we spent the evening at home watching a film. I was tired, but it was a lovely weekend.`,
  },
  {
    id: 'w-life-update',
    level: 'B2',
    type: 'email',
    title: 'Donner de tes nouvelles (spécial present perfect)',
    prompt: "You haven't been in touch with an English-speaking friend for a year. Write an e-mail telling them what has changed in your life since you last spoke.",
    tipsFr: "Exercice centré sur le present perfect (bilan : I have changed jobs, we have moved…), avec le past simple dès que tu donnes un moment précis (in March, last summer).",
    minWords: 120,
    maxWords: 200,
    targetPhrases: ["It's been ages", 'I have', 'since', 'for', 'recently', 'last'],
    checklist: [
      'Au moins 4 present perfect (bilan, nouveautés)',
      'Au moins 3 past simple avec un moment précis',
      'Since et for correctement utilisés',
      'Ton amical (Hi…, Hope you\'re well, Take care)',
    ],
    model: `Hi Sarah,

It's been ages since we last spoke — I hope you're well!

A lot has happened since last year. First of all, I've changed jobs: I left the lab in March and I've been working in quality control for six months now. It's been a steep learning curve, but I really enjoy it.

We've also moved to a bigger house near Liège. We found it last summer and moved in October, so we've been living here for almost a year. The girls love having their own rooms!

Recently, I've started taking English lessons again, and I think I've made a lot of progress. I've even given a presentation in English to a Canadian client — something I would never have imagined a few years ago.

What about you? Have you finished renovating your flat?

Take care and keep me posted,
[Your name]`,
  },
  {
    id: 'w-explanations-email',
    module: 'explanations',
    level: 'B2+',
    type: 'email',
    title: 'Expliquer un malentendu par e-mail',
    prompt: 'There was a mix-up: a client received the wrong samples (or two teams booked the same room). Write an e-mail explaining what happened, why it happened, what you have done to fix it, and how you will prevent it from happening again.',
    tipsFr: 'Past simple pour les faits, past perfect pour la cause antérieure (I had entered the wrong date), present perfect pour ce qui est déjà réglé (we have sent…), futur pour la prévention. Ton : clair, honnête, sans se justifier à l\'excès.',
    minWords: 130,
    maxWords: 220,
    targetPhrases: ['The reason is that', "That's why", 'This was due to', 'In other words', 'prevent', 'I would like to apologise'],
    checklist: [
      'Les faits au past simple, la cause au past perfect',
      'Au moins un present perfect pour ce qui a déjà été fait',
      'Prevent + quelqu\'un / quelque chose + from + -ing',
      'Une formule d\'excuse et une clôture professionnelle',
    ],
    model: `Dear Dr Martin,

I would like to apologise for the mix-up with your order last week. Instead of the batch you had requested, you received samples from a different study.

The reason is that our new user interface displays two batch numbers on the same screen, and the technician selected the wrong line. In other words, it was a simple human error, but one that the system should have prevented. This was due to a missing verification step, which we had removed when we changed the software in September.

We have already sent you the correct samples by express delivery, and they should arrive tomorrow morning. Please do not use the samples you received; our courier will collect them on Thursday.

To prevent this from happening again, we have reintroduced a double check before every shipment, and the software will now ask for confirmation of the batch number.

I hope this explanation makes sense. Please let me know if you have any questions.

Kind regards,
[Your name]`,
  },
  {
    id: 'w-explanations-decision',
    module: 'explanations',
    level: 'B2+',
    type: 'email',
    title: 'Justifier une décision à ta direction',
    prompt: 'You manage a small team that needs customer-service training, and your budget is limited. You must choose between a one-day in-person workshop for the whole team and an online course that employees complete individually over time. Write an e-mail to your director: state which option you chose, explain your reasons (cost, flexibility, impact…), mention at least one disadvantage of the other option, and justify why your choice is better for the company.',
    tipsFr: "Structure de la fiche : choix → raisons → inconvénient de l'autre option → conclusion. Utilise les expressions du module (The reason is that…, More specifically…, As a result…, The point is that…). Conditionnel pour l'option écartée (it would…).",
    minWords: 140,
    maxWords: 230,
    targetPhrases: ['The reason is that', 'More specifically', 'As a result', 'The point is that', 'Consequently', 'For example'],
    checklist: [
      'Le choix est annoncé dès le premier paragraphe',
      'Au moins deux raisons, chacune justifiée',
      "Un inconvénient de l'autre option, au conditionnel (would / could)",
      'Une conclusion qui dit pourquoi ce choix est meilleur pour l\'entreprise',
      'Registre professionnel (Dear…, Kind regards)',
    ],
    model: `Dear Ms Lambert,

After comparing the two training options, I have decided to book the one-day in-person workshop for the whole team.

The reason is that our main weakness is consistency: each person handles complaints differently. More specifically, we need everyone to agree on the same procedures and phrases, and this works best when the team practises together, with a trainer who can give immediate feedback. For example, role-plays are far more effective face to face than in front of a screen.

The online course would certainly be more flexible and slightly cheaper. However, the point is that employees would complete it at different times, often between two calls, and some might not finish it at all. As a result, we would not get the shared understanding we need.

Consequently, although the workshop requires us to free up everyone's schedule for one day, I believe it will have a stronger and longer-lasting impact on customer satisfaction. I have chosen a Tuesday, when we receive the fewest customer calls.

I would be happy to discuss it if you have any questions.

Kind regards,
[Your name]`,
  },
  {
    id: 'w-halloween-story',
    level: 'B2+',
    type: 'story',
    title: 'Une histoire qui fait peur (Halloween)',
    prompt: 'Write a short ghost story that begins with this sentence: "It was the night of 31 October, and I was the last person in the lab…" Describe the setting, build up the tension, tell what happened and finish with a twist or an explanation.',
    tipsFr: "C'est l'exercice idéal pour les temps du récit : past continuous pour le décor (it was raining, the machines were humming), past simple pour les événements (suddenly, the lights went out), past perfect pour ce qui s'était passé avant (someone had moved the samples). Ajoute une déduction au passé (it must have been… / it can't have been…) et du vocabulaire du thème (eerie, creepy, a bloodcurdling scream).",
    minWords: 150,
    maxWords: 250,
    targetPhrases: ['All of a sudden', 'must have', "can't have", 'had', 'My heart was pounding', 'It turned out that'],
    checklist: [
      'Le décor est au past continuous (was / were + -ing)',
      'Les événements sont au past simple',
      'Au moins un past perfect pour un événement antérieur',
      'Une déduction au passé : must have / might have / can\'t have + participe passé',
      'Au moins trois mots du thème Halloween',
      'Une chute (twist) ou une explication à la fin',
    ],
    model: `It was the night of 31 October, and I was the last person in the lab. Outside, it was raining heavily, and the only sound inside was the gentle humming of the freezers. I was finishing my last analysis when, all of a sudden, the lights went out.

For a few seconds, there was an eerie silence. Then I heard footsteps in the corridor. My heart was pounding. I was sure I had locked the door an hour earlier, so nobody could have come in. I grabbed my phone and switched on the torch.

The footsteps stopped right outside the door. Slowly, the handle began to turn. I held my breath. The door opened, and a pale figure in a long white coat appeared, holding a candle.

I let out a bloodcurdling scream, and so did the figure.

It turned out that it was Paul, the security guard. The storm must have caused a power cut, and he had come to check that nobody was trapped in the building. He can't have expected to find anyone, because he was just as scared as I was. We both laughed, but I must admit that, since that night, I have never stayed late on Halloween again.`,
  },
]

// Accès en cours (voir src/edition.ts).
export const writingTasks: WritingTask[] = extra ? extra.writingTasks : jojoWritingTasks
