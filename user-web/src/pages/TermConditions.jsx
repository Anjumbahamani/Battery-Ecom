import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-gray-500 mb-10">Last updated: April 24, 2026</p>

          <div className="bg-white rounded-xl p-8 shadow-sm space-y-8 text-gray-700">

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">1. Acceptance of Terms</h2>
              <p>By accessing and using BatteriesBazaar (batteriesbazaar.com), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">2. Products & Pricing</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>Prices are subject to change without prior notice</li>
                <li>Product images are for illustration purposes only</li>
                <li>We reserve the right to limit quantities of any product</li>
                <li>Battery compatibility is based on vehicle information provided by the customer</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">3. Orders & Payment</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Orders are confirmed only after successful payment</li>
                <li>We accept UPI, credit/debit cards, net banking, and cash on delivery</li>
                <li>We reserve the right to cancel orders in case of pricing errors</li>
                <li>Order cancellation before shipment will receive full refund</li>
                <li>All transactions are secured with SSL encryption</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">4. Delivery Terms</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Standard delivery within 1-3 business days in major cities</li>
                <li>Express delivery available at additional charges</li>
                <li>Delivery timelines may vary due to location and availability</li>
                <li>Customer must be available at the delivery address</li>
                <li>Free delivery on orders above ₹2,000</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">5. Installation Services</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Professional installation is available at an additional charge</li>
                <li>Installation is performed by certified technicians only</li>
                <li>Customer must ensure vehicle accessibility at the time of installation</li>
                <li>We are not responsible for damage due to pre-existing vehicle conditions</li>
                <li>Installation warranty is valid for 30 days from date of service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">6. Warranty</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All batteries come with manufacturer warranty</li>
                <li>Warranty period varies by brand and product (12-60 months)</li>
                <li>Warranty covers manufacturing defects only</li>
                <li>Physical damage, improper installation, or misuse voids warranty</li>
                <li>Warranty claims must be accompanied by original invoice</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">7. Intellectual Property</h2>
              <p>All content on BatteriesBazaar including logos, images, text, and software is our intellectual property. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">8. Limitation of Liability</h2>
              <p>BatteriesBazaar shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services beyond the purchase price of the product.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">9. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi, India.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">10. Contact</h2>
              <p><strong>Email:</strong> legal@batteriesbazaar.com</p>
              <p><strong>Phone:</strong> +91 9483808080</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsConditions;