import Layout from "@/components/Layout";
import { Link } from "wouter";

const gifs = [
  { src: "/kobalt25/Centre.gif", label: "Centre" },
  { src: "/kobalt25/Kobalt.gif", label: "Kobalt" },
  { src: "/kobalt25/Left.gif", label: "Left" },
  { src: "/kobalt25/Tiled.gif", label: "Tiled" },
];

export default function Kobalt25Project() {
  return (
    <Layout>
      <article className="layout-grid">
        <div className="space-y-16">
          <div className="content-width space-y-6">
            <p className="font-light">We celebrated our 25th anniversary as a business with a new logo and derivative of the Kobalt brand identity.</p>
            <p className="font-light">And in addition to a merch drop, some internal events, and a few other gifts we also created a simple desktop background generator that meant our teams could apply their own version of the identity.</p>
          </div>

          <img src="/Kobalt25-Hero.jpg" alt="Kobalt25" className="w-full h-auto rounded-xl" />

          <div className="content-width space-y-6">
            <p className="font-light">The tool let users choose apply their choice of tones from the Kobalt pallete to one of four templates.</p>
          </div>

          <div className="space-y-16">
            {gifs.map((gif) => (
              <div key={gif.label} className="space-y-3 content-width">
                <img src={gif.src} alt={gif.label} className="w-full h-auto rounded-xl" />
                <span className="label text-muted-foreground">{gif.label}</span>
              </div>
            ))}
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
