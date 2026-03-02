const categories = [
  {
    id: 1,
    name: "Car Batteries",
    image: "https://i.imgur.com/W5b0XjX.png",
  },
  {
    id: 2,
    name: "2-Wheeler Batteries",
    image: "https://i.imgur.com/FxZV7nN.png",
  },
  {
    id: 3,
    name: "Inverter Batteries",
    image: "https://i.imgur.com/qVq7JzH.png",
  },
  {
    id: 4,
    name: "Solar Batteries",
    image: "https://i.imgur.com/oYiTqum.png",
  },
  {
    id: 5,
    name: "UPS Systems",
    image: "https://i.imgur.com/0R8FQ3f.png",
  },
  {
    id: 6,
    name: "Stabilizers",
    image: "https://i.imgur.com/8Km9tLL.png",
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Explore our wide range of battery solutions.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white border border-borderLight rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-primary transition duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="font-semibold text-black text-sm md:text-base group-hover:text-primary transition">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
