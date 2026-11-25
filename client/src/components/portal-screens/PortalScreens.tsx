import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./portal-screens.css";

/**
 * PortalScreens: Client Portal thumbnail.
 *
 * Rest: the Home screen alone, centred, with the other three hidden
 * directly behind it. Active: the four slide sideways, without scaling, into
 * an overlapping row. Home moves to the first slot and the others slide out
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

// Row geometry, as fractions of the square. Phones are 34% wide at all
// times (no scaling), so four overlap like a fanned hand: Home on top and
// each later screen tucked behind the one before. The row spans 4%-96%,
// with centres at 21%, 40.3%, 59.7% and 79%. translateX is in phone
// widths: (centre - 0.5) / 0.34, plus the -50% that centres the phone.
const ROW_X = [-135.3, -78.4, -21.6, 35.3]; // %
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
        // purely lateral: same size at rest and in the row
        const transform = active ? `translate(${ROW_X[i]}%, -50%)` : "translate(-50%, -50%)";
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
