import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";
import "../pagescss/Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, isAdmin, logout, cart } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold">
          Food Store
        </Link>

        {/* Toggle Button */}
        <button className="lg:hidden text-2xl" onClick={toggleNav}>
          {isNavOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8 text-lg">
          {!userData ? (
            <>
              <Link className="hover:text-red-600 hover:underline" to="/">Home</Link>
              <Link className="hover:text-red-600 hover:underline" to="/login">Login</Link>
              <Link to="/cart" className="relative hover:text-red-600 hover:underline flex items-center">
                <ShoppingCart size={26} className="mr-1" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-semibold capitalize">
                Welcome, {userData.username}
              </span>
              <Link className="hover:text-red-600 hover:underline" to="/">Home</Link>
              <Link to="/cart" className="relative hover:text-red-600 hover:underline flex items-center">
                <ShoppingCart size={26} className="mr-1" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link className="hover:text-red-600 hover:underline" to="/about">About</Link>
              <Link className="hover:text-red-600 hover:underline" to="/contact">Contact</Link>
              {isAdmin && (
                <Link className="hover:text-red-600 hover:underline" to="/admindashb">Admin Dashboard</Link>
              )}
              <Link onClick={handleLogout} className="hover:text-red-600 hover:underline" to="/">Logout</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav - Vertical dropdown just below toggle */}
      {isNavOpen && (
        <div className="flex flex-col space-y-3 bg-yellow-100 py-4 px-6 text-lg lg:hidden">
          {!userData ? (
            <>
              <Link className="hover:text-red-600 hover:underline" to="/">Home</Link>
              <Link className="hover:text-red-600 hover:underline" to="/login">Login</Link>
              <Link to="/cart" className="relative hover:text-red-600 hover:underline flex items-center">
                <ShoppingCart size={26} className="mr-1" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-semibold capitalize">
                Welcome, {userData.username}
              </span>
              <Link className="hover:text-red-600 hover:underline" to="/">Home</Link>
              <Link to="/cart" className="relative hover:text-red-600 hover:underline flex items-center">
                <ShoppingCart size={26} className="mr-1" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link className="hover:text-red-600 hover:underline" to="/about">About</Link>
              <Link className="hover:text-red-600 hover:underline" to="/contact">Contact</Link>
              {isAdmin && (
                <Link className="hover:text-red-600 hover:underline" to="/admindashb">Admin Dashboard</Link>
              )}
              <Link onClick={handleLogout} className="hover:text-red-600 hover:underline" to="/">Logout</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
