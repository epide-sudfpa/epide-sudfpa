import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/valeurs", label: "Notre ligne" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous ?" },
  { href: "/actualites", label: "Actualités" },
  { href: "/vos-droits", label: "Vos droits" },
  { href: "/outils", label: "Outils & simulateurs" },
  { href: "/contact", label: "Nous contacter" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo/sud-fpa-epide.png"
              alt="SUD FPA — Solidaires"
              width={85}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-slate"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/adhesion"
            className="hidden rounded-sm bg-urgence px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-urgence-soft sm:inline-block"
          >
            Adhérer
          </Link>
        </div>

        {/* Navigation mobile — liste simple, pas de menu burger animé */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft hover:text-slate"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/adhesion"
            className="text-sm font-semibold text-urgence"
          >
            Adhérer
          </Link>
        </nav>
      </div>
    </header>
  );
}
