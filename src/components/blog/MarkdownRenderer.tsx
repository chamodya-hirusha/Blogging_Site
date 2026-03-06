import { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
}

// Simple markdown to HTML converter (safe — no dangerouslySetInnerHTML with user scripts)
function markdownToHtml(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // H3 before H2
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h2 id="${id}">${text}</h2>`;
    })
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered list items
    .replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Paragraphs — wrap lines that aren't already wrapped
    .replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, '<p>$1</p>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  return html;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const html = useMemo(() => markdownToHtml(content), [content]);

  return (
    <div
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
