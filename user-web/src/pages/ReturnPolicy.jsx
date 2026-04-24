import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReturnPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-2">Return & Refund Policy</h1>
          <p className="text-gray-500 mb-10">Last updated: April 24, 2026</p>

          {/* QUICK SUMMARY */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <p className="text-3xl mb-2">7</p>
              <p className="font-semibold text-green-700">Day Returns</p>
              <p className="text-sm text-gray-500">Easy returns within 7 days</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <p className="text-3xl mb-2">5-7</p>
              <p className="font-semibold text-blue-700">Days Refund</p>
              <p className="text-sm text-gray-500">Fast refund processing</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <p className="text-3xl mb-2">100%</p>
              <p className="font-semibold text-red-700">Satisfaction</p>
              <p className="text-sm text-gray-500">Guaranteed quality</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm space-y-8 text-gray-700">

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">1. Return Eligibility</h2>
              <p className="mb-2">You may return a product within <strong>7 days</strong> of delivery if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The product is defective or damaged on arrival</li>
                <li>Wrong product was delivered</li>
                <li>Product does not match the description on website</li>
                <li>Battery is incompatible despite correct vehicle information provided</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">2. Non-Returnable Items</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Products that have been installed or used</li>
                <li>Products with broken seals or tampered packaging</li>
                <li>Products damaged due to improper use or storage</li>
                <li>Products returned after 7 days of delivery</li>
                <li>Custom ordered or special procurement items</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">3. How to Initiate a Return</h2>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <p>Contact our support team at support@batteriesbazaar.com or call +91 9483808080</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <p>Provide your order ID, reason for return, and photos of the product</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <p>Our team will review and approve your return request within 24 hours</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
                  <p>Pack the product in original packaging and hand it to our pickup agent</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">5</span>
                  <p>Refund will be processed within 5-7 business days after product inspection</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">4. Refund Methods</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-3 text-left">Payment Method</th>
                      <th className="border p-3 text-left">Refund Method</th>
                      <th className="border p-3 text-left">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Credit/Debit Card</td>
                      <td className="border p-3">Back to card</td>
                      <td className="border p-3">5-7 business days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-3">UPI / Net Banking</td>
                      <td className="border p-3">Back to account</td>
                      <td className="border p-3">3-5 business days</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Cash on Delivery</td>
                      <td className="border p-3">Bank transfer</td>
                      <td className="border p-3">5-7 business days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-3">Wallet</td>
                      <td className="border p-3">Back to wallet</td>
                      <td className="border p-3">1-2 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">5. Exchange Policy</h2>
              <p>We offer free battery exchange within 7 days if the delivered battery is defective. The replacement will be delivered within 2-3 business days after the return is picked up.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">6. Old Battery Exchange</h2>
              <p>When purchasing a new battery, you can exchange your old battery for an instant discount. The old battery must be functional and of the same type. Discount amount varies based on battery condition and type.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">7. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Orders can be cancelled before shipment for a full refund</li>
                <li>Once shipped, the return process must be followed</li>
                <li>Installation bookings can be cancelled up to 2 hours before scheduled time</li>
                <li>Cancellation after 2 hours of scheduled installation may incur a fee</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 text-black">8. Contact for Returns</h2>
              <p><strong>Email:</strong> returns@batteriesbazaar.com</p>
              <p><strong>Phone:</strong> +91 9483808080</p>
              <p><strong>Hours:</strong> Monday - Saturday, 9 AM to 6 PM IST</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReturnPolicy;