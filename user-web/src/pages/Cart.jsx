
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   getCartItems,
//   deleteCartItem,
//   applyCoupon,
//   getCoupons,
//   BASE_URL,
// } from "../context/authApi";

// const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

// // ─── Helper: returns whichever detail object is present ───────────────────────
// const getDetail = (item) => item.product_detail || item.combo_product_detail;
// const isCombo = (item) => !item.product_detail && !!item.combo_product_detail;

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [couponMsg, setCouponMsg] = useState("");
//   const [availableCoupons, setAvailableCoupons] = useState([]);

//   // ─── Exchange State ───────────────────────────────────────────────────────
//   const [exchangeChecked, setExchangeChecked] = useState(false);
//   const [exchangeDiscount, setExchangeDiscount] = useState(0);
//   const [exchangeAvailable, setExchangeAvailable] = useState(false);

//   useEffect(() => {
//     fetchCart();
//     fetchCoupons();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const data = await getCartItems();
//       const items = data.results || data;
//       setCartItems(items);

//       // Only regular products can have exchange_available (combo products don't)
//       const exchangeItems = items.filter(
//         (item) => item.product_detail?.exchange_available
//       );

//       if (exchangeItems.length > 0) {
//         setExchangeAvailable(true);
//         const totalExchangeDiscount = exchangeItems.reduce(
//           (acc, item) =>
//             acc + parseFloat(item.product_detail?.exchange_discount || 0) * item.quantity,
//           0
//         );
//         setExchangeDiscount(totalExchangeDiscount);
//       } else {
//         setExchangeAvailable(false);
//         setExchangeDiscount(0);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const fetchCoupons = async () => {
//     try {
//       const data = await getCoupons();
//       setAvailableCoupons(data.results || data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await deleteCartItem(id);
//       setCartItems(cartItems.filter((item) => item.id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const updateQty = (id, type) => {
//     setCartItems((items) =>
//       items.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity:
//                 type === "inc"
//                   ? item.quantity + 1
//                   : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const result = await applyCoupon(couponCode);
//       const discount =
//         result.discount?.amount > 0
//           ? result.discount.amount
//           : (subtotal * result.discount?.percent) / 100;
//       setCouponDiscount(discount);
//       setCouponMsg(result.message || "Coupon applied successfully!");
//     } catch (err) {
//       setCouponMsg("Invalid coupon code!");
//       setCouponDiscount(0);
//     }
//   };

//   // ─── Use getDetail() for subtotal so combo prices are included ────────────
//   const subtotal = cartItems.reduce(
//     (acc, item) =>
//       acc + parseFloat(getDetail(item)?.price || 0) * item.quantity,
//     0
//   );

//   const appliedExchangeDiscount = exchangeChecked ? exchangeDiscount : 0;
//   const delivery = 0;
//   const total = subtotal - couponDiscount - appliedExchangeDiscount + delivery;

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

//           {/* LEFT CART ITEMS */}
//           <div className="lg:col-span-2">
//             <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//             {loading && <p className="text-gray-500">Loading cart...</p>}

//             {!loading && cartItems.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 text-lg">Your cart is empty!</p>
//                 <button
//                   onClick={() => navigate("/product")}
//                   className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
//                 >
//                   Shop Now
//                 </button>
//               </div>
//             )}

//             <div className="space-y-6">
//               {cartItems.map((item) => {
//                 const detail = getDetail(item);
//                 const combo = isCombo(item);

//                 return (
//                   <div
//                     key={item.id}
//                     className="border rounded-xl p-5 flex gap-5 items-center"
//                   >
//                     <img
//                       src={
//                         detail?.image
//                           ? `${BASE_URL}${detail.image}`
//                           : PLACEHOLDER
//                       }
//                       className="w-24 h-24 object-contain"
//                       onError={(e) => (e.target.src = PLACEHOLDER)}
//                     />

