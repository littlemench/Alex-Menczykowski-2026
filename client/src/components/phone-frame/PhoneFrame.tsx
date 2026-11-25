import type { CSSProperties, ReactNode } from "react";
import "./phone-frame.css";

/**
 * PhoneFrame — reusable device for mobile screens across the portfolio.
 *
 *   <PhoneFrame src="/portal/home.png" alt="Portal home" style={{ width: 240 }} />
 *
 * Size it with width (any CSS length); everything else scales with it.
 * Screens fill the display edge to edge, top included (no Dynamic Island,
 * no cropped status bar). Pass `children` instead of `src` for live content.
 */
export interface PhoneFrameProps {
  src?: string;
  alt?: string;
  /** screen width / height; defaults to a 393 x 852 pt iPhone display */
  screenAspect?: number;
  /**
   * false removes the device's own drop shadow. Use it when several devices
   * overlap, and shadow their shared parent with filter: drop-shadow instead.
   */
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function PhoneFrame({
  src,
  alt = "",
  screenAspect = 393 / 852,
  shadow = true,
  className = "",
  style,
  children,
}: PhoneFrameProps) {
  return (
    <div className={`pf ${shadow ? "" : "pf--no-shadow"} ${className}`} style={style}>
      <div className="pf-body">
        <span className="pf-btn pf-btn--action" />
        <span className="pf-btn pf-btn--vol-up" />
        <span className="pf-btn pf-btn--vol-down" />
        <span className="pf-btn pf-btn--power" />
        <div className="pf-screen" style={{ aspectRatio: String(screenAspect) }}>
          {src ? <img src={src} alt={alt} draggable={false} /> : children}
        </div>
      </div>
    </div>
  );
}
