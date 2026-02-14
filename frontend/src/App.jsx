import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    setReply("Thinking... 🤖");

   const response = await fetch(
  "https://gemini-backend-b40r.onrender.com/chat",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  }
);


    const data = await response.json();
    setReply(data.reply);
  }

  return (
    <div className="container">
      <h1>🚀 AI Gemini Hackathon Web App</h1>

      <textarea
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <div className="response">
        <h2>AI Response:</h2>

        {/* ✅ Markdown Formatted Output */}
        <ReactMarkdown>{reply}</ReactMarkdown>
      </div>
    </div>
  );
}
