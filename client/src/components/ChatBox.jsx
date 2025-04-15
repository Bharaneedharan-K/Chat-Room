// src/components/ChatBox.jsx
import React, { useEffect, useState } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [username, setUsername] = useState("");

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !username.trim()) return;

    await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: username, content: newMsg }),
    });

    setNewMsg("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <h2>🌍 Global Chat</h2>
      <input
        className="input"
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        className="input"
        type="text"
        placeholder="Type your message"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="btn" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
