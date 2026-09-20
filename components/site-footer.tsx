import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { VisitCounter } from "@/components/visit-counter";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-slate text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">
              {siteConfig.nomCourt}
            </p>
            <p className="mt-2 text-sm text-paper/70">
              {siteConfig.nomLong}
            </p>
            <Image
              src="/logo/sud-fpa-epide.png"
              alt="SUD FPA — Solidaires"
              width={272}
              height={128}
              className="mt-4 h-32 w-auto"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">
              Naviguer
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/valeurs" className="hover:text-copper">Notre ligne</Link></li>
              <li><Link href="/qui-sommes-nous" className="hover:text-copper">Qui sommes-nous ?</Link></li>
              <li><Link href="/vos-droits" className="hover:text-copper">Vos droits</Link></li>
              <li><Link href="/outils" className="hover:text-copper">Outils & simulateurs</Link></li>
              <li><Link href="/adhesion" className="hover:text-copper">Adhérer</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-copper">Nous contacter</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.nomCourt}.
          </p>
          <div className="flex items-center gap-4">
            <VisitCounter />
            <Link href="/mentions-legales" className="hover:text-copper">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
