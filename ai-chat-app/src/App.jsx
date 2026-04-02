import { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMessage = {
        sender: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error getting response ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">

      {/* Header */}
      <h1 className="text-center text-2xl font-bold p-4 border-b border-gray-700">
        AI Chat App 🤖
      </h1>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 ml-auto"
                : "bg-gray-700 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="bg-gray-700 p-3 rounded-lg w-fit">
            Typing...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex">
        <input
          className="flex-1 p-2 rounded-l bg-gray-800 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-600 px-4 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default App;