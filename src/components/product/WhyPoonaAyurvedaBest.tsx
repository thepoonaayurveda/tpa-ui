"use client";

import { 
  TrophyIcon,
  ShieldCheckIcon,
  BeakerIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface WhyPoonaAyurvedaBestProps {
  product: any;
}

export function WhyPoonaAyurvedaBest({ product }: WhyPoonaAyurvedaBestProps) {
  const uniqueSellingPoints = [
    {
      icon: SparklesIcon,
      title: "Authentic Ayurvedic Heritage",
      description: "Ancient Ayurveda for modern lives - bringing traditional wellness wisdom to contemporary health needs",
      highlight: "Traditional Purity"
    },
    {
      icon: BeakerIcon,
      title: "Quality Manufacturing",
      description: "Products manufactured with attention to quality and traditional Ayurvedic principles",
      highlight: "Quality Focus"
    },
    {
      icon: ShieldCheckIcon,
      title: "Safe & Natural",
      description: "Formulated using traditional Ayurvedic methods with natural ingredients for holistic wellness",
      highlight: "Natural Care"
    },
    {
      icon: HeartIcon,
      title: "Comprehensive Range",
      description: "Diverse product categories including body oils, men's health, and children's wellness products",
      highlight: "Complete Care"
    },
    {
      icon: UserGroupIcon,
      title: "Customer-Focused",
      description: "Dedicated customer care and support to help you on your wellness journey",
      highlight: "Personal Touch"
    },
    {
      icon: TrophyIcon,
      title: "Maharashtra-Based",
      description: "Located in Daund, Pune - bringing authentic Ayurvedic products from the heart of Maharashtra",
      highlight: "Local Heritage"
    }
  ];

  const certifications = [
    {
      title: "GMP Certified",
      description: "Good Manufacturing Practices certification ensuring international quality standards"
    },
    {
      title: "Lab Tested",
      description: "Every batch tested for purity, potency, and safety before market release"
    },
    {
      title: "Licensed Manufacturing",
      description: "Manufacturing license MH/104715 from Maharashtra FDA"
    },
    {
      title: "Ayush Compliance",
      description: "Full compliance with Ministry of AYUSH guidelines and regulations"
    }
  ];

  const achievements = [
    {
      number: "3",
      label: "Product Categories",
      description: "Body oils, men's health, and children's wellness products"
    },
    {
      number: "100%",
      label: "Natural Ingredients",
      description: "Traditional Ayurvedic formulations using natural components"
    },
    {
      number: "24/7",
      label: "Customer Support",
      description: "Available via phone, email, and WhatsApp for your queries"
    },
    {
      number: "1",
      label: "Mission",
      description: "Bringing ancient Ayurveda wisdom to modern lives"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose The Poona Ayurveda?
          </h2>
          <p className="text-lg text-gray-text max-w-3xl mx-auto">
            Discover what makes us the trusted choice for authentic Ayurvedic healthcare 
            and why thousands of customers choose our products for their wellness journey
          </p>
        </div>

        {/* Unique Selling Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {uniqueSellingPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="group bg-gray-light hover:bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium mb-3 inline-block">
                    {point.highlight}
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-primary transition-colors">
                    {point.title}
                  </h3>
                  
                  <p className="text-gray-text text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Our Track Record</h3>
            <p className="text-gray-text">Numbers that speak for our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {achievement.label}
                </div>
                <div className="text-gray-text text-sm">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Quality Certifications</h3>
            <p className="text-gray-text">Recognized standards that ensure your safety and satisfaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-light rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <CheckBadgeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{cert.title}</h4>
                <p className="text-gray-text text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <ClockIcon className="h-8 w-8 text-primary mr-3" />
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  About Our Company
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Ancient Ayurveda for Modern Lives
              </h3>
              
              <p className="text-gray-text mb-6 leading-relaxed">
                The Poona Ayurveda is dedicated to bringing the wisdom of traditional Ayurveda 
                to contemporary wellness needs. Based in Daund, Pune, Maharashtra, we focus on 
                creating authentic Ayurvedic products that honor traditional practices.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Located in Daund, Pune, Maharashtra</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Traditional Ayurvedic formulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Natural ingredients and authentic methods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Committed to customer wellness and care</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h4 className="font-semibold text-foreground mb-4 text-center">Contact Information</h4>
              <div className="space-y-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-foreground mb-1">Gandhi Building, Vadgaonkar Chawl</div>
                  <div className="text-gray-text">Shivaji Chowk, Daund</div>
                  <div className="text-gray-text">Pune, Maharashtra 413801</div>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-text">Phone:</span>
                    <span className="font-medium text-foreground">+91-9730005222</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Email:</span>
                    <span className="font-medium text-foreground">care@thepoonaayurveda.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Experience Authentic Ayurvedic Wellness
            </h3>
            <p className="text-gray-text mb-6 max-w-2xl mx-auto">
              Discover the benefits of traditional Ayurvedic products designed for modern lifestyles. 
              Start your wellness journey with natural formulations rooted in ancient wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8 py-3">
                Shop {product.name} Now
              </button>
              <button className="btn btn-outline px-8 py-3">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}