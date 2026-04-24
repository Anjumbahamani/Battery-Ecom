// import { ShoppingCart, User } from "lucide-react";
// import logo from "../assets/logo.jpeg";
// import logo_battery from "../assets/logo_battery.jpeg";
// import {
//   Truck,
//   ShieldCheck,
//   Star,
//   BadgeCheck,
//   PackageCheck,
//   Wrench,
// } from "lucide-react";

// const Navbar = () => {
//   return (
//     <div className="bg-white border-b border-borderLight sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           {/* <h1 className="text-2xl font-bold">
//             <span className="text-primary">batteries</span>
//             <span className="text-blackMain">bazaar</span>
//           </h1> */}
//           <div className="">
//             <img src={logo_battery} alt="" className="h-20 object-contain" />
//           </div>

//           {/* Search */}
//           {/* <div className="hidden md:flex w-1/2">
//             <input
//               type="text"
//               placeholder="Search batteries, brands..."
//               className="w-full border border-borderLight rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//             />
//             <button className="bg-primary text-white px-5 rounded-r-lg hover:bg-red-700 transition">
//               Search
//             </button>
//           </div> */}
//           <div className="hidden lg:flex items-center gap-3">
//             {/* Box 1 */}
//             <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap">
//               <Wrench size={14} className="text-primary" />
//               <span>Services We Provide</span>
//             </div>

//             {/* Box 2 */}
//             <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap">
//               <PackageCheck size={14} className="text-primary" />
//               <span>
//                 Exchange any Old Battery & Get New Battery at Attractive Price
//               </span>
//             </div>

//             {/* Box 3 */}
//             <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap">
//               <ShieldCheck size={14} className="text-primary" />
//               <span>Easy EMI (3/6/9/12 Months)</span>
//             </div>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-6">
//             <a href="/profile">
//               <User className="cursor-pointer text-black hover:text-primary transition" />
//             </a>
//             <a href="/cart">
//               <ShoppingCart className="cursor-pointer text-black hover:text-primary transition" />
//             </a>
//             <a
//               href="/login"
//               className="flex items-center gap-1 hover:underline"
//             >
//               <User size={14} />
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { ShoppingCart, User, Wrench, PackageCheck, ShieldCheck, Heart } from "lucide-react";
import logo_battery from "../assets/logo_battery.jpeg";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* 🔷 Logo */}
          <div>
            <img
              src={logo_battery}
              alt="logo"
              className="h-16 object-contain hover:scale-105 transition"
            />
          </div>

          {/* 🔥 Highlight Boxes */}
          <div className="hidden lg:flex items-center gap-4">

            <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-2 rounded-lg text-xs font-semibold hover:shadow transition">
              <Wrench size={16} className="text-red-500" />
              <span>Expert Services</span>
            </div>

            <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-2 rounded-lg text-xs font-semibold hover:shadow transition">
              <PackageCheck size={16} className="text-green-600" />
              <span>Battery Exchange Offers</span>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-semibold hover:shadow transition">
              <ShieldCheck size={16} className="text-blue-500" />
              <span>Easy EMI Available</span>
            </div>

          </div>

          {/* 🧑 Icons */}
          <div className="flex items-center gap-5">

            <a href="/profile">
              <User className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" />
            </a>

            <a href="/cart">
              <ShoppingCart className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" />
            </a>
             <a href="/wishlist">
              <Heart className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" />
            </a>

            <a
              href="/login"
              className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600 transition shadow"
            >
              Login
            </a>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;