"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { Logo } from "@/components/ui/Logo";
import { useCartStore } from "@/store/cartStore";
import { CartTray } from "@/components/cart/CartTray";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
];

function CartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleCartClick = () => {
    if (isMobile) {
      router.push("/cart");
    } else {
      toggleCart();
    }
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative text-gray-text hover:text-primary transition-colors"
    >
      <ShoppingBagIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top announcement bar */}
        <div className="bg-primary-dark text-white py-2 px-4 text-center text-sm">
          Get Authentic Ayurvedic Treatment Today! |{" "}
          <a
            href="https://wa.me/919730005222?text=I%27m%20interested%20to%20get%20ayurveda%20consultation%20from%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200 transition-colors"
          >
            Book FREE Consultation
          </a>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand Name - Centered */}
          <div className="flex justify-center py-4 border-b border-gray-100">
            <Link href="/" className="flex flex-col items-center space-y-2">
              <Logo />
              <h1 className="text-xl uppercase tracking-wide text-gray-900">
                The Poona Ayurveda
              </h1>
            </Link>
          </div>

          {/* Navigation and Icons */}
          <div className="relative flex h-14 items-center">
            {/* Desktop Navigation - Absolutely centered */}
            <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-text hover:text-primary px-3 py-2 text-md font-medium transition-colors font-nav"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Search - Hidden */}
              <button className="hidden text-gray-text hover:text-primary transition-colors">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {/* User Account - Hidden */}
              <button className="hidden text-gray-text hover:text-primary transition-colors">
                <UserIcon className="h-6 w-6" />
              </button>

              {/* Cart - Client Only */}
              <ClientOnly
                fallback={
                  <button className="relative text-gray-text hover:text-primary transition-colors">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </button>
                }
              >
                <CartButton />
              </ClientOnly>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-text hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-text hover:text-primary px-3 py-2 text-base font-medium transition-colors font-nav"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Tray - only show on desktop */}
      <ClientOnly>
        <CartTray />
      </ClientOnly>
    </>
  );
}
