import { useEffect, useState } from "react";
import { FaUsers, FaCity, FaTools, FaSmile } from "react-icons/fa";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const stats = [
  { value: 150, label: "Cities", icon: <FaCity /> },
  { value: 765, label: "Happy Dealers", icon: <FaUsers /> },
  { value: 1552, label: "Workers Hand", icon: <FaTools /> },
  { value: 5672, label: "Happy Clients", icon: <FaSmile /> },
];

const StatsSection = () => {
  return (
    <section className="relative w-full py-16 bg-black">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(/src/assets/hero1.webp)`, // change if needed
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="border border-red-500 p-6 text-white relative group hover:bg-red-600 transition"
          >
            {/* ICON + NUMBER */}
            <div className="flex items-center gap-4">
              <div className="text-2xl">{item.icon}</div>
              <h2 className="text-3xl font-bold">
                <Counter target={item.value} />
              </h2>
            </div>

            {/* LABEL STRIP */}
            <div className="mt-4 bg-red-600 inline-block px-4 py-2 text-sm font-semibold">
              {item.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;