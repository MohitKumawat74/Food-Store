import React, { useState } from "react";
import "../pagescss/FoodBg.css"; // Make sure to update this CSS file with the styles below
import foodimg from '../assets/burger.png'

const FoodBg = () => {

  return (
    <div className="foodbg-container">
      {/* Content Section with Animation */}
      <div className="foodbg-content" data-aos="fade-right">
        <h1>
          Welcome to <br />
          <span className="interactive-text">The world of</span> <br />
          <strong>Testy & Fresh Food.</strong>
        </h1>
        <p className="foodbg-description">
          Keep it easy with these simple but delicious recipes — from make-ahead lunches and midweek meals to fuss-free sides.
        </p>
        
    
      </div>

      {/* Image Section */}
      <div className="foodbg-image ms-8" data-aos="fade-left">
        <img src={foodimg} alt="Delicious Food" />
      </div>
    </div>
  );
};

export default FoodBg;
