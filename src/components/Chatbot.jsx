import React, { useMemo, useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am your Blood Donation assistant. Ask about donation times, registration, or urgent contacts.",
    },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = useMemo(
    () => [
      "How do I register as donor?",
      "When can I donate?",
      "Emergency contacts",
      "Where is M-Pesa payment?",
    ],
    []
  );

  const getBotReply = (text) => {
    const normalized = text.toLowerCase();

    if (normalized.includes("register")) {
      return "Go to Register Donor in the navbar, fill your details, and submit. Our team verifies and lists you for matching requests.";
    }
    if (normalized.includes("when") || normalized.includes("donate")) {
      return "Most healthy adults can donate every 3 months. Visit Schedule Donation to book an available slot quickly.";
    }
    if (normalized.includes("emergency") || normalized.includes("contact")) {
      return "For urgent blood requests call +254 700 000 111 or email support@blooddonationnetwork.org any time.";
    }
    if (normalized.includes("mpesa") || normalized.includes("payment")) {
      return "Open the request flow and proceed to the M-Pesa page to complete support payments securely.";
    }
    return "I can help with donor registration, appointment scheduling, and emergency contacts. Try one of the quick options below.";
  };

  const sendMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText) {
      return;
    }

    const nextMessages = [
      ...messages,
      { sender: "user", text: cleanText },
      { sender: "bot", text: getBotReply(cleanText) },
    ];

    setMessages(nextMessages);
    setInput("");
  };

  return (
    <div className="chatbot-wrapper">
      {open && (
        <div className="chatbot-card shadow">
          <div className="chatbot-header">
            <h6 className="mb-0 fw-semibold">Assistance Chat</h6>
            <button
              type="button"
              className="btn btn-sm bdn-btn-outline-light"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, idx) => (
              <div
                key={`${message.sender}-${idx}`}
                className={`chat-message ${message.sender === "user" ? "user" : "bot"}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chatbot-quick-replies">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                className="btn btn-sm bdn-btn-outline"
                onClick={() => sendMessage(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chatbot-input-row">
            <input
              type="text"
              className="form-control bdn-input"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                }
              }}
            />
            <button type="button" className="btn bdn-btn" onClick={() => sendMessage(input)}>
              Send
            </button>
          </div>
        </div>
      )}

      <button type="button" className="btn bdn-btn chatbot-toggle" onClick={() => setOpen(!open)}>
        {open ? "Hide Assistant" : "Need Help? Chat With Us"}
      </button>
    </div>
  );
};

export default Chatbot;
