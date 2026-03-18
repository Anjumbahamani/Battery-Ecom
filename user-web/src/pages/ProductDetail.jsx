// import { Star, Truck, ShieldCheck } from "lucide-react";

// const ProductDetail = () => {
//   const product = {
//     name: "Premium AGM Battery 12V 70Ah",
//     price: "₹8,999",
//     rating: 4.5,
//     images: [
//       "https://i.imgur.com/qVq7JzH.png",
//       "https://i.imgur.com/0R8FQ3f.png",
//       "https://i.imgur.com/FxZV7nN.png",
//     ],
//   };

//   return (
//     <section className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12">

//         {/* PRODUCT IMAGES */}
//         <div>
//           <div className="border rounded-xl p-6 flex justify-center">
//             <img
//               src={product.images[0]}
//               alt="battery"
//               className="h-64 object-contain"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-4 mt-4">
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="thumb"
//                 className="w-20 h-20 border rounded-lg p-2 object-contain cursor-pointer hover:border-red-500"
//               />
//             ))}
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div>

//           <h1 className="text-3xl font-bold text-black">
//             {product.name}
//           </h1>

//           {/* Rating */}
//           <div className="flex items-center gap-2 mt-3">
//             <Star className="text-yellow-500" size={18} />
//             <span className="text-gray-600">4.5 Rating</span>
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-bold text-red-600 mt-6">
//             {product.price}
//           </p>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button className="bg-red-600 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition">
//               Add to Cart
//             </button>

//             <button className="border border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition">
//               Buy Now
//             </button>
//           </div>

//           {/* Services */}
//           <div className="mt-8 space-y-4">

//             <div className="flex items-center gap-3 text-gray-700">
//               <Truck size={20} className="text-red-600" />
//               Free doorstep delivery
//             </div>

//             <div className="flex items-center gap-3 text-gray-700">
//               <ShieldCheck size={20} className="text-red-600" />
//               36 Months Warranty
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* SPECIFICATIONS */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">

//         <h2 className="text-2xl font-bold text-black mb-6">
//           Specifications
//         </h2>

//         <div className="grid md:grid-cols-2 gap-6 border rounded-xl p-6">

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Voltage</span>
//             <span className="font-semibold">12V</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Capacity</span>
//             <span className="font-semibold">70Ah</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Technology</span>
//             <span className="font-semibold">AGM</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-600">Warranty</span>
//             <span className="font-semibold">36 Months</span>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default ProductDetail;


import { useState } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";

import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetail = () => {

  const images = [b1, b2, b3];
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <>
     <Navbar/>
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TOP PRODUCT SECTION */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT IMAGE AREA */}
          <div>

            <div className="border rounded-xl p-6 flex justify-center">
              <img
                src={activeImg}
                alt="battery"
                className="h-72 object-contain"
              />
            </div>

            {/* thumbnails */}
            <div className="flex gap-4 mt-4">

              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImg(img)}
                  className={`w-20 h-20 border rounded-lg p-2 cursor-pointer object-contain
                    ${activeImg === img ? "border-red-600" : ""}`}
                />
              ))}

            </div>

          </div>


          {/* RIGHT PRODUCT INFO */}
          <div>

            <h1 className="text-3xl font-bold text-black">
              Premium AGM Battery 12V 70Ah
            </h1>
 <div className="flex items-center gap-2 mt-3">
             
             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate adipisci repellendus maiores tenetur iste vero unde consequatur doloribus quia dolorum fugiat velit quo ipsum saepe recusandae voluptas quod, repudiandae tempore?</p>
            </div>

            {/* rating */}
            <div className="flex items-center gap-2 mt-3">
              <Star size={18} className="text-yellow-500" />
              <span className="text-gray-600">4.5 Rating</span>
            </div>

            {/* price */}
            <p className="text-3xl font-bold text-red-600 mt-6">
              ₹18,999
            </p>


            {/* Exchange Option */}
            <div className="flex justify-between items-center border rounded-lg p-4 mt-6">

              <div>
                <p className="font-semibold">Old Battery Exchange</p>
                <p className="text-sm text-gray-500">
                  Get discount for old battery
                </p>
              </div>

              <input type="checkbox" />

            </div>


            {/* Installation */}
            <div className="flex justify-between items-center border rounded-lg p-4 mt-4">

              <div>
                <p className="font-semibold">Professional Installation</p>
                <p className="text-sm text-gray-500">
                  Technician will install battery
                </p>
              </div>

              <input type="checkbox" />

            </div>


            {/* price summary */}
            <div className="border rounded-xl p-5 mt-6 space-y-2">

              <div className="flex justify-between">
                <span>Battery Price</span>
                <span>₹18,999</span>
              </div>

              <div className="flex justify-between">
                <span>Exchange Discount</span>
                <span className="text-green-600">- ₹2000</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-red-600">₹16,999</span>
              </div>

            </div>


            {/* buttons */}
            <div className="flex gap-4 mt-6">

              <button className="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-lg">
                Add to Cart
              </button>

              <button className="flex-1 border border-black hover:bg-black hover:text-white py-3 rounded-lg">
                Buy Now
              </button>

            </div>

          </div>

        </div>


        {/* SPECIFICATIONS + DELIVERY */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {/* specifications */}
          <div className="border rounded-xl p-6">

            <h3 className="text-xl font-bold mb-4">
              Specifications
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Voltage</span>
                <span>12V</span>
              </div>

              <div className="flex justify-between">
                <span>Capacity</span>
                <span>70Ah</span>
              </div>

              <div className="flex justify-between">
                <span>Technology</span>
                <span>AGM</span>
              </div>

              <div className="flex justify-between">
                <span>Warranty</span>
                <span>36 Months</span>
              </div>

            </div>

          </div>


          {/* delivery */}
          <div className="border rounded-xl p-6">

            <h3 className="text-xl font-bold mb-4">
              Delivery & Service
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Truck className="text-red-600" />
                Free doorstep delivery
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-red-600" />
                3 Years Warranty
              </div>

            </div>

          </div>

        </div>


        {/* VEHICLE COMPATIBILITY */}
        <div className="border rounded-xl p-6 mt-10">

          <h3 className="text-xl font-bold mb-4">
            Vehicle Compatibility
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

            <div className="border rounded-lg p-4">
              Maruti Swift
            </div>

            <div className="border rounded-lg p-4">
              Hyundai i20
            </div>

            <div className="border rounded-lg p-4">
              Honda City
            </div>

            <div className="border rounded-lg p-4">
              Tata Nexon
            </div>

          </div>

        </div>

      </div>

    </section>
    <Footer/>
    </>
   
  );
};

export default ProductDetail;