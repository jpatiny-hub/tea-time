import type { ChangelogEntry, Exercise, PronunciationItem } from '../../types'

// Accès Jujularage : phrases à traduire, prononciation, nouveautés.

const tr = 'Traduis en anglais.'
const trFr = 'Traduis en français.'

/** Petites phrases à traduire : réponse tolérante (majuscules, ponctuation, contractions, une faute de frappe). */
export const jujuTranslations: Exercise[] = [
  { kind: 'transform', id: 'jj-tr-01', level: 'A1', instruction: tr, prompt: "Je m'appelle Julien.", answers: ['My name is Julien.', "My name's Julien.", "I'm Julien.", 'I am Julien.'] },
  { kind: 'transform', id: 'jj-tr-02', level: 'A1', instruction: tr, prompt: 'Je suis belge.', answers: ["I'm Belgian.", 'I am Belgian.'], explanation: 'Les nationalités prennent une majuscule : Belgian.' },
  { kind: 'transform', id: 'jj-tr-03', level: 'A1', instruction: tr, prompt: "J'ai faim et j'ai soif.", answers: ["I'm hungry and I'm thirsty.", "I'm hungry and thirsty.", 'I am hungry and I am thirsty.', 'I am hungry and thirsty.'], explanation: 'Avoir faim / soif = BE hungry / thirsty.' },
  { kind: 'transform', id: 'jj-tr-04', level: 'A1', instruction: tr, prompt: "Je n'aime pas le café.", answers: ["I don't like coffee.", 'I do not like coffee.'], explanation: 'Pas de « the » pour parler de quelque chose en général.' },
  { kind: 'transform', id: 'jj-tr-05', level: 'A1', instruction: tr, prompt: 'Mon frère habite à Bruxelles.', answers: ['My brother lives in Brussels.'], explanation: 'He → lives ; habiter À une ville = live IN.' },
  { kind: 'transform', id: 'jj-tr-06', level: 'A1', instruction: tr, prompt: 'Où est la salle de bain ?', answers: ['Where is the bathroom?', "Where's the bathroom?", 'Where is the toilet?', "Where's the toilet?"] },
  { kind: 'transform', id: 'jj-tr-07', level: 'A1', instruction: tr, prompt: 'Il fait froid aujourd\'hui.', answers: ["It's cold today.", 'It is cold today.', "Today it's cold.", "It's cold today!"] },
  { kind: 'transform', id: 'jj-tr-08', level: 'A1', instruction: tr, prompt: 'Combien ça coûte ?', answers: ['How much is it?', 'How much does it cost?', "How much is this?", 'How much does this cost?'] },
  { kind: 'transform', id: 'jj-tr-09', level: 'A2', instruction: tr, prompt: 'Je suis en train de cuisiner.', answers: ["I'm cooking.", 'I am cooking.'] },
  { kind: 'transform', id: 'jj-tr-10', level: 'A2', instruction: tr, prompt: 'Nous sommes allés au cinéma hier.', answers: ['We went to the cinema yesterday.', 'We went to the movies yesterday.', 'Yesterday we went to the cinema.', 'Yesterday, we went to the cinema.'], explanation: 'Hier → past simple : went.' },
  { kind: 'transform', id: 'jj-tr-11', level: 'A2', instruction: tr, prompt: "Je n'ai pas vu le match.", answers: ["I didn't see the match.", "I didn't see the game.", "I didn't watch the match.", "I didn't watch the game.", 'I did not see the match.', 'I did not watch the match.'], explanation: 'Si le moment est terminé : past simple. didn\'t + verbe de base.' },
  { kind: 'transform', id: 'jj-tr-12', level: 'A2', instruction: tr, prompt: 'Demain, je vais travailler de la maison.', answers: ["Tomorrow, I'm going to work from home.", "Tomorrow I'm going to work from home.", "I'm going to work from home tomorrow.", "Tomorrow I'll work from home.", "Tomorrow, I'll work from home.", "I'll work from home tomorrow.", "Tomorrow I'm working from home.", "I'm working from home tomorrow."] },
  { kind: 'transform', id: 'jj-tr-13', level: 'A2', instruction: tr, prompt: 'Ma copine a deux chats.', answers: ['My girlfriend has two cats.', "My girlfriend's got two cats.", 'My girlfriend has got two cats.'] },
  { kind: 'transform', id: 'jj-tr-14', level: 'A2', instruction: tr, prompt: 'Le chien dort sous la table.', answers: ['The dog is sleeping under the table.', "The dog's sleeping under the table.", 'The dog sleeps under the table.'] },
  { kind: 'transform', id: 'jj-tr-15', level: 'A2', instruction: tr, prompt: 'Je préfère la bière au vin.', answers: ['I prefer beer to wine.'], explanation: 'Préférer A à B = prefer A TO B.' },
  { kind: 'transform', id: 'jj-tr-16', level: 'A2', instruction: tr, prompt: "Ce n'est pas mon truc.", answers: ["It's not my cup of tea.", "It isn't my cup of tea.", "It's not my thing.", 'It is not my cup of tea.'] },
  { kind: 'transform', id: 'jj-tr-17', level: 'A2', instruction: tr, prompt: 'Il pleut des cordes !', answers: ["It's raining cats and dogs!", 'It is raining cats and dogs!'] },
  { kind: 'transform', id: 'jj-tr-18', level: 'A2', instruction: tr, prompt: "Je suis d'accord avec toi.", answers: ['I agree with you.'], explanation: '✗ I am agree.' },
  { kind: 'transform', id: 'jj-tr-19', level: 'A2', instruction: tr, prompt: "J'ai commencé ce travail il y a deux ans.", answers: ['I started this job two years ago.', 'I started this job 2 years ago.'], explanation: 'Il y a + durée = … AGO (à la fin), avec le past simple.' },
  { kind: 'transform', id: 'jj-tr-20', level: 'A2', instruction: tr, prompt: 'Tu peux parler plus lentement, s\'il te plaît ?', answers: ['Can you speak more slowly, please?', 'Could you speak more slowly, please?', 'Can you speak slower, please?', 'Could you speak slower, please?'] },
  { kind: 'transform', id: 'jj-tr-21', level: 'A2', instruction: tr, prompt: 'En fait, je ne suis pas fatigué.', answers: ["Actually, I'm not tired.", 'Actually, I am not tired.', "Actually I'm not tired."], explanation: 'En fait = actually (faux-ami : actuellement = currently).' },
  { kind: 'transform', id: 'jj-tr-22', level: 'B1', instruction: tr, prompt: 'As-tu déjà goûté une trappiste ?', answers: ['Have you ever tasted a Trappist beer?', 'Have you ever tried a Trappist beer?', 'Have you ever tasted a Trappist?', 'Have you ever tried a Trappist?', 'Have you ever had a Trappist beer?'], explanation: 'Expérience de vie (déjà) → Have you ever + participe passé.' },
  { kind: 'transform', id: 'jj-tr-23', level: 'A1', instruction: trFr, prompt: 'My sister has a black dog.', answers: ['Ma sœur a un chien noir.', 'Ma soeur a un chien noir.'] },
  { kind: 'transform', id: 'jj-tr-24', level: 'A1', instruction: trFr, prompt: "I'm thirsty.", answers: ["J'ai soif."] },
  { kind: 'transform', id: 'jj-tr-25', level: 'A2', instruction: trFr, prompt: "It's my round!", answers: ["C'est ma tournée !", "C'est ma tournée"] },
  { kind: 'transform', id: 'jj-tr-26', level: 'A2', instruction: trFr, prompt: 'I went to the gym yesterday.', answers: ['Je suis allé à la salle de sport hier.', 'Je suis allée à la salle de sport hier.', 'Hier, je suis allé à la salle de sport.', 'Je suis allé à la salle hier.', 'Je suis allé au fitness hier.'] },
  { kind: 'transform', id: 'jj-tr-27', level: 'A2', instruction: trFr, prompt: 'We are going to visit a brewery.', answers: ['Nous allons visiter une brasserie.', 'On va visiter une brasserie.'] },
  { kind: 'transform', id: 'jj-tr-28', level: 'A2', instruction: tr, prompt: "L'équipe a perdu le match.", answers: ['The team lost the match.', 'The team lost the game.'], explanation: 'lose → lost.' },
  { kind: 'transform', id: 'jj-tr-29', level: 'A2', instruction: tr, prompt: 'Les cellules poussent à 37 degrés.', answers: ['The cells grow at 37 degrees.', 'Cells grow at 37 degrees.', 'The cells grow at 37 °C.', 'Cells grow at 37 °C.', 'The cells grow at thirty-seven degrees.'] },
  { kind: 'transform', id: 'jj-tr-30', level: 'A2', instruction: tr, prompt: "On se voit au pub à huit heures !", answers: ['See you at the pub at eight!', "See you at the pub at 8!", "See you at the pub at eight o'clock!", "Let's meet at the pub at eight!"] },
]

