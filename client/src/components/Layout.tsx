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
      {/* Top Header - mimicking jennywen.ca nav style */}
      <header className="mb-24">
        <div className="layout-grid flex items-center justify-end">
          <nav className="flex gap-8 text-sm font-medium">
             <Link href="/">
              <a className={`transition-colors hover:underline ${location === '/' ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                Home
              </a>
            </Link>
            <Link href="/work">
              <a className={`transition-colors hover:underline ${location.startsWith('/work') ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                Work
              </a>
            </Link>
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="text-muted-foreground hover:underline cursor-pointer"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer / Social Links */}
      <footer id="contact" className="py-24 border-t border-divider mt-24">
        <div className="layout-grid">
           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <Link href="/">
                <a className="hover:underline">Work</a>
              </Link>
              <Link href="/notes">
                <a className="hover:underline">Notes</a>
              </Link>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
}
