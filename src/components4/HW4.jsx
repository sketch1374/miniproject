import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext'; // นำเข้า CartProvider สำหรับจัดการ Global State ของตะกร้าสินค้า
import Navbar from './Navbar'; // นำเข้าแถบเมนูด้านบน (Navigation Bar)
import ShopPage from './ShopPage'; // นำเข้าหน้าหลักรายการสินค้า

// 🚀 ใช้เทคนิค Lazy Loading และ React.lazy เพื่อโหลดหน้าเว็บเฉพาะตอนที่ผู้ใช้กดเข้าไปใช้งานจริง ช่วยประหยัดเวลาโหลดแอป (Performance Optimization / Bonus)
const CartPage = lazy(() => import('./CartPage'));
const ProductDetail = lazy(() => import('./ProductDetail')); // หน้าแสดงรายละเอียดสินค้าเชิงลึก (Bonus)

// คอมโพเนนต์หลัก HW4: ควบคุมโครงสร้างเส้นทางเว็บ (Routing), ห่อหุ้ม Global State และจัดการระบบหน้าเว็บ
function HW4() {
  return (
    // ครอบด้วย CartProvider เพื่อให้ทุกคอมโพเนนต์ภายในสามารถเรียกใช้ข้อมูลและฟังก์ชันในตะกร้าสินค้าได้
    <CartProvider>
      <Router>
        {/* กล่องโครงสร้างหลักของหน้าใบงานที่ 4 กำหนดสีพื้นหลัง สีตัวอักษร และความสูงขั้นต่ำ */}
        <div style={{ minHeight: '80vh', backgroundColor: '#f8f9fa', color: '#212529' }}>
          
          {/* แถบเมนูด้านบน (Navbar) สำหรับสลับหน้าไประหว่างหน้าร้านค้าและหน้าตะกร้า */}
          <Navbar />
          
          {/* ใช้ Suspense ควบคุมการแสดงข้อความสำรอง ('กำลังโหลดหน้า...') ระหว่างรอไฟล์ที่แยกโหลดด้วย Lazy Loading โหลดเสร็จ */}
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>กำลังโหลดหน้า...</div>}>
            
            {/* กำหนดเส้นทาง (Routes) ของเว็บไซต์ */}
            <Routes>
              {/* เส้นทางหน้าแรก (Home / Shop): แสดงรายการสินค้าทั้งหมด */}
              <Route path="/" element={<ShopPage />} />
              
              {/* เส้นทางหน้าตะกร้าสินค้า (Cart): แสดงสินค้าที่เลือกซื้อ */}
              <Route path="/cart" element={<CartPage />} />
              
              {/* เส้นทางหน้ารายละเอียดสินค้า (Product Detail): รองรับการรับค่า id ผ่าน URL พารามิเตอร์ (:id) ตามโจทย์ Bonus */}
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>

          </Suspense>
        </div>
      </Router>
    </CartProvider>
  );
}

export default HW4;