'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Bot, Sparkles, CalendarDays, ShoppingBag, 
  Users, HeadphonesIcon, Image as ImageIcon, Share2, Zap, Search
} from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';
import OfferTickerSection from '@/components/websites/OfferTickerSection';

// ── IMPORT KOMPONENTÓW DEMO ──
import AssistantDemo from '@/components/ai-integration/demos/assistant/AssistantDemo';
import TechSupportDemo from '@/components/ai-integration/demos/tech-support/TechSupportDemo';

const CATEGORIES = [
  { id: 'chatbots', label: 'Inteligentne Asystenty', desc: 'Obsługa klienta 24/7', icon: Bot },
  { id: 'generative', label: 'Modele Generatywne', desc: 'Grafika i Tekst AI', icon: ImageIcon },
  { id: 'social', label: 'Agenci Social Media', desc: 'Automatyzacja DM', icon: Share2 },
  { id: 'automation', label: 'Automatyzacja Procesów', desc: 'Zapier, Make, CRM', icon: Zap },
];

const SHOWCASE_DATA: Record<string, any[]> = {
  chatbots: [
    {
      id: 'booking',
      title: 'Asystent',
      desc: 'Bot umawia spotkanie i wysyła automatyczne podsumowanie na e-mail klienta oraz wpisuje wizytę do kalendarza.',
      icon: CalendarDays,
      badge: 'Bestseller',
      previewType: 'booking-mockup' 
    },
    {
      id: 'ecommerce',
      title: 'Doradca Sklepowy (E-commerce)',
      desc: 'Pomaga wyszukać produkty, podpowiada rozmiary i zamienniki. Najechanie na produkt pokazuje detale bez przeładowania strony.',
      icon: ShoppingBag,
      previewType: 'ecommerce-zoom' 
    },
    {
      id: 'lead',
      title: 'Łowca Leadów B2B',
      desc: 'Zaczepia klienta, zadaje pytania kwalifikujące (budżet, potrzeby) i elegancko prosi o numer telefonu do wyceny.',
      icon: Users,
      previewType: 'standard'
    },
    {
      id: 'support',
      title: 'Wsparcie Techniczne 24/7',
      desc: 'Bot przetrenowany na dokumentacji Twojej firmy. Odpowiada na pytania o wysyłkę, zwroty i reklamacje w ułamek sekundy.',
      icon: HeadphonesIcon,
      previewType: 'support-mockup'
    }
  ],
  generative: [
    {
      id: 'stable-diffusion',
      title: 'Generowanie i Edycja Obrazu',
      desc: 'Zintegrowane modele Stable Diffusion do generowania grafik produktowych, zmiany tła lub modyfikacji stylu wizualnego.',
      icon: Sparkles,
      previewType: 'image-gen'
    },
    {
      id: 'text-models',
      title: 'Generatory Tekstu',
      desc: 'Twoje własne, spersonalizowane modele do masowego pisania postów na bloga i opisów produktów w tonie Twojej marki.',
      icon: Bot,
      previewType: 'text-gen'
    }
  ],
  social: [
    {
      id: 'insta-agent',
      title: 'Agent Instagram / Messenger',
      desc: 'Automatycznie odpowiada na wiadomości DM, reaguje na komentarze i wysyła linki z ofertą w 5 sekund po komentarzu "CENA".',
      icon: Share2,
      previewType: 'social-mockup'
    }
  ],
  automation: [
    {
      id: 'zapier-make',
      title: 'Obieg Dokumentów (Make/Zapier)',
      desc: 'AI czyta załączniki PDF z maili (np. faktury), wyciąga z nich kwoty i automatycznie wrzuca dane do Twojego Excela lub CRM.',
      icon: Zap,
      previewType: 'workflow'
    }
  ]
};

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

const EDGE_PADDING = 'clamp(28px, 7vw, 150px)';

export default function AIChatbotPage() {
  const mainButton = useInteractiveButton();
  const [activeCategory, setActiveCategory] = useState('chatbots');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  useEffect(() => {
    setActiveDemo(null);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO SECTION */}
      <section className="relative h-[60svh] md:h-[90svh] md:min-h-[760px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 hidden md:block bg-center bg-cover" style={{ backgroundImage: 'url(/_resources/ai-chatbot-hero.webp)', filter: 'brightness(0.62) saturate(0.88)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#05091a] via-[#071030] to-[#06183d]" />
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.76) 30%, rgba(0,0,0,0.44) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)' }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.9) 100%)' }} />
        <div className="absolute top-[16%] left-[24%] -translate-x-1/2 w-[62rem] h-[34rem] rounded-full bg-blue-500/9 blur-[175px] pointer-events-none hidden md:block" />

        <div className="relative z-10 h-full flex flex-col justify-center" style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}>
          <div className="relative max-w-[1120px] text-center md:text-left mx-auto md:mx-0 -mt-3 md:-mt-40">
            <AnimatedBlock delay={0}>
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/35 backdrop-blur-sm text-[10px] md:text-sm font-medium text-gray-100/70 tracking-[0.18em]">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> CHATBOT AI · INTEGRACJA AI
              </p>
            </AnimatedBlock>
            <AnimatedBlock delay={120}>
              <h1 className="mt-5 md:mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">Inteligentne rozwiązania<br /></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">szyte na miarę</span>
              </h1>
            </AnimatedBlock>
            <AnimatedBlock delay={240}>
              <h2 className="mt-4 md:mt-5 text-base md:text-2xl text-blue-50/70 font-medium max-w-xl md:max-w-2xl mx-auto md:mx-0">
                Automatyzacja, chatboty, agenci społecznościowi i modele generatywne w jednym miejscu.
              </h2>
            </AnimatedBlock>
            <AnimatedBlock delay={520}>
              <div className="mt-7 md:mt-8 flex justify-center md:justify-start">
                <a href="#hub" onMouseMove={mainButton.handleMouseMove} onMouseEnter={mainButton.handleMouseEnter} onMouseLeave={mainButton.handleMouseLeave} className="inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]" style={{ background: `radial-gradient(circle at ${mainButton.mousePosition.x}% ${mainButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)` }}>
                  Sprawdź możliwości AI
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      <OfferTickerSection />

      {/* HUB AI */}
      <section id="hub" className="w-full bg-[#03050a] border-b border-white/10 flex flex-col lg:flex-row min-h-[950px] relative">
        <div className="absolute top-0 right-0 w-full lg:w-[80%] h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[200%] h-[88%] opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1920 640" fill="none" preserveAspectRatio="none">
              <path d="M34 -16 C12 96, 58 198, 30 318 C6 434, 62 540, 26 668" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
              <path d="M286 -12 C260 98, 320 212, 278 332 C248 446, 304 552, 276 672" stroke="rgba(37,99,235,0.1)" strokeWidth="1" />
              <path d="M678 -12 C650 104, 712 222, 666 344 C636 458, 698 562, 666 680" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-[-10%] w-[50rem] h-[50rem] rounded-full bg-blue-600/5 blur-[150px]" />
        </div>

