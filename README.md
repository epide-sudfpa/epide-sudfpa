# Site du syndicat — EPIDE

Site Next.js (App Router, Tailwind v4) pour le futur syndicat EPIDE.
Conçu pour rester **neutre et rebrandable** quelle que soit l'issue (SUD,
retour CGT conditionné, ou autonome) : un seul fichier à modifier pour
changer le nom, le logo, les couleurs.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

## Rebrander le site (CGT / SUD / autonome)

Tout se passe dans **`lib/config.ts`** :

```ts
export const siteConfig = {
  affiliation: "SUD",        // ou "CGT" ou "AUTONOME"
  nomCourt: "SUD EPIDE",      // nom affiché partout
  nomLong: "...",
  accroche: "...",
  email: "...",
  formulaireAdhesionUrl: "https://forms.office.com/...", // ton lien MS Forms
  ...
};
```

Aucun nom de syndicat n'est écrit en dur ailleurs dans le code. Changer ce
fichier suffit à rebrander tout le site.

## Ajouter un outil / simulateur

Le système est conçu pour qu'ajouter un outil prenne 5 minutes :

1. Créer le composant React dans `app/outils/_outils/mon-outil.tsx`
   (voir `simulateur-primes.tsx` comme modèle — `"use client"`, état local,
   calcul, affichage du détail des étapes).
2. Ajouter une entrée dans `lib/outils-registry.ts` :
   ```ts
   {
     slug: "mon-outil",
     titre: "...",
     description: "...",
     categorie: "remuneration", // ou carriere / mobilite / droits / autre
     icone: "Calculator",       // nom d'icône lucide-react
     disponible: true,
   }
   ```
3. Ajouter une ligne dans `app/outils/[slug]/page.tsx`, objet `composants` :
   ```ts
   "mon-outil": dynamic(() => import("../_outils/mon-outil")),
   ```

C'est tout. La page liste (`/outils`) et la page individuelle
(`/outils/mon-outil`) se mettent à jour automatiquement.

Un outil avec `disponible: false` apparaît grisé sur la liste ("à venir")
et renvoie une 404 propre si on essaie d'y accéder directement — utile pour
préparer des outils à l'avance sans les publier.

## Publier une actualité ou une fiche "Vos droits"

Pas de base de données : on ajoute un fichier Markdown, on commit, ça se
déploie.

- Actualité : `content/actualites/mon-article.md`
- Fiche droit : `content/droits/ma-fiche.md`

Format :
```md
---
titre: "Titre de l'article"
date: "2026-09-01"
resume: "Résumé court affiché dans la liste."
categorie: "Carrière"   (uniquement pour les fiches droits)
---

Le contenu en Markdown classique.
```

## Adhésion

La page `/adhesion` ne contient pas de formulaire ni de logique serveur :
elle pointe vers ton formulaire Microsoft Forms (champ
`formulaireAdhesionUrl` dans `lib/config.ts`). Pas de données nominatives
ou bancaires stockées sur le site — tout reste dans l'écosystème EPIDE /
Microsoft 365, ce qui simplifie considérablement le sujet RGPD.

## Police de caractères

Le design a été pensé pour **Source Serif 4** (titres) + **Inter** (corps)
+ **JetBrains Mono** (chiffres dans les simulateurs). Ces polices Google
Fonts n'ont pas pu être téléchargées dans l'environnement de génération
(réseau restreint) — le site utilise donc temporairement des polices
système équivalentes (Georgia / système / monospace système).

Pour activer les vraies polices une fois en local avec accès internet :

1. Dans `app/layout.tsx`, ajouter l'import `next/font/google` pour
   `Source_Serif_4`, `Inter`, `JetBrains_Mono` (voir le commentaire laissé
   dans `app/globals.css` pour le mapping des variables).
2. Ça fonctionnera automatiquement dès que `npm run build` ou `npm run dev`
   tourne avec un accès réseau normal vers fonts.googleapis.com.

## Déploiement

Le plus simple : Vercel (vercel.com), gratuit à cette échelle. Connecter
le repo GitHub, déploiement automatique à chaque push.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- TypeScript
- lucide-react (icônes)
- gray-matter + marked (lecture du contenu Markdown)
- Pas de base de données, pas d'authentification — volontairement simple
  pour la phase de lancement. Si le volume de contenu ou d'adhérents
  justifie plus de structure plus tard, une vraie base (Prisma + SQLite/
  Postgres) peut être ajoutée sans tout reconstruire.
