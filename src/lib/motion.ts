// Shared Framer Motion animation constants and variants
// Used across all page sections for consistent Blueprint-theme animations

/** Viewport settings — animate once when 80px into view */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
export const VIEWPORT_CLOSE = { once: true, margin: "-40px" } as const;

/** Stagger container — staggers children with 80ms gap */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Fade + slide up — primary entry animation */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/** Fade in only — subtle entrance */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/** Slide in from left */
export const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/** Slide in from right */
export const slideRight = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/** Scale in — for icon or badge reveals */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/** Fast fade-up for grid cells — tight stagger */
export const cellFadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: "easeOut" as const },
  },
};
