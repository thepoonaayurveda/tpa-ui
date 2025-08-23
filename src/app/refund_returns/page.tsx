import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | The Poona Ayurveda",
  description: "Learn about our shipping, returns, and refund policies. Understand the process for exchanges, cancellations, and customer support at The Poona Ayurveda.",
};

export default function RefundReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Returns Policy</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Promise to You</h2>
              <p className="mb-4">
                At The Poona Ayurveda, we're passionate about bringing you the finest Ayurvedic products with care and love. We know how excited you are to receive your wellness journey essentials, and we're just as excited to get them to you!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping That Cares</h2>
              
              <p className="mb-4">
                <strong>We've got your back every step of the way:</strong>
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Your order gets our immediate attention – we start preparing it with love the moment you place it</li>
                <li>We carefully pack and ship your products within 24 hours</li>
                <li>Our trusted delivery partners work hard to bring your package to you within 5-7 working days</li>
                <li>While we always aim to surprise you with early delivery, sometimes life happens and there might be small delays – we appreciate your patience!</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When Things Don't Go as Planned</h2>
              
              <p className="mb-4">
                We're human, and sometimes mistakes happen. Whether it's a packaging mix-up, a bump during transit, or a rare inventory hiccup, we want you to know that these situations affect less than 2% of our orders. When they do occur, we're here to make things right – that's our promise to you.
              </p>

              <p className="mb-6">
                <strong>If something's not quite right with your order, here's how we'll help:</strong>
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Wrong Product? No Worries!</h3>
                  <p className="mb-3">
                    We totally understand how disappointing this can be. Here's what we need to make it right:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Keep the product unused and in its original packaging</li>
                    <li>Share a quick unboxing video with us (we know it sounds formal, but it really helps us improve!)</li>
                    <li>Reach out to us within 2 days of delivery</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Damaged During Delivery?</h3>
                  <p className="mb-3">
                    Oh no! We hate when this happens. Here's what to do:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Take some photos of the damage before you dispose of anything</li>
                    <li>Share that unboxing video if you have one</li>
                    <li>Contact us within 2 days – we'll sort this out quickly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Missing Something?</h3>
                  <p className="mb-3">
                    Don't panic! Sometimes items play hide and seek:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Check your package thoroughly (sometimes small items nestle in packaging)</li>
                    <li>If something's truly missing, let us know within 2 days</li>
                    <li>An unboxing video helps us understand what happened</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Our Customer Care Team</h2>
              <p className="mb-4">
                Our dedicated customer care team is here to help you with any questions or concerns. You can reach us through multiple channels:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Quick Response Channels</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>📱 <strong>Instagram DM:</strong> @thepoonaayurveda</li>
                    <li>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/919730005222" className="text-primary hover:text-primary-dark">+91-97300-05222</a></li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Traditional Channels</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>📧 <strong>Email:</strong> <a href="mailto:care@thepoonaayurveda.com" className="text-primary hover:text-primary-dark">care@thepoonaayurveda.com</a></li>
                    <li>📞 <strong>Phone:</strong> <a href="tel:+917209201008" className="text-primary hover:text-primary-dark">+91-7209201008</a></li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Address</h3>
                <p><strong>Vaidya Gandhi's The Poona Ayurveda LLP</strong></p>
                <p>Gandhi Building, Shivaji Chowk</p>
                <p>Daund, Pune - 413801</p>
                <p>Maharashtra, India</p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-600">
                <strong>Policy Effective Date:</strong> January 2025<br/>
                <strong>Last Updated:</strong> January 2025<br/>
                <strong>Note:</strong> This policy is subject to change. Any updates will be posted on this page with revised effective dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}