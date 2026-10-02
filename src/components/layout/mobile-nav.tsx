"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, LayoutGrid, Info, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/",              label: "Home",         icon: Home },
  { href: "/gear",          label: "Browse Gear",  icon: LayoutGrid },
  { href: "/#how-it-works", label: "How It Works", icon: Info },
];

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex md:hidden size-9 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.10]"
        style={{ color: "var(--surface-dark-muted)" }}
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col"
            style={{
              background: "var(--surface-dark)",
              borderRight: "1px solid var(--surface-dark-border)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--surface-dark-border)" }}>
              <span className="font-display text-lg font-bold" style={{ color: "var(--surface-dark-text)" }}>
                Gear<span style={{ color: "var(--amber)" }}>Up</span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg hover:bg-white/[0.08]"
                style={{ color: "var(--surface-dark-muted)" }}
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/[0.08]"
                  style={{ color: "var(--surface-dark-muted)" }}
                >
                  <span
                    className="flex size-8 items-center justify-center rounded-lg"
                    style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.20)" }}
                  >
                    <Icon className="size-4" style={{ color: "var(--green)" }} />
                  </span>
                  <span className="text-white/80">{label}</span>
                </Link>
              ))}
            </nav>

            <div style={{ borderTop: "1px solid var(--surface-dark-border)" }} className="mt-auto p-4 flex flex-col gap-2">
              {!isLoggedIn && (
                <>
                  <Button asChild variant="outline" className="w-full justify-start gap-2 border-white/10 bg-white/05 text-white/70 hover:bg-white/10 hover:text-white">
                    <Link href="/auth/login" onClick={() => setOpen(false)}>
                      <LogIn className="size-4" /> Log in
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full font-semibold"
                    style={{ background: "var(--amber)", color: "var(--green-dim)" }}
                  >
                    <Link href="/auth/register" onClick={() => setOpen(false)}>
                      <UserPlus className="size-4" /> Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
