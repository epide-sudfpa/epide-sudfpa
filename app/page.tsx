import Link from "next/link";
import { ArrowRight, FileCheck2, Users, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

const chiffresCles = [
  { valeur: "1 100", label: "agents EPIDE" },
  { valeur: "20", label: "centres + le siège" },
  { valeur: "58,5 %", label: "ont voté aux dernières élections" },
  { valeur: "3", label: "services en centre : SMG, SIProf, SECi" },
];

const piliers = [
  {
    icone: FileCheck2,
    titre: "Transparence totale",
    texte:
      "Rapport moral et financier publié chaque année. Bureau élu, pas hérité. Aucune décision prise sans compte-rendu accessible à tous les adhérents.",
  },
  {
    icone: Users,
    titre: "Au-dessus des services",
    texte:
      "SMG, SIProf, SECi, siège : les tensions entre services affaiblissent tout le monde face à la direction. On défend les agents EPIDE, pas un camp contre un autre.",
  },
  {
    icone: MapPin,
    titre: "Présence de terrain",
    texte:
      "Pas un syndicat de permanents planqués derrière une décharge à 100 %. On est dans les centres, on connaît les dossiers, on répond.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
              {siteConfig.etablissement} — Élections professionnelles, décembre 2026
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {siteConfig.accroche}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {siteConfig.nomLong}. Né du constat que les agents EPIDE
              méritent une organisation qui rend des comptes, qui se déplace
              dans les centres, et qui ne prend pas parti dans les guerres de
              services.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/adhesion"
                className="inline-flex items-center gap-2 rounded-sm bg-slate px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-slate-soft"
              >
                Adhérer
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/valeurs"
                className="inline-flex items-center gap-2 rounded-sm border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
              >
                Lire notre ligne
              </Link>
            </div>
          </div>
        </div>

        {/* Bandeau chiffres clés — registre "tableau de bord", pas "stat marketing" */}
        <div className="border-t border-line">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line sm:grid-cols-4">
            {chiffresCles.map((c) => (
              <div key={c.label} className="px-6 py-6 text-center sm:text-left">
                <p className="font-mono-num text-2xl font-semibold text-slate sm:text-3xl">
                  {c.valeur}
                </p>
                <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Ce qui nous distingue
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {piliers.map((p) => {
            const Icon = p.icone;
            return (
              <div key={p.titre} className="bg-paper-raised p-8">
                <Icon size={22} className="text-copper" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {p.titre}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.texte}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* BANDE OUTILS */}
      <section className="border-y border-line bg-slate">
        <div className="mx-auto max-w-6xl px-6 py-16 text-paper">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Des outils concrets, pas que des discours
              </h2>
              <p className="mt-2 max-w-xl text-sm text-paper/75">
                Simulateur de prime, guide des catégories, calcul de mobilité
                — des outils que vous pouvez utiliser dès aujourd'hui, sans
                adhérer.
              </p>
            </div>
            <Link
              href="/outils"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-copper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-copper-soft"
            >
              Voir les outils
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
