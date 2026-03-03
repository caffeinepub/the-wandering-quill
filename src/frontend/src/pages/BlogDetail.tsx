import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { BlogPost } from "../backend.d";
import { ALL_EXTENDED_POSTS, type ExtendedPost } from "../data/blogContent";
import { useGetBlogPostById } from "../hooks/useQueries";

// ─── Content Renderer ────────────────────────────────────────────────────────

function applyInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let key = 0;

  let match = boldPattern.exec(text);
  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
    match = boldPattern.exec(text);
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    nodes.push(
      <ul
        key={`ul-${key++}`}
        className="list-disc list-outside ml-6 my-4 space-y-1.5"
      >
        {bulletBuffer.map((item) => (
          <li key={item} className="text-foreground/90 leading-relaxed">
            {applyInlineFormatting(item)}
          </li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      flushBullets();
      const text = line.slice(3);
      nodes.push(
        <h2
          key={`h2-${key++}`}
          className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 border-b border-border pb-3"
        >
          {applyInlineFormatting(text)}
        </h2>,
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      flushBullets();
      const text = line.slice(4);
      nodes.push(
        <h3
          key={`h3-${key++}`}
          className="font-display text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3"
        >
          {applyInlineFormatting(text)}
        </h3>,
      );
      continue;
    }

    // Bullet
    if (line.startsWith("- ")) {
      bulletBuffer.push(line.slice(2));
      continue;
    }

    // HR
    if (line.startsWith("---")) {
      flushBullets();
      nodes.push(
        <hr
          key={`hr-${key++}`}
          className="my-8 border-t-2 border-[oklch(var(--gold)/0.3)]"
        />,
      );
      continue;
    }

    // Empty line — paragraph break
    if (line.trim() === "") {
      flushBullets();
      continue;
    }

    // Regular paragraph
    flushBullets();
    nodes.push(
      <p
        key={`p-${key++}`}
        className="text-foreground/85 leading-[1.85] text-[1.0625rem] mb-5"
      >
        {applyInlineFormatting(line)}
      </p>,
    );
  }

  flushBullets();
  return nodes;
}

// ─── Date formatting ─────────────────────────────────────────────────────────

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 animate-pulse">
      <Skeleton className="h-6 w-24 mb-8" />
      <Skeleton className="h-80 w-full rounded-2xl mb-8" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-4">
        {(
          ["full", "full", "4/5", "full", "full", "4/5", "full", "3/4"] as const
        ).map((w) => (
          <Skeleton key={w} className={`h-4 w-${w}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Category colour mapping ──────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  Travel: "bg-blue-100 text-blue-800",
  Technology: "bg-purple-100 text-purple-800",
  Lifestyle: "bg-green-100 text-green-800",
  Food: "bg-orange-100 text-orange-800",
  Health: "bg-teal-100 text-teal-800",
  Photography: "bg-pink-100 text-pink-800",
  default: "bg-gray-100 text-gray-800",
};

// ─── Hook: fetch by ID from backend ──────────────────────────────────────────

function usePostById(id: number) {
  return useGetBlogPostById(BigInt(id));
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogDetail() {
  const [postId, setPostId] = useState<number | null>(null);

  // Parse id from hash like #/blogs/10
  useEffect(() => {
    const parseId = () => {
      const hash = window.location.hash;
      const match = hash.match(/\/blogs\/(\d+)/);
      if (match) setPostId(Number.parseInt(match[1], 10));
    };
    parseId();
    window.addEventListener("hashchange", parseId);
    return () => window.removeEventListener("hashchange", parseId);
  }, []);

  const localPost: ExtendedPost | undefined =
    postId != null ? ALL_EXTENDED_POSTS[postId] : undefined;

  const { data: backendPost, isLoading, isError } = usePostById(postId ?? 0);

  if (postId == null) {
    return <DetailSkeleton />;
  }

  if (localPost) {
    return <PostView post={localPost} isExtended />;
  }

  if (isLoading) return <DetailSkeleton />;

  if (isError || !backendPost) {
    return (
      <div className="page-enter pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
        <div
          data-ocid="blog_detail.error_state"
          className="text-center max-w-sm px-4"
        >
          <p className="font-display text-2xl font-bold text-foreground mb-2">
            Post Not Found
          </p>
          <p className="text-muted-foreground mb-6 text-sm">
            We couldn't find the article you were looking for.
          </p>
          <a
            href="#/blogs"
            data-ocid="blog_detail.back_button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(var(--navy))] hover:text-[oklch(var(--gold))] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </a>
        </div>
      </div>
    );
  }

  return <PostView post={backendPost} isExtended={false} />;
}

// ─── Post View ─────────────────────────────────────────────────────────────────

interface PostViewProps {
  post: BlogPost | ExtendedPost;
  isExtended: boolean;
}

function PostView({ post, isExtended }: PostViewProps) {
  const colorClass = categoryColors[post.category] ?? categoryColors.default;
  const readTime =
    isExtended && "readTime" in post ? (post as ExtendedPost).readTime : null;

  return (
    <article className="page-enter pb-20">
      {/* ── Hero Image ─────────────────────────────────────────────────────── */}
      <div
        data-ocid="blog_detail.hero_image"
        className="relative w-full h-72 sm:h-96 md:h-[480px] bg-[oklch(var(--cream-dark))] overflow-hidden"
      >
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[oklch(var(--navy)/0.15)] to-[oklch(var(--gold)/0.2)]" />
        )}
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(var(--navy)/0.7)] via-[oklch(var(--navy)/0.2)] to-transparent" />

        {/* Back button overlay */}
        <div className="absolute top-6 left-4 sm:left-8">
          <a
            href="#/blogs"
            data-ocid="blog_detail.back_button"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </a>
        </div>

        {/* Category badge overlay */}
        <div className="absolute bottom-6 left-4 sm:left-8">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${colorClass}`}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & meta */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-10 pb-8 border-b border-border"
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-[2.625rem] font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic border-l-4 border-[oklch(var(--gold))] pl-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[oklch(var(--gold))]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[oklch(var(--gold))]" />
              {formatDate(post.date)}
            </span>
            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[oklch(var(--gold))]" />
                {readTime}
              </span>
            )}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          data-ocid="blog_detail.content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-8"
        >
          {isExtended && post.content ? (
            <div className="prose-editorial">{renderContent(post.content)}</div>
          ) : (
            <p className="text-foreground/85 leading-[1.85] text-[1.0625rem]">
              {post.content || "Full article content coming soon."}
            </p>
          )}
        </motion.div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-border">
          <a
            href="#/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(var(--navy))] hover:text-[oklch(var(--gold))] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </a>
        </div>
      </div>
    </article>
  );
}
