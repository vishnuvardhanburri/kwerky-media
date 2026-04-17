import { useParams, Link } from "react-router-dom";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RevealOnScroll } from "@/components/shared/Animations";
import Footer from "@/components/shared/Footer";

const BLOG_DATA = {
  "understanding-blockchain-and-bitcoin": {
    title: "Understanding Blockchain and Bitcoin",
    author: "Shashikanth Peetla",
    date: "5/8/2024",
    readTime: "5 min read",
    image: "/brand/blog-blockchain.png",
    content: [
      "An insightful take on what blockchain and bitcoin really mean, beyond the buzzwords.",
      "Blockchain technology has emerged as one of the most transformative innovations of the 21st century. At its core, blockchain is a distributed, decentralized digital ledger that records transactions across many computers in such a way that the registered transactions cannot be altered retroactively.",
      "Bitcoin, the first and most well-known application of blockchain technology, was introduced in 2009 by an anonymous person (or group) using the pseudonym Satoshi Nakamoto. It was designed as a peer-to-peer electronic cash system that eliminates the need for intermediaries like banks.",
      "The key innovation of blockchain is its ability to establish trust in a trustless environment. Each block in the chain contains a cryptographic hash of the previous block, a timestamp, and transaction data. This creates an immutable record that is virtually impossible to tamper with.",
      "For tech companies, understanding blockchain goes beyond cryptocurrency. The technology has applications in supply chain management, healthcare records, digital identity verification, smart contracts, and much more. As a content partner for tech companies, Kwerky Media helps break down these complex concepts into digestible, engaging content that resonates with both technical and non-technical audiences."
    ]
  },
  "data-center-vs-cloud": {
    title: "Traditional Data Center vs. Cloud Data Center vs. Cloud Computing",
    author: "Shashikanth Peetla",
    date: "5/8/2024",
    readTime: "2 min read",
    image: "/brand/blog-cloud.jpg",
    content: [
      "Discover where the differences end, the similarities begin, and how the lines between them continue to blur.",
      "In today's rapidly evolving tech landscape, understanding the distinction between traditional data centers, cloud data centers, and cloud computing is essential for any technology company looking to make informed infrastructure decisions.",
      "A traditional data center is a physical facility that organizations use to house their critical applications and data. It typically includes servers, storage systems, networking equipment, and dedicated power and cooling systems, all maintained on-premises by the organization's IT team.",
      "A cloud data center, on the other hand, operates similarly but is owned and managed by a third-party provider. These facilities are designed for massive scale, with redundant systems and advanced automation. Companies access resources through the internet rather than managing physical hardware.",
      "Cloud computing takes this a step further by abstracting the infrastructure entirely. Users access computing resources — processing power, storage, databases, networking, and software — as services over the internet. The cloud provider handles all the underlying infrastructure.",
      "The lines between these three models continue to blur as hybrid and multi-cloud strategies become increasingly popular. Many organizations now use a combination of on-premises data centers, cloud data centers, and cloud computing services to optimize their operations."
    ]
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const blog = BLOG_DATA[slug];

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
            {blog.content.map((paragraph, i) => (
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
