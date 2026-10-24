// Atelier de pixel art : on dessine sur une grille de 16 × 16 avec quelques formes (rectangles, ellipses, lignes…),
// le contour foncé est ajouté automatiquement autour de chaque forme, et tous les sprites partagent la même palette
// pour rester cohérents. Les sprites sont calculés une fois au chargement (quelques microsecondes chacun).

export const PALETTE: Record<string, string> = {
  k: '#2d2250', // contour
  w: '#ffffff',
  u: '#f7efe0', // crème
  l: '#e3def2', // gris très clair
  g: '#a59cc4', // gris
  r: '#e8453c', // rouge
  q: '#ff8f85', // rouge clair
  R: '#a82a2a', // rouge foncé
  o: '#f08a24', // orange
  O: '#c2560f', // orange foncé
  y: '#ffd23f', // jaune
  Y: '#d9a21b', // or
  n: '#b5733a', // brun
  N: '#7a4a24', // brun foncé
  t: '#f3c99b', // beige
  G: '#4fbf5b', // vert
  D: '#2a8a3c', // vert foncé
  b: '#4a8cf0', // bleu
  B: '#2b57b8', // bleu foncé
  c: '#8fdcf7', // cyan
  p: '#f58bb4', // rose
  P: '#8a5bd6', // violet
}

export const SIZE = 16
type Grid = string[][]

class Canvas {
  g: Grid = Array.from({ length: SIZE }, () => Array(SIZE).fill('.'))
  /** Pixels dessinés après le contour (vapeur, reflets) : ils n'ont pas de contour. */
  tops: [number, number, string][] = []
  top(x: number, y: number, c: string) {
    this.tops.push([x, y, c])
    return this
  }
  /** Dessine une grille de caractères (palette) à partir de (x0, y0) : pour les formes difficiles (cœur, étoile). */
  stamp(rows: string[], x0 = 0, y0 = 0) {
    rows.forEach((row, j) => [...row].forEach((ch, i) => ch !== '.' && ch !== ' ' && this.px(x0 + i, y0 + j, ch)))
    return this
  }
  px(x: number, y: number, c: string) {
    if (x >= 0 && y >= 0 && x < SIZE && y < SIZE) this.g[Math.round(y)][Math.round(x)] = c
    return this
  }
  rect(x: number, y: number, w: number, h: number, c: string) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, c)
    return this
  }
  /** Ellipse pleine centrée en (cx, cy). */
  ell(cx: number, cy: number, rx: number, ry: number, c: string) {
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < SIZE; x++) {
        const dx = (x - cx) / (rx + 0.35)
        const dy = (y - cy) / (ry + 0.35)
        if (dx * dx + dy * dy <= 1) this.px(x, y, c)
      }
    return this
  }
  /** Anneau (roue, cadran). */
  ring(cx: number, cy: number, r: number, c: string) {
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < SIZE; x++) {
        const d = Math.hypot(x - cx, y - cy)
        if (d >= r - 0.7 && d <= r + 0.5) this.px(x, y, c)
      }
    return this
  }
  line(x1: number, y1: number, x2: number, y2: number, c: string) {
    const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))
    for (let i = 0; i <= n; i++) this.px(x1 + ((x2 - x1) * i) / (n || 1), y1 + ((y2 - y1) * i) / (n || 1), c)
    return this
  }
  /** Triangle (sommet en haut, base en bas) : de la ligne y0 à y1, largeur croissante. */
  tri(cx: number, y0: number, y1: number, maxHalf: number, c: string) {
    for (let y = y0; y <= y1; y++) {
      const half = Math.round(((y - y0) / Math.max(1, y1 - y0)) * maxHalf)
      this.rect(cx - half, y, half * 2 + 1, 1, c)
    }
    return this
  }
  erase(fn: (c: Canvas) => void) {
    const mark = new Canvas()
    fn(mark)
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (mark.g[y][x] !== '.') this.g[y][x] = '.'
    return this
  }
  /** Contour foncé autour des pixels remplis. */
  outline() {
    const out = this.g.map((r) => [...r])
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < SIZE; x++) {
        if (this.g[y][x] !== '.') continue
        const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (this.g[y + dy]?.[x + dx] ?? '.') !== '.' && this.g[y + dy][x + dx] !== 'k')
        if (near) out[y][x] = 'k'
      }
    for (const [x, y, c] of this.tops) if (x >= 0 && y >= 0 && x < SIZE && y < SIZE) out[y][x] = c
    return out.map((r) => r.join(''))
  }
}

