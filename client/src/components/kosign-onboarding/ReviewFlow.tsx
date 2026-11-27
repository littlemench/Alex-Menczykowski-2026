import { useState } from "react";
import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import { AppPage, Crop, Press, SCREEN, px, useOnceInView } from "./parts";

/**
 * ReviewFlow: reviewing Spotify suggestions in KOSIGN, on one phone.
 *
 *   Home (1.1) -> the Spotify suggestions card opens the review flow, which
 *   rises from the bottom (2.1) -> two co-writers approved (ticks become Add
 *   split, 2.2) -> the third co-writer's trash is pressed (row turns red,
 *   2.3), the button rotates and wobbles, and is pressed again: the row is
 *   removed and everything below closes up (2.4) -> both splits added (2.5)
 *   -> Submit & proceed -> song 2 of 10 (2.6) -> "all 10 done": Submitting?
 *   Please remember (3.1) -> Submit -> 10 songs submitted (3.2), rings
 *   ripple out from the check once. Plays once each time it scrolls into view.
 *
 * Exports are 780 x 1688 (2x); everything here is in 1x px of a 390-wide
 * screen, converted to pt by px().
 */

const DIR = "/kosign/review";
const img = (k: string) => `${DIR}/${k}.webp`;

const STEPS = [
  "rest", "cardPress", "sheetUp", "tick1Press", "tick1", "tick2Press", "tick2",
  "trashPress", "trashArmed", "wobble", "trashPress2", "rowOut", "closeUp", "skip",
  "split1Press", "split1", "split2Press", "split2", "submitPress", "song2", "remember",
  "rememberPress", "submitted", "rings",
] as const;
type Step = (typeof STEPS)[number];
const at = (s: Step) => STEPS.indexOf(s);

const TIMELINE: [Step, number][] = [
  ["cardPress", 700], ["sheetUp", 950], ["tick1Press", 1800], ["tick1", 2000],
  ["tick2Press", 2550], ["tick2", 2750], ["trashPress", 3400], ["trashArmed", 3600],
  ["wobble", 4000], ["trashPress2", 4900], ["rowOut", 5100], ["closeUp", 5300],
  ["skip", 5900], ["split1Press", 6400], ["split1", 6600], ["split2Press", 7150],
  ["split2", 7350], ["submitPress", 8100], ["song2", 8350], ["remember", 9300],
  ["rememberPress", 10400], ["submitted", 10650], ["rings", 10900],
];

// rows of the co-writer list, 1x px
const ROW1: [number, number] = [411, 463];
const ROW2: [number, number] = [475, 527];
const ROW3: [number, number] = [539, 591];
const CLOSE_UP = ROW3[1] - ROW3[0] + 12; // the row plus the gap below it

// rings measured from 3.2: radius and white opacity (as Portal's submitted)
const RINGS: [number, number][] = [[44.75, 0.3], [54.5, 0.19], [64.5, 0.1], [75, 0.07]];
const RING_STAGGER_MS = 105;

