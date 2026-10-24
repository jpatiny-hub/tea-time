// Retour immédiat après une réponse : petit son + vibration (réglage « Sons et vibrations »).
// Les sons sont synthétisés (WebAudio) : aucun fichier à charger, ça marche hors ligne.
import { getProgress } from './store'

let ctx: AudioContext | null = null

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.07) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.0001, ctx.currentTime + start)
  g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(ctx.currentTime + start)
  osc.stop(ctx.currentTime + start + dur + 0.05)
}

function audio(): boolean {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return false
    ctx = ctx ?? new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    return true
  } catch {
    return false
  }
}

export type FeedbackKind = 'ok' | 'ko' | 'win' | 'level'

/** Joue le retour d'une réponse (ou d'une célébration). Sans effet si le réglage est désactivé. */
export function playFeedback(kind: FeedbackKind) {
  if (!getProgress().settings.sounds) return
  if (audio()) {
    if (kind === 'ok') {
      tone(660, 0, 0.12, 'triangle')
      tone(880, 0.09, 0.16, 'triangle')
    } else if (kind === 'ko') {
      tone(220, 0, 0.18, 'sine', 0.06)
      tone(180, 0.13, 0.22, 'sine', 0.05)
    } else if (kind === 'win') {
      ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.2, 'triangle', 0.07))
    } else {
      ;[392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.2, 'square', 0.04))
    }
  }
  try {
    if (navigator.vibrate) navigator.vibrate(kind === 'ko' ? [30, 40, 30] : kind === 'ok' ? 12 : [20, 30, 20, 30, 60])
  } catch {
    // vibration non disponible : sans importance
  }
}
