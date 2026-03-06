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
    <header className="border-b border-border bg-card">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-primary">{siteSettings.logoText}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${pathname === link.href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 text-sm font-medium border-b border-border ${pathname === link.href
                ? "text-primary bg-accent"
                : "text-muted-foreground"
                }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
