import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/providers/CartProvider";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

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
      <body className={roboto.variable}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
