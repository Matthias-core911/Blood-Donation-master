import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_REPLIES = [
  "How do I register?",
  "When can I donate?",
  "Emergency contacts",
  "Where is M-Pesa payment?",
];

function getBotReply(text: string) {
  const t = text.toLowerCase();
  if (t.includes("register")) {
    return "Go to Donate → Register as a donor, fill in your details, and you're set. We only reach out when someone nearby needs your blood type.";
  }
  if (t.includes("when") || t.includes("donate")) {
    return "Most healthy adults can donate every 3 months. Check Donate for full eligibility, then schedule a slot after choosing a request or donor.";
  }
  if (t.includes("emergency") || t.includes("contact")) {
    return "For urgent blood requests, browse Find Blood or Requests for the closest match, or reach our team through the About page.";
  }
  if (t.includes("mpesa") || t.includes("payment")) {
    return "The Lipa na M-Pesa page opens automatically after you schedule a donation appointment, to complete the service fee.";
  }
  return "I can help with donor registration, scheduling, and finding blood. Try one of the quick options below.";
}

type ChatMessage = { sender: "bot" | "user"; text: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi! I'm your Lifeline assistant. Ask about registering, scheduling, or finding blood nearby.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: clean },
      { sender: "bot", text: getBotReply(clean) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-lift">
          <div className="flex items-center justify-between grad-blood px-4 py-3 text-white">
            <h2 className="text-sm font-semibold">Lifeline Assistant</h2>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug",
                  m.sender === "user"
                    ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-secondary text-secondary-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t px-3.5 py-2.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type your question…"
              className="h-9 flex-1 rounded-full border bg-background px-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              onClick={() => sendMessage(input)}
              aria-label="Send"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full grad-blood px-5 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.03]"
      >
        {open ? <X className="size-4" /> : <MessageCircle className="size-4" />}
        {open ? "Hide assistant" : "Need help?"}
      </button>
    </div>
  );
}
