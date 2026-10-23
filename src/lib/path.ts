// Parcours guidé (accès Maman et Nunu) : chaque thème devient une « leçon » découpée en étapes
// qui se débloquent au fur et à mesure. Tout est fabriqué à partir du contenu existant des thèmes
// (mots, phrases clés, grammaire, dialogue, lecture, exercices mêlés) : rien à écrire en double.
//
// Une étape = une courte phase « découverte » (on voit, on écoute, on répète) puis des exercices
// qui montent en difficulté : choisir parmi des propositions → écouter → compléter → taper soi-même.
// Les ids d'étapes (`${leçon}:${étape}`) portent la progression : ne pas les changer.
import type { CourseModule, Exercise, GapExercise, GrammarLesson, McqExercise, TransformExercise, VocabItem } from '../types'
import { modules } from '../data/modules.ts'
import { grammarLessons } from '../data/grammar.ts'
import { allDecks } from '../data/vocabulary.ts'
import { sessions } from '../data/sessions/index.ts'
import { dialogues } from '../data/dialogues.ts'
import { readingTexts } from '../data/reading.ts'
import { vocabCard } from '../data/content.ts'
import { shuffle } from './text.ts'
import type { ProgressData } from './store'

export type StepKind = 'words' | 'phrases' | 'grammar' | 'corrections' | 'dialogue' | 'reading' | 'practice' | 'recap' | 'write'

/** Deux parcours indépendants : le principal, et « Lexie » (accès Jujularage). */
export type Track = 'main' | 'lexie'

export interface PathStep {
  /** Identifiant dans l'adresse : `w1`, `g-nn-g-zijn`, `dialogue`… */
  key: string
  /** Identifiant complet, utilisé pour mémoriser la progression : `${unitId}:${key}`. */
  id: string
  unitId: string
  kind: StepKind
  icon: string
  title: string
  subtitle: string
  /** Facultatif : ne bloque pas la suite du parcours. */
  optional?: boolean
  /** Mots présentés (étapes « words »). */
  wordIds?: string[]
  lessonId?: string
  /** Numéro de la partie (étapes « practice » et « corrections »). */
  part?: number
}

export interface PathUnit {
  id: string
  track: Track
  /** Numéro de la leçon dans son parcours. */
  number: number
  module: CourseModule
  steps: PathStep[]
}

const CHUNK = 5
const PRACTICE_CHUNK = 10

const KIND_RANK: Record<Exercise['kind'], number> = { mcq: 0, gap: 1, cloze: 2, card: 3, transform: 4, fix: 5 }

/** Du plus simple (choisir) au plus exigeant (écrire une phrase entière). L'ordre d'origine est conservé à égalité. */
export function sortByDifficulty(list: Exercise[]): Exercise[] {
  return list.map((ex, i) => ({ ex, i })).sort((a, b) => KIND_RANK[a.ex.kind] - KIND_RANK[b.ex.kind] || a.i - b.i).map((x) => x.ex)
}

/** Garde la progression (choisir → compléter → écrire) mais mélange l'ordre des questions à l'intérieur de chaque type. */
export function shuffleWithinKinds(list: Exercise[]): Exercise[] {
  const groups = new Map<number, Exercise[]>()
  for (const ex of list) groups.set(KIND_RANK[ex.kind], [...(groups.get(KIND_RANK[ex.kind]) ?? []), ex])
  return [...groups.entries()].sort((a, b) => a[0] - b[0]).flatMap(([, g]) => shuffle(g))
}

// ---------------------------------------------------------------- construction du parcours

/** Mots d'un thème : paquets liés + vocabulaire des séances de cours (accès Jojo). */
function deckItems(mod: CourseModule): VocabItem[] {
  const fromSessions = sessions.filter((x) => x.module === mod.id).flatMap((x) => x.vocabulary)
  const fromDecks = (mod.deckIds ?? []).flatMap((id) => allDecks.find((d) => d.id === id)?.items ?? [])
  const seen = new Set<string>()
  return [...fromSessions, ...fromDecks].filter((w) => (seen.has(w.id) ? false : (seen.add(w.id), true)))
}

/** Les mots d'une leçon (tous les groupes). */
export const unitWords = (u: PathUnit): VocabItem[] => deckItems(u.module)

const corrections = (mod: CourseModule) => sessions.filter((x) => x.module === mod.id).flatMap((x) => x.corrections)