{/* ── NOWE, POTĘŻNE LEWE MENU (25%) ── */}
        <div className="w-full lg:w-[25%] xl:w-[22%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#050812] relative z-20 flex flex-col">
          <div className="p-8 border-b border-white/5 hidden lg:block">
            <p className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Hub AI Whiteslope
            </p>
            <h3 className="text-3xl font-bold text-white mt-3">Wybierz Moduł</h3>
          </div>

          {/* RESPONSYWNOŚĆ: Zwijanie w kafelki na mobile (flex-wrap), w pionie na Desktopie */}
          <div className="flex flex-row flex-wrap lg:flex-col p-4 md:p-6 lg:p-6 gap-3 lg:gap-4 h-full justify-start items-stretch">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-start gap-3 p-4 lg:p-6 rounded-2xl text-left transition-all duration-300 w-[calc(50%-0.5rem)] lg:w-full flex-grow group border relative overflow-hidden ${
                    isActive 
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-[inset_0_0_30px_rgba(37,99,235,0.15)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  {isActive && <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />}
                  
                  <div className={`p-2 lg:p-3 rounded-xl flex-shrink-0 transition-colors ${isActive ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/50 group-hover:text-white/80 group-hover:bg-white/10'}`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <span className={`block font-bold text-sm lg:text-lg mb-1 transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{cat.label}</span>
                    <span className="hidden lg:block text-xs text-white/40 font-medium tracking-wide">{cat.desc}</span>
                  </div>
                  
                  {isActive && <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRAWA KOLUMNA (NAPRAWA SKAKANIA: min-h-[850px] i grid z absolute) ── */}
        <div className="w-full lg:flex-1 p-6 md:p-10 lg:p-16 relative z-10 min-h-[850px] flex flex-col">
          <AnimatePresence mode="wait">
            {!activeDemo ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-10 max-w-3xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {CATEGORIES.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-white/50 text-lg">
                    Wybierz rozwiązanie poniżej, aby zobaczyć jak sztuczna inteligencja optymalizuje konkretne procesy w biznesie.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {SHOWCASE_DATA[activeCategory]?.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setActiveDemo(item.id)} 
                      className="group relative rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden min-h-[420px] flex flex-col cursor-pointer"
                    >
                      <div className="h-[220px] w-full border-b border-white/5 relative overflow-hidden bg-[#0a0f1c] flex items-center justify-center p-6">
                        
                        {item.previewType === 'ecommerce-zoom' && (
                          <div className="relative w-full max-w-[200px] h-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                            <div className="relative w-24 h-24 text-white/20 transition-transform duration-700 ease-in-out group-hover:scale-[1.8] group-hover:text-blue-400">
                               <ShoppingBag className="w-full h-full" strokeWidth={1} />
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                  <Search className="w-8 h-8 text-white drop-shadow-lg" />
                               </div>
                            </div>
                          </div>
                        )}

                        {item.previewType === 'booking-mockup' && (
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden group-hover:shadow-[inset_0_0_50px_rgba(37,99,235,0.2)] transition-all duration-500">
                            <div className="absolute inset-0 bg-blue-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <p className="text-blue-300 text-sm font-semibold relative z-10 flex items-center gap-2">
                               <CalendarDays className="w-5 h-5" />
                               Wideo (w przygotowaniu)
                            </p>
                          </div>
                        )}

                        {item.previewType !== 'ecommerce-zoom' && item.previewType !== 'booking-mockup' && (
                          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10">
                             <item.icon className="w-10 h-10 text-white/40 group-hover:text-white transition-colors" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                      </div>

                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-400 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 leading-relaxed text-[15px] flex-1">
                          {item.desc}
                        </p>
                        
                        <div className="mt-6 flex items-center font-semibold text-sm text-blue-500 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          Kliknij, aby przetestować <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="demo-view"
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex-1"
              >
                {activeDemo === 'booking' && (
                  <AssistantDemo onClose={() => setActiveDemo(null)} />
                )}
                
                {activeDemo !== 'booking' && (
                  <div className="w-full h-[750px] flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl">
                    <p className="text-white/50 mb-6 text-lg">To demo jest jeszcze w przygotowaniu...</p>
                    <button 
                      onClick={() => setActiveDemo(null)}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Wróć do listy
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}