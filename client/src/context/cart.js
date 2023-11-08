import React, { useState, useContext, createContext,useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  //getting cart item from localStorage
  useEffect(()=>{
    let exisitingcartItems = localStorage.getItem('cart')
    if(exisitingcartItems){
      setCart(JSON.parse(exisitingcartItems))
    }
  },[])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
