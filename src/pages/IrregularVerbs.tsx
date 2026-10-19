import { useMemo, useState } from 'react'
import { irregularVerbs } from '../data/irregular-verbs'
import { extra } from '../data/edition-content'
import { isDutch } from '../edition'
import { irregularExercise } from '../data/content'
import { useProgress } from '../lib/store'
import { pickExercises } from '../lib/select'
import { masteryOf } from '../lib/srs'
import { normalizeForComparison } from '../lib/text'
import type { Exercise } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, btnSecondary, card, Page, Pill, SpeakButton } from '../components/ui'

const tiers = [
  { tier: 1, label: 'Incontournables', desc: 'Les plus fréquents' },
  { tier: 2, label: 'Courants', desc: extra ? 'Pour aller plus loin' : 'Pour le niveau B2' },
  { tier: 3, label: 'Avancés', desc: 'Vers le C1' },
] as const

export function IrregularVerbs() {
  const data = useProgress()
  const [tier, setTier] = useState<1 | 2 | 3>(1)
  const [query, setQuery] = useState('')
  const [run, setRun] = useState<Exercise[] | null>(null)

  const list = useMemo(() => {
    const q = normalizeForComparison(query)
    return irregularVerbs.filter((v) =>
      q ? normalizeForComparison(`${v.base} ${v.past} ${v.participle} ${v.fr}`).includes(q) : v.tier === tier,
    )
  }, [tier, query])

  if (run) return <ExerciseRunner items={run} title={extra ? extra.ui.verbsTitle : 'Verbes irréguliers'} onExit={() => setRun(null)} />

  const pool = irregularVerbs.filter((v) => v.tier === tier).map(irregularExercise)

  return (
    <Page title={`📜 ${extra ? extra.ui.verbsTitle : 'Verbes irréguliers'}`} subtitle={isDutch ? 'Infinitif → imparfait (singulier) → participe passé (utilisé avec hebben ou zijn). Tape les deux formes séparées par un espace.' : 'Base → prétérit (past simple) → participe passé (present perfect, passif). Tape les deux formes séparées par un espace.'} back={{ to: '/temps', label: 'Labo des temps' }}>
      <div className="flex gap-2">
        {tiers.map((t) => (
          <button
            key={t.tier}
            onClick={() => { setTier(t.tier); setQuery('') }}
            className={`flex-1 rounded-xl px-2 py-2 text-xs font-semibold ${tier === t.tier && !query ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => setRun(pickExercises(pool, data, 15))} className={btnPrimary}>S'entraîner (15)</button>
        <button onClick={() => setRun(pool)} className={btnSecondary}>Tout le niveau ({pool.length})</button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Rechercher un verbe (${isDutch ? 'néerlandais' : 'anglais'} ou français)…`}
        className="mt-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900"
      />

      <div className={`${card} mt-3 p-0`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="px-3 py-2">Base</th>
              <th className="px-2 py-2">Prétérit</th>
              <th className="px-2 py-2">Participe</th>
              <th className="px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {list.map((v) => {
              const m = masteryOf(data.srs[`irr-${v.base}`])
              return (
                <tr key={v.base} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-2">
                    <p className="font-semibold">{v.base}</p>
                    <p className="text-[0.6875rem] text-gray-500">{v.fr}</p>
                  </td>
                  <td className="px-2 py-2">{v.past}</td>
                  <td className="px-2 py-2">{v.participle}</td>
                  <td className="px-2 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {m !== 'nouveau' && <Pill tone={m === 'en cours' ? 'amber' : 'green'}>{m === 'en cours' ? '…' : '✓'}</Pill>}
                      <SpeakButton text={`${v.base}, ${v.past.replace(' / ', ', ')}, ${v.participle.replace(' / ', ', ')}`} small />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Page>
  )
}
