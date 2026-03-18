const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-8">
        
        <div>
          <h4 className="text-white text-xl font-bold mb-4">
            BatteryHub
          </h4>
          <p>
            India's leading battery marketplace with installation support.
          </p>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4">Products</h5>
          <ul className="space-y-2">
            <li>Car Batteries</li>
            <li>Inverter Batteries</li>
            <li>Solar Batteries</li>
            <li>UPS Systems</li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4">Support</h5>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>Warranty</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4">Company</h5>
          <ul className="space-y-2">
            <li>About</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-6">
        © 2026 Batterybazzar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
