import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, User } from "lucide-react";
import type { BlogPost } from "../backend.d";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const categoryColors: Record<string, string> = {
  Travel: "bg-blue-100 text-blue-800",
  Technology: "bg-purple-100 text-purple-800",
  Lifestyle: "bg-green-100 text-green-800",
  Food: "bg-orange-100 text-orange-800",
  Health: "bg-teal-100 text-teal-800",
  Photography: "bg-pink-100 text-pink-800",
  default: "bg-gray-100 text-gray-800",
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const colorClass = categoryColors[post.category] ?? categoryColors.default;

  return (
    <article
      data-ocid={`blogs.card.item.${index}`}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-cream-dark">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[oklch(var(--navy)/0.1)] to-[oklch(var(--gold)/0.15)] flex items-center justify-center">
            <Tag className="w-10 h-10 text-[oklch(var(--navy)/0.3)]" />
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${colorClass}`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-[oklch(var(--navy))] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
          </div>
          <a
            href={`#/blogs/${post.id}`}
            data-ocid={`blogs.readmore.button.${index}`}
            className="text-xs font-semibold text-[oklch(var(--navy))] hover:text-[oklch(var(--gold))] transition-colors"
          >
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
}
