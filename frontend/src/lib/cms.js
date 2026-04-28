import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "@sanity/preview-kit";
import { sanityFetch, sanityImage, splitHeadline, homepageQuery } from "@/lib/sanity";

const DEFAULT_HOME = {
  heroTitle: "Content and growth partner for tech companies",
  heroSub:
    "Kwerky Media is a dynamic content and growth partner for tech companies. With over a decade of expertise in strategic storytelling and technology content creation, we help businesses gain the spotlight they deserve.",
  ctaText: "Let's discuss your project",
  valueTitle: "Content that Captivates",
  valueSub: "We go beyond the norm. We are Kwerky.",
};

const DEFAULT_SERVICES_HOMEPAGE = [
  {
    title: "Content Creation",
    desc: "We craft compelling narratives that resonate with your audience, elevating your brand's presence in the market.",
    image: "/brand/service-content-laptop.jpg",
  },
  {
    title: "Social Media",
    desc: "Engaging posts and strategies that connect with your audience, driving interaction and brand loyalty effectively.",
    image: "/brand/service-social-trojan.jpg",
  },
  {
    title: "Dynamic Video Ads and Tutorials",
    desc: "Video production that showcases your brand, capturing attention and delivering impactful messages.",
    image: "/brand/service-video-typewriter.jpg",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    title: "Elephanttree",
    location: "Bangalore",
    quote: "Kwerky Media transformed our storytelling, engaging our target audience effectively. Highly recommend!",
  },
  {
    title: "SNIPE TECH",
    location: "Bangalore",
    quote: "Thanks to Kwerky Media, our brand presence has grown significantly, capturing attention and driving engagement through innovative content strategies tailored specifically for tech companies.",
  },
];

const DEFAULT_SERVICES_PAGE = {
  heroTitle: "Why Choose Kwerky Media?",
  heroSub:
    "Tech companies are laser-focused on product innovation and development—that’s their niche.",
  reasons: [
    "Tech companies are laser-focused on product innovation and development—that’s their niche.",
    "Content development often becomes an afterthought as resources are fully dedicated to bringing the product to life.",
    "We fill the missing piece of the content puzzle, completing the picture of your product.",
    "We also bring art to your tech with Kwerky content that first dazzles your readers, then prompts them to pause and reflect.",
    "People perceive your tech as it’s meant to be, with moments of meaningful content engagement along the way.",
  ],
  contentTitle: "Content Solutions",
  contentSub: "Tailored content strategies for tech companies, enhancing brand narratives.",
  videoTitle: "Explore our Kwerky videos",
  contactTitle: "Let's discuss your project",
  videoUrl: "https://www.youtube.com/embed/nXaoAh2DVpo",
};

const DEFAULT_SERVICES_DETAIL = [
  {
    title: "Website Content",
    description: "Populate your website with content that:",
    points: [
      "Tells your story in a way that resonates with your audience.",
      "Describes your products in a way that is easily understood, whether your audience is tech-savvy or not.",
      "Highlights success stories that allow potential clients to step into the shoes of your existing ones.",
      "Inspires readers with the entrepreneurial journeys of founders and the accomplishments of your executives.",
      "Engages visitors by creating experiences that naturally convert into leads.",
      "All of this, accompanied by captivating images that draw visitors in.",
    ],
  },
  {
    title: "Blogs",
    description: "Blogs build brand authority by providing deeper insights into a company and its products.",
    points: [
      "They drive traffic and enhance SEO, making your brand more discoverable.",
      "We craft blogs with a twist—blending research-backed discoveries with expert insights.",
      "Our approach goes beyond generic content—we conduct expert interviews and use an engaging writing style that makes our blogs stand out in a sea of sameness.",
      "Search engines love our blogs—Packed with strategically placed keywords, they’re not just SEO-friendly—they’re practically waving at your potential clients saying, “Hey, over here!”",
    ],
  },
  {
    title: "Social Media Posts and Marketing Campaigns",
    description: "Out of sight, out of cart. What’s seen is what sells.",
    points: [
      "Give your tech the spotlight it deserves with our Kwerky social media posts and marketing campaigns.",
      "We craft social content that surprises first, smiles second, and sells third.",
      "We take it a notch up and say it’s not just about being seen; it’s about being remembered. Our posts don’t just catch eyes; they spark clicks, comments, and conversations.",
      "Whether you're just gearing up for launch or riding the momentum after it, our marketing campaigns align with your timeline and help bring more traffic to your product page.",
    ],
  },
  {
    title: "Slide Decks",
    description: "A killer presentation says more with less.",
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
  },
  {
    title: "Videos",
    description: "A picture speaks a thousand words.",
    points: [
      "But a motion picture? It grabs attention and keeps it.",
      "Videos break down complex ideas into snackable, memorable visuals.",
      "Whether it’s a product ad or a how-to tutorial, we make it Kwerky—so your audience stays tuned, not zoned out.",
      "The result? Higher conversions. Smoother learning curves. Scroll-stopping engagement.",
    ],
  },
];

