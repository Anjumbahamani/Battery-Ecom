

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircle, MapPin, Calendar, CreditCard, Mail } from "lucide-react";
import Footer from "../components/Footer";
// import { BASE_URL } from "../context/authApi";
import TopBar from "../components/TopBar";
import { BASE_URL, clearCart } from "../context/authApi";

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

const getItemDetail = (item) => item.product_detail || item.combo_product_detail || {};

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order     = state?.order;
  const cartItems = state?.cartItems || [];
  const address   = state?.address || order?.shipping_address || "N/A";
  const total     = state?.total || cartItems.reduce((acc, item) => {
    const detail = getItemDetail(item);
    return acc + parseFloat(detail.price || 0) * item.quantity;
  }, 0);

  const [invoiceStatus, setInvoiceStatus] = useState(null); // "sent" | "error" | null

  // ── Fetch invoice and trigger email on mount ──────────────────────────────
  // useEffect(() => {
  //   if (!order?.id) return;

  //   clearCart().catch((err) => console.log("Cart clear failed:", err));

  //   const triggerInvoice = async () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       const headers = { Authorization: `Bearer ${token}` };

  //       // Step 1 — Get invoice for this specific order
  //       const res = await fetch(`${BASE_URL}/api/invoices/?order=${order.id}`, { headers });
  //       if (!res.ok) throw new Error("Failed to fetch invoice");

  //       const data = await res.json();
  //       const invoices = data.results || data;
  //       const invoice = invoices[0]; // first match

  //       if (!invoice) {
  //         console.warn("No invoice found for order", order.id);
  //         return;
  //       }

  //       // Step 2 — Hit download_pdf to trigger email to customer
  //       const pdfRes = await fetch(
  //         `${BASE_URL}/api/invoices/${invoice.id}/download_pdf/`,
  //         { headers }
  //       );

  //       if (pdfRes.ok) {
  //         setInvoiceStatus("sent");
  //         console.log("Invoice email triggered successfully");
  //       } else {
  //         throw new Error("PDF trigger failed");
  //       }

  //     } catch (err) {
  //       console.error("Invoice error:", err);
  //       setInvoiceStatus("error");
  //     }
  //   };

  //   triggerInvoice();
  // }, [order?.id]);


  useEffect(() => {
  if (!order?.id) return;

  clearCart().catch((err) => console.log("Cart clear failed:", err));

  const triggerInvoice = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      // ✅ Wait 2 seconds for backend to generate the invoice
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(`${BASE_URL}/api/invoices/?order=${order.id}`, { headers });
      if (!res.ok) throw new Error("Failed to fetch invoice");

      const data = await res.json();
      const invoices = data.results || data;
      const invoice = invoices[0];

      console.log("Invoices found:", invoices); // ✅ check what comes back

      if (!invoice) {
        console.warn("No invoice found for order", order.id);
        setInvoiceStatus("error");
        return;
      }

      const pdfRes = await fetch(
        `${BASE_URL}/api/invoices/${invoice.id}/download_pdf/`,
        { headers }
      );

      console.log("PDF trigger status:", pdfRes.status); // ✅ check response

      if (pdfRes.ok) {
        setInvoiceStatus("sent");
      } else {
        const errBody = await pdfRes.json().catch(() => ({}));
        console.error("PDF trigger failed:", errBody); // ✅ see exact error
        throw new Error("PDF trigger failed");
      }

    } catch (err) {
      console.error("Invoice error:", err);
      setInvoiceStatus("error");
    }
  };

  triggerInvoice();
}, [order?.id]);

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="bg-gray-100 py-14">
        <div className="max-w-3xl mx-auto px-6">

          {/* SUCCESS ICON */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-500 mt-2">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>

            {/* Invoice email status */}
            {invoiceStatus === "sent" && (
              <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-lg">
                <Mail size={16} />
                Invoice sent to your registered email!
              </div>
            )}
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
                <span>#{order?.id || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} /> Delivery Date
                </span>
                <span>{order?.delivery_date || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-semibold">₹{parseFloat(total).toFixed(2)}</span>
              </div>

              {/* ADDRESS */}
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <MapPin size={16} /> Delivery Address
                </div>
                <p className="text-gray-600 text-sm">{address}</p>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const detail  = getItemDetail(item);
                  const isCombo = !!item.combo_product_detail;
                  const imgSrc  = detail.image
                    ? detail.image.startsWith("http")
                      ? detail.image
                      : `${BASE_URL}${detail.image}`
                    : PLACEHOLDER;

                  return (
                    <div key={item.id} className="flex items-center gap-4 border rounded-lg p-3">
                      <img
                        src={imgSrc}
                        className="w-14 h-14 object-contain"
                        onError={(e) => (e.target.src = PLACEHOLDER)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{detail.name || "N/A"}</p>
                          {isCombo && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Combo
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        {isCombo && (detail.battery_name || detail.inverter_name) && (
                          <div className="text-xs text-gray-400 mt-1 space-y-0.5">
                            {detail.battery_name  && <p>🔋 {detail.battery_name}</p>}
                            {detail.inverter_name && <p>⚡ {detail.inverter_name}</p>}
                          </div>
                        )}
                      </div>
                      <span className="font-semibold">₹{detail.price || "N/A"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            {/* <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-black transition"
            >
              Track Your Order
            </button> */}
            <button
              onClick={() => navigate("/")}
              className="border px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
            >
              Go to Home
            </button>
          </div>

          {/* WHAT HAPPENS NEXT */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
            <h3 className="font-semibold mb-3">What Happens Next?</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✔ We will prepare your order and schedule delivery within 1-2 business days.</li>
              <li>✔ Our delivery team will contact you 24 hours before delivery.</li>
              <li>✔ Professional installation will be completed on delivery day.</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="bg-white border rounded-xl p-6 mt-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Our customer support team is here to assist you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Call Support</button>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Email Us</button>
              {/* <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Live Chat</button> */}
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderConfirmation;

// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { CheckCircle, MapPin, Calendar, CreditCard } from "lucide-react";
// import Footer from "../components/Footer";
// import { BASE_URL } from "../context/authApi";
// import TopBar from "../components/TopBar";

// const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

// // ── Helper to get correct detail regardless of product or combo ──────────────
// const getItemDetail = (item) => item.product_detail || item.combo_product_detail || {};

// // const OrderConfirmation = () => {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();
// //   const order     = state?.order;
// //   const cartItems = state?.cartItems || [];
// //   const address   = state?.address || order?.shipping_address || "N/A";

// //   const total = cartItems.reduce((acc, item) => {
// //     const detail = getItemDetail(item);
// //     return acc + parseFloat(detail.price || 0) * item.quantity;
// //   }, 0);
//   const OrderConfirmation = () => {
//   const { state } = useLocation();
//   const order     = state?.order;
//   const cartItems = state?.cartItems || [];
//   const address   = state?.address || order?.shipping_address || "N/A";
//   const total     = state?.total || cartItems.reduce((acc, item) => {
//     const detail = getItemDetail(item);
//     return acc + parseFloat(detail.price || 0) * item.quantity;
//   }, 0);


//   // In OrderConfirmation.jsx
// useEffect(() => {
//   if (!order?.id) return;

//   const fetchInvoice = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");

//       // Step 1: Get invoice list and find the one for this order
//       const res = await fetch(`${BASE_URL}/api/invoices/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       const invoices = data.results || data;
//       const invoice = invoices.find((inv) => inv.order === order.id);

//       if (!invoice) return console.warn("No invoice found for this order");

//       // Step 2: Hit download_pdf to trigger email or generate PDF
//       await fetch(`${BASE_URL}/api/invoices/${invoice.id}/download_pdf/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//     } catch (err) {
//       console.error("Invoice error:", err);
//     }
//   };

//   fetchInvoice();
// }, []);


//   return (
//     <>
//     <TopBar/>
//       <Navbar />
//       <section className="bg-gray-100 py-14">
//         <div className="max-w-3xl mx-auto px-6">

//           {/* SUCCESS ICON */}
//           <div className="text-center">
//             <div className="flex justify-center mb-4">
//               <CheckCircle size={60} className="text-green-500" />
//             </div>
//             <h1 className="text-3xl font-bold">Order Confirmed!</h1>
//             <p className="text-gray-500 mt-2">
//               Thank you for your purchase. Your order has been successfully placed and is being processed.
//             </p>
//           </div>

//           {/* ORDER DETAILS CARD */}
//           <div className="bg-white border rounded-xl shadow-sm mt-8">
//             <div className="bg-red-600 text-white font-semibold px-6 py-3 rounded-t-xl">
//               Order Details
//             </div>
//             <div className="p-6 space-y-4 text-sm">
//               <div className="flex justify-between">
//                 <span className="flex items-center gap-2 text-gray-600">
//                   <CreditCard size={16} /> Order ID
//                 </span>
//                 <span>#{order?.id || "N/A"}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="flex items-center gap-2 text-gray-600">
//                   <Calendar size={16} /> Delivery Date
//                 </span>
//                 <span>{order?.delivery_date || "N/A"}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total Amount</span>
//                 <span className="font-semibold">₹{parseFloat(total).toFixed(2)}</span>
//               </div>

//               {/* ADDRESS */}
//               <div className="bg-gray-50 border rounded-lg p-4">
//                 <div className="flex items-center gap-2 font-semibold mb-2">
//                   <MapPin size={16} /> Delivery Address
//                 </div>
//                 <p className="text-gray-600 text-sm">{address}</p>
//               </div>

//               {/* ORDER ITEMS */}
//               <div className="space-y-3">
//                 {cartItems.map((item) => {
//                   const detail    = getItemDetail(item);
//                   const isCombo   = !!item.combo_product_detail;
//                   const imgSrc    = detail.image ? `${BASE_URL}${detail.image}` : PLACEHOLDER;

//                   return (
//                     <div key={item.id} className="flex items-center gap-4 border rounded-lg p-3">
//                       <img
//                         src={imgSrc}
//                         className="w-14 h-14 object-contain"
//                         onError={(e) => (e.target.src = PLACEHOLDER)}
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <p className="font-semibold text-sm">{detail.name || "N/A"}</p>
//                           {isCombo && (
//                             <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
//                               Combo
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
//                         {/* Show combo items breakdown if available */}
//                         {isCombo && (detail.battery_name || detail.inverter_name) && (
//                           <div className="text-xs text-gray-400 mt-1 space-y-0.5">
//                             {detail.battery_name  && <p>🔋 {detail.battery_name}</p>}
//                             {detail.inverter_name && <p>⚡ {detail.inverter_name}</p>}
//                           </div>
//                         )}
//                       </div>
//                       <span className="font-semibold">₹{detail.price || "N/A"}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
//             <button
//               onClick={() => navigate("/profile")}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-black transition"
//             >
//               Track Your Order
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="border px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
//             >
//               Go to Home
//             </button>
//           </div>

//           {/* WHAT HAPPENS NEXT */}
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
//             <h3 className="font-semibold mb-3">What Happens Next?</h3>
//             <ul className="text-sm text-gray-700 space-y-2">
//               <li>✔ We will prepare your order and schedule delivery within 1-2 business days.</li>
//               <li>✔ Our delivery team will contact you 24 hours before delivery.</li>
//               <li>✔ Professional installation will be completed on delivery day.</li>
//             </ul>
//           </div>

//           {/* SUPPORT */}
//           <div className="bg-white border rounded-xl p-6 mt-6 text-center">
//             <h3 className="font-semibold mb-2">Need Help?</h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Our customer support team is here to assist you.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Call Support</button>
//               <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Email Us</button>
//               <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Live Chat</button>
//             </div>
//           </div>

//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default OrderConfirmation;

