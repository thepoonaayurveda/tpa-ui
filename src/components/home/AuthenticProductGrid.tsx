import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 2427,
    name: "AllerGenie",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-768x578.png",
    link: "https://thepoonaayurveda.com/product/allergenie/"
  },
  {
    id: 2426,
    name: "Endurio 35+",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-768x578.png",
    link: "https://thepoonaayurveda.com/product/endurio-35/"
  },
  {
    id: 2425,
    name: "Flexio Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172-768x660.png",
    link: "https://thepoonaayurveda.com/product/flexio-oil/"
  },
  {
    id: 2429,
    name: "Glycemio Choornam",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Glycemio-Product-Image-e1748371477232-768x519.png",
    link: "https://thepoonaayurveda.com/product/prediabo/"
  },
  {
    id: 2424,
    name: "Sports Edge Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-4-scaled-e1747232306886-768x654.png",
    link: "https://thepoonaayurveda.com/product/sports-edge-oil/"
  },
  {
    id: 2413,
    name: "Sports Edge Oil Junior",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled-e1747232462869-768x639.png",
    link: "https://thepoonaayurveda.com/product/sports-edge-oil-junior/"
  },
  {
    id: 2575,
    name: "Uristo",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-6-768x578.png",
    link: "https://thepoonaayurveda.com/product/uristo/"
  },
  {
    id: 2431,
    name: "Uristo Choornam",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Uristo-Product-Image-768x584.png",
    link: "https://thepoonaayurveda.com/product/uristo-churnam/"
  },
  {
    id: 2430,
    name: "Vario",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-8-768x578.png",
    link: "https://thepoonaayurveda.com/product/vario/"
  },
  {
    id: 2428,
    name: "Vario Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-3-scaled-e1747232368137-768x640.png",
    link: "https://thepoonaayurveda.com/product/vario-oil/"
  }
];

const mobileProducts = [
  {
    id: 2575,
    name: "Uristo",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-6-768x578.png",
    link: "https://thepoonaayurveda.com/product/uristo/"
  },
  {
    id: 2431,
    name: "Uristo Choornam", 
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Uristo-Product-Image-768x584.png",
    link: "https://thepoonaayurveda.com/product/uristo-churnam/"
  },
  {
    id: 2430,
    name: "Vario",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-8-768x578.png",
    link: "https://thepoonaayurveda.com/product/vario/"
  },
  {
    id: 2429,
    name: "Glycemio Choornam",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/05/Glycemio-Product-Image-e1748371477232-768x519.png",
    link: "https://thepoonaayurveda.com/product/prediabo/"
  },
  {
    id: 2428,
    name: "Vario Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-3-scaled-e1747232368137-768x640.png",
    link: "https://thepoonaayurveda.com/product/vario-oil/"
  },
  {
    id: 2427,
    name: "AllerGenie",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-768x578.png",
    link: "https://thepoonaayurveda.com/product/allergenie/"
  },
  {
    id: 2426,
    name: "Endurio 35+",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-768x578.png",
    link: "https://thepoonaayurveda.com/product/endurio-35/"
  },
  {
    id: 2425,
    name: "Flexio Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172-768x660.png",
    link: "https://thepoonaayurveda.com/product/flexio-oil/"
  },
  {
    id: 2424,
    name: "Sports Edge Oil",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-4-scaled-e1747232306886-768x654.png",
    link: "https://thepoonaayurveda.com/product/sports-edge-oil/"
  },
  {
    id: 2413,
    name: "Sports Edge Oil Junior",
    image: "https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled-e1747232462869-768x639.png",
    link: "https://thepoonaayurveda.com/product/sports-edge-oil-junior/"
  }
];

function ProductItem({ product }: { product: typeof products[0] }) {
  return (
    <div className="relative group overflow-hidden rounded-full aspect-square">
      <Link href={product.link}>
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/36 group-hover:bg-white/32 transition-colors duration-300 rounded-full"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-900">
              <h3 className="text-lg md:text-xl font-medium px-4">{product.name}</h3>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Products</h2>
        </div>

        {/* Desktop/Tablet Grid (hidden on mobile) */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {products.slice(0, 12).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Mobile Grid (visible only on mobile) */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-4">
            {mobileProducts.slice(0, 10).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}