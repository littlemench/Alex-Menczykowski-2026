import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24 layout-grid">
        <div className="max-w-4xl">
          <h1 className="mb-12 text-primary">Work</h1>
          
          <div className="grid md:grid-cols-12 gap-12 pt-8">
            <div className="md:col-span-8 space-y-8 text-secondary font-light">
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
          </div>
        </div>
      </section>

      <section className="pb-32 layout-grid border-t border-divider pt-20">
        <div className="space-y-32">
          
          {/* KOSIGN */}
          <Link href="/work/kosign">
            <a className="group block">
              <div className="border border-border p-2 transition-colors group-hover:border-muted-foreground/30 mb-8">
                <ImagePlaceholder label="KOSIGN Case Study" aspectRatio="video" />
              </div>
              <div className="max-w-2xl">
                <h2 className="text-xl mb-4 text-primary lowercase tracking-tight normal-case">KOSIGN</h2>
                <p className="text-lg text-secondary mb-4">Launching a self-serve publishing platform for mid-market creators</p>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground border-b border-divider pb-0.5">View Project</span>
              </div>
            </a>
          </Link>

          {/* Other projects as a list */}
          <div className="grid md:grid-cols-2 gap-16">
             <div className="opacity-60 grayscale cursor-not-allowed space-y-6">
                <div className="border border-border p-2">
                  <ImagePlaceholder label="Kobalt Portal" aspectRatio="video" />
                </div>
                <div>
                  <h2 className="text-lg mb-2 text-primary lowercase tracking-tight normal-case">Kobalt Portal — Coming Soon</h2>
                  <p className="text-secondary">Resetting the experience for songwriters at scale</p>
                </div>
             </div>

             <div className="opacity-60 grayscale cursor-not-allowed space-y-6">
                <div className="border border-border p-2">
                  <ImagePlaceholder label="Internal Platform" aspectRatio="video" />
                </div>
                <div>
                  <h2 className="text-lg mb-2 text-primary lowercase tracking-tight normal-case">Publishing Platform — Coming Soon</h2>
                  <p className="text-secondary">End-to-end royalties and metadata platform</p>
                </div>
             </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
