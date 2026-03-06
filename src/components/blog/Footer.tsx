import { Link } from "react-router-dom";
import { siteSettings } from "@/data/mock";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-16">
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-foreground mb-2">{siteSettings.logoText}</h3>
          <p className="text-sm text-muted-foreground">{siteSettings.tagline}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">Quick Links</h4>
          <ul className="space-y-1.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/blog", label: "Blog" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">Categories</h4>
          <ul className="space-y-1.5 text-sm">
            {["Technology", "Study Tips", "Career", "Productivity"].map((c) => (
              <li key={c}>
                <Link
                  to={`/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        {siteSettings.footerText}
      </div>
    </div>
  </footer>
);

export default Footer;
