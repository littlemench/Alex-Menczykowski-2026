import Layout from "@/components/Layout";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProofPoints from "@/components/ProofPoints";
import { Link } from "wouter";
import { sections, proofPoints, carousel1Slides, carousel2Slides, carousel3Slides } from "@/content/kosign.content";

export default function KosignProject() {
  return (
    <Layout>
      <article className="layout-grid">
        <div className="space-y-24">

          {/* Sub-header + Hero carousel */}
          <div className="space-y-12">
            <div className="content-width space-y-6">
              <p className="font-light">Launching a self-serve publishing platform for mid-market creators</p>
            </div>
            <ProjectCarousel slides={carousel1Slides} />
          </div>

          {/* Context */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Context</h2>
            {sections.context.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* The real problem */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">The real problem</h2>
            {sections.realProblem.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* My role */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">My role</h2>
            {sections.myRole.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* Carousel */}
          <ProjectCarousel slides={carousel2Slides} />

          {/* Strategy */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Strategy, tradeoffs and key decisions</h2>
            <p>{sections.strategyIntro}</p>
            <ul className="list-disc pl-5 space-y-4">
              {sections.strategyDecisions.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </section>

          {/* Proof points */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Results</h2>
            <ProofPoints points={proofPoints} />
          </section>

          {/* Carousel 3 */}
          <ProjectCarousel slides={carousel3Slides} />

          {/* Reflection */}
          <section className="space-y-6 content-width">
            <h2 className="text-[22px] font-semibold">Reflection</h2>
            {sections.reflection.map((p, i) => <p key={i}>{p}</p>)}
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
