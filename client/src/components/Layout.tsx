import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const COLORS = [
  "rgba(59, 130, 246, 0.15)",   // Blue
  "rgba(139, 92, 246, 0.15)",   // Violet
  "rgba(236, 72, 153, 0.15)",   // Pink
  "rgba(20, 184, 166, 0.15)",   // Teal
  "rgba(245, 158, 11, 0.15)",   // Amber
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [glowColor, setGlowColor] = useState(COLORS[0]);
  const [isGlowing, setIsGlowing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const lastMoveTime = useRef(Date.now());
  const glowTimeout = useRef<NodeJS.Timeout | null>(null);
  const PAUSE_THRESHOLD = 5000; // 5 seconds of inactivity

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    const timeSinceLastMove = now - lastMoveTime.current;
    
    setMousePos({ x: e.clientX, y: e.clientY });

    if (timeSinceLastMove > PAUSE_THRESHOLD && !isGlowing) {
      setGlowColor(prev => {
        const others = COLORS.filter(c => c !== prev);
        return others[Math.floor(Math.random() * others.length)];
      });
      
      setIsGlowing(true);
      
      if (glowTimeout.current) clearTimeout(glowTimeout.current);
      glowTimeout.current = setTimeout(() => {
        setIsGlowing(false);
      }, 1000); // Fades away after 1 second
    }

    lastMoveTime.current = now;
  }, [isGlowing]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (glowTimeout.current) clearTimeout(glowTimeout.current);
    };
  }, [handleMouseMove]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gray-100 selection:text-black flex flex-col pt-0 relative overflow-hidden">
      {/* Radial Glow Effect Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-out"
        style={{ 
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent)`,
          opacity: isGlowing ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }} 
      />
      
      {/* Top Header - Responsive Title + Nav */}
      <header className="pt-8 px-4 md:px-8 w-full mx-auto flex flex-col items-start relative z-50">
        <nav className="flex flex-row gap-6 text-sm font-medium items-center mb-6 w-full">
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
          <div className="flex flex-row gap-6 items-center">
            <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Instagram</a>
            <a href="mailto:alexmenczykowski@gmail.com" className="text-muted-foreground hover:underline">Email</a>
            <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
          </div>
        </nav>

        <div className="z-[70] flex flex-col gap-1 w-full">
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
            <div className="content-width">
              <p className="m-0 max-w-none">
                {location.includes('kosign') 
                  ? "Launching a self-serve publishing platform for mid-market creators"
                  : "Product Design case study"}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-1">
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
