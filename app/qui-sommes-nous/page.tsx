import Image from "next/image";
import { UserRound } from "lucide-react";
import { getEquipeTriee } from "@/lib/equipe-registry";

export const metadata = {
  title: "Qui sommes-nous ? — EPIDE SUD FPA",
  description:
    "L'équipe syndicale d'EPIDE SUD FPA : les agents qui portent la section au quotidien.",
};

export default function QuiSommesNousPage() {
  const equipe = getEquipeTriee();

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

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {equipe.map((membre) => (
          <div
            key={membre.id}
            className="flex flex-col items-center bg-paper-raised p-7 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-paper text-ink-soft">
              {membre.photo ? (
                <Image
                  src={membre.photo}
                  alt={membre.nom}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={32} strokeWidth={1.5} />
              )}
            </div>
            <h2 className="mt-4 font-display text-base font-semibold text-ink">
              {membre.nom}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{membre.posteEpide}</p>
            <span className="mt-3 font-mono-num text-[11px] uppercase tracking-wide text-copper">
              {membre.responsabilite}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
