import Link from "next/link";
import type { Category } from "@/data/mock";

interface CategoryBadgeProps {
  category: Category;
  showCount?: boolean;
  noLink?: boolean;
}

const CategoryBadge = ({ category, showCount, noLink }: CategoryBadgeProps) => {
  const badgeClasses = "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium";
  const content = (
    <>
      {category.name}
      {showCount && (
        <span className="text-muted-foreground">({category.postCount})</span>
      )}
    </>
  );

  if (noLink) {
    return <span className={badgeClasses}>{content}</span>;
  }

  return (
    <Link href={`/category/${category.slug}`} className={badgeClasses}>
      {content}
    </Link>
  );
};

export default CategoryBadge;
