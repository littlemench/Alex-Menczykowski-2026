import Layout from "@/components/Layout";
import RichText from "@/components/RichText";
import ProjectCarousel from "@/components/ProjectCarousel";
import KosignSplash from "@/components/kosign-splash/KosignSplash";
import ProofPoints from "@/components/ProofPoints";
import { Link } from "wouter";
import { sections, proofPoints, carousel2Slides, carousel3Slides, credit } from "@/content/kosign.content";

export default function KosignProject() {
  return (
    <Layout>
      <article className="layout-grid">
        <div className="space-y-24">

          {/* Sub-header + Hero */}
          <div className="space-y-12">
            <div>
              <p className="sub-header">Launching a self-serve publishing platform for mid-market creators</p>
            </div>
            {/* Hero: the first frame of the KOSIGN thumbnail, held still */}
            <div
              className="media-width"
              role="img"
              aria-label="The kosignmusic.com home page: Get every dollar your song earns"
            >
              <KosignSplash active={false} still width="100%" />
            </div>
          </div>

          {/* Context */}
          <section className="space-y-6 content-width">
            <h2>Context</h2>
            {sections.context.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          </section>

          {/* The real problem */}
          <section className="space-y-6 content-width">
            <h2>The real problem</h2>
            {sections.realProblem.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          </section>

          {/* My role */}
          <section className="space-y-6 content-width">
            <h2>My role</h2>
            {sections.myRole.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          </section>

          {/* Carousel */}
          <ProjectCarousel slides={carousel2Slides} />

          {/* Strategy */}
          <section className="space-y-6 content-width">
            <h2>Strategy, tradeoffs and key decisions</h2>
            <p>{sections.strategyIntro}</p>
            <ul className="list-disc pl-5 space-y-4">
              {sections.strategyDecisions.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </section>

          {/* Proof points */}
          <section className="space-y-6 content-width">
            <h2>Results</h2>
            <ProofPoints points={proofPoints} />
          </section>

          {/* Carousel 3 */}
          <ProjectCarousel slides={carousel3Slides} />

          {/* Reflection */}
          <section className="space-y-6 content-width">
            <h2>Reflection</h2>
            {sections.reflection.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          </section>

        </div>

        <footer className="mt-32 pt-16 border-t border-divider content-width space-y-6">
          {/* Credit */}
          <p className="text-sm opacity-70">
            <RichText text={credit} />
          </p>
          <Link href="/work">
            <a className="text-sm font-medium hover:underline">← Back to Work</a>
          </Link>
        </footer>
      </article>
    </Layout>
  );
}
