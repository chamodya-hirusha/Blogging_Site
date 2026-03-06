"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { posts, categories } from "@/data/mock";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { toast } from "sonner";
import { FileText, Image, Settings, Eye, Edit3, Send } from "lucide-react";

export default function AdminPostEditor({ params }: { params?: Promise<{ id: string }> }) {
    const unwrappedParams = params ? use(params) : null;
    const id = unwrappedParams?.id;
    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        pdfUrl: "",
        categoryId: "",
        tags: "",
        content: "",
        status: "draft" as "draft" | "published",
    });

    useEffect(() => {
        if (id) {
            const post = posts.find((p) => p.id === id);
            if (post) {
                setForm({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    coverImage: post.coverImage || "",
                    pdfUrl: post.pdfUrl || "",
                    categoryId: post.categoryId,
                    tags: post.tags.join(", "),
                    content: post.content,
                    status: post.status,
                });
            }
        } else if (categories.length > 0) {
            setForm(prev => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [id]);

    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const handleTitleChange = (title: string) => {
        setForm({ ...form, title, slug: generateSlug(title) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(id ? "Changes saved successfully!" : "Post published successfully!");
        router.push("/admin/posts");
    };

    return (
        <div className="max-w-full px-4 sm:px-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {id ? "Edit Masterpiece" : "Craft New Post"}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm font-medium">Compose and configure your content for the world.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-all"
                    >
                        {showPreview ? <Edit3 size={16} /> : <Eye size={16} />}
                        {showPreview ? "Back to Editor" : "Live Preview"}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Send size={16} /> {id ? "Save Changes" : "Publish Post"}
                    </button>
                </div>
            </div>

            {showPreview ? (
                <div className="bg-white border border-border rounded-[32px] p-12 shadow-sm animate-in zoom-in-95 duration-300">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-10 text-center">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                                {categories.find(c => c.id === form.categoryId)?.name || "Uncategorized"}
                            </span>
                            <h2 className="text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">{form.title || "Your Captivating Title"}</h2>
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">{form.excerpt}</p>
                        </div>
                        {form.coverImage && (
                            <img src={form.coverImage} className="w-full aspect-video object-cover rounded-[24px] mb-12 shadow-2xl" alt="Cover" />
                        )}
                        <div className="prose-blog !max-w-none">
                            <MarkdownRenderer content={form.content || "*Your wisdom starts here...*"} />
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="p-8 bg-white border border-border rounded-3xl shadow-sm space-y-6">
                                <div>
                                    <label className="text-[12px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3 block ml-1">Title of your post</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        className="w-full px-0 py-3 bg-transparent text-5xl font-black text-foreground placeholder:text-muted-foreground/10 focus:outline-none transition-all border-b-2 border-border/30 focus:border-primary"
                                        placeholder="Start typing..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Unique Slug</label>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-border rounded-xl bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tags (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={form.tags}
                                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-border rounded-xl bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            placeholder="habit, learning, productivity"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2 block">Executive Summary</label>
                                    <textarea
                                        value={form.excerpt}
                                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                        rows={3}
                                        className="w-full px-5 py-4 border-2 border-border/50 rounded-2xl bg-muted/10 text-base focus:outline-none focus:border-primary focus:bg-white transition-all font-medium resize-none leading-relaxed"
                                        placeholder="Give readers a quick overview..."
                                    />
                                </div>
                            </div>

                            <div className="p-1 bg-white border border-border rounded-3xl shadow-sm">
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    rows={20}
                                    placeholder="Write your story using Markdown..."
                                    className="w-full p-8 bg-transparent text-base text-foreground font-sans focus:outline-none resize-none leading-relaxed custom-scrollbar"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 bg-white border border-border rounded-3xl shadow-sm sticky top-24">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Settings size={18} strokeWidth={2.5} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Post Configuration</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Publishing Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                                            className="w-full px-4 py-3 border border-border rounded-2xl bg-muted/20 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                                        >
                                            <option value="draft">Draft (Save privately)</option>
                                            <option value="published">Published (Go Live)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Content Category</label>
                                        <select
                                            value={form.categoryId}
                                            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                            className="w-full px-4 py-3 border border-border rounded-2xl bg-muted/20 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                                            required
                                        >
                                            <option value="">Choose a topic...</option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3 block">Feature Image Assets</label>
                                        <input
                                            type="url"
                                            value={form.coverImage}
                                            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                                            className="w-full pl-5 pr-5 py-4 border-2 border-border/50 rounded-2xl bg-muted/10 text-base font-bold focus:outline-none focus:border-primary focus:bg-white transition-all outline-none"
                                            placeholder="Unsplash / Image URL"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3 block">PDF Resource Link</label>
                                        <input
                                            type="url"
                                            value={form.pdfUrl}
                                            onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                                            className="w-full pl-5 pr-5 py-4 border-2 border-border/50 rounded-2xl bg-muted/10 text-base font-bold focus:outline-none focus:border-primary focus:bg-white transition-all outline-none"
                                            placeholder="External PDF Resource"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-border/50">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/admin/posts")}
                                        className="w-full py-4 text-sm font-black text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest"
                                    >
                                        Discard Draft
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
