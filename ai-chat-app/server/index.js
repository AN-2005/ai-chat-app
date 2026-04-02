import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ NEW API (IMPORTANT)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  let reply;

  if (message.toLowerCase().includes("hello")) {
    reply = "Hello! How can I help you today? 😊";
  } else if (message.toLowerCase().includes("react")) {
    reply = "React is a powerful frontend library 🚀";
  } else if (message.toLowerCase().includes("job")) {
    reply = "Keep building projects and applying consistently 💼";
  } else {
    reply = "You said: " + message + " 🤖";
  }

  res.json({ reply });
});


app.listen(5000, () => console.log("Server running on port 5000"));