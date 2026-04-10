import clsx from 'clsx';
import CardHoverEffect from '../hook/cardHoverEffect';
import { JSX, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title?: JSX.Element;
  description?: JSX.Element;
  video?: string;
  box: number;
}
const Card = ({ title, description, video, box }: CardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = CardHoverEffect();
  const isDesktop = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches,
    [],
  );
  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseExit = () =>
    videoRef.current &&
    (videoRef.current.pause(), (videoRef.current.currentTime = 0));

  const accentClass = clsx({
    'from-white/10 via-white/[0.04] to-[#38131f]/40': box === 1,
    'from-[#18212d]/65 via-[#0f1117]/92 to-black': box === 2,
    'from-[#29121b]/55 via-[#0f1014]/94 to-black': box === 3,
    'from-[#1a1626]/60 via-[#0f1014]/92 to-black': box === 4,
    'from-[#0f1522]/75 via-[#090a0d]/96 to-black': box === 5,
    'from-[#181818]/75 via-[#0b0b0d]/96 to-black': box === 6,
  });

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      {
        y: 48,
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      },
    );
  }, []);
  return (
    <div
      ref={cardRef}
      className={`group ${clsx(box, {
        'min-h-[22rem] lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4': box === 1,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-6': box === 2,
        'min-h-[22rem] lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-8': box === 3,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-6 lg:row-end-8': box === 4,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-8 lg:row-end-10': box === 5,
        'min-h-[20rem] lg:col-start-1 lg:col-end-2 lg:row-start-8 lg:row-end-10': box === 6,
      })} `}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <div className="relative size-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0d] transition-transform ease-linear will-change-transform [perspective:1000px] group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))_scale(0.985)]">
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-br opacity-100 transition-opacity duration-300',
            accentClass,
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]" />
        {video && (
          <video
            preload="auto"
            muted
            loop
            playsInline
            draggable="false"
            controls={false}
            disablePictureInPicture
            className="video-player size-full scale-110 object-cover opacity-40 mix-blend-screen"
            ref={videoRef}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1),rgba(5,5,5,0.8))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/65 to-transparent" />
        <div className="absolute left-5 top-5 z-10 w-[calc(100%-2.5rem)] max-w-[22rem] sm:left-6 sm:top-6">
          {title}
          {description}
        </div>
        <div className="absolute bottom-5 left-5 z-10 sm:bottom-6 sm:left-6">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-general text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/62 backdrop-blur-sm">
            Premium Story System
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
