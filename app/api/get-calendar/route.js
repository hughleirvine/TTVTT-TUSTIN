// File: app/api/get-calendar/route.js
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// 1. Force Next.js to always execute this route dynamically on the server
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const url = 'https://loichuahomnay.vn/lich-cong-giao';
  const baseUrl = 'https://loichuahomnay.vn';

  try {
    // 2. Fetch fresh HTML without serving stale background cache
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content, status: ${response.status}`);
    }

    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);

    // Find the main calendar container
    const calendarDiv = $('.lcgtg');

    if (!calendarDiv.length) {
      throw new Error("Calendar container (.lcgtg) could not be found. The source structure may have changed.");
    }

    // Fix all relative links to be absolute
    calendarDiv.find('a').each((_, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('http')) {
        $(link).attr('href', baseUrl + href);
      }
      // Make all links open in a new tab safely
      $(link).attr('target', '_blank').attr('rel', 'noopener noreferrer');
    });

    const cleanedHtml = calendarDiv.html();

    if (!cleanedHtml) {
      throw new Error("Calendar content is empty.");
    }

    // 3. Return JSON with strict headers preventing CDN / Browser caching
    return NextResponse.json(
      { html: cleanedHtml },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Netlify-CDN-Cache-Control': 'no-store',
        },
      }
    );

  } catch (e) {
    console.error("Error in get-calendar API:", e);
    return NextResponse.json(
      { error: e.message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache',
        },
      }
    );
  }
}
