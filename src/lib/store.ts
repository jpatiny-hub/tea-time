// Stockage de la progression — 100 % local (localStorage du téléphone), aucun serveur.
//
// Principes pour ne JAMAIS perdre le fil lors des mises à jour de l'appli :
// 1. Une seule clé versionnée (`english-app:progress`) avec un numéro de schéma.
//    Si la structure change un jour, on ajoute une étape dans `migrate()` au lieu d'effacer.
// 2. La progression est indexée par l'`id` stable de chaque contenu : ajouter du contenu
//    ne touche pas à l'existant, et un contenu supprimé laisse simplement une entrée orpheline.
// 3. La clé est préfixée : l'appli espagnole est servie depuis le même domaine
//    (jpatiny-hub.github.io), donc elle partage le même localStorage. Pas de collision possible.
// 4. Export / import d'un fichier de sauvegarde JSON depuis la page « Progrès ».
import { useSyncExternalStore } from 'react'
import type { CardState } from './srs'
import { retroactiveXp } from './xp'
import { EDITION, type ThemeMode } from '../edition'

// Une clé par accès (Jojo : 'english-app:progress', inchangée depuis le début).
export const STORAGE_KEY = EDITION.storageKey
export const SCHEMA_VERSION = 2

export type FontScale = 'normal' | 'large' | 'xlarge'

export interface Attempt {
  ok: number
  ko: number
  /** Date ISO de la dernière tentative. */
  last: string
  /** Résultat de la dernière tentative. */
  lastOk: boolean
}

/** Un mot que l'utilisateur veut retravailler (ajouté en touchant un mot dans un exercice). */
export interface MyWord {
  /** Le mot dans la langue apprise (forme de base). */
  en: string
  fr: string
  added: string
  /** La phrase où il a été rencontré. */
  example?: string
}

export interface WritingEntry {
  id: string
  taskId: string
  date: string
  text: string
  words: number
  phrasesUsed: number
  phrasesTotal: number
}

export interface Settings {
  /** Voix et reconnaissance vocale : accent anglais, ou néerlandais de Belgique / des Pays-Bas pour l'accès Nunu. */
  accent: 'en-GB' | 'en-US' | 'nl-BE' | 'nl-NL'
  rate: number
  /** Sens des flashcards : anglais → français, français → anglais, ou mélangé. */
  cardDirection: 'en-fr' | 'fr-en' | 'mixte'
  newCardsPerSession: number
  /** Apparence : clair, sombre, ou selon le téléphone. */
  theme: ThemeMode
  /** Taille du texte dans toute l'appli. */
  fontScale: FontScale
  /** Palette adaptée au daltonisme (deutéranopie) : bleu / orange au lieu de vert / rouge / rose. */
  colorBlind: boolean
  /** Rappel quotidien (notification de l'appli installée). */
  reminderEnabled: boolean
  /** Heure à partir de laquelle le rappel peut arriver. */
  reminderHour: number
  /** Encart « Active ton rappel » masqué sur l'accueil. */
  reminderPromptDismissed: boolean
  /** Aide vocabulaire : toucher un mot d'un exercice, d'un texte ou d'un dialogue pour voir sa traduction. */
  wordHelp: boolean
  /** Parcours guidé : toutes les leçons et étapes sont accessibles sans suivre l'ordre. */
  pathFree: boolean
}

export interface ProgressData {
  schema: number
  createdAt: string
  /** Répétition espacée : un état par id de contenu (exercice, carte, leçon). */
  srs: Record<string, CardState>
  /** Historique des réponses par id d'exercice. */
  attempts: Record<string, Attempt>
  /** Réussites / échecs par étiquette (ex. 'present-perfect') pour repérer les points faibles. */
  tagStats: Record<string, { ok: number; ko: number }>
  /** « Mes mots à retravailler » : clé = forme de base du mot. */
  myWords: Record<string, MyWord>
  /** Étapes cochées dans les modules de cours : `${moduleId}:${step}`. */
  steps: Record<string, boolean>
  /** Nombre de réponses données par jour (AAAA-MM-JJ) — pour la série de jours. */
  activity: Record<string, number>
  writing: WritingEntry[]
  drafts: Record<string, string>
  /** Plus haute version de contenu déjà vue (pour la bannière « Nouveautés »). */
  seenContentVersion: number
  lastBackupAt: string | null
  settings: Settings
  /** Expérience totale (gamification, voir src/lib/xp.ts). */
  xp: number
  /** XP gagnée par jour (AAAA-MM-JJ). */
  xpByDay: Record<string, number>
}

