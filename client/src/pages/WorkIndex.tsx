import Layout from "@/components/Layout";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6 mb-24">
          <p>
            My work sits across product strategy, design, and delivery. I'm usually brought in when problems are ambiguous, systems are complex, or teams need to move faster without creating unnecessary risk.
          </p>
          <p>
            I lead a team that partners closely with business leadership on framing the right problems, with product management to shape and prioritise opportunities, and with engineering to ensure what we build is feasible - and can ship without delay.
          </p>
        </div>

        <div className="space-y-32">
          {/* KOSIGN */}
          <div className="space-y-4 content-width">
            <div className="space-y-1 opacity-60">
              <span className="label text-muted-foreground">March 2025 &gt; Present</span>
              <h2>KOSIGN</h2>
              <p>Launching a self-serve music publishing platform</p>
            </div>
            <div className="cursor-not-allowed mb-2 group">
              <img src="/Preview-KOSIGN.png" alt="KOSIGN Case Study" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="label uppercase tracking-widest text-muted-foreground opacity-60 mt-2 block">Coming Soon</span>
            </div>
          </div>

          {/* Kobalt Client Product */}
          <div className="space-y-4 content-width">
            <div className="space-y-1 opacity-60">
              <span className="label text-muted-foreground">June 2024 &gt; Present</span>
              <h2>Kobalt Client Product</h2>
              <p>Resetting the client experience for the worlds biggest independent music publisher</p>
            </div>
            <div className="cursor-not-allowed mb-2 group">
              <img src="/Preview-Portal.png" alt="Kobalt Client Product" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="label uppercase tracking-widest text-muted-foreground opacity-60 mt-2 block">Coming Soon</span>
            </div>
          </div>

          {/* Internal Data Platform */}
          <div className="space-y-4 content-width">
            <div className="space-y-1 opacity-60">
              <span className="label text-muted-foreground">January 2024 &gt; Present</span>
              <h2>Internal Data Platform</h2>
              <p>A new generation of data processing tools for the Kobalt music group</p>
            </div>
            <div className="cursor-not-allowed mb-2 group">
              <img src="/Preview-Tools.png" alt="Internal Data Platform" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="label uppercase tracking-widest text-muted-foreground opacity-60 mt-2 block">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