function ReviewPhone({ n, instant }: { n: number; instant: boolean }) {
  const from = (s: Step) => n >= at(s);
  const is = (s: Step) => n === at(s);
  const show = (s: Step) => ({ opacity: from(s) ? 1 : 0 });
  const row = (src: string, [y0, y1]: [number, number], on: Step) => (
    <Crop src={src} box={[0, y0, 390, y1]} style={{ ...show(on), transition: "opacity 230ms ease" }} />
  );
  const ringsOn = from("rings");

  return (
    <PhoneFrame screenAspect={SCREEN}>
      <div className={`ko-screen ${instant ? "ko-instant" : ""}`}>
        {/* 1.1 Home */}
        <AppPage src={img("s1-1")} bg="#fff" style={{ zIndex: 1, filter: from("sheetUp") ? "brightness(0.85)" : "none" }}>
          <Press box={[13.5, 216, 376.5, 303]} radius={4} on={is("cardPress")} />
        </AppPage>

        {/* Review: rises from the bottom */}
        <div className="ko-page ko-sheet" style={{ zIndex: 2, transform: from("sheetUp") ? "translateY(0)" : "translateY(100%)" }}>
          <AppPage src={img("s2-1")} style={{ zIndex: 1, ...(from("song2") ? { transform: "translateX(-30%)", filter: "brightness(0.92)" } : {}) }}>
            {/* approve two co-writers: ticks become Add split */}
            <Press box={[252, 417, 292, 457]} on={is("tick1Press")} />
            {row(img("s2-2"), ROW1, "tick1")}
            <Press box={[252, 481, 292, 521]} on={is("tick2Press")} />
            {row(img("s2-2"), ROW2, "tick2")}

            {/* remove the third: card behind the row, for when it goes */}
            <img
              className="ko-strip"
              src={img("card-strip")}
              alt=""
              draggable={false}
              style={{ top: px(ROW3[0]), height: px(844 - ROW3[0]), ...show("trashArmed") }}
            />
            <Press box={[300, 545, 340, 585]} on={is("trashPress")} />
            <span
              className="ko-row-red"
              style={{
                top: px(ROW3[0]),
                height: px(ROW3[1] - ROW3[0]),
                opacity: from("trashArmed") && !from("rowOut") ? 1 : 0,
                transform: from("rowOut") ? "scale(0.96)" : "none",
              }}
            >
              <img src={img("row3-red")} alt="" draggable={false} />
              <img
                className={`ko-trash ${from("wobble") && !from("trashPress2") ? "ko-trash--wobble" : ""} ${is("trashPress2") ? "ko-trash--press" : ""}`}
                src={img("trash-red")}
                alt=""
                draggable={false}
                style={{ left: px(299), top: px(544 - ROW3[0]), width: px(42), height: px(42) }}
              />
            </span>
            {/* everything below the removed row closes up (from 2.4) */}
            <Crop
              src={img("s2-4")}
              box={[0, ROW2[1], 390, 844]}
              style={{
                top: px(ROW2[1] + CLOSE_UP),
                transform: from("closeUp") ? `translateY(${px(-CLOSE_UP)})` : "none",
                ...show("rowOut"),
                transition: "transform 380ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            />
            {/* 2.4 settled: Skip remaining suggestions fades in */}
            <img className="ko-over" src={img("s2-4")} alt="" draggable={false} style={show("skip")} />

            {/* splits added; Submit & proceed lights up */}
            <Press box={[236, 418.5, 340, 455.5]} on={is("split1Press")} />
            {row(img("s2-5"), ROW1, "split1")}
            <Press box={[236, 482.5, 340, 519.5]} on={is("split2Press")} />
            <img className="ko-over" src={img("s2-5")} alt="" draggable={false} style={show("split2")} />
            <Press box={[40, 675, 350, 715]} on={is("submitPress")} />
          </AppPage>

          {/* 2.6: the next song */}
          <AppPage src={img("s2-6")} style={{ zIndex: 2, transform: from("song2") ? "translateX(0)" : "translateX(100%)" }} />
        </div>

        {/* 3.1 Submitting? Please remember */}
        <div className="ko-page ko-sheet" style={{ zIndex: 3, transform: from("remember") ? "translateY(0)" : "translateY(100%)" }}>
          <AppPage src={img("s3-1")} bg="#001e57" style={{}}>
            <Press box={[28, 719, 364, 759]} on={is("rememberPress")} />
          </AppPage>
        </div>

        {/* 3.2 Submitted, rings ripple from the check */}
        <AppPage src={img("s3-2")} bg="#0059ff" style={{ zIndex: 4, ...show("submitted") }}>
          <svg className="ko-rings" viewBox="0 0 390 844" preserveAspectRatio="none">
            {RINGS.map(([r, o], i) => (
              <circle
                key={r}
                className={`ko-ring ${ringsOn ? "ko-ring--on" : ""}`}
                cx={194.75}
                cy={194.75}
                r={r}
                style={{
                  transformOrigin: "194.75px 194.75px",
                  opacity: ringsOn ? o : 0,
                  transitionDelay: ringsOn ? `${i * RING_STAGGER_MS}ms` : "0ms",
                }}
              />
            ))}
          </svg>
        </AppPage>

        <span className={`ko-home ${from("remember") ? "ko-home--light" : ""}`} />
      </div>
    </PhoneFrame>
  );
}

/** Reviewing Spotify suggestions through to submission. */
export default function ReviewOnboarding() {
  const [n, setN] = useState(0);
  const { ref, instant, reduced } = useOnceInView(
    () => TIMELINE.map(([s, ms]) => window.setTimeout(() => setN(at(s)), ms + 400)),
    () => setN(0)
  );
  return (
    <div
      ref={ref}
      className={`ko ${reduced ? "ko--reduced" : ""}`}
      role="img"
      aria-label="Reviewing Spotify song suggestions in KOSIGN: approving co-writers, removing one, adding splits, then submitting ten songs"
      data-step={STEPS[n]}
    >
      <div className="ko-col">
        <ReviewPhone n={n} instant={instant} />
      </div>
    </div>
  );
}
