import React, { useState, useEffect } from 'react';
import { Film, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinemaCard() {
  const movies = [
    {
      title: "Inception",
      year: "2010",
      quote: "Construir realidades enteras desde cero mediante ideas sólidas.",
      relation: "Como programar: creamos mundos y lógica de la nada."
    },
    {
      title: "The Matrix",
      year: "1999",
      quote: "No trates de doblar la cuchara; eso es imposible. En lugar de eso, solo intenta darte cuenta de la verdad: no hay cuchara.",
      relation: "Entender el código y la abstracción detrás de lo visual."
    },
    {
      title: "Good Will Hunting",
      year: "1997",
      quote: "¿Te gusta el café? ¿Qué tal si resolvemos problemas juntos?",
      relation: "La pasión por desarmar y solucionar problemas lógicos complejos."
    },
    {
      title: "Interstellar",
      year: "2014",
      quote: "El amor es lo único que somos capaces de percibir que trasciende las dimensiones del tiempo y del espacio.",
      relation: "Perseverar ante problemas difíciles, buscando soluciones más allá de lo obvio."
    },
    {
      title: "The Social Network",
      year: "2010",
      quote: "Si fuerais los inventores de Facebook, habríais inventado Facebook.",
      relation: "El poder de transformar ideas creativas en código funcional."
    },
    {
      title: "The Truman Show",
      year: "1998",
      quote: "Buenos días... y por si no volvemos a vernos: buenos días, buenas tardes y buenas noches.",
      relation: "Salir de la zona de confort y crear tus propios caminos."
    },
    {
      title: "Whiplash",
      year: "2014",
      quote: "No hay dos palabras más dañinas en nuestro idioma que 'buen trabajo'.",
      relation: "La búsqueda constante de la excelencia y pulir cada detalle."
    },
    {
      title: "The Dark Knight",
      year: "2008",
      quote: "O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
      relation: "Refactorizar a tiempo: no dejes que tu código limpio se vuelva incomprensible."
    },
    {
      title: "Back to the Future",
      year: "1985",
      quote: "¿Caminos? A donde vamos no necesitamos caminos.",
      relation: "Innovar y crear soluciones que abran nuevos horizontes."
    },
    {
      title: "The Lord of the Rings",
      year: "2001",
      quote: "Solo tú puedes decidir qué hacer con el tiempo que se te ha dado.",
      relation: "Elegir las herramientas adecuadas para dejar un impacto duradero."
    },
    {
      title: "A Beautiful Mind",
      year: "2001",
      quote: "He buscado a través de lo físico, lo metafísico, lo delirante... y he regresado.",
      relation: "La resolución constante de problemas lógicos y matemáticos abstractos."
    },
    {
      title: "Spider-Man",
      year: "2002",
      quote: "Un gran poder conlleva una gran responsabilidad.",
      relation: "La responsabilidad al gestionar servidores y bases de datos de usuarios."
    },
    {
      title: "Blade Runner",
      year: "1982",
      quote: "Yo he visto cosas que vosotros no creeríais...",
      relation: "Enfrentarse a bugs misteriosos de producción que desaparecen al reiniciar."
    },
    {
      title: "Fight Club",
      year: "1999",
      quote: "La primera regla del Club de la Lucha es: no hablar del Club de la Lucha.",
      relation: "La primera regla del código limpio: que sea legible por sí mismo sin comentarios redundantes."
    },
    {
      title: "Jurassic Park",
      year: "1993",
      quote: "No hemos reparado en gastos.",
      relation: "Cuando instalas 200MB de librerías npm para hacer un fetch o centrar un div."
    },
    {
      title: "The Lion King",
      year: "1994",
      quote: "Hakuna Matata. Significa no te preocupes.",
      relation: "Hacer push a producción un viernes a última hora y salir de la oficina con optimismo."
    },
    {
      title: "Gladiator",
      year: "2000",
      quote: "¿No os habéis divertido? ¿No habéis venido a eso?",
      relation: "Mostrarle la demo del producto final al cliente y ver que todo funciona al primer intento."
    },
    {
      title: "The Prestige",
      year: "2006",
      quote: "El truco consta de tres partes: la presentación, el giro y el prestigio.",
      relation: "Crear transiciones y micro-animaciones fluidas en la UI para disimular llamadas lentas a la API."
    },
    {
      title: "Pulp Fiction",
      year: "1994",
      quote: "Di 'qué' una vez más. Te reto, te reto doblemente.",
      relation: "Cuando un compilador te muestra exactamente el mismo error por décima vez consecutiva."
    },
    {
      title: "Star Wars",
      year: "1977",
      quote: "Que la Fuerza te acompañe.",
      relation: "Que el compilador esté de tu parte y el build de producción no falle en el primer intento."
    },
    {
      title: "Forrest Gump",
      year: "1994",
      quote: "La vida es como una caja de bombones, nunca sabes lo que te va a tocar.",
      relation: "Hacerse cargo de un repositorio heredado (legacy) sin ningún tipo de documentación."
    },
    {
      title: "Arrival",
      year: "2016",
      quote: "La lengua es la primera arma que se saca en una guerra.",
      relation: "Aprender un paradigma de programación completamente nuevo o cambiar de lenguaje."
    }
  ];

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Randomize initial movie on mount to prevent seeing the same one first
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setIndex(randomIndex);
  }, []);

  // Auto-play interval that pauses when hovered
  useEffect(() => {
    if (isHovered || animating) return;

    const interval = setInterval(() => {
      getNewRecommendation();
    }, 12000); // Auto-rotates every 12 seconds

    return () => clearInterval(interval);
  }, [isHovered, animating]);

  const getNewRecommendation = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prevIndex) => {
        let nextIndex = Math.floor(Math.random() * movies.length);
        while (nextIndex === prevIndex) {
          nextIndex = Math.floor(Math.random() * movies.length);
        }
        return nextIndex;
      });
      setAnimating(false);
    }, 400);
  };

  return (
    <div 
      className="flex flex-col justify-between h-full gap-4 p-0 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold">Cine & Palomitas</h3>
          </div>
          <button
            onClick={getNewRecommendation}
            className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-all active:scale-90 cursor-pointer"
            aria-label="Recomendar otra película"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${animating ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="bg-secondary/40 border border-border/60 rounded-2xl p-4 min-h-[150px] flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-foreground">{movies[index].title}</h4>
                <span className="text-xs text-muted-foreground font-semibold">{movies[index].year}</span>
              </div>
              <p className="text-sm italic text-muted-foreground/90 leading-relaxed">
                "{movies[index].quote}"
              </p>
              <div className="text-xs text-primary/95 font-bold pt-2 border-t border-border/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{movies[index].relation}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1.5">
        
        {isHovered && (
          <span className="text-[10px] text-primary/60 font-semibold italic border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded animate-pulse">
            Pausado
          </span>
        )}
      </div>
    </div>
  );
}
