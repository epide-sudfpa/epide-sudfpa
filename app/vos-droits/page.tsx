import Link from "next/link";
import {
  MessageSquare,
  Megaphone,
  GraduationCap,
  Wallet,
  CalendarDays,
  Vote,
  ShieldCheck,
  Info,
  Scale,
  ShieldAlert,
  Lock,
  EyeOff,
  ClipboardCheck,
  Gavel,
  Speaker,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { getAllContent } from "@/lib/content";

export const metadata = {
  title: "Vos droits — la section SUD FPA EPIDE",
  description:
    "Les grands principes des droits et obligations des agents de la fonction publique, expliqués simplement.",
};

interface Point {
  icone: LucideIcon;
  titre: string;
  texte: string;
}

// Contenu adapté du cadre légal de la fonction publique (statut général des
// fonctionnaires, lois du 13 juillet 1983 et du 6 août 2019), à l'usage des
// agents EPIDE quel que soit leur statut (titulaire, contractuel, assimilé).
// Considérations générales et stables : pour les modes d'emploi concrets et
// évolutifs (rupture conventionnelle, congé bonifié...), voir la page Guides.

const droits: Point[] = [
  {
    icone: MessageSquare,
    titre: "Liberté d'opinion",
    texte:
      "Vous avez le droit d'avoir et d'exprimer vos opinions politiques, syndicales, religieuses ou philosophiques, dans le respect de la neutralité du service.",
  },
  {
    icone: Megaphone,
    titre: "Droit syndical",
    texte:
      "Vous pouvez créer un syndicat, y adhérer et y exercer un mandat librement, sans que cela ne puisse vous être reproché ni influencer votre carrière.",
  },
  {
    icone: Gavel,
    titre: "Droit de grève",
    texte:
      "Vous pouvez cesser le travail collectivement pour défendre vos revendications professionnelles, dans le cadre légal (préavis, service minimum le cas échéant).",
  },
  {
    icone: GraduationCap,
    titre: "Droit à la formation",
    texte:
      "Vous avez accès à des congés et dispositifs de formation tout au long de votre carrière : préparation aux concours, VAE, compte personnel de formation.",
  },
  {
    icone: Wallet,
    titre: "Droit à rémunération",
    texte:
      "Votre traitement est dû dès lors que le service a été fait, et maintenu pendant certains congés (maladie ordinaire, maternité, formation syndicale...).",
  },
  {
    icone: CalendarDays,
    titre: "Droit aux congés",
    texte:
      "Congés annuels, maladie, maternité et paternité, formation, mais aussi congés spécifiques comme le congé bonifié ou les autorisations d'absence syndicales.",
  },
  {
    icone: Vote,
    titre: "Droit à la participation",
    texte:
      "Par l'intermédiaire de vos représentants élus (CSA, CAP...), vous participez aux décisions sur l'organisation du travail et à l'examen des situations individuelles.",
  },
  {
    icone: ShieldCheck,
    titre: "Protection fonctionnelle",
    texte:
      "L'établissement doit vous protéger et vous défendre en cas de menaces, violences, outrages ou diffamation subis dans l'exercice de vos fonctions.",
  },
  {
    icone: Info,
    titre: "Droit à l'information",
    texte:
      "Vous pouvez obtenir communication des règles essentielles applicables à vos fonctions, ainsi que consulter votre dossier individuel à tout moment.",
  },
  {
    icone: Scale,
    titre: "Égalité de traitement",
    texte:
      "Vous êtes protégé contre toute discrimination liée à l'origine, au sexe, à l'orientation sexuelle, à la situation de famille, au handicap ou à vos opinions.",
  },
];

const obligations: Point[] = [
  {
    icone: ShieldAlert,
    titre: "Dignité, impartialité, intégrité, probité",
    texte:
      "Vous exercez vos fonctions avec ces quatre exigences, sans céder à des intérêts particuliers contraires à l'intérêt du service.",
  },
  {
    icone: EyeOff,
    titre: "Neutralité et laïcité",
    texte:
      "Vous traitez toutes les personnes de façon égale et ne manifestez aucune opinion religieuse ou politique dans l'exercice de vos fonctions.",
  },
  {
    icone: ClipboardCheck,
    titre: "Obéissance hiérarchique",
    texte:
      "Vous vous conformez aux instructions de votre hiérarchie, sauf ordre manifestement illégal et de nature à compromettre gravement un intérêt public.",
  },
  {
    icone: Lock,
    titre: "Secret professionnel",
    texte:
      "Vous ne divulguez pas les informations à caractère secret dont vous avez connaissance (données des jeunes accompagnés, dossiers RH...), sauf cas prévus par la loi.",
  },
  {
    icone: Speaker,
    titre: "Discrétion professionnelle",
    texte:
      "Vous ne communiquez pas les faits, informations ou documents dont vous avez connaissance dans l'exercice de vos fonctions, sauf autorisation expresse.",
  },
  {
    icone: Briefcase,
    titre: "Exécution des tâches confiées",
    texte:
      "Vous assurez personnellement les missions qui vous sont confiées, dans le cadre de vos attributions.",
  },
  {
    icone: Megaphone,
    titre: "Obligation de réserve",
    texte:
      "Vous ne faites pas usage de votre fonction à des fins de propagande personnelle et faites preuve de mesure dans l'expression publique de vos opinions.",
  },
  {
    icone: Wallet,
    titre: "Cumul d'activités encadré",
    texte:
      "Toute activité accessoire, y compris à titre bénévole ou associatif, est soumise à déclaration et à autorisation préalable de l'administration.",
  },
];

function Grille({ points }: { points: Point[] }) {
  return (
    <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
      {points.map((p) => (
        <div key={p.titre} className="flex flex-col bg-paper-raised p-6">
          <p.icone size={20} className="text-copper" strokeWidth={1.75} />
          <h3 className="mt-3 font-display text-base font-semibold text-ink">
            {p.titre}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.texte}</p>
        </div>
      ))}
    </div>
  );
}

