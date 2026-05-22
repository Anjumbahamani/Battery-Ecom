
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getProducts, addToCart } from "../context/authApi";
// import { BASE_URL } from "../context/authApi";
// import PopupModal from "./PopupModal";

// const FeaturedProducts = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [popup, setPopup] = useState({ show: false, type: "success", message: "" });

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts((data.results || data).slice(0, 5));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);
// const handleAddToCart = async (productId) => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     setPopup({ show: true, type: "error", message: "Please login first to add items to cart!" });
//     return;
//   }
//   try {
//     await addToCart({ productId, comboId: null, quantity: 1 });
//     setPopup({ show: true, type: "success", message: "Product added to cart successfully!" });
//     // ❌ removed navigate("/cart") from here
//   } catch (err) {
//     console.error(err);
//     setPopup({ show: true, type: "error", message: "Failed to add to cart. Please try again." });
//   }
// };

// const handlePopupClose = () => {
//   if (popup.type === "success") {
//     navigate("/cart");              // ✅ navigate AFTER user sees popup and clicks Continue
//   } else if (popup.message.includes("login")) {
//     navigate("/login");
//   }
//   setPopup({ show: false, type: "success", message: "" });
// };

//   return (
//     <section className="py-16 bg-white">

//       {popup.show && (
//         <PopupModal
//           type={popup.type}
//           message={popup.message}
//           onClose={handlePopupClose}
//         />
//       )}

//       <div className="w-full px-4 lg:px-8">
//         <div className="flex justify-between items-center mb-8">
//           <h3 className="text-2xl md:text-3xl font-bold text-black">Featured Products</h3>
//           <Link to="/product">
//             <button className="text-red-600 font-semibold hover:text-black transition">
//               View All →
//             </button>
//           </Link>
//         </div>

//         {loading ? (
//           <p className="text-center">Loading products...</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 onClick={() => navigate(`/productdetail/${product.id}`)}
//                 className="cursor-pointer border border-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition duration-300"
//               >
//                 <img
//                   src={
//                     product.image
//                       ? product.image.startsWith("http")
//                         ? product.image
//                         : `${BASE_URL}${product.image}`
//                       : "/placeholder.png"
//                   }
//                   alt={product.name}
//                   className="h-40 mx-auto object-contain"
//                 />
//                 <h4 className="mt-4 font-semibold text-black">{product.name}</h4>
//                 <p className="mt-2 text-lg font-bold text-red-600">₹{product.price}</p>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }}
//                   className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg transition duration-300"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, addToCart } from "../context/authApi";
import { BASE_URL } from "../context/authApi";
import PopupModal from "./PopupModal";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts((data.results || data).slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ show: true, type: "error", message: "Please login first to add items to cart!" });
      return;
    }
    try {
      await addToCart({
        productId: product.product_type !== "combo" ? product.id : null,
        comboId: product.product_type === "combo" ? product.id : null,
        quantity: 1,
      });
      setPopup({ show: true, type: "success", message: "Product added to cart successfully!" });
    } catch (err) {
      console.error(err);
      setPopup({ show: true, type: "error", message: "Failed to add to cart. Please try again." });
    }
  };

  const handlePopupClose = () => {
    if (popup.type === "success") {
      navigate("/cart");
    } else if (popup.message.includes("login")) {
      navigate("/login");
    }
    setPopup({ show: false, type: "success", message: "" });
  };

  const handleNavigate = (product) => {
    if (product.product_type === "combo") {
      navigate(`/productdetail/combo/${product.id}`);
    } else {
      navigate(`/productdetail/${product.id}`);
    }
  };

  return (
    <section className="py-16 bg-white">
      {popup.show && (
        <PopupModal
          type={popup.type}
          message={popup.message}
          onClose={handlePopupClose}
        />
      )}

      <div className="w-full px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-black">Featured Products</h3>
          <Link to="/product">
            <button className="text-red-600 font-semibold hover:text-black transition">
              View All →
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleNavigate(product)}
                className="cursor-pointer border border-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition duration-300 relative"
              >
                {/* Exchange Badge */}
                {product.exchange_available && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
                    Exchange
                  </span>
                )}

                {/* Combo Badge */}
                {product.product_type === "combo" && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
                    Combo
                  </span>
                )}

                <img
                  src={
                    product.image
                      ? product.image.startsWith("http")
                        ? product.image
                        : `${BASE_URL}${product.image}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  onClick={() =>
            product.product_type === "combo"
              ? navigate(`/productdetail/combo/${product.id}`)
              : navigate(`/productdetail/${product.id}`)
          }
                  className="h-40 mx-auto object-contain"
                />

                <h4 className="mt-4 font-semibold text-black line-clamp-2">{product.name}</h4>
                <p className="mt-2 text-lg font-bold text-red-600">₹{product.price}</p>

                {/* Exchange discount */}
                {product.exchange_available && (
                  <p className="text-green-600 text-base mt-0.5">
                    Save ₹{product.exchange_discount} on exchange
                  </p>
                )}

                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                  className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;