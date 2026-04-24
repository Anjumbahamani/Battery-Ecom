import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-10">Last updated: April 24, 2026</p>

          <div className="bg-white rounded-xl p-8 shadow-sm space-y-8 text-gray-700">

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">1. Introduction</h2>
              <p>Welcome to BatteriesBazaar ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website batteriesbazaar.com and make purchases from us.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">2. Information We Collect</h2>
              <p className="mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name, email address, phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely via payment gateways)</li>
                <li>Vehicle details for battery compatibility</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer support team</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To process and fulfill your orders</li>
                <li>To send order confirmations and delivery updates</li>
                <li>To schedule battery installation services</li>
                <li>To provide customer support</li>
                <li>To send promotional offers (only with your consent)</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">4. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits. Your payment information is never stored on our servers and is processed directly through PCI-DSS compliant payment gateways.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">5. Sharing of Information</h2>
              <p className="mb-2">We do not sell your personal data. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Delivery partners for order fulfillment</li>
                <li>Payment processors for transaction processing</li>
                <li>Installation technicians for service scheduling</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">6. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">7. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">8. Contact Us</h2>
              <p>For privacy-related queries, contact us at:</p>
              <p className="mt-2"><strong>Email:</strong> privacy@batteriesbazaar.com</p>
              <p><strong>Phone:</strong> +91 9483808080</p>
              <p><strong>Address:</strong> BatteriesBazaar, Delhi NCR, India</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;