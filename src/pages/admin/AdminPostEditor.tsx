import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/mock";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

const AdminPostEditor = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    categoryId: "",
    tags: "",
    content: "",
    status: "draft" as "draft" | "published",
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm({ ...form, title, slug: generateSlug(title) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Post saved (mock)!");
    navigate("/admin/posts");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {form.title ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted"
          >
            {showPreview ? "Editor" : "Preview"}
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">{form.title || "Untitled"}</h2>
          <MarkdownRenderer content={form.content || "*No content yet*"} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Cover Image URL</label>
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="react, typescript, tutorial"
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Content (Markdown)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={16}
              placeholder="Write your post in Markdown..."
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary resize-y"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Save Post
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPostEditor;
