import React, { useState } from 'react';
import { Cpu, Server, Layout, Database, Terminal, ShieldCheck, Box, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkillsCard() {
  const [activeTab, setActiveTab] = useState<'dev' | 'ops' | 'soft'>('dev');

  // SVGs for key technologies
  const icons = {
    java: (
      <svg className="w-3.5 h-3.5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
    python: (
      <svg className="w-3.5 h-3.5 shrink-0 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18c.9 0 2 .17 2.66.76 1.77 1.56 1.22 4.72-.07 4.84-1.2.1-2.35.1-3.5 0-2.3-.2-3.07-1-3.07-3.1 0-1.15.51-2.5 4-2.5zm-5 6.47c1.1-.1 2.27-.1 3.38 0 2.28.22 3.06 1.02 3.06 3.12 0 1.15-.53 2.5-4 2.5-.9 0-2-.17-2.66-.75-1.77-1.57-1.22-4.73.07-4.85-1.2-.1-2.35-.1-3.5 0-2.3.2-3.07 1-3.07 3.1 0 1.15.51 2.5 4 2.5zm1-.97a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.75 6.47a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
      </svg>
    ),
    react: (
      <svg className="w-3.5 h-3.5 shrink-0 text-sky-400 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    astro: (
      <svg className="w-3.5 h-3.5 shrink-0 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 18v-8" />
      </svg>
    ),
    tailwind: (
      <svg className="w-3.5 h-3.5 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6.002C12.002 3.41 14.1 2 17.5 2c3.4 0 5.302 2.222 5.302 5.002c0 2.59-2.098 4.002-5.498 4.002h-5.302v-5.002zm-6 6.001C6.001 9.412 8.1 8 11.5 8c3.4 0 5.301 2.221 5.301 5.001c0 2.59-2.097 4.001-5.497 4.001H5.8l.2-5.001z"/>
      </svg>
    ),
    sql: (
      <svg className="w-3.5 h-3.5 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    git: (
      <svg className="w-3.5 h-3.5 shrink-0 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="18" y1="15" x2="6" y2="15" />
        <line x1="6" y1="9" x2="6" y2="15" />
      </svg>
    ),
    github: (
      <svg className="w-3.5 h-3.5 shrink-0 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    uml: (
      <svg className="w-3.5 h-3.5 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <path d="M7 10v4h7" />
      </svg>
    ),
    docker: (
      <svg className="w-3.5 h-3.5 shrink-0 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 8.807h-2.111a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203V9.01a.203.203 0 00-.203-.203zm-2.812-2.812H9.06a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203V6.198a.203.203 0 00-.203-.203zm0 2.812H9.06a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203V9.01a.203.203 0 00-.203-.203zm0 2.816H9.06a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203v-2.118a.203.203 0 00-.203-.203zm-2.812-2.816H6.248a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203V9.01a.203.203 0 00-.203-.203zm0 2.816H6.248a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203v-2.118a.203.203 0 00-.203-.203zm-2.812 0H3.436a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203v-2.118a.203.203 0 00-.203-.203zm11.248 0h-2.111a.203.203 0 00-.203.203v2.118c0 .112.091.203.203.203h2.111a.203.203 0 00.203-.203v-2.118a.203.203 0 00-.203-.203z" />
      </svg>
    )
  };

  const categories = {
    dev: {
      title: "Desarrollo",
      icon: Cpu,
      subsections: [
        {
          name: "Desarrollo Backend",
          icon: Server,
          skills: [
            { name: "Java", icon: icons.java, color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
            { name: "Spring Boot", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
            { name: "Spring Data JPA", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
            { name: "Hibernate", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
            { name: "Python", icon: icons.python, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
            { name: "Django", color: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-600/20" }
          ]
        },
        {
          name: "Desarrollo Frontend",
          icon: Layout,
          skills: [
            { name: "Angular", color: "bg-red-600/10 text-red-700 dark:text-red-400 border-red-600/20" },
            { name: "Angular Material", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
            { name: "React", icon: icons.react, color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
            { name: "Next.js", color: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20" },
            { name: "TypeScript", color: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20" },
            { name: "Tailwind CSS", icon: icons.tailwind, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
            { name: "shadcn/ui", color: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-200 border-zinc-500/20" },
            { name: "Astro", icon: icons.astro, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" }
          ]
        }
      ]
    },
    ops: {
      title: "Sistemas & QA",
      icon: Terminal,
      subsections: [
        {
          name: "Bases de Datos",
          icon: Database,
          skills: [
            { name: "PostgreSQL", color: "bg-cyan-600/10 text-cyan-700 dark:text-cyan-400 border-cyan-600/20" },
            { name: "MySQL", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
            { name: "MongoDB", color: "bg-green-600/10 text-green-700 dark:text-green-400 border-green-600/20" },
            { name: "SQL", icon: icons.sql, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" }
          ]
        },
        {
          name: "DevOps & QA",
          icon: ShieldCheck,
          skills: [
            { name: "Docker", icon: icons.docker, color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
            { name: "Servidores IONOS", color: "bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20" },
            { name: "Apache2", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
            { name: "JUnit", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
            { name: "Vitest", color: "bg-yellow-600/10 text-yellow-700 dark:text-yellow-400 border-yellow-600/20" },
            { name: "Pruebas Unitarias", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
            { name: "Integración", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" }
          ]
        },
        {
          name: "Arquitectura & UML",
          icon: icons.uml,
          skills: [
            { name: "SOLID", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
            { name: "Clean Code", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
            { name: "POO", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
            { name: "Diagramas UML", icon: icons.uml, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" }
          ]
        }
      ]
    },
    soft: {
      title: "Ecosistema",
      icon: Box,
      subsections: [
        {
          name: "Herramientas & CMS",
          icon: Box,
          skills: [
            { name: "Git", icon: icons.git, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
            { name: "GitHub", icon: icons.github, color: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20" },
            { name: "IntelliJ IDEA", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
            { name: "VS Code", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
            { name: "Cursor (IA)", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
            { name: "Slack", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
            { name: "WordPress", color: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20" },
            { name: "TinaCMS", color: "bg-amber-600/10 text-amber-700 dark:text-amber-400 border-amber-600/20" },
            { name: "ERP Odoo", color: "bg-purple-600/10 text-purple-700 dark:text-purple-300 border-purple-600/20" }
          ]
        },
        {
          name: "Aptitudes Profesionales",
          icon: Users,
          skills: [
            { name: "Trabajo en equipo", color: "bg-secondary text-secondary-foreground border-border/80" },
            { name: "Adaptabilidad", color: "bg-secondary text-secondary-foreground border-border/80" },
            { name: "Resolución de problemas", color: "bg-secondary text-secondary-foreground border-border/80" },
            { name: "Gestión de prioridades", color: "bg-secondary text-secondary-foreground border-border/80" }
          ]
        }
      ]
    }
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4 p-0">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold">Habilidades</h3>
          </div>

          {/* Category tabs selector */}
          <div className="flex bg-secondary/80 p-0.5 rounded-lg border border-border/40 text-[11px] sm:text-xs font-bold relative select-none w-full sm:w-auto overflow-x-auto scrollbar-none flex-nowrap shrink-0">
            {Object.entries(categories).map(([key, value]) => {
              const TabIcon = value.icon;
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer relative z-10 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isSelected 
                      ? 'text-foreground font-extrabold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{value.title}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="activeSkillsTabIndicator"
                      className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content with transition */}
        <div className="min-h-[230px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {categories[activeTab].subsections.map((sub, idx) => {
                  const SubIcon = sub.icon;
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground border-b border-border/20 pb-1">
                        {React.isValidElement(SubIcon) ? SubIcon : React.createElement(SubIcon as any, { className: "w-3.5 h-3.5 shrink-0 text-primary" })}
                        <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{sub.name}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {sub.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className={`text-xs md:text-sm font-semibold border px-2.5 py-1 rounded-lg flex items-center gap-1.5 select-none transition-all duration-300 hover:scale-[1.03] ${skill.color}`}
                          >
                            {skill.icon && <span className="shrink-0">{skill.icon}</span>}
                            <span>{skill.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="text-xs text-muted-foreground/80 border-t border-border/50 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 font-semibold">
        <span>Idiomas: Español (Nativo), Inglés (C1)</span>
      </div>
    </div>
  );
}
