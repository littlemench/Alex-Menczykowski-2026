import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gray-100 selection:text-black flex flex-col pt-12">
      {/* Top Header - RHS nav only */}
      <header className="mb-12 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex justify-end items-start relative">
        <nav className="flex flex-col gap-1 text-sm font-medium items-end text-right">
           <Link href="/">
            <a className={`transition-colors hover:underline ${location === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Work
            </a>
          </Link>
          <Link href="/notes">
            <a className="text-muted-foreground hover:underline">
              Notes
            </a>
          </Link>
          <div className="mt-4 flex flex-col gap-1 items-end">
            <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Twitter</a>
            <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden p-1 text-foreground z-50 absolute top-0 right-6"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <nav className="absolute top-0 right-0 pt-16 pr-6 flex flex-col gap-4 text-right bg-background md:hidden z-40 w-full items-end pb-8">
            <Link href="/">
              <a 
                className={`text-xl font-medium transition-colors hover:underline ${location === '/' ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
            </Link>
            <Link href="/notes">
              <a 
                className="text-xl font-medium text-muted-foreground hover:underline cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notes
              </a>
            </Link>
            <div className="flex flex-col gap-2 items-end mt-4">
              <a href="https://instagram.com/alex.mench/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">Twitter</a>
              <a href="https://www.linkedin.com/in/alexmenczykowski/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline">LinkedIn</a>
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
