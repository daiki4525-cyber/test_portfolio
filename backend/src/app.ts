import express from "express";
import authRoutes from "./routes/auth";
import streamRoutes from "./routes/streams";


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/streams", streamRoutes); // ← これが無いと Cannot POST

export default app;
