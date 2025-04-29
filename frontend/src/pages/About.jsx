import React from 'react';
import "../pagescss/About.css"; // Make sure to add corresponding CSS styles
import resturantteam from '../assets/resturant-team.jpg'
import john from '../assets/john.jpg'
import jane from '../assets/jane.jpg'
import ravi from '../assets/ravi.jpg'


const AboutPage = () => {
  return (
    <div className="about-page-container">
      {/* Header Section */}
      <section className="about-header">
        <h1 data-aos="fade-up" className="about-heading">
          About Us
        </h1>
        <p data-aos="fade-up" className="about-subheading">
          Discover who we are and what drives us.
        </p>
      </section>

      {/* Company Introduction Section */}
      <section className="about-introduction">
        <div className="about-intro-text" data-aos="fade-right">
          <h2>Our Story</h2>
          <p>
            We are a team of passionate food lovers dedicated to bringing fresh, delicious meals straight to your door. Our mission is to make sure every meal you enjoy is prepared with the finest ingredients and utmost care. Whether you're craving comfort food or something exotic, we have a wide range of options for every taste!
          </p>
        </div>
        <div className="about-intro-image" data-aos="fade-left">
          <img src={resturantteam} alt="Restaurant Team" />
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="about-mission">
        <h2 data-aos="fade-up">Our Mission</h2>
        <p data-aos="fade-up" className="mission-text">
          Our goal is simple: To deliver fresh, tasty meals to your doorstep that bring people together. We strive to provide the best dining experience through quality ingredients, exceptional customer service, and innovative recipes that everyone can enjoy.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="about-team">
        <h2 data-aos="fade-up">Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member" data-aos="zoom-in">
            <img src={john} alt="Team Member" />
            <h3>John Doe</h3>
            <p>Chef & Co-founder</p>
          </div>
          <div className="team-member" data-aos="zoom-in" data-aos-delay="200">
            <img src={jane} alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Operations Manager</p>
          </div>
          <div className="team-member" data-aos="zoom-in" data-aos-delay="400">
            <img src={ravi} alt="Team Member" />
            <h3>Michael Johnson</h3>
            <p>Customer Support Lead</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
