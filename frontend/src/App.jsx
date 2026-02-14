import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "✨ Thinking..." },
    ];

    setMessages(newMessages);
    setInput("");

    // Fetch AI response
    const response = await fetch(
      "https://gemini-backend-b40r.onrender.com/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      }
    );

    const data = await response.json();

    // Replace last AI thinking message with real reply
    newMessages[newMessages.length - 1] = {
      role: "ai",
      text: data.reply,
    };

    setMessages([...newMessages]);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="chat-container">
        {/* Header */}
        <header className="header">
          <h1>🤖 Gemini Hackathon Chat</h1>

          <button
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Chat Messages */}
        <div className="chat-box">
          {messages.length === 0 && (
            <p className="empty-text">
              Start chatting with your AI assistant 🚀
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "message user-msg"
                  : "message ai-msg"
              }
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import ReactMarkdown from "react-markdown";

// export default function App() {
//   const [input, setInput] = useState("");
//   const [reply, setReply] = useState("");

//   async function sendMessage() {
//     setReply("Thinking... 🤖");

//    const response = await fetch(
//   "https://gemini-backend-b40r.onrender.com/chat",
//   {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message: input }),
//   }
// );


//     const data = await response.json();
//     setReply(data.reply);
//   }

//   return (
//     <div className="container">
//       <h1>🚀 AI Gemini Hackathon Web App</h1>

//       <textarea
//         placeholder="Ask something..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button onClick={sendMessage}>Send</button>

//       <div className="response">
//         <h2>AI Response:</h2>

//         {/* ✅ Markdown Formatted Output */}
//         <ReactMarkdown>{reply}</ReactMarkdown>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";

// export default function App() {
//   const [input, setInput] = useState("");
//   const [reply, setReply] = useState("");

//   async function sendMessage() {
//     if (!input.trim()) return;

//     setReply("✨ Thinking... Please wait");

//     const response = await fetch(
//       "https://gemini-backend-b40r.onrender.com/chat",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       }
//     );

//     const data = await response.json();
//     setReply(data.reply);
//   }

//   return (
//     <div className="container">
//       <h1>🚀 AI Gemini Hackathon Assistant</h1>

//       <textarea
//         placeholder="Ask something like: Generate resume summary for Java developer..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button onClick={sendMessage}>Send to AI</button>

//       <div className="response">
//         <h2>AI Response:</h2>

//         {reply.includes("Thinking") ? (
//           <p className="loading">{reply}</p>
//         ) : (
//           <ReactMarkdown>{reply}</ReactMarkdown>
//         )}
//       </div>
//     </div>
//   );
// }
