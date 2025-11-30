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
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          language: "vi", // hoặc "en" nếu muốn
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        sender: "ai",
        text: data.success ? data.answer : "Có lỗi xảy ra khi gọi API",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        sender: "ai",
        text: "Không thể kết nối tới server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Nút bật/tắt chat */}
      <div className={styles.chatIcon} onClick={toggleChat}>
        <img src="/images/ChatBox_Logo.png" alt="AI Chat" />
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
                  msg.sender === "user" ? styles.userMessage : styles.aiMessage
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className={styles.aiMessage}>Đang trả lời AI...</div>
            )}
          </div>

          <div className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
