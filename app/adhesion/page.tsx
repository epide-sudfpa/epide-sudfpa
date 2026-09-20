import { siteConfig } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";

const raisons = [
  "Bénéficier d'un accompagnement spécifique et prioritaire en cas de difficulté (fonctionnelle ou non)",
  "Contribuer à la construction d'un rapport de force au profit de tous les agents,",
  "L'accès prioritaire aux permanences et aux outils internes du syndicat",
  "La possibilité de monter en compétence par l'intermédiaire de formations",
  "Un rapport moral et financier transparent, consultable chaque année",
];

// Formulaire Google Forms existant, réutilisé en attendant l'achat d'un nom
// de domaine propre (même logique de transition que la page Contact).
const GOOGLE_FORM_ID = "1FAIpQLSeOsmHPVdKhK4dcZDAmDQ4pKPBGuQQNYHtjNkCkTtqpc0zOUQ";

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

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-ink">
          Le bulletin d&apos;adhésion
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Première adhésion ou renouvellement, directement ci-dessous.
        </p>
        <div className="mt-6 overflow-hidden rounded-sm border border-line bg-paper-raised shadow-sm">
          <iframe
            src={`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?embedded=true`}
            title="Formulaire d'adhésion SUD FPA EPIDE"
            className="block w-full"
            height={1400}
            loading="lazy"
          >
            Chargement du formulaire…
          </iframe>
        </div>
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
