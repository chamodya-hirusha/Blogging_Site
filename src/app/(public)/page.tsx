"use client";

import { useState } from "react";
import Link from "next/link";
import { posts, categories, siteSettings } from "@/data/mock";
import PostCard from "@/components/blog/PostCard";
import CategoryBadge from "@/components/blog/CategoryBadge";
import SearchBar from "@/components/blog/SearchBar";
import { BookOpen, TrendingUp, Users, ArrowRight } from "lucide-react";
// Assumes assets are in public or imported correctly
import heroBg from "@/assets/hero-bg.jpg";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const publishedPosts = posts.filter((p) => p.status === "published");
    const latestPosts = publishedPosts.slice(0, 6);
    const featuredPost = publishedPosts[0];
    const recentPosts = publishedPosts.slice(1, 4);

    const filteredPosts = search
        ? publishedPosts.filter(
            (p) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(search.toLowerCase())
        )
        : null;

    return (
        <>
            <section className="relative overflow-hidden">
                <img
                    src={typeof heroBg === 'string' ? heroBg : heroBg.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
                <div className="relative container py-20 md:py-32">
                    <div className="max-w-xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5 tracking-wide uppercase">
                            Welcome to {siteSettings.siteTitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
                            Learn. Write.{" "}
                            <span className="text-primary">Grow.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                            {siteSettings.tagline}. Explore insightful articles on technology, productivity, and career growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                                placeholder="Search articles..."
                                className="flex-1"
                            />
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 whitespace-nowrap"
                            >
                                Browse All <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {filteredPosts && (
                <section className="container py-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                            Search Results
                        </h2>
                        <button
                            onClick={() => setSearch("")}
                            className="text-sm text-primary font-medium hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16 bg-card border border-border rounded-xl">
                            <p className="text-muted-foreground">No posts found for "{search}"</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {!filteredPosts && (
                <>
                    <section className="border-b border-border bg-card">
                        <div className="container py-8">
                            <div className="grid grid-cols-3 gap-6 text-center">
                                {[
                                    { icon: BookOpen, label: "Articles", value: publishedPosts.length.toString() + "+" },
                                    { icon: Users, label: "Categories", value: categories.length.toString() },
                                    { icon: TrendingUp, label: "Min Avg Read", value: Math.round(publishedPosts.reduce((a, p) => a + p.readingTime, 0) / publishedPosts.length).toString() },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex flex-col items-center">
                                        <stat.icon size={22} className="text-primary mb-2" />
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {featuredPost && (
                        <section className="container py-12">
                            <h2 className="text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                                Featured Article
                            </h2>
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                className="group block bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {featuredPost.coverImage && (
                                        <img
                                            src={featuredPost.coverImage}
                                            alt={featuredPost.title}
                                            className="w-full h-56 md:h-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-7 md:p-10 flex flex-col justify-center">
                                        <CategoryBadge category={featuredPost.category} noLink />
                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-4 mb-3 leading-tight group-hover:text-primary">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">{featuredPost.author}</span>
                                            <span>·</span>
                                            <span>{featuredPost.readingTime} min read</span>
                                            <span>·</span>
                                            <time>
                                                {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric",
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </section>
                    )}

                    <section className="container pb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-semibold text-foreground">Recent Posts</h2>
                            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                                View all <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>

                    <section className="bg-card border-t border-b border-border">
                        <div className="container py-12">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold text-foreground mb-2">Explore by Category</h2>
                                <p className="text-sm text-muted-foreground">Find articles that match your interests</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background border border-border text-foreground text-sm font-medium hover:border-primary hover:text-primary shadow-sm"
                                    >
                                        {cat.name}
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                            {cat.postCount}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="container py-12">
                        <h2 className="text-xl font-semibold text-foreground mb-8">More to Read</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestPosts.slice(3).map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>

                    <section className="container pb-16">
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-foreground mb-3">Stay Curious</h2>
                            <p className="text-muted-foreground mb-6">
                                New articles every week on study tips, tech, and career growth. Don't miss out.
                            </p>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
                            >
                                Start Reading <ArrowRight size={16} />
                            </Link>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
