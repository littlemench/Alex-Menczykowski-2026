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
      
      {/* Top Header - RHS nav only */}
      <header className="pt-12 px-6 md:px-12 w-full mx-auto flex justify-end items-start relative z-50">
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
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Twitter</a>
            <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden p-1 text-foreground z-[60] absolute top-12 right-6"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <nav className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-background md:hidden z-50 w-full h-full">
            <Link href="/">
              <a 
                className={`text-3xl font-google font-bold tracking-tight transition-colors hover:underline ${location === '/' ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
            </Link>
            <Link href="/work">
              <a 
                className={`text-3xl font-google font-bold tracking-tight transition-colors hover:underline ${location.startsWith('/work') ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
            </Link>
            <div className="flex flex-col gap-4 items-center mt-8">
              <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Twitter</a>
              <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-xl text-muted-foreground hover:underline" onClick={() => setIsMobileMenuOpen(false)}>LinkedIn</a>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer / Social Links */}
      <footer id="contact" className="py-24 border-t border-divider mt-24">
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
