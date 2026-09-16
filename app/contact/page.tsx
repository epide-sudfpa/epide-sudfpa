import { siteConfig } from "@/lib/config";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Nous rencontrer
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Nous contacter
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Par email, ou en personne dans votre centre. Pas de standard
        téléphonique anonyme.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        <div className="bg-paper-raised p-7">
          <Mail size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Par email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Réponse sous 48h ouvrées.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block text-sm font-semibold text-slate underline"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="bg-paper-raised p-7">
          <MapPin size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            En centre
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            La liste des contacts par centre sera mise à jour au fur et à
            mesure de la constitution du bureau.
          </p>
        </div>
      </div>
    </div>
  );
}
