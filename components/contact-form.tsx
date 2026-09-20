"use client";

import { useState, type FormEvent } from "react";

type Statut = "idle" | "envoi" | "succes" | "erreur";

export function ContactForm() {
  const [statut, setStatut] = useState<Statut>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatut("envoi");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nom: formData.get("nom"),
      email: formData.get("email"),
      message: formData.get("message"),
      site_web: formData.get("site_web"), // honeypot, doit rester vide
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("échec");
      setStatut("succes");
      e.currentTarget.reset();
    } catch {
      setStatut("erreur");
    }
  }

  if (statut === "succes") {
    return (
      <div className="rounded-sm border border-line bg-moss-soft p-6 text-sm text-ink">
        Message bien reçu — réponse sous 48h ouvrées.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot anti-spam : invisible pour un humain, souvent rempli par un bot */}
      <input
        type="text"
        name="site_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nom" className="text-sm font-medium text-ink">
          Nom <span className="text-ink-soft">(optionnel)</span>
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-copper"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email <span className="text-ink-soft">(pour vous répondre)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-copper"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-copper"
        />
      </div>

      <button
        type="submit"
        disabled={statut === "envoi"}
        className="rounded-sm bg-slate px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-slate-soft disabled:opacity-60"
      >
        {statut === "envoi" ? "Envoi…" : "Envoyer"}
      </button>

      {statut === "erreur" && (
        <p className="text-sm text-urgence">
          Le message n&apos;a pas pu être envoyé — réessayez dans un instant.
        </p>
      )}
    </form>
  );
}
