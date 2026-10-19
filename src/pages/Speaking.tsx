import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sessions } from '../data/sessions/index'
import { modules } from '../data/modules'
import { extraPronunciation } from '../data/pronunciation'
import { canListen, canSpeak, listenContinuous, listenOnce, speak } from '../lib/speech'
import { markStep, recordActivity } from '../lib/progress'
import { ACTIVITY_XP } from '../lib/xp'
import { lintText } from '../lib/lint'
import { containsPhrase, countWords, scoreSpokenMatch, shuffle, type MatchLevel } from '../lib/text'
import type { ModuleId, SpeakingPrompt } from '../types'
import { btnPrimary, btnSecondary, card, Page, Pill, Section } from '../components/ui'

type Tab = 'prononciation' | 'repetition' | 'libre'

const tabs: { id: Tab; label: string }[] = [
  { id: 'prononciation', label: '🗣️ Prononciation' },
  { id: 'repetition', label: '🔁 Répétition' },
  { id: 'libre', label: '🎤 Parole libre' },
]

export function Speaking() {
  const [params, setParams] = useSearchParams()
  const moduleId = params.get('module') as ModuleId | null
  const tab = (params.get('tab') as Tab) ?? 'libre'
  const mod = modules.find((m) => m.id === moduleId)

  function setTab(t: Tab) {
    const next = new URLSearchParams(params)
    next.set('tab', t)
    setParams(next, { replace: true })
  }

  return (
    <Page
      title="🎤 Oral"
      subtitle={mod ? `Module : ${mod.title}` : 'La reconnaissance vocale fonctionne dans Chrome (Android / ordinateur).'}
      back={mod ? { to: `/cours/module/${mod.id}`, label: mod.title } : { to: '/pratique', label: 'Pratique' }}
    >
      <div className="flex gap-1 rounded-xl bg-white p-1 text-xs dark:bg-gray-900">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 rounded-lg py-2 font-semibold ${tab === t.id ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === 'prononciation' && <Pronunciation moduleId={moduleId} />}
        {tab === 'repetition' && <Repetition moduleId={moduleId} />}
        {tab === 'libre' && <FreeSpeech moduleId={moduleId} />}
      </div>
    </Page>
  )
}

// ---------------------------------------------------------------------------

function useRecognizer(target: string) {
  const [listening, setListening] = useState(false)
  const [result, setResult] = useState<MatchLevel | 'error' | null>(null)
  const [heard, setHeard] = useState('')
  // Réinitialise le résultat quand la phrase cible change (sans effet : comparaison au rendu).
  const [lastTarget, setLastTarget] = useState(target)
  if (lastTarget !== target) {
    setLastTarget(target)
    setResult(null)
    setHeard('')
  }
  function start() {
    setResult(null)
    setHeard('')
    setListening(true)
    listenOnce(
      (t) => {
        setListening(false)
        setHeard(t)
        setResult(scoreSpokenMatch(t, target))
        recordActivity(1, ACTIVITY_XP.speakingRepeat)
      },
      () => {
        setListening(false)
        setResult('error')
      },
    )
  }
  return { listening, result, heard, start }
}

function MicResult({ result, heard }: { result: MatchLevel | 'error' | null; heard: string }) {
  if (!result) return null
  if (result === 'error') return <p className="mt-3 text-sm text-red-600">Je n'ai rien entendu, ou le micro n'est pas autorisé.</p>
  return (
    <div className="mt-3 text-sm">
      <p className={`font-semibold ${result === 'correct' ? 'text-green-600' : result === 'close' ? 'text-amber-600' : 'text-red-600'}`}>
        {result === 'correct' ? '✓ Très bien !' : result === 'close' ? '🟡 Presque !' : '✗ Pas tout à fait'}
      </p>
      <p className="text-gray-500 dark:text-gray-400">J'ai compris : « {heard || '…'} »</p>
    </div>
  )
}

