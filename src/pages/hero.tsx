import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useTouchLayout } from '@/hooks/use-touch-layout';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTouchLayout = useTouchLayout();

  useEffect(() => {
    const tryPlay = async (video: HTMLVideoElement | null) => {
      if (!video) return;

      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
      } catch {
        // Keep silent; the element still remains correctly configured.
      }
    };

    const syncPlayback = () => {
      const desktopVideo = desktopVideoRef.current;
      const mobileVideo = mobileVideoRef.current;

      if (isTouchLayout) {
        desktopVideo?.pause();
        desktopVideo?.removeAttribute('src');
        void tryPlay(mobileVideo);
      } else {
        mobileVideo?.pause();
        mobileVideo?.removeAttribute('src');
        void tryPlay(desktopVideo);
      }
    };

    syncPlayback();
  }, [isTouchLayout]);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const contentTween = gsap.fromTo(
      contentRef.current.children,
      {
        y: 18,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.08,
        delay: 0.08,
        ease: 'power2.out',
      },
    );

    return () => {
      contentTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black text-white"
    >
      <video
        ref={desktopVideoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/og-image.jpg"
        disablePictureInPicture
        aria-hidden={isTouchLayout}
        style={{ display: isTouchLayout ? 'none' : 'block' }}
      >
        {!isTouchLayout ? (
          <source src="/hero-video-optimized-540.mp4?v=4" type="video/mp4" />
        ) : null}
      </video>

      <video
        ref={mobileVideoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover object-[58%_center]"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/og-image.jpg"
        disablePictureInPicture
        aria-hidden={!isTouchLayout}
        style={{ display: isTouchLayout ? 'block' : 'none' }}
      >
        {isTouchLayout ? (
          <source src="/hero-video-mobile-optimized.mp4?v=4" type="video/mp4" />
        ) : null}
      </video>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/68 md:bg-black/56" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,164,255,0.08),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,92,122,0.1),transparent_18%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/82 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 via-black/20 to-transparent md:hidden" />
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-black/42 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-black/38 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className={`relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-center text-left ${
          isTouchLayout
            ? 'px-5 pb-14 pt-32'
            : 'px-5 pb-12 pt-28 sm:px-10 md:justify-end md:pb-24 md:pt-32 lg:px-16 lg:pb-28'
        }`}
      >
        <p className={`inline-flex rounded-full border border-white/18 bg-black/18 font-general font-semibold uppercase text-white/82 backdrop-blur-sm ${
          isTouchLayout
            ? 'mb-3 max-w-[16.75rem] px-3.5 py-2 text-[0.52rem] leading-[1.5] tracking-[0.24em]'
            : 'mb-4 max-w-[18rem] px-4 py-2 text-[0.55rem] leading-[1.55] tracking-[0.28em] sm:mb-5 sm:max-w-none sm:text-[0.78rem] sm:tracking-[0.34em]'
        }`}>
          Content and Growth Partner for Tech Companies
        </p>

        <span className={`font-general font-semibold uppercase text-[#ff8ba0]/82 ${
          isTouchLayout
            ? 'mb-2 max-w-[14rem] text-[0.5rem] leading-[1.7] tracking-[0.24em]'
            : 'mb-3 max-w-[16rem] text-[0.52rem] leading-[1.7] tracking-[0.3em] sm:mb-4 sm:max-w-none sm:text-[0.72rem] sm:tracking-[0.32em]'
        }`}>
          Take your stage by Kwerky Media
        </span>

        <h1 className={`text-balance font-sans font-medium leading-[0.95] tracking-[-0.07em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${
          isTouchLayout
            ? 'max-w-[13.75rem] text-[2.45rem]'
            : 'max-w-[15rem] sm:max-w-3xl text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6.2rem]'
        }`}>
          Get your spotlight.
        </h1>

        <p className={`mt-4 font-robert-regular text-[0.98rem] leading-8 text-white/84 drop-shadow-[0_6px_30px_rgba(0,0,0,0.28)] ${
          isTouchLayout ? 'max-w-[15.5rem] text-[0.94rem] leading-7' : 'max-w-[17.5rem] sm:mt-6 sm:max-w-xl sm:text-lg md:text-[1.08rem]'
        }`}>
          Kwerky Media helps ambitious tech brands turn product complexity into
          sharp stories, premium presentation, and content that earns trust.
        </p>

        <div className={`mt-7 flex w-full flex-col items-stretch gap-3 ${
          isTouchLayout
            ? 'max-w-[15.5rem]'
            : 'max-w-[17.5rem] sm:mt-10 sm:max-w-none sm:flex-row sm:items-center'
        }`}>
          <Link
            to="/services"
            className={`inline-flex items-center justify-center rounded-full bg-[#ff5c7a] font-general font-semibold uppercase text-black transition duration-300 hover:scale-[1.02] hover:bg-white ${
              isTouchLayout
                ? 'px-5 py-3.5 text-[0.66rem] tracking-[0.22em]'
                : 'px-6 py-3.5 text-[0.72rem] tracking-[0.24em] sm:px-7 sm:tracking-[0.28em]'
            }`}
          >
            Start a Project
          </Link>
          <a
            href="#contact"
            className={`inline-flex items-center justify-center rounded-full border border-white/26 bg-black/18 font-general font-semibold uppercase text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white hover:text-black ${
              isTouchLayout
                ? 'px-5 py-3.5 text-[0.66rem] tracking-[0.22em]'
                : 'px-6 py-3.5 text-[0.72rem] tracking-[0.24em] sm:px-7 sm:tracking-[0.28em]'
            }`}
          >
            Connect with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
