import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">
            BatteryHub
          </h1>

          {/* Search */}
          <div className="hidden md:flex w-1/2">
            <input
              type="text"
              placeholder="Search batteries, brands..."
              className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-lg">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <User className="cursor-pointer" />
            <ShoppingCart className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
