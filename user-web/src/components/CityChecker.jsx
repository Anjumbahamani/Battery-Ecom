import { useState } from "react";
import { MapPin } from "lucide-react";
import logo from "../assets/logo.jpeg";

const CityChecker = () => {
  const [city, setCity] = useState("");

  const handleCheck = () => {
    if (!city) return alert("Enter city name");
    alert(`Service available in ${city} (Demo UI)`);
  };

  return (
    <section className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <img
            src={logo}
            alt="logo"
            className="h-24 w-80 rounded-md shadow-md"
          />
          {/* <div>
            <h2 className="text-xl md:text-2xl font-bold">
              Check Service Availability
            </h2>
            <p className="text-red-100 text-sm">
              Fast delivery & installation across India
            </p>
          </div> */}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full md:w-auto gap-3">
          <div className="">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Check Service Availability
              </h2>
              <p className="text-red-100 text-sm">
                Fast delivery & installation across India
              </p>
            </div>
            {/* Input */}
            <div className="flex items-center bg-white rounded-lg px-3 py-2 w-full md:w-72 mt-4">
              <MapPin className="text-gray-500 mr-2" size={16} />
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none w-full text-gray-800 text-sm"
              />
            </div>
            <button
              onClick={handleCheck}
              className="bg-black px-5 py-2 mt-3 rounded-lg text-sm font-semibold hover:bg-red-500 transition"
            >
              Check
            </button>
          </div>

          {/* Button */}
        </div>
      </div>
    </section>
  );
};

export default CityChecker;
