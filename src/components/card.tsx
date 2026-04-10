import clsx from 'clsx';
import CardHoverEffect from '../hook/cardHoverEffect';
import { JSX, useRef } from 'react';
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
  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseExit = () =>
    videoRef.current &&
    (videoRef.current.pause(), (videoRef.current.currentTime = 0));

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      {
        rotationX: '-80deg',
        opacity: 0,
      },
      {
        opacity: 1,
        rotationX: '0deg',
        duration: 0.9,
        scrollTrigger: {
          trigger: cardRef.current,
          start: '-240% bottom',
          end: 'bottom top',
          toggleActions: 'restart none none none',
        },
      },
    );
  }, []);
  return (
    <div
      ref={cardRef}
      className={`group cursor-grab ${clsx(box, {
        'min-h-[22rem] lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4': box === 1,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-6': box === 2,
        'min-h-[22rem] lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-8': box === 3,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-6 lg:row-end-8': box === 4,
        'min-h-[20rem] lg:col-start-2 lg:col-end-3 lg:row-start-8 lg:row-end-10': box === 5,
        'min-h-[20rem] lg:col-start-1 lg:col-end-2 lg:row-start-8 lg:row-end-10': box === 6,
      })} `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <div className="relative size-full overflow-hidden rounded-[1.5rem] border border-white/12 bg-neutral-900/80 transition-transform ease-linear will-change-transform [perspective:1000px] group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))_scale(0.95)]">
        {video && (
          <video
            preload="auto"
            muted
            loop
            playsInline
            draggable="false"
            controls={false}
            disablePictureInPicture
            className="video-player size-full scale-125 object-cover"
            ref={videoRef}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.82))]" />
        <div className="absolute left-4 top-4 z-10 w-[calc(100%-2rem)] max-w-[18rem] sm:max-w-xs">
          {title}
          {description}
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full border border-white/12 bg-black/35 px-4 py-2 font-general text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-sm">
            Kwerky Media
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
