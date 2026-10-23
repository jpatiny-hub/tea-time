// Web Speech APIs du navigateur (gratuites, embarquées dans Chrome/Android) : rien ne sort de l'appareil
// côté appli — la reconnaissance vocale de Chrome, elle, est assurée par Google.
import { getProgress } from './store'

let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (!canSpeak()) return
  cachedVoices = window.speechSynthesis.getVoices()
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(lang: string, variant = 0): SpeechSynthesisVoice | undefined {
  const exact = cachedVoices.filter((v) => v.lang.replace('_', '-') === lang)
  // Repli : une voix de la même langue (ex. nl-NL à défaut de nl-BE), puis n'importe quelle voix anglaise.
  const sameLang = cachedVoices.filter((v) => v.lang.startsWith(lang.slice(0, 2)))
  const pool = exact.length > 0 ? exact : sameLang
  if (pool.length === 0) return undefined
  return pool[variant % pool.length]
}

export interface SpeakOptions {
  lang?: string
  rate?: number
  /** Permet d'alterner les voix dans un dialogue. */
  voiceVariant?: number
  /** Voix précise (choisie par `dialogueVoices`) et hauteur de voix. */
  voice?: SpeechSynthesisVoice
  pitch?: number
  onEnd?: () => void
}

// ---------------------------------------------------------------------------
// Voix distinctes pour les personnages d'un dialogue
// ---------------------------------------------------------------------------

type Gender = 'f' | 'm'

const FEMALE_VOICE = /(?<![a-z])female|woman|fiona|samantha|kate|serena|susan|moira|karen|tessa|victoria|zira|hazel|catherine|amy\b|emma|joanna|salli|kimberly|ivy|nicole|libby|sonia|maisie|ellen|claire|colette|fenna|-x-(gba|gbc|fis|iolf|sfg|tpf|tpc|dfc)\b/i
const MALE_VOICE = /(?<![a-z])male|daniel|alex\b|fred\b|george|oliver|james|ryan|david|mark\b|arthur|rishi|thomas|guy\b|brian|russell|matthew|joey|justin|liam|ruben|xander|-x-(rjs|gbb|gbd|iom|iog|tpd|lfc)\b/i

function voiceGender(v: SpeechSynthesisVoice): Gender | undefined {
  const id = `${v.name} ${v.voiceURI}`
  if (FEMALE_VOICE.test(id)) return 'f'
  if (MALE_VOICE.test(id)) return 'm'
  return undefined
}

const FEMALE_NAME = /^(linda|jenny|lena|anna|sophie|sarah|emma|miriam|susan|els|nunu|lexie|mum|mummy|mom|mother|verkoopster|juf|waitress|nurse|woman|girl|lady|wife|sister|daughter|grandma|moeder|mama)\b/i
const MALE_NAME = /^(brandon|marc|tom|raj|peter|daniel|mark|mike|julien|daddy|dad|father|barman|waiter|man|bakker|ober|boy|husband|brother|son|grandpa|papa|vader|meester|noah)\b/i

function nameGender(name: string): Gender | undefined {
  if (FEMALE_NAME.test(name)) return 'f'
  if (MALE_NAME.test(name)) return 'm'
  return undefined
}

/**
 * Une voix et une hauteur de voix par personnage, bien distinctes : on prend des voix différentes (de préférence
 * une féminine pour un prénom féminin, une masculine pour un prénom masculin), et si le téléphone n'en propose
 * pas assez on écarte fortement la hauteur et le débit. Le choix est stable (même personnage → même voix).
 */
