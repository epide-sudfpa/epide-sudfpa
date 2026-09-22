import Link from "next/link";
import { FileText, FileDown, Users } from "lucide-react";

// ============================================================================
// PAGE TRANSPARENCE
// ============================================================================
// Statuts et bilan financier : publication publique, cohérente avec l'art. 17
// du RI ("Il est ensuite transmis à tous les adhérents et publié sur le site
// de la section") et avec l'obligation légale de publicité des comptes
// (loi du 20 août 2008, art. L. 2135-1 à L. 2135-6 du Code du travail).
//
// PV d'Assemblée générale : volontairement non publiés ici, réservés aux
// adhérents — rien dans les statuts ou le RI n'impose leur publication
// publique, contrairement aux deux autres documents.
//
// ⚠️ Le PDF des statuts contient encore [Date — à compléter] : à remplacer
// par la version définitive signée une fois l'AG constitutive tenue.
// ============================================================================

export const metadata = {
  title: "Transparence — EPIDE SUD FPA",
  description: "Statuts et bilan financier de la section SUD FPA EPIDE.",
};

export default function TransparencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Transparence
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Statuts et bilan financier
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        La transparence est un principe fondateur de la section, inscrit dans
        nos statuts : bureau élu et révocable, aucune décision prise sans
        compte-rendu accessible à tous les adhérents.
      </p>

      <div className="mt-12 space-y-6">
        <div className="rounded-sm border border-line bg-paper-raised p-6">
          <FileText size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Statuts de la section
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Adoptés par l&apos;Assemblée générale constitutive. Déposés en
            mairie de Malakoff, ils sont par nature publics.
          </p>
          <a
            href="/documents/statuts-sud-fpa-epide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-ink"
          >
            <FileDown size={16} />
            Télécharger les statuts (PDF)
          </a>
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

        <div className="flex items-start gap-3 rounded-sm border border-line bg-paper p-6">
          <Users size={20} className="mt-0.5 shrink-0 text-ink-soft" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Comptes-rendus d&apos;Assemblée générale
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Les procès-verbaux d&apos;Assemblée générale sont communiqués
              aux adhérents, comme dans la grande majorité des organisations
              syndicales — ils peuvent porter sur des discussions internes
              qu&apos;il n&apos;est pas dans l&apos;intérêt des agents de
              rendre publiques.{" "}
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
