"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteSettings } from "@/data/mock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group transition-all">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <img src="/logo.png" alt="Logo" className="relative w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tighter">
            {siteSettings.logoText}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-tight transition-all duration-200 relative py-1 group ${isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Auth / Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin/login"
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mr-2"
          >
            Admin Sign In
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 rounded-xl bg-muted/50 text-foreground transition-all hover:bg-muted active:scale-95"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden absolute top-20 left-0 w-full border-b border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="container py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-4 rounded-2xl text-base font-bold transition-all ${pathname === link.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:bg-muted/50"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-6 border-t border-border flex flex-col gap-3">
              <Link
                href="/admin/login"
                className="px-6 py-4 rounded-2xl text-base font-bold text-muted-foreground hover:bg-muted/50"
                onClick={() => setMobileOpen(false)}
              >
                Admin Access
              </Link>
              <Link
                href="/contact"
                className="mx-6 py-4 rounded-2xl bg-primary text-primary-foreground text-center font-black shadow-lg shadow-primary/20"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
