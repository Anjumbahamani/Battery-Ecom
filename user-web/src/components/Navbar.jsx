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
import { useState } from "react";
import { ShoppingCart, User, Wrench, PackageCheck, ShieldCheck, Heart, Menu, X } from "lucide-react";
import logo_battery from "../assets/logo_battery.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* 🔷 Logo */}
          <div>
            <Link to="/">
            <img
              src={logo_battery}
              alt="logo"
              className="h-12 sm:h-16 object-contain hover:scale-105 transition"
            />
            </Link>
          </div>

          {/* 🔥 Highlight Boxes — desktop only */}
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

          {/* 🧑 Icons + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">

            <a href="/profile">
              <User className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" size={20} />
            </a>

            <a href="/cart">
              <ShoppingCart className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" size={20} />
            </a>

            <a href="/wishlist">
              <Heart className="cursor-pointer text-gray-700 hover:text-red-500 hover:scale-110 transition" size={20} />
            </a>

            <a
              href="/login"
              className="bg-red-500 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold hover:bg-red-600 transition shadow whitespace-nowrap"
            >
              Login
            </a>

            {/* Hamburger — visible below md */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-red-500 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-1">

          {/* Nav Links */}
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Service Area", href: "/service" },
            { label: "Products", href: "/product" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              {link.label}
            </a>
          ))}

          {/* Sell Now */}
          <a
            href="/sell"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 bg-yellow-400 text-black px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition text-center shadow"
          >
            🏪 Sell Now
          </a>

          {/* Feature badges on mobile */}
          <div className="pt-3 mt-3 border-t grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1 bg-red-50 border border-red-100 px-2 py-2 rounded-lg text-xs font-semibold text-center">
              <Wrench size={15} className="text-red-500" />
              <span>Expert Services</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-green-50 border border-green-100 px-2 py-2 rounded-lg text-xs font-semibold text-center">
              <PackageCheck size={15} className="text-green-600" />
              <span>Exchange Offers</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-blue-50 border border-blue-100 px-2 py-2 rounded-lg text-xs font-semibold text-center">
              <ShieldCheck size={15} className="text-blue-500" />
              <span>Easy EMI</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;