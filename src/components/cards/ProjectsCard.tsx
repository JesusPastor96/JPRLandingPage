import React, { useState } from 'react';
import { Briefcase, Github, X, Terminal, Code2, ShieldAlert, MonitorPlay } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProjectsCard() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "ProyectoJava",
      repoName: "ProyectoJava",
      shortDesc: "Aplicación Java SE con JDBC y persistencia de ficheros para gestionar relaciones con clientes en consola.",
      icon: Terminal,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-500 border-blue-500/30 dark:border-blue-500/20",
      github: "https://github.com/JesusPastor96/ProyectoJava",
      demo: null,
      tech: [
        { name: "Java", color: "bg-red-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "JDBC", color: "bg-blue-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "SQL", color: "bg-emerald-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" }
      ],
      longDesc: "Un sistema desarrollado en consola para la gestión de relaciones con clientes. Utiliza JDBC para la comunicación con base de datos relacionales, implementando operaciones CRUD y manejo de excepciones, además de respaldo en ficheros planos para persistencia local de seguridad."
    },
    {
      id: 2,
      title: "LandingPage",
      repoName: "LandingPage",
      shortDesc: "Diseño y maquetación de una web personal responsiva desarrollada con HTML5 y CSS3.",
      icon: Code2,
      color: "from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-500/30 dark:border-purple-500/20",
      github: "https://github.com/JesusPastor96/LandingPage",
      demo: "https://jesuspastor96.github.io/JPRLandingPage",
      tech: [
        { name: "HTML", color: "bg-orange-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "CSS", color: "bg-blue-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "GitHub", color: "bg-zinc-800 text-white font-bold rounded-full px-2.5 py-1 text-xs" }
      ],
      longDesc: "Diseño y maquetación de una web personal completa con páginas interconectadas para Currículum Vitae, Quién soy, Proyectos y Contacto. Totalmente optimizada para visualización móvil y de tablets mediante media queries personalizadas."
    },
    {
      id: 3,
      title: "eSports Tournament",
      repoName: "Actividad3-JesusPastorRicoy",
      shortDesc: "Diseño de arquitectura de software y diagramas de clases UML con patrón de diseño MVC.",
      icon: ShieldAlert,
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30 dark:border-amber-500/20",
      github: "https://github.com/JesusPastor96/Actividad3-JesusPastorRicoy",
      demo: null,
      tech: [
        { name: "UML", color: "bg-indigo-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "MVC", color: "bg-purple-500 text-white font-bold rounded-full px-2.5 py-1 text-xs" },
        { name: "GitHub", color: "bg-zinc-800 text-white font-bold rounded-full px-2.5 py-1 text-xs" }
      ],
      longDesc: "Un análisis arquitectónico exhaustivo para una plataforma de torneos de videojuegos de competición. Incluye diagramas de clases, diagramas de casos de uso y la especificación detallada del flujo de control aplicando el patrón de diseño Modelo-Vista-Controlador."
    }
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-4 relative p-0">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold">Proyectos Destacados</h3>
        </div>

        {/* Dynamic responsive grid that handles future projects wrapping gracefully */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(idx)}
                className="group/item flex flex-col justify-between p-5 rounded-3xl border border-border bg-card/65 dark:bg-card/20 hover:bg-card/90 hover:border-primary/45 transition-all duration-300 cursor-pointer text-left hover:scale-[1.01] hover:shadow-lg"
              >
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1.5 group-hover/item:text-primary transition-colors">
                    {project.title}
                  </h4>

                  {/* Simulated GitHub Card Mockup */}
                  <div className="bg-white text-black dark:bg-zinc-950/85 dark:text-zinc-200 border border-border/90 dark:border-border/50 rounded-xl p-4 my-3 flex justify-between items-center shadow-md select-none">
                    <div className="flex-1 pr-3 overflow-hidden">
                      <div className="font-mono text-sm md:text-base font-bold text-zinc-800 dark:text-zinc-200 truncate">
                        JesusPastor96/<span className="text-primary font-bold">{project.repoName}</span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
                        {project.shortDesc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-zinc-400 dark:text-zinc-500 mt-2.5 font-bold">
                        <span className="flex items-center gap-1">👤 1</span>
                        <span className="flex items-center gap-1">⭐ 0</span>
                        <span className="flex items-center gap-1">🍴 0</span>
                      </div>
                    </div>
                    <div className="relative shrink-0 ml-1.5">
                      <img 
                        src="/img/Imagen1.png" 
                        alt="Avatar" 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-border/70 shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-1 border border-border/60 shadow-sm flex items-center justify-center">
                        <Github className="w-4 h-4 md:w-4.5 h-4.5 text-zinc-700 dark:text-zinc-300" />
                      </div>
                    </div>
                  </div>

                  {/* Tech Tags Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5 select-none">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`shadow-sm select-none scale-100 ${t.color}`}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-4">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MonitorPlay className="w-4 h-4 text-primary" />
                      <span>Ver demo</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground/40 select-none">
                      <MonitorPlay className="w-4 h-4" />
                      <span>Ver demo</span>
                    </span>
                  )}
                  
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4 text-primary" />
                    <span>Ver en GitHub</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal using Framer Motion */}
      <AnimatePresence>
        {typeof selectedProject === 'number' && projects[selectedProject] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-border bg-card p-5 md:p-6 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${projects[selectedProject].color} border`}>
                  {React.createElement(projects[selectedProject].icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold leading-tight text-foreground">
                    {projects[selectedProject].title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-semibold">Proyecto Académico / Personal</span>
                </div>
              </div>

              <p className="text-base text-muted-foreground/95 leading-relaxed mb-5">
                {projects[selectedProject].longDesc}
              </p>

              <div className="mb-5">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tecnologías Utilizadas</h4>
                <div className="flex flex-wrap gap-1.5">
                  {projects[selectedProject].tech.map((t, i) => (
                    <span key={i} className={`shadow-sm select-none ${t.color}`}>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <a
                  href={projects[selectedProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-base font-bold transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <Github className="w-4.5 h-4.5" />
                  Ver Repositorio
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
