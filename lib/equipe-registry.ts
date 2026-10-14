// ============================================================================
// REGISTRE DE L'ÉQUIPE SYNDICALE — ajouter/retirer un membre = éditer ce fichier
// ============================================================================
// Affiché sur /qui-sommes-nous. L'organigramme a 4 places fixes (secrétaire, adjoint,
// trésorière, membre) : changer quelqu'un = éditer sa fiche ; ajouter un
// membre supplémentaire demande d'adapter app/qui-sommes-nous/page.tsx.
//
// Photo : carrée (480×480), optionnelle. Si fournie, déposer le fichier dans /public/equipe/
// et indiquer son chemin (ex: "/equipe/prenom-nom.jpg"). Sans photo, un
// avatar générique est affiché à la place — pas besoin d'attendre la photo
// pour publier une fiche.
//
// ⚠️ Avant d'ajouter une personne : consentement écrit explicite obtenu pour
// la publication de son nom, sa photo, son poste EPIDE et sa responsabilité
// syndicale sur le site public (donnée d'appartenance syndicale = catégorie
// sensible au sens du RGPD). Pour retirer quelqu'un immédiatement, supprimer
// ou commenter son entrée ci-dessous.
// ============================================================================

export interface MembreEquipe {
  id: string;
  nom: string;
  photo?: string; // chemin dans /public/equipe/, laisser vide si pas encore fournie
  posteEpide: string;
  lieu: string; // représentation : "Représentant DG", "Centre de ..."
  responsabilite: string;
  role: "secretaire" | "adjoint" | "tresoriere" | "membre"; // place dans l'organigramme
}

export const equipeRegistry: MembreEquipe[] = [
  {
    id: "loic",
    nom: "Loïc",
    photo: "/equipe/loic.jpg",
    posteEpide: "Chargé de mission des programmes pédagogiques",
    lieu: "Représentant à la Direction générale",
    responsabilite: "Secrétaire de section",
    role: "secretaire",
  },
  {
    id: "herve",
    nom: "Hervé",
    photo: "/equipe/herve.jpg",
    posteEpide: "Coordonnateur pédagogique",
    lieu: "Représentant du centre de Strasbourg",
    responsabilite: "Secrétaire adjoint",
    role: "adjoint",
  },
  {
    id: "perrine",
    nom: "Perrine",
    photo: "/equipe/perrine.jpg",
    posteEpide: "Conseillère en insertion professionnelle",
    lieu: "Représentante du centre de Langres",
    responsabilite: "Trésorière",
    role: "tresoriere",
  },
  {
    id: "cedric",
    nom: "Cédric",
    photo: "/equipe/cedric.jpg",
    posteEpide: "Moniteur",
    lieu: "Centre d'Angers-Avrillé",
    responsabilite: "Membre de l'Équipe syndicale",
    role: "membre",
  },
];

export function getMembre(role: MembreEquipe["role"]): MembreEquipe | undefined {
  return equipeRegistry.find((m) => m.role === role);
}
