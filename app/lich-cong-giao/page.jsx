// File: app/lich-cong-giao/page.jsx

// Import the data-fetching function directly
import { getMagisteriumData } from '@/lib/magisterium-scraper';

export default async function LichCongGiaoPage() {
  // Call the function directly! No `fetch`, no `baseUrl`.
  const data = await getMagisteriumData();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Lịch Phụng Vụ Hàng Tuần
      </h1>

      {data.error ? (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <p className="font-semibold">Đã xảy ra lỗi</p>
          <p>{data.error}</p>
        </div>
      ) : (
        <article
          className="prose prose-invert lg:prose-xl max-w-none bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </main>
  );
}
