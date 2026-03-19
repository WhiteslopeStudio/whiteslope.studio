'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowLeft, Send, CalendarDays, Sparkles, HelpCircle } from 'lucide-react';

interface BookingDemoProps {
  onClose: () => void;
}

type Step = 'init' | 'service' | 'date' | 'name' | 'email' | 'offer_followup' | 'sending' | 'done';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  isTypingEffect?: boolean; // Flaga mówiąca czy animować pisanie
}

const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

// ─── KOMPONENT DO EFEKTU PISANIA (CHATGPT STYLE) ───
const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    // Rozbijamy tekst na słowa, żeby przypadkiem nie uciąć w połowie tagów Markdown (np. **pogrubienie**)
    const words = text.split(' ');
    let i = 0;
    
    const interval = setInterval(() => {
      setDisplayedText(words.slice(0, i + 1).join(' '));
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 60); // Prędkość pisania (ms na słowo)

    return () => clearInterval(interval);
  }, [text, onComplete]);

  // Zamiana Markdown na HTML
  const formattedHtml = displayedText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  return <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};


export default function BookingDemo({ onClose }: BookingDemoProps) {
  const [step, setStep] = useState<Step>('init');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false); // Zamiast "pisania" to teraz "myślenie" (bąbelki)
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false); // Zabezpieczenie przed podwójną wiadomością w React Strict Mode

  const [bookingData, setBookingData] = useState({ date: '', name: '', email: '' });

  // Płynne przewijanie TYLKO kontenera czatu, bez skakania całej strony
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotThinking, step]);

  const addBotMessage = (text: string, nextStep: Step, delay = 600) => {
    setIsBotThinking(true);
    setTimeout(() => {
      setIsBotThinking(false);
      // Dodajemy wiadomość z włączonym efektem pisania
      setMessages(prev => [...prev, { id: generateId(), role: 'bot', text, isTypingEffect: true }]);
      setStep(nextStep);
    }, delay);
  };

  // Inicjalizacja (odpala się tylko raz!)
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addBotMessage("Cześć! Jestem asystentem AI. Pomagam automatyzować biznes, zarządzać kalendarzem i odpowiadać klientom w ułamku sekundy. Od czego zaczynamy?", 'service', 800);
    }
  }, []);

  // ─── GŁÓWNA LOGIKA I ROZGAŁĘZIENIA ───
  // Dodałem 'actionId', żebyśmy wiedzieli CO DOKŁADNIE kliknął użytkownik
  const handleUserAction = (text: string, actionId: string = 'text') => {
    if (!text.trim()) return;
    
    // Zmieniamy starą wiadomość bota, żeby nie miała już efektu pisania (żeby się nie odświeżała)
    setMessages(prev => prev.map(m => ({ ...m, isTypingEffect: false })));
    
    // Dodajemy wiadomość użytkownika
    setMessages(prev => [...prev, { id: generateId(), role: 'user', text }]);
    setInputValue('');
    setStep('sending'); 

    // -- SCENARIUSZ 1: Wybór opcji na samym początku --
    if (step === 'service') {
      if (actionId === 'offer') {
        // Jeśli kliknął ofertę:
        addBotMessage("Jasne! Nasza agencja **Whiteslope** specjalizuje się w tworzeniu potężnych stron WWW, wdrożeniach AI oraz automatyzacji procesów. Co najbardziej Cię interesuje?", 'offer_followup');
      } else {
        // Jeśli kliknął rezerwację lub wpisał tekst z palca:
        addBotMessage("Świetnie! Połączyłem się z Twoim wirtualnym kalendarzem. Znalazłem wolne terminy na ten tydzień. Wybierz jeden z nich poniżej:", 'date');
      }
    } 
    // -- SCENARIUSZ 2: Rezerwacja (Kalendarz) --
    else if (step === 'date') {
      setBookingData(prev => ({ ...prev, date: text }));
      addBotMessage("Termin wstępnie zablokowany. Jak mam Cię zapisać? (Podaj imię i nazwisko)", 'name');
    } 
    else if (step === 'name') {
      setBookingData(prev => ({ ...prev, name: text }));
      addBotMessage(`Miło mi Cię poznać, **${text.split(' ')[0]}**! Na jaki adres e-mail wysłać podsumowanie? (Podaj e-mail, wyślemy Ci testowe powiadomienie)`, 'email');
    }
    else if (step === 'email') {
      setBookingData(prev => ({ ...prev, email: text }));
      setIsBotThinking(true);
      
      setTimeout(() => {
        setIsBotThinking(false);
        setMessages(prev => [...prev, { 
          id: generateId(), 
          role: 'bot', 
          text: `Gotowe! Zarezerwowałem termin: **${bookingData.date || 'wybrany termin'}**. Sprawdź swoją skrzynkę (${text}), powinieneś zaraz dostać profesjonalnego maila!`,
          isTypingEffect: true
        }]);
        setStep('done');
      }, 2500);
    }
    // -- SCENARIUSZ 3: Dalsza rozmowa o ofercie --
    else if (step === 'offer_followup') {
      addBotMessage("Takie rzeczy możemy zautomatyzować dla Ciebie! Chcesz przetestować powrót do rezerwacji czy wolisz zakończyć demo?", 'done');
    }
    // -- DOMYŚLNY --
    else {
      addBotMessage("To demo skupia się na konkretnych ścieżkach rezerwacji. Odśwież demo, aby spróbować innej opcji!", 'done');
    }
  };

  return (
    <div className="w-full flex flex-col h-[800px] bg-gradient-to-b from-[#060a18] to-[#03050a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-hidden relative">
      
      {/* ── Subtelne oświetlenie w tle czatu ── */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[20rem] h-[20rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center bg-white/[0.01] z-20 backdrop-blur-sm">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 -ml-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Zakończ demo</span>
        </button>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] font-bold text-green-400 tracking-wider uppercase">System Aktywny</span>
        </div>
      </div>

      {/* ── CZAT ── */}
      <div 
        ref={chatContainerRef} // PODPIĘCIE LOKALNEGO SCROLLA
        className="flex-1 overflow-y-auto px-4 md:px-12 pt-10 pb-48 z-10" 
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className="flex w-full">
              {msg.role === 'user' ? (
                <div className="ml-auto bg-blue-600/20 border border-blue-500/30 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[80%] text-[15px] shadow-sm backdrop-blur-sm">
                  {msg.text}
                </div>
              ) : (
                <div className="flex items-start gap-4 max-w-[90%]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-white/90 leading-relaxed pt-1.5 text-[15px]">
                    {/* Jeśli wiadomość jest najnowsza, animuj pisanie. Jeśli nie, wyświetl od razu całość */}
                    {msg.isTypingEffect ? (
                      <TypewriterText text={msg.text} onComplete={scrollToBottom} />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Animacja myślenia (bąbelki przed wypluciem tekstu) */}
          {isBotThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-white/40" />
              </div>
              <div className="pt-3.5 flex gap-1.5">
                <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── INPUT & PIGUŁKI ── */}
      <div className="absolute bottom-0 left-0 right-0 pt-16 pb-8 px-4 md:px-12 bg-gradient-to-t from-[#03050a] via-[#03050a]/90 to-transparent z-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          <AnimatePresence>
            {!isBotThinking && step === 'service' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-wrap justify-center gap-2.5 mb-5 w-full">
                {/* PRZEKAZUJEMY ACTION ID -> 'booking' */}
                <button onClick={() => handleUserAction('Rezerwacja wizyty', 'booking')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-100 hover:text-white hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] rounded-2xl transition-all font-medium text-sm flex items-center gap-2 backdrop-blur-md cursor-pointer">
                  <CalendarDays className="w-4 h-4 text-blue-400" /> Rezerwacja wizyty
                </button>
                {/* PRZEKAZUJEMY ACTION ID -> 'offer' */}
                <button onClick={() => handleUserAction('Zapytaj o ofertę', 'offer')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-100 hover:text-white hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] rounded-2xl transition-all font-medium text-sm flex items-center gap-2 backdrop-blur-md cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-emerald-400" /> Zapytaj o ofertę
                </button>
              </motion.div>
            )}
            {!isBotThinking && step === 'date' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-wrap justify-center gap-2.5 mb-5 w-full">
                <button onClick={() => handleUserAction('Środa, 15:00', 'date_pick')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-100 hover:text-white hover:bg-blue-500/30 rounded-2xl transition-all font-medium text-sm backdrop-blur-md cursor-pointer">📅 Środa, 15:00</button>
                <button onClick={() => handleUserAction('Czwartek, 10:00', 'date_pick')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-100 hover:text-white hover:bg-blue-500/30 rounded-2xl transition-all font-medium text-sm backdrop-blur-md cursor-pointer">📅 Czwartek, 10:00</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full relative flex items-center bg-[#0a0f1c]/80 border border-white/20 rounded-[2rem] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl focus-within:border-blue-500/60 focus-within:bg-[#111827] transition-all">
            <input
              type={step === 'email' ? 'email' : 'text'}
              placeholder={(step === 'name' || step === 'email') ? 'Napisz tutaj...' : 'Wybierz opcję powyżej lub wpisz polecenie...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserAction(inputValue, 'text_input')}
              className="flex-1 bg-transparent px-5 py-2.5 outline-none text-white placeholder-white/40 text-[15px]"
              autoFocus={step === 'name' || step === 'email'}
            />
            <button 
              onClick={() => handleUserAction(inputValue, 'text_input')}
              disabled={!inputValue.trim()}
              className="p-3 bg-white text-black rounded-full hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-black transition-colors cursor-pointer flex items-center justify-center shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-[10px] text-white/20 mt-4 font-semibold tracking-[0.2em] uppercase">
            Powered by Whiteslope AI
          </p>
        </div>
      </div>
    </div>
  );
}