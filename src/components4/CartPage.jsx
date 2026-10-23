import React from 'react';
import { useCart } from './CartContext'; // นำเข้า Custom Hook สำหรับดึงข้อมูลและฟังก์ชันจัดการตะกร้าสินค้า
import { Link } from 'react-router-dom'; // นำเข้า Link จาก React Router สำหรับทำลิงก์เปลี่ยนหน้าแบบไม่ต้องรีเฟรช

// คอมโพเนนต์ CartPage: ทำหน้าที่แสดงรายการสินค้าทั้งหมดที่อยู่ในตะกร้า คำนวณราคารวม และจัดการปุ่มสั่งซื้อ/ลบสินค้า
function CartPage() {
  
  // ดึงค่า cart, removeFromCart, totalPrice, รวมถึง increaseQuantity และ decreaseQuantity มาจาก CartContext
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

  // แปลงตัวเลขราคารวม (totalPrice) ให้เป็นรูปแบบสกุลเงินบาทไทย (เช่น 1,500.00 ฿) เพื่อความสวยงามและอ่านง่าย
  const formattedTotalPrice = totalPrice.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
  });

  // เงื่อนไข: ถ้าตะกร้าสินค้าว่างเปล่า (ไม่มีสินค้าอยู่เลย) ให้แสดงหน้าจอแจ้งเตือนและปุ่มกดกลับไปเลือกซื้อสินค้า
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#000' }}>🛒 ตะกร้าสินค้าของคุณว่างเปล่า</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>ยังไม่มีสินค้าในตะกร้า ลองเลือกซื้อสินค้าก่อนได้เลยครับ</p>
        
        {/* ใช้ Link พาผู้ใช้กลับไปหน้าแรก (เส้นทาง '/') เพื่อเลือกซื้อสินค้า */}
        <Link to="/" style={{
          backgroundColor: '#228be6',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          🏠 กลับไปเลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    // คอนเทนเนอร์หลักของหน้าตะกร้าสินค้า กำหนดขนาดความกว้างสูงสุดและจัดให้อยู่กึ่งกลาง
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      {/* 👈 ปรับหัวข้อให้เป็นตัวหนังสือสีดำสนิท */}
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#000' }}>🛍 ตะกร้าสินค้าของคุณ</h2>
      
      {/* ส่วนแสดงรายการสินค้าในตะกร้า: วางเรียงในแนวตั้งและเว้นระยะห่างระหว่างชิ้น */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {cart.map((item) => {
          // คำนวณราคาของสินค้าแต่ละชิ้น (ราคา x อัตราแลกเปลี่ยน 35 บาท x จำนวนชิ้น) แล้วแปลงเป็นสกุลเงินบาท
          const itemPriceTHB = (item.price * 35 * item.quantity).toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB',
          });

          return (
            // กล่องการ์ดแสดงข้อมูลสินค้าแต่ละชิ้นในตะกร้า
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {/* ข้อมูลรูปภาพ ชื่อ จำนวน และราคาต่อชิ้น */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#000' }}>{item.title}</h4>
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem' }}>
                    ราคา: {itemPriceTHB}
                  </p>

                  {/* ➕➖ ปุ่มเพิ่ม/ลดจำนวนสินค้าทีละชิ้น */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      style={{ padding: '2px 8px', backgroundColor: '#e9ecef', border: '1px solid #ced4da', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#333' }}>
                      {item.quantity} ชิ้น
                    </span>
                    <button 
                      onClick={() => increaseQuantity(item.id)}
                      style={{ padding: '2px 8px', backgroundColor: '#e9ecef', border: '1px solid #ced4da', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* ปุ่มลบสินค้าชิ้นนี้ออกจากตะกร้า */}
              <button 
                onClick={() => removeFromCart(item.id)} // เรียกฟังก์ชัน removeFromCart พร้อมส่ง id สินค้าที่ต้องการลบ
                style={{
                  backgroundColor: '#fa5252',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🗑️ ลบ
              </button>
            </div>
          );
        })}
      </div>

      {/* ส่วนสรุปราคารวมทั้งหมด และปุ่มกดสั่งซื้อสินค้า */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'right'
      }}>
        {/* แสดงราคารวมสุทธิของสินค้าทุกชิ้นในตะกร้า */}
        <h3 style={{ margin: '0 0 15px 0', color: '#2b8a3e' }}>
          ราคารวมทั้งหมด: {formattedTotalPrice}
        </h3>
        
        {/* ปุ่มกดจำลองการสั่งซื้อสินค้า */}
        <button 
          onClick={() => alert('สั่งซื้อสินค้าเรียบร้อยแล้วขอบคุณครับ! 🎉')} // แสดง Popup แจ้งเตือนเมื่อกดสั่งซื้อ
          style={{
            backgroundColor: '#40c057',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          💳 สั่งซื้อสินค้า
        </button>
      </div>
    </div>
  );
}

export default CartPage;