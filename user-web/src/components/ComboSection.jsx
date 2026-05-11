import { useEffect, useState } from "react";
import comboImg from "../assets/combo.webp";
import { useNavigate } from "react-router-dom";
import { getComboProducts, BASE_URL } from "../context/authApi";

const ComboSection = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCombos = async () => {
    try {
      const data = await getComboProducts();
      setCombos(data.results || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Inverter & Battery Combos
          </h2>
          <p className="text-gray-600 mt-3">
            Save more with combo deals and free installation.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Loading combos...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {combos.map((combo) => (
              <div
                key={combo.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
              >
                <img
                  src={
                    combo.image
                      ? `${BASE_URL}${combo.image}`
                      : comboImg
                  }
                  alt={combo.name}
                  className="w-40 object-contain"
                />

                <div>
                  <h3 className="text-xl font-semibold text-black">
                   {combo.name}
                  </h3>

                  <p className="text-2xl font-bold text-red-600 mt-3">
                    ₹{combo.price}
                  </p>

                  <button
                    onClick={() => navigate(`/productdetail/combo/${combo.id}`)}
                    className="mt-4 bg-red-600 hover:bg-black text-white px-6 py-2 rounded-xl transition duration-300"
                  >
                    View Combo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComboSection;