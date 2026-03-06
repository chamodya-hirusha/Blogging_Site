"use client";

import { useMemo } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = useMemo<TOCItem[]>(() => {
    const matches = content.match(/^#{2,3}\s+.+$/gm);
    if (!matches) return [];
    return matches.map((match) => {
      const level = match.startsWith("### ") ? 3 : 2;
      const text = match.replace(/^#{2,3}\s+/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { id, text, level };
    });
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="border border-border rounded-lg p-5 bg-card">
      <h4 className="text-sm font-semibold text-foreground mb-3">Table of Contents</h4>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted-foreground hover:text-primary leading-relaxed"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
