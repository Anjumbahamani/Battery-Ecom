const combos = [
  {
    id: 1,
    name: "Luminous Inverter + 150Ah Battery",
    price: "₹18,999",
    image: "https://i.imgur.com/qVq7JzH.png",
  },
  {
    id: 2,
    name: "Microtek UPS + Battery Combo",
    price: "₹21,499",
    image: "https://i.imgur.com/oYiTqum.png",
  },
];

const ComboSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Inverter & Battery Combos
          </h2>
          <p className="text-gray-500 mt-3">
            Save more with combo deals and free installation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
            >
              <img
                src={combo.image}
                alt={combo.name}
                className="w-40 object-contain"
              />

              <div>
                <h3 className="text-xl font-semibold">
                  {combo.name}
                </h3>

                <p className="text-2xl font-bold text-blue-600 mt-3">
                  {combo.price}
                </p>

                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl">
                  View Combo
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComboSection;
