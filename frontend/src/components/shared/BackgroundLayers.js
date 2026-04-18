import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

const BackgroundLayers = () => {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const auroraOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.38, 0.7, 1],
    isHome ? [0.28, 0.24, 0.14, 0.08, 0.04] : [0.1, 0.07, 0.04, 0.025, 0.02],
  );
  const auroraScale = useTransform(
    scrollYProgress,
    [0, 1],
    isHome ? [1, 1.08] : [1, 1.03],
  );
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    isHome ? [0.72, 0.42, 0.14] : [0.42, 0.24, 0.08],
  );
  const starsOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isHome ? [0.34, 0.18, 0.08] : [0.14, 0.1, 0.05],
  );

  return (
    <>
      <motion.div className="bg-aurora" style={{ opacity: auroraOpacity, scale: auroraScale }} />
      <motion.div
        className="bg-aurora-media"
        style={{
          opacity: auroraOpacity,
          backgroundImage: "url(/brand/aurora.gif)",
          scale: auroraScale,
        }}
      />
      <motion.div className="bg-grid" style={{ opacity: gridOpacity }} />
      <motion.div className="bg-stars" style={{ opacity: starsOpacity }} />
      <div className="bg-noise" />
    </>
  );
};

export default BackgroundLayers;
