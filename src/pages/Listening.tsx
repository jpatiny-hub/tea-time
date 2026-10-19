import { useMemo, useState } from 'react'
import { dialogues } from '../data/dialogues'
import { allCorrections } from '../data/content'
import { modules } from '../data/modules'
import { canSpeak, speak } from '../lib/speech'
import { recordActivity } from '../lib/progress'
import { ACTIVITY_XP } from '../lib/xp'
import { EDITION } from '../edition'
import { checkAnswer, shuffle, wordDiff } from '../lib/text'
import { btnPrimary, btnSecondary, card, input, LevelBadge, ListLink, Page, Section } from '../components/ui'

// Dictée : les phrases CORRECTES de tes cours, pour entendre et écrire la bonne version.
function buildDictation(n = 8): string[] {
  // Jojo : les phrases corrigées en cours. Jujularage : les expressions clés de ses modules.
  const fromCourses = allCorrections.map((c) => c.answers[0])
  const pool = fromCourses.length > 0 ? fromCourses : modules.flatMap((m) => m.keyPhrases.flatMap((g) => g.phrases)).filter((p) => !p.includes('…'))
  const sentences = pool.filter((s) => s.split(' ').length >= (fromCourses.length > 0 ? 5 : 3))
  return shuffle(sentences).slice(0, n)
}

export function Listening() {
  const [dictation, setDictation] = useState<string[] | null>(null)

  if (dictation) return <Dictation sentences={dictation} onExit={() => setDictation(null)} />

  return (
    <Page title="🎧 Écoute & dictée" subtitle={`Comprendre le ${EDITION.langName} parlé, et l'écrire sans faute.`} back={{ to: '/pratique', label: 'Pratique' }}>
      <div className={card}>
        <p className="font-semibold">✍️ Dictée</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          8 phrases tirées de tes cours : tu entends la version correcte, tu l'écris. Idéal pour fixer les bonnes structures.
        </p>
        <button onClick={() => setDictation(buildDictation())} disabled={!canSpeak()} className={`${btnPrimary} mt-3`}>Commencer une dictée</button>
        {!canSpeak() && <p className="mt-2 text-xs text-red-600">Synthèse vocale indisponible sur ce navigateur.</p>}
      </div>

      <Section title="Dialogues">
        {dialogues.map((d) => (
          <ListLink key={d.id} to={`/pratique/ecoute/${d.id}`} title={d.title} subtitle={modules.find((m) => m.id === d.module)?.title} right={<LevelBadge level={d.level} />} />
        ))}
      </Section>
    </Page>
  )
}

function Dictation({ sentences, onExit }: { sentences: string[]; onExit: () => void }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [slow, setSlow] = useState(false)
  const target = sentences[index]
  const result = useMemo(() => (checked ? checkAnswer(text, [target]) : null), [checked, text, target])

  function play() {
    speak(target, slow ? { rate: 0.7 } : {})
  }

  function check() {
    setChecked(true)
    const ok = checkAnswer(text, [target]).verdict !== 'wrong'
    recordActivity(1, ok ? ACTIVITY_XP.dictation : 1)
    if (ok) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= sentences.length) {
      onExit()
      return
    }
    setIndex(index + 1)
    setText('')
    setChecked(false)
  }

  return (
    <div className="px-4 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onExit} className="text-sm text-indigo-600">✕ Quitter</button>
        <span className="text-sm text-gray-500">{index + 1} / {sentences.length} · {score} ✓</span>
      </div>
      <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <button onClick={play} className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-3xl text-white shadow" aria-label="Écouter">🔊</button>
        <label className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} className="accent-indigo-600" /> Lent
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={checked}
        rows={3}
        placeholder="Écris ce que tu entends…"
        autoCapitalize="sentences"
        autoCorrect="off"
        spellCheck={false}
        className={`${input} mt-4 resize-none`}
      />
      {checked && result && (
        <div className={`${card} mt-3`}>
          <p className={`font-semibold ${result.verdict === 'wrong' ? 'text-red-600' : 'text-green-600'}`}>
            {result.verdict === 'correct' ? '✓ Parfait !' : result.verdict === 'typo' ? '✓ Presque (une lettre)' : '✗ Quelques différences'}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            {wordDiff(text, target).map((t, i) => (
              <span key={i} className={t.type === 'missing' ? 'rounded bg-green-100 px-0.5 font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300' : t.type === 'extra' ? 'text-red-500 line-through' : ''}>
                {t.text}{' '}
              </span>
            ))}
          </p>
        </div>
      )}
      {!checked ? (
        <button onClick={check} disabled={!text.trim()} className={`${btnPrimary} mt-4`}>Vérifier</button>
      ) : (
        <button onClick={next} className={`${btnSecondary} mt-4`}>{index + 1 < sentences.length ? 'Suivant →' : `Terminer (${score}/${sentences.length})`}</button>
      )}
    </div>
  )
}
