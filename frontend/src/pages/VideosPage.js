import { motion } from "framer-motion";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";

const VideosPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 relative bg-black"
    >
      <BackgroundLayers />

      <section className="min-h-[72vh] flex items-center justify-center px-6 py-24 relative section-deep" data-testid="videos-hero">
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <RevealOnScroll>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] text-white">
                Videos
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.12}>
              <p className="mt-6 text-lg text-white/55">
                Explore our Kwerky videos that offer a fresh take on technology.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-3 text-base text-white/35">
                Follow us to stay tuned for more of our Kwerky content!
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.24}>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                "/brand/hero.jpg",
                "/brand/services-promo.jpg",
                "/brand/contact-promo.png",
              ].map((src, index) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050b16] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  <img
                    src={src}
                    alt={`Kwerky Media video visual ${index + 1}`}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default VideosPage;
