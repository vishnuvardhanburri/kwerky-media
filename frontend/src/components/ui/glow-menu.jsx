import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

export const MenuBar = React.forwardRef(({ className, items, activeItem, onItemClick, ...props }, ref) => {
  return (
    <motion.nav
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full border border-white/10 bg-black/35 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className,
      )}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)] pointer-events-none" />
      <ul className="relative z-10 flex flex-wrap items-center gap-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          return (
            <li key={item.label}>
              <button type="button" onClick={() => onItemClick?.(item.label)} className="block w-full">
                <motion.div
                  className="group relative rounded-full"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-full"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{ background: item.gradient, opacity: isActive ? 1 : 0 }}
                  />
                  <motion.div
                    className={cn(
                      "relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.75 text-[13px] font-medium transition-colors",
                      isActive ? "text-white" : "text-white/65 group-hover:text-white",
                    )}
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span className={cn(isActive ? item.iconColor : "text-white/90")}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span>{item.label}</span>
                  </motion.div>
                  <motion.div
                    className={cn(
                      "absolute inset-0 z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.75 text-[13px] font-medium transition-colors",
                      isActive ? "text-white" : "text-white/65 group-hover:text-white",
                    )}
                    variants={backVariants}
                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      rotateX: 90,
                    }}
                  >
                    <span className={cn(isActive ? item.iconColor : "text-white/90")}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span>{item.label}</span>
                  </motion.div>
                </motion.div>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
});

MenuBar.displayName = "MenuBar";
