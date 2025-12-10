import "./states.css";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No GIFs yet",
  description = "Try searching for something fun 🔍",
}: EmptyStateProps) {
  return (
    <div className="state state--empty">
      <p className="state__title">{title}</p>
      <p className="state__text">{description}</p>
    </div>
  );
}
