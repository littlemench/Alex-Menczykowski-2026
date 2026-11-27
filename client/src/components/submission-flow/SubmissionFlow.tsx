import { useEffect, useRef, useState } from "react";
import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./submission-flow.css";

/**
 * SubmissionFlow: a song submission, start to finish, on one phone.
 * Catalog -> + opens the submission as a sheet -> the title is typed (1.1)
 * -> Next -> writers (2.1) -> the "My name" tray rises and settles -> a
 * quick-add co-writer appears (2.3) -> Next -> confirm (3) -> Next ->
 * submitted (4), rings ripple out from the check -> the sheet drops back
 * to Catalog. Plays once each time it scrolls into view.
 */

const DIR = "/portal/submission";
const W = 390;
const H = 844;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

type Step =
  | "rest" | "sheet" | "typed" | "p2" | "trayUp" | "trayDown" | "cowriter"
  | "p3" | "p4" | "rings" | "close";

const TIMELINE: [Step, number][] = [
  ["sheet", 600],
  ["typed", 1300], // typing starts; letters follow every TYPE_MS
  ["p2", 2900],
  ["trayUp", 3700],
  ["trayDown", 4900],
  ["cowriter", 5500],
  ["p3", 6500],
  ["p4", 7600],
  ["rings", 8000],
  ["close", 10200],
  ["rest", 10900],
];
const ORDER = TIMELINE.map(([s]) => s);
const at = (step: Step, from: Step) => ["rest", ...ORDER].indexOf(step) >= ["rest", ...ORDER].indexOf(from);

// "Song Title" in 1.1: right edge of the text after each keystroke (pt)
const TITLE = { x: 38, top: 287, bottom: 310, edges: [51, 61, 71, 81, 84, 96, 100, 106, 110, 120] };
const TYPE_MS = 110;

// rings measured from screen 4: radius (pt) and white opacity
const RINGS: [number, number][] = [[44.1, 0.3], [54.1, 0.19], [64.1, 0.1], [74.1, 0.07]];
const RING_STAGGER_MS = 140;

export default function SubmissionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("rest");
  const [chars, setChars] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = ref.current;
    if (!el || mq.matches) return undefined;
    let armed = true;
    let timers: number[] = [];
    const play = () => {
      timers.forEach((t) => window.clearTimeout(t));
      setStep("rest");
      setChars(0);
      timers = TIMELINE.map(([s, ms]) => window.setTimeout(() => setStep(s), ms + 400));
      const typeStart = TIMELINE.find(([s]) => s === "typed")![1] + 400;
      TITLE.edges.forEach((_, i) =>
        timers.push(window.setTimeout(() => setChars(i + 1), typeStart + i * TYPE_MS))
      );
      timers.push(window.setTimeout(() => setChars(0), TIMELINE[TIMELINE.length - 1][1] + 400));
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.6 && armed) {
            armed = false;
            play();
          } else if (e.intersectionRatio === 0) {
            armed = true;
          }
        }),
      { threshold: [0, 0.6] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const sheetUp = at(step, "sheet") && !at(step, "close");
  const page = at(step, "p4") ? 3 : at(step, "p3") ? 2 : at(step, "p2") ? 1 : 0;
  const trayUp = step === "trayUp";
  const cowriter = at(step, "cowriter");
  const ringsOn = at(step, "rings") && step !== "rest";
  const typingDone = chars >= TITLE.edges.length;
  const revealRight = chars === 0 ? TITLE.x : TITLE.edges[chars - 1] + 1;

  const pageStyle = (i: number) => ({
    transform: i === page ? "translateX(0)" : i < page ? "translateX(-30%)" : "translateX(100%)",
    filter: i < page ? "brightness(0.92)" : "none",
  });

  return (
    <div
      ref={ref}
      className={`sf-wrap ${reduced ? "sf--reduced" : ""}`}
      role="img"
      aria-label="Submitting a song in the Kobalt app: from Catalog, entering the title, adding a co-writer, confirming, and the submitted confirmation"
      data-step={step}
    >
      <PhoneFrame screenAspect={W / H} className="sf-phone">
        <div className="sf-screen">
          {/* Catalog */}
          <div className="sf-layer sf-catalog" style={{ filter: sheetUp ? "brightness(0.9)" : "none" }}>
            <img src={`${DIR}/catalog.webp`} alt="" draggable={false} />
          </div>

          {/* Submission sheet */}
          <div className="sf-layer sf-sheet" style={{ transform: sheetUp ? "translateY(0)" : "translateY(100%)" }}>
            {/* 1.1 Song details */}
            <div className="sf-layer sf-page" style={pageStyle(0)}>
              <img className="sf-img" src={`${DIR}/s1-1-empty.webp`} alt="" draggable={false} />
              <div
                className="sf-type"
                style={{
                  left: pct(TITLE.x, W),
                  top: pct(TITLE.top, H),
                  width: pct(revealRight - TITLE.x, W),
                  height: pct(TITLE.bottom - TITLE.top, H),
                }}
              >
                <img
                  src={`${DIR}/s1-1.webp`}
                  alt=""
                  draggable={false}
                  style={{
                    width: `${(W / Math.max(1, revealRight - TITLE.x)) * 100}%`,
                    left: `${(-TITLE.x / Math.max(1, revealRight - TITLE.x)) * 100}%`,
                    top: `${(-TITLE.top / (TITLE.bottom - TITLE.top)) * 100}%`,
                  }}
                />
              </div>
              {at(step, "typed") && page === 0 && (
                <span
                  className="sf-caret"
                  style={{
                    left: pct(revealRight + 1, W),
                    top: pct(TITLE.top + 2, H),
                    height: pct(TITLE.bottom - TITLE.top - 4, H),
                    animationPlayState: typingDone ? "running" : "paused",
                  }}
                />
              )}
            </div>

            {/* 2.1 / 2.3 Writers & splits, with the tray */}
            <div className="sf-layer sf-page" style={pageStyle(1)}>
              <img className="sf-img" src={`${DIR}/s2-1.webp`} alt="" draggable={false} />
              <img
                className="sf-img sf-abs sf-fade"
                src={`${DIR}/s2-3.webp`}
                alt=""
                draggable={false}
                style={{ opacity: cowriter ? 1 : 0 }}
              />
              <div className="sf-scrim" style={{ opacity: trayUp ? 0.35 : 0 }} />
              <img
                className="sf-tray"
                src={`${DIR}/tray.webp`}
                alt=""
                draggable={false}
                style={{ transform: trayUp ? "translateY(0)" : "translateY(105%)" }}
              />
            </div>

            {/* 3 Confirm and submit */}
            <div className="sf-layer sf-page" style={pageStyle(2)}>
              <img className="sf-img" src={`${DIR}/s3.webp`} alt="" draggable={false} />
            </div>

            {/* 4 Song submitted */}
            <div className="sf-layer sf-page" style={pageStyle(3)}>
              <img className="sf-img" src={`${DIR}/s4-no-rings.webp`} alt="" draggable={false} />
              <svg className="sf-rings" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                {RINGS.map(([r, o], i) => (
                  <circle
                    key={r}
                    className={`sf-ring ${ringsOn ? "sf-ring--on" : ""}`}
                    cx={195}
                    cy={253.7}
                    r={r}
                    style={{
                      opacity: ringsOn ? o : 0,
                      transitionDelay: ringsOn ? `${i * RING_STAGGER_MS}ms` : "0ms",
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
