import React from 'react';
import ProfileCard from './ProfileCard';
import ThemeToggle from '../components3/ThemeToggle'; // นำเข้าคอมโพเนนต์ปุ่มสลับธีม (Light/Dark Mode)
import { useTheme } from '../components3/ThemeContext'; // นำเข้า Custom Hook สำหรับดึงค่าและฟังก์ชันจัดการธีม

function HW1() {
  // ดึงค่า state 'theme' ปัจจุบันมาจาก ThemeContext
  const { theme } = useTheme();

  return (
    // กล่องคอนเทนเนอร์หลักของหน้า HW1: เปลี่ยนสีพื้นหลังและสีตัวอักษรอัตโนมัติตามธีม พร้อมทำแอนิเมชันนุ่มนวล
    <div className={`hw1-container ${theme}`} style={{ 
      padding: '30px', 
      textAlign: 'center', 
      minHeight: '400px',
      backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',
      color: theme === 'dark' ? '#f8f9fa' : '#121212',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      
      {/* หัวข้อหน้าเว็บ: ปรับสีข้อความให้เป็นสีขาวในโหมดมืด และสีเข้มในโหมดสว่างเพื่อให้มองเห็นชัดเจน */}
      <h2 style={{ marginBottom: '15px', color: theme === 'dark' ? '#ffffff' : '#121212' }}>
        รายชื่อสมาชิกชมรม Open House
      </h2>

      {/* ส่วนแสดงปุ่มสลับธีม (Theme Toggle) สำหรับควบคุมโหมดสว่าง/มืดของหน้า */}
      <div style={{ marginBottom: '25px' }}>
        <ThemeToggle />
      </div>
      
      {/* ส่วนแสดงการ์ดสมาชิก: จัดเรียงแบบ Flexbox เว้นระยะห่าง และให้ปัดบรรทัดอัตโนมัติ (flexWrap) เมื่อจอแคบลง */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* เรียกใช้คอมโพเนนต์ ProfileCard ซ้ำๆ (Reusable Component) พร้อมส่ง Props ข้อมูลและสีที่ไม่เหมือนกัน */}
        <ProfileCard name="สมชาย" role="หัวหน้าชมรม" emoji="👦" color="#ff6b6b" />
        <ProfileCard name="สมหญิง" role="รองหัวหน้าชมรม" emoji="👧" color="#4dabf7" />
        <ProfileCard name="มานพ" role="ฝ่ายเทคนิค" emoji="🤖" color="#51cf66" />
        <ProfileCard name="สุดา" role="ฝ่ายประชาสัมพันธ์" emoji="📢" color="#fcc419" />
        <ProfileCard name="ธนพล" role="สมาชิกชมรม" emoji="👦" color="#fcc419" />
      </div>
    </div>
  );
}

export default HW1;