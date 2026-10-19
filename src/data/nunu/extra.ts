import type { ChangelogEntry, Exercise, IrregularVerb, PronunciationItem, VocabDeck } from '../../types.ts'
import { translators, withIds, wordItems, type ExDraft, type Word } from '../theme-builder.ts'

// Nunu — phrases à traduire, paquets transversaux, prononciation, verbes irréguliers, nouveautés.

const { to: tr, back } = translators('néerlandais')

/** Petites phrases à traduire (page « Traduction »). Ajouter À LA FIN seulement. */
const translationDrafts: ExDraft[] = [
  tr('Bonjour, comment allez-vous ?', ['Goedendag, hoe gaat het met u?', 'Dag, hoe gaat het met u?', 'Goedemorgen, hoe gaat het met u?', 'Goedemiddag, hoe gaat het met u?', 'Hallo, hoe gaat het met u?', 'Goedendag, hoe gaat het?', 'Hallo, hoe gaat het?'], 'Hoe gaat het met u ? = comment allez-vous ?'),
  tr('Je m’appelle Nunu.', ['Ik heet Nunu.', 'Mijn naam is Nunu.', 'Ik ben Nunu.'], 'Heten = s’appeler.'),
  tr('Je suis française.', ['Ik ben Française.', 'Ik ben Frans.', 'Ik ben Franse.', 'Ik ben Fransman.', 'Ik kom uit Frankrijk.'], 'Franse = une Française (une femme).'),
  tr('J’habite à Gand.', ['Ik woon in Gent.', 'Ik woon in Gent'], 'Wonen in + ville.'),
  tr('Je ne comprends pas.', ['Ik begrijp het niet.', 'Ik snap het niet.', 'Ik begrijp u niet.', 'Ik begrijp je niet.', 'Ik versta het niet.', 'Ik begrijp dat niet.', 'Ik snap dat niet.'], 'Niet en fin de phrase.'),
  tr('Pouvez-vous parler plus lentement, s’il vous plaît ?', ['Kunt u langzamer praten, alstublieft?', 'Kunt u langzamer spreken, alstublieft?', 'Kunt u alstublieft langzamer praten?', 'Kunt u alstublieft langzamer spreken?', 'Kunt u langzamer praten alstublieft?', 'Kunt u wat langzamer praten, alstublieft?', 'Kunt u wat langzamer spreken, alstublieft?', 'Kunt u iets langzamer praten, alstublieft?'], 'Langzamer = plus lentement.'),
  tr('Je parle un peu néerlandais.', ['Ik spreek een beetje Nederlands.', 'Ik spreek een klein beetje Nederlands.', 'Ik praat een beetje Nederlands.'], 'Een beetje = un peu.'),
  tr('Quelle heure est-il ?', ['Hoe laat is het?', 'Hoe laat is het nu?', 'Hoeveel uur is het?'], 'Hoe laat is het ? = quelle heure est-il ?'),
  tr('Il est trois heures et demie.', ['Het is half vier.', 'Het is half 4.', 'Het is drie uur dertig.'], 'Half vier = trois heures et demie (la demi-heure avant quatre !).'),
  tr('J’ai deux enfants.', ['Ik heb twee kinderen.', 'Ik heb 2 kinderen.'], 'Pluriel de kind : kinderen.'),
  tr('Mon mari travaille à Bruxelles.', ['Mijn man werkt in Brussel.', 'Mijn echtgenoot werkt in Brussel.'], 'Mijn man = mon mari ; werken in.'),
  tr('Où sont les toilettes ?', ['Waar is het toilet?', 'Waar zijn de toiletten?', 'Waar is de wc?', 'Waar is de WC?'], 'Het toilet / de toiletten.'),
  tr('Je voudrais un café, s’il vous plaît.', ['Ik wil graag een koffie, alstublieft.', 'Ik wil graag een koffie, alsjeblieft.', 'Een koffie, alstublieft.', 'Ik neem een koffie, alstublieft.', 'Mag ik een koffie, alstublieft?', 'Mag ik een koffie, alsjeblieft?', 'Ik wil graag een koffie.', 'Ik zou graag een koffie willen, alstublieft.', 'Ik wil graag een kop koffie, alstublieft.'], 'Ik wil graag… = je voudrais…'),
  tr('Combien ça coûte ?', ['Hoeveel kost het?', 'Hoeveel kost dit?', 'Hoeveel kost dat?', 'Wat kost het?', 'Wat kost dit?', 'Wat kost dat?'], 'Hoeveel kost… ?'),
  tr('Les enfants jouent dans le jardin.', ['De kinderen spelen in de tuin.', 'De kinderen spelen in de tuin'], 'Pluriel : spelen.'),
  tr('Je dois aller chez le médecin.', ['Ik moet naar de dokter.', 'Ik moet naar de dokter gaan.', 'Ik moet naar de huisarts.', 'Ik moet naar de huisarts gaan.'], 'Moeten + naar : aller vers (gaan peut être omis).'),
  tr('Mon fils a faim.', ['Mijn zoon heeft honger.', 'Mijn zoontje heeft honger.'], 'Honger hebben.'),
  tr('Il fait beau aujourd’hui.', ['Het is mooi weer vandaag.', 'Het is vandaag mooi weer.', 'Vandaag is het mooi weer.', 'Het is mooi weer.', 'Het weer is mooi vandaag.', 'Het is een mooie dag.'], 'Mooi weer = beau temps.'),
  tr('Nous allons au marché samedi.', ['Wij gaan zaterdag naar de markt.', 'We gaan zaterdag naar de markt.', 'Zaterdag gaan wij naar de markt.', 'Zaterdag gaan we naar de markt.', 'Wij gaan op zaterdag naar de markt.', 'We gaan op zaterdag naar de markt.', 'Op zaterdag gaan wij naar de markt.', 'Op zaterdag gaan we naar de markt.'], 'Gaan naar + lieu.'),
  tr('Qu’est-ce que tu veux manger ?', ['Wat wil je eten?', 'Wat wil jij eten?', 'Wat wilt u eten?', 'Wat wil je graag eten?', 'Wat wil jij graag eten?'], 'Wat wil je + infinitif ?'),
  tr('Je n’ai pas de voiture.', ['Ik heb geen auto.', 'Ik heb geen wagen.'], 'Geen devant un nom sans article.'),
  tr('Il n’y a pas de lait.', ['Er is geen melk.', 'Er is geen melk meer.'], 'Er is geen + nom.'),
  tr('Ma fille dort déjà.', ['Mijn dochter slaapt al.', 'Mijn dochtertje slaapt al.'], 'Slapen → slaapt.'),
  tr('Elle est très gentille.', ['Zij is erg aardig.', 'Ze is erg aardig.', 'Zij is heel aardig.', 'Ze is heel aardig.', 'Zij is erg lief.', 'Ze is erg lief.', 'Zij is heel lief.', 'Ze is heel lief.', 'Zij is zeer aardig.', 'Ze is zeer aardig.'], 'Aardig = gentil, sympathique.'),
  tr('Je suis fatiguée.', ['Ik ben moe.', 'Ik ben erg moe.', 'Ik ben heel moe.'], 'Moe = fatigué(e).'),
  tr('Il pleut depuis ce matin.', ['Het regent sinds vanmorgen.', 'Het regent sinds vanochtend.', 'Het regent al sinds vanmorgen.', 'Het regent al sinds vanochtend.', 'Sinds vanmorgen regent het.', 'Sinds vanochtend regent het.', 'Het regent al de hele ochtend.', 'Het regent vanaf vanmorgen.'], 'Sinds = depuis (un moment précis).'),
  tr('J’ai mangé une pomme.', ['Ik heb een appel gegeten.', 'Ik at een appel.'], 'Parfait : ik heb … gegeten.'),
  tr('Hier, nous sommes allés au parc.', ['Gisteren zijn wij naar het park gegaan.', 'Gisteren zijn we naar het park gegaan.', 'Gisteren gingen wij naar het park.', 'Gisteren gingen we naar het park.', 'Wij zijn gisteren naar het park gegaan.', 'We zijn gisteren naar het park gegaan.'], 'Gaan → zijn gegaan (zijn comme auxiliaire).'),
  tr('Demain, je vais chez ma sœur.', ['Morgen ga ik naar mijn zus.', 'Morgen ga ik naar mijn zuster.', 'Morgen ga ik bij mijn zus op bezoek.', 'Ik ga morgen naar mijn zus.'], 'Morgen + verbe en 2e position.'),
  tr('Peux-tu m’aider, s’il te plaît ?', ['Kun je me helpen, alsjeblieft?', 'Kun je mij helpen, alsjeblieft?', 'Kun je me alsjeblieft helpen?', 'Kun je mij alsjeblieft helpen?', 'Kan je me helpen, alsjeblieft?', 'Kan je mij helpen, alsjeblieft?', 'Kan je me alsjeblieft helpen?', 'Kan je mij alsjeblieft helpen?', 'Wil je me helpen, alsjeblieft?', 'Wil je mij helpen, alsjeblieft?', 'Wil je me alsjeblieft helpen?', 'Wil je mij alsjeblieft helpen?'], 'Kun je … helpen ? (infinitif à la fin).'),
  tr('Le repas est prêt !', ['Het eten is klaar!', 'De maaltijd is klaar!', 'Het eten is klaar'], 'Klaar = prêt.'),
  tr('Je t’aime.', ['Ik hou van je.', 'Ik hou van jou.', 'Ik houd van je.', 'Ik houd van jou.', 'Ik hou van u.'], 'Houden van = aimer (quelqu’un).'),
  tr('Bonne nuit, fais de beaux rêves !', ['Welterusten, slaap lekker en droom mooi!', 'Welterusten, droom mooi!', 'Welterusten! Droom mooi!', 'Welterusten, mooie dromen!', 'Welterusten, droom lekker!', 'Slaap lekker, droom mooi!', 'Welterusten, mooie dromen gewenst!', 'Welterusten, slaap lekker!'], 'Mooie dromen = beaux rêves.'),
  tr('Où est la boulangerie ?', ['Waar is de bakker?', 'Waar is de bakkerij?', 'Waar is de bakkerswinkel?'], 'De bakker = la boulangerie (le commerce).'),
  tr('Je voudrais prendre rendez-vous.', ['Ik wil graag een afspraak maken.', 'Ik zou graag een afspraak willen maken.', 'Ik wil een afspraak maken.'], 'Een afspraak maken.'),
  tr('Qu’est-ce que c’est ?', ['Wat is dit?', 'Wat is dat?', 'Wat is het?'], 'Wat is dit / dat ?'),
  tr('Viens, on y va !', ['Kom, we gaan!', 'Kom, wij gaan!', 'Kom, laten we gaan!', 'Kom, gaan we!', 'Kom op, we gaan!', 'Kom, we vertrekken!'], 'Kom = viens ; we gaan = on y va.'),
  back('Ik begrijp het niet. Kunt u dat herhalen?', ['Je ne comprends pas. Pouvez-vous répéter ?', 'Je ne comprends pas. Pouvez-vous répéter cela ?', 'Je ne comprends pas. Pouvez-vous le répéter ?', 'Je ne comprends pas. Vous pouvez répéter ?', 'Je ne comprends pas. Pourriez-vous répéter ?', 'Je ne comprends pas. Pourriez-vous répéter cela ?']),
  back('Wij gaan morgen naar het park.', ['Nous allons au parc demain.', 'Demain, nous allons au parc.', 'On va au parc demain.', 'Demain, on va au parc.', 'Nous allons demain au parc.', 'Nous irons au parc demain.', 'Demain nous irons au parc.', 'Demain on va au parc.']),
  back('Het is koud, doe je jas aan!', ['Il fait froid, mets ton manteau !', 'Il fait froid, mets ta veste !', 'Il fait froid, mets ton manteau.', 'Il fait froid, mets ta veste.', 'Il fait froid, enfile ton manteau !', 'Il fait froid, enfile ta veste !', 'Il fait froid, mets ton blouson !', 'Il fait froid, mets ta veste.']),
]

