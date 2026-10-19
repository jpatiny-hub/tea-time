// Apparence : thème clair / sombre / automatique et taille du texte.
// Appliqué sur <html> avant l'affichage (main.tsx) puis à chaque changement de réglage (App.tsx).
import type { FontScale, Settings } from './store'

export const FONT_SCALES: { id: FontScale; label: string; percent: number }[] = [
  { id: 'normal', label: 'Normal', percent: 100 },
  { id: 'large', label: 'Grand', percent: 118 },
  { id: 'xlarge', label: 'Très grand', percent: 135 },
]

export function systemPrefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

export function applyAppearance(settings: Pick<Settings, 'theme' | 'fontScale'>) {
  const root = document.documentElement
  const dark = settings.theme === 'dark' || (settings.theme === 'auto' && systemPrefersDark())
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  const percent = FONT_SCALES.find((f) => f.id === settings.fontScale)?.percent ?? 100
  // Tout est en rem : changer la taille de base agrandit toute l'appli.
  root.style.fontSize = percent === 100 ? '' : `${percent}%`
}
