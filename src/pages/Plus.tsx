import { Link } from 'react-router-dom'
import { sections } from './Home'
import { EDITION } from '../edition'
import { cardLink, IconTile, Page } from '../components/ui'

/** « Plus » : tout ce qui n'est pas dans les 4 onglets principaux. */
export function Plus() {
  const rest = [
    ...sections,
    { to: '/cours', label: 'Mes cours et thèmes (libre)', icon: '🎓', desc: 'Parcourir les thèmes dans l’ordre que tu veux', tone: 'violet' as const },
    { to: '/nouveautes', label: 'Nouveautés', icon: '✨', desc: 'Ce qui a changé dans l’appli', tone: 'amber' as const },
    { to: '/acces', label: `Accès : ${EDITION.icon} ${EDITION.name}`, icon: '👤', desc: 'Changer d’accès', tone: 'teal' as const },
  ]
  return (
    <Page title="Plus" subtitle="Tout le reste de l’appli, rangé au même endroit.">
      <div className="grid grid-cols-2 gap-4">
        {rest.map((s) => (
          <Link key={s.to} to={s.to} className={cardLink}>
            <IconTile icon={s.icon} tone={s.tone} />
            <p className="mt-3 font-extrabold leading-tight">{s.label}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </Page>
  )
}
