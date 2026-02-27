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
          <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Instagram</a>
          <a href="mailto:alexmenczykowski@gmail.com" className="text-muted-foreground hover:underline">Email</a>
          <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
        </nav>

        <div className="z-[70] flex flex-col gap-1 w-full md:w-auto">
          {location === '/' ? (
            <h1 className="m-0 leading-none">Alex Menczykowski</h1>
          ) : location === '/work' ? (
            <h1 className="m-0 leading-none">Work</h1>
          ) : location.startsWith('/work/') ? (
            <h1 className="m-0 leading-none">{location.split('/').pop()?.toUpperCase()}</h1>
          ) : (
            <h1 className="m-0 leading-none">Notes</h1>
          )}
          
          {/* Sub-header for project pages */}
          {location.startsWith('/work/') && (
            <div className="content-width md:mt-4">
              <p className="m-0 max-w-none">
                {location.includes('kosign') 
                  ? "Launching a self-serve publishing platform for mid-market creators"
                  : "Product Design case study"}
              </p>
            </div>
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
          <div className="mt-4 flex flex-col gap-0.5 items-end">
            <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Instagram</a>
            <a href="mailto:alexmenczykowski@gmail.com" className="text-muted-foreground hover:underline">Email</a>
            <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-8 md:pt-1">
        {children}
      </main>

      {/* Footer / Social Links */}
      <footer id="contact" className="py-24 mt-24">
        <div className="layout-grid">
           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
              <a href="mailto:alex.menczykowski@gmail.com" className="hover:underline">
                Email
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
}
