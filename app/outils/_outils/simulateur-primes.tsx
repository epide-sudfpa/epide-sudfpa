"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Copy, FileDown } from "lucide-react";

// ============================================================================
// SIMULATEUR DE PRIME INDIVIDUELLE — port fidèle du fichier HTML original
// (simulateur-prime.html) fourni par Lolo, vibe-codé avant l'intégration au
// site. Logique de calcul, libellés et infobulles reprises à l'identique.
//
// Note : le fichier original comportait un "mode avancé" (proratisation en
// cas de changement d'indice en cours d'année) dont le contrôle d'activation
// était masqué en dur dans le HTML (display:none, jamais réactivé ailleurs
// dans le code) — donc inatteignable pour l'utilisateur final. Ce port ne
// reprend que le comportement réellement accessible dans la version fournie.
// Le champ "indice de référence" est conservé : il n'entre plus dans le
// calcul affiché, mais reste utile dans le mail généré (traçabilité de
// l'avenant).
// ============================================================================

function euros(v: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);
}

function pct(v: number) {
  return (
    v.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " %"
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "non renseignée";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function SimulateurPrimes() {
  const [taux, setTaux] = useState("");
  const [primeRecue, setPrimeRecue] = useState("");
  const [indiceRef, setIndiceRef] = useState("");
  const [indiceActuel, setIndiceActuel] = useState("");
  const [point, setPoint] = useState("4.92");
  const [dateAvenant, setDateAvenant] = useState("");

  const [erreur, setErreur] = useState("");
  const [resultat, setResultat] = useState<{
    mensuel: number;
    annuel: number;
    primeTheo: number;
    ecart: number;
  } | null>(null);
  const [copie, setCopie] = useState(false);

  function calculer() {
    const t = parseFloat(taux);
    const pr = parseFloat(primeRecue);
    const ia = parseFloat(indiceActuel);
    const pt = parseFloat(point);

    if ([t, pr, ia, pt].some((v) => isNaN(v) || v <= 0)) {
      setErreur(
        "Veuillez renseigner tous les champs numériques obligatoires (taux, prime reçue, indice actuel, valeur du point)."
      );
      setResultat(null);
      return;
    }
    setErreur("");

    const mensuel = ia * pt;
    const annuel = mensuel * 12;
    const primeTheo = annuel * (t / 100);
    const ecart = primeTheo - pr;

    setResultat({ mensuel, annuel, primeTheo, ecart });
    setCopie(false);
  }

  function reinitialiser() {
    setTaux("");
    setPrimeRecue("");
    setIndiceRef("");
    setIndiceActuel("");
    setPoint("4.92");
    setDateAvenant("");
    setErreur("");
    setResultat(null);
  }

  const mailGenere = resultat
    ? `Objet : Demande de vérification du calcul de ma prime individuelle

Bonjour,

Après vérification du montant de ma prime individuelle, il apparaît qu'une différence existe entre le montant perçu et le montant qui résulterait d'un calcul effectué sur la base de mon indice majoré actuel.

Selon les informations en ma possession :

  • Taux de prime : ${pct(parseFloat(taux))}
  • Indice majoré de référence (avenant) : ${indiceRef || "non renseigné"}
  • Indice majoré actuel : ${indiceActuel}
  • Date d'effet de l'avenant : ${formatDate(dateAvenant)}

Le montant versé est de ${euros(parseFloat(primeRecue))} bruts, tandis que le montant calculé sur la base de mon indice actuel serait de ${euros(resultat.primeTheo)} bruts.

L'écart constaté est de ${resultat.ecart >= 0 ? "+" : ""}${euros(resultat.ecart)} bruts.

Je vous remercie de bien vouloir vérifier les modalités de calcul retenues et de me préciser si une régularisation est nécessaire.

Cordialement,

[Prénom NOM]`
    : "";

  async function copierMail() {
    try {
      await navigator.clipboard.writeText(mailGenere);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      // échec silencieux — le texte reste sélectionnable manuellement
    }
  }

  // jsPDF (police Helvetica de base) n'affiche pas correctement l'espace
  // insécable fine (U+202F) utilisée par Intl.NumberFormat pour les milliers
  // en français — elle apparaît comme un caractère erroné (ex. "3 /800").
  // On la remplace par un espace normal uniquement pour le texte injecté
  // dans le PDF, sans toucher à l'affichage à l'écran (qui rend correctement
  // cette espace fine).
  function pourPdf(s: string) {
    return s.replace(/[\u202F\u00A0]/g, " ");
  }

  async function exporterPDF() {
    if (!resultat) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const L = 15;
    const R = 195;
    let y = 22;

    // Bandeau titre — accent copper du site, pas le rouge officiel EPIDE
    doc.setFillColor(184, 118, 46);
    doc.rect(0, 0, 210, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Simulateur de prime individuelle — Résultat de simulation", L, 9);

    doc.setTextColor(50, 50, 50);

    function line(label: string, val: string) {
      doc.setFont("helvetica", "bold");
      doc.text(label, L, y);
      doc.setFont("helvetica", "normal");
      doc.text(pourPdf(val), 80, y);
      y += 6;
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Données saisies", L, y);
    y += 6;
    doc.setFontSize(9);
    line("Taux de prime :", `${taux} %`);
    line("Prime reçue :", euros(parseFloat(primeRecue)));
    line("Indice de référence :", indiceRef || "—");
    line("Indice actuel :", indiceActuel);
    line("Valeur du point :", `${point} €`);
    line("Date d'avenant :", formatDate(dateAvenant));

    y += 4;
    doc.setDrawColor(180, 180, 180);
    doc.line(L, y, R, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Détail du calcul", L, y);
    y += 6;
    doc.setFontSize(9);
    line("Traitement mensuel brut :", euros(resultat.mensuel));
    line("Traitement annuel brut :", euros(resultat.annuel));
    line("Prime théorique :", euros(resultat.primeTheo));

    y += 2;
    if (Math.abs(resultat.ecart) >= 1) {
      doc.setTextColor(194, 65, 12);
      doc.setFont("helvetica", "bold");
      doc.text(
        pourPdf(`Écart constaté : ${resultat.ecart >= 0 ? "+" : ""}${euros(resultat.ecart)}`),
        L,
        y
      );
      y += 6;
      doc.setTextColor(50, 50, 50);
    } else {
      doc.setTextColor(22, 101, 52);
      doc.setFont("helvetica", "bold");
      doc.text("Résultat : prime cohérente avec les données saisies.", L, y);
      y += 6;
      doc.setTextColor(50, 50, 50);
    }

    if (Math.abs(resultat.ecart) >= 1 && mailGenere) {
      y += 2;
      doc.setDrawColor(180, 180, 180);
      doc.line(L, y, R, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Brouillon de demande de vérification", L, y);
      y += 6;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const lignes = doc.splitTextToSize(pourPdf(mailGenere), R - L);
      lignes.forEach((l: string) => {
        if (y > 280) {
          doc.addPage();
          y = 15;
        }
        doc.text(l, L, y);
        y += 4.5;
      });
    }

    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(L, y, R, y);
    y += 5;
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    const avert =
      "Cette simulation est fournie à titre indicatif. Une différence constatée ne signifie pas nécessairement qu'une erreur a été commise. Les modalités exactes de calcul dépendent du contrat de travail, des décisions de l'employeur et des règles internes applicables.";
    const aLignes = doc.splitTextToSize(avert, R - L);
    aLignes.forEach((l: string) => {
      doc.text(l, L, y);
      y += 4;
    });

    doc.save("simulation-prime-individuelle.pdf");
  }

  const champClass =
    "mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-copper";
  const labelClass = "text-sm font-medium text-ink";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Formulaire */}
      <div className="space-y-5 rounded-sm border border-line bg-paper-raised p-6">
        <div>
          <label htmlFor="taux" className={labelClass}>
            Taux de prime attribué (%)
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            Ce taux vous a été indiqué dans le courrier qui vous a été remis
            par votre N+1.
          </p>
          <input
            id="taux"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex. : 17.5"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            className={champClass}
          />
        </div>

        <div>
          <label htmlFor="prime_recue" className={labelClass}>
            Prime reçue (€ brut)
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            Vous trouverez cette valeur sur votre bulletin de paie.
          </p>
          <input
            id="prime_recue"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex. : 4200.00"
            value={primeRecue}
            onChange={(e) => setPrimeRecue(e.target.value)}
            className={champClass}
          />
        </div>

        <div>
          <label htmlFor="indice_ref" className={labelClass}>
            Indice majoré de référence
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            L&apos;indice stipulé sur votre contrat ou avenant tel qu&apos;il
            était au 1er janvier de l&apos;année précédente.
          </p>
          <input
            id="indice_ref"
            type="number"
            step="1"
            min="1"
            placeholder="Ex. : 380"
            value={indiceRef}
            onChange={(e) => setIndiceRef(e.target.value)}
            className={champClass}
          />
        </div>

        <div>
          <label htmlFor="indice_actuel" className={labelClass}>
            Indice majoré actuel
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            L&apos;indice stipulé sur votre contrat ou avenant au moment du
            versement de la prime.
          </p>
          <input
            id="indice_actuel"
            type="number"
            step="1"
            min="1"
            placeholder="Ex. : 410"
            value={indiceActuel}
            onChange={(e) => setIndiceActuel(e.target.value)}
            className={champClass}
          />
        </div>

        <div>
          <label htmlFor="point" className={labelClass}>
            Valeur du point d&apos;indice (€)
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            Valeur officielle définie par décret, disponible sur les sites de
            la fonction publique.
          </p>
          <input
            id="point"
            type="number"
            step="0.00001"
            min="0"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            className={champClass}
          />
        </div>

        <div>
          <label htmlFor="date_avenant" className={labelClass}>
            Date d&apos;effet de l&apos;avenant
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            La date de signature du dernier avenant à votre contrat de
            travail.
          </p>
          <input
            id="date_avenant"
            type="date"
            value={dateAvenant}
            onChange={(e) => setDateAvenant(e.target.value)}
            className={champClass}
          />
        </div>

        {erreur && (
          <p className="flex items-start gap-2 text-sm text-urgence">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            {erreur}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculer}
            className="rounded-sm bg-slate px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-slate-soft"
          >
            Calculer
          </button>
          <button
            onClick={reinitialiser}
            className="rounded-sm border border-line px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Résultats */}
      <div className="space-y-6">
        {resultat && (
          <>
            <div className="rounded-sm border border-line bg-paper-raised p-6">
              <h2 className="font-display text-base font-semibold text-ink">
                Détail du calcul
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="text-ink-soft">
                    Traitement mensuel brut{" "}
                    <span className="font-mono-num text-xs">
                      ({indiceActuel} × {parseFloat(point).toFixed(5)})
                    </span>
                  </dt>
                  <dd className="font-mono-num font-semibold text-ink">
                    {euros(resultat.mensuel)}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="text-ink-soft">Traitement annuel brut</dt>
                  <dd className="font-mono-num font-semibold text-ink">
                    {euros(resultat.annuel)}
                  </dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="font-medium text-ink">Prime théorique</dt>
                  <dd className="font-mono-num text-base font-semibold text-copper">
                    {euros(resultat.primeTheo)}
                  </dd>
                </div>
              </dl>
            </div>

            {Math.abs(resultat.ecart) < 1 ? (
              <div className="flex items-center gap-3 rounded-sm border border-line bg-moss-soft p-5 text-sm text-ink">
                <CheckCircle2 size={22} className="shrink-0 text-moss" />
                Le montant de la prime semble cohérent avec les données
                saisies.
              </div>
            ) : (
              <div className="rounded-sm border border-urgence/30 bg-urgence/5 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-urgence">
                  <AlertTriangle size={18} />
                  Une différence a été constatée entre la prime calculée et
                  la prime versée.
                </p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Prime versée</dt>
                    <dd className="font-mono-num text-ink">
                      {euros(parseFloat(primeRecue))}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">
                      Prime théorique calculée
                    </dt>
                    <dd className="font-mono-num text-ink">
                      {euros(resultat.primeTheo)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-1.5 font-semibold">
                    <dt className="text-ink">Écart brut</dt>
                    <dd className="font-mono-num text-urgence">
                      {resultat.ecart >= 0 ? "+" : ""}
                      {euros(resultat.ecart)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 rounded-sm border border-line bg-paper p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Brouillon de mail à la DRH
                  </p>
                  <pre className="mt-2 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-ink-soft">
                    {mailGenere}
                  </pre>
                  <button
                    onClick={copierMail}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate hover:text-ink"
                  >
                    <Copy size={14} />
                    {copie ? "Copié !" : "Copier le mail"}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={exporterPDF}
              className="inline-flex items-center gap-2 rounded-sm border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-copper hover:text-copper"
            >
              <FileDown size={16} />
              Exporter en PDF
            </button>

            <p className="text-xs leading-relaxed text-ink-soft">
              Cette simulation est fournie à titre indicatif. Une différence
              constatée ne signifie pas nécessairement qu&apos;une erreur a
              été commise. Les modalités exactes de calcul dépendent du
              contrat de travail, des décisions de l&apos;employeur et des
              règles internes applicables.
            </p>
          </>
        )}

        {!resultat && !erreur && (
          <div className="flex h-full items-center justify-center rounded-sm border border-dashed border-line p-10 text-center text-sm text-ink-soft">
            Renseignez le formulaire puis cliquez sur « Calculer » pour voir
            le résultat de la simulation.
          </div>
        )}
      </div>
    </div>
  );
}
