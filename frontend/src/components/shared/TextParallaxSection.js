import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TextParallaxSection = ({
  eyebrow = "Value",
  title = "Content that\nCaptivates.",
  description = "We go beyond the norm. We are Kwerky.",
  className = "",
  dataTestId = "value-section",
  id = "value-section"
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -24]);
  const visualY = useTransform(scrollYProgress, [0, 1], [90, -70]);

  return (
    <section ref={sectionRef} id={id} className={`relative overflow-hidden px-6 py-28 ${className}`} data-testid={dataTestId}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y: textY }} className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
              {eyebrow}
            </p>
            <h2 className="text-5xl font-bold leading-[0.94] text-white md:text-7xl lg:text-8xl">
              {title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
              {description}
            </p>
          </motion.div>

          <motion.div style={{ y: visualY }} className="relative min-h-[320px] lg:min-h-[440px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#010204] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.08),transparent_30%),radial-gradient(circle_at_center,rgba(15,23,42,0.46),transparent_44%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:84px_84px] opacity-28" />
              <motion.div
                className="absolute left-[10%] top-[12%] h-40 w-40 rounded-[1.6rem] border border-blue-400/15 bg-blue-500/6"
                animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[10%] top-[14%] h-56 w-56 rounded-full border border-blue-200/15"
                animate={{ y: [0, 12, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[14%] left-[28%] h-24 w-[46%] rounded-full border border-blue-300/10 bg-blue-400/5"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TextParallaxSection;
