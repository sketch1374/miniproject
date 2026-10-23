import React, { useState } from 'react';

// คอมโพเนนต์หลัก ProfileCard รับ Props เข้ามาใช้งาน (name, role, emoji, color)
function ProfileCard({ name, role, emoji, color }) {
  
  // สร้าง State สำหรับเก็บสถานะว่าเมาส์กำลังชี้ (Hover) ที่การ์ดอยู่หรือไม่ (เริ่มต้นเป็น false)
  const [isHovered, setIsHovered] = useState(false);

  // ฟังก์ชันสำหรับปุ่มทักทาย (โจทย์เสริม/Bonus)
  const handleGreet = (e) => {
    e.stopPropagation(); // ป้องกันไม่ให้ Event คลิกปุ่มไปตีกับการคลิกตัวการ์ดหลัก
    alert(`สวัสดี ฉันชื่อ ${name} ตำแหน่ง ${role}`); // แสดงกล่องข้อความแจ้งเตือนดึงข้อมูลชื่อและตำแหน่งมาแสดง
  };

  // กำหนดสไตล์ CSS แบบ Inline ให้กับการ์ด
  const cardStyle = {
    backgroundColor: '#ffffff',
    color: '#212529',
    borderTop: `5px solid ${color}`, // ขอบบนของการ์ดเปลี่ยนสีตาม Props ที่ส่งมา
    borderRadius: '12px',
    padding: '20px',
    width: '200px',
    boxShadow: isHovered ? '0 8px 20px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.05)', // เปลี่ยนเงาเวลา Hover
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)', // ขยับการ์ดลอยขึ้นเวลา Hover
    transition: 'all 0.3s ease', // ทำให้แอนิเมชันตอนขยับมีความนุ่มนวล
    cursor: 'pointer',
    textAlign: 'center'
  };

  // เช็คเงื่อนไข: ถ้าเมาส์ชี้อยู่ (isHovered เป็นจริง) ให้เปลี่ยนอีโมจิเป็นรูปยกมือ ไม่งั้นใช้อีโมจิเดิม
  const displayEmoji = isHovered ? '🙋' : emoji;

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}  // เมื่อเอาเมาส์เข้ามาวาง ให้เปลี่ยน state เป็น true
      onMouseLeave={() => setIsHovered(false)} // เมื่อเอาเมาส์ออก ให้เปลี่ยน state กลับเป็น false
    >
      {/* ส่วนแสดงผลอีโมจิ */}
      <div style={{ fontSize: '60px', marginBottom: '15px' }}>{displayEmoji}</div>

      {/* ส่วนแสดงชื่อสมาชิก (รับค่ามาจาก Props name) */}
      <h3 style={{ margin: '10px 0 5px 0' }}>{name}</h3>

      {/* ส่วนแสดงบทบาท/ตำแหน่ง (รับค่ามาจาก Props role) */}
      <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>{role}</p>
      
      {/* ปุ่มกดทักทาย (Bonus) */}
      <button 
        onClick={handleGreet} // ผูกฟังก์ชัน handleGreet เข้ากับการคลิกปุ่ม
        style={{
          backgroundColor: color, // สีปุ่มปรับตาม Props color
          color: '#fff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ทักทาย
      </button>
    </div>
  );
}

export default ProfileCard;