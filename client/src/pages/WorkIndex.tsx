import Layout from "@/components/Layout";
import AnimatedThumbnail from "@/components/animated-thumbnail/AnimatedThumbnail";
import KosignSplash from "@/components/kosign-splash/KosignSplash";
import PortalScreens from "@/components/portal-screens/PortalScreens";
import ScreenSequence from "@/components/screen-sequence/ScreenSequence";

const PLATFORM_SCREENS = [
  "/platform/1-period.webp",
  "/platform/2-schedule.webp",
  "/platform/3-block.webp",
];

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="space-y-16">
          {/* KOSIGN: the kosignmusic.com hero; the video plays on hover / while on screen */}
          <div className="content-width">
            <AnimatedThumbnail href="/work/kosign" label="KOSIGN Case Study" touchMode="whileVisible">
              {({ active }) => <KosignSplash active={active} />}
            </AnimatedThumbnail>
          </div>

          {/* Kobalt Client Product */}
          {/* Client Portal: Home at rest; all four screens line up on hover */}
          <div className="content-width">
            <AnimatedThumbnail href="/work/portal" label="Kobalt Client Portal" holdMs={2500}>
              {({ active, reducedMotion }) => (
                <PortalScreens active={active} reducedMotion={reducedMotion} />
              )}
            </AnimatedThumbnail>
          </div>

          {/* Publishing Data Platform: new client agreement, dissolving Period -> Schedule -> Block creation */}
          <div className="content-width">
            <AnimatedThumbnail href="/work/platform" label="Publishing Data Platform" touchMode="whileVisible">
              {({ active, reducedMotion }) => (
                <ScreenSequence active={active} reducedMotion={reducedMotion} screens={PLATFORM_SCREENS} />
              )}
            </AnimatedThumbnail>
          </div>
        </div>

        <div className="content-width space-y-6 mt-24">
          <p>
            I love working across product strategy, design, and delivery. I enjoy going from "zero to one" — structuring the approach and articulating our beliefs — as much as I do refining and crafting for growth based on data.
          </p>
          <p>
            I currently lead a Design department that focuses on collaborating closely across all business units to identify the right problems, increase confidence in opportunities, and understand what's possible before we make it happen.
          </p>
          <p>
            All within the context of how emerging technologies are accelerating workflows, and increasing expectations.
          </p>
        </div>
      </section>
    </Layout>
  );
}
