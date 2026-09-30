import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllContent("guides")
    .filter((g) => g.disponible)
    .map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getContentBySlug("guides", slug);

  if (!guide || !guide.disponible) notFound();

  const html = await marked.parse(guide.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-slate"
      >
        <ArrowLeft size={15} />
        Tous les guides
      </Link>

      {guide.categorie && (
        <p className="mt-6 font-mono-num text-xs uppercase tracking-wide text-copper">
          {guide.categorie}
        </p>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        {guide.titre}
      </h1>

      <div
        className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-slate"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
