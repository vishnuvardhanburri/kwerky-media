import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const quoteLines = [
  'Power resides where people believe it does',
  'no more, no less.',
  "So, don't let your message get lost in translation.",
  'Let us craft the public perception',
  'your technology truly deserves.',
];

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !maskRef.current || !contentRef.current) return;

    const words = contentRef.current.querySelectorAll('.animated-word');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'bottom 35%',
        scrub: 0.8,
      },
    });

    timeline
      .fromTo(
        maskRef.current,
        {
          clipPath: 'polygon(12% 4%, 90% 10%, 82% 96%, 10% 90%)',
          scale: 0.92,
        },
        {
          clipPath: 'polygon(4% 3%, 97% 0%, 94% 100%, 2% 96%)',
          scale: 1,
          ease: 'power2.inOut',
        },
      )
      .fromTo(
        videoRef.current,
        {
          scale: 1.25,
        },
        {
          scale: 1,
          ease: 'power2.out',
        },
        0,
      )
      .to(
        words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.15,
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-10 sm:py-24"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="flt_tag">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>

      <div className="story-img-container">
        <div
          ref={maskRef}
          className="story-img-mask absolute left-0 top-0 h-[33rem] w-full overflow-hidden rounded-[2rem] border border-white/10 sm:h-[40rem] lg:h-[42rem]"
        >
          <video
            ref={videoRef}
            className="story-img-content object-cover"
            src="/story-background.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_28%),linear-gradient(135deg,rgba(255,92,122,0.16),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.72))]" />
        </div>

        <div className="absolute inset-0 z-20 flex items-center px-5 sm:px-10 lg:px-16">
          <div className="max-w-5xl">
            <p className="mb-5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/54">
              Story and Perception
            </p>
            <div
              ref={contentRef}
              className="animated-title max-w-5xl text-left text-3xl sm:text-5xl lg:text-[4.5rem]"
            >
              {quoteLines.map((line) => (
                <span key={line} className="animated-word block">
                  {line}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/66">
              Strong products deserve strong public language. This is where the
              message gets shaped into something people can understand, trust,
              and remember quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
