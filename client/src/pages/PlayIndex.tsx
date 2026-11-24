import { Link } from "wouter";
import Layout from "@/components/Layout";
import AnimatedThumbnail from "@/components/animated-thumbnail/AnimatedThumbnail";
import PeelSticker from "@/components/peel-sticker/PeelSticker";

export default function PlayIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="space-y-16">
          {/* Shots */}
          <div className="content-width">
            <a href="http://shots.photography/" target="_blank" rel="noopener noreferrer" className="block group">
              <img src="/Preview-Shots.png" alt="Shots" className="w-full h-auto rounded-[2px]" />
            </a>
          </div>

          {/* Kobalt25: peeling clear-vinyl sticker */}
          <div className="content-width">
            <AnimatedThumbnail href="/play/kobalt25" label="Kobalt25">
              {({ active }) => (
                <PeelSticker
                  src="/kobalt25/sticker-25-years.png"
                  dieCutSrc="/kobalt25/sticker-25-years-diecut.png"
                  alt="Kobalt 25 years sticker"
                  active={active}
                  style={{ width: "62%" }}
                />
              )}
            </AnimatedThumbnail>
          </div>

          {/* List Jockey */}
          <div className="content-width">
            <Link href="/play/listjockey" className="block group">
              <img src="/Preview-LJ.png" alt="List Jockey" className="w-full h-auto rounded-[2px]" />
            </Link>
          </div>

          {/* AI Caddy */}
          <div className="content-width opacity-60">
            <div className="cursor-not-allowed">
              <img src="/Preview-AICaddy.png" alt="AI Caddy" className="w-full h-auto rounded-[2px]" />
            </div>
          </div>

          {/* Beeline */}
          <div className="content-width opacity-60">
            <div className="cursor-not-allowed">
              <img src="/Preview-Beeline.png" alt="Beeline" className="w-full h-auto rounded-[2px]" />
            </div>
          </div>
        </div>

        <div className="content-width space-y-6 mt-24">
          <p>
            A place to store the work and projects on the periphery. Examples of where i've explored new technologies, side hustles, and ideas across the Design spectrum.
          </p>
        </div>
      </section>
    </Layout>
  );
}
