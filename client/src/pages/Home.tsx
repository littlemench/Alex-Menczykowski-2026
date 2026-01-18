import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="layout-grid -mt-32">
        <h1 className="mb-12">Alex Menczykowski</h1>
        
        <div className="content-width space-y-6">
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
      </section>
    </Layout>
  );
}
