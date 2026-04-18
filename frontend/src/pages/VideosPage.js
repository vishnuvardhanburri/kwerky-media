import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";
import { DEFAULT_VIDEOS, getVideosPageData } from "@/lib/cms";

const VideosPage = () => {
  const [cms, setCms] = useState({
    videos: DEFAULT_VIDEOS,
  });

  useEffect(() => {
    let alive = true;
    getVideosPageData().then((data) => {
      if (alive) setCms(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const videos = cms?.videos || [];

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
            <div className="mt-12 grid gap-6 lg:grid-cols-3 md:grid-cols-2">
              {videos.map((video, index) => (
                <div
                  key={video.title}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050b16] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  <div className="aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Videos</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{video.title}</h3>
                  </div>
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
