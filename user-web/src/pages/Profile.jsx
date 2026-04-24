// import Navbar from "../components/Navbar";
// import battery from "../assets/b1.jpg";
// import Footer from "../components/Footer";

// const Profile = () => {
//   return (
//     <>
//       <Navbar />

//       <div className="bg-gray-100 min-h-screen py-10">

//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* SIDEBAR */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">

//             <div className="text-center border-b pb-4">

//               <img
//                 src="https://i.pravatar.cc/100"
//                 className="w-20 h-20 rounded-full mx-auto mb-3"
//               />

//               <h3 className="font-semibold">John Smith</h3>
//               <p className="text-sm text-gray-500">
//                 john@email.com
//               </p>

//             </div>

//             <ul className="mt-6 space-y-3 text-sm">

//               <li className="cursor-pointer hover:text-red-600 font-semibold">
//                 Dashboard
//               </li>

//               <li className="cursor-pointer hover:text-red-600">
//                 My Orders
//               </li>

//               <li className="cursor-pointer hover:text-red-600">
//                 Wishlist
//               </li>

//               <li className="cursor-pointer hover:text-red-600">
//                 My Addresses
//               </li>

//               <li className="cursor-pointer hover:text-red-600">
//                 Account Settings
//               </li>

//               <li className="cursor-pointer text-gray-500">
//                 Logout
//               </li>

//             </ul>

//           </div>


//           {/* MAIN CONTENT */}
//           <div className="lg:col-span-3 space-y-8">

//             {/* DASHBOARD CARDS */}
//             <div className="grid md:grid-cols-3 gap-6">

//               <div className="bg-red-600 p-6 rounded-xl shadow-sm">

//                 <h4 className="text-lg text-white">
//                   Total Orders
//                 </h4>

//                 <p className="text-2xl text-white font-bold mt-2">
//                   12
//                 </p>

//               </div>

//               <div className="bg-white p-6 rounded-xl shadow-sm">

//                 <h4 className="text-sm text-gray-500">
//                   Pending Orders
//                 </h4>

//                 <p className="text-2xl font-bold mt-2">
//                   2
//                 </p>

//               </div>

//               <div className="bg-white p-6 rounded-xl shadow-sm">

//                 <h4 className="text-sm text-gray-500">
//                   Wishlist Items
//                 </h4>

//                 <p className="text-2xl font-bold mt-2">
//                   5
//                 </p>

//               </div>

//             </div>


//             {/* RECENT ORDERS */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">

//               <h3 className="text-lg font-semibold mb-6">
//                 Recent Orders
//               </h3>

//               <div className="space-y-4">

//                 <div className="flex items-center justify-between border rounded-lg p-4">

//                   <div className="flex items-center gap-4">

//                     <img
//                       src={battery}
//                       className="w-16 h-16 object-contain"
//                     />

//                     <div>

//                       <p className="font-semibold">
//                         Premium AGM Battery 12V
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         Order #ORD23421
//                       </p>

//                     </div>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-green-600 font-semibold">
//                       Delivered
//                     </p>

//                     <p className="font-semibold">
//                       ₹899
//                     </p>

//                   </div>

//                 </div>


//                 <div className="flex items-center justify-between border rounded-lg p-4">

//                   <div className="flex items-center gap-4">

//                     <img
//                       src={battery}
//                       className="w-16 h-16 object-contain"
//                     />

//                     <div>

//                       <p className="font-semibold">
//                         AC Delco DIN74 Battery
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         Order #ORD23420
//                       </p>

//                     </div>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-orange-500 font-semibold">
//                       In Transit
//                     </p>

//                     <p className="font-semibold">
//                       ₹749
//                     </p>

//                   </div>

//                 </div>

//               </div>

//             </div>


//             {/* ADDRESS */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">

//               <h3 className="text-lg font-semibold mb-4">
//                 Default Address
//               </h3>

//               <div className="border rounded-lg p-4">

//                 <p className="font-semibold">
//                   John Smith
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   221B Baker Street <br/>
//                   London <br/>
//                   United Kingdom
//                 </p>

//                 <p className="text-sm mt-2">
//                   Phone: +91 9876543210
//                 </p>

//               </div>

//             </div>


//             {/* WISHLIST */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">

//               <h3 className="text-lg font-semibold mb-6">
//                 Wishlist
//               </h3>

//               <div className="grid md:grid-cols-3 gap-6">

//                 <div className="border rounded-lg p-4 text-center">

//                   <img
//                     src={battery}
//                     className="h-32 mx-auto"
//                   />

//                   <h4 className="font-semibold mt-3">
//                     Premium Battery
//                   </h4>

//                   <p className="text-red-600 font-semibold">
//                     ₹899
//                   </p>

