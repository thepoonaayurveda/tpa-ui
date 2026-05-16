"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "./heroData";

const HERO_BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

function SlideContent({
  slide,
}: {
  slide: (typeof heroSlides)[0];
}) {
  return (
    <>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16">
          <div className="lg:hidden flex justify-end">
            <div className="max-w-xs space-y-4 text-right">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg text-white/90">{slide.subtitle}</p>
              <div className="pt-4">
                <Link
                  href={slide.buttonLink}
                  className="inline-block bg-primary-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full tracking-widest transition-colors text-sm uppercase font-roboto"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-8">
            <div />
            <div />
            <div className="flex flex-col justify-end space-y-4">
              <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg xl:text-xl text-white/90 mb-6">{slide.subtitle}</p>
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
    </>
  );
}

export function HeroSlider({ initialSlide }: { initialSlide: number }) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // Track which slides have been loaded at least once
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set([0, 1])
  );

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroSlides.length;
        setLoadedSlides((s) => {
          const updated = new Set(s);
          updated.add(next);
          // Preload the one after next too
          updated.add((next + 1) % heroSlides.length);
          return updated;
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered]);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setLoadedSlides((s) => {
      const updated = new Set(s);
      updated.add(index);
      updated.add((index + 1) % heroSlides.length);
      return updated;
    });
    setCurrentSlide(index);
    pauseAndResume();
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () =>
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {loadedSlides.has(index) && (
            <Image
              src={slide.backgroundImage}
              alt={`${slide.title} - ${slide.subtitle}`}
              fill
              className="object-cover"
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={HERO_BLUR_PLACEHOLDER}
            />
          )}
          <SlideContent slide={slide} />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary transition-all shadow-lg opacity-0 group-hover:opacity-100 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary transition-all shadow-lg opacity-0 group-hover:opacity-100 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
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
  );
}
