// import { useMemo, useState } from "react";

// const VEHICLE_TYPES = ["2-Wheeler", "Car", "Truck", "Inverter/UPS"];

// const BRANDS = {
//   "2-Wheeler": ["Hero", "Honda", "TVS", "Bajaj", "Yamaha"],
//   Car: ["Maruti", "Hyundai", "Tata", "Mahindra", "Honda"],
//   Truck: ["Tata Motors", "Ashok Leyland", "Eicher"],
//   "Inverter/UPS": ["Luminous", "Microtek", "V-Guard"],
// };

// const MODELS = {
//   Hero: ["Splendor", "HF Deluxe", "Glamour"],
//   Honda: ["Activa", "Shine", "Unicorn"],
//   TVS: ["Jupiter", "Apache", "XL100"],
//   Bajaj: ["Pulsar", "Discover", "Platina"],
//   Yamaha: ["FZ", "R15", "Ray ZR"],
//   Maruti: ["Swift", "Baleno", "Dzire"],
//   Hyundai: ["i10", "i20", "Creta"],
//   Tata: ["Nexon", "Punch", "Tiago"],
//   Mahindra: ["XUV300", "Bolero", "Scorpio"],
// };

// const VARIANTS = {
//   Swift: ["VXI", "ZXI", "LXI"],
//   Baleno: ["Delta", "Zeta", "Alpha"],
//   Activa: ["Standard", "Deluxe", "Premium"],
//   Splendor: ["Plus", "Pro", "XTEC"],
// };

// const CITIES = ["Bengaluru", "Hubli", "Dharwad", "Mumbai", "Delhi", "Chennai"];

// const Select = ({ label, value, onChange, options, disabled }) => (
//   <div className="flex flex-col gap-2">
//     <label className="text-xs font-semibold text-gray-700">{label}</label>
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       disabled={disabled}
//       className={[
//         "h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm",
//         "focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500",
//         disabled ? "opacity-60 cursor-not-allowed" : "hover:border-gray-400",
//       ].join(" ")}
//     >
//       <option value="">Select</option>
//       {options.map((opt) => (
//         <option key={opt} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const QuickBatteryFinder = () => {
//   const [vehicleType, setVehicleType] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [variant, setVariant] = useState("");
//   const [city, setCity] = useState("");

//   const brandOptions = useMemo(
//     () => (vehicleType ? BRANDS[vehicleType] || [] : []),
//     [vehicleType],
//   );

//   const modelOptions = useMemo(
//     () => (brand ? MODELS[brand] || [] : []),
//     [brand],
//   );
//   const variantOptions = useMemo(
//     () => (model ? VARIANTS[model] || [] : []),
//     [model],
//   );

//   const resetDownstream = (level) => {
//     if (level === "vehicle") {
//       setBrand("");
//       setModel("");
//       setVariant("");
//     }
//     if (level === "brand") {
//       setModel("");
//       setVariant("");
//     }
//     if (level === "model") {
//       setVariant("");
//     }
//   };

//   const canSearch = vehicleType && brand && model && city;

//   const handleSearch = () => {
//     alert(
//       `Finding batteries for:\n${vehicleType} / ${brand} / ${model}${variant ? " / " + variant : ""}\nCity: ${city}`,
//     );
//   };

//   return (
//     <section className="bg-white py-10">
//  <div className="w-full px-6">

//     {/* Title */}
//     <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
//       QUICK BATTERY FINDER
//     </h2>

//     <div className="w-full bg-red-600 py-6 px-6">

//     <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

//         {/* Product Type */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             Product Type*
//           </label>
//           <select
//             className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
//             value={vehicleType}
//             onChange={(e) => {
//               setVehicleType(e.target.value);
//               resetDownstream("vehicle");
//             }}
//           >
//             <option>Select Product Type</option>
//             {VEHICLE_TYPES.map((v) => (
//               <option key={v}>{v}</option>
//             ))}
//           </select>
//         </div>

//         {/* Make */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             Make*
//           </label>
//           <select
//             className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
//             value={brand}
//             onChange={(e) => {
//               setBrand(e.target.value);
//               resetDownstream("brand");
//             }}
//           >
//             <option>Select Manufacturer</option>
//             {brandOptions.map((b) => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>
//         </div>

//         {/* Model */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             Model*
//           </label>
//           <select
//             className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
//             value={model}
//             onChange={(e) => {
//               setModel(e.target.value);
//               resetDownstream("model");
//             }}
//           >
//             <option>Select Model</option>
//             {modelOptions.map((m) => (
//               <option key={m}>{m}</option>
//             ))}
//           </select>
//         </div>

//         {/* Brand */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             Brand
//           </label>
//           <select className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm">
//             <option>All Brand</option>
//           </select>
//         </div>

//         {/* State */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             State*
//           </label>
//           <select className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm">
//             <option>Select State</option>
//           </select>
//         </div>

