import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll, Card3D } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 relative">
      <BackgroundLayers />

      {/* Hero */}
      <section className="min-h-[70vh] px-6 py-24 relative section-warm" data-testid="about-hero">
        <div className="container mx-auto relative z-10 grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
                About Us
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95]">
                <span className="block text-white">Your Partner in</span>
                <span className="block text-blue-300">Tech Storytelling</span>
              </h1>
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
                Kwerky Media is the result of more than a decade of tech storytelling—and a childlike excitement that&apos;s stayed with us since we wrote our very first tech story.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12}>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b16] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[16/11]">
                <img src="/brand/about-collage.png" alt="Kwerky Media collage" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/55 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Kwerky Media</p>
                  <p className="text-sm font-semibold text-white">Founders and brand story</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-16 relative section-deep" data-testid="about-story">
        <div className="container mx-auto max-w-4xl relative z-10">
          <RevealOnScroll>
            <div className="glass rounded-2xl depth-shadow border border-white/8 p-8 md:p-12">
              <p className="text-white/60 leading-relaxed mb-6">
                Change is the only constant, yes, but our love for tech storytelling has never wavered. It still defines—and continues to define—the people behind Kwerky Media: Shashikanth Peetla and Mithun Mohan.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                Our unique storytelling style lies in capturing complex tech topics in simple words and presenting them in a quirky way that not only sets us apart but also amuses readers and leaves a lasting impression. Perhaps this very quality inspired our name, Kwerky—and we hope the content on this website offers you a glimpse into that spirit.
              </p>
              <p className="text-white/60 leading-relaxed">
                The idea for Kwerky Media brewed over countless roadside chai cups and mojito glasses, as Shashikanth and Mithun often discussed the content challenges tech companies face—challenges they witnessed firsthand during their interactions with tech clients at their previous media organizations. Tech companies often lack a dedicated content team to tell their story, as their resources are fully focused on building products that solve market and operational challenges for their clients.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Founders */}
      <section className="px-6 py-24 relative section-blue" data-testid="founders-section">
        <div className="container mx-auto max-w-5xl relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-white">About </span>
              <span className="text-blue-300">Kwerky Media</span>
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            <Card3D delay={0.1} testId="founder-shashi">
              <div className="glass rounded-2xl depth-shadow border border-white/8 overflow-hidden h-full bg-[#050b16]">
                <div className="p-6 md:p-8">
                  <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">Shashikanth Peetla</p>
                  <h3 className="text-xl font-bold text-white mb-4">Shashikanth Peetla:</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    I have over a decade of media experience writing profiles, cover stories, blogs, and ad copies for tech companies. Previously, I served as an Assistant Managing Editor, overseeing more than 20 technology magazines. Over the years, I&apos;ve mastered the art and science of digital marketing — from copywriting and editing to campaign design and SEO. I look forward to partnering with you to craft a great tech story.
                  </p>
                  <a href="https://www.linkedin.com/in/shashikanth-p-59911564/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm" data-testid="shashi-linkedin">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </Card3D>

            <Card3D delay={0.2} testId="founder-mithun">
              <div className="glass rounded-2xl depth-shadow border border-white/8 overflow-hidden h-full bg-[#050b16]">
                <div className="p-6 md:p-8">
                  <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">Mithun Mohan</p>
                  <h3 className="text-xl font-bold text-white mb-4">Mithun Mohan:</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    I have over a decade of experience closing deals and delivering on promises. I&apos;ve partnered with clients from project initiation to completion, overseeing each stage until final delivery met their expectations. I&apos;m usually the first point of contact and am responsible for building and maintaining long-term client relationships. I&apos;m excited about Kwerky Media and look forward to a fruitful partnership with you.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/emithunmohan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    data-testid="mithun-linkedin"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 relative section-deep" data-testid="founders-notes">
        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="max-w-2xl mb-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">
                Founder Notes
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-[0.96] text-white">
                They sound like <span className="text-blue-300">the team</span>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Shashikanth Peetla",
                role: "Co-Founder",
                image: "/brand/founder-shashi.avif",
                text: "I write profiles, cover stories, blogs, and ad copies that make tech brands feel clear, credible, and memorable.",
              },
              {
                name: "Mithun Mohan",
                role: "Co-Founder",
                image: "/brand/founder-mithun.avif",
                text: "I guide clients from first contact to final delivery, building partnerships that last beyond the project.",
              },
            ].map((founder, index) => (
              <Card3D key={founder.name} delay={index * 0.08} testId={`founder-note-${index}`}>
                <div className="h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b16] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                  <div className="aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-300/80">{founder.role}</p>
                    <h3 className="mt-3 text-2xl font-bold text-white">{founder.name}</h3>
                    <p className="mt-4 text-white/55 leading-relaxed">{founder.text}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
