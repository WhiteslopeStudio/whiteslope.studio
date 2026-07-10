'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, Check, Calendar as CalendarIcon, Clock, ChevronRight, X, HelpCircle, PhoneCall, Scissors, Brush } from 'lucide-react';
import { useAssistantFlow } from './useAssistantFlow';

// --- KOMPONENTY POMOCNICZE (Jasny, premium styl) ---

const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const words = text.split(' ');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(words.slice(0, i + 1).join(' '));
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, 45); 
    return () => clearInterval(interval);
  }, [text]); 

  // Formatowanie pogrubień (zmienione z text-white na text-zinc-900)
  const formattedHtml = displayedText
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-950 font-bold">$1</strong>')
    .replace(/\n/g, '<br />');
    
  return <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

const TutoringWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-[8px] mt-[16px] w-full max-w-sm">
    <button onClick={() => onSelect('Matematyka')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-indigo-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-indigo-600 transition-colors">📐 Matematyka</span>
      <span className="text-indigo-600 text-[12px] font-bold tracking-wide bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">80 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Język Angielski')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-pink-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-pink-600 transition-colors">🇬🇧 Język Angielski</span>
      <span className="text-pink-600 text-[12px] font-bold tracking-wide bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-lg">75 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Fizyka')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-purple-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-purple-600 transition-colors">⚡ Fizyka</span>
      <span className="text-purple-600 text-[12px] font-bold tracking-wide bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg">90 zł / 60 min</span>
    </button>
  </motion.div>
);

const SalonWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-[8px] mt-[16px] w-full max-w-sm">
    <button onClick={() => onSelect('Strzyżenie Męskie')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-amber-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-amber-600 transition-colors"><Scissors className="w-4 h-4" /> Męskie</span>
      <span className="text-amber-600 text-[12px] font-bold tracking-wide bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">60 zł / 40 min</span>
    </button>
    <button onClick={() => onSelect('Strzyżenie Damskie')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-orange-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-orange-600 transition-colors"><Scissors className="w-4 h-4" /> Damskie</span>
      <span className="text-orange-600 text-[12px] font-bold tracking-wide bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg">120 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Koloryzacja')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-yellow-400 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-yellow-600 transition-colors"><Sparkles className="w-4 h-4" /> Koloryzacja</span>
      <span className="text-yellow-600 text-[12px] font-bold tracking-wide bg-yellow-50 border border-yellow-100 px-3 py-1.5 rounded-lg">250 zł / 120 min</span>
    </button>
  </motion.div>
);

const MakeupWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-[8px] mt-[16px] w-full max-w-sm">
    <button onClick={() => onSelect('Makijaż Ślubny')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-rose-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-rose-600 transition-colors"><Brush className="w-4 h-4" /> Ślubny</span>
      <span className="text-rose-600 text-[12px] font-bold tracking-wide bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg">200 zł / 90 min</span>
    </button>
    <button onClick={() => onSelect('Makijaż Wieczorowy')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-red-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-red-500 transition-colors"><Sparkles className="w-4 h-4" /> Wieczorowy</span>
      <span className="text-red-600 text-[12px] font-bold tracking-wide bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">150 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Makijaż Dzienny')} className="flex justify-between items-center bg-white hover:bg-zinc-50 p-[16px] rounded-[16px] border border-zinc-200 hover:border-orange-300 shadow-sm transition-all group cursor-pointer">
      <span className="text-zinc-800 font-bold flex items-center gap-2 group-hover:text-orange-500 transition-colors"><Brush className="w-4 h-4" /> Dzienny</span>
      <span className="text-orange-600 text-[12px] font-bold tracking-wide bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg">100 zł / 45 min</span>
    </button>
  </motion.div>
);

const SummaryWidget = ({ data }: { data: any }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-[24px] rounded-[24px] mt-[16px] mb-[8px] border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-sm">
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-zinc-100"><span className="text-zinc-500 text-[13px] uppercase tracking-wider font-bold">Usługa:</span> <span className="text-zinc-900 font-bold">{data.subject}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-zinc-100"><span className="text-zinc-500 text-[13px] uppercase tracking-wider font-bold">Termin:</span> <span className="text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-lg">{data.date}, {data.time}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-zinc-100"><span className="text-zinc-500 text-[13px] uppercase tracking-wider font-bold">Klient:</span> <span className="text-zinc-900 font-bold">{data.name}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-zinc-100"><span className="text-zinc-500 text-[13px] uppercase tracking-wider font-bold">Telefon:</span> <span className="text-zinc-900 font-bold">{data.phone}</span></div>
    <div className="flex justify-between items-center mb-4"><span className="text-zinc-500 text-[13px] uppercase tracking-wider font-bold">E-mail:</span> <span className="text-zinc-900 font-bold">{data.email}</span></div>
    {data.message !== 'Brak' && (
      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100"><span className="text-zinc-400 text-xs block mb-1 uppercase font-bold tracking-wider">Wiadomość:</span><span className="text-zinc-700 italic text-sm">"{data.message}"</span></div>
    )}
  </motion.div>
);

const BookingCalendar = ({ onSelect, scrollContainerRef, activeColorClass }: { onSelect: (date: string, time: string) => void, scrollContainerRef: React.RefObject<HTMLDivElement | null>, activeColorClass: string }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [ { num: 14, name: 'Czw', full: '14 Marca' }, { num: 15, name: 'Pt', full: '15 Marca' }, { num: 16, name: 'Sob', full: '16 Marca' }, { num: 17, name: 'Ndz', full: '17 Marca' } ];
  const hours = ['14:00', '15:30', '17:00', '18:30'];

  useEffect(() => {
    if (selectedDay !== null && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current!.scrollTo({ top: scrollContainerRef.current!.scrollHeight, behavior: 'smooth' });
      }, 200);
    }
  }, [selectedDay, scrollContainerRef]);

  return (
    <div className="bg-white border border-zinc-200 rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-sm mt-3 relative">
      <div className="flex items-center gap-2 text-zinc-800 font-bold mb-4">
        <CalendarIcon className="w-5 h-5 text-zinc-400" /> Wybierz dzień
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {days.map((day, idx) => (
          <button key={idx} onClick={() => setSelectedDay(idx)} className={`flex flex-col items-center p-3 rounded-xl transition-all border cursor-pointer ${selectedDay === idx ? activeColorClass : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:border-zinc-300'}`}>
            <span className="text-xs uppercase tracking-wider mb-1 font-bold">{day.name}</span>
            <span className="text-xl font-black">{day.num}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="border-t border-zinc-100 pt-5 mt-4">
              <div className="flex items-center gap-2 text-zinc-800 font-bold mb-4">
                <Clock className="w-5 h-5 text-zinc-400" /> Dostępne godziny
              </div>
              <div className="grid grid-cols-2 gap-3">
                {hours.map((hour, idx) => (
                  <button key={idx} onClick={() => onSelect(days[selectedDay].full, hour)} className={`flex items-center justify-between p-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all group shadow-sm cursor-pointer`}>
                    <span className="font-bold">{hour}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- GŁÓWNY KOMPONENT ---

export default function AssistantDemo({ onClose, onThemeChange }: { onClose: () => void; onThemeChange?: (service: string) => void }) {
  const { step, messages, isBotThinking, bookingData, handleAction } = useAssistantFlow();
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onThemeChange?.(bookingData.service);
  }, [bookingData.service]);

  const scrollToBottom = () => { chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }); };
  useEffect(() => scrollToBottom(), [messages, isBotThinking, step]);

  const onSend = (text: string, actionId?: string, extraData?: any) => {
    handleAction(text, actionId, extraData);
    setInputValue('');
  };

  const isInputAllowed = ['name', 'phone', 'email', 'custom_msg', 'type_question', 'ask_email'].includes(step);
  
  // Zaktualizowane, jasne motywy premium dopasowane do branży
  const themeConfig = {
    default: { bg: 'bg-zinc-100', botIcon: 'bg-purple-100 text-purple-600', userMsg: 'bg-purple-600 text-white', bounce: 'bg-purple-400', calActive: 'bg-purple-600 text-white border-purple-600 shadow-md' },
    'Korepetycje': { bg: 'bg-zinc-100', botIcon: 'bg-indigo-100 text-indigo-600', userMsg: 'bg-indigo-600 text-white', bounce: 'bg-indigo-400', calActive: 'bg-indigo-600 text-white border-indigo-600 shadow-md' },
    'Salon Fryzjerski': { bg: 'bg-zinc-100', botIcon: 'bg-amber-100 text-amber-600', userMsg: 'bg-amber-500 text-white', bounce: 'bg-amber-400', calActive: 'bg-amber-500 text-white border-amber-500 shadow-md' },
    'Makijaż': { bg: 'bg-zinc-100', botIcon: 'bg-rose-100 text-rose-600', userMsg: 'bg-rose-500 text-white', bounce: 'bg-rose-400', calActive: 'bg-rose-500 text-white border-rose-500 shadow-md' },
  };
  const theme = themeConfig[bookingData.service as keyof typeof themeConfig] || themeConfig.default;

  let inputPlaceholder = 'Wybierz z opcji powyżej...';
  if (step === 'phone') inputPlaceholder = 'Wpisz 9 cyfr, np. 123456789...';
  else if (step === 'email' || step === 'ask_email') inputPlaceholder = 'Twój adres e-mail...';
  else if (step === 'type_question') inputPlaceholder = 'Wpisz swoje pytanie lub wiadomość...';
  else if (isInputAllowed) inputPlaceholder = 'Wpisz tekst tutaj...';

  return (
    <div className={`absolute inset-0 flex flex-col transition-colors duration-1000 ${theme.bg}`}>
      
      {/* Scrollable Chat Area */}
      <div ref={chatContainerRef} className=" border-radius-[8px] flex-1 overflow-y-auto px-[16px] md:px-[32px] pt-[32px] pb-[200px] z-10 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        <div className="max-w-2xl mx-auto space-y-[24px] ">
          {messages.map((msg) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className="flex w-full">
              {msg.role === 'user' ? (
                // Wiadomość użytkownika (Styl iMessage)
                <div className={`ml-auto px-[18px] py-[12px] rounded-[24px] rounded-br-[4px] max-w-[80%] text-[15px] shadow-sm transition-colors duration-1000 font-medium leading-relaxed ${theme.userMsg}`}>
                  {msg.text}
                </div>
              ) : (
                // Wiadomość bota
                <div className="flex items-start gap-[16px] max-w-[95%] w-full">
                  <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 mt-[2px] transition-colors duration-1000 ${theme.botIcon}`}>
                    <Sparkles className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <div className="text-zinc-700 leading-relaxed pt-[8px] text-[15px] w-full">
                    {msg.isTypingEffect ? (
                      <TypewriterText text={msg.text} onComplete={scrollToBottom} />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-950 font-bold">$1</strong>').replace(/\n/g, '<br />') }} />
                    )}
                    
                    {/* Wstrzykiwanie odpowiedniego Widgetu */}
                    {msg.msgType === 'subjects_tutoring' && <TutoringWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'subjects_salon' && <SalonWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'subjects_makeup' && <MakeupWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'summary' && step === 'summary' && <SummaryWidget data={bookingData} />}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Kalendarz pod odpowiednią wiadomością */}
          {step === 'calendar' && !isBotThinking && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ml-[52px]">
              <BookingCalendar activeColorClass={theme.calActive} scrollContainerRef={chatContainerRef} onSelect={(date, time) => onSend(`Wybieram: ${date}, godz. ${time}`, 'calendar_select', { date, time })} />
            </motion.div>
          )}

          {/* Indykator "Bot pisze..." */}
          {isBotThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-[16px]">
              <div className="w-[36px] h-[36px] rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 mt-[2px]">
                <Bot className="w-[18px] h-[18px] text-zinc-400" />
              </div>
              <div className="pt-[14px] flex gap-[6px]">
                <span className={`w-[6px] h-[6px] rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-[6px] h-[6px] rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-[6px] h-[6px] rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- DOLNA SEKCJA: Szybkie odpowiedzi i Pasek Inputu --- */}
      {/* Pasek Szybkich Odpowiedzi i Input */}
      <div className="absolute bottom-0 left-0 right-0 pt-[64px] pb-[24px] px-[16px] md:px-[32px] bg-gradient-to-t from-zinc-100 via-zinc-100/95 to-transparent z-20 pointer-events-none">
        <div className="max-w-2xl mx-auto flex flex-col items-center pointer-events-auto">
          
          <AnimatePresence>
            {!isBotThinking && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-wrap justify-center gap-[8px] mb-[16px] w-full">
                
                {/* MENU GŁÓWNE */}
                {(step === 'main_menu' || step === 'follow_up') && (
                  <>
                    <button onClick={() => onSend('Rezerwacja wizyty', 'booking')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:text-black hover:border-purple-300 hover:bg-zinc-400 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><CalendarIcon className="w-[16px] h-[16px]" /> Rezerwacja</button>
                    <button onClick={() => onSend('Zapytaj o ofertę', 'offer')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:text-black hover:border-purple-300 hover:bg-zinc-400 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><Sparkles className="w-[16px] h-[16px]" /> Oferta</button>
                    <button onClick={() => onSend('Najczęstsze pytania', 'faq')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:text-black hover:border-purple-300 hover:bg-zinc-400 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><HelpCircle className="w-[16px] h-[16px]" /> Pytania</button>
                    <button onClick={() => onSend('Kontakt z firmą', 'contact')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:text-black hover:border-purple-300 hover:bg-zinc-400 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><PhoneCall className="w-[16px] h-[16px]" /> Kontakt</button>
                  </>
                )}

                {/* TAK / NIE */}
                {step === 'want_to_ask' && (
                  <>
                    <button onClick={() => onSend('Tak, chcę zapytać', 'yes')} className="px-[20px] py-[10px] bg-zinc-300 border border-green-200 text-green-700 hover:bg-green-50 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><Check className="w-[16px] h-[16px]" /> Tak, chcę napisać</button>
                    <button onClick={() => onSend('Nie, dziękuję', 'no')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm flex items-center gap-[6px]"><X className="w-[16px] h-[16px]" /> Nie, dziękuję</button>
                  </>
                )}

                {/* ZAINTERESOWANIE */}
                {step === 'offer_interest' && (
                  <>
                    <button onClick={() => onSend('Strony WWW')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:border-purple-300 hover:bg-purple-50 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">Strony WWW</button>
                    <button onClick={() => onSend('Wdrożenia AI')} className="px-[20px] py-[10px] bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">Wdrożenia AI</button>
                    <button onClick={() => onSend('Marketing')} className="px-[20px] py-[10px] bg-zinc-300 border border-zinc-200 text-zinc-700 hover:border-purple-300 hover:bg-purple-5０ rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">Marketing</button>
                  </>
                )}

                {/* KATEGORIE USŁUG */}
                {step === 'service_category' && (
                  <>
                    <button onClick={() => onSend('Korepetycje', 'korepetycje')} className="px-[20px] py-[10px] bg-white border border-zinc-200 text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">📚 Korepetycje</button>
                    <button onClick={() => onSend('Salon Fryzjerski', 'salon')} className="px-[20px] py-[10px] bg-white border border-zinc-200 text-zinc-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">💇‍♀️ Salon Fryzjerski</button>
                    <button onClick={() => onSend('Makijaż', 'makeup')} className="px-[20px] py-[10px] bg-white border border-zinc-200 text-zinc-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">💄 Makijaż</button>
                  </>
                )}

                {/* POMINIĘCIE */}
                {step === 'custom_msg' && (
                  <button onClick={() => onSend('Pomiń')} className="px-[20px] py-[10px] bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm">Pomiń dodawanie wiadomości</button>
                )}

                {/* POTWIERDZENIE PODSUMOWANIA */}
                {step === 'summary' && (
                  <>
                    <button onClick={() => onSend('Tak, wyślij rezerwację!', 'confirm')} className="px-[20px] py-[10px] bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 rounded-full transition-all text-[14px] font-bold flex items-center gap-[6px] cursor-pointer shadow-sm"><Check className="w-[18px] h-[18px]" strokeWidth={3} /> Tak, rezerwuję</button>
                    <button onClick={() => onSend('Nie, anuluj', 'cancel')} className="px-[20px] py-[10px] bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-red-500 rounded-full transition-all text-[13px] font-semibold cursor-pointer shadow-sm"><X className="w-[16px] h-[16px]" /> Anuluj</button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* PASEK WPISYWANIA */}
          <div className={`w-full relative flex items-center bg-white border rounded-full p-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all ${
            isInputAllowed ? 'border-zinc-200 focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-500/10' : 'bg-zinc-50 border-zinc-100 opacity-60'
          }`}>
            <input
              type={step === 'email' || step === 'ask_email' ? 'email' : 'text'}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && isInputAllowed && onSend(inputValue)}
              disabled={!isInputAllowed}
              className="flex-1 bg-transparent px-[20px] py-[10px] outline-none text-zinc-900 placeholder:text-zinc-400 text-[15px] font-medium disabled:cursor-not-allowed"
              autoFocus={isInputAllowed}
            />
            <button 
              onClick={() => onSend(inputValue)}
              disabled={!inputValue.trim() || !isInputAllowed}
              className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${
                isInputAllowed && inputValue.trim() ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md cursor-pointer' : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-[18px] h-[18px] ml-[2px]" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}