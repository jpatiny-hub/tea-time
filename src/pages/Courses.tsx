import { modules } from '../data/modules'
import { sessions } from '../data/sessions/index'
import { useProgress } from '../lib/store'
import { seenCount } from '../lib/progress'
import { formatDateFr } from '../lib/text'
import { ListLink, Page, ProgressBar, Section } from '../components/ui'
import { moduleSteps } from './ModuleDetail'
import { allDecks } from '../data/vocabulary'

export function Courses() {
  const data = useProgress()
  const sorted = [...sessions].reverse()
  // Modules principaux d'abord, puis les parcours (ex. « Lexie 👶 »).
  const groups = Array.from(new Set(modules.map((m) => m.group ?? '')))

  return (
    <Page title="Mes cours" subtitle={sessions.length > 0 ? 'Tout ce qui a été vu en séance, transformé en exercices.' : 'Des modules thématiques : expressions, vocabulaire, grammaire, oral et écrit.'}>
      {groups.map((group) => {
        const list = modules.filter((m) => (m.group ?? '') === group)
        return (
      <Section key={group || 'main'} title={group || `Les ${list.length} modules`}>
        {list.map((m) => {
          const steps = moduleSteps(m)
          const done = steps.filter((s) => data.steps[`${m.id}:${s.step}`]).length
          const nSessions = sessions.filter((s) => s.module === m.id).length
          const nWords = (m.deckIds ?? []).reduce((n, id) => n + (allDecks.find((d) => d.id === id)?.items.length ?? 0), 0)
          return (
            <ListLink
              key={m.id}
              to={`/cours/module/${m.id}`}
              icon={m.icon}
              title={m.title}
              subtitle={
                <>
                  <span>{m.titleFr} · {nSessions > 0 ? `${nSessions} séances` : `${nWords} mots`}</span>
                  <span className="mt-1.5 block"><ProgressBar value={done} max={steps.length} /></span>
                </>
              }
            />
          )
        })}
      </Section>
        )
      })}

      {sorted.length > 0 && <Section title="Séances (de la plus récente)">
        {sorted.map((s) => {
          const mod = modules.find((m) => m.id === s.module)
          const ids = s.corrections.map((c) => c.id)
          const practiced = seenCount(data, ids)
          return (
            <ListLink
              key={s.id}
              to={`/cours/seance/${s.id}`}
              icon={mod?.icon}
              title={formatDateFr(s.date)}
              subtitle={`${s.title} · ${s.vocabulary.length} mots · ${s.corrections.length} corrections${practiced > 0 ? ` (${practiced} travaillées)` : ''}`}
            />
          )
        })}
      </Section>}
    </Page>
  )
}
