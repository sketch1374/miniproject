import React from 'react';
import { useCart } from './CartContext'; // นำเข้า Custom Hook สำหรับดึงฟังก์ชัน addToCart มาใช้งานเมื่อกดปุ่ม

// คอมโพเนนต์ ProductCard: ทำหน้าที่แสดงข้อมูลสินค้าแต่ละรายการ (รูปภาพ ชื่อ ราคา) และปุ่มกดเพิ่มสินค้าลงตะกร้า
function ProductCard({ product }) {
  
  // ดึงฟังก์ชัน addToCart สำหรับเพิ่มสินค้าเข้าตะกร้ามาจาก CartContext
  const { addToCart } = useCart();

  // แปลงราคาจากสกุลเงินดอลลาร์ (USD) เป็นเงินบาทไทย (THB) โดยคูณ 35 ตามโจทย์ และจัดรูปแบบตัวเลขให้สวยงาม
  const priceInTHB = (product.price * 35).toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
  });

  // ตัดชื่อสินค้าให้สั้นลงเหลือไม่เกิน 35 ตัวอักษร และเติมเครื่องหมาย ... ต่อท้าย เพื่อป้องกันไม่ให้ข้อความยาวเกินไปจนล้นหรือทับซ้อน[cite: 3]
  const shortTitle = product.title.length > 35 
    ? product.title.substring(0, 35) + '...' 
    : product.title;

  return (
    // กล่องการ์ดแสดงสินค้า: กำหนดขนาด ความโค้งมน สีพื้นหลัง และเงา จัดเรียงภายในแบบ Flexbox
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #dee2e6',
      borderRadius: '10px',
      padding: '20px',
      width: '240px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}>
      {/* ส่วนบนของ Card: รูปภาพ, ชื่อสินค้า, และราคา */}
      <div>
        {/* รูปภาพสินค้า: กำหนดขนาดและใช้ objectFit: contain เพื่อให้รูปไม่เบี้ยว */}
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '15px' }} 
        />
        
        {/* ชื่อสินค้า: แสดงผลชื่อที่ตัดสั้นแล้ว (shortTitle) และใส่ attribute title เพื่อให้เอาเมาส์ชี้แล้วดูชื่อเต็มได้[cite: 3] */}
        <h4 style={{ fontSize: '0.95rem', margin: '0 0 12px 0' }} title={product.title}>
          {shortTitle}
        </h4>
        
        {/* แสดงราคาเป็นเงินบาทไทย ตัวหนังสือสีเขียวและตัวหนา */}
        <p style={{ color: '#2b8a3e', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 15px 0' }}>
          {priceInTHB}
        </p>
      </div>

      {/* ปุ่มกดเพิ่มสินค้าลงตะกร้า */}
      <button 
        onClick={() => addToCart(product)} // เมื่อคลิก จะเรียกฟังก์ชัน addToCart พร้อมส่งข้อมูลสินค้าชิ้นนี้ไปเก็บใน State กลาง
        style={{
          backgroundColor: '#228be6',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        ➕ เพิ่มลงตะกร้า
      </button>
    </div>
  );
}

export default ProductCard;