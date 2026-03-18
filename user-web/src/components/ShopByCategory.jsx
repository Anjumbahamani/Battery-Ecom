// import React from "react";
// import b1 from "../assets/b1.jpg";
// import b2 from "../assets/b2.jpg";
// import b3 from "../assets/b3.jpg";
// import main from "../assets/main.png";

// const categories = [
//   {
//     id: 1,
//     name: "Car Battery",
//     image:b1,
//   },
//   {
//     id: 2,
//     name: "Inverter Battery",
//     image: b2,
//   },
//   {
//     id: 3,
//     name: "Inverters",
//     image:b3,
//   },
//   {
//     id: 4,
//     name: "UPS Batteries",
//     image: main,
//   },
//   {
//     id: 5,
//     name: "Golf Cart Batteries",
//     image: b1,
//   },
//   {
//     id: 6,
//     name: "Floor Cleaning Machine Batteries",
//     image: b2,
//   },
//   {
//     id: 7,
//     name: "Deep Cycle Batteries",
//     image: b3,
//   },
//   {
//     id: 8,
//     name: "Scissor Lift Batteries",
//     image: main,
//   }

// ];

// const ShopByCategory = () => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-black">
//             Shop by <span className="text-primary">Category</span>
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Explore our wide range of battery solutions.
//           </p>
//         </div>

//         {/* Category Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className="group bg-white border border-borderLight rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-primary transition duration-300 cursor-pointer"
//             >
//               <div className="w-20 h-20 flex items-center justify-center mb-4">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="h-16 object-contain transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>

//               <h3 className="font-semibold text-black text-sm md:text-base group-hover:text-primary transition">
//                 {category.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopByCategory;

import React from "react";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import main from "../assets/main.png";

const categories = [
  { id: 1, name: "Car Battery", image: b1 },
  { id: 2, name: "Inverter Battery", image: b2 },
  { id: 3, name: "Inverters", image: b3 },
  { id: 4, name: "UPS Batteries", image: main },
  { id: 5, name: "Golf Cart Batteries", image: b1 },
  { id: 6, name: "Floor Cleaning Machine Batteries", image: b2 },
  { id: 7, name: "Deep Cycle Batteries", image: b3 },
  { id: 8, name: "Scissor Lift Batteries", image: main },
];

const ShopByCategory = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
             SHOP BY <span className="text-red-600">CATEGORY</span> 
          </h2>
          <p className="text-gray-600 mt-3">
           We have covered all categories for Lead Acid Batteries of Leading Battery Brands and Covering all most all the major Cities and Towns in India. Explore more...
          </p>
        </div>
       

        {/* Marquee Container */}
        <div className="overflow-hidden bg-white py-6">
          <div className="flex gap-10 animate-marquee">
            {categories.concat(categories).map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px] cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-14 mb-2 object-contain group-hover:scale-110 transition"
                />
                <p className="text-lg text-gray-700 text-center group-hover:text-red-600">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShopByCategory;