// ============================================================================
// OUVERTURE DIFFÉRÉE — guide et simulateur de la réforme salariale 2026
// ============================================================================
// Jusqu'à la date ci-dessous, les deux pages autonomes sont verrouillées :
//   - les cartes (pages Outils et Guides) sont barrées « Prochainement… »,
//     avec compte à rebours, et ne sont pas cliquables ;
//   - le proxy (proxy.ts) redirige leurs adresses directes vers /outils ou
//     /guides. C'est ce verrou, côté serveur, qui fait foi : il se lève tout
//     seul à l'heure dite, sans redéploiement.
// Le propriétaire garde l'accès avec son lien ?preview=… (cookie), pour tester.
//
// Changer la date : modifier la constante ci-dessous, ou définir la variable
// Vercel NEXT_PUBLIC_OUVERTURE_OUTILS (format ISO avec fuseau, ex.
// 2026-10-22T20:00:00+02:00) puis redéployer. Une date illisible = verrouillé.
//
// Nettoyage après l'ouverture : retirer `verrou: true` du registre des outils
// et de content/guides/reforme-remuneration-2026.md, puis ce fichier.
// ============================================================================

export const OUVERTURE_ISO =
  process.env.NEXT_PUBLIC_OUVERTURE_OUTILS ?? "2026-10-22T20:00:00+02:00";

export function estOuvert(maintenantMs: number = Date.now()): boolean {
  const cible = new Date(OUVERTURE_ISO).getTime();
  return maintenantMs >= cible; // NaN (date illisible) => false => verrouillé
}

// Adresses directes verrouillées (en minuscules, sans barre finale) et page
// de repli vers laquelle on redirige.
const CHEMINS_VERROUILLES: Record<string, string> = {
  "/simulateurs/reforme-2026.html": "/outils",
  "/outils/simulateur-reforme-salariale": "/outils",
  "/guides/reforme-remuneration-2026.html": "/guides",
  "/guides/reforme-remuneration-2026": "/guides",
};

export function repliSiVerrouille(pathname: string): string | null {
  if (estOuvert()) return null;
  const p = pathname.toLowerCase().replace(/\/+$/, "");
  return CHEMINS_VERROUILLES[p] ?? null;
}
