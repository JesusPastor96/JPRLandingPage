import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LanguageSelector({ currentLang: initialLang }: { currentLang?: 'es' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize from DOM or localStorage on mount
    const current = document.documentElement.getAttribute('data-lang') as 'es' | 'en';
    if (current) setLang(current);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLang = (newLang: 'es' | 'en') => {
    setLang(newLang);
    setIsOpen(false);
    
    // Call the global function from i18n.js
    if (typeof window !== 'undefined' && (window as any).changeLanguage) {
      (window as any).changeLanguage(newLang);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {lang === 'es' ? 'Español' : 'English'}
        <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 rounded-md border border-border/40 bg-background/95 backdrop-blur-md shadow-lg overflow-hidden z-50">
          <div className="flex flex-col py-1">
            <button 
              onClick={() => changeLang('es')}
              className={`text-left px-4 py-2 text-sm hover:bg-secondary/80 transition-colors ${lang === 'es' ? 'font-bold text-primary bg-secondary/30' : 'text-foreground'}`}
            >
              Español
            </button>
            <button 
              onClick={() => changeLang('en')}
              className={`text-left px-4 py-2 text-sm hover:bg-secondary/80 transition-colors ${lang === 'en' ? 'font-bold text-primary bg-secondary/30' : 'text-foreground'}`}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
