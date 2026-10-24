import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Level } from '../types'
import { canSpeak, speak } from '../lib/speech'

// ---------------------------------------------------------------------------
// Couleurs par rubrique : chaque grande section de l'appli a sa teinte.
// (Classes Tailwind écrites en entier pour qu'elles soient bien générées.)
// ---------------------------------------------------------------------------

export type Tone = 'indigo' | 'violet' | 'amber' | 'sky' | 'emerald' | 'rose' | 'teal' | 'orange'

export const tones: Record<Tone, { header: string; tile: string; text: string; chip: string; bar: string }> = {
  indigo: {
    header: 'from-indigo-200/70 via-indigo-100/40 dark:from-indigo-500/25 dark:via-indigo-500/5',
    tile: 'bg-indigo-100 dark:bg-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-300',
    chip: 'bg-white/80 text-indigo-700 dark:bg-white/10 dark:text-indigo-200',
    bar: 'from-indigo-500 to-violet-500',
  },
  violet: {
    header: 'from-violet-200/70 via-violet-100/40 dark:from-violet-500/25 dark:via-violet-500/5',
    tile: 'bg-violet-100 dark:bg-violet-500/20',
    text: 'text-violet-600 dark:text-violet-300',
    chip: 'bg-white/80 text-violet-700 dark:bg-white/10 dark:text-violet-200',
    bar: 'from-violet-500 to-fuchsia-500',
  },
  amber: {
    header: 'from-amber-200/70 via-amber-100/40 dark:from-amber-500/20 dark:via-amber-500/5',
    tile: 'bg-amber-100 dark:bg-amber-500/20',
    text: 'text-amber-700 dark:text-amber-300',
    chip: 'bg-white/80 text-amber-800 dark:bg-white/10 dark:text-amber-200',
    bar: 'from-amber-400 to-orange-500',
  },
  sky: {
    header: 'from-sky-200/70 via-sky-100/40 dark:from-sky-500/20 dark:via-sky-500/5',
    tile: 'bg-sky-100 dark:bg-sky-500/20',
    text: 'text-sky-700 dark:text-sky-300',
    chip: 'bg-white/80 text-sky-800 dark:bg-white/10 dark:text-sky-200',
    bar: 'from-sky-400 to-indigo-500',
  },
  emerald: {
    header: 'from-emerald-200/70 via-emerald-100/40 dark:from-emerald-500/20 dark:via-emerald-500/5',
    tile: 'bg-emerald-100 dark:bg-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    chip: 'bg-white/80 text-emerald-800 dark:bg-white/10 dark:text-emerald-200',
    bar: 'from-emerald-400 to-teal-500',
  },
  rose: {
    header: 'from-rose-200/70 via-rose-100/40 dark:from-rose-500/20 dark:via-rose-500/5',
    tile: 'bg-rose-100 dark:bg-rose-500/20',
    text: 'text-rose-600 dark:text-rose-300',
    chip: 'bg-white/80 text-rose-700 dark:bg-white/10 dark:text-rose-200',
    bar: 'from-rose-400 to-pink-500',
  },
  teal: {
    header: 'from-teal-200/70 via-teal-100/40 dark:from-teal-500/20 dark:via-teal-500/5',
    tile: 'bg-teal-100 dark:bg-teal-500/20',
    text: 'text-teal-700 dark:text-teal-300',
    chip: 'bg-white/80 text-teal-800 dark:bg-white/10 dark:text-teal-200',
    bar: 'from-teal-400 to-emerald-500',
  },
  orange: {
    header: 'from-orange-200/80 via-purple-100/40 dark:from-orange-500/25 dark:via-purple-500/10',
    tile: 'bg-orange-100 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-300',
    chip: 'bg-white/80 text-orange-700 dark:bg-white/10 dark:text-orange-200',
    bar: 'from-orange-400 to-purple-500',
  },
}

const toneByPath: [string, Tone][] = [
  ['/cours', 'violet'],
  ['/temps', 'amber'],
  ['/grammaire', 'sky'],
  ['/vocabulaire', 'emerald'],
  ['/pratique', 'rose'],
  ['/themes', 'orange'],
  ['/progres', 'teal'],
  ['/nouveautes', 'amber'],
]

/** Teinte de la rubrique en cours, déduite de l'adresse. */
export function useTone(): Tone {
  const { pathname } = useLocation()
  return toneByPath.find(([p]) => pathname.startsWith(p))?.[1] ?? 'indigo'
}

export const card =
  'rounded-3xl bg-white p-4 shadow-[0_1px_2px_rgba(30,27,75,0.04),0_6px_20px_-8px_rgba(79,70,229,0.18)] ring-1 ring-gray-900/[0.04] dark:bg-gray-900 dark:shadow-none dark:ring-white/[0.07]'
