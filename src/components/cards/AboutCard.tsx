import React from 'react';
import { User, Sparkles } from 'lucide-react';

export default function AboutCard() {
  return (
    <div className="flex flex-col justify-between h-full gap-4 p-0">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold">Sobre Mí & Historia</h3>
        </div>
        
        <div className="space-y-3.5 text-base text-muted-foreground/90 leading-relaxed">
          <p>
            Nací en 1996 en Cádiz. Desde pequeño he sentido una gran curiosidad por el mundo digital, la tecnología y el cine, afición que me inspira a imaginar y crear.
          </p>
          <p>
            En 2018 me mudé a Londres. Esta etapa ha sido clave para mi crecimiento personal, ayudándome a afrontar retos y a dominar el inglés trabajando en logística y liderazgo.
          </p>
          <p>
            En agosto de 2025 me trasladé a Pamplona con mi esposa y su familia, donde resido actualmente e inicié mi carrera profesional en el sector tecnológico.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-primary font-bold border-t border-border/40 pt-3 mt-1.5">
        <Sparkles className="w-4 h-4 text-primary animate-pulse shrink-0" />
        <span>Enfocado en el aprendizaje continuo y el trabajo en equipo.</span>
      </div>
    </div>
  );
}
