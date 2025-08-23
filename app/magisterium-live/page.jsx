// File: app/magisterium-live/page.jsx

// ADD THIS CONFIG OBJECT AT THE VERY TOP
export const config = {
  // This tells Netlify to give this specific page's function a 25-second timeout.
  // This is the new, recommended way to set timeouts.
  maxDuration: 25, 
};

import { getMagisteriumData } from '@/lib/magisterium-scraper';

// This is a Server Component that will attempt the live scrape
export default async function MagisteriumLivePage() {
  const data = await getMagisteriumData();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Tra Cứu Trực Tiếp Magisterium
      </h1>
      <p className="text-center text-gray-400 mb-8 -mt-4">
        Dữ liệu này được tải trực tiếp từ magisterium.com và có thể không hoạt động nếu trang web chặn yêu cầu.
      </p>

      {data.error ? (
        // If the scrape fails, display the error message here
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <p className="font-semibold">Đã xảy ra lỗi khi tải dữ liệu trực tiếp</p>
          <p>{data.error}</p>
        </div>
      ) : (
        // If the scrape is successful, display the content
        <article
          className="prose prose-invert lg:prose-xl max-w-none bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </main>
  );
}
