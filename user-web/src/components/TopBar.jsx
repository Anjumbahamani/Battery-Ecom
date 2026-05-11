// import { ShoppingCart, User, Phone,  } from "lucide-react";

// const TopBar = () => {
//   return (
//     <div className="bg-primary text-white text-base">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between py-2">

//         {/* 📞 Left - Support */}
//         <div className="flex items-center gap-2">
//           <Phone size={14} />
//           <span>
//             Want to Order or Have any Query? Call:{" "}
//             <strong>+91 9483808080  /  9731140727</strong>
//           </span>

//         </div>
//           {/* <div className="flex items-center gap-2">
//           {/* <Email size={14} />
//           <span>
//             Email Us:{" "}
//             <strong> batteriesbazaar@gmail.com</strong>
//           </span>

//         </div> */}
        

//         {/* 👉 Right - Links */}
//         <div className="flex items-center gap-5">

//           <a href="/" className="hover:underline">Home</a>

//           {/* <a href="/contact" className="hover:underline">Contact Us</a> */}
//            <a href="/about" className="hover:underline">About Us</a>
//             <a href="/service" className="hover:underline">Service Area</a>
// <a href="/product" className="hover:underline">Products</a>

//           <a href="/sell" className="flex items-center gap-1 hover:underline">
//             🏪 Sell on BatteriesBazaar
//           </a>


//           {/* <a href="/login" className="flex items-center gap-1 hover:underline">
//             <User size={14} />
//             Login
//           </a> */}



//           {/* <a href="/cart" className="flex items-center gap-1 hover:underline">
//             <ShoppingCart size={14} />
//             Cart (0)
//           </a> */}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default TopBar;

import { Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-sm shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center justify-between py-2 gap-2">

        {/* 📞 Left */}
        <div className="flex items-center gap-2 font-medium min-w-0">
          <Phone size={16} className="animate-pulse flex-shrink-0" />
          <span className="hidden sm:inline truncate">
            Want to Order or Have any Query? Call{" "}
            <strong className="text-yellow-300">
              +91 9483808080 / 9731140727
            </strong>
          </span>
          {/* Mobile: show number only */}
          <span className="sm:hidden text-xs">
            <strong className="text-yellow-300">+91 9483808080</strong>
          </span>
        </div>

        {/* 👉 Right Links */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 font-medium flex-shrink-0">
          {/* Hide nav links on mobile, show from md up */}
          <a href="/" className="hidden md:inline hover:text-yellow-300 transition whitespace-nowrap">Home</a>
          <a href="/about" className="hidden md:inline hover:text-yellow-300 transition whitespace-nowrap">About</a>
          <a href="/about" className="hidden md:inline hover:text-yellow-300 transition whitespace-nowrap">Service Area</a>
          <a href="/product" className="hidden md:inline hover:text-yellow-300 transition whitespace-nowrap">Products</a>

          <a
            href="https://seller.batteriesbazaar.com/"
            className="bg-yellow-400 text-black px-2.5 sm:px-3 py-1 rounded-md font-semibold hover:bg-yellow-300 transition shadow whitespace-nowrap text-xs sm:text-sm"
          >
            🏪 Sell Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;