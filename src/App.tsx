import { lazy, Suspense, useState } from 'react';
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
const RoutePlaceholder = lazy(() => import('./pages/RoutePlaceholder'));
const Footer = lazy(() => import('./components/Footer'));

const pageTransition = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
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
    <AnimatePresence mode="wait">
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
              <RoutePlaceholder
                eyebrow="Services"
                title="Premium content systems built for modern tech brands."
                description="This page is ready to become the dedicated Kwerky services surface, with deeper detail on storytelling, social media, and video execution."
              />
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
              <RoutePlaceholder
                eyebrow="About Us"
                title="Built around clarity, curiosity, and better presentation."
                description="This route will hold the Kwerky origin story, team philosophy, and the reasons technical brands choose us when they need sharper communication."
              />
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
              <RoutePlaceholder
                eyebrow="Blogs"
                title="Editorial thinking that strengthens authority over time."
                description="This destination is prepared for blog previews, category organization, and thought-leadership content that feels premium instead of filler."
              />
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
              <RoutePlaceholder
                eyebrow="Videos"
                title="Visual storytelling that makes complex technology feel clear."
                description="This page will become the home for demos, explainers, launch films, and technical video systems designed to hold attention longer."
              />
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
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
