"use client";

import { useState } from "react";
import { 
  CheckIcon, 
  StarIcon, 
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon
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
      return ["Joint Pain Relief", "Anti-Inflammatory", "Muscle Relaxation", "Natural Healing"];
    }
    if (name.includes("sports edge")) {
      return ["Enhanced Endurance", "Muscle Recovery", "Fatigue Reduction", "Skin Nourishment"];
    }
    if (name.includes("vario")) {
      return ["Vascular Health", "Circulation Boost", "Swelling Reduction", "Varicose Vein Support"];
    }
    if (name.includes("uristo")) {
      return ["Kidney Stone Relief", "Urinary Health", "Natural Diuretic", "Anti-inflammatory"];
    }
    return ["Natural Wellness", "Safe & Effective", "Holistic Health", "Quality Assured"];
  };

  const getConsumptionInstructions = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("tablet")) {
      return {
        dosage: "1-2 tablets twice daily",
        timing: "After meals with warm water",
        duration: "4-6 weeks or as directed"
      };
    }
    return {
      dosage: "Apply adequate amount",
      timing: "2-3 times daily",
      duration: "Use regularly for best results"
    };
  };

  const getIngredients = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return [
        { name: "Mahavishagarbha Tailam", amount: "70ml" },
        { name: "Panchaguna Tailam", amount: "30ml" }
      ];
    }
    if (name.includes("uristo")) {
      return [
        { name: "Punarnava", amount: "125mg" },
        { name: "Gokshura", amount: "125mg" },
        { name: "Varuna", amount: "100mg" },
        { name: "Kulthi", amount: "75mg" }
      ];
    }
    return [
      { name: "Natural Herbs", amount: "As per formula" },
      { name: "Base Oil/Excipients", amount: "Q.S." }
    ];
  };

  const getWhoShouldTake = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return ["Joint pain sufferers", "Athletes", "Elderly people", "Manual workers"];
    }
    if (name.includes("uristo")) {
      return ["Kidney stone patients", "Urinary issues", "Adults 18-65", "Preventive care"];
    }
    return ["Health-conscious adults", "18-65 years", "Natural wellness seekers", "Preventive care"];
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
          <p className="text-primary font-medium mb-2">
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
              Save {formatPrice(parseFloat(product.regular_price) - parseFloat(product.price))}
            </span>
          )}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-gray-light rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <CheckIcon className="h-4 w-4 mr-2 text-primary" />
          Key Benefits
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-gray-text">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Consumption Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <ClockIcon className="h-4 w-4 mr-2 text-blue-600" />
          How to Use
        </h3>
        <div className="space-y-2 text-sm">
          <div><strong>Dosage:</strong> {instructions.dosage}</div>
          <div><strong>Timing:</strong> {instructions.timing}</div>
          <div><strong>Duration:</strong> {instructions.duration}</div>
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
            <label className="font-medium text-gray-700 text-sm">Quantity:</label>
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
            <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="text-sm text-gray-text">{ingredient.name}</span>
              <span className="text-sm font-medium text-foreground">{ingredient.amount}</span>
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