import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Shared pieces for the KOSIGN onboarding phones. Sizes are iPhone points
 *  via --pt (1pt = 100cqw / 402), set on .ko-screen. */

export const W = 402; // screen width, pt
export const SCREEN = 804 / 1748;
export const EMAIL_SCALE = W / 600; // email exports are 600px wide
export const HEADER = 112; // Gmail subject + sender rows above the email, pt
export const STATUS_SRC = "/kosign/onboarding/status.webp";

export const pt = (n: number) => `calc(var(--pt) * ${n})`;
/** app screens are 390px-wide exports: px converts their px to pt */
export const K = W / 390;
export const px = (n: number) => pt(n * K);

// ------------------------------------------------------------------ Gmail
export interface Email {
  src: string;
  subject: string;
  time: string;
  height: number; // export height, px at 600 wide
  /** Share via message button, px in the 600-wide export */
  button?: [number, number, number, number]; // x0, y0, x1, y1
}
export const Icon = ({ d, size = 22 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" style={{ width: pt(size), height: pt(size) }} aria-hidden="true">
    <path d={d} fill="none" stroke="#444746" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ICONS = {
  back: "M15 5l-7 7 7 7",
  archive: "M4 7h16v3H4zM5.5 10v9h13v-9M10 13.5h4",
  trash: "M5 7h14M9.5 7V4.5h5V7M7 7l1 13h8l1-13",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  more: "M12 5.5v.01M12 12v.01M12 18.5v.01",
  reply: "M10 8L5 12.5 10 17M5.5 12.5H15a4 4 0 014 4V18",
};

export function GmailPage({
  email,
  scroll,
  pressed,
  status = false,
  style,
}: {
  email: Email;
  scroll: number; // pt
  pressed: boolean;
  /** draw the status bar inside the page (when the phone has no global one) */
  status?: boolean;
  style: CSSProperties;
}) {
  const s = EMAIL_SCALE;
  return (
    <div className="ko-page" style={style}>
      {status && <img className="ko-status" src={STATUS_SRC} alt="" draggable={false} />}
      <div className="ko-gm-toolbar">
        <Icon d={ICONS.back} size={24} />
        <span className="ko-gm-tools">
          <Icon d={ICONS.archive} />
          <Icon d={ICONS.trash} />
          <Icon d={ICONS.mail} />
          <Icon d={ICONS.more} />
        </span>
      </div>
      <div className="ko-gm-viewport">
        <div className="ko-gm-scroll" style={{ transform: `translateY(${pt(-scroll)})` }}>
          <div className="ko-gm-subject">
            <span>{email.subject}</span>
            <span className="ko-gm-chip">Inbox</span>
          </div>
          <div className="ko-gm-sender">
            <img className="ko-gm-avatar" src="/kosign/onboarding/mark.webp" alt="" draggable={false} />
            <span className="ko-gm-from">
              <span>
                <b>KOSIGN</b> <span className="ko-gm-time">{email.time}</span>
              </span>
              <span className="ko-gm-to">to me ⌄</span>
            </span>
            <span className="ko-gm-tools">
              <Icon d={ICONS.reply} size={20} />
              <Icon d={ICONS.more} size={20} />
            </span>
          </div>
          <img
            src={email.src}
            alt=""
            draggable={false}
            style={{ position: "absolute", top: pt(HEADER), left: 0, width: "100%", height: pt(email.height * s) }}
          />
          {email.button && (
            <span
              className={`ko-press ${pressed ? "ko-press--on" : ""}`}
              style={{
                left: pt(email.button[0] * s),
                top: pt(HEADER + email.button[1] * s),
                width: pt((email.button[2] - email.button[0]) * s),
                height: pt((email.button[3] - email.button[1]) * s),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const BANNERS = "/kosign/onboarding";

/** iOS notification banner: an exported banner image that drops in, is
 *  pressed, then lifts away as its email opens. */
export function Banner({ src, alt, state }: { src: string; alt: string; state: "hidden" | "shown" | "pressed" | "gone" }) {
  return (
    <div className={`ko-banner ko-banner--${state}`}>
      <img src={src} alt={alt} draggable={false} />
    </div>
  );
}

// ------------------------------------------------------------ app screens
/** a crop of an export, placed where it sits on the screen */
export function Crop({ src, box, imgH = 844, style }: { src: string; box: number[]; imgH?: number; style?: CSSProperties }) {
  const [x0, y0, x1, y1] = box;
  const w = x1 - x0;
  const h = y1 - y0;
  return (
    <span className="ko-crop" style={{ left: px(x0), top: px(y0), width: px(w), height: px(h), ...style }}>
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ left: px(-x0), top: px(-y0), width: px(390), height: px(imgH) }}
      />
    </span>
  );
}

export function Press({ box, on, radius }: { box: number[]; on: boolean; radius?: number }) {
  const [x0, y0, x1, y1] = box;
  return (
    <span
      className={`ko-press ${on ? "ko-press--on" : ""}`}
      style={{ left: px(x0), top: px(y0), width: px(x1 - x0), height: px(y1 - y0), ...(radius !== undefined ? { borderRadius: px(radius) } : {}) }}
    />
  );
}

export function AppPage({
  src, h = 844, scroll = 0, bg = "#ececec", style, children,
}: {
  src: string; h?: number; scroll?: number; bg?: string; style: CSSProperties; children?: ReactNode;
}) {
  return (
    <div className="ko-page" style={{ background: bg, ...style }}>
      <div className="ko-app-scroll" style={{ transform: `translateY(${px(-scroll)})` }}>
        <img src={src} alt="" draggable={false} style={{ display: "block", width: "100%", height: px(h) }} />
        {children}
      </div>
    </div>
  );
}


// ------------------------------------------------------------------ player
/**
 * Plays a phone's timeline once each time it scrolls into view (60%), and
 * resets to the start, without animating, once it's fully out of view.
 * schedule() starts one run and returns its timers.
 */
export function useOnceInView(schedule: () => number[], reset: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [instant, setInstant] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = ref.current;
    if (!el || mq.matches) return undefined;
    let armed = true;
    let timers: number[] = [];
    const clear = () => timers.forEach((t) => window.clearTimeout(t));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.6 && armed) {
            armed = false;
            clear();
            setInstant(false);
            timers = schedule();
          } else if (e.intersectionRatio === 0) {
            armed = true;
            clear();
            setInstant(true);
            reset();
          }
        }),
      { threshold: [0, 0.6] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
    // schedule/reset only call state setters, which are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, instant, reduced };
}
