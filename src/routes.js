import express from "express";
import axios from "axios";
import { extractMetadata } from "./scraper.js";
import { JSDOM } from "jsdom";

const router = express.Router();

router.get("/metadata", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const result = await extractMetadata(url);
  res.json(result);
});

router.get("/view-html", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
      timeout: 20000,
    });

    const dom = new JSDOM(response.data);
    dom.window.document.querySelectorAll("script").forEach((s) => s.remove());
    const prettyHtml = dom.window.document.documentElement.outerHTML;

    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(prettyHtml);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
