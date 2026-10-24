import type { ChangelogEntry, Exercise, PronunciationItem, VocabDeck } from '../../types.ts'
import { translators, withIds, wordItems, type ExDraft, type Word } from '../theme-builder.ts'

// Maman — phrases à traduire, paquets transversaux, prononciation, nouveautés.

const { to: tr, back } = translators('anglais')

/** Petites phrases à traduire (page « Traduction ») : tous les thèmes mélangés. Ajouter À LA FIN seulement. */
const translationDrafts: ExDraft[] = [
  tr('Bonjour, comment allez-vous ?', ['Hello, how are you?', 'Hello, how are you doing?', 'Good morning, how are you?', 'Hi, how are you?'], 'How are you? s’emploie à tout moment de la journée.'),
  tr('Je suis ravie de vous rencontrer.', ['Nice to meet you.', 'I’m very pleased to meet you.', 'I am very pleased to meet you.', 'Pleased to meet you.', 'I’m delighted to meet you.', 'I am delighted to meet you.', 'It’s nice to meet you.', 'It is nice to meet you.', 'I’m glad to meet you.', 'I am glad to meet you.', 'Lovely to meet you.']),
  tr('Je viens de Belgique, mais mon mari est français.', ['I’m from Belgium, but my husband is French.', 'I am from Belgium, but my husband is French.', 'I come from Belgium, but my husband is French.', 'I’m from Belgium but my husband is French.', 'I am from Belgium but my husband is French.', 'I come from Belgium but my husband is French.'], 'Nationalité = majuscule : French.'),
  tr('Combien de frères et sœurs avez-vous ?', ['How many brothers and sisters do you have?', 'How many brothers and sisters have you got?', 'How many siblings do you have?', 'How many siblings have you got?'], 'How many + nom pluriel.'),
  tr('Il est trois heures et quart.', ['It’s quarter past three.', 'It is quarter past three.', 'It’s a quarter past three.', 'It is a quarter past three.', 'It’s three fifteen.', 'It is three fifteen.', 'It’s 3:15.', 'It is 3:15.']),
  tr('À quelle heure commence le film ?', ['What time does the film start?', 'What time does the movie start?', 'What time does the film begin?', 'When does the film start?', 'When does the movie start?', 'What time is the film?'], 'What time does + sujet + verbe de base ?'),
  tr('Je voudrais un café, s’il vous plaît.', ['I’d like a coffee, please.', 'I would like a coffee, please.', 'Could I have a coffee, please?', 'Can I have a coffee, please?', 'A coffee, please.', 'I’ll have a coffee, please.']),
  tr('Combien ça coûte ?', ['How much is it?', 'How much does it cost?', 'How much is this?', 'How much does this cost?', 'How much is that?', 'What does it cost?']),
  tr('Pouvez-vous parler plus lentement, s’il vous plaît ?', ['Could you speak more slowly, please?', 'Can you speak more slowly, please?', 'Could you speak slower, please?', 'Can you speak slower, please?', 'Could you speak more slowly please?']),
  tr('Je ne comprends pas.', ['I don’t understand.', 'I do not understand.', 'I didn’t understand.'], 'Négatif du présent simple : don’t + verbe.'),
  tr('Où se trouve la pharmacie la plus proche ?', ['Where is the nearest pharmacy?', 'Where’s the nearest pharmacy?', 'Where is the nearest chemist’s?', 'Where’s the nearest chemist’s?', 'Where is the nearest chemist?', 'Where’s the nearest chemist?'], 'Superlatif : the nearest.'),
  tr('Il y a beaucoup de touristes cette année.', ['There are a lot of tourists this year.', 'There are lots of tourists this year.', 'There are many tourists this year.'], 'There are + pluriel.'),
  tr('Nous avons visité le château hier.', ['We visited the castle yesterday.', 'We visited the castle yesterday'], 'Hier → past simple.'),
  tr('Je n’ai jamais mangé de moules.', ['I’ve never eaten mussels.', 'I have never eaten mussels.', 'I’ve never had mussels.', 'I have never had mussels.', 'I’ve never eaten any mussels.'], 'Present perfect : never + participe passé.'),
  tr('Elle habite ici depuis cinq ans.', ['She has lived here for five years.', 'She’s lived here for five years.', 'She has been living here for five years.', 'She’s been living here for five years.'], 'Durée qui continue → present perfect + for.'),
  tr('Demain, il va faire beau.', ['Tomorrow it’s going to be nice.', 'Tomorrow it is going to be nice.', 'Tomorrow the weather is going to be nice.', 'It’s going to be nice tomorrow.', 'It is going to be nice tomorrow.', 'The weather’s going to be nice tomorrow.', 'The weather is going to be nice tomorrow.', 'Tomorrow it will be nice.', 'It will be nice tomorrow.', 'Tomorrow it’s going to be sunny.', 'Tomorrow it is going to be sunny.', 'It’s going to be sunny tomorrow.', 'It is going to be sunny tomorrow.', 'The weather will be nice tomorrow.', 'Tomorrow the weather will be nice.', 'Tomorrow it will be sunny.', 'It will be sunny tomorrow.', 'Tomorrow it’s going to be fine.', 'It’s going to be fine tomorrow.', 'Tomorrow it will be fine.']),
  tr('Si tu veux, je t’aiderai.', ['If you want, I’ll help you.', 'If you want, I will help you.', 'If you like, I’ll help you.', 'If you like, I will help you.', 'I’ll help you if you want.', 'I will help you if you want.', 'I’ll help you if you like.', 'I will help you if you like.'], 'If + présent, will + verbe.'),
  tr('Mon petit-fils a six ans.', ['My grandson is six.', 'My grandson is six years old.', 'My grandson’s six.', 'My grandson’s six years old.'], 'L’âge se dit avec BE.'),
  tr('La maison de ma sœur est plus grande que la mienne.', ['My sister’s house is bigger than mine.', 'My sister’s house is larger than mine.', 'My sister’s house is bigger than my house.', 'My sister’s house is larger than my house.'], 'Comparatif : bigger than.'),
  tr('Je n’ai pas besoin d’un sac.', ['I don’t need a bag.', 'I do not need a bag.'], 'Négatif : don’t need.'),
  tr('Pourriez-vous m’aider à porter ça ?', ['Could you help me carry this?', 'Could you help me to carry this?', 'Could you help me carry that?', 'Could you help me to carry that?', 'Could you give me a hand with this?', 'Can you help me carry this?', 'Can you help me to carry this?', 'Can you help me carry that?', 'Can you help me to carry that?', 'Could you help me carry it?', 'Can you help me carry it?'], 'Help me + verbe.'),
  tr('Il pleut des cordes depuis ce matin.', ['It’s been raining cats and dogs since this morning.', 'It has been raining cats and dogs since this morning.', 'It’s been pouring since this morning.', 'It has been pouring since this morning.', 'It’s been raining heavily since this morning.', 'It has been raining heavily since this morning.', 'It’s been raining hard since this morning.', 'It has been raining hard since this morning.'], 'Expression : raining cats and dogs.'),
  tr('Nous nous sommes perdus en ville.', ['We got lost in town.', 'We got lost in the town.', 'We got lost in the city.', 'We got lost in the town centre.', 'We got lost in the city centre.', 'We got lost.', 'We were lost in town.']),
  tr('Merci pour votre aide.', ['Thank you for your help.', 'Thanks for your help.', 'Thank you for helping me.', 'Thanks for helping me.', 'Thank you for helping us.']),
  tr('À mon avis, c’est trop cher.', ['In my opinion, it’s too expensive.', 'In my opinion it’s too expensive.', 'In my opinion, it is too expensive.', 'In my opinion it is too expensive.', 'I think it’s too expensive.', 'I think it is too expensive.', 'I think that it’s too expensive.', 'I think that it is too expensive.'], 'In my opinion… ou I think…'),
  tr('Je suis désolée, je suis en retard.', ['I’m sorry, I’m late.', 'I am sorry, I am late.', 'Sorry, I’m late.', 'I’m sorry I’m late.', 'I am sorry I am late.', 'Sorry I’m late.'], 'Être en retard = be late.'),
  tr('Je dois partir maintenant.', ['I have to go now.', 'I must go now.', 'I’ve got to go now.', 'I need to go now.', 'I have to leave now.', 'I must leave now.', 'I’ve got to leave now.', 'I need to leave now.'], 'Obligation → have to / must.'),
  tr('Nous n’avons pas eu de chance avec la météo.', ['We were unlucky with the weather.', 'We were not lucky with the weather.', 'We weren’t lucky with the weather.', 'We had bad luck with the weather.', 'We didn’t have any luck with the weather.', 'We didn’t have luck with the weather.', 'We had no luck with the weather.'], 'Unlucky = malchanceux.'),
  tr('Je fais mes courses le samedi matin.', ['I do my shopping on Saturday mornings.', 'I do my shopping on Saturday morning.', 'I go shopping on Saturday mornings.', 'I go shopping on Saturday morning.', 'I do my shopping on Saturdays in the morning.', 'I go shopping on Saturdays in the morning.', 'I do the shopping on Saturday mornings.', 'I do the shopping on Saturday morning.'], 'On + jour.'),
  tr('Quelle belle surprise !', ['What a nice surprise!', 'What a lovely surprise!', 'What a great surprise!', 'What a beautiful surprise!', 'What a wonderful surprise!', 'What a pleasant surprise!'], 'What a + adjectif + nom !'),
  tr('Avez-vous déjà visité Londres ?', ['Have you ever visited London?', 'Have you ever been to London?', 'Have you visited London before?', 'Have you been to London before?'], 'Ever + present perfect.'),
  tr('Je préfère le thé au café.', ['I prefer tea to coffee.', 'I like tea better than coffee.', 'I prefer tea to coffee'], 'Prefer A TO B.'),
  tr('Cette valise est trop lourde pour moi.', ['This suitcase is too heavy for me.', 'This case is too heavy for me.', 'This bag is too heavy for me.'], 'Too + adjectif + for.'),
  tr('Qu’est-ce que vous faites dans la vie ?', ['What do you do?', 'What do you do for a living?', 'What’s your job?', 'What is your job?', 'What’s your occupation?'], 'What do you do? = quel est votre métier ?'),
  tr('Il vaudrait mieux prendre un parapluie.', ['You should take an umbrella.', 'You’d better take an umbrella.', 'It would be better to take an umbrella.', 'We should take an umbrella.', 'We’d better take an umbrella.', 'It’s better to take an umbrella.', 'It is better to take an umbrella.', 'You had better take an umbrella.', 'We had better take an umbrella.'], 'Conseil : should / had better.'),
  tr('Mon fils habite en Allemagne depuis 2015.', ['My son has lived in Germany since 2015.', 'My son’s lived in Germany since 2015.', 'My son has been living in Germany since 2015.', 'My son’s been living in Germany since 2015.'], 'Since + année → present perfect.'),
  tr('Je ne suis pas allée au travail hier.', ['I didn’t go to work yesterday.', 'I did not go to work yesterday.'], 'Négatif au passé : didn’t + verbe de base.'),
  back('Could you tell me where the toilets are, please?', ['Pourriez-vous me dire où sont les toilettes, s’il vous plaît ?', 'Pouvez-vous me dire où sont les toilettes, s’il vous plaît ?', 'Pourriez-vous m’indiquer où sont les toilettes, s’il vous plaît ?']),
  back('We’re having a barbecue on Saturday. Would you like to join us?', ['Nous faisons un barbecue samedi. Voulez-vous vous joindre à nous ?', 'Nous organisons un barbecue samedi. Voulez-vous vous joindre à nous ?', 'On fait un barbecue samedi. Voulez-vous vous joindre à nous ?', 'Nous faisons un barbecue samedi. Voulez-vous nous rejoindre ?', 'On fait un barbecue samedi. Tu veux te joindre à nous ?', 'Nous faisons un barbecue samedi. Aimeriez-vous vous joindre à nous ?']),
  back('I’ve lost my keys. Have you seen them?', ['J’ai perdu mes clés. Les as-tu vues ?', 'J’ai perdu mes clés. Les avez-vous vues ?', 'J’ai perdu mes clefs. Les as-tu vues ?', 'J’ai perdu mes clefs. Les avez-vous vues ?', 'J’ai perdu mes clés. Tu les as vues ?', 'J’ai perdu mes clés. Vous les avez vues ?']),
  back('She has been a nurse for thirty years.', ['Elle est infirmière depuis trente ans.', 'Elle est infirmière depuis 30 ans.', 'Cela fait trente ans qu’elle est infirmière.']),
]

