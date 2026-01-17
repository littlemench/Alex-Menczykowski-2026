import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32 layout-grid">
        <div className="max-w-4xl">
          <h1 className="mb-12 md:mb-16 text-primary">
            Product Design leader shaping strategy, teams, and products from mission to market
          </h1>
          
          <div className="max-w-3xl space-y-8 text-xl md:text-2xl leading-relaxed text-secondary font-light">
            <p>
              I’m a design leader with a flexible and even ‘generalist’ approach. I enjoy working closely with the best minds across business, product, and engineering to frame problems, prioritise opportunities, and ship with minimum delay, and maximum learnings.
            </p>
            <p>
              I place value on collaboration and facilitation to improve decision-making, and I focus on learning through deep discovery and real delivery - getting meaningful work into the hands of users early, learning from real behaviour, and improving results over time.
            </p>
            <p>
              In my current role, I head up Product Design across the Kobalt Music Group, leading Design vision, processes, and delivery across Kobalt, amra and KOSIGN. I’ve previously worked at world leading design and innovation studios Frog, Adaptive Lab, and ?WhatIf! Innovation, as well as supporting startups in my spare time.
            </p>
          </div>
        </div>
        
        {/* Optional framed image placeholder */}
        <div className="mt-20 md:mt-32 max-w-5xl">
          <ImagePlaceholder label="Hero / Context Image" aspectRatio="wide" />
        </div>
      </section>

      {/* Work Overview Section */}
      <section className="py-20 md:py-32 layout-grid border-t border-divider">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-primary sticky top-24">Work overview</h2>
          </div>
          <div className="md:col-span-8 space-y-8 md:text-lg leading-relaxed text-secondary">
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
      </section>

      {/* Where I Tend To Create Value */}
      <section className="py-20 md:py-32 layout-grid bg-muted/30">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-24">
          
          <div className="space-y-4">
            <span className="text-sm font-medium text-muted-foreground block mb-2">01</span>
            <h3 className="text-primary text-2xl mb-4">From ambiguity to a shipped product</h3>
            <p>Zero-to-one or early-stage work where the problem, audience, or value proposition isn’t yet clear, and progress matters more than perfection.</p>
          </div>

          <div className="space-y-4">
            <span className="text-sm font-medium text-muted-foreground block mb-2">02</span>
            <h3 className="text-primary text-2xl mb-4">Simplifying complex systems</h3>
            <p>Taking operationally, technically, or legally complex workflows and platforms and making them easier to use, easier to scale, and easier for teams to reason about.</p>
          </div>

          <div className="space-y-4">
            <span className="text-sm font-medium text-muted-foreground block mb-2">03</span>
            <h3 className="text-primary text-2xl mb-4">Creating momentum without mess</h3>
            <p>Designing products, processes, and team ways of working that allow faster learning and iteration, while respecting real constraints like risk, compliance, or legacy systems.</p>
          </div>

          <div className="space-y-4">
            <span className="text-sm font-medium text-muted-foreground block mb-2">04</span>
            <h3 className="text-primary text-2xl mb-4">Raising the bar for core experiences</h3>
            <p>Revisiting foundational journeys or workflows and resetting expectations around clarity, quality, and craft.</p>
          </div>

        </div>
      </section>

      {/* Selected Work */}
      <section className="py-20 md:py-32 layout-grid border-t border-divider">
        <h2 className="mb-16 text-primary">Selected work</h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          
          {/* KOSIGN - Active */}
          <Link href="/work/kosign">
            <a className="group block space-y-6 cursor-pointer">
              <div className="border border-border p-2 transition-colors group-hover:border-muted-foreground/30">
                <ImagePlaceholder label="KOSIGN Interface" aspectRatio="portrait" />
              </div>
              <div>
                <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">KOSIGN</h3>
                <p className="text-muted-foreground">Launching a self-serve publishing platform for mid-market creators</p>
              </div>
            </a>
          </Link>

          {/* Kobalt Portal - Coming Soon */}
          <div className="block space-y-6 opacity-60">
            <div className="border border-border p-2">
              <ImagePlaceholder label="Kobalt Portal Interface" aspectRatio="portrait" />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl">Kobalt Portal</h3>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-muted-foreground">Resetting the experience for songwriters at scale</p>
            </div>
          </div>

          {/* Publishing Platform - Coming Soon */}
          <div className="block space-y-6 opacity-60">
            <div className="border border-border p-2">
              <ImagePlaceholder label="Internal Platform" aspectRatio="portrait" />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl">Publishing Platform (Internal)</h3>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-muted-foreground">End-to-end royalties and metadata platform</p>
            </div>
          </div>

           {/* Golf Caddy - Coming Soon */}
           <div className="block space-y-6 opacity-60">
            <div className="border border-border p-2">
              <ImagePlaceholder label="Golf Caddy App" aspectRatio="portrait" />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl">Golf Caddy</h3>
                <span className="text-xs uppercase tracking-widest font-medium border border-border px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-muted-foreground">Founding-designer work on an AI-driven product</p>
            </div>
          </div>

        </div>

        <div className="mt-24 text-center">
          <Link href="/work">
            <a className="inline-block border-b border-foreground pb-1 text-lg hover:text-muted-foreground hover:border-muted-foreground transition-colors">
              View work index
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
