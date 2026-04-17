import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-white/10 py-16 px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/brand/big-logo.png" alt="Kwerky Media" className="h-16 w-auto" />
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Content and growth partner for tech companies
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-white/50 hover:text-blue-400 transition-colors text-sm">Home</Link>
            <Link to="/services" className="text-white/50 hover:text-blue-400 transition-colors text-sm">Services</Link>
            <Link to="/about" className="text-white/50 hover:text-blue-400 transition-colors text-sm">About Us</Link>
            <Link to="/blogs" className="text-white/50 hover:text-blue-400 transition-colors text-sm">Blogs</Link>
            <Link to="/videos" className="text-white/50 hover:text-blue-400 transition-colors text-sm">Videos</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
          <div className="space-y-3">
            <a href="mailto:hello@kwerkymedia.com" className="block text-white/50 hover:text-blue-400 transition-colors text-sm">
              hello@kwerkymedia.com
            </a>
            <a href="tel:08031548088" className="block text-white/50 hover:text-blue-400 transition-colors text-sm">
              08031548088
            </a>
            <p className="text-white/40 text-sm leading-relaxed">
              Bangalore
            </p>
            <Link to="/services" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium">
              Let&apos;s discuss your project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="https://www.youtube.com/@kwerkymedia25" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors" data-testid="footer-youtube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/kwerky-media/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors" data-testid="footer-linkedin">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
            </a>
            <a href="https://www.instagram.com/kwerkymedia/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors" data-testid="footer-instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
            </a>
            <a href="https://x.com/kwerkymedia" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors" data-testid="footer-twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 text-center">
        <p className="text-white/30 text-sm">© 2025 Kwerky Media. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
