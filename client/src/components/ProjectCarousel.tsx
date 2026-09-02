import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowsOut, X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface Slide {
  id: string;
  title: string;
  description: string;
  src: string;
  fullscreenSrc: string;
}

interface ProjectCarouselProps {
  slides: Slide[];
}

export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setCurrent(index);
  };

  const next = () => scrollTo(Math.min(current + 1, slides.length - 1));
  const prev = () => scrollTo(Math.max(current - 1, 0));

  const fsNext = () => setFullscreen((i) => (i !== null ? Math.min(i + 1, slides.length - 1) : null));
  const fsPrev = () => setFullscreen((i) => (i !== null ? Math.max(i - 1, 0) : null));

  useEffect(() => {
    if (fullscreen === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(null);
      if (e.key === "ArrowRight") fsNext();
      if (e.key === "ArrowLeft") fsPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const fsSlide = fullscreen !== null ? slides[fullscreen] : null;

  return (
    <>
      <div className="relative group">
        <div ref={trackRef} className="flex gap-4 overflow-x-hidden">
          {slides.map((slide, i) => (
            <div key={slide.id} className="min-w-full lg:min-w-[50%] flex-shrink-0 relative group/slide">
              <img
                src={slide.src}
                alt={slide.title || slide.id}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <button
                onClick={() => setFullscreen(i)}
                className="absolute top-3 right-3 p-1.5 bg-background/70 rounded-md opacity-0 group-hover/slide:opacity-100 transition-opacity"
                aria-label="Fullscreen"
              >
                <ArrowsOut size={16} />
              </button>
            </div>
          ))}
        </div>

        {current > 0 && (
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {current < slides.length - 1 && (
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {(slides[current].title || slides[current].description) && (
          <div className="mt-4 space-y-1 transition-all duration-300">
            {slides[current].title && (
              <p className="font-medium">{slides[current].title}</p>
            )}
            {slides[current].description && (
              <p className="text-muted-foreground">{slides[current].description}</p>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {fullscreen !== null && fsSlide && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setFullscreen(null)}
        >
          <button
            onClick={() => setFullscreen(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {fullscreen > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); fsPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          <img
            src={fsSlide.fullscreenSrc}
            alt={fsSlide.title || fsSlide.id}
            className="aspect-video object-cover landscape:h-screen landscape:w-auto portrait:w-screen portrait:h-auto max-w-[1728px]"
            onClick={(e) => e.stopPropagation()}
          />

          {fullscreen < slides.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); fsNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={24} />
            </button>
          )}

          {(fsSlide.title || fsSlide.description) && (
            <div
              className="absolute bottom-8 left-8 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              {fsSlide.title && (
                <p className="text-white font-medium">{fsSlide.title}</p>
              )}
              {fsSlide.description && (
                <p className="text-white/60 text-sm">{fsSlide.description}</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
