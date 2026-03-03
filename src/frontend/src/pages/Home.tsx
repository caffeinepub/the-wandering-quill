import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import BlogCard from "../components/BlogCard";
import {
  useGetAllBlogPosts,
  useSubscribeNewsletter,
} from "../hooks/useQueries";

// Fallback sample posts if backend is empty
const fallbackPosts = [
  {
    id: 1n,
    title: "Lost in the Lavender Fields of Provence",
    excerpt:
      "A serendipitous detour through southern France led me to the most breathtaking landscapes I've ever witnessed — endless purple horizons that smelled of summer.",
    content: "",
    category: "Travel",
    author: "Tanveer Wani",
    date: BigInt(Date.now()),
    imageUrl: "https://picsum.photos/seed/provence/600/400",
    tags: ["France", "Travel", "Nature"],
  },
  {
    id: 2n,
    title: "Why I Deleted All My Social Media Apps for 30 Days",
    excerpt:
      "An experiment in digital minimalism taught me more about focus, creativity, and genuine connection than any productivity hack ever could.",
    content: "",
    category: "Lifestyle",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 86400000),
    imageUrl: "https://picsum.photos/seed/digital/600/400",
    tags: ["Mindfulness", "Technology", "Lifestyle"],
  },
  {
    id: 3n,
    title: "The Perfect Ramen: A Year-Long Obsession",
    excerpt:
      "From Tokyo's underground shops to a recipe I finally perfected in my own kitchen — here's everything I learned chasing the ideal bowl.",
    content: "",
    category: "Food",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 2 * 86400000),
    imageUrl: "https://picsum.photos/seed/ramen/600/400",
    tags: ["Food", "Japan", "Cooking"],
  },
  {
    id: 4n,
    title: "Building a Second Brain: Tools That Actually Work",
    excerpt:
      "I've tried every note-taking app, every productivity system, and every knowledge management tool. Here's the honest truth about what sticks.",
    content: "",
    category: "Technology",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 3 * 86400000),
    imageUrl: "https://picsum.photos/seed/notes/600/400",
    tags: ["Productivity", "Technology", "Writing"],
  },
  {
    id: 5n,
    title: "Morning Rituals of Exceptionally Creative People",
    excerpt:
      "After interviewing 40 writers, artists, and makers, a striking pattern emerged — and it has nothing to do with waking up at 5am.",
    content: "",
    category: "Lifestyle",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 4 * 86400000),
    imageUrl: "https://picsum.photos/seed/morning/600/400",
    tags: ["Creativity", "Habits", "Lifestyle"],
  },
  {
    id: 6n,
    title: "Capturing Light: What Street Photography Taught Me",
    excerpt:
      "Walking the streets with a camera changed how I see the world. Every corner holds a story; the lens just helps me tell it.",
    content: "",
    category: "Photography",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 5 * 86400000),
    imageUrl: "https://picsum.photos/seed/photo/600/400",
    tags: ["Photography", "Art", "Street"],
  },
];

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const { data: posts, isLoading, isError } = useGetAllBlogPosts();
  const subscribe = useSubscribeNewsletter();

  const displayPosts = (
    posts && posts.length > 0 ? posts : fallbackPosts
  ).slice(0, 3);
  const featuredPost = posts && posts.length > 0 ? posts[0] : fallbackPosts[0];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe.mutateAsync(email);
      toast.success("You're subscribed! Welcome to the community. 🎉");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page-enter">
      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[oklch(var(--navy-deep))]"
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,oklch(var(--gold)/0.4)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_left,oklch(var(--navy)/0.8)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[oklch(var(--gold))] text-sm font-semibold tracking-widest uppercase mb-6 border border-[oklch(var(--gold)/0.4)] px-4 py-1 rounded-full">
              Welcome to The Wandering Quill
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
              Stories{" "}
              <em className="not-italic text-[oklch(var(--gold))]">Worth</em>
              <br />
              Reading
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Dispatches from the road, reflections on modern life, and recipes
              worth the mess. Join me on a journey through words and worlds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/blogs" data-ocid="home.hero.primary_button">
                <Button
                  size="lg"
                  className="bg-[oklch(var(--gold))] text-[oklch(var(--navy-deep))] hover:bg-[oklch(var(--gold-light))] font-semibold px-8 shadow-gold"
                >
                  Read the Blog <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#/about" data-ocid="home.hero.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8"
                >
                  About Tanveer
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-3 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── Featured Post ─────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.featured.section"
        className="py-16 px-4 bg-cream-dark"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[oklch(var(--gold))]">
              Featured Story
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-card-hover bg-card hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-64 md:h-auto overflow-hidden">
              <img
                src={
                  featuredPost.imageUrl ||
                  "https://picsum.photos/seed/featured/800/600"
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-[oklch(var(--gold))] mb-3">
                {featuredPost.category}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <a href="#/blogs" data-ocid="home.featured.primary_button">
                <Button
                  variant="outline"
                  className="w-fit border-[oklch(var(--navy)/0.3)] hover:bg-[oklch(var(--navy))] hover:text-white hover:border-[oklch(var(--navy))] transition-all"
                >
                  <BookOpen className="mr-2 w-4 h-4" /> Read Full Story
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Latest Posts ──────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.latest.section"
        className="py-16 px-4 bg-background"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[oklch(var(--gold))] mb-1">
                Fresh Off The Page
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Latest Posts
              </h2>
            </div>
            <a
              href="#/blogs"
              data-ocid="home.viewall.link"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[oklch(var(--navy))] hover:text-[oklch(var(--gold))] transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {isLoading ? (
            <div
              data-ocid="home.posts.loading_state"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError ? (
            <div
              data-ocid="home.posts.error_state"
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                Couldn't load posts right now. Showing sample content.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {displayPosts.map((post, i) => (
                <motion.div
                  key={String(post.id)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <BlogCard post={post} index={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <a href="#/blogs" data-ocid="home.viewall.mobile.link">
              <Button variant="outline">View All Posts</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.newsletter.section"
        className="py-16 px-4 bg-[oklch(var(--navy-deep))]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
              Never Miss a Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              Join the Newsletter
            </h2>
            <p className="text-white/60 mb-8">
              New stories, travel dispatches, and personal essays — delivered to
              your inbox. No spam, ever.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="home.newsletter.input"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[oklch(var(--gold))] focus:ring-[oklch(var(--gold))]"
              />
              <Button
                type="submit"
                data-ocid="home.newsletter.submit_button"
                disabled={subscribe.isPending}
                className="bg-[oklch(var(--gold))] text-[oklch(var(--navy-deep))] hover:bg-[oklch(var(--gold-light))] font-semibold whitespace-nowrap shadow-gold"
              >
                {subscribe.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
