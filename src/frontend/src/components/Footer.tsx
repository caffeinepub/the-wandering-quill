import { Feather } from "lucide-react";
import { SiInstagram, SiLinkedin, SiPinterest, SiX } from "react-icons/si";

const quickLinks = [
  { label: "Home", href: "#/" },
  { label: "About", href: "#/about" },
  { label: "Blogs", href: "#/blogs" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Contact", href: "#/contact" },
];

const legalLinks = [
  { label: "Disclaimer", href: "#/disclaimer" },
  { label: "Privacy Policy", href: "#/privacy" },
  { label: "Terms & Conditions", href: "#/terms" },
];

const categories = [
  "Travel",
  "Technology",
  "Lifestyle",
  "Food",
  "Photography",
  "Health",
];

const socialLinks = [
  { icon: SiX, href: "#", label: "Twitter/X" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiPinterest, href: "#", label: "Pinterest" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-[oklch(var(--navy-deep))] text-white/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[oklch(var(--gold))] flex items-center justify-center">
                <Feather className="w-4 h-4 text-[oklch(var(--navy-deep))]" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                The Wandering Quill
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-5">
              Stories Worth Reading. A personal blog exploring travel,
              technology, lifestyle, and everything in between.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-ocid={`footer.social.${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[oklch(var(--gold))] hover:text-[oklch(var(--navy-deep))] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`footer.${link.label.toLowerCase()}.link`}
                    className="text-sm hover:text-[oklch(var(--gold))] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`footer.${link.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                    className="text-sm hover:text-[oklch(var(--gold))] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href={`#/blogs?category=${cat}`}
                    data-ocid={`footer.category.${cat.toLowerCase()}.link`}
                    className="text-sm hover:text-[oklch(var(--gold))] transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {currentYear} The Wandering Quill. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[oklch(var(--gold))] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