/** Prononciation : les mots qui piègent les francophones. */
export const jujuPronunciation: PronunciationItem[] = [
  { id: 'jj-p-th', word: 'think / three / the', guide: 'THINK (langue entre les dents)', tip: 'Le « th » : la langue entre les dents, on souffle. Ni « s », ni « z », ni « f ».', example: 'I think there are three.' },
  { id: 'jj-p-beer', word: 'beer', guide: 'BEE-er', tip: '« ii » long. Ne pas confondre avec bear (ours) : BÈ-er.', example: 'A cold beer, please.' },
  { id: 'jj-p-brewery', word: 'brewery', guide: 'BROO-uh-ree', tip: '« ew » se prononce « ou ».', example: 'We visited a brewery.' },
  { id: 'jj-p-yeast', word: 'yeast', guide: 'YEEST', tip: 'Le « y » se prononce comme dans « yes ».', example: 'Add the yeast.' },
  { id: 'jj-p-hungry', word: 'hungry / angry', guide: 'HUNG-gree / ANG-gree', tip: 'Le « h » est soufflé : hungry (faim) ≠ angry (en colère) !', example: "I'm hungry, not angry!" },
  { id: 'jj-p-house', word: 'house / hour', guide: 'HAOUSS / AOU-er', tip: 'Le « h » est soufflé dans house, muet dans hour.', example: 'One hour at home, in my house.' },
  { id: 'jj-p-wednesday', word: 'Wednesday', guide: 'WENZ-day', tip: 'Le « d » et le 2e « e » ne se prononcent pas.', example: 'See you on Wednesday.' },
  { id: 'jj-p-colleague', word: 'colleague', guide: 'KOL-eeg', tip: 'Deux syllabes, accent sur la première.', example: 'My colleague is English.' },
  { id: 'jj-p-plasmid', word: 'plasmid', guide: 'PLAZ-mid', tip: 'Le « s » se prononce « z ».', example: 'We produce plasmid DNA.' },
  { id: 'jj-p-bacteria', word: 'bacteria', guide: 'bak-TEER-ee-uh', tip: 'Accent sur « TEER ».', example: 'Bacteria grow fast.' },
  { id: 'jj-p-vegetables', word: 'vegetables', guide: 'VEJ-tuh-buls', tip: 'Trois syllabes seulement.', example: 'I eat a lot of vegetables.' },
  { id: 'jj-p-world', word: 'world', guide: 'WURLD', tip: 'Un seul son « eur », pas « wo-ld ».', example: 'The best beer in the world.' },
]

