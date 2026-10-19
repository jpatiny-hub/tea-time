// Liste de toutes les séances de cours, dans l'ordre chronologique.
// Pour ajouter une séance : créer `AAAA-MM-JJ.ts` sur le modèle des autres, puis l'importer ici.
import type { CourseSession } from '../../types'
import { session as s0624 } from './2026-06-24.ts'
import { session as s0702 } from './2026-07-02.ts'
import { session as s0715 } from './2026-07-15.ts'
import { session as s0722 } from './2026-07-22.ts'
import { session as s0729 } from './2026-07-29.ts'
import { session as s0805 } from './2026-08-05.ts'
import { session as s0812 } from './2026-08-12.ts'
import { session as s0819 } from './2026-08-19.ts'
import { session as s0902 } from './2026-09-02.ts'
import { session as s0909 } from './2026-09-09.ts'
import { session as s0916 } from './2026-09-16.ts'
import { session as s0923 } from './2026-09-23.ts'
import { session as s0930 } from './2026-09-30.ts'
import { session as s1007 } from './2026-10-07.ts'
import { session as s1014 } from './2026-10-14.ts'
import { extra } from '../../data/edition-content.ts'

const jojoSessions: CourseSession[] = [
  s0624,
  s0702,
  s0715,
  s0722,
  s0729,
  s0805,
  s0812,
  s0819,
  s0902,
  s0909,
  s0916,
  s0923,
  s0930,
  s1007,
  s1014,
].sort((a, b) => a.date.localeCompare(b.date))

// Accès en cours (voir src/edition.ts).
export const sessions: CourseSession[] = extra ? [] : jojoSessions
