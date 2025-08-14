"use client";

import { useState } from "react";
import {
  CheckIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon,
  CalendarDaysIcon,
  RectangleGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { getProductBenefits } from "@/lib/productBenefits";

interface CompactProductInfoProps {
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
        <div className="bg-green-50 border border-primary text-primary-dark px-3 py-2 rounded-lg text-sm mb-3">
          ✅ Added to cart successfully!
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        Add to Cart
      </button>
    </>
  );
}

export function CompactProductInfo({ product }: CompactProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [showWhoShouldTake, setShowWhoShouldTake] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  const isOnSale = product.on_sale;
  const inStock = product.stock_status === "instock";
  const averageRating = parseFloat(product.average_rating) || 0;

  // Get product-specific benefits using product slug
  const benefits = getProductBenefits(product.slug);

  const getConsumptionInstructions = (productName: string) => {
    const name = productName.toLowerCase();

    if (
      name.includes("uristo") ||
      name.includes("allergenie") ||
      name.includes("endurio") ||
      name.includes("vario")
    ) {
      return {
        dosage: "1-2 tablets twice daily",
        timing: "After meals with warm water",
        duration: "4-6 weeks or as directed",
      };
    }
    return {
      dosage: "Apply adequate amount",
      timing: "2-3 times daily",
      duration: "Use regularly for best results",
    };
  };

  const getIngredients = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("flexio")) {
      return [
        { name: "Mahavishagarbha Tailam", amount: "70ml" },
        { name: "Panchaguna Tailam", amount: "30ml" },
      ];
    }
    if (name.includes("uristo")) {
      return [
        { name: "Punarnava", amount: "125mg" },
        { name: "Gokshura", amount: "125mg" },
        { name: "Varuna", amount: "100mg" },
        { name: "Kulthi", amount: "75mg" },
      ];
    }
    return [
      { name: "Natural Herbs", amount: "As per formula" },
      { name: "Base Oil/Excipients", amount: "Q.S." },
    ];
  };

  const getWhoShouldTake = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("flexio")) {
      return [
        "Joint pain sufferers",
        "Athletes",
        "Elderly people",
        "Manual workers",
      ];
    }
    if (name.includes("uristo")) {
      return [
        "Kidney stone patients",
        "Urinary issues",
        "Adults 18-65",
        "Preventive care",
      ];
    }
    return [
      "Health-conscious adults",
      "18-65 years",
      "Natural wellness seekers",
      "Preventive care",
    ];
  };


  const instructions = getConsumptionInstructions(product.name);
  const ingredients = getIngredients(product.name);
  const whoShouldTake = getWhoShouldTake(product.name);

  return (
    <div className="space-y-6 pr-2">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {product.name}
        </h1>

        {product.categories?.length > 0 && (
          <p className="text-secondary font-medium mb-2">
            {product.categories.map((cat: any) => cat.name).join(", ")}
          </p>
        )}

        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= averageRating ? (
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-4 w-4 text-gray-300" />
                  )}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-text">
              ({product.rating_count} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-3 mb-4">
          {isOnSale && product.regular_price && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.regular_price)}
            </span>
          )}
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {isOnSale && product.regular_price && (
            <span className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full font-medium">
              Save{" "}
              {formatPrice(
                parseFloat(product.regular_price) - parseFloat(product.price)
              )}
            </span>
          )}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className="group bg-secondary/10 rounded-lg p-3 transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                  <IconComponent className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm transition-colors">
                    {benefit.name}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Information */}
      {product.short_description && (
        <div className="rounded-lg p-4">
          <div 
            className="text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        </div>
      )}

      {/* Consumption Instructions */}
      <div className="rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          How to Use
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <RectangleGroupIcon className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium mb-1">Dosage</div>
            <div className="text-xs text-gray-600 leading-tight">
              {instructions.dosage}
            </div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <ClockIcon className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium mb-1">Timing</div>
            <div className="text-xs text-gray-600 leading-tight">
              {instructions.timing}
            </div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <CalendarDaysIcon className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium mb-1">
              Duration
            </div>
            <div className="text-xs text-gray-600 leading-tight">
              {instructions.duration}
            </div>
          </div>
        </div>
      </div>

      {/* Quantity and Buy Buttons */}
      {inStock && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-700 text-sm">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 border-x border-gray-300 min-w-[3rem] text-center text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <ClientOnly
              fallback={
                <button className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                  Loading...
                </button>
              }
            >
              <AddToCartButton product={product} quantity={quantity} />
            </ClientOnly>
          </div>
        </div>
      )}

      {/* Who Should Take It */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <button
          onClick={() => setShowWhoShouldTake(!showWhoShouldTake)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center">
            Who Should Take It
          </h3>
          {showWhoShouldTake ? (
            <ChevronUpIcon className="h-4 w-4 text-amber-600" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-amber-600" />
          )}
        </button>
        {showWhoShouldTake && (
          <div className="grid grid-cols-1 gap-2 mt-3">
            {whoShouldTake.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckIcon className="h-3 w-3 mr-2 text-amber-600 flex-shrink-0" />
                <span className="text-gray-text">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center">
            Ingredients
          </h3>
          {showIngredients ? (
            <ChevronUpIcon className="h-4 w-4 text-purple-600" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-purple-600" />
          )}
        </button>
        {showIngredients && (
          <div className="space-y-2 mt-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm text-gray-text">{ingredient.name}</span>
                <span className="text-sm font-medium text-foreground">
                  {ingredient.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Instructions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <button
          onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center">
            Delivery Info
          </h3>
          {showDeliveryInfo ? (
            <ChevronUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-green-600" />
          )}
        </button>
        {showDeliveryInfo && (
          <div className="space-y-2 text-sm text-gray-text mt-3">
            <div className="flex items-center">
              <CheckIcon className="h-3 w-3 mr-2 text-green-600" />
              Free shipping on orders above ₹500
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-3 w-3 mr-2 text-green-600" />
              Delivery in 3-7 business days
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-3 w-3 mr-2 text-green-600" />
              Cash on delivery available
            </div>
          </div>
        )}
      </div>


      {/* Trust Badges */}
      {/* <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-3 w-3 text-primary" />
            <span className="text-gray-text">Authentic Ayurvedic</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-3 w-3 text-primary" />
            <span className="text-gray-text">Lab Tested</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-3 w-3 text-primary" />
            <span className="text-gray-text">GMP Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-3 w-3 text-primary" />
            <span className="text-gray-text">Safe & Effective</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
