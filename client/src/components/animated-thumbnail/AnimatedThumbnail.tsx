import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";

/**
 * AnimatedThumbnail — the shared shell for every project thumbnail.
 *
 * Owns everything that is the same for all thumbnails:
 *   - square, white, 2px radius, content centred
 *   - links through to the project (internal route, external URL, or none)
 *   - decides WHEN the animation is active:
 *       desktop (fine pointer + hover): while the card is hovered or focused
 *       touch: when the card is >= 60% in view, for `holdMs`, then off again;
 *              replays each time it re-enters the viewport
 *   - honours prefers-reduced-motion (no auto-play on scroll)
 *
 * Each project's animation is a child that only has to animate between
 * `active === false` (rest state, which must work as a still thumbnail) and
 * `active === true`.
 *
 *   <AnimatedThumbnail href="/play/kobalt25" label="Kobalt25">
 *     {({ active }) => <MyAnimation active={active} />}
 *   </AnimatedThumbnail>
 */

export interface ThumbnailState {
  /** play the animation (true) or return to rest (false) */
  active: boolean;
  /** user prefers reduced motion: jump between states, don't tween */
  reducedMotion: boolean;
}

export interface AnimatedThumbnailProps {
  /** internal route (e.g. "/play/kobalt25") or absolute URL for external projects */
  href?: string;
  /** accessible name for the card */
  label: string;
  /** greyed out, not clickable, never animates (projects not yet live) */
  disabled?: boolean;
  /**
   * touch behaviour: "peek" plays for `holdMs` each time the card scrolls into
   * view; "whileVisible" stays active for as long as the card is on screen
   * (better for looping video)
   */
  touchMode?: "peek" | "whileVisible";
  /** touch "peek": how long the animation stays active after scrolling into view */
  holdMs?: number;
  /** touch: fraction of the card that must be visible to trigger */
  threshold?: number;
  className?: string;
  children: (state: ThumbnailState) => ReactNode;
}

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export default function AnimatedThumbnail({
  href,
  label,
  disabled = false,
  touchMode = "peek",
  holdMs = 1400,
  threshold = 0.6,
  className = "",
  children,
}: AnimatedThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const canHover = useMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");

  // touch: play when the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || canHover || disabled || reducedMotion) return undefined;
    let armed = true;
    let hold = 0;
    let delay = 0;
    const exit = touchMode === "whileVisible" ? 0.25 : 0;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= threshold && armed) {
            armed = false;
            delay = window.setTimeout(() => {
              setActive(true);
              if (touchMode === "peek") {
                hold = window.setTimeout(() => setActive(false), holdMs);
              }
            }, 150);
          } else if (e.intersectionRatio <= exit) {
            armed = true;
            window.clearTimeout(delay);
            if (touchMode === "whileVisible") setActive(false);
          }
        }),
      { threshold: [0, exit, threshold] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(hold);
      window.clearTimeout(delay);
    };
  }, [canHover, disabled, reducedMotion, touchMode, holdMs, threshold]);

  const hoverHandlers =
    canHover && !disabled
      ? {
          onPointerEnter: () => setActive(true),
          onPointerLeave: () => setActive(false),
          onFocus: () => setActive(true),
          onBlur: () => setActive(false),
        }
      : {};

  const face = (
    <div
      ref={ref}
      className="aspect-square w-full rounded-[2px] bg-white flex items-center justify-center"
    >
      {children({ active: disabled ? false : active, reducedMotion })}
    </div>
  );

  const cardClass = `block group ${className}`;

  if (disabled || !href) {
    return (
      <div
        className={`${cardClass} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        aria-label={label}
        role="img"
      >
        {face}
      </div>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={label}
        {...hoverHandlers}
      >
        {face}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClass} aria-label={label} {...hoverHandlers}>
      {face}
    </Link>
  );
}
