import React from 'react';

// คอมโพเนนต์ TodoItem: ทำหน้าที่แสดงรายการสิ่งที่ต้องทำแต่ละชิ้น (รับ props มา 3 ตัว คือ ข้อมูล todo, ฟังก์ชัน onToggle, และฟังก์ชัน onDelete)
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    // องค์ประกอบรายการ (li): จัดแต่งสไตล์ให้เป็นกล่องแถวแนวนอน มีระยะห่าง ขอบโค้งมน และเส้นขอบบางๆ
    <li style={{ 
      background: '#f9f9f9', 
      margin: '8px 0', 
      padding: '10px 15px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderRadius: '4px', 
      border: '1px solid #eee' 
    }}>
      
      {/* ส่วนแสดงข้อความของงาน: เมื่อคลิกจะเรียกฟังก์ชัน onToggle เพื่อสลับสถานะเสร็จ/ยังไม่เสร็จ */}
      <span 
        onClick={() => onToggle(todo.id)} // ส่ง id ของงานนี้กลับไปบอกคอมโพเนนต์แม่เพื่อสลับสถานะ (done)
        style={{ 
          cursor: 'pointer', 
          // เงื่อนไข: ถ้างานเสร็จแล้ว (done เป็น true) ให้ขีดฆ่าข้อความและเปลี่ยนเป็นสีเทา ไม่งั้นแสดงปกติ
          textDecoration: todo.done ? 'line-through' : 'none', 
          color: todo.done ? '#888' : '#000',
          flexGrow: 1, // ขยายพื้นที่ข้อความให้เต็มแถว
          textAlign: 'left'
        }}
      >
        {todo.text} {/* แสดงข้อความชื่องานที่รับมาจาก prop todo */}
      </span>

      {/* ปุ่มลบรายการงานชิ้นนี้ */}
      <button 
        onClick={() => onDelete(todo.id)} // ส่ง id ของงานนี้กลับไปบอกคอมโพเนนต์แม่ให้ลบออกจากรายการ
        style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
      >
        ลบ
      </button>
    </li>
  );
}

export default TodoItem;