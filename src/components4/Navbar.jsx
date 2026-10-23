import React from 'react';
import { Link } from 'react-router-dom'; // นำเข้า Link สำหรับเปลี่ยนหน้าเว็บไซต์แบบ SPA (Single Page Application) โดยไม่ต้องรีเฟรชเบราว์เซอร์
import { useCart } from './CartContext'; // นำเข้า Custom Hook สำหรับดึงข้อมูลจำนวนสินค้าในตะกร้ามาแสดงแบบ Real-time

// คอมโพเนนต์ Navbar: แถบเมนูด้านบนสุดของแอปพลิเคชัน ทำหน้าที่แสดงชื่อร้านและลิงก์เปลี่ยนหน้า
function Navbar() {
  
  // ดึงค่า totalItems (จำนวนชิ้นรวมทั้งหมดในตะกร้า) มาจาก CartContext เพื่อเอาไปโชว์ที่ปุ่มตะกร้า
  const { totalItems } = useCart();

  return (
    // กล่องนำทางหลัก (Navbar): จัดวางแบบ Flexbox แยกซ้าย-ขวา สีพื้นหลังเข้ม และมีเงาด้านล่าง
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#212529',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* ชื่อร้านค้า / โลโก้ด้านซ้าย */}
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>🛒 Mini Shop</h2>
      
      {/* เมนูลิงก์สำหรับเปลี่ยนหน้า (ด้านขวา) */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '1rem' }}>
        
        {/* ลิงก์ไปหน้าแรก (หน้าร้านค้า) */}
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          🏠 หน้าร้าน
        </Link>
        
        {/* ลิงก์ไปหน้าตะกร้าสินค้า พร้อมแสดงจำนวนชิ้น ({totalItems}) แบบอัปเดตอัตโนมัติ */}
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          🛍️ ตะกร้าสินค้า ({totalItems})
        </Link>
        
      </div>
    </nav>
  );
}

export default Navbar;