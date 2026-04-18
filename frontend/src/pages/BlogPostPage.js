import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";
import { DEFAULT_BLOGS, getBlogPostData } from "@/lib/cms";

const BlogPostPage = () => {
  const { slug } = useParams();
  const defaultBlog = DEFAULT_BLOGS.find((item) => item.slug === slug) || null;
  const [blog, setBlog] = useState(defaultBlog);
  const [loading, setLoading] = useState(!defaultBlog);

  useEffect(() => {
    let alive = true;
    if (!defaultBlog) {
      setLoading(true);
    }
    getBlogPostData(slug).then((data) => {
      if (alive) {
        setBlog(data);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [slug, defaultBlog]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 relative flex items-center justify-center">
        <BackgroundLayers />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Loading blog...</h1>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 relative flex items-center justify-center">
        <BackgroundLayers />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog not found</h1>
          <Link to="/blogs" className="text-blue-400 hover:text-blue-300">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative">
      <BackgroundLayers />

      <article className="px-6 py-24 relative" data-testid="blog-post">
        <div className="container mx-auto max-w-3xl relative z-10">
          <RevealOnScroll>
            <Link to="/blogs" className="text-blue-400 hover:text-blue-300 text-sm mb-8 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Back to Blogs
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-8">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="flex items-center gap-3 mb-4 text-xs text-white/40">
              <span>{blog.author}</span>
              <span>|</span>
              <span>{blog.date}</span>
              <span>|</span>
              <span>{blog.readTime}</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{blog.title}</h1>
          </RevealOnScroll>

          <div className="space-y-6">
            {(blog.content || []).map((paragraph, i) => (
              <RevealOnScroll key={i} delay={0.25 + i * 0.05}>
                <p className={`text-white/60 leading-relaxed text-lg ${i === 0 ? 'text-xl text-white/70 font-light' : ''}`}>
                  {paragraph}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