const make = (draw: (c: Canvas) => void): string[] => {
  const c = new Canvas()
  draw(c)
  return c.outline()
}

// ---------------------------------------------------------------- les sprites

export const SPRITES: Record<string, string[]> = {
  apple: make((c) => {
    c.ell(8, 9, 5, 5, 'r').ell(11, 11, 2, 3, 'R').px(5, 7, 'q').px(5, 8, 'q').px(6, 6, 'q')
    c.rect(8, 3, 1, 3, 'N').ell(11, 3, 2, 1, 'G').px(10, 2, 'D')
  }),
  bread: make((c) => {
    c.ell(8, 9, 6, 4, 't').rect(3, 11, 11, 2, 'n').ell(8, 8, 5, 2, 'o')
    c.line(5, 6, 6, 8, 'n').line(8, 5, 9, 7, 'n').line(11, 6, 12, 8, 'n').px(5, 8, 'y').px(10, 8, 'y')
  }),
  milk: make((c) => {
    c.rect(5, 5, 6, 9, 'w').rect(5, 3, 6, 3, 'b').rect(6, 2, 4, 1, 'B').rect(6, 8, 4, 4, 'c').px(7, 9, 'w').rect(10, 5, 1, 9, 'l')
  }),
  cheese: make((c) => {
    c.rect(2, 8, 12, 5, 'y').rect(4, 6, 8, 2, 'y').rect(6, 5, 4, 1, 'y').rect(2, 12, 12, 1, 'Y').rect(13, 8, 1, 5, 'Y')
    c.px(5, 9, 'Y').px(9, 9, 'Y').px(7, 11, 'Y').px(11, 10, 'Y').px(4, 11, 'Y')
  }),
  egg: make((c) => {
    c.ell(8, 9, 4, 5, 'u').ell(9, 10, 2, 3, 't').px(6, 6, 'w').px(6, 7, 'w').px(7, 5, 'w')
  }),
  coffee: make((c) => {
    c.rect(3, 8, 8, 6, 'w').rect(11, 9, 2, 3, 'w').rect(12, 10, 1, 1, '.').rect(3, 8, 8, 1, 'N').rect(2, 14, 11, 1, 'l').rect(8, 9, 2, 5, 'l')
    c.top(5, 4, 'g').top(6, 5, 'g').top(5, 6, 'g').top(8, 3, 'g').top(9, 4, 'g').top(8, 5, 'g')
  }),
  tea: make((c) => {
    c.rect(3, 8, 8, 6, 'w').rect(11, 9, 2, 3, 'w').rect(12, 10, 1, 1, '.').rect(3, 8, 8, 1, 'O').rect(2, 14, 11, 1, 'l').rect(8, 9, 2, 5, 'l')
    c.top(7, 3, 'g').top(8, 4, 'g').top(7, 5, 'g').top(8, 6, 'g').line(5, 6, 5, 8, 'u').rect(4, 5, 2, 2, 'y')
  }),
  water: make((c) => {
    c.tri(8, 2, 8, 4, 'b').ell(8, 10, 4, 4, 'b').ell(9, 11, 2, 2, 'B').px(6, 9, 'c').px(6, 10, 'c').px(7, 8, 'c')
  }),
  house: make((c) => {
    c.rect(3, 8, 10, 6, 't').tri(8, 2, 7, 7, 'r').rect(1, 7, 14, 1, 'R').rect(7, 10, 3, 4, 'n').rect(4, 9, 2, 2, 'c').rect(11, 9, 2, 2, 'c').px(9, 12, 'y')
    c.rect(11, 3, 2, 3, 'N')
  }),
  car: make((c) => {
    c.rect(1, 8, 14, 4, 'r').rect(4, 5, 8, 3, 'r').rect(5, 6, 2, 2, 'c').rect(9, 6, 2, 2, 'c').rect(1, 11, 14, 1, 'R').px(14, 9, 'y').px(1, 9, 'q')
    c.ell(4, 12, 2, 2, 'k').ell(11, 12, 2, 2, 'k').px(4, 12, 'g').px(11, 12, 'g')
  }),
  bus: make((c) => {
    c.rect(1, 3, 14, 10, 'y').rect(2, 4, 3, 3, 'c').rect(6, 4, 3, 3, 'c').rect(10, 4, 3, 3, 'c').rect(1, 9, 14, 1, 'Y').rect(13, 4, 1, 3, 'c')
    c.rect(1, 12, 14, 1, 'Y').px(14, 10, 'r').ell(4, 13, 2, 1, 'k').ell(11, 13, 2, 1, 'k')
  }),
  train: make((c) => {
    c.rect(2, 3, 12, 10, 'b').rect(2, 3, 12, 2, 'B').rect(3, 6, 3, 3, 'c').rect(7, 6, 3, 3, 'c').rect(11, 6, 2, 3, 'c').rect(2, 10, 12, 1, 'y')
    c.px(13, 11, 'y').ell(4, 13, 2, 1, 'k').ell(11, 13, 2, 1, 'k').rect(6, 1, 3, 2, 'g')
  }),
  bike: make((c) => {
    c.ring(4, 11, 3, 'k').ring(12, 11, 3, 'k').line(4, 11, 8, 11, 'r').line(8, 11, 7, 7, 'r').line(7, 7, 11, 7, 'r').line(11, 7, 12, 11, 'r').line(4, 11, 7, 7, 'r')
    c.rect(5, 5, 3, 1, 'k').rect(10, 5, 3, 1, 'k').px(11, 6, 'k')
  }),
  cat: make((c) => {
    c.ell(8, 9, 5, 4, 'o').tri(4, 3, 7, 1, 'o').tri(12, 3, 7, 1, 'o').px(4, 5, 'p').px(12, 5, 'p')
    c.px(6, 8, 'k').px(10, 8, 'k').px(8, 10, 'p').line(2, 10, 4, 10, 'l').line(12, 10, 14, 10, 'l').px(8, 6, 'O').px(6, 6, 'O').px(10, 6, 'O')
  }),
  dog: make((c) => {
    c.ell(8, 8, 4, 5, 'n').rect(2, 5, 3, 6, 'N').rect(11, 5, 3, 6, 'N').ell(8, 11, 3, 2, 't').px(8, 10, 'k').px(6, 7, 'k').px(10, 7, 'k').px(8, 12, 'p')
  }),
  bird: make((c) => {
    c.ell(7, 9, 5, 3, 'b').ell(11, 6, 2, 2, 'b').px(13, 6, 'o').px(14, 6, 'o').px(11, 5, 'k').rect(2, 8, 3, 1, 'B').ell(7, 10, 3, 1, 'c').rect(6, 12, 1, 2, 'o').rect(9, 12, 1, 2, 'o')
    c.ell(6, 8, 2, 1, 'B')
  }),
  fish: make((c) => {
    c.ell(7, 8, 5, 3, 'o').tri(13, 5, 8, 0, 'o').rect(12, 5, 3, 7, 'O').px(4, 7, 'k').ell(7, 9, 3, 1, 'y').px(3, 8, 'q')
  }),
  sun: make((c) => {
    c.ell(8, 8, 3, 3, 'y').px(7, 7, 'w')
    for (const [x, y] of [[8, 1], [8, 14], [1, 8], [14, 8], [3, 3], [12, 3], [3, 12], [12, 12]]) c.rect(x, y, 1, 1, 'o')
    c.px(8, 2, 'o').px(8, 13, 'o').px(2, 8, 'o').px(13, 8, 'o')
  }),
  rain: make((c) => {
    c.ell(6, 6, 3, 2, 'l').ell(10, 6, 3, 2, 'l').ell(8, 4, 3, 2, 'l').rect(3, 6, 10, 3, 'l').rect(3, 8, 10, 1, 'g')
    for (const [x, y] of [[4, 11], [7, 12], [10, 11], [5, 14], [9, 14]]) c.rect(x, y, 1, 2, 'b')
  }),
  moon: make((c) => {
    c.ell(8, 8, 5, 5, 'y').erase((e) => e.ell(11, 6, 4, 4, 'x')).px(5, 9, 'Y').px(6, 11, 'Y').px(4, 7, 'Y')
    c.px(13, 12, 'y').px(12, 3, 'y')
  }),
  tree: make((c) => {
    c.rect(7, 9, 2, 5, 'n').ell(8, 6, 5, 4, 'G').ell(10, 8, 2, 2, 'D').ell(6, 5, 1, 1, 'q').px(5, 6, 'D').px(7, 4, 'D')
  }),
  flower: make((c) => {
    c.line(8, 8, 8, 14, 'G').ell(10, 11, 2, 1, 'G')
    for (const [x, y] of [[8, 4], [5, 6], [11, 6], [6, 9], [10, 9]]) c.ell(x, y, 1, 1, 'p')
    c.ell(8, 7, 1, 1, 'y')
  }),
  book: make((c) => {
    c.rect(3, 3, 10, 11, 'r').rect(3, 3, 2, 11, 'R').rect(13, 4, 1, 9, 'w').rect(6, 5, 5, 1, 'y').rect(6, 7, 4, 1, 'y').rect(3, 13, 10, 1, 'R')
  }),
  phone: make((c) => {
    c.rect(4, 1, 8, 14, 'B').rect(5, 2, 6, 10, 'c').px(8, 13, 'g').px(6, 4, 'w').px(7, 3, 'w').rect(6, 6, 3, 1, 'b')
  }),
  key: make((c) => {
    c.ell(5, 7, 3, 3, 'Y').erase((e) => e.ell(5, 7, 1, 1, 'x')).rect(8, 6, 7, 2, 'Y').rect(12, 8, 1, 2, 'Y').rect(14, 8, 1, 3, 'Y').px(4, 5, 'y').px(5, 5, 'y')
  }),
  bed: make((c) => {
    c.rect(2, 8, 13, 4, 'b').rect(2, 6, 4, 3, 'w').rect(1, 4, 1, 10, 'n').rect(14, 6, 1, 8, 'n').rect(2, 11, 13, 1, 'B').rect(3, 12, 1, 2, 'N').rect(13, 12, 1, 2, 'N').rect(7, 8, 7, 1, 'c')
  }),
  chair: make((c) => {
    c.rect(4, 2, 2, 9, 'n').rect(4, 9, 8, 2, 'n').rect(4, 11, 1, 3, 'N').rect(11, 11, 1, 3, 'N').rect(5, 3, 1, 5, 'N').rect(6, 4, 2, 1, 'n').rect(6, 6, 2, 1, 'n')
  }),
  table: make((c) => {
    c.rect(1, 6, 14, 2, 'n').rect(1, 7, 14, 1, 'N').rect(2, 8, 2, 6, 'N').rect(12, 8, 2, 6, 'N').ell(8, 5, 2, 1, 'r').px(8, 3, 'D')
  }),
  clock: make((c) => {
    c.ell(8, 8, 6, 6, 'w').ring(8, 8, 6, 'r').line(8, 8, 8, 4, 'k').line(8, 8, 11, 8, 'k').px(8, 3, 'g').px(8, 13, 'g').px(3, 8, 'g').px(13, 8, 'g')
  }),
  heart: make((c) => {
    c.stamp([
      '..rrrr....rrrr..',
      '.rrrrrr..rrrrrr.',
      '.rqqrrrrrrrrrrr.',
      '.rqrrrrrrrrrrrr.',
      '.rrrrrrrrrrrrRr.',
      '..rrrrrrrrrrRr..',
      '...rrrrrrrrRr...',
      '....rrrrrrRr....',
      '.....rrrrRr.....',
      '......rrRr......',
      '.......rr.......',
    ], 0, 2)
  }),
  star: make((c) => {
    c.stamp([
      '.......yy.......',
      '.......yy.......',
      '......yyyy......',
      '......yyyy......',
      'yyyyyyyyyyyyyyyy',
      '.yyyyyyyyyyyyyy.',
      '..yyyyyyyyyyyy..',
      '...yyyyyyyyyy...',
      '....yyyyyyyy....',
      '...yyyyyyyyyy...',
      '..yyyyyyyyyyyy..',
      '..yyyyy..yyyyy..',
      '..yyy......yyy..',
    ], 0, 1).px(7, 3, 'w').px(7, 4, 'w').px(5, 6, 'w').px(6, 6, 'w')
  }),
  bottle: make((c) => {
    c.rect(7, 1, 2, 2, 'p').rect(6, 3, 4, 1, 'w').rect(5, 4, 6, 10, 'w').rect(5, 8, 6, 6, 'u').rect(10, 5, 1, 9, 'l').px(6, 6, 'c').px(6, 10, 'c').px(6, 12, 'c')
  }),
  teddy: make((c) => {
    c.ell(4, 4, 2, 2, 'n').ell(12, 4, 2, 2, 'n').ell(8, 7, 4, 3, 'n').ell(8, 12, 4, 3, 'n').ell(8, 8, 2, 1, 't').rect(3, 10, 2, 3, 'n').rect(11, 10, 2, 3, 'n')
    c.px(6, 6, 'k').px(10, 6, 'k').px(8, 8, 'k').ell(8, 12, 2, 1, 't')
  }),
  shoe: make((c) => {
    c.rect(3, 4, 5, 8, 'r').rect(3, 9, 11, 3, 'r').rect(3, 12, 12, 2, 'w').px(5, 6, 'w').px(5, 8, 'w').px(6, 7, 'w').rect(8, 9, 6, 1, 'R')
  }),
  shirt: make((c) => {
    c.rect(3, 3, 10, 11, 'b').rect(1, 3, 3, 4, 'b').rect(12, 3, 3, 4, 'b').erase((e) => e.rect(6, 3, 4, 2, 'x')).rect(6, 3, 4, 1, 'B').rect(3, 12, 10, 2, 'B').rect(7, 8, 2, 2, 'c')
  }),
  bag: make((c) => {
    c.rect(3, 6, 10, 8, 'o').rect(3, 12, 10, 2, 'O').ring(8, 5, 2.5, 'N').rect(6, 8, 4, 1, 'y').px(8, 9, 'Y')
  }),
  coin: make((c) => {
    c.ell(8, 8, 6, 6, 'y').ring(8, 8, 4, 'Y').rect(8, 5, 1, 6, 'Y').rect(7, 5, 3, 1, 'Y').rect(7, 10, 3, 1, 'Y').px(4, 5, 'w').px(5, 4, 'w')
  }),
  tomato: make((c) => {
    c.ell(8, 9, 6, 5, 'r').ell(11, 11, 2, 2, 'R').px(5, 7, 'q').px(5, 8, 'q').rect(6, 4, 5, 1, 'G').px(7, 3, 'G').px(9, 3, 'G').px(8, 5, 'D').px(8, 2, 'D')
  }),
  carrot: make((c) => {
    c.tri(8, 4, 15, 3, 'o').rect(6, 5, 5, 1, 'o').px(7, 8, 'O').px(8, 10, 'O').px(9, 7, 'O').rect(6, 1, 1, 3, 'G').rect(8, 0, 1, 4, 'G').rect(10, 1, 1, 3, 'G')
  }),
  cake: make((c) => {
    c.rect(2, 9, 12, 5, 'p').rect(2, 7, 12, 3, 'w').rect(2, 12, 12, 2, 'P').rect(8, 3, 1, 4, 'y').px(8, 2, 'o').px(5, 9, 'r').px(10, 9, 'r').px(7, 10, 'r')
  }),
  pizza: make((c) => {
    c.stamp([
      'nnnnnnnnnnnnnnnn',
      'NNNNNNNNNNNNNNNN',
      '.yyyyyyyyyyyyyy.',
      '..yyryyyyyyyyy..',
      '..yyyyyyyyDyyy..',
      '...yyyyrryyyy...',
      '...yyyyyyyyyy...',
      '....yyDyyyyr....',
      '....yyyyyyyy....',
      '.....yyyryy.....',
      '......yyyy......',
      '.......yy.......',
    ], 0, 2)
  }),
  beer: make((c) => {
    c.rect(3, 5, 8, 9, 'y').rect(3, 3, 8, 3, 'w').ring(12, 9, 2.5, 'g').rect(4, 7, 1, 6, 'Y').rect(9, 7, 1, 6, 'o').px(6, 8, 'w').px(7, 11, 'w').px(5, 10, 'w').ell(5, 3, 1, 1, 'w').ell(9, 3, 1, 1, 'w')
  }),
  hospital: make((c) => {
    c.rect(2, 3, 12, 11, 'w').rect(7, 5, 2, 7, 'r').rect(5, 7, 6, 3, 'r').rect(2, 13, 12, 1, 'l')
  }),
  umbrella: make((c) => {
    c.ell(8, 7, 7, 5, 'r').erase((e) => e.rect(0, 8, 16, 8, 'x')).rect(1, 7, 14, 1, 'r').rect(8, 8, 1, 5, 'N').px(7, 13, 'N').px(6, 13, 'N').px(4, 5, 'q').px(8, 2, 'q')
    c.px(4, 8, 'R').px(8, 8, 'R').px(12, 8, 'R')
  }),
  tea_mascot: make((c) => {
    // « Tea », la mascotte : une tasse souriante.
    c.rect(3, 6, 9, 8, 'w').rect(12, 8, 2, 3, 'w').rect(13, 9, 1, 1, '.').rect(3, 6, 9, 1, 'o').rect(2, 14, 11, 1, 'l').rect(10, 7, 2, 7, 'l')
    c.px(5, 9, 'k').px(9, 9, 'k').px(6, 11, 'k').px(7, 12, 'k').px(8, 11, 'k').px(4, 10, 'p').px(10, 10, 'p')
    c.top(6, 2, 'g').top(7, 3, 'g').top(6, 4, 'g').top(9, 1, 'g').top(10, 2, 'g').top(9, 3, 'g')
  }),
  trophy: make((c) => {
    c.rect(5, 2, 6, 5, 'y').tri(8, 7, 9, 3, 'y').rect(7, 9, 2, 2, 'Y').rect(5, 12, 6, 2, 'N').ring(4, 4, 2, 'Y').ring(12, 4, 2, 'Y').px(6, 3, 'w').px(6, 4, 'w').rect(10, 3, 1, 4, 'Y')
  }),
}

