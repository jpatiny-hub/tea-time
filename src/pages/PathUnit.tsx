import { Link, useParams } from 'react-router-dom'
import { useProgress } from '../lib/store'
import { isStepDone, isStepUnlocked, isUnitComplete, isUnitUnlocked, unitDoneCount, unitOf, unitsOfTrack } from '../lib/path'
import { Confetti, Pixel } from '../components/Pixel'
import { UnitOverviewList } from './Path'
import { card, Page, ProgressBar } from '../components/ui'

export function PathUnitPage() {
  const { unitId } = useParams()
  const data = useProgress()
  const unit = unitOf(unitId)
  if (!unit) return <Page title="Leçon introuvable" back={{ to: '/parcours', label: 'Parcours' }}>{null}</Page>
  const m = unit.module
  const home = unit.track === 'lexie' ? { to: '/lexie', label: 'Lexie' } : { to: '/parcours', label: 'Parcours' }
  const { done, total } = unitDoneCount(data, unit)
  const unlocked = isUnitUnlocked(data, unit)
  const current = unit.steps.find((s) => !s.optional && !isStepDone(data, s))

  return (
    <Page title={`${m.icon} ${m.title}`} subtitle={<>{unit.track === 'lexie' ? 'Lexie' : 'Leçon'} {unit.number} · {m.titleFr}</>} back={home}>
      <div className={`${card} text-sm`}>
        <p className="text-gray-600 dark:text-gray-300">{m.description}</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1"><ProgressBar value={done} max={total} /></div>
          <span className="text-xs font-bold text-gray-500">{done}/{total}</span>
        </div>
      </div>

      {isUnitComplete(data, unit) && (
        <div className="relative isolate mt-3 overflow-hidden rounded-3xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30">
          <Confetti seed={unit.number} />
          <div className="flex justify-center"><Pixel name="trophy" size={64} label="Trophée" /></div>
          <p className="mt-1 text-lg font-extrabold">Leçon terminée, bravo !</p>
          {unitsOfTrack(unit.track)[unit.number] ? (
            <Link to={`/parcours/${unitsOfTrack(unit.track)[unit.number].id}`} className="mt-2 inline-block rounded-full bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white">Leçon suivante →</Link>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">Tu as fini tout le parcours !</p>
          )}
        </div>
      )}

      <div className="mt-3"><UnitOverviewList unit={unit} /></div>

      {!unlocked && <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">🔒 Termine d'abord la leçon précédente pour débloquer celle-ci.</p>}

      <ol className="mt-4 space-y-2.5">
        {unit.steps.map((s, i) => {
          const isDone = isStepDone(data, s)
          const open = isStepUnlocked(data, unit, s)
          const isCurrent = current?.id === s.id
          const body = (
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${isDone ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400'}`}>
                {isDone ? '✓' : open ? s.icon : '🔒'}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-snug">{i + 1}. {s.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.subtitle}</p>
              </div>
              {open && <span className={`text-xl font-bold ${isCurrent ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-300'}`}>›</span>}
            </div>
          )
          return (
            <li key={s.id}>
              {open ? (
                <Link to={`/parcours/${unit.id}/${s.key}`} className={`${card} block ${isCurrent ? 'ring-2 ring-indigo-500' : ''}`}>{body}</Link>
              ) : (
                <div className={`${card} opacity-55`} aria-disabled>{body}</div>
              )}
            </li>
          )
        })}
      </ol>
    </Page>
  )
}