function chunkWords(items: VocabItem[]): VocabItem[][] {
  const chunks: VocabItem[][] = []
  const size = items.length > 30 ? CHUNK + 1 : CHUNK
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  // Un dernier groupe trop petit est rattaché au précédent.
  if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) {
    const last = chunks.pop()!
    chunks[chunks.length - 1].push(...last)
  }
  return chunks
}

function buildUnits(): PathUnit[] {
  const usedLessons: Record<Track, Set<string>> = { main: new Set(), lexie: new Set() }
  const usedWords: Record<Track, Set<string>> = { main: new Set(), lexie: new Set() }
  const counters: Record<Track, number> = { main: 0, lexie: 0 }
  return modules.map((mod) => {
    const track: Track = mod.group ? 'lexie' : 'main'
    const n = counters[track]++
    const uid = mod.id
    const make = (key: string, s: Omit<PathStep, 'key' | 'id' | 'unitId'>): PathStep => ({ key, id: `${uid}:${key}`, unitId: uid, ...s })
    // Un mot déjà vu dans une leçon précédente du même parcours n'est pas présenté une seconde fois (il reviendra dans les rappels).
    const fresh = deckItems(mod).filter((w) => !usedWords[track].has(w.id))
    fresh.forEach((w) => usedWords[track].add(w.id))
    const chunks = chunkWords(fresh)
    const wordSteps = chunks.map((c, i) =>
      make(`w${i + 1}`, { kind: 'words', icon: '🗂️', title: `Nouveaux mots ${i + 1}/${chunks.length}`, subtitle: `${c.length} mots à découvrir en contexte`, wordIds: c.map((x) => x.id) }),
    )
    const lessons = mod.grammarLessonIds
      .map((id) => grammarLessons.find((l) => l.id === id))
      .filter((l): l is GrammarLesson => !!l && !usedLessons[track].has(l.id))
    lessons.forEach((l) => usedLessons[track].add(l.id))
    const grammarSteps = lessons.map((l) => make(`g-${l.id}`, { kind: 'grammar', icon: '📖', title: l.title, subtitle: l.summary, lessonId: l.id }))

    // On alterne : quelques mots, un point de grammaire, quelques mots…
    const steps: PathStep[] = []
    const every = Math.max(1, Math.ceil(wordSteps.length / (grammarSteps.length + 1)))
    wordSteps.forEach((w, i) => {
      steps.push(w)
      if ((i + 1) % every === 0 && grammarSteps.length > 0 && steps.filter((s) => s.kind === 'grammar').length < grammarSteps.length) {
        steps.push(grammarSteps[steps.filter((s) => s.kind === 'grammar').length])
      }
    })
    grammarSteps.filter((g) => !steps.includes(g)).forEach((g) => steps.push(g))

    if (mod.keyPhrases.length > 0) steps.push(make('phrases', { kind: 'phrases', icon: '💬', title: 'Phrases utiles', subtitle: 'Écouter, répéter et écrire les phrases du thème' }))
    if (mod.dialogueId) steps.push(make('dialogue', { kind: 'dialogue', icon: '🎧', title: 'Écouter un dialogue', subtitle: 'Une conversation de la vie quotidienne' }))
    if (mod.readingId) steps.push(make('reading', { kind: 'reading', icon: '📰', title: 'Lire un petit texte', subtitle: 'Comprendre le thème dans un texte' }))
    const nCorr = Math.ceil(corrections(mod).length / PRACTICE_CHUNK)
    for (let p = 0; p < nCorr; p++) {
      steps.push(make(`c${p + 1}`, { kind: 'corrections', icon: '🩹', title: nCorr > 1 ? `Mes corrections ${p + 1}/${nCorr}` : 'Mes corrections', subtitle: 'Les phrases corrigées en cours, à réécrire correctement', part: p }))
    }
    const parts = Math.max(1, Math.ceil(mod.exercises.length / PRACTICE_CHUNK))
    for (let p = 0; p < parts; p++) {
      steps.push(make(`p${p + 1}`, { kind: 'practice', icon: '🧩', title: parts > 1 ? `Mise en pratique ${p + 1}/${parts}` : 'Mise en pratique', subtitle: 'Mots et grammaire dans des phrases variées', part: p }))
    }
    if (n > 0) steps.push(make('recap', { kind: 'recap', icon: '🔁', title: 'Rappel des leçons précédentes', subtitle: 'On remélange les mots déjà vus' }))
    if (mod.writingTaskIds.length > 0) steps.push(make('write', { kind: 'write', icon: '🖋️', title: 'Défi écrit (facultatif)', subtitle: 'Écrire quelques phrases sur le thème', optional: true }))
    return { id: uid, track, number: n + 1, module: mod, steps }
  })
}