export const nunuTranslations: Exercise[] = withIds('nn-tr', translationDrafts, 'A1')

// ----------------------------------------------------------------------------- paquets transversaux

const usefulPhrases: Word[] = [
  ['Pardon', 'pardon, excusez-moi', 'Pardon, mag ik erlangs?'],
  ['Sorry', 'désolé(e)', 'Sorry, ik ben te laat.'],
  ['Alstublieft / Alsjeblieft', 's’il vous plaît / s’il te plaît (et « voici »)', 'Een koffie, alstublieft.', 'Alstublieft = vouvoiement ; alsjeblieft = tutoiement. Se dit aussi en tendant quelque chose.'],
  ['Dank u wel / Dank je wel', 'merci (vouvoiement / tutoiement)', 'Dank u wel voor uw hulp.'],
  ['Bedankt', 'merci (courant)', 'Bedankt voor de uitnodiging!'],
  ['Graag gedaan', 'de rien, avec plaisir', 'Dank je wel! — Graag gedaan.'],
  ['Geen probleem', 'pas de souci', 'Kun je me helpen? — Geen probleem.'],
  ['Natuurlijk', 'bien sûr', 'Mag ik zitten? — Natuurlijk.'],
  ['Ik begrijp het niet', 'je ne comprends pas', 'Sorry, ik begrijp het niet.'],
  ['Kunt u dat herhalen?', 'pouvez-vous répéter ?', 'Kunt u dat herhalen, alstublieft?'],
  ['Kunt u langzamer praten?', 'pouvez-vous parler plus lentement ?', 'Kunt u langzamer praten, alstublieft?'],
  ['Ik spreek een beetje Nederlands', 'je parle un peu néerlandais', 'Ik spreek een beetje Nederlands.'],
  ['Hoe zeg je … in het Nederlands?', 'comment dit-on … en néerlandais ?', 'Hoe zeg je « pain » in het Nederlands?'],
  ['Wat betekent …?', 'que veut dire … ?', 'Wat betekent « gezellig »?'],
  ['Ik weet het niet', 'je ne sais pas', 'Sorry, ik weet het niet.'],
  ['Misschien', 'peut-être', 'Misschien morgen.'],
  ['Natuurlijk niet', 'bien sûr que non', 'Ben je boos? — Natuurlijk niet.'],
  ['Wat leuk!', 'comme c’est chouette !', 'Wat leuk, dank je!'],
  ['Succes!', 'bonne chance !', 'Succes met je examen!'],
  ['Gefeliciteerd!', 'félicitations ! / bon anniversaire !', 'Gefeliciteerd met je verjaardag!'],
  ['Eet smakelijk!', 'bon appétit !', 'Eet smakelijk, iedereen!'],
  ['Proost!', 'santé !', 'Proost! Op je gezondheid!'],
  ['Tot ziens', 'au revoir', 'Tot ziens, mevrouw!'],
  ['Prettig weekend!', 'bon week-end !', 'Dag, prettig weekend!'],
]

