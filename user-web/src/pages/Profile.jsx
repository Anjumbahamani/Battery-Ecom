

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
  getPayments,   // add this to authApi.js → GET /api/payments/
  BASE_URL
} from "../context/authApi";
import TopBar from "../components/TopBar";

const PLACEHOLDER = "https://placehold.co/100x100?text=Battery";

const statusColor = (status) => {
  const map = {
    PENDING:   "text-orange-500 bg-orange-50",
    CONFIRMED: "text-blue-600 bg-blue-50",
    DELIVERED: "text-green-600 bg-green-50",
    CANCELLED: "text-red-600 bg-red-50",
  };
  return map[status] || "text-gray-600 bg-gray-100";
};

const paymentStatusColor = (status) => {
  const map = {
    PENDING:   "text-orange-500",
    SUCCESS:   "text-green-600",
    FAILED:    "text-red-600",
    REFUNDED:  "text-blue-600",
  };
  return map[status] || "text-gray-600";
};


const Profile = () => {
  const [popup, setPopup] = useState({ show: false, type: "success", message: "", redirect: null });
  const navigate = useNavigate();
    const [profile, setProfile]= useState(null);
  const [orders, setOrders]                 = useState([]);
  const [payments, setPayments]             = useState([]);
  const [addresses, setAddresses]           = useState([]);
  const [activeTab, setActiveTab]           = useState("dashboard");
  const [editMode, setEditMode]             = useState(false);
  const [editForm, setEditForm]             = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress]         = useState({
    address_type: "SHIPPING",
    line1: "", city: "", state: "", zipcode: "", is_default: false,
  });

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    fetchAddresses();
    fetchPayments();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setEditForm({ first_name: data.first_name, last_name: data.last_name, phone_number: data.phone_number });
    } catch (err) { console.log(err); }
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.results || data);
    } catch (err) { console.log(err); }
  };

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data.results || data);
    } catch (err) { console.log(err); }
  };

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data.results || data);
    } catch (err) { console.log(err); }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(profile.id, editForm);
      // alert("Profile updated successfully!");
      setPopup({ show: true, type: "success", message: "Profile updated successfully!", redirect: null });
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      //  alert("Failed to update profile!");
      setPopup({ show: true, type: "error", message: "Failed to update profile!", redirect: null });
       }
  };

  const handleAddAddress = async () => {
    try {
      await createAddress(newAddress);
      // alert("Address added!");
      setPopup({ show: true, type: "success", message: "Address added!", redirect: null });
      setShowAddressForm(false);
      fetchAddresses();
    } catch (err) {
      //  alert("Failed to add address!");
      setPopup({ show: true, type: "error", message: "Failed to add address!", redirect: null });
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) { 
      // alert("Failed to delete address!"); 
      setPopup({ show: true, type: "error", message: "Failed to delete address!", redirect: null });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pendingOrders = orders.filter(o => o.status === "PENDING").length;
  // const totalSpent = payments
  //   .filter(p => p.status === "SUCCESS" || p.method === "COD")
  //   .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const totalSpent = payments
  .filter(p => p.status === "SUCCESS")
  .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders",    label: "My Orders" },
    { id: "payments",  label: "Payment History" },
    { id: "addresses", label: "My Addresses" },
    { id: "settings",  label: "Account Settings" },
  ];

  return (
    <>
    <TopBar/>
    {popup.show && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
      <div className="text-5xl mb-4">
        {popup.type === "success" ? "✅" : popup.type === "warning" ? "⚠️" : "❌"}
      </div>
      <p className="text-gray-800 font-medium text-sm leading-relaxed">{popup.message}</p>
      <button
        onClick={() => {
          if (popup.redirect) navigate(popup.redirect);
          setPopup({ show: false, type: "success", message: "", redirect: null });
        }}
        className="mt-6 w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg font-semibold transition"
      >
        OK
      </button>
    </div>
  </div>
)}
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6">
            <div className="text-center border-b pb-4">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-red-600">
                {profile?.first_name?.[0]?.toUpperCase() || "U"}
              </div>
              <h3 className="font-semibold">{profile?.first_name} {profile?.last_name}</h3>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {tabs.map(tab => (
                <li key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition-colors
                    ${activeTab === tab.id ? "bg-red-50 text-red-600 font-semibold" : "hover:text-red-600"}`}>
                  {tab.label}
                </li>
              ))}
              <li onClick={handleLogout}
                className="cursor-pointer px-3 py-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                Logout
              </li>
            </ul>
          </div>

          {/* MAIN */}
          <div className="lg:col-span-3 space-y-6">

            {/* DASHBOARD */}
            {activeTab === "dashboard" && (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-600 p-6 rounded-xl text-white">
                    <p className="text-sm opacity-80">Total Orders</p>
                    <p className="text-3xl font-bold mt-1">{orders.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-3xl font-bold mt-1 text-orange-500">{pendingOrders}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-3xl font-bold mt-1">₹{totalSpent.toFixed(0)}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                  {orders.length === 0
                    ? <p className="text-gray-500 text-sm">No orders yet!</p>
                    : orders.slice(0, 3).map(order => (
                      <div key={order.id} className="flex items-center justify-between border rounded-lg p-4 mb-3">
                        <div className="flex items-center gap-4">
                          <img src={PLACEHOLDER} className="w-14 h-14 object-contain" alt="order" />
                          <div>
                            <p className="font-semibold text-sm">
                              {order.product_detail?.name || order.combo_product_detail?.name || "Battery Order"}
                            </p>
                            <p className="text-xs text-gray-500">Order #{order.id} · {order.delivery_date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="font-semibold text-sm mt-1">₹{order.subtotal || order.total_price || "—"}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>

                {/* Recent Payments */}
                {payments.length > 0 && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
                    {payments.slice(0, 3).map(p => (
                      <div key={p.id} className="flex justify-between items-center border rounded-lg p-4 mb-3">
                        <div>
                          <p className="font-semibold text-sm">Order #{p.order}</p>
                          <p className="text-xs text-gray-500">{p.method} · {p.created_at?.split("T")[0]}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{parseFloat(p.amount).toFixed(2)}</p>
                          <p className={`text-xs font-semibold ${paymentStatusColor(p.status)}`}>{p.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">My Orders</h3>
                {orders.length === 0
                  ? <p className="text-gray-500 text-sm">No orders yet!</p>
                  : orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between border rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-4">
                        <img src={PLACEHOLDER} className="w-14 h-14 object-contain" alt="order" />
                        <div>
                          <p className="font-semibold text-sm">
                            {order.product_detail?.name || order.combo_product_detail?.name || "Battery Order"}
                          </p>
                          <p className="text-xs text-gray-500">Order #{order.id}</p>
                          <p className="text-xs text-gray-500">Delivery: {order.delivery_date} · {order.delivery_time}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{order.shipping_address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <p className="font-semibold text-sm mt-1">₹{order.subtotal || order.total_price || "—"}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* PAYMENT HISTORY */}
            {activeTab === "payments" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                {payments.length === 0
                  ? <p className="text-gray-500 text-sm">No payments yet!</p>
                  : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left text-gray-500">
                            <th className="pb-3 pr-4">Payment ID</th>
                            <th className="pb-3 pr-4">Order</th>
                            <th className="pb-3 pr-4">Method</th>
                            <th className="pb-3 pr-4">Amount</th>
                            <th className="pb-3 pr-4">Date</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map(p => (
                            <tr key={p.id} className="border-b last:border-0">
                              <td className="py-3 pr-4 text-gray-500">#{p.id}</td>
                              <td className="py-3 pr-4 font-medium">#{p.order}</td>
                              <td className="py-3 pr-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                  ${p.method === "ONLINE" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                                  {p.method === "ONLINE" ? "💳 Online" : "💵 COD"}
                                </span>
                              </td>
                              <td className="py-3 pr-4 font-bold">₹{parseFloat(p.amount).toFixed(2)}</td>
                              <td className="py-3 pr-4 text-gray-500">{p.created_at?.split("T")[0] || "—"}</td>
                              <td className="py-3">
                                <span className={`font-semibold ${paymentStatusColor(p.status)}`}>
                                  {p.status || "PENDING"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">My Addresses</h3>
                  <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-blue-600 text-sm">
                    + Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="border rounded-lg p-4 mb-4 space-y-3 bg-gray-50">
                    <select value={newAddress.address_type}
                      onChange={(e) => setNewAddress({...newAddress, address_type: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 text-sm">
                      <option value="SHIPPING">Shipping</option>
                      <option value="BILLING">Billing</option>
                    </select>
                    <input placeholder="Address Line 1" value={newAddress.line1}
                      onChange={(e) => setNewAddress({...newAddress, line1: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="City" value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 text-sm" />
                      <input placeholder="State" value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <input placeholder="Zipcode" value={newAddress.zipcode}
                      onChange={(e) => setNewAddress({...newAddress, zipcode: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={newAddress.is_default}
                        onChange={(e) => setNewAddress({...newAddress, is_default: e.target.checked})} />
                      Set as default
                    </label>
                    <div className="flex gap-2">
                      <button onClick={handleAddAddress} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Save Address</button>
                      <button onClick={() => setShowAddressForm(false)} className="border px-4 py-2 rounded-lg text-sm text-gray-600">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {addresses.length === 0
                    ? <p className="text-gray-500 text-sm">No addresses saved!</p>
                    : addresses.map(addr => (
                      <div key={addr.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded">{addr.address_type}</span>
                            {addr.is_default && <span className="text-xs text-green-600 font-medium">✓ Default</span>}
                          </div>
                          <p className="text-sm text-gray-700">{addr.line1}, {addr.city}, {addr.state} – {addr.zipcode}</p>
                        </div>
                        <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 text-sm hover:text-red-700 ml-4">Delete</button>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === "settings" && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                  <button onClick={() => setEditMode(!editMode)} className="text-blue-600 text-sm">
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
                <div className="space-y-4 max-w-md">
                  {[
                    { label: "First Name", key: "first_name" },
                    { label: "Last Name",  key: "last_name" },
                    { label: "Phone",      key: "phone_number" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      <input
                        value={editForm[key] || ""}
                        onChange={(e) => setEditForm({...editForm, [key]: e.target.value})}
                        disabled={!editMode}
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm disabled:bg-gray-50"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input value={profile?.email || ""} disabled
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm bg-gray-50 text-gray-500" />
                  </div>
                  {editMode && (
                    <button onClick={handleUpdateProfile}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">
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
