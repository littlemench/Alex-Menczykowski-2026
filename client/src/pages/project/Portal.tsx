import Layout from "@/components/Layout";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProofPoints from "@/components/ProofPoints";
import { Link } from "wouter";
import { meta, sections, proofPoints, carousel1Slides } from "@/content/portal.content";

export default function PortalProject() {
  return (
    <Layout>
      <article className="layout-grid">
        <div className="space-y-24">

          {/* Sub-header + Hero carousel */}
          <div className="space-y-12">
            <div>
              <p className="sub-header">{meta.subtitle}</p>
            </div>
            <ProjectCarousel slides={carousel1Slides} />
          </div>

          {/* Context */}
          <section className="space-y-6 content-width">
            <h2>Context</h2>
            {sections.context.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* The real problem */}
          <section className="space-y-6 content-width">
            <h2>The real problem</h2>
            {sections.realProblem.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* My role */}
          <section className="space-y-6 content-width">
            <h2>My role</h2>
            {sections.myRole.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {/* Strategy */}
          <section className="space-y-6 content-width">
            <h2>Strategy, tradeoffs and key decisions</h2>
            <p>{sections.strategyIntro}</p>
            <ul className="list-disc pl-5 space-y-4">
              {sections.strategyDecisions.map((d) => (
                <li key={d.title}>
                  <span className="font-medium">{d.title}</span> — {d.text}
                </li>
              ))}
            </ul>
          </section>

          {/* Proof points */}
          <section className="space-y-6 content-width">
            <h2>Results</h2>
            <ProofPoints points={proofPoints} />
          </section>

          {/* Reflection */}
          <section className="space-y-6 content-width">
            <h2>Reflection</h2>
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
