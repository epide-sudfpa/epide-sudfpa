import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOutilBySlug, outilsRegistry } from "@/lib/outils-registry";
import dynamic from "next/dynamic";

// ============================================================================
// REGISTRE DES COMPOSANTS — pour ajouter un outil :
//   1. créer app/outils/_outils/mon-outil.tsx
//   2. ajouter une entrée dans lib/outils-registry.ts (même slug)
//   3. ajouter une ligne ci-dessous
// ============================================================================
const composants: Record<string, ReturnType<typeof dynamic>> = {
  "simulateur-primes": dynamic(() => import("../_outils/simulateur-primes")),
};

export function generateStaticParams() {
  return outilsRegistry.map((o) => ({ slug: o.slug }));
}

export default async function OutilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outil = getOutilBySlug(slug);

  if (!outil || !outil.disponible) {
    notFound();
  }

  const Composant = composants[slug];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/outils"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-slate"
      >
        <ArrowLeft size={15} />
        Tous les outils
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {outil.titre}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{outil.description}</p>

      <div className="mt-10">
        {Composant ? (
          <Composant />
        ) : (
          <p className="text-ink-soft">
            Cet outil est en cours de construction.
          </p>
        )}
      </div>
    </div>
  );
}
