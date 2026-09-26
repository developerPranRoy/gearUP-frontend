"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-8" />;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex size-8 items-center justify-center rounded-full transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.60)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.90)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.60)";
      }}
    >
      <Sun  className={`absolute size-4 transition-all duration-300 ${isDark  ? "opacity-0 scale-50 rotate-90"  : "opacity-100 scale-100 rotate-0"}`} />
      <Moon className={`absolute size-4 transition-all duration-300 ${!isDark ? "opacity-0 scale-50 -rotate-90" : "opacity-100 scale-100 rotate-0"}`} />
    </button>
  );
}
