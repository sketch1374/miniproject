import React from 'react';
import Card from './Card'; // นำเข้าคอมโพเนนต์ Card ที่ใช้ Composition Pattern สำหรับห่อหุ้มเนื้อหา

// คอมโพเนนต์ WeatherWidget: ทำหน้าที่แสดงรายงานสภาพอากาศของเมืองต่างๆ โดยใช้ Card ซ้ำๆ กัน
function WeatherWidget() {
  return (
    // จัดวางการ์ดสภาพอากาศทั้งหมดให้อยู่ในรูปแบบ Flexbox แนวนอน มีระยะห่าง และปัดบรรทัดอัตโนมัติเมื่อจอแคบ
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      
      {/* การ์ดที่ 1: พยากรณ์อากาศกรุงเทพมหานคร */}
      <Card title="🌤️ กรุงเทพมหานคร">
        {/* แสดงอุณหภูมิ ด้วยตัวเลขขนาดใหญ่ */}
        <p style={{ fontSize: '2rem', margin: '10px 0' }}>32°C</p>
        {/* แสดงสถานะอากาศ */}
        <p>สภาพอากาศ: มีเมฆบางส่วน</p>
        {/* แสดงข้อมูลเสริม (ความชื้นและความเร็วลม) ปรับขนาดตัวหนังสือให้เล็กลงและโปร่งแสงเล็กน้อย */}
        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>ความชื้น: 65% | ลม: 12 กม./ชม.</p>
      </Card>

      {/* การ์ดที่ 2: พยากรณ์อากาศเชียงใหม่ */}
      <Card title="🌧️ เชียงใหม่">
        <p style={{ fontSize: '2rem', margin: '10px 0' }}>26°C</p>
        <p>สภาพอากาศ: ฝนฟ้าคะนอง</p>
        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>ความชื้น: 85% | ลม: 8 กม./ชม.</p>
      </Card>

      {/* การ์ดที่ 3: พยากรณ์อากาศภูเก็ต */}
      <Card title="☀️ ภูเก็ต">
        <p style={{ fontSize: '2rem', margin: '10px 0' }}>34°C</p>
        <p>สภาพอากาศ: ท้องฟ้าแจ่มใส</p>
        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>ความชื้น: 70% | ลม: 15 กม./ชม.</p>
      </Card>
      
    </div>
  );
}

export default WeatherWidget;