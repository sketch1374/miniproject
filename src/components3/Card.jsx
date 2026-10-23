import React from 'react';
import { useTheme } from './ThemeContext'; // นำเข้า Custom Hook (useTheme) สำหรับดึงข้อมูลธีมปัจจุบันจาก Context

// คอมโพเนนต์ Card (ใช้ Composition Pattern): ทำหน้าที่เป็นโครงสร้างกล่องการ์ดกลาง รองรับ title และ children
function Card({ title, children }) {
  
  // ดึงค่า 'theme' ('light' หรือ 'dark') มาจาก ThemeContext โดยไม่ต้องผ่าน Props Drilling
  const { theme } = useTheme();

  return (
    // กล่อง Card: กำหนด Class ตามธีมปัจจุบัน (เช่น hw3-card light หรือ hw3-card dark) เพื่อเปลี่ยนสีพื้นหลังและตัวหนังสืออัตโนมัติ
    <div className={`hw3-card ${theme}`}>
      
      {/* เงื่อนไข: ถ้ามีการส่ง prop title เข้ามา ถึงจะแสดงหัวข้อการ์ด */}
      {title && <h3 className="hw3-card-title">{title}</h3>}
      
      {/* ส่วนแสดงเนื้อหาข้างใน (Children): รองรับการรับคอมโพเนนต์หรือ HTML ใดๆ มาแสดงผลต่อยอดได้อิสระ */}
      <div className="hw3-card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;