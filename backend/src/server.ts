import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import streamsRouter from "./routes/streams";
//import youtubeRoutes from "./routes/youtube";
import { syncYouTubeStreams } from "./services/youtubeSync";
import channelRoutes from "./routes/channels";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/streams", streamsRouter);
//app.use("/api/youtube", youtubeRoutes);
app.use("/api/channels", channelRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3001, async () => {
  console.log("Server started on 3001");

  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) {
    console.error("YOUTUBE_CHANNEL_ID is not set!");
    return;
  }

  // 開発中はスキップ
  if (process.env.USE_MOCK === "true") {
    console.log("[sync] SKIP（USE_MOCK=true）");
    return;
  }

  await syncYouTubeStreams([channelId]);

  // 定期同期（3分ごと）
  setInterval(() => {
    syncYouTubeStreams([channelId]);
  }, 3 * 60 * 1000);
});

export default app;
