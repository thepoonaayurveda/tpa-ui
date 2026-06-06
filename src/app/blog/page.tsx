import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
import {
  buildBlogSchema,
  buildBreadcrumbSchema,
} from "@/lib/structuredData";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Ayurveda Blog: Joint Pain, Wellness & Herbal Guides | The Poona Ayurveda",
  description:
    "Honest, ingredient-led Ayurvedic guides on joint & knee pain relief, herbal oils, and everyday wellness from The Poona Ayurveda.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Ayurveda Blog | The Poona Ayurveda",
    description:
      "Honest, ingredient-led Ayurvedic guides on joint & knee pain relief, herbal oils, and everyday wellness.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "The Poona Ayurveda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda Blog | The Poona Ayurveda",
    description:
      "Honest, ingredient-led Ayurvedic guides on joint & knee pain relief, herbal oils, and everyday wellness.",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog", current: true },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildBlogSchema(posts),
          buildBreadcrumbSchema(
            breadcrumbItems.map(({ label, href }) => ({ label, href }))
          ),
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            The Poona Ayurveda Blog
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600 md:text-lg">
            Honest, ingredient-led Ayurvedic guides on joint &amp; knee pain
            relief, herbal oils, and everyday wellness. No hype, no cure-all
            claims, just what the tradition actually supports.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-lg font-medium text-gray-700">
              Fresh guides are on the way.
            </p>
            <p className="mt-2 text-gray-500">
              We&apos;re crafting honest Ayurvedic articles. In the meantime,
              explore our{" "}
              <Link href="/products" className="text-primary underline">
                wellness products
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-gray-600">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      {post.date && (
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "d MMM yyyy")}
                        </time>
                      )}
                      <span aria-hidden>·</span>
                      <span>{post.readingTimeMinutes} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