export const jujuChangelog: ChangelogEntry[] = [
  {
    version: 9,
    date: '2026-10-24',
    title: 'Plus fiable, plus rapide ⚡',
    changes: [
      'Des tests automatiques vérifient maintenant la correction des réponses avant chaque mise à jour de l’appli.',
      'L’appli démarre plus vite : le contenu de chaque accès est chargé séparément.',
    ],
  },
  {
    version: 8,
    date: '2026-10-24',
    title: 'Parler plus et voir en français 🎭',
    changes: [
      'Nouveau jeu de rôle : choisis un personnage d’un dialogue, l’appli joue les autres avec leurs voix et tu dis tes répliques à voix haute (la reconnaissance vocale te dit si c’est bon). Aussi dans le Parcours, après chaque dialogue (facultatif).',
    ],
  },
  {
    version: 7,
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
    date: '2026-10-20',
    title: 'Un parcours guidé 🧭',
    changes: [
      'Nouvel onglet « Parcours » : chaque module devient une leçon découpée en petites étapes qui se débloquent au fur et à mesure.',
      'Chaque leçon affiche « Au programme » : les mots, les points de grammaire, le dialogue et le texte qui seront vus.',
      'Les mots sont d’abord découverts dans une phrase (avec l’audio, et la possibilité de les répéter à voix haute), puis revus dans d’autres contextes.',
      'Les exercices montent en difficulté : choisir, écouter, compléter, puis taper soi-même. La grammaire commence par des exemples à observer.',
      'Lexie 👶 a son propre parcours (onglet Parcours ou accueil), indépendant de tes leçons habituelles.',
      'Pour sauter des étapes : Parcours → « Tout débloquer ». Les anciens cours et modules restent accessibles librement.',
    ],
  },
  {
    version: 3,
    date: '2026-10-17',
    title: 'Nouveau parcours : Lexie 👶',
    changes: [
      'Six modules pour parler anglais avec un tout-petit, du plus simple au plus riche : mots doux, biberon et repas, change, bain et dodo, s\'habiller et la crèche, jouer et chanter, émotions et sécurité.',
      '83 mots et expressions en 6 paquets, avec les différences UK / US (nappy / diaper, nursery / daycare, dummy / pacifier).',
      "Une leçon « Let's…, Don't…, Do you want…? », 34 phrases à traduire, des comptines, un dialogue « A morning with Lexie » et 5 conseils pour élever un bébé en anglais.",
    ],
  },
  {
    version: 2,
    date: '2026-10-16',
    title: 'Rappel quotidien 🔔',
    changes: [
      "Un rappel chaque jour à l'heure de ton choix : dans ton agenda (le plus fiable) et/ou en notification de l'appli installée.",
      "La notification ne s'affiche pas si tu as déjà fait un exercice ce jour-là.",
    ],
  },
  {
    version: 1,
    date: '2026-10-16',
    title: 'Bienvenue, Jujularage ! 🍺',
    changes: [
      '15 leçons de grammaire : be, have, a / an / the, pluriels, possessifs, there is, in / on / at, can, questions, comparatifs, present simple et continuous, passé, futur, et un avant-goût du present perfect.',
      '12 paquets de vocabulaire : famille, animaux, couleurs, maison, temps, manger et boire, bière et zythologie, sport, science, travail en CDMO, idiomes et mots pour parler avec fluidité.',
      '7 modules thématiques avec expressions clés, oral, écrit, lectures et dialogues.',
      '30 petites phrases à traduire (français ↔ anglais), corrigées avec tolérance.',
      'Mode daltonien activé : bleu = juste, orange = erreur (modifiable dans Progrès → Réglages).',
    ],
  },
]
