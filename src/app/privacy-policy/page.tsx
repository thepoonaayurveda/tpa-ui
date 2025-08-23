import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Poona Ayurveda",
  description: "Learn how The Poona Ayurveda collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our commitments.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information from you when you register on our website, place an order, or interact with our services. The types of information we collect include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> During account registration, we collect your email address and password.</li>
                <li><strong>Purchase Information:</strong> When making a purchase, we collect additional details such as your name, address, and payment information.</li>
                <li><strong>Incidental Information:</strong> We gather technical information like IP addresses, browser details, and browsing patterns to enhance your experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                The information we collect is used to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enhance our website services and user experience</li>
                <li>Process and fulfill your product orders</li>
                <li>Customize your interactions with our platform</li>
                <li>Deliver relevant product and service information</li>
                <li>Detect and prevent fraudulent activities</li>
                <li>Communicate with you about your orders and account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
              <p className="mb-4">
                <strong>We do not rent, sell or otherwise trade in any information that we collect from our customers, without their consent.</strong>
              </p>
              <p className="mb-4">
                However, we may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Third-party Service Providers:</strong> We may share information with trusted partners who assist us in operating our website and serving our customers.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or business transfer, customer information may be transferred as part of the transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information to governmental authorities if legally required or to comply with legal processes.</li>
                <li><strong>Market Research:</strong> Anonymized data may be used for market research purposes to improve our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
              <p className="mb-4">
                We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. Our security measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure data transmission using encryption technologies</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure storage of customer data</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> You are responsible for maintaining the confidentiality of your account password. The company is not liable for any unauthorized access to your account resulting from compromised login credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="mb-4">
                As our customer, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access and Modification:</strong> You can access, modify, or delete your profile information through your account settings.</li>
                <li><strong>Data Deletion:</strong> You can request complete deletion of your personal data by contacting us at <a href="mailto:care@thepoonaayurveda.com" className="text-primary hover:text-primary-dark">care@thepoonaayurveda.com</a>.</li>
                <li><strong>Communication Preferences:</strong> You can opt out of promotional communications while still receiving essential order-related messages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. These technologies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyze website usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website performance and functionality</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences, though disabling certain cookies may limit website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p>
                Our services are intended for users aged 18 and above. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
              <p className="mb-4">
                We reserve the right to modify this privacy policy at any time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
              <p>
                Continued use of our website after policy changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this privacy policy or our data practices, please contact us:
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