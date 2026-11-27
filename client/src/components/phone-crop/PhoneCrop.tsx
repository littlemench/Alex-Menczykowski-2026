import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./phone-crop.css";

/**
 * PhoneCrop: only the bottom of a large phone shows, rising out of the page,
 * with the top fading into the page colour. Use it for bottom-of-screen
 * details such as tab bars, sheets and buttons.
 *
 *   <PhoneCrop src="/portal/submit-tabbar.webp" alt="..." />
 *
 * `src` is pinned to the bottom of the screen at full screen width (export it
 * at the screen's width, e.g. 780px for a 390pt screen at 2x). White fills
 * the screen above it.
 */
export interface PhoneCropProps {
  src: string;
  alt: string;
  /** show the iOS home-indicator bar (default true) */
  homeBar?: boolean;
  /** screen width / height; defaults to a 390 x 844 pt iPhone display */
  screenAspect?: number;
  className?: string;
}

export default function PhoneCrop({
  src,
  alt,
  homeBar = true,
  screenAspect = 390 / 844,
  className = "",
}: PhoneCropProps) {
  return (
    <div className={`pc ${className}`} role="img" aria-label={alt}>
      <PhoneFrame className="pc-phone" screenAspect={screenAspect}>
        <div className="pc-screen">
          <img src={src} alt="" draggable={false} />
          {homeBar && <span className="pc-home-bar" />}
        </div>
      </PhoneFrame>
    </div>
  );
}
