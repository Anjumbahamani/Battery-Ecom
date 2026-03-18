import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import b1 from '../assets/b1.jpg'
import b2 from '../assets/b2.jpg'
import b3 from '../assets/b3.jpg'
import main from '../assets/main.png'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const productsData = [
  { id: 1, name: "Exide Car Battery", price: 4899, brand: "Exide", category: "Car", image: b1 },
  { id: 2, name: "Amaron Car Battery", price: 7999, brand: "Amaron", category: "Car", image: b2 },
  { id: 3, name: "Luminous Inverter Battery", price: 9999, brand: "Luminous", category: "Inverter", image: b3 },
  { id: 4, name: "Hero Bike Battery", price: 1899, brand: "Exide", category: "2-Wheeler", image:b1},
  { id: 5, name: "Microtek UPS Battery", price: 8499, brand: "Microtek", category: "UPS", image: main },
    { id: 6, name: "Exide Car Battery", price: 4899, brand: "Exide", category: "Car", image: b1 },
  { id: 7, name: "Amaron Car Battery", price: 7999, brand: "Amaron", category: "Car", image: b2 },
  { id: 8, name: "Luminous Inverter Battery", price: 9999, brand: "Luminous", category: "Inverter", image: b3 },
  { id: 9, name: "Hero Bike Battery", price: 1899, brand: "Exide", category: "2-Wheeler", image:b1},
  { id: 10, name: "Microtek UPS Battery", price: 8499, brand: "Microtek", category: "UPS", image: main },
];

const brands = ["Exide", "Amaron", "Luminous", "Microtek"];
const categories = ["Car", "2-Wheeler", "Inverter", "UPS"];

const Products = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  let filteredProducts = productsData.filter((p) => {
    return (
      (brand ? p.brand === brand : true) &&
      (category ? p.category === category : true)
    );
  });

  if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <>
      <Navbar/>
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-4 gap-8">

        {/* FILTER SIDEBAR */}
        <div className="border rounded-xl p-6 h-fit sticky top-24">

          <h3 className="text-lg font-bold mb-6">Filters</h3>

          {/* CATEGORY */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Category</h4>

            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  onChange={() => setCategory(c)}
                />
                {c}
              </label>
            ))}

            <button
              onClick={() => setCategory("")}
              className="text-red-600 text-sm mt-2"
            >
              Clear
            </button>
          </div>

          {/* BRAND */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Brand</h4>

            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => setBrand(b)}
                />
                {b}
              </label>
            ))}

            <button
              onClick={() => setBrand("")}
              className="text-red-600 text-sm mt-2"
            >
              Clear
            </button>
          </div>

        </div>

        {/* PRODUCTS AREA */}
        <div className="lg:col-span-3">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              All Batteries
            </h1>

            <select
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Sort</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

          </div>

          {/* PRODUCT GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-36 mx-auto object-contain"
                />

                <h3 className="mt-4 font-semibold">
                  {product.name}
                </h3>

                <p className="text-red-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <button className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
    <Footer/>
    </>
  
  );
};

export default Products;