import Navbar from "../components/Navbar";
import battery from "../assets/b1.jpg";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <div className="text-center border-b pb-4">

              <img
                src="https://i.pravatar.cc/100"
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />

              <h3 className="font-semibold">John Smith</h3>
              <p className="text-sm text-gray-500">
                john@email.com
              </p>

            </div>

            <ul className="mt-6 space-y-3 text-sm">

              <li className="cursor-pointer hover:text-red-600 font-semibold">
                Dashboard
              </li>

              <li className="cursor-pointer hover:text-red-600">
                My Orders
              </li>

              <li className="cursor-pointer hover:text-red-600">
                Wishlist
              </li>

              <li className="cursor-pointer hover:text-red-600">
                My Addresses
              </li>

              <li className="cursor-pointer hover:text-red-600">
                Account Settings
              </li>

              <li className="cursor-pointer text-gray-500">
                Logout
              </li>

            </ul>

          </div>


          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-8">

            {/* DASHBOARD CARDS */}
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-red-600 p-6 rounded-xl shadow-sm">

                <h4 className="text-lg text-white">
                  Total Orders
                </h4>

                <p className="text-2xl text-white font-bold mt-2">
                  12
                </p>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <h4 className="text-sm text-gray-500">
                  Pending Orders
                </h4>

                <p className="text-2xl font-bold mt-2">
                  2
                </p>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <h4 className="text-sm text-gray-500">
                  Wishlist Items
                </h4>

                <p className="text-2xl font-bold mt-2">
                  5
                </p>

              </div>

            </div>


            {/* RECENT ORDERS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="text-lg font-semibold mb-6">
                Recent Orders
              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between border rounded-lg p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={battery}
                      className="w-16 h-16 object-contain"
                    />

                    <div>

                      <p className="font-semibold">
                        Premium AGM Battery 12V
                      </p>

                      <p className="text-sm text-gray-500">
                        Order #ORD23421
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-green-600 font-semibold">
                      Delivered
                    </p>

                    <p className="font-semibold">
                      ₹899
                    </p>

                  </div>

                </div>


                <div className="flex items-center justify-between border rounded-lg p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={battery}
                      className="w-16 h-16 object-contain"
                    />

                    <div>

                      <p className="font-semibold">
                        AC Delco DIN74 Battery
                      </p>

                      <p className="text-sm text-gray-500">
                        Order #ORD23420
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-orange-500 font-semibold">
                      In Transit
                    </p>

                    <p className="font-semibold">
                      ₹749
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ADDRESS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="text-lg font-semibold mb-4">
                Default Address
              </h3>

              <div className="border rounded-lg p-4">

                <p className="font-semibold">
                  John Smith
                </p>

                <p className="text-sm text-gray-600">
                  221B Baker Street <br/>
                  London <br/>
                  United Kingdom
                </p>

                <p className="text-sm mt-2">
                  Phone: +91 9876543210
                </p>

              </div>

            </div>


            {/* WISHLIST */}
            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="text-lg font-semibold mb-6">
                Wishlist
              </h3>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="border rounded-lg p-4 text-center">

                  <img
                    src={battery}
                    className="h-32 mx-auto"
                  />

                  <h4 className="font-semibold mt-3">
                    Premium Battery
                  </h4>

                  <p className="text-red-600 font-semibold">
                    ₹899
                  </p>

                  <button className="bg-red-600 text-white w-full py-2 rounded-lg mt-3">
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
      <Footer/>
    </>
  );
};

export default Profile;