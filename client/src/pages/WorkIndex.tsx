import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <h1 className="mb-12">Work</h1>
        
        <div className="space-y-6 mb-24">
          <p>
            My work sits across strategy, product, and delivery. I’m usually brought in when problems are ambiguous, systems are complex, or teams need to move faster without creating unnecessary risk.
          </p>
          <p>
            I partner closely with business leaders to frame the right problems, with product managers to shape and prioritise opportunities, and with engineers to ensure what we build is feasible and can ship without delay.
          </p>
          <p>
            And i’m relentlessly exploring new tools and methods to accelerate and augment what we do as designers using the capabilities brought by AI assistants, LLM’s and vibe-coding platforms.
          </p>
        </div>

        <div className="space-y-32">
          {/* KOSIGN */}
          <div className="space-y-4">
            <span className="text-sm text-muted-foreground">March 2025</span>
            <Link href="/work/kosign">
              <a className="block group">
                <h2 className="text-lg underline decoration-border underline-offset-4 group-hover:decoration-foreground mb-6">KOSIGN — Launching a self-serve publishing platform</h2>
                <div className="border border-border p-2">
                  <ImagePlaceholder label="KOSIGN Case Study" aspectRatio="video" />
                </div>
              </a>
            </Link>
          </div>

          {/* Others */}
          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-4 opacity-60 grayscale cursor-not-allowed">
                <span className="text-sm text-muted-foreground">June 2024</span>
                <h2 className="text-lg mb-4">Kobalt Portal — Resetting the experience</h2>
                <div className="border border-border p-2">
                  <ImagePlaceholder label="Kobalt Portal" aspectRatio="video" />
                </div>
             </div>

             <div className="space-y-4 opacity-60 grayscale cursor-not-allowed">
                <span className="text-sm text-muted-foreground">January 2024</span>
                <h2 className="text-lg mb-4">Internal Platform — Royalty automation</h2>
                <div className="border border-border p-2">
                  <ImagePlaceholder label="Internal Platform" aspectRatio="video" />
                </div>
             </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
