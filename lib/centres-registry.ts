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

// Vide pour l'instant — à compléter au fil de la désignation des contacts
// de centre. Exemple : "Val-de-Reuil": ["Prénom Nom"],
export const contactsParCentre: Partial<Record<Centre, string[]>> = {};

export function getContactsCentre(centre: string): string[] {
  return contactsParCentre[centre as Centre] ?? [];
}