//         {/* City */}
//         <div>
//           <label className="text-white text-sm font-semibold">
//             City*
//           </label>
//           <select
//             className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           >
//             <option>Select City</option>
//             {CITIES.map((c) => (
//               <option key={c}>{c}</option>
//             ))}
//           </select>
//         </div>

//       </div>

//       {/* Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleSearch}
//           className="bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800"
//         >
//           Find Your Battery
//         </button>
//       </div>

//     </div>
//   </div>
// </section>
//   );
// };

// export default QuickBatteryFinder;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductTypes,
  getMakes,
  getModels,
  getBrands,
  getStates,
  getCities,
  filterProducts,
} from "../context/authApi"; // ← adjust path to your authApi file

const QuickBatteryFinder = () => {
  const navigate = useNavigate();

  // dropdown data
  const [productTypes, setProductTypes] = useState([]);
  const [makes, setMakes]               = useState([]);
  const [models, setModels]             = useState([]);
  const [brands, setBrands]             = useState([]);
  const [states, setStates]             = useState([]);
  const [cities, setCities]             = useState([]);

  // selected IDs
  const [productTypeId, setProductTypeId] = useState("");
  const [makeId, setMakeId]               = useState("");
  const [modelId, setModelId]             = useState("");
  const [brandId, setBrandId]             = useState("");
  const [stateId, setStateId]             = useState("");
  const [cityId, setCityId]               = useState("");

  // UI state
  const [loading, setLoading]     = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError]         = useState("");

  // ── Initial load ─────────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([getProductTypes(), getMakes(), getBrands(), getStates()])
      .then(([types, makesData, brandsData, statesData]) => {
        setProductTypes(types);
        setMakes(makesData);
        setBrands(brandsData);
        setStates(statesData);
      })
      .catch(() => setError("Failed to load filters. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  // ── Cascade: make → models ────────────────────────────────────────────────────
  useEffect(() => {
    setModelId("");
    setModels([]);
    if (!makeId) return;
    getModels(makeId)
      .then(setModels)
      .catch(() => setError("Failed to load models."));
  }, [makeId]);

  // ── Cascade: state → cities ───────────────────────────────────────────────────
  useEffect(() => {
    setCityId("");
    setCities([]);
    if (!stateId) return;
    getCities(stateId)
      .then(setCities)
      .catch(() => setError("Failed to load cities."));
  }, [stateId]);

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleProductTypeChange = (val) => {
    setProductTypeId(val);
    setMakeId("");
    setModelId("");
    setModels([]);
  };

  const handleMakeChange = (val) => {
    setMakeId(val);
    setModelId("");
    setModels([]);
  };

  const canSearch = productTypeId && makeId && modelId && stateId && cityId;

  const handleSearch = async () => {
    if (!canSearch) return;
    setSearching(true);
    setError("");
    try {
      const data = await filterProducts({
        product_type: productTypeId,
        make_id: makeId,
        model_id: modelId,
        brand_id: brandId || undefined,
        state_id: stateId,
        city_id: cityId,
      });
      navigate("/product", { state: { filterResults: data } });
    } catch {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <section className="bg-white py-10">
      <div className="w-full px-6">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
          QUICK BATTERY FINDER
        </h2>

        <div className="w-full bg-red-600 py-6 px-6">
          {loading ? (
            <p className="text-white text-sm animate-pulse">Loading filters...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

                {/* Product Type */}
                <div>
                  <label className="text-white text-sm font-semibold">Product Type*</label>
                  <select
                    className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
                    value={productTypeId}
                    onChange={(e) => handleProductTypeChange(e.target.value)}
                  >
                    <option value="">Select Product Type</option>
                    {productTypes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Make */}
                <div>
                  <label className="text-white text-sm font-semibold">Make*</label>
                  <select
                    className={`w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm ${!productTypeId ? "opacity-60 cursor-not-allowed" : ""}`}
                    value={makeId}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    disabled={!productTypeId}
                  >
                    <option value="">Select Manufacturer</option>
                    {makes.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="text-white text-sm font-semibold">Model*</label>
                  <select
                    className={`w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm ${!makeId ? "opacity-60 cursor-not-allowed" : ""}`}
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    disabled={!makeId}
                  >
                    <option value="">Select Model</option>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-white text-sm font-semibold">Brand</label>
                  <select
                    className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="text-white text-sm font-semibold">State*</label>
                  <select
                    className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="text-white text-sm font-semibold">City*</label>
                  <select
                    className={`w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm ${!stateId ? "opacity-60 cursor-not-allowed" : ""}`}
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    disabled={!stateId}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {error && <p className="text-yellow-300 text-xs mt-3">{error}</p>}

              <div className="mt-4">
                <button
                  onClick={handleSearch}
                  disabled={!canSearch || searching}
                  className={`px-6 py-2 text-sm font-semibold transition-colors ${
                    canSearch && !searching
                      ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {searching ? "Searching..." : "Find Your Battery"}
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default QuickBatteryFinder;