import Image from "next/image";
import Link from "next/link";
import { withBlogUtm } from "@/lib/utm";

/**
 * Persistent product buy card shown in the blog sidebar (sticky on desktop)
 * and inline once on mobile. Trust-led, not pushy: image, name, price, a
 * clear Buy action to the product page, and the India practicalities buyers
 * look for (secure checkout, made in India). Defaults to Flexio Oil, the joint-cluster
 * target; pass props to point a post at a different product.
 */
export function BuyCard({
  slug = "flexio-oil",
  name = "Flexio Oil",
  tagline = "Ayurvedic Joint & Muscle Pain Oil with Nirgundi",
  price = "₹390",
  pack = "100ml",
  image = "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172.png",
}: {
  slug?: string;
  name?: string;
  tagline?: string;
  price?: string;
  pack?: string;
  image?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <Link
        href={withBlogUtm(`/products/${slug}`)}
        className="block bg-gradient-to-b from-primary/5 to-white"
        aria-label={`View ${name}`}
      >
        <div className="relative mx-auto aspect-square w-full max-w-[180px]">
          <Image
            src={image}
            alt={`${name} ${pack} bottle`}
            fill
            sizes="180px"
            className="object-contain p-4"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link
          href={withBlogUtm(`/products/${slug}`)}
          className="block text-[15px] font-bold leading-tight text-gray-900 no-underline hover:text-primary"
        >
          {name}
        </Link>
        <p className="mt-1 text-[12px] leading-snug text-gray-500">{tagline}</p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          <span className="text-[12px] text-gray-400">/ {pack}</span>
        </div>

        <Link
          href={withBlogUtm(`/products/${slug}`)}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-dark"
        >
          Buy Now
        </Link>

        <p className="mt-2.5 text-center text-[11px] leading-snug text-gray-400">
          Secure prepaid checkout · Ships across India 🇮🇳
        </p>
      </div>
    </div>
  );
}
