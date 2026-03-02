const products = [
  {
    id: 1,
    name: "Exide EGO 550Ah",
    price: "₹4,899",
    image: "https://i.imgur.com/qVq7JzH.png",
  },
  {
    id: 2,
    name: "Amaron CRBAT 7",
    price: "₹12,999",
    image: "https://i.imgur.com/0R8FQ3f.png",
  },
  {
    id: 3,
    name: "Hero MotoCorp Battery",
    price: "₹1,899",
    image: "https://i.imgur.com/FxZV7nN.png",
  },
  {
    id: 4,
    name: "Luminous Solar 120Ah",
    price: "₹6,999",
    image: "https://i.imgur.com/oYiTqum.png",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold">
            Featured Products
          </h3>
          <button className="text-blue-600 font-semibold">
            View All →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 mx-auto object-contain"
              />

              <h4 className="mt-4 font-semibold text-gray-800">
                {product.name}
              </h4>

              <p className="mt-2 text-lg font-bold text-blue-600">
                {product.price}
              </p>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
