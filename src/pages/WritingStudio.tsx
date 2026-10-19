import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { writingTasks } from '../data/writing'
import { updateProgress, useProgress } from '../lib/store'
import { markStep, recordActivity } from '../lib/progress'
import { writingXp } from '../lib/xp'
import { EDITION, isDutch } from '../edition'
import { lintText } from '../lib/lint'
import { containsPhrase, countWords, formatDateFr } from '../lib/text'
import { btnPrimary, btnSecondary, card, LevelBadge, Page, Pill, Section, SpeakButton } from '../components/ui'

export function WritingStudio() {
  const { taskId } = useParams()
  const [params] = useSearchParams()
  const moduleId = params.get('module')
  const themeId = params.get('theme')
  const task = writingTasks.find((t) => t.id === taskId)
  const data = useProgress()
  const [text, setText] = useState(() => (taskId ? data.drafts[taskId] ?? '' : ''))
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [finished, setFinished] = useState(false)
  const [copied, setCopied] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Brouillon enregistré automatiquement (léger délai pour ne pas écrire à chaque touche).
  useEffect(() => {
    if (!taskId || finished) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updateProgress((d) => ({ ...d, drafts: { ...d.drafts, [taskId]: text } }))
    }, 800)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [text, taskId, finished])

  const hits = useMemo(() => (isDutch ? [] : lintText(text)), [text])

  if (!task) return <Page title="Sujet introuvable" back={{ to: '/pratique/ecrit', label: 'Atelier' }}>{null}</Page>

  const words = countWords(text)
  const used = task.targetPhrases.filter((p) => containsPhrase(text, p))
  const lengthTone = words < task.minWords ? 'text-amber-600' : words > task.maxWords ? 'text-red-600' : 'text-green-600'
  const previous = data.writing.filter((w) => w.taskId === task.id)

  function finish() {
    if (!task) return
    const entry = {
      id: `${task.id}-${Date.now()}`,
      taskId: task.id,
      date: new Date().toISOString(),
      text,
      words,
      phrasesUsed: used.length,
      phrasesTotal: task.targetPhrases.length,
    }
    updateProgress((d) => {
      const drafts = { ...d.drafts }
      delete drafts[task.id]
      return { ...d, writing: [...d.writing, entry], drafts }
    })
    recordActivity(5, writingXp(used.length, task.targetPhrases.length))
    markStep(moduleId ?? task.module, 'ecrit')
    setFinished(true)
    window.scrollTo(0, 0)
  }

  async function copyForFeedback() {
    if (!task) return
    const prompt = `Tu es mon professeur de ${EDITION.langName}. Je suis francophone, niveau ${EDITION.levels[0]}, et je vise le ${EDITION.levels[EDITION.levels.length - 1]}. Adapte tes explications à mon niveau.
Voici un texte que j'ai écrit. Sujet : "${task.prompt}"

Merci de :
1. corriger toutes les erreurs (grammaire, temps — surtout past simple / present perfect —, prépositions, vocabulaire), en expliquant chaque correction en français ;
2. proposer des formulations plus naturelles (niveau ${EDITION.levels[EDITION.levels.length - 1]}) ;
3. donner une version corrigée complète ;
4. me donner 3 conseils prioritaires pour progresser.

Mon texte :
"""
${text}
"""`
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const back = themeId ? { to: `/themes/${themeId}`, label: 'Thème' } : moduleId ? { to: `/pratique/ecrit?module=${moduleId}`, label: 'Atelier' } : { to: '/pratique/ecrit', label: 'Atelier' }

  if (finished) {
    return (
      <Page title="Texte enregistré ✓" subtitle={`${words} mots · ${used.length}/${task.targetPhrases.length} expressions cibles · +${writingXp(used.length, task.targetPhrases.length)} XP ⭐`} back={back}>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Ton texte</p>
          <p className="mt-2 whitespace-pre-wrap text-sm">{text}</p>
        </div>
        <div className={`${card} mt-3 border-indigo-200 dark:border-indigo-900`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Modèle de réponse</p>
            <SpeakButton text={task.model} small />
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm">{task.model}</p>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Compare : structure, temps utilisés, connecteurs, expressions. Repère 2 ou 3 formulations du modèle à réutiliser la prochaine fois.
        </p>
        <button onClick={copyForFeedback} className={`${btnSecondary} mt-3`}>
          {copied ? '✓ Copié ! Colle-le dans ton assistant IA' : '📋 Copier une demande de correction détaillée'}
        </button>
        <button onClick={() => { setText(''); setFinished(false); setChecked({}) }} className={`${btnPrimary} mt-2`}>
          Réécrire ce sujet
        </button>
      </Page>
    )
  }

  return (
    <Page title={task.title} subtitle={<span className="flex items-center gap-2"><LevelBadge level={task.level} /> {task.minWords}–{task.maxWords} mots</span>} back={back}>
      <div className={card}>
        <p className="text-sm font-medium leading-relaxed">{task.prompt}</p>
        <details className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <summary className="cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-400">💡 Conseils en français</summary>
          <p className="mt-1">{task.tipsFr}</p>
        </details>
      </div>

      <div className="mt-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Expressions à placer ({used.length}/{task.targetPhrases.length})</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {task.targetPhrases.map((p) => (
            <Pill key={p} tone={used.includes(p) ? 'green' : 'gray'}>{used.includes(p) ? '✓ ' : ''}{p}</Pill>
          ))}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        placeholder="Write your text here…"
        spellCheck
        lang="en"
        className="mt-3 w-full rounded-2xl border border-gray-300 bg-white p-4 text-base leading-relaxed dark:border-gray-700 dark:bg-gray-900"
      />
      <div className="mt-1 flex justify-between text-xs">
        <span className={`font-semibold ${lengthTone}`}>{words} mots</span>
        <span className="text-gray-400">Brouillon enregistré automatiquement</span>
      </div>

      {hits.length > 0 && (
        <Section title={`Relecture automatique (${hits.filter((h) => h.level !== 'info').length})`}>
          <div className={`${card} space-y-2 p-3`}>
            {hits.map((h, i) => (
              <div key={i} className="text-sm">
                <span className={`mr-1 text-xs font-bold uppercase ${h.level === 'erreur' ? 'text-red-600' : h.level === 'à vérifier' ? 'text-amber-600' : 'text-sky-600'}`}>{h.level}</span>
                <span className="rounded bg-gray-100 px-1 font-mono text-xs dark:bg-gray-800">{h.excerpt}</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">{h.message}</p>
              </div>
            ))}
            <p className="text-[0.6875rem] text-gray-400">Basé sur les erreurs fréquentes des francophones et celles de tes cours. Ne remplace pas une vraie correction.</p>
          </div>
        </Section>
      )}

      <Section title="Avant de terminer, vérifie">
        <div className={`${card} space-y-2 p-3`}>
          {task.checklist.map((c, i) => (
            <label key={i} className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={!!checked[i]} onChange={(e) => setChecked({ ...checked, [i]: e.target.checked })} className="mt-1 h-4 w-4 accent-indigo-600" />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </Section>

      <button onClick={finish} disabled={words < 20} className={`${btnPrimary} mt-4`}>
        Terminer et voir le modèle
      </button>

      {previous.length > 0 && (
        <Section title="Mes versions précédentes">
          {[...previous].reverse().map((w) => (
            <details key={w.id} className={card}>
              <summary className="cursor-pointer text-sm font-semibold">{formatDateFr(w.date)} · {w.words} mots</summary>
              <p className="mt-2 whitespace-pre-wrap text-sm">{w.text}</p>
            </details>
          ))}
        </Section>
      )}
    </Page>
  )
}
