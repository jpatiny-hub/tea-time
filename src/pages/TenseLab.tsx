import { Link } from 'react-router-dom'
import { isDutch } from '../edition'
import { extra } from '../data/edition-content'
import { irregularVerbs } from '../data/irregular-verbs'
import { grammarLessons } from '../data/grammar'
import { TAG_LABELS, TENSE_TAGS } from '../data/content'
import { useProgress } from '../lib/store'
import { masteredCount } from '../lib/progress'
import { card, cardLink, IconTile, LevelBadge, ListLink, Page, ProgressBar, Section } from '../components/ui'

// Aide-mémoire : les temps « autres que le présent », avec leur équivalent français le plus fréquent.
const cheatSheet = [
  { tense: 'Past simple', form: 'V-ed / 2e colonne', use: 'Action terminée, moment passé terminé', fr: 'passé composé, passé simple', ex: 'I went there last year.' },
  { tense: 'Past continuous', form: 'was/were + V-ing', use: 'Action en cours dans le passé (décor)', fr: 'imparfait (action en cours)', ex: 'I was working when he called.' },
  { tense: 'Present perfect', form: 'have/has + participe', use: 'Expérience, bilan, jusqu\'à maintenant', fr: 'passé composé sans date / présent + depuis', ex: "I've never been there." },
  { tense: 'Present perfect cont.', form: 'have been + V-ing', use: 'Durée d\'une activité jusqu\'à maintenant', fr: 'présent + depuis', ex: "I've been waiting for an hour." },
  { tense: 'Past perfect', form: 'had + participe', use: 'Antérieur à un autre moment passé', fr: 'plus-que-parfait', ex: 'The train had left when I arrived.' },
  { tense: 'Used to', form: 'used to + base', use: 'Habitude / état révolu', fr: 'imparfait (habitude)', ex: 'I used to smoke.' },
  { tense: 'Will / going to', form: 'will + base / be going to', use: 'Décision, prédiction / intention', fr: 'futur, futur proche', ex: "I'll call you. / I'm going to move." },
  { tense: 'Future perfect', form: 'will have + participe', use: 'Terminé avant un moment futur', fr: 'futur antérieur', ex: 'By Friday, I will have finished.' },
  { tense: 'Conditionnel', form: 'would + base / would have + part.', use: 'Hypothèse présente / passée', fr: 'conditionnel présent / passé', ex: 'I would have come.' },
]

export function TenseLab() {
  const data = useProgress()
  const tenseLessons = grammarLessons.filter((l) => l.group === 'temps')
  const stats = TENSE_TAGS.map((tag) => {
    const s = data.tagStats[tag]
    const total = (s?.ok ?? 0) + (s?.ko ?? 0)
    return { tag, total, rate: total > 0 ? (s!.ok / total) : null }
  })

  return (
    <Page title={isDutch ? '⏳ Les verbes' : '⏳ Labo des temps'} subtitle={extra ? extra.ui.tenseLabSubtitle : 'Ta priorité : le passé (past simple, present perfect, past perfect) et le futur. Du cours, des exercices, et des statistiques pour voir tes progrès.'}>
      <div className="grid grid-cols-2 gap-3">
        <Link to={extra ? `/entrainement?tag=${extra.ui.challenge.tag}&n=15` : '/entrainement?tag=pp-vs-ps&n=15'} className="block rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-4 text-white shadow-md shadow-orange-500/25 dark:shadow-none">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/25 text-2xl">🥊</span>
          <p className="mt-2.5 font-extrabold leading-tight">{extra ? extra.ui.challenge.title : 'Past simple ou present perfect ?'}</p>
          <p className="text-xs opacity-90">{extra ? extra.ui.challenge.sub : 'Le duel n°1 des francophones'}</p>
        </Link>
        <Link to="/entrainement?tags=tenses&n=20" className={cardLink}>
          <IconTile icon="🎲" />
          <p className="mt-2.5 font-extrabold leading-tight">Défi des temps mélangés</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">20 questions, tous les temps</p>
        </Link>
        <Link to="/temps/verbes" className={cardLink}>
          <IconTile icon="📜" />
          <p className="mt-2.5 font-extrabold leading-tight">{extra ? extra.ui.verbsTitle : 'Verbes irréguliers'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{irregularVerbs.length} verbes, par niveau</p>
        </Link>
        {(!extra || extra.ui.writingTaskId) && (
        <Link to={extra ? `/pratique/ecrit/${extra.ui.writingTaskId}` : '/pratique/ecrit/w-weekend-story'} className={cardLink}>
          <IconTile icon="🖋️" />
          <p className="mt-2.5 font-extrabold leading-tight">Raconter au passé</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Rédaction guidée</p>
        </Link>
        )}
      </div>

      <Section title="Les leçons, dans l'ordre">
        {tenseLessons.map((l) => {
          const ids = l.exercises.map((e) => e.id)
          const m = masteredCount(data, ids)
          return (
            <ListLink
              key={l.id}
              to={`/grammaire/${l.id}`}
              title={l.title}
              subtitle={<span className="mt-1 block"><ProgressBar value={m} max={ids.length} tone="green" /></span>}
              right={<LevelBadge level={l.level} />}
            />
          )
        })}
      </Section>

      <Section title="Mes résultats par temps">
        <div className={card}>
          {stats.every((s) => s.total === 0) ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Fais quelques exercices : tes taux de réussite par temps apparaîtront ici.</p>
          ) : (
            <ul className="space-y-2">
              {stats.map((s) => (
                <li key={s.tag}>
                  <Link to={`/entrainement?tag=${s.tag}`} className="block">
                    <div className="flex items-center justify-between text-sm">
                      <span>{TAG_LABELS[s.tag]}</span>
                      <span className={`text-xs font-semibold ${s.rate === null ? 'text-gray-400' : s.rate >= 0.8 ? 'text-green-600' : s.rate >= 0.6 ? 'text-amber-600' : 'text-red-600'}`}>
                        {s.rate === null ? '—' : `${Math.round(s.rate * 100)} % (${s.total})`}
                      </span>
                    </div>
                    {s.rate !== null && <div className="mt-1"><ProgressBar value={Math.round(s.rate * 100)} max={100} tone={s.rate >= 0.8 ? 'green' : 'indigo'} /></div>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {!extra && <Section title="Aide-mémoire">
        <div className="space-y-2">
          {cheatSheet.map((c) => (
            <div key={c.tense} className={`${card} p-3`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold">{c.tense}</p>
                <p className="font-mono text-xs text-indigo-600 dark:text-indigo-400">{c.form}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">{c.use}</p>
              <p className="text-xs text-gray-400">🇫🇷 {c.fr}</p>
              <p className="mt-1 text-sm italic">{c.ex}</p>
            </div>
          ))}
        </div>
      </Section>}
    </Page>
  )
}
