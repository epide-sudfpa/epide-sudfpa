import { siteConfig } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";

const raisons = [
  "Un accompagnement individuel spécifique en cas de difficulté (fonctionnelle ou non)",
  "Contribuer à la construction d'un rapport de force au profit du plus grand nombre,",
  "L'accès prioritaire aux permanences et aux outils internes au syndicat",
  "La possibilité de monter en compétence par l'intermédiaire de formations",
  "Un rapport moral et financier transparent, consultable chaque année",
];

export default function AdhesionPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Adhérer
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Rejoindre l'{siteConfig.nomCourt}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Adhérer, c'est d'abord apporter son soutien financier au syndicat, qui existe essentiellement grâce aux cotisations de ses adhérent.e.s. 
		C'est aussi faire le choix de participer au développement d'une organisation fondée sur les principes de solidarité et de partage.
		Adhérer, c'est :
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
        Une question avant d&apos;adhérer ? Consultez la page{" "}
        <a href="/contact" className="font-medium text-slate underline">
          Nous contacter
        </a>
        .
      </p>
    </div>
  );
}
