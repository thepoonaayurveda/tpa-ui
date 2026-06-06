import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based blog: posts live as MDX in `src/content/blog/*.mdx`.
 *
 * Why MDX-in-repo (not WooCommerce posts): content is versioned and
 * code-reviewed alongside the rest of the site, statically rendered (fast
 * LCP), and we keep full control over heading structure, tables, and FAQ
 * blocks — the parseable structure the SEO strategy needs for Google rich
 * results and LLM citations. No CMS workflow for a solo founder to babysit.
 *
 * Each post's frontmatter is the single source of truth for its metadata
 * and structured data. Keep the shape in sync with `BlogPostMeta`.
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const MDX_EXT = ".mdx";

/** A single FAQ entry a post can declare in frontmatter (drives FAQPage schema). */
export type BlogFaq = { question: string; answer: string };

/** Frontmatter shape for a blog post. */
export type BlogPostMeta = {
  /** URL slug — defaults to the filename if omitted. */
  slug: string;
  /** Page <title> / H1 source. Keyword-led. */
  title: string;
  /** Meta description + listing excerpt. ~155 chars. */
  description: string;
  /** ISO date (YYYY-MM-DD) the post was published. */
  date: string;
  /** ISO date the post was last updated. Defaults to `date`. */
  updated?: string;
  /** Author name. Defaults to the brand. */
  author: string;
  /** Hero/OG image URL (absolute or WooCommerce-hosted). Optional. */
  image?: string;
  /** Primary keyword this post targets (internal note / not rendered). */
  keyword?: string;
  /** Product slug this post should drive toward (e.g. "flexio-oil"). */
  product?: string;
  /** Optional FAQ block → rendered + emitted as FAQPage schema. */
  faqs?: BlogFaq[];
  /** Set true to keep a post out of the index/sitemap (e.g. drafts). */
  draft?: boolean;
};

/** A post with its raw MDX body, ready to render. */
export type BlogPost = BlogPostMeta & {
  /** Raw MDX content (compile with next-mdx-remote at render time). */
  content: string;
  /** Reading time in minutes, derived from word count. */
  readingTimeMinutes: number;
};

const DEFAULT_AUTHOR = "The Poona Ayurveda";

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Normalize raw frontmatter into a fully-typed post (filling defaults). */
function toPost(fileSlug: string, raw: matter.GrayMatterFile<string>): BlogPost {
  const data = raw.data as Partial<BlogPostMeta>;
  const date = data.date ?? "";

  return {
    slug: data.slug?.trim() || fileSlug,
    title: data.title?.trim() || fileSlug,
    description: data.description?.trim() || "",
    date,
    updated: data.updated?.trim() || date,
    author: data.author?.trim() || DEFAULT_AUTHOR,
    image: data.image?.trim() || undefined,
    keyword: data.keyword?.trim() || undefined,
    product: data.product?.trim() || undefined,
    faqs: Array.isArray(data.faqs) ? data.faqs : undefined,
    draft: data.draft === true,
    content: raw.content,
    readingTimeMinutes: readingTime(raw.content),
  };
}

/** True once a content dir with at least one .mdx file exists. */
function blogDirExists(): boolean {
  return fs.existsSync(BLOG_DIR) && fs.statSync(BLOG_DIR).isDirectory();
}

/** All publishable posts, newest first. Drafts excluded. */
export function getAllPosts(): BlogPost[] {
  if (!blogDirExists()) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(MDX_EXT))
    .map((file) => {
      const fileSlug = file.slice(0, -MDX_EXT.length);
      const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      return toPost(fileSlug, matter(source));
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All slugs (for generateStaticParams). Drafts excluded. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/** A single post by slug, or null if missing/draft. */
export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}
