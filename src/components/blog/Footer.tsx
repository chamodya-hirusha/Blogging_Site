"use client";

import Link from "next/link";
import { siteSettings } from "@/data/mock";

const Footer = () => (
  <footer className="bg-white border-t border-border/50 pt-24 pb-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              {siteSettings.logoText.charAt(0)}
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">{siteSettings.logoText}</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
            {siteSettings.tagline}. Making knowledge accessible for the next generation of creators and learners.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                title={platform}
              >
                <span className="text-[10px] font-bold uppercase">{platform.charAt(0)}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4">
            {[
              { href: "/", label: "Homepage" },
              { href: "/blog", label: "Latext Articles" },
              { href: "/category/technology", label: "Tech Trends" },
              { href: "/about", label: "Our Mission" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest">Community</h4>
          <ul className="space-y-4 text-sm">
            {["Technology", "Study Tips", "Career", "Productivity"].map((c) => (
              <li key={c}>
                <Link
                  href={`/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4 font-medium">Get the latest stories sent to your inbox.</p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-transparent focus:border-primary/30 focus:outline-none text-sm font-medium transition-all"
            />
            <button className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-all shadow-lg active:scale-95">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
          {siteSettings.footerText}
        </p>
        <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Use</a>
          <a href="#" className="hover:text-foreground">Support</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
