import { useState } from "react";
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterSubmitted(true);
    setNewsletterEmail("");
    window.setTimeout(() => setNewsletterSubmitted(false), 2400);
  };

  const toggleVideoAudio = () => {
    setVideoMuted(!videoMuted);
  };

  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundLayers />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 origin-left z-[60]"
        style={{ scaleX }}
      />

      <section id="hero-section" className="relative min-h-screen overflow-hidden px-6 pt-24" data-testid="hero-section">
        <Ethereal />

        <div className="container mx-auto min-h-[calc(100vh-6rem)] max-w-6xl py-20 relative z-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_0.9fr]">
            <div className="max-w-3xl lg:max-w-2xl">
              <RevealOnScroll>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.52em] text-[#FF9B30]">Kwerky Media</p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.05}>
                <div className="torch-text">
                  <h1 className="text-5xl font-bold leading-[0.92] tracking-[-0.03em] text-white md:text-6xl lg:text-[5.8rem]">
                    <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-[#FF9B30] bg-clip-text text-transparent">Kwerky Media</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-[#FF9B30] bg-clip-text text-transparent">Content and growth partner for tech companies</span>
                  </h1>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.12}>
                <p className="mt-8 text-lg leading-relaxed text-white">
                  We help tech brands tell their story clearly, creatively, and consistently — from videos and posts to growth-driven campaigns.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-500"
                      data-testid="hero-cta"
                    >
                      Connect with us!
                    </Link>
                  </motion.div>
                  <span className="text-sm text-white/70">Ready for brand stories that convert?</span>
                </div>
              </RevealOnScroll>
            </div>

            <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[#02080f] p-4 shadow-[0_32px_90px_rgba(59,130,246,0.16)] md:block">
              <video
                src="/brand/aurora.mp4"
                alt="Animated hero content for Kwerky Media"
                className="h-full w-full rounded-[1.5rem] object-cover opacity-95"
                autoPlay
                muted={videoMuted}
                loop
                playsInline
              />
              <button
                onClick={toggleVideoAudio}
                className="absolute bottom-6 right-6 z-10 rounded-full bg-black/50 p-3 text-white/70 transition-all hover:bg-black/70 hover:text-white"
                aria-label={videoMuted ? "Unmute video" : "Mute video"}
              >
                {videoMuted ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <TextParallaxSection
        eyebrow="Value"
        title={"Content that\nCaptivates"}
        description="We go beyond the norm. We are Kwerky."
        className="section-midnight"
        id="value-section"
      />

      <section id="services-section" className="relative px-6 py-32 section-midnight" data-testid="services-section">
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
                <div className="relative z-[1] h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#030712]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#040816]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/55">{service.desc}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section id="proof-section" className="relative px-6 py-32 section-midnight" data-testid="proof-section">
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
                <div className="relative z-[1] h-full rounded-[1.75rem] border border-white/10 bg-[#030712] p-8 md:p-10">
                  <p className="text-lg leading-relaxed text-white/70">★★★★★</p>
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

      <section id="cta-section" className="relative px-6 py-32 section-midnight" data-testid="cta-section">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="text-5xl font-bold leading-[0.92] tracking-[-0.03em] text-white md:text-7xl">
              Connect with us!
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-10">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.2)] transition-colors hover:bg-blue-500"
                data-testid="cta-button"
              >
                Get your spotlight.
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="newsletter-section" className="relative px-6 py-24 section-deep" data-testid="newsletter-section">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-white/10 bg-[#040811] p-8 shadow-[0_24px_90px_rgba(59,130,246,0.16)]">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF9B30]">Newsletter</p>
                <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                  Stay ahead with Kwerky insights
                </h2>
                <p className="mt-4 max-w-xl text-white">
                  No spam. Only high-impact content ideas.
                </p>
              </div>

              <form className="grid gap-4 sm:grid-cols-[1fr_auto]" onSubmit={handleNewsletterSubmit}>
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none transition-colors focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
            {newsletterSubmitted && (
              <p className="mt-6 text-sm text-blue-300">Thanks, you’re subscribed for updates.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
