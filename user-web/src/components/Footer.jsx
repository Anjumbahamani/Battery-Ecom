import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">

      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div>
            <h4 className="text-white text-2xl font-bold mb-4">
              BatteriesBazaar
            </h4>
            <p className="text-sm leading-relaxed">
              India's trusted online battery store offering automotive,
              inverter, and industrial batteries with fast delivery and
              free installation services.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h5 className="text-white font-semibold mb-4">Products</h5>
            <ul className="space-y-2 text-sm">
              <li>Car Batteries</li>
              <li>Inverter Batteries</li>
              <li>UPS Batteries</li>
              <li>Solar Batteries</li>
              <li>Generator Batteries</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>Shop By Brand</li>
              <li>Shop By Category</li>
              <li>Offers & Deals</li>
              <li>Track Order</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h5 className="text-white font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <Link to="/privacy-policy"><li>Privacy Policy</li></Link>
<Link to="/terms-conditions"><li>Terms & Conditions</li></Link>
<Link to="/return-policy"><li>Return Policy</li></Link>
              <li>Shipping Info</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h5 className="text-white font-semibold mb-4">Contact Us</h5>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-red-500" />
              +91 9483808080  /  9731140727
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                 batteriesbazaar@gmail.com
              </p>

              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                Delhi NCR, India
              </p>
            </div>
          </div>

        </div>

        {/* EXTRA INFO SECTION (like BatteryBhai) */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-400 leading-relaxed">
          <p>
            Buy car batteries, inverter batteries, and UPS systems online at the
            best prices. We offer genuine products from top brands with fast
            delivery and free installation across major cities in India.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-6 text-sm">
          © 2026 BatteriesBazaar. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;