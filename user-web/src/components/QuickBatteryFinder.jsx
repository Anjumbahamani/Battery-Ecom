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
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={[
        "h-11 rounded-xl border bg-white px-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-gray-300",
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
    [vehicleType]
  );

  const modelOptions = useMemo(() => (brand ? MODELS[brand] || [] : []), [brand]);

  const variantOptions = useMemo(
    () => (model ? VARIANTS[model] || [] : []),
    [model]
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

  const canSearch = vehicleType && brand && model && city; // variant optional
  const handleSearch = () => {
    // UI only: later call API and navigate to /products?...query
    // For now just demo
    alert(
      `Finding batteries for:\n${vehicleType} / ${brand} / ${model}${variant ? " / " + variant : ""}\nCity: ${city}`
    );
  };

  return (
    <section className="bg-white">
      {/* Overlap effect on hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 md:-mt-14 relative z-20">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-5 md:p-6">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Quick Battery Finder
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Select your vehicle details to find compatible batteries.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Installation available
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Exchange support
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Select
              label="Vehicle Type"
              value={vehicleType}
              onChange={(v) => {
                setVehicleType(v);
                resetDownstream("vehicle");
              }}
              options={VEHICLE_TYPES}
              disabled={false}
            />

            <Select
              label="Brand"
              value={brand}
              onChange={(v) => {
                setBrand(v);
                resetDownstream("brand");
              }}
              options={brandOptions}
              disabled={!vehicleType}
            />

            <Select
              label="Model"
              value={model}
              onChange={(v) => {
                setModel(v);
                resetDownstream("model");
              }}
              options={modelOptions}
              disabled={!brand}
            />

            <Select
              label="Variant (Optional)"
              value={variant}
              onChange={(v) => setVariant(v)}
              options={variantOptions}
              disabled={!model}
            />

            <Select
              label="City"
              value={city}
              onChange={(v) => setCity(v)}
              options={CITIES}
              disabled={false}
            />

            {/* Button column */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-transparent select-none">
                Action
              </span>
              <button
                onClick={handleSearch}
                disabled={!canSearch}
                className={[
                  "h-11 rounded-xl font-semibold text-white transition",
                  canSearch
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                    : "bg-gray-300 cursor-not-allowed",
                ].join(" ")}
              >
                Find Batteries
              </button>
            </div>
          </div>

          {/* Mobile helper chips */}
          <div className="mt-4 flex md:hidden flex-wrap gap-2 text-xs text-gray-600">
            <span className="rounded-full bg-blue-50 px-3 py-1">Installation available</span>
            <span className="rounded-full bg-orange-50 px-3 py-1">Exchange support</span>
          </div>
        </div>
      </div>

      {/* spacing below card */}
      <div className="h-10 md:h-12" />
    </section>
  );
};

export default QuickBatteryFinder;