const DEFAULT_BLOGS = [
  {
    slug: "understanding-blockchain-and-bitcoin",
    title: "Understanding Blockchain and Bitcoin",
    excerpt: "An insightful take on what blockchain and bitcoin really mean, beyond the buzzwords.",
    author: "Shashikanth Peetla",
    date: "5/8/2024",
    readTime: "5 min read",
    image: "/brand/blog-blockchain.png",
    content: [
      "An insightful take on what blockchain and bitcoin really mean, beyond the buzzwords.",
      "Blockchain technology has emerged as one of the most transformative innovations of the 21st century. At its core, blockchain is a distributed, decentralized digital ledger that records transactions across many computers in such a way that the registered transactions cannot be altered retroactively.",
      "Bitcoin, the first and most well-known application of blockchain technology, was introduced in 2009 by an anonymous person (or group) using the pseudonym Satoshi Nakamoto. It was designed as a peer-to-peer electronic cash system that eliminates the need for intermediaries like banks.",
      "The key innovation of blockchain is its ability to establish trust in a trustless environment. Each block in the chain contains a cryptographic hash of the previous block, a timestamp, and transaction data. This creates an immutable record that is virtually impossible to tamper with.",
      "For tech companies, understanding blockchain goes beyond cryptocurrency. The technology has applications in supply chain management, healthcare records, digital identity verification, smart contracts, and much more. As a content partner for tech companies, Kwerky Media helps break down these complex concepts into digestible, engaging content that resonates with both technical and non-technical audiences.",
    ],
  },
  {
    slug: "data-center-vs-cloud",
    title: "Traditional Data Center vs. Cloud Data Center vs. Cloud Computing",
    excerpt:
      "Discover where the differences end, the similarities begin, and how the lines between them continue to blur.",
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
      "The lines between these three models continue to blur as hybrid and multi-cloud strategies become increasingly popular. Many organizations now use a combination of on-premises data centers, cloud data centers, and cloud computing services to optimize their operations.",
    ],
  },
];

const DEFAULT_VIDEOS = [
  {
    title: "Kwerky in Action",
    url: "https://www.youtube.com/embed/ZJuVlEQ2AIM",
  },
  {
    title: "Our Services",
    url: "https://www.youtube.com/embed/q6suj10uq_0",
  },
  {
    title: "About Kwerky Media",
    url: "https://www.youtube.com/embed/nXaoAh2DVpo",
  },
];

const DEFAULT_FOUNDERS = [
  {
    name: "Shashikanth Peetla",
    role: "Co-Founder",
    bio: "I have over a decade of media experience writing profiles, cover stories, blogs, and ad copies for tech companies. Previously, I served as an Assistant Managing Editor, overseeing more than 20 technology magazines. Over the years, I've mastered the art and science of digital marketing — from copywriting and editing to campaign design and SEO. I look forward to partnering with you to craft a great tech story.",
    image: "/brand/founder-shashi.avif",
    linkedinUrl: "https://www.linkedin.com/in/shashikanth-p-59911564/",
  },
  {
    name: "Mithun Mohan",
    role: "Co-Founder",
    bio: "I have over a decade of experience closing deals and delivering on promises. I've partnered with clients from project initiation to completion, overseeing each stage until final delivery met their expectations. I'm usually the first point of contact and am responsible for building and maintaining long-term client relationships. I'm excited about Kwerky Media and look forward to a fruitful partnership with you.",
    image: "/brand/founder-mithun.avif",
    linkedinUrl: "https://www.linkedin.com/in/emithunmohan/",
  },
];

const DEFAULT_ABOUT_NOTES = [
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
];

const DEFAULT_TESTIMONIAL_PAGE = [
  {
    company: "Elephanttree",
    location: "Bangalore",
    quote: "Kwerky Media transformed our storytelling, engaging our target audience effectively. Highly recommend!",
    rating: 5,
  },
  {
    company: "SNIPE TECH",
    location: "Bangalore",
    quote: "Thanks to Kwerky Media, our brand presence has grown significantly, capturing attention and driving engagement through innovative content strategies tailored specifically for tech companies.",
    rating: 5,
  },
];

const DEFAULT_BLOG_BANNER = "/brand/blog-banner.png";

const SERVICES_PAGE_QUERY = `*[_type == "servicesPage"][0]{
  pageTitle,
  introDescription,
  "reasons": services[].description,
  "contentTitle": "Content Solutions",
  "contentSub": introDescription,
  "videoTitle": "Explore our Kwerky videos",
  "contactTitle": "Let's discuss your project",
  "videoUrl": "https://www.youtube.com/embed/nXaoAh2DVpo",
  services[]{
    "title": serviceName,
    description
  }
}`;

const BLOGS_QUERY = `*[_type == "blog"]|order(publishedAt desc, _createdAt desc){
  title,
  "slug": slug.current,
  shortDescription,
  publishDate,
  coverImage,
  content
}`;

