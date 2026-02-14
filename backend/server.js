import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { buildPrompt } from "./prompt.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// Test route
app.get("/", (req, res) => {
  res.send("Gemini Backend Running 🚀");
});

// Main AI route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Prompt Layer
    const finalPrompt = buildPrompt(userMessage);

    // ✅ Correct Supported Model
    const url =
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: finalPrompt }],
        },
      ],
    });

    const reply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