export const DEFAULT_SETTINGS: Settings = {
  accent: EDITION.speechDefault,
  rate: 0.95,
  cardDirection: 'mixte',
  newCardsPerSession: 10,
  theme: EDITION.themeDefault,
  fontScale: 'normal',
  colorBlind: EDITION.colorBlindDefault,
  reminderEnabled: false,
  reminderHour: 19,
  reminderPromptDismissed: false,
  pathFree: false,
  wordHelp: EDITION.id !== 'jojo',
}

function emptyData(): ProgressData {
  return {
    schema: SCHEMA_VERSION,
    createdAt: new Date().toISOString(),
    srs: {},
    attempts: {},
    tagStats: {},
    steps: {},
    myWords: {},
    activity: {},
    writing: [],
    drafts: {},
    seenContentVersion: 0,
    lastBackupAt: null,
    settings: { ...DEFAULT_SETTINGS },
    xp: 0,
    xpByDay: {},
  }
}

// Remet d'aplomb n'importe quelle donnée lue (ancienne version, fichier importé…).
// Toujours additif : on complète ce qui manque, on ne jette rien de ce qui existe.
export function migrate(raw: unknown): ProgressData {
  const base = emptyData()
  if (!raw || typeof raw !== 'object') return base
  const data = raw as Partial<ProgressData>

  // Schéma 2 : arrivée de l'expérience. L'XP de départ est estimée d'après les réponses déjà données.
  const xp = typeof data.xp === 'number' ? data.xp : retroactiveXp({ attempts: data.attempts ?? {}, writing: Array.isArray(data.writing) ? data.writing : [] })

  return {
    ...base,
    ...data,
    schema: SCHEMA_VERSION,
    srs: { ...(data.srs ?? {}) },
    attempts: { ...(data.attempts ?? {}) },
    tagStats: { ...(data.tagStats ?? {}) },
    steps: { ...(data.steps ?? {}) },
    myWords: { ...(data.myWords ?? {}) },
    activity: { ...(data.activity ?? {}) },
    writing: Array.isArray(data.writing) ? data.writing : [],
    drafts: { ...(data.drafts ?? {}) },
    settings: { ...DEFAULT_SETTINGS, ...(data.settings ?? {}) },
    xp,
    xpByDay: { ...(data.xpByDay ?? {}) },
  }
}

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? migrate(JSON.parse(raw)) : emptyData()
  } catch {
    return emptyData()
  }
}

let state: ProgressData = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // stockage indisponible (navigation privée, quota) : on garde l'état en mémoire
  }
}

export function getProgress(): ProgressData {
  return state
}

export function updateProgress(fn: (draft: ProgressData) => ProgressData) {
  state = fn(state)
  persist()
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Synchronise si l'appli est ouverte dans deux onglets.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  })
}

export function useProgress(): ProgressData {
  return useSyncExternalStore(subscribe, getProgress, getProgress)
}

// Demande au navigateur de ne pas effacer nos données en cas de manque d'espace.
export async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) {
      await navigator.storage.persist()
    }
  } catch {
    // non supporté : sans importance
  }
}

// ---------------------------------------------------------------------------
// Sauvegarde / restauration
// ---------------------------------------------------------------------------

interface BackupFile {
  app: 'english-application'
  schema: number
  exportedAt: string
  data: ProgressData
}

export function exportBackup(): string {
  const now = new Date().toISOString()
  updateProgress((d) => ({ ...d, lastBackupAt: now }))
  const file: BackupFile = { app: 'english-application', schema: SCHEMA_VERSION, exportedAt: now, data: state }
  return JSON.stringify(file, null, 1)
}

export function importBackup(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<BackupFile>
    if (parsed.app !== 'english-application' || !parsed.data) {
      return { ok: false, error: "Ce fichier n'est pas une sauvegarde de cette appli." }
    }
    const data = migrate(parsed.data)
    updateProgress(() => data)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Fichier illisible.' }
  }
}

export function resetProgress() {
  const settings = state.settings
  updateProgress(() => ({ ...emptyData(), settings }))
}
