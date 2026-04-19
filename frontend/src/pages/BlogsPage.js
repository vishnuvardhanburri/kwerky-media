import { Link } from "react-router-dom";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll, Card3D } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";
import { useBlogsPageCms } from "@/lib/cms";

const BlogsPage = () => {
  const cms = useBlogsPageCms();
  const blogs = cms?.blogs || [];
  const bannerImage = cms?.bannerImage || "/brand/blog-banner.png";

  return (
    <div className="min-h-screen pt-20 relative">
      <BackgroundLayers />

      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24 relative section-deep" data-testid="blogs-hero">
        <div className="container mx-auto relative z-10 text-center max-w-5xl">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-4">
              <span className="text-blue-400">Blogs</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Kwerky Media specializes in quirky and compelling blogs that help you stand out in a competitive landscape.
              <span className="block mt-2">Book a call today to discover how we can spotlight your brand!</span>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="mt-10 flex justify-center">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050b16] shadow-[0_24px_90px_rgba(0,0,0,0.35)] max-w-3xl w-full">
                <img src={bannerImage} alt="Kwerky Media collage" className="h-56 w-full object-cover md:h-72" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 py-16 relative section-warm" data-testid="blogs-list">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, i) => (
              <Card3D key={i} delay={i * 0.12} testId={`blog-card-${i}`}>
                <Link to={`/blogs/${blog.slug}`} className="block">
                  <div className="glass rounded-2xl depth-shadow border border-white/8 overflow-hidden h-full group hover:border-blue-400/20 transition-all">
                    <div className="aspect-[16/9] overflow-hidden project-image relative">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-white/40">
                        <span>{blog.author}</span>
                        <span>|</span>
                        <span>{blog.date}</span>
                        <span>|</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">{blog.desc || blog.excerpt}</p>
                      <span className="inline-flex items-center gap-2 mt-4 text-blue-300 text-sm font-medium group-hover:gap-3 transition-all">
                        Read more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;
