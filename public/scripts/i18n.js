const SUPPORTED_LANGS = ['en','es'];

function getNested(obj, key) {
  return key.split('.').reduce((o, k) => (o || {})[k], obj);
}

window.__LANG_DATA__ = null;

async function loadLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
  try {
    const res = await fetch(`/locales/${lang}.json`);
    const data = await res.json();
    window.__LANG_DATA__ = data;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = getNested(data, key);
      if (text) {
        el.innerHTML = text;
      }
    });
    
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
    
    window.dispatchEvent(new Event('languageLoaded'));
  } catch(e) {
    console.error("Error loading language", e);
  }
}

function initLang() {
  let lang = localStorage.getItem('lang') || navigator.language.slice(0,2);
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
  
  window.changeLanguage = (newLang) => {
    loadLang(newLang);
  };
  
  loadLang(lang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLang);
} else {
  initLang();
}