const VIDEO_QUERY = `*[_type == "video"]|order(coalesce(order, 0) asc, _createdAt asc){
  title,
  "url": coalesce(videoUrl, url)
}`;
const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  aboutTitle,
  description,
  founders[]{
    name,
    bio,
    image,
    role,
    linkedinUrl
  }
}`;

function normalizeTextArray(value, fallback = []) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return value.filter(Boolean);
}

function toImageUrl(image, fallback = "") {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return sanityImage(image) || fallback;
}

function normalizeService(item, fallback = {}) {
  return {
    title: item?.title || fallback.title || "",
    desc: item?.description || fallback.desc || "",
    description: item?.description || fallback.desc || "",
    image: toImageUrl(item?.image, fallback.image || ""),
    points: normalizeTextArray(item?.points, fallback.points || []),
    featured: Boolean(item?.featured),
  };
}

function normalizeBlog(item, fallback = {}) {
  return {
    slug: item?.slug || fallback.slug || "",
    title: item?.title || fallback.title || "",
    desc: item?.shortDescription || item?.excerpt || fallback.desc || "",
    excerpt: item?.shortDescription || item?.excerpt || fallback.desc || "",
    author: item?.author || fallback.author || "",
    date: item?.publishDate || item?.publishedAt ? new Date(item.publishDate || item.publishedAt).toLocaleDateString("en-IN") : fallback.date || "",
    readTime: item?.readTime || fallback.readTime || "",
    image: toImageUrl(item?.coverImage || item?.image, fallback.image || ""),
    content: normalizeTextArray(item?.content, fallback.content || []),
  };
}

function normalizeVideo(item, fallback = {}) {
  return {
    title: item?.title || fallback.title || "",
    url: item?.url || item?.videoUrl || fallback.url || "",
  };
}

function normalizeFounder(item, fallback = {}) {
  return {
    name: item?.name || fallback.name || "",
    role: item?.role || fallback.role || "Co-Founder",
    bio: item?.bio || fallback.bio || "",
    image: toImageUrl(item?.image, fallback.image || ""),
    linkedinUrl: item?.linkedinUrl || fallback.linkedinUrl || "",
    text: item?.bio || fallback.text || fallback.bio || "",
  };
}

export function formatCmsTitle(text) {
  return splitHeadline(text);
}

export async function getHomePageData() {
  const home = await sanityFetch(homepageQuery, {}, null);

  const normalizedServices = (home?.services?.length ? home.services : DEFAULT_SERVICES_HOMEPAGE).map((service, index) =>
    normalizeService(service, DEFAULT_SERVICES_HOMEPAGE[index] || DEFAULT_SERVICES_HOMEPAGE[0]),
  );
  const featuredServices = normalizedServices.filter((service) => service.featured);

  return {
    home: {
      ...DEFAULT_HOME,
      heroTitle: home?.mainHeading || DEFAULT_HOME.heroTitle,
      heroSub: home?.tagline || DEFAULT_HOME.heroSub,
      ctaText: home?.buttonText || DEFAULT_HOME.ctaText,
      valueTitle: home?.valueTitle || DEFAULT_HOME.valueTitle,
      valueSub: home?.valueSub || DEFAULT_HOME.valueSub,
      heroMedia: home?.heroImage?.asset?.url || "",
      ctaHeading: home?.ctaHeading || "",
      ctaSubtext: home?.ctaSubtext || "",
    },
    services: (featuredServices.length ? featuredServices : normalizedServices).slice(0, 3),
    testimonials: (home?.testimonials?.length ? home.testimonials : DEFAULT_TESTIMONIAL_PAGE).map((item, index) => {
      const fallbackTestimonial = DEFAULT_TESTIMONIAL_PAGE[index] || DEFAULT_TESTIMONIAL_PAGE[0];

      return {
        ...fallbackTestimonial,
        company: item?.company || fallbackTestimonial?.title || fallbackTestimonial?.company || "",
        title: item?.company || fallbackTestimonial?.title || fallbackTestimonial?.company || "",
        location: item?.location || fallbackTestimonial?.location || "",
        quote: item?.quote || fallbackTestimonial?.quote || "",
        rating: Number(item?.rating || fallbackTestimonial?.rating || 5),
      };
    }),
  };
}

export async function getServicesPageData() {
  const page = await sanityFetch(SERVICES_PAGE_QUERY, {}, null);

  return {
    page: {
      ...DEFAULT_SERVICES_PAGE,
      heroTitle: page?.pageTitle || DEFAULT_SERVICES_PAGE.heroTitle,
      heroSub: page?.introDescription || DEFAULT_SERVICES_PAGE.heroSub,
      reasons: page?.reasons || DEFAULT_SERVICES_PAGE.reasons,
      contentTitle: page?.contentTitle || DEFAULT_SERVICES_PAGE.contentTitle,
      contentSub: page?.contentSub || DEFAULT_SERVICES_PAGE.contentSub,
      videoTitle: page?.videoTitle || DEFAULT_SERVICES_PAGE.videoTitle,
      contactTitle: page?.contactTitle || DEFAULT_SERVICES_PAGE.contactTitle,
      videoUrl: page?.videoUrl || DEFAULT_SERVICES_PAGE.videoUrl,
    },
    services: (page?.services?.length ? page.services : DEFAULT_SERVICES_DETAIL).map((service, index) =>
      normalizeService(
        {
          title: service?.title || service?.serviceName,
          description: service?.description,
        },
        DEFAULT_SERVICES_DETAIL[index] || DEFAULT_SERVICES_DETAIL[0],
      ),
    ),
  };
}

export async function getBlogsPageData() {
  const blogs = await sanityFetch(BLOGS_QUERY, {}, []);

  return {
    bannerImage: DEFAULT_BLOG_BANNER,
    blogs: (blogs?.length ? blogs : DEFAULT_BLOGS).map((blog, index) =>
      normalizeBlog(blog, DEFAULT_BLOGS[index] || DEFAULT_BLOGS[0]),
    ),
  };
}

export async function getBlogPostData(slug) {
  const post = await sanityFetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      shortDescription,
      publishDate,
      coverImage,
      content
    }`,
    { slug },
    null,
  );

  if (post) {
    return normalizeBlog(post, DEFAULT_BLOGS.find((blog) => blog.slug === slug) || DEFAULT_BLOGS[0]);
  }

  return DEFAULT_BLOGS.find((blog) => blog.slug === slug) || null;
}

