import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { getProgress, requestPersistentStorage } from './lib/store'
import { saveSnapshot } from './lib/backup'
import { applyAppearance } from './lib/appearance'
import { installDomGuards, logError } from './lib/diagnostics'
import './lib/mywords'
import { ErrorBoundary } from './components/ErrorBoundary'

installDomGuards()
applyAppearance(getProgress().settings)
requestPersistentStorage()
void saveSnapshot()

window.addEventListener('error', (e) => logError(e.message || 'Erreur inconnue'))
window.addEventListener('unhandledrejection', (e) => logError(`Promesse rejetée : ${String(e.reason)}`))

createRoot(document.getElementById('root')!, {
  onUncaughtError: (error) => logError(error instanceof Error ? error.message : String(error)),
  onCaughtError: (error) => logError(error instanceof Error ? error.message : String(error)),
}).render(
  <StrictMode>
    <ErrorBoundary resetKey="app">
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
