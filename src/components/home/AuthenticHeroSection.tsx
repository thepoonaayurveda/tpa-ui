import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "./HeroSlider";
import { heroSlides } from "./heroData";

const HERO_BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const firstSlide = heroSlides[0];

// Server component — renders slide 1 in the initial HTML for fast LCP,
// then the client HeroSlider takes over with full interactivity.
export function AuthenticHeroSection() {
  return (
    <section className="relative">
      {/* Static first slide: server-rendered, no JS required to paint */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src={firstSlide.backgroundImage}
          alt={`${firstSlide.title} - ${firstSlide.subtitle}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fetchPriority="high"
          quality={85}
          placeholder="blur"
          blurDataURL={HERO_BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16">
            <div className="lg:hidden flex justify-end">
              <div className="max-w-xs space-y-4 text-right">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {firstSlide.title}
                </h2>
                <p className="text-base sm:text-lg text-white/90">{firstSlide.subtitle}</p>
                <div className="pt-4">
                  <Link
                    href={firstSlide.buttonLink}
                    className="inline-block bg-primary-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full tracking-widest transition-colors text-sm uppercase font-roboto"
                  >
                    {firstSlide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-3 gap-8">
              <div />
              <div />
              <div className="flex flex-col justify-end space-y-4">
                <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
                  {firstSlide.title}
                </h2>
                <p className="text-lg xl:text-xl text-white/90 mb-6">{firstSlide.subtitle}</p>
                <div>
                  <Link
                    href={firstSlide.buttonLink}
                    className="inline-block bg-primary-dark text-white px-8 py-6 rounded-full tracking-widest transition-colors text-sm uppercase font-roboto"
                  >
                    {firstSlide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client slider mounts over the static slide once JS loads */}
      <div className="absolute inset-0">
        <HeroSlider initialSlide={0} />
      </div>
    </section>
  );
}
