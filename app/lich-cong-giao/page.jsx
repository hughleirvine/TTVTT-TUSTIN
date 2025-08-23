// File: app/lich-cong-giao/page.jsx

// This function fetches data FROM YOUR OWN API ROUTE, running on the server.
async function getMagisteriumContent() {
  // This URL must be the absolute URL. In production, Vercel automatically
  // sets the VERCEL_URL environment variable.
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  
  // We fetch from the API route we created earlier.
  const apiUrl = `${baseUrl}/api/magisterium`;

  try {
    // Revalidate this data every hour (3600 seconds) to get fresh content
    // without rebuilding the entire site.
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      // If the API returns an error, we'll catch it here.
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    // Parse the JSON response from our API route.
    return response.json();

  } catch (error) {
    console.error("Failed to fetch Magisterium content:", error);
    // Return an error object that the page component can display.
    return { error: 'Không thể tải nội dung Lịch Phụng Vụ. Vui lòng thử lại sau.' };
  }
}

// This is now an async Server Component.
export default async function LichCongGiaoPage() {
  // We call the fetch function directly when the page is being rendered on the server.
  const data = await getMagisteriumContent();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Lịch Phụng Vụ Hàng Tuần
      </h1>

      {data.error ? (
        // If there was an error, display a friendly message.
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <p className="font-semibold">Đã xảy ra lỗi</p>
          <p>{data.error}</p>
        </div>
      ) : (
        // If data was fetched successfully, render it.
        // The `prose` classes from Tailwind Typography style the raw HTML nicely.
        <article
          className="prose prose-invert lg:prose-xl max-w-none bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg"
          
          // WARNING: This is necessary to render HTML from an external source.
          // Only use this if you trust the content you are displaying.
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </main>
  );
}
