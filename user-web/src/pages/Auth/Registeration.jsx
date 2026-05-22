// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.jpeg";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";

// const Register = () => {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Register Data:", form);
//   };

//   return (
//     <>
//     <Navbar/>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-12 object-contain"
//           />
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-6">
//           Customer Registration
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div>
//             <label className="text-sm font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Enter phone"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               onChange={handleChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-black transition"
//           >
//             Register
//           </button>

//         </form>

//         <p className="text-sm text-center mt-4">
//           Already have an account?
//           <Link to="/login" className="text-red-600 ml-1">
//             Login
//           </Link>
//         </p>

//       </div>

//     </div>
//     <Footer/>
//     </>

//   );
// };

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { registerUser } from "../../context/authApi";
import TopBar from "../../components/TopBar";
import PopupModal from "../../components/PopupModal";
import { BASE_URL } from "../../context/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("form"); // "form" | "otp"
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Step 1 — Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      setPopup({ show: true, type: "error", message: "Please enter your phone number." });
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/otp/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: form.phone, purpose: "REGISTER" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.detail || err?.phone_number?.[0] || "Failed to send OTP");
      }
      setStep("otp");
    } catch (err) {
      setPopup({ show: true, type: "error", message: err.message });
    } finally {
      setOtpLoading(false);
    }
  };

  // Step 2 — Verify OTP then Register
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setPopup({ show: true, type: "error", message: "Please enter the OTP." });
      return;
    }
    setLoading(true);
   try {
  // Verify OTP first
  const verifyRes = await fetch(`${BASE_URL}/api/otp/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone_number: form.phone, otp_code: otp, purpose: "REGISTER" }),
  });
  if (!verifyRes.ok) {
    const err = await verifyRes.json();
    throw new Error(
      err?.detail ||
      err?.otp_code?.[0] ||
      err?.phone_number?.[0] ||
      "Invalid OTP. Please try again."
    );
  }

  // OTP verified — now register
  await registerUser({
    username: form.email,
    email: form.email,
    password: form.password,
    phone_number: form.phone,
    first_name: form.name,
    last_name: "",
    role: "CUSTOMER",
    business_name: "N/A",
  });

  setPopup({ show: true, type: "success", message: "Registration Successful! Please login." });

} catch (err) {
  // Clean up any remaining JSON string errors
  let message = err.message || "Registration failed.";
  try {
    const parsed = JSON.parse(message);
    message =
      parsed?.email?.[0] ||
      parsed?.phone_number?.[0] ||
      parsed?.username?.[0] ||
      parsed?.password?.[0] ||
      parsed?.detail ||
      Object.values(parsed).flat()[0] ||
      "Registration failed.";
  } catch (_) {
    // already a plain string — use as-is
  }
  setPopup({ show: true, type: "error", message });
} finally {
  setLoading(false);
}
  };

  const handlePopupClose = () => {
    if (popup.type === "success") navigate("/login");
    setPopup({ show: false, type: "success", message: "" });
  };

  return (
    <>
      <TopBar />
      <Navbar />
      {popup.show && (
        <PopupModal type={popup.type} message={popup.message} onClose={handlePopupClose} />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-12 object-contain" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Customer Registration</h2>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
              ${step === "form" ? "bg-red-600 text-white" : "bg-green-500 text-white"}`}>
              {step === "otp" ? "✓" : "1"}
            </div>
            <div className="w-10 h-0.5 bg-gray-300" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
              ${step === "otp" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
          </div>

          {/* STEP 1 — Registration Form */}
          {step === "form" && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" name="name" placeholder="Enter name"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" name="email" placeholder="Enter email"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input type="tel" name="phone" placeholder="Enter phone (e.g. +919876543210)"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input type="password" name="password" placeholder="Enter password"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={handleChange} required />
              </div>
              <button type="submit" disabled={otpLoading}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold">
                {otpLoading ? "Sending OTP..." : "Send OTP →"}
              </button>
            </form>
          )}

          {/* STEP 2 — OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 text-center">
                OTP sent to <strong>{form.phone}</strong>
              </div>

              <div>
                <label className="text-sm font-medium">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full border rounded-lg px-4 py-2 mt-1 text-center text-xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold">
                {loading ? "Verifying & Registering..." : "Verify & Register"}
              </button>

              <button type="button" onClick={() => setStep("form")}
                className="w-full text-sm text-gray-500 hover:text-red-600 underline">
                ← Change phone number
              </button>

              {/* Resend OTP */}
              <p className="text-center text-sm text-gray-500">
                Didn't receive?{" "}
                <button type="button" onClick={handleRequestOtp}
                  className="text-red-600 font-medium hover:underline">
                  Resend OTP
                </button>
              </p>
            </form>
          )}

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 font-medium">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;



// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.jpeg";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// import { registerUser } from "../../context/authApi";
// import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/TopBar";
// import PopupModal from "../../components/PopupModal";

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [popup, setPopup] = useState({ show: false, type: "success", message: "" });


//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         username: form.email, // ← use email as username instead of name
//         email: form.email,
//         password: form.password,
//         phone_number: form.phone,
//         first_name: form.name,
//         last_name: "",
//         role: "CUSTOMER",
//         business_name: "N/A",
//       };
//        await registerUser(payload);
//       setPopup({ show: true, type: "success", message: "Registration Successful! Please login." });
//     } catch (err) {
//       setPopup({ show: true, type: "error", message: err.message || "Registration failed. Please try again." });
//     }
//   };

//   const handlePopupClose = () => {
//     if (popup.type === "success") navigate("/login");
//     setPopup({ show: false, type: "success", message: "" });
//   };

//   return (
//     <>
//       <TopBar />
//       <Navbar />
//        {/* POPUP */}
//       {popup.show && (
//         <PopupModal
//           type={popup.type}
//           message={popup.message}
//           onClose={handlePopupClose}
//         />
//       )}
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//           <div className="flex justify-center mb-4">
//             <img src={logo} alt="Logo" className="h-12 object-contain" />
//           </div>

//           <h2 className="text-3xl font-bold text-center mb-6">
//             Customer Registration
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter email"
//                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Enter phone"
//                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-black transition"
//             >
//               Register
//             </button>
//           </form>

//           <p className="text-sm text-center mt-4">
//             Already have an account?
//             <Link to="/login" className="text-red-600 ml-1">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Register;
