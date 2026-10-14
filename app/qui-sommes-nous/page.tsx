import Image from "next/image";
import { UserRound } from "lucide-react";
import { getMembre, type MembreEquipe } from "@/lib/equipe-registry";

export const metadata = {
  title: "Qui sommes-nous ? — la section SUD FPA EPIDE",
  description:
    "L'équipe syndicale de la section SUD FPA EPIDE : les agents qui portent la section au quotidien.",
};

function Photo({ membre, taille }: { membre: MembreEquipe; taille: number }) {
  return (
    <div
      className="relative z-10 flex items-center justify-center overflow-hidden rounded-full bg-paper text-ink-soft ring-4 ring-paper-raised outline outline-2 outline-copper/60"
      style={{ width: taille, height: taille }}
    >
      {membre.photo ? (
        <Image
          src={membre.photo}
          alt={`${membre.nom}, ${membre.responsabilite}`}
          width={480}
          height={480}
          sizes={`${taille}px`}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound size={taille / 2.5} strokeWidth={1.5} />
      )}
    </div>
  );
}

function Fiche({
  membre,
  taille,
  grand = false,
}: {
  membre: MembreEquipe;
  taille: number;
  grand?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Photo membre={membre} taille={taille} />
      <div className="relative z-10 mt-3 w-64 max-w-full bg-paper px-2 py-1">
        <h2
          className={`font-display font-semibold text-ink ${grand ? "text-xl" : "text-lg"}`}
        >
          {membre.nom}
        </h2>
        <p className="mt-0.5 font-mono-num text-[11px] font-semibold uppercase tracking-wide text-copper">
          {membre.responsabilite}
        </p>
        <p className="mt-1 text-sm text-ink">{membre.posteEpide}</p>
        <p className="text-sm text-ink-soft">{membre.lieu}</p>
      </div>
    </div>
  );
}

export default function QuiSommesNousPage() {
  const secretaire = getMembre("secretaire");
  const adjoint = getMembre("adjoint");
  const tresoriere = getMembre("tresoriere");
  const membre = getMembre("membre");

  if (!secretaire || !adjoint || !tresoriere || !membre) {
    throw new Error("equipe-registry : les 4 rôles de l'organigramme doivent être renseignés.");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Qui sommes-nous ?
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        L&apos;équipe syndicale
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Des agents EPIDE en poste dans différents centres et services, qui
        portent la section au quotidien — le collectif, pour le collectif,
        par le collectif.
      </p>

      {/* Organigramme, grand écran : 3 colonnes, traits courbes derrière les photos */}
      <div
        className="relative mx-auto mt-16 hidden max-w-3xl md:block"
        style={{ height: 780 }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-copper/50"
          viewBox="0 0 100 780"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke">
            <path d="M50 250 C50 300, 16.67 270, 16.67 340" vectorEffect="non-scaling-stroke" />
            <path d="M50 250 C50 300, 83.33 270, 83.33 340" vectorEffect="non-scaling-stroke" />
            <path d="M50 250 L50 600" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <Fiche membre={secretaire} taille={144} grand />
        </div>
        <div
          className="absolute top-[290px] -translate-x-1/2"
          style={{ left: "16.67%" }}
        >
          <Fiche membre={adjoint} taille={112} />
        </div>
        <div
          className="absolute top-[290px] -translate-x-1/2"
          style={{ left: "83.33%" }}
        >
          <Fiche membre={tresoriere} taille={112} />
        </div>
        <div className="absolute left-1/2 top-[550px] -translate-x-1/2">
          <Fiche membre={membre} taille={112} />
        </div>
      </div>

      {/* Organigramme, mobile : colonne unique reliée par un trait */}
      <div className="relative mx-auto mt-12 flex max-w-sm flex-col items-center gap-10 md:hidden">
        <div
          className="absolute bottom-10 left-1/2 top-10 w-0.5 -translate-x-1/2 bg-copper/40"
          aria-hidden="true"
        />
        <Fiche membre={secretaire} taille={128} grand />
        <Fiche membre={adjoint} taille={104} />
        <Fiche membre={tresoriere} taille={104} />
        <Fiche membre={membre} taille={104} />
      </div>
    </div>
  );
}
