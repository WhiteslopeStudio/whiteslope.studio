'use client';

import { useEffect, useState } from 'react';
import { X, Clock, Globe, ChevronRight, ArrowLeft } from 'lucide-react';
import { EXPERTS, getAvailableHours } from '@/lib/bookingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: 'patryk' | 'mateusz' | 'bartek' | null;
}

type Step = 'calendar' | 'time' | 'form' | 'success';

const MONTH_NAMES = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

// zwraca jutrzejsza polnoc - najwczesniejszy dzien mozliwy do zabookowania
function pobiera_najwczesniejszy_mozliwy_dzien(): Date {
  const jutro = new Date();
  jutro.setDate(jutro.getDate() + 1);
  jutro.setHours(0, 0, 0, 0);
  return jutro;
}

export default function BookingModalMobile({ isOpen, onClose, expert }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  
  // Stany logiki biznesowej
  const [step, setStep] = useState<Step>('calendar');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  // Stany formularza
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Blokowanie scrolla i resetowanie stanu
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('calendar');
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentMonthDate(new Date());
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Odświeżanie aktualnej godziny (co minutę)
  useEffect(() => {
    if (!isOpen) return;
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('pl-PL', { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!mounted || !isOpen || !expert) return null;

  // Rozbudowane dane ekspertów (dodana rola)
  const expertData = {
    patryk: {
      name: 'Patryk Kulesza',
      role: 'Full-stack Developer',
      title: 'Bezpłatna konsultacja',
      avatar: '/_resources/team/patryk.webp'
    },
    mateusz: {
      name: 'Mateusz Malewski',
      role: 'Website Designer',
      title: 'Bezpłatna konsultacja',
      avatar: '/_resources/team/mateusz.webp'
    },
    bartek: {
      name: 'Bartek Koźluk',
      role: 'Lider Techniczny',
      title: 'Bezpłatna konsultacja',
      avatar: '/_resources/team/bartek.webp'
    }
  };

  const data = expertData[expert];

  // --- LOGIKA KALENDARZA ---
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const najwczesniejszyDzien = pobiera_najwczesniejszy_mozliwy_dzien();
    const isPast = clickedDate < najwczesniejszyDzien;
    const isWeekend = clickedDate.getDay() === 0 || clickedDate.getDay() === 6;
    
    // Zablokowanie kliknięcia w przeszłość, dzisiejszy dzień i weekendy
    if (isPast || isWeekend) return;
    
    setSelectedDate(clickedDate);
    setAvailableHours(getAvailableHours(expert, clickedDate));
    setStep('time');
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (topic.trim().length < 10) {
      setError('Temat musi mieć co najmniej 10 znaków.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedDate = selectedDate?.toLocaleDateString('pl-PL');
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'meeting',
          formData: {
            name,
            email,
            preferredDate: formattedDate,
            preferredTime: selectedTime,
            meetingType: `Bezpłatna konsultacja: ${data.name}`,
            topic: topic,
          }
        })
      });

      if (!res.ok) throw new Error('Błąd podczas wysyłania');
      setStep('success');
    } catch (err) {
      setError('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
      {/* Niewidzialne tło do zamykania modala */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Główny kontener modala - max-h-[90vh] i overflow-y-auto rozwiązuje problem braku miejsca na ekranie */}
      <div className="relative w-full max-w-[400px] max-h-[90vh] bg-[#1c1c1e] border border-zinc-800 rounded-[24px] shadow-2xl flex flex-col overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Przycisk zamknięcia */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* --- KOMPAKTOWY HEADER (Mobile) --- */}
        <div className="w-full bg-[#161616] p-5 pt-6 border-b border-zinc-800 flex flex-col shrink-0">
          
          <div className="flex justify-between items-start gap-4">
            {/* Teksty po lewej */}
            <div className="flex-1 pr-6">
              <p className="text-zinc-400 text-[12px] font-medium leading-none mb-1.5">{data.name} • {data.role}</p>
              <h2 className="text-white text-[18px] font-bold leading-tight mb-3">{data.title}</h2>
              
              {/* Informacje o spotkaniu */}
              <div className="flex flex-wrap items-center gap-3 text-zinc-300 font-medium text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>30 min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" 
                    alt="Google Meet" 
                    className="w-3.5 h-3.5 shrink-0 object-contain" 
                  />
                  <span>Google Meet</span>
                </div>
              </div>
            </div>

            {/* Awatar po prawej */}
            <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-zinc-800 shrink-0 mt-0.5">
              <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Ostrzeżenie pod spodem */}
          <div className="mt-4 bg-zinc-800/50 rounded-xl p-3 border border-zinc-800/50">
            <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
              <strong className="text-white">Ważne:</strong> Wstępna rezerwacja. Potwierdzenie i link do spotkania wyślemy na Twój e-mail.
            </p>
          </div>

        </div>

        {/* --- DYNAMICZNY WIDOK (Body) --- */}
        <div className="w-full p-5 flex flex-col flex-1">
          
          {/* WIDOK 1: KALENDARZ */}
          {step === 'calendar' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-[17px] font-bold">
                  {MONTH_NAMES[month]} <span className="text-zinc-500 font-normal">{year}</span>
                </h3>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <div>Pn</div><div>Wt</div><div>Śr</div><div>Cz</div><div>Pt</div><div>Sb</div><div>Nd</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const iterDate = new Date(year, month, day);
                  const najwczesniejszyDzien = pobiera_najwczesniejszy_mozliwy_dzien();
                  const isPast = iterDate < najwczesniejszyDzien;
                  const isWeekend = iterDate.getDay() === 0 || iterDate.getDay() === 6;
                  const isAvailable = !isPast && !isWeekend;
                  
                  return (
                    <div 
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`aspect-square flex items-center justify-center text-[13px] rounded-lg transition-all ${
                        isAvailable
                          ? 'bg-zinc-800 text-zinc-200 active:bg-zinc-600 cursor-pointer font-bold shadow-sm' 
                          : 'text-zinc-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col items-center justify-center border-t border-zinc-800 pt-5 gap-1.5">
                <span className="text-[12px] font-bold text-zinc-300">{currentTime}</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-zinc-500" />
                  <span className="text-[11px] font-medium text-zinc-500">Czas środkowoeuropejski</span>
                </div>
              </div>
            </div>
          )}

          {/* WIDOK 2: WYBÓR GODZINY */}
          {step === 'time' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
              <button 
                onClick={() => setStep('calendar')}
                className="inline-flex items-center gap-1.5 text-zinc-400 active:text-white transition-colors text-[13px] font-medium mb-5 w-fit"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Powrót
              </button>

              <h3 className="text-white text-[16px] font-bold mb-5">
                {selectedDate?.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>

              {availableHours.length > 0 ? (
                <div className="grid grid-cols-3 gap-2.5">
                  {availableHours.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className="py-2.5 px-2 rounded-xl border border-zinc-700 bg-zinc-800/50 active:bg-white active:text-black active:border-white text-zinc-300 font-bold text-[13px] transition-all text-center"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-zinc-500" />
                  </div>
                  <h4 className="text-white font-bold mb-1.5 text-[15px]">Brak terminów</h4>
                  <p className="text-zinc-400 text-[12px] mb-5 leading-relaxed">
                    Przepraszamy, brak wolnych godzin.
                  </p>
                  <button 
                    onClick={() => setStep('calendar')}
                    className="px-5 py-2.5 bg-zinc-800 active:bg-zinc-700 text-white rounded-full text-[13px] font-bold transition-colors"
                  >
                    Wybierz inny dzień
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WIDOK 3: FORMULARZ */}
          {step === 'form' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
              <button 
                onClick={() => setStep('time')}
                className="inline-flex items-center gap-1.5 text-zinc-400 active:text-white transition-colors text-[13px] font-medium mb-5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Zmień godzinę
              </button>

              <h3 className="text-white text-[16px] font-bold mb-1">Dane rezerwacji</h3>
              <p className="text-blue-400 font-semibold mb-5 text-[13px]">
                {selectedDate?.toLocaleDateString('pl-PL')} o {selectedTime}
              </p>

              <form onSubmit={submitBooking} className="space-y-3.5 flex flex-col flex-1">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1 ml-1 uppercase tracking-wider">Imię i nazwisko</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} 
                    className="w-full bg-zinc-900/50 border-b-2 border-zinc-700 px-3 py-2.5 text-white text-[14px] placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1 ml-1 uppercase tracking-wider">Email</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-zinc-900/50 border-b-2 border-zinc-700 px-3 py-2.5 text-white text-[14px] placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1 ml-1 uppercase tracking-wider">Temat (min. 10 znaków)</label>
                  <textarea required value={topic} onChange={e => setTopic(e.target.value)} 
                    className="w-full bg-zinc-900/50 border-b-2 border-zinc-700 px-3 py-2.5 text-white text-[14px] placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors resize-none" 
                    rows={3}
                  />
                </div>
                
                {error && <p className="text-red-400 text-[12px] font-medium">{error}</p>}

                <div className="mt-auto pt-2">
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-white text-black active:bg-zinc-200 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-[14px]"
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie o spotkanie'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* WIDOK 4: SUKCES */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-5">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-white text-[20px] font-bold mb-2">Rezerwacja przyjęta!</h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed mb-6">
                Sprawdź skrzynkę e-mail, wkrótce otrzymasz potwierdzenie i link do Google Meet.
              </p>
              <button onClick={onClose} className="px-6 py-3 bg-zinc-800 active:bg-zinc-700 text-white rounded-full text-[14px] font-bold transition-colors">
                Zamknij okno
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}