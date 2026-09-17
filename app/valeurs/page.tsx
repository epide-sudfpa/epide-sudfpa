import { siteConfig } from "@/lib/config";

const engagements = [
  {
    titre: "Un fonctionnement démocratique, gravé dans nos statuts",
    texte:
      "L'équipe syndicale est élue par l'ensemble des adhérent.e.s, et peut être révoquée par eux. Pas de trésorerie opaque : les dépenses et les recettes du syndicat seront consultables par l'ensemble des adhérent.e, en permanence.",
  },
  {
    titre: "Des ambitions fortes",
    texte:
      "L'exercice démocratique est une affaire de rapport de force : c'est la majorité + 1 qui l'emporte. Nous avons donc pour projet de rassembler et de fédérer les agents autour de problématiques et d'objectifs communs, quel que soit le service, en centre ou à la DG. L'organisation du travail telle qu'elle a été définie ne doit pas nous faire oublier que nous partageons un certain nombre de réalités et donc un certain nombre d'attentes et d'espoirs. Nous nous proposons de créer le cadre pour en débattre, les formuler et les revendiquer. Ce faisant, nous espérons créer les espaces de discussion et de débat nécessaires à tout progrès.",
  },
  {
    titre: "Un programme à la hauteur de nos ambitions et de vos attentes",
    texte:
      "Un syndicat, ce n'est pas qu'une structure chargée de défendre les intérêts collectifs et individuels des travailleurs, c'est aussi un outil de formation et d'émancipation. Nous ferons le tour des centres pour venir vous rencontrer, nous mettrons à disposition de toutes et tous des outils en ligne pour fluidifier le quotidien, nous animerons des ateliers spécifiques pour mieux comprendre et analyser ses conditions de travail (fiche de paie, droit du travail, etc.).",
  },
  {
    titre: "Un traitement rigoureux de toutes les sollicitations",
    texte:
      "Par téléphone, par courriel ou en direct, nous nous engageons à fournir une réponse à votre question dans les plus brefs délais. Si nous n'avons pas la réponse, nous la chercherons, mais toutes les questions seront traitées.",
  },
];

export default function ValeursPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Notre ligne
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Fonctionnement, ambitions et programme
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        EPIDE SUD FPA n'a pas été créé dans le but de diviser un peu plus les agents de l'établissement
		mais à partir d'un constat simple : aux dernières élections professionnelles, le syndicat majoritaire
		n'a été élu que par <b>336 agents sur 1079 votants</b> (67,20% des 500 suffrages exprimés). En d'autres termes, 
		à peine 1 agent sur 3 (😱) a choisi cette organisation pour nous représenter.
		
		Pour intéresser le plus grand nombre, il y a donc des lacunes importantes à combler : les agents agents EPIDE 
		méritent une organisation qui leur appartiennent, au sein de laquelle ils se sentent libre de 
		participer et de militer et qui soit capable de fédérer par-delà les métiers et les services...
		
		C'est ce que nous nous proposons de faire, et voici comment 👇🏼.
      </p>

      <div className="mt-14 space-y-10">
        {engagements.map((e, i) => (
          <div key={e.titre} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
            <h2 className="font-display text-xl font-semibold text-ink">
              {e.titre}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{e.texte}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-sm border border-line bg-paper-raised p-8">
        <h2 className="font-display text-lg font-semibold text-ink">
          Ce que nous ne sommes pas
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          👉🏼 Pour enthousiastes et motivé.e.s que nous soyons, nous ne sommes ni tout-puissants,
		  ni magiciens : nous avons déjà un métier à l'EPIDE et nous exercerons notre
		  activité syndicale en partie sur notre temps libre.
		  Par conséquent, <b> rejoignez-nous</b> nous avons besoin d'adhérent.e.s pour apporter leur pierre
		  à l'édifice et faire de l'EPIDE SUD FPA un syndicat fonctionnel au service de toutes et tous !
        </p>
      </div>
    </div>
  );
}
