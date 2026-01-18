import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-24 layout-grid">
        <div className="max-w-4xl">
          <h1 className="mb-12 md:mb-16 text-primary">
            Product Design leader shaping strategy, teams, and products from mission to market
          </h1>
          
          <div className="max-w-2xl space-y-8 text-secondary font-light">
            <p>
              I’m a design leader with a flexible and even ‘generalist’ approach. I enjoy working closely with the best minds across business, product, and engineering to frame problems, prioritise opportunities, and ship with minimum delay, and maximum learnings.
            </p>
            <p>
              I place value on collaboration and facilitation to improve decision-making, and I focus on learning through deep discovery and real delivery.
            </p>
            <p>
              Currently heading up Product Design across the Kobalt Music Group.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work - Short Grid */}
      <section className="py-20 md:py-32 layout-grid border-t border-divider">
        <div className="flex justify-between items-end mb-16">
          <h2 className="m-0">Selected work</h2>
          <Link href="/work">
            <a className="text-sm font-medium border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
              View all work
            </a>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* KOSIGN */}
          <Link href="/work/kosign">
            <a className="group block space-y-6 cursor-pointer">
              <div className="border border-border p-2 transition-colors group-hover:border-muted-foreground/30">
                <ImagePlaceholder label="KOSIGN" aspectRatio="square" />
              </div>
              <div>
                <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">KOSIGN</h3>
                <p className="text-muted-foreground text-sm">Launching a self-serve publishing platform for mid-market creators</p>
              </div>
            </a>
          </Link>

          {/* Kobalt Portal */}
          <div className="block space-y-6 opacity-60">
            <div className="border border-border p-2">
              <ImagePlaceholder label="Kobalt Portal" aspectRatio="square" />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl">Kobalt Portal</h3>
                <span className="text-[10px] uppercase tracking-widest font-bold border border-border px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
              <p className="text-muted-foreground text-sm">Resetting the experience for songwriters at scale</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
