import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      <section className="layout-grid">
        <h1 className="mb-8">Alex Menczykowski</h1>
        
        <div className="space-y-6 mb-24">
          <p>
            I lead design for our friend, <span className="underline decoration-border underline-offset-2">KOSIGN</span>. I’m a design leader with a flexible and even ‘generalist’ approach. I enjoy working closely with the best minds across business, product, and engineering to frame problems, prioritise opportunities, and ship with minimum delay, and maximum learnings.
          </p>
          <p>
            I place value on collaboration and facilitation to improve decision-making, and I focus on learning through deep discovery and real delivery - getting meaningful work into the hands of users early, learning from real behaviour, and improving results over time.
          </p>
          <p>
            In my current role, I head up Product Design across the Kobalt Music Group, leading Design vision, processes, and delivery across Kobalt, amra and KOSIGN. I’ve previously worked at world leading design and innovation studios Frog, Adaptive Lab, and ?WhatIf! Innovation, as well as supporting startups in my spare time.
          </p>
        </div>

        {/* Selected Work Timeline */}
        <div className="space-y-16">
          <div className="space-y-4">
            <span className="text-sm text-muted-foreground">March 2025</span>
            <Link href="/work/kosign">
              <a className="block group">
                <h2 className="text-lg underline decoration-border underline-offset-4 group-hover:decoration-foreground mb-4">KOSIGN — Launching a self-serve publishing platform</h2>
                <div className="border border-border p-2">
                  <ImagePlaceholder label="KOSIGN" aspectRatio="video" />
                </div>
              </a>
            </Link>
          </div>

          <div className="space-y-4">
            <span className="text-sm text-muted-foreground">June 2024</span>
            <div className="block opacity-60">
              <h2 className="text-lg mb-4">Kobalt Portal — Resetting the experience for songwriters</h2>
              <div className="border border-border p-2">
                <ImagePlaceholder label="Kobalt Portal" aspectRatio="video" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Link href="/work">
            <a className="text-sm font-medium border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
              View all work
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