export function dialogueVoices(speakers: string[], lang = getProgress().settings.accent): SpeakOptions[] {
  loadVoices()
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-')
  let pool = cachedVoices.filter((v) => norm(v) === lang)
  // Pas assez de voix pour la région : on complète avec la même langue (ex. en-US pour en-GB).
  if (pool.length < speakers.length) {
    const more = cachedVoices.filter((v) => v.lang.startsWith(lang.slice(0, 2)) && !pool.includes(v))
    pool = [...pool, ...more]
  }
  const used = new Set<SpeechSynthesisVoice>()
  // Combien de personnages utilisent déjà cette voix (pour écarter leurs hauteurs quand elle est partagée).
  const uses = new Map<SpeechSynthesisVoice | undefined, number>()
  let last: Gender | undefined
  return speakers.map((name, i) => {
    // Genre voulu : celui du prénom ; sinon, l'inverse du personnage précédent pour qu'on les distingue.
    const want: Gender = nameGender(name) ?? (last === 'f' ? 'm' : last === 'm' ? 'f' : i % 2 === 0 ? 'f' : 'm')
    last = want
    const free = pool.filter((v) => !used.has(v))
    const voice = free.find((v) => voiceGender(v) === want) ?? free.find((v) => !voiceGender(v)) ?? free[0] ?? pool[i % Math.max(1, pool.length)]
    const k = uses.get(voice) ?? 0
    const shared = k > 0
    const genderOk = voice ? voiceGender(voice) === want : false
    if (voice) used.add(voice)
    uses.set(voice, k + 1)
    // Voix de genre inconnu ou déjà utilisée : on joue sur la hauteur et le débit pour que les personnages restent distincts.
    const spread = shared || !genderOk ? 0.28 : 0.08
    const base = want === 'f' ? 1 + spread : 1 - spread
    const pitch = base * [1, 0.78, 1.22, 0.9][k % 4]
    const rate = shared ? [1, 0.92, 1.05, 0.97][k % 4] : 1
    return { voice, pitch: Math.min(2, Math.max(0.5, pitch)), rate: rate * getProgress().settings.rate, lang }
  })
}

export function speak(text: string, opts: SpeakOptions = {}) {
  if (!canSpeak()) return
  const { settings } = getProgress()
  window.speechSynthesis.cancel()
  speakQueued(text, { lang: settings.accent, rate: settings.rate, ...opts })
}

/** Ajoute à la file sans couper ce qui est en cours (pour lire un dialogue réplique par réplique). */
export function speakQueued(text: string, opts: SpeakOptions = {}) {
  if (!canSpeak()) return
  const { settings } = getProgress()
  const lang = opts.lang ?? settings.accent
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = opts.rate ?? settings.rate
  const voice = opts.voice ?? pickVoice(lang, opts.voiceVariant ?? 0)
  if (voice) utterance.voice = voice
  if (opts.pitch) utterance.pitch = opts.pitch
  else if (opts.voiceVariant && opts.voiceVariant % 2 === 1 && !voice) utterance.pitch = 0.8
  if (opts.onEnd) utterance.onend = opts.onEnd
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel()
}

// ---------------------------------------------------------------------------
// Reconnaissance vocale
// ---------------------------------------------------------------------------

interface RecognitionAlternative {
  transcript: string
}

interface RecognitionResult {
  isFinal: boolean
  0: RecognitionAlternative
  length: number
}

interface MinimalSpeechRecognition extends EventTarget {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  onresult: ((event: { resultIndex: number; results: ArrayLike<RecognitionResult> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

function getRecognitionCtor(): (new () => MinimalSpeechRecognition) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => MinimalSpeechRecognition
    webkitSpeechRecognition?: new () => MinimalSpeechRecognition
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function canListen() {
  return getRecognitionCtor() !== null
}

/** Écoute une seule phrase (exercices de prononciation). */
export function listenOnce(onResult: (transcript: string) => void, onError: (error: string) => void) {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    onError('unsupported')
    return () => {}
  }
  const recognition = new Ctor()
  recognition.lang = getProgress().settings.accent
  recognition.interimResults = false
  recognition.continuous = false
  recognition.maxAlternatives = 1
  let gotResult = false
  recognition.onresult = (event) => {
    gotResult = true
    onResult(event.results[0]?.[0]?.transcript ?? '')
  }
  recognition.onerror = (event) => onError(event.error)
  recognition.onend = () => {
    if (!gotResult) onError('no-speech')
  }
  recognition.start()
  return () => recognition.stop()
}

/**
 * Écoute en continu (expression orale libre). Chrome coupe parfois la reconnaissance
 * après quelques secondes de silence : on la relance tant que l'utilisateur n'a pas arrêté.
 */
export function listenContinuous(
  onText: (finalText: string, interim: string) => void,
  onError: (error: string) => void,
): () => void {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    onError('unsupported')
    return () => {}
  }
  let stopped = false
  let finalText = ''
  let recognition: MinimalSpeechRecognition | null = null

  const start = () => {
    recognition = new Ctor()
    recognition.lang = getProgress().settings.accent
    recognition.interimResults = true
    recognition.continuous = true
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i]
        if (res.isFinal) finalText += `${res[0].transcript.trim()}. `
        else interim += res[0].transcript
      }
      onText(finalText, interim)
    }
    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return
      stopped = true
      onError(event.error)
    }
    recognition.onend = () => {
      if (!stopped) start()
    }
    recognition.start()
  }
  start()

  return () => {
    stopped = true
    recognition?.stop()
  }
}
