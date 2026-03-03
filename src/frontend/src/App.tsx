import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import About from "./pages/About";
import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function getRoute(): string {
  const hash = window.location.hash;
  if (!hash || hash === "#" || hash === "#/") return "/";
  return hash.replace("#", "") || "/";
}

function Router({ route }: { route: string }) {
  if (route === "/" || route === "") return <Home />;
  if (route === "/about") return <About />;
  if (route.startsWith("/blogs/")) return <BlogDetail />;
  if (route.startsWith("/blogs")) return <Blogs />;
  if (route === "/gallery") return <Gallery />;
  if (route === "/contact") return <Contact />;
  if (route === "/disclaimer") return <Disclaimer />;
  if (route === "/privacy") return <PrivacyPolicy />;
  if (route === "/terms") return <Terms />;

  // 404
  return (
    <div className="page-enter pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-foreground mb-4">
          404
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          This page doesn't seem to exist.
        </p>
        <a
          href="#/"
          className="inline-flex items-center gap-2 bg-[oklch(var(--navy))] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[oklch(var(--navy-deep))] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);

    // Set initial hash if empty
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav currentRoute={route} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Router route={route} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <Toaster richColors position="top-right" />
    </div>
  );
}
