"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  product: any;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get therapeutic usage based on product name
  const getTherapeuticUsage = (productName: string) => {
    if (productName.toLowerCase().includes("flexio")) {
      return "Sandhigat Vedana, Sandhigatvata";
    }
    if (productName.toLowerCase().includes("sports edge")) {
      return "Sandhigat Vedana, Sandhigatvata, Mansbalya, Bruhan";
    }
    if (productName.toLowerCase().includes("vario")) {
      return "Shoola, Shotha, Helps in Management of Varicose Veins, Spider Veins";
    }
    if (productName.toLowerCase().includes("allergenie")) {
      return "Pratishyaya, Kasa, Peenas";
    }
    if (productName.toLowerCase().includes("uristo")) {
      return "Mootra daha, Mootra kruchhra, Mutrashmari";
    }
    if (productName.toLowerCase().includes("endurio")) {
      return "Mansa balya, Vajikar, Improve general health";
    }
    return "";
  };

  // Get ingredients based on product name (from your documents)
  const getIngredients = (productName: string) => {
    if (productName.toLowerCase().includes("flexio")) {
      return {
        composition: "Each 100 ml oil is prepared out of",
        ingredients: [
          "Mahavishagarbha Tailam (70 ml)",
          "Panchaguna Tailam (30 ml)",
        ],
      };
    }
    if (
      productName.toLowerCase().includes("sports edge") &&
      !productName.toLowerCase().includes("junior")
    ) {
      return {
        composition: "Each 100 ml oil is prepared out of",
        ingredients: [
          "Bala (Sida Cordifolia) Root (4.16 gm)",
          "Ashwagandha (Withania Somnifera) Root (4.16 gm)",
          "Masha (Phaseolus Mungo) Seed (4.16 gm)",
          "Shatavari (Asparagus Racemosus) Root (4.16 gm)",
          "Yashtimadlu (Glycerhiza glbra) Root (4.16 gm)",
          "Nirgundi (Vitex Nigundo) Leaves (4.16 gm)",
          "Gandhapura Taila Gaultheria fragrantissima Taila (10 ml)",
          "Tila Taila (Sesamum Indicum) Seed (90 ml)",
        ],
      };
    }
    // Add more product-specific ingredients as needed
    return null;
  };

  const getUsageInstructions = (productName: string) => {
    if (productName.toLowerCase().includes("flexio")) {
      return "Gently massage with lukewarm oil at the affected area";
    }
    if (productName.toLowerCase().includes("sports edge")) {
      return "Use lukewarm oil for gentle body massage";
    }
    if (
      productName.toLowerCase().includes("vario") &&
      productName.toLowerCase().includes("oil")
    ) {
      return "Massage with lukewarm oil from down to upwards direction";
    }
    if (productName.toLowerCase().includes("tablet")) {
      return "1 to 2 tablets with warm water twice a day OR as directed by the physician";
    }
    return "Follow the instructions on the package or consult with an Ayurveda practitioner";
  };

  const tabs = [
    { name: "Description", id: "description" },
    { name: "Ingredients", id: "ingredients" },
    { name: "Usage", id: "usage" },
    { name: "Additional Info", id: "additional" },
  ];

  const therapeuticUsage = getTherapeuticUsage(product.name);
  const ingredients = getIngredients(product.name);
  const usageInstructions = getUsageInstructions(product.name);

  return (
    <div className="bg-white">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-primary-700 shadow"
                    : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {/* Description Tab */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Description
              </h3>

              {product.description ? (
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <div className="space-y-4 text-gray-700">
                  <p>
                    {product.name} is an authentic Ayurvedic formulation crafted
                    using traditional methods and high-quality natural
                    ingredients. This product is designed to support your
                    wellness journey through the ancient wisdom of Ayurveda.
                  </p>

                  {therapeuticUsage && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Therapeutic Usage:
                      </h4>
                      <p className="italic text-primary-700">
                        {therapeuticUsage}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Ingredients Tab */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Ingredients
              </h3>

              {ingredients ? (
                <div>
                  <p className="font-medium text-gray-800 mb-3">
                    {ingredients.composition}:
                  </p>
                  <ul className="space-y-2">
                    {ingredients.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary00 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-gray-600">
                  <p>
                    This product contains carefully selected Ayurvedic herbs and
                    natural ingredients.
                  </p>
                  <p className="mt-2">
                    For detailed ingredient information, please refer to the
                    product packaging or contact our customer support.
                  </p>
                </div>
              )}

              {/* Herb Benefits */}
              {product.name.toLowerCase().includes("sports edge") && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-3">
                    Key Herb Benefits:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-primary-800">Ashwagandha:</strong>
                      <span className="text-primary-700">
                        {" "}
                        Reduces fatigue, enhances physical strength and recovery
                      </span>
                    </div>
                    <div>
                      <strong className="text-primary-800">Bala:</strong>
                      <span className="text-primary-700">
                        {" "}
                        Improves muscle tone and endurance, strengthens joints
                      </span>
                    </div>
                    <div>
                      <strong className="text-primary-800">Shatavari:</strong>
                      <span className="text-primary-700">
                        {" "}
                        Supports muscle repair
                      </span>
                    </div>
                    <div>
                      <strong className="text-primary-800">Yashtimadhu:</strong>
                      <span className="text-primary-700">
                        {" "}
                        Reduces inflammation, soothes muscles
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Usage Tab */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                How to Use
              </h3>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 font-medium">{usageInstructions}</p>
              </div>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Important Guidelines:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        For external use only (for oils and topical products)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Consult an Ayurveda practitioner for best results
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Store in a cool, dry place away from direct sunlight
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Keep out of reach of children</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Best Results:
                  </h4>
                  <p>
                    For optimal results, use this product consistently as
                    directed. Ayurvedic products work best when combined with a
                    healthy lifestyle, proper diet, and regular exercise.
                  </p>
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Additional Info Tab */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h3>

              {/* Manufacturing Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Manufacturing Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Marketed by:</p>
                    <p className="text-gray-600">
                      Vaidya Gandhi's The Poona Ayurveda LLP
                    </p>
                    <p className="text-gray-600">
                      Gandhi Building, Shivaji Chowk
                    </p>
                    <p className="text-gray-600">Daund, Pune - 413801</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">
                      Manufactured at:
                    </p>
                    <p className="text-gray-600">Brahmanath Pharma Pvt Ltd.</p>
                    <p className="text-gray-600">
                      At/Post Poonatgaon, Tal Newasa
                    </p>
                    <p className="text-gray-600">Dist. Ahmednagar - 413725</p>
                    <p className="text-gray-600 mt-2">Licence No. MH/104715</p>
                  </div>
                </div>
              </div>

              {/* Quality Assurance */}
              <div className="border border-primary/200 bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-3">
                  Quality Assurance
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary00 rounded-full"></span>
                    <span className="text-primary-800">GMP Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary00 rounded-full"></span>
                    <span className="text-primary-800">Lab Tested</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary00 rounded-full"></span>
                    <span className="text-primary-800">Natural Ingredients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary00 rounded-full"></span>
                    <span className="text-primary-800">
                      Traditional Formulation
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Need Help?</h4>
                <p className="text-blue-800 mb-3">
                  Get personalized advice from our Ayurveda experts
                </p>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>📧 care@thepoonaayurveda.com</p>
                  <p>📞 +91-7209201008</p>
                </div>
                <a
                  href="/consultation"
                  className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Book FREE Consultation
                </a>
              </div>

              {/* Shipping & Returns */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Shipping & Returns
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <span className="font-medium text-gray-900">Shipping:</span>
                    <span>
                      Free shipping on orders above ₹500. Standard delivery in
                      3-7 business days.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-medium text-gray-900">Returns:</span>
                    <span>
                      Easy returns within 7 days if the product is unused and in
                      original packaging.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-medium text-gray-900">Support:</span>
                    <span>
                      Our customer support team is available Monday to Saturday,
                      9 AM to 6 PM.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
