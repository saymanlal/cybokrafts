// Medium RSS integration — fetches and parses the Cybokrafts publication feed.
// Server-only: called from async Server Components. No external XML dependency —
// a lightweight, defensive parser handles Medium's stable RSS shape.

import { cache } from "react";

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;        // ISO string
  dateLabel: string;      // e.g. "Jul 12, 2026"
  categories: string[];
  author: string;
  image: string | null;
  excerpt: string;
  readingTime: number;    // minutes
}

const FEED_URL = "https://medium.com/feed/@cybokrafts";
const PROFILE_URL = "https://medium.com/@cybokrafts";

/** Strip a single CDATA wrapper if present, else return trimmed raw. */
function unwrapCdata(raw: string): string {
  const match = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (match ? match[1] : raw).trim();
}

/** Grab the inner text of the first <tag>…</tag> inside a block. */
function pick(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? unwrapCdata(m[1]) : "";
}

/** Decode the handful of HTML entities Medium emits in plain text. */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…");
}

/** Turn an HTML fragment into a clean, single-paragraph excerpt. */
function toExcerpt(html: string, maxLen = 180): string {
  const text = decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
}

/** First real content image (skips Medium's 1×1 tracking pixel). */
function firstImage(html: string): string | null {
  const imgRe = /<img[^>]+src="([^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = imgRe.exec(html)) !== null) {
    const src = m[1];
    if (src.includes("/_/stat") || src.includes("stat?event")) continue;
    return src.replace(/&amp;/g, "&");
  }
  return null;
}

function estimateReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function parseFeed(xml: string): MediumPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items.map((block) => {
    const title = decodeEntities(pick(block, "title"));
    const link = pick(block, "link").replace(/&amp;/g, "&").trim();
    const rawDate = pick(block, "pubDate");
    const iso = new Date(rawDate).toISOString();
    const author = decodeEntities(pick(block, "dc:creator")) || "Cybokrafts";

    const categories = (block.match(/<category>([\s\S]*?)<\/category>/gi) ?? [])
      .map((c) => decodeEntities(unwrapCdata(c.replace(/<\/?category>/gi, ""))))
      .filter(Boolean)
      .slice(0, 3);

    const content = pick(block, "content:encoded");

    return {
      title,
      link,
      pubDate: iso,
      dateLabel: formatDate(iso),
      categories,
      author,
      image: firstImage(content),
      excerpt: toExcerpt(content),
      readingTime: estimateReadingTime(content),
    } satisfies MediumPost;
  });
}

/**
 * Fetch the latest Medium posts. Cached per-request via React.cache and
 * revalidated hourly (ISR). Never throws — returns [] on any failure so the
 * page always renders.
 */
export const getMediumPosts = cache(async (limit = 6): Promise<MediumPost[]> => {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        // Medium serves the feed reliably to a normal UA.
        "User-Agent":
          "Mozilla/5.0 (compatible; CybokraftsBot/1.0; +https://cybokrafts.vercel.app)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      // Revalidate hourly — new posts appear without a redeploy.
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    return parseFeed(xml)
      .filter((p) => p.title && p.link)
      .slice(0, limit);
  } catch {
    return [];
  }
});

export const MEDIUM_PROFILE_URL = PROFILE_URL;
