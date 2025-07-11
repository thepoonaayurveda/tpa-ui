import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">PA</span>
              </div>
              <h3 className="text-xl font-bold">The Poona Ayurveda</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Making wellness accessible, convenient, and sustainable for
              everyone through authentic Ayurvedic products that combine ancient
              wisdom with contemporary knowledge.
            </p>

            <div className="space-y-2 text-sm text-gray-300">
              <h4 className="font-semibold text-white mb-2">Marketed by:</h4>
              <p>Vaidya Gandhi's The Poona Ayurveda LLP</p>
              <p>Gandhi Building, Shivaji Chowk, Daund, Pune - 413801</p>
              <p>📧 care@thepoonaayurveda.com</p>
              <p>📞 +91-7209201008</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/products"
                  className="hover:text-green-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="hover:text-green-400 transition-colors"
                >
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/products?category=oils"
                  className="hover:text-green-400 transition-colors"
                >
                  Ayurvedic Oils
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tablets"
                  className="hover:text-green-400 transition-colors"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=choornam"
                  className="hover:text-green-400 transition-colors"
                >
                  Choornam
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=wellness"
                  className="hover:text-green-400 transition-colors"
                >
                  Wellness Products
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; 2024 The Poona Ayurveda. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2 md:mt-0">
              Manufactured at Brahmanath Pharma Pvt Ltd. | Licence No. MH/104715
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
