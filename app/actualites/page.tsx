import Link from "next/link";
import { getAllContent } from "@/lib/content";

export default function ActualitesPage() {
  const articles = getAllContent("actualites");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Actualités
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Ce qui se passe
      </h1>

      {articles.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          Aucune actualité publiée pour le moment.
        </p>
      ) : (
        <div className="mt-12 divide-y divide-line">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/actualites/${a.slug}`}
              className="block py-6 first:pt-0"
            >
              {a.date && (
                <p className="font-mono-num text-xs text-ink-soft">
                  {new Date(a.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
              <h2 className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-slate">
                {a.titre}
              </h2>
              {a.resume && (
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {a.resume}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
