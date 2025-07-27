// File: app/schedule/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'; // 1. Import the Image component

// Helper function to format date strings into DD-MM-YYYY format.
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return dateString;
  }
}

export default function SchedulePage() {
  const API_URL = 'https://script.google.com/macros/s/AKfycbze1WBsLldahSsrQptMHqYQ23a7Li5ls9tjl4Twa2QhJ7SitosFy1E1t40yeIYvBoqpTg/exec';

  const [names, setNames] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [fullSchedule, setFullSchedule] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}?action=getAllNames`)
      .then(res => res.json())
      .then(data => setNames(data))
      .catch(err => console.error("Error loading names:", err));

    fetch(`${API_URL}?action=getFullScheduleData`)
      .then(res => res.json())
      .then(data => setFullSchedule(data))
      .catch(err => console.error("Error loading full schedule:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleMemberChange = (e) => {
    const memberName = e.target.value;
    setSelectedMember(memberName);
    setSchedule(null);
    setMemberDetails(null);

    if (memberName) {
      setIsLoading(true);
      fetch(`${API_URL}?action=getSchedule&name=${encodeURIComponent(memberName)}`)
        .then(res => res.json())
        .then(data => setSchedule(data))
        .catch(err => console.error("Error loading schedule:", err))
        .finally(() => setIsLoading(false));

      fetch(`${API_URL}?action=getMemberDetails&name=${encodeURIComponent(memberName)}`)
        .then(res => res.json())
        .then(data => setMemberDetails(data))
        .catch(err => console.error("Error loading member details:", err));
    }
  };

  const printTable = () => { /* ... print function code remains the same ... */ };
  const printFullSchedule = () => { /* ... print function code remains the same ... */ };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureSchedule = schedule?.filter((row, index) => {
      if (index === 0) return true;
      const scheduleDate = new Date(row[0]);
      return !isNaN(scheduleDate.getTime()) && scheduleDate >= today;
  });

  const futureFullSchedule = fullSchedule?.filter((row, index) => {
      if (index === 0) return true;
      const scheduleDate = new Date(row[0]);
      return !isNaN(scheduleDate.getTime()) && scheduleDate >= today;
  });

  return (
    <div className="container">
      <h1>Tìm Lịch Phục Vụ</h1>
      <div className="input-section">
        <select id="memberNameDropdown" onChange={handleMemberChange} value={selectedMember}>
          <option value="">-- Chọn tên thành viên --</option>
          {names.map(name => (<option key={name} value={name}>{name}</option>))}
        </select>
      </div>

      {isLoading && <div id="loading">Đang tải...</div>}

      {/* 2. ADDED: Image appears after a member is selected */}
      {selectedMember && !isLoading && (
        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <Image
            src="https://i.imgur.com/aZcKXAn.png"
            alt="Vị Trí Của TTVTT"
            width={700}
            height={400}
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd' }}
          />
        </div>
      )}

      {memberDetails && Array.isArray(memberDetails) && (
        <div id="memberDetails">
          <h3>Thông tin chi tiết:</h3>
          <ul>
            <li><strong>Tham Gia:</strong> {formatDate(memberDetails[0])}</li>
            <li><strong>Mãn Nhiệm Kỳ:</strong> {formatDate(memberDetails[1])}</li>
            <li><strong>Ghi Chú:</strong> {memberDetails[2]}</li>
          </ul>
        </div>
      )}

      <div id="results">
        {futureSchedule && futureSchedule.length > 1 ? (
          <table>
            <thead><tr>{futureSchedule[0].map(header => <th key={header}>{header}</th>)}</tr></thead>
            <tbody>
              {futureSchedule.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{formatDate(row[0])}</td>
                    {row.slice(1).map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          selectedMember && !isLoading && <p>Không tìm thấy lịch trình nào.</p>
        )}
      </div>
      
      <div className="print-section">
        <button onClick={printTable}>In Bảng Kết Quả</button>
      </div>

      <div id="fullScheduleDisplay">
        <h2>Toàn Bộ Lịch Trình</h2>
        {futureFullSchedule && futureFullSchedule.length > 1 ? (
             <table>
                <thead><tr>{futureFullSchedule[0].map(header => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>
                    {futureFullSchedule.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{formatDate(row[0])}</td>
                            {row.slice(1).map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
             </table>
        ) : (
          !isLoading && <p>Không tìm thấy dữ liệu lịch trình đầy đủ.</p>
        )}
        
        {futureFullSchedule && futureFullSchedule.length > 1 && (
            <>
                <h2>Ghi Chú:</h2>
                <ul>
                  <br/><li><strong>Lịch Trình được sắp xếp theo Thứ Bảy, Thứ Sáu đầu tháng, các lễ buộc và lễ trọng .</strong></li>
                  <br/><li><strong>(1) Mình Thánh - [1-6]</strong> - Cần 6 thành viên phục vụ trong thánh lễ cho rước Mình Thánh Chúa.</li>
                  <br/><li><strong>(2) Máu Thánh - [1-4]</strong> - Cần 4 thành viên phục vụ trong thánh lễ cho rước Máu Thánh Chúa.</li>
                  <br/><li><strong>(3) Thay Thế (Standby) cho Mình Thánh</strong> - Cần 1 thành viên để thay thế vị trí (1) ở trên, nếu không đủ 6 người.</li>
                  <br/><li><strong>(4) Thay Thế (Standby) cho Máu Thánh</strong> - Cần 1 thành viên để thay thế vị trí (2) ở trên, nếu không đủ 4 người.</li>
                  <br/><li><strong>(5) Dự Phòng (Reserve) cho Mình Thánh</strong> - Cần 1 thành viên để thay thế thêm cho vị trí (1) ở trên, nếu đã có người thay thế (3) mà vẫn không đủ 6 người.</li>
                  <br/><li><strong>(6) Dự Phòng (Reserve) cho Máu Thánh</strong> - Cần 1 thành viên để thay thế thêm cho vị trí (2) ở trên, nếu đã có người thay thế (4) mà vẫn không đủ 4 người.</li>
                  <br/><li><strong>(7) SUMMER TIME</strong> - Tháng Bảy - Tháng 9: Theo lịch các em Thiếu Nhi nghĩ hè. Chỉ cần một thừa tác viên phục vụ trên lầu,nên chỉ cần 5 thừa tác viên cho rước Mình Thánh Chúa thôi.</li>
                </ul>
            </>
        )}
      </div>

      <div className="print-buttons-section">
          <button onClick={printFullSchedule}>In Toàn Bộ Lịch Trình</button>
      </div>
    </div>
  );
}
