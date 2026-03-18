import exide from "../assets/exide.png";
import amaron from "../assets/amaron.png";
import luminous from "../assets/luminous.png";
import microtek from "../assets/microtek.png";
import sfsonic from "../assets/sf-sonic.png";
import okaya from "../assets/okaya.png";

const brands = [exide, amaron, luminous, microtek,sfsonic,okaya];

const TopBrands = () => {
  return (
    <section className="py-16 bg-white overflow-hidden mb-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Top <span className="text-red-600">Brands</span> We Offer
          </h2>
          <p className="text-gray-600 mt-3">
            Trusted brands for long-lasting performance.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-12">

            {/* Duplicate for infinite effect */}
            {[...brands, ...brands].map((logo, index) => (
              <div
                key={index}
                className="min-w-[150px] flex items-center justify-center"
              >
                <img
  src={logo}
  alt="brand"
  className="h-12 object-contain transition duration-300"
/>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default TopBrands;