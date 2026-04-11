"use client";

import * as React from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion';
import { Menu } from 'lucide-react';
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
  const { scrollY } = useScroll();
  const location = useLocation();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

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
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : {}}
        whileTap={!isExpanded ? { scale: 0.96 } : {}}
        onClick={handleNavClick}
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
                    'inline-flex items-center rounded-full px-3 py-1.5 font-general text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-colors',
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white/72 hover:text-white',
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          <motion.div variants={itemVariants}>
            <Link
              to="/services"
              onClick={(e) => e.stopPropagation()}
              className="ml-1 inline-flex items-center rounded-full border border-[#ff5c7a]/50 bg-[#ff5c7a]/12 px-4 py-1.5 font-general text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#ff5c7a] hover:text-black"
            >
              Start a Project
            </Link>
          </motion.div>
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
  );
}
