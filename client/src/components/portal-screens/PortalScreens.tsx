import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./portal-screens.css";

/**
 * PortalScreens: Client Portal thumbnail.
 *
 * Rest: the Home screen alone, centred, with the other three hidden
 * directly behind it. Active: all four shrink to half size and line up
 * left to right. Home moves to the first slot and the others slide out
 * from behind it, staggered so each appears to come from behind the one
 * before. On the way back they return in reverse order.
 */

const SCREENS = [
  { src: "/portal/home.webp", name: "Home" },
  { src: "/portal/balance.webp", name: "Balance" },
  { src: "/portal/catalog.webp", name: "Catalog" },
  { src: "/portal/sync.webp", name: "Sync" },
];

const SCREEN_ASPECT = 390 / 844;

// Row geometry, as fractions of the square: phones are 40% wide at rest and
// 20% (scale 0.5) in the row, with 4% outer margins and 4% gaps. Their
// centres sit at 14%, 38%, 62% and 86%. translateX is in phone widths:
// (centre - 0.5) / 0.4, plus the -50% that centres the phone.
const ROW_SCALE = 0.5;
const ROW_X = [-140, -80, -20, 40]; // %
const STAGGER_MS = 45;

export interface PortalScreensProps {
  active: boolean;
  reducedMotion?: boolean;
}

export default function PortalScreens({ active, reducedMotion = false }: PortalScreensProps) {
  const last = SCREENS.length - 1;
  return (
    <div className={`ps ${reducedMotion ? "ps--reduced" : ""}`} aria-hidden="true">
      {SCREENS.map((s, i) => {
        const transform = active
          ? `translate(${ROW_X[i]}%, -50%) scale(${ROW_SCALE})`
          : // tucked fully behind Home, a touch smaller so no edge peeks out
            `translate(-50%, -50%) scale(${i === 0 ? 1 : 0.97})`;
        // out: left to right; back: right to left
        const delay = (active ? i : last - i) * STAGGER_MS;
        return (
          <PhoneFrame
            key={s.name}
            src={s.src}
            alt=""
            screenAspect={SCREEN_ASPECT}
            className="ps-phone"
            style={{ transform, transitionDelay: `${delay}ms`, zIndex: SCREENS.length - i }}
          />
        );
      })}
    </div>
  );
}
