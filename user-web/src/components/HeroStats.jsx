import { useEffect, useState } from "react";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
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

  return <span>{count}+</span>;
};

const stats = [
  { value: 940, label: "Engineers & Workers" },
  { value: 620, label: "Dealers In India" },
  { value: 15250, label: "Online Orders" },
];

const HeroStats = () => {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="w-full px-4 md:px-10">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          
          {stats.map((item, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="text-red-600 text-3xl md:text-4xl font-bold">
                <Counter target={item.value} />
              </div>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HeroStats;