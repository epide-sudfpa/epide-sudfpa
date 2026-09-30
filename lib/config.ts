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
  affiliation: "SUD" as Affiliation, // "SUD" | "CGT" | "AUTONOME"
  nomCourt: "SUD FPA EPIDE", // ex: "SUD EPIDE", "CGT EPIDE", "USE" (Union Syndicale EPIDE)
  nomLong: "la section SUD FPA EPIDE", // ex: "SUD Solidaires EPIDE"
  accroche: "Un syndicat pour le bien commun, au plus près des agents.",
  etablissement: "EPIDE",
  etablissementLong:
    "Établissement pour l'Insertion dans l'Emploi",

  // --- Fédération (vide si autonome) ---
  federation: {
    nom: "SUD FPA",
    url: "https://www.sudfpa.net/",
    afficherEnAvant: true, // affiliation officielle depuis le pivot fédéral : on l'affiche
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
