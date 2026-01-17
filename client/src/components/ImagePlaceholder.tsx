import React from "react";

interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  className?: string;
}

export default function ImagePlaceholder({ 
  label = "Image Placeholder", 
  aspectRatio = "video",
  className = "" 
}: ImagePlaceholderProps) {
  
  const ratioClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]"
  }[aspectRatio];

  return (
    <div className={`w-full bg-muted border border-border flex items-center justify-center p-4 ${ratioClass} ${className}`}>
      <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}
