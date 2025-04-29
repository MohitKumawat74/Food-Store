import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("userData")) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [isAdmin, userData, cart]);

  const login = (user) => {
    setIsAdmin(user.role === "admin");
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user)); // ✅ Ensure user data is saved on login
  };

  const logout = () => {
    setIsAdmin(false);
    setUserData(null);
    setCart([]);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");
  };
  

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleQuantityChange = (id, change) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      );
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        userData,
        cart,
        login,
        logout,
        addToCart,
        removeFromCart,
        handleQuantityChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);