// File: lib/magisterium-scraper.js

// Import the new, modern chromium package
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');

export async function getMagisteriumData() {
  let browser = null;
  const TARGET_URL = 'https://www.magisterium.com/vi';

  try {
    // Launch the browser using the new chromium package's properties
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

    const html = await page.content();
    
    const $ = cheerio.load(html);
    const mainContent = $('article.post').first().html();

    if (!mainContent) {
      throw new Error("Could not find the 'article.post' element. The site's structure may have changed.");
    }

    return { content: mainContent };

  } catch (error) {
    console.error('[MAGISTERIUM_SCRAPER_ERROR]', error.message);
    return { error: 'Failed to fetch or parse data from Magisterium.' };

  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
