import Link from "next/link";
import { FileText, Users, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/config";

// ============================================================================
// PAGE TRANSPARENCE
// ============================================================================
// Quatre volets, chacun avec sa logique de publicité propre :
//
// - RI de la section : document propre à la section, publié ici dès son
//   adoption (art. 17 du RI : transmission aux adhérents + publication sur
//   le site de la section).
// - Bilan financier annuel : idem, obligation légale de publicité des
//   comptes (loi du 20 août 2008, art. L. 2135-1 à L. 2135-6 du Code du
//   travail).
// - CR d'AG : volontairement NON publiés ici, réservés exclusivement aux
//   adhérents — rien n'impose leur publication publique, contrairement aux
//   deux documents ci-dessus.
// - Statuts : ce sont ceux de la fédération SUD FPA, votés par elle — la
//   section n'a pas la main dessus et ne les héberge donc pas en copie
//   locale, seulement un lien vers la fédération.
// ============================================================================

export const metadata = {
  title: "Transparence — la section SUD FPA EPIDE",
  description: "RI, bilan financier et statuts de la section SUD FPA EPIDE.",
};

export default function TransparencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Transparence
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        RI, bilan financier et statuts
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        La transparence est un principe fondateur de la section : bureau élu
        et révocable, aucune décision prise sans compte-rendu accessible à
        tous les adhérents.
      </p>

      <div className="mt-12 space-y-6">
        <div className="rounded-sm border border-line bg-paper-raised p-6">
          <FileText size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Règlement intérieur de la section
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Propre à la section SUD FPA EPIDE, en cours de finalisation. Il
            sera publié ici dès son adoption par l&apos;Assemblée générale.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
            🚧 À venir
          </span>
        </div>

        <div className="rounded-sm border border-line bg-paper-raised p-6">
          <FileText size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Bilan financier annuel
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Conformément à l&apos;article 17 de notre règlement intérieur, le
            rapport financier annuel est publié ici dès son approbation par
            l&apos;Assemblée générale. La section venant d&apos;être créée,
            aucun exercice n&apos;a encore été clos — le premier bilan
            paraîtra à l&apos;issue du premier exercice comptable.
          </p>
        </div>

        <div className="rounded-sm border border-line bg-paper-raised p-6">
          <FileText size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Statuts
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            La section SUD FPA EPIDE est régie par les statuts de la
            fédération SUD FPA, tels qu&apos;adoptés par cette dernière — ils
            ne sont pas propres à la section et ne relèvent donc pas de son
            autorité. Consultez-les directement auprès de la fédération.
          </p>
          <a
            href={siteConfig.federation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-ink"
          >
            <ExternalLink size={16} />
            Voir le site de {siteConfig.federation.nom}
          </a>
        </div>

        <div className="flex items-start gap-3 rounded-sm border border-line bg-paper p-6">
          <Users size={20} className="mt-0.5 shrink-0 text-ink-soft" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Comptes-rendus d&apos;Assemblée générale
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Les procès-verbaux d&apos;Assemblée générale sont réservés
              exclusivement aux adhérents, comme dans la grande majorité des
              organisations syndicales — ils peuvent porter sur des
              discussions internes qu&apos;il n&apos;est pas dans
              l&apos;intérêt des agents de rendre publiques.{" "}
              <Link href="/adhesion" className="font-medium text-slate underline">
                Adhérer
              </Link>{" "}
              donne accès à ces documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
