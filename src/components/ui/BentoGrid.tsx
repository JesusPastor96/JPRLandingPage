import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto w-full px-4 py-8 md:py-16",
      className
    )}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  gradient?: string;
}

export function BentoCard({ children, className, delay = 0, id, gradient }: BentoCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -6, 
        transition: { duration: 0.2, ease: "easeOut" } 
      }}
      className={cn(
        "relative rounded-3xl border border-border dark:border-border/65 bg-card/90 dark:bg-card/30 backdrop-blur-xl overflow-hidden p-5 md:p-6 flex flex-col justify-between transition-colors duration-300 hover:border-primary/50 dark:hover:border-primary/40 group shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.03)]",
        className
      )}
    >
      {/* Subtle background color gradient */}
      {gradient && (
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.08] dark:opacity-[0.14] pointer-events-none", gradient)} />
      )}
      
      {/* Light card gradient highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Subtle border highlight for dark mode */}
      <div className="absolute inset-0 border border-transparent group-hover:border-primary/10 rounded-3xl transition-colors duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
