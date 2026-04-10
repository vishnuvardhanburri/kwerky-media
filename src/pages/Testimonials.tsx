import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import CardHoverEffect from '../hook/cardHoverEffect';

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  company: string;
  location?: string;
  name: string;
  title: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    company: 'Elephanttree',
    name: 'John Doe',
    title: 'CTO',
    image: '/testimonials/person-1.jpg',
    quote:
      'Kwerky Media transformed our storytelling, engaging our target audience effectively. Highly recommend!',
  },
  {
    company: 'SNIPE TECH',
    location: 'Bangalore',
    name: 'Aarav Mehta',
    title: 'Founder',
    image: '/testimonials/person-2.jpg',
    quote:
      'Kwerky helped us sharpen how we present technical value. The content felt premium, clear, and far more convincing than what we had before.',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const handleMouseMove = CardHoverEffect();
  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('[data-testimonial-card]');

    gsap.fromTo(
      cards,
      {
        y: 72,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.16,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] px-4 py-20 text-white sm:px-10 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#f7d7df]/60">
            Social Proof
          </p>
          <h2 className="mt-4 font-sans text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Premium trust, built through clarity.
          </h2>
          <p className="mt-5 max-w-2xl font-robert-regular text-base leading-7 text-white/70">
            These are not generic compliments. They reflect what happens when
            the story gets sharper, the presentation gets stronger, and the
            product finally reads the way it deserves to.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.company}
              data-testimonial-card
              onMouseMove={isDesktop ? handleMouseMove : undefined}
              className="group"
            >
              <div className="bento-tilt relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,22,0.98),rgba(9,9,11,0.98))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-sm sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,122,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(80,110,255,0.08),transparent_28%)]" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-sans text-xl font-medium tracking-tight text-white">
                          {item.name}
                        </p>
                        <p className="font-robert-regular text-sm text-white/55">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/50">
                        {item.company}
                        {item.location ? ` • ${item.location}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-2 text-[#ff5c7a]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className="text-lg drop-shadow-[0_0_10px_rgba(255,92,122,0.32)]"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 font-sans text-2xl font-medium leading-[1.08] tracking-tight text-white sm:text-3xl">
                    “{item.quote}”
                  </p>

                  <div className="mt-8 h-px w-full bg-white/8" />

                  <p className="mt-5 max-w-xl font-robert-regular text-sm leading-7 text-white/62">
                    Clear positioning, stronger content systems, and a more
                    compelling public-facing story.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
