import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Facebook, Home, Instagram, Linkedin, PlayCircle, Twitter, Youtube, BookOpen, Briefcase, Info } from "lucide-react";
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
import { SiteActionsProvider, useSiteActions } from "@/context/site-actions";
import PreviewProvider from "@/components/PreviewProvider";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/blogs", label: "Blogs" },
  { path: "/videos", label: "Videos" },
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

const CursorAura = () => {
  const auraRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion || !auraRef.current) return undefined;

    const aura = auraRef.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      aura.style.opacity = "1";
      document.documentElement.style.setProperty("--torch-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--torch-y", `${event.clientY}px`);
    };

    const onLeave = () => {
      aura.style.opacity = "0";
      document.documentElement.style.setProperty("--torch-x", "50%");
      document.documentElement.style.setProperty("--torch-y", "50%");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;
      aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
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
    <div ref={auraRef} className="cursor-aura" aria-hidden="true">
      <div className="cursor-aura-core" />
    </div>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactInfo } = useSiteActions();
  const activeItem = NAV_LINKS.find((link) => link.path === location.pathname)?.label ?? "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/96 border-b border-white/8 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto flex items-center gap-3 px-5 py-3.5 sm:px-6 lg:gap-4">
        <Link to="/" className="flex items-center gap-3 group relative z-10 min-w-0 shrink-0" data-testid="nav-logo">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            src="/brand/big-logo.png"
            alt="Kwerky Media"
            className="h-12 w-auto sm:h-14 md:h-[4.75rem] logo-mark"
          />
          <span className="hidden lg:block text-sm font-semibold tracking-[0.24em] uppercase text-white/55">
            Kwerky Media
          </span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openContactInfo}
          className="hidden shrink-0 rounded-full border border-blue-400/30 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(37,99,235,0.18)] transition-colors hover:bg-blue-500 md:inline-flex"
          data-testid="nav-cta"
        >
          Let&apos;s discuss your project
        </motion.button>

        <div className="hidden md:flex flex-1 items-center gap-4 lg:gap-6 min-w-0">
          <div className="flex items-center gap-4 lg:gap-6">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  activeItem === link.label ? "text-white" : "text-white/68 hover:text-blue-300"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                    location.pathname === "/services" ? "text-white" : "text-white/68 hover:text-blue-300"
                  }`}
                >
                  Services
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-white/10 bg-[#050816] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                {SERVICE_LINKS.map((service) => (
                  <DropdownMenuItem
                    key={service.label}
                    asChild
                    className="cursor-pointer text-sm text-white/75 focus:bg-white/5 focus:text-blue-300"
                  >
                    <Link to={`/services${service.hash}`}>{service.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  activeItem === link.label ? "text-white" : "text-white/68 hover:text-blue-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3 lg:gap-4">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-white/58 transition-colors hover:text-blue-300"
                  data-testid={item.testId}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden z-10 text-white/70"
          data-testid="mobile-menu-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  openContactInfo();
                  setMobileOpen(false);
                }}
                className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Let&apos;s discuss your project
              </button>
              <Link
                to="/"
                className={`text-sm font-medium py-2 ${location.pathname === "/" ? "text-white" : "text-white/72"}`}
              >
                Home
              </Link>
              <details className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/80">Services</summary>
                <div className="mt-3 flex flex-col gap-2 pl-1">
                  {SERVICE_LINKS.map((service) => (
                    <Link
                      key={service.label}
                      to={`/services${service.hash}`}
                      className="text-sm text-white/62 transition-colors hover:text-blue-300"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </details>
              {NAV_LINKS.slice(1).map((link) => {
                if (link.path === "/") return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-2 ${
                      location.pathname === link.path ? "text-white" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="text-white/60 transition-colors hover:text-blue-300"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PreviewProvider>
          <SiteActionsProvider>
            <CursorAura />
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
