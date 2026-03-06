import { Link } from "react-router-dom";
import type { Category } from "@/data/mock";

interface CategoryBadgeProps {
  category: Category;
  showCount?: boolean;
}

const CategoryBadge = ({ category, showCount }: CategoryBadgeProps) => (
  <Link
    to={`/category/${category.slug}`}
    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium"
  >
    {category.name}
    {showCount && (
      <span className="text-muted-foreground">({category.postCount})</span>
    )}
  </Link>
);

export default CategoryBadge;
