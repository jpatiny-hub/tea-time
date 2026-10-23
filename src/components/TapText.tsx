import { useProgress } from '../lib/store'
import { looksFrench } from '../lib/lexicon'
import { openWord } from '../lib/wordsheet'

const WORD = /([\p{L}][\p{L}'’-]*)/gu
const QUOTED = /([«“"][^»”"]+[»”"])/g

function Words({ text, sentence }: { text: string; sentence: string }) {
  return (
    <>
      {text.split(WORD).map((part, i) => {
        if (i % 2 === 0) return part
        const word = part.replace(/^['’-]+|['’-]+$/g, '')
        return (
          <span
            key={i}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              openWord(word, sentence)
            }}
            onKeyDown={(e) => e.key === 'Enter' && openWord(word, sentence)}
            className="cursor-pointer rounded-sm underline decoration-indigo-300 decoration-dotted underline-offset-4"
          >
            {part}
          </span>
        )
      })}
    </>
  )
}

/**
 * Texte dont chaque mot peut être touché pour voir sa traduction (réglage « Aide vocabulaire »).
 * Une consigne en français reste telle quelle, sauf les passages entre guillemets (ex. « bread »).
 */
export function TapText({ text, sentence, target = false }: { text: string; sentence?: string; target?: boolean }) {
  const { settings } = useProgress()
  if (!settings.wordHelp) return <>{text}</>
  // Un indice français en fin de phrase (« Wil je een ___?  (le câlin) ») n'est pas touchable.
  const hint = /\s{2}\(.*\)\s*$/.exec(text)
  if (hint) {
    const main = text.slice(0, hint.index)
    return <><TapText text={main} sentence={sentence ?? main} target={target} />{hint[0]}</>
  }
  const ctx = sentence ?? text
  if (!target && looksFrench(text)) {
    return (
      <>
        {text.split(QUOTED).map((part, i) => (i % 2 === 1 ? <Words key={i} text={part} sentence={ctx} /> : part))}
      </>
    )
  }
  return <Words text={text} sentence={ctx} />
}
