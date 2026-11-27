import type { CSSProperties, ReactNode } from "react";
import PhoneFrame from "@/components/phone-frame/PhoneFrame";
import { BANNERS, Banner, GmailPage, SCREEN, W, pt, type Email } from "./parts";

/**
 * ArtistPhone: the artist's side of setup, from the acceptance email to
 * "Submit songs and start earning".
 *
 *   Email -> Activate now opens the app -> email typed -> Get code -> code sent
 *   -> Gmail banner -> activation code email -> Enter code opens the app ->
 *   code entered -> password typed twice -> authenticator app chosen -> copy
 *   code -> security code typed -> authenticating -> Stripe consent and camera
 *   access overlays -> document scan -> review -> photo verification -> image
 *   analysis -> verifying -> review and sign -> terms -> processing -> submit
 *   songs, with rings rippling from the + button.
 *
 * App screens are 390px-wide exports; px are converted to pt (x 402/390).
 */

const DIR = "/kosign/setup";
const K = W / 390;
const px = (n: number) => pt(n * K);
const SCREEN_PX = 874 / K; // screen height in export px

export const ARTIST_STEPS = [
  "rest", "e0Scroll", "e0Press", "s10Open", "s10Focus", "s10Type", "s10Press", "s12",
  "notif", "notifPress", "e13Open", "e13Scroll", "e13Press", "s14Open", "s14Press",
  "s15", "s15Type1", "s15Type2", "s15Press", "s21", "s22", "s22Press", "s23", "s23Press",
  "s24", "s24Type", "s24Press", "s26", "m31", "m31Press", "m32", "m32Press", "s33",
  "s33Press", "s34", "s34Press", "s35", "s35Press", "s36", "s37", "s40", "s40Scroll",
  "s40Press", "s41", "s41Scroll", "s41Press", "s42", "s50", "rings",
] as const;
export type ArtistStep = (typeof ARTIST_STEPS)[number];
const at = (s: ArtistStep) => ARTIST_STEPS.indexOf(s);

export const ARTIST_TIMELINE: [ArtistStep, number][] = [
  ["e0Scroll", 900], ["e0Press", 2200], ["s10Open", 2500], ["s10Focus", 3300],
  ["s10Type", 3500], ["s10Press", 5000], ["s12", 5300], ["notif", 6300],
  ["notifPress", 7700], ["e13Open", 7900], ["e13Scroll", 8700], ["e13Press", 10000],
  ["s14Open", 10300], ["s14Press", 11300], ["s15", 11600], ["s15Type1", 12300],
  ["s15Type2", 13100], ["s15Press", 13900], ["s21", 14200], ["s22", 15000],
  ["s22Press", 15800], ["s23", 16100], ["s23Press", 16900], ["s24", 17200],
  ["s24Type", 17800], ["s24Press", 18600], ["s26", 18900], ["m31", 20000],
  ["m31Press", 21500], ["m32", 21800], ["m32Press", 22900], ["s33", 23200],
  ["s33Press", 24200], ["s34", 24500], ["s34Press", 25500], ["s35", 25800],
  ["s35Press", 26800], ["s36", 27100], ["s37", 28800], ["s40", 30000],
  ["s40Scroll", 30800], ["s40Press", 31800], ["s41", 32100], ["s41Scroll", 32900],
  ["s41Press", 33900], ["s42", 34200], ["s50", 35400], ["rings", 35900],
];

// ---------------------------------------------------------------- typing
// Each field is a window onto the filled export, widened one glyph at a
// time; px in the 390-wide export. edges: right edge after each keystroke.
interface Field {
  src: string; // filled export
  notext: string; // filled export with the text removed (focused field)
  box: [number, number, number, number];
  text: [number, number, number, number];
  edges: number[];
}
const F_EMAIL: Field = {
  src: `${DIR}/s1-1.webp`, notext: `${DIR}/s1-1-notext.webp`,
  box: [27, 350, 364, 402], text: [44, 366, 194, 386],
  edges: [52, 60, 63, 73, 84, 102, 118, 128, 138, 142, 152, 157, 166, 176, 192],
};
const F_PW1: Field = {
  src: `${DIR}/s1-6.webp`, notext: `${DIR}/s1-6-notext.webp`,
  box: [27, 333, 364, 385], text: [44, 353, 121, 366], edges: [51, 61, 70, 80, 90, 99, 109, 119],
};
const F_PW2: Field = { ...F_PW1, box: [27, 651, 364, 703], text: [44, 671, 121, 684] };
const F_CODE: Field = {
  src: `${DIR}/s2-5.webp`, notext: `${DIR}/s2-5-notext.webp`,
  box: [26, 333, 364, 385], text: [43, 353, 110, 366], edges: [50, 60, 69, 79, 89, 98, 108],
};
export const TYPE_MS = 56;
/** typing runs: field key, step it starts on, number of glyphs */
export const TYPING: [string, ArtistStep, number][] = [
  ["email", "s10Type", F_EMAIL.edges.length],
  ["pw1", "s15Type1", F_PW1.edges.length],
  ["pw2", "s15Type2", F_PW2.edges.length],
  ["code", "s24Type", F_CODE.edges.length],
];

