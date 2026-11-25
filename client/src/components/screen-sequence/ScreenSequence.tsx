import { useEffect, useState } from "react";
import "./screen-sequence.css";

/**
 * ScreenSequence: a short flow of desktop screens shown as a thumbnail.
 *
 * Rest: the first screen. While `active`, it dissolves to each next screen in
 * turn and holds on the last. When `active` ends, it dissolves straight back
 * to the first screen. The frame matches the KOSIGN thumbnail (radius and
 * shadow scaled to the frame's width), and its shape comes from the first
 * screen's own proportions.
 */

export interface ScreenSequenceProps {
  active: boolean;
  reducedMotion?: boolean;
  /** image URLs in flow order; the first is the resting screen */
  screens: string[];
  /** ms after hover starts before the first dissolve (ignores fly-overs) */
  startDelay?: number;
  /** ms between dissolves */
  stepMs?: number;
}

export default function ScreenSequence({
  active,
  reducedMotion = false,
  screens,
  startDelay = 400,
  stepMs = 800,
}: ScreenSequenceProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      return undefined;
    }
    const timers = screens
      .slice(1)
      .map((_, i) => window.setTimeout(() => setIndex(i + 1), startDelay + i * stepMs));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, screens, startDelay, stepMs]);

  return (
    <div className={`ss ${reducedMotion ? "ss--reduced" : ""}`} aria-hidden="true">
      <div className="ss-frame">
        {screens.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="ss-layer"
            // each later screen fades in over the ones below it, so going back
            // to 0 fades the upper layers out together: one dissolve to screen 1
            style={{ opacity: i === 0 || i <= index ? 1 : 0, zIndex: i }}
          />
        ))}
      </div>
    </div>
  );
}
