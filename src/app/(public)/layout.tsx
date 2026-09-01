import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="glass border-t border-white/60 py-8 text-center text-xs text-slate">
        <p className="font-display text-sm font-medium text-pine">GearUp</p>
        <p className="mt-1">Rent Sports &amp; Outdoor Gear Instantly</p>
      </footer>
    </div>
  );
}
