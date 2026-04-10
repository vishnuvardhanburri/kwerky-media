import Card from '../components/card';

const Features = () => {
  const cardsData = [
    {
      title: (
        <h2 className="font-sans text-4xl font-medium tracking-tight text-white md:text-6xl">
          Content Creation
        </h2>
      ),
      description: (
        <p className="pt-3 text-sm leading-7 text-white/72 max-md:text-xs">
          We craft compelling narratives that resonate with your audience,
          elevating your brand&apos;s presence in the market.
        </p>
      ),
      video: 'videos/feature-1.mp4',
      box: 1,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Social Media
        </h2>
      ),
      description: (
        <p className="pt-3 text-sm leading-7 text-white/72 max-md:text-xs">
          Engaging posts and strategies that connect with your audience, driving
          interaction and brand loyalty effectively.
        </p>
      ),
      video: 'videos/feature-3.mp4',
      box: 2,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Dynamic Video Ads and Tutorials
        </h2>
      ),
      description: (
        <p className="pt-3 text-sm leading-7 text-white/72 max-md:text-xs">
          Video production that showcases your brand, capturing attention and
          delivering impactful messages.
        </p>
      ),
      video: 'videos/feature-2.mp4',
      box: 3,
    },
    {
      title: (
        <h2 className="font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
          Brand Positioning
        </h2>
      ),
      description: (
        <p className="pt-3 text-sm leading-7 text-white/72 max-md:text-xs">
          We sharpen the way your product is understood, so people grasp the
          value faster and trust the offer sooner.
        </p>
      ),
      video: 'videos/feature-4.mp4',
      box: 4,
    },
    {
      title: (
        <div>
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/52">
            Kwerky Standard
          </p>
          <h2 className="mt-3 font-sans text-3xl font-medium tracking-tight text-white md:text-5xl">
            Story systems that look premium and sell clearly.
          </h2>
        </div>
      ),
      description: (
        <p className="pt-3 max-w-md text-sm leading-7 text-white/72 max-md:text-xs">
          Every asset is designed to explain complex products without making
          them feel complicated.
        </p>
      ),
      video: 'videos/hero-1.mp4',
      box: 5,
    },
    {
      title: (
        <div>
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/52">
            Final Output
          </p>
          <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight text-white md:text-5xl">
            Content that feels sharp, confident, and impossible to ignore.
          </h2>
        </div>
      ),
      description: (
        <p className="pt-3 text-sm leading-7 text-white/72 max-md:text-xs">
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
      className="bg-black px-4 py-16 text-white sm:px-10 sm:py-20 lg:px-24 xl:px-40"
    >
      <header className="mx-auto max-w-4xl">
        <h1 className="font-general text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white/56 max-lg:text-[0.7rem]">
          Content that Captivates
        </h1>
        <h2 className="mt-4 max-w-3xl font-sans text-4xl font-medium tracking-tight text-white md:text-6xl">
          We go beyond the norm. We are Kwerky.
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-6 py-14 sm:gap-6 sm:py-16 lg:h-[90rem] lg:grid-cols-2 lg:grid-rows-9 lg:gap-5 lg:py-24 xl:h-[100rem] xl:gap-10 xl:py-32 2xl:h-[125rem]">
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
