import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget the CSS import!

import signupImage from "../assets/sign up.jpg"; // adjust path

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/register`, formData);
      navigate('/login');
      setFormData({ username: "", email: "", password: "" });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative overflow-hidden p-4">

      {/* Side Image */}
      <div 
        className="hidden md:block w-1/2"
        data-aos="fade-right"
      >
        <img
          src={signupImage}
          alt="Sign Up"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Form Container */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center"
        data-aos="fade-left"
      >
        <div className="w-full max-w-md p-8 bg-blue-50 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="300">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6" data-aos="fade-down" data-aos-delay="500">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <input
              id="username"
              type="text"
              name="username"
              placeholder="First Name"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
              data-aos="fade-up" data-aos-delay="600"
            />

            {/* Email */}
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
              data-aos="fade-up" data-aos-delay="700"
            />

            {/* Password */}
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
              data-aos="fade-up" data-aos-delay="800"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
              data-aos="fade-up" data-aos-delay="900"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-700" data-aos="fade-up" data-aos-delay="1000">
              Already a member?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
