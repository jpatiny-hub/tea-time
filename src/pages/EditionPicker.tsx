import { chooseEdition, CHOSEN_EDITION, EDITIONS, type EditionId } from '../edition'

/** Écran de choix de l'accès (au premier lancement, ou depuis Progrès → Changer d'accès). */
export function EditionPicker() {
  return (
    <div className="px-4 pb-10 pt-10">
      <div className="text-center">
        <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="mx-auto h-20 w-20 rounded-3xl shadow-lg" />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Welcome! 👋</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Choisis ton accès. Chaque accès a sa propre progression, enregistrée sur cet appareil uniquement.</p>
      </div>
      {/* <nav> : repère utilisé par le script de secours d'index.html pour savoir que la page n'est pas vide. */}
      <nav aria-label="Choix de l'accès" className="mt-8 space-y-4">
        {(Object.keys(EDITIONS) as EditionId[]).map((id) => {
          const e = EDITIONS[id]
          return (
            <button
              key={id}
              onClick={() => chooseEdition(id)}
              className={`block w-full rounded-3xl bg-linear-to-br ${e.pickerGradient} p-5 text-left text-white shadow-lg`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">{e.icon}</span>
                <div className="flex-1">
                  <p className="text-2xl font-extrabold">{e.name}</p>
                  <p className="text-sm font-bold text-white/90">{e.pickerLevel}</p>
                </div>
                {CHOSEN_EDITION === id && <span className="rounded-full bg-white/25 px-2 py-0.5 text-xs font-bold">actuel</span>}
                <span className="text-3xl font-bold">›</span>
              </div>
              <p className="mt-3 text-sm text-white/90">{e.pickerBlurb}</p>
            </button>
          )
        })}
      </nav>
      <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">Tu pourras changer d'accès plus tard dans Progrès.</p>
    </div>
  )
}
