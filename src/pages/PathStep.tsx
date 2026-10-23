import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { grammarLessons } from '../data/grammar'
import { useProgress, updateProgress } from '../lib/store'
import { canListen } from '../lib/speech'
import {
  correctionStepExercises, findInSentence, followingStep, grammarStepExercises, isStepDone, isStepUnlocked, phraseStepExercises, practiceStepExercises,
  recapExercises, stepOf, unitOf, unitWords, wordStepExercises, type PathStep, type PathUnit,
} from '../lib/path'
import type { Exercise, GrammarLesson, VocabItem } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, btnSecondary, card, Page, Pill, Rich, SpeakButton } from '../components/ui'
import { GrammarPointView } from './GrammarLesson'
import { MicResult, useRecognizer } from './Speaking'

const STEP_XP = 10

function markDone(step: PathStep) {
  updateProgress((d) => {
    if (d.steps[`path:${step.id}`]) return d
    return { ...d, steps: { ...d.steps, [`path:${step.id}`]: true }, xp: d.xp + STEP_XP }
  })
}

// ---------------------------------------------------------------- petites briques

function Dots({ index, total }: { index: number; total: number }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1.5" aria-label={`${index + 1} sur ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`h-1.5 rounded-full ${i === index ? 'w-6 bg-indigo-600' : i < index ? 'w-1.5 bg-indigo-300' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`} />
      ))}
    </div>
  )
}

/** Phrase avec le mot mis en valeur. */
function Highlighted({ sentence, word }: { sentence: string; word: string }) {
  const hit = findInSentence(sentence, word)
  if (!hit) return <>{sentence}</>
  return (
    <>
      {sentence.slice(0, hit.start)}
      <mark className="rounded bg-amber-200/80 px-0.5 font-extrabold text-gray-900 dark:bg-amber-400/30 dark:text-amber-100">{sentence.slice(hit.start, hit.end)}</mark>
      {sentence.slice(hit.end)}
    </>
  )
}

function Repeat({ target }: { target: string }) {
  const rec = useRecognizer(target)
  if (!canListen()) return null
  return (
    <div className="mt-3 text-center">
      <button onClick={rec.start} disabled={rec.listening} className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-extrabold text-white shadow disabled:opacity-60">
        {rec.listening ? 'Je t’écoute…' : '🎤 Répète à voix haute'}
      </button>
      <MicResult result={rec.result} heard={rec.heard} />
    </div>
  )
}

// ---------------------------------------------------------------- découverte des mots, en contexte

