"use client";

import { use } from "react";
import { posts, categories } from "@/data/mock";
import PostCard from "@/components/blog/PostCard";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const category = categories.find((c) => c.slug === slug);
    const categoryPosts = posts.filter(
        (p) => p.category.slug === slug && p.status === "published"
    );

    if (!category) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">{category.name}</h1>
            <p className="text-muted-foreground mb-8">
                {categoryPosts.length} post{categoryPosts.length !== 1 ? "s" : ""} in this category
            </p>

            {categoryPosts.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No posts yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
