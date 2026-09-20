import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

// ============================================================================
// PAGE PRIVÉE — lecture des messages du formulaire de contact
// ============================================================================
// Protégée indépendamment du gate "site en construction" (proxy.ts) : reste
// privée même une fois SITE_LIVE=true, via sa propre variable ADMIN_SECRET.
//
// Accès : https://votre-site.vercel.app/admin/messages?cle=VALEUR_ADMIN_SECRET
// Un cookie de 30 jours est posé après la première visite avec la bonne clé.
//
// À définir dans Vercel (Settings > Environment Variables) : ADMIN_SECRET,
// une chaîne aléatoire différente de PREVIEW_SECRET.
// ============================================================================

export const metadata = { robots: { index: false, follow: false } };

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const ADMIN_COOKIE = "admin_access";

interface Message {
  nom: string | null;
  email: string;
  message: string;
  recu_le: string;
}

export default async function MessagesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ cle?: string }>;
}) {
  const { cle } = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET;
  const cookieStore = await cookies();
  const hasValidCookie = cookieStore.get(ADMIN_COOKIE)?.value === adminSecret;
  const hasValidKey = !!adminSecret && cle === adminSecret;

  if (!adminSecret || (!hasValidCookie && !hasValidKey)) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-sm text-ink-soft">Accès non autorisé.</p>
      </div>
    );
  }

  // Pose le cookie côté client au premier accès valide par clé (voir script en bas de page)
  const doitPoserCookie = hasValidKey && !hasValidCookie;

  let messages: Message[] = [];
  let erreur: string | null = null;

  if (!redis) {
    erreur = "Base de données non connectée.";
  } else {
    try {
      const raw = await redis.lrange<string>("contact:messages", 0, -1);
      messages = raw
        .map((m) => {
          try {
            return JSON.parse(m) as Message;
          } catch {
            return null;
          }
        })
        .filter((m): m is Message => m !== null)
        .reverse(); // plus récents en premier
    } catch {
      erreur = "Erreur de lecture de la base.";
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Messages reçus ({messages.length})
      </h1>

      {erreur && <p className="mt-6 text-sm text-urgence">{erreur}</p>}

      <div className="mt-8 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className="rounded-sm border border-line bg-paper-raised p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="font-semibold text-ink">
                {m.nom || "Sans nom"} — {m.email}
              </span>
              <span className="text-ink-soft">
                {new Date(m.recu_le).toLocaleString("fr-FR")}
              </span>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-ink-soft">
              {m.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && !erreur && (
          <p className="text-sm text-ink-soft">Aucun message pour l&apos;instant.</p>
        )}
      </div>

      {doitPoserCookie && adminSecret && (
        // Pose le cookie via une balise script minimale (pas de dépendance client)
        <script
          dangerouslySetInnerHTML={{
            __html: `document.cookie = "admin_access=${adminSecret}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax";`,
          }}
        />
      )}
    </div>
  );
}
