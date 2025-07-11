"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">📦</span>
          </div>
          <span className="text-gray-400 text-lg">No Image Available</span>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (imageIndex: number) => {
    setImageErrors((prev) => ({ ...prev, [imageIndex]: true }));
  };

  const ImageComponent = ({
    image,
    index,
    className = "object-cover",
    priority = false,
  }: {
    image: ProductImage;
    index: number;
    className?: string;
    priority?: boolean;
  }) => {
    if (imageErrors[index]) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-500">📷</span>
            </div>
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        </div>
      );
    }

    return (
      <Image
        src={image.src}
        alt={image.alt || `${productName} ${index + 1}`}
        fill
        className={className}
        priority={priority}
        onError={() => handleImageError(index)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <ImageComponent
          image={selectedImage}
          index={selectedImageIndex}
          priority={true}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Navigation arrows for multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image indicator dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedImageIndex
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? "border-green-600 shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <ImageComponent
                image={image}
                index={index}
                className="object-cover"
              />

              {/* Overlay for selected thumbnail */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-green-600/10"></div>
              )}
            </button>
          ))}

          {/* Show +N more indicator if there are more than 4 images */}
          {images.length > 4 && (
            <div className="aspect-square bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">
                +{images.length - 4}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Image zoom notice */}
      <p className="text-xs text-gray-500 text-center">
        Hover over image to zoom • Click thumbnails to change view
      </p>
    </div>
  );
}