// ---------------------------------------------------------------- les mots correspondants (anglais et néerlandais)

const KEYS: Record<string, string[]> = {
  apple: ['apple', 'appel'],
  bread: ['bread', 'brood', 'bakery', 'bakker', 'baker'],
  milk: ['milk', 'melk'],
  cheese: ['cheese', 'kaas'],
  egg: ['egg', 'ei', 'eieren'],
  coffee: ['coffee', 'koffie'],
  tea: ['tea', 'thee', 'teatime'],
  water: ['water', 'drop'],
  house: ['house', 'home', 'huis', 'thuis', 'flat', 'appartement'],
  car: ['car', 'auto', 'wagen'],
  bus: ['bus'],
  train: ['train', 'trein', 'station'],
  bike: ['bike', 'bicycle', 'fiets', 'cycling'],
  cat: ['cat', 'kat', 'poes', 'kitten'],
  dog: ['dog', 'hond', 'puppy'],
  bird: ['bird', 'vogel'],
  fish: ['fish', 'vis'],
  sun: ['sun', 'zon', 'sunny', 'zonnig'],
  rain: ['rain', 'regen', 'cloud', 'wolk', 'weather', 'weer', 'rainy'],
  moon: ['moon', 'maan', 'night', 'nacht'],
  tree: ['tree', 'boom'],
  flower: ['flower', 'bloem', 'garden', 'tuin'],
  book: ['book', 'boek', 'read', 'lezen'],
  phone: ['phone', 'telefoon', 'mobile', 'smartphone'],
  key: ['key', 'sleutel'],
  bed: ['bed', 'sleep', 'slapen'],
  chair: ['chair', 'stoel'],
  table: ['table', 'tafel'],
  clock: ['clock', 'klok', 'time', 'tijd', 'watch', 'horloge'],
  heart: ['heart', 'hart', 'love', 'liefde', 'hartje'],
  star: ['star', 'ster'],
  bottle: ['bottle', 'fles', 'biberon'],
  teddy: ['teddy', 'knuffel', 'doll', 'pop'],
  shoe: ['shoe', 'shoes', 'schoen', 'schoenen'],
  shirt: ['shirt', 't-shirt', 'trui', 'clothes', 'kleding'],
  bag: ['bag', 'tas', 'handbag', 'suitcase', 'koffer'],
  coin: ['money', 'coin', 'geld', 'euro', 'price', 'prijs', 'cash'],
  tomato: ['tomato', 'tomaat'],
  carrot: ['carrot', 'wortel'],
  cake: ['cake', 'taart', 'birthday', 'verjaardag', 'party'],
  pizza: ['pizza'],
  beer: ['beer', 'bier', 'pint', 'pub', 'biertje'],
  hospital: ['hospital', 'ziekenhuis', 'doctor', 'dokter', 'nurse', 'medicine', 'medicijn', 'ill', 'ziek'],
  umbrella: ['umbrella', 'paraplu'],
}

const BY_WORD = new Map<string, string>()
for (const [sprite, words] of Object.entries(KEYS)) for (const w of words) if (!BY_WORD.has(w)) BY_WORD.set(w, sprite)

/** Nom du sprite qui illustre ce mot (formes de base essayées : pluriel, etc.), ou null. */
export function spriteForWord(forms: string[]): string | null {
  for (const f of forms) {
    const s = BY_WORD.get(f.toLowerCase())
    if (s) return s
  }
  return null
}

export const SPRITE_NAMES = Object.keys(SPRITES)
