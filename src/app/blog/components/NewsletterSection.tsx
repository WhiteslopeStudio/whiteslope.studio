'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="w-full max-w-[1640px] mx-auto px-[24px] py-[60px] md:py-[80px]">
      {/* --- NEWSLETTER BANER (Kompaktowy) --- */}
      <div className="relative overflow-hidden rounded-[24px] bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[260px]">
          
          {/* Lewa strona: Tekst i Formularz (Zmniejszone paddingi i marginesy) */}
          <div className="p-6 md:p-8 lg:pl-10 flex flex-col justify-center">
            
            {/* Social Media */}
            <div className="flex items-center gap-3 mb-4">
              <a href="https://www.instagram.com/whiteslopestudio/reels/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#E1306C] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61583927894860" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#1877F2] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@WhiteslopeStudio" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#FF0000] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <h3 className="text-lg md:text-2xl font-semibold tracking-tight text-zinc-950">
              Newsletter Whiteslope Studio
            </h3>
            <p className="mt-2 text-[14px] text-zinc-600 max-w-[460px] leading-relaxed">
              Zapisz się do naszego newslettera. Otrzymasz od nas praktyczne porady dotyczące tworzenia stron internetowych. Zero spamu.
            </p>
            
            <form className="mt-5 w-full max-w-[480px]">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input 
                  type="email" 
                  placeholder="Twój e-mail" 
                  required
                  className="flex-1 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[14px] text-zinc-900 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <button 
                  type="submit"
                  className="rounded-full px-6 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 shadow-sm shrink-0"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
                  }}
                >
                  Zapisz się
                </button>
              </div>
              
              {/* Zgoda (Checkbox) */}
              <div className="mt-3 flex items-start gap-2.5">
                <input 
                  type="checkbox" 
                  id="newsletter-consent" 
                  required
                  className="mt-1 shrink-0 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                />
                <label htmlFor="newsletter-consent" className="text-[11px] leading-relaxed text-zinc-500 cursor-pointer">
                  Wyrażam zgodę na przetwarzanie mojego e-maila w celu wysyłki newslettera. Wiem, że mogę wypisać się w każdej chwili. Więcej w <Link href="/polityka-prywatnosci" className="underline hover:text-zinc-800">Polityce Prywatności</Link>.
                </label>
              </div>
            </form>
          </div>

          {/* Prawa strona: Zdjęcie iPhone'a (50% szerokości kontenera) */}
          <div className="relative hidden lg:block bg-zinc-50 border-l border-black/5 overflow-hidden">
            <img 
              src="/_resources/free-section-iphone.webp"
              alt="Wskazówki webowe na telefonie"
              className="absolute top-5 left-1/2 -translate-x-1/2 w-[60%] object-contain object-bottom"
            />
          </div>

        </div>
      </div>
    </section>
  );
}