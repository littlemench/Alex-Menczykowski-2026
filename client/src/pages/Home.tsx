import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6">
          <p>
            I am a product design leader who enjoys taking a flexible, collaborative approach to shaping strategy, teams, and products, all the way from mission to market.
          </p>
          <p>
            I lead product design at the Kobalt music group, dividing my time across <span className="underline decoration-border underline-offset-2">Kobalt</span>, <span className="underline decoration-border underline-offset-2">amra</span> and now <span className="underline decoration-border underline-offset-2">KOSIGN</span>.
          </p>
          <p>
            I previously worked at world leading design and innovation studios <span className="italic">Frog</span>, <span className="italic">Adaptive Lab</span>, and <span className="italic">?WhatIf! Innovation</span>, as well as supporting startups in my spare time.
          </p>
          <p>
            I enjoy working closely with the best minds across business, product, and engineering to frame problems, prioritise opportunities, and ship with minimum delay, and maximum learnings. I place value on collaboration and facilitation to improve decision-making, and I focus on learning through deep discovery and real delivery - getting meaningful work into the hands of users early, learning from real behaviour, and improving results over time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
