"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getAuth, setAuth } from "@/lib/auth";
import { LayoutDashboard, FileText, FolderOpen, MessageSquare, Settings, LogOut, MessageCircle } from "lucide-react";

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Posts", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/comments", label: "Comments", icon: MessageCircle },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!getAuth() && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [router, pathname]);

    const handleLogout = () => {
        setAuth(false);
        router.push("/admin/login");
    };

    // Prevent hydration mismatch
    if (!isClient) return <div className="min-h-screen bg-[#FDFCFB]" />;

    // If not authenticated and not on login page, show nothing (redirect handles it)
    if (!getAuth() && pathname !== "/admin/login") return null;

    // If on login page, render just the children (login page) without the sidebar layout
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex text-[#2D3139]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-white hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            S
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-foreground">LearnFlow</h2>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">Admin Systems</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${active
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 translate-x-1"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1"
                                    }`}
                            >
                                <Icon size={19} strokeWidth={2.5} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                                AD
                            </div>
                            <div>
                                <p className="text-xs font-bold text-foreground">Admin User</p>
                                <p className="text-[10px] text-muted-foreground">admin@blog.com</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white border border-border text-xs font-bold text-destructive hover:bg-destructive/5 transition-colors shadow-sm"
                        >
                            <LogOut size={14} />
                            Logout System
                        </button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground/50 font-medium">
                        v2.4.0 • Built with Passion
                    </p>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="md:hidden sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md p-4 flex items-center justify-between">
                    <Link href="/admin" className="font-bold text-primary flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">S</div>
                        Admin
                    </Link>
                    <button onClick={handleLogout} className="text-xs font-bold text-destructive px-3 py-1.5 rounded-lg bg-destructive/5">Logout</button>
                </header>

                <nav className="md:hidden sticky top-[65px] z-40 border-b border-border bg-white/50 backdrop-blur-md flex overflow-x-auto no-scrollbar">
                    {sidebarLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-5 py-4 text-xs font-bold whitespace-nowrap transition-colors ${active ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <main className="flex-1 p-6 lg:p-10 max-w-[1600px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
