import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import streamsRouter from "./routes/streams";
//import youtubeRoutes from "./routes/youtube";
import { syncYouTubeLives } from "./services/youtubeSync";

//YOUTUBE_CHANNEL_IDS=UCNsidkYpIAQ4QaufptQBPHQ,UCcuadYD11H2Eti8AEOP7Buw,UCfC0RcYzDQcFtHrce2mpvbA
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
app.use("/uploads", express.static("uploads"));

app.listen(3001, async () => {
  console.log("Server started on 3001");

  await syncYouTubeLives();
  //await syncYouTubeStreams();
});

export default app;
