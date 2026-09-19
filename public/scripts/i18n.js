const SUPPORTED_LANGS = ['en', 'es'];
const langCache = {};

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

async function fetchLangData(lang) {
  if (langCache[lang]) return langCache[lang];
  try {
    const res = await fetch(`/locales/${lang}.json`);
    const data = await res.json();
    langCache[lang] = data;
    return data;
  } catch(e) {
    console.error("Error loading language", e);
    return null;
  }
}

async function loadLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
  const data = await fetchLangData(lang);
  if (!data) return;
  
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
}

function initLang() {
  let lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
  
  let isChanging = false;
  window.changeLanguage = async (newLang) => {
    if (isChanging) return;
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    if (document.documentElement.getAttribute('data-lang') === newLang) return;
    
    isChanging = true;
    document.body.classList.add('lang-changing');
    
    try {
      await new Promise(r => setTimeout(r, 160));
      await loadLang(newLang);
      await new Promise(r => setTimeout(r, 60));
    } finally {
      document.body.classList.remove('lang-changing');
      isChanging = false;
    }
  };
  
  loadLang(lang).then(() => {
    const otherLang = lang === 'es' ? 'en' : 'es';
    fetchLangData(otherLang);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLang);
} else {
  initLang();
}
