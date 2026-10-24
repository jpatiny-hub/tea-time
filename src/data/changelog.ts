import type { ChangelogEntry } from '../types'
import { extra } from './edition-content.ts'

// Journal des mises à jour de contenu. À chaque ajout, créer une nouvelle entrée avec
// `version` = précédente + 1 : l'accueil affichera une bannière « Nouveautés ».
const jojoChangelog: ChangelogEntry[] = [
  {
    version: 12,
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
    version: 11,
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
    version: 10,
    date: '2026-10-20',
    title: 'Un parcours guidé 🧭',
    changes: [
      'Nouvel onglet « Parcours » : chaque module devient une leçon découpée en petites étapes qui se débloquent au fur et à mesure.',
      'Chaque leçon affiche « Au programme » : les mots, les points de grammaire, le dialogue et le texte qui seront vus.',
      'Les mots sont d’abord découverts dans une phrase (avec l’audio, et la possibilité de les répéter à voix haute), puis revus dans d’autres contextes.',
      'Les exercices montent en difficulté : choisir, écouter, compléter, puis taper soi-même. La grammaire commence par des exemples à observer.',
      'Tes corrections de cours reviennent sous forme d’étapes « Mes corrections ».',
      'Pour sauter des étapes : Parcours → « Tout débloquer ». Les anciens cours et modules restent accessibles librement.',
    ],
  },
  {
    version: 9,
    date: '2026-10-16',
    title: 'Deux accès et rappel quotidien',
    changes: [
      "Écran de choix de l'accès (Jojo / Jujularage) : chaque accès a sa propre progression. Ta progression est intacte.",
      "Rappel quotidien (Progrès → Réglages) : événement dans l'agenda et/ou notification de l'appli installée.",
      'Mode daltonien disponible dans les réglages.',
    ],
  },
  {
    version: 8,
    date: '2026-10-16',
    title: 'Niveaux, expérience et nouveau logo 🫖',
    changes: [
      "Expérience (XP) : chaque exercice en rapporte, davantage pour le C1, les réponses sans faute et les séries de bonnes réponses ; +50 % pour une session sans erreur. L'écrit et l'oral rapportent aussi.",
      "Niveaux de plus en plus exigeants et grades « so British » : de Lost Tourist à Royal Highness of English. Ton XP de départ a été calculée d'après tes réponses passées.",
      'Nouveau logo : une tasse de thé à chapeau melon, moustache et monocle sur fond d\'Union Jack.',
      "Correctif : la barre de navigation s'aligne sur les encadrés et l'onglet actif s'affiche sur toutes les pages.",
    ],
  },
  {
    version: 7,
    date: '2026-10-15',
    title: 'Spécial Halloween 🎃 et nouveau look',
    changes: [
      'Nouvelle rubrique « Thèmes & culture » (accueil et Pratique) avec une leçon Halloween : origines, traditions, films et livres cultes, Bonfire Night, superstitions.',
      '54 mots et expressions (citrouilles, fantômes… et des idiomes utiles au travail : skeleton staff, graveyard shift, ghosting, dead in the water, witch hunt).',
      "32 exercices (dont first conditional, temps du récit et must have / can't have), une lecture sur l'histoire d'Halloween, un dialogue et une histoire qui fait peur à écrire.",
      'Nouvelle interface : police plus ronde, une couleur par rubrique, accueil repensé et barre de navigation flottante. Ta progression est conservée.',
    ],
  },
  {
    version: 6,
    date: '2026-10-15',
    title: 'Cours du 14.10 et fiche « Asking for and Giving Explanations »',
    changes: [
      'Cours du 14.10 : 10 mots, 19 corrections (plusieurs erreurs récurrentes signalées) et les notes « be used to + -ing » et « admit / accept ».',
      'Module « Explanations » : expressions clés de la fiche B2, 9 sujets d\'oral (dont les 3 scénarios « justifier une décision »), 8 nouveaux exercices.',
      'Nouveau dialogue « Corporate travel policy » et nouveau sujet d\'écrit : justifier une décision à ta direction.',
      'Leçon « Mots souvent confondus » : point admit / accept et 3 exercices.',
    ],
  },
  {
    version: 5,
    date: '2026-10-10',
    title: 'Consignes précisées, synonymes et changement de perspective',
    changes: [
      'Nouvelle série « Changer de perspective » (16 exercices) : même sens, autre point de vue.',
      'Nouvelle série « Synonymes » (30 exercices) : mots de tes cours et mots passe-partout à remplacer.',
      "Relecture de tous les exercices de réécriture et des phrases à trous : une vingtaine de réponses correctes (synonymes, variantes) sont maintenant acceptées.",
      "« Réécris avec not as… as » : la consigne précise de garder le sens, et « Your car is not as expensive as mine » est désormais acceptée.",
      "« Mets en valeur avec What… is… » : nouvelle phrase de départ, réponses plus naturelles.",
    ],
  },
  {
    version: 4,
    date: '2026-10-09',
    title: 'Correctif des pages vides',
    changes: [
      "Le filet de sécurité surveille maintenant chaque changement de page : si l'écran reste vide, l'appli se recharge seule et te le signale.",
      'Effets graphiques suspects supprimés (flou de la barre du bas, animations au toucher) et protection étendue à toute l\'appli.',
    ],
  },
  {
    version: 3,
    date: '2026-10-08',
    title: 'Cours du 07.10 et vocabulaire à écrire',
    changes: [
      'Cours du 07.10 (Asking for and Giving Explanations) : 6 mots, 4 prononciations, 22 corrections et la note « The more…, the more… ».',
      "Vocabulaire : tu écris maintenant la traduction au lieu de retourner la carte. Les petites fautes d'orthographe sont acceptées et signalées ; « Je ne sais pas » montre la réponse.",
      '4 nouveaux exercices sur « The + comparatif…, the + comparatif… », 3 sujets d\'oral et 3 exercices d\'expressions dans le module « Explanations ».',
    ],
  },
  {
    version: 2,
    date: '2026-10-04',
    title: 'Cours du 30.09 et fiche « Making Assumptions »',
    changes: [
      'Nouveau module « Asking for and Giving Explanations » (cours du 30.09) : 14 mots, 4 prononciations, 14 corrections, expressions clés, dialogue, texte et sujet d\'écrit.',
      'Nouvelle leçon : questions indirectes et demandes polies (« Could you explain why… »).',
      'Module « Making Assumptions » : expressions clés de la fiche B2, 7 nouveaux sujets d\'oral, dialogue sur le produit solaire et 10 nouveaux exercices.',
      "Correctif : l'appli ne peut plus être traduite automatiquement par le navigateur (cause probable des pages vides) et se relance seule si une page reste vide.",
    ],
  },
  {
    version: 1,
    date: '2026-09-24',
    title: 'Première version',
    changes: [
      '12 séances de cours intégrées (24.06 → 23.09) : vocabulaire, prononciation, corrections et notes.',
      '5 modules thématiques avec les expressions clés des fiches B2.',
      '26 leçons de grammaire, dont 10 sur les temps (past simple, present perfect, past perfect, futurs…).',
      '97 verbes irréguliers, 6 paquets de vocabulaire « découverte », 30 mots de prononciation.',
      "Atelier d'écriture (12 sujets avec modèles), reformulation, lecture, écoute, dictée et oral.",
    ],
  },
]

export const changelog: ChangelogEntry[] = extra ? extra.changelog : jojoChangelog

export const CONTENT_VERSION = Math.max(...changelog.map((c) => c.version))
