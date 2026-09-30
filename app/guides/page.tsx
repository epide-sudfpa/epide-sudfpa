import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata = {
  title: "Guides — la section SUD FPA EPIDE",
  description:
    "Des modes d'emploi concrets pour vos démarches : rupture conventionnelle, disponibilité, contestation d'un entretien professionnel, etc.",
};

export default function GuidesPage() {
  const guides = getAllContent("guides");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Guides
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Des modes d'emploi pour vos démarches
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Contrairement à la page "Vos droits", qui pose les grands principes,
        cette page rassemble des guides pratiques, pas à pas, construits et
        mis à jour au fil des besoins remontés du terrain.
      </p>

      {guides.length === 0 ? (
        <p className="mt-10 text-ink-soft">Aucun guide publié pour le moment.</p>
      ) : (
        <div className="mt-12 divide-y divide-line">
          {guides.map((g) => {
            const contenu = (
              <div className={`py-6 first:pt-0 ${g.disponible ? "" : "opacity-60"}`}>
                {g.categorie && (
                  <p className="font-mono-num text-xs uppercase tracking-wide text-copper">
                    {g.categorie}
                  </p>
                )}
                <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                  {g.titre}
                </h2>
                {g.resume && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {g.resume}
                  </p>
                )}
                {!g.disponible && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                    🚧 À venir
                  </span>
                )}
              </div>
            );

            return g.disponible ? (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="block">
                {contenu}
              </Link>
            ) : (
              <div key={g.slug}>{contenu}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
