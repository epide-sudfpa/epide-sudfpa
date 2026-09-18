// ============================================================================
// REGISTRE DE L'ÉQUIPE SYNDICALE — ajouter/retirer un membre = éditer ce fichier
// ============================================================================
// Affiché sur /qui-sommes-nous. Aucune modification de composant nécessaire
// pour ajouter, retirer ou modifier une fiche.
//
// Photo : optionnelle. Si fournie, déposer le fichier dans /public/equipe/
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
  responsabilite: string;
  ordre: number; // ordre d'affichage, 1 = premier
}

export const equipeRegistry: MembreEquipe[] = [
  {
    id: "exemple",
    nom: "Prénom Nom",
    posteEpide: "Poste EPIDE — Centre",
    responsabilite: "Secrétaire de section",
    ordre: 1,
  },
  // Copier-coller le bloc ci-dessus pour chaque nouveau membre.
];

export function getEquipeTriee(): MembreEquipe[] {
  return [...equipeRegistry].sort((a, b) => a.ordre - b.ordre);
}
