import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6">
          <p>
            I lead Product Design across the Kobalt music group, dividing my time between <a href="https://www.kobaltmusic.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">Kobalt</a>, <a href="https://www.amra.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">amra</a> and now <a href="https://www.kosignmusic.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">KOSIGN</a>.
          </p>
          <p>
            I was raised in design and innovation studios like <a href="https://www.frog.co/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">Frog</a>, <a href="https://x.com/adaptivelab?lang=en" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">Adaptive Lab</a>, and <a href="https://whatifinnovation.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors">?WhatIf! Innovation</a>, working with startups and scaleups along the way.
          </p>
        </div>
      </section>
    </Layout>
  );
}
