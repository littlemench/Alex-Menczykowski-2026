import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function PlayIndex() {
  return (
    <Layout>
      <section className="layout-grid">
        <div className="content-width space-y-6 mb-24">
          <p>
            A place to store the work and projects on the periphery. Examples of where i've explored new technologies, side hustles, and ideas across the Design spectrum.
          </p>
        </div>

        <div className="space-y-32">
          {/* Shots */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Shots</h2>
              <p>A platform for my film photography</p>
            </div>
            <a href="http://shots.photography/" target="_blank" rel="noopener noreferrer" className="block group">
              <img src="/Preview-Shots.png" alt="Shots" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </a>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">September 2026</span>
              <a href="http://shots.photography/" target="_blank" rel="noopener noreferrer">
                <ArrowRight size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Kobalt25 */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>Kobalt25</h2>
              <p>Internal custom marketing asset generator</p>
            </div>
            <Link href="/play/kobalt25" className="block group">
              <img src="/Preview-Kobalt25.png" alt="Kobalt25" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </Link>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">August 2026</span>
              <Link href="/play/kobalt25">
                <ArrowRight size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          {/* List Jockey */}
          <div className="space-y-4 content-width">
            <div className="space-y-1">
              <h2>List Jockey</h2>
              <p>Spotify playlist arc curation</p>
            </div>
            <Link href="/play/listjockey" className="block group">
              <img src="/Preview-ListJockey.png" alt="List Jockey" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </Link>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">June 2026</span>
              <Link href="/play/listjockey">
                <ArrowRight size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          {/* AI Caddy */}
          <div className="space-y-4 content-width opacity-60">
            <div className="space-y-1">
              <h2>AI Caddy</h2>
              <p>iOS and wearable app design for the next generation of on course assistance</p>
            </div>
            <div className="cursor-not-allowed">
              <img src="/Preview-AICaddy.png" alt="AI Caddy" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">2025</span>
              <ArrowRight size={20} className="text-muted-foreground opacity-30" />
            </div>
          </div>

          {/* Beeline */}
          <div className="space-y-4 content-width opacity-60">
            <div className="space-y-1">
              <h2>Beeline</h2>
              <p>Brand identity for pre-seed navigational route planner</p>
            </div>
            <div className="cursor-not-allowed">
              <img src="/Preview-Beeline.png" alt="Beeline" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-muted-foreground">2021</span>
              <ArrowRight size={20} className="text-muted-foreground opacity-30" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
