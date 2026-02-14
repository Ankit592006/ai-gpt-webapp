import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

    const res = await axios.get(url);

    console.log("✅ Supported Models:\n");

    res.data.models.forEach((model) => {
      console.log("Model Name:", model.name);
      console.log("Supported Methods:", model.supportedGenerationMethods);
      console.log("-----------------------------------");
    });
  } catch (err) {
    console.log("❌ Error listing models:", err.response.data);
  }
}

listModels();
