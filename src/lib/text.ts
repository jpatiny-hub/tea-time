// Comparaison tolérante des réponses écrites en anglais (ou en néerlandais pour l'accès Nunu) :
// casse, ponctuation, apostrophes typographiques, accents, contractions (don't = do not),
// orthographe britannique/américaine (organise = organize) et petite faute de frappe.
// Les règles propres à l'anglais (contractions, UK/US) sont désactivées pour le néerlandais.
import { EDITION } from '../edition.ts'

const NL = EDITION.lang === 'nl'

const CONTRACTIONS: [RegExp, string][] = [
  [/\bcan't\b/g, 'cannot'],
  [/\bcan not\b/g, 'cannot'],
  [/\bwon't\b/g, 'will not'],
  [/\bshan't\b/g, 'shall not'],
  [/\blet's\b/g, 'let us'],
  [/\bain't\b/g, 'is not'],
  [/n't\b/g, ' not'],
  // contractions tapées sans apostrophe (dont, havent, wasnt…)
  [/\b(do|does|did|is|are|was|were|have|has|had|could|would|should|must|need|might)nt\b/g, '$1 not'],
  [/\bcant\b/g, 'cannot'],
  [/\bwont\b/g, 'will not'],
  [/'m\b/g, ' am'],
  [/'re\b/g, ' are'],
  [/'ve\b/g, ' have'],
  [/'ll\b/g, ' will'],
]

const SPELLING: [RegExp, string][] = [
  // -ise / -yse → -ize / -yze (organise, realise, analyse…)
  [/\b(\w{3,})is(e|ed|es|ing|ation|ations)\b/g, '$1iz$2'],
  [/\banalys(e|ed|es|ing)\b/g, 'analyz$1'],
  // -our → -or (colour, behaviour, favour, labour, neighbour…)
  [/\b(col|behavi|fav|lab|neighb|hon|flav|hum|harb|rum|vap|endeav)our(s|ed|ing|ite|ites|able|hood)?\b/g, '$1or$2'],
  // -tre → -ter (centre, theatre, metre, litre)
  [/\b(cen|thea|me|li|fib)tre(s)?\b/g, '$1ter$2'],
  // doublement du l (travelled, cancelled, labelled, modelling…)
  [/\b(travel|cancel|label|model|fuel|signal|level)l(ed|ing|er|ers)\b/g, '$1$2'],
  [/\blicence\b/g, 'license'],
  [/\bprogramme(s)?\b/g, 'program$1'],
  [/\bcatalogue\b/g, 'catalog'],
  [/\benrol(l)?(ment|s)?\b/g, 'enroll$2'],
  [/\bgrey\b/g, 'gray'],
]

export function normalizeForComparison(text: string): string {
  let t = text
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”«»]/g, '"')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
  if (!NL) for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep)
  t = t
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/(^|\s)'|'(\s|$)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim()
  if (!NL) for (const [re, rep] of SPELLING) t = t.replace(re, rep)
  return t
}

// "'d" peut valoir "would" ou "had" : on génère les deux lectures.
function variants(text: string): string[] {
  const n = normalizeForComparison(text)
  if (NL || !n.includes("'d")) return [n]
  return [n.replace(/'d\b/g, ' would'), n.replace(/'d\b/g, ' had')].map((v) => v.replace(/\s+/g, ' '))
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0]
    prev[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j]
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1))
      diag = tmp
    }
  }
  return prev[b.length]
}

export type AnswerVerdict = 'correct' | 'typo' | 'wrong'

export interface AnswerCheck {
  verdict: AnswerVerdict
  /** La réponse attendue la plus proche de ce qu'a tapé l'utilisateur. */
  closest: string
}

/**
 * `wrong` : pour une phrase à corriger, la phrase fautive de départ. Si la réponse est plus proche d'elle que de
 * la bonne réponse (ou aussi proche), ce n'est PAS une faute de frappe : l'erreur n'a pas été corrigée
 * (ex. « prize » / « price », « hunted » / « haunted » ne diffèrent que d'une lettre).
 */
export function checkAnswer(input: string, expected: string[], wrong?: string): AnswerCheck {
  const inputs = variants(input)
  let best = { dist: Infinity, answer: expected[0] ?? '' }
  for (const exp of expected) {
    for (const e of variants(exp)) {
      for (const i of inputs) {
        const d = levenshtein(i, e)
        if (d < best.dist) best = { dist: d, answer: exp }
      }
    }
  }
  if (best.dist === 0) return { verdict: 'correct', closest: best.answer }
  if (wrong) {
    let dWrong = Infinity
    for (const w of variants(wrong)) for (const i of inputs) dWrong = Math.min(dWrong, levenshtein(i, w))
    if (dWrong <= best.dist) return { verdict: 'wrong', closest: best.answer }
  }
  // Une lettre de travers sur une réponse assez longue = faute de frappe tolérée,
  // sauf si elle change un mot grammatical (a/an, in/on, has/had…) : on ne tolère
  // que si le nombre de mots est identique et que la réponse fait plus de 8 lettres.
  const len = normalizeForComparison(best.answer).length
  if (best.dist === 1 && len >= 8 && !isGrammarSlip(input, best.answer)) {
    return { verdict: 'typo', closest: best.answer }
  }
  return { verdict: 'wrong', closest: best.answer }
}

const SHORT_GRAMMAR_WORDS = new Set(
  NL
    ? [
        'de', 'het', 'een', 'in', 'op', 'aan', 'te', 'is', 'en', 'of', 'ik', 'je', 'jij', 'u', 'we', 'wij', 'ze', 'zij', 'hij',
        'mijn', 'jouw', 'zijn', 'haar', 'ons', 'uw', 'hun', 'met', 'voor', 'van', 'naar', 'uit', 'bij', 'om', 'dat', 'dit',
        'die', 'deze', 'niet', 'geen', 'er', 'ook', 'nu', 'maar', 'dan', 'als', 'was', 'zijt', 'ben', 'heb', 'hebt', 'heeft',
      ]
    : [
        'a', 'an', 'in', 'on', 'at', 'to', 'of', 'is', 'as', 'it', 'has', 'had', 'have', 'was', 'were',
        'for', 'from', 'by', 'the', 'than', 'then', 'less', 'most', 'much', 'many', 'will', 'would',
        'ago', 'since', 'this', 'that', 'these', 'those', 'did', 'does', 'do',
      ],
)
// Fin de mot qui marque une conjugaison / un pluriel : -ed, -s (anglais) ; -en, -t (néerlandais).
const ENDING = NL ? /(en|t)$/ : /(ed|s)$/

// Vrai si la différence d'une lettre porte sur un petit mot grammatical (ex. "an" vs "on").
function isGrammarSlip(input: string, expected: string): boolean {
  const a = normalizeForComparison(input).split(' ')
  const b = normalizeForComparison(expected).split(' ')
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i] && (SHORT_GRAMMAR_WORDS.has(a[i]) || SHORT_GRAMMAR_WORDS.has(b[i]))) return true
    if (a[i] !== b[i] && ENDING.test(b[i]) !== ENDING.test(a[i])) return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Différence mot à mot (pour montrer ce qui manque / ce qui est en trop)
// ---------------------------------------------------------------------------

export interface DiffToken {
  text: string
  type: 'same' | 'missing' | 'extra'
}

export function wordDiff(input: string, expected: string): DiffToken[] {
  const a = input.trim().split(/\s+/).filter(Boolean)
  const b = expected.trim().split(/\s+/).filter(Boolean)
  const na = a.map((w) => normalizeForComparison(w))
  const nb = b.map((w) => normalizeForComparison(w))
  // LCS classique
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] = na[i] === nb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const out: DiffToken[] = []
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (na[i] === nb[j]) {
      out.push({ text: b[j], type: 'same' })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ text: a[i], type: 'extra' })
      i++
    } else {
      out.push({ text: b[j], type: 'missing' })
      j++
    }
  }
  while (i < a.length) out.push({ text: a[i++], type: 'extra' })
  while (j < b.length) out.push({ text: b[j++], type: 'missing' })
  return out
}

