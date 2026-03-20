'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, Check, Calendar as CalendarIcon, Clock, ChevronRight, X, HelpCircle, PhoneCall, Scissors, Brush } from 'lucide-react';
import { useAssistantFlow } from './useAssistantFlow';

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

  const formattedHtml = displayedText
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\n/g, '<br />');
    
  return <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

const TutoringWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 mt-4 w-full max-w-sm">
    <button onClick={() => onSelect('Matematyka')} className="flex justify-between items-center bg-[#0d1522] hover:bg-[#121d2f] p-4 rounded-xl border border-indigo-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-indigo-400 font-bold flex items-center gap-2 group-hover:text-indigo-300">📐 Matematyka</span>
      <span className="text-indigo-200/60 text-sm font-medium bg-indigo-900/30 px-3 py-1.5 rounded-lg">80 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Język Angielski')} className="flex justify-between items-center bg-[#0d1522] hover:bg-[#121d2f] p-4 rounded-xl border border-pink-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-pink-400 font-bold flex items-center gap-2 group-hover:text-pink-300">🇬🇧 Język Angielski</span>
      <span className="text-pink-200/60 text-sm font-medium bg-pink-900/30 px-3 py-1.5 rounded-lg">75 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Fizyka')} className="flex justify-between items-center bg-[#0d1522] hover:bg-[#121d2f] p-4 rounded-xl border border-purple-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-purple-400 font-bold flex items-center gap-2 group-hover:text-purple-300">⚡ Fizyka</span>
      <span className="text-purple-200/60 text-sm font-medium bg-purple-900/30 px-3 py-1.5 rounded-lg">90 zł / 60 min</span>
    </button>
  </motion.div>
);

const SalonWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 mt-4 w-full max-w-sm">
    <button onClick={() => onSelect('Strzyżenie Męskie')} className="flex justify-between items-center bg-[#1a1105] hover:bg-[#2a1b0a] p-4 rounded-xl border border-amber-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-amber-400 font-bold flex items-center gap-2 group-hover:text-amber-300"><Scissors className="w-4 h-4" /> Męskie</span>
      <span className="text-amber-200/60 text-sm font-medium bg-amber-900/30 px-3 py-1.5 rounded-lg">60 zł / 40 min</span>
    </button>
    <button onClick={() => onSelect('Strzyżenie Damskie')} className="flex justify-between items-center bg-[#1a1105] hover:bg-[#2a1b0a] p-4 rounded-xl border border-orange-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-orange-400 font-bold flex items-center gap-2 group-hover:text-orange-300"><Scissors className="w-4 h-4" /> Damskie</span>
      <span className="text-orange-200/60 text-sm font-medium bg-orange-900/30 px-3 py-1.5 rounded-lg">120 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Koloryzacja')} className="flex justify-between items-center bg-[#1a1105] hover:bg-[#2a1b0a] p-4 rounded-xl border border-yellow-500/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-yellow-400 font-bold flex items-center gap-2 group-hover:text-yellow-300"><Sparkles className="w-4 h-4" /> Koloryzacja</span>
      <span className="text-yellow-200/60 text-sm font-medium bg-yellow-900/30 px-3 py-1.5 rounded-lg">250 zł / 120 min</span>
    </button>
  </motion.div>
);

