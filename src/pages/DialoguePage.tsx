import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { dialogues } from '../data/dialogues'
import { markStep } from '../lib/progress'
import { TapText } from '../components/TapText'
import { RolePlay } from '../components/RolePlay'
import { canSpeak, dialogueVoices, speakQueued, stopSpeaking } from '../lib/speech'
import { InlineQuiz } from '../components/InlineQuiz'
import { btnPrimary, btnSecondary, card, LevelBadge, Page, Section, SpeakButton } from '../components/ui'

export function DialoguePage() {
  const { dialogueId } = useParams()
  const [params] = useSearchParams()
  const moduleId = params.get('module')
  const themeId = params.get('theme')
  const dialogue = dialogues.find((d) => d.id === dialogueId)
  const [playing, setPlaying] = useState(false)
  const [showText, setShowText] = useState(false)
  const [plays, setPlays] = useState(0)
  const [roleplay, setRoleplay] = useState(false)
  const [showFr, setShowFr] = useState(false)

  if (!dialogue) return <Page title="Dialogue introuvable" back={{ to: '/pratique/ecoute', label: 'Écoute' }}>{null}</Page>

  const speakers = Array.from(new Set(dialogue.lines.map((l) => l.speaker)))

  function play(slow = false) {
    if (!dialogue) return
    if (playing) {
      stopSpeaking()
      setPlaying(false)
      return
    }
    stopSpeaking()
    setPlaying(true)
    setPlays((p) => p + 1)
    const voices = dialogueVoices(speakers)
    dialogue.lines.forEach((l, i) => {
      speakQueued(l.text, {
        ...voices[speakers.indexOf(l.speaker)],
        rate: (voices[speakers.indexOf(l.speaker)].rate ?? 1) * (slow ? 0.7 : 1),
        onEnd: i === dialogue.lines.length - 1 ? () => setPlaying(false) : undefined,
      })
    })
  }

  return (
    <Page
      title={`🎧 ${dialogue.title}`}
      subtitle={<span className="flex items-center gap-2"><LevelBadge level={dialogue.level} /> {dialogue.context}</span>}
      back={themeId ? { to: `/themes/${themeId}`, label: 'Thème' } : moduleId ? { to: `/cours/module/${moduleId}`, label: 'Module' } : { to: '/pratique/ecoute', label: 'Écoute' }}
    >
      {roleplay ? (
        <RolePlay dialogue={dialogue} onClose={() => setRoleplay(false)} />
      ) : (
      <>
      {canSpeak() ? (
        <div className="flex gap-2">
          <button onClick={() => play()} className={btnPrimary}>{playing ? '⏹ Arrêter' : plays === 0 ? '▶️ Écouter le dialogue' : '🔁 Réécouter'}</button>
          {!playing && <button onClick={() => play(true)} className={btnSecondary} aria-label="Écouter lentement">🐢 Lent</button>}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Synthèse vocale indisponible : lis le texte à la place.</p>
      )}
      {speakers.length >= 2 && (
        <button onClick={() => { stopSpeaking(); setPlaying(false); setRoleplay(true) }} className={`${btnSecondary} mt-3`}>🎭 Jouer le dialogue (je parle !)</button>
      )}
      <p className="mt-2 text-center text-xs text-gray-400">1re écoute : l'idée générale. 2e écoute : les détails. Puis réponds sans lire le texte.</p>

      <Section title="Questions">
        <InlineQuiz questions={dialogue.questions} onDone={() => markStep(moduleId ?? dialogue.module, 'ecoute')} />
      </Section>

      <button onClick={() => setShowText(!showText)} className={`${btnSecondary} mt-4`}>{showText ? 'Masquer le texte' : 'Afficher le texte (après avoir répondu !)'}</button>
      {showText && dialogue.lines.some((l) => l.fr) && (
        <button onClick={() => setShowFr(!showFr)} className="mt-2 w-full text-center text-sm font-semibold text-indigo-600 underline dark:text-indigo-300">{showFr ? 'Masquer la traduction' : '🇫🇷 Voir en français'}</button>
      )}
      {showText && (
        <div className="mt-3 space-y-2">
          {dialogue.lines.map((l, i) => (
            <div key={i} className={`${card} flex items-start justify-between gap-2 p-3`}>
              <div className="text-sm">
                <p><span className="font-bold text-indigo-600 dark:text-indigo-400">{l.speaker}: </span><TapText text={l.text} target /></p>
                {showFr && l.fr && <p className="mt-0.5 text-gray-500 dark:text-gray-400">{l.fr}</p>}
              </div>
              <SpeakButton text={l.text} small slow />
            </div>
          ))}
        </div>
      )}
      </>
      )}
    </Page>
  )
}
