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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gray-100 selection:text-black flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-transparent transition-all duration-300">
        <div className="layout-grid h-20 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-medium tracking-tight hover:text-secondary transition-colors z-50 relative">
              Alex
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-base font-medium text-muted-foreground">
            <Link href="/">
              <a className={`transition-colors hover:text-foreground ${location === '/' ? 'text-foreground' : ''}`}>
                Home
              </a>
            </Link>
            <Link href="/work">
              <a className={`transition-colors hover:text-foreground ${location.startsWith('/work') ? 'text-foreground' : ''}`}>
                Work
              </a>
            </Link>
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="cursor-pointer transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 relative p-2 -mr-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Nav Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-background z-40 flex flex-col pt-32 px-6 md:hidden">
              <nav className="flex flex-col gap-8 text-2xl font-medium text-muted-foreground">
                <Link href="/">
                  <a 
                    className={`transition-colors hover:text-foreground ${location === '/' ? 'text-foreground' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/work">
                  <a 
                    className={`transition-colors hover:text-foreground ${location.startsWith('/work') ? 'text-foreground' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Work
                  </a>
                </Link>
                <a 
                  href="#contact" 
                  onClick={scrollToContact}
                  className="cursor-pointer transition-colors hover:text-foreground"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Shared Contact Section */}
      <footer id="contact" className="py-24 md:py-32 border-t border-border mt-auto">
        <div className="layout-grid">
          <div className="max-w-2xl">
            <h2 className="mb-8 md:mb-12">Get in touch</h2>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-lg md:text-xl">
              <a href="mailto:alex@example.com" className="hover:text-muted-foreground transition-colors underline decoration-border underline-offset-4 hover:decoration-muted-foreground">
                Email Alex
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors underline decoration-border underline-offset-4 hover:decoration-muted-foreground">
                DM on Instagram
              </a>
              <a href="/assets/cv.pdf" className="hover:text-muted-foreground transition-colors underline decoration-border underline-offset-4 hover:decoration-muted-foreground">
                Download CV
              </a>
            </div>
            
            <p className="mt-24 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alex. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
