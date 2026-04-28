import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
        "relative overflow-hidden rounded-full border border-white/10 bg-black/35 p-1 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className,
      )}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)] pointer-events-none" />
      <ul className="relative z-10 flex items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          const content = (
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
                  "relative z-10 flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors whitespace-nowrap",
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
                  <Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </motion.div>
              <motion.div
                className={cn(
                  "absolute inset-0 z-10 flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors whitespace-nowrap",
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
                  <Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </motion.div>
            </motion.div>
          );

          return (
            <li key={item.label}>
              {item.subItems?.length ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="block w-full">
                      {content}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="!bg-[#02060f] !border !border-white/10 !shadow-[0_32px_60px_rgba(0,0,0,0.35)]">
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem asChild key={subItem.label}>
                        <Link
                          to={subItem.href}
                          className="block rounded-xl px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 hover:text-[#FF9B30]"
                        >
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button type="button" onClick={() => onItemClick?.(item.label)} className="block w-full">
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
});

MenuBar.displayName = "MenuBar";
