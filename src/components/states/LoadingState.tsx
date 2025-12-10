import "./states.css";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="state state--loading">
      <div className="state__spinner" />
      <p className="state__text">{message}</p>
    </div>
  );
}
