import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./kosign-onboarding.css";

/**
 * KosignOnboarding: two phones on one clock, in the style of the Portal
 * RoyaltyCompare. Left: the manager's side of client setup.
 *
 *   "Accepted" email (Gmail) -> scrolls down to the four setup steps -> back
 *   up to Client link share -> Share via message -> Messages opens, the setup
 *   link sends, the artist replies -> Gmail notification -> "Client setup
 *   incomplete" email -> Share via message -> the chase text sends -> Gmail
 *   notification -> "Start submitting songs" email, where it rests.
 *
 * Right: screens to follow (the column is kept so the layout is final).
 * Plays once each time it scrolls into view; resets when fully out of view.
 *
 * Units: everything on screen is positioned in iPhone points (402 x 874),
 * converted with --pt (1pt = 100cqw / 402), so it scales with the phone.
 */

const DIR = "/kosign/onboarding";
const W = 402; // screen width, pt
const SCREEN = 804 / 1748;
const SMS_W = 804; // Messages exports, px (2x)
const SMS_H = 1748;
const EMAIL_SCALE = W / 600; // email exports are 600px wide
const HEADER = 112; // Gmail subject + sender rows above the email, pt

const STEPS = [
  "rest", //          0  Accepted email, top
  "aSteps", //        1  scroll to the four steps
  "aShare", //        2  back up to Client link share
  "aPress", //        3  Share via message pressed
  "sms1Open", //      4  Messages slides in
  "sms1Sent", //      5  setup link sends
  "sms1Reply", //     6  artist replies
  "notif1", //        7  Gmail banner drops in
  "notif1Press", //   8
  "cOpen", //         9  Client setup incomplete email
  "cShare", //       10  scroll to Client link share
  "cPress", //       11
  "sms2Open", //     12  Messages slides in
  "sms2Sent", //     13  chase text sends
  "notif2", //       14
  "notif2Press", //  15
  "eOpen", //        16  Start submitting songs; rests here
] as const;
type Step = (typeof STEPS)[number];
const at = (s: Step) => STEPS.indexOf(s);

// when each step begins, ms after play starts
const TIMELINE: [Step, number][] = [
  ["aSteps", 900],
  ["aShare", 3200],
  ["aPress", 4600],
  ["sms1Open", 4950],
  ["sms1Sent", 5800],
  ["sms1Reply", 7000],
  ["notif1", 8000],
  ["notif1Press", 9500],
  ["cOpen", 9700],
  ["cShare", 10800],
  ["cPress", 12200],
  ["sms2Open", 12550],
  ["sms2Sent", 13400],
  ["notif2", 14800],
  ["notif2Press", 16300],
  ["eOpen", 16500],
];

const pt = (n: number) => `calc(var(--pt) * ${n})`;

// ------------------------------------------------------------------ Gmail
interface Email {
  src: string;
  subject: string;
  time: string;
  height: number; // export height, px at 600 wide
  /** Share via message button, px in the 600-wide export */
  button?: [number, number, number, number]; // x0, y0, x1, y1
}
const EMAIL_A: Email = {
  src: `${DIR}/email-accepted.webp`,
  subject: "Welcome to KOSIGN",
  time: "2:12 PM",
  height: 2538,
  button: [306, 1090, 526, 1130],
};
const EMAIL_C: Email = {
  src: `${DIR}/email-incomplete.webp`,
  subject: "Client setup incomplete",
  time: "2:14 PM",
  height: 2106,
  button: [306, 878, 526, 918],
};
const EMAIL_E: Email = {
  src: `${DIR}/email-start.webp`,
  subject: "Start submitting songs",
  time: "2:15 PM",
  height: 1511,
};

