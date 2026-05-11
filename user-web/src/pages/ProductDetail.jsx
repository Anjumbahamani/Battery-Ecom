

// import { useState, useEffect } from "react";
// import { Star, Truck, ShieldCheck } from "lucide-react";
// import { useParams, useNavigate,useLocation  } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   addToCart,
//   addReview,
//   getReviews,
//   addToWishlist,
//   getWishlist,
//   removeFromWishlist,
//   BASE_URL,
// } from "../context/authApi";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImg, setActiveImg] = useState(null);
//   const PLACEHOLDER = "https://placehold.co/300x300?text=Battery";
//   const [reviews, setReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//  useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const isCombo = window.location.pathname.includes('/combo/');
      
//       if (isCombo) {
//         let res = await fetch(`${BASE_URL}/api/products/combos/${id}/`);
//         const data = await res.json();
//         setProduct({ ...data, is_combo: true });
//       } else {
//         let res = await fetch(`${BASE_URL}/api/products/${id}/`);
//         const data = await res.json();
//         setProduct({ ...data, is_combo: false });
//       }
//     } catch (err) {
//       console.log(err);
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProduct();

//   fetch(`${BASE_URL}/api/reviews/?product=${id}`)
//     .then((res) => res.json())
//     .then((data) => setReviews(data.results || data))
//     .catch((err) => console.log(err));
// }, [id]);
//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("Please login to add items to cart!");
//       navigate("/login");
//       return;
//     }
//     try {
//     await addToCart({
//   productId: !product.is_combo ? product.id : null,
//   comboId: product.is_combo ? product.id : null,
//   quantity: 1
// });
//       alert("Added to cart successfully!");
//       navigate("/cart");
//     } catch (err) {
//       alert(err.message);
//     }
//   };
//   const handleBuyNow = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("Please login to buy!");
//       navigate("/login");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("Please login to submit a review!");
//       navigate("/login");
//       return;
//     }
//     setSubmittingReview(true);
//     try {
//       await addReview({
//         product: id,
//         rating: reviewForm.rating,
//         comment: reviewForm.comment,
//       });
//       setReviewMsg("Review submitted successfully!");
//       setReviewForm({ rating: 5, comment: "" });
//       // Refresh reviews
//       const data = await getReviews();
//       setReviews((data.results || data).filter((r) => r.product == id));
//     } catch (err) {
//       setReviewMsg("Failed to submit review!");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleWishlist = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("Please login to add to wishlist!");
//       navigate("/login");
//       return;
//     }
//     try {
//       if (isWishlisted) {
//         await removeFromWishlist(wishlistId);
//         setIsWishlisted(false);
//         setWishlistId(null);
//         alert("Removed from wishlist!");
//       } else {
//         const result = await addToWishlist(product.id);
//         setIsWishlisted(true);
//         setWishlistId(result.id);
//         alert("Added to wishlist!");
//       }
//     } catch (err) {
//       alert("Failed to update wishlist!");
//     }
//   };
//   // Check if product is in wishlist

//   // if (token) {
//   //   getWishlist()
//   //     .then((data) => {
//   //       const items = data.results || data;
//   //       const found = items.find((w) => w.product == id);
//   //       if (found) {
//   //         setIsWishlisted(true);
//   //         setWishlistId(found.id);
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // }
//   useEffect(() => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) return;

//   getWishlist()
//     .then((data) => {
//       const items = data.results || data;
//       const found = items.find((w) => w.product == id);
//       if (found) {
//         setIsWishlisted(true);
//         setWishlistId(found.id);
//       }
//     })
//     .catch((err) => console.log(err));
// }, [id]);

//   if (loading)
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center">
//           <p className="text-gray-500 text-lg">Loading product...</p>
//         </div>
//         <Footer />
//       </>
//     );

//   if (!product)
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center">
//           <p className="text-gray-500 text-lg">Product not found.</p>
//         </div>
//         <Footer />
//       </>
//     );

//   // const images = product.images?.length > 0
//   //   ? product.images.map(img => `${BASE_URL}${img.image}`)
//   //   : [activeImg ? `${BASE_URL}${activeImg}` : "/placeholder.png"];
//   const images = [];

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           {/* TOP PRODUCT SECTION */}
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* LEFT IMAGE AREA */}
//             <div>
//               <div className="border rounded-xl p-6 flex justify-center">
//                 <img
//                   src="/placeholder.png"
//                   alt={product.name}
//                   className="h-72 object-contain"
//                 />
//               </div>

