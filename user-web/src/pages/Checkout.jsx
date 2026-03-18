import { useState } from "react";
import Navbar from "../components/Navbar";
import b1 from "../assets/b1.jpg";
import Footer from "../components/Footer";

const Checkout = () => {

  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [installation, setInstallation] = useState("standard");

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 py-12">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">


            {/* DELIVERY ADDRESS */}
            <div className="bg-white border rounded-xl p-6">

              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-lg">Delivery Address</h3>
                <button className="text-blue-600 text-sm">
                  + Add New Address
                </button>
              </div>

              {/* address 1 */}
              <label className={`block border rounded-lg p-4 mb-3 cursor-pointer
                ${selectedAddress === "home" ? "border-blue-500 bg-blue-50" : ""}
              `}>

                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === "home"}
                  onChange={() => setSelectedAddress("home")}
                  className="mr-2"
                />

                <span className="font-semibold">Home</span>
                <p className="text-sm text-gray-600 mt-1">
                  Sarah Wilson <br/>
                  1234 Elm Street, Apt 5B <br/>
                  San Francisco, CA 94102 <br/>
                  +1 (555) 123-4567
                </p>

              </label>

              {/* address 2 */}
              <label className={`block border rounded-lg p-4 cursor-pointer
                ${selectedAddress === "office" ? "border-blue-500 bg-blue-50" : ""}
              `}>

                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === "office"}
                  onChange={() => setSelectedAddress("office")}
                  className="mr-2"
                />

                <span className="font-semibold">Office</span>

                <p className="text-sm text-gray-600 mt-1">
                  Sarah Wilson <br/>
                  456 Market Street, Floor 12 <br/>
                  San Francisco, CA 94105
                </p>

              </label>

            </div>


            {/* DELIVERY SCHEDULE */}
            <div className="bg-white border rounded-xl p-6">

              <h3 className="font-bold mb-4">Delivery Schedule</h3>

              <p className="text-sm mb-2">Select Delivery Date</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

                {[
                  { id: "today", label: "Today", date: "Dec 15" },
                  { id: "tomorrow", label: "Tomorrow", date: "Dec 16" },
                  { id: "wed", label: "Wed", date: "Dec 17" },
                  { id: "thu", label: "Thu", date: "Dec 18" },
                ].map((d) => (

                  <button
                    key={d.id}
                    onClick={() => setSelectedDate(d.id)}
                    className={`border rounded-lg p-3 text-sm
                      ${selectedDate === d.id
                        ? "border-blue-500 bg-blue-50"
                        : ""}
                    `}
                  >
                    <p className="font-semibold">{d.label}</p>
                    <p className="text-gray-500">{d.date}</p>
                  </button>

                ))}

              </div>


              <p className="text-sm mb-2">Select Time Slot</p>

              <div className="grid md:grid-cols-2 gap-3">

                {[
                  { id: "morning", label: "9:00 AM - 12:00 PM", price: "Free" },
                  { id: "afternoon", label: "2:00 PM - 6:00 PM", price: "Free" },
                  { id: "evening", label: "6:00 PM - 9:00 PM", price: "₹5.99" },
                  { id: "express", label: "Express (2 Hours)", price: "₹15.99" },
                ].map((slot) => (

                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`border rounded-lg p-3 flex justify-between
                      ${selectedSlot === slot.id
                        ? "border-blue-500 bg-blue-50"
                        : ""}
                    `}
                  >

                    <span>{slot.label}</span>
                    <span className="text-sm text-green-600">
                      {slot.price}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            {/* INSTALLATION */}
            <div className="bg-white border rounded-xl p-6">

              <h3 className="font-bold mb-4">Installation Service</h3>

              <div className="space-y-3">

                {[
                  {
                    id: "standard",
                    title: "Standard Installation",
                    price: "₹49.99",
                  },
                  {
                    id: "premium",
                    title: "Premium Installation",
                    price: "₹89.99",
                  },
                  {
                    id: "none",
                    title: "No Installation",
                    price: "Free",
                  },
                ].map((opt) => (

                  <label
                    key={opt.id}
                    className={`border rounded-lg p-4 flex justify-between cursor-pointer
                      ${installation === opt.id
                        ? "border-blue-500 bg-blue-50"
                        : ""}
                    `}
                  >

                    <div>
                      <input
                        type="radio"
                        name="installation"
                        checked={installation === opt.id}
                        onChange={() => setInstallation(opt.id)}
                        className="mr-2"
                      />

                      {opt.title}
                    </div>

                    <span className="text-sm text-green-600">
                      {opt.price}
                    </span>

                  </label>

                ))}

              </div>

            </div>

          </div>


          {/* RIGHT SIDE ORDER SUMMARY */}
          <div className="bg-white border rounded-xl p-6 h-fit">

            <h3 className="font-bold mb-4">Order Summary</h3>

            <div className="flex gap-3 mb-4">

              <img
                src={b1}
                className="w-16 h-16 object-contain border rounded"
              />

              <div className="text-sm">
                <p className="font-semibold">
                  Premium AGM Battery
                </p>
                <p className="text-gray-500">
                  12V 70Ah
                </p>
              </div>

              <span className="ml-auto font-semibold">
                ₹899.99
              </span>

            </div>


            <div className="space-y-2 text-sm border-t pt-3">

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

              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>₹1849.95</span>
              </div>

            </div>


            <button className="w-full mt-6 bg-red-600 hover:bg-black text-white py-3 rounded-lg">
              Continue to Payment
            </button>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Secure checkout with 256-bit SSL encryption
            </p>

          </div>

        </div>

      </section>
      <Footer/>
    </>
  );
};

export default Checkout;