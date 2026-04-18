import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, X, Home, Briefcase, Info, BookOpen, PlayCircle, MessageCircleMore } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import KwerkyRobotArt from "@/components/shared/KwerkyRobotArt";

const API_BASE = process.env.REACT_APP_BACKEND_URL?.trim();
const API = API_BASE ? `${API_BASE}/api` : null;

const SUGGESTIONS = [
  "What does Kwerky Media do?",
  "Take me to Services",
  "How can I contact Kwerky Media?",
  "Tell me about the founders.",
];

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi, I’m Kwerky AI. I can guide you through the whole Kwerky Media website, from Home to Contact, and I can answer questions about services, founders, blogs, and videos.",
  },
];

const SITE_ACTIONS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Services", icon: Briefcase, path: "/services" },
  { label: "About Us", icon: Info, path: "/about" },
  { label: "Blogs", icon: BookOpen, path: "/blogs" },
  { label: "Videos", icon: PlayCircle, path: "/videos" },
  { label: "Contact", icon: MessageCircleMore, path: "/services", hash: "#contact-section" },
];

const SITE_SECTIONS = [
  { label: "Hero", path: "/", hash: "#hero-section" },
  { label: "Value", path: "/", hash: "#value-section" },
  { label: "Services", path: "/", hash: "#services-section" },
  { label: "Proof", path: "/", hash: "#proof-section" },
  { label: "CTA", path: "/", hash: "#cta-section" },
];

const KwerkyAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isSending, setIsSending] = useState(false);
  const viewportRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const scrollToHash = (hash) => {
    if (!hash) return;
    const targetId = hash.replace("#", "");
    window.requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const navigateTo = (path, hash) => {
    setOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      if (hash) {
        window.setTimeout(() => scrollToHash(hash), 150);
      }
      return;
    }

    scrollToHash(hash);
  };

  const resolveRouteIntent = (messageText) => {
    const text = messageText.toLowerCase();

    if (text.includes("contact") || text.includes("reach") || text.includes("email") || text.includes("phone")) {
      return {
        reply: "Opening the Contact section for you.",
        path: "/services",
        hash: "#contact-section",
      };
    }

    if (text.includes("home")) {
      if (text.includes("value")) {
        return { reply: "Jumping to the Value section.", path: "/", hash: "#value-section" };
      }
      if (text.includes("service")) {
        return { reply: "Jumping to the Services section.", path: "/", hash: "#services-section" };
      }
      if (text.includes("proof") || text.includes("testimonial")) {
        return { reply: "Jumping to the Proof section.", path: "/", hash: "#proof-section" };
      }
      if (text.includes("cta")) {
        return { reply: "Jumping to the CTA section.", path: "/", hash: "#cta-section" };
      }
      return { reply: "Opening the Home page.", path: "/", hash: "#hero-section" };
    }

    if (text.includes("service")) {
      return {
        reply: "Opening Services.",
        path: "/services",
        hash: null,
      };
    }

    if (text.includes("about")) {
      return { reply: "Opening About Us.", path: "/about", hash: null };
    }

    if (text.includes("blog")) {
      return { reply: "Opening Blogs.", path: "/blogs", hash: null };
    }

    if (text.includes("video")) {
      return { reply: "Opening Videos.", path: "/videos", hash: null };
    }

    return null;
  };

  const localReply = (message) => {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello. I’m Kwerky AI. I can help you explore the whole website, jump to pages, or answer questions about services, founders, blogs, videos, and contact details.";
    }

    if (text.includes("bye") || text.includes("goodbye") || text.includes("see you")) {
      return "Bye for now. If you need anything later, I can take you to Services, About Us, Blogs, Videos, or the Contact section.";
    }

    if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
      return "You can reach Kwerky Media at hello@kwerkymedia.com or 08031548088. I can also open the Contact section on the Services page for you.";
    }

    if (text.includes("founder") || text.includes("shashi") || text.includes("mithun")) {
      return "The founders are Shashikanth Peetla and Mithun Mohan. Shashikanth leads tech storytelling and content, while Mithun leads client relationships and delivery. I can take you to About Us.";
    }

    if (text.includes("service") || text.includes("blog") || text.includes("video") || text.includes("social")) {
      return "Kwerky Media offers website content, blogs, social media posts, slide decks, and videos for tech companies. I can open any of those pages for you.";
    }

    if (text.includes("home") || text.includes("value") || text.includes("proof") || text.includes("cta")) {
      return "The Home page has five sections: Hero, Value, Services, Proof, and CTA. I can jump you there instantly.";
    }

    return "I can help with Kwerky Media’s full website journey, from the home hero to contact. Try asking about services, founders, blogs, videos, or say 'take me to Services'.";
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

    const routeIntent = resolveRouteIntent(text);
    if (routeIntent) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: routeIntent.reply,
        },
      ]);
      navigateTo(routeIntent.path, routeIntent.hash);
      setIsSending(false);
      return;
    }

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
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-black/70 px-3 py-2.5 text-left text-white shadow-[0_20px_50px_rgba(37,99,235,0.2)] backdrop-blur-xl transition-colors hover:border-blue-400/30 hover:bg-black/80"
        aria-label="Open AI assistant"
        data-testid="assistant-toggle"
      >
        <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-[#050b16]">
          <KwerkyRobotArt compact className="h-full w-full scale-[1.1]" />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">
            <Sparkles className="h-3.5 w-3.5" />
            Kwerky AI
          </div>
          <div className="mt-1 text-sm text-white/72">Ask me anything</div>
        </div>
      </motion.button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[88vh] border-white/10 bg-[#02040b] text-white md:mx-auto md:max-w-[28rem]">
          <DrawerHeader className="border-b border-white/10 px-5 pb-4 pt-3 text-left">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#050b16]">
                <KwerkyRobotArt compact className="h-full w-full scale-[1.05]" />
              </div>
              <div className="min-w-0">
                <DrawerTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                  Kwerky AI
                </DrawerTitle>
                <DrawerDescription className="text-white/45">
                  I can guide visitors from hello to bye across the full Kwerky Media site.
                </DrawerDescription>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SITE_SECTIONS.map((section) => (
                <button
                  key={section.label}
                  type="button"
                  onClick={() => navigateTo(section.path, section.hash)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </DrawerHeader>

          <div className="flex h-full min-h-0 flex-col px-3 pb-3">
            <ScrollArea className="min-h-0 flex-1 pr-2">
              <div
                ref={viewportRef}
                className="flex h-full flex-col gap-2.5 py-3"
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

            <div className="mt-3 space-y-2.5">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item === "Take me to Services") {
                        navigateTo("/services", "#contact-section");
                        return;
                      }
                      sendMessage(item);
                    }}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {SITE_ACTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigateTo(item.path, item.hash)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2.5">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="min-h-[82px] border-0 bg-transparent px-1 text-white placeholder:text-white/30 focus-visible:ring-0"
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
