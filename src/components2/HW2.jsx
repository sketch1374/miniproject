import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput'; // นำเข้าคอมโพเนนต์ช่องพิมพ์งาน
import TodoItem from './TodoItem'; // นำเข้าคอมโพเนนต์แสดงรายการงานแต่ละชิ้น

function HW2() {
  
  // 1. โหลดข้อมูลเดิมจาก localStorage (ถ้ามี) หรือถ้าไม่มีให้ใช้ข้อมูลตัวอย่างเริ่มต้น
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('hw2_todos'); // ดึงข้อมูลจากหน่วยความจำเบราว์เซอร์
    if (savedTodos) {
      return JSON.parse(savedTodos); // แปลงข้อมูล String กลับมาเป็น Array ของ Object
    } else {
      return [
        { id: 1234567890, text: 'ทำการบ้านคณิต', done: false },
        { id: 2345678901, text: 'อ่านหนังสือ React', done: true },
      ];
    }
  });

  // สร้าง State สำหรับเก็บค่าตัวกรองการแสดงผล ('all' = ทั้งหมด, 'active' = ยังไม่เสร็จ, 'completed' = เสร็จแล้ว)
  const [filter, setFilter] = useState('all');

  // 2. บันทึกข้อมูล todos ลง localStorage ทุกครั้งที่ state 'todos' มีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('hw2_todos', JSON.stringify(todos));
  }, [todos]);

  // ฟังก์ชันเพิ่มงานใหม่ (รับ text เข้ามา แล้วสร้าง Object งานชิ้นใหม่ต่อท้ายอาเรย์เดิม)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),      // ใช้เวลาปัจจุบัน (Timestamp) เป็นเลข ID ที่ไม่ซ้ำกัน
      text: text,          // ชื่องานที่พิมพ์
      done: false,         // สถานะเริ่มต้นยังไม่เสร็จ
    };
    setTodos([...todos, newTodo]); // อัปเดต State โดยกระจายอาเรย์เดิมแล้วเพิ่มชิ้นใหม่เข้าไป
  };

  // ฟังก์ชันสลับสถานะ done (เสร็จ / ยังไม่เสร็จ) เมื่อคลิกที่รายการ
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo // ถ้าเจอ ID ที่ตรงกัน ให้สลับค่า done เป็นตรงข้าม
    ));
  };

  // ฟังก์ชันลบงาน (กรองเอาเฉพาะตัวที่ ID ไม่ตรงกับตัวที่จะลบให้อยู่รอดต่อ)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // คำนวณจำนวนงานที่ยังทำไม่เสร็จ (นับตัวที่ done เป็น false) เพื่อเอาไปแสดงผลแบบ Real-time
  const remainingCount = todos.filter(todo => !todo.done).length;

  // 3. กรองรายการ todo ตามปุ่มตัวกรองที่ผู้ใช้เลือกปัจจุบัน
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;       // แสดงเฉพาะอันที่ยังไม่เสร็จ
    if (filter === 'completed') return todo.done;    // แสดงเฉพาะอันที่เสร็จแล้ว
    return true; // ถ้าเป็น 'all' ให้แสดงทั้งหมด
  });

  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center', 
      maxWidth: '550px', 
      margin: '20px auto', 
      fontFamily: 'sans-serif',
      backgroundColor: '#ffffff', // 👈 ปรับพื้นหลังกล่องหลักเป็นสีขาวสะอาด
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #eaeaea'
    }}>
      <h2 style={{ color: '#212529', marginBottom: '10px' }}>📝 ใบงานที่ 2: Todo List (Bonus)</h2>
      
      {/* แสดงจำนวนงานที่เหลืออยู่แบบ Real-time */}
      <p style={{ color: '#495057', marginBottom: '20px', fontSize: '1rem' }}>
        งานที่เหลืออยู่: <strong style={{ color: '#007bff' }}>{remainingCount}</strong> รายการ
      </p>

      {/* ช่องกรอกข้อมูลสำหรับเพิ่มงานใหม่ (ส่งฟังก์ชัน addTodo ไปให้ลูกผ่าน Prop onAdd) */}
      <TodoInput onAdd={addTodo} />

      {/* ปุ่มตัวกรองรายการ (Filter Buttons) สำหรับสลับมุมมอง */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ padding: '6px 14px', background: filter === 'all' ? '#007bff' : '#f8f9fa', color: filter === 'all' ? '#fff' : '#495057', border: '1px solid #ced4da', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ทั้งหมด
        </button>
        <button 
          onClick={() => setFilter('active')} 
          style={{ padding: '6px 14px', background: filter === 'active' ? '#007bff' : '#f8f9fa', color: filter === 'active' ? '#fff' : '#495057', border: '1px solid #ced4da', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ยังไม่เสร็จ
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          style={{ padding: '6px 14px', background: filter === 'completed' ? '#007bff' : '#f8f9fa', color: filter === 'completed' ? '#fff' : '#495057', border: '1px solid #ced4da', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          เสร็จแล้ว
        </button>
      </div>

      {/* แสดงรายการ Todo ที่ถูกกรองแล้ว (วนลูปสร้างคอมโพเนนต์ TodoItem ทีละชิ้น) */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id}           // กำหนด key ให้ React แยกแยะแต่ละ Component ได้ถูกต้อง
              todo={todo}             // ส่งข้อมูล todo แต่ละตัวไปให้ลูก
              onToggle={toggleTodo}   // ส่งฟังก์ชันสลับสถานะไปให้ลูก
              onDelete={deleteTodo}   // ส่งฟังก์ชันลบไปให้ลูก
            />
          ))
        ) : (
          <p style={{ color: '#6c757d', fontStyle: 'italic', padding: '20px' }}>ไม่มีรายการในหมวดนี้</p>
        )}
      </ul>
    </div>
  );
}

export default HW2;