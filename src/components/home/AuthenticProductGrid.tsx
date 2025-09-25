import Link from "next/link";
import Image from "next/image";

// Generic blur placeholder for product images
const PRODUCT_BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const products = [
  {
    id: 2427,
    name: "AllerGenie",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-768x578.png",
    link: "/products/allergenie"
  },
  {
    id: 2426,
    name: "Endurio 35+",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-768x578.png",
    link: "/products/endurio-35"
  },
  {
    id: 2425,
    name: "Flexio Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172-768x660.png",
    link: "/products/flexio-oil"
  },
  {
    id: 2429,
    name: "Glycemio Choornam",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Glycemio-Product-Image-e1748371477232-768x519.png",
    link: "/products/glycemio-choornam"
  },
  {
    id: 2424,
    name: "Sports Edge Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-4-scaled-e1747232306886-768x654.png",
    link: "/products/sports-edge-oil"
  },
  {
    id: 2413,
    name: "Sports Edge Oil Junior",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled-e1747232462869-768x639.png",
    link: "/products/sports-edge-oil-junior"
  },
  {
    id: 2575,
    name: "Uristo",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-6-768x578.png",
    link: "/products/uristo"
  },
  {
    id: 2431,
    name: "Uristo Choornam",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Uristo-Product-Image-768x584.png",
    link: "/products/uristo-choornam"
  },
  {
    id: 2430,
    name: "Vario",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-8-768x578.png",
    link: "/products/vario"
  },
  {
    id: 2428,
    name: "Vario Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-3-scaled-e1747232368137-768x640.png",
    link: "/products/vario-oil"
  }
];

const mobileProducts = [
  {
    id: 2575,
    name: "Uristo",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-6-768x578.png",
    link: "/products/uristo"
  },
  {
    id: 2431,
    name: "Uristo Choornam", 
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Uristo-Product-Image-768x584.png",
    link: "/products/uristo-choornam"
  },
  {
    id: 2430,
    name: "Vario",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-8-768x578.png",
    link: "/products/vario"
  },
  {
    id: 2429,
    name: "Glycemio Choornam",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Glycemio-Product-Image-e1748371477232-768x519.png",
    link: "/products/glycemio-choornam"
  },
  {
    id: 2428,
    name: "Vario Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-3-scaled-e1747232368137-768x640.png",
    link: "/products/vario-oil"
  },
  {
    id: 2427,
    name: "AllerGenie",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-768x578.png",
    link: "/products/allergenie"
  },
  {
    id: 2426,
    name: "Endurio 35+",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-768x578.png",
    link: "/products/endurio-35"
  },
  {
    id: 2425,
    name: "Flexio Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172-768x660.png",
    link: "/products/flexio-oil"
  },
  {
    id: 2424,
    name: "Sports Edge Oil",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-4-scaled-e1747232306886-768x654.png",
    link: "/products/sports-edge-oil"
  },
  {
    id: 2413,
    name: "Sports Edge Oil Junior",
    image: "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled-e1747232462869-768x639.png",
    link: "/products/sports-edge-oil-junior"
  }
];

function ProductItem({ product, priority = false }: { product: typeof products[0]; priority?: boolean }) {
  return (
    <div className="bg-gray-light p-4 sm:p-6 group overflow-hidden aspect-square" 
         style={{ borderRadius: '0 50% 50% 50%' }}>
      <Link href={product.link}>
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-top md:object-center md:object-cover md:scale-125 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            quality={85}
            placeholder="blur"
            blurDataURL={PRODUCT_BLUR_PLACEHOLDER}
          />
          
          {/* Hover overlay - light gray translucent */}
          <div className="absolute inset-0 bg-gray-light/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content - Always visible on sm/md, hover only on lg+ */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Small/Medium screens - Always visible */}
            <div className="lg:hidden text-center">
              <h3 className="text-2xl font-bold text-slate-800">{product.name}</h3>
            </div>
            
            {/* Large screens - Hover only */}
            <div className="hidden lg:absolute lg:inset-0 lg:flex items-center justify-center text-center opacity-0 hover:opacity-100">
              <h3 className="text-3xl font-bold text-slate-800">{product.name}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function AuthenticProductGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
        </div>

        {/* Product Grid - responsive columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.slice(0, 9).map((product, index) => (
            <ProductItem 
              key={product.id} 
              product={product} 
              priority={index < 4} // First 4 products get priority loading
            />
          ))}
        </div>
      </div>
    </section>
  );
}