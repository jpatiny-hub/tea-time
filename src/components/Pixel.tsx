import { useMemo } from 'react'
import { PALETTE, SIZE, SPRITES, spriteForWord } from '../lib/pixel'
import { baseForms } from '../lib/lexicon'

/** Un sprite en pixel art (SVG net, sans lissage). */
export function Pixel({ name, size = 48, label }: { name: string; size?: number; label?: string }) {
  const rects = useMemo(() => {
    const rows = SPRITES[name]
    if (!rows) return []
    const out: { x: number; y: number; w: number; fill: string }[] = []
    rows.forEach((row, y) => {
      let x = 0
      while (x < SIZE) {
        const ch = row[x]
        if (ch === '.' || !PALETTE[ch]) {
          x++
          continue
        }
        let w = 1
        while (x + w < SIZE && row[x + w] === ch) w++
        out.push({ x, y, w, fill: PALETTE[ch] })
        x += w
      }
    })
    return out
  }, [name])
  if (rects.length === 0) return null
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={size} height={size} shapeRendering="crispEdges" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} className="shrink-0">
      {rects.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />)}
    </svg>
  )
}

/** Illustration d'un mot concret (pain, maison, chat…), si on en a une. */
export function WordSprite({ word, size = 48 }: { word: string; size?: number }) {
  const name = useMemo(() => spriteForWord(baseForms(word)), [word])
  return name ? <Pixel name={name} size={size} /> : null
}

/** Confettis en pixels, figés (un fond de fête pour les célébrations). */
export function Confetti({ width = 120, height = 40, seed = 1 }: { width?: number; height?: number; seed?: number }) {
  const dots = useMemo(() => {
    let s = seed * 9301 + 49297
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    const cols = ['r', 'y', 'b', 'G', 'p', 'o', 'P', 'c']
    return Array.from({ length: 26 }, () => ({ x: Math.floor(rnd() * width), y: Math.floor(rnd() * height), c: PALETTE[cols[Math.floor(rnd() * cols.length)]], big: rnd() > 0.7 }))
  }, [width, height, seed])
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((d, i) => <rect key={i} x={d.x} y={d.y} width={d.big ? 3 : 2} height={d.big ? 3 : 2} fill={d.c} opacity={0.85} />)}
    </svg>
  )
}
