import { extra } from './edition-content.ts'

/** Traduction française d'une phrase d'exemple du vocabulaire (si on la connaît). */
export const exampleFr = (sentence?: string): string | undefined => (sentence ? extra?.examplesFr?.[sentence] : undefined)
