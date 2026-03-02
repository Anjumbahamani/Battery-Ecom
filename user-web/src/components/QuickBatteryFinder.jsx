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
    <label className="text-xs font-semibold text-gray-700">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={[
        "h-11 rounded-lg border border-borderLight bg-white px-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
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

  const canSearch = vehicleType && brand && model && city;

  const handleSearch = () => {
    alert(
      `Finding batteries for:\n${vehicleType} / ${brand} / ${model}${variant ? " / " + variant : ""}\nCity: ${city}`
    );
  };

  return (
    <section className="bg-softBg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-lg border border-borderLight p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-black">
                Quick Battery Finder
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Select your vehicle details to find compatible batteries.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Installation Available
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 text-blackMain px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-blackMain" />
                Exchange Support
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-transparent select-none">
                Action
              </span>
              <button
                onClick={handleSearch}
                disabled={!canSearch}
                className={[
                  "h-11 rounded-lg font-semibold text-white transition duration-300",
                  canSearch
                    ? "bg-primary hover:bg-red-700 shadow-md"
                    : "bg-gray-300 cursor-not-allowed",
                ].join(" ")}
              >
                Find Batteries
              </button>
            </div>
          </div>

          {/* Mobile Chips */}
          <div className="mt-4 flex md:hidden flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
              Installation Available
            </span>
            <span className="rounded-full bg-black/5 text-blackMain px-3 py-1">
              Exchange Support
            </span>
          </div>

        </div>
      </div>

      <div className="h-12" />
    </section>
  );
};

export default QuickBatteryFinder;