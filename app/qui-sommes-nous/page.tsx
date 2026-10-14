import Image from "next/image";
import { UserRound } from "lucide-react";
import { equipeRegistry, type MembreEquipe } from "@/lib/equipe-registry";

export const metadata = {
  title: "Qui sommes-nous ? — la section SUD FPA EPIDE",
  description:
    "L'équipe syndicale de la section SUD FPA EPIDE : les agents qui portent la section au quotidien.",
};

function Photo({ membre }: { membre: MembreEquipe }) {
  return (
    <div
      className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-paper text-ink-soft outline outline-2 outline-offset-2 outline-copper/60"
    >
      {membre.photo ? (
        <Image
          src={membre.photo}
          alt={`${membre.nom}, ${membre.responsabilite}`}
          width={480}
          height={480}
          sizes="144px"
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound size={56} strokeWidth={1.5} />
      )}
    </div>
  );
}

function Fiche({ membre }: { membre: MembreEquipe }) {
  return (
    <li className="flex flex-col items-center text-center">
      <Photo membre={membre} />
      <h2 className="mt-5 font-display text-xl font-semibold text-ink">
        {membre.nom}
      </h2>
      <p className="mt-1 font-mono-num text-[11px] font-semibold uppercase tracking-wide text-copper">
        {membre.responsabilite}
      </p>
      <p className="mt-2 text-sm text-ink">{membre.posteEpide}</p>
      <p className="text-sm text-ink-soft">{membre.lieu}</p>
    </li>
  );
}

export default function QuiSommesNousPage() {
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

      <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {equipeRegistry.map((membre) => (
          <Fiche key={membre.id} membre={membre} />
        ))}
      </ul>
    </div>
  );
}
