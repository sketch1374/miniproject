import React from 'react';
import { useTheme } from './ThemeContext'; // นำเข้า Custom Hook สำหรับดึงข้อมูลและฟังก์ชันสลับธีมจาก Context

// คอมโพเนนต์ ThemeToggle: ทำหน้าที่เป็นปุ่มกดสำหรับสลับโหมดระหว่าง Light Mode และ Dark Mode
function ThemeToggle() {
  
  // ดึงค่า 'theme' ปัจจุบัน และฟังก์ชัน 'toggleTheme' สำหรับสลับโหมด มาจาก ThemeContext
  const { theme, toggleTheme } = useTheme();

  return (
    // กล่องจัดตำแหน่งปุ่มให้อยู่กึ่งกลาง และเว้นระยะห่างด้านล่าง
    <div style={{ marginBottom: '30px', textAlign: 'center' }}>
      
      {/* ปุ่มกดสลับธีม: เมื่อคลิกจะเรียกฟังก์ชัน toggleTheme ทันที */}
      <button onClick={toggleTheme} className="hw3-toggle-btn">
        {/* เงื่อนไขการแสดงผลข้อความบนปุ่ม: 
          - ถ้าปัจจุบันเป็นโหมดสว่าง ('light') ให้แสดงข้อความชวนไปโหมดมืด (🌙)
          - ถ้าปัจจุบันเป็นโหมดมืด ('dark') ให้แสดงข้อความชวนกลับไปโหมดสว่าง (☀️) */}
        {theme === 'light' ? '🌙 เปลี่ยนเป็นโหมดมืด' : '☀️ เปลี่ยนเป็นโหมดสว่าง'}
      </button>
    </div>
  );
}

export default ThemeToggle;