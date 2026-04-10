import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type HeroProps = {
  canAnimate?: boolean;
};

const Hero = ({ canAnimate: _canAnimate = false }: HeroProps) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tryPlay = async (video: HTMLVideoElement | null) => {
      if (!video) return;
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
      } catch {
        // Browsers can still block autoplay intermittently during prerender;
        // keeping the element configured correctly is the safest fallback.
      }
    };

    void tryPlay(desktopVideoRef.current);
    void tryPlay(mobileVideoRef.current);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <video
        ref={desktopVideoRef}
        className="absolute inset-0 z-0 hidden h-full w-full object-cover md:block"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <video
        ref={mobileVideoRef}
        className="absolute inset-0 z-0 block h-full w-full object-cover md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video-mobile.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/42"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,180,255,0.18),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(255,92,122,0.18),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 text-center sm:px-10"
      >
        <p className="mb-5 rounded-full border border-white/15 bg-black/25 px-4 py-2 font-general text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/78 backdrop-blur-md sm:text-[0.82rem]">
          Content and Growth Partner for Tech Companies
        </p>

        <h1 className="max-w-5xl text-balance font-sans text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[6.3rem]">
          Get your spotlight.
        </h1>

        <p className="mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/82 sm:text-lg md:text-[1.15rem]">
          Kwerky Media helps ambitious tech brands turn product complexity into
          sharp stories, premium presentation, and content that earns trust.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full bg-[#ff5c7a] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black transition duration-300 hover:scale-[1.02] hover:bg-white sm:px-7"
          >
            Start a Project
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/45 bg-black/20 px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black sm:px-7"
          >
            Connect with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
