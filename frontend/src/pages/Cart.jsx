import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import '../pagescss/Cart.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const { cart, removeFromCart, handleQuantityChange } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success(`Product removed from cart successfully`);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item._id,
            fName: item.fName,
            fPrice: item.fPrice,
            fQuantity: item.quantity,
            fImage: item.fImage,
          })),
        }),
      });

      const session = await res.json();
      if (session.error) throw new Error(session.error);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) throw new Error(error.message);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center sm:text-left">Cart & Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Cart Items */}
        <div className="space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-200"
              >
                <img
                  src={`https://food-store-backend-jm6i.onrender.com/upload/${item.fImage}`}
                  alt={item.fName}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0"
                />

                <div className="sm:ml-6 flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">{item.fName}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.fDescription}</p>
                  <p className="text-lg font-bold mt-2 text-green-600">₹{item.fPrice}</p>

                  <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-3">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleQuantityChange(item._id, -1)} className="bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300">-</button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)} className="bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300">+</button>
                    </div>
                    <button onClick={() => handleRemove(item._id)} className="text-red-600 hover:text-red-800" title="Remove">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-600 text-lg bg-white shadow-md rounded-lg p-8">
              <p>Your cart is empty.</p>
              <Link to="/" className="text-blue-500 mt-4 hover:underline">Continue Shopping</Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 sticky top-20 h-fit">
          <h3 className="text-2xl font-semibold mb-4 text-center sm:text-left">Order Summary</h3>

          <div className="flex justify-between text-base mb-2">
            <span>Total Items:</span>
            <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-2">
            <span>Total Price:</span>
            <span>₹{cart.reduce((total, item) => total + item.fPrice * item.quantity, 0)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className={`w-full mt-6 px-6 py-3 rounded-md text-lg transition ${cart.length === 0 || loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
              }`}
            disabled={cart.length === 0 || loading}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
