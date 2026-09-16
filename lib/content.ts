import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ============================================================================
// LECTURE DE CONTENU MARKDOWN — actualités et fiches "Vos droits"
// ============================================================================
// Pour publier une actualité : ajouter un fichier .md dans /content/actualites
// Pour publier une fiche droit : ajouter un fichier .md dans /content/droits
// Pas de base de données : on commit, ça déploie.
// ============================================================================

const contentDir = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  titre: string;
  date?: string;
  resume?: string;
  categorie?: string;
  content: string;
}

export function getAllContent(dossier: "actualites" | "droits"): ContentMeta[] {
  const dirPath = path.join(contentDir, dossier);
  if (!fs.existsSync(dirPath)) return [];

  const fichiers = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

  const items = fichiers.map((fichier) => {
    const slug = fichier.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dirPath, fichier), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      titre: data.titre ?? slug,
      date: data.date,
      resume: data.resume,
      categorie: data.categorie,
      content,
    };
  });

  return items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getContentBySlug(
  dossier: "actualites" | "droits",
  slug: string
): ContentMeta | null {
  const filePath = path.join(contentDir, dossier, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    titre: data.titre ?? slug,
    date: data.date,
    resume: data.resume,
    categorie: data.categorie,
    content,
  };
}
