import { Children, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Slugger, stripMarkdown } from "@/lib/slugify";
import { withBlogUtm } from "@/lib/utm";

/** Flatten React children of a heading down to its plain text. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/**
 * Styled elements for MDX blog content. Tailwind's typography plugin isn't
 * installed, so we style the common markdown elements by hand — keeps the
 * dependency surface small and the look consistent with the rest of the site.
 *
 * This is a factory: it takes a per-render `Slugger` so each <h2>/<h3> gets
 * an `id` matching the table of contents (built with the same slugger). One
 * slugger instance per article keeps duplicate-heading ids in sync with the
 * TOC. Custom components (ProductCTA) are exposed so posts can drop them
 * inline, e.g. <ProductCTA slug="flexio-oil" />.
 */
export function makeMdxComponents(slugger: Slugger): MDXComponents {
  return {
  h2: ({ children, ...props }) => (
    <h2
      id={slugger.slug(stripMarkdown(textOf(children)))}
      className="mt-12 mb-4 text-2xl md:text-3xl font-bold text-gray-900 scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      id={slugger.slug(stripMarkdown(textOf(children)))}
      className="mt-8 mb-3 text-xl md:text-2xl font-semibold text-gray-900 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props) => (
    <p className="mb-5 text-base md:text-lg leading-relaxed text-gray-700" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-5 ml-5 list-disc space-y-2 text-base md:text-lg text-gray-700" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-5 ml-5 list-decimal space-y-2 text-base md:text-lg text-gray-700" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ href = "#", ...props }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={withBlogUtm(href)}
          className="text-primary font-medium underline underline-offset-2 hover:text-primary-dark"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        className="text-primary font-medium underline underline-offset-2 hover:text-primary-dark"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-primary bg-primary/5 px-5 py-3 text-gray-700 italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
  hr: () => <hr className="my-10 border-gray-200" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm md:text-base" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  th: (props) => (
    <th className="border border-gray-200 px-4 py-2 font-semibold text-gray-900" {...props} />
  ),
  td: (props) => <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props} />,
  img: ({ src = "", alt = "" }) => (
    <span className="my-6 block overflow-hidden rounded-lg">
      {/* Posts may reference WooCommerce-hosted images; plain <img> keeps
          MDX authoring simple (next/image needs known dimensions). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
    </span>
  ),
  // Custom components available inside MDX:
  ProductCTA,
  };
}

/**
 * In-content call-to-action card driving to a product page.
 * Defaults to Flexio Oil (our P1 commercial target). Pass `slug`,
 * `name`, and `blurb` to point at a different product.
 */
export function ProductCTA({
  slug = "flexio-oil",
  name = "Flexio Oil",
  blurb = "Ayurvedic joint & knee pain oil with Nirgundi. Formulated, ready to use.",
  image = "https://api.thepoonaayurveda.com/wp-content/uploads/2025/01/Frame-64-1.png",
}: {
  slug?: string;
  name?: string;
  blurb?: string;
  image?: string;
}) {
  return (
    <aside className="my-10 flex flex-col items-center gap-5 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:p-7">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white">
        <Image src={image} alt={name} fill sizes="96px" className="object-contain p-2" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          Recommended product
        </p>
        <p className="mt-1 text-lg font-bold text-gray-900">{name}</p>
        <p className="mt-1 text-sm text-gray-600">{blurb}</p>
      </div>
      <Link
        href={withBlogUtm(`/products/${slug}`)}
        className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        View {name}
      </Link>
    </aside>
  );
}
