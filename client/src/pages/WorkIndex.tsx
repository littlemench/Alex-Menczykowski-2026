import { Link } from "wouter";
import Layout from "@/components/Layout";
import AnimatedThumbnail from "@/components/animated-thumbnail/AnimatedThumbnail";
import KosignSplash from "@/components/kosign-splash/KosignSplash";

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

          {/* Publishing Data Platform */}
          <div className="content-width">
            <Link href="/work/platform" className="block group">
              <img src="/Preview-Platform.png" alt="Publishing Data Platform" className="w-full h-auto rounded-[2px]" />
            </Link>
          </div>

          {/* Kobalt Client Product */}
          <div className="content-width">
            <Link href="/work/portal" className="block group">
              <img src="/Preview-Portal.png" alt="Kobalt Client Portal" className="w-full h-auto rounded-[2px]" />
            </Link>
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
