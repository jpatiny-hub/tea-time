import { Link, useNavigate } from 'react-router-dom'
import { updateProgress, useProgress } from '../lib/store'
import { isStepDone, isUnitComplete, isUnitUnlocked, nextStep, pathUnits, unitDoneCount } from '../lib/path'
import { card, cardLink, hero, IconTile, Page, ProgressBar } from '../components/ui'

/** Carte « Continue ta leçon » (Parcours et accueil). */
export function ContinueCard() {
  const data = useProgress()
  const next = nextStep(data)
  if (!next) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-3xl">🎉</p>
        <p className="mt-1 font-extrabold">Tout le parcours est terminé !</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Continue avec la révision et les exercices libres.</p>
      </div>
    )
  }
  const { unit, step } = next
  const { done, total } = unitDoneCount(data, unit)
  return (
    <Link to={`/parcours/${unit.id}/${step.key}`} className={`${hero} relative block overflow-hidden`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Leçon {unit.number} · {unit.module.titleFr}</p>
      <p className="mt-1 text-xl font-extrabold leading-tight">{done === 0 ? 'Commencer la leçon' : 'Continuer la leçon'}</p>
      <p className="mt-0.5 text-sm text-white/85">{step.icon} {step.title}</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{ width: `${(done / Math.max(1, total)) * 100}%` }} /></div>
        <span className="text-xs font-bold">{done}/{total}</span>
        <span className="rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-indigo-700">Go ›</span>
      </div>
    </Link>
  )
}

export function Path() {
  const data = useProgress()
  const navigate = useNavigate()
  return (
    <Page title="Mon parcours" subtitle="Une leçon après l'autre : on découvre, on écoute, on répète, puis on écrit.">
      <ContinueCard />

      <div className="mt-5 space-y-3">
        {pathUnits.map((u) => {
          const unlocked = isUnitUnlocked(data, u)
          const complete = isUnitComplete(data, u)
          const { done, total } = unitDoneCount(data, u)
          const body = (
            <div className="flex items-center gap-3">
              <IconTile icon={complete ? '✅' : unlocked ? u.module.icon : '🔒'} tone={complete ? 'emerald' : 'violet'} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Leçon {u.number}</p>
                <p className="font-extrabold leading-snug">{u.module.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.module.titleFr}</p>
                <span className="mt-1.5 block"><ProgressBar value={done} max={total} tone={complete ? 'green' : 'indigo'} /></span>
              </div>
              {unlocked && <span className="text-2xl font-bold leading-none text-violet-600 dark:text-violet-300">›</span>}
            </div>
          )
          return unlocked ? (
            <Link key={u.id} to={`/parcours/${u.id}`} className={cardLink}>{body}</Link>
          ) : (
            <div key={u.id} className={`${card} opacity-60`} aria-disabled>{body}</div>
          )
        })}
      </div>

      <div className={`${card} mt-5 text-sm`}>
        <p className="font-bold">Envie de sauter une étape ?</p>
        <p className="mt-0.5 text-gray-500 dark:text-gray-400">Par défaut, chaque étape se débloque quand la précédente est terminée.</p>
        <label className="mt-2 flex items-center gap-2 font-semibold">
          <input type="checkbox" checked={data.settings.pathFree} onChange={(e) => updateProgress((d) => ({ ...d, settings: { ...d.settings, pathFree: e.target.checked } }))} className="h-5 w-5" />
          Tout débloquer
        </label>
        <button onClick={() => navigate('/cours')} className="mt-3 text-xs font-semibold text-indigo-600 underline dark:text-indigo-300">Explorer les thèmes librement →</button>
      </div>
      {data.steps && Object.keys(data.steps).some((k) => k.startsWith('path:')) && <p className="mt-3 text-center text-xs text-gray-400">{pathUnits.flatMap((u) => u.steps).filter((s) => isStepDone(data, s)).length} étapes terminées</p>}
    </Page>
  )
}
