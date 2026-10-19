// Les « accès » (éditions) de l'appli : même moteur, même design, contenu et progression séparés.
// - Jojo : anglais B2 → C1, cours Accent Lang (l'appli d'origine).
// - Jujularage : anglais A1 → A2, bases + ses passions (bière, sport, biologie, CDMO) + parcours Lexie.
// - Maman : anglais A1 → A2/B1, vie quotidienne, grammaire de base (elle maîtrise l'anglais technique, pas l'anglais scolaire).
// - Nunu : néerlandais depuis zéro (A0 → A1/A2), vie quotidienne et enfants.
// L'accès choisi est mémorisé sur l'appareil ; chaque accès a SA progression (clé de stockage distincte).
// Changer d'accès recharge l'appli : les données de contenu sont choisies au chargement.
import type { Level } from './types'

export type EditionId = 'jojo' | 'jujularage' | 'maman' | 'nunu'
export type AppLang = 'en' | 'nl'
export type ThemeMode = 'auto' | 'light' | 'dark'

export interface Edition {
  id: EditionId
  name: string
  icon: string
  tagline: string
  /** Texte de présentation sur l'écran de choix de l'accès. */
  pickerLevel: string
  pickerBlurb: string
  pickerGradient: string
  /** Langue apprise : sert à la voix, à la reconnaissance vocale, à la comparaison des réponses et aux libellés. */
  lang: AppLang
  /** Nom de la langue en français (« anglais », « néerlandais »). */
  langName: string
  /** Niveaux couverts, du plus facile au plus difficile. */
  levels: Level[]
  /** Clé de la progression dans le stockage local. Ne JAMAIS la changer. */
  storageKey: string
  /** Palette adaptée au daltonisme activée par défaut. */
  colorBlindDefault: boolean
  /** Apparence par défaut (clair imposé pour Maman et Nunu, le reste suit le téléphone). */
  themeDefault: ThemeMode
  /** Voix et reconnaissance vocale par défaut. */
  speechDefault: 'en-GB' | 'nl-BE'
  /** Titre de l'événement du rappel dans l'agenda. */
  reminderTitle: string
  /** Salutations du bandeau d'accueil : matin / après-midi / soir. */
  greetings: [string, string, string]
}

export const EDITIONS: Record<EditionId, Edition> = {
  jojo: {
    id: 'jojo',
    name: 'Jojo',
    icon: '🫖',
    tagline: 'Du B2 vers le C1, un peu chaque jour.',
    pickerLevel: 'B2 → C1',
    pickerBlurb: 'Cours Accent Lang, temps du passé, rédaction, expressions et vocabulaire avancé.',
    pickerGradient: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    lang: 'en',
    langName: 'anglais',
    levels: ['B2', 'B2+', 'C1'],
    storageKey: 'english-app:progress',
    colorBlindDefault: false,
    themeDefault: 'auto',
    speechDefault: 'en-GB',
    reminderTitle: '🫖 English time!',
    greetings: ['Good morning!', 'Good afternoon!', 'Good evening!'],
  },
  jujularage: {
    id: 'jujularage',
    name: 'Jujularage',
    icon: '🍺',
    tagline: 'De A1 vers A2, step by step. Cheers!',
    pickerLevel: 'A1 → A2',
    pickerBlurb: 'Les bases (present simple, continuous, passé, futur), le vocabulaire du quotidien, la bière, le sport, la biologie, le travail en CDMO et le parcours Lexie.',
    pickerGradient: 'from-amber-500 via-orange-500 to-indigo-600',
    lang: 'en',
    langName: 'anglais',
    levels: ['A1', 'A2', 'B1'],
    storageKey: 'english-app:jujularage:progress',
    colorBlindDefault: true,
    themeDefault: 'auto',
    speechDefault: 'en-GB',
    reminderTitle: '🍺 English time! (Jujularage)',
    greetings: ['Good morning!', 'Good afternoon!', 'Good evening!'],
  },
  maman: {
    id: 'maman',
    name: 'Maman',
    icon: '🌼',
    tagline: 'Un peu d’anglais chaque jour, pas à pas.',
    pickerLevel: 'A1 → A2',
    pickerBlurb: "L'anglais de tous les jours : visiter une ville, recevoir des amis, la famille, les courses… avec les bases de grammaire, révisées au fil des thèmes.",
    pickerGradient: 'from-sky-500 via-cyan-500 to-teal-500',
    lang: 'en',
    langName: 'anglais',
    levels: ['A1', 'A2', 'B1'],
    storageKey: 'english-app:maman:progress',
    colorBlindDefault: false,
    themeDefault: 'light',
    speechDefault: 'en-GB',
    reminderTitle: '🌼 English time!',
    greetings: ['Good morning!', 'Good afternoon!', 'Good evening!'],
  },
  nunu: {
    id: 'nunu',
    name: 'Nunu',
    icon: '🌷',
    tagline: 'Stap voor stap : le néerlandais, pas à pas.',
    pickerLevel: 'Néerlandais · débutant',
    pickerBlurb: 'Les premiers pas en néerlandais : se présenter, la vie de tous les jours, parler avec les enfants, les bases de grammaire et de prononciation.',
    pickerGradient: 'from-orange-500 via-amber-500 to-sky-600',
    lang: 'nl',
    langName: 'néerlandais',
    levels: ['A1', 'A2'],
    storageKey: 'english-app:nunu:progress',
    colorBlindDefault: false,
    themeDefault: 'light',
    speechDefault: 'nl-BE',
    reminderTitle: '🌷 Nederlands time!',
    greetings: ['Goedemorgen!', 'Goedemiddag!', 'Goedenavond!'],
  },
}

export const EDITION_KEY = 'english-app:edition'

function isEditionId(v: unknown): v is EditionId {
  return typeof v === 'string' && Object.prototype.hasOwnProperty.call(EDITIONS, v)
}

function readEdition(): EditionId | null {
  // Scripts Node (npm run check-data) : EDITION=jujularage
  if (typeof window === 'undefined') {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.EDITION
    return isEditionId(env) ? env : 'jojo'
  }
  try {
    // Lien direct : …/?acces=jujularage
    const url = new URL(window.location.href)
    const param = url.searchParams.get('acces')
    if (isEditionId(param)) {
      localStorage.setItem(EDITION_KEY, param)
      url.searchParams.delete('acces')
      window.history.replaceState(null, '', url.pathname + url.search + url.hash)
    }
    const stored = localStorage.getItem(EDITION_KEY)
    return isEditionId(stored) ? stored : null
  } catch {
    return null
  }
}

/** Accès choisi (null tant que personne n'a choisi : l'écran de choix s'affiche). */
export const CHOSEN_EDITION: EditionId | null = readEdition()
export const EDITION: Edition = EDITIONS[CHOSEN_EDITION ?? 'jojo']
export const isJuju = EDITION.id === 'jujularage'
/** Vrai pour tous les accès sauf Jojo : contenu de niveau débutant (A1 → A2), sans séances de cours. */
export const isBasic = EDITION.id !== 'jojo'
/** Accès avec un parcours guidé de leçons (Maman et Nunu). */
export const isGuided = EDITION.id === 'maman' || EDITION.id === 'nunu'
export const isDutch = EDITION.lang === 'nl'

export function chooseEdition(id: EditionId) {
  try {
    localStorage.setItem(EDITION_KEY, id)
  } catch {
    // stockage indisponible : le choix ne sera pas mémorisé
  }
  window.location.hash = '#/'
  window.location.reload()
}