export const mamanTranslations: Exercise[] = withIds('mm-tr', translationDrafts, 'A2')

// ----------------------------------------------------------------------------- paquets transversaux

const usefulPhrases: Word[] = [
  ['Excuse me', 'excusez-moi (pour attirer l’attention)', 'Excuse me, where is the station?'],
  ['I’m sorry', 'je suis désolé(e)', 'I’m sorry, I’m late.'],
  ['Sorry?', 'pardon ? (je n’ai pas entendu)', 'Sorry? Could you say that again?'],
  ['Pardon?', 'pardon ? (comme « sorry »)', 'Pardon? I didn’t catch that.', 'Plus formel et un peu britannique.'],
  ['Please / Thank you', 's’il vous plaît / merci', 'Two coffees, please. — Thank you!'],
  ['You’re welcome', 'de rien', 'Thank you very much. — You’re welcome.', 'Aussi : No problem / Not at all.'],
  ['No problem', 'pas de souci', 'Could you help me? — No problem.'],
  ['Of course', 'bien sûr', 'Can I sit here? — Of course.'],
  ['I don’t mind', 'ça m’est égal', 'Tea or coffee? — I don’t mind.', undefined, 'A2'],
  ['It’s up to you', 'c’est à toi de voir', 'Pizza or pasta? It’s up to you.', undefined, 'A2'],
  ['How about…?', 'et si on… ? / que dirais-tu de… ?', 'How about a walk?', undefined, 'A2'],
  ['Let’s…', 'allons…, faisons…', 'Let’s have a coffee.'],
  ['I’d love to', 'avec plaisir', 'Would you like to come? — I’d love to!'],
  ['I’m afraid I can’t', 'je crains de ne pas pouvoir', 'I’m afraid I can’t come on Friday.', 'Pour refuser poliment.', 'A2'],
  ['What a pity!', 'quel dommage !', 'You can’t come? What a pity!', undefined, 'A2'],
  ['Take care', 'prends soin de toi', 'Goodbye, take care!'],
  ['Good luck!', 'bonne chance !', 'Good luck with your exam!'],
  ['Congratulations!', 'félicitations !', 'Congratulations on your new job!', 'Au pluriel : Congratulations (avec un s).'],
  ['Cheers!', 'santé ! / merci (UK)', 'Cheers, everybody!'],
  ['Bless you!', 'à tes souhaits !', 'Atchoum! — Bless you!'],
  ['It’s raining cats and dogs', 'il pleut des cordes', 'Take an umbrella, it’s raining cats and dogs!', undefined, 'A2'],
  ['a piece of cake', 'du gâteau (très facile)', 'The test was a piece of cake.', undefined, 'A2'],
  ['to be fed up', 'en avoir assez', 'I’m fed up with the rain.', undefined, 'A2'],
  ['to be in a hurry', 'être pressé', 'Sorry, I’m in a hurry.', undefined, 'A2'],
  ['no worries', 'pas de souci (familier)', 'Thanks for helping. — No worries.', undefined, 'A2'],
]

