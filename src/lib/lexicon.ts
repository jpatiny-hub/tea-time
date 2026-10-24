// Aide vocabulaire : retrouver la traduction d'un mot rencontré dans un exercice.
// Trois sources, dans cet ordre : les traductions que l'utilisateur a lui-même enregistrées, le vocabulaire de l'appli
// (tous les paquets de l'accès), puis le petit dictionnaire de base (anglais seulement). Tout reste local.
import { allVocab } from '../data/vocabulary.ts'
import { EDITION } from '../edition.ts'
import type { VocabItem } from '../types.ts'

export interface LexEntry {
  /** Forme trouvée dans le dictionnaire (« bread » pour « breads »). */
  base: string
  fr: string
  source: 'mine' | 'vocab' | 'core'
  example?: string
  note?: string
}

const norm = (w: string) => w.toLowerCase().replace(/[’‘`´]/g, "'")
const ARTICLE = /^(?:the|an?|to|de|het|een|te)\s+/i

// Le dictionnaire de base de la langue apprise, chargé à la demande (un seul des deux est téléchargé et analysé).
const CORE_TEXT: string = EDITION.lang === 'en' ? (await import('../data/lexicon-en.ts')).CORE_EN : (await import('../data/lexicon-nl.ts')).CORE_NL

const core = new Map<string, string>()
{
  for (const line of CORE_TEXT.split('\n')) {
    const [keys, fr] = line.split('=')
    if (!fr) continue
    for (const k of keys.split(',')) {
      const key = norm(k.trim())
      const prev = core.get(key)
      if (!prev) core.set(key, fr.trim())
      else if (!prev.split(' ; ').includes(fr.trim())) core.set(key, `${prev} ; ${fr.trim()}`)
    }
  }
}

const vocab = new Map<string, VocabItem>()
/** Expressions de plusieurs mots (« look after », « de handen wassen ») pour repérer une expression dans une phrase. */
const expressions: { text: string; item: VocabItem }[] = []

for (const item of allVocab) {
  const alts = item.en.replace(/\(.*?\)/g, ' ').split(/\s\/\s/)
  // « milk / butter » = « lait / beurre » : chaque mot reçoit sa propre traduction ; sinon on ne rattache pas la traduction à un mot isolé.
  const frParts = item.fr.split(/\s\/\s/)
  const aligned = alts.length === 1 || frParts.length === alts.length
  alts.forEach((alt, idx) => {
    const cleaned = norm(alt.replace(/[…?!.]+$/g, '').replace(ARTICLE, '').trim())
    if (!cleaned) return
    if (/\s/.test(cleaned)) {
      if (cleaned.length >= 5) expressions.push({ text: cleaned, item })
    } else if (aligned && !vocab.has(cleaned)) vocab.set(cleaned, alts.length === 1 ? item : { ...item, fr: frParts[idx] })
  })
}

/** Formes de base possibles d'un mot (pluriel, passé, -ing, comparatif…), de la plus probable à la moins probable. */
export function baseForms(word: string): string[] {
  const full = norm(word)
  const w = full.replace(/'s$/, '')
  // « it's » est dans le dictionnaire tel quel ; « Peter's » se ramène à « peter ».
  const out = full === w ? [w] : [full, w]
  const add = (x: string) => x.length >= 2 && out.push(x)
  if (EDITION.lang === 'en') {
    if (w.endsWith('ies')) add(`${w.slice(0, -3)}y`)
    if (w.endsWith('ied')) add(`${w.slice(0, -3)}y`)
    if (w.endsWith('es')) { add(w.slice(0, -2)); add(w.slice(0, -1)) }
    if (w.endsWith('s') && !w.endsWith('ss')) add(w.slice(0, -1))
    if (w.endsWith('ed')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1$/.test(w.slice(0, -2))) add(w.slice(0, -3)) }
    if (w.endsWith('ing')) { add(w.slice(0, -3)); add(`${w.slice(0, -3)}e`); if (/(.)\1$/.test(w.slice(0, -3))) add(w.slice(0, -4)) }
    if (w.endsWith('est')) { add(w.slice(0, -3)); add(w.slice(0, -2)); if (/(.)\1$/.test(w.slice(0, -3))) add(w.slice(0, -4)) }
    if (w.endsWith('er')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1$/.test(w.slice(0, -2))) add(w.slice(0, -3)) }
    if (w.endsWith('ily')) add(`${w.slice(0, -3)}y`)
    if (w.endsWith('ly')) add(w.slice(0, -2))
  } else {
    // Néerlandais : pluriels (-en, -s, -'s), diminutifs, formes du verbe (ik werk / hij werkt / werkte / gewerkt), adjectifs en -e.
    const collapse = (x: string) => x.replace(/([aeou])\1/g, '$1') // maak → mak
    const respell = (x: string) => x.replace(/z/g, 's').replace(/v/g, 'f') // huizen → huis
    const respellBack = (x: string) => x.replace(/s$/, 'z').replace(/f$/, 'v')
    const addStem = (st: string) => {
      add(st)
      add(`${st}en`)
      add(`${st}${st.slice(-1)}en`) // blaf → blaffen
      add(`${collapse(st)}en`)
      add(`${st.replace(/s$/, 'z')}en`)
      add(`${collapse(st).replace(/s$/, 'z')}en`)
      add(`${st.replace(/f$/, 'v')}en`)
      add(`${collapse(st).replace(/f$/, 'v')}en`)
    }
    for (const suf of ['etjes', 'tjes', 'pjes', 'jes', 'etje', 'tje', 'pje', 'je']) if (w.endsWith(suf)) add(w.slice(0, -suf.length))
    if (w.endsWith('jes')) add(w.slice(0, -1))
    if (w.endsWith('en')) {
      const st = w.slice(0, -2)
      add(st)
      add(w.slice(0, -1))
      if (/([bcdfghjklmnpqrstvwxz])\1$/.test(st)) add(st.slice(0, -1)) // mannen → man
      add(st.replace(/([aeou])([bcdfghjklmnpqrstvwxz])$/, '$1$1$2')) // straten → straat
      add(respell(st))
      add(respell(st).replace(/([aeou])([bcdfghjklmnpqrstvwxz])$/, '$1$1$2'))
    }
    if (w.endsWith('s')) add(w.slice(0, -1))
    if (w.endsWith('e')) { const st = w.slice(0, -1); add(st); add(st.replace(/([aeou])([bcdfghjklmnpqrstvwxz])$/, '$1$1$2')); add(respell(st)) }
    if (w.endsWith('t') || w.endsWith('d')) addStem(w.slice(0, -1))
    if (w.startsWith('ge') && (w.endsWith('t') || w.endsWith('d') || w.endsWith('en'))) {
      const body = w.slice(2, w.endsWith('en') ? -2 : -1)
      addStem(body)
      add(`${body}en`)
    }
    if (w.endsWith('te') || w.endsWith('de')) addStem(w.slice(0, -2))
    if (w.endsWith('ten') || w.endsWith('den')) addStem(w.slice(0, -3))
    addStem(w)
    void respellBack
  }
  return out
}

/** Cherche un mot : traductions de l'utilisateur d'abord (`mine`), puis vocabulaire de l'appli, puis dictionnaire de base. */
export function lookup(word: string, mine: Record<string, { fr: string }> = {}): LexEntry | null {
  const forms = baseForms(word)
  for (const f of forms) if (mine[f]) return { base: f, fr: mine[f].fr, source: 'mine' }
  for (const f of forms) {
    const v = vocab.get(f)
    if (v) return { base: f, fr: v.fr, source: 'vocab', example: v.example, note: v.note }
  }
  for (const f of forms) {
    const c = core.get(f)
    if (c) return { base: f, fr: c, source: 'core' }
  }
  return null
}

/** Expression connue contenant ce mot dans cette phrase, s'il y en a une. */
export function expressionAround(sentence: string, word: string): { text: string; fr: string } | null {
  const s = norm(sentence)
  const w = norm(word)
  for (const e of expressions) {
    const i = s.indexOf(e.text)
    if (i < 0) continue
    const re = new RegExp(`(^|[^\\p{L}])${e.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'iu')
    if (re.test(s) && e.text.split(/\s+/).some((p) => baseForms(w).includes(p) || p === w)) return { text: e.text, fr: e.item.fr }
  }
  return null
}

