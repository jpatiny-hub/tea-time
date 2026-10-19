import { Link } from 'react-router-dom'
import { updateProgress, useProgress } from '../lib/store'
import { ReminderSettings } from '../components/ReminderSettings'
import { daysSince, streak, totalAnswers, weakTags } from '../lib/progress'
import { isDue } from '../lib/srs'
import { CONTENT_VERSION } from '../data/changelog'
import { discoveryDecks } from '../data/vocabulary'
import { TAG_LABELS, getExercise, translationExercises } from '../data/content'
import { sessions } from '../data/sessions/index'
import { card, cardLink, hero, IconTile, SpeakButton, type Tone } from '../components/ui'
import { seasonalTheme, themes } from '../data/themes'
import { XpBar } from '../components/XpBar'
import { EDITION, isDutch, isGuided, isJuju } from '../edition'
import { ContinueCard } from './Path'
import { extra } from '../data/edition-content'
import { formatDateFr } from '../lib/text'
import { grammarLessons } from '../data/grammar'

const sections: { to: string; label: string; icon: string; desc: string; tone: Tone }[] = [
  { to: '/cours', label: extra ? extra.ui.coursesLabel : 'Mes cours', icon: '🎓', desc: extra ? extra.ui.coursesDesc : 'Séances et modules', tone: 'violet' },
  { to: '/temps', label: isDutch ? 'Les verbes' : 'Labo des temps', icon: '⏳', desc: extra ? extra.ui.tensesDesc : 'Past simple, present perfect…', tone: 'amber' },
  { to: '/grammaire', label: 'Grammaire', icon: '📖', desc: `${grammarLessons.length} fiches + exercices`, tone: 'sky' },
  { to: '/vocabulaire', label: 'Vocabulaire', icon: '🗂️', desc: extra ? `${discoveryDecks.length} paquets` : 'Cours + découverte', tone: 'emerald' },
  { to: '/pratique/ecrit', label: "Atelier d'écriture", icon: '🖋️', desc: 'Rédiger, se relire', tone: 'rose' },
  { to: '/pratique', label: 'Pratique', icon: '🎧', desc: 'Oral, écoute, lecture', tone: 'rose' },
  ...(themes.length > 0 ? [{ to: '/themes', label: 'Thèmes & culture', icon: '🎭', desc: 'Fêtes, références, idiomes', tone: 'orange' as Tone }] : []),
  ...(translationExercises.length > 0 ? [{ to: '/pratique/traduction', label: 'Traduire', icon: '🔤', desc: `${translationExercises.length} petites phrases`, tone: 'orange' as Tone }] : []),
  ...(extra ? [{ to: '/pratique/exercices', label: 'Exercices', icon: '🧩', desc: 'Textes à trous, phrases à corriger…', tone: 'orange' as Tone }] : []),
  { to: '/progres', label: 'Progrès', icon: '📈', desc: 'Statistiques et sauvegarde', tone: 'teal' },
]

function greeting(date: Date): string {
  const h = date.getHours()
  const [morning, afternoon, evening] = EDITION.greetings
  return h < 12 ? morning : h < 18 ? afternoon : evening
}

// Une expression différente chaque jour, tirée des idiomes et collocations.
function expressionOfTheDay() {
  const ids = extra ? extra.expressionDeckIds : ['idioms', 'collocations']
  const pool = discoveryDecks.filter((d) => ids.includes(d.id)).flatMap((d) => d.items)
  const day = Math.floor(Date.now() / 86_400_000)
  return pool.length > 0 ? pool[day % pool.length] : undefined
}

