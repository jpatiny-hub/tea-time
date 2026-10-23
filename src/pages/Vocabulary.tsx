import { useState } from 'react'
import { courseDecks, discoveryDecks, allVocab } from '../data/vocabulary'
import { modules } from '../data/modules'
import { sessions } from '../data/sessions/index'
import { vocabCard } from '../data/content'
import { synonymExercises } from '../data/style'
import { EDITION } from '../edition'
import { updateProgress, useProgress, type Settings } from '../lib/store'
import { dueIds, masteredCount, newIds } from '../lib/progress'
import { shuffle } from '../lib/text'
import type { CardExercise, VocabItem } from '../types'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { btnPrimary, btnSecondary, ListLink, Page, ProgressBar, Section } from '../components/ui'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function toCards(items: VocabItem[], direction: Settings['cardDirection']): CardExercise[] {
  return items.map((v) => vocabCard(v, direction === 'mixte' ? (Math.random() < 0.5 ? 'en-fr' : 'fr-en') : direction))
}

const directionLabels: Record<Settings['cardDirection'], string> = {
  'en-fr': `${cap(EDITION.langName)} → français`,
  'fr-en': `Français → ${EDITION.langName}`,
  mixte: 'Mélangé',
}

export function Vocabulary() {
  const data = useProgress()
  const [run, setRun] = useState<{ items: CardExercise[]; title: string } | null>(null)
  const allIds = allVocab.map((v) => v.id)
  const due = dueIds(data, allIds)
  // Les nouveaux mots des cours passent en priorité, puis les paquets découverte.
  const fresh = newIds(data, allIds)
  const perSession = data.settings.newCardsPerSession

  if (run) return <ExerciseRunner items={run.items} title={run.title} onExit={() => setRun(null)} />

  function setDirection(d: Settings['cardDirection']) {
    updateProgress((p) => ({ ...p, settings: { ...p.settings, cardDirection: d } }))
  }

  return (
    <Page title="Vocabulaire" subtitle={`${allVocab.length} mots et expressions · ${masteredCount(data, allIds)} acquis`}>
      {data.settings.wordHelp && (
        <ListLink
          to="/vocabulaire/mes-mots"
          icon="⭐"
          title="Mes mots à retravailler"
          subtitle={Object.keys(data.myWords).length > 0 ? `${Object.keys(data.myWords).length} mot${Object.keys(data.myWords).length > 1 ? 's' : ''} ajouté${Object.keys(data.myWords).length > 1 ? 's' : ''} depuis les exercices` : 'Touche un mot dans un exercice pour l’ajouter ici'}
        />
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          disabled={due.length === 0}
          onClick={() => setRun({ items: toCards(shuffle(allVocab.filter((v) => due.includes(v.id))).slice(0, 30), data.settings.cardDirection), title: 'Révision du vocabulaire' })}
          className={btnPrimary}
        >
          🔁 Réviser ({due.length})
        </button>
        <button
          disabled={fresh.length === 0}
          onClick={() => setRun({ items: toCards(allVocab.filter((v) => fresh.includes(v.id)).slice(0, perSession), data.settings.cardDirection), title: 'Nouveaux mots' })}
          className={btnSecondary}
        >
          ✨ Apprendre {Math.min(perSession, fresh.length)} mots
        </button>
      </div>

      <div className="mt-3 flex gap-1 rounded-xl bg-white p-1 text-xs dark:bg-gray-900">
        {(Object.keys(directionLabels) as Settings['cardDirection'][]).map((d) => (
          <button
            key={d}
            onClick={() => setDirection(d)}
            className={`flex-1 rounded-lg py-1.5 font-medium ${data.settings.cardDirection === d ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
          >
            {directionLabels[d]}
          </button>
        ))}
      </div>
      <p className="mt-1 text-center text-[0.6875rem] text-gray-400">Français → {EDITION.langName} = plus difficile, mais c'est ce qui fait progresser à l'oral.</p>

      {sessions.length > 0 && <Section title="Par module de cours">
        {modules.map((m) => {
          const items = sessions.filter((s) => s.module === m.id).flatMap((s) => s.vocabulary)
          const ids = items.map((i) => i.id)
          return (
            <ListLink
              key={m.id}
              to={`/vocabulaire/module-${m.id}`}
              icon={m.icon}
              title={m.title}
              subtitle={<><span>{items.length} mots</span><span className="mt-1.5 block"><ProgressBar value={masteredCount(data, ids)} max={ids.length} tone="green" /></span></>}
            />
          )
        })}
      </Section>}

      <Section title={sessions.length > 0 ? 'Découverte (hors cours)' : 'Les paquets'}>
        {discoveryDecks.map((d) => {
          const ids = d.items.map((i) => i.id)
          return (
            <ListLink
              key={d.id}
              to={`/vocabulaire/${d.id}`}
              icon={d.icon}
              title={d.title}
              subtitle={<><span>{d.description}</span><span className="mt-1.5 block"><ProgressBar value={masteredCount(data, ids)} max={ids.length} tone="green" /></span></>}
            />
          )
        })}
      </Section>

      {synonymExercises.length > 0 && (
        <Section title="Jouer avec les mots">
          <ListLink to="/pratique/reformulation" icon="🔁" title="Synonymes" subtitle="Le sens des mots de tes cours, et des termes plus précis que big, get, help, fix…" />
        </Section>
      )}

      {courseDecks.length > 0 && (
        <Section title="Par séance">
          {[...courseDecks].reverse().map((d) => (
            <ListLink key={d.id} to={`/vocabulaire/${d.id}`} icon={d.icon} title={d.title} subtitle={`${d.description} · ${d.items.length} mots`} />
          ))}
        </Section>
      )}
    </Page>
  )
}
