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
  href?: string; // outil servi comme page autonome (ex: /simulateurs/xxx.html) : la carte y renvoie directement
}

export const outilsRegistry: OutilMeta[] = [
  {
    slug: "simulateur-reforme-salariale",
    titre: "Simulateur réforme salariale 2026",
    description:
      "Estimez ce que la réforme de la rémunération change pour votre salaire : reclassement, garantie de maintien, plafond et écart cumulé sur 10 ans.",
    categorie: "remuneration",
    icone: "Calculator",
    disponible: true,
    href: "/simulateurs/reforme-2026.html",
  },
  {
    slug: "simulateur-primes",
    titre: "Simulateur de prime individuelle",
    description:
      "Vérifiez si le montant de votre prime individuelle correspond à votre indice majoré actuel, et générez un mail de vérification à la DRH en cas d'écart.",
    categorie: "remuneration",
    icone: "Calculator",
    // Remis "à venir" hors période de versement (~mai) : ressorti au bon moment.
    disponible: false,
  },
  {
    slug: "rupture-conventionnelle",
    titre: "Simulateur d'indemnité de rupture conventionnelle",
    description:
      "Estimez le montant de votre indemnité spécifique de rupture conventionnelle selon votre ancienneté et votre rémunération.",
    categorie: "remuneration",
    icone: "Calculator",
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
