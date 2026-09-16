import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllContent("droits").map((d) => ({ slug: d.slug }));
}

export default async function FicheDroitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fiche = getContentBySlug("droits", slug);

  if (!fiche) notFound();

  const html = await marked.parse(fiche.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/vos-droits"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-slate"
      >
        <ArrowLeft size={15} />
        Toutes les fiches
      </Link>

      {fiche.categorie && (
        <p className="mt-6 font-mono-num text-xs uppercase tracking-wide text-copper">
          {fiche.categorie}
        </p>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        {fiche.titre}
      </h1>

      <div
        className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-slate"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
