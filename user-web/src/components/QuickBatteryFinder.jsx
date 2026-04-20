import { useMemo, useState } from "react";

const VEHICLE_TYPES = ["2-Wheeler", "Car", "Truck", "Inverter/UPS"];

const BRANDS = {
  "2-Wheeler": ["Hero", "Honda", "TVS", "Bajaj", "Yamaha"],
  Car: ["Maruti", "Hyundai", "Tata", "Mahindra", "Honda"],
  Truck: ["Tata Motors", "Ashok Leyland", "Eicher"],
  "Inverter/UPS": ["Luminous", "Microtek", "V-Guard"],
};

const MODELS = {
  Hero: ["Splendor", "HF Deluxe", "Glamour"],
  Honda: ["Activa", "Shine", "Unicorn"],
  TVS: ["Jupiter", "Apache", "XL100"],
  Bajaj: ["Pulsar", "Discover", "Platina"],
  Yamaha: ["FZ", "R15", "Ray ZR"],
  Maruti: ["Swift", "Baleno", "Dzire"],
  Hyundai: ["i10", "i20", "Creta"],
  Tata: ["Nexon", "Punch", "Tiago"],
  Mahindra: ["XUV300", "Bolero", "Scorpio"],
};

const VARIANTS = {
  Swift: ["VXI", "ZXI", "LXI"],
  Baleno: ["Delta", "Zeta", "Alpha"],
  Activa: ["Standard", "Deluxe", "Premium"],
  Splendor: ["Plus", "Pro", "XTEC"],
};

const CITIES = ["Bengaluru", "Hubli", "Dharwad", "Mumbai", "Delhi", "Chennai"];

const Select = ({ label, value, onChange, options, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={[
        "h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-gray-400",
      ].join(" ")}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const QuickBatteryFinder = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [city, setCity] = useState("");

  const brandOptions = useMemo(
    () => (vehicleType ? BRANDS[vehicleType] || [] : []),
    [vehicleType],
  );

  const modelOptions = useMemo(
    () => (brand ? MODELS[brand] || [] : []),
    [brand],
  );
  const variantOptions = useMemo(
    () => (model ? VARIANTS[model] || [] : []),
    [model],
  );

  const resetDownstream = (level) => {
    if (level === "vehicle") {
      setBrand("");
      setModel("");
      setVariant("");
    }
    if (level === "brand") {
      setModel("");
      setVariant("");
    }
    if (level === "model") {
      setVariant("");
    }
  };

  const canSearch = vehicleType && brand && model && city;

  const handleSearch = () => {
    alert(
      `Finding batteries for:\n${vehicleType} / ${brand} / ${model}${variant ? " / " + variant : ""}\nCity: ${city}`,
    );
  };

  return (
    <section className="bg-white py-10">
 <div className="w-full px-6">

    {/* Title */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
      QUICK BATTERY FINDER
    </h2>

    <div className="w-full bg-red-600 py-6 px-6">

    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        {/* Product Type */}
        <div>
          <label className="text-white text-sm font-semibold">
            Product Type*
          </label>
          <select
            className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
              resetDownstream("vehicle");
            }}
          >
            <option>Select Product Type</option>
            {VEHICLE_TYPES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="text-white text-sm font-semibold">
            Make*
          </label>
          <select
            className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              resetDownstream("brand");
            }}
          >
            <option>Select Manufacturer</option>
            {brandOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="text-white text-sm font-semibold">
            Model*
          </label>
          <select
            className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              resetDownstream("model");
            }}
          >
            <option>Select Model</option>
            {modelOptions.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-white text-sm font-semibold">
            Brand
          </label>
          <select className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm">
            <option>All Brand</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="text-white text-sm font-semibold">
            State*
          </label>
          <select className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm">
            <option>Select State</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="text-white text-sm font-semibold">
            City*
          </label>
          <select
            className="w-full h-10 mt-1 px-2 bg-white border border-gray-300 text-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Select City</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Button */}
      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800"
        >
          Find Your Battery
        </button>
      </div>

    </div>
  </div>
</section>
  );
};

export default QuickBatteryFinder;
