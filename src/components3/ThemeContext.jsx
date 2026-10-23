import React, { createContext, useContext, useState, useEffect } from 'react';

// สร้าง Context สำหรับเก็บข้อมูลสถานะและฟังก์ชันเกี่ยวกับธีม
const ThemeContext = createContext();

// คอมโพเนนต์ ThemeProvider: ทำหน้าที่เป็นตัวกลางในการห่อหุ้มแอปพลิเคชัน เพื่อแชร์สถานะธีมให้กับคอมโพเนนต์ลูกทั้งหมดโดยไม่ต้องส่ง Props
export function ThemeProvider({ children }) {
  
  // โหลดค่าธีมเดิมจาก localStorage ของเบราว์เซอร์ ถ้าไม่มีให้ใช้ค่าเริ่มต้นเป็น 'light' (โหมดสว่าง)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hw3_theme') || 'light';
  });

  // ใช้ useEffect เพื่อบันทึกค่าธีมลง localStorage และจัดการเพิ่ม/ลบคลาสที่ body ทุกครั้งที่ state 'theme' เปลี่ยน
  useEffect(() => {
    localStorage.setItem('hw3_theme', theme); // บันทึกค่าล่าสุดเก็บไว้ เปิดเว็บมาใหม่ธีมจะได้ไม่หาย
    
    // สลับคลาส 'hw3-dark' ที่แท็ก body ของเอกสาร HTML เพื่อให้ CSS ส่วนกลางปรับเปลี่ยนตามได้
    if (theme === 'dark') {
      document.body.classList.add('hw3-dark');
    } else {
      document.body.classList.remove('hw3-dark');
    }
  }, [theme]);

  // ฟังก์ชันสำหรับสลับโหมดธีม (ถ้าปัจจุบันเป็น light ให้เปลี่ยนเป็น dark และทำสลับกัน)
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // ส่งค่า theme และฟังก์ชัน toggleTheme ผ่าน Provider ให้คอมโพเนนต์ลูกทุกตัวที่อยู่ภายในเรียกใช้งานได้
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook (useTheme): สร้างขึ้นมาเพื่อให้คอมโพเนนต์อื่นๆ ดึงข้อมูลธีมไปใช้ได้ง่ายขึ้นด้วยการเรียกใช้ useTheme() ทีเดียว
export function useTheme() {
  return useContext(ThemeContext);
}