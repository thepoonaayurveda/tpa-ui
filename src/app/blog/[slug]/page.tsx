import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { makeMdxComponents } from "@/components/blog/MdxComponents";
import { BlogFaqs } from "@/components/blog/BlogFaqs";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { PostLayout } from "@/components/blog/PostLayout";
import { BuyCard } from "@/components/blog/BuyCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import {
  extractToc,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { getBlogProduct } from "@/lib/blogProducts";
import { Slugger } from "@/lib/slugify";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/structuredData";
import { SITE_URL } from "@/lib/siteUrl";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found | The Poona Ayurveda" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | The Poona Ayurveda`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      siteName: "The Poona Ayurveda",
      publishedTime: post.date || undefined,
      modifiedTime: post.updated || undefined,
      ...(post.image && { images: [{ url: post.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}`, current: true },
  ];

  const schemas: Record<string, unknown>[] = [
    buildBlogPostingSchema(post),
    buildBreadcrumbSchema(
      breadcrumbItems.map(({ label, href }) => ({ label, href }))
    ),
  ];
  if (post.faqs?.length) {
    schemas.push(buildFaqSchema(post.faqs));
  }

  const tocItems = extractToc(post.content);
  const relatedPosts = getRelatedPosts(post.slug);
  // One slugger per render: heading ids match the TOC anchors exactly.
  const mdxComponents = makeMdxComponents(new Slugger());
  const product = getBlogProduct(post.product);
  const buyCard = (
    <BuyCard
      slug={product.slug}
      name={product.name}
      tagline={product.tagline}
      price={product.price}
      pack={product.pack}
      image={product.image}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schemas} />
      <ReadingProgressBar />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{post.author}</span>
            {post.date && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>
                  {format(new Date(post.date), "d MMM yyyy")}
                </time>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </header>

        {post.image && (
          <div className="mb-10 max-w-3xl overflow-hidden rounded-xl bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="h-auto w-full"
              loading="eager"
            />
          </div>
        )}

        <PostLayout tocItems={tocItems} buyCard={buyCard}>
          <article>
            <div className="blog-content">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
            {post.faqs?.length ? <BlogFaqs faqs={post.faqs} /> : null}
            <RelatedPosts posts={relatedPosts} />
          </article>
        </PostLayout>
      </div>
    </div>
  );
}