export const cardLink = `${card} block`
export const btnPrimary =
  'w-full rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 py-3 font-bold text-white shadow-md shadow-indigo-500/25 disabled:opacity-40 disabled:shadow-none dark:shadow-none'
/** Grand bloc en dégradé (révision du jour, score de fin de session…). */
export const hero =
  'rounded-3xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-5 text-white shadow-lg shadow-indigo-500/25 dark:shadow-none'
export const btnSecondary =
  'w-full rounded-2xl bg-indigo-50 py-3 font-bold text-indigo-700 ring-1 ring-indigo-100 disabled:opacity-40 dark:bg-white/[0.06] dark:text-indigo-200 dark:ring-white/10'
export const input =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 disabled:opacity-80 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-indigo-400'

export function Page({ title, subtitle, back, children }: { title: string; subtitle?: ReactNode; back?: { to: string; label: string }; children: ReactNode }) {
  const t = tones[useTone()]
  return (
    <div>
      <header className={`bg-linear-to-b ${t.header} to-transparent px-4 pb-2 pt-6`}>
        {back && (
          <Link to={back.to} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${t.chip}`}>
            ← {back.label}
          </Link>
        )}
        <h1 className={`${back ? 'mt-3' : ''} text-2xl font-extrabold tracking-tight`}>{title}</h1>
        {subtitle && <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</div>}
      </header>
      <div className="mt-3 px-4">{children}</div>
    </div>
  )
}

export function Section({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  const t = tones[useTone()]
  return (
    <section className="mt-7">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <span className={`h-3 w-1 rounded-full bg-linear-to-b ${t.bar}`} />
          {title}
        </h2>
        {right}
      </div>
      <div className="mt-2.5 space-y-2.5">{children}</div>
    </section>
  )
}

const levelColors: Record<Level, string> = {
  A1: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  A2: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  B1: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  B2: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'B2+': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  C1: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

export function LevelBadge({ level }: { level: Level }) {
  return <span className={`rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold ${levelColors[level]}`}>{level}</span>
}

export function Pill({ children, tone = 'gray' }: { children: ReactNode; tone?: 'gray' | 'indigo' | 'green' | 'red' | 'amber' }) {
  const pillTones = {
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  }
  return <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${pillTones[tone]}`}>{children}</span>
}

export function ProgressBar({ value, max, tone = 'indigo' }: { value: number; max: number; tone?: 'indigo' | 'green' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
      <div
        className={`h-full rounded-full bg-linear-to-r ${tone === 'green' ? 'from-emerald-400 to-teal-500' : 'from-indigo-500 to-violet-500'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function SpeakButton({ text, label, small, slow }: { text: string; label?: string; small?: boolean; slow?: boolean }) {
  if (!canSpeak()) return null
  const main = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label="Écouter"
      className={`shrink-0 rounded-full bg-indigo-50 font-semibold text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-400/20 ${
        small ? 'px-2 py-1 text-sm' : 'px-3 py-1.5 text-sm'
      }`}
    >
      🔊{label ? ` ${label}` : ''}
    </button>
  )
  if (!slow) return main
  // Version lente (0,6×) à côté du bouton normal : utile pour bien entendre chaque mot.
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5">
      {main}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          speak(text, { rate: 0.6 })
        }}
        aria-label="Écouter lentement"
        className={`shrink-0 rounded-full bg-amber-50 font-semibold text-amber-800 ring-1 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/20 ${small ? 'px-2 py-1 text-sm' : 'px-3 py-1.5 text-sm'}`}
      >
        🐢
      </button>
    </span>
  )
}

/** Pastille colorée contenant un emoji. */
export function IconTile({ icon, tone, size = 'md' }: { icon: string; tone?: Tone; size?: 'sm' | 'md' | 'lg' }) {
  const current = useTone()
  const t = tones[tone ?? current]
  const sizes = { sm: 'h-9 w-9 text-lg rounded-xl', md: 'h-11 w-11 text-2xl rounded-2xl', lg: 'h-14 w-14 text-3xl rounded-2xl' }
  return <span className={`flex shrink-0 items-center justify-center ${sizes[size]} ${t.tile}`}>{icon}</span>
}

export function ListLink({ to, icon, title, subtitle, right, tone }: { to: string; icon?: string; title: ReactNode; subtitle?: ReactNode; right?: ReactNode; tone?: Tone }) {
  const current = useTone()
  const t = tones[tone ?? current]
  return (
    <Link to={to} className={`${cardLink} flex items-center gap-3`}>
      {icon && <IconTile icon={icon} tone={tone} />}
      <div className="min-w-0 flex-1">
        <div className="font-bold">{title}</div>
        {subtitle && <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
      </div>
      {right ?? <span className={`text-2xl font-bold leading-none ${t.text}`}>›</span>}
    </Link>
  )
}

/** Met en gras le texte entre **astérisques**. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))}
    </>
  )
}
