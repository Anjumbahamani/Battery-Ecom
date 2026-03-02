import QuickBatteryFinder from "../components/QuickBatteryFinder";
import ShopByCategory from "../components/ShopByCategory";
import TopBrands from "../components/TopBrands";
import FeaturedProducts from "../components/FeaturedProduct";
import ComboSection from "../components/ComboSection";
import CityChecker from "../components/CityChecker";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import main from "../assets/main.png";

const Home = () => {
  return (
    <>
      <Navbar />

     
     {/* HERO SECTION */}
<section className="bg-white text-black py-20 border-b border-borderLight">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

    <div className="space-y-6">
      <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
        Trusted by 10,000+ Customers
      </span>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="text-primary">Find the Right</span> Battery <br />
        For Your Vehicle
      </h1>

      <p className="text-gray-600 text-lg max-w-xl">
        Premium batteries with free installation and hassle-free exchange.
      </p>

      <div className="flex gap-4 pt-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
          Find Battery
        </button>

        <button className="border border-blackMain text-blackMain px-6 py-3 rounded-lg font-semibold hover:bg-blackMain hover:text-white transition">
          Book Service
        </button>
      </div>
    </div>

    <div className="flex justify-center">
      <img
        src={main}
        alt="Battery"
        className="w-80 md:w-[420px]"
      />
    </div>

  </div>
</section>

{/* QUICK BATTERY FINDER (NORMAL FLOW) */}
<section className="bg-white py-12">
  <QuickBatteryFinder />
</section>

      {/* MAIN CONTENT FLOW */}
      <div className="bg-softBg">

        <ShopByCategory />
        <TopBrands />
        <FeaturedProducts />
        <ComboSection />
        <CityChecker />

      </div>

      <Footer />
    </>
  );
};

export default Home;