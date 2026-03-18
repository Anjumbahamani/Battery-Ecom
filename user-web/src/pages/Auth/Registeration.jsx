import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", form);
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="h-12 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Customer Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-red-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-black transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-red-600 ml-1">
            Login
          </Link>
        </p>

      </div>

    </div>
    <Footer/>
    </>
  
  );
};

export default Register;