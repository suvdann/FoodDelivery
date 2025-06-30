// context/CartContext.tsx
"use client";
 
import { createContext, useContext, useEffect, useState } from "react";
 
export type CartItemType = {
  id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  addcount: number;
};
 
type CartContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartCount: number;
  updateCartCount: () => void;
};
 
const CartContext = createContext<CartContextType>({} as CartContextType);
 
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("FoodCart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
 
  const [cartCount, setCartCount] = useState<number>(0);
 
  const updateCartCount = () => {
    const total = cart.reduce((sum, item) => sum + item.addcount, 0);
    setCartCount(total);
  };
 
  useEffect(() => {
    localStorage.setItem("FoodCart", JSON.stringify(cart));
    updateCartCount();
  }, [cart]);
 
  return (
    <CartContext.Provider value={{ cart, setCart, cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
 
export const useCart = () => useContext(CartContext);