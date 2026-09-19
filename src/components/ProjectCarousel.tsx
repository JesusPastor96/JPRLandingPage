import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCarouselProps {
  images?: string[];
  title: string;
  demoUrl?: string | null;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-muted/20 flex flex-col items-center justify-center gap-2 select-none">
        <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
        <span className="text-xs text-muted-foreground/60 font-mono">Sin capturas</span>
      </div>
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectIndex = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="relative group/carousel w-full aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-muted/15 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Captura ${currentIndex + 1} de ${title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full object-contain object-center p-2 select-none"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border/40 bg-background/80 p-1.5 text-foreground/80 shadow-sm backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background hover:text-foreground cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            aria-label="Siguiente imagen"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border/40 bg-background/80 p-1.5 text-foreground/80 shadow-sm backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background hover:text-foreground cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border/30">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => selectIndex(e, idx)}
                aria-label={`Ir a imagen ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === currentIndex ? 'w-4 bg-foreground' : 'w-1 bg-muted-foreground/40 hover:bg-muted-foreground/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
