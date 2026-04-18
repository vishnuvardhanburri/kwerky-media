import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@kwerkymedia25", icon: Youtube, testId: "footer-youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kwerky-media/", icon: Linkedin, testId: "footer-linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/kwerkymedia/", icon: Instagram, testId: "footer-instagram" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook, testId: "footer-facebook" },
  { label: "Twitter", href: "https://x.com/kwerkymedia", icon: Twitter, testId: "footer-twitter" },
];

const Footer = () => {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Thanks — we’ll keep you posted.");
  };

  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-14 rounded-[2rem] border border-white/10 bg-[#050b16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-blue-300/80">Newsletter</p>
              <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                <span className="text-blue-300">Stay</span>{" "}
                <span className="text-[#ffb347]">connected</span>
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-white/72">
                One form only. Get updates on content, campaigns, blogs, and Kwerky releases.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="h-12 rounded-full border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ffb347]/60"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-[#ffb347] px-6 font-semibold text-black transition-colors hover:bg-[#ffc56e]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="mb-12 grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-4 inline-block">
              <img src="/brand/big-logo.png" alt="Kwerky Media" className="logo-mark h-16 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-white/72">
              Content and growth partner for tech companies
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                Home
              </Link>
              <Link to="/services" className="text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                Services
              </Link>
              <Link to="/about" className="text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                About Us
              </Link>
              <Link to="/blogs" className="text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                Blogs
              </Link>
              <Link to="/videos" className="text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                Videos
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
            <div className="space-y-3">
              <a href="mailto:hello@kwerkymedia.com" className="block text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                hello@kwerkymedia.com
              </a>
              <a href="tel:08031548088" className="block text-sm text-white/65 transition-colors hover:text-[#ffb347]">
                08031548088
              </a>
              <p className="text-sm leading-relaxed text-white/50">Bangalore</p>
              <Link
                to="/services#contact-info-section"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-[#ffb347]"
              >
                Let&apos;s discuss your project
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 transition-colors hover:text-[#ffb347]"
                    data-testid={item.testId}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-white/30">© 2025 Kwerky Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
