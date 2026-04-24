// import { Star, Truck, ShieldCheck } from "lucide-react";

// const ProductDetail = () => {
//   const product = {
//     name: "Premium AGM Battery 12V 70Ah",
//     price: "₹8,999",
//     rating: 4.5,
//     images: [
//       "https://i.imgur.com/qVq7JzH.png",
//       "https://i.imgur.com/0R8FQ3f.png",
//       "https://i.imgur.com/FxZV7nN.png",
//     ],
//   };

//   return (
//     <section className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12">

//         {/* PRODUCT IMAGES */}
//         <div>
//           <div className="border rounded-xl p-6 flex justify-center">
//             <img
//               src={product.images[0]}
//               alt="battery"
//               className="h-64 object-contain"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-4 mt-4">
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="thumb"
//                 className="w-20 h-20 border rounded-lg p-2 object-contain cursor-pointer hover:border-red-500"
//               />
//             ))}
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div>

//           <h1 className="text-3xl font-bold text-black">
//             {product.name}
//           </h1>

//           {/* Rating */}
//           <div className="flex items-center gap-2 mt-3">
//             <Star className="text-yellow-500" size={18} />
//             <span className="text-gray-600">4.5 Rating</span>
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-bold text-red-600 mt-6">
//             {product.price}
//           </p>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button className="bg-red-600 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition">
//               Add to Cart
//             </button>

//             <button className="border border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition">
//               Buy Now
//             </button>
//           </div>

//           {/* Services */}
//           <div className="mt-8 space-y-4">

//             <div className="flex items-center gap-3 text-gray-700">
//               <Truck size={20} className="text-red-600" />
//               Free doorstep delivery
//             </div>

//             <div className="flex items-center gap-3 text-gray-700">
//               <ShieldCheck size={20} className="text-red-600" />
//               36 Months Warranty
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* SPECIFICATIONS */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">

//         <h2 className="text-2xl font-bold text-black mb-6">
//           Specifications
//         </h2>

//         <div className="grid md:grid-cols-2 gap-6 border rounded-xl p-6">

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Voltage</span>
//             <span className="font-semibold">12V</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Capacity</span>
//             <span className="font-semibold">70Ah</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Technology</span>
//             <span className="font-semibold">AGM</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Warranty</span>
//             <span className="font-semibold">36 Months</span>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default ProductDetail;

