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
  "What do you do?",
  "Why Kwerky?",
  "What services?",
  "Pricing?",
];

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi — how can I help you with your content or growth today?",
  },
];

const defaultLead = {
  name: "",
  email: "",
  product: "",
  audience: "",
  problem: "",
  stage: "greet",
  email_sent: false,
};

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
  const [lead, setLead] = useState(defaultLead);
  const [isSending, setIsSending] = useState(false);
  const viewportRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("kwerky-assistant-lead");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLead({ ...defaultLead, ...parsed });
      }
    } catch {
      // ignore persistence errors
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem("kwerky-assistant-lead", JSON.stringify(lead));
    } catch {
      // ignore persistence errors
    }
  }, [lead]);

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
      return "Hi — how can I help you with your content or growth today?";
    }

    if (text.includes("bye") || text.includes("goodbye") || text.includes("see you")) {
      return "Bye for now. If you need anything later, I can take you to Services, About Us, Blogs, Videos, or Contact.";
    }

    if (text.includes("price") || text.includes("pricing") || text.includes("cost") || text.includes("budget")) {
      return "Pricing depends on your product, stage, and goals. Let’s discuss your project and suggest the right approach.";
    }

    if (text.includes("what do you do") || text.includes("who are you") || text.includes("what is kwerky")) {
      return "We help tech companies turn complex products into clear, high-conversion messaging.";
    }

    if (text.includes("why") || text.includes("choose")) {
      return "Most agencies focus on content output. We focus on clarity and conversion. If your product is complex, we make it simple and compelling.";
    }

    if (text.includes("service") || text.includes("blog") || text.includes("video") || text.includes("social")) {
      return "We work on content creation, social media, video content, blogs, and website content. All focused on improving how your product is understood.";
    }

    if (text.includes("startup") || text.includes("early")) {
      return "If you're early-stage, getting your messaging right now saves time and cost later.";
    }

    if (text.includes("scale") || text.includes("growth")) {
      return "If you're scaling, we refine your messaging to improve conversion and engagement.";
    }

    return "I can help with services, founders, blogs, videos, contact details, or project discussion. Ask me anything about the site.";
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

      const response = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-6),
          lead,
        }),
      });

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      const data = await response.json();
      if (data.lead) {
        setLead({ ...defaultLead, ...data.lead });
      }
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
        className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-black/76 px-2.5 py-2 text-left text-white shadow-[0_20px_50px_rgba(37,99,235,0.18)] backdrop-blur-xl transition-colors hover:border-blue-400/30 hover:bg-black/84 sm:bottom-6 sm:left-6 sm:px-3 sm:py-2.5"
        aria-label="Open AI assistant"
        data-testid="assistant-toggle"
      >
        <div className="h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-[#050b16] sm:h-12 sm:w-12">
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
        <DrawerContent className="h-[86vh] w-[calc(100vw-0.75rem)] max-w-[24rem] border-white/10 bg-[#02040b] text-white md:mx-auto md:max-w-[23rem]">
          <DrawerHeader className="border-b border-white/10 px-4 pb-3 pt-3 text-left sm:px-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050b16] sm:h-14 sm:w-14">
                <KwerkyRobotArt compact className="h-full w-full scale-[1.05]" />
              </div>
              <div className="min-w-0">
                <DrawerTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                  Kwerky AI
                </DrawerTitle>
                <DrawerDescription className="text-white/45">
                  Short answers. Clear guidance. Project-focused.
                </DrawerDescription>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {SITE_SECTIONS.map((section) => (
                <button
                  key={section.label}
                  type="button"
                  onClick={() => navigateTo(section.path, section.hash)}
                  className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </DrawerHeader>

          <div className="flex h-full min-h-0 flex-col px-2 pb-2 sm:px-3 sm:pb-3">
            <ScrollArea className="min-h-0 flex-1 pr-2">
              <div
                ref={viewportRef}
                className="flex h-full flex-col gap-2 py-2 sm:gap-2.5 sm:py-3"
              >
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[88%] sm:px-4 sm:py-3 ${
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

            <div className="mt-2.5 space-y-2 sm:mt-3 sm:space-y-2.5">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item === "What services?") {
                        sendMessage(item);
                        return;
                      }
                      if (item === "Pricing?") {
                        sendMessage(item);
                        return;
                      }
                      if (item === "Why Kwerky?") {
                        sendMessage(item);
                        return;
                      }
                      if (item === "What do you do?") {
                        sendMessage(item);
                        return;
                      }
                      sendMessage(item);
                    }}
                    className="rounded-full border border-white/10 px-2.5 py-1.5 text-[11px] text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300 sm:px-3 sm:py-2 sm:text-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {SITE_ACTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigateTo(item.path, item.hash)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1.5 text-[11px] text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300 sm:px-3 sm:py-2 sm:text-xs"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="min-h-[72px] border-0 bg-transparent px-1 text-white placeholder:text-white/30 focus-visible:ring-0 sm:min-h-[82px]"
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      sendMessage(input);
                    }
                  }}
                />
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMessages(starterMessages);
                      setLead(defaultLead);
                    }}
                    className="inline-flex items-center gap-2 text-[11px] text-white/35 transition-colors hover:text-white/60 sm:text-xs"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset
                  </button>

                  <Button
                    type="button"
                    onClick={() => sendMessage(input)}
                    disabled={!canSend}
                    className="rounded-full bg-blue-600 px-4 text-white hover:bg-blue-500 sm:px-5"
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
