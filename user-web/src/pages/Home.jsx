import QuickBatteryFinder from "../components/QuickBatteryFinder";
import ShopByCategory from "../components/ShopByCategory";
import TopBrands from "../components/TopBrands";
import FeaturedProducts from "../components/FeaturedProduct";
import ComboSection from "../components/ComboSection";
import CityChecker from "../components/CityChecker";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import main from "../assets/main.png";
{
  /* HERO SECTION */
}
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import hero1 from "../assets/hero1.webp";
import HeroStats from "../components/HeroStats";
import StatsSection from "../components/StatsSection";
import BrandsMarquee from "../components/BrandsMarquee";
import TopBar from "../components/TopBar";
import { Truck, ShieldCheck, Star, BadgeCheck, PackageCheck, Wrench } from "lucide-react";
import CarBatteryByMake from "../components/CarBatteryByMake";
import AboutUs from "./About";


const Home = () => {
  return (
    <>
    <TopBar/>
      <Navbar />
   <div className="border-t border-borderLight bg-red-600">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex flex-wrap justify-between gap-3">
            {/* Box 1 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <Wrench size={16} className="text-primary" />
              <span>Free Professional Installation</span>
            </div>

            {/* Box 2 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <Truck size={16} className="text-primary" />
              <span>Free Delivery</span>
            </div>

            {/* Box 3 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <ShieldCheck size={16} className="text-primary" />
              <span>100% Genuine</span>
            </div>

            {/* Box 4 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <Star size={16} className="text-primary" />
              <span>Best Prices</span>
            </div>

            {/* Box 5 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <BadgeCheck size={16} className="text-primary" />
              <span>All Leading Brands</span>
            </div>

            {/* Box 6 */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm text-sm">
              <PackageCheck size={16} className="text-primary" />
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
      <section className="relative h-[90vh] w-full">
        {/* SLIDER */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full"
        >
          {[hero1, hero1, hero1].map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[90vh] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* DARK OVERLAY */}
               <div className="absolute inset-0 bg-black/40 z-0" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CONTENT OVER SLIDER */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
                Book a Car Battery & get Free Installation
              </h1>

              <p className="text-lg text-gray-200 max-w-lg">
                Choose from a wide range of batteries with best prices.
              </p>

              <button className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Find Battery
              </button>
            </div>

            {/* RIGHT FINDER */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                {/* <QuickBatteryFinder /> */}
                {/* <HeroStats/> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BATTERY FINDER (NORMAL FLOW) */}
      <section className="bg-white">
        <QuickBatteryFinder />
      </section>

      {/* MAIN CONTENT FLOW */}
      <div className="bg-softBg">
        <ShopByCategory />
        <CarBatteryByMake />
        <TopBrands />
        <StatsSection />
        <FeaturedProducts />
        {/* <BrandsMarquee /> */}
        <AboutUs/>
        <HeroStats />
        <ComboSection />
        <CityChecker />
      </div>

      <Footer />
    </>
  );
};

export default Home;