export const pathUnits: PathUnit[] = buildUnits()

export const unitsOfTrack = (track: Track): PathUnit[] => pathUnits.filter((u) => u.track === track)

/** Y a-t-il un parcours Lexie (accès Jujularage) ? */
export const hasLexie = pathUnits.some((u) => u.track === 'lexie')

export function unitOf(id: string | undefined): PathUnit | undefined {
  return pathUnits.find((u) => u.id === id)
}

export function stepOf(unitId: string | undefined, key: string | undefined): PathStep | undefined {
  return unitOf(unitId)?.steps.find((s) => s.key === key)
}

// ---------------------------------------------------------------- progression et déblocage

export const isStepDone = (data: ProgressData, step: PathStep) => !!data.steps[`path:${step.id}`]

const requiredSteps = (u: PathUnit) => u.steps.filter((s) => !s.optional)

export function unitDoneCount(data: ProgressData, u: PathUnit): { done: number; total: number } {
  const req = requiredSteps(u)
  return { done: req.filter((s) => isStepDone(data, s)).length, total: req.length }
}

export function isUnitComplete(data: ProgressData, u: PathUnit): boolean {
  const { done, total } = unitDoneCount(data, u)
  return done >= total
}

export function isUnitUnlocked(data: ProgressData, u: PathUnit): boolean {
  if (data.settings.pathFree || u.number === 1) return true
  return isUnitComplete(data, unitsOfTrack(u.track)[u.number - 2])
}

export function isStepUnlocked(data: ProgressData, u: PathUnit, step: PathStep): boolean {
  if (data.settings.pathFree) return true
  if (!isUnitUnlocked(data, u)) return false
  const before = u.steps.slice(0, u.steps.indexOf(step)).filter((s) => !s.optional)
  return before.every((s) => isStepDone(data, s))
}

/** Prochaine étape à faire (la première non terminée du parcours). */
export function nextStep(data: ProgressData, track: Track = 'main'): { unit: PathUnit; step: PathStep } | null {
  for (const unit of unitsOfTrack(track)) {
    for (const step of unit.steps) {
      if (!step.optional && !isStepDone(data, step)) return { unit, step }
    }
  }
  return null
}

/** Étape suivante après celle-ci (dans la même leçon, ou la leçon suivante). */
export function followingStep(unit: PathUnit, step: PathStep): { unit: PathUnit; step: PathStep } | null {
  const i = unit.steps.indexOf(step)
  const next = unit.steps.slice(i + 1).find((s) => !s.optional)
  if (next) return { unit, step: next }
  const nextUnit = unitsOfTrack(unit.track)[unit.number]
  return nextUnit ? { unit: nextUnit, step: nextUnit.steps[0] } : null
}

// ---------------------------------------------------------------- repérer un mot dans sa phrase d'exemple

