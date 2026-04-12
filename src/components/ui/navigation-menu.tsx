"use client";

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Videos', href: '/videos' },
] as const;

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: 'auto',
    transition: {
      y: { type: 'spring' as const, damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.16,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: '3.2rem',
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25 },
  },
};

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -18,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <>
      <div className="fixed inset-x-3 top-3 z-50 md:hidden">
        <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-black/84 px-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden pr-3">
            <img
              src="/kwerky-logo.avif"
              alt="Kwerky Media logo"
              className="h-8 w-8 rounded-full object-cover"
              loading="eager"
            />
            <div className="min-w-0">
              <strong className="block truncate font-general text-[0.58rem] tracking-[0.2em] text-white">
                KWERKY MEDIA
              </strong>
              <span className="hidden truncate text-[0.46rem] tracking-[0.2em] text-white/42 min-[390px]:block">
                CREATIVE STORYTELLING ENGINE
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/72 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="fixed inset-x-3 top-20 z-50 rounded-[2rem] border border-white/10 bg-[#09090b]/96 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl md:hidden"
            >
              <div className="mb-4">
                <p className="font-general text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/42">
                  Navigate
                </p>
              </div>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'flex items-center justify-between rounded-2xl border px-4 py-3 font-general text-[0.76rem] font-semibold uppercase tracking-[0.2em] transition',
                        isActive
                          ? 'border-white bg-white text-black'
                          : 'border-white/10 bg-white/[0.03] text-white/76 hover:border-white/24 hover:text-white',
                      )}
                    >
                      <span>{item.name}</span>
                      <span className={cn('text-xs', isActive ? 'text-black/60' : 'text-white/32')}>
                        /
                      </span>
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/services"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#ff5c7a] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-white"
              >
                Start your project
              </Link>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.08 } : {}}
          whileTap={!isExpanded ? { scale: 0.96 } : {}}
          onClick={handleNavClick}
          layout
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 24,
          }}
          className={cn(
            'flex h-12 items-center overflow-hidden rounded-full border border-white/10 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl',
            !isExpanded && 'cursor-pointer justify-center',
          )}
        >
          <motion.div
            variants={logoVariants}
            className="flex flex-shrink-0 items-center gap-3 pl-4 pr-2"
          >
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/kwerky-logo.avif"
                alt="Kwerky Media logo"
                className="h-8 w-8 rounded-full object-cover"
                loading="eager"
              />
              <div className="hidden min-[520px]:block">
                <strong className="block font-general text-[0.68rem] tracking-[0.24em] text-white">
                  KWERKY MEDIA
                </strong>
                <span className="block text-[0.52rem] tracking-[0.26em] text-white/42">
                  CREATIVE STORYTELLING ENGINE
                </span>
              </div>
            </Link>

            <Link
              to="/services"
              onClick={(e) => e.stopPropagation()}
              className="hidden items-center rounded-full border border-[#ff5c7a]/50 bg-[#ff5c7a]/12 px-4 py-1.5 font-general text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#ff5c7a] hover:text-black md:inline-flex"
            >
              Start your project
            </Link>
          </motion.div>

          <motion.div
            className={cn(
              'flex items-center gap-1 pr-4 sm:gap-3',
              !isExpanded && 'pointer-events-none',
            )}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    to={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'relative inline-flex items-center rounded-full px-3 py-1.5 font-general text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-colors',
                      isActive
                        ? 'text-black'
                        : 'text-white/72 hover:text-white',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_8px_24px_rgba(255,255,255,0.18)]"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.2 }
                            : {
                                type: 'spring',
                                stiffness: 380,
                                damping: 30,
                              }
                        }
                      />
                    ) : null}
                    <motion.span
                      className="relative z-10"
                      whileHover={
                        prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }
                      }
                      whileTap={
                        prefersReducedMotion ? undefined : { scale: 0.98 }
                      }
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={collapsedIconVariants}
              animate={isExpanded ? 'expanded' : 'collapsed'}
            >
              <Menu className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </motion.nav>
      </div>
    </>
  );
}
