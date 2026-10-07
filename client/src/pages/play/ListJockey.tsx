import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function ListJockeyProject() {
  return (
    <Layout>
      <article className="layout-grid">
        <div className="space-y-16">
          <div className="content-width space-y-6">
            <p className="font-light">List Jockey is a product that integrates with the Spotify developer API so the user can curate extended playlists by specifying sections, not songs.</p>
          </div>

          <div className="space-y-3 content-width">
            <img src="/listjockey/LJ-2.png" alt="Create session" className="w-full h-auto rounded-xl" />
            <span className="label text-muted-foreground">CREATE SESSION</span>
          </div>

          <div className="content-width space-y-6">
            <p className="font-light">After naming the session, you can construct multiple sections, setting the duration, intensity and bpm for each.</p>
          </div>

          <div className="content-width">
            <img src="/listjockey/LJ-3.png" alt="Shape a section" className="w-full h-auto rounded-xl" />
          </div>

          <div className="content-width space-y-6">
            <p className="font-light">The key interaction to shaping each section is the specification of genre, reference artists, and reference songs.</p>
          </div>

          <div className="space-y-16">
            <div className="content-width">
              <img src="/listjockey/LJ-4.png" alt="Shape a section" className="w-full h-auto rounded-xl" />
            </div>
            <div className="content-width">
              <img src="/listjockey/LJ-5.png" alt="Shape a section" className="w-full h-auto rounded-xl" />
            </div>
            <div className="content-width">
              <img src="/listjockey/LJ-6.png" alt="The finished arc" className="w-full h-auto rounded-xl" />
            </div>
          </div>

          <div className="content-width space-y-6">
            <p className="font-light">
              Unfortunately for List Jockey to be made public, it needs to be formally submitted to Spotify for review. But you can check out the flow below, and the resulting playlist{" "}
              <a href="https://open.spotify.com/playlist/4Pga5QdoqRMJRxe7kEcB8p?si=von-9FKhRZaJ-HR45qN6Ew" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                here
              </a>
              .
            </p>
          </div>
        </div>

        <footer className="mt-32 pt-16 border-t border-divider content-width">
          <Link href="/play">
            <a className="text-sm font-medium hover:underline">← Back to Play</a>
          </Link>
        </footer>
      </article>
    </Layout>
  );
}