// ---------------------------------------------------------------------------
// Détection d'expressions dans un texte libre (écrit / oral)
// ---------------------------------------------------------------------------

/** Transforme « I'm inclined to think that… » en motif recherchable « i am inclined to think ». */
export function phraseCore(phrase: string): string {
  // « We prioritize efficiency / quality » → on garde ce qui précède l'alternative : « we prioritize ».
  let base = phrase.split('/')[0]
  if (phrase.includes('/') && !/(…|\.\.\.)\s*$/.test(base.trim())) {
    const words = base.trim().split(/\s+/)
    if (words.length > 1) base = words.slice(0, -1).join(' ')
  }
  return normalizeForComparison(
    base
      .replace(/…|\.\.\./g, ' ')
      .replace(/\(.*?\)/g, ' ')
      .replace(/\+.*$/, ' '),
  )
    .replace(/\b(that|to|with|of|for|on|by|when|is|the)$/g, '')
    .trim()
}

export function containsPhrase(text: string, phrase: string): boolean {
  const core = phraseCore(phrase)
  if (!core) return false
  return ` ${normalizeForComparison(text)} `.includes(` ${core}`)
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function slug(text: string): string {
  return normalizeForComparison(text).replace(/'/g, '').replace(/\s+/g, '-').slice(0, 48)
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export type MatchLevel = 'correct' | 'close' | 'wrong'

// Score la prononciation par recouvrement de mots : une phrase longue reconnue à 80 % compte comme réussie.
export function scoreSpokenMatch(transcript: string, target: string): MatchLevel {
  const heard = new Set(normalizeForComparison(transcript).split(' ').filter(Boolean))
  const words = normalizeForComparison(target).split(' ').filter(Boolean)
  if (words.length === 0) return 'wrong'
  const ratio = words.filter((w) => heard.has(w)).length / words.length
  if (ratio >= 0.8) return 'correct'
  if (ratio >= 0.5) return 'close'
  return 'wrong'
}

// ---------------------------------------------------------------------------
// Vocabulaire : réponse écrite, tolérante sur l'orthographe
// ---------------------------------------------------------------------------

const LEADING_WORDS = NL
  ? /^(?:le |la |les |l'|un |une |des |du |de la |de l'|d'|se |s'|de |het |een |t )/
  : /^(?:le |la |les |l'|un |une |des |du |de la |de l'|d'|se |s'|to |a |an |the )/

function stripLeading(text: string): string {
  let t = text.trim()
  let prev = ''
  while (prev !== t) {
    prev = t
    t = t.replace(LEADING_WORDS, '').trim()
  }
  return t
}

/** Toutes les traductions acceptables d'une carte : « rendre, retourner (un article) ; revenir » → 3 réponses. */
export function vocabCandidates(back: string): string[] {
  const cleaned = back.replace(/\(.*?\)/g, ' ').replace(/…|\.\.\./g, ' ').replace(/\+.*?(?=[,;/]|$)/g, ' ')
  const parts = [cleaned, ...cleaned.split(/[,;/]|\s(?:ou|or)\s/)]
  const out = new Set<string>()
  for (const p of parts) {
    const n = stripLeading(normalizeForComparison(p))
    if (n) out.add(n)
  }
  return [...out]
}

function vocabTolerance(len: number): number {
  if (len <= 3) return 0
  if (len <= 5) return 1
  if (len <= 9) return 2
  return 3
}

/** « blesure » pour « blessure » → accepté avec une remarque sur l'orthographe. */
export function checkVocab(input: string, back: string): AnswerCheck {
  const given = stripLeading(normalizeForComparison(input))
  const candidates = vocabCandidates(back)
  if (!given) return { verdict: 'wrong', closest: candidates[1] ?? candidates[0] ?? back }
  let best = { dist: Infinity, cand: candidates[0] ?? '' }
  for (const c of candidates) {
    const d = levenshtein(given, c)
    if (d < best.dist) best = { dist: d, cand: c }
  }
  if (best.dist === 0) return { verdict: 'correct', closest: best.cand }
  if (best.dist <= vocabTolerance(best.cand.length)) return { verdict: 'typo', closest: best.cand }
  return { verdict: 'wrong', closest: best.cand }
}
