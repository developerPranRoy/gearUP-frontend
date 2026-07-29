export default function GearDetailsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="mt-6 h-40 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
