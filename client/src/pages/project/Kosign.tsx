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
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light">
                  <p>
                    Publishing isn’t sexy. It’s complex, often misunderstood and built on delayed gratification. For most writers and artists, the challenge isn’t just choosing the right solution - it’s understanding that there is a problem at all.
                  </p>
                  <p>
                    One of the key challenges when building and launching KOSIGN was the need to sell both the problem and the solution - all whilst navigating a series of tensions: perceived cost versus value, self-serve simplicity versus legal and security requirements, startup speed versus enterprise governance, and alignment across globally distributed teams, consultants and stakeholders.
                  </p>
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
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light">
                  <p>
                    I was responsible for the end-to-end experience strategy and design execution for KOSIGN.
                  </p>
                  <p>
                    As well as translating the existing Kobalt ‘Portal’ functionality into a self-serve product for a mid-market audience, I set and implemented design direction across application, onboarding, verification, and in-life usage, collaborating closely with product, engineering, legal, operations, and executive stakeholders to get to market.
                  </p>
               </div>
            </section>

            {/* Strategy & Tradeoffs */}
            <section className="space-y-8">
              <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Strategy, tradeoff’s and key decisions</h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light">
                <p>
                  To ship quickly and learn in-market, we deliberately deferred a number of augmentation and enhancement ideas. Rather than reinventing the product wholesale, we focused on adapting the core experience to prove demand and operational viability first.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light marker:text-muted-foreground">
                <li className="pl-4">
                  We opted to use the website as a sales and demand tool, majoring on increasing the quantity - not quality - of applications
                </li>
                <li className="pl-4">
                  We identified the post-acceptance journey as a key moment early on, and focused on increasing intuition and reduced friction wherever possible reduce procrastination through perceived effort, and drop-off through confusion
                </li>
                <li className="pl-4">
                  Once the contract had been standardised, we provided a summary of what is still a relatively complex document with clear summaries and optional depth to reduce friction in a key moment in this onboarding process
                </li>
                <li className="pl-4">
                  We focused heavily on the ‘empty and interim state’ product experience, majoring on directing user activity towards submitting music for collection as the key interaction
                </li>
                <li className="pl-4">
                  We re-architecting the song submission flow into focused, low-friction steps, before eventually augmenting it with optionality for input methods (link submission and reactive suggestions)
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
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light mb-8">
                <p>Since launching in March 2025:</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-divider">
                <div>
                  <div className="text-3xl md:text-4xl font-medium text-primary mb-1">$3.16m</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Revenue</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-medium text-primary mb-1">27k+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Apps</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-medium text-primary mb-1">100%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Support Reduc.</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-medium text-primary mb-1">50%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Auto Queries</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Activation</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-medium">1.6</span>
                    <span className="text-sm text-muted-foreground">days</span>
                    <span className="text-xs text-muted-foreground line-through ml-2">20.6</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Onboarding</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-medium">3.2</span>
                    <span className="text-sm text-muted-foreground">days</span>
                    <span className="text-xs text-muted-foreground line-through ml-2">31.4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Delivered</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-medium">4.9</span>
                    <span className="text-sm text-muted-foreground">days</span>
                    <span className="text-xs text-muted-foreground line-through ml-2">51.2</span>
                  </div>
                </div>
              </div>
            </section>

             {/* Reflection */}
             <section className="space-y-8">
               <h2 className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Reflection</h2>
               <div className="space-y-6 text-lg md:text-xl leading-relaxed text-secondary font-light">
                  <p>
                    KOSIGN reinforced that many of the hardest design problems aren’t necessarily about pixels or flows. They’re about the maturity or outlook of our targeted segments, about sequencing effort across multi-disciplinary teams, and about finding the right relationship with the mothership to be able to ship and learn at pace.
                  </p>
                  <p>
                    One key mistake was not keeping website development in-house early enough. While the core product supported fast iteration, the website stack limited our ability to experiment at the pace required. Had we retained the ability to shape our ‘design conditions’ across tooling, decision making, and capability - it’s possible that more positive change could have been realised.
                  </p>
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
