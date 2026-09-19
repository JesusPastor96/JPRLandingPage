const SUPPORTED_LANGS = ['en','es'];

function getNested(obj, key) {
  return key.split('.').reduce((o, k) => (o || {})[k], obj);
}

function sanitizeHtml(dirty) {
  if (typeof dirty !== 'string') return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(dirty, 'text/html');
  const allowedTags = new Set(['STRONG', 'EM', 'B', 'I', 'SPAN', 'BR', 'P']);
  
  function clean(node) {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (!allowedTags.has(child.tagName)) {
          const textNode = document.createTextNode(child.textContent || '');
          node.replaceChild(textNode, child);
        } else {
          while (child.attributes.length > 0) {
            child.removeAttribute(child.attributes[0].name);
          }
          clean(child);
        }
      }
    }
  }
  
  clean(doc.body);
  return doc.body.innerHTML;
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
      if (text && typeof text === 'string') {
        el.innerHTML = sanitizeHtml(text);
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
