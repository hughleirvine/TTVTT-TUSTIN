// File: lib/magisterium-scraper.js again

const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');

export async function getMagisteriumData() {
  console.log('[DEBUG] Scraping function started.');
  let browser = null;
  const TARGET_URL = 'https://www.magisterium.com/vi';

  try {
    console.log('[DEBUG] Launching browser...');
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log('[DEBUG] Browser launched successfully.');

    const page = await browser.newPage();
    console.log('[DEBUG] New page created.');
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    console.log(`[DEBUG] Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
    console.log('[DEBUG] Navigation successful.');

    console.log('[DEBUG] Getting page content...');
    const html = await page.content();
    console.log('[DEBUG] Got page content successfully.');
    
    console.log('[DEBUG] Parsing HTML with Cheerio...');
    const $ = cheerio.load(html);
    const mainContent = $('article.post').first().html();

    if (!mainContent) {
      throw new Error("Could not find the 'article.post' element. The site's structure may have changed.");
    }
    console.log('[DEBUG] Successfully found and parsed content.');

    return { content: mainContent };

  } catch (error) {
    // Log the entire error object for more details, not just the message
    console.error('[SCRAPER_ERROR] An error occurred:', error);
    return { error: 'Failed to fetch or parse data from Magisterium.' };

  } finally {
    if (browser !== null) {
      console.log('[DEBUG] Closing browser...');
      await browser.close();
      console.log('[DEBUG] Browser closed.');
    }
  }
}
