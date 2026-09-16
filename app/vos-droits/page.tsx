import Link from "next/link";
import { getAllContent } from "@/lib/content";

export default function VosDroitsPage() {
  const fiches = getAllContent("droits");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Vos droits
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Comprendre vos droits, sans jargon
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Des fiches pratiques sur la carrière, les congés, la mobilité et les
        démarches courantes.
      </p>

      {fiches.length === 0 ? (
        <p className="mt-10 text-ink-soft">Aucune fiche publiée pour le moment.</p>
      ) : (
        <div className="mt-12 divide-y divide-line">
          {fiches.map((f) => (
            <Link
              key={f.slug}
              href={`/vos-droits/${f.slug}`}
              className="block py-6 first:pt-0"
            >
              {f.categorie && (
                <p className="font-mono-num text-xs uppercase tracking-wide text-copper">
                  {f.categorie}
                </p>
              )}
              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                {f.titre}
              </h2>
              {f.resume && (
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {f.resume}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
