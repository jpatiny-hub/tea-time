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
  onEnd?: () => void
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
  const voice = pickVoice(lang, opts.voiceVariant ?? 0)
  if (voice) utterance.voice = voice
  if (opts.voiceVariant && opts.voiceVariant % 2 === 1 && !voice) utterance.pitch = 0.8
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
