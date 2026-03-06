"use client";

import { use } from "react";
import Link from "next/link";
import { FileText, MessageCircle, Send, User } from "lucide-react";
import { posts, comments } from "@/data/mock";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import PostCard from "@/components/blog/PostCard";
import CategoryBadge from "@/components/blog/CategoryBadge";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = posts.find((p) => p.slug === slug && p.status === "published");
    const [newComment, setNewComment] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!post) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">Post not found</h1>
                <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
                <Link href="/blog" className="text-primary font-medium hover:underline">← Back to blog</Link>
            </div>
        );
    }

    const postComments = comments.filter(c => c.postId === post.id && c.status === "approved");

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        toast.success("Comment submitted for review!");
        setNewComment("");
    };

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
            <nav className="text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-foreground">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-foreground">Blog</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{post.title}</span>
            </nav>

            <div className="max-w-4xl mx-auto">
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

                {post.coverImage && (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full rounded-lg mb-8 object-cover max-h-[400px]"
                    />
                )}

                <div className="flex flex-col lg:flex-row gap-10">
                    <aside className="lg:w-64 lg:shrink-0 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-6">
                            <TableOfContents content={post.content} />
                        </div>
                    </aside>

                    <div className="flex-1 order-1 lg:order-2">
                        <MarkdownRenderer content={post.content} />

                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {post.pdfUrl && (
                            <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-indigo-900">PDF Version Available</h4>
                                        <p className="text-xs text-indigo-700/70 font-medium">Download this article for offline reading.</p>
                                    </div>
                                </div>
                                <a
                                    href={post.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2"
                                >
                                    <FileText size={14} /> Download PDF
                                </a>
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-border mb-12">
                            {mounted && <ShareButtons url={window.location.href} title={post.title} />}
                        </div>

                        <section className="mt-16 border-t border-border pt-12">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <MessageCircle size={22} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-foreground">Reader Discussion ({postComments.length})</h3>
                            </div>

                            <div className="space-y-8 mb-12">
                                {postComments.map((comment) => (
                                    <div key={comment.id} className="group flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                            <User size={24} />
                                        </div>
                                        <div className="flex-1 p-6 rounded-3xl bg-secondary/30 border border-border/50 group-hover:border-primary/20 transition-all duration-300">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-black text-foreground">{comment.author}</span>
                                                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed font-medium">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 rounded-[32px] bg-white border border-border shadow-sm">
                                <h4 className="font-black text-lg text-foreground mb-6">Join the conversation</h4>
                                <form onSubmit={handleCommentSubmit} className="space-y-4">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts..."
                                        className="w-full p-6 bg-muted/20 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-32 resize-none font-medium"
                                        required
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            <Send size={18} /> Post Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="mt-20 border-t border-border pt-16">
                        <h2 className="text-2xl font-black text-foreground mb-8 tracking-tight">Expand Your Knowledge</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map((p) => (
                                <PostCard key={p.id} post={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
