import { useState } from "react";
import Navbar from "../components/Navbar";
import battery from "../assets/b1.jpg";
import Footer from "../components/Footer";

const PaymentPage = () => {

  const [method, setMethod] = useState("online");

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 py-10">

        <div className="max-w-7xl mx-auto px-6">

          {/* Checkout Steps */}
          <div className="flex items-center justify-center gap-6 mb-10 text-sm">

            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                ✓
              </div>
              Login
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                2
              </div>
              Checkout
            </div>

            <div className="flex items-center gap-2 font-semibold">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                3
              </div>
              Payment
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-7 h-7 rounded-full border flex items-center justify-center">
                4
              </div>
              Confirmation
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl border">

                <h2 className="text-lg font-semibold mb-4">
                  Select Payment Method
                </h2>

                {/* Online Payment */}
                <label className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${method === "online" ? "border-blue-500 bg-blue-50" : ""}`}>

                  <input
                    type="radio"
                    name="payment"
                    checked={method === "online"}
                    onChange={() => setMethod("online")}
                  />

                  <div>
                    <p className="font-semibold">Online Payment</p>
                    <p className="text-sm text-gray-500">
                      Pay securely with card or UPI
                    </p>
                  </div>

                </label>

                {/* COD */}
                <label className={`flex items-center gap-4 border rounded-lg p-4 mt-3 cursor-pointer ${method === "cod" ? "border-red-500 bg-red-50" : ""}`}>

                  <input
                    type="radio"
                    name="payment"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                  />

                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">
                      Pay when you receive your order
                    </p>
                  </div>

                </label>

              </div>


              {/* Card Details */}
              {method === "online" && (

                <div className="bg-white p-6 rounded-xl border">

                  <h3 className="font-semibold mb-4">
                    Payment Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      placeholder="Card Number"
                      className="border rounded-lg px-4 py-2"
                    />

                    <input
                      placeholder="Cardholder Name"
                      className="border rounded-lg px-4 py-2"
                    />

                    <input
                      placeholder="Expiry Date"
                      className="border rounded-lg px-4 py-2"
                    />

                    <input
                      placeholder="CVV"
                      className="border rounded-lg px-4 py-2"
                    />

                  </div>

                  <label className="flex items-center gap-2 mt-4 text-sm">
                    <input type="checkbox"/>
                    Save card for future purchases
                  </label>

                </div>

              )}

              {/* Secure Message */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm text-green-700">
                🔒 Secure Payment — Your payment information is encrypted and secure.
              </div>

            </div>


            {/* RIGHT SIDE ORDER SUMMARY */}
            <div className="bg-white p-6 rounded-xl border h-fit">

              <h3 className="font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex gap-4 mb-4">

                <img
                  src={battery}
                  className="w-16 h-16 object-contain"
                />

                <div className="flex-1 text-sm">
                  <p className="font-semibold">
                    Premium AGM Battery 12V 70Ah
                  </p>
                  <p className="text-gray-500">
                    Model WF45F6300W
                  </p>
                </div>

                <p className="font-semibold">
                  ₹899.99
                </p>

              </div>

              <div className="flex gap-4 mb-6">

                <img
                  src={battery}
                  className="w-16 h-16 object-contain"
                />

                <div className="flex-1 text-sm">
                  <p className="font-semibold">
                    AC Delco DIN74
                  </p>
                  <p className="text-gray-500">
                    Model EV45F6300W
                  </p>
                </div>

                <p className="font-semibold">
                  ₹749.99
                </p>

              </div>


              {/* Price */}
              <div className="space-y-2 text-sm border-t pt-4">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹1649.98</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between">
                  <span>Installation</span>
                  <span>₹49.99</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹149.98</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>₹1849.95</span>
                </div>

              </div>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-black transition">
                Continue to Payment
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Secure checkout with SSL encryption
              </p>

            </div>

          </div>

        </div>

      </section>
      <Footer />
    </>
  );
};

export default PaymentPage;