const kidSongs: Word[] = [
  ['Slaap, kindje, slaap', 'dors, mon petit, dors (berceuse)', 'Slaap, kindje, slaap, daar buiten loopt een schaap.', 'Comptine très connue.'],
  ['Altijd is Kortjakje ziek', 'comptine (« Kortjakje est toujours malade »)', 'Altijd is Kortjakje ziek, midden in de week.', 'Chanson pour enfants.'],
  ['Klap eens in je handjes', 'tape dans tes petites mains', 'Klap eens in je handjes!', 'Chanson classique : handjes (diminutif).'],
  ['Hoofd, schouders, knie en teen', 'tête, épaules, genoux et orteils', 'Hoofd, schouders, knie en teen, knie en teen.', 'Pour apprendre le corps.'],
  ['Een twee drie vier', 'un, deux, trois, quatre', 'Een, twee, drie, vier, hoedje van papier.', 'Comptine à compter.'],
  ['Wie niet weg is, is gezien', 'cache-cache (formule : qui n’est pas parti est vu)', 'Wie niet weg is, is gezien!', 'On le crie à la fin du compte, au cache-cache.'],
  ['Hoera!', 'hourra !', 'Hoera, ik ben jarig!'],
  ['Ik ben jarig', 'c’est mon anniversaire', 'Hoera, ik ben jarig!', 'Jarig zijn = fêter son anniversaire.'],
  ['Mama / Papa', 'maman / papa', 'Mama, kom je even?'],
  ['Opa / Oma', 'papy / mamie', 'Opa en oma komen morgen.'],
]

export const nunuSharedDecks: VocabDeck[] = [
  { id: 'nn-deck-phrases', title: 'Petites phrases utiles', icon: '💬', description: 'Pardon, alstublieft, graag gedaan… les petits mots à utiliser partout, tout de suite.', kind: 'decouverte', items: wordItems('nn-phr', usefulPhrases) },
  { id: 'nn-deck-kids', title: 'Comptines et mots d’enfants', icon: '🎵', description: 'De quoi chanter, jouer et parler avec les enfants.', kind: 'decouverte', items: wordItems('nn-kid', kidSongs) },
]

// ----------------------------------------------------------------------------- prononciation

export const nunuPronunciation: PronunciationItem[] = [
  { id: 'nn-p-g', word: 'goed / gaan / geen', guide: 'KHOUT / KHAAN / KHÉÉN', tip: 'Le « g » néerlandais est une consonne rauque, comme un « r » français raclé dans la gorge (en Belgique : plus doux).', example: 'Goedemorgen, hoe gaat het?' },
  { id: 'nn-p-ch', word: 'acht / lachen / nacht', guide: 'AKHT / LA-khen / NAKHT', tip: '« ch » = même son rauque que « g » (en Belgique parfois plus mou). Pas un « ch » français !', example: 'Ik lach elke nacht.' },
  { id: 'nn-p-ui', word: 'huis / uit / tuin', guide: 'HEUÏSS / EUÏT / TEUÏN', tip: 'Le « ui » est un son typique : « eu » suivi de « i » rapide. Les lèvres arrondies.', example: 'Het huis heeft een tuin.' },
  { id: 'nn-p-eu', word: 'deur / leuk / neus', guide: 'DEUR / LEUK / NEUS', tip: 'Comme « eu » dans « peur » mais plus long.', example: 'Wat leuk! De deur is open.' },
  { id: 'nn-p-oe', word: 'goed / boek / koek', guide: 'GOUT / BOUK / KOUK', tip: '« oe » se lit « ou » comme en français.', example: 'Het boek is goed.' },
  { id: 'nn-p-ij', word: 'ij / ei : mijn / vijf / trein', guide: 'MEIN / VEIF / TREIN', tip: '« ij » et « ei » se prononcent pareil : un son entre « é » et « i » (comme « eille »).', example: 'Mijn trein vertrekt om vijf uur.' },
  { id: 'nn-p-ou', word: 'ou / au : oud / hout / blauw', guide: 'AOUT / HAOUT / BLAOU', tip: '« ou » et « au » se prononcent pareil : « aou ».', example: 'De blauwe deur is oud.' },
  { id: 'nn-p-sch', word: 'school / schoen / schrijven', guide: 'SKHOL / SKHOUN / SKHREI-ven', tip: '« sch » = « s » + le son rauque « g ».', example: 'Mijn schoen ligt op school.' },
  { id: 'nn-p-w', word: 'water / wij / week', guide: 'OUA-ter / OUEÏ / OUÉK', tip: 'Le « w » est entre « v » et « ou » (lèvres légèrement arrondies, sans toucher les dents).', example: 'Wij drinken water.' },
  { id: 'nn-p-v', word: 'vader / vijf / vier', guide: 'FA-der / FEIF / FIR', tip: 'Le « v » néerlandais ressemble à un « f » (surtout en Pays-Bas ; en Belgique un peu plus voisé).', example: 'Mijn vader is vier uur thuis.' },
  { id: 'nn-p-j', word: 'ja / jas / jongen', guide: 'YA / YAS / YONG-en', tip: 'Le « j » se prononce comme le « y » de « yaourt ».', example: 'Ja, de jongen draagt een jas.' },
  { id: 'nn-p-en', word: 'lopen / eten / kinderen', guide: 'LO-pe / É-te / KIN-de-re', tip: 'La terminaison -en se prononce « eu » faible, le « n » final est souvent muet.', example: 'De kinderen eten en lopen.' },
  { id: 'nn-p-long', word: 'maan / man', guide: 'MAAN / MAN', tip: 'Voyelle longue (aa, ee, oo, uu) ≠ voyelle courte : maan (lune) ≠ man (homme).', example: 'De man ziet de maan.' },
  { id: 'nn-p-sch2', word: 'sjaal / sjoelen', guide: 'CHAAL / CHOU-len', tip: '« sj » = « ch » français (comme dans « chat »).', example: 'Mijn sjaal is warm.' },
]

// ----------------------------------------------------------------------------- verbes irréguliers (forts)

const v = (base: string, past: string, participle: string, fr: string, tier: 1 | 2 | 3): IrregularVerb => ({ base, past, participle, fr, tier })

export const nunuIrregularVerbs: IrregularVerb[] = [
  v('zijn', 'was', 'geweest', 'être', 1),
  v('hebben', 'had', 'gehad', 'avoir', 1),
  v('gaan', 'ging', 'gegaan', 'aller', 1),
  v('komen', 'kwam', 'gekomen', 'venir', 1),
  v('doen', 'deed', 'gedaan', 'faire', 1),
  v('zien', 'zag', 'gezien', 'voir', 1),
  v('eten', 'at', 'gegeten', 'manger', 1),
  v('drinken', 'dronk', 'gedronken', 'boire', 1),
  v('nemen', 'nam', 'genomen', 'prendre', 1),
  v('geven', 'gaf', 'gegeven', 'donner', 1),
  v('staan', 'stond', 'gestaan', 'être debout', 1),
  v('zitten', 'zat', 'gezeten', 'être assis', 1),
  v('liggen', 'lag', 'gelegen', 'être couché', 1),
  v('lopen', 'liep', 'gelopen', 'marcher', 1),
  v('schrijven', 'schreef', 'geschreven', 'écrire', 1),
  v('lezen', 'las', 'gelezen', 'lire', 1),
  v('spreken', 'sprak', 'gesproken', 'parler', 1),
  v('slapen', 'sliep', 'geslapen', 'dormir', 1),
  v('kopen', 'kocht', 'gekocht', 'acheter', 1),
  v('brengen', 'bracht', 'gebracht', 'apporter, amener', 1),
  v('weten', 'wist', 'geweten', 'savoir', 2),
  v('kunnen', 'kon', 'gekund', 'pouvoir', 2),
  v('willen', 'wilde', 'gewild', 'vouloir', 2),
  v('moeten', 'moest', 'gemoeten', 'devoir', 2),
  v('zullen', 'zou', '—', 'devoir, aller (futur)', 2),
  v('vinden', 'vond', 'gevonden', 'trouver', 2),
  v('beginnen', 'begon', 'begonnen', 'commencer', 2),
  v('blijven', 'bleef', 'gebleven', 'rester', 2),
  v('vragen', 'vroeg', 'gevraagd', 'demander', 2),
  v('helpen', 'hielp', 'geholpen', 'aider', 2),
  v('kiezen', 'koos', 'gekozen', 'choisir', 3),
  v('vergeten', 'vergat', 'vergeten', 'oublier', 3),
  v('begrijpen', 'begreep', 'begrepen', 'comprendre', 3),
  v('verstaan', 'verstond', 'verstaan', 'comprendre (entendre)', 3),
  v('houden', 'hield', 'gehouden', 'tenir, aimer (houden van)', 3),
  v('rijden', 'reed', 'gereden', 'rouler, conduire', 3),
  v('fietsen', 'fietste', 'gefietst', 'faire du vélo (régulier)', 3),
  v('winnen', 'won', 'gewonnen', 'gagner', 3),
]

