import { useState, useEffect, useRef } from "react";

const SpotlightCursor = () => {
  const spotlightRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      setPosition({ x, y });
      setIsVisible(true);

      if (spotlightRef.current) {
        spotlightRef.current.style.left = x + "px";
        spotlightRef.current.style.top = y + "px";
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Show default cursor */
        * {
          cursor: auto !important;
        }
        
        /* Spotlight effect container - large and prominent */
        .spotlight-torch {
          position: fixed;
          width: 500px;
          height: 500px;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          mix-blend-mode: color-dodge;
          filter: drop-shadow(0 0 80px rgba(255, 255, 255, 0.4));
        }
        
        .spotlight-torch::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.5) 15%,
            rgba(255, 255, 255, 0.2) 40%,
            rgba(255, 255, 255, 0.05) 70%,
            transparent 100%
          );
          box-shadow: 
            inset 0 0 50px rgba(255, 255, 255, 0.5),
            0 0 100px rgba(255, 255, 255, 0.4),
            0 0 150px rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Spotlight torch effect - large and visible */}
      <div
        ref={spotlightRef}
        className={`spotlight-torch ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 100ms ease-out",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default SpotlightCursor;
