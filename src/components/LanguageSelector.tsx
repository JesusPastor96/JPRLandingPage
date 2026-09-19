import React, { useState, useEffect } from 'react';

export default function LanguageSelector() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'es' | 'en';
    const domLang = document.documentElement.getAttribute('data-lang') as 'es' | 'en';
    
    if (savedLang && ['es', 'en'].includes(savedLang)) {
      setLang(savedLang);
    } else if (domLang) {
      setLang(domLang);
    }

    const handleLangLoaded = () => {
      const updated = document.documentElement.getAttribute('data-lang') as 'es' | 'en';
      if (updated) setLang(updated);
    };
    window.addEventListener('languageLoaded', handleLangLoaded);

    return () => {
      window.removeEventListener('languageLoaded', handleLangLoaded);
    };
  }, []);

  const changeLang = (newLang: 'es' | 'en') => {
    if (lang === newLang) return;
    setLang(newLang);
    if (typeof window !== 'undefined' && (window as any).changeLanguage) {
      (window as any).changeLanguage(newLang);
    }
  };

  return (
    <div className="flex items-center gap-1 font-mono text-xs select-none tracking-wider">
      <button
        type="button"
        onClick={() => changeLang('es')}
        className={`px-1 py-0.5 transition-colors cursor-pointer border-none bg-transparent outline-none focus:outline-none focus-visible:outline-none ${
          lang === 'es'
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground/45 hover:text-foreground'
        }`}
        aria-label="Español"
      >
        ES
      </button>
      <span className="text-border text-[11px] font-light select-none">/</span>
      <button
        type="button"
        onClick={() => changeLang('en')}
        className={`px-1 py-0.5 transition-colors cursor-pointer border-none bg-transparent outline-none focus:outline-none focus-visible:outline-none ${
          lang === 'en'
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground/45 hover:text-foreground'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
