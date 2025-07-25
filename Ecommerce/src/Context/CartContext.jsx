// CartContext.jsx
import React, { useContext, createContext, useEffect, useState } from "react";
import CartService from "../Components/Data/CartService";
import { UserContext } from "./UserContext";

// Create the context
const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [count, setCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const response = await CartService.getCount();
      setCount(response.data); // Update cartCount with the fetched count
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [isLoggedIn]); // Empty dependency array to fetch count only once on mount

  return (
    <CartContext.Provider value={{ count, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
