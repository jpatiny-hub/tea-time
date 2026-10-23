import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { readingTexts } from '../data/reading'
import { markStep } from '../lib/progress'
import { TapText } from '../components/TapText'
import { canSpeak, speak, speakQueued, stopSpeaking } from '../lib/speech'
import { InlineQuiz } from '../components/InlineQuiz'
import { btnSecondary, card, LevelBadge, Page, Section, SpeakButton } from '../components/ui'

export function ReadingTextPage() {
  const { textId } = useParams()
  const [params] = useSearchParams()
  const moduleId = params.get('module')
  const themeId = params.get('theme')
  const text = readingTexts.find((t) => t.id === textId)
  const [playing, setPlaying] = useState(false)

  if (!text) return <Page title="Texte introuvable" back={{ to: '/pratique/lecture', label: 'Lecture' }}>{null}</Page>

  function playAll() {
    if (!text) return
    if (playing) {
      stopSpeaking()
      setPlaying(false)
      return
    }
    setPlaying(true)
    speak(text.paragraphs[0])
    text.paragraphs.slice(1).forEach((p, i) => {
      speakQueued(p, { onEnd: i === text.paragraphs.length - 2 ? () => setPlaying(false) : undefined })
    })
  }

  return (
    <Page title={text.title} subtitle={<LevelBadge level={text.level} />} back={themeId ? { to: `/themes/${themeId}`, label: 'Thème' } : moduleId ? { to: `/cours/module/${moduleId}`, label: 'Module' } : { to: '/pratique/lecture', label: 'Lecture' }}>
      {canSpeak() && (
        <button onClick={playAll} className={`${btnSecondary} mb-3`}>{playing ? '⏹ Arrêter la lecture' : '🔊 Écouter tout le texte'}</button>
      )}
      <div className="space-y-3">
        {text.paragraphs.map((p, i) => (
          <div key={i} className={`${card} flex items-start justify-between gap-2`}>
            <p className="leading-relaxed"><TapText text={p} target /></p>
            <SpeakButton text={p} small />
          </div>
        ))}
      </div>

      <Section title="Glossaire">
        <div className={`${card} space-y-1 p-3`}>
          {text.glossary.map((g) => (
            <p key={g.en} className="text-sm"><span className="font-semibold">{g.en}</span> — <span className="text-gray-600 dark:text-gray-300">{g.fr}</span></p>
          ))}
        </div>
      </Section>

      <Section title="Compréhension">
        <InlineQuiz questions={text.questions} onDone={() => markStep(moduleId ?? text.module, 'lecture')} />
      </Section>
    </Page>
  )
}
