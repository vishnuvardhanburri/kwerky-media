import Card from '../components/card';
import { JSX } from 'react';

type FeatureCard = {
  title: JSX.Element;
  description: JSX.Element;
  box: number;
  video?: string;
};

const Features = () => {
  const cardsData: FeatureCard[] = [
    {
      title: (
        <h2 className="font-sans text-4xl font-medium tracking-tight text-white md:text-6xl">
          Content Creation
        </h2>
      ),
      description: (
        <p className="pt-4 max-w-lg text-sm leading-7 text-white/74 max-md:text-xs">
          We craft compelling narratives that resonate with your audience,
          elevating your brand&apos;s presence in the market.
        </p>
      ),
      box: 1,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Social Media
        </h2>
      ),
      description: (
        <p className="pt-4 text-sm leading-7 text-white/74 max-md:text-xs">
          Engaging posts and strategies that connect with your audience, driving
          interaction and brand loyalty effectively.
        </p>
      ),
      box: 2,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Dynamic Video Ads and Tutorials
        </h2>
      ),
      description: (
        <p className="pt-4 text-sm leading-7 text-white/74 max-md:text-xs">
          Video production that showcases your brand, capturing attention and
          delivering impactful messages.
        </p>
      ),
      box: 3,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Brand Positioning
        </h2>
      ),
      description: (
        <p className="pt-4 text-sm leading-7 text-white/74 max-md:text-xs">
          We sharpen the way your product is understood, so people grasp the
          value faster and trust the offer sooner.
        </p>
      ),
      box: 4,
    },
    {
      title: (
        <div>
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/48">
            Kwerky Standard
          </p>
          <h2 className="mt-3 font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
            Story systems that look premium and sell clearly.
          </h2>
        </div>
      ),
      description: (
        <p className="pt-4 max-w-md text-sm leading-7 text-white/74 max-md:text-xs">
          Every asset is designed to explain complex products without making
          them feel complicated.
        </p>
      ),
      box: 5,
    },
    {
      title: (
        <div>
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/48">
            Final Output
          </p>
          <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight text-white md:text-5xl">
            Content that feels sharp, confident, and impossible to ignore.
          </h2>
        </div>
      ),
      description: (
        <p className="pt-4 text-sm leading-7 text-white/74 max-md:text-xs">
          This is what happens when strategy, writing, motion, and presentation
          work as one system.
        </p>
      ),
      box: 6,
    },
  ];
  return (
    <section
      id="features"
      className="bg-black px-4 py-20 text-white sm:px-10 sm:py-24 lg:px-20 xl:px-28"
    >
      <header className="mx-auto max-w-5xl">
        <h1 className="font-general text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white/56 max-lg:text-[0.7rem]">
          Content that Captivates
        </h1>
        <h2 className="mt-4 max-w-3xl font-sans text-4xl font-medium tracking-tight text-white md:text-6xl">
          We go beyond the norm. We are Kwerky.
        </h2>
        <p className="mt-6 max-w-2xl font-robert-regular text-base leading-7 text-white/64 sm:text-lg">
          No filler. No trendy noise. Just clear positioning, better-looking
          communication, and content systems that help technical brands feel
          premium from the first impression onward.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 py-14 sm:gap-6 sm:py-16 lg:h-[90rem] lg:grid-cols-2 lg:grid-rows-9 lg:gap-5 lg:py-20 xl:h-[96rem] xl:gap-8 xl:py-24 2xl:h-[108rem]">
        {cardsData.map((card) => (
          <Card
            key={card.box}
            title={card.title}
            description={card.description}
            video={card.video}
            box={card.box}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