/** a crop of an export, placed where it sits on the screen */
function Crop({ src, box, imgH = 844, style }: { src: string; box: number[]; imgH?: number; style?: CSSProperties }) {
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

function Typing({ f, focused, chars, caret }: { f: Field; focused: boolean; chars: number; caret: boolean }) {
  const [tx0, ty0, , ty1] = f.text;
  const right = chars === 0 ? tx0 : f.edges[chars - 1] + 1;
  const [, by0, , by1] = f.box;
  return (
    <>
      <Crop src={f.notext} box={f.box} style={{ opacity: focused ? 1 : 0, transition: "opacity 150ms ease" }} />
      {chars > 0 && <Crop src={f.src} box={[tx0, ty0, right, ty1]} />}
      {caret && (
        <span
          className="ko-caret"
          style={{ left: px(right + 1.5), top: px(by0 + 15), height: px(by1 - by0 - 30) }}
        />
      )}
    </>
  );
}

function Press({ box, on }: { box: number[]; on: boolean }) {
  const [x0, y0, x1, y1] = box;
  return (
    <span
      className={`ko-press ${on ? "ko-press--on" : ""}`}
      style={{ left: px(x0), top: px(y0), width: px(x1 - x0), height: px(y1 - y0) }}
    />
  );
}

function AppPage({
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

// ------------------------------------------------------------------ emails
const EMAIL_0: Email = {
  src: `${DIR}/email-0.webp`, subject: "You've been accepted to KOSIGN", time: "2:31 PM", height: 1899,
  button: [221, 971, 378, 1011],
};
const EMAIL_13: Email = {
  src: `${DIR}/email-1-3.webp`, subject: "Your activation code", time: "2:32 PM", height: 1904,
  button: [231, 973, 369, 1005],
};

// rings measured from Setup-5.0: radius (px) and white opacity
const RINGS: [number, number][] = [[44.5, 0.3], [54.5, 0.19], [64.5, 0.1], [74.5, 0.07]];
const RING_STAGGER_MS = 105;

export function ArtistPhone({ m, typed, instant }: { m: number; typed: Record<string, number>; instant: boolean }) {
  const from = (s: ArtistStep) => m >= at(s);
  const is = (s: ArtistStep) => m === at(s);
  const before = (s: ArtistStep) => m < at(s);

  // page entry: each new page enters over the last
  const slid = (s: ArtistStep) => ({ transform: from(s) ? "translateX(0)" : "translateX(100%)" });
  const faded = (s: ArtistStep) => ({ opacity: from(s) ? 1 : 0 });
  const zoomed = (s: ArtistStep) => ({ opacity: from(s) ? 1 : 0, transform: from(s) ? "scale(1)" : "scale(0.94)" });
  // opened from a button: grows out of the button's centre
  const opened = (s: ArtistStep, cx: number, cy: number) => ({
    opacity: from(s) ? 1 : 0,
    transform: from(s) ? "scale(1)" : "scale(0.12)",
    transformOrigin: `${(cx / W) * 100}% ${(cy / 874) * 100}%`,
    borderRadius: from(s) ? 0 : pt(40),
  });
  // a page pushed aside when the next one slides in
  const SLIDES: ArtistStep[] = ["s15", "s21", "s23", "s24", "s26", "s34", "s35", "s36", "s40", "s41", "s42"];
  const covered = (until: ArtistStep[]) =>
    until.some((s) => from(s)) ? { transform: "translateX(-30%)", filter: "brightness(0.92)" } : {};
  const nextSlides = (after: ArtistStep) => SLIDES.filter((s) => at(s) > at(after));

  const banner = before("notif") ? "hidden" : before("notifPress") ? "shown" : before("e13Open") ? "pressed" : "gone";
  const scrimOn = from("m31") && before("s33");
  const ringsOn = from("rings");

  // where the email buttons sit on screen once scrolled (for the app opening)
  const btnCentre = (e: Email, scroll: number) => {
    const [x0, y0, x1, y1] = e.button!;
    const s = W / 600;
    return [((x0 + x1) / 2) * s, 98 + 112 + ((y0 + y1) / 2) * s - scroll] as const;
  };
  const E0_SCROLL = 300;
  const E13_SCROLL = 330;
  const [a0x, a0y] = btnCentre(EMAIL_0, E0_SCROLL);
  const [a13x, a13y] = btnCentre(EMAIL_13, E13_SCROLL);

  return (
    <PhoneFrame screenAspect={SCREEN}>
      <div className={`ko-screen ${instant ? "ko-instant" : ""}`}>
        {/* Setup-0: acceptance email */}
        <GmailPage
          email={EMAIL_0}
          status
          scroll={from("e0Scroll") ? E0_SCROLL : 0}
          pressed={is("e0Press")}
          style={{ zIndex: 1, filter: from("s10Open") ? "brightness(0.9)" : "none" }}
        />

        {/* 1.0 -> 1.1 typed -> 1.2 code sent */}
        <AppPage src={`${DIR}/s1-0.webp`} style={{ zIndex: 2, ...opened("s10Open", a0x, a0y) }}>
          <Typing f={F_EMAIL} focused={from("s10Focus")} chars={typed.email ?? 0} caret={from("s10Focus") && before("s10Press")} />
          <Press box={[27, 424, 363, 463]} on={is("s10Press")} />
          <img className="ko-over" src={`${DIR}/s1-2.webp`} alt="" draggable={false} style={faded("s12")} />
        </AppPage>

        {/* 1.3: activation code email, opened from the banner */}
        <GmailPage
          email={EMAIL_13}
          status
          scroll={from("e13Scroll") ? E13_SCROLL : 0}
          pressed={is("e13Press")}
          style={{ zIndex: 3, ...zoomed("e13Open"), ...(from("s14Open") ? { filter: "brightness(0.9)" } : {}) }}
        />

        {/* 1.4: code entered */}
        <AppPage src={`${DIR}/s1-4.webp`} style={{ zIndex: 4, ...opened("s14Open", a13x, a13y), ...covered(nextSlides("s14Open")) }}>
          <Press box={[27, 386, 363, 425]} on={is("s14Press")} />
        </AppPage>

        {/* 1.5 -> 1.6: password typed twice */}
        <AppPage src={`${DIR}/s1-5.webp`} style={{ zIndex: 5, ...slid("s15"), ...covered(nextSlides("s15")) }}>
          <Typing f={F_PW1} focused={from("s15Type1")} chars={typed.pw1 ?? 0} caret={from("s15Type1") && before("s15Type2")} />
          <Typing f={F_PW2} focused={from("s15Type2")} chars={typed.pw2 ?? 0} caret={from("s15Type2") && before("s15Press")} />
          <Press box={[27, 741, 363, 780]} on={is("s15Press")} />
        </AppPage>

        {/* 2.1 -> 2.2: authenticator app chosen */}
        <AppPage src={`${DIR}/s2-1.webp`} style={{ zIndex: 6, ...slid("s21"), ...covered(nextSlides("s21")) }}>
          <img className="ko-over" src={`${DIR}/s2-2.webp`} alt="" draggable={false} style={faded("s22")} />
          <Press box={[27, 627, 364, 666]} on={is("s22Press")} />
        </AppPage>

        {/* 2.3: copy code */}
        <AppPage src={`${DIR}/s2-3.webp`} style={{ zIndex: 7, ...slid("s23"), ...covered(nextSlides("s23")) }}>
          <Press box={[25, 370, 364, 409]} on={is("s23Press")} />
        </AppPage>

        {/* 2.4 -> 2.5: security code typed */}
        <AppPage src={`${DIR}/s2-4.webp`} style={{ zIndex: 8, ...slid("s24"), ...covered(nextSlides("s24")) }}>
          <Typing f={F_CODE} focused={from("s24Type")} chars={typed.code ?? 0} caret={from("s24Type") && before("s24Press")} />
          <Press box={[26, 415, 363, 454]} on={is("s24Press")} />
        </AppPage>

        {/* 2.6: authenticating; the identity overlays open over it */}
        <AppPage src={`${DIR}/s2-6.webp`} style={{ zIndex: 9, ...slid("s26") }} />

        {/* 3.3 appears under the overlays as they close */}
        <AppPage src={`${DIR}/s3-3.webp`} style={{ zIndex: 10, ...faded("m32Press"), ...covered(nextSlides("s33")) }}>
          <Press box={[27, 744, 362, 783]} on={is("s33Press")} />
        </AppPage>

        <AppPage src={`${DIR}/s3-4.webp`} style={{ zIndex: 11, ...slid("s34"), ...covered(nextSlides("s34")) }}>
          <Press box={[27, 692, 362, 731]} on={is("s34Press")} />
        </AppPage>

        <AppPage src={`${DIR}/s3-5.webp`} style={{ zIndex: 12, ...slid("s35"), ...covered(nextSlides("s35")) }}>
          <Press box={[27, 744, 362, 783]} on={is("s35Press")} />
        </AppPage>

        {/* 3.6: image analysis, spinner turning */}
        <AppPage src={`${DIR}/s3-6.webp`} style={{ zIndex: 13, ...slid("s36"), ...covered(nextSlides("s36")) }}>
          <Crop src={`${DIR}/spinner.webp`} box={[160, 705, 226, 771]} style={{ animation: "ko-spin 680ms linear infinite" }} />
        </AppPage>

        <AppPage src={`${DIR}/s3-7.webp`} style={{ zIndex: 14, ...faded("s37"), ...covered(nextSlides("s37")) }} />

        {/* 4.0: review and sign (taller than the screen) */}
        <AppPage
          src={`${DIR}/s4-0.webp`}
          h={930}
          scroll={from("s40Scroll") ? 930 - SCREEN_PX : 0}
          style={{ zIndex: 15, ...slid("s40"), ...covered(nextSlides("s40")) }}
        >
          <Press box={[27, 824, 362, 863]} on={is("s40Press")} />
        </AppPage>

        <AppPage
          src={`${DIR}/s4-1.webp`}
          h={893}
          scroll={from("s41Scroll") ? 893 - SCREEN_PX : 0}
          style={{ zIndex: 16, ...slid("s41"), ...covered(nextSlides("s41")) }}
        >
          <Press box={[15, 726, 373, 765]} on={is("s41Press")} />
        </AppPage>

        <AppPage src={`${DIR}/s4-2.webp`} style={{ zIndex: 17, ...slid("s42") }} />

        {/* 5.0: submit songs, rings ripple from the + */}
        <AppPage src={`${DIR}/s5-0.webp`} bg="#001337" style={{ zIndex: 18, ...faded("s50") }}>
          <svg className="ko-rings" viewBox="0 0 390 844" preserveAspectRatio="none">
            {RINGS.map(([r, o], i) => (
              <circle
                key={r}
                className={`ko-ring ${ringsOn ? "ko-ring--on" : ""}`}
                cx={194.5}
                cy={219}
                r={r}
                style={{ opacity: ringsOn ? o : 0, transitionDelay: ringsOn ? `${i * RING_STAGGER_MS}ms` : "0ms" }}
              />
            ))}
          </svg>
        </AppPage>

        {/* identity overlays: Stripe consent, then camera access */}
        <span className="ko-scrim" style={{ opacity: scrimOn ? 1 : 0 }} />
        <span
          className="ko-modal"
          style={{
            left: px(15), top: px(167), width: px(360),
            opacity: from("m31") && before("m32") ? 1 : 0,
            transform: from("m31") && before("m32") ? "none" : from("m32") ? "scale(0.96)" : "translateY(6%) scale(0.96)",
          }}
        >
          <img src={`${DIR}/modal3-1.webp`} alt="" draggable={false} />
          <Press box={[24, 378, 335, 416]} on={is("m31Press")} />
        </span>
        <span
          className="ko-modal"
          style={{
            left: px(15), top: px(308), width: px(360),
            opacity: from("m32") && before("s33") ? 1 : 0,
            transform: from("m32") && before("s33") ? "none" : from("s33") ? "scale(0.96)" : "translateY(6%) scale(0.96)",
          }}
        >
          <img src={`${DIR}/modal3-2.webp`} alt="" draggable={false} />
          <Press box={[24, 147, 335, 186]} on={is("m32Press")} />
        </span>

        <span className={`ko-home ${from("s50") ? "ko-home--light" : ""}`} />

        <Banner
          src={`${BANNERS}/banner-activation.webp`}
          alt="KOSIGN: Activation code. Your activation code to set up your KOSIGN account"
          state={banner}
        />
      </div>
    </PhoneFrame>
  );
}