const MakeupWidget = ({ onSelect }: { onSelect: (subject: string) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 mt-4 w-full max-w-sm">
    <button onClick={() => onSelect('Makijaż Ślubny')} className="flex justify-between items-center bg-[#140b0e] hover:bg-[#1d1015] p-4 rounded-xl border border-rose-300/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-rose-300 font-bold flex items-center gap-2 group-hover:text-rose-200"><Brush className="w-4 h-4" /> Ślubny</span>
      <span className="text-rose-200/60 text-sm font-medium bg-rose-900/30 px-3 py-1.5 rounded-lg">200 zł / 90 min</span>
    </button>
    <button onClick={() => onSelect('Makijaż Wieczorowy')} className="flex justify-between items-center bg-[#140b0e] hover:bg-[#1d1015] p-4 rounded-xl border border-red-300/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-red-300 font-bold flex items-center gap-2 group-hover:text-red-200"><Sparkles className="w-4 h-4" /> Wieczorowy</span>
      <span className="text-red-200/60 text-sm font-medium bg-red-900/30 px-3 py-1.5 rounded-lg">150 zł / 60 min</span>
    </button>
    <button onClick={() => onSelect('Makijaż Dzienny')} className="flex justify-between items-center bg-[#140b0e] hover:bg-[#1d1015] p-4 rounded-xl border border-orange-300/20 shadow-lg transition-colors group cursor-pointer">
      <span className="text-orange-300 font-bold flex items-center gap-2 group-hover:text-orange-200"><Brush className="w-4 h-4" /> Dzienny</span>
      <span className="text-orange-200/60 text-sm font-medium bg-orange-900/30 px-3 py-1.5 rounded-lg">100 zł / 45 min</span>
    </button>
  </motion.div>
);

const SummaryWidget = ({ data }: { data: any }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-6 rounded-2xl mt-4 mb-2 border border-white/10 shadow-xl w-full max-w-sm backdrop-blur-sm">
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5"><span className="text-white/50 text-sm">Usługa:</span> <span className="text-white font-bold">{data.subject}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5"><span className="text-white/50 text-sm">Termin:</span> <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-lg">{data.date}, {data.time}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5"><span className="text-white/50 text-sm">Klient:</span> <span className="text-white font-bold">{data.name}</span></div>
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5"><span className="text-white/50 text-sm">Telefon:</span> <span className="text-white font-bold">{data.phone}</span></div>
    <div className="flex justify-between items-center mb-4"><span className="text-white/50 text-sm">E-mail:</span> <span className="text-white font-bold">{data.email}</span></div>
    {data.message !== 'Brak' && (
      <div className="bg-black/40 p-3 rounded-xl"><span className="text-white/40 text-xs block mb-1">Wiadomość:</span><span className="text-white/90 italic text-sm">"{data.message}"</span></div>
    )}
  </motion.div>
);

const BookingCalendar = ({ onSelect, scrollContainerRef, activeColorClass }: { onSelect: (date: string, time: string) => void, scrollContainerRef: React.RefObject<HTMLDivElement | null>, activeColorClass: string }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [ { num: 14, name: 'Czw', full: '14 Marca' }, { num: 15, name: 'Pt', full: '15 Marca' }, { num: 16, name: 'Sob', full: '16 Marca' }, { num: 17, name: 'Ndz', full: '17 Marca' } ];
  const hours = ['14:00', '15:30', '17:00', '18:30'];

  // NAPRAWIONY AUTO SCROLL - przewija na sam dół całego okna po rozwinięciu godzin
  useEffect(() => {
    if (selectedDay !== null && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current!.scrollTo({ top: scrollContainerRef.current!.scrollHeight, behavior: 'smooth' });
      }, 200); // 200ms czeka na zakończenie animacji framer-motion, by dobrze policzyć wysokość
    }
  }, [selectedDay, scrollContainerRef]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-sm mt-3 relative backdrop-blur-md">
      <div className="flex items-center gap-2 text-white/80 font-semibold mb-4">
        <CalendarIcon className="w-5 h-5 opacity-80" /> Wybierz dzień
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {days.map((day, idx) => (
          <button key={idx} onClick={() => setSelectedDay(idx)} className={`flex flex-col items-center p-3 rounded-xl transition-all border cursor-pointer ${selectedDay === idx ? `${activeColorClass} text-white` : 'bg-black/20 border-white/5 text-white/60 hover:bg-white/10'}`}>
            <span className="text-xs uppercase tracking-wider mb-1">{day.name}</span>
            <span className="text-xl font-bold">{day.num}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="border-t border-white/10 pt-5 mt-4">
              <div className="flex items-center gap-2 text-white/80 font-semibold mb-4">
                <Clock className="w-5 h-5 opacity-80" /> Dostępne godziny
              </div>
              <div className="grid grid-cols-2 gap-3">
                {hours.map((hour, idx) => (
                  <button key={idx} onClick={() => onSelect(days[selectedDay].full, hour)} className={`flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/10 text-white/90 hover:${activeColorClass} transition-all group shadow-sm cursor-pointer`}>
                    <span className="font-bold">{hour}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
  
  const themeConfig = {
    default: { bg: 'from-[#060a18] to-[#03050a]', blob1: 'bg-blue-500/10', blob2: 'bg-purple-500/5', botIcon: 'from-blue-600 to-indigo-600 shadow-blue-500/30', userMsg: 'bg-blue-600/20 border-blue-500/30', bounce: 'bg-blue-500/50', calActive: 'bg-blue-600 border-blue-400' },
    'Korepetycje': { bg: 'from-[#0f0b24] to-[#03050a]', blob1: 'bg-indigo-500/10', blob2: 'bg-pink-500/5', botIcon: 'from-indigo-600 to-pink-600 shadow-indigo-500/30', userMsg: 'bg-indigo-600/30 border-indigo-500/40', bounce: 'bg-indigo-500/50', calActive: 'bg-indigo-600 border-indigo-400' },
    'Salon Fryzjerski': { bg: 'from-[#1a1105] to-[#03050a]', blob1: 'bg-amber-500/10', blob2: 'bg-orange-500/5', botIcon: 'from-amber-500 to-orange-600 shadow-amber-500/30', userMsg: 'bg-amber-600/20 border-amber-500/30', bounce: 'bg-amber-500/50', calActive: 'bg-amber-600 border-amber-400' },
    'Makijaż': { bg: 'from-[#170a0e] to-[#03050a]', blob1: 'bg-rose-400/5', blob2: 'bg-red-400/5', botIcon: 'from-rose-400 to-red-400 shadow-rose-500/20', userMsg: 'bg-rose-500/10 border-rose-400/20', bounce: 'bg-rose-400/50', calActive: 'bg-rose-500 border-rose-400' },
  };
  const theme = themeConfig[bookingData.service as keyof typeof themeConfig] || themeConfig.default;

  let inputPlaceholder = 'Wybierz jedną z opcji w oknie rozmowy...';
  if (step === 'phone') inputPlaceholder = 'Wpisz 9 cyfr, np. 123456789...';
  else if (step === 'email' || step === 'ask_email') inputPlaceholder = 'Twój adres e-mail...';
  else if (step === 'type_question') inputPlaceholder = 'Wpisz swoje pytanie lub wiadomość...';
  else if (isInputAllowed) inputPlaceholder = 'Wpisz tekst tutaj...';

  return (
    <div className={`w-full flex flex-col h-[850px] transition-colors duration-1000 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative bg-gradient-to-b ${theme.bg}`}>
      
      <div className={`absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${theme.blob1}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[20rem] h-[20rem] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${theme.blob2}`} />

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 md:px-12 pt-10 pb-56 z-10 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className="flex w-full">
              {msg.role === 'user' ? (
                <div className={`ml-auto border text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[80%] text-[15px] shadow-sm backdrop-blur-sm transition-colors duration-1000 ${theme.userMsg}`}>
                  {msg.text}
                </div>
              ) : (
                <div className="flex items-start gap-4 max-w-[90%] w-full">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-tr flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg transition-colors duration-1000 ${theme.botIcon}`}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-white/90 leading-relaxed pt-1.5 text-[15px] w-full">
                    {msg.isTypingEffect ? (
                      <TypewriterText text={msg.text} onComplete={scrollToBottom} />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>').replace(/\n/g, '<br />') }} />
                    )}
                    {msg.msgType === 'subjects_tutoring' && <TutoringWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'subjects_salon' && <SalonWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'subjects_makeup' && <MakeupWidget onSelect={(subj) => onSend(subj)} />}
                    {msg.msgType === 'summary' && step === 'summary' && <SummaryWidget data={bookingData} />}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {step === 'calendar' && !isBotThinking && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ml-13">
              <BookingCalendar activeColorClass={theme.calActive} scrollContainerRef={chatContainerRef} onSelect={(date, time) => onSend(`Wybieram: ${date}, godz. ${time}`, 'calendar_select', { date, time })} />
            </motion.div>
          )}

          {isBotThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Bot className="w-4 h-4 text-white/40" /></div>
              <div className="pt-3.5 flex gap-1.5">
                <span className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-1000 ${theme.bounce}`} style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pt-16 pb-8 px-4 md:px-12 bg-gradient-to-t from-[#03050a] via-[#03050a]/90 to-transparent z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center pointer-events-auto">
          
          <AnimatePresence>
            {!isBotThinking && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-wrap justify-center gap-2.5 mb-5 w-full">
                
                {(step === 'main_menu' || step === 'follow_up') && (
                  <>
                    <button onClick={() => onSend('Rezerwacja wizyty', 'booking')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-100 hover:bg-blue-500/30 rounded-full transition-all text-sm cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Rezerwacja</button>
                    <button onClick={() => onSend('Zapytaj o ofertę', 'offer')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer backdrop-blur-md flex items-center gap-2"><Sparkles className="w-4 h-4" /> Oferta</button>
                    <button onClick={() => onSend('Najczęstsze pytania', 'faq')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer backdrop-blur-md flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Pytania</button>
                    <button onClick={() => onSend('Kontakt z firmą', 'contact')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer backdrop-blur-md flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Kontakt</button>
                  </>
                )}

                {step === 'want_to_ask' && (
                  <>
                    <button onClick={() => onSend('Tak, chcę zapytać / zostawić wiadomość', 'yes')} className="px-5 py-2.5 bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20 rounded-full transition-all text-sm cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.15)] flex items-center gap-2"><Check className="w-4 h-4" /> Tak, chcę napisać</button>
                    <button onClick={() => onSend('Nie, dziękuję', 'no')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer flex items-center gap-2"><X className="w-4 h-4" /> Nie, dziękuję</button>
                  </>
                )}

                {step === 'offer_interest' && (
                  <>
                    <button onClick={() => onSend('Strony WWW')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer">Strony WWW</button>
                    <button onClick={() => onSend('Wdrożenia AI')} className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 rounded-full transition-all text-sm cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.15)]">Wdrożenia AI</button>
                    <button onClick={() => onSend('Marketing')} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 rounded-full transition-all text-sm cursor-pointer">Marketing</button>
                  </>
                )}

                {step === 'service_category' && (
                  <>
                    <button onClick={() => onSend('Korepetycje', 'korepetycje')} className="px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 rounded-full transition-all text-sm cursor-pointer">📚 Korepetycje</button>
                    <button onClick={() => onSend('Salon Fryzjerski', 'salon')} className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 rounded-full transition-all text-sm cursor-pointer">💇‍♀️ Salon Fryzjerski</button>
                    <button onClick={() => onSend('Makijaż', 'makeup')} className="px-5 py-2.5 bg-rose-500/10 border border-rose-400/30 text-rose-300 hover:bg-rose-500/20 rounded-full transition-all text-sm cursor-pointer">💄 Makijaż</button>
                  </>
                )}

                {step === 'custom_msg' && (
                  <button onClick={() => onSend('Pomiń')} className="px-5 py-2.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-full transition-all text-sm cursor-pointer shadow-lg backdrop-blur-md">Pomiń dodawanie wiadomości</button>
                )}

                {step === 'summary' && (
                  <>
                    <button onClick={() => onSend('Tak, wyślij rezerwację!', 'confirm')} className="px-5 py-2.5 bg-green-500/20 border border-green-500/40 text-green-300 hover:bg-green-500/40 rounded-full transition-all text-sm font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.2)]"><Check className="w-5 h-5" /> Tak, rezerwuję</button>
                    <button onClick={() => onSend('Nie, anuluj', 'cancel')} className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 rounded-full transition-all text-sm cursor-pointer"><X className="w-4 h-4" /> Anuluj</button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`w-full relative flex items-center border rounded-[2rem] p-2 shadow-lg backdrop-blur-xl transition-all ${
            isInputAllowed ? 'bg-[#0a0f1c]/80 border-white/30 focus-within:border-blue-500' : 'bg-black/40 border-white/5 opacity-60'
          }`}>
            <input
              type={step === 'email' || step === 'ask_email' ? 'email' : 'text'}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && isInputAllowed && onSend(inputValue)}
              disabled={!isInputAllowed}
              className="flex-1 bg-transparent px-5 py-2.5 outline-none text-white placeholder-white/40 text-[15px] disabled:cursor-not-allowed"
              autoFocus={isInputAllowed}
            />
            <button 
              onClick={() => onSend(inputValue)}
              disabled={!inputValue.trim() || !isInputAllowed}
              className={`p-3 rounded-full flex items-center justify-center transition-colors ${
                isInputAllowed && inputValue.trim() ? 'bg-white text-black hover:bg-blue-50 cursor-pointer' : 'bg-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}