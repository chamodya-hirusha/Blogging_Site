import { useState, useMemo } from "react";
import { posts, categories } from "@/data/mock";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";
import Pagination from "@/components/blog/Pagination";

const POSTS_PER_PAGE = 6;

const BlogListPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts.filter((p) => p.status === "published");

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    result.sort((a, b) => {
      const da = new Date(a.publishedAt || a.createdAt).getTime();
      const db = new Date(b.publishedAt || b.createdAt).getTime();
      return sort === "latest" ? db - da : da - db;
    });

    return result;
  }, [search, selectedCategory, sort]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold text-foreground mb-6">All Posts</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} className="flex-1" />
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
          className="px-3 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
          className="px-3 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default BlogListPage;
