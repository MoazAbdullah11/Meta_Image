import axios from "axios";
import * as cheerio from "cheerio";

export async function extractMetadata(url) {
  try {
    // Fetch HTML using Axios
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 ... Chrome/120",
        Accept: "text/html,application/xhtml+xml",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
      },
      timeout: 20000,
    });

    const html = response.data;

    // Load into cheerio
    const $ = cheerio.load(html);

    const get = (sel) => $(sel).attr("content") || $(sel).text() || null;

    const data = {
      title: $("title").text() || null,
      description: get("meta[name='description']"),
      ogTitle: get("meta[property='og:title']"),
      ogDescription: get("meta[property='og:description']"),
      ogImage: get("meta[property='og:image']"),
      favicon:
        $("link[rel='icon']").attr("href") ||
        $("link[rel='shortcut icon']").attr("href") ||
        null,
      success: true,
    };

    return data;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}
