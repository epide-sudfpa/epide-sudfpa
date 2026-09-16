import { siteConfig } from "@/lib/config";

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Mentions légales
      </h1>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-base font-semibold text-ink">
            Éditeur du site
          </h2>
          <p className="mt-2">
            {siteConfig.nomLong}
            {siteConfig.mentionsLegales.adresseSiege && (
              <> — {siteConfig.mentionsLegales.adresseSiege}</>
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink">
            Directeur de publication
          </h2>
          <p className="mt-2">
            {siteConfig.mentionsLegales.directeurPublication || "À compléter"}
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink">
            Hébergement
          </h2>
          <p className="mt-2">{siteConfig.mentionsLegales.hebergeur}</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink">
            Contact
          </h2>
          <p className="mt-2">{siteConfig.email}</p>
        </section>
      </div>
    </div>
  );
}
