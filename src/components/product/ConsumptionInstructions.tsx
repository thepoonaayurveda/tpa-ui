"use client";

import { ClockIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface ConsumptionInstructionsProps {
  product: any;
}

export function ConsumptionInstructions({ product }: ConsumptionInstructionsProps) {
  const getInstructions = (productName: string) => {
    const name = productName.toLowerCase();
    
    if (name.includes("flexio")) {
      return {
        dosage: "Apply lukewarm oil gently on affected area",
        timing: "2-3 times daily",
        duration: "Use regularly for best results",
        instructions: [
          "Clean the affected area before application",
          "Take small amount of oil on palm",
          "Warm the oil by rubbing between palms",
          "Gently massage in circular motions for 5-10 minutes",
          "Leave for 30 minutes before washing (if needed)",
          "Use consistently for 2-3 weeks for optimal results"
        ],
        precautions: [
          "For external use only",
          "Avoid contact with eyes",
          "Discontinue if irritation occurs",
          "Store in cool, dry place"
        ]
      };
    }
    
    if (name.includes("sports edge")) {
      return {
        dosage: "Apply adequate amount for full body massage",
        timing: "Before or after physical activity",
        duration: "Daily use recommended",
        instructions: [
          "Take sufficient oil for the area to be massaged",
          "Warm oil by rubbing between palms",
          "Apply with gentle, long strokes",
          "Massage for 10-15 minutes for muscle preparation",
          "Can be used before workout for muscle preparation",
          "Use after workout for recovery and relaxation"
        ],
        precautions: [
          "For external use only",
          "Patch test before first use",
          "Safe for daily use",
          "Keep away from children"
        ]
      };
    }
    
    if (name.includes("tablet")) {
      return {
        dosage: "1-2 tablets",
        timing: "Twice daily with warm water",
        duration: "As directed by physician or for 4-6 weeks",
        instructions: [
          "Take tablets with warm water",
          "Consume after meals for better absorption",
          "Maintain consistent timing daily",
          "Do not exceed recommended dosage",
          "Continue for recommended duration",
          "Consult physician for extended use"
        ],
        precautions: [
          "Not recommended for pregnant/nursing women",
          "Consult doctor if on other medications",
          "Keep in original packaging",
          "Store below 25°C"
        ]
      };
    }
    
    // Default oil/topical instructions
    return {
      dosage: "Apply adequate amount on affected area",
      timing: "2-3 times daily",
      duration: "Use regularly for 4-6 weeks",
      instructions: [
        "Clean the area before application",
        "Take required amount on palm",
        "Warm by rubbing between palms",
        "Apply with gentle massage",
        "Allow to absorb for 20-30 minutes",
        "Use consistently for best results"
      ],
      precautions: [
        "For external use only",
        "Avoid contact with eyes and mucous membranes",
        "Discontinue if any adverse reaction occurs",
        "Store in cool, dry place away from direct sunlight"
      ]
    };
  };

  const instructions = getInstructions(product.name);

  return (
    <section className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How To Use {product.name}
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Follow these simple instructions for optimal results and safety
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Dosage and Timing */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Dosage & Timing</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Recommended Dosage</h4>
                <p className="text-gray-text">{instructions.dosage}</p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Frequency</h4>
                <p className="text-gray-text">{instructions.timing}</p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Duration</h4>
                <p className="text-gray-text">{instructions.duration}</p>
              </div>
            </div>
          </div>

          {/* Step by Step Instructions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <InformationCircleIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Step-by-Step Guide</h3>
            </div>
            
            <div className="space-y-4">
              {instructions.instructions.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full text-white text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-gray-text text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Precautions */}
        <div className="mt-12">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Important Precautions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {instructions.precautions.map((precaution, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-gray-text text-sm">{precaution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> For personalized dosage and treatment plan, consult with our Ayurveda experts. 
              Every individual&apos;s constitution is unique, and our doctors can provide tailored guidance for optimal results.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Book FREE Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}