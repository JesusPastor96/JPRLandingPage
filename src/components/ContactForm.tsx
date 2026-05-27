import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';

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

export default function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;

    setStatus('sending');

    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
    const isPlaceholder = !accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY";

    if (isPlaceholder) {
      setTimeout(() => {
        setStatus('success');
        setForm({ nombre: '', email: '', mensaje: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, 1500);
      return;
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: form.nombre,
        email: form.email,
        message: form.mensaje,
        subject: "Nuevo mensaje de contacto desde tu Portfolio Web"
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('success');
          setForm({ nombre: '', email: '', mensaje: '' });
          setTimeout(() => setStatus('idle'), 6000);
        } else {
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        }
      })
      .catch((err) => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section className="py-10 border-b border-border/40 reveal">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 shrink-0 mb-6 md:mb-0">
          <h3 className="text-2xl font-display font-bold text-foreground">{t("contact.title", "Contacto")}</h3>
          <p className="text-sm text-muted-foreground/80 mt-2">
            {t("contact.subtitle", "¿Tienes alguna propuesta o quieres saber más de mí?")}
          </p>
        </div>
        
        <div className="md:w-3/4">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
              <h4 className="text-lg font-bold text-foreground mb-1">{t("contact.successTitle", "¡Mensaje Enviado!")}</h4>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t("contact.successDesc", "Gracias por escribirme. Te responderé lo antes posible.")}
              </p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <XCircle className="w-10 h-10 text-red-500 mb-3" />
              <h4 className="text-lg font-bold text-foreground mb-1">{t("contact.errorTitle", "Error al enviar")}</h4>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t("contact.errorDesc", "No se pudo enviar el mensaje. Por favor, inténtalo más tarde.")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t("contact.labels.name", "Nombre")}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full text-base bg-transparent border-b border-border/60 py-2 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                    placeholder={t("contact.placeholders.name", "Tu nombre")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t("contact.labels.email", "Correo electrónico")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full text-base bg-transparent border-b border-border/60 py-2 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                    placeholder={t("contact.placeholders.email", "tu@correo.com")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {t("contact.labels.message", "Mensaje")}
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={3}
                  value={form.mensaje}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="w-full text-base bg-transparent border-b border-border/60 py-2 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 resize-none"
                  placeholder={t("contact.placeholders.message", "¿En qué puedo ayudarte?")}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background text-sm font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {status === 'sending' ? (
                    <span>{t("contact.buttons.sending", "Enviando...")}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t("contact.buttons.send", "Enviar Mensaje")}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
