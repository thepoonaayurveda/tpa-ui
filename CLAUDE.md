# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 14 e-commerce application for "The Poona Ayurveda" built with TypeScript and Tailwind CSS. The app uses the App Router architecture and integrates with WooCommerce as the backend.

### Key Technologies
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with Headless UI components
- **State Management**: Zustand for cart state with localStorage persistence
- **Data Fetching**: SWR for client-side caching, WooCommerce REST API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Heroicons v2

### Directory Structure
- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable UI components organized by feature
  - `home/` - Homepage components (HeroSection, FeaturedProducts)
  - `layout/` - Layout components (Header, Footer)
  - `product/` - Product-related components (ProductCard, ProductGallery, etc.)
  - `ui/` - Generic UI components (Breadcrumb, ClientOnly)
- `src/lib/` - Core utilities and API functions
  - `woocommerce.ts` - WooCommerce API integration
  - `types.ts` - TypeScript type definitions
  - `utils.ts` - Utility functions
- `src/store/` - Zustand state management
- `src/hooks/` - Custom React hooks

### WooCommerce Integration
The app connects to a WooCommerce backend using the REST API. Key API functions in `src/lib/woocommerce.ts`:
- `getProducts()` - Fetch products with optional parameters
- `getProduct(id)` - Fetch single product by ID
- `getProductBySlug(slug)` - Fetch product by slug for dynamic routes
- `getCategories()` - Fetch product categories

Environment variables required:
- `NEXT_PUBLIC_WC_URL` - WooCommerce site URL
- `WC_CONSUMER_KEY` - WooCommerce API consumer key
- `WC_CONSUMER_SECRET` - WooCommerce API consumer secret

### State Management
Uses Zustand for cart state management with localStorage persistence. The cart store (`src/store/cartStore.ts`) handles:
- Adding/removing items
- Updating quantities
- Calculating totals
- Persistence across browser sessions

### Image Optimization
Next.js Image component is configured to work with WooCommerce uploads from `thepoonaayurveda.com` domain. Remote patterns are defined in `next.config.ts`.

### Type Safety
Comprehensive TypeScript types defined in `src/lib/types.ts` for WooCommerce entities (Product, Category, CartItem, etc.).