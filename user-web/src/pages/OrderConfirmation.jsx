import Navbar from "../components/Navbar";
import { CheckCircle, MapPin, Calendar, CreditCard } from "lucide-react";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import Footer from "../components/Footer";

const OrderConfirmation = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gray-100 py-14">

        <div className="max-w-3xl mx-auto px-6">

          {/* SUCCESS ICON */}
          <div className="text-center">

            <div className="flex justify-center mb-4">
              <CheckCircle size={60} className="text-green-500" />
            </div>

            <h1 className="text-3xl font-bold">
              Order Confirmed!
            </h1>

            <p className="text-gray-500 mt-2">
              Thank you for your purchase. Your order has been
              successfully placed and is being processed.
            </p>

          </div>


          {/* ORDER DETAILS CARD */}
          <div className="bg-white border rounded-xl shadow-sm mt-8">

            <div className="bg-red-600 text-white font-semibold px-6 py-3 rounded-t-xl">
              Order Details
            </div>

            <div className="p-6 space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <CreditCard size={16} /> Order ID
                </span>
                <span>#FC-2024-0089</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} /> Order Date
                </span>
                <span>March 15, 2024</span>
              </div>

              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-semibold">₹2,847.99</span>
              </div>


              {/* ADDRESS */}
              <div className="bg-gray-50 border rounded-lg p-4">

                <div className="flex items-center gap-2 font-semibold mb-2">
                  <MapPin size={16} />
                  Delivery Address
                </div>

                <p className="text-gray-600 text-sm">
                  John Smith <br/>
                  123 Oak Street, Apartment 5B <br/>
                  San Francisco, CA 94102 <br/>
                  United States
                </p>

              </div>


              {/* ORDER ITEMS */}
              <div className="space-y-3">

                <div className="flex items-center gap-4 border rounded-lg p-3">

                  <img
                    src={b1}
                    className="w-14 h-14 object-contain"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      Premium AGM Battery 12V 70Ah
                    </p>
                    <p className="text-gray-500 text-xs">
                      Model: WF-455900W
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹1,899.99
                  </span>

                </div>


                <div className="flex items-center gap-4 border rounded-lg p-3">

                  <img
                    src={b2}
                    className="w-14 h-14 object-contain"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      Oak Coffee Table
                    </p>
                    <p className="text-gray-500 text-xs">
                      Material: Solid Oak
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹599.99
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-black transition">
              Track Your Order
            </button>

            <button className="border px-6 py-3 rounded-lg hover:bg-black hover:text-white transition">
              Go to Home
            </button>

          </div>


          {/* WHAT HAPPENS NEXT */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">

            <h3 className="font-semibold mb-3">
              What Happens Next?
            </h3>

            <ul className="text-sm text-gray-700 space-y-2">

              <li>✔ We will prepare your order and schedule delivery within 1-2 business days.</li>

              <li>✔ Our delivery team will contact you 24 hours before delivery.</li>

              <li>✔ Professional installation will be completed on delivery day.</li>

            </ul>

          </div>


          {/* SUPPORT */}
          <div className="bg-white border rounded-xl p-6 mt-6 text-center">

            <h3 className="font-semibold mb-2">
              Need Help?
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Our customer support team is here to assist you with any questions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                Call Support
              </button>

              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                Email Us
              </button>

              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                Live Chat
              </button>

            </div>

          </div>

        </div>

      </section>
      <Footer />
    </>
  );
};

export default OrderConfirmation;