import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../types'
import { checkAnswer, checkVocab, shuffle, wordDiff, type AnswerVerdict } from '../lib/text'
import { addXp, recordAnswer } from '../lib/progress'
import { getProgress } from '../lib/store'
import { answerXp, levelInfo, perfectBonus, type AnswerQuality } from '../lib/xp'
import { canSpeak, speak } from '../lib/speech'
import { TAG_LABELS } from '../data/content'
import { btnPrimary, btnSecondary, card, hero, input, LevelBadge, Pill, SpeakButton } from './ui'
import { EDITION } from '../edition'
import type { AnswerCheck } from '../lib/text'

interface Result {
  exercise: Exercise
  ok: boolean
  given: string
}

interface Props {
  items: Exercise[]
  title?: string
  onExit: () => void
  onFinish?: (correct: number, total: number) => void
  /** false pour ne pas toucher à la répétition espacée (ex. simple consultation). */
  record?: boolean
}

type Phase = 'answer' | 'feedback'

const kindLabel: Record<Exercise['kind'], string> = {
  mcq: 'Choix multiple',
  gap: 'Phrase à compléter',
  fix: 'Corrige la phrase',
  transform: 'Réécriture',
  card: 'Vocabulaire',
  cloze: 'Texte à trous',
}

export function ExerciseRunner({ items, title, onExit, onFinish, record = true }: Props) {
  const [queue, setQueue] = useState(items)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('answer')
  const [text, setText] = useState('')
  const [choice, setChoice] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<AnswerVerdict | null>(null)
  const [closest, setClosest] = useState('')
  const [override, setOverride] = useState(false)
  // Texte à trous : une saisie par trou, et le verdict de chaque trou après vérification.
  const [blanks, setBlanks] = useState<string[]>([])
  const [blankResults, setBlankResults] = useState<AnswerCheck[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [done, setDone] = useState(false)
  const [round, setRound] = useState(0)
  // Gamification : série de bonnes réponses, XP de la session, XP au départ (pour détecter un passage de niveau).
  const [combo, setCombo] = useState(0)
  const [sessionXp, setSessionXp] = useState(0)
  const [bonusXp, setBonusXp] = useState(0)
  const [startXp, setStartXp] = useState(() => getProgress().xp)
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null)

  const ex = queue[index]

  // Ordre des options mélangé à chaque question (les données ont souvent la bonne réponse en 1er).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => (ex?.kind === 'mcq' ? shuffle(ex.options.map((_, i) => i)) : []), [ex, round, index])

  useEffect(() => {
    if (!ex) return
    setPhase('answer')
    setText(ex.kind === 'fix' ? ex.wrong : '')
    setBlanks(ex.kind === 'cloze' ? ex.blanks.map(() => '') : [])
    setBlankResults([])
    setChoice(null)
    setVerdict(null)
    setClosest('')
    setOverride(false)
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50)
    return () => clearTimeout(t)
  }, [ex, round, index])

  if (!ex && !done) {
    return (
      <div className="px-4 pt-6">
        <p className="text-sm text-gray-500">Aucun exercice à faire ici pour le moment.</p>
        <button onClick={onExit} className={`${btnSecondary} mt-4`}>Retour</button>
      </div>
    )
  }

  const isOk = override || verdict === 'correct' || verdict === 'typo'
  const quality: AnswerQuality = !isOk ? 'wrong' : override && verdict !== 'correct' && verdict !== 'typo' ? 'override' : verdict === 'typo' ? 'typo' : 'perfect'
  const pendingXp = ex ? answerXp(ex, quality, isOk ? combo + 1 : 0) : 0

  function check() {
    if (!ex) return
    if (ex.kind === 'mcq') {
      if (choice === null) return
      setVerdict(choice === ex.answer ? 'correct' : 'wrong')
      setClosest(ex.options[ex.answer])
    } else if (ex.kind === 'gap' || ex.kind === 'fix' || ex.kind === 'transform') {
      if (!text.trim()) return
      const res = checkAnswer(text, ex.answers, ex.kind === 'fix' ? ex.wrong : undefined)
      setVerdict(res.verdict)
      setClosest(res.closest)
      if (canSpeak() && res.verdict !== 'wrong' && ex.kind !== 'gap') speak(res.closest)
    } else if (ex.kind === 'cloze') {
      if (blanks.every((b) => !b.trim())) return
      const res = ex.blanks.map((accepted, i) => checkAnswer(blanks[i] ?? '', accepted))
      setBlankResults(res)
      setVerdict(res.some((r) => r.verdict === 'wrong') ? 'wrong' : res.some((r) => r.verdict === 'typo') ? 'typo' : 'correct')
      setClosest(res.map((r) => r.closest).join(' / '))
    } else if (ex.kind === 'card') {
      if (!text.trim()) return
      const res = checkVocab(text, ex.back)
      setVerdict(res.verdict)
      setClosest(res.closest)
      if (canSpeak()) speak(ex.speak)
    }
    setPhase('feedback')
  }

  // Vocabulaire : « Je ne sais pas » révèle la réponse et compte comme à revoir.
  function giveUp() {
    if (!ex || ex.kind !== 'card') return
    setText('')
    setVerdict('wrong')
    setClosest(ex.back)
    setPhase('feedback')
    if (canSpeak()) speak(ex.speak)
  }

  function commit(ok: boolean) {
    if (!ex) return
    const q: AnswerQuality = ok ? quality : 'wrong'
    const nextCombo = ok ? combo + 1 : 0
    const xp = record ? answerXp(ex, q, nextCombo) : 0
    if (record) recordAnswer(ex, ok, xp)
    setCombo(nextCombo)
    const nextSessionXp = sessionXp + xp
    setSessionXp(nextSessionXp)
    const given = ex.kind === 'mcq' ? (choice !== null ? ex.options[choice] : '') : ex.kind === 'cloze' ? blanks.join(' / ') : text
    const nextResults = [...results, { exercise: ex, ok, given }]
    setResults(nextResults)
    if (index + 1 < queue.length) {
      setIndex(index + 1)
    } else {
      setDone(true)
      const correct = nextResults.filter((r) => r.ok).length
      const bonus = record ? perfectBonus(nextSessionXp, nextResults.length, nextResults.length - correct) : 0
      if (bonus > 0) addXp(bonus)
      setBonusXp(bonus)
      onFinish?.(correct, nextResults.length)
    }
  }

  function restartWith(list: Exercise[]) {
    setQueue(list)
    setIndex(0)
    setResults([])
    setDone(false)
    setRound((r) => r + 1)
    setCombo(0)
    setSessionXp(0)
    setBonusXp(0)
    setStartXp(getProgress().xp)
  }

  if (done) {
    const correct = results.filter((r) => r.ok).length
    const misses = results.filter((r) => !r.ok)
    const pct = Math.round((correct / Math.max(1, results.length)) * 100)
    return (
      <div className="px-4 pt-6">
        <div className={`${hero} p-6 text-center`}>
          <p className="text-sm opacity-90">{title ?? 'Session terminée'}</p>
          <p className="mt-1 text-5xl font-extrabold">{correct} / {results.length}</p>
          {record && (
            <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-extrabold ring-1 ring-white/30">⭐ +{sessionXp + bonusXp} XP</span>
              {bonusXp > 0 && <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-extrabold text-amber-900">Sans faute ! +{bonusXp} bonus</span>}
            </div>
          )}
          <p className="mt-2 text-sm opacity-90">
            {pct >= 90 ? 'Excellent ! 🎉' : pct >= 70 ? 'Bien joué ! 👍' : pct >= 50 ? 'Pas mal, on continue 💪' : 'Ces points reviendront en révision 🔁'}
          </p>
        </div>

        {record && <LevelUp from={startXp} to={startXp + sessionXp + bonusXp} />}

        {misses.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">À retenir</p>
            <div className="mt-2 space-y-2">
              {misses.map((m, i) => (
                <div key={i} className={`${card} p-3 text-sm`}>
                  <p className="text-gray-500 dark:text-gray-400">{promptOf(m.exercise)}</p>
                  {m.given && m.exercise.kind !== 'card' && (
                    <p className="mt-1 text-red-600 line-through decoration-1">{m.given}</p>
                  )}
                  <p className="mt-1 font-medium text-green-700 dark:text-green-400">{answerOf(m.exercise)}</p>
                </div>
              ))}
            </div>
            <button onClick={() => restartWith(shuffle(misses.map((m) => m.exercise)))} className={`${btnPrimary} mt-4`}>
              Refaire mes erreurs ({misses.length})
            </button>
          </div>
        )}

        <button onClick={onExit} className={`${btnSecondary} mt-3`}>Terminer</button>
      </div>
    )
  }

  if (!ex) return null

  return (
    <div className="px-4 pt-6">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={onExit} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-indigo-700 shadow-sm ring-1 ring-gray-900/5 dark:bg-white/10 dark:text-indigo-200 dark:ring-0">✕ Quitter</button>
        <span className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
          {record && combo >= 3 && <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-extrabold text-orange-700 dark:bg-orange-500/20 dark:text-orange-200">🔥 ×{combo}</span>}
          {record && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-extrabold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">⭐ {sessionXp}</span>}
          {index + 1} / {queue.length}
        </span>
      </div>
      <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-white ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-0">
        <div className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-all" style={{ width: `${(index / queue.length) * 100}%` }} />
      </div>

      <div className={`${card} p-5`}>
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="indigo">{ex.kind === 'transform' && ex.instruction.startsWith('Traduis') ? 'Traduction' : kindLabel[ex.kind]}</Pill>
          {ex.level && <LevelBadge level={ex.level} />}
          {ex.tags?.filter((t) => TAG_LABELS[t] && t !== 'vocab').slice(0, 2).map((t) => <Pill key={t}>{TAG_LABELS[t]}</Pill>)}
        </div>

        {ex.kind === 'card' ? (
          <CardView
            ex={ex}
            phase={phase}
            text={text}
            onText={setText}
            onSubmit={() => phase === 'answer' && check()}
            inputRef={inputRef}
          />
        ) : (
          <>
            <Prompt ex={ex} />

            {ex.kind === 'mcq' && (
              <div className="mt-4 space-y-2">
                {order.map((oi) => {
                  const opt = ex.options[oi]
                  const selected = choice === oi
                  const showOk = phase === 'feedback' && oi === ex.answer
                  const showKo = phase === 'feedback' && selected && oi !== ex.answer
                  return (
                    <button
                      key={oi}
                      disabled={phase === 'feedback'}
                      onClick={() => setChoice(oi)}
                      className={`block w-full rounded-2xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                        showOk
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                          : showKo
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                            : selected
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                              : 'border-gray-100 bg-gray-50/60 dark:border-gray-700 dark:bg-transparent'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {ex.kind === 'cloze' && (
              <ClozeView ex={ex} blanks={blanks} onChange={setBlanks} phase={phase} results={blankResults} override={override} inputRef={inputRef} onSubmit={() => phase === 'answer' && check()} />
            )}

            {(ex.kind === 'gap' || ex.kind === 'fix' || ex.kind === 'transform') && (
              ex.kind === 'gap' ? (
                <input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && phase === 'answer' && check()}
                  disabled={phase === 'feedback'}
                  placeholder="Ta réponse…"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className={`${input} mt-4`}
                />
              ) : (
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && phase === 'answer') {
                      e.preventDefault()
                      check()
                    }
                  }}
                  disabled={phase === 'feedback'}
                  rows={3}
                  placeholder={ex.kind === 'fix' ? 'Corrige directement la phrase…' : `Écris ta phrase en ${EDITION.langName}…`}
                  lang={EDITION.lang}
                  autoCapitalize="sentences"
                  autoCorrect="off"
                  spellCheck={false}
                  className={`${input} mt-4 resize-none`}
                />
              )
            )}
          </>
        )}

        {phase === 'feedback' && ex.kind === 'card' && (
          <CardFeedback ex={ex} ok={isOk} verdict={verdict} override={override} given={text} onOverride={() => setOverride(true)} />
        )}

        {phase === 'feedback' && ex.kind === 'cloze' && (
          <ClozeFeedback ex={ex} ok={isOk} verdict={verdict} override={override} results={blankResults} onOverride={() => setOverride(true)} />
        )}

        {phase === 'feedback' && ex.kind !== 'card' && ex.kind !== 'cloze' && (
          <Feedback ex={ex} ok={isOk} verdict={verdict} override={override} closest={closest} given={text} onOverride={() => setOverride(true)} />
        )}
      </div>

      {phase === 'answer' ? (
        <div className="mt-4 flex gap-3">
          {ex.kind === 'card' && (
            <button onClick={giveUp} className={btnSecondary}>Je ne sais pas</button>
          )}
          <button
            onClick={check}
            disabled={ex.kind === 'mcq' ? choice === null : ex.kind === 'cloze' ? blanks.every((b) => !b.trim()) : !text.trim()}
            className={btnPrimary}
          >
            Vérifier
          </button>
        </div>
      ) : (
        <button onClick={() => commit(isOk)} className={`${btnPrimary} mt-4`}>
          {record && <span className="mr-2 rounded-full bg-white/25 px-2 py-0.5 text-xs">+{pendingXp} XP</span>}
          {index + 1 < queue.length ? 'Suivant →' : 'Voir le résultat'}
        </button>
      )}
    </div>
  )
}

function Prompt({ ex }: { ex: Exercise }) {
  switch (ex.kind) {
    case 'mcq':
      return <p className="mt-3 text-base font-semibold">{ex.prompt}</p>
    case 'gap': {
      const [before, after] = splitGap(ex.prompt)
      return (
        <div className="mt-3">
          <p className="text-lg font-medium leading-relaxed">
            {before}
            <span className="mx-1 inline-block min-w-12 border-b-2 border-indigo-500 text-center text-indigo-500">?</span>
            {after}
          </p>
          {ex.hint && <p className="mt-1 text-xs italic text-gray-400">Indice : {ex.hint}</p>}
        </div>
      )
    }
    case 'fix':
      return (
        <div className="mt-3">
          {ex.context && <p className="text-xs italic text-gray-400">{ex.context}</p>}
          <p className="text-lg font-medium text-red-600 dark:text-red-400">✗ {ex.wrong}</p>
          <p className="mt-1 text-xs text-gray-400">Il y a au moins une erreur. Réécris la phrase correcte.</p>
        </div>
      )
    case 'transform':
      return (
        <div className="mt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">{ex.instruction}</p>
          <p className="mt-1 text-lg font-medium">{ex.prompt}</p>
        </div>
      )
    default:
      return null
  }
}

function Feedback({
  ex, ok, verdict, override, closest, given, onOverride,
}: {
  ex: Exercise
  ok: boolean
  verdict: AnswerVerdict | null
  override: boolean
  closest: string
  given: string
  onOverride: () => void
}) {
  const others = 'answers' in ex ? ex.answers.filter((a) => a !== closest).slice(0, 3) : []
  const typed = ex.kind !== 'mcq'
  return (
    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
      {ok ? (
        <p className="font-semibold text-green-600">
          ✓ {override ? 'Validé' : verdict === 'typo' ? 'Correct — attention à l\'orthographe' : 'Correct !'}
        </p>
      ) : (
        <p className="font-semibold text-red-600">✗ Pas tout à fait</p>
      )}

      {typed && (!ok || verdict === 'typo') && ex.kind !== 'gap' && (
        <p className="mt-2 text-sm leading-relaxed">
          {wordDiff(given, closest).map((t, i) => (
            <span
              key={i}
              className={
                t.type === 'missing'
                  ? 'rounded bg-green-100 px-0.5 font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300'
                  : t.type === 'extra'
                    ? 'text-red-500 line-through'
                    : ''
              }
            >
              {t.text}{' '}
            </span>
          ))}
        </p>
      )}

      {(!ok || verdict === 'typo' || ex.kind === 'transform') && (
        <div className="mt-2 flex items-start justify-between gap-2">
          <p className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">{ex.kind === 'transform' && ok ? 'Proposition : ' : 'Réponse : '}</span>
            <span className="font-semibold">{ex.kind === 'gap' ? fillGap(ex.prompt, closest) : closest}</span>
          </p>
          {ex.kind !== 'gap' && <SpeakButton text={closest} small />}
        </div>
      )}

      {others.length > 0 && ex.kind !== 'gap' && (
        <details className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <summary className="cursor-pointer">Autres formulations acceptées ({others.length})</summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {others.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </details>
      )}

      {ex.explanation && <p className="mt-3 rounded-2xl bg-indigo-50 p-3 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">💡 {ex.explanation}</p>}

      {typed && !ok && (
        <button onClick={onOverride} className="mt-3 text-xs text-indigo-600 underline dark:text-indigo-400">
          Ma réponse était correcte (formulation différente)
        </button>
      )}
    </div>
  )
}

function CardView({
  ex, phase, text, onText, onSubmit, inputRef,
}: {
  ex: Extract<Exercise, { kind: 'card' }>
  phase: Phase
  text: string
  onText: (t: string) => void
  onSubmit: () => void
  inputRef: React.RefObject<HTMLTextAreaElement & HTMLInputElement | null>
}) {
  const toFrench = ex.direction === 'en-fr'
  return (
    <div className="mt-3">
      <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-5 text-center dark:bg-gray-800/60">
        <span className="text-xs text-gray-400">{toFrench ? 'Traduis en français' : `Traduis en ${EDITION.langName}`}</span>
        <span className="mt-2 text-2xl font-bold">{ex.front}</span>
        {toFrench && ex.example && phase === 'answer' && (
          <span className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">« {ex.example} »</span>
        )}
        {toFrench && <span className="mt-3"><SpeakButton text={ex.speak} small /></span>}
      </div>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => onText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        disabled={phase === 'feedback'}
        placeholder={toFrench ? 'En français…' : EDITION.lang === 'nl' ? 'In het Nederlands…' : 'In English…'}
        lang={toFrench ? 'fr' : EDITION.lang}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className={`${input} mt-3`}
      />
    </div>
  )
}

function CardFeedback({
  ex, ok, verdict, override, given, onOverride,
}: {
  ex: Extract<Exercise, { kind: 'card' }>
  ok: boolean
  verdict: AnswerVerdict | null
  override: boolean
  given: string
  onOverride: () => void
}) {
  return (
    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
      {ok ? (
        <p className="font-semibold text-green-600">
          ✓ {override ? 'Validé' : verdict === 'typo' ? 'Accepté — petite faute d\'orthographe' : 'Correct !'}
        </p>
      ) : (
        <p className="font-semibold text-red-600">{given.trim() ? '✗ Pas tout à fait' : 'À apprendre'}</p>
      )}
      {verdict === 'typo' && !override && (
        <p className="mt-1 text-sm">
          Tu as écrit <span className="text-red-500 line-through">{given}</span> ; orthographe attendue ci-dessous.
        </p>
      )}
      <div className="mt-2 flex items-start justify-between gap-2">
        <p className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">Réponse : </span>
          <span className="font-semibold">{ex.back}</span>
        </p>
        <SpeakButton text={ex.example ? `${ex.speak}. ${ex.example}` : ex.speak} small />
      </div>
      {ex.example && <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">« {ex.example} »</p>}
      {ex.note && <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">⚠️ {ex.note}</p>}
      {!ok && given.trim() && (
        <button onClick={onOverride} className="mt-3 text-xs text-indigo-600 underline dark:text-indigo-400">
          Ma réponse était correcte (synonyme)
        </button>
      )}
    </div>
  )
}

function fillBlanks(text: string, answers: string[]): string {
  let i = 0
  return text.replace(/___/g, () => answers[i++] ?? '___')
}

/** Texte à trous : le texte avec un champ à la place de chaque `___`. */
function ClozeView({
  ex, blanks, onChange, phase, results, override, inputRef, onSubmit,
}: {
  ex: Extract<Exercise, { kind: 'cloze' }>
  blanks: string[]
  onChange: (b: string[]) => void
  phase: Phase
  results: AnswerCheck[]
  override: boolean
  inputRef: React.RefObject<HTMLTextAreaElement & HTMLInputElement | null>
  onSubmit: () => void
}) {
  const parts = ex.text.split('___')
  const checked = phase === 'feedback'
  return (
    <div className="mt-3">
      <p className="whitespace-pre-line text-lg leading-[2.6rem]">
        {parts.map((part, i) => {
          const accepted = ex.blanks[i]
          const verdict = results[i]?.verdict
          const bad = checked && !override && verdict === 'wrong'
          const good = checked && (override || verdict === 'correct' || verdict === 'typo')
          const width = Math.max(4, Math.min(16, Math.max(...(accepted ?? ['xxxx']).map((a) => a.length)) + 2))
          return (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <input
                  ref={i === 0 ? (inputRef as React.RefObject<HTMLInputElement>) : undefined}
                  value={blanks[i] ?? ''}
                  onChange={(e) => onChange(blanks.map((b, j) => (j === i ? e.target.value : b)))}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return
                    const next = e.currentTarget.closest('p')?.querySelectorAll('input')[i + 1]
                    if (next) (next as HTMLInputElement).focus()
                    else onSubmit()
                  }}
                  disabled={checked}
                  aria-label={`Trou ${i + 1}`}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                  lang={EDITION.lang}
                  style={{ width: `${width}ch` }}
                  className={`mx-1 inline-block rounded-lg border-0 border-b-2 bg-indigo-50/60 px-1 py-0.5 text-center text-base font-semibold outline-none focus:bg-indigo-100/70 dark:bg-white/5 ${
                    bad ? 'border-red-500 text-red-600' : good ? 'border-green-500 text-green-700 dark:text-green-400' : 'border-indigo-400'
                  }`}
                />
              )}
            </span>
          )
        })}
      </p>
      {ex.hint && <p className="mt-1 text-xs italic text-gray-400">Indice : {ex.hint}</p>}
    </div>
  )
}

function ClozeFeedback({
  ex, ok, verdict, override, results, onOverride,
}: {
  ex: Extract<Exercise, { kind: 'cloze' }>
  ok: boolean
  verdict: AnswerVerdict | null
  override: boolean
  results: AnswerCheck[]
  onOverride: () => void
}) {
  const wrong = results.map((r, i) => ({ r, i })).filter(({ r }) => r.verdict === 'wrong')
  const typos = results.filter((r) => r.verdict === 'typo')
  const rightCount = results.filter((r) => r.verdict !== 'wrong').length
  return (
    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
      {ok ? (
        <p className="font-semibold text-green-600">✓ {override ? 'Validé' : verdict === 'typo' ? "Correct — attention à l'orthographe" : 'Correct !'}</p>
      ) : (
        <p className="font-semibold text-red-600">✗ {rightCount} / {results.length} trous justes</p>
      )}
      {!ok && wrong.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm">
          {wrong.map(({ r, i }) => (
            <li key={i}>
              <span className="text-gray-500 dark:text-gray-400">Trou {i + 1} : </span>
              <span className="font-semibold">{r.closest}</span>
            </li>
          ))}
        </ul>
      )}
      {(ok && verdict === 'typo') && typos.length > 0 && (
        <p className="mt-2 text-sm">Orthographe attendue : {typos.map((t) => t.closest).join(', ')}</p>
      )}
      <div className="mt-2 flex items-start justify-between gap-2">
        <p className="text-sm italic text-gray-600 dark:text-gray-300">{fillBlanks(ex.text, ex.blanks.map((b) => b[0]))}</p>
        <SpeakButton text={fillBlanks(ex.text, ex.blanks.map((b) => b[0]))} small />
      </div>
      {ex.explanation && <p className="mt-3 rounded-2xl bg-indigo-50 p-3 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">💡 {ex.explanation}</p>}
      {!ok && (
        <button onClick={onOverride} className="mt-3 text-xs text-indigo-600 underline dark:text-indigo-400">
          Mes réponses étaient correctes (formulation différente)
        </button>
      )}
    </div>
  )
}

function splitGap(prompt: string): [string, string] {
  const i = prompt.indexOf('___')
  return i < 0 ? [prompt, ''] : [prompt.slice(0, i), prompt.slice(i + 3)]
}

function fillGap(prompt: string, answer: string): string {
  const [a, b] = splitGap(prompt)
  return `${a}${answer}${b}`.replace(/\s*\(.*?\)\s*/g, ' ').trim()
}

export function promptOf(ex: Exercise): string {
  switch (ex.kind) {
    case 'mcq': return ex.prompt
    case 'gap': return ex.prompt
    case 'fix': return `✗ ${ex.wrong}`
    case 'transform': return ex.prompt
    case 'card': return ex.front
    case 'cloze': return ex.text
  }
}

export function answerOf(ex: Exercise): string {
  switch (ex.kind) {
    case 'mcq': return ex.options[ex.answer]
    case 'gap': return fillGap(ex.prompt, ex.answers[0])
    case 'fix': return ex.answers[0]
    case 'transform': return ex.answers[0]
    case 'card': return ex.back
    case 'cloze': return fillBlanks(ex.text, ex.blanks.map((b) => b[0]))
  }
}

// Passage de niveau en fin de session (ou simple jauge d'avancement).
function LevelUp({ from, to }: { from: number; to: number }) {
  const before = levelInfo(from)
  const after = levelInfo(to)
  const up = after.level > before.level
  return (
    <div className={`${card} mt-3 ${up ? 'ring-2 ring-amber-400' : ''}`}>
      {up ? (
        <>
          <p className="text-center text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">Level up! 🎉</p>
          <p className="mt-1 text-center text-2xl font-extrabold">Niveau {after.level}</p>
          {after.rank.from > before.level && (
            <p className="mt-1 text-center text-sm font-bold">Nouveau grade : {after.rank.icon} {after.rank.title}</p>
          )}
        </>
      ) : (
        <p className="text-sm font-bold">Niveau {after.level} · {after.rank.icon} {after.rank.title}</p>
      )}
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div className="h-full rounded-full bg-linear-to-r from-amber-400 to-orange-500" style={{ width: `${(after.into / after.needed) * 100}%` }} />
      </div>
      <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">{after.into} / {after.needed} XP avant le niveau {after.level + 1}</p>
    </div>
  )
}
