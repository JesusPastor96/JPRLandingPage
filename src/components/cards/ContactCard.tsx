import React, { useState } from 'react';
import { Send, CheckCircle, Mail, XCircle } from 'lucide-react';

export default function ContactCard() {
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
      console.warn("Web3Forms Access Key is not configured. Simulating submission success.");
      // Simulate success for local testing without key
      setTimeout(() => {
        setStatus('success');
        setForm({ nombre: '', email: '', mensaje: '' });
        // Reset back to normal after some time
        setTimeout(() => setStatus('idle'), 5000);
      }, 1500);
      return;
    }

    // Real API Request to Web3Forms
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
          console.error("Web3Forms error:", data);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        }
      })
      .catch((err) => {
        console.error("Web3Forms network error:", err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full items-center p-0">
      <div className="lg:col-span-2 flex flex-col justify-between h-full gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold">Contacto</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed mt-2.5">
            ¿Tienes alguna propuesta o quieres saber más de mí? Escríbeme y estaré encantado de enviarte mi Currículum Vitae en PDF.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border/70 bg-card/50 text-sm sm:text-base">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <a href="mailto:jesus.pastor.ricoy@gmail.com" className="font-bold text-muted-foreground hover:text-foreground transition-colors break-all">
              jesus.pastor.ricoy@gmail.com
            </a>
          </div>
      </div>

      <div className="lg:col-span-3 bg-background/40 dark:bg-card/10 border border-border/80 rounded-2xl p-5 relative overflow-hidden">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <CheckCircle className="w-12 h-12 text-emerald-500 mb-3.5 animate-bounce" />
            <h4 className="text-base font-bold text-foreground mb-1">¡Mensaje Enviado!</h4>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
              Gracias por escribirme. Te responderé lo antes posible.
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <XCircle className="w-12 h-12 text-red-500 mb-3.5 animate-bounce" />
            <h4 className="text-base font-bold text-foreground mb-1">¡Ups! Algo falló</h4>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
              No se pudo enviar el mensaje. Verifica tu clave de Web3Forms o la conexión a internet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="nombre" className="block text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                disabled={status === 'sending'}
                className="w-full text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-border bg-background/40 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                disabled={status === 'sending'}
                className="w-full text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-border bg-background/40 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={3}
                value={form.mensaje}
                onChange={handleChange}
                disabled={status === 'sending'}
                className="w-full text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-border bg-background/40 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                placeholder="¿En qué puedo ayudarte?"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-sm sm:text-base font-bold transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              {status === 'sending' ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
