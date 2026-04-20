// import exide from "../assets/exide.png";
// import amaron from "../assets/amaron.png";
// import luminous from "../assets/luminous.png";
// import microtek from "../assets/microtek.png";
// import sfsonic from "../assets/sf-sonic.png";
// import okaya from "../assets/okaya.png";

// const brands = [exide, amaron, luminous, microtek,sfsonic,okaya];

// const TopBrands = () => {
//   return (
//     <section className="py-16 bg-white mb-5">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-black">
//             Top <span className="text-red-600">Brands</span> We Offer
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Trusted brands for long-lasting performance.
//           </p>
//         </div>

//         {/* Slider */}
//         <div className="relative w-full">
//           <div className="flex  gap-12">

//             {/* Duplicate for infinite effect */}
//             {[...brands, ...brands].map((logo, index) => (
//               <div
//                 key={index}
//                 className="min-w-[160px] flex items-center justify-center"
//               >
//                 <img
//   src={logo}
//   alt="brand"
//   className="h-14 object-contain"
// />
//               </div>
//             ))}

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default TopBrands;

import exide from "../assets/exide.png";
import amaron from "../assets/amaron.png";
import luminous from "../assets/luminous.png";
import microtek from "../assets/microtek.png";
import sfsonic from "../assets/sf-sonic.png";
import okaya from "../assets/okaya.png";

const brands = [exide, amaron, luminous, microtek, sfsonic, okaya];

const TopBrands = () => {
  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Top <span className="text-red-600">Brands</span> We Offer
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Trusted brands for long-lasting performance.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6 
          gap-8 
          items-center
        ">
          {brands.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center  p-4 rounded-lg "
            >
              <img
                src={logo}
                alt="brand"
                className="h-20 object-contain"
              />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default TopBrands;