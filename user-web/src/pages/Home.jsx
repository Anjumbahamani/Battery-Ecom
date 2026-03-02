import QuickBatteryFinder from "../components/QuickBatteryFinder";
import ShopByCategory from "../components/ShopByCategory";
import TopBrands from "../components/TopBrands";
import FeaturedProducts from "../components/FeaturedProduct";
import ComboSection from "../components/ComboSection";
import CityChecker from "../components/CityChecker";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
    <div className="">
        <Navbar/>
    </div>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden pb-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm tracking-wide">
              Trusted by 10,000+ Customers
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Power Your Ride <br />
              With Confidence
            </h1>

            <p className="text-blue-100 text-lg md:text-xl max-w-xl">
              Premium batteries with free installation, doorstep delivery,
              and hassle-free old battery exchange.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105">
                Find My Battery
              </button>

              <button className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                Explore Products
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center relative">
            <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <img
              src="https://i.imgur.com/8Km9tLL.png"
              alt="Battery"
              className="relative z-10 w-80 md:w-[420px]"
            />
          </div>

        </div>
      </section>

      {/* FILTER SECTION (Controlled Overlap) */}
      <div className="-mt-10 relative z-10 ">
        <QuickBatteryFinder />
      </div>

      {/* MAIN CONTENT FLOW */}
      <div className="space-y-20 pt-10 ">

        <ShopByCategory />

        <TopBrands />

        <FeaturedProducts />

        <ComboSection />

        <CityChecker />

      </div>

      <Footer/>
    </>
  );
};

export default Home;
