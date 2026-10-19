// Expérience (XP) et niveaux : toute la gamification est calculée ici.
// L'XP est stockée dans la progression (`xp`, `xpByDay`), jamais recalculée à partir de rien :
// changer ces barèmes ne fait perdre aucun point déjà gagné.
import type { Exercise } from '../types'
import type { ProgressData } from './store'
import { EDITION } from '../edition'

export type AnswerQuality = 'perfect' | 'typo' | 'override' | 'wrong'

const LEVEL_XP = { A1: 10, A2: 11, B1: 12, B2: 10, 'B2+': 12, C1: 15 } as const

/** XP d'une réponse. Une réponse parfaite rapporte plus qu'une réponse acceptée avec une faute de frappe. */
export function answerXp(ex: Exercise, quality: AnswerQuality, combo = 0): number {
  if (quality === 'wrong') return 2 // l'effort compte un peu
  let base: number = LEVEL_XP[ex.level ?? 'B2']
  if (ex.kind === 'card') base = Math.round(base * 0.6)
  if (ex.kind === 'fix' || ex.kind === 'transform' || ex.kind === 'cloze') base += 3 // réécrire une phrase entière
  const factor = quality === 'perfect' ? 1 : quality === 'typo' ? 0.7 : 0.5
  return Math.round(base * factor) + comboBonus(combo)
}

/** Bonus de série : +1 XP par bonne réponse d'affilée au-delà de la 2e, plafonné à +5. */
export function comboBonus(combo: number): number {
  return Math.max(0, Math.min(5, combo - 2))
}

/** Bonus de session sans aucune erreur (au moins 5 questions) : +50 % de l'XP de la session. */
export function perfectBonus(sessionXp: number, total: number, errors: number): number {
  return total >= 5 && errors === 0 ? Math.round(sessionXp * 0.5) : 0
}

export const ACTIVITY_XP = {
  dictation: 6,
  speakingRepeat: 4,
  speakingFree: 15,
  writing: 30,
  writingAllPhrases: 15,
}

/** XP d'un texte enregistré dans l'atelier : bonus si toutes les expressions cibles sont placées. */
export function writingXp(used: number, total: number): number {
  return ACTIVITY_XP.writing + (total > 0 && used >= total ? ACTIVITY_XP.writingAllPhrases : 0)
}

/** XP nécessaire pour passer du niveau n au niveau n+1 : chaque niveau demande un peu plus que le précédent. */
export function xpToNext(level: number): number {
  return 100 + 30 * (level - 1)
}

export interface LevelInfo {
  level: number
  /** XP gagnée depuis le début du niveau en cours. */
  into: number
  /** XP nécessaire pour finir le niveau en cours. */
  needed: number
  rank: Rank
}

export function levelInfo(totalXp: number): LevelInfo {
  let level = 1
  let rest = Math.max(0, Math.floor(totalXp))
  while (rest >= xpToNext(level)) {
    rest -= xpToNext(level)
    level++
  }
  return { level, into: rest, needed: xpToNext(level), rank: rankOf(level) }
}

export interface Rank {
  from: number
  title: string
  fr: string
  icon: string
}

// Les grades, du touriste perdu à Londres au chevalier de la langue anglaise.
export const RANKS: Rank[] = [
  { from: 1, title: 'Lost Tourist', fr: 'Touriste égaré à Londres', icon: '🧳' },
  { from: 3, title: 'Tea Apprentice', fr: 'Apprenti du thé de 17 h', icon: '🫖' },
  { from: 6, title: 'Pub Quiz Regular', fr: 'Habitué du quiz du pub', icon: '🍺' },
  { from: 9, title: 'Double-Decker Driver', fr: 'Chauffeur de bus à impériale', icon: '🚌' },
  { from: 12, title: 'Black Cab Driver', fr: 'Chauffeur de taxi londonien (il connaît tout par cœur)', icon: '🚕' },
  { from: 15, title: 'Queue Champion', fr: 'Champion de la file d\'attente', icon: '🧍' },
  { from: 18, title: "King's Guard", fr: 'Garde royal (impassible, même face au present perfect)', icon: '💂' },
  { from: 22, title: 'BBC Newsreader', fr: 'Présentateur du journal de la BBC', icon: '📻' },
  { from: 26, title: 'Oxford Don', fr: 'Professeur à Oxford', icon: '🎓' },
  { from: 30, title: 'Shakespearean Actor', fr: 'Acteur du Globe Theatre', icon: '🎭' },
  { from: 35, title: 'Knight of the Realm', fr: 'Chevalier du royaume', icon: '⚔️' },
  { from: 40, title: 'Royal Highness of English', fr: 'Altesse royale de l\'anglais', icon: '👑' },
]

// Grades de l'accès Nunu (néerlandais) : de la Belgique aux Pays-Bas, en passant par les frites.
export const RANKS_NL: Rank[] = [
  { from: 1, title: 'Verdwaalde toerist', fr: 'Touriste égaré', icon: '🧳' },
  { from: 3, title: 'Frietjes-leerling', fr: 'Apprenti du cornet de frites', icon: '🍟' },
  { from: 6, title: 'Fietser', fr: 'Cycliste du dimanche', icon: '🚲' },
  { from: 9, title: 'Tulpenplukker', fr: 'Cueilleur de tulipes', icon: '🌷' },
  { from: 12, title: 'Molenaar', fr: 'Meunier du moulin', icon: '🌬️' },
  { from: 15, title: 'Kaasboer', fr: 'Fromager d\'Alkmaar', icon: '🧀' },
  { from: 18, title: 'Gids in Brugge', fr: 'Guide à Bruges', icon: '🏰' },
  { from: 22, title: 'Nieuwslezer', fr: 'Présentateur du journal télévisé', icon: '📻' },
  { from: 26, title: 'Taalprofessor', fr: 'Professeur de langue', icon: '🎓' },
  { from: 30, title: 'Dichter', fr: 'Poète', icon: '🖋️' },
  { from: 35, title: 'Ridder', fr: 'Chevalier du royaume', icon: '⚔️' },
  { from: 40, title: 'Koning van het Nederlands', fr: 'Roi (ou reine) du néerlandais', icon: '👑' },
]

/** Liste des grades de l'accès en cours. */
export const RANK_LIST: Rank[] = EDITION.lang === 'nl' ? RANKS_NL : RANKS

export function rankOf(level: number): Rank {
  let r = RANK_LIST[0]
  for (const rank of RANK_LIST) if (level >= rank.from) r = rank
  return r
}

/** Estimation de l'XP déjà « gagnée » avant l'arrivée de la gamification (migration). */
export function retroactiveXp(data: Pick<ProgressData, 'attempts' | 'writing'>): number {
  let xp = 0
  for (const a of Object.values(data.attempts)) xp += a.ok * 10 + a.ko * 2
  xp += data.writing.length * ACTIVITY_XP.writing
  return xp
}
