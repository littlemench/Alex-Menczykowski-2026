import { useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PeelSticker from "@/components/peel-sticker/PeelSticker";

export default function WorkIndex() {
  const kobalt25Ref = useRef<HTMLAnchorElement>(null);

  return (
    <Layout>
      <section className="layout-grid">
        <div className="space-y-16">
          {/* KOSIGN */}
          <div className="content-width">
            <Link href="/work/kosign" className="block group">
              <img src="/Preview-KOSIGN.png" alt="KOSIGN Case Study" className="w-full h-auto rounded-[2px]" />
            </Link>
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

          {/* Kobalt25: live peeling sticker; hovering anywhere on the card peels it */}
          <div className="content-width">
            <Link href="/play/kobalt25" ref={kobalt25Ref} className="block group" aria-label="Kobalt25">
              <div className="aspect-[16/9] w-full rounded-[2px] bg-[#F7F6F6] flex items-center justify-center">
                <PeelSticker
                  src="/kobalt25/sticker-25-years.png"
                  dieCutSrc="/kobalt25/sticker-25-years-diecut.png"
                  alt="Kobalt 25 years sticker"
                  hoverTargetRef={kobalt25Ref}
                  style={{ width: "40%" }}
                />
              </div>
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
