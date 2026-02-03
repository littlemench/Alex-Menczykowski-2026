import { useState, useEffect } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  description: string;
  imageLabel: string;
}

interface ProjectCarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
}

export default function ProjectCarousel({ slides, autoPlay = true }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="space-y-8 content-width">
      <div className="relative group">
        <div className="border border-border p-2 overflow-hidden bg-white">
          <div 
            className="transition-transform duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                <ImagePlaceholder label={slide.imageLabel} aspectRatio="video" />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-white/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="lg:w-1/2 transition-all duration-300">
        <h3 className="text-[22px] font-medium mb-2">{slides[current].title}</h3>
        <p className="text-[18px] text-primary">{slides[current].description}</p>
      </div>
      
      <div className="flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 w-8 transition-colors ${i === current ? 'bg-primary' : 'bg-border'}`}
          />
        ))}
      </div>
    </div>
  );
}
