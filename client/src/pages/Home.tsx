import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6">
          <p>
            I lead Product Design at the Kobalt music group, dividing my time across <a href="https://www.kobaltmusic.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">Kobalt</a>, <a href="https://www.amra.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">amra</a> and now <a href="https://www.kosignmusic.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">KOSIGN</a>.
          </p>
          <p>
            I enjoy work most when given the chance to collaborate on shaping strategy, teams, and products, all the way from mission to market.
          </p>
          <p>
            I was raised in design and innovation studios such as <a href="https://www.frog.co/" target="_blank" rel="noopener noreferrer" className="italic hover:text-muted-foreground transition-colors">Frog</a>, <a href="https://x.com/adaptivelab?lang=en" target="_blank" rel="noopener noreferrer" className="italic hover:text-muted-foreground transition-colors">Adaptive Lab</a>, and <a href="https://whatifinnovation.com/" target="_blank" rel="noopener noreferrer" className="italic hover:text-muted-foreground transition-colors">?WhatIf! Innovation</a>, and have supported several startups in my spare time along the way.
          </p>
          <p>
            I do my best work when operating closely alongside the most ambitious minds across business, product, and engineering to improve decision-making. I focus on learning through deep discovery and real delivery - getting meaningful work into the hands of users early, learning from real behaviour, and improving results over time.
          </p>
          <p>
            If you'd like to chat, or want to know more, please reach out.
          </p>
        </div>
      </section>
    </Layout>
  );
}
