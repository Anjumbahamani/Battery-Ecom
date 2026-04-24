// import { useState } from "react";
// import b1 from "../assets/b1.jpg";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Cart = () => {

//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Premium AGM Battery 12V 70Ah",
//       price: 12999,
//       qty: 1,
//       image: b1,
//     },
//     {
//       id: 2,
//       name: "Smart Battery Monitor",
//       price: 2499,
//       qty: 1,
//       image: b1,
//     },
//   ]);

//   const updateQty = (id, type) => {
//     setCartItems((items) =>
//       items.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
//             }
//           : item
//       )
//     );
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const delivery = 0;
//   const total = subtotal + delivery;

//   return (
//     <>
//       <Navbar/>

//     <section className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

//         {/* LEFT CART ITEMS */}
//         <div className="lg:col-span-2">

//           <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//           <div className="space-y-6">

//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded-xl p-5 flex gap-5 items-center"
//               >

//                 <img
//                   src={item.image}
//                   className="w-24 h-24 object-contain"
//                 />

//                 <div className="flex-1">

//                   <h3 className="font-semibold">
//                     {item.name}
//                   </h3>

//                   <p className="text-red-600 font-bold mt-1">
//                     ₹{item.price}
//                   </p>

//                   {/* qty */}
//                   <div className="flex items-center gap-3 mt-3">

//                     <button
//                       onClick={() => updateQty(item.id, "dec")}
//                       className="border px-3 rounded"
//                     >
//                       -
//                     </button>

//                     <span>{item.qty}</span>

//                     <button
//                       onClick={() => updateQty(item.id, "inc")}
//                       className="border px-3 rounded"
//                     >
//                       +
//                     </button>

//                   </div>

//                 </div>

//                 <button className="text-sm text-red-600">
//                   Remove
//                 </button>

//               </div>
//             ))}

//             {/* Exchange banner */}
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center">

//               <div>
//                 <p className="font-semibold">
//                   Exchange Your Old Battery
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Get instant discount
//                 </p>
//               </div>

//               <span className="text-green-600 font-bold">
//                 -₹2,500
//               </span>

//             </div>

//           </div>

//         </div>

//         {/* RIGHT ORDER SUMMARY */}
//         <div className="space-y-6">

//           {/* COUPON */}
//           <div className="border rounded-xl p-5">

//             <h3 className="font-semibold mb-3">Apply Coupon</h3>

//             <div className="flex gap-2">

//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 className="border rounded-lg px-3 py-2 flex-1"
//               />

//               <button className="bg-red-600 text-white px-4 rounded-lg">
//                 Apply
//               </button>

//             </div>

//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="border rounded-xl p-5">

//             <h3 className="font-semibold mb-4">Order Summary</h3>

//             <div className="space-y-2 text-sm">

//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span className="text-green-600">Free</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Coupon Discount</span>
//                 <span>-₹0</span>
//               </div>

//               <div className="flex justify-between font-bold text-lg mt-3">
//                 <span>Total Amount</span>
//                 <span className="text-red-600">₹{total}</span>
//               </div>

//             </div>

//           </div>

//           {/* DELIVERY INFO */}
//           <div className="border rounded-xl p-5">

//             <h3 className="font-semibold mb-3">
//               Delivery Information
//             </h3>

//             <ul className="text-sm space-y-2 text-gray-600">
//               <li>✔ Standard Delivery</li>
//               <li>✔ Installation Service Available</li>
//             </ul>

//           </div>

//           {/* CHECKOUT BUTTON */}
//           <button className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold">

//             Proceed to Checkout

//           </button>

//         </div>

//       </div>
//     </section>
//     <Footer />
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

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchCoupons();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data.results || data);
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
          : item,
      ),
    );
  };

 const handleApplyCoupon = async () => {
  try {
    const result = await applyCoupon(couponCode);
    // Fix: read discount from correct field
    const discount = result.discount?.amount > 0 
      ? result.discount.amount 
      : (subtotal * result.discount?.percent / 100);
    setCouponDiscount(discount);
    setCouponMsg(result.message || "Coupon applied successfully!");
  } catch (err) {
    setCouponMsg("Invalid coupon code!");
    setCouponDiscount(0);
  }
};

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.product_detail?.price || 0) * item.quantity,
    0,
  );

  const delivery = 0;
  const total = subtotal - couponDiscount + delivery;

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          {/* LEFT CART ITEMS */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {loading && <p className="text-gray-500">Loading cart...</p>}

            {!loading && cartItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Your cart is empty!</p>
                <button
                  onClick={() => navigate("/product")}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                  Shop Now
                </button>
              </div>
            )}

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-5 flex gap-5 items-center"
                >
                  <img
                    src={
                      item.product_detail?.image
                        ? `${BASE_URL}${item.product_detail.image}`
                        : PLACEHOLDER
                    }
                    className="w-24 h-24 object-contain"
                    onError={(e) => (e.target.src = PLACEHOLDER)}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.product_detail?.name}
                    </h3>
                    <p className="text-red-600 font-bold mt-1">
                      ₹{item.product_detail?.price}
                    </p>

                    {/* qty */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="border px-3 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="border px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Exchange banner */}
              {cartItems.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Exchange Your Old Battery</p>
                    <p className="text-sm text-gray-500">
                      Get instant discount
                    </p>
                  </div>
                  <span className="text-green-600 font-bold">-₹2,500</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT ORDER SUMMARY */}
          <div className="space-y-6">
            {/* COUPON */}
            {/* COUPON */}
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-3">Apply Coupon</h3>

              {/* Show available coupons */}
             {availableCoupons && availableCoupons.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-2">
                    Available Coupons:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <button
                        key={coupon.id}
                        onClick={() => setCouponCode(coupon.code)}
                        className="text-xs border border-dashed border-red-400 text-red-600 px-2 py-1 rounded-lg hover:bg-red-50"
                      >
                        {coupon.code} —{" "}
                        {coupon.discount_percent > 0 ? `${coupon.discount_percent}% off` : `₹${coupon.discount_amount} off`}
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
                  className="border rounded-lg px-3 py-2 flex-1"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-red-600 text-white px-4 rounded-lg"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p
                  className={`text-sm mt-2 ${couponDiscount > 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {couponMsg}
                </p>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3">
                  <span>Total Amount</span>
                  <span className="text-red-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-3">Delivery Information</h3>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>✔ Standard Delivery</li>
                <li>✔ Installation Service Available</li>
              </ul>
            </div>

            {/* CHECKOUT BUTTON */}
           <button
  onClick={() => navigate("/checkout", { 
    state: { 
      couponDiscount, 
      couponCode 
    } 
  })}
  className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold"
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
