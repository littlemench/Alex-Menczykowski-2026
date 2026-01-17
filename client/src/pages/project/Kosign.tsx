import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Link } from "wouter";

export default function KosignProject() {
  return (
    <Layout>
      <article className="pt-24 pb-20 md:pt-32 md:pb-32 layout-grid">
        
        {/* Header */}
        <header className="max-w-4xl mb-20 md:mb-32">
          <Link href="/work">
            <a className="inline-block text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              ← Back to Work
            </a>
          </Link>
          <h1 className="text-primary leading-tight">
            KOSIGN — Launching a self-serve publishing platform for mid-market creators
          </h1>
        </header>

        {/* Hero Image */}
        <div className="mb-24 md:mb-32">
          <ImagePlaceholder label="Project Hero Image" aspectRatio="wide" className="w-full" />
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-24">
          
          {/* Main Content Column */}
          <div className="md:col-span-8 space-y-24 md:space-y-32">
            
            {/* Context */}
            <section className="space-y-8">
              <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Context</h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light">
                <p>
                  KOSIGN was an exploration of a new business opportunity: moving down the publishing deal curve to serve a growing, underserved middle-market of songwriters who were not collecting their publishing royalties.
                </p>
                <p>
                  The ambition was to create a fully self-serve, admin-only publishing platform that balanced scale and efficiency with security, compliance, and brand trust. All whilst operating within the constraints of a mature, risk-averse organisation.
                </p>
              </div>
            </section>

            {/* The Real Problem */}
            <section className="space-y-8">
               <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">The Real Problem</h2>
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light p-8 bg-muted/30 border border-dashed border-border text-center">
                  <p className="italic">[Content to be supplied: The Real Problem]</p>
               </div>
            </section>

            {/* Visual Break */}
            <div className="w-full">
              <ImagePlaceholder label="Process / Flow Diagram" aspectRatio="video" />
              <p className="mt-4 text-sm text-muted-foreground text-center">User journey map and core workflows</p>
            </div>

            {/* My Role */}
             <section className="space-y-8">
               <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">My Role</h2>
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light p-8 bg-muted/30 border border-dashed border-border text-center">
                  <p className="italic">[Content to be supplied: My Role]</p>
               </div>
            </section>

            {/* Strategy & Tradeoffs */}
            <section className="space-y-8">
              <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Strategy, tradeoffs and key decisions</h2>
              <ul className="list-disc pl-5 space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light marker:text-muted-foreground">
                <li className="pl-4">
                  <span className="font-medium text-primary block mb-1">Decision point one</span>
                  Description of the tradeoff and why we chose this path. Focusing on the balance between speed and scalability.
                </li>
                <li className="pl-4">
                   <span className="font-medium text-primary block mb-1">Decision point two</span>
                   How we handled compliance requirements without destroying the user experience.
                </li>
                <li className="pl-4">
                   <span className="font-medium text-primary block mb-1">Decision point three</span>
                   Prioritising core features for MVP vs nice-to-haves for post-launch.
                </li>
              </ul>
            </section>

            {/* Visual Break */}
            <div className="w-full">
              <ImagePlaceholder label="Key Interface Screens" aspectRatio="video" />
            </div>

            {/* Results */}
            <section className="space-y-8">
              <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Results</h2>
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-divider">
                <div>
                  <div className="text-4xl md:text-5xl font-medium text-primary mb-2">XX%</div>
                  <div className="text-sm text-muted-foreground">Increase in signup conversion</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-medium text-primary mb-2">$X.Xm</div>
                  <div className="text-sm text-muted-foreground">Royalties processed in Year 1</div>
                </div>
              </div>
            </section>

             {/* Reflection */}
             <section className="space-y-8">
               <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Reflection</h2>
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light p-8 bg-muted/30 border border-dashed border-border text-center">
                  <p className="italic">[Content to be supplied: Reflection]</p>
               </div>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-divider flex justify-between items-center">
          <Link href="/work">
            <a className="text-lg font-medium hover:text-muted-foreground transition-colors">
              ← Back to Work
            </a>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
