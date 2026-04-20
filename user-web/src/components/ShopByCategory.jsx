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
import {
  FaCar,
  FaTruck,
  FaBus,
  FaBatteryFull,
  FaChargingStation,
  FaIndustry,
  FaTools,
  FaBolt,
} from "react-icons/fa";

import {
  GiElectric,
  GiPowerGenerator,
  GiForklift,
  GiMiningHelmet,
} from "react-icons/gi";

const categories = [
  { id: 1, name: "Car Battery", icon: <FaCar /> },
  { id: 2, name: "Inverter Battery", icon: <FaBolt /> },
  { id: 3, name: "Inverters", icon: <FaChargingStation /> },
  { id: 4, name: "UPS Batteries", icon: <FaBatteryFull /> },
  { id: 5, name: "Golf Cart Batteries", icon: <FaBus /> },
  { id: 6, name: "Floor Cleaning Batteries", icon: <FaTools /> },
  { id: 7, name: "Deep Cycle Batteries", icon: <GiElectric /> },
  { id: 8, name: "Scissor Lift Batteries", icon: <GiForklift /> },
  { id: 9, name: "Truck Batteries", icon: <FaTruck /> },
  { id: 10, name: "Industrial Batteries", icon: <FaIndustry /> },
  { id: 11, name: "Generator Batteries", icon: <GiPowerGenerator /> },
  { id: 12, name: "Mining Equipment Batteries", icon: <GiMiningHelmet /> },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 bg-gray-50">

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold">
          SHOP BY <span className="text-red-600">CATEGORY</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Explore all battery categories across India
        </p>
      </div>

      {/* GRID */}
      <div className="w-full px-4">
        <div
          className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6 
          xl:grid-cols-8 
          gap-6
        "
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              {/* ICON */}
              <div className="text-5xl text-red-600 mb-3 group-hover:scale-110 transition">
                {category.icon}
              </div>

              {/* TEXT */}
              <p className="text-sm md:text-base font-semibold text-gray-800 leading-tight">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;

// import React from "react";
// import {
//   FaCar,
//   FaTruck,
//   FaBus,
//   FaBatteryFull,
//   FaChargingStation,
//   FaIndustry,
//   FaTools,
//   FaBolt,
// } from "react-icons/fa";

// import {
//   GiElectric,
//   GiPowerGenerator,
//   GiForklift,
//   GiMiningHelmet,
// } from "react-icons/gi";

// const categories = [
//   { id: 1, name: "Car Battery", icon: <FaCar /> },
//   { id: 2, name: "Inverter Battery", icon: <FaBolt /> },
//   { id: 3, name: "Inverters", icon: <FaChargingStation /> },
//   { id: 4, name: "UPS Batteries", icon: <FaBatteryFull /> },
//   { id: 5, name: "Golf Cart Batteries", icon: <FaBus /> },
//   { id: 6, name: "Floor Cleaning Batteries", icon: <FaTools /> },
//   { id: 7, name: "Deep Cycle Batteries", icon: <GiElectric /> },
//   { id: 8, name: "Scissor Lift Batteries", icon: <GiForklift /> },
//   { id: 9, name: "Truck Batteries", icon: <FaTruck /> },
//   { id: 10, name: "Industrial Batteries", icon: <FaIndustry /> },
//   { id: 11, name: "Generator Batteries", icon: <GiPowerGenerator /> },
//   { id: 12, name: "Mining Equipment Batteries", icon: <GiMiningHelmet /> },
// ];

// const ShopByCategory = () => {
//   return (
//     <section className="py-12 bg-white">

//       {/* Header */}
//       <div className="text-center mb-10 px-4">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           SHOP BY <span className="text-red-600">CATEGORY</span>
//         </h2>
//         <p className="text-gray-600 mt-3">
//           Explore all battery categories across India
//         </p>
//       </div>

//       {/* GRID (FIXED ALIGNMENT) */}
//       <div className="w-full px-4">
//         <div className="
//           grid 
//           grid-cols-3 
//           sm:grid-cols-4 
//           md:grid-cols-6 
//           lg:grid-cols-8 
//           xl:grid-cols-12 
//           gap-6 
//           text-center
//         ">
          
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className="flex flex-col items-center group cursor-pointer"
//             >
//               {/* ICON */}
//               <div className="text-3xl text-red-600 mb-2 group-hover:scale-110 transition">
//                 {category.icon}
//               </div>

//               {/* TEXT */}
//               <p className="text-xs sm:text-sm text-gray-700 group-hover:text-red-600">
//                 {category.name}
//               </p>
//             </div>
//           ))}

//         </div>
//       </div>

//     </section>
//   );
// };

// export default ShopByCategory;