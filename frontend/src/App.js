import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Facebook,
  Home,
  Info,
  Instagram,
  Linkedin,
  PlayCircle,
  Twitter,
  Youtube,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import VideosPage from "@/pages/VideosPage";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import KwerkyAssistant from "@/components/shared/KwerkyAssistant";
import ContactDrawer from "@/components/shared/ContactDrawer";
import PreviewProvider from "@/components/PreviewProvider";
import { SiteActionsProvider, useSiteActions } from "@/context/site-actions";

const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About Us", icon: Info },
  { path: "/blogs", label: "Blogs", icon: BookOpen },
  { path: "/videos", label: "Videos", icon: PlayCircle },
];

const SERVICE_LINKS = [
  { label: "Content Creation", hash: "#content-creation" },
  { label: "Social Media", hash: "#social-media" },
  { label: "Video Ads", hash: "#video-ads" },
  { label: "Website Development", hash: "#website-development" },
  { label: "Graphic Designing", hash: "#graphic-designing" },
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@kwerkymedia25", icon: Youtube, testId: "nav-youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kwerky-media/", icon: Linkedin, testId: "nav-linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/kwerkymedia/", icon: Instagram, testId: "nav-instagram" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook, testId: "nav-facebook" },
  { label: "Twitter", href: "https://x.com/kwerkymedia", icon: Twitter, testId: "nav-twitter" },
];

const scrollToHash = (hash) => {
  const target = hash?.replace("#", "");
  if (!target) return;

  window.requestAnimationFrame(() => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
};

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

    const updateHoverState = (target) => {
      const isHover = target?.closest?.("a, button, input, textarea, select, label, [data-cursor-hover], .torch-text");
      cursor.classList.toggle("premium-cursor--hover", !!isHover);
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      overlay.style.setProperty("--cursor-x", `${event.clientX}px`);
      overlay.style.setProperty("--cursor-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--torch-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--torch-y", `${event.clientY}px`);
      updateHoverState(event.target);
      cursor.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
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

const Navigation = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactInfo } = useSiteActions();

  const activePath = location.pathname;

  const handleServiceNavigation = (hash) => {
    setMobileOpen(false);
    if (location.pathname === "/services") {
      navigate({ pathname: "/services", hash }, { replace: false });
      scrollToHash(hash);
      return;
    }

    navigate(`/services${hash}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 bg-black/94 backdrop-blur-sm theme-navbar-solid" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto flex items-center gap-3 px-5 py-3.5 sm:px-6">
        <Link to="/" className="group relative z-10 flex shrink-0 items-center gap-3" data-testid="nav-logo">
          <motion.div whileHover={{ scale: 1.04 }} className="rounded-full border border-blue-400/20 bg-[#030713] p-2 shadow-[0_0_26px_rgba(59,130,246,0.22)]">
            <img src="/brand/big-logo.png" alt="Kwerky Media" className="logo-mark h-12 w-auto sm:h-14" />
          </motion.div>
          <div className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-white">Kwerky</span>
            <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-[#ffb347]">Media</span>
          </div>
        </Link>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openContactInfo}
          className="hidden shrink-0 rounded-full border border-blue-400/25 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition-all hover:shadow-[0_20px_44px_rgba(37,99,235,0.35)] md:inline-flex"
          data-testid="nav-cta"
        >
          Let&apos;s discuss your project
        </motion.button>

        <div className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-5 md:flex">
          <div className="nav-shell flex items-center gap-5 rounded-full border border-white/10 bg-[#050816]/92 px-6 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.3)]">
            {NAV_LINKS.slice(0, 1).map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                    activePath === link.path ? "text-white" : "text-white/75 hover:text-[#ffb347]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigate("/services")}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  activePath === "/services" ? "text-white" : "text-white/75 hover:text-[#ffb347]"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>Services</span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full p-1 text-white/75 transition-colors hover:text-[#ffb347]"
                    aria-label="Open services menu"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="border-white/10 bg-[#070b16] text-white shadow-[0_24px_60px_rgba(0,0,0,0.48)]">
                  {SERVICE_LINKS.map((service) => (
                    <DropdownMenuItem
                      key={service.label}
                      className="cursor-pointer text-white/75 focus:bg-white/5 focus:text-[#ffb347]"
                      onSelect={() => handleServiceNavigation(service.hash)}
                    >
                      {service.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {NAV_LINKS.slice(1).map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                    activePath === link.path ? "text-white" : "text-white/75 hover:text-[#ffb347]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-switch inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/72 transition-colors hover:text-[#ffb347]"
          >
            {theme === "light" ? "White" : "Black"}
          </button>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-white/62 transition-colors hover:text-[#ffb347]"
                  data-testid={item.testId}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto text-white/75 md:hidden"
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-black/92 backdrop-blur-sm md:hidden"
          >
            <div className="space-y-3 px-5 py-4">
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85"
              >
                Switch to {theme === "light" ? "black" : "white"} theme
              </button>
              <button
                type="button"
                onClick={() => {
                  openContactInfo();
                  setMobileOpen(false);
                }}
                className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Let&apos;s discuss your project
              </button>

              <Link to="/" className={`block py-2 text-sm font-medium ${activePath === "/" ? "text-white" : "text-white/72"}`}>
                Home
              </Link>

              <details className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <summary
                  className="cursor-pointer list-none text-sm font-medium text-white/82"
                  onClick={(event) => {
                    if (!event.currentTarget.parentElement.open) {
                      navigate("/services");
                    }
                  }}
                >
                  Services
                </summary>
                <div className="mt-3 flex flex-col gap-2">
                  {SERVICE_LINKS.map((service) => (
                    <button
                      key={service.label}
                      type="button"
                      onClick={() => handleServiceNavigation(service.hash)}
                      className="text-left text-sm text-white/70 transition-colors hover:text-[#ffb347]"
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </details>

              {NAV_LINKS.slice(1).map((link) => (
                <Link key={link.path} to={link.path} className={`block py-2 text-sm font-medium ${activePath === link.path ? "text-white" : "text-white/72"}`}>
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/62 transition-colors hover:text-[#ffb347]" aria-label={item.label}>
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
};

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("kwerky-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("kwerky-theme", theme);
  }, [theme]);

  return (
    <div className={`App ${theme === "light" ? "theme-light" : "theme-dark"}`}>
      <BrowserRouter>
        <PreviewProvider>
          <SiteActionsProvider>
            <PremiumCursor />
            <Navigation
              theme={theme}
              onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/blogs/:slug" element={<BlogPostPage />} />
            </Routes>
            <WhatsAppButton />
            <ContactDrawer />
            <KwerkyAssistant />
          </SiteActionsProvider>
        </PreviewProvider>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
