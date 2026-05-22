import { useState } from "react";
import { X } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { BASE_URL } from "../context/authApi";

const LeadCaptureModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", contact_number: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact_number.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/leads/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      // Mark as submitted so it doesn't show again this session
      sessionStorage.setItem("lead_captured", "true");
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Red header */}
        <div className="bg-red-600 px-6 py-5 text-white text-center relative">
          <img src={logo} alt="logo" className="h-10 object-contain mx-auto mb-2 brightness-0 invert" />
          <h2 className="text-xl font-bold">Get Exclusive Battery Deals!</h2>
          <p className="text-red-100 text-sm mt-1">
            Enter your details to unlock best prices & free installation offers
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={form.contact_number}
                onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
                className="w-full border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-black text-white py-3 rounded-lg font-semibold transition text-sm"
            >
              {loading ? "Submitting..." : "Get Free Access →"}
            </button>

          </form>

          {/* Benefits */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
            <div className="bg-gray-50 rounded-lg p-2">🚚 Free Delivery</div>
            <div className="bg-gray-50 rounded-lg p-2">🔧 Free Install</div>
            <div className="bg-gray-50 rounded-lg p-2">💰 Best Price</div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            We respect your privacy. No spam, ever.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LeadCaptureModal;