import { Link } from 'react-router-dom'
import { levelInfo } from '../lib/xp'

/** Niveau + jauge d'expérience, pour le bandeau de l'accueil (fond coloré). */
export function XpBar({ xp }: { xp: number }) {
  const info = levelInfo(xp)
  return (
    <Link to="/progres#niveau" className="relative mt-4 block rounded-2xl bg-white/15 p-3 ring-1 ring-white/25">
      <div className="flex items-center justify-between text-sm">
        <span className="font-extrabold">
          {info.rank.icon} Niveau {info.level} · {info.rank.title}
        </span>
        <span className="text-xs font-bold text-white/85">⭐ {xp} XP</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/25">
        <div className="h-full rounded-full bg-linear-to-r from-amber-300 to-yellow-200" style={{ width: `${(info.into / info.needed) * 100}%` }} />
      </div>
      <p className="mt-1 text-[0.6875rem] text-white/80">
        Encore {info.needed - info.into} XP pour le niveau {info.level + 1}
      </p>
    </Link>
  )
}
