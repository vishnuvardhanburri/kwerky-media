import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

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

      if (mediaQuery.matches) {
        mobileVideo?.pause();
        void tryPlay(desktopVideo);
      } else {
        desktopVideo?.pause();
        void tryPlay(mobileVideo);
      }
    };

    syncPlayback();
    mediaQuery.addEventListener('change', syncPlayback);

    return () => mediaQuery.removeEventListener('change', syncPlayback);
  }, []);

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
        className="absolute inset-0 z-0 hidden h-full w-full object-cover object-center md:block"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/og-image.jpg"
        disablePictureInPicture
      >
        <source src="/hero-video-optimized-540.mp4" type="video/mp4" />
      </video>

      <video
        ref={mobileVideoRef}
        className="absolute inset-0 z-0 block h-full w-full object-cover object-center md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/og-image.jpg"
        disablePictureInPicture
      >
        <source src="/hero-video-mobile-optimized.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/62 md:bg-black/56" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,164,255,0.08),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,92,122,0.1),transparent_18%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/82 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-black/42 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-black/38 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-end px-4 pb-20 pt-28 text-left sm:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-28"
      >
        <p className="mb-5 inline-flex rounded-full border border-white/18 bg-black/18 px-4 py-2 font-general text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/82 backdrop-blur-sm sm:text-[0.78rem]">
          Content and Growth Partner for Tech Companies
        </p>

        <span className="mb-4 font-general text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#ff8ba0]/82">
          Take your stage by Kwerky Media
        </span>

        <h1 className="max-w-3xl text-balance font-sans text-5xl font-medium tracking-[-0.07em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-[6.2rem]">
          Get your spotlight.
        </h1>

        <p className="mt-6 max-w-xl font-robert-regular text-base leading-7 text-white/82 drop-shadow-[0_6px_30px_rgba(0,0,0,0.28)] sm:text-lg md:text-[1.08rem]">
          Kwerky Media helps ambitious tech brands turn product complexity into
          sharp stories, premium presentation, and content that earns trust.
        </p>

        <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full bg-[#ff5c7a] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black transition duration-300 hover:scale-[1.02] hover:bg-white sm:px-7"
          >
            Start a Project
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/26 bg-black/18 px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white hover:text-black sm:px-7"
          >
            Connect with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
