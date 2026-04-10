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
        className="absolute inset-0 z-0 hidden h-full w-full scale-[1.08] object-cover object-center brightness-[0.42] contrast-[1.08] saturate-[0.72] blur-[1.5px] md:block"
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
        className="absolute inset-0 z-0 block h-full w-full scale-[1.06] object-cover object-center brightness-[0.42] contrast-[1.08] saturate-[0.72] blur-[1px] md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video-mobile.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/48"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_top,rgba(96,164,255,0.12),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(255,92,122,0.16),transparent_24%),linear-gradient(to_bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.74))]"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-black/38 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-black/34 to-transparent"></div>
      </div>

      <div
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 text-center sm:px-10"
      >
        <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,8,10,0.42),rgba(8,8,10,0.2))] px-6 py-8 shadow-[0_24px_120px_rgba(0,0,0,0.32)] backdrop-blur-[14px] sm:px-10 sm:py-10">
          <p className="mx-auto mb-5 inline-flex rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-general text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/78 sm:text-[0.82rem]">
            Content and Growth Partner for Tech Companies
          </p>

          <h1 className="mx-auto max-w-4xl text-balance font-sans text-5xl font-medium tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
            Get your spotlight.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/80 sm:text-lg md:text-[1.12rem]">
            Kwerky Media helps ambitious tech brands turn product complexity
            into sharp stories, premium presentation, and content that earns
            trust.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-full bg-[#ff5c7a] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black transition duration-300 hover:scale-[1.02] hover:bg-white sm:px-7"
            >
              Start a Project
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/[0.03] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black sm:px-7"
            >
              Connect with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
