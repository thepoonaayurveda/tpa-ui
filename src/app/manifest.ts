import type { MetadataRoute } from "next";

/**
 * Web app manifest — drives Android home-screen / PWA install icons
 * and theme colors. Icons live in /public.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Poona Ayurveda",
    short_name: "Poona Ayurveda",
    description:
      "Authentic Ayurvedic wellness products — herbal oils, tablets, and choornam.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2f7d7b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
