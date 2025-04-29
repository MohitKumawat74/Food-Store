const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Allroutes = require('./routes/AllRoutes');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true,
}));
app.use(express.json());
app.use('/api', Allroutes);
app.use('/upload', express.static('public/upload'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Stripe Checkout Route
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: 'No items provided for checkout' });
    }

    const lineItems = req.body.items.map(item => {
      if (!item.id || !item.fName || typeof item.fPrice !== 'number' || typeof item.fQuantity !== 'number') {
        throw new Error('Each item must have id, name, price, and quantity');
      }
      if (item.fPrice <= 0 || item.fQuantity <= 0) {
        throw new Error('Price and quantity must be greater than 0');
      }
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.fName,
            images: [item.fImage || ''],
            metadata: {
              productId: item.id.toString()
            }
          },
          unit_amount: Math.round(item.fPrice * 100),
        },
        quantity: item.fQuantity,
      };
    });

    const totalAmount = lineItems.reduce((sum, item) => sum + (item.price_data.unit_amount * item.quantity), 0);

    if (totalAmount < 5000) {
      return res.status(400).json({ error: `Total amount must be at least ₹50. Current total: ₹${(totalAmount / 100).toFixed(2)}` });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      shipping_address_collection: { allowed_countries: ['IN', 'US'] },
      metadata: {
        userId: req.headers.authorization ? req.headers.authorization.split(' ')[1] : 'guest',
        cartItems: JSON.stringify(req.body.items.map(item => ({
          id: item.id,
          quantity: item.fQuantity,
        }))),
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
});

// Verify Payment Route
app.get('/api/verify-checkout-session', async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ success: false, error: 'Missing session ID' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session && session.payment_status === 'paid') {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
