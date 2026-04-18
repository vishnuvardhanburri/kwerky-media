import { useLocation, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSiteActions } from "@/context/site-actions";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@kwerkymedia25", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kwerky-media/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/kwerkymedia/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { label: "Twitter", href: "https://x.com/kwerkymedia", icon: Twitter },
];

const ContactDrawer = () => {
  const { isContactOpen, closeContactInfo } = useSiteActions();
  const navigate = useNavigate();
  const location = useLocation();

  const goToServicesContact = () => {
    closeContactInfo();
    if (location.pathname !== "/services") {
      navigate("/services#contact-info-section");
      return;
    }
    window.requestAnimationFrame(() => {
      document.getElementById("contact-info-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <Sheet open={isContactOpen} onOpenChange={(open) => (open ? undefined : closeContactInfo())}>
      <SheetContent side="right" className="w-[min(100vw-0.5rem,27rem)] border-white/10 bg-[#111111] p-0 text-white shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_top_left,rgba(37,99,235,0.2),transparent_30%)]" />
        <div className="relative h-full overflow-y-auto px-5 py-6 sm:px-6">
          <SheetHeader className="border-b border-white/10 pb-5 text-left">
            <div className="flex items-center gap-3">
              <img src="/brand/big-logo.png" alt="Kwerky Media" className="h-12 w-auto logo-mark" />
              <div className="min-w-0">
                <SheetTitle className="text-lg font-semibold text-white">Kwerky Media</SheetTitle>
                <SheetDescription className="text-white/55">
                  Content and growth partner for tech companies
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Contact</p>
              <div className="mt-5 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Phone</p>
                    <a href="tel:08031548088" className="mt-1 block text-white/68 hover:text-blue-300">
                      08031548088
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Email</p>
                    <a href="mailto:hello@kwerkymedia.com" className="mt-1 block break-words text-white/68 hover:text-blue-300">
                      hello@kwerkymedia.com
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Address</p>
                    <p className="mt-1 max-w-xs text-white/68">
                      Bangalore
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Stay connected</p>
              <div className="mt-5 grid grid-cols-5 gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-blue-400/30 hover:text-blue-300"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={goToServicesContact}
              className="w-full rounded-full bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Let&apos;s discuss your project
            </motion.button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactDrawer;
