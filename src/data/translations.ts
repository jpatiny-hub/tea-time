import type { Dialogue, ReadingText } from '../types.ts'

// Traductions françaises des dialogues et des lectures (bouton « Voir en français »).
// Une ligne de traduction par réplique / par paragraphe, dans le même ordre que le texte.

export function attachDialogueFr(list: Dialogue[], fr: Record<string, string[]>): Dialogue[] {
  return list.map((d) => (fr[d.id] ? { ...d, lines: d.lines.map((l, i) => ({ ...l, fr: fr[d.id][i] })) } : d))
}

export function attachReadingFr(list: ReadingText[], fr: Record<string, string[]>): ReadingText[] {
  return list.map((t) => (fr[t.id] ? { ...t, paragraphsFr: fr[t.id] } : t))
}
