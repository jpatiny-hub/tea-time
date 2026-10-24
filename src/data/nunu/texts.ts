import { attachDialogueFr, attachReadingFr } from '../translations.ts'
import { nunuDialoguesFr, nunuReadingsFr } from './translations.ts'
import type { Dialogue, Level, McqExercise, ReadingText, WritingTask } from '../../types.ts'

// Nunu — lectures, dialogues et sujets d'écrit en néerlandais (A1). Textes originaux et courts.
// Les questions sont posées en français pour ne pas ajouter de difficulté.

const q = (id: string, prompt: string, options: string[]): McqExercise => ({ kind: 'mcq', id, prompt, options, answer: 0 })

function reading(id: string, title: string, level: Level, module: string, paragraphs: string[], glossary: [string, string][], questions: [string, string[]][]): ReadingText {
  return {
    id, title, level, module, paragraphs,
    glossary: glossary.map(([en, fr]) => ({ en, fr })),
    questions: questions.map(([prompt, options], i) => q(`${id}-q${i + 1}`, prompt, options)),
  }
}

function dialogue(id: string, title: string, level: Level, module: string, context: string, lines: [string, string][], questions: [string, string[]][]): Dialogue {
  return {
    id, title, level, module, context,
    lines: lines.map(([speaker, text]) => ({ speaker, text })),
    questions: questions.map(([prompt, options], i) => q(`${id}-q${i + 1}`, prompt, options)),
  }
}

const readingsRaw: ReadingText[] = [
  reading('nn-r-nunu', 'Dag, ik ben Nunu', 'A1', 'nn-hello', [
    'Dag! Ik ben Nunu. Ik ben dertig jaar oud. Ik kom uit Frankrijk, maar ik woon in België, in Gent.',
    'Ik heb een man en twee kinderen. Mijn zoon heet Noah en mijn dochter heet Lena. Noah is vijf jaar en Lena is twee.',
    'Ik leer Nederlands omdat ik met mijn buren en met de juf van mijn kinderen wil praten.',
  ], [['dertig', 'trente'], ['jaar oud', 'ans'], ['omdat', 'parce que'], ['praten', 'parler']], [
    ['Où habite Nunu ?', ['À Gand, en Belgique', 'À Paris', 'À Amsterdam', 'En Allemagne']],
    ['Combien d’enfants a-t-elle ?', ['Deux', 'Un', 'Trois', 'Quatre']],
    ['Pourquoi apprend-elle le néerlandais ?', ['Pour parler avec ses voisins et l’institutrice', 'Pour voyager', 'Pour son travail', 'Pour regarder des films']],
  ]),
  reading('nn-r-day', 'Een gewone dag', 'A1', 'nn-kids', [
    'Om zeven uur sta ik op. Eerst maak ik de kinderen wakker. Zij wassen hun handen en doen hun kleren aan.',
    'Om acht uur ontbijten wij. Noah eet brood met kaas en Lena drinkt melk. Daarna breng ik de kinderen naar school.',
    'Om half vier haal ik hen weer op. Thuis spelen zij in de tuin. Om zeven uur eten wij en om half negen gaan de kinderen slapen.',
  ], [['opstaan', 'se lever'], ['wakker maken', 'réveiller'], ['ontbijten', 'prendre le petit-déjeuner'], ['daarna', 'ensuite']], [
    ['À quelle heure se lève Nunu ?', ['À sept heures', 'À huit heures', 'À six heures', 'À neuf heures']],
    ['Que boit Lena au petit-déjeuner ?', ['Du lait', 'Du café', 'Du thé', 'De l’eau']],
    ['À quelle heure les enfants vont-ils dormir ?', ['À huit heures et demie', 'À sept heures', 'À neuf heures', 'À dix heures']],
  ]),
  reading('nn-r-home', 'Ons huis', 'A1', 'nn-home', [
    'Wij hebben een klein huis met een tuin. Beneden zijn de keuken en de woonkamer. Boven zijn twee slaapkamers en de badkamer.',
    'Mijn favoriete kamer is de keuken. Daar staat een grote tafel. Wij eten daar elke dag met de hele familie.',
    'In de tuin staat een boom. Onze kat slaapt graag onder de boom.',
  ], [['beneden / boven', 'en bas / en haut'], ['de badkamer', 'la salle de bain'], ['de boom', 'l’arbre'], ['graag', 'volontiers, aimer (faire)']], [
    ['Où est la cuisine ?', ['En bas', 'En haut', 'Dans le jardin', 'À la cave']],
    ['Quelle est la pièce préférée ?', ['La cuisine', 'Le salon', 'La chambre', 'La salle de bain']],
    ['Où dort le chat ?', ['Sous l’arbre', 'Dans la cuisine', 'Sur la table', 'Dans la chambre']],
  ]),
  reading('nn-r-town', 'In de stad', 'A1', 'nn-town', [
    'Gent is een mooie stad. In het centrum staan een grote kerk en veel oude huizen. Er is ook een plein met cafés en winkels.',
    'Ik ga meestal te voet. Soms neem ik de tram of de fiets. Mijn man gaat met de trein naar zijn werk. Het station is niet ver van ons huis.',
    'Op zaterdag gaan wij naar de markt. Daar koop ik groenten en fruit voor de hele week.',
  ], [['het centrum', 'le centre'], ['meestal', 'la plupart du temps'], ['soms', 'parfois'], ['de groenten', 'les légumes']], [
    ['Comment Nunu se déplace-t-elle le plus souvent ?', ['À pied', 'En voiture', 'En train', 'En bus']],
    ['Comment son mari va-t-il au travail ?', ['En train', 'À vélo', 'À pied', 'En voiture']],
    ['Que fait-elle le samedi ?', ['Elle va au marché', 'Elle va à l’école', 'Elle travaille', 'Elle reste à la maison']],
  ]),
  reading('nn-r-weather', 'Het weer', 'A1', 'nn-weather', [
    'In België is het weer vaak veranderlijk. In de zomer is het soms warm en zonnig, maar er is ook veel regen.',
    'In de herfst waait het hard en vallen de bladeren. In de winter is het koud en soms sneeuwt het. In de lente bloeien de bloemen.',
    'Daarom neem ik altijd een paraplu mee, en de kinderen hebben laarzen en een regenjas.',
  ], [['veranderlijk', 'changeant'], ['bladeren', 'feuilles'], ['bloeien', 'fleurir'], ['daarom', 'c’est pourquoi']], [
    ['Comment est le temps en Belgique ?', ['Changeant', 'Toujours chaud', 'Toujours froid', 'Toujours ensoleillé']],
    ['Que fait-il en automne ?', ['Il vente et les feuilles tombent', 'Il neige', 'Les fleurs fleurissent', 'Il fait très chaud']],
    ['Que prend-elle toujours avec elle ?', ['Un parapluie', 'Des lunettes de soleil', 'Un chapeau', 'Une écharpe']],
  ]),
]

