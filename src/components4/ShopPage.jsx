import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // นำเข้าคอมโพเนนต์ ProductCard สำหรับแสดงข้อมูลสินค้าแต่ละชิ้น

// คอมโพเนนต์ ShopPage: ทำหน้าที่ดึงข้อมูลสินค้าจาก API ภายนอก แสดงสถานะกำลังโหลด และจัดเรียงรายการสินค้าในรูปแบบ Grid
function ShopPage() {
  
  // สร้าง State สำหรับเก็บข้อมูลสินค้าที่ดึงมา (เริ่มต้นเป็นอาเรย์ว่าง [])
  const [products, setProducts] = useState([]);
  
  // สร้าง State สำหรับควบคุมการแสดงผลสถานะกำลังโหลดข้อมูล (เริ่มต้นเป็น true)
  const [loading, setLoading] = useState(true);

  // ใช้ useEffect เพื่อดึงข้อมูลสินค้าจาก Fake Store API (จำกัดจำนวน 8 ชิ้นตามโจทย์) ทันทีที่คอมโพเนนต์ถูกเปิดขึ้นมาครั้งแรก (Mount)
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((res) => res.json()) // แปลงข้อมูลที่ได้ให้อยู่ในรูปแบบ JSON
      .then((data) => {
        setProducts(data); // นำข้อมูลสินค้าที่ได้เก็บลงใน state products
        setLoading(false); // เปลี่ยนสถานะ loading เป็น false เมื่อดึงข้อมูลเสร็จสิ้น
      })
      .catch((err) => {
        console.error('Error fetching products:', err); // ดักจับข้อผิดพลาดหากเชื่อมต่อ API ไม่สำเร็จ
        setLoading(false); // ปิดสถานะกำลังโหลดเพื่อไม่ให้หน้าจ้างค้าง
      });
  }, []);

  // เงื่อนไข: ถ้าระบบยังอยู่ในระหว่างดึงข้อมูล (loading เป็น true) ให้แสดงข้อความแจ้งเตือนกำลังโหลด
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>กำลังโหลดสินค้า...</div>;
  }

  return (
    // คอนเทนเนอร์หลักของหน้าร้านค้า: กำหนดระยะห่าง ความกว้างสูงสุด และจัดให้อยู่กึ่งกลางหน้าจอ
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* หัวข้อหน้าหลัก */}
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#000' }}>🛍️ รายการสินค้าทั้งหมด</h2>
      
      {/* ส่วนแสดงรายการสินค้า: ใช้ Flexbox จัดเรียงแบบยืดหยุ่น เว้นระยะห่าง และปัดบรรทัดอัตโนมัติ (flexWrap) เมื่อจอแคบ */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {/* วนลูป (map) ข้อมูลสินค้าแต่ละชิ้นในอาเรย์ products ออกมาแสดงผลผ่านคอมโพเนนต์ ProductCard */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;