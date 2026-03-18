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
    <div className="flex flex-col gap-6 w-80">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
        >
          <div className="text-red-600 text-3xl font-bold">
            <Counter target={item.value} />
          </div>
          <p className="text-gray-600 mt-2 text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;