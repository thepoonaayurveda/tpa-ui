"use client";

import { 
  BeakerIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  DocumentTextIcon 
} from "@heroicons/react/24/outline";

interface IngredientsBreakdownProps {
  product: any;
}

export function IngredientsBreakdown({ product }: IngredientsBreakdownProps) {
  const getIngredientDetails = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return {
        mainIngredients: [
          {
            name: "Mahavishagarbha Tailam",
            quantity: "70 ml",
            benefits: ["Pain relief", "Anti-inflammatory", "Muscle relaxation"],
            description: "Traditional oil blend for joint and muscle support"
          },
          {
            name: "Panchaguna Tailam", 
            quantity: "30 ml",
            benefits: ["Enhanced absorption", "Skin nourishment", "Therapeutic enhancement"],
            description: "Five-herb oil combination for enhanced efficacy"
          }
        ],
        keyHerbs: [
          {
            name: "Sesame Oil Base",
            scientificName: "Sesamum Indicum",
            benefits: "Deep tissue penetration, natural carrier oil",
            ayurvedicProperty: "Vata balancing, warming"
          }
        ],
        preparation: "Each 100ml oil is prepared using traditional Ayurvedic methods",
        quality: "GMP certified, lab tested for purity and potency"
      };
    }
    
    if (name.includes("sports edge")) {
      return {
        mainIngredients: [
          {
            name: "Bala",
            quantity: "4.16 gm",
            benefits: ["Muscle strength", "Endurance", "Recovery"],
            description: "Sida Cordifolia - The strength enhancer"
          },
          {
            name: "Ashwagandha",
            quantity: "4.16 gm", 
            benefits: ["Stress relief", "Energy boost", "Muscle recovery"],
            description: "Withania Somnifera - The ultimate adaptogen"
          },
          {
            name: "Masha",
            quantity: "4.16 gm",
            benefits: ["Protein support", "Muscle building", "Strength"],
            description: "Phaseolus Mungo - Natural protein source"
          },
          {
            name: "Shatavari",
            quantity: "4.16 gm",
            benefits: ["Recovery", "Nourishment", "Vitality"],
            description: "Asparagus Racemosus - The nourisher"
          },
          {
            name: "Yashtimadhu",
            quantity: "4.16 gm",
            benefits: ["Anti-inflammatory", "Soothing", "Healing"],
            description: "Glycyrrhiza Glabra - Natural anti-inflammatory"
          },
          {
            name: "Nirgundi",
            quantity: "4.16 gm",
            benefits: ["Pain relief", "Muscle relaxation", "Anti-inflammatory"],
            description: "Vitex Nigundo - The pain reliever"
          }
        ],
        keyHerbs: [
          {
            name: "Gandhapura Oil",
            scientificName: "Gaultheria Fragrantissima",
            benefits: "Natural pain relief, cooling effect",
            ayurvedicProperty: "Anti-inflammatory, analgesic"
          },
          {
            name: "Sesame Oil",
            scientificName: "Sesamum Indicum", 
            benefits: "Deep penetration, nourishing base",
            ayurvedicProperty: "Vata balancing, strengthening"
          }
        ],
        preparation: "Traditional oil preparation with fresh herbs in sesame oil base",
        quality: "Organic herbs, chemical-free processing, lab tested"
      };
    }
    
    // Default ingredient structure
    return {
      mainIngredients: [
        {
          name: "Traditional Ayurvedic Herbs",
          quantity: "As per classical texts",
          benefits: ["Natural wellness", "Holistic health", "Balance"],
          description: "Carefully selected herbs as per ancient formulations"
        }
      ],
      keyHerbs: [
        {
          name: "Natural Base",
          scientificName: "Various",
          benefits: "Optimal delivery and absorption",
          ayurvedicProperty: "Balancing and nourishing"
        }
      ],
      preparation: "Traditional Ayurvedic preparation methods",
      quality: "GMP certified, quality assured"
    };
  };

  const ingredients = getIngredientDetails(product.name);

  return (
    <section className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Premium Ingredients
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Discover the powerful Ayurvedic herbs and natural ingredients that make {product.name} effective
          </p>
        </div>

        {/* Main Ingredients */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
              <DocumentTextIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Active Ingredients</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ingredients.mainIngredients.map((ingredient, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground text-lg">{ingredient.name}</h4>
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                    {ingredient.quantity}
                  </span>
                </div>
                
                <p className="text-gray-text text-sm mb-4">{ingredient.description}</p>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-foreground text-sm">Key Benefits:</h5>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.benefits.map((benefit, idx) => (
                      <span key={idx} className="bg-green-50 text-primary-dark text-xs px-2 py-1 rounded-md">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Herbs Details */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
              <SparklesIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Herb Spotlight</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ingredients.keyHerbs.map((herb, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <DocumentTextIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-foreground text-xl mb-1">{herb.name}</h4>
                  <p className="text-gray-text text-sm italic">{herb.scientificName}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Benefits:</h5>
                    <p className="text-gray-text text-sm">{herb.benefits}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Ayurvedic Properties:</h5>
                    <p className="text-gray-text text-sm">{herb.ayurvedicProperty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality & Preparation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preparation Method */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <BeakerIcon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Traditional Preparation</h3>
            </div>
            
            <p className="text-gray-text mb-6">{ingredients.preparation}</p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Following ancient Ayurvedic texts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Time-tested preparation methods</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Maintaining therapeutic potency</span>
              </div>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quality Assurance</h3>
            </div>
            
            <p className="text-gray-text mb-6">{ingredients.quality}</p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Lab tested for purity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Heavy metal testing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Microbiological safety</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-text text-sm">Potency verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source Information */}
        <div className="mt-12">
          <div className="bg-green-50 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Ethically Sourced, Responsibly Made
            </h3>
            <p className="text-gray-text max-w-3xl mx-auto">
              All our herbs are ethically sourced from trusted farmers and organic suppliers. 
              We believe in sustainable practices that protect the environment while ensuring 
              the highest quality ingredients for your health and wellness.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
                🌱 Organic Sourcing
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
                🤝 Fair Trade
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
                🌍 Sustainable Practices
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
                ✅ Quality Assured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}