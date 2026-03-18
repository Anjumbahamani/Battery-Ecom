import React from "react";

import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";

const brands = [b1, b2, b3, b1, b2, b3, b1, b2];

const BrandsMarquee = () => {
  return (
    <section className="py-10 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2 mb-6">
          SHOP FOR CAR BATTERIES BY MAKE
        </h2>

        {/* Marquee */}
        <div className="overflow-hidden bg-white p-6">
          <div className="flex gap-10 animate-marquee">
            {brands.concat(brands).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="brand"
                className="h-12 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsMarquee;