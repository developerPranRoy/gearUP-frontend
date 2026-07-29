export default function GearLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 h-9 w-48 animate-pulse rounded bg-muted" />
      <div className="mb-6 h-10 w-full animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border">
            <div className="aspect-[4/3] animate-pulse bg-muted" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