const ARTICLES = /^(?:the|an?|to|de|het|een|te)\s+/i
const norm = (t: string) => t.replace(/[’‘`]/g, "'")
const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Formes à chercher dans une phrase : « de handen wassen » → « handen wassen » ; « a / b » → a et b. */
export function wordCores(word: string): string[] {
  return norm(word)
    .replace(/\(.*?\)/g, ' ')
    .split(/\s\/\s/)
    .map((alt) => alt.replace(/[…?!.]+$/g, '').replace(ARTICLES, '').trim())
    .filter((c) => c.length >= 2)
}

/** Où se trouve le mot dans la phrase (mot entier, sans tenir compte des majuscules) ? */
export function findInSentence(sentence: string, word: string): { start: number; end: number; text: string; core: string } | null {
  const s = norm(sentence)
  for (const core of wordCores(word)) {
    const m = new RegExp(`(^|[^\\p{L}\\p{N}])(${esc(core)})(?![\\p{L}\\p{N}])`, 'iu').exec(s)
    if (m) {
      const start = m.index + m[1].length
      return { start, end: start + m[2].length, text: sentence.slice(start, start + m[2].length), core }
    }
  }
  return null
}

// ---------------------------------------------------------------- exercices fabriqués à partir des mots

const pick = <T,>(list: T[], n: number): T[] => shuffle(list).slice(0, n)
const mcqOf = (id: string, prompt: string, right: string, wrong: string[], extra: Partial<McqExercise> = {}): McqExercise => ({
  kind: 'mcq', id, prompt, options: [right, ...wrong], answer: 0, tags: ['vocab'], ...extra,
})

function distractors(pool: string[], right: string, n = 3): string[] {
  const clean = Array.from(new Set(pool.filter((p) => p && p !== right && p.length <= 60)))
  return pick(clean, n)
}

export function meaningMcq(item: VocabItem, pool: VocabItem[], suffix = 'm1'): McqExercise {
  return mcqOf(`${item.id}~${suffix}`, `Que signifie « ${item.en} » ?`, item.fr, distractors(pool.map((p) => p.fr), item.fr), { level: item.level })
}

export function listenMcq(item: VocabItem, pool: VocabItem[], suffix = 'l1'): McqExercise {
  return mcqOf(`${item.id}~${suffix}`, 'Écoute, puis choisis la bonne traduction.', item.fr, distractors(pool.map((p) => p.fr), item.fr), { audio: item.en, level: item.level })
}

/** Phrase d'exemple à trou : « ___ » à la place du mot. */
export function contextGap(item: VocabItem, suffix = 'g1'): GapExercise | null {
  if (!item.example) return null
  const hit = findInSentence(item.example, item.en)
  if (!hit) return null
  const prompt = `${item.example.slice(0, hit.start)}___${item.example.slice(hit.end)}`
  return {
    kind: 'gap', id: `${item.id}~${suffix}`, prompt, answers: Array.from(new Set([hit.text, hit.core, ...wordCores(item.en)])), hint: item.fr, tags: ['vocab'], level: item.level,
    explanation: `${item.en} = ${item.fr}`,
  }
}

export function contextMcq(item: VocabItem, pool: VocabItem[], suffix = 'c1'): McqExercise | null {
  if (!item.example) return null
  const hit = findInSentence(item.example, item.en)
  if (!hit) return null
  const prompt = `${item.example.slice(0, hit.start)}___${item.example.slice(hit.end)}  (${item.fr})`
  const others = pool.filter((p) => p.id !== item.id && !findInSentence(item.example!, p.en)).map((p) => wordCores(p.en)[0]).filter(Boolean)
  // Mauvaises réponses de même forme que la bonne (même nombre de mots) : sinon la réponse saute aux yeux.
  const size = hit.text.trim().split(/\s+/).length
  const alike = others.filter((o) => o.trim().split(/\s+/).length === size && o.length <= hit.text.length + 8)
  const wrong = distractors(alike.length >= 3 ? alike : others.filter((o) => o.trim().split(/\s+/).length <= size + 1), hit.text)
  if (wrong.length < 3) return null
  return mcqOf(`${item.id}~${suffix}`, prompt, hit.text, wrong, { level: item.level, explanation: `${item.en} = ${item.fr}` })
}

const wordCount = (t: string) => t.trim().split(/\s+/).length

export function listenType(id: string, sentence: string, level: Exercise['level'] = 'A1'): TransformExercise {
  return { kind: 'transform', id, instruction: 'Écoute, puis écris ce que tu entends.', prompt: '', answers: [sentence], audio: sentence, listen: true, tags: ['vocab'], level }
}

/** Exercices d'une étape « mots », du plus guidé au plus libre. */
export function wordStepExercises(step: PathStep, unit: PathUnit): Exercise[] {
  const all = deckItems(unit.module)
  const items = (step.wordIds ?? []).map((id) => all.find((w) => w.id === id)).filter((w): w is VocabItem => !!w)
  const pool = all.length >= 5 ? all : [...all, ...allDecks.flatMap((d) => d.items).slice(0, 20)]
  const out: Exercise[] = []
  for (const it of shuffle(items)) out.push(meaningMcq(it, pool))
  for (const it of pick(items, 2)) out.push(listenMcq(it, pool))
  const inContext = shuffle(items).map((it) => contextMcq(it, pool)).filter((x): x is McqExercise => !!x)
  out.push(...inContext.slice(0, 4))
  for (const it of shuffle(items)) out.push(vocabCard(it, 'fr-en'))
  const usedCtx = new Set(inContext.slice(0, 4).map((c) => c.id.split('~')[0]))
  const gaps = shuffle(items).filter((it) => !usedCtx.has(it.id)).map((it) => contextGap(it)).filter((x): x is GapExercise => !!x)
  const gapPool = gaps.length >= 2 ? gaps : items.map((it) => contextGap(it)).filter((x): x is GapExercise => !!x)
  out.push(...gapPool.slice(0, 3))
  const sentences = items.filter((it) => it.example && wordCount(it.example) <= 8 && !it.example.includes('—'))
  for (const it of pick(sentences, 2)) out.push(listenType(`${it.id}~l2`, it.example!, it.level))
  return out
}

/** Étape « phrases utiles » : écouter et écrire quelques phrases du thème. */
export function phraseStepExercises(unit: PathUnit): Exercise[] {
  const out: Exercise[] = []
  unit.module.keyPhrases.forEach((g, gi) => {
    g.phrases.filter((p) => wordCount(p) <= 9).slice(0, 2).forEach((p, pi) => out.push(listenType(`${unit.id}-kp-${gi}-${pi}~l`, p)))
  })
  return out.slice(0, 7)
}

/** Étape de grammaire : exercices de la fiche, des choix vers l'écriture. */
export function grammarStepExercises(lesson: GrammarLesson): Exercise[] {
  const tagged = lesson.exercises.map((ex) => ({ ...ex, tags: Array.from(new Set([...(ex.tags ?? []), lesson.tag])) }) as Exercise)
  return shuffleWithinKinds(tagged)
}

/** Étape « mes corrections » : les phrases corrigées en cours (accès Jojo). */
export function correctionStepExercises(unit: PathUnit, part: number): Exercise[] {
  return corrections(unit.module).slice(part * PRACTICE_CHUNK, (part + 1) * PRACTICE_CHUNK)
}

/** Étape de mise en pratique : les exercices mêlés du thème, des choix vers l'écriture. */
export function practiceStepExercises(unit: PathUnit, part: number): Exercise[] {
  // Les parties sont découpées dans l'ordre stable (chaque exercice reste dans « sa » partie), puis mélangées à l'intérieur.
  return shuffleWithinKinds(sortByDifficulty(unit.module.exercises).slice(part * PRACTICE_CHUNK, (part + 1) * PRACTICE_CHUNK))
}

/** Rappel : des mots des deux leçons précédentes (et un peu de celle-ci) dans des contextes nouveaux. */
export function recapExercises(unit: PathUnit): Exercise[] {
  const prev = unitsOfTrack(unit.track).slice(Math.max(0, unit.number - 3), unit.number - 1)
  const olderItems = prev.flatMap((u) => deckItems(u.module))
  const nowItems = deckItems(unit.module)
  const pool = [...olderItems, ...nowItems]
  const nowIds = new Set(nowItems.map((w) => w.id))
  const older = olderItems.filter((w) => !nowIds.has(w.id))
  // Un même mot ne doit apparaître qu'une fois dans le rappel.
  const seen = new Set<string>()
  const chosen = [...pick(older, 7), ...pick(nowItems, 3)].filter((w) => (seen.has(w.id) ? false : (seen.add(w.id), true)))
  const out: Exercise[] = []
  chosen.forEach((it, i) => {
    out.push(i % 2 === 0 ? meaningMcq(it, pool, 'mr') : listenMcq(it, pool, 'lr'))
  })
  for (const it of chosen) {
    const c = contextMcq(it, pool, 'cr')
    if (c) out.push(c)
  }
  for (const it of chosen.slice(0, 6)) out.push(vocabCard(it, 'fr-en'))
  return out
}

// ---------------------------------------------------------------- « Au programme » : le contenu d'une leçon en un coup d'œil

export interface UnitOverview {
  nWords: number
  sampleWords: string[]
  grammar: string[]
  nPhrases: number
  dialogue?: string
  reading?: string
  nPractice: number
  nCorrections: number
  hasWriting: boolean
}

export function unitOverview(u: PathUnit): UnitOverview {
  const wordIds = new Set(u.steps.flatMap((s) => s.wordIds ?? []))
  const words = deckItems(u.module).filter((w) => wordIds.has(w.id))
  const m = u.module
  return {
    nWords: words.length,
    sampleWords: words.slice(0, 5).map((w) => w.en),
    grammar: u.steps.filter((s) => s.kind === 'grammar').map((s) => s.title),
    nPhrases: m.keyPhrases.reduce((n, g) => n + g.phrases.length, 0),
    dialogue: m.dialogueId ? dialogues.find((d) => d.id === m.dialogueId)?.title : undefined,
    reading: m.readingId ? readingTexts.find((t) => t.id === m.readingId)?.title : undefined,
    nPractice: m.exercises.length,
    nCorrections: corrections(m).length,
    hasWriting: m.writingTaskIds.length > 0,
  }
}
