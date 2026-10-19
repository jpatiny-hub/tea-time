import { allCorrections, translationExercises } from '../data/content'
import { extra } from '../data/edition-content'
import { themes } from '../data/themes'
import { EDITION } from '../edition'
import { perspectiveExercises, styleExercises, synonymExercises } from '../data/style'
import { writingTasks } from '../data/writing'
import { readingTexts } from '../data/reading'
import { dialogues } from '../data/dialogues'
import { useProgress } from '../lib/store'
import { ListLink, Page, Section } from '../components/ui'

export function Practice() {
  const data = useProgress()
  return (
    <Page title="Pratique" subtitle="Choisis une compétence à travailler.">
      <Section title="Écrire juste">
        {extra && (
          <ListLink to="/pratique/exercices" icon="🧩" title="Exercices par type ou par thème" subtitle="Textes à trous, phrases à corriger, à compléter, traductions, questions" />
        )}
        {translationExercises.length > 0 && (
          <ListLink to="/pratique/traduction" icon="🔤" title="Petites phrases à traduire" subtitle={`${translationExercises.length} phrases français ↔ ${EDITION.langName}, corrigées avec tolérance`} />
        )}
        {allCorrections.length > 0 && (
          <ListLink to="/pratique/corrections" icon="🩹" title="Mes erreurs de cours" subtitle={`${allCorrections.length} phrases corrigées en séance, à réécrire sans faute`} />
        )}
        {styleExercises.length > 0 && (
          <ListLink to="/pratique/reformulation" icon="✨" title="Trouver la bonne formulation" subtitle={`${styleExercises.length + perspectiveExercises.length + synonymExercises.length} exercices : formulations naturelles, synonymes, changer de perspective`} />
        )}
        <ListLink to="/pratique/ecrit" icon="🖋️" title="Atelier d'écriture" subtitle={`${writingTasks.length} sujets avec modèles · ${data.writing.length} texte(s) écrit(s)`} />
      </Section>
      <Section title="Parler & comprendre">
        <ListLink to="/pratique/oral" icon="🎤" title="Oral" subtitle="Prononciation, répétition, expression libre avec transcription" />
        <ListLink to="/pratique/ecoute" icon="🎧" title="Écoute & dictée" subtitle={`${dialogues.length} dialogues + dictées`} />
        <ListLink to="/pratique/lecture" icon="📰" title="Lecture" subtitle={`${readingTexts.length} textes ${EDITION.levels[0]} → ${EDITION.levels[EDITION.levels.length - 1]} avec glossaire et questions`} />
      </Section>
      {themes.length > 0 && (
        <Section title="Culture">
          <ListLink to="/themes" icon="🎭" title="Thèmes & culture" subtitle="Halloween : références, traditions, idiomes et histoires qui font peur" tone="orange" />
        </Section>
      )}
    </Page>
  )
}
