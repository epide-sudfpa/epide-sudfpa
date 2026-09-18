"use client";

import { useEffect, useState } from "react";

// Compteur discret pour le footer. Une seule incrémentation par session
// (sessionStorage, pas de cookie) pour ne pas compter plusieurs fois la
// même visite en naviguant entre les pages. Rendu invisible si la donnée
// n'est pas disponible (KV non configuré, erreur réseau) — jamais de layout
// shift ni d'erreur visible.
export function VisitCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const dejaCompte = sessionStorage.getItem("visite_comptee");

    fetch("/api/compteur", { method: dejaCompte ? "GET" : "POST" })
      .then((res) => res.json())
      .then((data: { total: number | null }) => {
        if (typeof data.total === "number") setTotal(data.total);
        sessionStorage.setItem("visite_comptee", "1");
      })
      .catch(() => {
        // échec silencieux : le compteur ne doit jamais perturber la page
      });
  }, []);

  if (total === null) return null;

  return <span>{total.toLocaleString("fr-FR")} visites</span>;
}
