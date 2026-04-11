import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Loading from './components/loading';
import Preloader from './components/Preloader';

const Navbar = lazy(() => import('./components/navbar'));
const Hero = lazy(() => import('./pages/hero'));
const Features = lazy(() => import('./pages/features'));
const Story = lazy(() => import('./pages/Story'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const LiquidShowcase = lazy(() => import('./components/LiquidShowcase'));
const RouteShowcase = lazy(() => import('./pages/RouteShowcase'));
const Footer = lazy(() => import('./components/Footer'));

const pageTransition = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

const routeContent = {
  services: {
    eyebrow: 'Services',
    title: 'Content systems that make complex products easier to trust.',
    description:
      'Kwerky Media combines messaging, campaign thinking, social media, and motion into one premium operating system for tech brands that need clarity, authority, and sharper conversion paths.',
    stats: [
      { value: '4', label: 'Core service lanes built around storytelling and growth' },
      { value: '10+', label: 'Years of tech-focused media and brand presentation work' },
      { value: '1', label: 'Connected system instead of disconnected deliverables' },
    ],
    primaryPanels: [
      {
        eyebrow: 'Narrative Systems',
        title: 'Content Creation',
        description:
          'Landing pages, brand messaging, editorial systems, and campaign structure designed to make difficult products feel simpler and more valuable.',
        points: [
          'Website content shaped around product clarity',
          'Positioning language that feels premium, not generic',
          'Editorial systems that keep the message consistent',
        ],
      },
      {
        eyebrow: 'Attention Engine',
        title: 'Social Media',
        description:
          'Ongoing social concepts, brand posts, and launch communication that hold attention without flattening the voice of the company.',
        points: [
          'Campaign stories that feel relevant and timely',
          'Social content designed for recall and authority',
          'Distribution thinking that supports the core narrative',
        ],
      },
      {
        eyebrow: 'Motion Layer',
        title: 'Dynamic Video Ads and Tutorials',
        description:
          'Explainers, tutorials, launch films, and product-focused ads that turn complicated features into content people can understand quickly.',
        points: [
          'Founder-led and product-led video storytelling',
          'Tutorial formats built for trust and retention',
          'Visual systems that improve conversion momentum',
        ],
      },
    ],
    secondaryPanels: [
      {
        eyebrow: 'How It Lands',
        title: 'Built to attract, explain, and move.',
        description:
          'Every service is designed to do three jobs at once: win attention, clarify the value fast, and create a stronger next step for the buyer.',
      },
      {
        eyebrow: 'How It Feels',
        title: 'Premium by structure, not decoration.',
        description:
          'The surface matters, but the real strength is underneath it. Kwerky uses content design, sequencing, and polish to make the brand feel more expensive and more believable.',
      },
    ],
  },
  about: {
    eyebrow: 'About Us',
    title: 'A storytelling partner built for technical brands that deserve better presentation.',
    description:
      'Kwerky Media grew out of a simple pattern: strong tech products often look smaller than they are because the story around them is too flat. We exist to close that gap with sharper public language, stronger narrative systems, and premium delivery.',
    stats: [
      { value: '2', label: 'Co-founders balancing storytelling and delivery' },
      { value: '10+', label: 'Years of combined experience across media, campaigns, and client work' },
      { value: 'Tech', label: 'Focused on products that need nuance, trust, and authority' },
    ],
    primaryPanels: [
      {
        eyebrow: 'Origin Story',
        title: 'Why Kwerky exists',
        description:
          'Tech teams build serious products, but the external narrative often fails to match the depth of the work. Kwerky was built to make sure the story outside the company finally feels as strong as the product inside it.',
      },
      {
        eyebrow: 'Co-Founder',
        title: 'Shashikanth Peetla',
        description:
          'More than a decade of experience across cover stories, profiles, blogs, copywriting, editing, campaign design, and SEO for technology-facing businesses.',
      },
      {
        eyebrow: 'Co-Founder',
        title: 'Mithun Mohan',
        description:
          'Over a decade of experience across client relationships, sales conversations, delivery management, and long-term business communication from first touch to final sign-off.',
      },
    ],
    secondaryPanels: [
      {
        eyebrow: 'How We Work',
        title: 'Clarity without flattening the nuance.',
        description:
          'We do not simplify by making everything sound the same. The goal is to keep the edge, keep the intelligence, and still make the message easy to absorb.',
      },
      {
        eyebrow: 'What Makes It Kwerky',
        title: 'Memorable by design.',
        description:
          'The Kwerky edge is not random style. It is storytelling crafted to help people pause, understand, and remember what makes the company worth trusting.',
      },
    ],
  },
  blogs: {
    eyebrow: 'Blogs',
    title: 'Editorial systems that build authority instead of adding filler.',
    description:
      'Kwerky turns expertise into readable, strategically placed content that makes technical companies easier to discover, easier to trust, and harder to forget.',
    stats: [
      { value: 'SEO+', label: 'Search visibility blended with real thought leadership' },
      { value: 'Human', label: 'Readable writing for technical and non-technical audiences' },
      { value: 'Compounding', label: 'Assets that keep strengthening authority over time' },
    ],
    primaryPanels: [
      {
        eyebrow: 'Editorial Strategy',
        title: 'Topic architecture',
        description:
          'We map product knowledge into clear topic clusters so the brand sounds authoritative without becoming repetitive or bloated.',
        points: [
          'Content calendars tied to business priorities',
          'Topic clusters that support product discoverability',
          'Editorial sequencing that feels intentional',
        ],
      },
      {
        eyebrow: 'Writing Layer',
        title: 'Readable expertise',
        description:
          'Blogs are written to preserve nuance while remaining accessible, helping the company sound informed, useful, and genuinely worth reading.',
        points: [
          'Founder voice without sounding forced',
          'Technical clarity without jargon overload',
          'Premium writing that respects the reader',
        ],
      },
      {
        eyebrow: 'Growth Outcome',
        title: 'Authority that compounds',
        description:
          'The goal is not just to publish. It is to create content surfaces that keep building search relevance, trust, and brand memory over time.',
        points: [
          'Assets that support both sales and search',
          'Long-tail credibility for complex offerings',
          'Editorial systems that scale cleanly',
        ],
      },
    ],
    secondaryPanels: [
      {
        eyebrow: 'Ideal Fit',
        title: 'Best for deep products with shallow public stories.',
        description:
          'If the company has real expertise but the outside narrative feels generic or inconsistent, the blog system becomes one of the fastest ways to rebuild authority.',
      },
      {
        eyebrow: 'Kwerky Difference',
        title: 'No generic filler.',
        description:
          'Every article is shaped to teach, position, and support the business narrative at the same time. That is what makes the content feel premium instead of disposable.',
      },
    ],
  },
  videos: {
    eyebrow: 'Videos',
    title: 'Motion formats that turn technical value into something people feel instantly.',
    description:
      'From explainer videos to founder-led tutorials, Kwerky uses motion to make understanding faster, trust smoother, and the product story more memorable.',
    stats: [
      { value: 'Explainers', label: 'Visual formats built for clarity and speed' },
      { value: 'Founder-Led', label: 'Authority-driven videos that feel human and confident' },
      { value: 'Conversion', label: 'Motion designed to support action, not distract from it' },
    ],
    primaryPanels: [
      {
        eyebrow: 'Explainer Layer',
        title: 'Product understanding',
        description:
          'We shape motion and sequencing so feature-heavy products become easier to absorb, easier to trust, and easier to buy into.',
        points: [
          'Explainers for complex tools and workflows',
          'Demo narratives with clearer conversion logic',
          'Visual simplification without dumbing down',
        ],
      },
      {
        eyebrow: 'Authority Layer',
        title: 'Tutorials and tech videos',
        description:
          'Technical video content helps the brand teach in public, sound more credible, and build confidence through demonstration instead of claims.',
        points: [
          'Founder videos and thought leadership clips',
          'Tutorial storytelling built around actual use cases',
          'Trust-building video formats for technical buyers',
        ],
      },
      {
        eyebrow: 'Campaign Layer',
        title: 'Ads and launch motion',
        description:
          'Campaign videos are designed to stop the scroll, carry the message cleanly, and support the brand without overwhelming it.',
        points: [
          'Launch edits tied to the broader brand story',
          'Video ads that privilege clarity over noise',
          'Motion systems that make the product feel alive',
        ],
      },
    ],
    secondaryPanels: [
      {
        eyebrow: 'What It Solves',
        title: 'When the words are not enough on their own.',
        description:
          'Some products need visual demonstration before the value truly lands. This is where motion closes the gap between interest and understanding.',
      },
      {
        eyebrow: 'How It Feels',
        title: 'Cinematic, but still controlled.',
        description:
          'The goal is premium motion with business discipline: enough energy to feel alive, enough clarity to still guide attention exactly where it should go.',
      },
    ],
  },
} as const;

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <Story />
    <Testimonials />
    <LiquidShowcase />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <RouteShowcase {...routeContent.services} />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <RouteShowcase {...routeContent.about} />
            </motion.div>
          }
        />
        <Route
          path="/blogs"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <RouteShowcase {...routeContent.blogs} />
            </motion.div>
          }
        />
        <Route
          path="/videos"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <RouteShowcase {...routeContent.videos} />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      <main className="bg-black text-white">
        {!isLoadingComplete && (
          <Preloader onComplete={() => setIsLoadingComplete(true)} />
        )}
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
