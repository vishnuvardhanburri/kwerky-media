import { motion } from "framer-motion";

const KwerkyRobotArt = ({ className = "", compact = false }) => {
  const scaleClass = compact ? "scale-[0.72] sm:scale-100" : "";

  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -6, 0], rotate: [0, -1.5, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      className={`relative ${scaleClass} ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.35)_0%,rgba(59,130,246,0.14)_36%,transparent_70%)] blur-2xl" />
      <div className="relative flex aspect-square w-full items-center justify-center rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,40,0.92),rgba(3,7,18,0.98))] shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-[8%] rounded-[2rem] bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_70%_12%,rgba(255,255,255,0.09),transparent_18%),linear-gradient(180deg,rgba(24,30,48,0.98),rgba(5,9,18,0.98))] border border-white/8" />
        <div className="absolute left-1/2 top-[12%] h-[13%] w-[6px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-400 via-fuchsia-400 to-transparent shadow-[0_0_18px_rgba(244,114,182,0.45)]" />
        <div className="absolute left-1/2 top-[6%] h-3 w-3 -translate-x-1/2 rounded-full bg-pink-300 shadow-[0_0_18px_rgba(244,114,182,0.8)]" />
        <div className="absolute left-[20%] top-[33%] h-[16%] w-[16%] rounded-full bg-[radial-gradient(circle,rgba(255,96,183,0.95)_0%,rgba(244,114,182,0.95)_42%,rgba(0,0,0,0)_75%)] shadow-[0_0_28px_rgba(236,72,153,0.65)]" />
        <div className="absolute right-[20%] top-[33%] h-[16%] w-[16%] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.95)_0%,rgba(96,165,250,0.92)_42%,rgba(0,0,0,0)_75%)] shadow-[0_0_28px_rgba(96,165,250,0.65)]" />
        <div className="absolute bottom-[28%] h-[7px] w-[20px] rounded-full bg-blue-300/90 shadow-[0_0_18px_rgba(96,165,250,0.6)]" />
        <div className="absolute left-[12%] top-[41%] h-[36%] w-[30%] rounded-[40%_50%_50%_40%] border border-white/10 bg-[linear-gradient(180deg,rgba(236,72,153,0.34),rgba(59,130,246,0.08))] opacity-70 blur-[0.2px]" />
        <div className="absolute right-[12%] top-[41%] h-[36%] w-[30%] rounded-[50%_40%_40%_50%] border border-white/10 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(236,72,153,0.28))] opacity-70 blur-[0.2px]" />
        <div className="absolute bottom-[7%] left-1/2 h-[22%] w-[46%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_50%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        <div className="absolute bottom-[2%] left-[32%] h-[12%] w-[8%] rounded-full bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.3)]" />
        <div className="absolute bottom-[2%] right-[32%] h-[12%] w-[8%] rounded-full bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.3)]" />
      </div>
    </motion.div>
  );
};

export default KwerkyRobotArt;