//               {/* thumbnails */}
//               <div className="flex gap-4 mt-4">
//                 {images.map((img, i) => (
//                   // <img
//                   //   key={i}
//                   //   src={img}
//                   //   onClick={() => setActiveImg(img)}
//                   //   className={`w-20 h-20 border rounded-lg p-2 cursor-pointer object-contain
//                   //     ${activeImg === img ? "border-red-600" : ""}`}
//                   //   onError={(e) => e.target.src = "/placeholder.png"}
//                   // />
//                   <div className="flex gap-4 mt-4">
//                     <img
//   src={
//     product.image
//       ? `${BASE_URL}${product.image}`
//       : PLACEHOLDER
//   }
//   alt={product.name}
//   className="h-72 object-contain"
// />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT PRODUCT INFO */}
//             <div>
//               <h1 className="text-3xl font-bold text-black">
//   {product.name || product.combo_name}
// </h1>

//               <div className="flex items-center gap-2 mt-3">
//                 <p>{product.description}</p>
//               </div>

//               {/* rating */}

//               {/* price */}
//               <p className="text-3xl font-bold text-red-600 mt-6">
//               ₹{product.price || product.combo_price}
//               </p>

//               {/* Exchange Option */}
//               <div className="flex justify-between items-center border rounded-lg p-4 mt-6">
//                 <div>
//                   <p className="font-semibold">Old Battery Exchange</p>
//                   <p className="text-sm text-gray-500">
//                     Get discount for old battery
//                   </p>
//                 </div>
//                 <input type="checkbox" />
//               </div>

//               {/* Installation */}
//               <div className="flex justify-between items-center border rounded-lg p-4 mt-4">
//                 <div>
//                   <p className="font-semibold">Professional Installation</p>
//                   <p className="text-sm text-gray-500">
//                     Technician will install battery
//                   </p>
//                 </div>
//                 <input type="checkbox" />
//               </div>

//               {/* price summary */}
//               <div className="border rounded-xl p-5 mt-6 space-y-2">
//                 <div className="flex justify-between">
//                   <span>Battery Price</span>
//                   <span>₹{product.price}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Exchange Discount</span>
//                   <span className="text-green-600">- ₹0</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span className="text-red-600">₹{product.price}</span>
//                 </div>
//               </div>

             
//               {/* buttons */}
//               <div className="flex gap-4 mt-6">
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-lg"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={handleBuyNow}
//                   className="flex-1 border border-black hover:bg-black hover:text-white py-3 rounded-lg"
//                 >
//                   Buy Now
//                 </button>
//                 <button
//                   onClick={handleWishlist}
//                   className={`border px-4 py-3 rounded-lg ${isWishlisted ? "bg-red-50 border-red-600 text-red-600" : "border-gray-300"}`}
//                 >
//                   {isWishlisted ? "❤️" : "🤍"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10">
//             <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>

//             <div className="grid md:grid-cols-2 gap-8">
//               {/* LEFT - Show Reviews */}
//               <div className="space-y-4">
//                 {reviews.length === 0 && (
//                   <p className="text-gray-500">
//                     No reviews yet. Be the first to review!
//                   </p>
//                 )}
//                 {reviews.map((review, i) => (
//                   <div key={i} className="border rounded-xl p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             size={14}
//                             className={
//                               star <= review.rating
//                                 ? "text-yellow-500 fill-yellow-500"
//                                 : "text-gray-300"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {review.user_email || "Customer"}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-700">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT - Add Review Form */}
//               <div className="border rounded-xl p-6">
//                 <h4 className="font-bold mb-4">Write a Review</h4>

//                 <div className="mb-4">
//                   <p className="text-sm font-medium mb-2">Rating</p>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() =>
//                           setReviewForm({ ...reviewForm, rating: star })
//                         }
//                       >
//                         <Star
//                           size={24}
//                           className={
//                             star <= reviewForm.rating
//                               ? "text-yellow-500 fill-yellow-500"
//                               : "text-gray-300"
//                           }
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <textarea
//                   placeholder="Write your review here..."
//                   value={reviewForm.comment}
//                   onChange={(e) =>
//                     setReviewForm({ ...reviewForm, comment: e.target.value })
//                   }
//                   className="w-full border rounded-lg p-3 text-sm h-24 focus:outline-red-500"
//                 />

//                 {reviewMsg && (
//                   <p
//                     className={`text-sm mt-2 ${reviewMsg.includes("success") ? "text-green-600" : "text-red-500"}`}
//                   >
//                     {reviewMsg}
//                   </p>
//                 )}

//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={submittingReview}
//                   className="w-full mt-4 bg-red-600 hover:bg-black text-white py-2 rounded-lg"
//                 >
//                   {submittingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* SPECIFICATIONS + DELIVERY */}
//           <div className="grid md:grid-cols-2 gap-8 mt-16">
//             {/* specifications */}
//             <div className="border rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4">Specifications</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span>Brand</span>
//                   <span>{product.brand?.name || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Category</span>
//                   <span>{product.category?.name || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>SKU</span>
//                   <span>{product.sku || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Stock</span>
//                   <span>{product.stock || "N/A"}</span>
//                 </div>
//               </div>
//             </div>

