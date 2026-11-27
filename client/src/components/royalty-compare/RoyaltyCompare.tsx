import { useEffect, useRef, useState } from "react";
import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import "./royalty-compare.css";

/**
 * RoyaltyCompare: D2C and B2B royalty views side by side, playing the same
 * flow on one shared clock, so only the UI differs:
 *   overview -> tap Insights -> insights pushes in -> scroll a third of the
 *   way down while the bars grow left to right -> scroll back up -> tap back
 *   -> overview.
 * Plays once each time it scrolls into view; rests on the overview.
 */

const DIR = "/portal/royalties";
const SCREEN = 390 / 844;

// Bar rows found by diffing each Insights export against its bars-hidden
// twin: [top, bottom, left, right] in px of the 390px-wide export.
type Row = [number, number, number, number];

interface Variant {
  key: string;
  label: string;
  overview: string;
  insights: string;
  insightsEmpty: string;
  height: number; // insights export height, px at 390 wide
  bars: Row[][]; // grouped by chart
}

const b2bRows = (y: number): Row[] => [
  [y, y + 24, 15, 306],
  [y + 33, y + 57, 12, 214],
  [y + 66, y + 90, 12, 194],
  [y + 99, y + 123, 12, 91],
  [y + 133, y + 157, 12, 148],
];

const VARIANTS: Variant[] = [
  {
    key: "d2c",
    label: "D2C",
    overview: `${DIR}/d2c-overview.webp`,
    insights: `${DIR}/d2c-insights.webp`,
    insightsEmpty: `${DIR}/d2c-insights-empty.webp`,
    height: 2815,
    bars: [
      [[424, 448, 15, 153], [458, 483, 12, 136], [493, 518, 12, 103], [528, 553, 12, 89]],
      [[972, 996, 15, 153], [1006, 1031, 12, 136], [1041, 1066, 12, 103], [1076, 1101, 12, 89]],
      b2bRows(1576),
      b2bRows(2206),
    ],
  },
  {
    key: "b2b",
    label: "B2B",
    overview: `${DIR}/b2b-overview.webp`,
    insights: `${DIR}/b2b-insights.webp`,
    insightsEmpty: `${DIR}/b2b-insights-empty.webp`,
    height: 3612,
    bars: [b2bRows(1090), b2bRows(1717), b2bRows(2347), b2bRows(2977)],
  },
];

// Tap targets, as % of the screen (the same spot in both designs)
const TAP_INSIGHTS = { left: "72%", top: "34%" };
const TAP_BACK = { left: "9.7%", top: "9.6%" };

type Step = "rest" | "tapIns" | "pushed" | "down" | "up" | "tapBack" | "popped";
// when each step begins, ms after play starts
const TIMELINE: [Step, number][] = [
  ["tapIns", 600],
  ["pushed", 900],
  ["down", 1700],
  ["up", 4800],
  ["tapBack", 6100],
  ["popped", 6400],
  ["rest", 7000],
];
const SCROLL_DOWN_MS = 1400;
const SCROLL_UP_MS = 1100;
const BAR_START_MS = 700; // after the scroll down starts
const BAR_STAGGER_MS = 60;

function Phone({ v, step }: { v: Variant; step: Step }) {
  const inInsights = step === "pushed" || step === "down" || step === "up" || step === "tapBack";
  const grown = step === "down" || step === "up" || step === "tapBack" || step === "popped";
  const scrolled = step === "down";
  return (
    <PhoneFrame screenAspect={SCREEN}>
      <div className="rc-screen">
        <div
          className="rc-page rc-overview"
          style={{
            transform: inInsights ? "translateX(-30%)" : "translateX(0)",
            filter: inInsights ? "brightness(0.92)" : "none",
          }}
        >
          <img src={v.overview} alt="" draggable={false} />
        </div>

        <div className="rc-page rc-insights" style={{ transform: inInsights ? "translateX(0)" : "translateX(100%)" }}>
          <div
            className="rc-scroll"
            style={{
              transform: scrolled ? "translateY(-33.333%)" : "translateY(0)",
              transition: `transform ${scrolled ? SCROLL_DOWN_MS : SCROLL_UP_MS}ms cubic-bezier(0.45, 0, 0.25, 1)`,
            }}
          >
            <img src={v.insightsEmpty} alt="" draggable={false} />
            {v.bars.flatMap((chart, c) =>
              chart.map(([y0, y1, x0, x1], r) => {
                const bw = x1 - x0 + 1;
                const bh = y1 - y0 + 1;
                return (
                  <div
                    key={`${c}-${r}`}
                    className={`rc-bar ${grown ? "rc-bar--grown" : ""}`}
                    style={{
                      left: `${(x0 / 390) * 100}%`,
                      top: `${(y0 / v.height) * 100}%`,
                      width: `${(bw / 390) * 100}%`,
                      height: `${(bh / v.height) * 100}%`,
                      transitionDelay: grown && step === "down" ? `${BAR_START_MS + r * BAR_STAGGER_MS}ms` : "0ms",
                    }}
                  >
                    <img
                      src={v.insights}
                      alt=""
                      draggable={false}
                      style={{
                        width: `${(390 / bw) * 100}%`,
                        left: `${(-x0 / bw) * 100}%`,
                        top: `${(-y0 / bh) * 100}%`,
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <img className="rc-status" src={`${DIR}/status-bar.webp`} alt="" draggable={false} />
        <img className="rc-nav" src={`${DIR}/nav-bar.webp`} alt="" draggable={false} />

        {step === "tapIns" && <span className="rc-tap" style={TAP_INSIGHTS} />}
        {step === "tapBack" && <span className="rc-tap" style={TAP_BACK} />}
      </div>
    </PhoneFrame>
  );
}

export default function RoyaltyCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("rest");
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
      timers = TIMELINE.map(([s, at]) => window.setTimeout(() => setStep(s), at + 400));
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

  return (
    <div
      ref={ref}
      className={`rc ${reduced ? "rc--reduced" : ""}`}
      role="img"
      aria-label="The same royalty flow in the D2C and B2B apps: from the balance overview to Insights, scrolling through the earnings charts, and back"
      data-step={step}
    >
      {VARIANTS.map((v) => (
        <div key={v.key} className="rc-col">
          <Phone v={v} step={step} />
          <p className="rc-caption">{v.label}</p>
        </div>
      ))}
    </div>
  );
}
