import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <h1 className="mb-12">Work</h1>
        
        <div className="content-width space-y-6 mb-24">
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
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">March 2025</span>
              <h2 className="text-lg font-semibold">KOSIGN</h2>
              <p className="text-sm text-primary">Launching a self-serve publishing platform</p>
            </div>
            <Link href="/work/kosign">
              <a className="block group">
                <div className="border border-border p-2 transition-colors group-hover:border-muted-foreground/30 mb-2">
                  <ImagePlaceholder label="KOSIGN Case Study" aspectRatio="video" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground border-b border-divider pb-0.5">View Project</span>
              </a>
            </Link>
          </div>

          {/* Others */}
          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <div className="space-y-1 opacity-60">
                  <span className="text-sm text-muted-foreground">June 2024</span>
                  <h2 className="text-lg font-semibold">Kobalt Portal</h2>
                  <p className="text-sm text-primary">Resetting the experience</p>
                </div>
                <div className="border border-border p-2 opacity-60 grayscale cursor-not-allowed mb-2">
                  <ImagePlaceholder label="Kobalt Portal" aspectRatio="video" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground border-b border-divider pb-0.5 opacity-60">Coming Soon</span>
             </div>

             <div className="space-y-4">
                <div className="space-y-1 opacity-60">
                  <span className="text-sm text-muted-foreground">January 2024</span>
                  <h2 className="text-lg font-semibold">Internal Platform</h2>
                  <p className="text-sm text-primary">Royalty automation</p>
                </div>
                <div className="border border-border p-2 opacity-60 grayscale cursor-not-allowed mb-2">
                  <ImagePlaceholder label="Internal Platform" aspectRatio="video" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground border-b border-divider pb-0.5 opacity-60">Coming Soon</span>
             </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
