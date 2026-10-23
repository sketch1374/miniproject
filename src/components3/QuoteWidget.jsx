import React from 'react';
import Card from './Card'; // นำเข้าคอมโพเนนต์ Card ที่ใช้รับโครงสร้างและธีม
import { useTheme } from './ThemeContext'; // นำเข้า Custom Hook สำหรับดึงข้อมูลธีมปัจจุบัน

// คอมโพเนนต์ QuoteWidget: ทำหน้าที่แสดงคำคมสำหรับนักพัฒนา โดยห่อหุ้มด้วย Card
function QuoteWidget() {
  
  // ดึงค่า 'theme' ('light' หรือ 'dark') มาจาก ThemeContext เพื่อนำมาปรับสีข้อความให้เหมาะสมกับโหมด
  const { theme } = useTheme();

  return (
    // เรียกใช้คอมโพเนนต์ Card พร้อมส่ง prop title เป็นหัวข้อการ์ด "💡 คำคมนักพัฒนา"
    <Card title="💡 คำคมนักพัฒนา">
      <div style={{ textAlign: 'center', padding: '10px' }}>
        
        {/* ข้อความคำคม: ปรับรูปแบบตัวเอียง (italic) และเปลี่ยนสีตัวหนังสือตามธีม (โหมดมืดสีสว่างขึ้น โหมดสว่างสีเข้ม) */}
        <p style={{ 
          fontStyle: 'italic', 
          margin: '8px 0', 
          fontSize: '0.95rem',
          color: theme === 'dark' ? '#e9ecef' : '#333'
        }}>
          "Code is like humor. When you have to explain it, it’s bad."
        </p>

        {/* ส่วนแสดงชื่อผู้กล่าวคำคม (Author) พร้อมปรับขนาดตัวหนังสือให้เล็กลง */}
        <p style={{ fontSize: '0.8rem', color: theme === 'dark' ? '#868e96' : '#868e96' }}>
          — Martin Fowler
        </p>
      </div>
    </Card>
  );
}

export default QuoteWidget;