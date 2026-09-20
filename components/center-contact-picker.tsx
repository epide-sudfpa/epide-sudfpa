"use client";

import { useState } from "react";
import { centres, getContactsCentre } from "@/lib/centres-registry";

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
              <ul className="mt-1 space-y-0.5 text-ink-soft">
                {contacts.map((nom) => (
                  <li key={nom}>{nom}</li>
                ))}
              </ul>
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
