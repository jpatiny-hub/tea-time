import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { drillExercises, TAG_LABELS } from '../data/content'
import { allVocab } from '../data/vocabulary'
import { exportBackup, importBackup, resetProgress, updateProgress, useProgress, type Settings } from '../lib/store'
import { daysSince, masteredCount, seenCount, streak, totalAnswers, weakTags } from '../lib/progress'
import { canSpeak, speak } from '../lib/speech'
import { formatDateFr, todayKey } from '../lib/text'
import { clearErrors, readErrors } from '../lib/diagnostics'
import type { Level } from '../types'
import { EDITION, isDutch } from '../edition'
import { FONT_SCALES } from '../lib/appearance'
import { ReminderSettings } from '../components/ReminderSettings'
import { levelInfo, RANK_LIST, xpToNext, ACTIVITY_XP } from '../lib/xp'
import { btnPrimary, btnSecondary, card, LevelBadge, Page, ProgressBar, Section } from '../components/ui'

const LEVELS: Level[] = EDITION.levels

export function Progress() {
  const data = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [persisted, setPersisted] = useState<boolean | null>(null)

  useEffect(() => {
    // Certains navigateurs n'exposent pas navigator.storage.persisted : on ne fait rien dans ce cas.
    if (typeof navigator.storage?.persisted === 'function') {
      navigator.storage.persisted().then(setPersisted).catch(() => setPersisted(null))
    }
    if (window.location.hash.includes('sauvegarde')) document.getElementById('sauvegarde')?.scrollIntoView()
  }, [])

  const days = streak(data)
  const answers = totalAnswers(data)
  const weak = weakTags(data).slice(0, 6)
  const strong = weakTags(data).reverse().slice(0, 3).filter((t) => t.rate >= 0.8)

  // Activité des 8 dernières semaines (56 jours)
  const cells = Array.from({ length: 56 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (55 - i))
    return data.activity[todayKey(d)] ?? 0
  })

  function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    updateProgress((d) => ({ ...d, settings: { ...d.settings, [key]: value } }))
  }

  function download() {
    const json = exportBackup()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `english-progress-${todayKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('✓ Fichier de sauvegarde téléchargé.')
  }

  async function onImport(file: File) {
    const text = await file.text()
    if (!window.confirm('Remplacer ta progression actuelle par celle du fichier ?')) return
    const res = importBackup(text)
    setMessage(res.ok ? '✓ Progression restaurée.' : `✗ ${res.error}`)
  }

  function reset() {
    if (!window.confirm('Effacer TOUTE ta progression ? (Pense à faire une sauvegarde avant.)')) return
    if (!window.confirm('Vraiment sûr ? Cette action est irréversible.')) return
    resetProgress()
    setMessage('Progression effacée.')
  }

  const backupAge = daysSince(data.lastBackupAt)
  const [diag, setDiag] = useState(readErrors)
  const [diagCopied, setDiagCopied] = useState(false)

  return (
    <Page title="📈 Ma progression" subtitle={`Depuis le ${formatDateFr(data.createdAt)}`}>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className={card}><p className="text-2xl font-bold">🔥 {days}</p><p className="text-xs text-gray-500">jours de suite</p></div>
        <div className={card}><p className="text-2xl font-bold">{answers}</p><p className="text-xs text-gray-500">réponses</p></div>
        <div className={card}><p className="text-2xl font-bold">{data.writing.length}</p><p className="text-xs text-gray-500">textes écrits</p></div>
      </div>

      <div className={`${card} mt-3`}>
        <p className="text-xs font-semibold text-gray-500">8 dernières semaines</p>
        <div className="mt-2 grid grid-flow-col grid-rows-7 gap-1">
          {cells.map((c, i) => (
            <div
              key={i}
              title={`${c}`}
              className={`aspect-square rounded-sm ${c === 0 ? 'bg-gray-100 dark:bg-gray-800' : c < 10 ? 'bg-indigo-200 dark:bg-indigo-900' : c < 30 ? 'bg-indigo-400 dark:bg-indigo-700' : 'bg-indigo-600 dark:bg-indigo-500'}`}
            />
          ))}
        </div>
      </div>

      <div id="niveau" />
      <XpSection xp={data.xp} xpByDay={data.xpByDay} />

      <Section title={`Vers le ${LEVELS[LEVELS.length - 1]} : acquis par niveau`}>
        <div className={`${card} space-y-3`}>
          {LEVELS.map((lvl) => {
            const exIds = drillExercises.filter((r) => (r.exercise.level ?? 'B2') === lvl).map((r) => r.exercise.id)
            const vIds = allVocab.filter((v) => v.level === lvl).map((v) => v.id)
            const ids = [...exIds, ...vIds]
            const m = masteredCount(data, ids)
            return (
              <div key={lvl}>
                <div className="flex items-center justify-between text-sm">
                  <LevelBadge level={lvl} />
                  <span className="text-xs text-gray-500">{m} acquis · {seenCount(data, ids)} vus / {ids.length}</span>
                </div>
                <div className="mt-1"><ProgressBar value={m} max={ids.length} tone="green" /></div>
              </div>
            )
          })}
          <p className="text-[0.6875rem] text-gray-400">« Acquis » = réussi au moins 3 fois de suite à intervalles croissants.</p>
        </div>
      </Section>

      <Section title="Points à travailler">
        {weak.length === 0 ? (
          <p className="text-sm text-gray-500">Pas encore assez de réponses pour repérer tes points faibles.</p>
        ) : (
          weak.map((t) => (
            <Link key={t.tag} to={`/entrainement?tag=${t.tag}`} className={`${card} block p-3`}>
              <div className="flex justify-between text-sm">
                <span>{TAG_LABELS[t.tag] ?? t.tag}</span>
                <span className={`font-semibold ${t.rate >= 0.8 ? 'text-green-600' : t.rate >= 0.6 ? 'text-amber-600' : 'text-red-600'}`}>{Math.round(t.rate * 100)} %</span>
              </div>
              <div className="mt-1"><ProgressBar value={Math.round(t.rate * 100)} max={100} /></div>
            </Link>
          ))
        )}
        {strong.length > 0 && <p className="text-xs text-gray-500">💪 Points forts : {strong.map((t) => TAG_LABELS[t.tag] ?? t.tag).join(', ')}</p>}
      </Section>

      <Section title="Réglages">
        <div className={`${card} space-y-4`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Accès : {EDITION.icon} {EDITION.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chaque accès garde sa propre progression sur cet appareil.</p>
            </div>
            <Link to="/acces" className="shrink-0 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold dark:bg-gray-800">Changer</Link>
          </div>
          <ReminderSettings />
          <div>
            <p className="text-sm font-semibold">Apparence</p>
            <div className="mt-1 flex gap-2">
              {([['light', '☀️ Clair'], ['dark', '🌙 Sombre'], ['auto', '📱 Selon le téléphone']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setSetting('theme', id)} className={`flex-1 rounded-xl py-2 text-xs font-semibold ${data.settings.theme === id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Taille du texte</p>
            <div className="mt-1 flex gap-2">
              {FONT_SCALES.map((f, i) => (
                <button key={f.id} onClick={() => setSetting('fontScale', f.id)} aria-label={f.label} className={`flex-1 rounded-xl py-2 font-bold ${data.settings.fontScale === f.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <span style={{ fontSize: `${0.85 + i * 0.2}rem` }}>Aa</span>
                  <span className="block text-[0.65rem] font-semibold opacity-80">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold">Aide vocabulaire</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Touche un mot d’un exercice, d’un texte ou d’un dialogue pour voir sa traduction et l’ajouter à « Mes mots à retravailler ».</span>
            </span>
            <input type="checkbox" checked={data.settings.wordHelp} onChange={(e) => setSetting('wordHelp', e.target.checked)} className="h-6 w-6 shrink-0 accent-indigo-600" />
          </label>
          <label className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold">Mode daltonien (deutéranopie)</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Bleu pour les bonnes réponses, orange pour les erreurs, pas de vert / rouge / rose.</span>
            </span>
            <input type="checkbox" checked={data.settings.colorBlind} onChange={(e) => setSetting('colorBlind', e.target.checked)} className="h-6 w-6 shrink-0 accent-indigo-600" />
          </label>
          <div>
            <p className="text-sm font-semibold">Accent de la voix</p>
            <div className="mt-1 flex gap-2">
              {(isDutch ? (['nl-BE', 'nl-NL'] as const) : (['en-GB', 'en-US'] as const)).map((a) => (
                <button key={a} onClick={() => setSetting('accent', a)} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${data.settings.accent === a ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {{ 'en-GB': '🇬🇧 Britannique', 'en-US': '🇺🇸 Américain', 'nl-BE': '🇧🇪 Belge (flamand)', 'nl-NL': '🇳🇱 Pays-Bas' }[a]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Vitesse de lecture : {data.settings.rate.toFixed(2)}</p>
            <input type="range" min={0.6} max={1.2} step={0.05} value={data.settings.rate} onChange={(e) => setSetting('rate', Number(e.target.value))} className="w-full accent-indigo-600" />
            {canSpeak() && <button onClick={() => speak(isDutch ? 'Zo klink ik. Ben je al eens in Brugge geweest?' : 'This is how I sound. Have you ever been to London?')} className="text-xs text-indigo-600">🔊 Tester</button>}
          </div>
          <div>
            <p className="text-sm font-semibold">Nouveaux mots par session : {data.settings.newCardsPerSession}</p>
            <input type="range" min={5} max={30} step={5} value={data.settings.newCardsPerSession} onChange={(e) => setSetting('newCardsPerSession', Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>
      </Section>

      <div id="sauvegarde" />
      <Section title="💾 Sauvegarde (sur ton appareil uniquement)">
        <div className={`${card} space-y-3`}>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ta progression est stockée uniquement dans ce navigateur, sur ce téléphone. Les mises à jour de l'appli ne l'effacent pas.
            Par sécurité (changement de téléphone, nettoyage du navigateur), télécharge de temps en temps un fichier de sauvegarde.
          </p>
          <p className="text-xs text-gray-500">
            Dernière sauvegarde : {data.lastBackupAt ? `${formatDateFr(data.lastBackupAt)} (il y a ${backupAge} j)` : 'jamais'}
            {persisted !== null && <> · Stockage protégé : {persisted ? 'oui ✓' : 'non (le navigateur pourrait l\'effacer en cas de manque de place)'}</>}
          </p>
          <button onClick={download} className={btnPrimary}>Télécharger une sauvegarde</button>
          <button onClick={() => fileRef.current?.click()} className={btnSecondary}>Restaurer depuis un fichier</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onImport(f)
              e.target.value = ''
            }}
          />
          {message && <p className="text-sm font-medium">{message}</p>}
          <button onClick={reset} className="w-full text-xs text-red-600 underline">Effacer toute ma progression</button>
        </div>
      </Section>

      {diag.length > 0 && (
        <Section title="🩺 Diagnostic technique">
          <div className={`${card} space-y-2`}>
            <p className="text-xs text-gray-500">Problèmes d'affichage détectés sur cet appareil. Copie-les et envoie-les pour qu'ils soient corrigés.</p>
            <ul className="max-h-48 space-y-1 overflow-y-auto font-mono text-[0.6875rem] text-gray-600 dark:text-gray-300">
              {[...diag].reverse().map((e, i) => (
                <li key={i}>{e.at.slice(0, 16).replace('T', ' ')} · {e.page || '#/'} · {e.message}</li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={async () => {
                  const text = diag.map((e) => `${e.at} ${e.page} ${e.message}`).join('\n') + `\n${navigator.userAgent}`
                  try { await navigator.clipboard.writeText(text); setDiagCopied(true) } catch { setDiagCopied(false) }
                }}
                className={btnSecondary}
              >
                {diagCopied ? '✓ Copié' : 'Copier'}
              </button>
              <button onClick={() => { clearErrors(); setDiag([]) }} className={btnSecondary}>Effacer</button>
            </div>
          </div>
        </Section>
      )}

      <Link to="/nouveautes" className="mt-6 block text-center text-sm text-indigo-600 dark:text-indigo-400">✨ Historique des mises à jour</Link>
    </Page>
  )
}

function XpSection({ xp, xpByDay }: { xp: number; xpByDay: Record<string, number> }) {
  const info = levelInfo(xp)
  const today = xpByDay[todayKey()] ?? 0
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return xpByDay[todayKey(d)] ?? 0
  }).reduce((a, b) => a + b, 0)
  return (
    <Section title="⭐ Niveau & expérience">
      <div className={card}>
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-3xl dark:bg-amber-500/20">{info.rank.icon}</span>
          <div className="flex-1">
            <p className="text-lg font-extrabold">Niveau {info.level} · {info.rank.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{info.rank.fr}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="h-full rounded-full bg-linear-to-r from-amber-400 to-orange-500" style={{ width: `${(info.into / info.needed) * 100}%` }} />
        </div>
        <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">{info.into} / {info.needed} XP · total {xp} XP</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl bg-amber-50 p-2 dark:bg-amber-500/10"><p className="text-lg font-extrabold">+{today}</p><p className="text-[0.6875rem] text-gray-500 dark:text-gray-400">XP aujourd'hui</p></div>
          <div className="rounded-2xl bg-amber-50 p-2 dark:bg-amber-500/10"><p className="text-lg font-extrabold">+{week}</p><p className="text-[0.6875rem] text-gray-500 dark:text-gray-400">XP sur 7 jours</p></div>
        </div>
      </div>

      <details className={card}>
        <summary className="flex cursor-pointer items-center justify-between font-bold">Comment gagner de l'XP ? <span className="text-gray-400">▾</span></summary>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <li>✅ Bonne réponse : de <strong>10 à 15 XP</strong> selon le niveau de l'exercice ; +3 pour une phrase à réécrire ; un peu moins pour une carte de vocabulaire.</li>
          <li>✏️ Réponse acceptée avec une faute de frappe : 70 % de l'XP. Validée toi-même : 50 %.</li>
          <li>🔥 Série : +1 XP par bonne réponse d'affilée à partir de la 3e (jusqu'à +5).</li>
          <li>🏆 Session sans aucune erreur (5 questions ou plus) : <strong>+50 %</strong> de bonus.</li>
          <li>🖋️ Texte enregistré dans l'atelier : <strong>{ACTIVITY_XP.writing} XP</strong>, +{ACTIVITY_XP.writingAllPhrases} si toutes les expressions cibles sont placées.</li>
          <li>🎤 Oral libre (30 mots ou plus) : {ACTIVITY_XP.speakingFree} XP · répétition : {ACTIVITY_XP.speakingRepeat} XP · dictée réussie : {ACTIVITY_XP.dictation} XP.</li>
          <li>❌ Mauvaise réponse : 2 XP quand même, pour l'effort.</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Chaque niveau demande 30 XP de plus que le précédent (niveau 1 → 2 : {xpToNext(1)} XP, niveau 10 → 11 : {xpToNext(10)} XP…).</p>
      </details>

      <details className={card}>
        <summary className="flex cursor-pointer items-center justify-between font-bold">Les grades <span className="text-gray-400">▾</span></summary>
        <ul className="mt-2 space-y-1.5">
          {RANK_LIST.map((r) => (
            <li key={r.title} className={`flex items-center gap-2 rounded-xl px-2 py-1 text-sm ${r.title === info.rank.title ? 'bg-amber-50 font-bold dark:bg-amber-500/10' : info.level < r.from ? 'opacity-50' : ''}`}>
              <span className="text-xl">{r.icon}</span>
              <span className="flex-1">{r.title}<span className="block text-[0.6875rem] font-normal text-gray-500 dark:text-gray-400">{r.fr}</span></span>
              <span className="text-xs text-gray-500">niv. {r.from}</span>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  )
}