const dialoguesRaw: Dialogue[] = [
  dialogue('nn-d-hello', 'Dag, aangenaam!', 'A1', 'nn-hello', 'Nunu ontmoet haar nieuwe buurvrouw, Els, op straat.', [
    ['Nunu', 'Goedemiddag! Ik ben Nunu. Ik woon naast u.'],
    ['Els', 'Dag Nunu, aangenaam. Ik ben Els.'],
    ['Nunu', 'Aangenaam, Els. Woont u hier al lang?'],
    ['Els', 'Ja, tien jaar. En u?'],
    ['Nunu', 'Wij wonen hier sinds twee maanden. Ik kom uit Frankrijk.'],
    ['Els', 'Welkom in de straat! Hoe gaat het met u?'],
    ['Nunu', 'Goed, dank u. En met u?'],
    ['Els', 'Ook goed. Tot ziens, Nunu!'],
    ['Nunu', 'Tot ziens, Els!'],
  ], [
    ['Que dit Nunu à Els ?', ['Qu’elle habite à côté', 'Qu’elle est médecin', 'Qu’elle a trois enfants', 'Qu’elle cherche la gare']],
    ['Depuis combien de temps Nunu habite-t-elle là ?', ['Deux mois', 'Dix ans', 'Deux ans', 'Une semaine']],
  ]),
  dialogue('nn-d-kids', 'Goedemorgen, schatje!', 'A1', 'nn-kids', 'Nunu maakt haar zoon Noah wakker.', [
    ['Nunu', 'Goedemorgen, schatje! Het is tijd om op te staan.'],
    ['Noah', 'Ik ben nog moe, mama.'],
    ['Nunu', 'Kom maar. Eerst je handen wassen, dan gaan we ontbijten.'],
    ['Noah', 'Wat eten we?'],
    ['Nunu', 'Brood met kaas en een glas melk.'],
    ['Noah', 'Lekker! Mag ik chocopasta?'],
    ['Nunu', 'Vandaag niet. Doe nu je jas en je schoenen aan.'],
    ['Noah', 'Ik ben klaar!'],
    ['Nunu', 'Goed zo! Kom, we gaan naar school.'],
  ], [
    ['Que veut manger Noah en plus ?', ['De la pâte à tartiner au chocolat', 'Des biscuits', 'Un œuf', 'Des fruits']],
    ['Que demande Nunu avant le petit-déjeuner ?', ['De se laver les mains', 'De ranger sa chambre', 'De faire ses devoirs', 'De dessiner']],
  ]),
  dialogue('nn-d-bakery', 'Bij de bakker', 'A1', 'nn-food', 'Nunu koopt brood bij de bakker.', [
    ['Bakker', 'Goedemorgen, mevrouw. Wat mag het zijn?'],
    ['Nunu', 'Goedemorgen. Ik wil graag een bruin brood, alstublieft.'],
    ['Bakker', 'Gesneden of niet gesneden?'],
    ['Nunu', 'Gesneden, alstublieft. En vier croissants.'],
    ['Bakker', 'Alstublieft. Is dat alles?'],
    ['Nunu', 'Ja, dat is alles. Hoeveel kost het?'],
    ['Bakker', 'Dat is zes euro vijftig.'],
    ['Nunu', 'Alstublieft. Dank u wel!'],
    ['Bakker', 'Graag gedaan. Een fijne dag!'],
  ], [
    ['Combien Nunu doit-elle payer ?', ['6,50 €', '5 €', '7,50 €', '4,50 €']],
    ['Que commande-t-elle avec le pain ?', ['Quatre croissants', 'Deux baguettes', 'Un gâteau', 'Des petits pains']],
  ]),
  dialogue('nn-d-cafe', 'In het café', 'A1', 'nn-eat-out', 'Nunu en haar man bestellen iets te drinken en te eten.', [
    ['Ober', 'Goedemiddag. Willen jullie iets drinken?'],
    ['Nunu', 'Ja, een koffie en een glas water, alstublieft.'],
    ['Man', 'Voor mij een biertje.'],
    ['Ober', 'Willen jullie ook iets eten?'],
    ['Nunu', 'Ja, de soep van de dag, alstublieft.'],
    ['Man', 'En een broodje kaas voor mij.'],
    ['Ober', 'Prima. Dat komt eraan.'],
    ['Nunu', 'Mag ik de rekening, alstublieft?'],
    ['Ober', 'Natuurlijk. Betalen jullie samen?'],
    ['Man', 'Ja, samen.'],
  ], [
    ['Que commande Nunu à manger ?', ['La soupe du jour', 'Un sandwich au fromage', 'Une salade', 'Un steak']],
    ['Comment paient-ils ?', ['Ensemble', 'Séparément', 'Par carte uniquement', 'Ils ne paient pas']],
  ]),
  dialogue('nn-d-directions', 'De weg vragen', 'A1', 'nn-town', 'Nunu vraagt een voorbijganger de weg naar het station.', [
    ['Nunu', 'Pardon, meneer. Waar is het station, alstublieft?'],
    ['Man', 'Het station? Ga hier rechtdoor tot aan het plein.'],
    ['Nunu', 'Rechtdoor, tot aan het plein. En dan?'],
    ['Man', 'Dan ga je links. Het station is tegenover de kerk.'],
    ['Nunu', 'Is het ver?'],
    ['Man', 'Nee, het is vijf minuten te voet.'],
    ['Nunu', 'Dank u wel!'],
    ['Man', 'Graag gedaan. Een fijne dag!'],
  ], [
    ['Où se trouve la gare ?', ['En face de l’église', 'À côté de la banque', 'Derrière le marché', 'Près de l’école']],
    ['Combien de temps faut-il à pied ?', ['Cinq minutes', 'Une heure', 'Dix minutes', 'Une demi-heure']],
  ]),
  dialogue('nn-d-shop', 'In de winkel', 'A1', 'nn-shopping', 'Nunu zoekt een trui voor haar zoon.', [
    ['Verkoopster', 'Goedemiddag, kan ik u helpen?'],
    ['Nunu', 'Ja, ik zoek een trui voor mijn zoon. Hij is vijf.'],
    ['Verkoopster', 'Welke kleur wilt u? Wij hebben blauw en rood.'],
    ['Nunu', 'Blauw, alstublieft. Hoeveel kost deze?'],
    ['Verkoopster', 'Die kost twintig euro.'],
    ['Nunu', 'Dat is een beetje duur. Hebt u iets goedkopers?'],
    ['Verkoopster', 'Deze is in de aanbieding: vijftien euro.'],
    ['Nunu', 'Perfect, ik neem deze. Mag ik met de kaart betalen?'],
    ['Verkoopster', 'Natuurlijk.'],
  ], [
    ['Que cherche Nunu ?', ['Un pull pour son fils', 'Un pantalon pour elle', 'Une robe', 'Des chaussures']],
    ['Combien coûte le pull en promotion ?', ['15 €', '20 €', '10 €', '25 €']],
  ]),
  dialogue('nn-d-school', 'Bij de juf', 'A1', 'nn-school', 'Nunu haalt Noah op en spreekt met de juf.', [
    ['Nunu', 'Dag juf! Hoe was het vandaag?'],
    ['Juf', 'Heel goed. Noah heeft mooi getekend.'],
    ['Nunu', 'En heeft hij goed gegeten?'],
    ['Juf', 'Ja, hij heeft zijn brooddoos leeggegeten.'],
    ['Nunu', 'Goed zo! Mag ik u iets vragen? Morgen is hij misschien afwezig.'],
    ['Juf', 'Is hij ziek?'],
    ['Nunu', 'Nee, hij heeft een afspraak bij de dokter.'],
    ['Juf', 'Geen probleem. Tot overmorgen, Noah!'],
  ], [
    ['Qu’a fait Noah aujourd’hui ?', ['Un joli dessin', 'Une bêtise', 'Un gâteau', 'Il a pleuré']],
    ['Pourquoi sera-t-il peut-être absent demain ?', ['Il a un rendez-vous chez le médecin', 'Il est en voyage', 'Il a une fête', 'Il est fatigué']],
  ]),
  dialogue('nn-d-doctor', 'Bij de dokter', 'A1', 'nn-health', 'Nunu is bij de dokter met haar dochter Lena.', [
    ['Dokter', 'Goedemorgen. Wat is er aan de hand?'],
    ['Nunu', 'Mijn dochter heeft koorts en ze hoest veel.'],
    ['Dokter', 'Sinds wanneer?'],
    ['Nunu', 'Sinds gisteren. Ze eet bijna niets.'],
    ['Dokter', 'Doet haar keel pijn?'],
    ['Nunu', 'Ja, een beetje.'],
    ['Dokter', 'Ze is verkouden. Ze moet rusten en veel water drinken.'],
    ['Nunu', 'Heeft ze medicijnen nodig?'],
    ['Dokter', 'Ja, dit medicijn, twee keer per dag.'],
  ], [
    ['Quels symptômes a Lena ?', ['De la fièvre et de la toux', 'Mal au ventre', 'Une jambe cassée', 'Mal aux oreilles']],
    ['Que doit-elle faire ?', ['Se reposer et boire beaucoup d’eau', 'Aller à l’école', 'Manger du chocolat', 'Faire du sport']],
  ]),
  dialogue('nn-d-neighbour', 'De buurvrouw', 'A1', 'nn-neighbours', 'Nunu belt haar buurvrouw Els.', [
    ['Nunu', 'Hallo, met Nunu. Kan ik Els spreken?'],
    ['Els', 'Dag Nunu, met Els. Hoe gaat het?'],
    ['Nunu', 'Goed, dank je. Kom je zaterdag op bezoek? Wij drinken koffie.'],
    ['Els', 'Wat gezellig! Hoe laat?'],
    ['Nunu', 'Om drie uur. De kinderen spelen in de tuin.'],
    ['Els', 'Perfect, ik kom. Mag ik een taart meebrengen?'],
    ['Nunu', 'Graag! Tot zaterdag.'],
    ['Els', 'Tot zaterdag! Dag!'],
  ], [
    ['À quelle heure Nunu invite-t-elle Els ?', ['À trois heures', 'À deux heures', 'À quatre heures', 'À midi']],
    ['Qu’apporte Els ?', ['Un gâteau', 'Du café', 'Des fleurs', 'Du pain']],
  ]),
]

