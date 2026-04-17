import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StackCard = ({ card, index, progress }) => {
  const start = index * 0.24;
  const mid = start + 0.14;
  const end = start + 0.4;

  const y = useTransform(progress, [start, mid, end], [128, 0, -140]);
  const scale = useTransform(progress, [start, mid, end], [0.9, 1.02, 0.88]);
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0.04]);
  const rotateX = useTransform(progress, [start, mid, end], [16, 0, -14]);
  const x = useTransform(progress, [start, mid, end], [index % 2 === 0 ? -18 : 18, 0, index % 2 === 0 ? 14 : -14]);

  return (
    <motion.article
      style={{ y, scale, opacity, rotateX, x, transformStyle: "preserve-3d" }}
      className="absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
    >
      <div className="rounded-[1.75rem] border border-white/10 bg-[#050b16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-300/75">
            {card.eyebrow}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-white/35">
            {card.tag}
          </span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white md:text-4xl">{card.title}</h3>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
          {card.body}
        </p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-400/30 via-white/10 to-transparent" />
        <p className="mt-4 text-sm font-medium text-blue-300">{card.meta}</p>
      </div>
    </motion.article>
  );
};

const AnimatedCardsStack = ({
  eyebrow = "Projects / Proof",
  title = "Selected work,\nslow and cinematic.",
  description = "A compact proof stack with controlled motion and blue-first contrast.",
  cards = [],
  className = "",
  dataTestId = "projects-section"
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={sectionRef}
      className={`relative px-6 ${className}`}
      style={{ height: `${Math.max(300, cards.length * 110)}vh` }}
      data-testid={dataTestId}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container mx-auto max-w-6xl relative z-10 w-full">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
              {eyebrow}
            </p>
            <h2 className="text-4xl font-bold leading-[0.96] text-white md:text-6xl">
              {title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
              {description}
            </p>
          </div>

          <div className="relative h-[62vh] min-h-[420px]">
            {cards.map((card, index) => (
              <StackCard key={card.title} card={card} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedCardsStack;
