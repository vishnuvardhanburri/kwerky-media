"use client";

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

export type ScrollProject = {
  title: string;
  description?: string;
  src: string;
};

const defaultProjects: ScrollProject[] = [
  {
    title: 'Content Creation',
    description:
      'Narratives, landing pages, editorial systems, and product storytelling that make complicated offers feel clear.',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Social Media',
    description:
      'Sharp post systems and campaign concepts designed to hold attention and keep the brand feeling alive.',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Video Ads and Tutorials',
    description:
      'Visual storytelling that simplifies product value and makes technical ideas easier to absorb.',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Brand Positioning',
    description:
      'Messaging that sharpens the offer, builds trust faster, and gives the product a more premium first impression.',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Authority Content',
    description:
      'Thought leadership, founder stories, and educational assets that help technical brands sound worth listening to.',
    src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=900&fit=crop&crop=center',
  },
];

const StickyCard = ({
  title,
  description,
  src,
  progress,
  range,
  targetScale,
}: {
  title: string;
  description?: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.42]);
  const translateY = useTransform(progress, range, [0, -120]);
  const cardHeight = useTransform(progress, range, ['100%', '78%']);
  const imageScale = useTransform(progress, range, [1, 1.08]);
  const clipPath = useTransform(
    progress,
    range,
    [
      'inset(0% 0% 0% 0% round 28px)',
      'inset(0% 0% 22% 0% round 28px)',
    ],
  );

  return (
    <div
      ref={container}
      className="sticky top-[12vh] flex h-[78vh] items-start justify-center px-4 sm:px-6 lg:h-[82vh] lg:px-8"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          height: cardHeight,
          clipPath,
        }}
        className="relative mt-10 flex w-[300px] origin-top flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111214] shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:w-[420px] md:w-[520px] lg:w-[640px]"
      >
        <motion.img
          src={src || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
          style={{ scale: imageScale }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,122,0.18),transparent_24%)]" />
        <div className="absolute bottom-0 left-0 z-10 w-full p-5 sm:p-6">
          <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/55">
            Kwerky Media
          </p>
          <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-3 max-w-xl font-robert-regular text-sm leading-6 text-white/72 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

const ImagesScrollingAnimation = ({
  projects = defaultProjects,
}: {
  projects?: ScrollProject[];
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main
      ref={container}
      className="relative flex w-full flex-col items-center justify-center pb-[40vh] pt-[6vh] sm:pb-[52vh] sm:pt-[8vh] lg:pb-[64vh] lg:pt-[10vh]"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(
          0.62,
          1 - (projects.length - i - 1) * 0.1,
        );

        return (
          <StickyCard
            key={`p_${i}`}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.14, Math.min(1, 0.38 + i * 0.14)]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
};

export { ImagesScrollingAnimation, StickyCard };
