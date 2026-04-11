import {
  ImagesScrollingAnimation,
  type ScrollProject,
} from '@/components/ui/images-scrolling-animation';

const projects: ScrollProject[] = [
  {
    title: 'Content Creation',
    description:
      'Compelling narratives, landing pages, and editorial systems that make your brand feel sharper and more valuable.',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Social Media',
    description:
      'Strategic social concepts and campaign storytelling that turn passive scrolling into brand attention.',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Dynamic Video Ads and Tutorials',
    description:
      'Video assets designed to simplify product understanding and make technical ideas feel easier to trust.',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Brand Positioning',
    description:
      'Positioning work that clarifies the offer, sharpens the message, and helps your company feel premium faster.',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop&crop=center',
  },
  {
    title: 'Authority Content',
    description:
      'Thought leadership, founder voice, and educational storytelling that help technical brands sound worth listening to.',
    src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=900&fit=crop&crop=center',
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="overflow-hidden bg-black px-4 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
    >
      <header className="mx-auto max-w-5xl">
        <h1 className="font-general text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white/56 max-lg:text-[0.7rem]">
          Content that Captivates
        </h1>
        <h2 className="mt-4 max-w-3xl font-sans text-4xl font-medium tracking-tight text-white md:text-6xl">
          We go beyond the norm. We are Kwerky.
        </h2>
        <p className="mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/64 sm:text-lg">
          Strategy, social media, and motion are presented as one connected
          system so every service feels structured, premium, and built to move
          attention toward action.
        </p>
      </header>

      <div className="mx-auto mt-6 max-w-7xl">
        <ImagesScrollingAnimation projects={projects} />
      </div>
    </section>
  );
};

export default Features;
