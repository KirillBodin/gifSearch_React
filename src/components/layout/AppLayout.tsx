import type { ReactNode } from "react";
import "./AppLayout.css";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <header className="app-layout__header">
        <h1 className="app-layout__title">GIF Search</h1>
      </header>

      <main className="app-layout__content">{children}</main>
    </div>
  );
}
