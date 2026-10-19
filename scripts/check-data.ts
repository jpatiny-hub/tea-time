// Vérifie la cohérence du contenu avant chaque build / déploiement :
// ids uniques (ils portent la progression !), références valides, exercices bien formés.
// Lancer avec : npm run check-data
import { allExercises } from '../src/data/content.ts'
import { allVocab, allDecks } from '../src/data/vocabulary.ts'
import { sessions } from '../src/data/sessions/index.ts'
import { modules } from '../src/data/modules.ts'
import { grammarLessons } from '../src/data/grammar.ts'
import { readingTexts } from '../src/data/reading.ts'
import { dialogues } from '../src/data/dialogues.ts'
import { writingTasks } from '../src/data/writing.ts'
import { extraPronunciation } from '../src/data/pronunciation.ts'
import { changelog } from '../src/data/changelog.ts'
import { themes } from '../src/data/themes.ts'
import { EDITION } from '../src/edition.ts'
import { checkAnswer, checkVocab, normalizeForComparison, vocabCandidates } from '../src/lib/text.ts'
import type { Exercise } from '../src/types.ts'

const errors: string[] = []
const seen = new Map<string, string>()

function claim(id: string, where: string) {
  const prev = seen.get(id)
  if (prev) errors.push(`id en double « ${id} » (${prev} et ${where})`)
  else seen.set(id, where)
}

function checkExercise(ex: Exercise, where: string) {
  const at = `${where} → ${ex.id}`
  switch (ex.kind) {
    case 'mcq':
      if (ex.answer < 0 || ex.answer >= ex.options.length) errors.push(`${at} : index de réponse hors limites`)
      if (new Set(ex.options).size !== ex.options.length) errors.push(`${at} : options en double`)
      break
    case 'gap':
      if (!ex.prompt.includes('___')) errors.push(`${at} : pas de « ___ » dans la phrase à trou`)
      if (ex.answers.length === 0) errors.push(`${at} : aucune réponse`)
      break
    case 'fix':
      if (ex.answers.length === 0) errors.push(`${at} : aucune réponse`)
      if (ex.answers.some((a) => normalizeForComparison(a) === normalizeForComparison(ex.wrong))) {
        errors.push(`${at} : la phrase fautive est identique à une réponse acceptée`)
      }
      else if (checkAnswer(ex.wrong, ex.answers, ex.wrong).verdict !== 'wrong') {
        errors.push(`${at} : la phrase fautive serait acceptée comme correcte`)
      }
      break
    case 'transform':
      if (ex.answers.length === 0) errors.push(`${at} : aucune réponse`)
      break
    case 'card':
      break
    case 'cloze': {
      const holes = ex.text.split('___').length - 1
      if (holes === 0) errors.push(`${at} : pas de « ___ » dans le texte à trous`)
      if (holes !== ex.blanks.length) errors.push(`${at} : ${holes} trou(s) mais ${ex.blanks.length} série(s) de réponses`)
      for (const [i, accepted] of ex.blanks.entries()) {
        if (accepted.length === 0) errors.push(`${at} : trou ${i + 1} sans réponse`)
        for (const a of accepted) if (checkAnswer(a, accepted).verdict !== 'correct') errors.push(`${at} : la réponse « ${a} » n'est pas reconnue`)
      }
      break
    }
  }
  if ('answers' in ex) {
    for (const a of ex.answers) {
      if (checkAnswer(a, ex.answers).verdict !== 'correct') errors.push(`${at} : la réponse « ${a} » n'est pas reconnue`)
    }
  }
}

for (const r of allExercises) {
  claim(r.exercise.id, r.source.label)
  checkExercise(r.exercise, r.source.label)
}
for (const v of allVocab) {
  claim(v.id, 'vocabulaire')
  // Les cartes demandent d'écrire la traduction : il faut une réponse exploitable dans les deux sens.
  for (const side of [v.en, v.fr]) {
    const cands = vocabCandidates(side)
    if (cands.length === 0 || cands.some((c) => checkVocab(c, side).verdict !== 'correct')) {
      errors.push(`vocabulaire ${v.id} : réponse attendue inutilisable (« ${side} »)`)
    }
  }
}
for (const s of sessions) {
  claim(s.id, 'séance')
  for (const p of s.pronunciation) claim(p.id, `prononciation ${s.id}`)
  for (const link of s.grammarLinks ?? []) {
    if (!grammarLessons.some((l) => l.id === link)) errors.push(`${s.id} : leçon liée inconnue « ${link} »`)
  }
  if (!modules.some((m) => m.id === s.module)) errors.push(`${s.id} : module inconnu « ${s.module} »`)
}
for (const p of extraPronunciation) claim(p.id, 'prononciation')
for (const d of allDecks) claim(`deck:${d.id}`, 'paquet')
for (const l of grammarLessons) claim(l.id, 'leçon')
for (const t of readingTexts) claim(t.id, 'lecture')
for (const d of dialogues) claim(d.id, 'dialogue')
for (const w of writingTasks) claim(w.id, 'écrit')
for (const m of modules) {
  claim(`module:${m.id}`, 'module')
  for (const sp of m.speaking) claim(sp.id, `oral ${m.id}`)
  for (const id of m.grammarLessonIds) if (!grammarLessons.some((l) => l.id === id)) errors.push(`${m.id} : leçon inconnue « ${id} »`)
  if (m.readingId && !readingTexts.some((t) => t.id === m.readingId)) errors.push(`${m.id} : lecture inconnue « ${m.readingId} »`)
  if (m.dialogueId && !dialogues.some((d) => d.id === m.dialogueId)) errors.push(`${m.id} : dialogue inconnu « ${m.dialogueId} »`)
  for (const id of m.writingTaskIds) if (!writingTasks.some((w) => w.id === id)) errors.push(`${m.id} : sujet d'écrit inconnu « ${id} »`)
  for (const id of m.deckIds ?? []) if (!allDecks.some((d) => d.id === id)) errors.push(`${m.id} : paquet inconnu « ${id} »`)
}
for (const t of themes) {
  claim(t.id, 'thème')
  for (const sp of t.speaking) claim(sp.id, `oral ${t.id}`)
  for (const id of t.deckIds) if (!allDecks.some((d) => d.id === id)) errors.push(`${t.id} : paquet inconnu « ${id} »`)
  if (t.readingId && !readingTexts.some((r) => r.id === t.readingId)) errors.push(`${t.id} : lecture inconnue « ${t.readingId} »`)
  if (t.dialogueId && !dialogues.some((d) => d.id === t.dialogueId)) errors.push(`${t.id} : dialogue inconnu « ${t.dialogueId} »`)
  for (const id of t.writingTaskIds) if (!writingTasks.some((w) => w.id === id)) errors.push(`${t.id} : sujet d'écrit inconnu « ${id} »`)
}
const versions = changelog.map((c) => c.version)
if (new Set(versions).size !== versions.length) errors.push('changelog : numéros de version en double')

console.log(`Accès : ${EDITION.name}`)
const count = (k: Exercise['kind']) => allExercises.filter((r) => r.exercise.kind === k).length
console.log(`Contenu : ${sessions.length} séances, ${modules.length} modules, ${grammarLessons.length} leçons, ${allVocab.length} mots, ${allExercises.length} exercices`)
console.log(`  (qcm ${count('mcq')}, trous ${count('gap')}, corrections ${count('fix')}, réécritures ${count('transform')})`)
console.log(`  ${readingTexts.length} textes, ${dialogues.length} dialogues, ${writingTasks.length} sujets d'écrit`)

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} problème(s) :`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('✅ Contenu valide')
