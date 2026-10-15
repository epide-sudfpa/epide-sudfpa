"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { centres, getContactsCentre } from "@/lib/centres-registry";

const OBJET_MAIL = "[Confidentiel syndical]";

// L'adresse n'existe jamais en clair dans la page ni dans le code : elle est
// assemblée au clic, ce qui échappe aux robots qui collectent les "x@y.z".
function ecrire(mail: { local: string; domaine: string }) {
  window.location.href = `mailto:${mail.local}@${mail.domaine}?subject=${encodeURIComponent(OBJET_MAIL)}`;
}

export function CenterContactPicker() {
  const [centreChoisi, setCentreChoisi] = useState("");
  const contacts = centreChoisi ? getContactsCentre(centreChoisi) : [];

  return (
    <div>
      <label htmlFor="centre" className="text-sm font-medium text-ink">
        Votre centre
      </label>
      <select
        id="centre"
        value={centreChoisi}
        onChange={(e) => setCentreChoisi(e.target.value)}
        className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-copper"
      >
        <option value="">Choisir un centre…</option>
        {centres.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {centreChoisi && (
        <div className="mt-4 rounded-sm bg-paper p-4 text-sm">
          {contacts.length > 0 ? (
            <>
              <p className="font-medium text-ink">Contact(s) sur ce centre :</p>
              <ul className="mt-2 space-y-3">
                {contacts.map((c) => (
                  <li key={c.nom} className="text-ink-soft">
                    <span className="font-medium text-ink">{c.nom}</span>
                    <span className="block text-xs">{c.role}</span>
                    {c.mail && (
                      <button
                        type="button"
                        onClick={() => ecrire(c.mail!)}
                        className="mt-1 inline-flex items-center gap-1.5 text-copper underline underline-offset-2 hover:text-ink"
                      >
                        <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
                        Écrire à {c.nom}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {contacts.some((c) => c.mail) && (
                <p className="mt-3 text-xs text-ink-soft">
                  Le message s'ouvre dans votre messagerie avec l'objet
                  « {OBJET_MAIL} ».
                </p>
              )}
            </>
          ) : (
            <p className="text-ink-soft">
              Pas encore de contact désigné sur ce centre — écrivez-nous via
              le formulaire, nous vous orienterons.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
