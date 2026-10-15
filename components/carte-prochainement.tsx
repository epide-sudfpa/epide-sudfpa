"use client";

import { useEffect, useState, type ReactNode } from "react";
import { OUVERTURE_ISO } from "@/lib/ouverture";

// Carte verrouillée jusqu'à OUVERTURE_ISO : grisée, non cliquable, barrée d'un
// panneau rouge oblique avec compte à rebours. À l'heure dite, elle devient un
// lien normal toute seule (sans rechargement). Le vrai verrou est dans proxy.ts.

const cible = new Date(OUVERTURE_ISO).getTime();

const libelleDate = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Paris",
}).format(new Date(cible));

function decompte(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const j = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${j} j ${p(h)} h ${p(m)} min ${p(sec)} s`;
}

export function CarteProchainement({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const [maintenant, setMaintenant] = useState<number | null>(null);

  useEffect(() => {
    setMaintenant(Date.now());
    const id = setInterval(() => setMaintenant(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (maintenant !== null && maintenant >= cible) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <div
      role="group"
      aria-label={`Disponible prochainement, le ${libelleDate}`}
      className={`relative overflow-hidden ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none select-none opacity-50 grayscale">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="w-[125%] -rotate-6 bg-urgence py-1.5 text-center text-white shadow-lg">
          <p className="font-display text-base font-bold uppercase tracking-wider">
            Prochainement…
          </p>
          <p className="font-mono-num text-xs tabular-nums tracking-wide">
            {maintenant === null ? "Ouverture le " + libelleDate : decompte(cible - maintenant)}
          </p>
        </div>
      </div>
      <span className="sr-only">Disponible le {libelleDate}.</span>
    </div>
  );
}
