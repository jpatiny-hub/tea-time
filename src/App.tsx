import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { ModuleDetail } from './pages/ModuleDetail'
import { SessionDetail } from './pages/SessionDetail'
import { TenseLab } from './pages/TenseLab'
import { IrregularVerbs } from './pages/IrregularVerbs'
import { Grammar } from './pages/Grammar'
import { GrammarLessonPage } from './pages/GrammarLesson'
import { Vocabulary } from './pages/Vocabulary'
import { VocabDeckPage } from './pages/VocabDeck'
import { Practice } from './pages/Practice'
import { Corrections } from './pages/Corrections'
import { Reformulation } from './pages/Reformulation'
import { Writing } from './pages/Writing'
import { WritingStudio } from './pages/WritingStudio'
import { Speaking } from './pages/Speaking'
import { Listening } from './pages/Listening'
import { DialoguePage } from './pages/DialoguePage'
import { Reading } from './pages/Reading'
import { ReadingTextPage } from './pages/ReadingText'
import { Revision } from './pages/Revision'
import { Progress } from './pages/Progress'
import { News } from './pages/News'
import { Drill } from './pages/Drill'
import { ThemeDetail, Themes } from './pages/Themes'
import { EditionPicker } from './pages/EditionPicker'
import { Translation } from './pages/Translation'
import { TypedExercises } from './pages/TypedExercises'
import { CHOSEN_EDITION, isGuided } from './edition'
import { Path } from './pages/Path'
import { PathUnitPage } from './pages/PathUnit'
import { PathStepPage } from './pages/PathStep'
import { useProgress } from './lib/store'
import { syncReminderState } from './lib/reminder'
import { applyAppearance } from './lib/appearance'
import { todayKey } from './lib/text'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Force le navigateur à repeindre la nouvelle page (certains Chrome laissaient un écran vide).
    const id = requestAnimationFrame(() => {
      document.body.style.minHeight = '100.1vh'
      requestAnimationFrame(() => {
        document.body.style.minHeight = ''
      })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}

// Message affiché après une réparation automatique (rechargement déclenché par index.html).
function RecoveredToast() {
  const [reason] = useState(() => {
    try {
      const r = sessionStorage.getItem('english-app:recovered')
      sessionStorage.removeItem('english-app:recovered')
      return r
    } catch {
      return null
    }
  })
  const [visible, setVisible] = useState(!!reason)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(t)
  }, [visible])
  if (!visible) return null
  return (
    <button
      onClick={() => setVisible(false)}
      className="fixed left-1/2 top-3 z-30 w-[92%] max-w-sm -translate-x-1/2 rounded-xl bg-amber-100 px-3 py-2 text-left text-xs text-amber-900 shadow dark:bg-amber-900 dark:text-amber-100"
    >
      🔧 La page était vide : l'appli s'est rechargée toute seule ({reason}). C'est noté dans Progrès → Diagnostic.
    </button>
  )
}

// Rappel quotidien : tient le service worker au courant (activé ? heure ? exercice déjà fait aujourd'hui ?).
function ReminderSync() {
  const data = useProgress()
  const { reminderEnabled, reminderHour } = data.settings
  const activeToday = (data.activity[todayKey()] ?? 0) > 0
  useEffect(() => {
    void syncReminderState(reminderEnabled, reminderHour, activeToday)
  }, [reminderEnabled, reminderHour, activeToday])
  return null
}

// Apparence (clair / sombre / automatique) et taille du texte : réglages de l'accès en cours.
function Appearance() {
  const { theme, fontScale } = useProgress().settings
  useEffect(() => {
    applyAppearance({ theme, fontScale })
    if (theme !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyAppearance({ theme, fontScale })
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme, fontScale])
  return null
}

// Palette daltonienne : réglage de l'accès en cours, appliqué à toute la page.
function ColorBlindMode() {
  const on = useProgress().settings.colorBlind
  useEffect(() => {
    if (on) document.documentElement.setAttribute('data-colorblind', '')
    else document.documentElement.removeAttribute('data-colorblind')
  }, [on])
  return null
}

function App() {
  const location = useLocation()
  const picking = !CHOSEN_EDITION || location.pathname === '/acces'
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-(--app-bg) text-gray-900 dark:text-gray-100">
      <ScrollToTop />
      <RecoveredToast />
      <Appearance />
      <ColorBlindMode />
      {!picking && <ReminderSync />}
      <main className="flex-1 pb-28">
        {picking ? <EditionPicker /> : (
        <ErrorBoundary resetKey={location.pathname + location.search}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cours" element={<Courses />} />
          {isGuided && <Route path="/parcours" element={<Path />} />}
          {isGuided && <Route path="/parcours/:unitId" element={<PathUnitPage />} />}
          {isGuided && <Route path="/parcours/:unitId/:stepKey" element={<PathStepPage />} />}
          <Route path="/cours/module/:moduleId" element={<ModuleDetail />} />
          <Route path="/cours/seance/:sessionId" element={<SessionDetail />} />
          <Route path="/temps" element={<TenseLab />} />
          <Route path="/temps/verbes" element={<IrregularVerbs />} />
          <Route path="/grammaire" element={<Grammar />} />
          <Route path="/grammaire/:lessonId" element={<GrammarLessonPage />} />
          <Route path="/vocabulaire" element={<Vocabulary />} />
          <Route path="/vocabulaire/:deckId" element={<VocabDeckPage />} />
          <Route path="/pratique" element={<Practice />} />
          <Route path="/pratique/corrections" element={<Corrections />} />
          <Route path="/pratique/reformulation" element={<Reformulation />} />
          <Route path="/pratique/traduction" element={<Translation />} />
          <Route path="/pratique/exercices" element={<TypedExercises />} />
          <Route path="/pratique/ecrit" element={<Writing />} />
          <Route path="/pratique/ecrit/:taskId" element={<WritingStudio />} />
          <Route path="/pratique/oral" element={<Speaking />} />
          <Route path="/pratique/ecoute" element={<Listening />} />
          <Route path="/pratique/ecoute/:dialogueId" element={<DialoguePage />} />
          <Route path="/pratique/lecture" element={<Reading />} />
          <Route path="/pratique/lecture/:textId" element={<ReadingTextPage />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/progres" element={<Progress />} />
          <Route path="/nouveautes" element={<News />} />
          <Route path="/entrainement" element={<Drill />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/themes/:themeId" element={<ThemeDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </ErrorBoundary>
        )}
      </main>
      {!picking && <NavBar />}
    </div>
  )
}

export default App
