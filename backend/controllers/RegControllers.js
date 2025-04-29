const Registration = require("../models/Registration");
const Message = require('../models/Message');

const bcrypt = require("bcrypt");

// ✅ User Registration Controller
exports.regpage = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Registration.findOne({
      $or: [{ regName: username }, { regEmail: email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Registration({
      regName: username,
      regEmail: email,
      regPassword: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.loginpage = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // ✅ 1. Admin Login
    if (
      usernameOrEmail === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        apiData: { role: "admin" },
        message: "Admin logged in successfully",
      });
    }

    // ✅ 2. Find user
    const record = await Registration.findOne({
      $or: [{ regName: usernameOrEmail }, { regEmail: usernameOrEmail }],
    });

    if (!record) {
      // 🛑 If user not found, send common message
      return res.status(400).json({ message: "Something went wrong. Please check your credentials." });
    }

    // ✅ 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, record.regPassword);

    if (!isPasswordCorrect) {
      // 🛑 If wrong password, same common message
      return res.status(400).json({ message: "Something went wrong. Please check your credentials." });
    }

    // ✅ 4. Success
    return res.status(200).json({
      apiData: {
        role: "user",
        username: record.regName,
        email: record.regEmail,
      },
      message: "Successfully logged in",
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Handle Message Submission
exports.message = async (req, res) => {
  try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
          return res.status(400).json({ error: "All fields are required." });
      }

      const newMessage = new Message({ name, email, message });
      await newMessage.save();

      res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Server error. Please try again later." });
  }
};