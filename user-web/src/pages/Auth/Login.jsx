// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.jpeg";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       email,
//       password,
//     };

//     console.log("Login Data:", data);

//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

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
//           Customer Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-black transition"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-sm text-center mt-4">
//           Don't have an account?
//           <Link to="/register" className="text-red-600 ml-1">
//             Register
//           </Link>
//         </p>

//       </div>

//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { loginUser, BASE_URL } from "../../context/authApi";
import TopBar from "../../components/TopBar";
import PopupModal from "../../components/PopupModal";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });

  // Forgot password state
  const [forgotStep, setForgotStep] = useState(null); // null | "phone" | "otp" | "newpass"
  const [fpPhone, setFpPhone] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [fpLoading, setFpLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form);
      setPopup({ show: true, type: "success", message: "Login Successful! Welcome back." });
    } catch (err) {
      setPopup({ show: true, type: "error", message: err.message || "Login failed. Please try again." });
    }
  };

  const handlePopupClose = () => {
    if (popup.type === "success") navigate("/");
    setPopup({ show: false, type: "success", message: "" });
  };

  // Forgot Password Step 1 — Request OTP
  const handleFpRequestOtp = async () => {
    if (!fpPhone.trim()) return;
    setFpLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/otp/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: fpPhone, purpose: "PASSWORD_RESET" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.detail || "Failed to send OTP");
      }
      setForgotStep("otp");
    } catch (err) {
      setPopup({ show: true, type: "error", message: err.message });
    } finally {
      setFpLoading(false);
    }
  };

  // Forgot Password Step 2 — Verify OTP + New Password
  const handleFpReset = async () => {
    if (!fpOtp.trim() || !fpNewPass.trim()) return;
    setFpLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/users/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: fpPhone,
          otp_code: fpOtp,
          new_password: fpNewPass,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.detail || err?.otp_code?.[0] || "Failed to reset password");
      }
      setForgotStep(null);
      setFpPhone(""); setFpOtp(""); setFpNewPass("");
      setPopup({ show: true, type: "success", message: "Password reset successful! Please login with your new password." });
    } catch (err) {
      setPopup({ show: true, type: "error", message: err.message });
    } finally {
      setFpLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      {popup.show && (
        <PopupModal type={popup.type} message={popup.message} onClose={handlePopupClose} />
      )}

      {/* FORGOT PASSWORD MODAL */}
      {forgotStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">

            <div className="flex justify-center mb-4">
              <img src={logo} alt="logo" className="h-10 object-contain" />
            </div>

            <h3 className="text-xl font-bold text-center mb-1">Forgot Password</h3>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${forgotStep !== "phone" ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
                {forgotStep !== "phone" ? "✓" : "1"}
              </div>
              <div className="w-8 h-0.5 bg-gray-300" />
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${forgotStep === "otp" ? "bg-red-600 text-white" : forgotStep === "newpass" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                {forgotStep === "newpass" ? "✓" : "2"}
              </div>
              <div className="w-8 h-0.5 bg-gray-300" />
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${forgotStep === "newpass" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                3
              </div>
            </div>

            {/* Step 1 — Enter Phone */}
            {forgotStep === "phone" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center">Enter your registered phone number</p>
                <input type="tel" placeholder="+919876543210" value={fpPhone}
                  onChange={(e) => setFpPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
                <button onClick={handleFpRequestOtp} disabled={fpLoading}
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold text-sm">
                  {fpLoading ? "Sending OTP..." : "Send OTP →"}
                </button>
              </div>
            )}

            {/* Step 2 — Enter OTP + New Password */}
            {forgotStep === "otp" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700 text-center">
                  OTP sent to <strong>{fpPhone}</strong>
                </div>
                <div>
                  <label className="text-sm font-medium">OTP</label>
                  <input type="text" placeholder="Enter OTP" value={fpOtp}
                    onChange={(e) => setFpOtp(e.target.value)} maxLength={6}
                    className="w-full border rounded-lg px-4 py-2 mt-1 text-center text-xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-red-400" />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <input type="password" placeholder="Enter new password" value={fpNewPass}
                    onChange={(e) => setFpNewPass(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
                </div>
                <button onClick={handleFpReset} disabled={fpLoading}
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold text-sm">
                  {fpLoading ? "Resetting..." : "Reset Password"}
                </button>
                <button onClick={handleFpRequestOtp} disabled={fpLoading}
                  className="w-full text-xs text-gray-500 hover:text-red-600 underline">
                  Resend OTP
                </button>
              </div>
            )}

            <button onClick={() => { setForgotStep(null); setFpPhone(""); setFpOtp(""); setFpNewPass(""); }}
              className="w-full mt-3 text-sm text-gray-400 hover:text-red-600 underline">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="max-w-6xl mx-auto w-full py-16 px-6">
          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT LOGIN CARD */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-center mb-6">
                <img src={logo} className="h-24 object-contain" alt="Logo" />
              </div>
              <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
              <p className="text-center text-gray-500 mt-1 mb-8">Sign in to continue your shopping</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" placeholder="Enter your email"
                    className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onChange={handleChange} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input type="password" name="password" placeholder="Enter your password"
                    className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onChange={handleChange} required />
                  {/* Forgot Password link */}
                  <div className="text-right mt-1">
                    <button type="button" onClick={() => setForgotStep("phone")}
                      className="text-xs text-red-600 hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <button type="submit"
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold">
                  Login
                </button>
              </form>

              <p className="text-xs text-center text-gray-400 mt-5">
                By continuing you agree to our{" "}
                <span className="text-red-600">Terms of Service</span> and{" "}
                <span className="text-red-600">Privacy Policy</span>
              </p>
              <p className="text-sm text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-600 font-medium">Sign up here</Link>
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Why Sign In?</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>⚡ Faster Checkout</li>
                  <li>❤️ Wishlist & Favorites</li>
                  <li>📦 Order Tracking</li>
                  <li>🎁 Exclusive Offers</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold mb-4">Your Security is Our Priority</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✔ SSL encrypted data transmission</li>
                  <li>✔ Secure payment processing</li>
                  <li>✔ Privacy protection guaranteed</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.jpeg";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// import { loginUser } from "../../context/authApi";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import TopBar from "../../components/TopBar";
// import PopupModal from "../../components/PopupModal";

// const Login = () => {
//   const navigate = useNavigate();
// const [popup, setPopup] = useState({ show: false, type: "success", message: "" });
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await loginUser(form);
//     setPopup({ show: true, type: "success", message: "Login Successful! Welcome back." });
//   } catch (err) {
//     setPopup({ show: true, type: "error", message: err.message || "Login failed. Please try again." });
//   }
// };

// const handlePopupClose = () => {
//   if (popup.type === "success") navigate("/");
//   setPopup({ show: false, type: "success", message: "" });
// };


//   return (
//     <>
//     <TopBar/>
//       <Navbar />
//      {popup.show && (
//   <PopupModal type={popup.type} message={popup.message} onClose={handlePopupClose} />
// )}
//       <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
//         <div className="max-w-6xl mx-auto w-full py-16 px-6">
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* LEFT LOGIN CARD */}
//             <div className="bg-white rounded-xl shadow-md p-8">
//               <div className="flex justify-center mb-6">
//                 <img src={logo} className="h-24 object-contain" alt="Logo" />
//               </div>

//               <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
//               <p className="text-center text-gray-500 mt-1 mb-8">
//                 Sign in to continue your shopping
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter your password"
//                     className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-black transition font-semibold"
//                 >
//                   Login
//                 </button>
//               </form>

//               <p className="text-xs text-center text-gray-400 mt-5">
//                 By continuing you agree to our{" "}
//                 <span className="text-red-600">Terms of Service</span> and{" "}
//                 <span className="text-red-600">Privacy Policy</span>
//               </p>

//               <p className="text-sm text-center mt-3">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-red-600 font-medium">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>

//             {/* RIGHT SIDE SAME (unchanged) */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-xl font-semibold mb-4">Why Sign In?</h3>
//                 <ul className="space-y-3 text-sm text-gray-600">
//                   <li>⚡ Faster Checkout</li>
//                   <li>❤️ Wishlist & Favorites</li>
//                   <li>📦 Order Tracking</li>
//                   <li>🎁 Exclusive Offers</li>
//                 </ul>
//               </div>

//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="font-semibold mb-4">
//                   Your Security is Our Priority
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>✔ SSL encrypted data transmission</li>
//                   <li>✔ Secure payment processing</li>
//                   <li>✔ Privacy protection guaranteed</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Login;