const falseFriends: Word[] = [
  ['actually', 'en fait (≠ actuellement)', 'Actually, I don’t like coffee.', 'Actuellement = at the moment / currently.', 'A2'],
  ['to assist', 'assister = aider', 'The nurse assisted the doctor.', 'Assister à (un concert) = to attend.', 'A2'],
  ['to attend', 'assister à (un événement)', 'I attended the concert.', 'Attendre = to wait for.', 'A2'],
  ['to wait for', 'attendre', 'I’m waiting for the bus.', undefined, 'A2'],
  ['a library', 'une bibliothèque', 'I borrow books at the library.', 'Une librairie = a bookshop (UK) / a bookstore (US).', 'A2'],
  ['a bookshop', 'une librairie', 'I bought it at the bookshop.', undefined, 'A2'],
  ['sensible', 'raisonnable, sensé (≠ sensible)', 'He’s a sensible man.', 'Sensible (sensibilité) = sensitive.', 'A2'],
  ['sensitive', 'sensible (émotions)', 'She’s very sensitive.', undefined, 'A2'],
  ['a journey / a trip', 'un voyage, un trajet', 'We had a long journey.', 'Faux-ami : « un journal » = a newspaper.', 'A2'],
  ['a newspaper', 'un journal', 'I read the newspaper every morning.', undefined, 'A2'],
  ['a college / a university', 'une école supérieure / une université', 'My son studies at university.', 'Attention : « collège » en UK = lycée (16-18 ans) ou université.', 'A2'],
  ['a lecture', 'un cours magistral, une conférence', 'We went to a lecture on history.', 'Faux-ami : « une lecture » = a reading ; lire = to read.', 'A2'],
  ['to pretend', 'faire semblant (≠ prétendre)', 'The child pretended to sleep.', 'Prétendre = to claim.', 'A2'],
  ['to claim', 'prétendre, affirmer', 'He claims he’s not tired.', undefined, 'A2'],
  ['a location', 'un endroit, un emplacement', 'The hotel has a great location.', 'Faux-ami : « location » (louer) = rental / hire.', 'A2'],
  ['to rent / to hire', 'louer', 'We rented a car.', undefined, 'A2'],
  ['a photograph', 'une photo', 'I took a photograph.', 'Faux-ami : un photographe = a photographer.', 'A2'],
  ['sympathetic', 'compatissant (≠ sympathique)', 'He was sympathetic when I was ill.', 'Sympathique = nice, friendly.', 'A2'],
  ['nice / friendly', 'sympathique', 'Your neighbours are very nice.', undefined, 'A2'],
  ['to prevent', 'empêcher (≠ prévenir)', 'Rain prevented us from going out.', 'Prévenir quelqu’un = to warn / to tell someone.', 'A2'],
  ['a pain', 'une douleur (≠ du pain)', 'I have a pain in my back.', 'Du pain = bread.', 'A2'],
  ['a trap', 'un piège (≠ une trappe)', 'The mouse was in a trap.', undefined, 'B1'],
]

