import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Info, BookOpen, PlayCircle, Youtube, Linkedin, Instagram, Facebook, Twitter, X } from "lucide-react";

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import VideosPage from "@/pages/VideosPage";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import KwerkyAssistant from "@/components/shared/KwerkyAssistant";
import { MenuBar } from "@/components/ui/glow-menu";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@kwerkymedia25", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kwerky-media/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/kwerkymedia/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/kwerkymedia/", icon: Facebook },
  { label: "Twitter", href: "https://x.com/kwerkymedia", icon: Twitter },
];

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About Us" },
  { path: "/blogs", label: "Blogs" },
  { path: "/videos", label: "Videos" },
];

const MENU_ITEMS = [
  { icon: Home, label: "Home", href: "/", gradient: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(37,99,235,0.08) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-300" },
  {
    icon: Briefcase,
    label: "Services",
    href: "/services",
    gradient: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(37,99,235,0.08) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-300",
    subItems: [
      { label: "Website Content", href: "/services#website-content" },
      { label: "Blogs", href: "/services#blogs" },
      { label: "Social Media", href: "/services#social-media" },
      { label: "Slide Decks", href: "/services#slide-decks" },
      { label: "Videos", href: "/services#videos" },
    ],
  },
  { icon: Info, label: "About Us", href: "/about", gradient: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.08) 50%, rgba(30,64,175,0) 100%)", iconColor: "text-blue-300" },
  { icon: BookOpen, label: "Blogs", href: "/blogs", gradient: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(29,78,216,0.08) 50%, rgba(30,64,175,0) 100%)", iconColor: "text-blue-300" },
  { icon: PlayCircle, label: "Videos", href: "/videos", gradient: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(59,130,246,0.08) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-400" },
];

const PremiumCursor = () => {
  const cursorRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return undefined;

    const cursor = cursorRef.current;
    const overlay = overlayRef.current;
    if (!cursor || !overlay) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;
    const interactiveSelector = "a, button, input, textarea, select, label, [data-cursor-hover]";

    const updateHoverState = (hovered) => {
      cursor.classList.toggle("premium-cursor--hover", hovered);
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      overlay.style.setProperty("--cursor-x", `${event.clientX}px`);
      overlay.style.setProperty("--cursor-y", `${event.clientY}px`);
      const isHover = event.target?.closest?.(interactiveSelector);
      updateHoverState(!!isHover);
      cursor.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={overlayRef} className="premium-cursor-overlay" aria-hidden="true" />
      <div ref={cursorRef} className="premium-cursor" aria-hidden="true" />
    </>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeItem = NAV_LINKS.find((link) => link.path === location.pathname)?.label ?? "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowContactInfo(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-black/92 border-b border-white/8 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 py-3.5 flex items-center justify-between gap-5 sm:px-6">
          <div className="flex flex-1 items-center gap-5">
            <Link to="/" className="flex items-center gap-2.5 group relative z-10 min-w-0 shrink-0" data-testid="nav-logo">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative flex items-center justify-center rounded-full border border-[#3B82F6]/20 bg-[#02080f] p-2 shadow-[0_0_30px_rgba(59,130,246,0.22)]"
              >
                <img
                  src="/brand/big-logo.png"
                  alt="Kwerky Media"
                  className="h-14 w-auto animate-logo-glow"
                />
              </motion.div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Kwerky</span>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FF9B30]">Media</span>
              </div>
            </Link>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowContactInfo((value) => !value)}
              className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-[#FF9B30] px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.3)] transition-all hover:shadow-[0_24px_64px_rgba(59,130,246,0.35)]"
              data-testid="nav-cta"
            >
              Let's discuss your project
            </motion.button>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-end gap-4 lg:gap-6">
            <MenuBar
              items={MENU_ITEMS}
              activeItem={activeItem}
              onItemClick={(label) => {
                // Search for the item in main menu items
                const mainItem = MENU_ITEMS.find((entry) => entry.label === label);
                if (mainItem) {
                  navigate(mainItem.href);
                  return;
                }
                
                // Search for the item in subItems
                for (const item of MENU_ITEMS) {
                  if (item.subItems) {
                    const subItem = item.subItems.find((sub) => sub.label === label);
                    if (subItem) {
                      navigate(subItem.href);
                      return;
                    }
                  }
                }
              }}
              className="max-w-full scale-[0.96] origin-center"
            />

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition-colors hover:text-[#FF9B30]"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden z-10 text-white/70"
            data-testid="mobile-menu-toggle"
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="border-t border-white/10 bg-[#02060f] px-5 py-5 md:px-6"
            >
              <div className="container mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF9B30]">Contact Info</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/60">Phone</p>
                      <a href="tel:08031548088" className="text-white text-sm font-semibold">08031548088</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/60">Email</p>
                      <a href="mailto:hello@kwerkymedia.com" className="text-white text-sm font-semibold">hello@kwerkymedia.com</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/60">Schedule</p>
                      <a
                        href="https://calendly.com/placeholder"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#1E40AF] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563eb]"
                      >
                        Schedule Call
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#1f2937] hover:text-[#FF9B30]"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowContactInfo(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
                    aria-label="Close contact info"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/5"
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-2 ${
                      location.pathname === link.path ? "text-[#FF9B30]" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setShowContactInfo((value) => !value);
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563eb]"
                >
                  Let's discuss your project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
        </Routes>
        <WhatsAppButton />
        <KwerkyAssistant />
        <PremiumCursor />
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
