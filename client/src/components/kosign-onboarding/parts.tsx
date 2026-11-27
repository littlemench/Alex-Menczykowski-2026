import type { CSSProperties } from "react";

/** Shared pieces for the KOSIGN onboarding phones. Sizes are iPhone points
 *  via --pt (1pt = 100cqw / 402), set on .ko-screen. */

export const W = 402; // screen width, pt
export const SCREEN = 804 / 1748;
export const EMAIL_SCALE = W / 600; // email exports are 600px wide
export const HEADER = 112; // Gmail subject + sender rows above the email, pt
export const STATUS_SRC = "/kosign/onboarding/status.webp";

export const pt = (n: number) => `calc(var(--pt) * ${n})`;

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
            <span className="ko-gm-avatar">K</span>
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

// ------------------------------------------------------- notification
export function Banner({ title, body, state }: { title: string; body: string; state: "hidden" | "shown" | "pressed" | "gone" }) {
  return (
    <div className={`ko-banner ko-banner--${state}`}>
      {/* placeholder app icon: swap for the Gmail app icon */}
      <span className="ko-banner-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7" fill="none" stroke="#D93025" strokeWidth={1.9} strokeLinejoin="round" />
        </svg>
      </span>
      <span className="ko-banner-text">
        <span className="ko-banner-top">
          <b>KOSIGN</b>
          <span className="ko-banner-now">now</span>
        </span>
        <span className="ko-banner-subject">{title}</span>
        <span className="ko-banner-body">{body}</span>
      </span>
    </div>
  );
}

