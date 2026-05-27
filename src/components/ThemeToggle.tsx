import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-border bg-card/40 text-foreground hover:bg-accent/60 hover:text-accent-foreground hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-sm relative overflow-hidden flex items-center justify-center"
      aria-label="Alternar tema"
    >
      <span className="sr-only">Cambiar de tema</span>
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-spin-slow transition-all duration-500 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-violet-600 transition-all duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}
