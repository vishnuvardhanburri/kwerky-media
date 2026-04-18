import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

const BackgroundLayers = () => {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const auroraOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.38, 0.7, 1],
    isHome ? [0.32, 0.28, 0.16, 0.08, 0.04] : [0.12, 0.08, 0.05, 0.03, 0.02],
  );
  const auroraScale = useTransform(
    scrollYProgress,
    [0, 1],
    isHome ? [1, 1.14] : [1, 1.04],
  );
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    isHome ? [0.88, 0.5, 0.16] : [0.55, 0.28, 0.08],
  );
  const starsOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isHome ? [0.46, 0.22, 0.08] : [0.18, 0.12, 0.05],
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
