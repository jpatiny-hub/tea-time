# English B2 → C1 — notes pour les mises à jour

Appli personnelle d'anglais (PWA React/Vite/Tailwind, 100 % locale). L'utilisateur est francophone (région de Liège), niveau B2, vise le C1, travaille en biologie / industrie pharmaceutique. Grosses lacunes sur les temps du passé (past simple vs present perfect surtout). Interface en français, contenu en anglais.

## Quatre accès (éditions) : Jojo, Jujularage, Maman et Nunu

- `src/edition.ts` : l'accès est choisi au premier lancement (écran `EditionPicker`, ou lien `…/?acces=jujularage|maman|nunu`), mémorisé dans `english-app:edition`, modifiable dans Progrès → Réglages (route `/acces`). Changer d'accès recharge la page.
- **Jojo** (l'utilisateur, B2 → C1) : tout le contenu historique, progression dans `english-app:progress` (clé inchangée).
- **Jujularage** (A1 → A2, ami de l'utilisateur, daltonien deutéranope) : contenu dans `src/data/juju/` (grammaire, paquets, modules `jj-*`, textes, traductions, prononciation, changelog séparé), progression dans `english-app:jujularage:progress`. Intérêts : bière / zythologie, sport, biologie, travail en CDMO (production de plasmides), animaux, maison. Ids préfixés `jj-` / `jv-`.
- Chaque fichier de `src/data/` exporte la version de l'accès en cours (`isJuju ? … : …`) : les pages n'ont pas à s'en soucier ; elles masquent ce qui est vide (séances, corrections, reformulation, thèmes).
- Parcours « Lexie 👶 » (fille de Jujularage, tout-petit) : `src/data/juju/lexie.ts`, modules `jj-lexie-1..6` avec `group` (affichés à part dans Cours), paquets `lx-deck-*`, ids `lx-*`. Phrases simples (A1–A2) qu'un parent dit à un bébé, avec variantes UK / US.
- Mode daltonien (`settings.colorBlind`, `html[data-colorblind]` dans `index.css`) : remappe vert → bleu, rouge / rose → orange. Actif par défaut pour Jujularage. Ne jamais transmettre une information par la seule couleur (garder ✓ / ✗, textes).
- **Maman** (anglais A1 → A2, lien `?acces=maman`) : contenu dans `src/data/maman/` (grammaire, 14 thèmes `mm-*` répartis en `themes-1..3`, textes, extra, index). **Nunu** (néerlandais depuis zéro, lien `?acces=nunu`) : `src/data/nunu/` (leçons `nn-g-*`, 14 thèmes `nn-*` en `themes-1..3`, textes, extra, index). Thème clair par défaut pour ces deux accès.
- Les thèmes se fabriquent avec `src/data/theme-builder.ts` (`buildTheme`) : un thème = module de cours + paquet de mots + exercices mêlés (`tr`/`back`/`gap`/`fix`/`cloze`/`mcq`). **Les ids d'exercices viennent de la position : n'ajouter qu'À LA FIN, ne jamais insérer ni réordonner.**
- **Parcours guidé** (tous les accès ; onglet « Parcours », routes `/lexie` pour le parcours Lexie de Jujularage — un second parcours indépendant, `track: 'lexie'` pour les modules ayant un `group` ; page « Au programme » par leçon ; Jojo : étapes « Mes corrections » tirées des séances ; routes `/parcours`, `/parcours/:unitId`, `/parcours/:unitId/:stepKey`) : `src/lib/path.ts` fabrique chaque leçon à partir d'un thème (modules) : étapes « mots » (5 mots : découverte en contexte avec audio + répétition au micro, puis QCM → écoute → phrase à choix → carte à taper → phrase à trou → dictée), « grammaire » (exemples d'abord, explication ensuite, exercices du plus guidé au plus libre), phrases utiles, dialogue, lecture, mise en pratique (exercices du thème triés par difficulté), rappel des leçons précédentes, défi écrit facultatif. Pages `Path.tsx`, `PathUnit.tsx`, `PathStep.tsx`. Progression : `steps['path:<unitId>:<clé>']` ; étapes et leçons se débloquent dans l'ordre (réglage `pathFree` = « Tout débloquer »). Les exercices fabriqués ont des ids `<idMot>~m1|l1|c1|g1|l2…` (stables, issus des ids de mots : ne pas changer les ids de mots) ; `check-data` les valide. Exercices d'écoute : champs `audio` / `listen` des exercices.
- Néerlandais : le champ `en` des données contient le texte néerlandais (convention conservée pour ne pas dupliquer les composants) ; `NL` dans `lib/text.ts` active la normalisation adaptée.
- Type d'exercice `cloze` (texte à trous à plusieurs trous) ; pour `fix`, le paramètre `wrong` de `checkAnswer` empêche d'accepter la phrase fautive comme « faute de frappe ».
- Réglages d'apparence (`lib/appearance.ts`) : thème clair / sombre / auto et taille du texte (Normal / Grand / Très grand), dans Progrès → Réglages.
- `npm run check-data` valide les QUATRE accès (`EDITION=jojo|jujularage|maman|nunu`).
- Rappel quotidien sans serveur : `src/lib/reminder.ts` (fichier .ics + periodic background sync) et `public/reminder-sw.js` (chargé dans le service worker via `workbox.importScripts`, état lu dans IndexedDB `english-app-reminder`). Pas de push serveur (contraire à la règle « aucun serveur externe »).

## Règle n°1 : ne jamais casser la progression

- La progression (localStorage `english-app:progress`) est indexée par les `id` de contenu. **Ne jamais renommer, supprimer ou réutiliser un id existant.** On ajoute, on ne réécrit pas les ids.
- Corriger le texte d'un exercice existant est possible (même id) si le sens reste le même.
- Si la structure de `ProgressData` change : incrémenter `SCHEMA_VERSION` et ajouter une étape dans `migrate()` (`src/lib/store.ts`), sans jamais jeter de données.
- Toujours lancer `npm run check-data` puis `npm run build` avant de pousser.
- Publication : seule la branche `main` (branche par défaut) déploie sur GitHub Pages (règle de l'environnement `github-pages`). Le travail fait sur une autre branche doit être fusionné dans `main` pour apparaître dans l'appli.

## Ajouter une séance de cours (fiche « Vocabulary / Pronunciation / Mistakes / Others »)

1. Créer `src/data/sessions/AAAA-MM-JJ.ts` en copiant une séance existante. `id: 'c-AAAA-MM-JJ'`, `module` parmi `company | problems | opinions | assumptions | process | explanations` (ajouter un module dans `modules.ts` si nouveau thème).
2. `vocabulary` : ids `v-<mot-en-kebab>` (vérifier qu'il n'existe pas déjà ; sinon ne pas le dupliquer), traduction FR, exemple, niveau.
3. `pronunciation` : ids `p-<mot>` ; guide avec la syllabe accentuée en majuscules.
4. `corrections` : chaque phrase de « Mistakes » est la version CORRIGÉE. Inventer la version fautive typique d'un francophone (`wrong`), mettre la phrase corrigée + variantes correctes dans `answers`, expliquer en français, étiqueter (`tags` : voir `TAG_LABELS` dans `src/data/content.ts`, ex. `past-simple`, `pp-vs-ps`, `since-for`, `prepositions`, `false-friends`…). ids `fix-MMJJ-NN`. Si une erreur revient d'une séance à l'autre, le signaler dans l'explication plutôt que de dupliquer.
5. `notes` : la rubrique « Others » sous forme de `GrammarPoint` ; `grammarLinks` vers les leçons liées.
6. Importer la séance dans `src/data/sessions/index.ts`.
7. Si une fiche EN-B2 donne des KEY PHRASES / questions pour un module, les ajouter au module (`modules.ts`) ; passer `keyPhrasesFromCourse` à `true` quand les expressions viennent d'une fiche.
8. Ajouter une entrée dans `src/data/changelog.ts` (version = précédente + 1).

## Autres ajouts

- Vocabulaire : les cartes demandent d'écrire la traduction (`checkVocab` dans `src/lib/text.ts`) ; tolérance orthographique selon la longueur du mot, articles/accents ignorés, chaque segment séparé par « , ; / » de la traduction est accepté. Écrire les traductions FR/EN en gardant ce découpage.
- Exercices : format commun `Exercise` (`mcq | gap | fix | transform | card`) dans `src/types.ts`. Les `gap` ont `___` dans le prompt ; l'utilisateur tape seulement le trou.
- La comparaison des réponses est tolérante (casse, ponctuation, contractions, orthographe UK/US, une faute de frappe) : `src/lib/text.ts`. Donner plusieurs `answers` pour les formulations libres.
- La relecture automatique de l'atelier d'écriture (`src/lib/lint.ts`) peut recevoir de nouvelles règles pour les erreurs récurrentes.
- Réécritures (`transform`) : la consigne doit dire s'il faut garder le sens et imposer le début de phrase ou le mot quand plusieurs points de vue sont possibles (cf. « Your car is cheaper than mine »). Lister TOUTES les variantes correctes (synonymes, sujet inversé, adjectif contraire). Même chose pour les trous : accepter les synonymes valables.
- Thèmes & culture (Halloween…) : `src/data/themes.ts` (type `ThemeLesson`), ids d'exercices `th-<thème>-NN`, paquets de vocabulaire dans `discoveryDecks` (`vocabulary.ts`), `season` (MM-JJ) pour la mise en avant sur l'accueil.
- Interface : une teinte par rubrique (`tones` / `useTone` dans `src/components/ui.tsx`, déduite de l'adresse) ; utiliser `card`, `hero`, `btnPrimary`, `IconTile`, `ListLink` plutôt que des classes ad hoc. Police Nunito embarquée (`@fontsource-variable/nunito`, précachée pour le hors-ligne).
- Gamification : `src/lib/xp.ts` (barème, niveaux, grades). L'XP est stockée (`xp`, `xpByDay`, schéma 2) et n'est jamais recalculée : changer le barème ne retire rien. `recordAnswer(ex, ok, xp)` et `recordActivity(n, xp)` l'alimentent.
- PWA : `id` du manifest (vite.config.ts) = identité de l'appli installée pour Chrome, résolue par rapport au site entier. Ne pas le changer sans raison ; le changer force une nouvelle installation.
- Logo : `public/favicon.svg` (source) ; les PNG de `public/icons/` en sont des rendus (changer leur nom à chaque nouveau logo pour forcer la mise à jour sur les téléphones) (192, 512, maskable 512 sans coins arrondis, apple-touch 180).
- Séries « Changer de perspective » (`pe-*`) et « Synonymes » (`sy-*`) dans `src/data/style.ts`.
- Garder la progression B2 → B2+ → C1 : chaque nouvel ensemble d'exercices devrait contenir un peu de C1.

## Robustesse d'affichage (ne pas retirer)

- `index.html` : `translate="no"` + `<meta name="google" content="notranslate">` — la traduction automatique de Chrome réécrit le DOM et faisait disparaître l'appli à chaque changement de page.
- `index.html` : script de secours qui recharge la page (au plus une fois / 20 s) si l'appli reste vide. ⚠️ HashRouter navigue via `history.pushState` (aucun `hashchange`) : le script enveloppe pushState/replaceState et observe `#root`. Après réparation, un bandeau s'affiche (`RecoveredToast`).
- Pas de `backdrop-blur` ni d'animation `active:scale` : suspects d'écrans vides sous Chrome (vidéo du 09.10, téléphone Samsung, mode sombre).
- `src/lib/diagnostics.ts` : garde-fous `removeChild` / `insertBefore` et journal d'erreurs (`english-app:errors`) affiché dans « Progrès → Diagnostic technique ». Si l'utilisateur signale un bug d'affichage, lui demander de copier ce journal.
- `ErrorBoundary` autour des routes (`src/App.tsx`).
