import { getMediumPosts, MEDIUM_PROFILE_URL } from "@/lib/medium";
import BlogList from "./blog-list";

function SectionHeader() {
  return (
    <div className="max-w-3xl mb-16">
      <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
        INSIGHTS & UPDATES
      </p>
      <h2 id="blog-heading" className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary uppercase tracking-tight mb-4">
        From the Cybokrafts Journal
      </h2>
      <p className="font-sans text-text-secondary text-[16px] leading-relaxed">
        Field notes, engineering deep-dives, and perspectives on the future of
        intelligent energy infrastructure — published on Medium.
      </p>
    </div>
  );
}

/** Graceful fallback when the feed is unreachable — page never breaks. */
function FeedUnavailable() {
  return (
    <div className="bg-bg-surface border border-bg-border rounded-[6px] p-10 text-center flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      </div>
      <p className="font-sans text-text-secondary text-sm max-w-md">
        Our latest articles are published on Medium. Head over to read the newest
        stories from the Cybokrafts team.
      </p>
      <a
        href={MEDIUM_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-accent-blue text-white font-sans font-semibold text-sm tracking-[0.04em] hover:bg-accent-blue-hover transition-colors duration-200"
      >
        Visit our Medium
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>
  );
}

export default async function BlogSection() {
  const posts = await getMediumPosts(6);

  return (
    <section
      id="blog"
      className="py-28 bg-bg-surface border-t border-bg-border"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader />
        {posts.length > 0 ? (
          <BlogList posts={posts} profileUrl={MEDIUM_PROFILE_URL} />
        ) : (
          <FeedUnavailable />
        )}
      </div>
    </section>
  );
}