//             {/* delivery */}
//             <div className="border rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4">Delivery & Service</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Truck className="text-red-600" />
//                   Free doorstep delivery
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <ShieldCheck className="text-red-600" />
//                   {product.warranty}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* VEHICLE COMPATIBILITY */}
//           <div className="border rounded-xl p-6 mt-10">
//             <h3 className="text-xl font-bold mb-4">Vehicle Compatibility</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//               {product.compatible_vehicles?.length > 0 ? (
//                 product.compatible_vehicles.map((v, i) => (
//                   <div key={i} className="border rounded-lg p-4">
//                     {v.make} {v.model}
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <div className="border rounded-lg p-4">Maruti Swift</div>
//                   <div className="border rounded-lg p-4">Hyundai i20</div>
//                   <div className="border rounded-lg p-4">Honda City</div>
//                   <div className="border rounded-lg p-4">Tata Nexon</div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;




import { useState, useEffect } from "react";
import { Star, Truck, ShieldCheck, Package } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  addToCart,
  addReview,
  getReviews,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  createOrder,
  getAddresses,
  BASE_URL,
} from "../context/authApi";

const PLACEHOLDER = "https://placehold.co/300x300?text=Battery";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isCombo = window.location.pathname.includes("/combo/");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  const [exchangeChecked, setExchangeChecked] = useState(false);

  // ─── Exchange Order Modal State ───────────────────────────────────────────
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [exchangeForm, setExchangeForm] = useState({
    shipping_address: "",
    billing_address: "",
    sameAsShipping: true,
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  // ─── Fetch product ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = isCombo
          ? `${BASE_URL}/api/products/combos/${id}/`
          : `${BASE_URL}/api/products/${id}/`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct({ ...data, is_combo: isCombo });
if (data.images?.length > 0) setActiveImg(data.images[0].image);
else if (data.image) setActiveImg(data.image);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isCombo]);

  // ─── Pre-fill address from saved addresses ────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    getAddresses()
      .then((data) => {
        const addresses = data.results || data;
        if (addresses.length > 0) {
          const addr = addresses[0];
          const formatted = `${addr.address_line1 || ""}, ${addr.city || ""}, ${addr.state || ""} - ${addr.pincode || ""}`.trim();
          setExchangeForm((prev) => ({
            ...prev,
            shipping_address: formatted,
            billing_address: formatted,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // ─── Fetch reviews ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isCombo) return;
    fetch(`${BASE_URL}/api/reviews/?product=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.results || data))
      .catch(console.error);
  }, [id, isCombo]);

  // ─── Wishlist check ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isCombo) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    getWishlist()
      .then((data) => {
        const items = data.results || data;
        const found = items.find((w) => w.product == id);
        if (found) { setIsWishlisted(true); setWishlistId(found.id); }
      })
      .catch(console.error);
  }, [id, isCombo]);

  // // ─── Handlers ─────────────────────────────────────────────────────────────
  // const handleAddToCart = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) { alert("Please login to add items to cart!"); navigate("/login"); return; }
  //   try {
  //     await addToCart({
  //       productId: isCombo ? null : product.id,
  //       combo_product: isCombo ? product.id : null,
  //       quantity: 1,
  //     });
  //     alert("Added to cart successfully!");
  //     navigate("/cart");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  // const handleBuyNow = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) { alert("Please login to buy!"); navigate("/login"); return; }

  //   // If exchange is checked, show address modal instead
  //   if (exchangeChecked && product.exchange_available) {
  //     setShowExchangeModal(true);
  //     return;
  //   }

  //   try {
  //     await addToCart({
  //       productId: isCombo ? null : product.id,
  //       combo_product: isCombo ? product.id : null,
  //       quantity: 1,
  //     });
  //     navigate("/checkout");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to proceed to checkout");
  //   }
  // };
const handleAddToCart = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) { alert("Please login to add items to cart!"); navigate("/login"); return; }
  try {
    await addToCart({
      productId: isCombo ? null : product.id,
      comboId: isCombo ? product.id : null,  // ✅ comboId not combo_product
      quantity: 1,
    });
    alert("Added to cart successfully!");
    navigate("/cart");
  } catch (err) {
    alert(err.message);
  }
};

const handleBuyNow = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) { alert("Please login to buy!"); navigate("/login"); return; }

  if (exchangeChecked && product.exchange_available) {
    setShowExchangeModal(true);
    return;
  }

  try {
    await addToCart({
      productId: isCombo ? null : product.id,
      comboId: isCombo ? product.id : null,  // ✅ comboId not combo_product
      quantity: 1,
    });
    navigate("/checkout");
  } catch (err) {
    console.error(err);
    alert("Failed to proceed to checkout");
  }
};
  // ─── Place Exchange Order ─────────────────────────────────────────────────
  const handlePlaceExchangeOrder = async () => {
    if (!exchangeForm.shipping_address.trim()) {
      setOrderError("Please enter a shipping address.");
      return;
    }

    setPlacingOrder(true);
    setOrderError("");

    try {
      const billing = exchangeForm.sameAsShipping
        ? exchangeForm.shipping_address
        : exchangeForm.billing_address;

      await createOrder({
        product: product.id,
        quantity: 1,
        is_exchange: true,
        shipping_address: exchangeForm.shipping_address,
        billing_address: billing,
      });

      setShowExchangeModal(false);
      alert("Order placed successfully with battery exchange!");
      navigate("/checkout");
    } catch (err) {
      setOrderError("Failed to place order: " + err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) { alert("Please login to submit a review!"); navigate("/login"); return; }
    setSubmittingReview(true);
    try {
      await addReview({ product: id, rating: reviewForm.rating, comment: reviewForm.comment });
      setReviewMsg("Review submitted successfully!");
      setReviewForm({ rating: 5, comment: "" });
      const data = await getReviews();
      setReviews((data.results || data).filter((r) => r.product == id));
    } catch {
      setReviewMsg("Failed to submit review!");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) { alert("Please login!"); navigate("/login"); return; }
    try {
      if (isWishlisted) {
        await removeFromWishlist(wishlistId);
        setIsWishlisted(false); setWishlistId(null);
      } else {
        const result = await addToWishlist(product.id);
        setIsWishlisted(true); setWishlistId(result.id);
      }
    } catch { alert("Failed to update wishlist!"); }
  };

  // ─── Derived values ───────────────────────────────────────────────────────
 const getImages = () => {
    if (product.images?.length > 0) return product.images.map((img) => img.image);
    if (product.image) return [product.image];
    return [PLACEHOLDER];
};

  const exchangeDiscount = product?.exchange_available && exchangeChecked
    ? parseFloat(product.exchange_discount || 0)
    : 0;

  const finalPrice = product
    ? parseFloat(product.price || 0) - exchangeDiscount
    : 0;

  // ─── Loading / not found ──────────────────────────────────────────────────
  if (loading) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-gray-500 text-lg">Loading product...</p></div><Footer /></>
  );
  if (!product) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-gray-500 text-lg">Product not found.</p></div><Footer /></>
  );

  const images = getImages();

  return (
    <>
      <Navbar />

      {/* ─── Exchange Order Modal ─────────────────────────────────────────── */}
      {showExchangeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-1">Exchange Order</h3>
            <p className="text-sm text-gray-500 mb-5">
              You're exchanging your old battery for{" "}
              <span className="font-semibold text-red-600">{product.name}</span>.
              Save ₹{product.exchange_discount}!
            </p>

            {/* Shipping Address */}
            <div className="mb-4">
              <label className="text-sm font-semibold block mb-1">Shipping Address*</label>
              <textarea
                rows={3}
                value={exchangeForm.shipping_address}
                onChange={(e) =>
                  setExchangeForm((prev) => ({
                    ...prev,
                    shipping_address: e.target.value,
                    billing_address: prev.sameAsShipping ? e.target.value : prev.billing_address,
                  }))
                }
                placeholder="Enter your full shipping address"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-red-500"
              />
            </div>

            {/* Same as shipping toggle */}
            <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={exchangeForm.sameAsShipping}
                onChange={(e) =>
                  setExchangeForm((prev) => ({ ...prev, sameAsShipping: e.target.checked }))
                }
                className="accent-red-600"
              />
              Billing address same as shipping
            </label>

            {/* Billing Address */}
            {!exchangeForm.sameAsShipping && (
              <div className="mb-4">
                <label className="text-sm font-semibold block mb-1">Billing Address*</label>
                <textarea
                  rows={3}
                  value={exchangeForm.billing_address}
                  onChange={(e) =>
                    setExchangeForm((prev) => ({ ...prev, billing_address: e.target.value }))
                  }
                  placeholder="Enter your billing address"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-red-500"
                />
              </div>
            )}

            {/* Price summary */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Battery Price</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Exchange Discount</span>
                <span>- ₹{product.exchange_discount}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-red-600">₹{finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {orderError && (
              <p className="text-red-500 text-sm mb-3">{orderError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowExchangeModal(false); setOrderError(""); }}
                className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceExchangeOrder}
                disabled={placingOrder}
                className="flex-1 bg-red-600 hover:bg-black text-white py-2 rounded-lg text-sm font-semibold transition"
              >
                {placingOrder ? "Placing Order..." : "Confirm Exchange Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {isCombo && (
            <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
              <Package size={14} /> COMBO DEAL
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT - Images */}
            <div>
              <div className="border rounded-xl p-6 flex justify-center bg-gray-50">
                <img
                  src={activeImg || PLACEHOLDER}
                  alt={product.name}
                  className="h-72 object-contain"
                  onError={(e) => (e.target.src = PLACEHOLDER)}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setActiveImg(img)}
                      className={`w-20 h-20 border-2 rounded-lg p-2 cursor-pointer object-contain ${activeImg === img ? "border-red-600" : "border-gray-200"}`}
                      onError={(e) => (e.target.src = PLACEHOLDER)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT - Info */}
            <div>
              <h1 className="text-3xl font-bold text-black">{product.name}</h1>

              {product.description && (
                <p className="text-gray-500 mt-3 text-sm leading-relaxed">{product.description}</p>
              )}

              {isCombo && (product.inverter_name || product.battery_name) && (
                <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-red-700 mb-2">This combo includes:</p>
                  {product.battery_name && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                      🔋 Battery: <span className="font-medium ml-1">{product.battery_name}</span>
                    </div>
                  )}
                  {product.inverter_name && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                      ⚡ Inverter: <span className="font-medium ml-1">{product.inverter_name}</span>
                    </div>
                  )}
                </div>
              )}

              {!isCombo && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {product.brand_name && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      Brand: {product.brand_name}
                    </span>
                  )}
                  {product.category_name && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      Category: {product.category_name}
                    </span>
                  )}
                  {product.stock !== undefined && (
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                    </span>
                  )}
                </div>
              )}

              <p className="text-3xl font-bold text-red-600 mt-6">₹{product.price}</p>

              {/* Exchange Option */}
              {!isCombo && (
                <div
                  className={`flex justify-between items-center border rounded-lg p-4 mt-6 cursor-pointer transition ${exchangeChecked ? "border-red-500 bg-red-50" : ""}`}
                  onClick={() => product.exchange_available && setExchangeChecked(!exchangeChecked)}
                >
                  <div>
                    <p className="font-semibold">Old Battery Exchange</p>
                    <p className="text-sm text-gray-500">
                      {product.exchange_available
                        ? `Save ₹${product.exchange_discount} on exchange — click Buy Now to proceed`
                        : "Exchange not available for this product"}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={exchangeChecked}
                    disabled={!product.exchange_available}
                    onChange={() => {}}
                    className="accent-red-600"
                  />
                </div>
              )}

              {/* Installation */}
              <div className="flex justify-between items-center border rounded-lg p-4 mt-4">
                <div>
                  <p className="font-semibold">Professional Installation</p>
                  <p className="text-sm text-gray-500">Technician will install battery</p>
                </div>
                <input type="checkbox" className="accent-red-600" />
              </div>

              {/* Price Summary */}
              <div className="border rounded-xl p-5 mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{isCombo ? "Combo Price" : "Battery Price"}</span>
                  <span>₹{product.price}</span>
                </div>
                {!isCombo && (
                  <div className="flex justify-between">
                    <span>Exchange Discount</span>
                    <span className="text-green-600">- ₹{exchangeDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base border-t pt-2">
                  <span>Total</span>
                  <span className="text-red-600">₹{finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button onClick={handleAddToCart} className="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-lg transition">
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className={`flex-1 border py-3 rounded-lg transition ${
                    exchangeChecked && product.exchange_available
                      ? "bg-red-600 text-white border-red-600 hover:bg-black hover:border-black"
                      : "border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {exchangeChecked && product.exchange_available ? "Buy with Exchange" : "Buy Now"}
                </button>
                {!isCombo && (
                  <button
                    onClick={handleWishlist}
                    className={`border px-4 py-3 rounded-lg transition ${isWishlisted ? "bg-red-50 border-red-600 text-red-600" : "border-gray-300"}`}
                  >
                    {isWishlisted ? "❤️" : "🤍"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS + DELIVERY */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="space-y-3 text-sm">
                {isCombo ? (
                  <>
                    <div className="flex justify-between"><span>Battery</span><span>{product.battery_name || "N/A"}</span></div>
                    <div className="flex justify-between"><span>Inverter</span><span>{product.inverter_name || "N/A"}</span></div>
                    <div className="flex justify-between"><span>SKU</span><span>{product.sku || "N/A"}</span></div>
                    <div className="flex justify-between"><span>Warranty</span><span>{product.warranty || "N/A"}</span></div>
                    {product.specifications?.map((spec, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{spec.key}</span><span>{spec.value}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between"><span>Brand</span><span>{product.brand_name || "N/A"}</span></div>
                    <div className="flex justify-between"><span>Category</span><span>{product.category_name || "N/A"}</span></div>
                    <div className="flex justify-between"><span>SKU</span><span>{product.sku || "N/A"}</span></div>
                    <div className="flex justify-between"><span>Stock</span><span>{product.stock ?? "N/A"}</span></div>
                    <div className="flex justify-between"><span>Warranty</span><span>{product.warranty || "N/A"}</span></div>
                    {product.specifications?.map((spec, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{spec.key}</span><span>{spec.value}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Delivery & Service</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><Truck className="text-red-600" /> Free doorstep delivery</div>
                <div className="flex items-center gap-3"><ShieldCheck className="text-red-600" />{product.warranty ? `${product.warranty} Warranty` : "Warranty info not available"}</div>
              </div>
            </div>
          </div>

          {/* VEHICLE COMPATIBILITY */}
          {product.compatible_vehicles_details?.length > 0 && (
            <div className="border rounded-xl p-6 mt-10">
              <h3 className="text-xl font-bold mb-4">Compatible Vehicles</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                {product.compatible_vehicles_details.map((v, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    {v.make} {v.model} {v.year && `(${v.year})`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {!isCombo && (
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {reviews.length === 0 && (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                  )}
                  {reviews.map((review, i) => (
                    <div key={i} className="border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={14} className={star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.user_email || "Customer"}</span>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="border rounded-xl p-6">
                  <h4 className="font-bold mb-4">Write a Review</h4>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Rating</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setReviewForm({ ...reviewForm, rating: star })}>
                          <Star size={24} className={star <= reviewForm.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Write your review here..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full border rounded-lg p-3 text-sm h-24 focus:outline-red-500"
                  />
                  {reviewMsg && (
                    <p className={`text-sm mt-2 ${reviewMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>{reviewMsg}</p>
                  )}
                  <button
                    onClick={handleSubmitReview}
                    disabled={submittingReview}
                    className="w-full mt-4 bg-red-600 hover:bg-black text-white py-2 rounded-lg"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;




// import { useState, useEffect } from "react";
// import { Star, Truck, ShieldCheck, Package } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   addToCart,
//   addReview,
//   getReviews,
//   addToWishlist,
//   getWishlist,
//   removeFromWishlist,
//   BASE_URL,
// } from "../context/authApi";

// const PLACEHOLDER = "https://placehold.co/300x300?text=Battery";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const isCombo = window.location.pathname.includes("/combo/");

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImg, setActiveImg] = useState(null);

//   const [reviews, setReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [reviewMsg, setReviewMsg] = useState("");

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//   const [exchangeChecked, setExchangeChecked] = useState(false);

//   // ─── Fetch product ────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const url = isCombo
//           ? `${BASE_URL}/api/products/combos/${id}/`
//           : `${BASE_URL}/api/products/${id}/`;
//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Not found");
//         const data = await res.json();
//         setProduct({ ...data, is_combo: isCombo });
  
//         // set first image as active
//         if (data.images?.length > 0) setActiveImg(`${BASE_URL}${data.images[0].image}`);
//         else if (data.image) setActiveImg(`${BASE_URL}${data.image}`);
//       } catch (err) {
//         console.error(err);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, isCombo]);

//   // ─── Fetch reviews (only for single products) ─────────────────────────────
//   useEffect(() => {
//     if (isCombo) return;
//     fetch(`${BASE_URL}/api/reviews/?product=${id}`)
//       .then((res) => res.json())
//       .then((data) => setReviews(data.results || data))
//       .catch(console.error);
//   }, [id, isCombo]);

//   // ─── Wishlist check ───────────────────────────────────────────────────────
//   useEffect(() => {
//     if (isCombo) return;
//     const token = localStorage.getItem("accessToken");
//     if (!token) return;
//     getWishlist()
//       .then((data) => {
//         const items = data.results || data;
//         const found = items.find((w) => w.product == id);
//         if (found) { setIsWishlisted(true); setWishlistId(found.id); }
//       })
//       .catch(console.error);
//   }, [id, isCombo]);

//   // ─── Handlers ─────────────────────────────────────────────────────────────
//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) { alert("Please login to add items to cart!"); navigate("/login"); return; }
//     try {
//       await addToCart({
//         productId: isCombo ? null : product.id,
//         combo_product: isCombo ? product.id : null,
//         quantity: 1,
//       });
//       alert("Added to cart successfully!");
//       navigate("/cart");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//  const handleBuyNow = async () => {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     alert("Please login to buy!");
//     navigate("/login");
//     return;
//   }

//   try {
//     // Step 1: Add product to cart
//     await addToCart({
//       productId: isCombo ? null : product.id,
//       combo_product: isCombo ? product.id : null,
//       quantity: 1,
//     });

//     // Step 2: Go to checkout
//     navigate("/checkout");

//   } catch (err) {
//     console.error(err);
//     alert("Failed to proceed to checkout");
//   }
// };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("accessToken");
//     if (!token) { alert("Please login to submit a review!"); navigate("/login"); return; }
//     setSubmittingReview(true);
//     try {
//       await addReview({ product: id, rating: reviewForm.rating, comment: reviewForm.comment });
//       setReviewMsg("Review submitted successfully!");
//       setReviewForm({ rating: 5, comment: "" });
//       const data = await getReviews();
//       setReviews((data.results || data).filter((r) => r.product == id));
//     } catch {
//       setReviewMsg("Failed to submit review!");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleWishlist = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) { alert("Please login!"); navigate("/login"); return; }
//     try {
//       if (isWishlisted) {
//         await removeFromWishlist(wishlistId);
//         setIsWishlisted(false); setWishlistId(null);
//       } else {
//         const result = await addToWishlist(product.id);
//         setIsWishlisted(true); setWishlistId(result.id);
//       }
//     } catch { alert("Failed to update wishlist!"); }
//   };

//   // ─── Derived values ───────────────────────────────────────────────────────
//   const getImages = () => {
//     if (product.images?.length > 0) return product.images.map((img) => `${BASE_URL}${img.image}`);
//     if (product.image) return [`${BASE_URL}${product.image}`];
//     return [PLACEHOLDER];
//   };

//   const exchangeDiscount = product?.exchange_available && exchangeChecked
//     ? parseFloat(product.exchange_discount || 0)
//     : 0;

//   const finalPrice = product
//     ? parseFloat(product.price || 0) - exchangeDiscount
//     : 0;

//   // ─── Loading / not found ──────────────────────────────────────────────────
//   if (loading) return (
//     <><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-gray-500 text-lg">Loading product...</p></div><Footer /></>
//   );
//   if (!product) return (
//     <><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-gray-500 text-lg">Product not found.</p></div><Footer /></>
//   );

//   const images = getImages();

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">

//           {/* Combo badge */}
//           {isCombo && (
//             <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
//               <Package size={14} /> COMBO DEAL
//             </div>
//           )}

//           {/* TOP PRODUCT SECTION */}
//           <div className="grid lg:grid-cols-2 gap-12">

//             {/* LEFT - Images */}
//             <div>
//               <div className="border rounded-xl p-6 flex justify-center bg-gray-50">
//                 <img
//                   src={activeImg || PLACEHOLDER}
//                   alt={product.name}
//                   className="h-72 object-contain"
//                   onError={(e) => (e.target.src = PLACEHOLDER)}
//                 />
//               </div>
//               {/* Thumbnails */}
//               {images.length > 1 && (
//                 <div className="flex gap-3 mt-4 flex-wrap">
//                   {images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       onClick={() => setActiveImg(img)}
//                       className={`w-20 h-20 border-2 rounded-lg p-2 cursor-pointer object-contain ${activeImg === img ? "border-red-600" : "border-gray-200"}`}
//                       onError={(e) => (e.target.src = PLACEHOLDER)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* RIGHT - Info */}
//             <div>
//               <h1 className="text-3xl font-bold text-black">{product.name}</h1>

//               {/* Description */}
//               {product.description && (
//                 <p className="text-gray-500 mt-3 text-sm leading-relaxed">{product.description}</p>
//               )}

//               {/* Combo includes */}
//               {isCombo && (product.inverter_name || product.battery_name) && (
//                 <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4">
//                   <p className="text-sm font-semibold text-red-700 mb-2">This combo includes:</p>
//                   {product.battery_name && (
//                     <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
//                       <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
//                       🔋 Battery: <span className="font-medium ml-1">{product.battery_name}</span>
//                     </div>
//                   )}
//                   {product.inverter_name && (
//                     <div className="flex items-center gap-2 text-sm text-gray-700">
//                       <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
//                       ⚡ Inverter: <span className="font-medium ml-1">{product.inverter_name}</span>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Single product meta */}
//               {!isCombo && (
//                 <div className="flex flex-wrap gap-3 mt-4">
//                   {product.brand_name && (
//                     <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
//                       Brand: {product.brand_name}
//                     </span>
//                   )}
//                   {product.category_name && (
//                     <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
//                       Category: {product.category_name}
//                     </span>
//                   )}
//                   {product.stock !== undefined && (
//                     <span className={`text-xs px-3 py-1 rounded-full font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                       {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* Price */}
//               <p className="text-3xl font-bold text-red-600 mt-6">₹{product.price}</p>

//               {/* Exchange Option - only for single products */}
//               {!isCombo && (
//                 <div
//                   className={`flex justify-between items-center border rounded-lg p-4 mt-6 cursor-pointer transition ${exchangeChecked ? "border-red-500 bg-red-50" : ""}`}
//                   onClick={() => product.exchange_available && setExchangeChecked(!exchangeChecked)}
//                 >
//                   <div>
//                     <p className="font-semibold">Old Battery Exchange</p>
//                     <p className="text-sm text-gray-500">
//                       {product.exchange_available
//                         ? `Save ₹${product.exchange_discount} on exchange`
//                         : "Exchange not available for this product"}
//                     </p>
//                   </div>
//                   <input
//                     type="checkbox"
//                     checked={exchangeChecked}
//                     disabled={!product.exchange_available}
//                     onChange={() => {}}
//                     className="accent-red-600"
//                   />
//                 </div>
//               )}

//               {/* Installation */}
//               <div className="flex justify-between items-center border rounded-lg p-4 mt-4">
//                 <div>
//                   <p className="font-semibold">Professional Installation</p>
//                   <p className="text-sm text-gray-500">Technician will install battery</p>
//                 </div>
//                 <input type="checkbox" className="accent-red-600" />
//               </div>

//               {/* Price Summary */}
//               <div className="border rounded-xl p-5 mt-6 space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>{isCombo ? "Combo Price" : "Battery Price"}</span>
//                   <span>₹{product.price}</span>
//                 </div>
//                 {!isCombo && (
//                   <div className="flex justify-between">
//                     <span>Exchange Discount</span>
//                     <span className="text-green-600">- ₹{exchangeDiscount}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between font-bold text-base border-t pt-2">
//                   <span>Total</span>
//                   <span className="text-red-600">₹{finalPrice.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4 mt-6">
//                 <button onClick={handleAddToCart} className="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-lg transition">
//                   Add to Cart
//                 </button>
//                 <button onClick={handleBuyNow} className="flex-1 border border-black hover:bg-black hover:text-white py-3 rounded-lg transition">
//                   Buy Now
//                 </button>
//                 {!isCombo && (
//                   <button
//                     onClick={handleWishlist}
//                     className={`border px-4 py-3 rounded-lg transition ${isWishlisted ? "bg-red-50 border-red-600 text-red-600" : "border-gray-300"}`}
//                   >
//                     {isWishlisted ? "❤️" : "🤍"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* SPECIFICATIONS + DELIVERY */}
//           <div className="grid md:grid-cols-2 gap-8 mt-16">
//             <div className="border rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4">Specifications</h3>
//               <div className="space-y-3 text-sm">
//                 {isCombo ? (
//                   <>
//                     <div className="flex justify-between"><span>Battery</span><span>{product.battery_name || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>Inverter</span><span>{product.inverter_name || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>SKU</span><span>{product.sku || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>Warranty</span><span>{product.warranty || "N/A"}</span></div>
//                     {product.specifications?.map((spec, i) => (
//                       <div key={i} className="flex justify-between">
//                         <span>{spec.key}</span><span>{spec.value}</span>
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex justify-between"><span>Brand</span><span>{product.brand_name || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>Category</span><span>{product.category_name || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>SKU</span><span>{product.sku || "N/A"}</span></div>
//                     <div className="flex justify-between"><span>Stock</span><span>{product.stock ?? "N/A"}</span></div>
//                     <div className="flex justify-between"><span>Warranty</span><span>{product.warranty || "N/A"}</span></div>
//                     {product.specifications?.map((spec, i) => (
//                       <div key={i} className="flex justify-between">
//                         <span>{spec.key}</span><span>{spec.value}</span>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="border rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4">Delivery & Service</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3"><Truck className="text-red-600" /> Free doorstep delivery</div>
//                 <div className="flex items-center gap-3"><ShieldCheck className="text-red-600" />{product.warranty ? `${product.warranty} Warranty` : "Warranty info not available"}</div>
//               </div>
//             </div>
//           </div>

//           {/* VEHICLE COMPATIBILITY */}
//           {product.compatible_vehicles_details?.length > 0 && (
//             <div className="border rounded-xl p-6 mt-10">
//               <h3 className="text-xl font-bold mb-4">Compatible Vehicles</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
//                 {product.compatible_vehicles_details.map((v, i) => (
//                   <div key={i} className="border rounded-lg p-4">
//                     {v.make} {v.model} {v.year && `(${v.year})`}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* REVIEWS - only for single products */}
//           {!isCombo && (
//             <div className="mt-16">
//               <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
//               <div className="grid md:grid-cols-2 gap-8">

//                 {/* Show reviews */}
//                 <div className="space-y-4">
//                   {reviews.length === 0 && (
//                     <p className="text-gray-500">No reviews yet. Be the first to review!</p>
//                   )}
//                   {reviews.map((review, i) => (
//                     <div key={i} className="border rounded-xl p-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star key={star} size={14} className={star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-500">{review.user_email || "Customer"}</span>
//                       </div>
//                       <p className="text-sm text-gray-700">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add review form */}
//                 <div className="border rounded-xl p-6">
//                   <h4 className="font-bold mb-4">Write a Review</h4>
//                   <div className="mb-4">
//                     <p className="text-sm font-medium mb-2">Rating</p>
//                     <div className="flex gap-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button key={star} onClick={() => setReviewForm({ ...reviewForm, rating: star })}>
//                           <Star size={24} className={star <= reviewForm.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <textarea
//                     placeholder="Write your review here..."
//                     value={reviewForm.comment}
//                     onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
//                     className="w-full border rounded-lg p-3 text-sm h-24 focus:outline-red-500"
//                   />
//                   {reviewMsg && (
//                     <p className={`text-sm mt-2 ${reviewMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>{reviewMsg}</p>
//                   )}
//                   <button
//                     onClick={handleSubmitReview}
//                     disabled={submittingReview}
//                     className="w-full mt-4 bg-red-600 hover:bg-black text-white py-2 rounded-lg"
//                   >
//                     {submittingReview ? "Submitting..." : "Submit Review"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;