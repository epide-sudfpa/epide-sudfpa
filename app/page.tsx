import Link from "next/link";
import { ArrowRight, FileCheck2, Users, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

const chiffresCles = [
  { valeur: "1 200", label: "agents EPIDE" },
  { valeur: "20", label: "centres + 1 Direction générale" },
  { valeur: "67,2 %", label: "ont voté aux dernières élections" },
  { valeur: "3", label: "services en centre : SMG, SIProf, SECi" },
];

const piliers = [
  {
    icone: FileCheck2,
    titre: "Transparence totale",
    texte:
      "EPIDE SUD FPA a été créé par et pour les agents. En conséquence, la transparence de son activité est le minimum dû à toutes et tous. Le syndicat organisera cette transparence conformément à ses statuts : publication du rapport moral et financier annuel, assemblées générales, congrès, etc.",
  },
  {
    icone: Users,
    titre: "Pour le collectif, par le collectif... toujours",
    texte:
      "Le bien commun est notre unique objectif : nous mettons toute notre énergie, notre enthousiasme et nos compétences au service du plus grand nombre, syndiqué.e.s ou non.",
  },
  {
    icone: MapPin,
    titre: "Présence de terrain",
    texte:
      "Pour nous, un syndicalisme hors sol n'a aucun sens. Nous veillerons à organiser une présence sur le terrain de tous les instants, que ce soit par l'intermédiaire de nos référents en centre ou de visites régulières.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-urgence/10 px-3 py-1 font-mono-num text-xs font-semibold uppercase tracking-widest text-urgence">
              {siteConfig.etablissement} — Élections professionnelles, décembre 2026
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {siteConfig.accroche}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Les élections professionnelles arrivent à grands pas (décembre 2026), c'est pourquoi il est temps de vous présenter notre fonctionnement, nos ambitions et notre programme.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/adhesion"
                className="inline-flex items-center gap-2 rounded-sm bg-urgence px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-urgence-soft"
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
                Des outils concrets pour le quotidien
              </h2>
              <p className="mt-2 max-w-xl text-sm text-paper/75">
                Vous trouverez dans cette section des outils pratiques pour toutes et tous :
				simulateurs, guides pratiques, ... et bien plus (qu'il nous reste à construire !).
                Des outils que vous pouvez utiliser dès aujourd'hui, sans adhérer.
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
