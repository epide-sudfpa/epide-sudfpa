import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllContent("actualites").map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getContentBySlug("actualites", slug);

  if (!article) notFound();

  const html = await marked.parse(article.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/actualites"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-slate"
      >
        <ArrowLeft size={15} />
        Toutes les actualités
      </Link>

      {article.date && (
        <p className="mt-6 font-mono-num text-xs text-ink-soft">
          {new Date(article.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        {article.titre}
      </h1>

      <div
        className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-slate"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
