import { useEffect, useState } from "react";
import Message from "./Message";
import MessageType from "@/types/MessageType";
import AiResponseLoader from "./AiResponseLoader";
import SendButton from "./sendButton";

function AiChat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  function handleSend() {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setIsAiResponding(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "This is an AI response." },
      ]);
      setIsAiResponding(false);
    }, 500);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSend();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  useEffect(() => {
    const messagesContainer = document.querySelector(".messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="ai-chat-container h-full flex flex-col pb-2 gap-2">
      <div className="messages-container overflow-y-auto flex-1 flex flex-col gap-3 py-3 px-9 turjuman-scrollable">
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender} message={message.text} />
        ))}
        {isAiResponding && <AiResponseLoader />}
      </div>
      <div className="w-full px-4 md:px-9">
        <div className="bg-[var(--ai-input-bg)] w-full p-2 flex gap-3 rounded-lg justify-between ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-4/5 p-2 border border-gray-300 rounded bg-transparent border-none ring-0 outline-none"
          />
          <SendButton handleSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default AiChat;
