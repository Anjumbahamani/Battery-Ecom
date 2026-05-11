

// import { useState, useEffect, useCallback } from "react";

// import { ShoppingCart, Search, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { addToCart, BASE_URL } from "../context/authApi";

// // Use IDs to match API exact-match filter requirements
// const brands = [
//   { id: 1, name: "Exide" },
//   { id: 2, name: "Amaron" },
//   { id: 3, name: "Luminous" },
//   { id: 4, name: "Microtek" },
// ];

// const categories = [
//   { id: 1, name: "Car" },
//   { id: 2, name: "2-Wheeler" },
//   { id: 3, name: "Inverter" },
//   { id: 4, name: "UPS" },
// ];

// const Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter / search / sort state
//   const [brandId, setBrandId] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchInput, setSearchInput] = useState(""); // controlled input value
//   const [ordering, setOrdering] = useState("");

//   // Build query string and fetch from API
//   const fetchProducts = useCallback(() => {
//     setLoading(true);
//     setError(null);

//     const params = new URLSearchParams();

//     if (categoryId) params.append("category", categoryId);
//     if (brandId) params.append("brand", brandId);
//     if (search) params.append("search", search);
//     if (ordering) params.append("ordering", ordering);

//     // Only show active products
//     params.append("is_active", "true");

//     const url = `${BASE_URL}/api/products/?${params.toString()}`;

//     fetch(url)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Server error: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data.results || data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load products. Please try again.");
//         setLoading(false);
//       });
//   }, [brandId, categoryId, search, ordering]);

//   // Re-fetch whenever any filter/search/sort changes
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Trigger search only on Enter or button click to avoid too many requests
//   const handleSearchSubmit = () => {
//     setSearch(searchInput.trim());
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === "Enter") handleSearchSubmit();
//   };

//   const clearSearch = () => {
//     setSearchInput("");
//     setSearch("");
//   };

//   const handleAddToCart = async (product) => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     alert("Please login to add items to cart!");
//     navigate("/login");
//     return;
//   }
//   try {
//    await addToCart({ 
//   productId: !product.is_combo ? product.id : null,
//   comboId: product.is_combo ? product.id : null,
//   quantity: 1 
// });
//     alert(`${product.name} added to cart!`);
//     navigate("/cart");
//   } catch (err) {
//     alert("Failed to add to cart: " + err.message);
//   }
// };

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-4 gap-8">

//           {/* FILTER SIDEBAR */}
//           <div className="border rounded-xl p-6 h-fit sticky top-24">
//             <h3 className="text-lg font-bold mb-6">Filters</h3>

//             {/* CATEGORY */}
//             <div className="mb-6">
//               <h4 className="font-semibold mb-3">Category</h4>
//               {categories.map((c) => (
//                 <label key={c.id} className="flex items-center gap-2 mb-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="category"
//                     checked={categoryId === String(c.id)}
//                     onChange={() => setCategoryId(String(c.id))}
//                   />
//                   {c.name}
//                 </label>
//               ))}
//               <button
//                 onClick={() => setCategoryId("")}
//                 className="text-red-600 text-sm mt-2"
//               >
//                 Clear
//               </button>
//             </div>

//             {/* BRAND */}
//             <div className="mb-6">
//               <h4 className="font-semibold mb-3">Brand</h4>
//               {brands.map((b) => (
//                 <label key={b.id} className="flex items-center gap-2 mb-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="brand"
//                     checked={brandId === String(b.id)}
//                     onChange={() => setBrandId(String(b.id))}
//                   />
//                   {b.name}
//                 </label>
//               ))}
//               <button
//                 onClick={() => setBrandId("")}
//                 className="text-red-600 text-sm mt-2"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           {/* PRODUCTS AREA */}
//           <div className="lg:col-span-3">

//             {/* TOP BAR */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h1 className="text-3xl font-bold">All Batteries</h1>

//               <div className="flex items-center gap-3 w-full sm:w-auto">
//                 {/* SEARCH */}
//                 <div className="flex items-center border rounded-lg overflow-hidden flex-1 sm:flex-none">
//                   <input
//                     type="text"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     onKeyDown={handleSearchKeyDown}
//                     placeholder="Search batteries..."
//                     className="px-3 py-2 outline-none text-sm w-full sm:w-48"
//                   />
//                   {searchInput && (
//                     <button onClick={clearSearch} className="px-2 text-gray-400 hover:text-red-600">
//                       <X size={15} />
//                     </button>
//                   )}
//                   <button
//                     onClick={handleSearchSubmit}
//                     className="bg-red-600 hover:bg-black text-white px-3 py-2"
//                   >
//                     <Search size={16} />
//                   </button>
//                 </div>

