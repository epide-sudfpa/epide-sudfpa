"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

// ============================================================================
// POPUP DE CAMPAGNE — élections professionnelles du 3 décembre 2026
// ============================================================================
// S'affiche une seule fois par visiteur (localStorage), tant que la date du
// jour n'a pas dépassé la date des élections. Pas de date de début distincte
// de la date de lancement du site : le jour où SITE_LIVE passe à "true" EST
// le jour de lancement, donc la popup est simplement active dès que de vrais
// visiteurs arrivent sur le site, jusqu'aux élections.
// ============================================================================

const DATE_ELECTIONS = new Date("2026-12-03T00:00:00");
const STORAGE_KEY = "popup_campagne_2026_vu";

export function CampaignPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() > DATE_ELECTIONS) return;

    let dejaVu = false;
    try {
      dejaVu = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage indisponible (navigation privée, etc.) : on affiche quand même
    }
    if (!dejaVu) setVisible(true);
  }, []);

  function fermer() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // échec silencieux, sans conséquence
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={fermer}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-paper-raised p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={fermer}
          aria-label="Fermer"
          className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-ink"
        >
          <X size={20} />
        </button>

        <Image
          src="/campagne/we-need-you.png"
          alt="We need you !"
          width={400}
          height={533}
          className="mx-auto h-40 w-auto"
          priority
        />

        <p className="mt-6 text-center text-xl font-medium leading-relaxed text-ink sm:text-2xl">
          We need you ! Quelle que soit l&apos;utilité de notre site dans
          votre quotidien, cela reste de la com&apos;. Si vous voulez que
          l&apos;on puisse peser en votre nom sur les décisions majeures de
          l&apos;établissement, il faudra voter pour nous aux élections
          professionnelles du 3 décembre prochain ! Alors n&apos;hésitez
          plus : rejoignez-nous, adhérez et participez à notre projet 😎
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/adhesion"
            onClick={fermer}
            className="inline-flex items-center justify-center rounded-sm bg-urgence px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-urgence-soft"
          >
            Adhérer
          </Link>
          <button
            onClick={fermer}
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            Continuer sur le site
          </button>
        </div>
      </div>
    </div>
  );
}
