import { ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <div className="bg-white border-b border-borderLight sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          {/* <h1 className="text-2xl font-bold">
            <span className="text-primary">batteries</span>
            <span className="text-blackMain">bazaar</span>
          </h1> */}
          <div className="">
            <img src={logo} alt="" className="h-16 object-contain" />
          </div>

          {/* Search */}
          <div className="hidden md:flex w-1/2">
            <input
              type="text"
              placeholder="Search batteries, brands..."
              className="w-full border border-borderLight rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button className="bg-primary text-white px-5 rounded-r-lg hover:bg-red-700 transition">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <User className="cursor-pointer text-black hover:text-primary transition" />
            <ShoppingCart className="cursor-pointer text-black hover:text-primary transition" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;