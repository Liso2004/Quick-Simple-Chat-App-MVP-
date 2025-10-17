import { useState,useEffect } from "react";
import{io} from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp(){
    const[username, setusername] = useState ("");
    const[message, setmessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chat message", (msg) => {
          setMessages((prev) => [...prev, msg]);
        });
        return () => socket.off("chat message");
      }, []);
    
      const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
          const msgObj = {
            user: username || "Anonymous",
            text: message,
            time: new Date().toLocaleTimeString(),
          };
          socket.emit("chat message", msgObj);
          setMessage("");
        }
      };
      return (
        <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "sans-serif" }}>
          <h2>💬 Chat App</h2>
    
          {!username && (
            <div>
              <input
                type="text"
                placeholder="Enter your name..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
    
          <div
            style={{
              border: "1px solid #ccc",
              padding: 10,
              height: 250,
              overflowY: "auto",
              margin: "10px 0",
            }}
          >
            {messages.map((msg, i) => (
              <p key={i}>
                <strong>{msg.user}</strong> [{msg.time}]: {msg.text}
              </p>
            ))}
          </div>
    
          <form onSubmit={sendMessage} style={{ display: "flex", gap: "5px" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ flex: 1, padding: 5 }}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      );
    }