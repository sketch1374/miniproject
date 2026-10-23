import React, { useState } from 'react';

// คอมโพเนนต์ TodoInput: ทำหน้าที่รับข้อความสำหรับเพิ่มรายการใหม่ โดยรับฟังก์ชัน onAdd มาทาง Props
function TodoInput({ onAdd }) {
  
  // สร้าง State สำหรับเก็บข้อความที่ผู้ใช้พิมพ์ในช่อง input (เริ่มต้นเป็นค่าว่าง)
  const [text, setText] = useState('');

  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้กดปุ่มบนคีย์บอร์ด
  const handleKeyDown = (e) => {
    // ตรวจสอบว่าปุ่มที่กดคือปุ่ม Enter หรือไม่
    if (e.key === 'Enter') {
      e.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้าเว็บอัตโนมัติ
      if (!text.trim()) return; // ถ้าข้อความว่างเปล่า (หรือมีแต่ช่องว่าง) ให้หยุดทำงานทันที
      onAdd(text); // เรียกใช้ฟังก์ชัน onAdd ที่ส่งมาจากแม่ เพื่อส่งข้อความออกไปสร้าง Task ใหม่
      setText(''); // ล้างข้อความในช่อง input ให้กลับมาว่างเหมือนเดิม
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้คลิกที่ปุ่ม "เพิ่ม"
  const handleClick = () => {
    if (!text.trim()) return; // ตรวจสอบว่าช่องว่างไหม ถ้าว่างให้หยุดทำงาน
    onAdd(text); // ส่งข้อความไปเพิ่มในรายการ
    setText(''); // ล้างข้อความในช่อง input
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* ช่องพิมพ์ข้อความ (Input Text): ปรับสไตล์ให้เป็นธีมสีขาว อ่านง่าย */}
      <input 
        type="text" 
        placeholder="พิมพ์รายการที่ต้องทำ..." 
        value={text} // ผูกค่ากับ State text
        onChange={(e) => setText(e.target.value)} // อัปเดตค่า State ทุกครั้งที่มีการพิมพ์ข้อความเปลี่ยนแปลง
        onKeyDown={handleKeyDown} // ดักจับการกดปุ่มบนคีย์บอร์ด (เช่น กด Enter)
        style={{ 
          padding: '8px 12px', 
          width: '250px', 
          marginRight: '8px', 
          borderRadius: '4px', 
          // 👈 ปรับสไตล์ให้เข้ากับธีมสีขาว: พื้นหลังขาว, ตัวหนังสือเข้ม, ขอบสีเทา
          border: '1px solid #ced4da',
          backgroundColor: '#fff',
          color: '#495057',
          outline: 'none' // เอาเส้นขอบน้ำเงินเวลาคลิกออก เพื่อความสวยงาม
        }}
      />
      
      {/* ปุ่มกดเพิ่มรายการ */}
      <button 
        onClick={handleClick} // เมื่อคลิกปุ่ม ให้เรียกฟังก์ชัน handleClick
        style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        เพิ่ม
      </button>
    </div>
  );
}

export default TodoInput;