export function Home() {
  const data = useProgress()
  const now = Date.now()
  const due = Object.keys(data.srs).filter((id) => !id.startsWith('lesson:') && isDue(data.srs[id], now) && getExercise(id)).length
  const dueLessons = Object.keys(data.srs).filter((id) => id.startsWith('lesson:') && isDue(data.srs[id], now)).length
  const days = streak(data)
  const answers = totalAnswers(data)
  const weakest = weakTags(data)[0]
  const expr = expressionOfTheDay()
  const lastSession = sessions[sessions.length - 1]
  const backupAge = daysSince(data.lastBackupAt)
  const needsBackup = answers >= 50 && (backupAge === null || backupAge > 30)

  const theme = seasonalTheme()
  const today = new Date()

  return (
    <div className="px-4 pt-5">
      <div className={`${hero} relative overflow-hidden`}>
        <span aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
        <span aria-hidden className="pointer-events-none absolute -bottom-12 right-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-3">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-14 w-14 shrink-0 rounded-2xl shadow-md ring-2 ring-white/40" />
            <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
              {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <h1 className="mt-0.5 text-2xl font-extrabold leading-tight tracking-tight">{greeting(today)}</h1>
            <p className="mt-0.5 text-sm text-white/85">{EDITION.tagline}</p>
            </div>
          </div>
          <Link to="/progres" className="rounded-2xl bg-white/15 px-3 py-2 text-center ring-1 ring-white/25">
            <p className="text-lg font-extrabold leading-none">🔥 {days}</p>
            <p className="mt-0.5 text-[0.625rem] font-semibold text-white/80">jour{days > 1 ? 's' : ''}</p>
          </Link>
        </div>

        <XpBar xp={data.xp} />

        <Link to="/revision" className="relative mt-3 flex items-center gap-3 rounded-2xl bg-white p-3.5 text-gray-900 shadow-sm">
          <IconTile icon="🔁" tone="indigo" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-500">Révision du jour</p>
            {due + dueLessons > 0 ? (
              <p className="font-extrabold">
                {due > 0 && `${due} élément${due > 1 ? 's' : ''} à revoir`}
                {due > 0 && dueLessons > 0 && ' · '}
                {dueLessons > 0 && `${dueLessons} leçon${dueLessons > 1 ? 's' : ''}`}
              </p>
            ) : (
              <p className="font-extrabold">{answers === 0 ? 'Commence par un cours ou le Labo des temps' : 'Tout est à jour ✓'}</p>
            )}
          </div>
          <span className="text-2xl font-bold leading-none text-indigo-600">›</span>
        </Link>
      </div>

      {isGuided && <div className="mt-3"><ContinueCard /></div>}

      {data.seenContentVersion < CONTENT_VERSION && (
        <Link to="/nouveautes" className="mt-3 flex items-center gap-3 rounded-3xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:ring-amber-500/30">
          <IconTile icon="✨" tone="amber" />
          <div className="flex-1">
            <p className="font-bold">{data.seenContentVersion === 0 ? 'Bienvenue !' : 'Nouveau contenu disponible'}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {data.seenContentVersion === 0 ? "Découvre ce que contient l'appli." : 'Ta progression est conservée. Voir les nouveautés →'}
            </p>
          </div>
        </Link>
      )}

      {theme && (
        <Link to={`/themes/${theme.id}`} className="mt-3 flex items-center gap-3 overflow-hidden rounded-3xl bg-linear-to-r from-[#2a1145] via-[#5b1d6b] to-[#e8590c] p-4 text-white shadow-md shadow-orange-500/20 dark:shadow-none">
          <span className="text-4xl">{theme.icon}</span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Spécial saison</p>
            <p className="text-lg font-extrabold">{theme.title}</p>
            <p className="text-xs text-white/85">Vocabulaire, films cultes, expressions qui font peur…</p>
          </div>
          <span className="text-2xl font-bold">›</span>
        </Link>
      )}

      {isJuju && !data.settings.reminderEnabled && !data.settings.reminderPromptDismissed && (
        <div className={`${card} mt-3`}>
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold">🔔 Un petit rappel chaque jour ?</p>
            <button onClick={() => updateProgress((d) => ({ ...d, settings: { ...d.settings, reminderPromptDismissed: true } }))} aria-label="Masquer" className="text-sm text-gray-400">✕</button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">10 minutes par jour, c'est le secret pour progresser. Choisis ton heure :</p>
          <div className="mt-2"><ReminderSettings compact /></div>
        </div>
      )}

      {needsBackup && (
        <Link to="/progres#sauvegarde" className={`${cardLink} mt-3 flex items-center gap-3 text-sm`}>
          <IconTile icon="💾" tone="teal" size="sm" />
          <span className="flex-1">
            {backupAge === null ? 'Pense à sauvegarder ta progression dans un fichier.' : `Dernière sauvegarde il y a ${backupAge} jours.`}
          </span>
          <span className="text-2xl font-bold leading-none text-teal-600">›</span>
        </Link>
      )}

      {weakest && weakest.rate < 0.75 && (
        <Link to={`/entrainement?tag=${weakest.tag}`} className={`${cardLink} mt-3 flex items-center gap-3`}>
          <IconTile icon="🎯" tone="rose" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Ton point faible du moment</p>
            <p className="font-bold">{TAG_LABELS[weakest.tag] ?? weakest.tag} — {Math.round(weakest.rate * 100)} % de réussite</p>
          </div>
          <span className="text-2xl font-bold leading-none text-rose-600">›</span>
        </Link>
      )}

      {expr && (
      <div className={`${card} relative mt-3 overflow-hidden`}>
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-emerald-400 to-teal-500" />
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">💬 {isDutch ? 'Mot du jour' : 'Expression du jour'}</p>
          <SpeakButton text={expr.example ? `${expr.en}. ${expr.example}` : expr.en} small />
        </div>
        <p className="mt-1 text-xl font-extrabold">{expr.en}</p>
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{expr.fr}</p>
        {expr.example && <p className="mt-1.5 text-sm italic text-gray-500 dark:text-gray-400">« {expr.example} »</p>}
      </div>
      )}

      <h2 className="mt-7 text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">Explorer</h2>
      <div className="mt-2.5 grid grid-cols-2 gap-3">
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className={cardLink}>
            <IconTile icon={s.icon} tone={s.tone} />
            <p className="mt-2.5 font-extrabold leading-tight">{s.label}</p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
          </Link>
        ))}
      </div>

      {lastSession && (
        <Link to={`/cours/seance/${lastSession.id}`} className={`${cardLink} mt-3 flex items-center gap-3`}>
          <IconTile icon="📒" tone="violet" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Dernier cours · {formatDateFr(lastSession.date)}</p>
            <p className="font-bold">{lastSession.title}</p>
          </div>
          <span className="text-2xl font-bold leading-none text-violet-600 dark:text-violet-300">›</span>
        </Link>
      )}
    </div>
  )
}
