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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between py-2">

        {/* 📞 Left */}
        <div className="flex items-center gap-2 font-medium">
          <Phone size={16} className="animate-pulse" />
          <span>
            Want to Order or Have any Query? Call{" "}
            <strong className="text-yellow-300">
              +91 9483808080 / 9731140727
            </strong>
          </span>
        </div>

        {/* 👉 Right Links */}
        <div className="flex items-center gap-6 font-medium">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/about" className="hover:text-yellow-300 transition">About</a>
          <a href="/service" className="hover:text-yellow-300 transition">Service Area</a>
          <a href="/product" className="hover:text-yellow-300 transition">Products</a>

          <a
            href="/sell"
            className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-300 transition shadow"
          >
            🏪 Sell Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;