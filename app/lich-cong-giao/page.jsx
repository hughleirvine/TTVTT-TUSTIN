// File: app/lich-cong-giao/page.jsx
"use client";

import { useState, useEffect } from 'react';

export default function CalendarPage() {
  const [calendarHtml, setCalendarHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This fetch call will now succeed because it's calling our reliable API route.
    fetch('/api/get-calendar')
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not load the calendar data from the server.");
        }
        return res.json();
      })
      .then(data => {
        setCalendarHtml(data.html);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []); // The empty array ensures this runs only once when the component mounts.

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Lịch Phụng Vụ Hàng Tuần
      </h1>

      {isLoading && (
        <div className="text-center text-gray-300">
          <p>Đang tải nội dung...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <p className="font-semibold">Đã xảy ra lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {calendarHtml && (
        <article
          className="prose prose-invert lg:prose-xl max-w-none bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg"
          dangerouslySetInnerHTML={{ __html: calendarHtml }}
        />
      )}
    </main>
  );
}
