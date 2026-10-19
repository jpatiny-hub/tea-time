import { readingTexts } from '../data/reading'
import { modules } from '../data/modules'
import { extra } from '../data/edition-content'
import { LevelBadge, ListLink, Page } from '../components/ui'

export function Reading() {
  return (
    <Page title="📰 Lecture" subtitle={extra ? 'Des textes courts avec glossaire et questions. Écoute-les, repère les mots que tu connais, vérifie ta compréhension.' : 'Des textes originaux sur les thèmes de tes cours, du B2 au C1. Écoute-les, repère les temps, vérifie ta compréhension.'} back={{ to: '/pratique', label: 'Pratique' }}>
      <div className="space-y-2">
        {readingTexts.map((t) => (
          <ListLink
            key={t.id}
            to={`/pratique/lecture/${t.id}`}
            title={t.title}
            subtitle={modules.find((m) => m.id === t.module)?.title}
            right={<LevelBadge level={t.level} />}
          />
        ))}
      </div>
    </Page>
  )
}
