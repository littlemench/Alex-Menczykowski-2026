import Layout from "@/components/Layout";
import { Link } from "wouter";

function CTALink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label uppercase tracking-widest border border-border px-3 py-1.5 hover:border-foreground transition-colors whitespace-nowrap"
    >
      {label}
    </a>
  );
}

export default function NexusBlack() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="space-y-32">

          {/* KOSIGN Venture */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>KOSIGN Venture</h2>
              <p className="text-muted-foreground">A self-serve music publishing platform for the mid-market</p>
            </div>
            <img src="/Preview-KOSIGN.png" alt="KOSIGN Venture" className="w-full h-auto" />
            <div className="flex flex-wrap gap-2 pt-2">
              <CTALink href="https://demo.kosignmusic.com/demo-entry" label="Demo" />
              <CTALink href="https://www.figma.com/design/DuBB0I7dLc0afTR6oyTHF3/Work-submissions?node-id=6367-81292&t=sdx7jezffhxPFHBx-1" label="Song Submission Explorations" />
            </div>
          </div>

          {/* Kobalt Client Product */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Kobalt Client Product</h2>
              <p className="text-muted-foreground">A new client & team experience for the world's biggest independent music publisher</p>
            </div>
            <img src="/Preview-Portal.png" alt="Kobalt Client Product" className="w-full h-auto" />
            <div className="flex flex-wrap gap-2 pt-2">
              <CTALink href="https://demo.kobaltmusic.com/demo-entry" label="Demo" />
              <CTALink href="https://www.figma.com/design/OaMj9NLeHRhBuAdSztD6mE/Roster---Writers?node-id=551-41156&t=5dqEai3LElFoLa8A-1" label="Publisher Experience" />
            </div>
          </div>

          {/* Kobalt & amra Platform */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Kobalt & amra Platform</h2>
              <p className="text-muted-foreground">A new generation of data processing tools for the Kobalt music group</p>
            </div>
            <img src="/Preview-Tools.png" alt="Kobalt & amra Platform" className="w-full h-auto" />
            <div className="flex flex-wrap gap-2 pt-2">
              <CTALink href="https://www.figma.com/proto/J3Ke5gQnOJLOxtnp7UtekF/%E2%9B%B1--DS-1.1---Platform-Prototype?node-id=6864-297262&p=f&viewport=-11850%2C-7469%2C1.09&t=CuRjZnTheeAAu9uI-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=6864%3A297262&page-id=6834%3A240545" label="Vision Prototype" />
            </div>
          </div>

          {/* Design Ops & AI */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Design Ops & AI</h2>
              <p className="text-muted-foreground">Refactoring FE & Design collaboration with a new stack</p>
            </div>
            <img src="/Preview-Rights-Claude-Design.jpg" alt="Design Ops & AI" className="w-full h-auto" />
            <div className="flex flex-wrap gap-2 pt-2">
              <CTALink href="https://podium-components.prod.ktech.com/" label="Podium Components" />
              <CTALink href="https://claude.ai/design/p/019e1b5e-bfea-7523-90f9-eb98a1c8b66e?file=Agreement+-+Blended.html&via=share" label="IA/Nav Prototype" />
              <CTALink href="https://claude.ai/design/p/019e1b5e-bfea-7523-90f9-eb98a1c8b66e?file=Rights+-+Linked+Object.html&via=share" label="Linked Objects" />
              <CTALink href="https://claude.ai/design/p/019e1b5e-bfea-7523-90f9-eb98a1c8b66e?file=Agreement+-+Create+General.html&via=share" label="Creation" />
            </div>
          </div>

        </div>

        <footer className="mt-32 pt-16 border-t border-divider content-width">
          <Link href="/work">
            <a className="text-sm font-medium hover:underline">← Back to Work</a>
          </Link>
        </footer>
      </section>
    </Layout>
  );
}
