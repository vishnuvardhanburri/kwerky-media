import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import CardHoverEffect from '../hook/cardHoverEffect';

gsap.registerPlugin(ScrollTrigger);

const LiquidShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = CardHoverEffect();
  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('[data-liquid-reveal]');

    gsap.fromTo(
      items,
      {
        y: 56,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-4 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-liquid-reveal>
          <p className="font-general text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/50">
            Liquid Surface
          </p>
          <h2 className="mt-4 max-w-xl font-sans text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Fluid Innovation. Seamless Delivery.
          </h2>
          <p className="mt-5 max-w-xl font-robert-regular text-base leading-7 text-white/68">
            We use motion and presentation with restraint. The result feels
            alive, modern, and premium, without turning the message into noise.
          </p>
        </div>

        <div
          ref={mediaRef}
          data-liquid-reveal
          onMouseMove={isDesktop ? handleMouseMove : undefined}
          className="group relative"
        >
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            style={{ filter: 'url(#flt_tag)' }}
          >
            <div className="overflow-hidden rounded-[1.4rem] transition-transform duration-300 ease-linear will-change-transform group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))_scale(0.985)]">
              <video
                className="h-[24rem] w-full object-cover sm:h-[30rem]"
                src="/story-background.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidShowcase;
