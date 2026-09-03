import { Link } from "wouter";
import { ArrowRight } from "@phosphor-icons/react";
import Layout from "@/components/Layout";

export default function WorkIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6 mb-24">
          <p>
            My outlook spans product strategy, design, and delivery. I enjoy my work most when we're solving ambiguous problems, simplifying complex systems, or helping teams move faster without increasing risk.
          </p>
          <p>
            I lead a department that partners closely with business leadership on attacking the right problems, with product management to shape and prioritise opportunities, and with engineering to ensure what we build can work - and can ship without delay.
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

          {/* Kobalt Client Product */}
          <div className="space-y-4 content-width opacity-60">
            <div className="space-y-1">
              <h2>Kobalt Client Product</h2>
              <p>Resetting the client experience for the worlds biggest independent music publisher</p>
            </div>
            <div className="cursor-not-allowed">
              <img src="/Preview-Portal.png" alt="Kobalt Client Product" className="w-full h-auto grayscale transition-all duration-300 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">June 2024 — Present</span>
              <ArrowRight size={20} className="text-muted-foreground opacity-30" />
            </div>
          </div>

          {/* Internal Data Platform */}
          <div className="space-y-4 content-width opacity-60">
            <div className="space-y-1">
              <h2>Internal Data Platform</h2>
              <p>A new generation of data processing tools for the Kobalt music group</p>
            </div>
            <div className="cursor-not-allowed">
              <img src="/Preview-Tools.png" alt="Internal Data Platform" className="w-full h-auto grayscale transition-all duration-300 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">January 2024 — Present</span>
              <ArrowRight size={20} className="text-muted-foreground opacity-30" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
