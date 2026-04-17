import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Send, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const API_BASE = process.env.REACT_APP_BACKEND_URL?.trim();
const API = API_BASE ? `${API_BASE}/api` : null;

const SUGGESTIONS = [
  "What does Kwerky Media do?",
  "How can I contact Kwerky Media?",
  "Tell me about the founders.",
];

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi, I’m Kwerky AI. I can answer questions about the services, founders, blogs, videos, and contact details on this site.",
  },
];

const KwerkyAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isSending, setIsSending] = useState(false);
  const viewportRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const localReply = (message) => {
    const text = message.toLowerCase();

    if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
      return "You can reach Kwerky Media at hello@kwerkymedia.com or 08031548088. The Services page also has the contact form.";
    }

    if (text.includes("founder") || text.includes("shashi") || text.includes("mithun")) {
      return "The founders are Shashikanth Peetla and Mithun Mohan. Shashikanth leads tech storytelling and content, while Mithun leads client relationships and delivery.";
    }

    if (text.includes("service") || text.includes("blog") || text.includes("video") || text.includes("social")) {
      return "Kwerky Media offers website content, blogs, social media posts, slide decks, and videos for tech companies.";
    }

    return "I can help with Kwerky Media’s services, founders, blogs, videos, or contact details. Ask me anything about the site.";
  };

  useEffect(() => {
    if (!viewportRef.current) return;
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async (messageText) => {
    const text = messageText.trim();
    if (!text || isSending) return;

    const userMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      if (!API) {
        throw new Error("No backend configured");
      }

      const response = await fetch(`${API}/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-6),
        }),
      });

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "I’m here to help with Kwerky Media.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: API
            ? "I’m having a quick connection issue. You can still check the Services and About pages, or contact hello@kwerkymedia.com."
            : localReply(text),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-500"
        aria-label="Open AI assistant"
        data-testid="assistant-toggle"
      >
        <Bot className="h-5 w-5" />
        <span className="hidden sm:inline">Kwerky AI</span>
      </motion.button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[90vh] border-white/10 bg-[#020817] text-white md:mx-auto md:max-w-2xl">
          <DrawerHeader className="border-b border-white/10 px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-blue-300" />
              Kwerky AI Assistant
            </DrawerTitle>
            <DrawerDescription className="text-white/45">
              Ask anything about Kwerky Media. Mobile-friendly and fast.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex h-full min-h-0 flex-col px-4 pb-4">
            <ScrollArea className="min-h-0 flex-1 pr-2">
              <div
                ref={viewportRef}
                className="flex h-full flex-col gap-3 py-4"
              >
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto bg-blue-600 text-white"
                        : "mr-auto bg-white/[0.04] text-white/80"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="min-h-[96px] border-0 bg-transparent px-1 text-white placeholder:text-white/30 focus-visible:ring-0"
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      sendMessage(input);
                    }
                  }}
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setMessages(starterMessages)}
                    className="inline-flex items-center gap-2 text-xs text-white/35 transition-colors hover:text-white/60"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset
                  </button>

                  <Button
                    type="button"
                    onClick={() => sendMessage(input)}
                    disabled={!canSend}
                    className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-500"
                  >
                    {isSending ? "Thinking..." : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default KwerkyAssistant;
