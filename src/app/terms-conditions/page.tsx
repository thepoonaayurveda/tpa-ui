import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Poona Ayurveda",
  description: "Read the terms and conditions for using The Poona Ayurveda website and services. Understand your rights and responsibilities as our customer.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="mb-4">
                These Terms and Conditions govern your use of <strong>www.thepoonaayurveda.com</strong> and the services provided by Vaidya Gandhi's The Poona Ayurveda LLP. By accessing or using our website, you agree to be bound by these terms.
              </p>
              <p>
                <strong>Important:</strong> Users must be 18 years or older and legally competent to enter into binding contracts to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Website Purpose</h2>
              <p className="mb-4">
                Our website serves as an e-commerce platform for authentic Ayurvedic products. We provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>High-quality Ayurvedic medicines and wellness products</li>
                <li>Educational content about Ayurvedic practices</li>
                <li>Online ordering and delivery services</li>
                <li>Customer support and consultation services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Obligations</h2>
              <p className="mb-4">
                As a user of our website, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Provide Accurate Information:</strong> Ensure all personal information provided is current, complete, and accurate</li>
                <li><strong>Personal Use Only:</strong> Use products purchased for personal consumption and not for resale or commercial purposes</li>
                <li><strong>Respectful Content:</strong> Refrain from uploading harmful, offensive, or inappropriate content</li>
                <li><strong>Intellectual Property:</strong> Respect all intellectual property rights and not violate copyrights or trademarks</li>
                <li><strong>Account Security:</strong> Maintain the security and confidentiality of your account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Activities</h2>
              <p className="mb-4">
                You are strictly prohibited from using our website to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Upload viruses, malware, or any harmful software</li>
                <li>Share copyrighted content without proper authorization</li>
                <li>Violate any local, state, national, or international laws</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Orders and Payments</h2>
              <p className="mb-4">
                <strong>Pricing:</strong> Product prices are subject to change without prior notice. The price applicable at the time of order confirmation will be charged.
              </p>
              <p className="mb-4">
                <strong>Payment Options:</strong> We accept multiple payment methods including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit and debit cards</li>
                <li>Digital wallets</li>
                <li>Net banking</li>
                <li>UPI payments</li>
                <li>Cash on delivery (where available)</li>
              </ul>
              <p className="mt-4">
                <strong>Order Processing:</strong> Orders are processed upon receipt of payment confirmation. We reserve the right to cancel orders in case of product unavailability or pricing errors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping and Delivery</h2>
              <p className="mb-4">
                <strong>Delivery Partners:</strong> We work with reliable logistics partners to ensure timely delivery of your orders.
              </p>
              <p className="mb-4">
                <strong>Shipping Charges:</strong> Delivery charges are calculated based on location and order value, and are included in your final payment amount.
              </p>
              <p>
                <strong>Delivery Timeframe:</strong> While we strive for timely delivery, actual delivery times may vary due to factors beyond our control, including weather conditions and logistical constraints.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Exchanges</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> We maintain a strict no-return policy for most products to ensure quality and hygiene standards.
                </p>
              </div>
              <p className="mb-4">
                Limited exceptions apply only for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Products delivered in damaged condition</li>
                <li>Wrong products delivered due to our error</li>
                <li>Manufacturing defects identified upon delivery</li>
              </ul>
              <p className="mt-4">
                For detailed return and exchange procedures, please refer to our <a href="/refund_returns" className="text-primary hover:text-primary-dark">Shipping and Returns Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800">
                  <strong>Maximum Liability:</strong> Our total liability for any claim is strictly limited to ₹200 (Indian Rupees Two Hundred only).
                </p>
              </div>
              <p className="mb-4">
                We shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service interruptions or website downtime</li>
                <li>Loss of data or information</li>
                <li>Communication failures or delays</li>
                <li>Unauthorized access to your account due to compromised credentials</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or business opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Information and Disclaimers</h2>
              <p className="mb-4">
                <strong>Ayurvedic Products:</strong> Our products are traditional Ayurvedic formulations. Individual results may vary, and we recommend consulting with a qualified Ayurvedic practitioner before use.
              </p>
              <p className="mb-4">
                <strong>Information Accuracy:</strong> While we strive to provide accurate product information, specifications, and descriptions, we do not warrant that all information is complete or error-free.
              </p>
              <p>
                <strong>Health Claims:</strong> Any health-related information provided is for educational purposes only and should not be considered as medical advice. Always consult healthcare professionals for medical concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including but not limited to text, images, logos, designs, and software, is the property of Vaidya Gandhi's The Poona Ayurveda LLP and is protected by intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any content without our explicit written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dispute Resolution</h2>
              <p className="mb-4">
                <strong>Governing Law:</strong> These terms are governed by the laws of India.
              </p>
              <p className="mb-4">
                <strong>Arbitration:</strong> Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with Indian arbitration laws.
              </p>
              <p>
                <strong>Jurisdiction:</strong> The arbitration proceedings shall be conducted in Pune, Maharashtra, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website.
              </p>
              <p>
                Your continued use of our website after such changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions or concerns regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Vaidya Gandhi's The Poona Ayurveda LLP</strong></p>
                <p>Gandhi Building, Shivaji Chowk</p>
                <p>Daund, Pune - 413801</p>
                <p>Email: <a href="mailto:care@thepoonaayurveda.com" className="text-primary hover:text-primary-dark">care@thepoonaayurveda.com</a></p>
                <p>Phone: <a href="tel:+917209201008" className="text-primary hover:text-primary-dark">+91-7209201008</a></p>
                <p>Website: <a href="https://thepoonaayurveda.com" className="text-primary hover:text-primary-dark">thepoonaayurveda.com</a></p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-600">
                <strong>Effective Date:</strong> January 2025<br/>
                <strong>Last Updated:</strong> January 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}