import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        GearUp — Rent Sports &amp; Outdoor Gear Instantly
      </footer>
    </div>
  );
}
