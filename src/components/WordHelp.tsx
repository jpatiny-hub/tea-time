import { useEffect, useState } from 'react'
import { useProgress } from '../lib/store'
import { baseForms, expressionAround, helpWords, lookup } from '../lib/lexicon'
import { addMyWord, removeMyWord } from '../lib/mywords'
import { closeWord, openWord, useWordRequest } from '../lib/wordsheet'
import { EDITION } from '../edition'
import { exampleFr } from '../data/examples'
import { WordSprite } from './Pixel'
import { btnPrimary, btnSecondary, input, SpeakButton } from './ui'

const shortFr = (fr: string) => {
  const first = fr.split(' ; ')[0]
  return first.length > 34 ? `${first.slice(0, 32)}…` : first
}

/** « Mots de l'exercice » : les mots de l'énoncé (textes dans la langue apprise) avec leur traduction, sous l'exercice. */
export function WordHelpPanel({ texts, context }: { texts: string[]; context: string }) {
  const data = useProgress()
  if (!data.settings.wordHelp) return null
  const seen = new Set<string>()
  const known: { w: string; fr: string; mine: boolean }[] = []
  const unknown: string[] = []
  for (const t of texts) {
    for (const w of helpWords(t)) {
      const k = baseForms(w)[0]
      if (seen.has(k)) continue
      seen.add(k)
      const e = lookup(w, data.myWords)
      if (e) known.push({ w, fr: e.fr, mine: !!data.myWords[e.base] })
      // Un mot inconnu n'est proposé que s'il vient d'une vraie phrase de la langue apprise.
      else if (t.split(/\s+/).length >= 3) unknown.push(w)
    }
  }
  if (known.length === 0 && unknown.length === 0) return null
  return (
    <details className="mt-4 rounded-2xl bg-gray-50 p-3 text-sm dark:bg-white/5">
      <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300">📖 Mots de l’exercice ({known.length + Math.min(unknown.length, 4)})</summary>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {known.map((k) => (
          <button key={k.w} onClick={() => openWord(k.w, context)} className="rounded-xl bg-white px-2.5 py-1 text-left text-xs shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
            <span className="font-extrabold">{k.w}</span> <span className="text-gray-500 dark:text-gray-400">{shortFr(k.fr)}</span>{k.mine && ' ⭐'}
          </button>
        ))}
        {unknown.slice(0, 4).map((w) => (
          <button key={w} onClick={() => openWord(w, context)} className="rounded-xl border border-dashed border-gray-300 px-2.5 py-1 text-xs dark:border-gray-600">
            <span className="font-extrabold">{w}</span> <span className="text-gray-400">?</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[0.6875rem] text-gray-400">Touche un mot pour l’ajouter à « Mes mots à retravailler ».</p>
    </details>
  )
}

/** Fenêtre qui s'ouvre quand on touche un mot : traduction, ajout à « Mes mots à retravailler ». */
export function WordSheetHost() {
  const req = useWordRequest()
  const data = useProgress()
  const [typed, setTyped] = useState('')
  useEffect(() => setTyped(''), [req])
  useEffect(() => {
    if (!req) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeWord()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [req])
  if (!req) return null

  const entry = lookup(req.word, data.myWords)
  const key = entry?.base ?? req.word.toLowerCase()
  const inList = !!data.myWords[key]
  const expr = expressionAround(req.sentence, req.word)
  const name = /^\p{Lu}/u.test(req.word) && !entry

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={closeWord} role="dialog" aria-modal="true" aria-label={`Traduction de ${req.word}`}>
      <div className="mx-auto w-full max-w-md rounded-t-3xl bg-white p-5 pb-8 shadow-2xl dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <WordSprite word={req.word} size={52} />
            <div>
            <p className="text-2xl font-extrabold leading-tight">{req.word}</p>
            {entry && entry.base !== req.word.toLowerCase() && <p className="text-xs text-gray-500 dark:text-gray-400">forme de base : {entry.base}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SpeakButton text={req.word} slow />
            <button onClick={closeWord} aria-label="Fermer" className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold dark:bg-gray-800">✕</button>
          </div>
        </div>

        {entry ? (
          <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-base font-semibold text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">{entry.fr}</p>
        ) : name ? (
          <p className="mt-3 rounded-2xl bg-gray-50 p-3 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">Probablement un nom propre (prénom, ville…) : rien à traduire.</p>
        ) : (
          <div className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
            <p>Ce mot n’est pas encore dans le dictionnaire de l’appli. Cherche sa traduction (ou demande-la), puis écris-la ici pour la garder dans ta liste.</p>
            <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Traduction en français…" className={`${input} mt-2`} autoCapitalize="none" autoCorrect="off" />
          </div>
        )}

        {expr && <p className="mt-2 text-sm"><span className="text-gray-500 dark:text-gray-400">Dans cette phrase, l’expression </span><b>« {expr.text} »</b><span className="text-gray-500 dark:text-gray-400"> veut dire </span><b>{expr.fr}</b>.</p>}
        {entry?.example && (
          <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">« {entry.example} »{exampleFr(entry.example) && <span className="block not-italic text-xs">{exampleFr(entry.example)}</span>}</p>
        )}
        {req.sentence && req.sentence !== req.word && <p className="mt-2 text-xs text-gray-400">Dans : « {req.sentence.length > 120 ? `${req.sentence.slice(0, 118)}…` : req.sentence} »</p>}

        <div className="mt-4 flex gap-3">
          {inList ? (
            <>
              <span className="flex-1 rounded-2xl bg-emerald-100 px-4 py-3 text-center text-sm font-extrabold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200">⭐ Dans ma liste</span>
              <button onClick={() => removeMyWord(key)} className={btnSecondary}>Retirer</button>
            </>
          ) : entry ? (
            <button onClick={() => addMyWord(key, entry.fr, req.sentence)} className={btnPrimary}>➕ Ajouter à mes mots à retravailler</button>
          ) : !name ? (
            <button disabled={!typed.trim()} onClick={() => addMyWord(key, typed, req.sentence)} className={btnPrimary}>➕ Enregistrer dans ma liste</button>
          ) : null}
        </div>
        <p className="mt-3 text-center text-[0.6875rem] text-gray-400">{EDITION.lang === 'en' ? 'Tes mots se retrouvent dans Vocabulaire → Mes mots à retravailler.' : 'Tes mots se retrouvent dans Vocabulaire → Mes mots.'}</p>
      </div>
    </div>
  )
}
