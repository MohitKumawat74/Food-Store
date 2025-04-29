import React, { useState } from 'react';
import '../pagescss/Contact.css'; // Import the CSS file for styling

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  }); // State to manage form data

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/message', {  // <-- Your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true); // Show success popup
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        alert(data.error || "Failed to send message. Try again.");
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="contact-container bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="contact-overlay">

        <div className="contact-form">
          <h1 className="contact-heading">Contact Us</h1>
          <p className="contact-subheading">We'd love to hear from you! Reach out to us for any inquiries or feedback.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Pop-up for successful message submission */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Message Sent Successfully!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
