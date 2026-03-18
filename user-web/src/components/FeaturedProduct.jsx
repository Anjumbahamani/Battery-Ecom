import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import main from "../assets/main.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Exide EGO 550Ah",
    price: "₹4,899",
    image: b1,
  },
  {
    id: 2,
    name: "Amaron CRBAT 7",
    price: "₹12,999",
    image: b2,
  },
  {
    id: 3,
    name: "Hero MotoCorp Battery",
    price: "₹1,899",
    image: b3,
  },
  {
    id: 4,
    name: "Luminous Solar 120Ah",
    price: "₹6,999",
    image: main,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 mx-auto object-contain"
              />

              <h4 className="mt-4 font-semibold text-black">{product.name}</h4>

              <p className="mt-2 text-lg font-bold text-red-600">
                {product.price}
              </p>

              <button className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