function Pronunciation({ moduleId }: { moduleId: ModuleId | null }) {
  const [source, setSource] = useState<'cours' | 'pieges'>('cours')
  const courseItems = sessions.filter((s) => !moduleId || s.module === moduleId).flatMap((s) => s.pronunciation)
  const items = source === 'cours' && courseItems.length > 0 ? courseItems : extraPronunciation
  const [index, setIndex] = useState(0)
  const item = items[index % items.length]
  const rec = useRecognizer(item.word.split(' / ')[0])

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => { setSource('cours'); setIndex(0) }} className={`flex-1 rounded-xl py-2 text-xs font-semibold ${source === 'cours' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200' : 'bg-white text-gray-500 dark:bg-gray-900'}`}>
          Vus en cours ({courseItems.length})
        </button>
        <button onClick={() => { setSource('pieges'); setIndex(0) }} className={`flex-1 rounded-xl py-2 text-xs font-semibold ${source === 'pieges' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200' : 'bg-white text-gray-500 dark:bg-gray-900'}`}>
          Pièges classiques ({extraPronunciation.length})
        </button>
      </div>

      <div className={`${card} mt-3 flex flex-col items-center p-6 text-center`}>
        <p className="text-xs text-gray-400">{(index % items.length) + 1} / {items.length}</p>
        <p className="mt-2 text-3xl font-bold">{item.word}</p>
        <p className="mt-1 font-mono text-indigo-600 dark:text-indigo-400">/{item.guide}/</p>
        {item.tip && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.tip}</p>}
        {item.example && <p className="mt-2 text-sm italic text-gray-500">« {item.example} »</p>}
        <div className="mt-4 flex gap-2">
          {canSpeak() && <button onClick={() => speak(item.word.split(' / ')[0])} className="rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">🔊 Mot</button>}
          {canSpeak() && item.example && <button onClick={() => speak(item.example!)} className="rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">🔊 Phrase</button>}
        </div>
        {canListen() && (
          <button onClick={rec.start} disabled={rec.listening} className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow disabled:opacity-60" aria-label="Parler">
            {rec.listening ? '…' : '🎤'}
          </button>
        )}
        <MicResult result={rec.result} heard={rec.heard} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} className={btnSecondary}>← Précédent</button>
        <button
          onClick={() => {
            if ((index % items.length) + 1 === items.length) markStep(moduleId, 'prononciation')
            setIndex((i) => i + 1)
          }}
          className={btnPrimary}
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}

function Repetition({ moduleId }: { moduleId: ModuleId | null }) {
  const sentences = useMemo(() => {
    const scoped = sessions.filter((s) => !moduleId || s.module === moduleId)
    const fromCorrections = scoped.flatMap((s) => s.corrections.map((c) => c.answers[0]))
    const fromPhrases = modules
      .filter((m) => !moduleId || m.id === moduleId)
      .flatMap((m) => m.keyPhrases.flatMap((g) => g.phrases))
      .filter((p) => !p.includes('…') && !p.includes('+'))
    return shuffle([...fromCorrections, ...fromPhrases])
  }, [moduleId])
  const [index, setIndex] = useState(0)
  const target = sentences[index % sentences.length]
  const rec = useRecognizer(target)

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Écoute la phrase correcte (tirée de tes corrections et des expressions clés), puis répète-la à voix haute : c'est la technique du « shadowing ».
      </p>
      <div className={`${card} mt-3 flex flex-col items-center p-6 text-center`}>
        <p className="text-xl font-semibold leading-snug">{target}</p>
        <div className="mt-4 flex gap-2">
          {canSpeak() && <button onClick={() => speak(target)} className="rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">🔊 Écouter</button>}
          {canSpeak() && <button onClick={() => speak(target, { rate: 0.7 })} className="rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">🐢 Lent</button>}
        </div>
        {canListen() ? (
          <button onClick={rec.start} disabled={rec.listening} className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow disabled:opacity-60" aria-label="Parler">
            {rec.listening ? '…' : '🎤'}
          </button>
        ) : (
          <p className="mt-4 text-xs text-gray-400">Reconnaissance vocale indisponible : répète simplement à voix haute.</p>
        )}
        <MicResult result={rec.result} heard={rec.heard} />
      </div>
      <button onClick={() => setIndex((i) => i + 1)} className={`${btnPrimary} mt-3`}>Phrase suivante →</button>
    </div>
  )
}

function FreeSpeech({ moduleId }: { moduleId: ModuleId | null }) {
  const scoped = modules.filter((m) => !moduleId || m.id === moduleId)
  const prompts: (SpeakingPrompt & { module: ModuleId })[] = scoped.flatMap((m) => m.speaking.map((s) => ({ ...s, module: m.id })))
  const [current, setCurrent] = useState<(SpeakingPrompt & { module: ModuleId }) | null>(null)
  const [recording, setRecording] = useState(false)
  const [finalText, setFinalText] = useState('')
  const [interim, setInterim] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!recording) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [recording])

  useEffect(() => () => stopRef.current?.(), [])

  if (!current) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choisis une question de tes cours et réponds à voix haute pendant 1 à 2 minutes. Ton discours est transcrit : tu vois les expressions utilisées et les erreurs de temps probables.
        </p>
        {prompts.map((p) => (
          <button key={p.id} onClick={() => setCurrent(p)} className={`${card} block w-full text-left`}>
            <p className="text-sm font-medium">{p.question}</p>
            {p.focus && <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">🎯 {p.focus}</p>}
          </button>
        ))}
      </div>
    )
  }

  const mod = modules.find((m) => m.id === current.module)!
  const phrases = mod.keyPhrases.flatMap((g) => g.phrases)
  const transcript = `${finalText}${interim}`
  const used = phrases.filter((p) => containsPhrase(finalText, p))
  const words = countWords(finalText)
  const hits = lintText(finalText).filter((h) => h.level !== 'info')

  function toggle() {
    if (recording) {
      stopRef.current?.()
      stopRef.current = null
      setRecording(false)
      setInterim('')
      if (countWords(finalText) >= 30) markStep(current?.module, 'oral')
      recordActivity(3, countWords(finalText) >= 30 ? ACTIVITY_XP.speakingFree : 3)
      return
    }
    setError(null)
    setRecording(true)
    stopRef.current = listenContinuous(
      (f, i) => {
        setFinalText(f)
        setInterim(i)
      },
      (e) => {
        setRecording(false)
        setError(e === 'unsupported' ? 'Reconnaissance vocale indisponible sur ce navigateur.' : 'Micro indisponible ou permission refusée.')
      },
    )
  }

  function reset() {
    stopRef.current?.()
    stopRef.current = null
    setRecording(false)
    setFinalText('')
    setInterim('')
    setSeconds(0)
  }

  return (
    <div>
      <button onClick={() => { reset(); setCurrent(null) }} className="text-sm text-indigo-600 dark:text-indigo-400">← Questions</button>
      <div className={`${card} mt-2`}>
        <p className="font-semibold">{current.question}</p>
        {current.focus && <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">🎯 {current.focus}</p>}
        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-semibold text-gray-500">Expressions utiles ({used.length} utilisées)</summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {phrases.map((p) => <Pill key={p} tone={used.includes(p) ? 'green' : 'gray'}>{p}</Pill>)}
          </div>
        </details>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <button onClick={toggle} disabled={!canListen()} className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow ${recording ? 'animate-pulse bg-red-600' : 'bg-indigo-600'} disabled:opacity-40`}>
          {recording ? '⏹' : '🎤'}
        </button>
        <p className="mt-2 text-sm text-gray-500">
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')} · {words} mots{seconds > 10 ? ` · ${Math.round((words / seconds) * 60)} mots/min` : ''}
        </p>
        {!canListen() && <p className="mt-2 text-center text-xs text-gray-400">Pas de reconnaissance vocale ici : entraîne-toi à voix haute avec le chronomètre, ou utilise Chrome.</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {transcript && (
        <Section title="Transcription">
          <div className={card}>
            <p className="text-sm leading-relaxed">{finalText}<span className="text-gray-400">{interim}</span></p>
          </div>
          {!recording && hits.length > 0 && (
            <div className={`${card} space-y-2 p-3`}>
              <p className="text-xs font-semibold text-amber-600">Points à vérifier dans ce que tu as dit</p>
              {hits.map((h, i) => (
                <p key={i} className="text-xs"><span className="font-mono">{h.excerpt}</span> — {h.message}</p>
              ))}
              <p className="text-[0.6875rem] text-gray-400">La transcription peut elle-même contenir des erreurs de reconnaissance.</p>
            </div>
          )}
          {!recording && <button onClick={reset} className={btnSecondary}>Recommencer</button>}
        </Section>
      )}
    </div>
  )
}
