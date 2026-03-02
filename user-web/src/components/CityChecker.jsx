import { useState } from "react";

const CityChecker = () => {
  const [city, setCity] = useState("");

  const handleCheck = () => {
    if (!city) return alert("Enter city name");
    alert(`Service available in ${city} (Demo UI)`);
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Check Service Availability
        </h2>

        <p className="mt-4 text-blue-100">
          Enter your city to see if installation and delivery are available.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-3 rounded-xl text-gray-800 w-full md:w-96"
          />

          <button
            onClick={handleCheck}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold"
          >
            Check Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default CityChecker;
