// CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && cart.length === 0) return; // Avoid overwriting cart with empty array on initial render
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotal(cart);
  }, [cart]);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price_gbp), 0);
    setTotalPrice(total);
  };

  const addToCart = (item) => {
    // Check if item already exists in cart to avoid duplicates
    if (!cart.some(cartItem => cartItem.name === item.name)) {
      setCart([...cart, { 
        name: item.name,
        price_gbp: item.price_gbp
      }]);
    }
  };

  const removeFromCart = (itemName) => {
    console.log(itemName);
    if(cart.length===1){
      localStorage.removeItem('cart');
    }
    setCart(cart.filter(item => item.name !== itemName));
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);