export const mamanSharedDecks: VocabDeck[] = [
  { id: 'mm-deck-phrases', title: 'Petites phrases utiles', icon: '💬', description: 'Excuse me, I’d love to, no worries… les petits mots qu’on emploie tous les jours.', kind: 'decouverte', items: wordItems('mm-phr', usefulPhrases) },
  { id: 'mm-deck-false-friends', title: 'Faux-amis', icon: '🪤', description: 'Des mots qui ressemblent au français… mais qui veulent dire autre chose.', kind: 'decouverte', items: wordItems('mm-ff', falseFriends, 'A2') },
]

// ----------------------------------------------------------------------------- prononciation

export const mamanPronunciation: PronunciationItem[] = [
  { id: 'mm-p-th', word: 'think / three / the', guide: 'THINK (langue entre les dents)', tip: 'Le « th » : la langue entre les dents, on souffle. Ni « s », ni « z », ni « f ».', example: 'I think there are three.' },
  { id: 'mm-p-h', word: 'house / hour', guide: 'HAOUSS / AOU-er', tip: 'Le « h » est soufflé dans house, muet dans hour, honest, heir.', example: 'One hour at home, in my house.' },
  { id: 'mm-p-hungry', word: 'hungry / angry', guide: 'HUNG-gree / ANG-gree', tip: 'Le « h » est soufflé : hungry (faim) ≠ angry (en colère) !', example: 'I’m hungry, not angry.' },
  { id: 'mm-p-ed', word: 'worked / played / wanted', guide: 'WURKT / PLEYD / WON-tid', tip: 'Le -ed se prononce /t/, /d/ ou /id/ : jamais « é-d » comme en français.', example: 'I worked, played and wanted to rest.' },
  { id: 'mm-p-wednesday', word: 'Wednesday', guide: 'WENZ-day', tip: 'Le « d » et le 2e « e » ne se prononcent pas.', example: 'See you on Wednesday.' },
  { id: 'mm-p-comfortable', word: 'comfortable', guide: 'KUMF-ter-buhl', tip: 'Trois syllabes seulement (pas « com-for-ta-ble »).', example: 'This chair is very comfortable.' },
  { id: 'mm-p-vegetables', word: 'vegetables', guide: 'VEJ-tuh-buls', tip: 'Trois syllabes.', example: 'I eat a lot of vegetables.' },
  { id: 'mm-p-clothes', word: 'clothes', guide: 'KLOHZ', tip: 'Le « th » est presque muet : comme « close » (fermer) + z.', example: 'I need some new clothes.' },
  { id: 'mm-p-chocolate', word: 'chocolate', guide: 'CHOK-lit', tip: 'Deux syllabes seulement.', example: 'Belgian chocolate is the best.' },
  { id: 'mm-p-february', word: 'February', guide: 'FEB-roo-eh-ree', tip: 'Le premier « r » se prononce.', example: 'My birthday is in February.' },
  { id: 'mm-p-interesting', word: 'interesting', guide: 'IN-tres-ting', tip: 'Trois syllabes : IN-tres-ting.', example: 'That’s an interesting story.' },
  { id: 'mm-p-world', word: 'world', guide: 'WURLD', tip: 'Un seul son « eur », pas « wo-ld ».', example: 'The best soup in the world.' },
  { id: 'mm-p-world-r', word: 'rice / lice, right / light', guide: 'RAYSS / LAYSS', tip: 'Le « r » anglais ne se roule pas : la langue ne touche rien.', example: 'Turn right at the light.' },
]

