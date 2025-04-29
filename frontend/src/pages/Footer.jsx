import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black text-center py-4">
      <p>&copy; {new Date().getFullYear()} Food Store. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
