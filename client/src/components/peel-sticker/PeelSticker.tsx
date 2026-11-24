import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import {
  createPeelSticker,
  type PeelStickerInstance,
  type PeelStickerOptions,
} from "./peel-sticker-core";

type Tunables = Partial<
  Pick<
    PeelStickerOptions,
    | "angle"
    | "peel"
    | "radius"
    | "backColor"
    | "shadow"
    | "filmShadow"
    | "trigger"
    | "holdMs"
    | "replay"
  >
>;

export interface PeelStickerProps extends Tunables {
  /** printed artwork PNG */
  src: string;
  /** die-cut outline PNG: everything inside it is clear vinyl */
  dieCutSrc?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** element whose hover / focus drives the peel, e.g. a wrapping card link */
  hoverTargetRef?: RefObject<HTMLElement | null>;
  /**
   * Controlled mode: when defined, the parent decides when the corner is peeled
   * (e.g. <AnimatedThumbnail>) and the sticker's own hover/scroll triggers are off.
   */
  active?: boolean;
}

/**
 * A clear-vinyl die-cut sticker whose top-right corner peels back.
 *
 * Desktop (fine pointer + hover): peels while hovered or focused, settles on leave.
 * Touch: peels when ~60% scrolled into view, holds, then settles; replays on
 *   re-entry and on tap.
 * prefers-reduced-motion: no scroll animation; hover snaps without easing.
 * No WebGL: falls back to the plain PNG.
 *
 * Shadows render ~7% outside the element's box, so avoid overflow: hidden
 * tight around it.
 */
export default function PeelSticker({
  src,
  dieCutSrc,
  alt = "",
  className,
  style,
  hoverTargetRef,
  active,
  ...tunables
}: PeelStickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inst = useRef<PeelStickerInstance | null>(null);
  const controlled = active !== undefined;
  const key = JSON.stringify(tunables);

  useEffect(() => {
    if (!ref.current) return undefined;
    const opts: Partial<PeelStickerOptions> = {
      src,
      dieCutSrc: dieCutSrc ?? "",
      alt,
      hoverTarget: hoverTargetRef?.current ?? null,
    };
    if (controlled) opts.trigger = "manual";
    (Object.keys(tunables) as (keyof Tunables)[]).forEach((k) => {
      if (tunables[k] !== undefined) (opts as Record<string, unknown>)[k] = tunables[k];
    });
    const created = createPeelSticker(ref.current, opts);
    inst.current = created;
    return () => {
      created.destroy();
      inst.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, dieCutSrc, alt, hoverTargetRef, controlled, key]);

  useEffect(() => {
    if (controlled) inst.current?.setPeeled(Boolean(active));
  }, [controlled, active]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className={className}
      style={{ position: "relative", ...style }}
    />
  );
}
