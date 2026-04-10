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
        start: 'top top',
        end: '+=160%',
        scrub: 1,
        pin: true,
      },
    });

    timeline
      .fromTo(
        maskRef.current,
        {
          clipPath: 'polygon(10% 0%, 88% 12%, 78% 100%, 8% 88%)',
          scale: 0.82,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
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
      className="relative min-h-screen overflow-hidden bg-black px-4 text-white sm:px-10"
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
          className="story-img-mask absolute left-[4%] top-[14%] h-[72vh] w-[92vw] overflow-hidden rounded-[1.5rem] border border-white/10 md:left-[10%] md:top-[10%] md:h-[78vh] md:w-[80vw] lg:left-[14%] lg:top-[8%] lg:h-[82vh] lg:w-[72vw]"
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/10 to-[#8c1731]/25" />
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-8 md:px-12">
          <div
            ref={contentRef}
            className="animated-title max-w-6xl text-center text-3xl sm:text-5xl lg:text-[5rem]"
          >
            {quoteLines.map((line) => (
              <span key={line} className="animated-word block">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
