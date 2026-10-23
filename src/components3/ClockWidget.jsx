import React, { useState, useEffect } from 'react';
import Card from './Card'; // นำเข้าคอมโพเนนต์ Card ที่ใช้ Composition Pattern
import { useTheme } from './ThemeContext'; // นำเข้า Custom Hook สำหรับดึงข้อมูลธีม

// คอมโพเนนต์ ClockWidget: แสดงนาฬิกาดิจิทัลที่สามารถเลือกดูโซนเวลาต่างๆ ได้
function ClockWidget() {
  
  // 1. สร้าง State เก็บเวลาปัจจุบัน (เริ่มต้นด้วยเวลาปัจจุบันของเครื่อง)
  const [time, setTime] = useState(new Date());
  
  // สร้าง State สำหรับเก็บโซนเวลาที่ผู้ใช้เลือก (ค่าเริ่มต้นเป็นเวลาของประเทศไทย 'Asia/Bangkok')
  const [timeZone, setTimeZone] = useState('Asia/Bangkok');
  
  // ดึงค่าธีมปัจจุบันจาก ThemeContext เพื่อเอามาปรับสีของ Dropdown และตัวหนังสือ
  const { theme } = useTheme();

  // ใช้ useEffect ร่วมกับ setInterval เพื่ออัปเดตเวลาทุกๆ 1 วินาที (1000 มิลลิวินาที) แบบ Real-time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Cleanup Function: เคลียร์ Timer ทิ้งเมื่อคอมโพเนนต์ถูกปิด เพื่อป้องกันการทำงานค้าง (Memory Leak)
    return () => clearInterval(timer);
  }, []);

  // รายการตัวเลือกโซนเวลาต่างๆ สำหรับแสดงใน Dropdown
  const timeZones = [
    { label: '🇹🇭 กรุงเทพฯ (Thailand)', value: 'Asia/Bangkok' },
    { label: '🇯🇵 โตเกียว (Japan)', value: 'Asia/Tokyo' },
    { label: '🇬🇧 ลอนดอน (UK)', value: 'Europe/London' },
    { label: '🇺🇸 นิวยอร์ก (USA)', value: 'America/New_York' },
  ];

  return (
    // ห่อด้วยคอมโพเนนต์ Card ส่ง title ไปแสดงหัวข้อ และใช้ประโยชน์จาก Context ภายใน Card อัตโนมัติ
    <Card title="🕒 นาฬิกาดิจิทัล">
      <div style={{ textAlign: 'center', padding: '10px' }}>
        
        {/* 2. Dropdown (Select) สำหรับให้ผู้ใช้คลิกเลือกโซนเวลาที่ต้องการ */}
        <select 
          value={timeZone} // ผูกค่ากับ State timeZone ปัจจุบัน
          onChange={(e) => setTimeZone(e.target.value)} // เมื่อเปลี่ยนตัวเลือก ให้ 
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            border: theme === 'dark' ? '1px solid #555' : '1px solid #ccc',
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            marginBottom: '10px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {/* วนลูปสร้างตัวเลือก <option> จากอาเรย์ timeZones */}
          {timeZones.map((zone) => (
            <option key={zone.value} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>

        {/* 3. แสดงเวลาปัจจุบัน โดยแปลงรูปแบบตามโซนเวลา (timeZone) ที่ผู้ใช้เลือกจาก Dropdown */}
        <p style={{ 
          fontSize: '1.5rem', 
          margin: '5px 0', 
          fontWeight: 'bold',
          color: theme === 'dark' ? '#4dabf7' : '#1971c2' 
        }}>
          {time.toLocaleTimeString('en-US', { timeZone: timeZone })}
        </p>

        {/* แสดงข้อความบอกรหัสโซนเวลาปัจจุบันเพื่อความชัดเจน */}
        <p style={{ fontSize: '0.8rem', color: theme === 'dark' ? '#b0b0b0' : '#666' }}>
          โซนเวลา: {timeZone}
        </p>
      </div>
    </Card>
  );
}

export default ClockWidget;