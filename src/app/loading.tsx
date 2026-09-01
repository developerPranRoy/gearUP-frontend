export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-trail/20 border-t-trail" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-slate">Loading…</p>
      </div>
    </div>
  );
}
