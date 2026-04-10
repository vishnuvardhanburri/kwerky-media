import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CardHoverEffect from '../hook/cardHoverEffect';

gsap.registerPlugin(ScrollTrigger);

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
};

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Videos', to: '/videos' },
] as const;

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
] as const;

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const handleMouseMove = CardHoverEffect();
  const isDesktop = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches,
    [],
  );

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    if (!footerRef.current) return;

    const blocks = footerRef.current.querySelectorAll('[data-footer-block]');

    gsap.fromTo(
      blocks,
      {
        y: 56,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
        },
      },
    );
  }, []);

  const validate = (formValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formValues.name.trim()) nextErrors.name = 'Name is required.';
    if (!formValues.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formValues.message.trim()) {
      nextErrors.message = 'Message is required.';
    } else if (formValues.message.trim().length < 20) {
      nextErrors.message = 'Tell us a bit more so we can respond properly.';
    }

    return nextErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setValues(initialValues);
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden bg-black px-4 pb-10 pt-24 text-white sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,23,63,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(120,18,36,0.2),transparent_24%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl" data-footer-block>
          <p className="font-general text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/55">
            Final Call
          </p>
          <h2 className="mt-4 max-w-4xl font-sans text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s turn your tech into a story people actually remember.
          </h2>
          <p className="mt-5 max-w-2xl font-robert-regular text-base leading-7 text-white/68">
            If the product is strong, the public-facing experience should feel
            just as strong. This is where sharper positioning, cleaner content,
            and premium presentation come together.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            data-footer-block
            onMouseMove={isDesktop ? handleMouseMove : undefined}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,18,0.98),rgba(9,9,11,0.98))] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.44)] sm:p-8"
          >
            <div className="absolute -left-12 top-2 hidden h-56 w-56 bg-[#ff5c7a]/18 blur-3xl lg:block" />
            <div className="hovering-effect relative z-10">
              <div className="contact-clip-path-1 absolute -right-6 top-0 hidden h-36 w-36 bg-[linear-gradient(135deg,rgba(255,92,122,0.7),rgba(98,13,33,0.25))] opacity-60 lg:block" />
              <div className="contact-clip-path-2 absolute bottom-0 left-0 hidden h-40 w-40 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,92,122,0.4))] opacity-70 lg:block" />

              <form className="relative z-10" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/52"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-robert-regular text-white outline-none transition focus:border-[#ff5c7a]"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-[#ff8ea4]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/52"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-robert-regular text-white outline-none transition focus:border-[#ff5c7a]"
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-[#ff8ea4]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/52"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={handleChange}
                      className="mt-3 w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4 font-robert-regular text-white outline-none transition focus:border-[#ff5c7a]"
                      placeholder="Tell us what you are building and where the story is getting stuck."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-[#ff8ea4]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full border border-[#ff5c7a]/70 bg-[#0d0d10] px-7 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-[#ff5c7a] hover:text-black"
                    >
                      Submit Your Inquiry
                    </button>
                    {isSubmitted && (
                      <p className="font-robert-regular text-sm text-white/70">
                        Thanks. We&apos;ll get back to you shortly.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="grid gap-6">
            <div
              data-footer-block
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,18,0.98),rgba(9,9,11,0.98))] p-7 sm:p-8"
            >
              <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
                Direct Contact
              </p>
              <div className="mt-6 grid gap-5">
                <a
                  href="mailto:hello@kwerkymedia.com"
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 transition hover:border-[#ff5c7a]/60"
                >
                  <Mail className="text-[#ff5c7a]" size={20} />
                  <div>
                    <p className="font-general text-[0.65rem] uppercase tracking-[0.26em] text-white/42">
                      Email
                    </p>
                    <p className="font-robert-regular text-base text-white/80 group-hover:text-white">
                      hello@kwerkymedia.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:08031548088"
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 transition hover:border-[#ff5c7a]/60"
                >
                  <Phone className="text-[#ff5c7a]" size={20} />
                  <div>
                    <p className="font-general text-[0.65rem] uppercase tracking-[0.26em] text-white/42">
                      Phone
                    </p>
                    <p className="font-robert-regular text-base text-white/80 group-hover:text-white">
                      08031548088
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div
              data-footer-block
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,18,0.98),rgba(9,9,11,0.98))] p-7 sm:p-8"
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
                    Navigation
                  </p>
                  <div className="mt-5 grid gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="group inline-flex items-center gap-2 font-sans text-lg font-medium tracking-tight text-white/75 transition hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={16}
                          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
                    Social
                  </p>
                  <div className="mt-5 grid gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-3 font-robert-regular text-base text-white/72 transition hover:text-white"
                      >
                        <Icon size={18} className="text-[#ff5c7a]" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-footer-block
          className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© 2025. All rights reserved.</p>
          <p className="font-robert-regular">
            Kwerky Media · Strategic storytelling for complex tech products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