//                 {/* SORT */}
//                 <select
//                   value={ordering}
//                   onChange={(e) => setOrdering(e.target.value)}
//                   className="border rounded-lg px-4 py-2 text-sm"
//                 >
//                   <option value="">Sort</option>
//                   <option value="price">Price: Low → High</option>
//                   <option value="-price">Price: High → Low</option>
//                 </select>
//               </div>
//             </div>

//             {/* Active filters summary */}
//             {(search || brandId || categoryId) && (
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {search && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Search: "{search}"
//                     <button onClick={clearSearch}><X size={12} /></button>
//                   </span>
//                 )}
//                 {categoryId && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Category: {categories.find(c => String(c.id) === categoryId)?.name}
//                     <button onClick={() => setCategoryId("")}><X size={12} /></button>
//                   </span>
//                 )}
//                 {brandId && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Brand: {brands.find(b => String(b.id) === brandId)?.name}
//                     <button onClick={() => setBrandId("")}><X size={12} /></button>
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* LOADING */}
//             {loading && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 text-lg">Loading products...</p>
//               </div>
//             )}

//             {/* ERROR */}
//             {!loading && error && (
//               <div className="text-center py-20">
//                 <p className="text-red-500">{error}</p>
//                 <button
//                   onClick={fetchProducts}
//                   className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-black"
//                 >
//                   Retry
//                 </button>
//               </div>
//             )}

//             {/* NO PRODUCTS */}
//             {!loading && !error && products.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500">No products found.</p>
//               </div>
//             )}

//             {/* PRODUCT GRID */}
//             {!loading && !error && (
//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
//                   >
//                     <img
//                       src={
//                         product.image
//                           ? `${BASE_URL}${product.image}`
//                           : "/placeholder.png"
//                       }
//                       alt={product.name}
//                       className="h-36 mx-auto object-contain cursor-pointer"
//                       onClick={() => navigate(`/productdetail/${product.id}`)}
//                     />
//                     <h3
//                       className="mt-4 font-semibold cursor-pointer hover:text-red-600"
//                       onClick={() => navigate(`/productdetail/${product.id}`)}
//                     >
//                       {product.name}
//                     </h3>
//                     <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart size={18} />
//                       Add to Cart
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Products;

import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addToCart, BASE_URL } from "../context/authApi";

const brands = [
  { id: 1, name: "Exide" },
  { id: 2, name: "Amaron" },
  { id: 3, name: "Luminous" },
  { id: 4, name: "Microtek" },
];

