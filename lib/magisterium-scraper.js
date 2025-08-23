// File: lib/magisterium-scraper.js

import axios from 'axios';
import * as cheerio from 'cheerio';

// This function contains all the logic for fetching and parsing the data
export async function getMagisteriumData() {
  const TARGET_URL = 'https://www.magisterium.com/vi';

  try {
    const response = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const mainContent = $('article.post').first().html();

    if (!mainContent) {
      throw new Error("Could not find the 'article.post' element on the page.");
    }

    // On success, return the content
    return { content: mainContent };

  } catch (error) {
    console.error('[MAGISTERIUM_SCRAPER_ERROR]', error.message);
    // On failure, return an error object
    return { error: 'Failed to fetch or parse data from Magisterium.' };
  }
}
