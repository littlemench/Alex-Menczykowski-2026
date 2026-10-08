import { Link, useLocation } from "wouter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gray-100 selection:text-black flex flex-col pt-0 relative overflow-hidden">
      
      {/* Top Header - Responsive Title + Nav */}
      <header className="pt-8 px-4 md:px-8 w-full mx-auto flex flex-col md:flex-row justify-between items-start relative z-50">
        {/* Mobile/Tablet Nav - Visible only below md */}
        <nav className="flex md:hidden flex-row gap-6 text-sm font-medium items-center mb-6 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
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
          ) : location.startsWith('/work/') ? (
            <h1 className="m-0 leading-none">{location.split('/').pop()?.toUpperCase()}</h1>
          ) : (
            <h1 className="m-0 leading-none">Notes</h1>
          )}
          
        </div>

        {/* Desktop Nav - Visible only md and up */}
        <nav className="hidden md:flex flex-col gap-0.5 text-sm font-medium items-end text-right">
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
