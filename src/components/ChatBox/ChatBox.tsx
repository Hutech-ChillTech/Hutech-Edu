import React, { useState } from "react";
import styles from "../../styles/ChatBox.module.css";


interface Message {
  sender: "user" | "ai";
  text: string;
}

const ChatBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Giả lập phản hồi AI
    const aiMessage: Message = {
      sender: "ai",
      text: `AI trả lời: "${input}" (ví dụ phản hồi)` 
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Nút bật/tắt chat */}
      <div className={styles.chatIcon} onClick={toggleChat}>
        <img 
          src="/images/ChatBox_Logo.png" 
          alt="AI Chat" 
        />
      </div>

      {/* Chatbox */}
      {open && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>AI Tutor</div>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.aiMessage
                }
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
