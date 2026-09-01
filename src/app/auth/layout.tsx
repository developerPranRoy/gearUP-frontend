import { Navbar } from "@/components/layout/navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-8">
        {children}
      </main>
    </div>
  );
}
