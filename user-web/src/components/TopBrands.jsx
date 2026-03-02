const brands = [
  "Exide",
  "Amaron",
  "Luminous",
  "Microtek",
  "Tata Green",
  "SF Sonic",
];

const TopBrands = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Top <span className="text-primary">Brands</span> We Offer
          </h2>
          <p className="text-gray-600 mt-3">
            Trusted brands for long-lasting performance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white border border-borderLight rounded-xl p-6 text-center font-semibold text-black hover:border-primary hover:shadow-md hover:text-primary transition duration-300 cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopBrands;
