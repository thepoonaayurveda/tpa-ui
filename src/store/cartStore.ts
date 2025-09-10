"use client";

import { create } from "zustand";
import { CartItem, AppliedCoupon } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: AppliedCoupon | null;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getDiscountedTotal: () => number;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
}

const CART_STORAGE_KEY = "poona-ayurveda-cart";

// Helper function to load from localStorage
const loadFromStorage = () => {
  if (typeof window === 'undefined') return { items: [], appliedCoupon: null };
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        items: data.items || [],
        appliedCoupon: data.appliedCoupon || null,
      };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  
  return { items: [], appliedCoupon: null };
};

// Helper function to save to localStorage
const saveToStorage = (items: CartItem[], appliedCoupon: AppliedCoupon | null) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      items,
      appliedCoupon,
    }));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Create store with persistence support
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  appliedCoupon: null,

    addItem: (item, quantity = 1) => {
      const items = get().items;
      const existingItem = items.find((i) => i.id === item.id);

      let newItems;
      if (existingItem) {
        newItems = items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newItems = [...items, { ...item, quantity }];
      }
      
      set({ items: newItems });
      saveToStorage(newItems, get().appliedCoupon);
    },

    removeItem: (id) => {
      const newItems = get().items.filter((item) => item.id !== id);
      set({ items: newItems });
      saveToStorage(newItems, get().appliedCoupon);
    },

    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        get().removeItem(id);
        return;
      }

      const newItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ items: newItems });
      saveToStorage(newItems, get().appliedCoupon);
    },

    clearCart: () => {
      set({ items: [], appliedCoupon: null });
      saveToStorage([], null);
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

    getSubtotal: () => {
      return get().getTotalPrice();
    },

    getDiscount: () => {
      const appliedCoupon = get().appliedCoupon;
      return appliedCoupon ? appliedCoupon.discount : 0;
    },

    getDiscountedTotal: () => {
      const subtotal = get().getSubtotal();
      const discount = get().getDiscount();
      return Math.max(subtotal - discount, 0);
    },

    applyCoupon: (coupon: AppliedCoupon) => {
      set({ appliedCoupon: coupon });
      saveToStorage(get().items, coupon);
    },

    removeCoupon: () => {
      set({ appliedCoupon: null });
      saveToStorage(get().items, null);
    },
}));

// Initialize cart from localStorage (call once on app start)
export const initializeCart = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.items || data.appliedCoupon) {
        useCartStore.setState({
          items: data.items || [],
          appliedCoupon: data.appliedCoupon || null,
        });
      }
    }
  } catch (error) {
    console.error("Error initializing cart from localStorage:", error);
  }
};
