import { Link, useLocation } from 'react-router-dom'
import { isDutch } from '../edition'

const items = [
  { to: '/', label: 'Accueil', icon: '🏠' },
  { to: '/cours', label: 'Cours', icon: '🎓' },
  { to: '/temps', label: isDutch ? 'Verbes' : 'Temps', icon: '⏳' },
  { to: '/vocabulaire', label: 'Vocab', icon: '🗂️' },
  { to: '/pratique', label: 'Pratique', icon: '✍️' },
  { to: '/revision', label: 'Révision', icon: '🔁' },
]

function isActive(pathname: string, to: string): boolean {
  return to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)
}

// Barre opaque, sans flou, sans transition ni transformation (cf. CLAUDE.md, robustesse d'affichage).
// Elle est recréée à chaque changement de page (`key`) : certains Chrome Android ne repeignaient pas
// un élément `fixed` dont seule la classe change (onglet actif pas mis à jour, barre invisible).
// Les marges (px-4) sont celles du contenu, pour qu'elle soit alignée sur les encadrés.
export function NavBar() {
  const { pathname } = useLocation()
  return (
    <nav key={pathname} className="fixed inset-x-0 bottom-0 z-20 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
      <ul className="mx-4 grid grid-cols-6 gap-1 rounded-3xl bg-white p-1.5 shadow-lg ring-1 ring-gray-900/10 sm:mx-auto sm:max-w-[calc(28rem-2rem)] dark:bg-gray-900 dark:ring-white/15">
        {items.map((item) => {
          const active = isActive(pathname, item.to)
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10.5px] font-bold ${
                  active ? 'bg-indigo-600 text-white dark:bg-indigo-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
