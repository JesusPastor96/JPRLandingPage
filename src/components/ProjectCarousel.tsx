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
      <div className="relative h-full min-h-[160px] sm:min-h-[180px] w-full flex-1 overflow-hidden rounded-xl border border-dashed border-slate-300 dark:border-border/40 bg-slate-100/60 dark:bg-slate-950/40 flex flex-col items-center justify-center gap-2 p-4 select-none">
        <ImageIcon className="w-8 h-8 text-slate-400 dark:text-muted-foreground/30" />
        <span className="text-xs text-slate-500 dark:text-muted-foreground/50 font-medium">Captura próximamente</span>
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
    <div className="relative group/carousel h-full w-full flex-1 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-transparent shadow-sm flex flex-col">
      {/* Container with contain alignment */}
      <div className="relative h-full min-h-[200px] w-full flex-1 overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-1">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Captura ${currentIndex + 1} de ${title}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-full w-full object-contain object-center rounded-lg select-none"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-200 dark:border-border/50 bg-white/90 dark:bg-background/80 p-2 text-slate-800 dark:text-foreground shadow-md backdrop-blur-md transition-all hover:bg-white dark:hover:bg-background hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Siguiente imagen"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-200 dark:border-border/50 bg-white/90 dark:bg-background/80 p-2 text-slate-800 dark:text-foreground shadow-md backdrop-blur-md transition-all hover:bg-white dark:hover:bg-background hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Carousel Indicators / Dots */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-slate-900/70 dark:bg-slate-950/60 px-3 py-1.5 backdrop-blur-md">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => selectIndex(e, idx)}
                  aria-label={`Ir a imagen ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-5 bg-primary'
                      : 'w-2 bg-slate-400/50 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCarousel;