const Icon = ({ d, size = 22 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" style={{ width: pt(size), height: pt(size) }} aria-hidden="true">
    <path d={d} fill="none" stroke="#444746" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICONS = {
  back: "M15 5l-7 7 7 7",
  archive: "M4 7h16v3H4zM5.5 10v9h13v-9M10 13.5h4",
  trash: "M5 7h14M9.5 7V4.5h5V7M7 7l1 13h8l1-13",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  more: "M12 5.5v.01M12 12v.01M12 18.5v.01",
  reply: "M10 8L5 12.5 10 17M5.5 12.5H15a4 4 0 014 4V18",
};

function GmailPage({
  email,
  scroll,
  pressed,
  style,
}: {
  email: Email;
  scroll: number; // pt
  pressed: boolean;
  style: CSSProperties;
}) {
  const s = EMAIL_SCALE;
  return (
    <div className="ko-page" style={style}>
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

// --------------------------------------------------------------- Messages
type Crop = [number, number, number, number]; // x0, y0, x1, y1 px in the 804 x 1748 export
const SMS = {
  ts1: [0, 300, 804, 340] as Crop,
  bubble1: [170, 346, 804, 864] as Crop,
  reply: [26, 870, 652, 988] as Crop,
  ts2: [0, 1000, 804, 1040] as Crop,
  bubble2: [170, 1046, 804, 1404] as Crop,
};

function Layer({ name, crop, className = "", style }: { name: string; crop: Crop; className?: string; style?: CSSProperties }) {
  const [x0, y0, x1, y1] = crop;
  return (
    <img
      src={`${DIR}/${name}.webp`}
      alt=""
      draggable={false}
      className={`ko-layer ${className}`}
      style={{
        left: `${(x0 / SMS_W) * 100}%`,
        top: `${(y0 / SMS_H) * 100}%`,
        width: `${((x1 - x0) / SMS_W) * 100}%`,
        ...style,
      }}
    />
  );
}

function MessagesPage({
  sent,
  replied,
  chased,
  second,
  style,
}: {
  sent: boolean; // setup link bubble
  replied: boolean; // artist's reply
  chased: boolean; // chase bubble
  second: boolean; // second visit: first exchange already there
  style: CSSProperties;
}) {
  const vis = (on: boolean) => (on ? "ko-in" : "");
  return (
    <div className="ko-page ko-sms" style={style}>
      <img src={`${DIR}/sms-base.webp`} alt="" draggable={false} className="ko-sms-base" />
      <Layer name="ts1" crop={SMS.ts1} className={`ko-fade ${vis(second || sent)}`} />
      <Layer name="bubble1" crop={SMS.bubble1} className={`ko-send ${vis(second || sent)}`} />
      <Layer name="reply" crop={SMS.reply} className={`ko-pop ${vis(second || replied)}`} />
      {second && (
        <>
          <Layer name="ts2" crop={SMS.ts2} className={`ko-fade ${vis(chased)}`} />
          <Layer name="bubble2" crop={SMS.bubble2} className={`ko-send ${vis(chased)}`} />
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------- notification
function Banner({ title, body, state }: { title: string; body: string; state: "hidden" | "shown" | "pressed" | "gone" }) {
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

function ManagerPhone({ n, instant }: { n: number; instant: boolean }) {
  const from = (s: Step) => n >= at(s);
  // pages stack in order; each new one enters over the last
  const covered = (s: Step) => ({ transform: from(s) ? "translateX(-30%)" : "translateX(0)", filter: from(s) ? "brightness(0.92)" : "none" });
  const slideIn = (s: Step) => ({ transform: from(s) ? "translateX(0)" : "translateX(100%)" });
  const zoomIn = (s: Step) => ({ opacity: from(s) ? 1 : 0, transform: from(s) ? "scale(1)" : "scale(0.94)" });
  const banner = (show: Step, press: Step, open: Step) =>
    n < at(show) ? "hidden" : n < at(press) ? "shown" : n < at(open) ? "pressed" : "gone";

  const aScroll = n === at("aSteps") ? 704 : n >= at("aShare") ? 358 : 0;
  const cScroll = n >= at("cShare") ? 196 : 0;

  return (
    <PhoneFrame screenAspect={SCREEN}>
      <div className={`ko-screen ${instant ? "ko-instant" : ""}`} data-scroll-a={aScroll}>
        <GmailPage email={EMAIL_A} scroll={aScroll} pressed={n === at("aPress")} style={{ zIndex: 1, ...covered("sms1Open") }} />
        <MessagesPage
          sent={from("sms1Sent")}
          replied={from("sms1Reply")}
          chased={false}
          second={false}
          style={{ zIndex: 2, ...slideIn("sms1Open") }}
        />
        <GmailPage
          email={EMAIL_C}
          scroll={cScroll}
          pressed={n === at("cPress")}
          style={{ zIndex: 3, ...zoomIn("cOpen"), ...(from("sms2Open") ? covered("sms2Open") : {}) }}
        />
        <MessagesPage sent replied chased={from("sms2Sent")} second style={{ zIndex: 4, ...slideIn("sms2Open") }} />
        <GmailPage email={EMAIL_E} scroll={0} pressed={false} style={{ zIndex: 5, ...zoomIn("eOpen") }} />

        <img className="ko-status" src={`${DIR}/status.webp`} alt="" draggable={false} />
        <span className="ko-home" />

        <Banner
          title="Client setup incomplete"
          body="Your artist has begun setting up their account, but hasn't completed the process."
          state={banner("notif1", "notif1Press", "cOpen")}
        />
        <Banner
          title="Start submitting songs"
          body="Your client's KOSIGN account has been set up, and they're in!"
          state={banner("notif2", "notif2Press", "eOpen")}
        />
      </div>
    </PhoneFrame>
  );
}

function Col({ children }: { children?: ReactNode }) {
  return <div className="ko-col">{children}</div>;
}

export default function KosignOnboarding() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
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
    const play = () => {
      clear();
      setInstant(false);
      // one clock: every phone's timeline is scheduled from the same start
      timers = TIMELINE.map(([s, ms]) => window.setTimeout(() => setN(at(s)), ms + 400));
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.6 && armed) {
            armed = false;
            play();
          } else if (e.intersectionRatio === 0) {
            // out of view: back to the start without animating
            armed = true;
            clear();
            setInstant(true);
            setN(0);
          }
        }),
      { threshold: [0, 0.6] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`ko ${reduced ? "ko--reduced" : ""}`}
      role="img"
      aria-label="A manager's phone: the KOSIGN acceptance email, sharing the client's setup link by text, a reminder email when setup is incomplete, a second text, and the email confirming they can start submitting songs"
      data-step={STEPS[n]}
    >
      <Col>
        <ManagerPhone n={n} instant={instant} />
      </Col>
      <Col />
    </div>
  );
}
