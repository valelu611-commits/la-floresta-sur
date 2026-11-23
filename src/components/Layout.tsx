import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AgentWidget } from "./AgentWidget";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <AgentWidget />
    </div>
  );
}
