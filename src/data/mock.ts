export interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  categoryId: string;
  category: Category;
  author: string;
  tags: string[];
  readingTime: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "unread" | "read" | "replied";
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoText: string;
  footerText: string;
}

export const siteSettings: SiteSettings = {
  siteTitle: "LearnFlow",
  tagline: "Ideas, tutorials, and stories for curious minds",
  logoText: "LearnFlow",
  footerText: "© 2026 LearnFlow. Built for learners, by learners.",
};

export const categories: Category[] = [
  { id: "1", name: "Technology", slug: "technology", postCount: 4 },
  { id: "2", name: "Study Tips", slug: "study-tips", postCount: 3 },
  { id: "3", name: "Career", slug: "career", postCount: 2 },
  { id: "4", name: "Productivity", slug: "productivity", postCount: 3 },
  { id: "5", name: "Web Development", slug: "web-development", postCount: 2 },
];

const sampleContent = `## Introduction

This is a comprehensive guide that covers everything you need to know about this topic. Whether you're just starting out or looking to deepen your understanding, this post has something for everyone.

## Getting Started

Before diving into the details, let's cover the basics. Understanding the fundamentals is crucial for building a strong foundation.

Here are some key points to keep in mind:

- Start with the basics and build up gradually
- Practice regularly to reinforce your learning
- Don't be afraid to make mistakes — they're part of the process
- Seek feedback from peers and mentors

## Core Concepts

### Understanding the Fundamentals

The fundamentals form the backbone of any skill. Without a solid grasp of the basics, advanced topics will feel overwhelming.

> "The expert in anything was once a beginner." — Helen Hayes

### Practical Application

Theory is important, but nothing beats hands-on practice. Try to apply what you learn as soon as possible.

\`\`\`javascript
// Example code block
function greet(name) {
  return \`Hello, \${name}! Welcome to learning.\`;
}

console.log(greet("Student"));
\`\`\`

## Best Practices

1. **Consistency** — Show up every day, even if it's just for 15 minutes
2. **Active learning** — Don't just read; take notes, solve problems, teach others
3. **Review** — Regularly revisit what you've learned to strengthen memory

## Resources

Here are some excellent resources to continue your journey:

- [MDN Web Docs](https://developer.mozilla.org) — Comprehensive web documentation
- [freeCodeCamp](https://freecodecamp.org) — Free coding curriculum
- [Khan Academy](https://khanacademy.org) — Free courses on many subjects

## Conclusion

Learning is a lifelong journey. The key is to stay curious, be patient with yourself, and enjoy the process. Remember that every expert was once a beginner.

Happy learning!`;

export const posts: Post[] = [
  {
    id: "1",
    title: "How to Build Better Study Habits in 2026",
    slug: "build-better-study-habits-2026",
    excerpt: "Discover proven strategies to improve your study routine and retain information more effectively this year.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-15T10:00:00Z",
    publishedAt: "2026-02-15T10:00:00Z",
    categoryId: "2",
    category: { id: "2", name: "Study Tips", slug: "study-tips", postCount: 3 },
    author: "Alex Johnson",
    tags: ["study", "habits", "productivity"],
    readingTime: 6,
  },
  {
    id: "2",
    title: "Introduction to TypeScript for Beginners",
    slug: "introduction-typescript-beginners",
    excerpt: "A beginner-friendly guide to TypeScript — learn why it's worth adding types to your JavaScript code.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    createdAt: "2026-02-20T08:00:00Z",
    updatedAt: "2026-02-20T08:00:00Z",
    publishedAt: "2026-02-20T08:00:00Z",
    categoryId: "1",
    category: { id: "1", name: "Technology", slug: "technology", postCount: 4 },
    author: "Sarah Chen",
    tags: ["typescript", "javascript", "programming"],
    readingTime: 8,
  },
  {
    id: "3",
    title: "Top 10 Productivity Tools for Students",
    slug: "top-productivity-tools-students",
    excerpt: "From note-taking apps to time management tools, here are the best productivity tools every student should know.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    createdAt: "2026-02-25T14:00:00Z",
    updatedAt: "2026-02-25T14:00:00Z",
    publishedAt: "2026-02-25T14:00:00Z",
    categoryId: "4",
    category: { id: "4", name: "Productivity", slug: "productivity", postCount: 3 },
    author: "Alex Johnson",
    tags: ["tools", "productivity", "apps"],
    readingTime: 5,
  },
  {
    id: "4",
    title: "How to Prepare for Your First Tech Interview",
    slug: "prepare-first-tech-interview",
    excerpt: "A complete guide to preparing for technical interviews — from data structures to behavioral questions.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    createdAt: "2026-03-01T09:00:00Z",
    updatedAt: "2026-03-01T09:00:00Z",
    publishedAt: "2026-03-01T09:00:00Z",
    categoryId: "3",
    category: { id: "3", name: "Career", slug: "career", postCount: 2 },
    author: "Michael Park",
    tags: ["career", "interview", "tech"],
    readingTime: 10,
  },
  {
    id: "5",
    title: "Understanding CSS Grid: A Visual Guide",
    slug: "understanding-css-grid-visual-guide",
    excerpt: "Master CSS Grid layout with this visual, example-driven guide. Perfect for visual learners.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    createdAt: "2026-03-03T11:00:00Z",
    updatedAt: "2026-03-03T11:00:00Z",
    publishedAt: "2026-03-03T11:00:00Z",
    categoryId: "5",
    category: { id: "5", name: "Web Development", slug: "web-development", postCount: 2 },
    author: "Sarah Chen",
    tags: ["css", "grid", "frontend"],
    readingTime: 7,
  },
  {
    id: "6",
    title: "The Pomodoro Technique: A Student's Best Friend",
    slug: "pomodoro-technique-students",
    excerpt: "Learn how the Pomodoro Technique can transform your focus and help you study smarter, not harder.",
    content: sampleContent,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    createdAt: "2026-03-04T16:00:00Z",
    updatedAt: "2026-03-04T16:00:00Z",
    publishedAt: "2026-03-04T16:00:00Z",
    categoryId: "4",
    category: { id: "4", name: "Productivity", slug: "productivity", postCount: 3 },
    author: "Alex Johnson",
    tags: ["pomodoro", "focus", "study"],
    readingTime: 4,
  },
  {
    id: "7",
    title: "React Hooks Explained Simply",
    slug: "react-hooks-explained-simply",
    excerpt: "A clear and simple explanation of React Hooks — useState, useEffect, and custom hooks demystified.",
    content: sampleContent,
    status: "draft",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-03-05T10:00:00Z",
    categoryId: "1",
    category: { id: "1", name: "Technology", slug: "technology", postCount: 4 },
    author: "Sarah Chen",
    tags: ["react", "hooks", "frontend"],
    readingTime: 9,
  },
];

export const contactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma@example.com",
    subject: "Great blog!",
    message: "I love the content on your blog. The study tips have really helped me improve my grades this semester!",
    createdAt: "2026-03-01T14:30:00Z",
    status: "read",
  },
  {
    id: "2",
    name: "James Lee",
    email: "james@example.com",
    subject: "Collaboration request",
    message: "Hi, I'm a student blogger as well. Would you be interested in writing a guest post for each other's blogs?",
    createdAt: "2026-03-03T09:15:00Z",
    status: "unread",
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria@example.com",
    subject: "Question about TypeScript post",
    message: "Thanks for the TypeScript article! Could you write a follow-up on generics? That topic confuses me.",
    createdAt: "2026-03-04T18:45:00Z",
    status: "unread",
  },
];
