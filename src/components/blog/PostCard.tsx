import { Link } from "react-router-dom";
import type { Post } from "@/data/mock";
import CategoryBadge from "./CategoryBadge";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      {post.coverImage && (
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt || post.createdAt}>{date}</time>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