const WORD = /[\p{L}][\p{L}'’-]*/gu

/** Mots d'un texte, sans doublon, dans l'ordre. */
export function wordsOf(text: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const m of text.matchAll(WORD)) {
    const w = m[0].replace(/^['’-]+|['’-]+$/g, '')
    const k = norm(w)
    if (w.length < 1 || seen.has(k)) continue
    seen.add(k)
    out.push(w)
  }
  return out
}

/** Petits mots qu'on ne détaille pas dans la liste « Mots de l'exercice » (ils restent touchables dans le texte). */
const TRIVIAL = new Set(['a', 'an', 'the', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'my', 'your', 'is', 'am', 'are', 'to', 'of', 'and', 'in', 'on', 'at', 'do', 'does', 'not', 'no', 'yes'])
export const isTrivial = (w: string) => TRIVIAL.has(norm(w)) || w.length < 2

/** Nombre de mots du dictionnaire (pour la page « Mes mots »). */
export const lexiconSize = () => core.size + vocab.size

/** Un mot en majuscule au milieu d'une phrase est un nom propre (Anna, London) : inutile de le traduire. */
export function isProperName(word: string, sentence: string): boolean {
  if (!/^\p{Lu}/u.test(word)) return false
  const i = sentence.indexOf(word)
  if (i <= 0) return false
  const before = sentence.slice(0, i).trimEnd()
  return before !== '' && !/[.!?:"“«¿¡]$/.test(before)
}

/** Mots à détailler pour un texte : sans les petits mots ni les noms propres. */
export function helpWords(text: string): string[] {
  return wordsOf(text).filter((w) => !isTrivial(w) && !isProperName(w, text) && !/^\d/.test(w))
}

// Les consignes des exercices sont en français : on ne propose pas de traduire ces mots-là
// (seuls les passages entre « guillemets » d'une phrase française restent touchables).
const FRENCH = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'du', 'est', 'que', 'qui', 'quel', 'quelle', 'quels', 'quelles', 'pour', 'avec', 'sur', 'sont', 'vous', 'nous', 'tu', 'il', 'elle', 'ce', 'cette', 'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'sa', 'ses', 'au', 'aux', 'où', 'ça', 'comment', 'combien', 'traduis', 'écris', 'écoute', 'complète', 'corrige', 'choisis', 'signifie', 'dit', 'dire', 'phrase', 'bonne', 'réponse', 'mets', 'mettre'])

export function looksFrench(text: string): boolean {
  const words = text.toLowerCase().split(/[^\p{L}']+/u).filter(Boolean)
  const hits = words.filter((w) => FRENCH.has(w)).length
  return hits >= 2 || (hits >= 1 && words.length <= 4)
}

/** Passages entre guillemets d'un texte (« bread », “bread”). */
export function quotedParts(text: string): string[] {
  return Array.from(text.matchAll(/[«“"]\s*([^»”"]+?)\s*[»”"]/g)).map((m) => m[1])
}

/** Textes dont on détaille les mots : une phrase de la langue apprise telle quelle ; une consigne française, seulement ses citations. */
export function learnableTexts(texts: string[]): string[] {
  return texts.flatMap((t) => (looksFrench(t) ? quotedParts(t) : [t]))
}
