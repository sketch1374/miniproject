import React from 'react';
import { useTheme } from './ThemeContext'; // นำเข้า Custom Hook สำหรับดึงค่าและฟังก์ชันจัดการธีม
import ThemeToggle from './ThemeToggle'; // นำเข้าคอมโพเนนต์ปุ่มสลับธีม (Light/Dark Mode)
import WeatherWidget from './WeatherWidget'; // นำเข้าคอมโพเนนต์พยากรณ์อากาศ (หลัก)
import ClockWidget from './ClockWidget';   // นำเข้าคอมโพเนนต์นาฬิกาดิจิทัล (Bonus)
import QuoteWidget from './QuoteWidget';   // นำเข้าคอมโพเนนต์คำคม (Bonus)
import './WeatherStyles.css'; // นำเข้าไฟล์ CSS 

// คอมโพเนนต์หลัก HW3: หน้าจอรวม Widget ต่างๆ และใช้ ThemeProvider ห่อหุ้มเพื่อให้แชร์ธีมร่วมกันได้
function HW3() {
  
  // ดึงค่า state 'theme' ปัจจุบันมาจาก ThemeContext
  const { theme } = useTheme();
  
  return (
    // กล่องคอนเทนเนอร์หลักของหน้า HW3: เปลี่ยนสีพื้นหลังและสีตัวอักษรอัตโนมัติตามธีม (Light/Dark)
    <div className={`hw3-container ${theme}`} style={{ 
      backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa', 
      color: theme === 'dark' ? '#f8f9fa' : '#121212', 
      padding: '30px', 
      minHeight: '400px' 
    }}>
      
      {/* หัวข้อหน้าใบงานที่ 3: ปรับสีข้อความให้มองเห็นชัดเจนทั้งในโหมดมืดและสว่าง */}
      <h2 style={{ textAlign: 'center', marginBottom: '15px', color: theme === 'dark' ? '#ffffff' : '#121212' }}>
        🌤️ ใบงานที่ 3: Weather Widget & Bonus Widgets
      </h2>
      
      {/* ปุ่มกดสลับธีมประจำใบงาน (ควบคุมทุก Widget พร้อมกันโดยไม่ต้องส่ง Props ต่อกัน) */}
      <ThemeToggle />

      {/* ส่วนจัดวาง Widgets ทั้งหมด: ใช้ Flexbox จัดเรียงแนวนอน เว้นระยะห่าง และปัดบรรทัดอัตโนมัติเมื่อจอแคบ */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        <WeatherWidget /> {/* Widget หลัก: พยากรณ์อากาศ */}
        <ClockWidget />   {/* Widget เสริม: นาฬิกาดิจิทัลเลือกโซนเวลา */}
        <QuoteWidget />   {/* Widget เสเสริม: คำคมประจำวัน */}
      </div>
    </div>
  );
}

export default HW3;