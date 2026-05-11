import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../context/authApi";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../context/authApi";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      // adjust based on API response
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

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        productId: productId,
        comboId: null, // since this is normal product list
        quantity: 1,
      });

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-black">
            Featured Products
          </h3>
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
                onClick={() => navigate(`/productdetail/${product.id}`)}
                className="cursor-pointer border border-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={
                    product.image
                      ? product.image.startsWith("http")
                        ? product.image
                        : `${BASE_URL}${product.image}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="h-40 mx-auto object-contain"
                />

                <h4 className="mt-4 font-semibold text-black">
                  {product.name}
                </h4>

                <p className="mt-2 text-lg font-bold text-red-600">
                  ₹{product.price}
                </p>

                {/* IMPORTANT: stop propagation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
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
