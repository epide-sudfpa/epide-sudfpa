import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/config";

// ============================================================================
// GARDE-BARRIÈRE "SITE EN CONSTRUCTION"
// ============================================================================
// Tant que la variable d'environnement Vercel SITE_LIVE n'est pas à "true",
// tout le monde reçoit une page d'attente statique — sauf vous, via un lien
// de prévisualisation secret.
//
// Prévisualiser le vrai site avant le lancement public :
//   https://votre-site.vercel.app/?preview=VALEUR_DE_PREVIEW_SECRET
// Un cookie est alors posé pour 30 jours sur ce navigateur.
//
// Le jour du lancement : passer SITE_LIVE à "true" dans Vercel
// (Project Settings > Environment Variables), rien d'autre à changer.
//
// Choix technique : le proxy renvoie directement le HTML de la page d'attente
// (au lieu de rewriter vers une page Next.js) pour ne jamais forcer le reste
// du site en rendu dynamique — toutes les autres pages restent statiques,
// gate ou pas.
//
// NB : dans cette version de Next.js, "middleware" est renommé "proxy"
// (fichier proxy.ts, fonction exportée "proxy") — ce n'est plus middleware.ts.
// ============================================================================

const PREVIEW_COOKIE = "preview_access";

function pageEnConstruction(): NextResponse {
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>${siteConfig.nomLong} — Bientôt en ligne</title>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    background: #F7F5F0;
    color: #1A1D1F;
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  .kicker {
    font-family: "SF Mono", "Cascadia Code", Consolas, "Roboto Mono", monospace;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #B8762E;
    margin: 0;
  }
  h1 {
    font-family: Georgia, "Iowan Old Style", "Source Serif 4", "Noto Serif", serif;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 1rem 0 0;
  }
  p {
    max-width: 28rem;
    font-size: 1.125rem;
    line-height: 1.6;
    color: #52585C;
    margin: 1.5rem 0 0;
  }
</style>
</head>
<body>
  <p class="kicker">${siteConfig.etablissement}</p>
  <h1>${siteConfig.nomLong}</h1>
  <p>Notre site est en cours de construction. Il sera bientôt en ligne — revenez très vite.</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export function proxy(request: NextRequest) {
  const siteLive = process.env.SITE_LIVE === "true";
  if (siteLive) return NextResponse.next();

  const { searchParams } = request.nextUrl;
  const secret = process.env.PREVIEW_SECRET;
  const providedSecret = searchParams.get("preview");
  const hasValidCookie =
    !!secret && request.cookies.get(PREVIEW_COOKIE)?.value === secret;

  // Lien de prévisualisation : ?preview=SECRET → pose le cookie, laisse passer
  if (secret && providedSecret === secret) {
    const response = NextResponse.next();
    response.cookies.set(PREVIEW_COOKIE, secret, {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return response;
  }

  if (hasValidCookie) return NextResponse.next();

  // Personne d'autorisé : page d'attente statique, servie directement
  return pageEnConstruction();
}

export const config = {
  matcher: [
    // Toutes les routes sauf les assets statiques Next.js et fichiers publics courants
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
