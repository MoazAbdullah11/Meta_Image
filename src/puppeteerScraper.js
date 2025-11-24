import puppeteer from "puppeteer";

export async function scrapeMetadata(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        const metadata = await page.evaluate(() => {
            return {
                title: document.querySelector("meta[property='og:title']")?.content ||
                       document.title || null,
                description: document.querySelector("meta[name='description']")?.content ||
                             document.querySelector("meta[property='og:description']")?.content || null,
                image: document.querySelector("meta[property='og:image']")?.content || null,
                favicon: document.querySelector("link[rel='icon']")?.href ||
                         document.querySelector("link[rel='shortcut icon']")?.href || null
            };
        });

        await browser.close();
        return metadata;

    } catch (error) {
        return { error: "Scraping failed", details: error.message };
    }
}
