import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Replace with your new local IP
const socket = io("http://192.168.6.153:5000");

export default function ChatApp() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message !== "" && username !== "") {
      socket.emit("send_message", { username, message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.username}:</b> {msg.message}</p>
        ))}
      </div>
    </div>
  );
}
