"use client";

import { useEffect } from "react";
import { initializeCart } from "@/store/cartStore";

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  useEffect(() => {
    // Initialize cart from localStorage once when app starts
    initializeCart();
  }, []);

  return <>{children}</>;
}