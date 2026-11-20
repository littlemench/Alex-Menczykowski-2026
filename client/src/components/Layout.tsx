import { useEffect } from "react";
import { Link, useLocation } from "wouter";

// Project pages get a background inspired by the project.
// fg is the header colour (dark grey or white, chosen for contrast);
// body copy uses fg at 85% opacity. Main pages stay white.
const DARK_GREY = "#1F1F1F";
const WHITE = "#FFFFFF";

const PAGE_THEMES: { match: string; bg: string; fg: string }[] = [
  { match: "/work/kosign", bg: "#0059FF", fg: WHITE },        // KOSIGN blue
  { match: "/work/platform", bg: "#ACAFFF", fg: DARK_GREY },  // Publishing Data Platform
  { match: "/work/portal", bg: "#CDD07F", fg: DARK_GREY },    // Kobalt Client Portal
  { match: "/work/podium", bg: "#F7F6F6", fg: DARK_GREY },    // Podium Platform (page not built yet)
  { match: "/work/nexus-black", bg: "#000000", fg: WHITE },   // Nexus Black
  { match: "/play/kobalt25", bg: "#000000", fg: WHITE },      // Kobalt25
  { match: "/play/listjockey", bg: "#1F1F1F", fg: WHITE },    // List Jockey charcoal
];

function themeStyle(location: string): React.CSSProperties | undefined {
  const theme = PAGE_THEMES.find((t) => location.startsWith(t.match));
  if (!theme) return undefined;
  const { bg, fg } = theme;
  return {
    "--color-background": bg,
    "--color-foreground": fg,
    "--color-primary": fg,
    "--color-muted-foreground": fg,
    "--color-border": `color-mix(in srgb, ${fg} 25%, transparent)`,
    "--color-divider": `color-mix(in srgb, ${fg} 20%, transparent)`,
    "--page-body": `color-mix(in srgb, ${fg} 85%, transparent)`,
  } as React.CSSProperties;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const style = themeStyle(location);
  const pageBg = PAGE_THEMES.find((t) => location.startsWith(t.match))?.bg ?? "";

  // Match the document background so overscroll doesn't flash white.
  useEffect(() => {
    document.body.style.backgroundColor = pageBg;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [pageBg]);

  return (
    <div style={style} className="min-h-screen bg-background text-foreground font-sans selection:bg-gray-100 selection:text-black flex flex-col pt-0 relative overflow-hidden">

      {/* Top Header - Responsive Title + Nav */}
      <header className="pt-8 px-4 md:px-8 w-full mx-auto flex flex-col md:flex-row justify-between items-start relative z-50">
        {/* Mobile/Tablet Nav - Visible only below md */}
        <nav className="flex md:hidden flex-row gap-6 text-sm font-normal items-center mb-6 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
           <Link href="/">
            <a className={`transition-colors hover:underline ${location === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Home
            </a>
          </Link>
          <Link href="/work">
            <a className={`transition-colors hover:underline ${location.startsWith('/work') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Work
            </a>
          </Link>
          <Link href="/play">
            <a className={`transition-colors hover:underline ${location.startsWith('/play') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Play
            </a>
          </Link>
          <Link href="/links">
            <a className={`transition-colors hover:underline ${location.startsWith('/links') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Links
            </a>
          </Link>
        </nav>

        <div className="z-[70] flex flex-col gap-1 w-full md:w-auto">
          {location === '/' ? (
            <h1 className="m-0 leading-none">Alex Menczykowski</h1>
          ) : location === '/work' ? (
            <h1 className="m-0 leading-none">Work</h1>
          ) : location === '/play' ? (
            <h1 className="m-0 leading-none">Play</h1>
          ) : location === '/links' ? (
            <h1 className="m-0 leading-none">Links</h1>
          ) : location.includes('nexus-black') ? (
            <h1 className="m-0 leading-none">Work / Nexus Black</h1>
          ) : location.includes('/play/kobalt25') ? (
            <h1 className="m-0 leading-none">Kobalt25</h1>
          ) : location.includes('/play/listjockey') ? (
            <h1 className="m-0 leading-none">List Jockey</h1>
          ) : location.includes('/work/platform') ? (
            <h1 className="m-0 leading-none">Publishing Data Platform</h1>
          ) : location.includes('/work/portal') ? (
            <h1 className="m-0 leading-none">Kobalt Client Portal</h1>
          ) : location.startsWith('/work/') ? (
            <h1 className="m-0 leading-none">{location.split('/').pop()?.toUpperCase()}</h1>
          ) : (
            <h1 className="m-0 leading-none">Notes</h1>
          )}
          
        </div>

        {/* Desktop Nav - Visible only md and up */}
        <nav className="hidden md:flex flex-col gap-0.5 text-sm font-normal items-end text-right">
           <Link href="/">
            <a className={`transition-colors hover:underline ${location === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Home
            </a>
          </Link>
          <Link href="/work">
            <a className={`transition-colors hover:underline ${location.startsWith('/work') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Work
            </a>
          </Link>
          <Link href="/play">
            <a className={`transition-colors hover:underline ${location.startsWith('/play') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Play
            </a>
          </Link>
          <Link href="/links">
            <a className={`transition-colors hover:underline ${location.startsWith('/links') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Links
            </a>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-8 md:pt-1">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="py-24 mt-24">
        <div className="layout-grid">
          <span className="text-sm font-medium text-muted-foreground">Alex Menczykowski 2026</span>
        </div>
      </footer>
    </div>
  );
}
