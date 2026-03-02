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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Top Brands We Offer
          </h2>
          <p className="text-gray-500 mt-3">
            Trusted brands for long-lasting performance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 text-center font-semibold text-gray-700 transition"
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
