import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../pagescss/Landing.css";
import toast from "react-hot-toast";
import FoodBg from "./FoodBg";
import { log } from "console";

const Landing = () => {
  const { addToCart, userData } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.Base_url}/api/landing`);
        console.log(response);
        
        setFoodItems(response.data?.apiData);
        setFilteredItems(response.data?.apiData);
      } catch (error) {
        setError("Failed to fetch food items");
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterItems(category, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterItems(selectedCategory, query);
  };

  const filterItems = (category, query) => {
    let filtered = foodItems.filter((item) =>
      item.fName.toLowerCase().includes(query)
    );

    if (category !== "All") {
      filtered = filtered.filter((item) => item.fCategory === category);
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = (food) => {
    if (!userData) {
      navigate("/login");
    } else {
      addToCart(food);
      toast.success(`${food.fName} is added to cart successfully 👍`);
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 mt-15">
      {/* Background Section for non-logged-in users only */}
      {!userData && (
        <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
          <video
            src="foodbgvideo.mp4"
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-slideUp">
              Instant Food Store 🍔
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl animate-slideUp">
              Satisfy your cravings with just a click — Fresh meals delivered instantly!
            </p>
            <div className="mt-6 flex gap-4 animate-slideUp">
              <button
                onClick={() => navigate("/register")}
                className="bg-red-600 hover:bg-red-700 px-10 py-2 rounded-full font-semibold shadow-lg transition-all"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <FoodBg />

        {/* Title and Toggle */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 animate-slideUp mb-2 md:mb-0">
            Explore Our Menu
          </h2>
          <button
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="md:hidden px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md shadow font-medium transition"
          >
            {filtersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filters Section */}
        {(filtersOpen || window.innerWidth >= 768) && (
          <div
            className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center mb-6 animate-slideUp"
          >
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border-2 border-gray-300 bg-white px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-red-400 w-full md:w-auto"
            >
              <option value="All">All Categories</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Desserts">Desserts</option>
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by food name..."
              className="w-full md:w-72 px-4 py-2 border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center font-semibold text-lg">{error}</p>
        )}

        {/* Food Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredItems.map((food) => (
              <div
                key={food._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 relative"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={`https://food-store-backend-jm6i.onrender.com/upload/${food.fImage}`}
                    alt={food.fName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                    {food.fCategory}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{food.fName}</h3>
                  <p className="text-gray-600 text-sm mb-3">{food.fDescription}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-xl font-bold text-green-600">₹{food.fPrice}</p>
                    <button
                      onClick={() => handleAddToCart(food)}
                      className="bg-red-500 hover:bg-red-600 text-white ms-2.5 py-2 px-4 rounded-full font-semibold shadow transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="flex justify-center items-center min-h-[40vh]">
              <p className="text-gray-700 text-2xl font-bold">No delicious items available!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Landing;
