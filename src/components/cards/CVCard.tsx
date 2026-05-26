import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CVCard() {
  const [activeTab, setActiveTab] = useState<'edu' | 'exp'>('edu');

  const education = [
    {
      title: "G.S. Desarrollo de Aplicaciones Web (DAW)",
      institution: "UNIR - Universidad Internacional de La Rioja",
      period: "2024 - 2026 (Graduado)",
      description: "Estudio de diseño y desarrollo de páginas web, configuración de bases de datos, frameworks de frontend, frameworks de backend y desarrollo de aplicaciones."
    },
    {
      title: "G.S. Administración y Finanzas",
      institution: "IES Los Viveros",
      period: "En curso (Pendiente Prácticas)",
      description: "Gestión contable, fiscalidad, tesorería, documentación financiera y recursos humanos."
    }
  ];

  const experience = [
    {
      role: "Desarrollador web en prácticas",
      company: "Biodatup, Pamplona",
      period: "Enero 2026 - Abril 2026",
      description: "Desarrollador Full-Stack en prácticas participando en la plataforma de ensayos clínicos mediante el desarrollo de APIs en Django, interfaces en React y gestión de bases de datos relacionales SQL."
    },
    {
      role: "Responsable de almacén y distribución",
      company: "Headlane Ltd., Londres",
      period: "2020 – 2025",
      description: "Organización y recepción de mercancía, control de inventario, clasificación de piezas de tecnología móvil, embalaje y soporte al almacén."
    },
    {
      role: "Team Leader",
      company: "Vital Ingredient, Londres",
      period: "2018 – 2020",
      description: "Atención al cliente, liderazgo de equipo, organización de tareas, pedidos, contacto con proveedores, control de stock y producción siguiendo procesos guiados."
    },
    {
      role: "Asistente de Gerente",
      company: "Infopapel, Cádiz",
      period: "2015 – 2018",
      description: "Control de stock, gestión de pedidos, atención a clientes, facturación, entregas, asesoramiento en toma decisiones y conocimiento de productos informáticos y oficina."
    }
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-4 p-0">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold">Trayectoria</h3>
          </div>
          
          <div className="flex bg-secondary/80 p-0.5 rounded-lg border border-border/40 text-xs font-bold relative select-none w-full sm:w-auto overflow-x-auto scrollbar-none flex-nowrap shrink-0">
            <button
              onClick={() => setActiveTab('edu')}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer relative z-10 ${
                activeTab === 'edu' 
                  ? 'text-foreground font-extrabold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Estudios
              {activeTab === 'edu' && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('exp')}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer relative z-10 ${
                activeTab === 'exp' 
                  ? 'text-foreground font-extrabold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Experiencia
              {activeTab === 'exp' && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab content with transition */}
        <div className="min-h-[220px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'edu' ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'edu' ? 15 : -15 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-4"
            >
              {activeTab === 'edu' ? (
                education.map((edu, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0 w-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(139,92,246,0.7)]"></div>
                      {idx < education.length - 1 && <div className="w-0.5 flex-grow bg-border dark:bg-border/40 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-3 mb-0.5">
                        <h4 className="text-base font-bold text-foreground leading-tight">{edu.title}</h4>
                        <span className="text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">{edu.period}</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground font-semibold mb-0.5">{edu.institution}</p>
                      <p className="text-xs md:text-sm text-muted-foreground/85 leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                experience.map((exp, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0 w-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(139,92,246,0.7)]"></div>
                      {idx < experience.length - 1 && <div className="w-0.5 flex-grow bg-border dark:bg-border/40 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-3 mb-0.5">
                        <h4 className="text-base font-bold text-foreground leading-tight">{exp.role}</h4>
                        <span className="text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">{exp.period}</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground font-semibold mb-0.5">{exp.company}</p>
                      <p className="text-xs md:text-sm text-muted-foreground/85 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground/80 flex items-center justify-between border-t border-border/50 pt-3 font-semibold">
        <span>Idiomas: Español (Nativo), Inglés (C1 - Avanzado)</span>
      </div>
    </div>
  );
}
