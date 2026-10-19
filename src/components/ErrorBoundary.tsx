import { Component, type ReactNode } from 'react'

interface Props {
  /** Change à chaque navigation : une page qui a planté est re-rendue en changeant de page. */
  resetKey: string
  children: ReactNode
}

interface State {
  error: Error | null
  retried: boolean
}

// Sans filet, une erreur de rendu efface toute l'appli (écran blanc jusqu'au rafraîchissement).
// Ici : un nouvel essai automatique, puis un message lisible avec des boutons pour repartir.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, retried: false }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null, retried: false })
    }
  }

  componentDidCatch() {
    // Beaucoup d'erreurs passagères (voix pas encore chargées, stockage occupé…) disparaissent au 2e essai.
    if (!this.state.retried) {
      setTimeout(() => this.setState({ error: null, retried: true }), 50)
    }
  }

  render() {
    const { error, retried } = this.state
    if (!error) return this.props.children
    if (!retried) return null
    return (
      <div className="px-4 pt-10 text-center">
        <p className="text-3xl">😕</p>
        <p className="mt-2 font-semibold">Cette page n'a pas pu s'afficher.</p>
        <p className="mt-1 text-sm text-gray-500">Ta progression n'est pas touchée.</p>
        <div className="mt-5 space-y-2">
          <button onClick={() => this.setState({ error: null, retried: false })} className="w-full rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 py-3 font-bold text-white">
            Réessayer
          </button>
          <button onClick={() => window.location.reload()} className="w-full rounded-2xl bg-gray-200 py-3 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            Recharger l'appli
          </button>
        </div>
        <p className="mt-5 break-words rounded-xl bg-gray-100 p-3 text-left font-mono text-[0.6875rem] text-gray-500 dark:bg-gray-900">
          {error.message}
        </p>
      </div>
    )
  }
}
