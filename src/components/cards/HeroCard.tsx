import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function HeroCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full items-center p-0">
      <div className="lg:col-span-3 flex flex-col justify-between h-full gap-4">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3.5 select-none animate-pulse">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Disponible 
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-2">
            Jesús Pastor <span className="text-gradient">Ricoy</span>
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-muted-foreground mb-4">
            Desarrollador Web (Full Stack)  
          </h2>
          <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
            Apasionado de la tecnología y el desarrollo de software, graduado en el grado superior de DAW (Desarrollo de Aplicaciones Web). Me encanta construir soluciones funcionales, aprender nuevas herramientas y resolver problemas de forma eficaz.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3.5 mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/JesusPastor96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-primary/30 dark:border-primary/20 hover:border-primary bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jes%C3%BAs-pastor-ricoy-4658a71a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-primary/30 dark:border-primary/20 hover:border-primary bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:jesus.pastor.ricoy@gmail.com"
              className="flex items-center gap-2.5 px-5 h-11 rounded-full border border-primary/30 dark:border-primary/20 hover:border-primary bg-card/60 text-sm sm:text-base font-extrabold text-muted-foreground hover:text-foreground hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-4.5 h-4.5 shrink-0 text-primary" />
              <span>jesus.pastor.ricoy@gmail.com</span>
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-border/20 px-3.5 py-2.5 rounded-xl border border-border/40 font-bold select-none">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>Pamplona (Navarra) </span>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-2 flex justify-center items-center relative mt-4 lg:mt-0">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-border bg-border/10 shadow-xl group-hover:border-primary/45 transition-all duration-500">
          <img
            src="/img/Imagen1.png"
            alt="Jesús Pastor Ricoy"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-3xl filter blur-2xl scale-90 pointer-events-none -z-10 animate-pulse-slow"></div>
      </div>
    </div>
  );
}