//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-semibold">{detail?.name}</h3>
//                         {combo && (
//                           <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                             Combo
//                           </span>
//                         )}
//                       </div>

//                       {/* Show combo components */}
//                       {combo && (
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           {detail?.battery_name} + {detail?.inverter_name}
//                         </p>
//                       )}

//                       <p className="text-red-600 font-bold mt-1">
//                         ₹{detail?.price}
//                       </p>

//                       {/* Exchange badge — only for regular products */}
//                       {!combo && item.product_detail?.exchange_available && (
//                         <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                           Exchange available — Save ₹{item.product_detail?.exchange_discount}
//                         </span>
//                       )}

//                       {/* Qty */}
//                       <div className="flex items-center gap-3 mt-3">
//                         <button
//                           onClick={() => updateQty(item.id, "dec")}
//                           className="border px-3 rounded"
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           onClick={() => updateQty(item.id, "inc")}
//                           className="border px-3 rounded"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="text-sm text-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 );
//               })}

//               {/* Exchange banner — only if products support it */}
//               {cartItems.length > 0 && exchangeAvailable && (
//                 <div
//                   onClick={() => setExchangeChecked(!exchangeChecked)}
//                   className={`border rounded-lg p-4 flex justify-between items-center cursor-pointer transition ${
//                     exchangeChecked
//                       ? "bg-green-50 border-green-500"
//                       : "bg-gray-50 border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={exchangeChecked}
//                       onChange={() => {}}
//                       className="accent-green-600 w-4 h-4"
//                     />
//                     <div>
//                       <p className="font-semibold">Exchange Your Old Battery</p>
//                       <p className="text-sm text-gray-500">
//                         Get instant discount on eligible products
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-green-600 font-bold">
//                     -₹{exchangeDiscount.toFixed(0)}
//                   </span>
//                 </div>
//               )}

//               {/* Not available message */}
//               {cartItems.length > 0 && !exchangeAvailable && !loading && (
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center opacity-60">
//                   <div>
//                     <p className="font-semibold">Exchange Your Old Battery</p>
//                     <p className="text-sm text-gray-500">
//                       No eligible products in cart for exchange
//                     </p>
//                   </div>
//                   <span className="text-gray-400 font-bold">N/A</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT ORDER SUMMARY */}
//           <div className="space-y-6">

//             {/* COUPON */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-3">Apply Coupon</h3>
//               {availableCoupons && availableCoupons.length > 0 && (
//                 <div className="mb-3">
//                   <p className="text-xs text-gray-500 mb-2">Available Coupons:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {availableCoupons.map((coupon) => (
//                       <button
//                         key={coupon.id}
//                         onClick={() => setCouponCode(coupon.code)}
//                         className="text-xs border border-dashed border-red-400 text-red-600 px-2 py-1 rounded-lg hover:bg-red-50"
//                       >
//                         {coupon.code} —{" "}
//                         {coupon.discount_percent > 0
//                           ? `${coupon.discount_percent}% off`
//                           : `₹${coupon.discount_amount} off`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   className="border rounded-lg px-3 py-2 flex-1"
//                 />
//                 <button
//                   onClick={handleApplyCoupon}
//                   className="bg-red-600 text-white px-4 rounded-lg"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponMsg && (
//                 <p className={`text-sm mt-2 ${couponDiscount > 0 ? "text-green-600" : "text-red-500"}`}>
//                   {couponMsg}
//                 </p>
//               )}
//             </div>

//             {/* ORDER SUMMARY */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-4">Order Summary</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span className="text-green-600">Free</span>
//                 </div>
//                 {exchangeChecked && appliedExchangeDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Exchange Discount</span>
//                     <span>-₹{appliedExchangeDiscount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Coupon Discount</span>
//                   <span>-₹{couponDiscount}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-3 border-t pt-3">
//                   <span>Total Amount</span>
//                   <span className="text-red-600">₹{total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* DELIVERY INFO */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-3">Delivery Information</h3>
//               <ul className="text-sm space-y-2 text-gray-600">
//                 <li>✔ Standard Delivery</li>
//                 <li>✔ Installation Service Available</li>
//               </ul>
//             </div>

