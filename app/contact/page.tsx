import { ContactForm } from "@/components/contact-form";
import { MapPin, MessageSquare } from "lucide-react";

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
        Par le formulaire ci-dessous, ou en personne dans votre centre. Pas de
        standard téléphonique anonyme.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        <div className="bg-paper-raised p-7">
          <MessageSquare size={22} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Écrivez-nous
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Réponse sous 48h ouvrées.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
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
