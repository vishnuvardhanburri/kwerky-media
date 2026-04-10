import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

type HeroProps = {
  canAnimate?: boolean;
};

const Hero = ({ canAnimate = false }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!canAnimate || !contentRef.current) return;

    const [eyebrow, headline, subtext, cta] = Array.from(
      contentRef.current.children,
    );

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      eyebrow,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85 },
    )
      .fromTo(
        headline,
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '+=0.5',
      )
      .fromTo(
        [subtext, cta],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.16 },
        '-=0.25',
      );
  }, [canAnimate]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <video
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
        className="absolute inset-0 z-0 block h-full w-full object-cover md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video-mobile.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-black/60"></div>

      <div
        ref={contentRef}
        className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-10"
      >
        <p className="mb-5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/70 sm:text-[0.82rem]">
          Content and Growth Partner for Tech Companies
        </p>

        <h1 className="max-w-4xl font-sans text-4xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Get your spotlight.
        </h1>

        <p className="mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/78 sm:text-lg">
          Kwerky Media helps ambitious tech brands turn product complexity into
          sharp stories, premium presentation, and content that earns trust.
        </p>

        <a
          href="#contact"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:border-[#ff5c7a] hover:bg-[#ff5c7a] hover:text-black sm:mt-10 sm:px-7"
        >
          Connect with us!
        </a>
      </div>
    </section>
  );
};

export default Hero;
