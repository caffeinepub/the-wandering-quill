import { Feather, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#/" },
  { label: "About", href: "#/about" },
  { label: "Blogs", href: "#/blogs" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Contact", href: "#/contact" },
];

interface NavProps {
  currentRoute: string;
}

export default function Nav({ currentRoute }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change - currentRoute is a prop, biome wants it noted as "outer scope value" but it IS reactive
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentRoute is a prop dependency
  useEffect(() => {
    setMobileOpen(false);
  }, [currentRoute]);

  const isActive = (href: string) => {
    const route = href.replace("#", "");
    if (route === "/" || route === "") {
      return currentRoute === "/" || currentRoute === "";
    }
    return currentRoute.startsWith(route);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(var(--navy-deep))] shadow-lg"
          : "bg-[oklch(var(--navy-deep))]"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="#/"
            data-ocid="nav.home.link"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-[oklch(var(--gold))] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Feather className="w-4 h-4 text-[oklch(var(--navy-deep))]" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight hidden sm:block">
              The Wandering Quill
            </span>
            <span className="font-display font-bold text-lg text-white tracking-tight sm:hidden">
              TWQ
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-[oklch(var(--gold))] text-[oklch(var(--navy-deep))]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.hamburger.toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[oklch(var(--navy-deep))] border-t border-white/10"
            data-ocid="nav.mobile.dropdown_menu"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-[oklch(var(--gold))] text-[oklch(var(--navy-deep))]"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