function LearnWords({ unit, items, onDone }: { unit: PathUnit; items: VocabItem[]; onDone: () => void }) {
  const [i, setI] = useState(0)
  const it = items[i]
  // D'autres phrases du thème où le mot réapparaît : le mot est vu dans plusieurs contextes.
  const phrases = useMemo(
    () => unit.module.keyPhrases.flatMap((g) => g.phrases).filter((p) => p !== it.example && !!findInSentence(p, it.en)).slice(0, 2),
    [unit, it],
  )
  return (
    <div>
      <Dots index={i} total={items.length} />
      <div className={`${card} p-5 text-center`}>
        <Pill tone="indigo">Nouveau mot {i + 1}/{items.length}</Pill>
        <p className="mt-3 text-3xl font-extrabold leading-tight">{it.en}</p>
        <p className="mt-1 text-lg font-semibold text-emerald-700 dark:text-emerald-300">{it.fr}</p>
        <div className="mt-3 flex justify-center"><SpeakButton text={it.en} label="Écouter" /></div>
        {it.note && <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">⚠️ {it.note}</p>}
      </div>

      {(it.example || phrases.length > 0) && (
        <div className={`${card} mt-3`}>
          <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">En contexte</p>
          <ul className="mt-2 space-y-2">
            {[it.example, ...phrases].filter((p): p is string => !!p).map((p) => (
              <li key={p} className="flex items-center justify-between gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-sm dark:bg-white/5">
                <span className="italic"><Highlighted sentence={p} word={it.en} /></span>
                <SpeakButton text={p} small />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Repeat target={it.en.replace(/\(.*?\)/g, '').split(' / ')[0].replace(/[…?!]+$/, '')} />

      <div className="mt-4 flex gap-3">
        {i > 0 && <button onClick={() => setI(i - 1)} className={btnSecondary}>←</button>}
        <button onClick={() => (i + 1 < items.length ? setI(i + 1) : onDone())} className={btnPrimary}>
          {i + 1 < items.length ? 'Mot suivant →' : 'Passer aux exercices →'}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- grammaire : d'abord observer, puis comprendre

function LearnGrammar({ lesson, onDone }: { lesson: GrammarLesson; onDone: () => void }) {
  const [i, setI] = useState(-1)
  const [shown, setShown] = useState(false)
  const point = lesson.points[i]
  if (i < 0) {
    return (
      <div className={`${card} p-5`}>
        <Pill tone="indigo">Grammaire</Pill>
        <p className="mt-3 text-xl font-extrabold">{lesson.title}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300"><Rich text={lesson.summary} /></p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{lesson.points.length} notion{lesson.points.length > 1 ? 's' : ''} : on regarde d’abord des exemples, puis on les explique.</p>
        <button onClick={() => setI(0)} className={`${btnPrimary} mt-4`}>C’est parti →</button>
      </div>
    )
  }
  return (
    <div>
      <Dots index={i} total={lesson.points.length} />
      {shown ? (
        <GrammarPointView point={point} />
      ) : (
        <div className={`${card} p-5`}>
          <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">Observe ces exemples</p>
          <p className="mt-1 text-lg font-extrabold leading-snug">{point.title}</p>
          <div className="mt-3 space-y-2">
            {point.examples.map((ex, j) => (
              <div key={j} className="flex items-center justify-between gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-sm dark:bg-white/5">
                <div>
                  <p className="font-medium">{ex.en}</p>
                  {ex.fr && <p className="text-xs text-gray-500 dark:text-gray-400">{ex.fr}</p>}
                </div>
                <SpeakButton text={ex.en.replace(/\(.*?\)/g, '')} small />
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Qu’est-ce qui change d’une phrase à l’autre ? Réfléchis, puis regarde l’explication.</p>
        </div>
      )}
      <button
        onClick={() => {
          if (!shown) setShown(true)
          else if (i + 1 < lesson.points.length) {
            setI(i + 1)
            setShown(false)
          } else onDone()
        }}
        className={`${btnPrimary} mt-4`}
      >
        {!shown ? 'Voir l’explication' : i + 1 < lesson.points.length ? 'Notion suivante →' : 'Passer aux exercices →'}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------- phrases utiles : écouter et répéter

function LearnPhrases({ unit, onDone }: { unit: PathUnit; onDone: () => void }) {
  const groups = unit.module.keyPhrases
  const [g, setG] = useState(0)
  const [sel, setSel] = useState<string | null>(null)
  const group = groups[g]
  const target = sel ?? group.phrases[0]
  return (
    <div>
      <Dots index={g} total={groups.length} />
      <div className={`${card} p-5`}>
        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">{group.titleFr}</p>
        <ul className="mt-3 space-y-2">
          {group.phrases.map((p) => (
            <li key={p}>
              <button onClick={() => setSel(p)} className={`flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold ${target === p ? 'bg-indigo-50 ring-2 ring-indigo-400 dark:bg-indigo-500/15' : 'bg-gray-50 dark:bg-white/5'}`}>
                <span>{p}</span>
                <SpeakButton text={p} small />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Touche une phrase pour la choisir, écoute-la, puis répète-la.</p>
        <Repeat target={target} />
      </div>
      <button
        onClick={() => {
          if (g + 1 < groups.length) {
            setG(g + 1)
            setSel(null)
          } else onDone()
        }}
        className={`${btnPrimary} mt-4`}
      >
        {g + 1 < groups.length ? 'Groupe suivant →' : 'Passer aux exercices →'}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------- page d'une étape

function Intro({ icon, title, text, onStart, label = 'Commencer →' }: { icon: string; title: string; text: string; onStart: () => void; label?: string }) {
  return (
    <div className={`${card} p-5 text-center`}>
      <p className="text-4xl">{icon}</p>
      <p className="mt-2 text-xl font-extrabold">{title}</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{text}</p>
      <button onClick={onStart} className={`${btnPrimary} mt-4`}>{label}</button>
    </div>
  )
}

export function PathStepPage() {
  const { unitId, stepKey } = useParams()
  const unit = unitOf(unitId)
  const step = stepOf(unitId, stepKey)
  const data = useProgress()
  if (!unit || !step) return <Page title="Étape introuvable" back={{ to: '/parcours', label: 'Parcours' }}>{null}</Page>
  if (!isStepUnlocked(data, unit, step)) {
    return (
      <Page title="Étape verrouillée" back={{ to: `/parcours/${unit.id}`, label: 'Leçon' }}>
        <p className="text-sm text-gray-600 dark:text-gray-300">🔒 Termine d'abord les étapes précédentes pour débloquer celle-ci.</p>
      </Page>
    )
  }
  return <StepPlayer key={step.id} unit={unit} step={step} />
}

function StepPlayer({ unit, step }: { unit: PathUnit; step: PathStep }) {
  const navigate = useNavigate()
  const data = useProgress()
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn')
  const [exercisesKey, setExercisesKey] = useState(0)
  const next = followingStep(unit, step)
  const mod = unit.module

  const lesson = step.lessonId ? grammarLessons.find((l) => l.id === step.lessonId) : undefined
  const words = useMemo(() => {
    const all = unitWords(unit)
    return (step.wordIds ?? []).map((id) => all.find((w) => w.id === id)).filter((w): w is VocabItem => !!w)
  }, [unit, step])

  // Les exercices sont fabriqués une seule fois par passage (le tirage des mauvaises réponses est aléatoire).
  const exercises: Exercise[] = useMemo(() => {
    switch (step.kind) {
      case 'words': return wordStepExercises(step, unit)
      case 'phrases': return phraseStepExercises(unit)
      case 'grammar': return lesson ? grammarStepExercises(lesson) : []
      case 'corrections': return correctionStepExercises(unit, step.part ?? 0)
      case 'practice': return practiceStepExercises(unit, step.part ?? 0)
      case 'recap': return recapExercises(unit)
      default: return []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, unit, lesson, exercisesKey])

  // Dialogue et lecture : si le quiz a déjà été fait depuis la page du dialogue / du texte, l'étape est validée.
  const legacyKey = step.kind === 'dialogue' ? 'ecoute' : step.kind === 'reading' ? 'lecture' : null
  const legacyDone = legacyKey ? !!data.steps[`${unit.id}:${legacyKey}`] : false
  useEffect(() => {
    if (legacyDone && !isStepDone(data, step)) markDone(step)
  }, [legacyDone, data, step])

  const home = unit.track === 'lexie' ? '/lexie' : '/parcours'
  const goNext = () => navigate(next ? `/parcours/${next.unit.id}/${next.step.key}` : home)
  const back = () => navigate(`/parcours/${unit.id}`)
  const nextLabel = next ? (next.unit.id !== unit.id ? 'Leçon suivante →' : 'Étape suivante →') : 'Retour au parcours'

  // Étapes sans exercices : dialogue, lecture, défi écrit.
  if (step.kind === 'dialogue' || step.kind === 'reading' || step.kind === 'write') {
    const target =
      step.kind === 'dialogue' ? `/pratique/ecoute/${mod.dialogueId}?module=${unit.id}`
      : step.kind === 'reading' ? `/pratique/lecture/${mod.readingId}?module=${unit.id}`
      : `/pratique/ecrit/${mod.writingTaskIds[0]}`
    const done = isStepDone(data, step)
    return (
      <Page title={`${step.icon} ${step.title}`} subtitle={<>{unit.track === 'lexie' ? 'Lexie' : 'Leçon'} {unit.number} · {mod.titleFr}</>} back={{ to: `/parcours/${unit.id}`, label: 'Leçon' }}>
        <div className={`${card} p-5`}>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {step.kind === 'dialogue' && 'Écoute la conversation (tu peux la lire en même temps), puis réponds aux questions. Réécoute autant de fois que tu veux.'}
            {step.kind === 'reading' && 'Lis le texte, regarde le petit lexique, puis réponds aux questions pour vérifier que tu as compris.'}
            {step.kind === 'write' && 'Écris quelques phrases sur le thème, avec le modèle et les expressions à placer. C’est facultatif, mais très efficace.'}
          </p>
          <Link to={target} className={`${btnPrimary} mt-4 block text-center`}>
            {step.kind === 'dialogue' ? '🎧 Ouvrir le dialogue' : step.kind === 'reading' ? '📰 Ouvrir le texte' : '🖋️ Ouvrir le sujet'}
          </Link>
          <button onClick={() => { markDone(step); goNext() }} className={`${btnSecondary} mt-3`}>
            {done ? nextLabel : `J’ai terminé ✓ — ${nextLabel.replace(' →', '')}`}
          </button>
        </div>
      </Page>
    )
  }

  if (phase === 'practice') {
    return (
      <ExerciseRunner
        key={exercisesKey}
        items={exercises}
        ordered={step.kind === 'words' || step.kind === 'grammar' || step.kind === 'practice' || step.kind === 'recap'}
        title={`${step.title} · ${mod.title}`}
        onExit={back}
        onFinish={() => markDone(step)}
        onNext={goNext}
        nextLabel={nextLabel}
      />
    )
  }

  return (
    <Page title={`${step.icon} ${step.title}`} subtitle={<>{unit.track === 'lexie' ? 'Lexie' : 'Leçon'} {unit.number} · {mod.titleFr}</>} back={{ to: `/parcours/${unit.id}`, label: 'Leçon' }}>
      {step.kind === 'words' && <LearnWords unit={unit} items={words} onDone={() => setPhase('practice')} />}
      {step.kind === 'grammar' && lesson && <LearnGrammar lesson={lesson} onDone={() => setPhase('practice')} />}
      {step.kind === 'phrases' && <LearnPhrases unit={unit} onDone={() => setPhase('practice')} />}
      {step.kind === 'corrections' && (
        <Intro icon="🩹" title="Corrige les phrases" text="Ce sont des phrases corrigées pendant tes cours : repère l’erreur et réécris la phrase correctement." onStart={() => { setExercisesKey((k) => k + 1); setPhase('practice') }} />
      )}
      {step.kind === 'practice' && (
        <Intro icon="🧩" title="Mets tout en pratique" text="Tu vas retrouver les mots et la grammaire de la leçon dans des phrases variées : d’abord on choisit, puis on écrit." onStart={() => { setExercisesKey((k) => k + 1); setPhase('practice') }} />
      )}
      {step.kind === 'recap' && (
        <Intro icon="🔁" title="On remélange tout !" text="Des mots des leçons précédentes reviennent dans de nouveaux contextes : c’est comme ça qu’ils s’installent durablement." onStart={() => { setExercisesKey((k) => k + 1); setPhase('practice') }} />
      )}
    </Page>
  )
}
