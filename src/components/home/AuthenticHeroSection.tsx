"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "Uristo Tablet",
    subtitle: "Natural Urinary Health Support",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Uristo-Tablet-Hero-Image.png",
  },
  {
    id: 2,
    title: "Vario Oil",
    subtitle: "Effective Varicose Vein Treatment",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Vario-Oil-Hero-Image.png",
  },
  {
    id: 3,
    title: "AllerGenie Tablet",
    subtitle: "Natural Allergy Relief",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/AllerGenie-Tablet-Hero-Image.png",
  },
  {
    id: 4,
    title: "Sports Edge Oil",
    subtitle: "Performance Enhancement Oil",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Sports-Edge-Oil-Hero-Image.png",
  },
  {
    id: 5,
    title: "Sports Edge Oil Junior",
    subtitle: "Safe for Young Athletes",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Sports-Edge-Oil-Junior-Hero-Image.png",
  },
  {
    id: 6,
    title: "Endurio 35+ Tablet",
    subtitle: "Energy & Vitality Booster",
    buttonText: "Shop now",
    buttonLink: "https://thepoonaayurveda.com/shop/",
    backgroundImage:
      "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Endurio-35-Tablet-Hero-Image.png",
  },
];

export function AuthenticHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="relative">
      {/* Slider Container */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-400 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative h-full flex items-end">
              <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-3 gap-8">
                  <div></div>
                  <div></div>
                  <div className="flex flex-col justify-end space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6">
                      {slide.subtitle}
                    </p>
                    <div>
                      <Link
                        href={slide.buttonLink}
                        className="inline-block bg-primary-dark text-white px-8 py-6 rounded-full tracking-widest transition-colors text-sm uppercase font-roboto"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary transition-all shadow-lg opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary transition-all shadow-lg opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
