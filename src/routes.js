import express from "express";
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

export default router;
