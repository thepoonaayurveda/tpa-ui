import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];
  const isOnSale = product.on_sale;
  const averageRating = parseFloat(product.average_rating) || 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}

          {/* Sale Badge */}
          {isOnSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded font-medium">
              Sale
            </span>
          )}

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
              Quick View
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Product Category */}
          {product.categories?.length > 0 && (
            <p className="text-xs text-green-600 font-medium mb-1 uppercase tracking-wide">
              {product.categories[0].name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 group-hover:text-green-600 line-clamp-2 mb-2 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= averageRating ? (
                      <StarIconSolid className="h-3 w-3 text-yellow-400" />
                    ) : (
                      <StarIcon className="h-3 w-3 text-gray-300" />
                    )}
                  </span>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">
                ({product.rating_count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            {isOnSale && product.regular_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
            <span className="font-semibold text-green-600">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p
              className="text-sm text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html:
                  product.short_description
                    .replace(/<[^>]*>/g, "")
                    .substring(0, 80) + "...",
              }}
            />
          )}

          {/* Stock Status */}
          <div className="mt-3">
            {product.stock_status === "instock" ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
