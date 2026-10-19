import type { ReadingText } from '../types'
import { extra } from './edition-content.ts'

// Textes originaux écrits pour l'appli, sur les thèmes des cours.
// Ils mélangent volontairement les temps (past simple, present perfect, past perfect…) pour les voir en contexte.
const jojoReadingTexts: ReadingText[] = [
  {
    id: 'r-company',
    title: 'Northbridge Biologics: from a garage to a global player',
    level: 'B2',
    module: 'company',
    paragraphs: [
      'Northbridge Biologics was founded in 2004 by two former university researchers who had spent years developing a new method for producing enzymes. At the beginning, the company had only three employees and operated from a converted garage near the city centre. Its first product was a diagnostic kit for veterinary clinics.',
      'Since then, the company has grown steadily. Today it employs around 450 people and is organized into five departments: research and development, production, quality control, regulatory affairs and sales. Each department is responsible for its own budget, but there is close collaboration between R&D and production, especially when a new product is being scaled up.',
      'Northbridge now provides services in the pharmaceutical and food sectors, and its clients include hospitals, universities and several large vaccine manufacturers. Although most of its revenue still comes from Europe, the company has a strong presence in North America and opened its first office in Singapore last year.',
      'What sets Northbridge apart, according to its employees, is its culture. Transparency is a priority: every quarter, the management team presents the company\'s results to all staff and answers questions openly. "We work seriously, but we don\'t take ourselves too seriously," says Mira Okafor, who has been working in quality control for eight years. "People are motivated by the impact of what we do, not just by their salary."',
      'This approach seems to pay off. Staff retention is unusually high for the sector, and the company has won several "best employer" awards. The main challenge now, the CEO admits, is to keep this family atmosphere while the company continues to expand.',
    ],
    glossary: [
      { en: 'a converted garage', fr: 'un garage aménagé' },
      { en: 'steadily', fr: 'régulièrement, de façon constante' },
      { en: 'to be scaled up', fr: 'être industrialisé, passé à plus grande échelle' },
      { en: 'to pay off', fr: 'porter ses fruits, être payant' },
      { en: 'staff retention', fr: 'la fidélisation du personnel' },
      { en: 'to admit', fr: 'reconnaître, admettre' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-company-q1', prompt: 'What was the company\'s first product?',
        options: ['A diagnostic kit for veterinary clinics', 'A vaccine for humans', 'An enzyme for the food industry', 'Software for hospitals'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-company-q2', prompt: 'Why is the present perfect used in "the company has grown steadily"?',
        options: ['Because the growth started in the past and continues until now', 'Because the growth happened on a precise date', 'Because it is a finished action', 'Because it is a future plan'], answer: 0,
        tags: ['present-perfect'],
      },
      {
        kind: 'mcq', id: 'r-company-q3', prompt: 'Which sentence is TRUE?',
        options: ['Most of the revenue comes from Europe.', 'The company has no clients in North America.', 'The Singapore office opened in 2004.', 'Each department shares one common budget.'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-company-q4', prompt: 'According to the text, what motivates employees?',
        options: ['The impact of their work', 'Mainly their salary', 'The quarterly bonuses', 'The chance to work abroad'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-company-q5', prompt: 'What is the main challenge for the future?',
        options: ['Keeping a family atmosphere while growing', 'Finding new clients in Europe', 'Reducing staff turnover', 'Getting a "best employer" award'], answer: 0,
      },
    ],
  },
  {
    id: 'r-barcelona',
    title: 'Barcelona takes a radical step against tourist flats',
    level: 'B2+',
    module: 'problems',
    paragraphs: [
      'For years, residents of Barcelona have complained that mass tourism is driving them out of their own neighbourhoods. Rents in the city have risen by almost 70% over the last decade, while wages have barely moved. Young people and families on low incomes have been disproportionately affected.',
      'One of the main causes, according to housing associations, is the explosion of short-term tourist rentals. For many owners, renting a flat to tourists for a few nights is far more lucrative than signing a long-term lease with a local family. As a result, affordable housing has become scarce, and many residents have been evicted when their lease came to an end.',
      'Nadia, a 42-year-old nurse, had lived in the same flat in the city centre for fifteen years when she received an ultimatum from her landlord. "He told me he wouldn\'t renew my contract because he was going to rent the flat to tourists. I didn\'t know where to go. I just wanted to keep a roof over my children\'s heads."',
      'In response, the city council has decided to take a radical step: it will not renew any of the roughly 10,000 licences for tourist flats when they expire. The authorities hope that these homes will return to the long-term rental market. Critics argue that the measure could hurt the local economy and push tourists towards illegal rentals.',
      'Whatever happens, the city is trying to get a grip on a problem that many other European destinations share. Several of them are already considering implementing similar policies.',
    ],
    glossary: [
      { en: 'to drive out', fr: 'chasser, forcer à partir' },
      { en: 'barely', fr: 'à peine' },
      { en: 'disproportionately', fr: 'de manière disproportionnée' },
      { en: 'lucrative', fr: 'lucratif' },
      { en: 'scarce', fr: 'rare' },
      { en: 'to be evicted', fr: 'être expulsé' },
      { en: 'to expire', fr: 'expirer, arriver à échéance' },
      { en: 'to get a grip on', fr: 'reprendre le contrôle de' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-barcelona-q1', prompt: 'What is the main problem described?',
        options: ['Tourism is making housing unaffordable for residents', 'There are not enough hotels for tourists', 'Wages have risen faster than rents', 'Tourists are leaving Barcelona'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-barcelona-q2', prompt: 'Why do owners prefer tourist rentals?',
        options: ['They are more profitable', 'They are easier to manage', 'The law obliges them', 'Local families don\'t want to rent'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-barcelona-q3', prompt: '"Nadia had lived in the same flat for fifteen years when she received an ultimatum." Why the past perfect?',
        options: ['It describes a situation that lasted until another past event', 'It describes a future plan', 'It describes a habit in the present', 'It is a mistake; it should be past simple'], answer: 0,
        tags: ['past-perfect'],
      },
      {
        kind: 'mcq', id: 'r-barcelona-q4', prompt: 'What solution has the city introduced?',
        options: ['It will not renew licences for tourist flats', 'It will build 10,000 new flats', 'It has banned tourists from the city centre', 'It will raise taxes on hotels'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-barcelona-q5', prompt: 'What do critics fear?',
        options: ['Damage to the local economy and more illegal rentals', 'A rise in hotel prices', 'A drop in rents', 'More tourists in the city'], answer: 0,
      },
    ],
  },
  {
    id: 'r-remote-work',
    title: 'Back to the office? Employees and employers disagree',
    level: 'B2+',
    module: 'opinions',
    paragraphs: [
      'Since the pandemic, remote and hybrid work have become the norm in many sectors. However, a growing number of companies now want their employees back in the office — and most workers are not happy about it. According to a recent survey, about half of employees say they are upset about coming back to the office full time, and one in four would consider looking for another job.',
      'Employees who prefer remote work give several reasons. The most common is the time saved on commuting: some people used to spend two hours a day in traffic. Others mention a better work-life balance, fewer interruptions and the ability to focus on tasks that require concentration. "Working remotely allows me to be far more efficient, especially when I\'m doing administrative work," explains one respondent.',
      'Employers, on the other hand, argue that the office is essential for collaboration, training and company culture. Many managers are convinced that spontaneous conversations lead to new ideas, and that young employees learn faster when they sit next to experienced colleagues. Some also admit, more quietly, that they find it harder to monitor productivity at a distance.',
      'Between these two positions, hybrid work appears to be the most viable compromise. Nevertheless, the debate is far from over, and it raises a deeper question: is productivity best measured by the hours we spend at our desks, or by what we actually achieve?',
    ],
    glossary: [
      { en: 'the norm', fr: 'la norme' },
      { en: 'upset about + -ing', fr: 'contrarié de' },
      { en: 'commuting', fr: 'les trajets domicile-travail' },
      { en: 'a respondent', fr: 'une personne interrogée' },
      { en: 'to monitor', fr: 'surveiller, suivre' },
      { en: 'viable', fr: 'viable' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-remote-work-q1', prompt: 'How do many employees feel about returning to the office full time?',
        options: ['Unhappy', 'Enthusiastic', 'Indifferent', 'Relieved'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-remote-work-q2', prompt: 'What is the most common reason for preferring remote work?',
        options: ['The time saved on commuting', 'Higher salaries', 'Better equipment at home', 'Fewer meetings'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-remote-work-q3', prompt: 'Which is NOT a reason given by employers?',
        options: ['Lower rent for offices', 'Collaboration', 'Training young employees', 'Monitoring productivity'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-remote-work-q4', prompt: '"Some people used to spend two hours a day in traffic." This means that…',
        options: ['they spent two hours a day in traffic in the past, but not anymore', 'they are used to traffic', 'they still spend two hours in traffic', 'they will spend two hours in traffic'], answer: 0,
        tags: ['used-to'],
      },
      {
        kind: 'mcq', id: 'r-remote-work-q5', prompt: 'What deeper question does the article raise?',
        options: ['How productivity should be measured', 'Whether offices should be closed', 'How to reduce commuting costs', 'Whether salaries should increase'], answer: 0,
      },
    ],
  },
  {
    id: 'r-robotaxis',
    title: 'Driverless taxis: what could possibly go wrong?',
    level: 'C1',
    module: 'assumptions',
    paragraphs: [
      'In a handful of cities in the United States and China, it is already possible to hail a taxi that has no driver. Fleets of self-driving vehicles now complete hundreds of thousands of trips every week, and their operators are eager to scale globally. There is a lot at stake: analysts assume that the market could be worth hundreds of billions of dollars within a decade.',
      'Supporters claim that robotaxis will represent a step change in road safety. Since most accidents are caused by human error — fatigue, distraction, drivers zoning out — they argue that there will be far fewer accidents once machines take over. Presumably, insurance costs would also fall, and cities could reduce the space devoted to parking.',
      'Critics, however, are not entirely convinced. Several vehicles have blocked emergency services or stopped unexpectedly at the curb, and it is unclear who should be held responsible when an autonomous car causes an accident. Taxi drivers, for their part, fear the disappearance of their jobs, and some cities have been reluctant to issue new permits until these questions have been answered.',
      'The biggest obstacle may not be technical at all. If passengers do not trust the technology, the companies might struggle to generate enough revenue to cover their huge expenses. Chances are that the pace of adoption will depend less on engineers than on public opinion — and on how regulators decide to handle the first serious incidents.',
    ],
    glossary: [
      { en: 'to hail a taxi', fr: 'héler un taxi' },
      { en: 'eager to', fr: 'impatient de, désireux de' },
      { en: 'a step change', fr: 'un changement radical' },
      { en: 'to zone out', fr: 'décrocher, être dans la lune' },
      { en: 'reluctant to', fr: 'réticent à' },
      { en: 'to issue a permit', fr: 'délivrer un permis' },
      { en: 'chances are that', fr: 'il y a fort à parier que' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-robotaxis-q1', prompt: 'What main benefit do supporters expect?',
        options: ['Fewer accidents', 'Cheaper cars', 'More jobs for drivers', 'Faster trips'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-robotaxis-q2', prompt: 'Which word in paragraph 2 signals an ASSUMPTION?',
        options: ['Presumably', 'Since', 'Critics', 'Also'], answer: 0,
        tags: ['modals-deduction'],
      },
      {
        kind: 'mcq', id: 'r-robotaxis-q3', prompt: 'Why have some cities been reluctant to issue permits?',
        options: ['Questions about safety and responsibility remain unanswered', 'The cars are too expensive', 'There are not enough roads', 'Passengers have complained about prices'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-robotaxis-q4', prompt: 'According to the author, the biggest obstacle may be…',
        options: ['public trust', 'the technology', 'the price of fuel', 'the lack of engineers'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-robotaxis-q5', prompt: '"…until these questions have been answered." Why not "will have been answered"?',
        options: ['No "will" after time conjunctions like until/when', 'Because it is in the past', 'Because it is a passive', 'Both are equally correct'], answer: 0,
        tags: ['future'],
      },
    ],
  },
  {
    id: 'r-fermentation',
    title: 'Inside a bioreactor: how a fermentation run works',
    level: 'B2+',
    module: 'process',
    paragraphs: [
      'Many modern medicines, from insulin to certain vaccines, are produced by living cells grown in large stainless-steel tanks called bioreactors. Although every product is different, most fermentation runs follow the same basic steps.',
      'First of all, the bioreactor has to be cleaned and sterilized, usually with steam. This step is essential: even a tiny contamination can ruin a batch worth several hundred thousand euros. Once the vessel has cooled down, the culture medium — a carefully balanced mixture of water, sugars, salts and nutrients — is added under sterile conditions.',
      'Next, the bioreactor is inoculated with a small volume of cells that have been grown beforehand in flasks. During the run, which can last from a few days to several weeks, sensors continuously monitor the temperature, pH and oxygen levels. If a parameter drifts, the control system corrects it automatically, but operators must make sure that every alarm is investigated and documented.',
      'When the cells have produced enough of the target molecule, the culture is harvested. The product is then separated from the cells and purified in a series of steps known as downstream processing. Finally, samples are sent to quality control, and the batch can only be released once all the tests have been passed.',
      'Scaling up a process from a 10-litre laboratory bioreactor to a 2,000-litre production tank is one of the most challenging tasks in the industry. What works perfectly on a small scale may behave very differently in a large vessel, which is why many companies spend months optimising each parameter.',
    ],
    glossary: [
      { en: 'stainless steel', fr: 'acier inoxydable' },
      { en: 'a vessel', fr: 'une cuve, un récipient' },
      { en: 'beforehand', fr: 'au préalable' },
      { en: 'to drift', fr: 'dériver, s\'écarter' },
      { en: 'to harvest', fr: 'récolter' },
      { en: 'downstream processing', fr: 'le procédé aval (purification)' },
      { en: 'to release a batch', fr: 'libérer un lot' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-fermentation-q1', prompt: 'What is the first step of a run?',
        options: ['Cleaning and sterilizing the bioreactor', 'Adding the cells', 'Harvesting the culture', 'Sending samples to QC'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-fermentation-q2', prompt: 'Why is the passive voice so frequent in this text?',
        options: ['Because the actions matter more than who performs them', 'Because the text is about the past', 'Because it is informal', 'Because the author is unsure'], answer: 0,
        tags: ['passive'],
      },
      {
        kind: 'mcq', id: 'r-fermentation-q3', prompt: 'What happens if a parameter drifts?',
        options: ['The control system corrects it and the alarm must be investigated', 'The batch is immediately destroyed', 'The operators restart the run', 'Nothing, it is normal'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-fermentation-q4', prompt: 'When can the batch be released?',
        options: ['Once all the tests have been passed', 'As soon as the culture is harvested', 'Before purification', 'After two weeks'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-fermentation-q5', prompt: 'Why is scaling up difficult?',
        options: ['A process may behave differently in a large vessel', 'Large tanks are illegal', 'Cells cannot grow in steel', 'Sensors do not work at large scale'], answer: 0,
      },
    ],
  },
  {
    id: 'r-phones',
    title: 'Should schools ban smartphones?',
    level: 'B2',
    module: 'assumptions',
    paragraphs: [
      'A growing number of schools across Europe have decided to ban smartphones, not only in classrooms but also during recess. Supporters of the measure point out that students who constantly look at their phones find it harder to concentrate, and that cyberbullying often happens on social media during school hours.',
      'Teachers in schools that introduced a ban last year have reported noticeable changes. "Before the ban, the playground was silent — everyone was staring at a screen," says a head teacher in Belgium. "Now the children are talking, playing football, even arguing. Their social skills have clearly improved."',
      'Not everyone agrees, however. Some parents want to be able to reach their children in case of emergency, and critics argue that schools should teach students to use technology responsibly rather than simply banning it. "In the long run, they will have to learn to manage their phones anyway," says one father. "Wouldn\'t it be better to start now, with the help of teachers?"',
      'Researchers are still trying to determine the long-term effects of such bans. It might be that the benefits come less from the ban itself than from the conversations it prompts between schools, parents and students.',
    ],
    glossary: [
      { en: 'recess', fr: 'la récréation' },
      { en: 'to stare at', fr: 'fixer du regard' },
      { en: 'a head teacher', fr: 'un(e) directeur(-trice) d\'école' },
      { en: 'to reach someone', fr: 'joindre quelqu\'un' },
      { en: 'to prompt', fr: 'susciter, provoquer' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-phones-q1', prompt: 'What change did the head teacher notice?',
        options: ['Children talk and play more', 'Children study more at home', 'Parents complain less', 'Children use computers instead'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-phones-q2', prompt: 'Why are some parents against the ban?',
        options: ['They want to reach their children in an emergency', 'They think phones improve grades', 'They sell phones', 'They think recess is too long'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-phones-q3', prompt: '"Wouldn\'t it be better to start now?" is…',
        options: ['a suggestion', 'a complaint', 'an order', 'a prediction'], answer: 0,
        tags: ['suggestions'],
      },
      {
        kind: 'mcq', id: 'r-phones-q4', prompt: 'What does the last paragraph suggest?',
        options: ['The debate itself may be beneficial', 'Bans are always effective', 'Research has proved bans are useless', 'Parents should decide alone'], answer: 0,
      },
    ],
  },
  {
    id: 'r-rehearsal',
    title: 'Why the best speakers always rehearse',
    level: 'B2+',
    module: 'explanations',
    paragraphs: [
      'Have you ever wondered why some people seem to explain complicated ideas so effortlessly? The reason is rarely talent alone. In most cases, it comes down to preparation — and, above all, rehearsal.',
      'When we explain something we know well, we tend to skip steps that seem obvious to us. Our listeners, however, do not share our knowledge, so they quickly get lost. Rehearsing out loud forces us to notice these gaps. That is why experienced trainers often record themselves and listen to the result before a session.',
      'Rehearsal also affects confidence. Researchers have found that people who had practised a presentation at least three times felt significantly less anxious than those who had only read their notes. Speaking the words, rather than just thinking them, prepares the brain for the real situation.',
      'Good explainers also check understanding regularly. Simple questions such as "Does that make sense?" or "Are you with me so far?" prevent misunderstandings from building up. And when something is unclear, they rephrase it: "In other words…", "To put it simply…".',
      'So the next time you have to explain a process, a decision or a mix-up, do not just write a script. Rehearse it, ideally in front of someone who will tell you honestly where they got lost.',
    ],
    glossary: [
      { en: 'effortlessly', fr: 'sans effort, avec aisance' },
      { en: 'to skip', fr: 'sauter (une étape)' },
      { en: 'a gap', fr: 'un trou, une lacune' },
      { en: 'anxious', fr: 'anxieux, inquiet' },
      { en: 'to build up', fr: "s'accumuler" },
      { en: 'to rephrase', fr: 'reformuler' },
    ],
    questions: [
      { kind: 'mcq', id: 'r-rehearsal-q1', prompt: 'According to the text, why do people who know a topic well sometimes explain it badly?', options: ['They skip steps that seem obvious to them', 'They speak too slowly', 'They use too many examples', 'They rehearse too much'], answer: 0 },
      { kind: 'mcq', id: 'r-rehearsal-q2', prompt: 'What does rehearsing out loud help you notice?', options: ['Gaps in your explanation', 'Spelling mistakes', 'The time of day', 'Your listeners\' names'], answer: 0 },
      { kind: 'mcq', id: 'r-rehearsal-q3', prompt: '"People who had practised… felt less anxious." Why the past perfect?', options: ['The practice happened before the moment they felt less anxious', 'It is a present habit', 'It is a future plan', 'It is a mistake'], answer: 0, tags: ['past-perfect'] },
      { kind: 'mcq', id: 'r-rehearsal-q4', prompt: 'Which phrase is given as a way to check understanding?', options: ['Are you with me so far?', 'In other words…', 'To put it simply…', 'The reason is…'], answer: 0 },
    ],
  },
  {
    id: 'r-halloween',
    title: 'From Samhain to trick-or-treat: a short history of Halloween',
    level: 'B2+',
    paragraphs: [
      'More than two thousand years ago, the Celts of Ireland, Scotland and Britain celebrated Samhain (pronounced SOW-in) at the end of October. It marked the end of the harvest and the beginning of the dark half of the year. People believed that on that night the boundary between the living and the dead became thin, and that spirits could walk the earth. To protect themselves, they lit huge bonfires and sometimes wore masks so that the spirits would not recognise them.',
      'When Christianity spread across Europe, the Church placed All Saints\' Day, also called All Hallows\' Day, on 1 November. The evening before became All Hallows\' Eve, which was gradually shortened to "Hallowe\'en". Many of the old customs survived: in Ireland and Scotland, children went from door to door in costume, singing or reciting a poem in exchange for food or coins.',
      'The jack-o\'-lantern has its own legend. According to an Irish folk tale, a man called Stingy Jack had tricked the Devil so many times that, when he died, he was allowed neither into heaven nor into hell. He was condemned to wander in the dark with only a burning coal inside a carved turnip to light his way. For centuries, the Irish carved turnips, not pumpkins, and placed them in their windows to keep wandering spirits away.',
      'In the nineteenth century, millions of Irish and Scottish immigrants who had left their countries during the Great Famine brought Halloween to the United States. There, they discovered the pumpkin, which was bigger and much easier to carve than a turnip. In the twentieth century, Halloween became a community holiday centred on children, and by the 1950s, trick-or-treating had become a national tradition.',
      'Today, Americans spend billions of dollars every year on costumes, decorations and candy, and the holiday has crossed the Atlantic again. In many European countries, including Belgium and France, it has grown in popularity since the late 1990s, although some people still see it as a commercial import. Ironically, a celebration that started in Europe has come back home in an American costume.',
    ],
    glossary: [
      { en: 'the harvest', fr: 'la récolte, la moisson' },
      { en: 'the boundary', fr: 'la frontière, la limite' },
      { en: 'to spread', fr: 'se répandre' },
      { en: 'gradually', fr: 'progressivement' },
      { en: 'stingy', fr: 'radin, avare' },
      { en: 'to wander', fr: 'errer' },
      { en: 'a turnip', fr: 'un navet' },
      { en: 'the Great Famine', fr: 'la Grande Famine (Irlande, 1845-1852)' },
    ],
    questions: [
      {
        kind: 'mcq', id: 'r-halloween-q1', prompt: 'Why did the Celts wear masks during Samhain?',
        options: ['So that the spirits would not recognise them', 'To scare their neighbours', 'To celebrate the harvest', 'Because it was very cold'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-halloween-q2', prompt: 'What does the word "Halloween" come from?',
        options: ["All Hallows' Eve, the evening before All Saints' Day", 'The name of a Celtic god', 'An Irish word for pumpkin', "Stingy Jack's surname"], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-halloween-q3', prompt: 'What did the Irish originally carve?',
        options: ['Turnips', 'Pumpkins', 'Apples', 'Potatoes'], answer: 0,
      },
      {
        kind: 'mcq', id: 'r-halloween-q4', prompt: '"…immigrants who had left their countries during the Great Famine brought Halloween to the United States." Why the past perfect?',
        options: ['They left their countries before they brought Halloween to the US', 'It describes a habit', 'The action is still going on', 'It is a polite form'], answer: 0,
        tags: ['past-perfect'],
      },
      {
        kind: 'mcq', id: 'r-halloween-q5', prompt: '"It has grown in popularity since the late 1990s." Why the present perfect?',
        options: ['The growth started in the past and continues today', 'It happened on a precise date', 'It is finished', 'It is a prediction'], answer: 0,
        tags: ['present-perfect', 'since-for'],
      },
    ],
  },
]

// Accès en cours (voir src/edition.ts).
export const readingTexts: ReadingText[] = extra ? extra.readingTexts : jojoReadingTexts