export const mamanChangelog: ChangelogEntry[] = [
  {
    version: 1,
    date: '2026-10-19',
    title: 'Bienvenue, Maman ! 🌼',
    changes: [
      '22 leçons de grammaire simples : be, have, articles, pronoms, there is, quantités, prépositions, questions, can / must, présent simple et continu, passé, futur et present perfect.',
      '14 thèmes de la vie quotidienne : se présenter, la maison, la journée, les courses, au restaurant, les vêtements, visiter une ville, recevoir des amis, voyager, la santé, la météo et le jardin, les loisirs, le téléphone, le travail.',
      'Dans chaque thème : du vocabulaire, des phrases clés, des traductions, des phrases à compléter, à corriger et des textes à trous qui révisent la grammaire.',
      '10 dialogues, 6 lectures, 10 sujets d’écriture, 40 petites phrases à traduire et deux paquets (petites phrases utiles, faux-amis).',
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
  {
    version: 3,
    date: '2026-10-23',
    title: 'Voix distinctes et aide vocabulaire 📖',
    changes: [
      'Dans les dialogues d’écoute, chaque personnage a sa propre voix (féminine ou masculine selon le prénom), bien distincte des autres.',
      'Aide vocabulaire : touche un mot d’un exercice, d’une lecture ou d’un dialogue pour voir sa traduction (réglage Progrès → Réglages → Aide vocabulaire).',
      'Sous chaque exercice, « Mots de l’exercice » détaille les mots de l’énoncé.',
      'Tu peux ajouter un mot à « Mes mots à retravailler » (Vocabulaire) : il se travaille avec des cartes et revient dans la révision. Si le mot est inconnu de l’appli, tu écris toi-même sa traduction.',
      'Les contractions « it\'s », « he\'s », « there\'s »… sont maintenant acceptées dans les deux sens (it is / it has) dans tous les exercices.',
    ],
  },
  {
    version: 4,
    date: '2026-10-24',
    title: 'Ma session du jour 🌟',
    changes: [
      'Nouvelle « Ma session du jour » sur l’accueil : environ 12 exercices qui mélangent révision, point faible, nouveauté et écoute. +15 XP à la fin.',
      'Après une série, un « Rattrapage ciblé » propose d’autres exercices sur ce qui a été raté, présentés autrement.',
      'Tu peux quitter une série en cours : l’appli propose de la reprendre là où tu t’étais arrêté.',
      'Petits sons et vibrations à chaque réponse (désactivables dans Progrès → Réglages).',
      'Bouton 🐢 pour écouter lentement les mots, les phrases et les dialogues.',
      'Bandeau « Pas de connexion » rassurant, et sauvegarde plus simple : « Envoyer ma sauvegarde » (mail, WhatsApp, Drive…) et copie automatique quotidienne sur l’appareil.',
    ],
  },
  {
    version: 5,
    date: '2026-10-24',
    title: 'Interface allégée et pixel art 🎨',
    changes: [
      'Navigation simplifiée pour Jujularage, Maman et Nunu : 5 onglets (Accueil, Parcours, Réviser, Vocab, Plus). Tout le reste est rangé dans « Plus ».',
      'Mise en page plus aérée : cartes plus spacieuses, interligne plus confortable.',
      'Des illustrations en pixel art pour les mots concrets (pain, maison, chat, bus…) : dans les cartes de découverte, la fenêtre d’un mot et « Mes mots ».',
      'Célébrations : la mascotte Tea et des confettis en fin de série, un trophée à la fin d’une leçon, une fête aux paliers de jours d’affilée (3, 7, 14, 30…).',
    ],
  },
  {
    version: 6,
    date: '2026-10-24',
    title: 'Parler plus et voir en français 🎭',
    changes: [
      'Nouveau jeu de rôle : choisis un personnage d’un dialogue, l’appli joue les autres avec leurs voix et tu dis tes répliques à voix haute (la reconnaissance vocale te dit si c’est bon). Aussi dans le Parcours, après chaque dialogue (facultatif).',
    ],
  },
]