//             {/* CHECKOUT BUTTON */}
//             <button
//               onClick={() =>
//                 navigate("/checkout", {
//                   state: {
//                     couponDiscount,
//                     couponCode,
//                     exchangeDiscount: appliedExchangeDiscount,
//                     isExchange: exchangeChecked,
//                   },
//                 })
//               }
//               className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Cart;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getCartItems,
  deleteCartItem,
  applyCoupon,
  getCoupons,
  BASE_URL,
} from "../context/authApi";
import TopBar from "../components/TopBar";

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

// ─── Helper: returns whichever detail object is present ───────────────────────
const getDetail = (item) => item.product_detail || item.combo_product_detail;
const isCombo = (item) => !item.product_detail && !!item.combo_product_detail;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);

  // ─── Exchange State ───────────────────────────────────────────────────────
  const [exchangeChecked, setExchangeChecked] = useState(false);
  const [exchangeDiscount, setExchangeDiscount] = useState(0);
  const [exchangeAvailable, setExchangeAvailable] = useState(false);

  useEffect(() => {
    fetchCart();
    fetchCoupons();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      const items = data.results || data;
      setCartItems(items);

      // Only regular products can have exchange_available (combo products don't)
      const exchangeItems = items.filter(
        (item) => item.product_detail?.exchange_available
      );

      if (exchangeItems.length > 0) {
        setExchangeAvailable(true);
        const totalExchangeDiscount = exchangeItems.reduce(
          (acc, item) =>
            acc + parseFloat(item.product_detail?.exchange_discount || 0) * item.quantity,
          0
        );
        setExchangeDiscount(totalExchangeDiscount);
      } else {
        setExchangeAvailable(false);
        setExchangeDiscount(0);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      const data = await getCoupons();
      setAvailableCoupons(data.results || data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const updateQty = (id, type) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleApplyCoupon = async () => {
    try {
      const result = await applyCoupon(couponCode);
      const discount =
        result.discount?.amount > 0
          ? result.discount.amount
          : (subtotal * result.discount?.percent) / 100;
      setCouponDiscount(discount);
      setCouponMsg(result.message || "Coupon applied successfully!");
    } catch (err) {
      setCouponMsg("Invalid coupon code!");
      setCouponDiscount(0);
    }
  };

  // ─── Use getDetail() for subtotal so combo prices are included ────────────
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(getDetail(item)?.price || 0) * item.quantity,
    0
  );

  const appliedExchangeDiscount = exchangeChecked ? exchangeDiscount : 0;
  const delivery = 0;
  const total = subtotal - couponDiscount - appliedExchangeDiscount + delivery;

  return (
    <>
    <TopBar/>
      <Navbar />
      <section className="bg-white py-8 sm:py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

          {/* LEFT CART ITEMS */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">Shopping Cart</h1>

            {loading && <p className="text-gray-500 text-sm sm:text-base">Loading cart...</p>}

            {!loading && cartItems.length === 0 && (
              <div className="text-center py-12 sm:py-20">
                <p className="text-gray-500 text-base sm:text-lg">Your cart is empty!</p>
                <button
                  onClick={() => navigate("/product")}
                  className="mt-4 bg-red-600 text-white px-5 sm:px-6 py-2 rounded-lg text-sm sm:text-base"
                >
                  Shop Now
                </button>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item) => {
                const detail = getDetail(item);
                const combo = isCombo(item);

                return (
                  <div
                    key={item.id}
                    className="border rounded-xl p-3 sm:p-5 flex gap-3 sm:gap-5 items-start sm:items-center"
                  >
                    <img
                      
src={detail?.image || PLACEHOLDER}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-contain flex-shrink-0"
                      onError={(e) => (e.target.src = PLACEHOLDER)}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm sm:text-base leading-snug">{detail?.name}</h3>
                        {combo && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                            Combo
                          </span>
                        )}
                      </div>

                      {/* Show combo components */}
                      {combo && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {detail?.battery_name} + {detail?.inverter_name}
                        </p>
                      )}

                      <p className="text-red-600 font-bold mt-1 text-sm sm:text-base">
                        ₹{detail?.price}
                      </p>

                      {/* Exchange badge — only for regular products */}
                      {!combo && item.product_detail?.exchange_available && (
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Exchange available — Save ₹{item.product_detail?.exchange_discount}
                        </span>
                      )}

                      {/* Qty */}
                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                        <button
                          onClick={() => updateQty(item.id, "dec")}
                          className="border px-2 sm:px-3 rounded text-sm sm:text-base leading-6"
                        >
                          -
                        </button>
                        <span className="text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, "inc")}
                          className="border px-2 sm:px-3 rounded text-sm sm:text-base leading-6"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs sm:text-sm text-red-600 flex-shrink-0 self-start sm:self-center"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              {/* Exchange banner — only if products support it */}
              {cartItems.length > 0 && exchangeAvailable && (
                <div
                  onClick={() => setExchangeChecked(!exchangeChecked)}
                  className={`border rounded-lg p-3 sm:p-4 flex justify-between items-center cursor-pointer transition ${
                    exchangeChecked
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={exchangeChecked}
                      onChange={() => {}}
                      className="accent-green-600 w-4 h-4 flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Exchange Your Old Battery</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Get instant discount on eligible products
                      </p>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold text-sm sm:text-base ml-2 whitespace-nowrap">
                    -₹{exchangeDiscount.toFixed(0)}
                  </span>
                </div>
              )}

              {/* Not available message */}
              {cartItems.length > 0 && !exchangeAvailable && !loading && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 flex justify-between items-center opacity-60">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Exchange Your Old Battery</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      No eligible products in cart for exchange
                    </p>
                  </div>
                  <span className="text-gray-400 font-bold text-sm sm:text-base ml-2">N/A</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT ORDER SUMMARY */}
          <div className="space-y-4 sm:space-y-6">

            {/* COUPON */}
            <div className="border rounded-xl p-4 sm:p-5">
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Apply Coupon</h3>
              {availableCoupons && availableCoupons.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-2">Available Coupons:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <button
                        key={coupon.id}
                        onClick={() => setCouponCode(coupon.code)}
                        className="text-xs border border-dashed border-red-400 text-red-600 px-2 py-1 rounded-lg hover:bg-red-50"
                      >
                        {coupon.code} —{" "}
                        {coupon.discount_percent > 0
                          ? `${coupon.discount_percent}% off`
                          : `₹${coupon.discount_amount} off`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border rounded-lg px-2 sm:px-3 py-2 flex-1 text-sm sm:text-base min-w-0"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-red-600 text-white px-3 sm:px-4 rounded-lg text-sm sm:text-base whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`text-xs sm:text-sm mt-2 ${couponDiscount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div className="border rounded-xl p-4 sm:p-5">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Order Summary</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                {exchangeChecked && appliedExchangeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Exchange Discount</span>
                    <span>-₹{appliedExchangeDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
                <div className="flex justify-between font-bold text-base sm:text-lg mt-3 border-t pt-3">
                  <span>Total Amount</span>
                  <span className="text-red-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="border rounded-xl p-4 sm:p-5">
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Delivery Information</h3>
              <ul className="text-xs sm:text-sm space-y-2 text-gray-600">
                <li>✔ Standard Delivery</li>
                <li>✔ Installation Service Available</li>
              </ul>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    couponDiscount,
                    couponCode,
                    exchangeDiscount: appliedExchangeDiscount,
                    isExchange: exchangeChecked,
                  },
                })
              }
              className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold text-sm sm:text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   getCartItems,
//   deleteCartItem,
//   applyCoupon,
//   getCoupons,
//   BASE_URL,
// } from "../context/authApi";

// const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [couponMsg, setCouponMsg] = useState("");
//   const [availableCoupons, setAvailableCoupons] = useState([]);

//   // ─── Exchange State ───────────────────────────────────────────────────────
//   const [exchangeChecked, setExchangeChecked] = useState(false);
//   const [exchangeDiscount, setExchangeDiscount] = useState(0);
//   const [exchangeAvailable, setExchangeAvailable] = useState(false);

//   useEffect(() => {
//     fetchCart();
//     fetchCoupons();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const data = await getCartItems();
//       const items = data.results || data;
//       setCartItems(items);

//       // ── Check if any cart item has exchange available ──────────────────────
//       const exchangeItems = items.filter(
//         (item) => item.product_detail?.exchange_available
//       );

//       if (exchangeItems.length > 0) {
//         setExchangeAvailable(true);
//         // Sum up exchange discounts from all eligible products
//         const totalExchangeDiscount = exchangeItems.reduce(
//           (acc, item) =>
//             acc + parseFloat(item.product_detail?.exchange_discount || 0) * item.quantity,
//           0
//         );
//         setExchangeDiscount(totalExchangeDiscount);
//       } else {
//         setExchangeAvailable(false);
//         setExchangeDiscount(0);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const fetchCoupons = async () => {
//     try {
//       const data = await getCoupons();
//       setAvailableCoupons(data.results || data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await deleteCartItem(id);
//       setCartItems(cartItems.filter((item) => item.id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const updateQty = (id, type) => {
//     setCartItems((items) =>
//       items.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity:
//                 type === "inc"
//                   ? item.quantity + 1
//                   : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const result = await applyCoupon(couponCode);
//       const discount =
//         result.discount?.amount > 0
//           ? result.discount.amount
//           : (subtotal * result.discount?.percent) / 100;
//       setCouponDiscount(discount);
//       setCouponMsg(result.message || "Coupon applied successfully!");
//     } catch (err) {
//       setCouponMsg("Invalid coupon code!");
//       setCouponDiscount(0);
//     }
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) =>
//       acc + parseFloat(item.product_detail?.price || 0) * item.quantity,
//     0
//   );

//   const appliedExchangeDiscount = exchangeChecked ? exchangeDiscount : 0;
//   const delivery = 0;
//   const total = subtotal - couponDiscount - appliedExchangeDiscount + delivery;

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

//           {/* LEFT CART ITEMS */}
//           <div className="lg:col-span-2">
//             <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//             {loading && <p className="text-gray-500">Loading cart...</p>}

//             {!loading && cartItems.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 text-lg">Your cart is empty!</p>
//                 <button
//                   onClick={() => navigate("/product")}
//                   className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
//                 >
//                   Shop Now
//                 </button>
//               </div>
//             )}

//             <div className="space-y-6">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border rounded-xl p-5 flex gap-5 items-center"
//                 >
//                   <img
//                     src={
//                       item.product_detail?.image
//                         ? `${BASE_URL}${item.product_detail.image}`
//                         : PLACEHOLDER
//                     }
//                     className="w-24 h-24 object-contain"
//                     onError={(e) => (e.target.src = PLACEHOLDER)}
//                   />

//                   <div className="flex-1">
//                     <h3 className="font-semibold">{item.product_detail?.name}</h3>
//                     <p className="text-red-600 font-bold mt-1">
//                       ₹{item.product_detail?.price}
//                     </p>

//                     {/* Exchange badge on individual item */}
//                     {item.product_detail?.exchange_available && (
//                       <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                         Exchange available — Save ₹{item.product_detail?.exchange_discount}
//                       </span>
//                     )}

//                     {/* Qty */}
//                     <div className="flex items-center gap-3 mt-3">
//                       <button
//                         onClick={() => updateQty(item.id, "dec")}
//                         className="border px-3 rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => updateQty(item.id, "inc")}
//                         className="border px-3 rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="text-sm text-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}

//               {/* Exchange banner — only if products support it */}
//               {cartItems.length > 0 && exchangeAvailable && (
//                 <div
//                   onClick={() => setExchangeChecked(!exchangeChecked)}
//                   className={`border rounded-lg p-4 flex justify-between items-center cursor-pointer transition ${
//                     exchangeChecked
//                       ? "bg-green-50 border-green-500"
//                       : "bg-gray-50 border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={exchangeChecked}
//                       onChange={() => {}}
//                       className="accent-green-600 w-4 h-4"
//                     />
//                     <div>
//                       <p className="font-semibold">Exchange Your Old Battery</p>
//                       <p className="text-sm text-gray-500">
//                         Get instant discount on eligible products
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-green-600 font-bold">
//                     -₹{exchangeDiscount.toFixed(0)}
//                   </span>
//                 </div>
//               )}

//               {/* Not available message */}
//               {cartItems.length > 0 && !exchangeAvailable && !loading && (
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center opacity-60">
//                   <div>
//                     <p className="font-semibold">Exchange Your Old Battery</p>
//                     <p className="text-sm text-gray-500">
//                       No eligible products in cart for exchange
//                     </p>
//                   </div>
//                   <span className="text-gray-400 font-bold">N/A</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT ORDER SUMMARY */}
//           <div className="space-y-6">

//             {/* COUPON */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-3">Apply Coupon</h3>
//               {availableCoupons && availableCoupons.length > 0 && (
//                 <div className="mb-3">
//                   <p className="text-xs text-gray-500 mb-2">Available Coupons:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {availableCoupons.map((coupon) => (
//                       <button
//                         key={coupon.id}
//                         onClick={() => setCouponCode(coupon.code)}
//                         className="text-xs border border-dashed border-red-400 text-red-600 px-2 py-1 rounded-lg hover:bg-red-50"
//                       >
//                         {coupon.code} —{" "}
//                         {coupon.discount_percent > 0
//                           ? `${coupon.discount_percent}% off`
//                           : `₹${coupon.discount_amount} off`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   className="border rounded-lg px-3 py-2 flex-1"
//                 />
//                 <button
//                   onClick={handleApplyCoupon}
//                   className="bg-red-600 text-white px-4 rounded-lg"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponMsg && (
//                 <p className={`text-sm mt-2 ${couponDiscount > 0 ? "text-green-600" : "text-red-500"}`}>
//                   {couponMsg}
//                 </p>
//               )}
//             </div>

//             {/* ORDER SUMMARY */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-4">Order Summary</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span className="text-green-600">Free</span>
//                 </div>
//                 {exchangeChecked && appliedExchangeDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Exchange Discount</span>
//                     <span>-₹{appliedExchangeDiscount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Coupon Discount</span>
//                   <span>-₹{couponDiscount}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-3 border-t pt-3">
//                   <span>Total Amount</span>
//                   <span className="text-red-600">₹{total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* DELIVERY INFO */}
//             <div className="border rounded-xl p-5">
//               <h3 className="font-semibold mb-3">Delivery Information</h3>
//               <ul className="text-sm space-y-2 text-gray-600">
//                 <li>✔ Standard Delivery</li>
//                 <li>✔ Installation Service Available</li>
//               </ul>
//             </div>

//             {/* CHECKOUT BUTTON */}
//             <button
//               onClick={() =>
//                 navigate("/checkout", {
//                   state: {
//                     couponDiscount,
//                     couponCode,
//                     exchangeDiscount: appliedExchangeDiscount,
//                     isExchange: exchangeChecked,
//                   },
//                 })
//               }
//               className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Cart;

