import { siteConfig } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";

const raisons = [
  "Un accompagnement individuel en cas de difficulté (entretien, mobilité, désaccord avec la hiérarchie)",
  "Un poids collectif plus fort aux élections professionnelles de décembre 2026",
  "L'accès prioritaire aux permanences et aux outils réservés",
  "Un rapport moral et financier transparent, consultable chaque année",
];

export default function AdhesionPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Adhérer
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Rejoindre {siteConfig.nomCourt}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Adhérer, c&apos;est donner du poids à une organisation qui rend des
        comptes. Ce n&apos;est pas un engagement idéologique — c&apos;est un
        choix collectif.
      </p>

      <ul className="mt-10 space-y-4">
        {raisons.map((r) => (
          <li key={r} className="flex gap-3">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-moss" />
            <span className="text-ink-soft">{r}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-sm border border-line bg-paper-raised p-8">
        <h2 className="font-display text-lg font-semibold text-ink">
          Le bulletin d&apos;adhésion
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Le formulaire est hébergé sur Microsoft Forms, via l&apos;espace
          professionnel EPIDE. Vos informations restent dans l&apos;écosystème
          de l&apos;établissement.
        </p>

        {siteConfig.formulaireAdhesionUrl ? (
          <a
            href={siteConfig.formulaireAdhesionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-sm bg-slate px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-slate-soft"
          >
            Ouvrir le formulaire d&apos;adhésion
          </a>
        ) : (
          <p className="mt-6 rounded-sm bg-copper-soft px-4 py-3 text-sm text-ink">
            Le lien du formulaire sera ajouté ici (champ{" "}
            <code className="font-mono-num">formulaireAdhesionUrl</code> dans{" "}
            <code className="font-mono-num">lib/config.ts</code>).
          </p>
        )}
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        Une question avant d&apos;adhérer ?{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-slate underline">
          Écrivez-nous
        </a>{" "}
        ou consultez la page{" "}
        <a href="/contact" className="font-medium text-slate underline">
          Nous rencontrer
        </a>
        .
      </p>
    </div>
  );
}
