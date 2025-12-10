import "./states.css";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
}: ErrorStateProps) {
  return (
    <div className="state state--error">
      <strong className="state__title">{title}</strong>
      <p className="state__text">{message}</p>
    </div>
  );
}
