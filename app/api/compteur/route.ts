import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// ============================================================================
// COMPTEUR DE VISITES — un entier en base, aucune IP ni cookie stocké
// ============================================================================
// Nécessite une base Redis connectée via Vercel Marketplace (Storage > Upstash).
// Vercel KV a été retiré fin 2024 ; Upstash Redis est le remplaçant recommandé,
// compatible edge/serverless (API REST HTTP, comme l'était Vercel KV).
//
// Selon la façon dont l'intégration est provisionnée, les variables
// injectées peuvent s'appeler UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN,
// ou (compatibilité historique avec d'anciens templates) KV_REST_API_URL /
// KV_REST_API_TOKEN — les deux sont gérées ici pour ne pas avoir à y retoucher.
//
// Échoue silencieusement (total: null) tant qu'aucune base n'est connectée,
// pour ne jamais casser le site.
// ============================================================================

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

export async function GET() {
  if (!redis) return NextResponse.json({ total: null });
  try {
    const total = (await redis.get<number>("visites_total")) ?? 0;
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: null });
  }
}

export async function POST() {
  if (!redis) return NextResponse.json({ total: null });
  try {
    const total = await redis.incr("visites_total");
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: null });
  }
}
