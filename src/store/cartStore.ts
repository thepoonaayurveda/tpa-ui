"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        ),
      });
    } else {
      set({
        items: [...items, { ...item, quantity }],
      });
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));

// Custom hook for cart with localStorage persistence (client-only)
export function useCartWithPersistence() {
  const store = useCartStore();

  // Load from localStorage on client-side only
  useEffect(() => {
    const stored = localStorage.getItem("poona-ayurveda-cart");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.items) {
          // Restore items to store
          data.items.forEach((item: CartItem) => {
            store.addItem(item, item.quantity);
          });
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(
      "poona-ayurveda-cart",
      JSON.stringify({
        items: store.items,
      })
    );
  }, [store.items]);

  return store;
}
