import { MapPin } from "lucide-react";
import { CenterContactPicker } from "@/components/center-contact-picker";

// Formulaire Google Forms existant, réutilisé en attendant l'achat d'un nom
// de domaine propre (nécessaire pour un envoi d'email fiable depuis le site).
// Solution de transition, assumée comme telle — facilement remplaçable par
// le formulaire natif (voir components/contact-form.tsx, toujours en place)
// le jour où ce choix est reconsidéré.
const GOOGLE_FORM_ID = "1FAIpQLSexdR85lHTB2GyF_cLq8ZDopOq4wnh1tuEeycgFoVtK8JiFWA";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono-num text-xs font-semibold uppercase tracking-widest text-copper">
        Contact
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Nous contacter
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Par le formulaire ci-dessous, ou en repérant votre contact en centre.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-sm border border-line bg-paper-raised shadow-sm lg:col-span-2">
          <iframe
            src={`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?embedded=true`}
            title="Formulaire de contact SUD FPA EPIDE"
            className="block w-full"
            height={920}
            loading="lazy"
          >
            Chargement du formulaire…
          </iframe>
        </div>

        <div className="rounded-sm border border-line bg-paper-raised p-6">
          <MapPin size={20} className="text-copper" strokeWidth={1.75} />
          <h2 className="mt-3 font-display text-lg font-semibold text-ink">
            En centre
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Sélectionnez votre centre pour voir vos contacts locaux, au fur
            et à mesure de leur désignation.
          </p>
          <div className="mt-5">
            <CenterContactPicker />
          </div>
        </div>
      </div>
    </div>
  );
}
