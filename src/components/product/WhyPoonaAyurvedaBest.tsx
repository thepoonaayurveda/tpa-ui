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
      icon: TrophyIcon,
      title: "75+ Years of Expertise",
      description: "Three generations of Ayurvedic practitioners with deep knowledge of traditional formulations",
      highlight: "Legacy of Excellence"
    },
    {
      icon: BeakerIcon,
      title: "Scientific Validation",
      description: "Modern research meets ancient wisdom - all products are clinically tested for safety and efficacy",
      highlight: "Evidence-Based"
    },
    {
      icon: ShieldCheckIcon,
      title: "GMP Certified Manufacturing",
      description: "State-of-the-art facility with international quality standards and rigorous testing protocols",
      highlight: "Quality Assured"
    },
    {
      icon: SparklesIcon,
      title: "Authentic Formulations",
      description: "Original recipes from classical Ayurvedic texts, preserved and perfected over generations",
      highlight: "Traditional Purity"
    },
    {
      icon: UserGroupIcon,
      title: "Personalized Approach",
      description: "Individual constitution analysis and customized treatment plans by qualified Ayurveda doctors",
      highlight: "Tailored Care"
    },
    {
      icon: HeartIcon,
      title: "Patient-Centric Focus",
      description: "Dedicated customer support and post-treatment follow-up for optimal health outcomes",
      highlight: "Caring Service"
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
      number: "50,000+",
      label: "Satisfied Customers",
      description: "Trust our products for their health and wellness needs"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Customers report positive results within recommended usage period"
    },
    {
      number: "25+",
      label: "Product Range",
      description: "Comprehensive Ayurvedic solutions for various health conditions"
    },
    {
      number: "0",
      label: "Reported Side Effects",
      description: "Safe formulations with zero reported adverse effects"
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

        {/* Heritage Story */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <ClockIcon className="h-8 w-8 text-primary mr-3" />
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Heritage & Legacy
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Three Generations of Healing Excellence
              </h3>
              
              <p className="text-gray-text mb-6 leading-relaxed">
                Founded by Vaidya Gandhi, The Poona Ayurveda has been serving the community 
                for over 75 years. Our legacy is built on the foundation of authentic Ayurvedic 
                knowledge, compassionate care, and unwavering commitment to patient wellness.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Established in 1948 by Vaidya Gandhi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Traditional knowledge passed through generations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Modern facilities with traditional values</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-text text-sm">Trusted by generations of families</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h4 className="font-semibold text-foreground mb-4 text-center">What Our Customers Say</h4>
              <blockquote className="text-gray-text italic text-center mb-4">
                &ldquo;The Poona Ayurveda has been our family&apos;s trusted healthcare partner for over 20 years. 
                Their products are authentic, effective, and made with genuine care.&rdquo;
              </blockquote>
              <div className="text-center">
                <div className="font-medium text-foreground">- Satisfied Customer Family</div>
                <div className="text-gray-text text-sm">Using our products since 2003</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Experience the Poona Ayurveda Difference
            </h3>
            <p className="text-gray-text mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have chosen authentic Ayurvedic healthcare. 
              Start your wellness journey with products backed by tradition, science, and generations of expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8 py-3">
                Shop {product.name} Now
              </button>
              <button className="btn btn-outline px-8 py-3">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}