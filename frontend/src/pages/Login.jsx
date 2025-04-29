import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

import loginImage from "../assets/login.jpg"; // Put the image inside src/assets/

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        let user = response.data.apiData;
  
        if (typeof user === "string") {
          user = { role: user };
        }
  
        if (!user.role) {
          console.error("Invalid API response:", response.data);
          toast.error("Something went wrong. Please try again.", { position: "top-center" });
          return;
        }
  
        login(user);
        toast.success("Login Successful! 🎉", { position: "top-center" });
  
        // Wait for 1 second before navigating
        setTimeout(() => {
          navigate(user.role === "admin" ? "/admindashb" : "/");
        }, 1000); // 1000ms = 1 second
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
  
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again.",
        { position: "top-center" }
      );
    }
  };
  
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={loginImage}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-90"
      />

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* Form Container */}
      <motion.div
        className="z-10 bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-2xl w-full max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username/Email */}
          <div>
            <label htmlFor="usernameOrEmail" className="block text-sm text-white mb-1">
              Username or Email
            </label>
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute top-9 right-4 text-white cursor-pointer text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-white mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="underline hover:text-blue-300">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
