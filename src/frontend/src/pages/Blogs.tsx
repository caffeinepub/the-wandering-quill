import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { BlogPost } from "../backend.d";
import BlogCard from "../components/BlogCard";
import { FEATURED_POSTS } from "../data/blogContent";
import { useGetAllBlogPosts } from "../hooks/useQueries";

const categories = [
  "All",
  "Travel",
  "Technology",
  "Lifestyle",
  "Food",
  "Health",
  "Photography",
];

const fallbackPosts: BlogPost[] = [
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
  {
    id: 7n,
    title: "Hidden Valleys of the Himalayas",
    excerpt:
      "Trekking through remote mountain villages where time moves differently — lessons in simplicity from the world's highest peaks.",
    content: "",
    category: "Travel",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 6 * 86400000),
    imageUrl: "https://picsum.photos/seed/himalayas/600/400",
    tags: ["Nepal", "Hiking", "Travel"],
  },
  {
    id: 8n,
    title: "The Mediterranean Diet Actually Explained",
    excerpt:
      "I spent three months eating like a Greek grandmother. Here's what changed — and what the wellness industry conveniently leaves out.",
    content: "",
    category: "Health",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 7 * 86400000),
    imageUrl: "https://picsum.photos/seed/mediterranean/600/400",
    tags: ["Health", "Food", "Nutrition"],
  },
  {
    id: 9n,
    title: "AI Tools I Actually Use Every Day as a Writer",
    excerpt:
      "Not the hype, not the fear — just the practical reality of integrating AI into a professional writing practice in 2024.",
    content: "",
    category: "Technology",
    author: "Tanveer Wani",
    date: BigInt(Date.now() - 8 * 86400000),
    imageUrl: "https://picsum.photos/seed/aitools/600/400",
    tags: ["AI", "Writing", "Technology"],
  },
  // Extended long-form posts
  ...FEATURED_POSTS.map((p) => ({
    id: BigInt(p.id),
    title: p.title,
    excerpt: p.excerpt,
    content: "",
    category: p.category,
    author: p.author,
    date: p.date,
    imageUrl: p.imageUrl,
    tags: p.tags,
  })),
];

const POSTS_PER_PAGE = 3;

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

export default function Blogs() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data: posts, isLoading, isError } = useGetAllBlogPosts();
  const allPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  const filtered = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginatedPosts = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="page-enter pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
            All Articles
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            The Blog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stories, guides, and reflections from travels near and far. Use the
            filters below to find what you're looking for.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6 max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts by title, topic, or keyword…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            data-ocid="blogs.search_input"
            className="pl-9"
          />
        </div>

        {/* Category filter */}
        <div
          data-ocid="blogs.category.tab"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              data-ocid={`blogs.filter.${cat.toLowerCase()}.tab`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[oklch(var(--navy))] text-white"
                  : "bg-[oklch(var(--cream-dark))] text-foreground hover:bg-[oklch(var(--navy)/0.1)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter status */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {search && ` for "${search}"`}
          </span>
        </div>

        {/* Posts grid */}
        {isLoading ? (
          <div
            data-ocid="blogs.posts.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="blogs.posts.error_state"
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              Failed to load posts from backend. Showing sample content.
            </p>
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div
            data-ocid="blogs.posts.empty_state"
            className="text-center py-20"
          >
            <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            key={`${activeCategory}-${search}-${page}`}
          >
            {paginatedPosts.map((post, i) => (
              <motion.div
                key={String(post.id)}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard
                  post={post}
                  index={(page - 1) * POSTS_PER_PAGE + i + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-ocid="blogs.pagination_prev"
            >
              ← Previous
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPage(p)}
                  data-ocid={`blogs.page.item.${p}`}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    p === page
                      ? "bg-[oklch(var(--navy))] text-white"
                      : "bg-cream-dark hover:bg-[oklch(var(--navy)/0.1)] text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-ocid="blogs.pagination_next"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
