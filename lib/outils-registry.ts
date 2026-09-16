// ============================================================================
// REGISTRE DES OUTILS — ajouter un simulateur = ajouter une entrée ici
// ============================================================================
// Chaque outil pointe vers un composant React situé dans /app/outils/_outils/
// Pour ajouter un outil :
//   1. Créer le composant dans /app/outils/_outils/mon-outil.tsx
//   2. Ajouter une entrée ci-dessous avec le même slug
// La page /outils/[slug] se charge automatiquement du reste.
// ============================================================================

export type CategorieOutil =
  | "remuneration"
  | "carriere"
  | "mobilite"
  | "droits"
  | "autre";

export interface OutilMeta {
  slug: string;
  titre: string;
  description: string;
  categorie: CategorieOutil;
  icone: string; // nom d'icône lucide-react
  disponible: boolean; // false = affiché en "à venir", grisé
}

export const outilsRegistry: OutilMeta[] = [
  {
    slug: "simulateur-primes",
    titre: "Simulateur de prime de fin d'année",
    description:
      "Estimez votre prime en fonction de votre catégorie, votre ancienneté et votre situation.",
    categorie: "remuneration",
    icone: "Calculator",
    disponible: true,
  },
  {
    slug: "guide-categories",
    titre: "Comprendre les catégories d'emploi",
    description:
      "Grille de lecture des catégories EPIDE et des conditions de passage de l'une à l'autre.",
    categorie: "carriere",
    icone: "BookOpen",
    disponible: false,
  },
  {
    slug: "calcul-mobilite",
    titre: "Simulateur d'indemnités de mobilité",
    description:
      "Calculez vos droits en cas de mutation ou de changement de centre.",
    categorie: "mobilite",
    icone: "Map",
    disponible: false,
  },
];

export function getOutilBySlug(slug: string): OutilMeta | undefined {
  return outilsRegistry.find((o) => o.slug === slug);
}

export function getOutilsDisponibles(): OutilMeta[] {
  return outilsRegistry.filter((o) => o.disponible);
}

export const categorieLabels: Record<CategorieOutil, string> = {
  remuneration: "Rémunération",
  carriere: "Carrière",
  mobilite: "Mobilité",
  droits: "Droits & démarches",
  autre: "Autres",
};
