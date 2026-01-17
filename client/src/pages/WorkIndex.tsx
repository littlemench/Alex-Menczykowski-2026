import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="pt-24 pb-20 md:pt-32 md:pb-20 layout-grid">
        <div className="max-w-4xl">
          <h1 className="mb-8 text-primary">Work</h1>
          <p className="text-xl md:text-2xl text-secondary font-light max-w-2xl">
            Selected work across strategy, product, and delivery.
          </p>
        </div>
      </section>

      <section className="pb-32 layout-grid">
        <div className="space-y-24 md:space-y-32">
          
          {/* KOSIGN */}
          <Link href="/work/kosign">
            <a className="group block grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 order-2 md:order-1">
                <div className="border border-border p-2 transition-colors group-hover:border-muted-foreground/30">
                  <ImagePlaceholder label="KOSIGN Project" aspectRatio="square" />
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 space-y-4">
                <h2 className="text-3xl md:text-4xl group-hover:text-primary transition-colors">KOSIGN</h2>
                <p className="text-xl text-secondary">Launching a self-serve publishing platform for mid-market creators</p>
                <div className="pt-4">
                  <span className="text-sm font-medium uppercase tracking-widest text-primary border-b border-primary pb-0.5">View Case Study</span>
                </div>
              </div>
            </a>
          </Link>

          {/* Kobalt Portal */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center opacity-60 cursor-not-allowed">
            <div className="md:col-span-5 order-2 md:order-1">
               <div className="border border-border p-2">
                 <ImagePlaceholder label="Kobalt Portal" aspectRatio="square" />
               </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl">Kobalt Portal</h2>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-xl text-secondary">Resetting the experience for songwriters at scale</p>
            </div>
          </div>

          {/* Publishing Platform */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center opacity-60 cursor-not-allowed">
            <div className="md:col-span-5 order-2 md:order-1">
               <div className="border border-border p-2">
                 <ImagePlaceholder label="Internal Platform" aspectRatio="square" />
               </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl">Publishing Platform (Internal)</h2>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-xl text-secondary">End-to-end royalties and metadata platform</p>
            </div>
          </div>

          {/* Golf Caddy */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center opacity-60 cursor-not-allowed">
            <div className="md:col-span-5 order-2 md:order-1">
               <div className="border border-border p-2">
                 <ImagePlaceholder label="Golf Caddy" aspectRatio="square" />
               </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl">Golf Caddy</h2>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-xl text-secondary">Founding-designer work on an AI-driven product</p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
