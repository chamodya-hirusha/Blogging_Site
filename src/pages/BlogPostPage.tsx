import { useParams, Link } from "react-router-dom";
import { posts } from "@/data/mock";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import PostCard from "@/components/blog/PostCard";
import CategoryBadge from "@/components/blog/CategoryBadge";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug && p.status === "published");

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Post not found</h1>
        <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-primary font-medium hover:underline">← Back to blog</Link>
      </div>
    );
  }

  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = posts
    .filter((p) => p.categoryId === post.categoryId && p.id !== post.id && p.status === "published")
    .slice(0, 3);

  return (
    <article className="container py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{post.title}</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <CategoryBadge category={post.category} />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt || post.createdAt}>{date}</time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover max-h-[400px]"
          />
        )}

        {/* Content layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* TOC sidebar */}
          <aside className="lg:w-64 lg:shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-6">
              <TableOfContents content={post.content} />
            </div>
          </aside>

          {/* Post content */}
          <div className="flex-1 order-1 lg:order-2">
            <MarkdownRenderer content={post.content} />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="mt-6 pt-6 border-t border-border">
              <ShareButtons url={window.location.href} title={post.title} />
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default BlogPostPage;
