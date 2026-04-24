import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getWishlist, removeFromWishlist, addToCart, BASE_URL } from "../context/authApi";

const PLACEHOLDER = "https://placehold.co/300x300?text=Battery";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data.results || data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (err) {
      alert("Failed to remove!");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart!");
      navigate("/cart");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">My Wishlist ❤️</h1>

          {loading && <p className="text-gray-500">Loading wishlist...</p>}

          {!loading && wishlist.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Your wishlist is empty!</p>
              <button
                onClick={() => navigate("/product")}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Browse Products
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="border rounded-xl p-4 hover:shadow-lg transition">
                <img
                  src={item.product_detail?.image ? `${BASE_URL}${item.product_detail.image}` : PLACEHOLDER}
                  alt={item.product_detail?.name}
                  className="h-36 mx-auto object-contain cursor-pointer"
                  onClick={() => navigate(`/productdetail/${item.product}`)}
                  onError={(e) => e.target.src = PLACEHOLDER}
                />
                <h3
                  className="mt-4 font-semibold cursor-pointer hover:text-red-600"
                  onClick={() => navigate(`/productdetail/${item.product}`)}
                >
                  {item.product_detail?.name}
                </h3>
                <p className="text-red-600 font-bold mt-2">₹{item.product_detail?.price}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="flex-1 bg-red-600 hover:bg-black text-white py-2 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="border border-red-600 text-red-600 px-3 py-2 rounded-lg text-sm"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Wishlist;