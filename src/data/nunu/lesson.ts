import type { GrammarGroup, GrammarLesson, GrammarPoint, Level } from '../../types.ts'
import { withIds, type ExDraft } from '../theme-builder.ts'

// Fabrique de leçons de grammaire (accès Nunu). Ids des exercices = position : AJOUTER À LA FIN d'une leçon.
export interface LessonDef {
  id: string
  order: number
  group: GrammarGroup
  title: string
  level: Level
  summary: string
  tag: string
  points: GrammarPoint[]
  exercises: ExDraft[]
}

export const lesson = (d: LessonDef): GrammarLesson => ({
  id: d.id, order: d.order, group: d.group, title: d.title, level: d.level, summary: d.summary, tag: d.tag, points: d.points,
  exercises: withIds(d.id, d.exercises, d.level),
})
