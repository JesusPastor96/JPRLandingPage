import React, { useState, useEffect } from 'react';
import { Film, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function useTranslations() {
  // @ts-ignore
  const [t, setT] = useState<any>(typeof window !== 'undefined' ? window.__LANG_DATA__ : null);
  useEffect(() => {
    const update = () => {
      // @ts-ignore
      setT(window.__LANG_DATA__);
    };
    update();
    window.addEventListener('languageLoaded', update);
    return () => window.removeEventListener('languageLoaded', update);
  }, []);
  
  return (key: string, fallback: string) => {
    if (!t) return fallback;
    const keys = key.split('.');
    const result = keys.reduce((o: any, k: string) => (o || {})[k], t);
    return result || fallback;
  };
}

export default function Interests() {
  const t = useTranslations();
  
  const moviesFallback = [
    {
      title: "Inception (2010)",
      quote: "Construir realidades enteras desde cero mediante ideas sólidas.",
      relation: "Reflejo: Como programar, creamos mundos y lógica de la nada."
    },
    {
      title: "The Matrix (1999)",
      quote: "No intentes doblar la cuchara, eso es imposible. En su lugar, solo intenta darte cuenta de la verdad: no hay cuchara.",
      relation: "Reflejo: Entender el código y la abstracción detrás de lo visual."
    },
    {
      title: "Good Will Hunting (1997)",
      quote: "¿Te gusta el café? ¿Qué tal si resolvemos problemas juntos?",
      relation: "Reflejo: La pasión por desgranar y resolver problemas lógicos complejos."
    },
    {
      title: "Interstellar (2014)",
      quote: "El amor es lo único que somos capaces de percibir que trasciende las dimensiones de tiempo y espacio.",
      relation: "Reflejo: Perseverar ante bugs difíciles, buscando soluciones más allá de lo obvio."
    },
    {
      title: "The Social Network (2010)",
      quote: "Si fuerais los inventores de Facebook, habríais inventado Facebook.",
      relation: "Reflejo: El poder de transformar ideas creativas en código funcional."
    },
    {
      title: "The Truman Show (1998)",
      quote: "Buenos días... y por si no volvemos a vernos: buenos días, buenas tardes y buenas noches.",
      relation: "Reflejo: Salir de la zona de confort y trazar tus propios caminos."
    },
    {
      title: "Whiplash (2014)",
      quote: "No hay dos palabras en el idioma inglés más dañinas que 'buen trabajo'.",
      relation: "Reflejo: La búsqueda constante de la excelencia y pulir cada detalle."
    },
    {
      title: "The Dark Knight (2008)",
      quote: "O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
      relation: "Reflejo: Refactorizar a tiempo: no dejes que tu código limpio se vuelva ilegible."
    },
    {
      title: "Back to the Future (1985)",
      quote: "¿Caminos? A donde vamos, no necesitamos caminos.",
      relation: "Reflejo: Innovar y crear soluciones que abran nuevos horizontes."
    },
    {
      title: "The Lord of the Rings (2001)",
      quote: "Todo lo que tenemos que decidir es qué hacer con el tiempo que se nos da.",
      relation: "Reflejo: Elegir las herramientas adecuadas para dejar un impacto duradero."
    },
    {
      title: "A Beautiful Mind (2001)",
      quote: "He mirado a través de lo físico, lo metafísico, lo ilusorio... y de vuelta.",
      relation: "Reflejo: La resolución constante de problemas lógicos y matemáticos abstractos."
    },
    {
      title: "Spider-Man (2002)",
      quote: "Un gran poder conlleva una gran responsabilidad.",
      relation: "Reflejo: La responsabilidad de gestionar servidores y bases de datos de usuarios."
    },
    {
      title: "Blade Runner (1982)",
      quote: "He visto cosas que vosotros no creeríais...",
      relation: "Reflejo: Enfrentarse a misteriosos bugs en producción que desaparecen al reiniciar."
    },
    {
      title: "Fight Club (1999)",
      quote: "La primera regla del club de la lucha es: no hablar del club de la lucha.",
      relation: "Reflejo: La primera regla del código limpio: debe ser legible sin comentarios redundantes."
    },
    {
      title: "Jurassic Park (1993)",
      quote: "No reparamos en gastos.",
      relation: "Reflejo: Cuando instalas 200MB de librerías npm solo para pedir datos o centrar un div."
    },
    {
      title: "The Lion King (1994)",
      quote: "Hakuna Matata. Significa sin preocupaciones.",
      relation: "Reflejo: Hacer deploy a producción un viernes por la tarde e irte a casa con optimismo."
    },
    {
      title: "Gladiator (2000)",
      quote: "¿No estáis entretenidos? ¿No es por esto por lo que estáis aquí?",
      relation: "Reflejo: Mostrar la demo final al cliente y ver que todo funciona sin fallos."
    },
    {
      title: "The Prestige (2006)",
      quote: "El truco consta de tres partes: la promesa, el giro y el prestigio.",
      relation: "Reflejo: Crear transiciones y micro-animaciones para ocultar llamadas API lentas."
    },
    {
      title: "Pulp Fiction (1994)",
      quote: "Di 'qué' otra vez. Te reto, te reto dos veces.",
      relation: "Reflejo: Cuando el compilador te da el mismo error diez veces seguidas."
    },
    {
      title: "Star Wars (1977)",
      quote: "Que la Fuerza te acompañe.",
      relation: "Reflejo: Que el compilador esté de tu lado y la build en producción no falle a la primera."
    },
    {
      title: "Forrest Gump (1994)",
      quote: "La vida es como una caja de bombones, nunca sabes lo que te va a tocar.",
      relation: "Reflejo: Heredar un repositorio antiguo sin ningún tipo de documentación."
    },
    {
      title: "Arrival (2016)",
      quote: "El lenguaje es la primera arma desenvainada en un conflicto.",
      relation: "Reflejo: Aprender un paradigma de programación completamente nuevo o cambiar de lenguaje."
    }
  ];

  // Try to use translated movies if available, otherwise use fallback
  // @ts-ignore
  const translatedMovies = (typeof window !== 'undefined' && window.__LANG_DATA__ && window.__LANG_DATA__.interests && window.__LANG_DATA__.interests.movies) 
    // @ts-ignore
    ? window.__LANG_DATA__.interests.movies 
    : moviesFallback;

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * translatedMovies.length));
  }, []);

  const getNewRecommendation = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prevIndex) => {
        let nextIndex = Math.floor(Math.random() * translatedMovies.length);
        while (nextIndex === prevIndex) {
          nextIndex = Math.floor(Math.random() * translatedMovies.length);
        }
        return nextIndex;
      });
      setAnimating(false);
    }, 400);
  };

  const currentMovie = translatedMovies[index] || moviesFallback[0];

  return (
    <section className="py-10 border-b border-border/40">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 shrink-0 mb-3 md:mb-0">
          <h3 className="text-xl font-display font-bold text-foreground">{t("interests.title", "Aficiones")}</h3>
        </div>
        <div className="md:w-3/4">
          <div className="mb-6">
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("interests.intro", "Soy un gran apasionado del cine, una afición que no solo me sirve de desconexión, sino que me inspira profundamente en mi día a día como desarrollador. Me fascina encontrar paralelismos entre las grandes historias de la gran pantalla y la lógica del código.")}
            </p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("interests.random", "Inspiración Aleatoria")}</span>
            <button
              onClick={getNewRecommendation}
              className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all active:scale-90 cursor-pointer flex items-center gap-1.5"
              aria-label="View another movie"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${animating ? 'animate-spin' : ''}`} />
              <span className="text-xs font-semibold">{t("interests.change", "Cambiar")}</span>
            </button>
          </div>

          <div className="border-l-2 border-primary/40 pl-4 py-1 min-h-[90px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index + (t("interests.title", "es"))} // force re-render on language change
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Film className="w-4 h-4 text-primary" />
                  {currentMovie.title}
                </h4>
                <p className="text-sm italic text-muted-foreground mt-1.5">"{currentMovie.quote}"</p>
                <p className="text-xs font-semibold text-primary/80 mt-2">{currentMovie.relation}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
