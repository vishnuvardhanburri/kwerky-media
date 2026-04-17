import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { Card3D, RevealOnScroll } from "@/components/shared/Animations";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const VIDEO_URLS = {
  services: "https://www.youtube.com/embed/nXaoAh2DVpo",
};

const SERVICES = [
  {
    title: "Website Content",
    desc: "Populate your website with content that:",
    points: [
      "Tells your story in a way that resonates with your audience.",
      "Describes your products in a way that is easily understood, whether your audience is tech-savvy or not.",
      "Highlights success stories that allow potential clients to step into the shoes of your existing ones.",
      "Inspires readers with the entrepreneurial journeys of founders and the accomplishments of your executives.",
      "Engages visitors by creating experiences that naturally convert into leads.",
      "All of this, accompanied by captivating images that draw visitors in.",
    ],
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
  },
  {
    title: "Blogs",
    desc: "Blogs build brand authority by providing deeper insights into a company and its products.",
    points: [
      "They drive traffic and enhance SEO, making your brand more discoverable.",
      "We craft blogs with a twist—blending research-backed discoveries with expert insights.",
      "Our approach goes beyond generic content—we conduct expert interviews and use an engaging writing style that makes our blogs stand out in a sea of sameness.",
      "Search engines love our blogs—Packed with strategically placed keywords, they’re not just SEO-friendly—they’re practically waving at your potential clients saying, “Hey, over here!”",
    ],
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"
  },
  {
    title: "Social Media Posts and Marketing Campaigns",
    desc: "Out of sight, out of cart. What’s seen is what sells.",
    points: [
      "Give your tech the spotlight it deserves with our Kwerky social media posts and marketing campaigns.",
      "We craft social content that surprises first, smiles second, and sells third.",
      "We take it a notch up and say it’s not just about being seen; it’s about being remembered. Our posts don’t just catch eyes; they spark clicks, comments, and conversations.",
      "Whether you're just gearing up for launch or riding the momentum after it, our marketing campaigns align with your timeline and help bring more traffic to your product page.",
    ],
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
  },
  {
    title: "Slide Decks",
    desc: "A killer presentation says more with less.",
    points: [
      "We design slides that speak volumes using fewer words—clear, sharp, and easy to absorb.",
      "Carefully crafted sentences, paired with the right visuals.",
      "Every line is written with purpose and paired with visuals that leave a lasting impression.",
      "Balanced storytelling and statistics.",
      "We blend narrative and numbers to keep your audience engaged from start to finish.",
      "Every slide has a takeaway.",
      "No fluff—just insights that support decision-making and spark meaningful conversations.",
      "Optimized for every screen.",
      "Our decks are built for both mobile and desktop, so your message lands no matter the device.",
    ],
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  },
  {
    title: "Videos",
    desc: "A picture speaks a thousand words.",
    points: [
      "But a motion picture? It grabs attention and keeps it.",
      "Videos break down complex ideas into snackable, memorable visuals.",
      "Whether it’s a product ad or a how-to tutorial, we make it Kwerky—so your audience stays tuned, not zoned out.",
      "The result? Higher conversions. Smoother learning curves. Scroll-stopping engagement.",
    ],
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
  }
];

const ServicesPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-screen pt-20 relative bg-black">
      <BackgroundLayers />

      <section className="px-6 py-24 relative section-deep" data-testid="services-hero">
        <div className="container mx-auto max-w-6xl relative z-10 grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <RevealOnScroll>
            <div className="text-left">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Services</p>
              <h1 className="text-5xl font-bold leading-[0.96] text-white md:text-7xl">
                Why Choose Kwerky Media?
              </h1>
              <p className="mt-6 text-white/55 text-base md:text-lg max-w-xl">
                Tech companies are laser-focused on product innovation and development—that’s their niche.
              </p>
              <div className="mt-8 space-y-5 text-white/55 text-base md:text-lg leading-relaxed max-w-2xl">
                <p>1. Tech companies are laser-focused on product innovation and development—that’s their niche.</p>
                <p>2. Content development often becomes an afterthought as resources are fully dedicated to bringing the product to life.</p>
                <p>3. We fill the missing piece of the content puzzle, completing the picture of your product.</p>
                <p>4. We also bring art to your tech with Kwerky content that first dazzles your readers, then prompts them to pause and reflect.</p>
                <p>5. People perceive your tech as it’s meant to be, with moments of meaningful content engagement along the way.</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b16] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
                  <div className="grid gap-4 p-5 md:grid-cols-[1.35fr_0.65fr] md:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <img src="/brand/services-promo.jpg" alt="Kwerky Media services promo" className="h-full w-full object-cover aspect-[4/3] md:aspect-[5/4]" />
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                    <img src="/brand/contact-promo.png" alt="Kwerky Media contact promo" className="h-44 w-full object-cover md:h-full" />
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

      <section className="px-6 py-16 relative" data-testid="services-detail">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white">Content Solutions</h2>
              <p className="mt-3 text-white/50 max-w-3xl mx-auto">
                Tailored content strategies for tech companies, enhancing brand narratives.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6">
            {SERVICES.map((service, index) => (
              <Card3D key={service.title} delay={index * 0.06} testId={`service-detail-${index}`}>
                <div className="rounded-[1.75rem] border border-white/10 bg-[#050b16] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.35)] md:p-9">
                  <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                        <svg className="h-8 w-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white md:text-3xl">{service.title}</h2>
                      <p className="mt-3 text-white/55 leading-relaxed">{service.desc}</p>
                      <ul className="mt-6 grid gap-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-white/45 text-sm leading-relaxed">
                            <svg className="mt-0.5 h-4 w-4 text-blue-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

      <section className="px-6 py-20 relative section-deep" data-testid="services-video">
        <div className="container mx-auto max-w-5xl relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Videos</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white">Explore our Kwerky videos</h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b16] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div className="aspect-video">
                <iframe
                  src={VIDEO_URLS.services}
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

      <section className="px-6 py-24 relative section-blue" data-testid="contact-section">
        <div className="container mx-auto max-w-3xl relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Contact</p>
              <h2 className="text-5xl font-bold leading-[0.96] text-white md:text-6xl">
                Let&apos;s discuss your project
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-[#050b16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-8"
              data-testid="contact-form"
            >
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400"
                    placeholder="Enter your name"
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400"
                    placeholder="Enter your email"
                    data-testid="contact-email"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400"
                    placeholder="Type your message"
                    data-testid="contact-message"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(37,99,235,0.3)] transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="contact-submit"
                >
                  {isSubmitting ? "Sending..." : "Let's discuss your project"}
                </motion.button>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
