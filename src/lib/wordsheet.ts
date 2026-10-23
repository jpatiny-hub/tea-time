// Fenêtre « Que veut dire ce mot ? » : un petit état global pour l'ouvrir depuis n'importe quel texte.
import { useSyncExternalStore } from 'react'

export interface WordRequest {
  word: string
  /** La phrase où le mot a été touché. */
  sentence: string
}

let current: WordRequest | null = null
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const openWord = (word: string, sentence: string) => {
  current = { word, sentence }
  emit()
}
export const closeWord = () => {
  current = null
  emit()
}
export function useWordRequest(): WordRequest | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => current,
  )
}
