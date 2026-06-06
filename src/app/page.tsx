import type { Metadata } from "next";
import { AuthenticHeroSection } from "@/components/home/AuthenticHeroSection";
import { AuthenticProductGrid } from "@/components/home/AuthenticProductGrid";
import { VideoPopupSection } from "@/components/home/VideoPopupSection";
import { MissionSection } from "@/components/home/MissionSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { VideoGallerySection } from "@/components/home/VideoGallerySection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "The Poona Ayurveda: Authentic Ayurvedic Oils, Tablets & Wellness",
  description:
    "Shop authentic Ayurvedic products from The Poona Ayurveda: herbal joint-pain oils, tablets, and choornam crafted on traditional formulations. Made in India, COD available.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Poona Ayurveda: Authentic Ayurvedic Oils, Tablets & Wellness",
    description:
      "Authentic Ayurvedic products crafted on traditional formulations: herbal oils, tablets, and choornam. Made in India.",
    url: "/",
    siteName: "The Poona Ayurveda",
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <AuthenticHeroSection />
      <AuthenticProductGrid />
      <VideoPopupSection />
      <MissionSection />
      <TestimonialSection />
      <VideoGallerySection />
      <NewsletterSection />
    </div>
  );
}
