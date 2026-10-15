// ============================================================================
// REGISTRE DES CENTRES ET DE LEURS CONTACTS — pour le sélecteur de la page Contact
// ============================================================================
// Liste des 20 centres EPIDE + la Direction générale. Pour chaque centre,
// les noms des contacts syndicaux y sont ajoutés au fil de leur désignation.
//
// ⚠️ Terminologie : on parle de "contacts en centre" ou "référents de centre"
// (art. 12 du RI), jamais de "délégués syndicaux" — ce dernier est un statut
// légal lié à un seuil de représentativité qui ne peut être acquis qu'après
// les élections professionnelles de décembre 2026, et seulement en cas de
// franchissement du seuil. L'utiliser avant serait factuellement inexact.
//
// ⚠️ Avant d'ajouter un nom : consentement écrit explicite obtenu (même
// principe que pour la page Qui sommes-nous).
// ============================================================================

import { equipeRegistry } from "@/lib/equipe-registry";

export const centres = [
  "Alençon",
  "Alès La Grand Combe",
  "Angers-Avrillé",
  "Belfort",
  "Bordeaux",
  "Bourges-Osmoy",
  "Brétigny",
  "Cambrai",
  "Direction générale (Malakoff)",
  "Doullens",
  "Étang-sur-Arroux",
  "Langres",
  "Lanrodec",
  "Lyon-Meyzieu",
  "Margny-lès-Compiègne",
  "Marseille",
  "Montry",
  "Saint-Quentin",
  "Strasbourg",
  "Toulouse",
  "Val-de-Reuil",
] as const;

export type Centre = (typeof centres)[number];

export interface ContactCentre {
  nom: string;
  role: string;
  mail?: { local: string; domaine: string }; // adresse scindée, voir lib/equipe-registry.ts
}

// Les membres de l'Équipe syndicale sont affichés d'office sur leur centre
// (source : lib/equipe-registry.ts). Les contacts de centre désignés ensuite
// s'ajoutent ici, centre par centre. Exemple :
//   "Val-de-Reuil": [{ nom: "Prénom", role: "Contact en centre", mail: { local: "prenom.nom", domaine: "epide.fr" } }],
const contactsSupplementaires: Partial<Record<Centre, ContactCentre[]>> = {};

export function getContactsCentre(centre: string): ContactCentre[] {
  const membres = equipeRegistry
    .filter((m) => m.centre === centre)
    .map((m) => ({ nom: m.nom, role: m.responsabilite, mail: m.mail }));
  return [...membres, ...(contactsSupplementaires[centre as Centre] ?? [])];
}
