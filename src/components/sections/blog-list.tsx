"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";
import type { MediumPost } from "@/lib/medium";
import { Pin } from "lucide-react";

// Update this link to pin a specific blog post. If empty or not found, the latest post will be pinned.
const PINNED_POST_LINK = "https://medium.com/@cybokrafts/from-vision-to-reality-aipoweros-successfully-deployed-in-the-field-2ad2acf21005";


const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/** Deterministic fallback thumbnail for posts without a lead image. */
function FallbackThumb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0C1929]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(28,95,209,0.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#1C5FD1"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="relative opacity-80">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    </div>
  );
}

function PostCard({ post, index }: { post: MediumPost; index: number }) {
  return (
    <m.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cellFadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col bg-bg-surface border border-bg-border rounded-[6px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-accent-blue/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 h-full"
    >
      {/* Cover */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg-muted">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <FallbackThumb />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-white/90 backdrop-blur-sm border border-bg-border font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          Medium
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="font-mono text-[8.5px] font-semibold uppercase tracking-wider text-text-muted bg-bg-muted border border-bg-border/60 rounded-full px-2 py-0.5"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-heading font-bold text-[17px] leading-snug text-text-primary tracking-wide group-hover:text-accent-blue transition-colors duration-200 mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-auto pt-4 border-t border-bg-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-wider min-w-0">
            <span className="truncate">{post.dateLabel}</span>
            <span className="text-bg-border-strong">·</span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <IconClock />
              {post.readingTime} min
            </span>
          </div>
          <span className="flex-shrink-0 flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-blue">
            Read
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              <IconArrow />
            </span>
          </span>
        </div>
      </div>
    </m.a>
  );
}

function PinnedPostCard({ post }: { post: MediumPost }) {
  return (
    <m.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cellFadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col md:flex-row w-full max-w-4xl bg-bg-surface border border-bg-border rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-accent-blue/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-[320px]"
    >
      {/* Pin Icon Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 backdrop-blur-sm font-mono text-[9px] font-bold uppercase tracking-wider text-accent-amber shadow-sm">
        <Pin className="w-3 h-3 fill-accent-amber" />
        <span>Pinned</span>
      </div>

      {/* Cover */}
      <div className="relative w-full md:w-[45%] lg:w-[50%] min-h-[220px] md:min-h-full overflow-hidden bg-bg-muted">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <FallbackThumb />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-white/90 backdrop-blur-sm border border-bg-border font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          Medium
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 md:p-8 justify-between">
        <div>
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted bg-bg-muted border border-bg-border/60 rounded-full px-2.5 py-0.5"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[26px] leading-tight text-text-primary tracking-wide group-hover:text-accent-blue transition-colors duration-200 mb-3">
            {post.title}
          </h3>

          <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-6 line-clamp-3 md:line-clamp-4 font-light">
            {post.excerpt}
          </p>
        </div>

        {/* Meta */}
        <div className="pt-5 border-t border-bg-border/60 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 font-mono text-[10px] text-text-muted uppercase tracking-wider min-w-0">
            <span className="truncate">{post.dateLabel}</span>
            <span className="text-bg-border-strong">·</span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <IconClock />
              {post.readingTime} min
            </span>
          </div>
          <span className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-blue animate-pulse">
            Read Article
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              <IconArrow />
            </span>
          </span>
        </div>
      </div>
    </m.a>
  );
}

export default function BlogList({
  posts,
  profileUrl,
}: {
  posts: MediumPost[];
  profileUrl: string;
}) {
  if (posts.length === 0) return null;

  // Find the pinned post. If PINNED_POST_LINK matches a post, pin it. Otherwise, default to the latest post (posts[0]).
  const pinnedIndex = posts.findIndex((p) => p.link === PINNED_POST_LINK);
  const pinnedPost = pinnedIndex !== -1 ? posts[pinnedIndex] : posts[0];

  // Filter out the pinned post from the list of standard posts
  const remainingPosts = posts.filter((p) => p.link !== pinnedPost?.link);
  
  // Show up to 6 standard posts below the pinned post to keep a clean grid
  const displayPosts = remainingPosts.slice(0, 6);

  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="flex flex-col gap-10"
    >
      {/* Centralized Pinned Card */}
      {pinnedPost && (
        <div className="flex justify-center">
          <PinnedPostCard post={pinnedPost} />
        </div>
      )}

      {/* Grid of other posts */}
      {displayPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <PostCard key={post.link} post={post} index={i} />
          ))}
        </div>
      )}

      <m.div variants={fadeUp} className="flex justify-center mt-6">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[4px] bg-accent-blue text-white font-sans font-semibold text-sm tracking-[0.04em] hover:bg-accent-blue-hover transition-colors duration-200 shadow-[0_8px_24px_rgba(28,95,209,0.22)]"
        >
          View all articles on Medium
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            <IconArrow />
          </span>
        </a>
      </m.div>
    </m.div>
  );
}
