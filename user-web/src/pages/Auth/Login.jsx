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
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Login = () => {

  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mobile:", mobile);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      <div className="max-w-6xl mx-auto w-full py-16 px-6">

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT LOGIN CARD */}
          <div className="bg-white rounded-xl shadow-md p-8">

            <div className="flex justify-center mb-4">
              <img src={logo} className="h-12 object-contain"/>
            </div>

            <h2 className="text-2xl font-bold text-center">
              Welcome Back!
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Sign in to continue your shopping
            </p>

            {/* LOGIN TYPE */}
            <div className="flex border rounded-lg mb-6 overflow-hidden">

              <button className="w-1/2 py-2 bg-red-100 text-red-600 font-semibold">
                Mobile OTP
              </button>

              <button className="w-1/2 py-2 text-gray-500">
                Email
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label className="text-sm font-medium">
                Mobile Number
              </label>

              <input
                type="text"
                placeholder="+91 Enter mobile number"
                className="w-full border rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-red-500"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-black transition">
                Send OTP
              </button>

            </form>

            <p className="text-xs text-center text-gray-400 mt-4">
              By continuing you agree to our
              <span className="text-red-600"> Terms of Service </span>
              and
              <span className="text-red-600"> Privacy Policy</span>
            </p>

            <p className="text-sm text-center mt-4">
              Don't have an account?
              <Link to="/register" className="text-red-600 ml-1">
                Sign up here
              </Link>
            </p>

          </div>


          {/* RIGHT INFO SECTION */}
          <div className="space-y-6">

            {/* WHY SIGN IN */}
            <div className="bg-white rounded-xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Why Sign In?
              </h3>

              <ul className="space-y-3 text-sm">

                <li>
                  ⚡ Faster Checkout
                  <p className="text-gray-600 text-xs">
                    Save your addresses and payment methods
                  </p>
                </li>

                <li>
                  ❤️ Wishlist & Favorites
                  <p className="text-gray-600 text-xs">
                    Save products you love
                  </p>
                </li>

                <li>
                  📦 Order Tracking
                  <p className="text-gray-600 text-xs">
                    Track your orders and purchase history
                  </p>
                </li>

                <li>
                  🎁 Exclusive Offers
                  <p className="text-gray-600 text-xs">
                    Access special member discounts
                  </p>
                </li>

              </ul>

            </div>


            {/* SECURITY CARD */}
            <div className="bg-white rounded-xl shadow-md p-6">

              <h3 className="font-semibold mb-4">
                Your Security is Our Priority
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">

                <li>✔ SSL encrypted data transmission</li>
                <li>✔ Secure payment processing</li>
                <li>✔ Privacy protection guaranteed</li>
                <li>✔ OTP verification for mobile login</li>

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