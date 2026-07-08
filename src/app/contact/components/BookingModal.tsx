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

export default function BookingModal({ isOpen, onClose, expert }: BookingModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[950px] bg-[#1c1c1e] border border-zinc-800 rounded-[24px] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Przycisk zamknięcia - przeniesiony wyżej, by nie kolidował ze strzałkami */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* --- LEWA STRONA (Informacje) --- */}
        <div className="w-full md:w-[35%] bg-[#161616] p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col">
          <div className="w-14 h-14 rounded-full overflow-hidden mb-5 border-2 border-zinc-800">
            <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">{data.name} • {data.role}</p>
          <h2 className="text-white text-2xl font-bold mb-6">{data.title}</h2>
          
          <div className="space-y-4 text-zinc-300 font-medium text-[14px]">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-zinc-500" />
              <span>30 minut</span>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" 
                alt="Google Meet" 
                className="w-5 h-5 shrink-0 object-contain" 
              />
              <span>Google Meet</span>
            </div>
          </div>

          {/* Ostrzeżenie - Ciemnoszary box, bez AI borderów */}
          <div className="mt-auto pt-8">
            <div className="bg-zinc-800/60 rounded-xl p-4">
              <p className="text-[12px] text-zinc-300 leading-relaxed font-medium">
                <strong className="text-white">Ważne:</strong> To jest wstępna rezerwacja terminu. Potwierdzenie oraz link do spotkania wyślemy na Twój adres e-mail.
              </p>
            </div>
          </div>
        </div>

        {/* --- PRAWA STRONA (Dynamiczny widok) --- */}
        <div className="w-full md:w-[65%] p-6 md:p-8 flex flex-col">
          
          {/* WIDOK 1: KALENDARZ */}
          {step === 'calendar' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
              {/* Zabezpieczamy prawy margines (pr-12), żeby strzałki nie wjeżdżały pod X */}
              <div className="flex items-center justify-between mb-8 pr-12">
                <h3 className="text-white text-xl font-bold">
                  {MONTH_NAMES[month]} <span className="text-zinc-500 font-normal">{year}</span>
                </h3>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4 text-center text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                <div>Pon</div><div>Wt</div><div>Śr</div><div>Czw</div><div>Pt</div><div>Sob</div><div>Ndz</div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center flex-1">
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
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${
                        isAvailable
                          ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white cursor-pointer font-bold shadow-sm' 
                          : 'text-zinc-700 cursor-not-allowed'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Informacja o strefie czasowej z aktualną godziną */}
              <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-zinc-500" />
                  <span className="text-[13px] font-medium text-zinc-400">Europe/Warsaw (Czas środkowoeuropejski)</span>
                </div>
                <span className="text-[13px] font-bold text-zinc-300">{currentTime}</span>
              </div>
            </div>
          )}

          {/* WIDOK 2: WYBÓR GODZINY */}
          {step === 'time' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
              <button 
                onClick={() => setStep('calendar')}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-6 w-fit"
              >
                <ArrowLeft className="w-4 h-4" /> Powrót do kalendarza
              </button>

              <h3 className="text-white text-lg font-bold mb-6">
                {selectedDate?.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>

              {availableHours.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableHours.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className="py-3 px-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-white hover:text-black hover:border-white text-zinc-300 font-bold text-sm transition-all text-center"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-zinc-500" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Brak terminów</h4>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    Przepraszamy, ale w tym dniu nie mamy dostępnych godzin. Prosimy wybrać inny termin.
                  </p>
                  <button 
                    onClick={() => setStep('calendar')}
                    className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-bold transition-colors"
                  >
                    Wybierz inny dzień
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WIDOK 3: FORMULARZ */}
          {step === 'form' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => setStep('time')}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Zmień godzinę
              </button>

              <h3 className="text-white text-xl font-bold mb-2">Szczegóły rezerwacji</h3>
              <p className="text-blue-400 font-semibold mb-6">
                {selectedDate?.toLocaleDateString('pl-PL')} o {selectedTime}
              </p>

              <form onSubmit={submitBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">Imię i nazwisko</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} 
                    className="w-full bg-zinc-900/50 hover:bg-zinc-800 border-b-2 border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">Email</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-zinc-900/50 hover:bg-zinc-800 border-b-2 border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">Temat rozmowy (min. 10 znaków)</label>
                  <textarea required value={topic} onChange={e => setTopic(e.target.value)} 
                    className="w-full bg-zinc-900/50 hover:bg-zinc-800 border-b-2 border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 rounded-t-xl focus:outline-none focus:border-blue-500 transition-colors resize-none" 
                    rows={3}
                  />
                </div>
                
                {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full mt-4 bg-white text-black hover:bg-zinc-200 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Potwierdź rezerwację'}
                </button>
              </form>
            </div>
          )}

          {/* WIDOK 4: SUKCES */}
          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">Wstępna rezerwacja przyjęta!</h3>
              <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-8">
                Przekazaliśmy Twoje zgłoszenie do naszego systemu. Sprawdź swoją skrzynkę e-mail, wkrótce otrzymasz potwierdzenie i link do Google Meet.
              </p>
              <button onClick={onClose} className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-colors">
                Zamknij okno
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}