export const nunuReadingTexts: ReadingText[] = attachReadingFr(readingsRaw, nunuReadingsFr)
export const nunuDialogues: Dialogue[] = attachDialogueFr(dialoguesRaw, nunuDialoguesFr)

const task = (id: string, module: string, level: Level, type: WritingTask['type'], title: string, prompt: string, tipsFr: string, minWords: number, maxWords: number, targetPhrases: string[], checklist: string[], model: string): WritingTask => ({
  id, module, level, type, title, prompt, tipsFr, minWords, maxWords, targetPhrases, checklist, model,
})

export const nunuWritingTasks: WritingTask[] = [
  task('nn-w-me', 'nn-hello', 'A1', 'essay', 'Se présenter', 'Schrijf een korte tekst over jezelf: hoe heet je, hoe oud ben je, waar woon je, waar kom je vandaan?', 'Utilise Ik ben… / Ik woon in… / Ik kom uit… Le verbe est toujours en 2e position.', 25, 60, ['Ik ben', 'Ik woon', 'Ik kom uit'],
    ['Mon prénom et mon âge', 'Où j’habite', 'Le verbe en deuxième position'],
    `Dag! Ik ben Nunu. Ik ben dertig jaar oud. Ik kom uit Frankrijk, maar ik woon in Gent. Ik heb twee kinderen.`),
  task('nn-w-family', 'nn-family', 'A1', 'essay', 'Ma famille', 'Schrijf over je familie: wie zijn de mensen, hoe heten ze, hoe oud zijn ze?', 'Mijn man, mijn zoon… Les possessifs (mijn, jouw, zijn, haar) et hebben / zijn.', 30, 70, ['Mijn', 'heet', 'jaar'],
    ['Au moins trois personnes', 'Les possessifs mijn / zijn / haar', 'L’âge avec « jaar »'],
    `Ik heb een man en twee kinderen. Mijn man heet Tom. Mijn zoon heet Noah en hij is vijf jaar. Mijn dochter heet Lena en zij is twee jaar.`),
  task('nn-w-day', 'nn-kids', 'A1', 'essay', 'Une journée avec les enfants', 'Beschrijf een gewone dag: hoe laat sta je op, wat eet je, wanneer breng je de kinderen naar school?', 'Heures avec « om », verbes à particule (opstaan → ik sta op) et mots de séquence (eerst, dan, daarna).', 40, 90, ['Om', 'Eerst', 'Daarna'],
    ['Les heures avec « om »', 'La particule à la fin', 'Eerst / dan / daarna'],
    `Om zeven uur sta ik op. Eerst maak ik de kinderen wakker. Daarna ontbijten wij. Om acht uur breng ik hen naar school.`),
  task('nn-w-message', 'nn-neighbours', 'A1', 'email', 'Un petit message', 'Schrijf een kort bericht aan een vriendin: je bent te laat en je vraagt of zij wil wachten.', 'Sorry, ik ben te laat. Kun je even wachten ? Tot straks !', 20, 50, ['Sorry', 'te laat', 'Tot straks'],
    ['Une excuse', 'Une demande polie avec « kun je »', 'Une formule de fin'],
    `Hoi Els, sorry, ik ben te laat. Ik ben over tien minuten bij je. Kun je even wachten? Tot straks!`),
  task('nn-w-invite', 'nn-neighbours', 'A1', 'email', 'Inviter quelqu’un', 'Nodig je buurvrouw uit voor koffie op zaterdag. Zeg hoe laat en wat je aanbiedt.', 'Kom je zaterdag…? / Wij drinken koffie / Wat gezellig ! Le verbe vient avant le sujet dans la question.', 30, 70, ['Kom je', 'zaterdag', 'koffie'],
    ['Jour et heure', 'Une question avec inversion', 'Un mot de politesse'],
    `Hallo Els, kom je zaterdag op bezoek? Wij drinken koffie om drie uur en er is taart. De kinderen spelen in de tuin. Tot zaterdag!`),
  task('nn-w-weekend', 'nn-neighbours', 'A2', 'story', 'Mon week-end', 'Vertel wat je in het weekend doet: waar ga je naartoe, wie zie je, wat eten jullie?', 'Présent, mots de temps (zaterdag, zondag) et le verbe en deuxième position même après un début de phrase.', 50, 110, ['Op zaterdag', 'Op zondag', 'Wij'],
    ['Le verbe en 2e position après « Op zaterdag »', 'Au moins trois activités', 'Des pronoms variés'],
    `Op zaterdag gaan wij naar de markt. Daar koop ik groenten en brood. Daarna spelen de kinderen in de tuin. Op zondag komt mijn zus op bezoek. Wij eten samen en drinken koffie.`),
]
