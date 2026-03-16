/*import express from "express";
import { getLiveFromChannel } from "../lib/youtube";

const router = express.Router();

router.get("/streams", async (req, res) => {
  const { channelId } = req.query;

  if (!channelId || typeof channelId !== "string") {
    return res.status(400).json({ error: "channelId is required" });
  }

  try {
    const lives = await getLiveFromChannel(channelId);
    res.json(lives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch live videos" });
  }
});

export default router;
*/