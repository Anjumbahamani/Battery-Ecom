import React from "react";
import audi from "../assets/audi.jpg";
import honda from "../assets/honda.jpg";
import isuzu from "../assets/isuzu.jpg";
import jaguar from "../assets/jaguar.jpg";
import hindustan from "../assets/hindustan-motors.jpg";
import hynndai from '../assets/hyundai.jpg';
import icml from '../assets/icml.jpg';
import jeep from '../assets/jeep.jpg';
import  kia from '../assets/kia.jpg';
import land from '../assets/land-rover.jpg';
import mahindra from '../assets/mahindra.jpg';
import maruti from '../assets/maruti.jpg';
import mg from '../assets/mg.jpg';
import mercedes from '../assets/mercedes.jpg';
import nissan from '../assets/nissan.jpg';
import mini from '../assets/mini.jpg';
import premier from '../assets/premier.jpg';
import porsche from '../assets/porsche.jpg';
import renault from '../assets/renault.jpg';
import skoda from '../assets/skoda.jpg';
import tata from '../assets/tata.jpg';
import volvo from '../assets/volvo.jpg';
import volkswagen from '../assets/volkswagen.jpg';

const brands = [
  { name: "audi", logo: audi },
  { name: "hindustan", logo: hindustan },
  { name: "isuzu", logo: isuzu },
  { name: "jaguar", logo: jaguar },
  { name: "honda", logo: honda },
  { name: "hynndai", logo: hynndai },
  { name: "icml", logo: icml },
  { name: "jeep", logo: jeep },
  { name: "kia", logo: kia },
  { name: "land", logo: land },
  { name: "mahindra", logo: mahindra },
  { name: "maruti", logo: maruti },
  { name: "mg", logo: mg },
  { name: "mercedes", logo: mercedes },
  { name: "nissan", logo: nissan },
  { name: "mini", logo: mini },
  { name: "premier", logo: premier },
  { name: "porsche", logo: porsche },
  { name: "renault", logo: renault },
  { name: "skoda", logo: skoda },
  { name: "tata", logo: tata },
  { name: "volvo", logo: volvo },
  { name: "volkswagen", logo: volkswagen },


];

const CarBatteryByMake = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
     <div className="w-full px-6 py-5">

        {/* Header */}
        <h2 className="text-2xl text-center md:text-3xl font-bold text-black mb-6 border-b pb-3">
          SHOP FOR CAR <span className="text-red-500"> BATTERIES </span> BY MAKE
        </h2>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">

            {/* Duplicate for infinite loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px]  hover:grayscale-0 transition duration-500 cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-28 object-contain"
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default CarBatteryByMake;