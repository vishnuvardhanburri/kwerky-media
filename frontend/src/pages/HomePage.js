import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import TextParallaxSection from "@/components/shared/TextParallaxSection";
import { Card3D, RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";
import { useSiteActions } from "@/context/site-actions";
import { formatCmsTitle, useHomePageCms } from "@/lib/cms";

const HomePage = () => {
  const { openContactInfo } = useSiteActions();
  const heroVideoRef = useRef(null);
  const [heroSoundOn, setHeroSoundOn] = useState(false);
  const content = useHomePageCms();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const home = content?.home || {};
  const services = content?.services || [];
  const proof = content?.testimonials || [];

  const heroLines = (home.heroTitle || "Content and growth partner for tech companies").includes("\n")
    ? (home.heroTitle || "").split("\n").filter(Boolean)
    : ["Content and growth partner", "for tech companies"];

  const valueTitle = formatCmsTitle(home.valueTitle || "Content that Captivates");

  const enableHeroAudio = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setHeroSoundOn(true);
    } catch {
      setHeroSoundOn(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundLayers />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue-400 via-blue-500 to-[#ffb347]"
        style={{ scaleX }}
      />

      <section id="hero-section" className="relative min-h-screen overflow-hidden px-6 pt-24" data-testid="hero-section">
        <div className="hero-stage-media absolute inset-0 overflow-hidden">
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover object-center"
            src="/brand/stage-reveal.mp4"
            poster="/brand/hero.jpg"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero-stage-overlay absolute inset-0" />
          <button
            type="button"
            onClick={enableHeroAudio}
            className="absolute right-6 top-28 z-20 rounded-full border border-blue-400/30 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm transition-colors hover:bg-blue-500 hover:text-white"
          >
            {heroSoundOn ? "Sound on" : "Play with sound"}
          </button>
        </div>

        <div className="container relative z-10 mx-auto min-h-[calc(100vh-6rem)] max-w-6xl py-20">
          <div className="grid items-center gap-14 lg:pt-10">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em]">
                  <span className="text-blue-300">Kwerky</span>
                  <span className="text-[#ffb347]">Media</span>
                  <span className="text-white">:</span>
                  <span className="text-white/78 uppercase tracking-[0.34em]">Content and growth partner for tech companies</span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.05}>
                <h1 className="torch-text max-w-3xl text-5xl font-bold leading-[0.9] tracking-[-0.04em] text-white md:text-6xl lg:text-[5.8rem]">
                  {heroLines.map((line, index) => (
                    <span key={`${line}-${index}`} className={`block ${index === heroLines.length - 1 ? "text-blue-300" : "text-white"}`}>
                      {line}
                    </span>
                  ))}
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.12}>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-white/82 md:text-lg">
                  {home.heroSub || "Kwerky Media is a dynamic content and growth partner for tech companies. With over a decade of expertise in strategic storytelling and technology content creation, we help businesses gain the spotlight they deserve."}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openContactInfo}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-500"
                    data-testid="hero-cta"
                  >
                    {home.ctaText || "Let's discuss your project"}
                  </motion.button>
                  <a href="#site-footer" className="text-sm text-white/72 transition-colors hover:text-[#ffb347]">
                    Connect with us
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <TextParallaxSection
        eyebrow="Value"
        title={valueTitle}
        description={home.valueSub || "We go beyond the norm. We are Kwerky."}
        body={`${home.heroSub || "Kwerky Media is a dynamic content and growth partner for tech companies."} Power resides where people believe it does — no more, no less.`}
        images={services.map((service) => service.image).filter(Boolean)}
        className="section-midnight"
        id="value-section"
      />

      <section id="services-section" className="relative section-midnight px-6 py-32" data-testid="services-section">
        <div className="container relative z-10 mx-auto max-w-6xl">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Services</p>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Card3D key={service.title} delay={index * 0.08} testId={`service-card-${index}`}>
                <div className="surface-card relative z-[1] h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#030712]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#040816]">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{service.desc || service.description}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section id="proof-section" className="relative section-midnight px-6 py-32" data-testid="proof-section">
        <div className="container relative z-10 mx-auto max-w-6xl">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Proof</p>
              <h2 className="torch-text text-4xl font-bold leading-[0.96] text-white md:text-6xl">
                Clients Click on the <span className="text-blue-300">5th Star</span> – Because They Know 4 Doesn&apos;t Do Justice!
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {proof.map((item, index) => (
              <Card3D key={item.title || item.company} delay={index * 0.08} testId={`proof-card-${index}`}>
                <div className="surface-card relative z-[1] h-full rounded-[1.75rem] border border-white/10 bg-[#030712] p-8 md:p-10">
                  <p className="text-lg leading-relaxed text-white/70">★★★★★</p>
                  <p className="mt-4 text-lg leading-relaxed text-white/70">&quot;{item.quote}&quot;</p>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-blue-400/30 via-white/10 to-transparent" />
                  <p className="mt-4 text-sm font-semibold text-blue-300">{item.title || item.company}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">{item.location}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-section" className="relative section-midnight px-6 py-32" data-testid="cta-section">
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <RevealOnScroll>
            <h2 className="torch-text text-5xl font-bold leading-[0.92] tracking-[-0.03em] text-white md:text-7xl">
              <span className="text-blue-300">Let&apos;s</span> <span className="text-[#ffb347]">discuss</span> <span className="text-white">your project</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-10">
              <button
                type="button"
                onClick={openContactInfo}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.2)] transition-colors hover:bg-blue-500"
                data-testid="cta-button"
              >
                {home.ctaText || "Let's discuss your project"}
              </button>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
