"use client";

import { useState } from "react";
import { CheckIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: any;
}

function AddToCartButton({
  product,
  quantity,
}: {
  product: any;
  quantity: number;
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images?.[0]?.src || "",
        slug: product.slug,
      },
      quantity
    );

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      {showSuccess && (
        <div
          className="bg-green-50 border border-primary text-primary-dark px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">
            ✅ Product added to cart successfully!
          </span>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        Add to Cart
      </button>
    </>
  );
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const isOnSale = product.on_sale;
  const inStock = product.stock_status === "instock";
  const averageRating = parseFloat(product.average_rating) || 0;

  // Extract benefits based on product name
  const getBenefits = (productName: string) => {
    if (productName.toLowerCase().includes("flexio")) {
      return [
        "Muscle spasms and pain relief",
        "Joint pain management",
        "Joint stiffness reduction",
      ];
    }
    if (productName.toLowerCase().includes("sports edge")) {
      return [
        "Improve physical endurance",
        "Muscle recovery after physical activity",
        "Reduce fatigue and tiredness",
        "Hydrate and soften skin",
      ];
    }
    if (productName.toLowerCase().includes("vario")) {
      return [
        "Support vascular health",
        "Improve circulation",
        "Reduce inflammation",
        "Reduce swelling/oedema",
      ];
    }
    if (productName.toLowerCase().includes("allergenie")) {
      return [
        "Respiratory allergies",
        "Running nose",
        "Nasal blocks",
        "Skin allergies",
      ];
    }
    if (productName.toLowerCase().includes("uristo")) {
      return [
        "Recurrent urinary stones",
        "Burning micturation",
        "Urinary alkaliser",
      ];
    }
    if (productName.toLowerCase().includes("endurio")) {
      return [
        "Men's health support",
        "Physical strength enhancement",
        "General wellness",
      ];
    }
    return [];
  };

  const benefits = getBenefits(product.name);

  return (
    <div className="space-y-6">
      {/* Product Title and Category */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>

        {product.categories?.length > 0 && (
          <p className="text-lg text-primary font-medium">
            {product.categories.map((cat: any) => cat.name).join(", ")}
          </p>
        )}

        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center mt-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= averageRating ? (
                    <StarIconSolid className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-5 w-5 text-gray-300" />
                  )}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating_count} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        {isOnSale && product.regular_price && (
          <span className="text-xl text-gray-500 line-through">
            {formatPrice(product.regular_price)}
          </span>
        )}
        <span className="text-3xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        {isOnSale && product.regular_price && (
          <span className="bg-red-100 text-red-800 px-3 py-1 text-sm rounded-full font-medium">
            Save{" "}
            {formatPrice(
              parseFloat(product.regular_price) - parseFloat(product.price)
            )}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        {inStock ? (
          <>
            <CheckIcon className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">In Stock</span>
            {product.stock_quantity && (
              <span className="text-gray-500 text-sm">
                ({product.stock_quantity} available)
              </span>
            )}
          </>
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Short Description */}
      {product.short_description && (
        <div
          className="prose prose-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-primary-dark mb-4 flex items-center">
            <CheckIcon className="h-5 w-5 mr-2" />
            Key Benefits
          </h3>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-primary-dark">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quantity Selector and Add to Cart */}
      {inStock && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <ClientOnly
              fallback={
                <button className="flex-1 bg-gray-400 text-white py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                  Loading...
                </button>
              }
            >
              <AddToCartButton product={product} quantity={quantity} />
            </ClientOnly>

            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <HeartIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Product Meta Information */}
      <div className="border-t pt-6 space-y-3 text-sm">
        {product.sku && (
          <p className="flex justify-between">
            <span className="font-medium text-gray-700">SKU:</span>
            <span className="text-gray-600">{product.sku}</span>
          </p>
        )}

        {product.categories?.length > 0 && (
          <p className="flex justify-between">
            <span className="font-medium text-gray-700">Categories:</span>
            <span className="text-gray-600">
              {product.categories.map((cat: any, index: number) => (
                <span key={cat.id}>
                  <a
                    href={`/products?category=${cat.slug}`}
                    className="text-primary hover:underline"
                  >
                    {cat.name}
                  </a>
                  {index < product.categories.length - 1 && ", "}
                </span>
              ))}
            </span>
          </p>
        )}

        {product.tags?.length > 0 && (
          <p className="flex justify-between">
            <span className="font-medium text-gray-700">Tags:</span>
            <span className="text-gray-600">
              {product.tags.map((tag: any) => tag.name).join(", ")}
            </span>
          </p>
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-700">Authentic Ayurvedic</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-700">Lab Tested</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-700">Natural Ingredients</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-4 w-4 text-primary" />
            <span className="text-gray-700">Safe & Effective</span>
          </div>
        </div>
      </div>
    </div>
  );
}
