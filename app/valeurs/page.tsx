import { siteConfig } from "@/lib/config";

const engagements = [
  {
    titre: "Un rapport moral et financier, chaque année, public",
    texte:
      "Pas de trésorerie opaque, pas de bureau qui se perpétue sans élection. Ce que nous encaissons et ce que nous dépensons est consultable par tout adhérent, sans en faire la demande.",
  },
  {
    titre: "Une présence sur le terrain, pas une décharge à 100 %",
    texte:
      "Un syndicat dont les représentants sont injoignables ne défend personne. Nous restons sur nos postes, dans nos services, et nous nous déplaçons en centre.",
  },
  {
    titre: "Aucune préférence entre les services",
    texte:
      "SMG, SIProf, SECi, siège : nous ne prenons pas parti dans les tensions inter-services. Ces divisions affaiblissent le rapport de force collectif face à la direction — c'est précisément ce que nous voulons dépasser.",
  },
  {
    titre: "Des réponses concrètes avant des slogans",
    texte:
      "Un agent qui nous contacte pour une question de prime, de catégorie ou de mobilité doit avoir une réponse utile, pas un discours.",
  },
];

export default function ValeursPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Notre ligne
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Ce que nous défendons, et comment nous fonctionnons
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        {siteConfig.nomLong} ne s&apos;est pas créé par goût de la division.
        Il s&apos;est créé parce que les agents EPIDE méritent une
        organisation qui rend des comptes, qui se déplace, et qui ne traite
        pas certains services comme plus légitimes que d&apos;autres.
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
          Nous ne sommes ni un syndicat de posture, ni un appareil au service
          de ses seuls permanents. Nous ne demandons à personne de choisir un
          camp idéologique pour nous rejoindre : nous demandons un constat
          partagé — les agents EPIDE ont besoin d&apos;une organisation qui
          fonctionne.
        </p>
      </div>
    </div>
  );
}