export async function getVideosPageData() {
  const videos = await sanityFetch(VIDEO_QUERY, {}, []);

  return {
    videos: (videos?.length ? videos : DEFAULT_VIDEOS).map((video, index) =>
      normalizeVideo(video, DEFAULT_VIDEOS[index] || DEFAULT_VIDEOS[0]),
    ),
  };
}

export async function getAboutPageData() {
  const [about, videos] = await Promise.all([
    sanityFetch(ABOUT_PAGE_QUERY, {}, null),
    sanityFetch(VIDEO_QUERY, {}, []),
  ]);

  return {
    about: {
      aboutTitle: about?.aboutTitle || "Your Partner in Tech Storytelling",
      description:
        about?.description ||
        "Kwerky Media is the result of more than a decade of tech storytelling—and a childlike excitement that’s stayed with us since we wrote our very first tech story.",
    },
    founders: (about?.founders?.length ? about.founders : DEFAULT_FOUNDERS).map((founder, index) =>
      normalizeFounder(founder, DEFAULT_FOUNDERS[index] || DEFAULT_FOUNDERS[0]),
    ),
    notes: (about?.founders?.length ? about.founders : DEFAULT_ABOUT_NOTES).map((founder, index) => ({
      name: founder?.name || DEFAULT_ABOUT_NOTES[index]?.name || "",
      role: founder?.role || DEFAULT_ABOUT_NOTES[index]?.role || "Co-Founder",
      image: toImageUrl(founder?.image, DEFAULT_ABOUT_NOTES[index]?.image || ""),
      text: founder?.bio || DEFAULT_ABOUT_NOTES[index]?.text || "",
    })),
    videos: (videos?.length ? videos : DEFAULT_VIDEOS.slice(0, 2)).map((video, index) =>
      normalizeVideo(video, DEFAULT_VIDEOS[index] || DEFAULT_VIDEOS[0]),
    ),
  };
}

