import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type PreloaderProps = {
  onComplete: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const didCompleteRef = useRef(false);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      if (!didCompleteRef.current) {
        didCompleteRef.current = true;
        onComplete();
      }
    }, 4200);

    return () => window.clearTimeout(fallbackTimer);
  }, [onComplete]);

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        if (!didCompleteRef.current) {
          didCompleteRef.current = true;
          onComplete();
        }
      },
    });

    timeline
      .set(titleRef.current, {
        y: 28,
        opacity: 0,
      })
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      })
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        },
        '+=1.5',
      );
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black"
    >
      <h1
        ref={titleRef}
        className="font-circular-web text-4xl font-bold tracking-[0.14em] text-white sm:text-5xl md:text-6xl"
      >
        Take Your Stage
      </h1>
    </div>
  );
};

export default Preloader;