import { useState, useEffect } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";
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
  BASE_URL,
} from "../context/authApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(null);
  const PLACEHOLDER = "https://placehold.co/300x300?text=Battery";
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setActiveImg(data.image || null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // Fetch reviews for this product
    fetch(`${BASE_URL}/api/reviews/?product=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.results || data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product.id, 1);
      alert("Added to cart successfully!");
      navigate("/cart");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleBuyNow = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to buy!");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to submit a review!");
      navigate("/login");
      return;
    }
    setSubmittingReview(true);
    try {
      await addReview({
        product: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewMsg("Review submitted successfully!");
      setReviewForm({ rating: 5, comment: "" });
      // Refresh reviews
      const data = await getReviews();
      setReviews((data.results || data).filter((r) => r.product == id));
    } catch (err) {
      setReviewMsg("Failed to submit review!");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to add to wishlist!");
      navigate("/login");
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(wishlistId);
        setIsWishlisted(false);
        setWishlistId(null);
        alert("Removed from wishlist!");
      } else {
        const result = await addToWishlist(product.id);
        setIsWishlisted(true);
        setWishlistId(result.id);
        alert("Added to wishlist!");
      }
    } catch (err) {
      alert("Failed to update wishlist!");
    }
  };
  // Check if product is in wishlist
  const token = localStorage.getItem("accessToken");
  if (token) {
    getWishlist()
      .then((data) => {
        const items = data.results || data;
        const found = items.find((w) => w.product == id);
        if (found) {
          setIsWishlisted(true);
          setWishlistId(found.id);
        }
      })
      .catch((err) => console.log(err));
  }

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading product...</p>
        </div>
        <Footer />
      </>
    );

  if (!product)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Product not found.</p>
        </div>
        <Footer />
      </>
    );

  // const images = product.images?.length > 0
  //   ? product.images.map(img => `${BASE_URL}${img.image}`)
  //   : [activeImg ? `${BASE_URL}${activeImg}` : "/placeholder.png"];
  const images = [];

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* TOP PRODUCT SECTION */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT IMAGE AREA */}
            <div>
              <div className="border rounded-xl p-6 flex justify-center">
                <img
                  src="/placeholder.png"
                  alt={product.name}
                  className="h-72 object-contain"
                />
              </div>

              {/* thumbnails */}
              <div className="flex gap-4 mt-4">
                {images.map((img, i) => (
                  // <img
                  //   key={i}
                  //   src={img}
                  //   onClick={() => setActiveImg(img)}
                  //   className={`w-20 h-20 border rounded-lg p-2 cursor-pointer object-contain
                  //     ${activeImg === img ? "border-red-600" : ""}`}
                  //   onError={(e) => e.target.src = "/placeholder.png"}
                  // />
                  <div className="flex gap-4 mt-4">
                    <img
                      src="/placeholder.png"
                      className="w-20 h-20 border rounded-lg p-2 cursor-pointer object-contain border-red-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PRODUCT INFO */}
            <div>
              <h1 className="text-3xl font-bold text-black">{product.name}</h1>

              <div className="flex items-center gap-2 mt-3">
                <p>{product.description}</p>
              </div>

              {/* rating */}

              {/* price */}
              <p className="text-3xl font-bold text-red-600 mt-6">
                ₹{product.price}
              </p>

              {/* Exchange Option */}
              <div className="flex justify-between items-center border rounded-lg p-4 mt-6">
                <div>
                  <p className="font-semibold">Old Battery Exchange</p>
                  <p className="text-sm text-gray-500">
                    Get discount for old battery
                  </p>
                </div>
                <input type="checkbox" />
              </div>

              {/* Installation */}
              <div className="flex justify-between items-center border rounded-lg p-4 mt-4">
                <div>
                  <p className="font-semibold">Professional Installation</p>
                  <p className="text-sm text-gray-500">
                    Technician will install battery
                  </p>
                </div>
                <input type="checkbox" />
              </div>

              {/* price summary */}
              <div className="border rounded-xl p-5 mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Battery Price</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Discount</span>
                  <span className="text-green-600">- ₹0</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-600">₹{product.price}</span>
                </div>
              </div>

             
              {/* buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-black hover:bg-black hover:text-white py-3 rounded-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleWishlist}
                  className={`border px-4 py-3 rounded-lg ${isWishlisted ? "bg-red-50 border-red-600 text-red-600" : "border-gray-300"}`}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* LEFT - Show Reviews */}
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review!
                  </p>
                )}
                {reviews.map((review, i) => (
                  <div key={i} className="border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.user_email || "Customer"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* RIGHT - Add Review Form */}
              <div className="border rounded-xl p-6">
                <h4 className="font-bold mb-4">Write a Review</h4>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Rating</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: star })
                        }
                      >
                        <Star
                          size={24}
                          className={
                            star <= reviewForm.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Write your review here..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="w-full border rounded-lg p-3 text-sm h-24 focus:outline-red-500"
                />

                {reviewMsg && (
                  <p
                    className={`text-sm mt-2 ${reviewMsg.includes("success") ? "text-green-600" : "text-red-500"}`}
                  >
                    {reviewMsg}
                  </p>
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
          {/* SPECIFICATIONS + DELIVERY */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* specifications */}
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Brand</span>
                  <span>{product.brand?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span>{product.category?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>SKU</span>
                  <span>{product.sku || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock</span>
                  <span>{product.stock || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* delivery */}
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Delivery & Service</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-red-600" />
                  Free doorstep delivery
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-red-600" />
                  {product.warranty}
                </div>
              </div>
            </div>
          </div>

          {/* VEHICLE COMPATIBILITY */}
          <div className="border rounded-xl p-6 mt-10">
            <h3 className="text-xl font-bold mb-4">Vehicle Compatibility</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {product.compatible_vehicles?.length > 0 ? (
                product.compatible_vehicles.map((v, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    {v.make} {v.model}
                  </div>
                ))
              ) : (
                <>
                  <div className="border rounded-lg p-4">Maruti Swift</div>
                  <div className="border rounded-lg p-4">Hyundai i20</div>
                  <div className="border rounded-lg p-4">Honda City</div>
                  <div className="border rounded-lg p-4">Tata Nexon</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
