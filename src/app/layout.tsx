import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Poona Ayurveda - Authentic Ayurvedic Products",
  description:
    "Making wellness accessible, convenient, and sustainable for everyone through authentic Ayurvedic products.",
  keywords:
    "ayurveda, ayurvedic products, wellness, natural remedies, herbs, oils, tablets",
  authors: [{ name: "The Poona Ayurveda" }],
  openGraph: {
    title: "The Poona Ayurveda - Authentic Ayurvedic Products",
    description:
      "Making wellness accessible, convenient, and sustainable for everyone.",
    url: "https://thepoonaayurveda.com",
    siteName: "The Poona Ayurveda",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
