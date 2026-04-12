import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import CardHoverEffect from '../hook/cardHoverEffect';
import { useTouchLayout } from '@/hooks/use-touch-layout';

gsap.registerPlugin(ScrollTrigger);

const LiquidShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseMove = CardHoverEffect();
  const isTouchLayout = useTouchLayout();

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

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-4 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,14,0.98),rgba(7,7,8,0.98))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.36)] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
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
          <div className="mt-8 grid max-w-lg gap-3 text-sm text-white/62 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              Structured delivery that still feels human.
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              Motion used where it adds value, not distraction.
            </div>
          </div>
        </div>

        <div
          ref={mediaRef}
          data-liquid-reveal
          onMouseMove={!isTouchLayout ? handleMouseMove : undefined}
          className="group relative"
        >
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            style={!isTouchLayout ? { filter: 'url(#flt_tag)' } : undefined}
          >
            <div className="overflow-hidden rounded-[1.4rem] transition-transform duration-300 ease-linear will-change-transform group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))_scale(0.985)]">
              <video
                ref={videoRef}
                className="h-[24rem] w-full object-cover sm:h-[30rem]"
                src="/story-background.mp4"
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,92,122,0.18),transparent_32%),linear-gradient(to_top,rgba(0,0,0,0.45),transparent_42%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidShowcase;
