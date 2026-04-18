import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useLocation } from "react-router-dom";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { Card3D, RevealOnScroll } from "@/components/shared/Animations";
import { DEFAULT_SERVICES_DETAIL, DEFAULT_SERVICES_PAGE, getServicesPageData } from "@/lib/cms";

const SERVICE_ANCHORS = [
  ["content-creation", "website-development"],
  [],
  ["social-media"],
  ["graphic-designing"],
  ["video-ads"],
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@kwerkymedia25", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kwerky-media/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/kwerkymedia/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { label: "Twitter", href: "https://x.com/kwerkymedia", icon: Twitter },
];

const ServicesPage = () => {
  const location = useLocation();
  const [cms, setCms] = useState({
    page: DEFAULT_SERVICES_PAGE,
    services: DEFAULT_SERVICES_DETAIL,
  });

  useEffect(() => {
    let alive = true;
    getServicesPageData().then((data) => {
      if (alive) setCms(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  const page = cms?.page || {};
  const services = cms?.services || [];
  const videoUrl = page.videoUrl || "https://www.youtube.com/embed/nXaoAh2DVpo";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen relative bg-black pt-20"
    >
      <BackgroundLayers />

      <section className="relative px-6 py-24 section-deep" data-testid="services-hero">
        <div className="container mx-auto grid max-w-6xl items-center gap-12 relative z-10 lg:grid-cols-[0.92fr_1.08fr]">
          <RevealOnScroll>
            <div className="text-left">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Services</p>
              <h1 className="torch-text text-5xl font-bold leading-[0.96] text-white md:text-7xl">
                <span className="text-blue-300">Why Choose</span>{" "}
                <span className="text-[#ffb347]">Kwerky Media?</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-white/75">
                {page.heroSub || "Tech companies are laser-focused on product innovation and development—that’s their niche."}
              </p>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-white/72 md:text-lg">
                {(page.reasons || []).map((reason, index) => (
                  <p key={reason}>
                    {index + 1}. {reason}
                  </p>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b16] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="grid gap-4 p-5 md:grid-cols-[1.35fr_0.65fr] md:p-6">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <img
                    src="/brand/services-promo.jpg"
                    alt="Kwerky Media services promo"
                    className="aspect-[4/3] h-full w-full object-cover md:aspect-[5/4]"
                  />
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                    <img
                      src="/brand/contact-promo.png"
                      alt="Kwerky Media contact promo"
                      className="h-44 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
                    <img src="/brand/big-logo.png" alt="Kwerky Media logo" className="h-20 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative px-6 py-16" data-testid="services-detail">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <h2 className="torch-text text-4xl font-bold text-white md:text-6xl">
                <span className="text-blue-300">Content</span>{" "}
                <span className="text-[#ffb347]">Solutions</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-white/70">
                {page.contentSub || "Tailored content strategies for tech companies, enhancing brand narratives."}
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6">
            {services.map((service, index) => (
              <Card3D key={service.title} delay={index * 0.06} testId={`service-detail-${index}`}>
                <div className="rounded-[1.75rem] border border-white/10 bg-[#050b16] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.35)] md:p-9">
                  {SERVICE_ANCHORS[index]?.map((anchor) => (
                    <span key={anchor} id={anchor} className="sr-only">
                      {anchor}
                    </span>
                  ))}
                  <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ffb347]/20 bg-[#ffb347]/10">
                        <svg className="h-8 w-8 text-[#ffb347]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white md:text-3xl">{service.title}</h2>
                      <p className="mt-3 leading-relaxed text-white/75">{service.description || service.desc}</p>
                      <ul className="mt-6 grid gap-2">
                        {(service.points || []).map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-white/60">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffb347]" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section id="services-video" className="relative px-6 py-20 section-deep" data-testid="services-video">
        <div className="container mx-auto max-w-5xl relative z-10">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Videos</p>
              <h2 className="text-4xl font-bold text-white md:text-6xl">
                <span className="text-blue-300">Explore</span>{" "}
                <span className="text-[#ffb347]">our Kwerky videos</span>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b16] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="Kwerky Media video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="contact-info-section" className="relative px-6 py-24 section-blue" data-testid="contact-info-section">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Contact</p>
              <h2 className="torch-text text-5xl font-bold leading-[0.96] text-white md:text-6xl">
                <span className="text-blue-300">Let&apos;s</span>{" "}
                <span className="text-[#ffb347]">discuss your project</span>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75">
                This is the direct contact info section. No form here, only the details your team needs.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-white/10 bg-[#050b16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-8">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
                    <Phone className="h-5 w-5 text-[#ffb347]" />
                    <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Phone</p>
                    <a href="tel:08031548088" className="mt-2 block text-lg font-semibold text-white">
                      08031548088
                    </a>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
                    <Mail className="h-5 w-5 text-[#ffb347]" />
                    <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Email</p>
                    <a href="mailto:hello@kwerkymedia.com" className="mt-2 block text-lg font-semibold text-white break-words">
                      hello@kwerkymedia.com
                    </a>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
                    <MapPin className="h-5 w-5 text-[#ffb347]" />
                    <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Location</p>
                    <p className="mt-2 text-lg font-semibold text-white">Bangalore</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#050b16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Social</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75 transition-colors hover:border-[#ffb347]/30 hover:text-[#ffb347]"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
