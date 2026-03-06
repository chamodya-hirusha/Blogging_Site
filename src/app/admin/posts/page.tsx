"use client";

import { useState } from "react";
import Link from "next/link";
import { posts as initialPosts, type Post } from "@/data/mock";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function AdminPostsPage() {
    const [postList, setPostList] = useState<Post[]>(initialPosts);
    const [search, setSearch] = useState("");

    const toggleStatus = (id: string) => {
        setPostList((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, status: p.status === "published" ? "draft" : "published" }
                    : p
            )
        );
        toast.success("Status updated!");
    };

    const deletePost = (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            setPostList((prev) => prev.filter((p) => p.id !== id));
            toast.error("Post deleted");
        }
    };

    const filteredPosts = postList.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Posts</h1>
                    <p className="text-muted-foreground mt-1 text-sm font-medium">Manage and organize your blog content.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus size={18} strokeWidth={3} /> New Post
                </Link>
            </div>

            <div className="bg-white border border-border shadow-sm rounded-2xl overflow-hidden mb-6">
                <div className="p-4 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-xs font-bold text-foreground hover:bg-muted/50 transition-colors">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/10 text-left">
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Title & Category</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Performance</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-muted/10 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-muted flex-shrink-0 overflow-hidden hidden sm:block">
                                                {post.coverImage && <img src={post.coverImage} className="w-full h-full object-cover" alt="" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{post.title}</p>
                                                <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{post.category.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(post.id)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all active:scale-95 ${post.status === "published"
                                                ? "bg-green-50 text-green-700 border border-green-200"
                                                : "bg-amber-50 text-amber-700 border border-amber-200"
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-600' : 'bg-amber-600'}`} />
                                            {post.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Eye size={14} className="text-primary/40" />
                                            <span className="text-xs font-bold text-foreground">{(post.viewCount || 0).toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                title="Preview"
                                            >
                                                <Eye size={17} />
                                            </Link>
                                            <Link
                                                href={`/admin/posts/edit/${post.id}`}
                                                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={17} />
                                            </Link>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className="p-2 rounded-lg text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground font-medium">No posts found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
