import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Videos', to: '/videos' },
] as const;

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const posRef = useRef<number>(0);

  const changeNav = debounce(
    (preHeight: number, height: number) => {
      if (!navbarRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 0.4 },
      });
      tl.to(navbarRef.current, {
        backgroundColor: height !== 0 ? 'black' : 'transparent', // * background is transparent when the scroll is at the top
      }).to(
        navbarRef.current,
        {
          y: preHeight >= height ? 0 : -navbarRef.current.offsetHeight - 50, // * go up when scrolling down and go down when scrolling up
        },
        '<',
      );
    },
    100,
    {
      trailing: true, // !only the final scroll event is processed
      maxWait: 400, // !if you don't stop scrolling, it will excute after 400ms for the scroll event that happens in that time
    },
  );
  const handleNavScroll = useCallback(
    () => changeNav(posRef.current, (posRef.current = window.scrollY)),
    [changeNav],
  ); // ! using useCallback to prevent the function from being recreated on every render

  useGSAP(() => {
    window.addEventListener('scroll', handleNavScroll);
    return () => {
      window.removeEventListener('scroll', () => handleNavScroll);
    };
  }, []);
  return (
    <nav
      id="navbar"
      ref={navbarRef}
      className="fixed top-0 z-50 mx-3 mt-3 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-5 py-3 text-[0.62rem] uppercase backdrop-blur-xl max-lg:px-4 max-md:px-3"
    >
      <div className="center h-12 gap-3 max-lg:h-8">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-2"
        >
          <img
            src="/kwerky-logo.avif"
            alt="Kwerky Media logo"
            className="h-10 w-10 rounded-full object-cover max-lg:size-8"
            loading="eager"
          />
          <span className="hidden min-[480px]:block">
            <strong className="block font-general text-[0.74rem] tracking-[0.24em] text-white">
              KWERKY MEDIA
            </strong>
            <span className="block text-[0.56rem] tracking-[0.28em] text-white/42">
              CREATIVE STORYTELLING ENGINE
            </span>
          </span>
        </Link>
        <Link
          to="/services"
          className="hidden rounded-full border border-[#ff5c7a]/60 px-4 py-2 font-general font-semibold tracking-[0.2em] text-white transition hover:bg-[#ff5c7a] hover:text-black md:inline-flex"
        >
          START A PROJECT
        </Link>
      </div>
      <div
        id="navbar-links"
        className="relative hidden h-8 w-[32rem] items-center justify-center text-white md:flex"
      >
        {navItems.map((item) => (
          <Link key={item.label} to={item.to} className="navbar-link">
            {item.label}
          </Link>
        ))}
        <div id="navbar-hover-effect"></div>
      </div>
      <Link
        to="/services"
        className="inline-flex items-center justify-center rounded-full border border-[#ff5c7a]/60 px-4 py-2 font-general font-semibold tracking-[0.2em] text-white transition hover:bg-[#ff5c7a] hover:text-black md:hidden"
      >
        CONNECT
      </Link>
    </nav>
  );
};

export default Navbar;
