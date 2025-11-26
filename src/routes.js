import express from "express";
import axios from "axios";
import { extractMetadata } from "./scraper.js";

const router = express.Router();

router.post("/metadata", async (req, res) => {
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
        "User-Agent": "Mozilla/5.0 ... Chrome/120",
      },
      timeout: 20000,
    });

    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(response.data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
