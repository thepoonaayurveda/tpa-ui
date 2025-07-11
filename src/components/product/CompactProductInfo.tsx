"use client";

import { useState } from "react";
import {
  CheckIcon,
  StarIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon,
  CalendarDaysIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

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

  const isOnSale = product.on_sale;
  const inStock = product.stock_status === "instock";
  const averageRating = parseFloat(product.average_rating) || 0;

  // Get product-specific benefits
  const getBenefits = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("flexio")) {
      return [
        { name: "Joint Pain Relief", icon: ShieldCheckIcon },
        { name: "Anti-Inflammatory", icon: BeakerIcon },
        { name: "Muscle Relaxation", icon: HeartIcon },
        { name: "Natural Healing", icon: CheckIcon },
      ];
    }
    if (name.includes("sports edge")) {
      return [
        { name: "Enhanced Endurance", icon: StarIcon },
        { name: "Muscle Recovery", icon: ShieldCheckIcon },
        { name: "Fatigue Reduction", icon: ClockIcon },
        { name: "Skin Nourishment", icon: HeartIcon },
      ];
    }
    if (name.includes("vario")) {
      return [
        { name: "Vascular Health", icon: HeartIcon },
        { name: "Circulation Boost", icon: CheckIcon },
        { name: "Swelling Reduction", icon: ShieldCheckIcon },
        { name: "Varicose Vein Support", icon: BeakerIcon },
      ];
    }
    if (name.includes("uristo")) {
      return [
        { name: "Kidney Stone Relief", icon: ShieldCheckIcon },
        { name: "Urinary Health", icon: HeartIcon },
        { name: "Natural Diuretic", icon: BeakerIcon },
        { name: "Anti-inflammatory", icon: CheckIcon },
      ];
    }
    return [
      { name: "Natural Wellness", icon: HeartIcon },
      { name: "Safe & Effective", icon: ShieldCheckIcon },
      { name: "Holistic Health", icon: CheckIcon },
      { name: "Quality Assured", icon: StarIcon },
    ];
  };

  const getConsumptionInstructions = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("uristo") || name.includes("allergenie") || name.includes("endurio") || name.includes("vario")) {
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

  const benefits = getBenefits(product.name);
  const instructions = getConsumptionInstructions(product.name);
  const ingredients = getIngredients(product.name);
  const whoShouldTake = getWhoShouldTake(product.name);

  return (
    <div className="max-h-screen overflow-y-auto space-y-6 pr-2">
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
              className="group bg-white hover:bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-primary/20"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                    {benefit.name}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consumption Instructions */}
      <div className="rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <ClockIcon className="h-4 w-4 mr-2 text-blue-600" />
          How to Use
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <SparklesIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xs font-medium text-blue-800 mb-1">Dosage</div>
            <div className="text-xs text-gray-600 leading-tight">{instructions.dosage}</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xs font-medium text-blue-800 mb-1">Timing</div>
            <div className="text-xs text-gray-600 leading-tight">{instructions.timing}</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xs font-medium text-blue-800 mb-1">Duration</div>
            <div className="text-xs text-gray-600 leading-tight">{instructions.duration}</div>
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <TruckIcon className="h-4 w-4 mr-2 text-green-600" />
          Delivery Info
        </h3>
        <div className="space-y-2 text-sm text-gray-text">
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

            <div className="flex space-x-3">
              <button className="flex-1 border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium">
                Buy Now
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <HeartIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Who Should Take It */}
      <div className="bg-amber-50 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <ShieldCheckIcon className="h-4 w-4 mr-2 text-amber-600" />
          Ideal For
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {whoShouldTake.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <CheckIcon className="h-3 w-3 mr-2 text-amber-600 flex-shrink-0" />
              <span className="text-gray-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <BeakerIcon className="h-4 w-4 mr-2 text-purple-600" />
          Ingredients
        </h3>
        <div className="space-y-2">
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
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-lg p-4">
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
      </div>
    </div>
  );
}