export const nunuChangelog: ChangelogEntry[] = [
  {
    version: 1,
    date: '2026-10-19',
    title: 'Welkom, Nunu ! 🇧🇪',
    changes: [
      'Cours de néerlandais depuis zéro : sons, pronoms, zijn et hebben, articles, pluriel, diminutifs, présent, ordre des mots, négation, questions, modaux, verbes à particule, possessifs, er is, adjectifs, prépositions, passé et futur.',
      '14 thèmes de la vie quotidienne : se présenter, les chiffres, l’heure, la famille, parler aux enfants, la maison, manger, au café, en ville, faire les courses, l’école, la santé, la météo, voisins et téléphone.',
      'Dans chaque thème : vocabulaire, phrases clés, traductions, phrases à compléter, à corriger et textes à trous qui révisent la grammaire.',
      'Dialogues, lectures, sujets d’écriture, petites phrases à traduire, prononciation et verbes irréguliers.',
      'Interface claire, et la taille du texte se règle dans Progrès → Réglages.',
    ],
  },
  {
    version: 2,
    date: '2026-10-20',
    title: 'Un parcours guidé, leçon après leçon 🧭',
    changes: [
      'Nouvel onglet « Parcours » : chaque thème devient une leçon découpée en petites étapes qui se débloquent au fur et à mesure.',
      'Chaque mot est d’abord découvert dans une phrase (avec l’audio, et la possibilité de le répéter à voix haute), puis revu dans d’autres contextes.',
      'Les exercices montent en difficulté : choisir parmi des propositions, écouter, compléter, puis taper soi-même la réponse.',
      'La grammaire se découvre pas à pas : d’abord des exemples à observer, ensuite l’explication, puis les exercices.',
      'Un rappel remélange les mots des leçons précédentes. Pour sauter des étapes : Parcours → « Tout débloquer ».',
    ],
  },
]
