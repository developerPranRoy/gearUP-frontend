"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/gear?searchTerm=${encodeURIComponent(q)}` : "/gear");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-xl overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
      }}
    >
      <div className="relative flex flex-1 items-center">
        <Search
          className="absolute left-4 size-5"
          style={{ color: "rgba(255,255,255,0.45)" }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bikes, tents, cameras…"
          className="w-full bg-transparent py-4 pl-12 pr-3 text-sm outline-none"
          style={{
            color: "rgba(255,255,255,0.92)",
            caretColor: "var(--amber)",
          }}
        />
      </div>
      <button
        type="submit"
        className="shrink-0 m-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
        style={{ background: "var(--amber)", color: "var(--green-dim)" }}
      >
        Search
      </button>
    </form>
  );
}