const categories = [
  { id: 1, name: "Car" },
  { id: 2, name: "2-Wheeler" },
  { id: 3, name: "Inverter" },
  { id: 4, name: "UPS" },
];

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Check if coming from Quick Battery Finder ─────────────────────────────
  const filterResults = location.state?.filterResults || null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter / search / sort state
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [ordering, setOrdering] = useState("");

  // ── If filter results passed from Battery Finder, use them directly ────────
  useEffect(() => {
    if (filterResults) {
      const data = Array.isArray(filterResults)
        ? filterResults
        : filterResults.results || [];
      setProducts(data);
      setLoading(false);
    }
  }, []);

  // ── Normal fetch when no filter results ───────────────────────────────────
  const fetchProducts = useCallback(() => {
    if (filterResults) return; // skip if we have filter results
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (categoryId) params.append("category", categoryId);
    if (brandId) params.append("brand", brandId);
    if (search) params.append("search", search);
    if (ordering) params.append("ordering", ordering);
    params.append("is_active", "true");

    fetch(`${BASE_URL}/api/products/?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, [brandId, categoryId, search, ordering]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── Clear filter results and go back to normal browsing ───────────────────
  const clearFilterResults = () => {
    navigate("/product", { replace: true, state: {} });
    window.location.reload();
  };

  const handleSearchSubmit = () => setSearch(searchInput.trim());
  const handleSearchKeyDown = (e) => { if (e.key === "Enter") handleSearchSubmit(); };
  const clearSearch = () => { setSearchInput(""); setSearch(""); };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }
    try {
      await addToCart({
        productId: !product.is_combo ? product.id : null,
        comboId: product.is_combo ? product.id : null,
        quantity: 1,
      });
      alert(`${product.name} added to cart!`);
      navigate("/cart");
    } catch (err) {
      alert("Failed to add to cart: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

          {/* FILTER SIDEBAR — hide when showing battery finder results */}
          {!filterResults && (
            <div className="border rounded-xl p-4 sm:p-5 lg:p-6 h-fit lg:sticky lg:top-24 order-1 lg:order-none">
              <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Filters</h3>

              {/* CATEGORY */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Category</h4>
                {/* Mobile: horizontal wrap; Desktop: vertical list */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-y-0">
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 mb-0 lg:mb-2 cursor-pointer text-sm sm:text-base">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryId === String(c.id)}
                        onChange={() => setCategoryId(String(c.id))}
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
                <button onClick={() => setCategoryId("")} className="text-red-600 text-xs sm:text-sm mt-2">
                  Clear
                </button>
              </div>

              {/* BRAND */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Brand</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-y-0">
                  {brands.map((b) => (
                    <label key={b.id} className="flex items-center gap-2 mb-0 lg:mb-2 cursor-pointer text-sm sm:text-base">
                      <input
                        type="radio"
                        name="brand"
                        checked={brandId === String(b.id)}
                        onChange={() => setBrandId(String(b.id))}
                      />
                      {b.name}
                    </label>
                  ))}
                </div>
                <button onClick={() => setBrandId("")} className="text-red-600 text-xs sm:text-sm mt-2">
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* PRODUCTS AREA */}
          <div className={`${filterResults ? "lg:col-span-4" : "lg:col-span-3"} order-2 lg:order-none`}>

            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {filterResults ? "Battery Finder Results" : "All Batteries"}
              </h1>

              {/* Show clear button when filter results active */}
              {filterResults ? (
                <button
                  onClick={clearFilterResults}
                  className="flex items-center gap-2 text-xs sm:text-sm text-red-600 border border-red-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  <X size={15} /> Clear &amp; Browse All
                </button>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* SEARCH */}
                  <div className="flex items-center border rounded-lg overflow-hidden flex-1 sm:flex-none">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search batteries..."
                      className="px-2 sm:px-3 py-2 outline-none text-xs sm:text-sm w-full sm:w-40 md:w-48"
                    />
                    {searchInput && (
                      <button onClick={clearSearch} className="px-2 text-gray-400 hover:text-red-600">
                        <X size={15} />
                      </button>
                    )}
                    <button onClick={handleSearchSubmit} className="bg-red-600 hover:bg-black text-white px-2 sm:px-3 py-2">
                      <Search size={15} />
                    </button>
                  </div>

                  {/* SORT */}
                  <select
                    value={ordering}
                    onChange={(e) => setOrdering(e.target.value)}
                    className="border rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm min-w-0 flex-shrink-0"
                  >
                    <option value="">Sort</option>
                    <option value="price">Price: Low → High</option>
                    <option value="-price">Price: High → Low</option>
                  </select>
                </div>
              )}
            </div>

            {/* Filter result banner */}
            {filterResults && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-6 flex items-center justify-between">
                <p className="text-red-700 text-xs sm:text-sm font-medium">
                  Showing {products.length} batteries matched from Quick Battery Finder
                </p>
              </div>
            )}

            {/* Active filters summary (only for normal browsing) */}
            {!filterResults && (search || brandId || categoryId) && (
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {search && (
                  <span className="bg-red-50 text-red-700 text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                    Search: "{search}"
                    <button onClick={clearSearch}><X size={12} /></button>
                  </span>
                )}
                {categoryId && (
                  <span className="bg-red-50 text-red-700 text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                    Category: {categories.find(c => String(c.id) === categoryId)?.name}
                    <button onClick={() => setCategoryId("")}><X size={12} /></button>
                  </span>
                )}
                {brandId && (
                  <span className="bg-red-50 text-red-700 text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                    Brand: {brands.find(b => String(b.id) === brandId)?.name}
                    <button onClick={() => setBrandId("")}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="text-gray-500 text-base sm:text-lg">Loading products...</p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="text-red-500 text-sm sm:text-base">{error}</p>
                <button onClick={fetchProducts} className="mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-black text-sm sm:text-base">
                  Retry
                </button>
              </div>
            )}

            {/* NO PRODUCTS */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="text-gray-500 text-base sm:text-lg">No batteries found for your selection.</p>
                {filterResults && (
                  <button onClick={clearFilterResults} className="mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-black text-sm sm:text-base">
                    Browse All Batteries
                  </button>
                )}
              </div>
            )}

            {/* PRODUCT GRID */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition"
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
                      className="h-24 sm:h-32 md:h-36 mx-auto object-contain cursor-pointer"
                      onClick={() => navigate(`/productdetail/${product.id}`)}
                    />
                    <h3
                      className="mt-2 sm:mt-4 font-semibold cursor-pointer hover:text-red-600 text-xs sm:text-sm md:text-base line-clamp-2"
                      onClick={() => navigate(`/productdetail/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-red-600 font-bold mt-1 sm:mt-2 text-sm sm:text-base">₹{product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 sm:mt-4 w-full bg-red-600 hover:bg-black text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <ShoppingCart size={15} className="sm:hidden" />
                      <ShoppingCart size={18} className="hidden sm:block" />
                      <span className="hidden xs:inline">Add to Cart</span>
                      <span className="xs:hidden">Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Products;


// import { useState, useEffect, useCallback } from "react";
// import { ShoppingCart, Search, X } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { addToCart, BASE_URL } from "../context/authApi";

// const brands = [
//   { id: 1, name: "Exide" },
//   { id: 2, name: "Amaron" },
//   { id: 3, name: "Luminous" },
//   { id: 4, name: "Microtek" },
// ];

// const categories = [
//   { id: 1, name: "Car" },
//   { id: 2, name: "2-Wheeler" },
//   { id: 3, name: "Inverter" },
//   { id: 4, name: "UPS" },
// ];

// const Products = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ── Check if coming from Quick Battery Finder ─────────────────────────────
//   const filterResults = location.state?.filterResults || null;

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter / search / sort state
//   const [brandId, setBrandId] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [ordering, setOrdering] = useState("");

//   // ── If filter results passed from Battery Finder, use them directly ────────
//   useEffect(() => {
//     if (filterResults) {
//       const data = Array.isArray(filterResults)
//         ? filterResults
//         : filterResults.results || [];
//       setProducts(data);
//       setLoading(false);
//     }
//   }, []);

//   // ── Normal fetch when no filter results ───────────────────────────────────
//   const fetchProducts = useCallback(() => {
//     if (filterResults) return; // skip if we have filter results
//     setLoading(true);
//     setError(null);

//     const params = new URLSearchParams();
//     if (categoryId) params.append("category", categoryId);
//     if (brandId) params.append("brand", brandId);
//     if (search) params.append("search", search);
//     if (ordering) params.append("ordering", ordering);
//     params.append("is_active", "true");

//     fetch(`${BASE_URL}/api/products/?${params.toString()}`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Server error: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data.results || data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load products. Please try again.");
//         setLoading(false);
//       });
//   }, [brandId, categoryId, search, ordering]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // ── Clear filter results and go back to normal browsing ───────────────────
//   const clearFilterResults = () => {
//     navigate("/product", { replace: true, state: {} });
//     window.location.reload();
//   };

//   const handleSearchSubmit = () => setSearch(searchInput.trim());
//   const handleSearchKeyDown = (e) => { if (e.key === "Enter") handleSearchSubmit(); };
//   const clearSearch = () => { setSearchInput(""); setSearch(""); };

//   const handleAddToCart = async (product) => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("Please login to add items to cart!");
//       navigate("/login");
//       return;
//     }
//     try {
//       await addToCart({
//         productId: !product.is_combo ? product.id : null,
//         comboId: product.is_combo ? product.id : null,
//         quantity: 1,
//       });
//       alert(`${product.name} added to cart!`);
//       navigate("/cart");
//     } catch (err) {
//       alert("Failed to add to cart: " + err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <section className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-4 gap-8">

//           {/* FILTER SIDEBAR — hide when showing battery finder results */}
//           {!filterResults && (
//             <div className="border rounded-xl p-6 h-fit sticky top-24">
//               <h3 className="text-lg font-bold mb-6">Filters</h3>

//               {/* CATEGORY */}
//               <div className="mb-6">
//                 <h4 className="font-semibold mb-3">Category</h4>
//                 {categories.map((c) => (
//                   <label key={c.id} className="flex items-center gap-2 mb-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={categoryId === String(c.id)}
//                       onChange={() => setCategoryId(String(c.id))}
//                     />
//                     {c.name}
//                   </label>
//                 ))}
//                 <button onClick={() => setCategoryId("")} className="text-red-600 text-sm mt-2">
//                   Clear
//                 </button>
//               </div>

//               {/* BRAND */}
//               <div className="mb-6">
//                 <h4 className="font-semibold mb-3">Brand</h4>
//                 {brands.map((b) => (
//                   <label key={b.id} className="flex items-center gap-2 mb-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="brand"
//                       checked={brandId === String(b.id)}
//                       onChange={() => setBrandId(String(b.id))}
//                     />
//                     {b.name}
//                   </label>
//                 ))}
//                 <button onClick={() => setBrandId("")} className="text-red-600 text-sm mt-2">
//                   Clear
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* PRODUCTS AREA */}
//           <div className={filterResults ? "lg:col-span-4" : "lg:col-span-3"}>

//             {/* TOP BAR */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h1 className="text-3xl font-bold">
//                 {filterResults ? "Battery Finder Results" : "All Batteries"}
//               </h1>

//               {/* Show clear button when filter results active */}
//               {filterResults ? (
//                 <button
//                   onClick={clearFilterResults}
//                   className="flex items-center gap-2 text-sm text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
//                 >
//                   <X size={15} /> Clear & Browse All
//                 </button>
//               ) : (
//                 <div className="flex items-center gap-3 w-full sm:w-auto">
//                   {/* SEARCH */}
//                   <div className="flex items-center border rounded-lg overflow-hidden flex-1 sm:flex-none">
//                     <input
//                       type="text"
//                       value={searchInput}
//                       onChange={(e) => setSearchInput(e.target.value)}
//                       onKeyDown={handleSearchKeyDown}
//                       placeholder="Search batteries..."
//                       className="px-3 py-2 outline-none text-sm w-full sm:w-48"
//                     />
//                     {searchInput && (
//                       <button onClick={clearSearch} className="px-2 text-gray-400 hover:text-red-600">
//                         <X size={15} />
//                       </button>
//                     )}
//                     <button onClick={handleSearchSubmit} className="bg-red-600 hover:bg-black text-white px-3 py-2">
//                       <Search size={16} />
//                     </button>
//                   </div>

//                   {/* SORT */}
//                   <select
//                     value={ordering}
//                     onChange={(e) => setOrdering(e.target.value)}
//                     className="border rounded-lg px-4 py-2 text-sm"
//                   >
//                     <option value="">Sort</option>
//                     <option value="price">Price: Low → High</option>
//                     <option value="-price">Price: High → Low</option>
//                   </select>
//                 </div>
//               )}
//             </div>

//             {/* Filter result banner */}
//             {filterResults && (
//               <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
//                 <p className="text-red-700 text-sm font-medium">
//                   Showing {products.length} batteries matched from Quick Battery Finder
//                 </p>
//               </div>
//             )}

//             {/* Active filters summary (only for normal browsing) */}
//             {!filterResults && (search || brandId || categoryId) && (
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {search && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Search: "{search}"
//                     <button onClick={clearSearch}><X size={12} /></button>
//                   </span>
//                 )}
//                 {categoryId && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Category: {categories.find(c => String(c.id) === categoryId)?.name}
//                     <button onClick={() => setCategoryId("")}><X size={12} /></button>
//                   </span>
//                 )}
//                 {brandId && (
//                   <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     Brand: {brands.find(b => String(b.id) === brandId)?.name}
//                     <button onClick={() => setBrandId("")}><X size={12} /></button>
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* LOADING */}
//             {loading && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 text-lg">Loading products...</p>
//               </div>
//             )}

//             {/* ERROR */}
//             {!loading && error && (
//               <div className="text-center py-20">
//                 <p className="text-red-500">{error}</p>
//                 <button onClick={fetchProducts} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-black">
//                   Retry
//                 </button>
//               </div>
//             )}

//             {/* NO PRODUCTS */}
//             {!loading && !error && products.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 text-lg">No batteries found for your selection.</p>
//                 {filterResults && (
//                   <button onClick={clearFilterResults} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-black">
//                     Browse All Batteries
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* PRODUCT GRID */}
//             {!loading && !error && products.length > 0 && (
//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
//                   >
//                     <img
//                       src={product.image ? `${BASE_URL}${product.image}` : "/placeholder.png"}
//                       alt={product.name}
//                       className="h-36 mx-auto object-contain cursor-pointer"
//                       onClick={() => navigate(`/productdetail/${product.id}`)}
//                     />
//                     <h3
//                       className="mt-4 font-semibold cursor-pointer hover:text-red-600"
//                       onClick={() => navigate(`/productdetail/${product.id}`)}
//                     >
//                       {product.name}
//                     </h3>
//                     <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="mt-4 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart size={18} />
//                       Add to Cart
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Products;