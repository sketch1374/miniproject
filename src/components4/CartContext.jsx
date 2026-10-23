import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  
  // 1. โหลดข้อมูลตะกร้าเดิมจาก localStorage ตอนเริ่มต้น
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mini_shop_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  // 2. บันทึกข้อมูล cart ลง localStorage ทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem('mini_shop_cart', JSON.stringify(cart));
  }, [cart]);

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า (จากหน้า Shop)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ➕ ฟังก์ชันเพิ่มจำนวนสินค้าทีละ 1 (ใช้ในหน้า Cart)
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ➖ ฟังก์ชันลดจำนวนสินค้าทีละ 1 (ถ้าเหลือ 1 แล้วกดลด จะลบสินค้าออก หรือให้ต่ำสุดที่ 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // กรองตัวที่จำนวน <= 0 ออก (ถ้าต้องการให้ลบอัตโนมัติเมื่อหมด)
    );
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้าทั้งหมดทันที (ปุ่มลบรายการนั้นออกเลย)
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * 35 * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart, 
        totalItems, 
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}