export default function VosDroitsPage() {
  const fiches = getAllContent("droits");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Vos droits
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Vos droits et obligations, sans jargon
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        En tant qu'agent de la fonction publique, vous disposez de droits
        garantis par la loi — et vous êtes tenu à certaines obligations. En
        connaître les grands principes, c'est déjà se défendre.
      </p>

      <h2 className="mt-14 font-display text-xl font-semibold text-ink">
        Vos principaux droits
      </h2>
      <Grille points={droits} />

      <h2 className="mt-14 font-display text-xl font-semibold text-ink">
        Vos principales obligations
      </h2>
      <Grille points={obligations} />

      <p className="mt-8 text-sm text-ink-soft">
        Ce panorama résume les grands principes applicables. Pour le détail
        exhaustif des textes, voir la page{" "}
        <a
          href="https://www.fonction-publique.gouv.fr/etre-agent-public/mes-droits-et-obligations"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate"
        >
          « Mes droits et obligations »
        </a>{" "}
        du portail de la fonction publique. Pour les démarches concrètes
        (rupture conventionnelle, congé bonifié...), direction la page{" "}
        <Link href="/guides" className="underline hover:text-slate">
          Guides
        </Link>
        .
      </p>

      {fiches.length > 0 && (
        <>
          <h2 className="mt-14 font-display text-xl font-semibold text-ink">
            Pour aller plus loin
          </h2>
          <div className="mt-8 divide-y divide-line">
            {fiches.map((f) => {
              const contenu = (
                <div className={`py-6 first:pt-0 ${f.disponible ? "" : "opacity-60"}`}>
                  {f.categorie && (
                    <p className="font-mono-num text-xs uppercase tracking-wide text-copper">
                      {f.categorie}
                    </p>
                  )}
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {f.titre}
                  </h3>
                  {f.resume && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {f.resume}
                    </p>
                  )}
                  {!f.disponible && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                      🚧 À venir
                    </span>
                  )}
                </div>
              );
              return f.disponible ? (
                <Link key={f.slug} href={`/vos-droits/${f.slug}`} className="block">
                  {contenu}
                </Link>
              ) : (
                <div key={f.slug}>{contenu}</div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
