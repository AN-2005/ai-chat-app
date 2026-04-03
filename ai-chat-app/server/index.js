import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

app.listen(5000, () => console.log("Server running on port 5000"));