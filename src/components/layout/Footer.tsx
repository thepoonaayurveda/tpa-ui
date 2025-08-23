import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Logo and Tagline */}
          <div className="flex-shrink-0 lg:max-w-xs">
            <div className="mb-4">
              <Image
                src="https://thepoonaayurveda.com/wp-content/uploads/2025/04/Logo-White.png"
                alt="The Poona Ayurveda"
                width={212}
                height={92}
                className="max-w-[212px] w-full h-auto"
              />
            </div>
            <p className="text-sm text-gray-300">
              Ancient Ayurveda for Modern Lives!
            </p>
          </div>

          {/* Right Side Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
            {/* Our Company */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Our Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors text-md"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Shop</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-primary transition-colors text-md"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=massage-oils"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Massage Oils
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=tablets"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Tablets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=choornas"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Choornas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Customer Care</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Privacy & Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund_returns"
                    className="hover:text-primary transition-colors text-md"
                  >
                    Shipping and Returns Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 VAIDYA GANDHI'S THE POONA AYURVEDA LLP
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.instagram.com/thepoonaayurveda"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 1c-1.657 0-3.158 0.673-4.243 1.757s-1.757 2.586-1.757 4.243v10c0 1.657 0.673 3.158 1.757 4.243s2.586 1.757 4.243 1.757h10c1.657 0 3.158-0.673 4.243-1.757s1.757-2.586 1.757-4.243v-10c0-1.657-0.673-3.158-1.757-4.243s-2.586-1.757-4.243-1.757zM7 3h10c1.105 0 2.103 0.447 2.828 1.172s1.172 1.723 1.172 2.828v10c0 1.105-0.447 2.103-1.172 2.828s-1.723 1.172-2.828 1.172h-10c-1.105 0-2.103-0.447-2.828-1.172s-1.172-1.723-1.172-2.828v-10c0-1.105 0.447-2.103 1.172-2.828s1.723-1.172 2.828-1.172zM16.989 11.223c-0.15-0.972-0.571-1.857-1.194-2.567-0.754-0.861-1.804-1.465-3.009-1.644-0.464-0.074-0.97-0.077-1.477-0.002-1.366 0.202-2.521 0.941-3.282 1.967s-1.133 2.347-0.93 3.712 0.941 2.521 1.967 3.282 2.347 1.133 3.712 0.93 2.521-0.941 3.282-1.967 1.133-2.347 0.93-3.712zM15.011 11.517c0.122 0.82-0.1 1.609-0.558 2.227s-1.15 1.059-1.969 1.18-1.609-0.1-2.227-0.558-1.059-1.15-1.18-1.969 0.1-1.609 0.558-2.227 1.15-1.059 1.969-1.18c0.313-0.046 0.615-0.042 0.87-0.002 0.74 0.11 1.366 0.47 1.818 0.986 0.375 0.428 0.63 0.963 0.72 1.543zM17.5 7.5c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1z"/>
                </svg>
              </Link>

              <Link
                href="https://www.youtube.com/@thepoonaayurveda"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 28 28">
                  <path d="M11.109 17.625l7.562-3.906-7.562-3.953v7.859zM14 4.156c5.891 0 9.797 0.281 9.797 0.281 0.547 0.063 1.75 0.063 2.812 1.188 0 0 0.859 0.844 1.109 2.781 0.297 2.266 0.281 4.531 0.281 4.531v2.125s0.016 2.266-0.281 4.531c-0.25 1.922-1.109 2.781-1.109 2.781-1.062 1.109-2.266 1.109-2.812 1.172 0 0-3.906 0.297-9.797 0.297v0c-7.281-0.063-9.516-0.281-9.516-0.281-0.625-0.109-2.031-0.078-3.094-1.188 0 0-0.859-0.859-1.109-2.781-0.297-2.266-0.281-4.531-0.281-4.531v-2.125s-0.016-2.266 0.281-4.531c0.25-1.937 1.109-2.781 1.109-2.781 1.062-1.125 2.266-1.125 2.812-1.188 0 0 3.906-0.281 9.797-0.281v0z"/>
                </svg>
              </Link>

              <Link
                href="mailto:care@thepoonaayurveda.com"
                className="bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7.921l8.427 5.899c0.34 0.235 0.795 0.246 1.147 0l8.426-5.899v10.079c0 0.272-0.11 0.521-0.295 0.705s-0.433 0.295-0.705 0.295h-16c-0.272 0-0.521-0.11-0.705-0.295s-0.295-0.433-0.295-0.705zM1 5.983c0 0.010 0 0.020 0 0.030v11.987c0 0.828 0.34 1.579 0.88 2.12s1.292 0.88 2.12 0.88h16c0.828 0 1.579-0.34 2.12-0.88s0.88-1.292 0.88-2.12v-11.988c0-0.010 0-0.020 0-0.030-0.005-0.821-0.343-1.565-0.88-2.102-0.541-0.54-1.292-0.88-2.12-0.88h-16c-0.828 0-1.579 0.34-2.12 0.88-0.537 0.537-0.875 1.281-0.88 2.103zM20.894 5.554l-8.894 6.225-8.894-6.225c0.048-0.096 0.112-0.183 0.188-0.259 0.185-0.185 0.434-0.295 0.706-0.295h16c0.272 0 0.521 0.11 0.705 0.295 0.076 0.076 0.14 0.164 0.188 0.259z"/>
                </svg>
              </Link>

              <Link
                href="https://wa.me/919730005222?text=I'm%20interested%20to%20get%20ayurveda%20consultation%20from%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 28">
                  <path d="M15.391 15.219c0.266 0 2.812 1.328 2.922 1.516 0.031 0.078 0.031 0.172 0.031 0.234 0 0.391-0.125 0.828-0.266 1.188-0.359 0.875-1.813 1.437-2.703 1.437-0.75 0-2.297-0.656-2.969-0.969-2.234-1.016-3.625-2.75-4.969-4.734-0.594-0.875-1.125-1.953-1.109-3.031v-0.125c0.031-1.031 0.406-1.766 1.156-2.469 0.234-0.219 0.484-0.344 0.812-0.344 0.187 0 0.375 0.047 0.578 0.047 0.422 0 0.5 0.125 0.656 0.531 0.109 0.266 0.906 2.391 0.906 2.547 0 0.594-1.078 1.266-1.078 1.625 0 0.078 0.031 0.156 0.078 0.234 0.344 0.734 1 1.578 1.594 2.141 0.719 0.688 1.484 1.141 2.359 1.578 0.109 0.063 0.219 0.109 0.344 0.109 0.469 0 1.25-1.516 1.656-1.516zM12.219 23.5c5.406 0 9.812-4.406 9.812-9.812s-4.406-9.812-9.812-9.812-9.812 4.406-9.812 9.812c0 2.063 0.656 4.078 1.875 5.75l-1.234 3.641 3.781-1.203c1.594 1.047 3.484 1.625 5.391 1.625zM12.219 1.906c6.5 0 11.781 5.281 11.781 11.781s-5.281 11.781-11.781 11.781c-1.984 0-3.953-0.5-5.703-1.469l-6.516 2.094 2.125-6.328c-1.109-1.828-1.687-3.938-1.687-6.078 0-6.5 5.281-11.781 11.781-11.781z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
