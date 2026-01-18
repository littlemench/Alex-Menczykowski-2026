import Layout from "@/components/Layout";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ProjectCarousel from "@/components/ProjectCarousel";
import { Link } from "wouter";

const carouselSlides = [
  {
    id: "1",
    title: "Onboarding Flow",
    description: "Simplified the registration process for creators, reducing friction by 40% through a progressive disclosure model.",
    imageLabel: "Kosign Onboarding UI"
  },
  {
    id: "2",
    title: "Publishing Dashboard",
    description: "A centralized command center for creators to manage content across multiple platforms with real-time analytics.",
    imageLabel: "Kosign Dashboard"
  },
  {
    id: "3",
    title: "Monetization Tools",
    description: "Integrated flexible payment gateways and subscription management tools for sustainable creator growth.",
    imageLabel: "Kosign Monetization"
  }
];

export default function KosignProject() {
  return (
    <Layout>
      <article className="layout-grid -mt-32">
        <header className="mb-24">
          <h1 className="mb-8">KOSIGN</h1>
          <p className="text-lg font-medium content-width">Launching a self-serve publishing platform for mid-market creators</p>
        </header>

        <div className="space-y-24">
          <ProjectCarousel slides={carouselSlides} />

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Context</h2>
            <p>
              KOSIGN was an exploration of a new business opportunity: moving down the publishing deal curve to serve a growing, underserved middle-market of songwriters who were not collecting their publishing royalties.
            </p>
            <p>
              The ambition was to create a fully self-serve, admin-only publishing platform that balanced scale and efficiency with security, compliance, and brand trust. All whilst operating within the constraints of a mature, risk-averse organisation.
            </p>
          </section>

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">The real problem</h2>
            <p>
              Publishing isn’t sexy. It’s complex, often misunderstood and built on delayed gratification. For most writers and artists, the challenge isn’t just choosing the right solution - it’s understanding that there is a problem at all.
            </p>
            <p>
              One of the key challenges when building and launching KOSIGN was the need to sell both the problem and the solution - all whilst navigating a series of tensions: perceived cost versus value, self-serve simplicity versus legal and security requirements, startup speed versus enterprise governance, and alignment across globally distributed teams, consultants and stakeholders.
            </p>
          </section>

          <div className="border border-border p-2">
            <ImagePlaceholder label="Process / Flow Diagram" aspectRatio="video" />
          </div>

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">My role</h2>
            <p>
              I was responsible for the end-to-end experience strategy and design execution for KOSIGN.
            </p>
            <p>
              As well as translating the existing Kobalt ‘Portal’ functionality into a self-serve product for a mid-market audience, I set and implemented design direction across application, onboarding, verification, and in-life usage, collaborating closely with product, engineering, legal, operations, and executive stakeholders to get to market.
            </p>
          </section>

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Strategy, tradeoff’s and key decisions</h2>
            <p>
              To ship quickly and learn in-market, we deliberately deferred a number of augmentation and enhancement ideas. Rather than reinventing the product wholesale, we focused on adapting the core experience to prove demand and operational viability first.
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>We opted to use the website as a sales and demand tool, majoring on increasing the quantity - not quality - of applications</li>
              <li>We identified the post-acceptance journey as a key moment early on, and focused on increasing intuition and reduced friction</li>
              <li>Once the contract had been standardised, we provided a summary of what is still a relatively complex document</li>
              <li>We focused heavily on the ‘empty and interim state’ product experience</li>
              <li>We re-architecting the song submission flow into focused, low-friction steps</li>
            </ul>
          </section>

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 py-8 border-y border-divider">
              <div>
                <div className="text-2xl font-bold">$3.16m</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-bold">27k+</div>
                <div className="text-sm text-muted-foreground">Apps</div>
              </div>
              <div>
                <div className="text-2xl font-bold">1.6d</div>
                <div className="text-sm text-muted-foreground">Activation</div>
              </div>
            </div>
          </section>

          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Reflection</h2>
            <p>
              KOSIGN reinforced that many of the hardest design problems aren’t necessarily about pixels or flows. They’re about the maturity or outlook of our targeted segments, about sequencing effort across multi-disciplinary teams, and about finding the right relationship with the mothership to be able to ship and learn at pace.
            </p>
          </section>
        </div>

        <footer className="mt-32 pt-16 border-t border-divider content-width">
          <Link href="/work">
            <a className="text-sm font-medium hover:underline">← Back to Work</a>
          </Link>
        </footer>
      </article>
    </Layout>
  );
}
