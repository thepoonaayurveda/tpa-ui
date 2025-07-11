"use client";

import { 
  UserGroupIcon, 
  XMarkIcon, 
  CheckIcon,
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";

interface WhoShouldTakeItProps {
  product: any;
}

export function WhoShouldTakeIt({ product }: WhoShouldTakeItProps) {
  const getTargetAudience = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return {
        idealFor: [
          {
            title: "Joint Pain Sufferers",
            description: "People experiencing arthritis, joint stiffness, or muscle spasms"
          },
          {
            title: "Active Individuals",
            description: "Athletes and fitness enthusiasts with muscle strain or sports injuries"
          },
          {
            title: "Elderly People",
            description: "Senior citizens dealing with age-related joint problems"
          },
          {
            title: "Manual Workers",
            description: "People with physically demanding jobs causing muscle fatigue"
          },
          {
            title: "Chronic Pain Patients",
            description: "Those seeking natural alternatives for pain management"
          }
        ],
        notFor: [
          {
            title: "Pregnant Women",
            description: "Not recommended during pregnancy without medical consultation"
          },
          {
            title: "Children Under 12",
            description: "Not suitable for children without pediatric guidance"
          },
          {
            title: "Allergic Individuals",
            description: "Those allergic to sesame oil or other ingredients"
          },
          {
            title: "Open Wounds",
            description: "Avoid application on broken skin or open wounds"
          }
        ]
      };
    }
    
    if (name.includes("sports edge")) {
      return {
        idealFor: [
          {
            title: "Athletes",
            description: "Professional and amateur athletes seeking performance enhancement"
          },
          {
            title: "Fitness Enthusiasts",
            description: "Gym-goers and sports lovers wanting faster recovery"
          },
          {
            title: "Physical Trainers",
            description: "Coaches and trainers with high physical activity levels"
          },
          {
            title: "Recovery Seekers",
            description: "People looking for natural post-workout muscle recovery"
          },
          {
            title: "Endurance Athletes",
            description: "Marathon runners, cyclists, and endurance sport participants"
          }
        ],
        notFor: [
          {
            title: "Pregnant/Nursing Women",
            description: "Not recommended during pregnancy or breastfeeding"
          },
          {
            title: "Skin Sensitivity",
            description: "Those with sensitive skin should patch test first"
          },
          {
            title: "Acute Injuries",
            description: "Not for fresh injuries requiring immediate medical attention"
          },
          {
            title: "Children",
            description: "Not suitable for children without proper guidance"
          }
        ]
      };
    }
    
    // Default for general Ayurvedic products
    return {
      idealFor: [
        {
          title: "Health-Conscious Individuals",
          description: "People seeking natural wellness solutions"
        },
        {
          title: "Adults (18-65 years)",
          description: "Adult men and women looking for holistic health support"
        },
        {
          title: "Preventive Care Seekers",
          description: "Those interested in maintaining good health naturally"
        },
        {
          title: "Ayurveda Enthusiasts",
          description: "People who prefer traditional and natural remedies"
        },
        {
          title: "Lifestyle Disease Management",
          description: "Those managing stress, fatigue, and modern lifestyle issues"
        }
      ],
      notFor: [
        {
          title: "Pregnant/Nursing Women",
          description: "Consult healthcare provider before use during pregnancy"
        },
        {
          title: "Children",
          description: "Not recommended for children without medical supervision"
        },
        {
          title: "Severe Medical Conditions",
          description: "Consult doctor if you have serious health conditions"
        },
        {
          title: "Medication Interactions",
          description: "Check with physician if taking other medications"
        }
      ]
    };
  };

  const audience = getTargetAudience(product.name);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Who Should Use {product.name}?
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Understand if this product is right for you and your health goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ideal For */}
          <div className="bg-green-50 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                <CheckIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Ideal For</h3>
            </div>
            
            <div className="space-y-6">
              {audience.idealFor.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-gray-text text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary/10 rounded-lg p-4">
              <p className="text-primary-dark text-sm font-medium">
                ✨ Perfect for those seeking natural, effective Ayurvedic solutions for their health concerns
              </p>
            </div>
          </div>

          {/* Not Recommended For */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <XMarkIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Not Recommended For</h3>
            </div>
            
            <div className="space-y-6">
              {audience.notFor.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                    <XMarkIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-gray-text text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-red-100 rounded-lg p-4">
              <p className="text-red-800 text-sm font-medium">
                ⚠️ Always consult with a healthcare provider before starting any new supplement or treatment
              </p>
            </div>
          </div>
        </div>

        {/* Consultation CTA */}
        <div className="mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Not Sure If This Is Right For You?
            </h3>
            <p className="text-gray-text mb-6 max-w-2xl mx-auto">
              Our experienced Ayurveda practitioners can assess your individual constitution (Prakriti) 
              and current health status to recommend the most suitable products for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Book FREE Consultation
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Chat with Expert
              </button>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className="mt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Important Safety Information</h4>
                <p className="text-amber-700 text-sm">
                  This product is based on traditional Ayurvedic formulations. Individual results may vary. 
                  If you have any medical conditions, are taking medications, or are pregnant/nursing, 
                  please consult with a qualified healthcare practitioner before use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}