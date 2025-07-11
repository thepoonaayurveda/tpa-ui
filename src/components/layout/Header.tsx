"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { useCartStore } from "@/store/cartStore";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function CartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={toggleCart}
      className="relative text-gray-700 hover:text-green-600 transition-colors"
    >
      <ShoppingBagIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-green-700 text-white py-2 px-4 text-center text-sm">
        Get Authentic Ayurvedic Treatment Today! | Book FREE Consultation
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  The Poona Ayurveda
                </h1>
                <p className="text-xs text-gray-600">
                  Authentic Ayurvedic Products
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-700 hover:text-green-600 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* User Account */}
            <button className="text-gray-700 hover:text-green-600 transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>

            {/* Cart - Client Only */}
            <ClientOnly
              fallback={
                <button className="relative text-gray-700 hover:text-green-600 transition-colors">
                  <ShoppingBagIcon className="h-6 w-6" />
                </button>
              }
            >
              <CartButton />
            </ClientOnly>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
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
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium transition-colors"
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
  );
}
