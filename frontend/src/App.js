import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Info, BookOpen, PlayCircle } from "lucide-react";

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import VideosPage from "@/pages/VideosPage";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import KwerkyAssistant from "@/components/shared/KwerkyAssistant";
import { MenuBar } from "@/components/ui/glow-menu";

const NAV_LINKS = [
  { path: "/", label: "Home", color: "text-blue-300", underline: "bg-blue-300" },
  { path: "/services", label: "Services", color: "text-blue-400", underline: "bg-blue-400" },
  { path: "/about", label: "About Us", color: "text-blue-300", underline: "bg-blue-300" },
  { path: "/blogs", label: "Blogs", color: "text-blue-200", underline: "bg-blue-200" },
  { path: "/videos", label: "Videos", color: "text-blue-400", underline: "bg-blue-400" },
];

const MENU_ITEMS = [
  { icon: Home, label: "Home", href: "/", gradient: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(37,99,235,0.08) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-400" },
  { icon: Briefcase, label: "Services", href: "/services", gradient: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(37,99,235,0.08) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-300" },
  { icon: Info, label: "About Us", href: "/about", gradient: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.08) 50%, rgba(30,64,175,0) 100%)", iconColor: "text-blue-300" },
  { icon: BookOpen, label: "Blogs", href: "/blogs", gradient: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(29,78,216,0.08) 50%, rgba(30,64,175,0) 100%)", iconColor: "text-blue-300" },
  { icon: PlayCircle, label: "Videos", href: "/videos", gradient: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(59,130,246,0.08) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-400" },
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
    };

    const onLeave = () => {
      aura.style.opacity = "0";
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
          ? "bg-black/60 backdrop-blur-md"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group relative z-10" data-testid="nav-logo">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            src="/brand/big-logo.png"
            alt="Kwerky Media"
            className="h-16 w-auto md:h-20 drop-shadow-[0_12px_34px_rgba(0,0,0,0.62)]"
          />
          <span className="hidden lg:block text-sm font-semibold tracking-[0.24em] uppercase text-white/55">
            Kwerky Media
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <MenuBar
            items={MENU_ITEMS}
            activeItem={activeItem}
            onItemClick={(label) => {
              const item = MENU_ITEMS.find((entry) => entry.label === label);
              if (item) navigate(item.href);
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/services"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:shadow-[0_12px_24px_rgba(59,130,246,0.3)]"
              data-testid="nav-cta"
            >
              Let's discuss your project
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden z-10 text-white/70`}
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
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === link.path ? link.color : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/services"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-full text-center mt-2"
              >
                Let's discuss your project
              </Link>
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
        <KwerkyAssistant />
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
