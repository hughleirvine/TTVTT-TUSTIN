// File: app/api/magisterium/route.js

import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  const TARGET_URL = 'https://www.magisterium.com/vi';

  try {
    // Fetch the HTML from the target website
    const response = await axios.get(TARGET_URL);
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // This is an example: Extract the main content.
    // You MUST inspect magisterium.com's HTML to find the correct selector.
    // Let's assume their main content is in an element with id="main-content"
    const mainContent = $('#content').html(); // Adjust the selector '#content' as needed!

    if (!mainContent) {
      throw new Error('Main content not found on the page.');
    }

    // Return the extracted content as JSON
    return NextResponse.json({ content: mainContent });

  } catch (error) {
    console.error('[MAGISTERIUM_API_ERROR]', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch or parse data' }),
      { status: 500 }
    );
  }
}
