import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// ============================================================================
// FORMULAIRE DE CONTACT — stocke les messages dans Redis, pas d'email exposé
// ============================================================================
// Réutilise la même base Upstash que le compteur de visites (voir
// app/api/compteur/route.ts pour le détail des variables d'environnement).
// Les messages sont lus via /admin/messages (protégé par ADMIN_SECRET).
//
// Anti-spam minimal : un champ caché "site_web" (honeypot) — un vrai visiteur
// ne le remplit jamais, un bot générique le remplit presque toujours. Si
// rempli, on renvoie un faux succès sans rien stocker, pour ne pas indiquer
// au bot que son message a été filtré.
// ============================================================================

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

const MESSAGES_KEY = "contact:messages";
const MAX_MESSAGES = 300;

export async function POST(request: Request) {
  let body: { nom?: string; email?: string; message?: string; site_web?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot : un bot a rempli ce champ caché, on fait semblant que tout va bien
  if (body.site_web) {
    return NextResponse.json({ ok: true });
  }

  const nom = (body.nom ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!email || !email.includes("@") || message.length < 10) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  if (!redis) {
    return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
  }

  try {
    await redis.rpush(
      MESSAGES_KEY,
      JSON.stringify({
        nom: nom || null,
        email,
        message,
        recu_le: new Date().toISOString(),
      })
    );
    await redis.ltrim(MESSAGES_KEY, -MAX_MESSAGES, -1);
  } catch {
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
