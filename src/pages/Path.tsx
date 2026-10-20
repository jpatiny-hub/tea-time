import { Link, useNavigate } from 'react-router-dom'
import { updateProgress, useProgress } from '../lib/store'
import { hasLexie, isStepDone, isUnitComplete, isUnitUnlocked, nextStep, unitDoneCount, unitOverview, unitsOfTrack, type PathUnit, type Track } from '../lib/path'
import { card, cardLink, hero, IconTile, Page, ProgressBar } from '../components/ui'

/** Carte « Continue ta leçon » (Parcours et accueil). */
export function ContinueCard({ track = 'main' }: { track?: Track }) {
  const data = useProgress()
  const next = nextStep(data, track)
  if (!next) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-3xl">🎉</p>
        <p className="mt-1 font-extrabold">{track === 'lexie' ? 'Tout le parcours Lexie est terminé !' : 'Tout le parcours est terminé !'}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Continue avec la révision et les exercices libres.</p>
      </div>
    )
  }
  const { unit, step } = next
  const { done, total } = unitDoneCount(data, unit)
  return (
    <Link to={`/parcours/${unit.id}/${step.key}`} className={`${hero} relative block overflow-hidden`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/75">{track === 'lexie' ? 'Lexie 👶' : 'Leçon'} {unit.number} · {unit.module.titleFr}</p>
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

const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`

/** « Au programme » : tout ce qui sera vu dans la leçon. */
export function UnitOverviewList({ unit }: { unit: PathUnit }) {
  const o = unitOverview(unit)
  const rows: [string, string][] = []
  if (o.nWords > 0) rows.push(['🗂️', `${plural(o.nWords, 'mot', 'mots')} : ${o.sampleWords.join(', ')}${o.nWords > o.sampleWords.length ? '…' : ''}`])
  if (o.grammar.length > 0) rows.push(['📖', `Grammaire : ${o.grammar.join(' · ')}`])
  if (o.nPhrases > 0) rows.push(['💬', `${plural(o.nPhrases, 'phrase utile', 'phrases utiles')} à écouter et répéter`])
  if (o.dialogue) rows.push(['🎧', `Dialogue : ${o.dialogue}`])
  if (o.reading) rows.push(['📰', `Lecture : ${o.reading}`])
  if (o.nCorrections > 0) rows.push(['🩹', `${plural(o.nCorrections, 'phrase corrigée', 'phrases corrigées')} en cours`])
  rows.push(['🧩', `${plural(o.nPractice, 'exercice de mise en pratique', 'exercices de mise en pratique')}`])
  if (o.hasWriting) rows.push(['🖋️', 'Un défi écrit (facultatif)'])
  return (
    <div className={`${card} text-sm`}>
      <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">Au programme</p>
      <ul className="mt-2 space-y-1.5">
        {rows.map(([icon, text]) => (
          <li key={icon} className="flex gap-2"><span aria-hidden>{icon}</span><span className="text-gray-700 dark:text-gray-200">{text}</span></li>
        ))}
      </ul>
    </div>
  )
}

export function Path({ track = 'main' }: { track?: Track }) {
  const data = useProgress()
  const navigate = useNavigate()
  const units = unitsOfTrack(track)
  const lexie = track === 'lexie'
  return (
    <Page
      title={lexie ? 'Lexie 👶' : 'Mon parcours'}
      subtitle={lexie ? 'Un parcours à part, pour parler anglais avec bébé. Il ne touche pas à tes cours habituels.' : "Une leçon après l'autre : on découvre, on écoute, on répète, puis on écrit."}
    >
      <ContinueCard track={track} />

      {hasLexie && (
        <Link to={lexie ? '/parcours' : '/lexie'} className={`${cardLink} mt-3 flex items-center gap-3`}>
          <IconTile icon={lexie ? '🎓' : '👶'} tone="rose" />
          <div className="flex-1">
            <p className="font-bold">{lexie ? 'Retour à mon parcours' : 'Parcours Lexie 👶'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{lexie ? 'Les leçons habituelles' : 'Parler anglais avec bébé : repas, soins, jeux, câlins…'}</p>
          </div>
          <span className="text-2xl font-bold leading-none text-rose-600">›</span>
        </Link>
      )}

      <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">{units.length} leçons</p>
      <div className="mt-2 space-y-3">
        {units.map((u) => {
          const unlocked = isUnitUnlocked(data, u)
          const complete = isUnitComplete(data, u)
          const { done, total } = unitDoneCount(data, u)
          const o = unitOverview(u)
          const body = (
            <div className="flex items-center gap-3">
              <IconTile icon={complete ? '✅' : unlocked ? u.module.icon : '🔒'} tone={complete ? 'emerald' : 'violet'} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{lexie ? 'Lexie' : 'Leçon'} {u.number}</p>
                <p className="font-extrabold leading-snug">{u.module.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.module.titleFr}</p>
                <span className="mt-1.5 block"><ProgressBar value={done} max={total} tone={complete ? 'green' : 'indigo'} /></span>
              </div>
              {unlocked && <span className="text-2xl font-bold leading-none text-violet-600 dark:text-violet-300">›</span>}
            </div>
          )
          return (
            <div key={u.id} className={unlocked ? '' : 'opacity-70'}>
              {unlocked ? <Link to={`/parcours/${u.id}`} className={cardLink}>{body}</Link> : <div className={card} aria-disabled>{body}</div>}
              <details className="mt-1 px-2 text-xs text-gray-600 dark:text-gray-300">
                <summary className="cursor-pointer py-1 font-semibold text-indigo-700 dark:text-indigo-300">
                  Au programme · {plural(o.nWords, 'mot', 'mots')}{o.grammar.length > 0 ? ` · ${plural(o.grammar.length, 'point de grammaire', 'points de grammaire')}` : ''}
                </summary>
                <div className="pb-1"><UnitOverviewList unit={u} /></div>
              </details>
            </div>
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
        <button onClick={() => navigate('/cours')} className="mt-3 text-xs font-semibold text-indigo-600 underline dark:text-indigo-300">Explorer les cours et thèmes librement →</button>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">{units.flatMap((u) => u.steps).filter((s) => isStepDone(data, s)).length} étapes terminées</p>
    </Page>
  )
}
