import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TextParallaxSection = ({
  eyebrow = "Value",
  title = "Content that\nCaptivates.",
  description = "We go beyond the norm. We are Kwerky.",
  body = "",
  images = [],
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
  const carouselImages = images.length
    ? images
    : [
        "/brand/service-content-laptop.jpg",
        "/brand/service-social-trojan.jpg",
        "/brand/service-video-typewriter.jpg",
      ];

  return (
    <section ref={sectionRef} id={id} className={`relative overflow-hidden px-6 py-32 ${className}`} data-testid={dataTestId}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y: textY }} className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
              {eyebrow}
            </p>
            <h2 className="torch-text text-5xl font-bold leading-[0.9] tracking-[-0.04em] text-white md:text-7xl lg:text-[7rem]">
              {title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
              {description}
            </p>
            {body ? (
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                {body}
              </p>
            ) : null}
          </motion.div>

          <motion.div style={{ y: visualY }} className="relative min-h-[300px] lg:min-h-[420px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#010204]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,179,71,0.08),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.56))]" />
              <motion.div
                className="absolute inset-y-0 left-0 flex w-[200%] gap-5 px-6 py-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                {carouselImages.concat(carouselImages).map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-full min-w-[calc(33.333%-0.85rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816]"
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TextParallaxSection;
