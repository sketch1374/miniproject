import React, { useState } from 'react';
import HW1 from './components1/HW1';
import HW2 from './components2/HW2';
import HW3 from './components3/HW3';
import HW4 from './components4/HW4';
import { ThemeProvider } from './components3/ThemeContext';

function App() {
  const [activeHW, setActiveHW] = useState('hw1');

  return (
    <ThemeProvider>
      {/* เอา background กับ color ออกจาก div นอกสุด เพื่อไม่ให้ไปบังคับสีของใบงานอื่น */}
      <div style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* เมนูด้านบนสุด สำหรับสลับดูแต่ละใบงาน */}
        <nav style={{ backgroundColor: '#1a1a1a', padding: '12px', textAlign: 'center', borderBottom: '2px solid #333' }}>
          <button 
            onClick={() => setActiveHW('hw1')}
            style={{ padding: '8px 16px', marginRight: '8px', backgroundColor: activeHW === 'hw1' ? '#4dabf7' : '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📌 ใบงาน 1
          </button>
          <button 
            onClick={() => setActiveHW('hw2')}
            style={{ padding: '8px 16px', marginRight: '8px', backgroundColor: activeHW === 'hw2' ? '#4dabf7' : '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📌 ใบงาน 2
          </button>
          <button 
            onClick={() => setActiveHW('hw3')}
            style={{ padding: '8px 16px', marginRight: '8px', backgroundColor: activeHW === 'hw3' ? '#4dabf7' : '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📌 ใบงาน 3
          </button>
          <button 
            onClick={() => setActiveHW('hw4')}
            style={{ padding: '8px 16px', backgroundColor: activeHW === 'hw4' ? '#4dabf7' : '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📌 ใบงาน 4
          </button>
        </nav>

        {/* แสดงผลคอมโพเนนต์ตามใบงานที่เลือก */}
        <main>
          {activeHW === 'hw1' && <HW1 />}
          {activeHW === 'hw2' && <HW2 />}
          {activeHW === 'hw3' && <HW3 />}
          {activeHW === 'hw4' && <HW4 />}
        </main>

      </div>
    </ThemeProvider>
  );
}

export default App;