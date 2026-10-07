import { Link } from "wouter";
import { ArrowRight } from "@phosphor-icons/react";
import Layout from "@/components/Layout";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6 mb-24">
          <p>
            My work spans product strategy, design, and delivery. I enjoy myself most when we're solving ambiguous problems, simplifying complex systems, or helping teams move faster without increasing risk.
          </p>
          <p>
            I'm particularly excited by the opportunities for refining and (where relevant) accelerating Design and Discovery workflows using by the advent and improvement of AI and emerging technologies.
          </p>
          <p>
            I currently lead a department that partners closely with business leadership to identify the right problems, with product management to increase confidence in opportunities, and with engineering to understand what's possible, and make it happen.
          </p>
        </div>

        <div className="space-y-32">
          {/* KOSIGN */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>KOSIGN</h2>
              <p>Launching a self-serve music publishing platform</p>
            </div>
            <Link href="/work/kosign" className="block group">
              <img src="/Preview-KOSIGN.png" alt="KOSIGN Case Study" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </Link>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">March 2025 — Present</span>
              <Link href="/work/kosign">
                <ArrowRight size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          {/* Publishing Data Platform */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Publishing Data Platform</h2>
              <p>A new generation of data processing tools for the Kobalt music group</p>
            </div>
            <Link href="/work/platform" className="block group">
              <img src="/Preview-Tools.png" alt="Publishing Data Platform" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </Link>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">January 2024 — Present</span>
              <Link href="/work/platform">
                <ArrowRight size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          {/* Kobalt Client Product */}
          <div className="space-y-4 content-width opacity-60">
            <div className="space-y-1">
              <h2>Kobalt Client Product</h2>
              <p>Resetting the client experience for the worlds biggest independent music publisher</p>
            </div>
            <div className="cursor-not-allowed">
              <img src="/Preview-Portal.png" alt="Kobalt Client Product" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">June 2024 — Present</span>
              <ArrowRight size={20} className="text-muted-foreground opacity-30" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