export function useHomePageCms() {
  const [initial, setInitial] = useState({
    home: DEFAULT_HOME,
    services: DEFAULT_SERVICES_HOMEPAGE,
    testimonials: DEFAULT_TESTIMONIAL_PAGE,
  });

  useEffect(() => {
    let alive = true;
    getHomePageData().then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const [homeRaw] = useLiveQuery(initial.home, homepageQuery);

  return useMemo(() => {
    const normalizedServices = (homeRaw?.services?.length ? homeRaw.services : DEFAULT_SERVICES_HOMEPAGE).map((service, index) =>
      normalizeService(service, DEFAULT_SERVICES_HOMEPAGE[index] || DEFAULT_SERVICES_HOMEPAGE[0]),
    );
    const featuredServices = normalizedServices.filter((service) => service.featured);

    return {
      home: {
        ...DEFAULT_HOME,
        heroTitle: homeRaw?.mainHeading || DEFAULT_HOME.heroTitle,
        heroSub: homeRaw?.tagline || DEFAULT_HOME.heroSub,
        ctaText: homeRaw?.buttonText || DEFAULT_HOME.ctaText,
        valueTitle: homeRaw?.valueTitle || DEFAULT_HOME.valueTitle,
        valueSub: homeRaw?.valueSub || DEFAULT_HOME.valueSub,
        heroMedia: homeRaw?.heroImage?.asset?.url || "",
        ctaHeading: homeRaw?.ctaHeading || "",
        ctaSubtext: homeRaw?.ctaSubtext || "",
      },
      services: (featuredServices.length ? featuredServices : normalizedServices).slice(0, 3),
      testimonials: (homeRaw?.testimonials?.length ? homeRaw.testimonials : DEFAULT_TESTIMONIAL_PAGE).map((item, index) => {
        const fallbackTestimonial = DEFAULT_TESTIMONIAL_PAGE[index] || DEFAULT_TESTIMONIAL_PAGE[0];

        return {
          ...fallbackTestimonial,
          company: item?.company || fallbackTestimonial?.title || fallbackTestimonial?.company || "",
          title: item?.company || fallbackTestimonial?.title || fallbackTestimonial?.company || "",
          location: item?.location || fallbackTestimonial?.location || "",
          quote: item?.quote || fallbackTestimonial?.quote || "",
          rating: Number(item?.rating || fallbackTestimonial?.rating || 5),
        };
      }),
    };
  }, [homeRaw]);
}

export function useServicesPageCms() {
  const [initial, setInitial] = useState({
    page: DEFAULT_SERVICES_PAGE,
    services: DEFAULT_SERVICES_DETAIL,
  });

  useEffect(() => {
    let alive = true;
    getServicesPageData().then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const [pageRaw] = useLiveQuery(initial.page, SERVICES_PAGE_QUERY);

  return useMemo(() => {
    const services = (pageRaw?.services?.length ? pageRaw.services : DEFAULT_SERVICES_DETAIL).map((service, index) =>
      normalizeService(
        {
          title: service?.title || service?.serviceName,
          description: service?.description,
        },
        DEFAULT_SERVICES_DETAIL[index] || DEFAULT_SERVICES_DETAIL[0],
      ),
    );

    return {
      page: {
        ...DEFAULT_SERVICES_PAGE,
        heroTitle: pageRaw?.pageTitle || DEFAULT_SERVICES_PAGE.heroTitle,
        heroSub: pageRaw?.introDescription || DEFAULT_SERVICES_PAGE.heroSub,
        reasons: pageRaw?.reasons || DEFAULT_SERVICES_PAGE.reasons,
        contentTitle: pageRaw?.contentTitle || DEFAULT_SERVICES_PAGE.contentTitle,
        contentSub: pageRaw?.contentSub || DEFAULT_SERVICES_PAGE.contentSub,
        videoTitle: pageRaw?.videoTitle || DEFAULT_SERVICES_PAGE.videoTitle,
        contactTitle: pageRaw?.contactTitle || DEFAULT_SERVICES_PAGE.contactTitle,
        videoUrl: pageRaw?.videoUrl || DEFAULT_SERVICES_PAGE.videoUrl,
      },
      services,
    };
  }, [pageRaw]);
}

export function useBlogsPageCms() {
  const [initial, setInitial] = useState({
    bannerImage: DEFAULT_BLOG_BANNER,
    blogs: DEFAULT_BLOGS,
  });

  useEffect(() => {
    let alive = true;
    getBlogsPageData().then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const [blogsRaw] = useLiveQuery(initial.blogs, BLOGS_QUERY);

  return useMemo(() => ({
    bannerImage: DEFAULT_BLOG_BANNER,
    blogs: (blogsRaw?.length ? blogsRaw : DEFAULT_BLOGS).map((blog, index) =>
      normalizeBlog(blog, DEFAULT_BLOGS[index] || DEFAULT_BLOGS[0]),
    ),
  }), [blogsRaw]);
}

export function useAboutPageCms() {
  const [initial, setInitial] = useState({
    about: {
      aboutTitle: "Your Partner in Tech Storytelling",
      description:
        "Kwerky Media is the result of more than a decade of tech storytelling—and a childlike excitement that’s stayed with us since we wrote our very first tech story.",
    },
    founders: DEFAULT_FOUNDERS,
    notes: DEFAULT_ABOUT_NOTES,
    videos: DEFAULT_VIDEOS,
  });

  useEffect(() => {
    let alive = true;
    getAboutPageData().then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const [aboutRaw] = useLiveQuery(initial.about, ABOUT_PAGE_QUERY);
  const [videosRaw] = useLiveQuery(initial.videos, VIDEO_QUERY);

  return useMemo(() => ({
    about: {
      aboutTitle: aboutRaw?.aboutTitle || initial.about.aboutTitle,
      description: aboutRaw?.description || initial.about.description,
    },
    founders: (aboutRaw?.founders?.length ? aboutRaw.founders : DEFAULT_FOUNDERS).map((founder, index) =>
      normalizeFounder(founder, DEFAULT_FOUNDERS[index] || DEFAULT_FOUNDERS[0]),
    ),
    notes: (aboutRaw?.founders?.length ? aboutRaw.founders : DEFAULT_ABOUT_NOTES).map((founder, index) => ({
      name: founder?.name || DEFAULT_ABOUT_NOTES[index]?.name || "",
      role: founder?.role || DEFAULT_ABOUT_NOTES[index]?.role || "Co-Founder",
      image: toImageUrl(founder?.image, DEFAULT_ABOUT_NOTES[index]?.image || ""),
      text: founder?.bio || DEFAULT_ABOUT_NOTES[index]?.text || "",
    })),
    videos: (videosRaw?.length ? videosRaw : DEFAULT_VIDEOS.slice(0, 2)).map((video, index) =>
      normalizeVideo(video, DEFAULT_VIDEOS[index] || DEFAULT_VIDEOS[0]),
    ),
  }), [aboutRaw, initial.about, videosRaw]);
}

export function useVideosPageCms() {
  const [initial, setInitial] = useState({
    videos: DEFAULT_VIDEOS,
  });

  useEffect(() => {
    let alive = true;
    getVideosPageData().then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const [videosRaw] = useLiveQuery(initial.videos, VIDEO_QUERY);

  return useMemo(() => ({
    videos: (videosRaw?.length ? videosRaw : DEFAULT_VIDEOS).map((video, index) =>
      normalizeVideo(video, DEFAULT_VIDEOS[index] || DEFAULT_VIDEOS[0]),
    ),
  }), [videosRaw]);
}

export function useBlogPostCms(slug) {
  const [initial, setInitial] = useState(DEFAULT_BLOGS.find((blog) => blog.slug === slug) || null);

  useEffect(() => {
    let alive = true;
    getBlogPostData(slug).then((data) => {
      if (alive) setInitial(data);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const [postRaw] = useLiveQuery(initial, `*[_type == "blog" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      shortDescription,
      publishDate,
      coverImage,
      content
    }`, { slug });

  return useMemo(() => {
    if (!postRaw) return initial;
    return normalizeBlog(postRaw, DEFAULT_BLOGS.find((blog) => blog.slug === slug) || DEFAULT_BLOGS[0]);
  }, [initial, postRaw, slug]);
}

export {
  DEFAULT_HOME,
  DEFAULT_SERVICES_HOMEPAGE,
  DEFAULT_SERVICES_PAGE,
  DEFAULT_SERVICES_DETAIL,
  DEFAULT_BLOGS,
  DEFAULT_VIDEOS,
  DEFAULT_FOUNDERS,
  DEFAULT_ABOUT_NOTES,
  DEFAULT_TESTIMONIAL_PAGE,
  DEFAULT_BLOG_BANNER,
};
