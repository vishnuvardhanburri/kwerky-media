import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const HomePage = ({ canAnimate }: { canAnimate: boolean }) => (
  <>
    <Hero canAnimate={canAnimate} />
    <Features />
    <Story />
    <Testimonials />
    <LiquidShowcase />
  </>
);

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
          <Routes>
            <Route
              path="/"
              element={<HomePage canAnimate={isLoadingComplete} />}
            />
            <Route
              path="/services"
              element={
                <RoutePlaceholder
                  eyebrow="Services"
                  title="Premium content systems built for modern tech brands."
                  description="This page is ready to become the dedicated Kwerky services surface, with deeper detail on storytelling, social media, and video execution."
                />
              }
            />
            <Route
              path="/about"
              element={
                <RoutePlaceholder
                  eyebrow="About Us"
                  title="Built around clarity, curiosity, and better presentation."
                  description="This route will hold the Kwerky origin story, team philosophy, and the reasons technical brands choose us when they need sharper communication."
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <RoutePlaceholder
                  eyebrow="Blogs"
                  title="Editorial thinking that strengthens authority over time."
                  description="This destination is prepared for blog previews, category organization, and thought-leadership content that feels premium instead of filler."
                />
              }
            />
            <Route
              path="/videos"
              element={
                <RoutePlaceholder
                  eyebrow="Videos"
                  title="Visual storytelling that makes complex technology feel clear."
                  description="This page will become the home for demos, explainers, launch films, and technical video systems designed to hold attention longer."
                />
              }
            />
          </Routes>
          <Footer />
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
