import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// ============================================================================
// COMPTEUR DE VISITES — un entier en base, aucune IP ni cookie stocké
// ============================================================================
// Nécessite l'intégration "Vercel KV" activée sur le projet une fois déployé
// (dashboard Vercel > Storage > Create Database > KV). Échoue silencieusement
// (total: null) tant que ce n'est pas fait, pour ne jamais casser le site.
// ============================================================================

export async function GET() {
  try {
    const total = (await kv.get<number>("visites_total")) ?? 0;
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: null });
  }
}

export async function POST() {
  try {
    const total = await kv.incr("visites_total");
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: null });
  }
}
