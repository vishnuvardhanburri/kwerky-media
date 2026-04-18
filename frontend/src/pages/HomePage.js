import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import TextParallaxSection from "@/components/shared/TextParallaxSection";
import { Card3D, RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";
import Ethereal from "@/components/ui/ethereal";

const SERVICES = [
  {
    title: "Content Creation",
    desc: "We craft compelling narratives that resonate with your audience, elevating your brand's presence in the market.",
    image: "/brand/service-content-laptop.jpg"
  },
  {
    title: "Social Media",
    desc: "Engaging posts and strategies that connect with your audience, driving interaction and brand loyalty effectively.",
    image: "/brand/service-social-trojan.jpg"
  },
  {
    title: "Dynamic Video Ads and Tutorials",
    desc: "Video production that showcases your brand, capturing attention and delivering impactful messages.",
    image: "/brand/service-video-typewriter.jpg"
  }
];

const PROOF = [
  {
    title: "Elephanttree",
    location: "Bangalore",
    quote: "Kwerky Media transformed our storytelling, engaging our target audience effectively. Highly recommend!"
  },
  {
    title: "SNIPE TECH",
    location: "Bangalore",
    quote: "Thanks to Kwerky Media, our brand presence has grown significantly, capturing attention and driving engagement through innovative content strategies tailored specifically for tech companies."
  }
];

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundLayers />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 origin-left z-[60]"
        style={{ scaleX }}
      />

      <section className="relative min-h-screen overflow-hidden px-6 pt-24" data-testid="hero-section">
        <Ethereal />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.92))]" />

        <div className="container mx-auto min-h-[calc(100vh-6rem)] max-w-6xl py-16 relative z-10">
          <div className="max-w-3xl lg:pl-6">
            <RevealOnScroll>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-blue-300/80">
                Kwerky Media
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.05}>
              <h1 className="text-5xl font-bold leading-[0.94] text-white md:text-6xl lg:text-7xl">
                <span className="block">Content and Growth Partner</span>
                <span className="block text-blue-300">for Tech Companies</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                Kwerky Media is a dynamic content and growth partner for tech companies. With over a decade of expertise in strategic storytelling and technology content creation, we help businesses gain the spotlight they deserve.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.32)] transition-colors hover:bg-blue-500"
                    data-testid="hero-cta"
                  >
                    Connect with us!
                  </Link>
                </motion.div>
                <span className="text-sm text-white/45">Get your spotlight.</span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <TextParallaxSection
        eyebrow="Value"
        title={"Content that\nCaptivates"}
        description="We go beyond the norm. We are Kwerky."
        className="section-midnight"
      />

      <section className="relative px-6 py-28 section-midnight" data-testid="services-section">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
                Services
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Card3D key={service.title} delay={index * 0.08} testId={`service-card-${index}`}>
                <div className="h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b16] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/55">{service.desc}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 section-midnight" data-testid="proof-section">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
                Proof
              </p>
              <h2 className="text-4xl font-bold leading-[0.96] text-white md:text-6xl">
                Clients Click on the 5th Star – Because They Know 4 Doesn&apos;t Do Justice!
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PROOF.map((item, index) => (
              <Card3D key={item.title} delay={index * 0.08} testId={`proof-card-${index}`}>
                <div className="h-full rounded-[1.75rem] border border-white/10 bg-[#050b16] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.35)] md:p-8">
                  <p className="text-white/70 text-lg leading-relaxed">★★★★★</p>
                  <p className="mt-4 text-white/70 text-lg leading-relaxed">&quot;{item.quote}&quot;</p>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-blue-400/30 via-white/10 to-transparent" />
                  <p className="mt-4 text-sm font-semibold text-blue-300">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">{item.location}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 section-midnight" data-testid="cta-section">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="text-5xl font-bold leading-[0.96] text-white md:text-7xl">
              Connect with us!
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-10">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-500"
                data-testid="cta-button"
              >
                Get your spotlight.
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