//                   <button className="bg-red-600 text-white w-full py-2 rounded-lg mt-3">
//                     Add to Cart
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default Profile;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getUserProfile,
  updateUserProfile,
  getAddresses,
  createAddress,
  deleteAddress,
  getOrders,
  BASE_URL
} from "../context/authApi";

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newAddress, setNewAddress] = useState({
    address_type: "SHIPPING",
    line1: "",
    city: "",
    state: "",
    zipcode: "",
    is_default: false
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setEditForm({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.results || data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data.results || data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(profile.id, editForm);
      alert("Profile updated successfully!");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      alert("Failed to update profile!");
    }
  };

  const handleAddAddress = async () => {
    try {
      await createAddress(newAddress);
      alert("Address added!");
      setShowAddressForm(false);
      fetchAddresses();
    } catch (err) {
      alert("Failed to add address!");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) {
      alert("Failed to delete address!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pendingOrders = orders.filter(o => o.status === "PENDING").length;

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
              <h3 className="font-semibold">{profile?.first_name} {profile?.last_name}</h3>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li onClick={() => setActiveTab("dashboard")} className={`cursor-pointer hover:text-red-600 ${activeTab === "dashboard" ? "text-red-600 font-semibold" : ""}`}>Dashboard</li>
              <li onClick={() => setActiveTab("orders")} className={`cursor-pointer hover:text-red-600 ${activeTab === "orders" ? "text-red-600 font-semibold" : ""}`}>My Orders</li>
              <li onClick={() => setActiveTab("addresses")} className={`cursor-pointer hover:text-red-600 ${activeTab === "addresses" ? "text-red-600 font-semibold" : ""}`}>My Addresses</li>
              <li onClick={() => setActiveTab("settings")} className={`cursor-pointer hover:text-red-600 ${activeTab === "settings" ? "text-red-600 font-semibold" : ""}`}>Account Settings</li>
              <li onClick={handleLogout} className="cursor-pointer text-gray-500 hover:text-red-600">Logout</li>
            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-8">

            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-red-600 p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg text-white">Total Orders</h4>
                    <p className="text-2xl text-white font-bold mt-2">{orders.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-sm text-gray-500">Pending Orders</h4>
                    <p className="text-2xl font-bold mt-2">{pendingOrders}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-sm text-gray-500">Addresses</h4>
                    <p className="text-2xl font-bold mt-2">{addresses.length}</p>
                  </div>
                </div>

                {/* RECENT ORDERS */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    {orders.length === 0 && <p className="text-gray-500">No orders yet!</p>}
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <img src={PLACEHOLDER} className="w-16 h-16 object-contain" />
                          <div>
                            <p className="font-semibold">
                              {order.items?.[0]?.product_detail?.name || "Battery Order"}
                            </p>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${order.status === "DELIVERED" ? "text-green-600" : "text-orange-500"}`}>
                            {order.status}
                          </p>
                          <p className="font-semibold">₹{order.subtotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-6">My Orders</h3>
                <div className="space-y-4">
                  {orders.length === 0 && <p className="text-gray-500">No orders yet!</p>}
                  {orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <img src={PLACEHOLDER} className="w-16 h-16 object-contain" />
                        <div>
                          <p className="font-semibold">
                            {order.items?.[0]?.product_detail?.name || "Battery Order"}
                          </p>
                          <p className="text-sm text-gray-500">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">Delivery: {order.delivery_date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${order.status === "DELIVERED" ? "text-green-600" : "text-orange-500"}`}>
                          {order.status}
                        </p>
                        <p className="font-semibold">₹{order.subtotal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">My Addresses</h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="text-blue-600 text-sm"
                  >
                    + Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="border rounded-lg p-4 mb-4 space-y-3">
                    <select
                      value={newAddress.address_type}
                      onChange={(e) => setNewAddress({...newAddress, address_type: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="SHIPPING">Shipping</option>
                      <option value="BILLING">Billing</option>
                    </select>
                    <input placeholder="Address Line 1" value={newAddress.line1} onChange={(e) => setNewAddress({...newAddress, line1: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <input placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <input placeholder="Zipcode" value={newAddress.zipcode} onChange={(e) => setNewAddress({...newAddress, zipcode: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={newAddress.is_default} onChange={(e) => setNewAddress({...newAddress, is_default: e.target.checked})} />
                      Set as default
                    </label>
                    <button onClick={handleAddAddress} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Save Address</button>
                  </div>
                )}

                <div className="space-y-3">
                  {addresses.length === 0 && <p className="text-gray-500">No addresses saved!</p>}
                  {addresses.map(addr => (
                    <div key={addr.id} className="border rounded-lg p-4 flex justify-between">
                      <div>
                        <p className="font-semibold text-sm">{addr.address_type}</p>
                        <p className="text-sm text-gray-600">{addr.line1}, {addr.city}, {addr.state} - {addr.zipcode}</p>
                        {addr.is_default && <span className="text-xs text-green-600">Default</span>}
                      </div>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-600 text-sm">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                  <button onClick={() => setEditMode(!editMode)} className="text-blue-600 text-sm">
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      value={editForm.first_name || ""}
                      onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                      disabled={!editMode}
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      value={editForm.last_name || ""}
                      onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                      disabled={!editMode}
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      value={editForm.phone_number || ""}
                      onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                      disabled={!editMode}
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      value={profile?.email || ""}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm disabled:bg-gray-50"
                    />
                  </div>

                  {editMode && (
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;