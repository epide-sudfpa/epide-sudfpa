"use client";

import { useState, useMemo } from "react";

// ============================================================================
// SIMULATEUR DE PRIME DE FIN D'ANNÉE
// ============================================================================
// NOTE IMPORTANTE : Les montants et règles ci-dessous sont des PLACEHOLDERS
// à remplacer par les barèmes réels EPIDE avant mise en ligne. La logique de
// calcul (structure, étapes, présentation) est prête ; seules les valeurs
// numériques doivent être vérifiées et injectées.
// ============================================================================

const CATEGORIES = [
  { id: "cat1", label: "Catégorie 1 (cadre)", base: 1200 },
  { id: "cat2", label: "Catégorie 2", base: 950 },
  { id: "cat3", label: "Catégorie 3", base: 750 },
] as const;

function formatEuros(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SimulateurPrimes() {
  const [categorie, setCategorie] = useState<string>(CATEGORIES[0].id);
  const [anciennete, setAnciennete] = useState(2);
  const [tempsPartiel, setTempsPartiel] = useState(100);

  const result = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === categorie) ?? CATEGORIES[0];
    const majorationAnciennete = Math.min(anciennete * 0.02, 0.2); // +2%/an, plafonné à 20%
    const montantAvantTemps = cat.base * (1 + majorationAnciennete);
    const montantFinal = montantAvantTemps * (tempsPartiel / 100);

    return {
      base: cat.base,
      majorationAnciennete,
      montantAvantTemps,
      montantFinal,
    };
  }, [categorie, anciennete, tempsPartiel]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Formulaire */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-ink">
            Catégorie d&apos;emploi
          </label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="mt-2 w-full rounded-sm border border-line bg-paper-raised px-4 py-3 text-sm text-ink focus:border-copper"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink">
            Ancienneté : {anciennete} an{anciennete > 1 ? "s" : ""}
          </label>
          <input
            type="range"
            min={0}
            max={20}
            value={anciennete}
            onChange={(e) => setAnciennete(Number(e.target.value))}
            className="mt-3 w-full accent-copper"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-soft">
            <span>0 an</span>
            <span>20 ans</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink">
            Quotité de temps de travail : {tempsPartiel}%
          </label>
          <input
            type="range"
            min={50}
            max={100}
            step={10}
            value={tempsPartiel}
            onChange={(e) => setTempsPartiel(Number(e.target.value))}
            className="mt-3 w-full accent-copper"
          />
        </div>
      </div>

      {/* Résultat — détail des étapes de calcul, pas juste le total */}
      <div className="rounded-sm border border-line bg-paper-raised p-7">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Détail du calcul
        </p>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <dt className="text-ink-soft">Montant de base</dt>
            <dd className="font-mono-num text-ink">{formatEuros(result.base)}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-3">
            <dt className="text-ink-soft">Majoration ancienneté</dt>
            <dd className="font-mono-num text-ink">
              +{(result.majorationAnciennete * 100).toFixed(0)}%
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-3">
            <dt className="text-ink-soft">Avant proratisation</dt>
            <dd className="font-mono-num text-ink">
              {formatEuros(result.montantAvantTemps)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-3">
            <dt className="text-ink-soft">Quotité de temps</dt>
            <dd className="font-mono-num text-ink">{tempsPartiel}%</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-sm bg-moss-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-moss">
            Estimation
          </p>
          <p className="mt-1 font-mono-num text-3xl font-semibold text-ink">
            {formatEuros(result.montantFinal)}
          </p>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-ink-soft">
          Cette estimation est indicative. Le montant réel dépend du barème
          en vigueur et de votre situation individuelle. En cas d&apos;écart
          avec votre fiche de paie, contactez-nous.
        </p>
      </div>
    </div>
  );
}
