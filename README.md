# English B2 → C1

Application personnelle (Progressive Web App) pour progresser en anglais du niveau **B2** vers le **C1**, construite sur le même modèle que l'appli d'espagnol. Elle reprend le contenu de mes cours (fiches Accent Lang) et le transforme en exercices.

## Ce qu'il y a dedans

- **Mes cours** : les séances de cours (24.06 → 30.09) avec vocabulaire, prononciation, corrections (« Mistakes ») transformées en exercices, et notes (« Others ») ; les 6 modules thématiques avec les expressions clés des fiches B2, un dialogue, un texte, des sujets d'oral et d'écrit.
- **Labo des temps** : 10 leçons (past simple, past continuous, present perfect, **past simple vs present perfect**, since/for, past perfect, used to, futurs, future perfect), un défi de temps mélangés, 97 verbes irréguliers et des statistiques de réussite par temps.
- **Grammaire** : 27 fiches au total (conditionnels, modaux de déduction, passif, gérondif/infinitif, indénombrables, prépositions, faux-amis, connecteurs, registre, mise en relief C1…).
- **Vocabulaire** : les mots des cours + 6 paquets « découverte » (phrasal verbs, idiomes, collocations, faux-amis, labo & pharma, mots C1), en cartes à compléter (on écrit la traduction, petites fautes tolérées) dans les deux sens, avec répétition espacée.
- **Écrire juste** : corrections de cours, exercices de reformulation (« trouver la bonne formulation »), atelier d'écriture avec 12 sujets, détection des expressions cibles, **relecture automatique** des erreurs typiques des francophones et modèle de réponse.
- **Oral / écoute / lecture** : prononciation et répétition avec reconnaissance vocale, parole libre transcrite, dialogues, dictées et textes B2 → C1.
- **Révision** : répétition espacée (5 boîtes) sur tout ce qui a été travaillé ; les erreurs reviennent le jour même.
- **Progression** : série de jours, activité, acquis par niveau (B2 / B2+ / C1), points faibles.

## Mes données restent sur mon téléphone

Aucun compte, aucun serveur : la progression est dans le `localStorage` du navigateur, sous une clé préfixée (`english-app:progress`) pour ne pas se mélanger avec l'appli d'espagnol servie depuis le même domaine.

- **Les mises à jour ne l'effacent pas** : chaque contenu a un identifiant stable qui porte sa progression. Ajouter du contenu n'affecte pas l'existant.
- Page **Progrès → Sauvegarde** : télécharger / restaurer un fichier JSON (changement de téléphone, nettoyage du navigateur).
- L'appli demande au navigateur un stockage « persistant » pour éviter qu'il soit effacé automatiquement.
- ⚠️ Ne pas renommer le dépôt : l'URL changerait et le navigateur considérerait que c'est une autre appli (la sauvegarde permet quand même de tout récupérer).

## Ajouter du contenu (nouveau cours, nouveaux mots…)

Tout est dans `src/data/`. Voir **CLAUDE.md** pour la procédure détaillée. En résumé :

1. Nouvelle séance → créer `src/data/sessions/AAAA-MM-JJ.ts` (copier une séance existante) et l'ajouter dans `src/data/sessions/index.ts`.
2. Ajouter une entrée dans `src/data/changelog.ts` (version + 1) : une bannière « Nouveautés » apparaîtra.
3. `npm run check-data` vérifie que tout est cohérent (ids uniques, réponses reconnues…).

**Règle d'or : ne jamais modifier ni réutiliser l'`id` d'un contenu existant.**

## Développement

```bash
npm install
npm run dev          # serveur de développement
npm run check-data   # vérifie le contenu
npm run build        # build de production
```

## Installation sur smartphone (Android)

1. Ouvrir l'URL GitHub Pages dans **Chrome**.
2. Menu ⋮ → **Ajouter à l'écran d'accueil**.
3. L'appli fonctionne ensuite hors ligne (la reconnaissance vocale nécessite une connexion).

## Déploiement sur GitHub Pages

Le workflow `.github/workflows/deploy.yml` vérifie le contenu, build et publie à chaque push sur `main` (branche par défaut, seule autorisée à publier).
Sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
L'appli sera disponible à `https://jpatiny-hub.github.io/tea-time/`.

## Stack technique

Vite + React + TypeScript, Tailwind CSS, React Router (`HashRouter`), `vite-plugin-pwa`, Web Speech API (synthèse et reconnaissance vocale du navigateur).
