import Link from "next/link";
import { Calculator, BookOpen, Map, ArrowRight, type LucideIcon } from "lucide-react";
import { outilsRegistry, categorieLabels } from "@/lib/outils-registry";

const icones: Record<string, LucideIcon> = {
  Calculator,
  BookOpen,
  Map,
};

export default function OutilsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Outils & simulateurs
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Des outils que vous pouvez utiliser dès aujourd&apos;hui
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Pas besoin d&apos;adhérer pour s&apos;en servir. Ces outils sont
        ouverts à tous les agents EPIDE.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        {outilsRegistry.map((outil) => {
          const Icon = icones[outil.icone] ?? Calculator;
          const contenu = (
            <div
              className={`flex h-full flex-col bg-paper-raised p-7 transition-colors ${
                outil.disponible ? "hover:bg-paper" : "opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon size={22} className="text-copper" strokeWidth={1.75} />
                <span className="font-mono-num text-[11px] uppercase tracking-wide text-ink-soft">
                  {categorieLabels[outil.categorie]}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                {outil.titre}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {outil.description}
              </p>
              {outil.disponible ? (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate">
                  Utiliser <ArrowRight size={14} />
                </span>
              ) : (
                <span className="mt-5 inline-block text-sm font-medium text-ink-soft">
                  À venir
                </span>
              )}
            </div>
          );

          return outil.disponible ? (
            <Link key={outil.slug} href={`/outils/${outil.slug}`}>
              {contenu}
            </Link>
          ) : (
            <div key={outil.slug}>{contenu}</div>
          );
        })}
      </div>
    </div>
  );
}
