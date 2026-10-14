// ============================================================================
// REGISTRE DE L'ÉQUIPE SYNDICALE — ajouter/retirer un membre = éditer ce fichier
// ============================================================================
// Affiché sur /qui-sommes-nous. Les fiches s'affichent dans l'ordre de la liste,
// sans hiérarchie visuelle : ajouter un membre = ajouter une entrée.
//
// Photo : portrait 3:4 (ex. 480×640), optionnelle. Si fournie, déposer le fichier dans /public/equipe/
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
}

export const equipeRegistry: MembreEquipe[] = [
  {
    id: "loic",
    nom: "Loïc",
    photo: "/equipe/loic-2.jpg",
    posteEpide: "Chargé de mission des programmes pédagogiques",
    lieu: "Représentant à la Direction générale",
    responsabilite: "Secrétaire de section",
  },
  {
    id: "herve",
    nom: "Hervé",
    photo: "/equipe/herve-2.jpg",
    posteEpide: "Coordonnateur pédagogique",
    lieu: "Représentant du centre de Strasbourg",
    responsabilite: "Secrétaire adjoint",
  },
  {
    id: "perrine",
    nom: "Perrine",
    photo: "/equipe/perrine-2.jpg",
    posteEpide: "Conseillère en insertion professionnelle",
    lieu: "Représentante du centre de Langres",
    responsabilite: "Trésorière",
  },
  {
    id: "cedric",
    nom: "Cédric",
    photo: "/equipe/cedric-2.jpg",
    posteEpide: "Moniteur",
    lieu: "Centre d'Angers-Avrillé",
    responsabilite: "Membre de l'Équipe syndicale",
  },
];
