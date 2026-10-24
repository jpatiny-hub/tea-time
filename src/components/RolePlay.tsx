import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dialogue } from '../types'
import { canListen, canSpeak, dialogueVoices, listenOnce, speakQueued, stopSpeaking } from '../lib/speech'
import { scoreSpokenMatch, type MatchLevel } from '../lib/text'
import { recordActivity } from '../lib/progress'
import { ACTIVITY_XP } from '../lib/xp'
import { btnPrimary, btnSecondary, card, SpeakButton } from './ui'
import { TapText } from './TapText'

type Outcome = MatchLevel | 'skipped'

/**
 * Jeu de rôle : on choisit un personnage, l'appli joue les autres (avec leurs voix) et on dit ses propres répliques
 * à voix haute ; la reconnaissance vocale compare avec le texte. Sans micro, on peut dire la phrase et passer.
 */
export function RolePlay({ dialogue, onClose, onFinish, onNext, nextLabel }: { dialogue: Dialogue; onClose: () => void; onFinish?: (score: number, total: number) => void; onNext?: () => void; nextLabel?: string }) {
  const speakers = useMemo(() => Array.from(new Set(dialogue.lines.map((l) => l.speaker))), [dialogue])
  const [role, setRole] = useState<string | null>(null)
  const [i, setI] = useState(0)
  const [outcomes, setOutcomes] = useState<Record<number, Outcome>>({})
  const [heard, setHeard] = useState('')
  const [listening, setListening] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const voices = useMemo(() => dialogueVoices(speakers), [speakers])
  const bottom = useRef<HTMLDivElement>(null)
  const finished = role !== null && i >= dialogue.lines.length
  const mine = (idx: number) => dialogue.lines[idx]?.speaker === role

  // Les répliques des autres sont jouées automatiquement, puis on passe à la suivante.
  useEffect(() => {
    if (role === null || finished) return
    const line = dialogue.lines[i]
    setHeard('')
    setRevealed(false)
    if (line.speaker === role) return
    if (!canSpeak()) return
    stopSpeaking()
    const idx = speakers.indexOf(line.speaker)
    speakQueued(line.text, { ...voices[idx], onEnd: () => setTimeout(() => setI((n) => (n === i ? n + 1 : n)), 350) })
    return () => stopSpeaking()
  }, [role, i, finished, dialogue, speakers, voices])

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'nearest' })
  }, [i, outcomes, heard])

  useEffect(() => {
    if (!finished || !role) return
    const myLines = dialogue.lines.map((l, idx) => (l.speaker === role ? idx : -1)).filter((x) => x >= 0)
    const ok = myLines.filter((idx) => outcomes[idx] === 'correct' || outcomes[idx] === 'close').length
    recordActivity(myLines.length, ACTIVITY_XP.speakingRepeat * ok)
    onFinish?.(ok, myLines.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function speakMine() {
    const line = dialogue.lines[i]
    setHeard('')
    setListening(true)
    listenOnce(
      (t) => {
        setListening(false)
        setHeard(t)
        setOutcomes((o) => ({ ...o, [i]: scoreSpokenMatch(t, line.text) }))
      },
      () => {
        setListening(false)
        setOutcomes((o) => ({ ...o, [i]: 'wrong' }))
        setHeard('')
      },
    )
  }

  if (role === null) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-3xl">🎭</p>
        <p className="mt-1 text-lg font-extrabold">Jeu de rôle</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Choisis ton personnage : l’appli joue les autres, et toi tu dis tes répliques à voix haute.</p>
        <div className="mt-4 space-y-2">
          {speakers.map((s) => (
            <button key={s} onClick={() => { setRole(s); setI(0) }} className={btnPrimary}>Je suis {s}</button>
          ))}
        </div>
        <label className="mt-4 flex items-center justify-center gap-2 text-sm">
          <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="h-5 w-5 accent-indigo-600" />
          Cacher mes répliques (de mémoire)
        </label>
        <button onClick={onClose} className="mt-4 text-xs text-gray-500 underline">Retour</button>
      </div>
    )
  }

  const shown = dialogue.lines.slice(0, Math.min(i + 1, dialogue.lines.length))
  const current = dialogue.lines[i]
  const outcome = outcomes[i]
  const myIdxs = dialogue.lines.map((l, idx) => (l.speaker === role ? idx : -1)).filter((x) => x >= 0)

  return (
    <div>
      <div className="space-y-2">
        {shown.map((l, idx) => {
          const isMine = l.speaker === role
          const hide = isMine && hidden && idx === i && !revealed && !finished
          return (
            <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${isMine ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-100'}`}>
                <p className={`text-[0.6875rem] font-bold ${isMine ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-300'}`}>{l.speaker}</p>
                {hide ? <p className="italic opacity-80">🔒 Dis ta réplique de mémoire…</p> : <p><TapText text={l.text} target /></p>}
                {isMine && outcomes[idx] && idx !== i && <p className="mt-0.5 text-xs">{outcomes[idx] === 'correct' ? '✓ très bien' : outcomes[idx] === 'close' ? '🟡 presque' : outcomes[idx] === 'skipped' ? '↪ passée' : '✗ à retravailler'}</p>}
              </div>
            </div>
          )
        })}
        <div ref={bottom} />
      </div>

      {!finished && mine(i) && (
        <div className={`${card} mt-4`}>
          <p className="text-sm font-bold">À toi ! {current.speaker}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {hidden && !revealed && <button onClick={() => setRevealed(true)} className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold dark:bg-gray-800">👁 Voir ma réplique</button>}
            <SpeakButton text={current.text} label="Modèle" slow />
          </div>
          {canListen() ? (
            <button onClick={speakMine} disabled={listening} className={`${btnPrimary} mt-3`}>{listening ? 'Je t’écoute…' : outcome ? '🎤 Réessayer' : '🎤 Dire ma réplique'}</button>
          ) : (
            <p className="mt-2 text-xs text-gray-500">Le micro n’est pas disponible ici : dis ta réplique à voix haute, puis continue.</p>
          )}
          {outcome && outcome !== 'skipped' && (
            <p className={`mt-3 text-sm font-semibold ${outcome === 'correct' ? 'text-green-600' : outcome === 'close' ? 'text-amber-600' : 'text-red-600'}`}>
              {outcome === 'correct' ? '✓ Très bien !' : outcome === 'close' ? '🟡 Presque !' : '✗ Pas tout à fait'}
              {heard && <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">J’ai compris : « {heard} »</span>}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button onClick={() => { if (!outcome) setOutcomes((o) => ({ ...o, [i]: 'skipped' })); setI(i + 1) }} className={btnSecondary}>{outcome || !canListen() ? 'Continuer →' : 'Passer'}</button>
          </div>
        </div>
      )}

      {!finished && !mine(i) && <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">{canSpeak() ? '🔊 …' : 'Voix indisponible'} <button onClick={() => setI(i + 1)} className="ml-2 underline">Continuer →</button></p>}

      {finished && (
        <div className={`${card} mt-4 text-center`}>
          <p className="text-3xl">🎉</p>
          <p className="mt-1 text-lg font-extrabold">Dialogue joué !</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {myIdxs.filter((idx) => outcomes[idx] === 'correct' || outcomes[idx] === 'close').length} réplique(s) réussie(s) sur {myIdxs.length}.
          </p>
          <button onClick={() => { setRole(null); setOutcomes({}); setI(0) }} className={`${btnSecondary} mt-4`}>Rejouer avec un autre rôle</button>
          {onNext && <button onClick={onNext} className={`${btnPrimary} mt-3`}>{nextLabel ?? 'Continuer →'}</button>}
          <button onClick={onClose} className="mt-3 text-xs text-gray-500 underline">Terminer</button>
        </div>
      )}
    </div>
  )
}
