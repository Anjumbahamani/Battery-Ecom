import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  createOrder,
  getCartItems,
  createInstallation,
  createPayment,
  createRazorpayOrder,
  getAddresses,
  BASE_URL,
} from "../context/authApi";
import TopBar from "../components/TopBar";

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [installation, setInstallation] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [step, setStep] = useState("details");

  // Orders created at Step 1 — reused at Step 2, never recreated
  const [createdOrders, setCreatedOrders] = useState([]);
  const [createdPayment, setCreatedPayment] = useState(null); // add this at top with other states
  const couponDiscount = location.state?.couponDiscount || 0;
  const couponCode = location.state?.couponCode || "";
  const exchangeDiscount = location.state?.exchangeDiscount || 0;
  const isExchange = location.state?.isExchange || false;

  const timeSlots = {
    morning: "9AM-11AM",
    midday: "11AM-1PM",
    afternoon: "1PM-3PM",
    lateafternoon: "3PM-5PM",
    evening: "5PM-7PM",
    night: "7PM-9PM",
    express: "Express",
  };

  useEffect(() => {
    getCartItems()
      .then((data) => setCartItems(data.results || data))
      .catch((err) => console.log(err));

    const today = new Date().toISOString().split("T")[0];
    setDeliveryDate(today);
    loadRazorpayScript();

    // Load default address
    const token = localStorage.getItem("accessToken");
    if (token) {
      getAddresses()
        .then((data) => {
          const addresses = data.results || data;
          // Find default address first, fallback to first address
          const defaultAddr =
            addresses.find((a) => a.is_default) || addresses[0];
          if (defaultAddr) {
            const formatted =
              `${defaultAddr.address_line1 || ""}${defaultAddr.address_line2 ? ", " + defaultAddr.address_line2 : ""}, ${defaultAddr.city || ""}, ${defaultAddr.state || ""} - ${defaultAddr.pincode || ""}`.trim();
            setAddress(formatted);
          }
        })
        .catch(() => {});
    }
  }, []);
  const subtotal = cartItems.reduce((acc, item) => {
    const price =
      item.product_detail?.price || item.combo_product_detail?.price || 0;
    return acc + parseFloat(price) * item.quantity;
  }, 0);

  const total = Math.max(0, subtotal - couponDiscount - exchangeDiscount);

  // ── STEP 1: Create orders once, then go to payment step ───────────────────
  const handleContinueToPayment = async () => {
    if (!address.trim()) {
      setPopup({
        show: true,
        type: "error",
        message: "Please enter delivery address!",
      });
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const orderPromises = cartItems.map((item) => {
        const payload = {
          quantity: item.quantity,
          delivery_date: deliveryDate,
          delivery_time: timeSlots[selectedSlot],
          shipping_address: address,
          billing_address: address,
          is_exchange: isExchange,
        };
        if (item.combo_product) {
          payload.combo_product = item.combo_product;
        } else {
          payload.product = item.product;
        }
        return createOrder(payload);
      });

      const orders = await Promise.all(orderPromises);
      setCreatedOrders(orders); // store — Step 2 uses these, never recreates

      // Optional installation (non-blocking)
      if (installation !== "none") {
        try {
          await createInstallation({
            address,
            scheduled_date: deliveryDate,
            scheduled_time: timeSlots[selectedSlot],
          });
        } catch (installErr) {
          let errData = {};
          try {
            errData = JSON.parse(installErr.message);
          } catch (_) {}
          const timeError = errData?.scheduled_time?.[0];
          if (timeError) {
            const proceed = window.confirm(
              setPopup({
                show: true,
                type: "warning",
                message: `Installation slot unavailable: "${timeError}". Your order is placed successfully without installation.`,
              }),
            );
            if (!proceed) {
              setLoading(false);
              return;
            }
          }
        }
      }

      setStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      let errMsg = "Failed to create order. Please try again.";
      try {
        const parsed = JSON.parse(err.message);
        if (parsed?.error) errMsg = parsed.error;
        else if (parsed?.detail) errMsg = parsed.detail;
        else if (parsed?.non_field_errors?.[0])
          errMsg = parsed.non_field_errors[0];
      } catch (_) {
        errMsg = err.message || "Something went wrong.";
      }
      setPopup({ show: true, type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2: Payment only — orders already created above ───────────────────

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      setPopup({
        show: true,
        type: "error",
        message: "Please select a payment method!",
      });

      return;
    }
    if (loading) return;

    const firstOrder = createdOrders[0];
    if (!firstOrder) {
      setPopup({
        show: true,
        type: "error",
        message: "Something went wrong. Please go back and try again.",
      });
      setStep("details");
      setCreatedOrders([]);
      return;
    }

    setLoading(true);
    try {
      // ── Reuse existing payment if already created (avoids duplicate error) ──
      let payment = createdPayment;
      if (!payment) {
        try {
          payment = await createPayment({
            // ✅ no const — assigns to outer let
            order: firstOrder.id,
            amount: total.toFixed(2),
            method: paymentMethod,
          });
          setCreatedPayment(payment);
        } catch (payErr) {
          const errMsg = payErr.message || "";
          if (errMsg.includes("already exists")) {
            const res = await fetch(
              `${BASE_URL}/api/payments/?order=${firstOrder.id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              },
            );
            const data = await res.json();
            payment = (data.results || data)[0];
            setCreatedPayment(payment);
            if (!payment)
              throw new Error("Could not retrieve existing payment.");
          } else {
            throw payErr;
          }
        }
      }

      // COD → navigate directly
      if (paymentMethod === "COD") {
        // COD
        navigate("/orderconfirm", {
          state: { order: firstOrder, cartItems, address, payment, total }, // ← add total
        });

        return;
      }

      // ONLINE → open Razorpay
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load.");
      const rzpOrderData = await createRazorpayOrder(payment.id);
      console.log("rzpOrderData:", rzpOrderData);
      console.log("amount sent to Razorpay:", rzpOrderData.amount);

      const rzpKey =
        rzpOrderData.razorpay_key_id || rzpOrderData.key_id || rzpOrderData.key;
      const rzpOrderId =
        rzpOrderData.razorpay_order_id ||
        rzpOrderData.order_id ||
        rzpOrderData.id;

      if (!rzpKey) throw new Error("Razorpay key missing from response.");
      if (!rzpOrderId)
        throw new Error("Razorpay order ID missing from response.");

      const options = {
        key: rzpOrderData.key_id,
        amount: rzpOrderData.amount,
        currency: rzpOrderData.currency || "INR",
        name: "BatteriesBazaar",
        description: `Order #${firstOrder.id}`,
        order_id: rzpOrderData.razorpay_order_id,
        handler: (response) => {
          // navigate("/orderconfirm", {
          //   state: {
          //     order: firstOrder,
          //     cartItems,
          //     address,
          //     payment,
          //     razorpay: response,
          //   },
          // });
          // ONLINE (in handler)
          navigate("/orderconfirm", {
            state: {
              order: firstOrder,
              cartItems,
              address,
              payment,
              razorpay: response,
              total,
            }, // ← add total
          });
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#dc2626" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setPopup({
          show: true,
          type: "error",
          message: "Payment failed: " + resp.error.description,
        });

        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      let errMsg = err.message || "Something went wrong";
      try {
        const parsed = JSON.parse(errMsg);
        if (parsed?.order?.[0]) errMsg = "Payment error: " + parsed.order[0];
        else if (parsed?.detail) errMsg = parsed.detail;
        else if (parsed?.non_field_errors?.[0])
          errMsg = parsed.non_field_errors[0];
        else errMsg = JSON.stringify(parsed);
      } catch (_) {}
      setPopup({ show: true, type: "error", message: errMsg });
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <div className={`text-5xl mb-4`}>
              {popup.type === "success"
                ? "✅"
                : popup.type === "warning"
                  ? "⚠️"
                  : "❌"}
            </div>
            <p className="text-gray-800 font-medium text-sm leading-relaxed">
              {popup.message}
            </p>
            <button
              onClick={() =>
                setPopup({ show: false, type: "success", message: "" })
              }
              className="mt-6 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg font-semibold transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <section className="bg-gray-100 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {["Details", "Payment"].map((label, i) => {
              const active =
                (i === 0 && step === "details") ||
                (i === 1 && step === "payment");
              const done = i === 0 && step === "payment";
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${done ? "bg-green-500 text-white" : active ? "bg-red-600 text-white" : "bg-gray-300 text-gray-600"}`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    className={`font-medium text-sm ${active ? "text-red-600" : "text-gray-500"}`}
                  >
                    {label}
                  </span>
                  {i < 1 && <div className="w-16 h-0.5 bg-gray-300 ml-2" />}
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* STEP 1 — DELIVERY DETAILS */}
              {step === "details" && (
                <>
                  {/* DELIVERY ADDRESS */}
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-1">Delivery Address</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      📍 Enter your full address with <strong>pincode</strong>{" "}
                      for accurate delivery & installation charges
                    </p>

                    {/* Default address banner */}
                    {address && (
                      <div className="mb-3 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-700">
                          📋 <strong>Default address loaded.</strong> You can
                          edit below if needed.
                        </p>
                        <button
                          onClick={() => setAddress("")}
                          className="text-xs text-red-500 hover:text-red-700 underline ml-2 whitespace-nowrap"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <textarea
                      placeholder="Enter your full delivery address with pincode (e.g. 14, MG Road, Bengaluru - 560001)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border rounded-lg p-4 text-sm h-24 focus:outline-red-500"
                    />

                    {/* Pincode hint */}
                    <div className="mt-3 flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <span className="text-lg">📮</span>
                      <p className="text-xs text-yellow-800">
                        <strong>Important:</strong> Please include your{" "}
                        <strong>6-digit pincode</strong> in the address above.
                      </p>
                    </div>

                    {/* Installation distance note */}
                    <div className="mt-3 flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                      <span className="text-lg">🔧</span>
                      <p className="text-xs text-green-800">
                        <strong>Free Installation</strong> available within{" "}
                        <strong>5 km</strong> of our service center. Beyond 5
                        km, vendor will inform charges.
                      </p>
                    </div>
                  </div>

                  {/* DELIVERY SCHEDULE */}
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="font-bold mb-4">Delivery Schedule</h3>
                    <p className="text-sm mb-2">Select Delivery Date</p>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="border rounded-lg px-4 py-2 mb-6 w-full"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <p className="text-sm mb-3">Select Time Slot</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        {
                          id: "morning",
                          label: "9:00 AM – 11:00 AM",
                          note: "Most popular",
                        },
                        { id: "midday", label: "11:00 AM – 1:00 PM", note: "" },
                        {
                          id: "afternoon",
                          label: "1:00 PM – 3:00 PM",
                          note: "",
                        },
                        {
                          id: "lateafternoon",
                          label: "3:00 PM – 5:00 PM",
                          note: "",
                        },
                        {
                          id: "evening",
                          label: "5:00 PM – 7:00 PM",
                          note: "Evening slot",
                        },
                        {
                          id: "night",
                          label: "7:00 PM – 9:00 PM",
                          note: "Late slot",
                        },
                        // { id: "express",   label: "Express (2 Hours)",     note: "Fastest" },
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`border rounded-lg p-3 flex justify-between items-center transition-colors
              ${selectedSlot === slot.id ? "border-red-500 bg-red-50" : "hover:bg-gray-50"}`}
                        >
                          <div className="text-left">
                            <span className="text-sm block">{slot.label}</span>
                            {slot.note && (
                              <span className="text-xs text-gray-400">
                                {slot.note}
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-sm font-semibold ${slot.price === "Free" ? "text-green-600" : "text-orange-500"}`}
                          >
                            {slot.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* INSTALLATION SERVICE */}
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="font-bold mb-1">Installation Service</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      🔧 <strong>Free installation</strong> within 5 km of
                      vendor. Beyond 5 km, the vendor will inform you of charges
                      based on your location.
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          id: "free",
                          title: "Free Installation (Within 5 km)",
                          desc: "Our technician will install for free if you're within 5 km of the vendor's location",
                          price: "Free",
                        },
                        {
                          id: "standard",
                          title: "Paid Installation (Beyond 5 km)",
                          desc: "Charges will be informed by the vendor based on your distance. Our technician will contact you before the visit.",
                          price: "Charges apply",
                        },
                        {
                          id: "none",
                          title: "No Installation",
                          desc: "I'll install it myself",
                          price: "Free",
                        },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`border rounded-lg p-4 flex justify-between cursor-pointer transition-colors
      ${installation === opt.id ? "border-red-500 bg-red-50" : "hover:bg-gray-50"}`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="installation"
                              checked={installation === opt.id}
                              onChange={() => setInstallation(opt.id)}
                              className="mt-1 accent-red-600"
                            />
                            <div>
                              <p className="font-medium text-sm">{opt.title}</p>
                              <p className="text-xs text-gray-500">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-sm font-semibold ml-4 whitespace-nowrap ${opt.price === "Free" ? "text-green-600" : "text-orange-500"}`}
                          >
                            {opt.price}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2 — PAYMENT */}
              {step === "payment" && (
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">
                    Select Payment Method
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Choose how you'd like to pay
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => setPaymentMethod("COD")}
                      className={`w-full border-2 rounded-xl p-5 flex items-center gap-4 transition-all
                        ${paymentMethod === "COD" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${paymentMethod === "COD" ? "bg-red-100" : "bg-gray-100"}`}
                      >
                        💵
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">
                          Pay in cash when your order arrives
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "COD" ? "border-red-500" : "border-gray-300"}`}
                      >
                        {paymentMethod === "COD" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("ONLINE")}
                      className={`w-full border-2 rounded-xl p-5 flex items-center gap-4 transition-all
                        ${paymentMethod === "ONLINE" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${paymentMethod === "ONLINE" ? "bg-red-100" : "bg-gray-100"}`}
                      >
                        💳
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold">Online Payment</p>
                        <p className="text-sm text-gray-500">
                          UPI, Cards, Net Banking via Razorpay
                        </p>
                        <div className="flex gap-2 mt-2">
                          {["UPI", "Visa", "Mastercard", "NetBanking"].map(
                            (m) => (
                              <span
                                key={m}
                                className="text-xs bg-white border rounded px-2 py-0.5 text-gray-600"
                              >
                                {m}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "ONLINE" ? "border-red-500" : "border-gray-300"}`}
                      >
                        {paymentMethod === "ONLINE" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        )}
                      </div>
                    </button>
                  </div>

                  {paymentMethod === "ONLINE" && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-blue-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <p className="text-sm text-blue-700">
                        Secure payment via <strong>Razorpay</strong>. Card
                        details are never stored.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Address:</span> {address}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {deliveryDate}{" "}
                      · {timeSlots[selectedSlot]}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStep("details");
                      setCreatedOrders([]);
                      setCreatedPayment(null);
                    }}
                    className="mt-4 text-sm text-gray-500 hover:text-red-600 underline"
                  >
                    ← Edit delivery details
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="bg-white border rounded-xl p-6 h-fit sticky top-6">
              <h3 className="font-bold mb-4">Order Summary</h3>

              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 mb-4">
                  <img
                    // ✅ FIXED
src={
  item.product_detail?.image ||
  item.combo_product_detail?.image ||
  PLACEHOLDER
}
                    className="w-16 h-16 object-contain border rounded"
                    onError={(e) => (e.target.src = PLACEHOLDER)}
                    alt="product"
                  />
                  <div className="text-sm flex-1">
                    <p className="font-semibold">
                      {item.product_detail?.name ||
                        item.combo_product_detail?.name}
                    </p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="ml-auto font-semibold text-sm">
                    ₹
                    {item.product_detail?.price ||
                      item.combo_product_detail?.price}
                  </span>
                </div>
              ))}

              <div className="space-y-2 text-sm border-t pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon ({couponCode})</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                {isExchange && exchangeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Exchange Discount</span>
                    <span>-₹{exchangeDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {step === "details" ? (
                <button
                  onClick={handleContinueToPayment}
                  disabled={loading}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors text-white
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-black"}`}
                >
                  {loading ? "Creating Order..." : "Continue to Payment →"}
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !paymentMethod}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors text-white
                    ${loading || !paymentMethod ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-black"}`}
                >
                  {loading
                    ? "Processing..."
                    : paymentMethod === "COD"
                      ? "Place Order (COD)"
                      : paymentMethod === "ONLINE"
                        ? `Pay ₹${total.toFixed(0)} Online`
                        : "Select Payment Method"}
                </button>
              )}

              <p className="text-xs text-gray-500 mt-2 text-center">
                🔒 Secure checkout · 256-bit SSL
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   createOrder,
//   getCartItems,
//   createInstallation,
//   BASE_URL,
// } from "../context/authApi";

// const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("morning");
//   const [installation, setInstallation] = useState("standard");

//   const couponDiscount    = location.state?.couponDiscount    || 0;
//   const couponCode        = location.state?.couponCode        || "";
//   const exchangeDiscount  = location.state?.exchangeDiscount  || 0;
//   const isExchange        = location.state?.isExchange        || false;

//   const timeSlots = {
//     morning:   "10AM",
//     afternoon: "2PM",
//     evening:   "6PM",
//     express:   "Express",
//   };

//   useEffect(() => {
//     getCartItems()
//       .then((data) => setCartItems(data.results || data))
//       .catch((err) => console.log(err));

//     const today = new Date().toISOString().split("T")[0];
//     setDeliveryDate(today);
//   }, []);

//   const subtotal = cartItems.reduce((acc, item) => {
//     const price = item.product_detail?.price || item.combo_product_detail?.price || 0;
//     return acc + parseFloat(price) * item.quantity;
//   }, 0);

//   const total = subtotal - couponDiscount - exchangeDiscount;

//   const handlePlaceOrder = async () => {
//     if (!address) {
//       alert("Please enter delivery address!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const orderPromises = cartItems.map((item) => {
//         // ── Build payload correctly based on product vs combo ──────────────
//         const payload = {
//           quantity: item.quantity,
//           delivery_date: deliveryDate,
//           delivery_time: timeSlots[selectedSlot],
//           shipping_address: address,
//           billing_address: address,
//           is_exchange: isExchange,
//         };

//         if (item.combo_product) {
//           // Combo product order
//           payload.combo_product = item.combo_product;
//         } else {
//           // Regular product order
//           payload.product = item.product;
//         }

//         return createOrder(payload);
//       });

//       const orders = await Promise.all(orderPromises);

//       if (installation !== "none") {
//         await createInstallation({
//           address: address,
//           scheduled_date: deliveryDate,
//           scheduled_time: timeSlots[selectedSlot],
//         });
//       }

//       const firstOrder = orders[0];
//       navigate("/orderconfirm", {
//         state: { order: firstOrder, cartItems, address },
//       });
//     } catch (err) {
//       alert("Order failed: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <section className="bg-gray-100 py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* DELIVERY ADDRESS */}
//             <div className="bg-white border rounded-xl p-6">
//               <h3 className="font-bold text-lg mb-4">Delivery Address</h3>
//               <textarea
//                 placeholder="Enter your full delivery address..."
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full border rounded-lg p-4 text-sm h-24 focus:outline-red-500"
//                 required
//               />
//             </div>

//             {/* DELIVERY SCHEDULE */}
//             <div className="bg-white border rounded-xl p-6">
//               <h3 className="font-bold mb-4">Delivery Schedule</h3>
//               <p className="text-sm mb-2">Select Delivery Date</p>
//               <input
//                 type="date"
//                 value={deliveryDate}
//                 onChange={(e) => setDeliveryDate(e.target.value)}
//                 className="border rounded-lg px-4 py-2 mb-6 w-full"
//                 min={new Date().toISOString().split("T")[0]}
//               />
//               <p className="text-sm mb-2">Select Time Slot</p>
//               <div className="grid md:grid-cols-2 gap-3">
//                 {[
//                   { id: "morning",   label: "9:00 AM - 12:00 PM", price: "Free" },
//                   { id: "afternoon", label: "2:00 PM - 6:00 PM",  price: "Free" },
//                   { id: "evening",   label: "6:00 PM - 9:00 PM",  price: "₹5.99" },
//                   { id: "express",   label: "Express (2 Hours)",   price: "₹15.99" },
//                 ].map((slot) => (
//                   <button
//                     key={slot.id}
//                     onClick={() => setSelectedSlot(slot.id)}
//                     className={`border rounded-lg p-3 flex justify-between ${selectedSlot === slot.id ? "border-blue-500 bg-blue-50" : ""}`}
//                   >
//                     <span>{slot.label}</span>
//                     <span className="text-sm text-green-600">{slot.price}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* INSTALLATION */}
//             <div className="bg-white border rounded-xl p-6">
//               <h3 className="font-bold mb-4">Installation Service</h3>
//               <div className="space-y-3">
//                 {[
//                   { id: "standard", title: "Standard Installation", price: "₹49.99" },
//                   { id: "premium",  title: "Premium Installation",  price: "₹89.99" },
//                   { id: "none",     title: "No Installation",       price: "Free" },
//                 ].map((opt) => (
//                   <label
//                     key={opt.id}
//                     className={`border rounded-lg p-4 flex justify-between cursor-pointer ${installation === opt.id ? "border-blue-500 bg-blue-50" : ""}`}
//                   >
//                     <div>
//                       <input
//                         type="radio"
//                         name="installation"
//                         checked={installation === opt.id}
//                         onChange={() => setInstallation(opt.id)}
//                         className="mr-2"
//                       />
//                       {opt.title}
//                     </div>
//                     <span className="text-sm text-green-600">{opt.price}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE ORDER SUMMARY */}
//           <div className="bg-white border rounded-xl p-6 h-fit">
//             <h3 className="font-bold mb-4">Order Summary</h3>

//             {cartItems.map((item) => (
//               <div key={item.id} className="flex gap-3 mb-4">
//                 <img
//                   src={
//                     item.product_detail?.image
//                       ? `${BASE_URL}${item.product_detail.image}`
//                       : item.combo_product_detail?.image
//                       ? `${BASE_URL}${item.combo_product_detail.image}`
//                       : PLACEHOLDER
//                   }
//                   className="w-16 h-16 object-contain border rounded"
//                   onError={(e) => (e.target.src = PLACEHOLDER)}
//                 />
//                 <div className="text-sm flex-1">
//                   <p className="font-semibold">
//                     {item.product_detail?.name || item.combo_product_detail?.name}
//                   </p>
//                   <p className="text-gray-500">Qty: {item.quantity}</p>
//                 </div>
//                 <span className="ml-auto font-semibold">
//                   ₹{item.product_detail?.price || item.combo_product_detail?.price}
//                 </span>
//               </div>
//             ))}

//             <div className="space-y-2 text-sm border-t pt-3">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//               {couponDiscount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Coupon Discount</span>
//                   <span>-₹{couponDiscount.toFixed(2)}</span>
//                 </div>
//               )}
//               {isExchange && exchangeDiscount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Exchange Discount</span>
//                   <span>-₹{exchangeDiscount.toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between font-bold text-lg pt-2 border-t">
//                 <span>Total</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div>
//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="w-full mt-6 bg-red-600 hover:bg-black text-white py-3 rounded-lg"
//             >
//               {loading ? "Placing Order..." : "Continue to Payment"}
//             </button>
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               Secure checkout with 256-bit SSL encryption
//             </p>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Checkout;
