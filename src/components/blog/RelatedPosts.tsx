import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

/**
 * "Keep reading" block at the foot of an article: 2-3 related guides.
 *
 * Deliberately related *articles*, not products — the sidebar BuyCard and the
 * in-content ProductCTA already carry the single buy path. This block's job is
 * to keep a finished reader inside our content (lower bounce, more topical
 * authority) and warm them further before they buy, not to turn the blog into
 * a storefront. Renders nothing when there are no related posts to show.
 */
export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Keep reading</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold leading-snug text-gray-900 group-hover:text-primary">
                  {post.title}
                </h3>
                <span className="mt-3 text-sm font-medium text-primary">
                  Read guide →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
