// ============================================================================
// CONFIG DE BRANDING — point d'entrée unique pour le nom, le logo, les liens
// ============================================================================
// Objectif : pouvoir basculer entre une affiliation et une autre (ou un statut
// autonome) en ne modifiant QUE ce fichier. Aucun nom de syndicat ne doit être
// écrit en dur ailleurs dans le code — toujours passer par cet objet.
//
// Pour rebrander : changer les valeurs ci-dessous, rien d'autre.
// ============================================================================

export type Affiliation = "SUD" | "CGT" | "AUTONOME";

export const siteConfig = {
  // --- Identité ---
  affiliation: "AUTONOME" as Affiliation, // "SUD" | "CGT" | "AUTONOME"
  nomCourt: "EPIDE SUD FPA", // ex: "SUD EPIDE", "CGT EPIDE", "USE" (Union Syndicale EPIDE)
  nomLong: "EPIDE SUD FPA", // ex: "SUD Solidaires EPIDE"
  accroche: "Un syndicat pour le bien commun, au plus près des agents.",
  etablissement: "EPIDE",
  etablissementLong:
    "Établissement pour l'Insertion dans l'Emploi",

  // --- Fédération (vide si autonome) ---
  federation: {
    nom: "", // ex: "SUD Solidaires"
    url: "", // ex: "https://solidaires.org"
    afficherEnAvant: false, // toujours false : on parle au nom d'EPIDE, pas de la fédération
  },

  // --- Contact ---
  email: "epide.sudfpa@proton.me",
  formulaireAdhesionUrl: "", // lien Microsoft Forms à insérer

  // --- Réseaux sociaux (vide = masqué automatiquement) ---
  reseaux: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  // --- Mentions légales ---
  mentionsLegales: {
    directeurPublication: "",
    hebergeur: "Vercel Inc.",
    adresseSiege: "",
  },
} as const;

export default siteConfig;
