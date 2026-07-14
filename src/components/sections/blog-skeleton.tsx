// Streaming fallback for <BlogSection>. Mirrors the real layout so there is no
// visual jump when the Medium feed resolves.
export default function BlogSkeleton() {
  return (
    <section
      className="py-28 bg-bg-surface border-t border-bg-border"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="h-3 w-32 rounded bg-bg-muted mb-4 animate-pulse" />
          <div className="h-10 w-full max-w-md rounded bg-bg-muted mb-4 animate-pulse" />
          <div className="h-4 w-full max-w-lg rounded bg-bg-muted animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-bg-surface border border-bg-border rounded-[6px] overflow-hidden"
            >
              <div className="w-full aspect-[16/9] bg-bg-muted animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-24 rounded bg-bg-muted animate-pulse" />
                <div className="h-5 w-full rounded bg-bg-muted animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-bg-muted animate-pulse" />
                <div className="h-16 w-full rounded bg-bg-muted animate-pulse mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
