"use client";

import { 
  HeartIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  BoltIcon,
  StarIcon,
  CheckCircleIcon 
} from "@heroicons/react/24/outline";

interface ProductBenefitsProps {
  product: any;
}

export function ProductBenefits({ product }: ProductBenefitsProps) {
  // Dynamic benefits based on product name
  const getProductBenefits = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return [
        {
          icon: ShieldCheckIcon,
          title: "Reduces Joint Pain",
          description: "Effective relief from muscle spasms and joint discomfort"
        },
        {
          icon: SparklesIcon,
          title: "Anti-Inflammatory",
          description: "Natural reduction of inflammation and swelling"
        },
        {
          icon: BoltIcon,
          title: "Improves Mobility",
          description: "Enhances joint flexibility and movement"
        },
        {
          icon: HeartIcon,
          title: "Muscle Relaxation",
          description: "Soothes tense muscles and promotes relaxation"
        },
        {
          icon: StarIcon,
          title: "Natural Formula",
          description: "100% Ayurvedic ingredients with no side effects"
        },
        {
          icon: CheckCircleIcon,
          title: "Fast Acting",
          description: "Quick absorption for rapid relief"
        }
      ];
    }
    
    if (name.includes("sports edge")) {
      return [
        {
          icon: BoltIcon,
          title: "Boosts Endurance",
          description: "Enhances physical stamina and performance"
        },
        {
          icon: HeartIcon,
          title: "Muscle Recovery",
          description: "Accelerates post-workout muscle recovery"
        },
        {
          icon: SparklesIcon,
          title: "Reduces Fatigue",
          description: "Fights tiredness and maintains energy levels"
        },
        {
          icon: ShieldCheckIcon,
          title: "Skin Health",
          description: "Nourishes and hydrates skin naturally"
        },
        {
          icon: StarIcon,
          title: "Athletic Support",
          description: "Specially formulated for active individuals"
        },
        {
          icon: CheckCircleIcon,
          title: "Daily Use Safe",
          description: "Safe for regular use by athletes"
        }
      ];
    }
    
    // Default Ayurvedic benefits
    return [
      {
        icon: SparklesIcon,
        title: "Natural Wellness",
        description: "Authentic Ayurvedic formulation for holistic health"
      },
      {
        icon: ShieldCheckIcon,
        title: "Safe & Effective",
        description: "Clinically tested with no harmful side effects"
      },
      {
        icon: HeartIcon,
        title: "Improves Vitality",
        description: "Enhances overall energy and well-being"
      },
      {
        icon: BoltIcon,
        title: "Fast Absorption",
        description: "Quick acting formula for effective results"
      },
      {
        icon: StarIcon,
        title: "Premium Quality",
        description: "GMP certified manufacturing standards"
      },
      {
        icon: CheckCircleIcon,
        title: "Trusted Formula",
        description: "Based on traditional Ayurvedic texts"
      }
    ];
  };

  const benefits = getProductBenefits(product.name);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Key Benefits
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Experience the powerful benefits of {product.name} for your health and wellness
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-gray-light hover:bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-text text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-3xl mx-auto border border-primary/10">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Experience These Benefits Today
            </h3>
            <p className="text-gray-text mb-6">
              Join thousands who have transformed their health with our authentic Ayurvedic products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8">
                Add to Cart
              </button>
              <button className="btn btn-outline px-8">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}