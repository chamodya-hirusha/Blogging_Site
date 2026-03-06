import { useState } from "react";
import { Link } from "react-router-dom";
import { posts as initialPosts, type Post } from "@/data/mock";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const AdminPostsPage = () => {
  const [postList, setPostList] = useState<Post[]>(initialPosts);

  const toggleStatus = (id: string) => {
    setPostList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p
      )
    );
  };

  const deletePost = (id: string) => {
    if (confirm("Delete this post?")) {
      setPostList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Posts</h1>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{post.title}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{post.category.name}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(post.id)}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        post.status === "published"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {post.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-1.5 rounded text-muted-foreground hover:bg-muted"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="p-1.5 rounded text-muted-foreground hover:bg-muted"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 rounded text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPostsPage;
