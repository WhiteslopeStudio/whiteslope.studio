'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, Play, X, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HeroSectionMobile() {
  // FAZA 2c: ten komponent i HeroSection (desktop) sa oba w DOM naraz (CSS
  // decyduje ktory jest widoczny), wiec nie mozemy dac <video src=...> na
  // sztywno - oba probowalyby ladowac to samo 1.3MB wideo rownolegle. src
  // wstawiamy dopiero gdy matchMedia potwierdzi ze TA wersja (mobile,
  // max-width 767px) jest faktycznie widoczna.
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setVideoSrc(mq.matches ? '/animationHero/HeroShowReel.mp4' : undefined);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Zbijacze obiekcji na mobile pokazujemy pojedynczo, zmieniają się co 1.5s,
  // żeby nie zajmowały trzech linijek miejsca jak na desktopie.
  const zbijacze_obiekcji = ['Bez ukrytych kosztów', 'Błyskawiczna wycena', 'Szybki kontakt'];
  const [zbijaczIndex, setZbijaczIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setZbijaczIndex((poprzedni) => (poprzedni + 1) % zbijacze_obiekcji.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [zbijacze_obiekcji.length]);

  // Modal z filmikiem YT, otwierany przyciskiem "Zobacz film" w hero
  const [czyFilmOtwarty, setCzyFilmOtwarty] = useState(false);

  // Lista "co robimy" - gdy wjedzie w widok ekranu, ptaszki po kolei
  // odjeżdżają lekko w prawo, żeby pokazać że pozycje są klikalne.
  const [coRobimyWidoczne, setCoRobimyWidoczne] = useState(false);
  const coRobimyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = coRobimyRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoRobimyWidoczne(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col items-center">

      {/* --- TŁO: Twoje charakterystyczne gradientowe paski (widoczne w CZĘŚCI 2) --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-80 overflow-hidden">
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 85%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 70%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 55%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 40%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.6) 0%, transparent 10%)' }} />
      </div>

      {/* ========================================================= */}
      {/* CZĘŚĆ 1: EKRAN POWITALNY - wideo na pełnym tle, przyciemnione */}
      {/* Social proof przypięty do góry, H1 + przyciski do dołu,     */}
      {/* wszystko wyjustowane do lewej, z zapasem na "Szybki kontakt" */}
      {/* ========================================================= */}
      <style>{`
        @keyframes zbijaczFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zbijacz-animowany { animation: zbijaczFadeIn 0.4s ease-out; }

        @keyframes ptaszekNudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .ptaszek-nudge { animation: ptaszekNudge 0.6s ease-in-out; }
      `}</style>

      <div className="relative z-10 w-full min-h-[100svh] overflow-hidden">

        {/* --- WIDEO NA PEŁNYM TLE --- */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="/animationHero/HeroShowReel-poster.jpg"
          preload="auto"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={videoSrc}
        />

        {/* --- PRZYCIEMNIENIE: wideo ma być widoczne w ok. 40% --- */}
        <div className="absolute inset-0 z-[1] bg-black/60 pointer-events-none" />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.9) 100%)' }}
        />

        {/* --- TREŚĆ: wszystko przyklejone do dołu ekranu --- */}
        <div className="absolute inset-0 z-10 w-full max-w-[500px] mx-auto px-6 pt-[90px] pb-4 flex flex-col justify-end">

          {/* --- DÓŁ: social proof, H1, PARAGRAF, PRZYCISKI, ZBIJACZ OBIEKCJI - DO LEWEJ --- */}
          <div className="flex flex-col items-start text-left">

            {/* --- SOCIAL PROOF: PRZYKLEJONY TUŻ NAD H1, WSZYSTKO W JEDNEJ LINII --- */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2 shrink-0">
                <img
                  src="/_resources/reviews/slawekWieslawski.webp"
                  alt="Zadowolony klient"
                  className="w-6 h-6 rounded-full border-2 border-black object-cover"
                />
                <img
                  src="/_resources/reviews/damianBogdanowicz.webp"
                  alt="Zadowolony klient"
                  className="w-6 h-6 rounded-full border-2 border-black object-cover"
                />
                <img
                  src="/_resources/reviews/easylesson.webp"
                  alt="Zadowolony klient"
                  className="w-6 h-6 rounded-full border-2 border-black object-cover"
                />
              </div>
              <span className="text-blue-400 text-[11px] font-[600] whitespace-nowrap">
                Dołącz do zadowolonych klientów
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-[11px] h-[11px] text-yellow-400 fill-yellow-400" />
                <span className="text-white/80 text-[11px] font-[500]">(5.0)</span>
              </div>
            </div>

            {/* --- NAGŁÓWEK: dokładnie 2 wiersze --- */}
            <h1 className="mb-4 text-[27px] font-[700] leading-[1.2] text-white tracking-tight">
              Strony, produkty,<br />
              marketing, które dowożą.
            </h1>

            {/* --- PARAGRAF: problem -> rozwiązanie -> korzyść --- */}
            <p className="mb-6 text-[14px] leading-relaxed text-white/80">
              Koniec z ładnymi stronami, które nic nie sprzedają. Łączymy web development,
              automatyzacje i marketing w jednym zespole - dzięki temu Twoja strona nie tylko
              dobrze wygląda, ale realnie przynosi zapytania. Zobacz, jak to robimy.
            </p>

            {/* --- PRZYCISKI: główny do lewej, "Zobacz film" wycentrowany w wolnej przestrzeni --- */}
            <div className="flex items-center w-full">
              <Link
                href="/contact"
                prefetch={false}
                className="px-7 bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 text-white font-bold rounded-full h-[52px] flex items-center justify-center transition-all shadow-[0_8px_20px_rgba(59,144,255,0.25)] text-[14px] active:scale-95 group whitespace-nowrap shrink-0"
              >
                Wyceń projekt
                <ArrowRight className="w-[16px] h-[16px] ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCzyFilmOtwarty(true)}
                  className="flex items-center gap-2 text-white font-bold text-[13px] active:scale-95 transition-transform whitespace-nowrap"
                >
                  <span className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </span>
                  Zobacz film
                </button>
              </div>
            </div>

            {/* --- ZBIJACZ OBIEKCJI: jeden na raz, na środku, zmienia się co 1.5s --- */}
            <div className="flex items-center justify-center gap-[6px] mt-5 h-[18px] w-full self-center overflow-hidden text-[13px] text-white/90 font-[500]">
              <CheckCircle2 className="w-[14px] h-[14px] shrink-0 text-green-400" />
              <span key={zbijaczIndex} className="zbijacz-animowany whitespace-nowrap">
                {zbijacze_obiekcji[zbijaczIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL Z FILMIKIEM YT --- */}
      {czyFilmOtwarty && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setCzyFilmOtwarty(false)}
        >
          <button
            type="button"
            onClick={() => setCzyFilmOtwarty(false)}
            aria-label="Zamknij film"
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <div
            className="w-full max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_4TJyWuqkUk?autoplay=1"
              title="Whiteslope Studio - film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* CZĘŚĆ 2: CO ROBIMY (widoczne dopiero po scrollu)            */}
      {/* ========================================================= */}
      <div ref={coRobimyRef} className="relative z-10 w-full bg-[#18191B] pt-8 pb-10">

        {/* --- LISTA KORZYŚCI: ciemne tło na całą szerokość, bez białych marginesów --- */}
        <div className="flex flex-col w-full max-w-[500px] mx-auto text-left px-5">
          <Link
            href="/pricing/website"
            prefetch={false}
            className="flex items-center gap-4 py-5 border-b border-white/10 active:bg-white/5 transition-colors"
          >
            <svg className="w-[28px] h-[28px] text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 256 256">
              <path d="M237,19H19c-8.2,0-14.9,6.7-14.9,14.9v188.3c0,8.2,6.7,14.9,14.9,14.9h218c8.2,0,14.9-6.7,14.9-14.9V33.9 C251.9,25.7,245.2,19,237,19z M199.8,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S194.4,28.9,199.8,28.9z M172.6,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S167.1,28.9,172.6,28.9z M237,223.9H19V58.6h218V223.9z M227.1,48.7c-5.4,0-9.9-4.5-9.9-9.9s4.5-9.9,9.9-9.9s9.9,4.5,9.9,9.9C237,44.3,232.5,48.7,227.1,48.7z M96,74h76.1v14.4H96V74z M126,106.9h96.3v14.3H126V106.9z M126,135.5h96.3v14.3H126V135.5z M126,164.5h96.3v14.3H126V164.5z M32.6,193.1h189.8v14.3H32.6 V193.1z M32.6,106.9h67.8v70.7H32.6V106.9z"></path>
            </svg>
            <span className="flex-1 text-[16px] leading-relaxed text-zinc-300">
              <strong className="text-white font-bold">Strony WWW i systemy webowe</strong>, które generują zlecenia.
            </span>
            <ChevronRight
              className={`w-5 h-5 text-zinc-400 shrink-0 ${coRobimyWidoczne ? 'ptaszek-nudge' : ''}`}
              style={{ animationDelay: '0ms' }}
            />
          </Link>

          <Link
            href="/pricing/ai-integration"
            prefetch={false}
            className="flex items-center gap-4 py-5 border-b border-white/10 active:bg-white/5 transition-colors"
          >
            <svg className="w-[28px] h-[28px] text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 13.293V3h-8V1H8v2H3v4h1V4h4v2h5V4h7v9.293L17.707 11l-.707.707 3.5 3.5 3.5-3.5-.707-.707zM12 5H9V2h3zm8 15h-3v-2h-5v2H4v-9.293L6.293 13 7 12.293l-3.5-3.5-3.5 3.5.707.707L3 10.707V21h9v2h5v-2h4v-4h-1zm-4 2h-3v-3h3z"></path>
            </svg>
            <span className="flex-1 text-[16px] leading-relaxed text-zinc-300">
              <strong className="text-white font-bold">Automatyzacje i AI</strong>, które wyręczają Cię z powtarzalnej pracy.
            </span>
            <ChevronRight
              className={`w-5 h-5 text-zinc-400 shrink-0 ${coRobimyWidoczne ? 'ptaszek-nudge' : ''}`}
              style={{ animationDelay: '250ms' }}
            />
          </Link>

          <Link
            href="/pricing/video-marketing"
            prefetch={false}
            className="flex items-center gap-4 py-5 active:bg-white/5 transition-colors"
          >
            <svg className="text-blue-400 w-[28px] h-[28px] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2,19c0-3.9,3.1-7,7-7c2.5,0,4.8,1.3,6.1,3.5l1.7-1c-1-1.7-2.5-3-4.2-3.7C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6S3,2.7,3,6 c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h12v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"></path>
              <path d="M24.1,15.8l-7.6,7.6l-4.7-4.7l1.4-1.4l3.3,3.3l6.2-6.2L24.1,15.8z"></path>
            </svg>
            <span className="flex-1 text-[16px] leading-relaxed text-zinc-300">
              <strong className="text-white font-bold">Wizerunek eksperta</strong> - identyfikacja wizualna, grafiki i wideo, dzięki którym możesz śmiało podnosić stawki.
            </span>
            <ChevronRight
              className={`w-5 h-5 text-zinc-400 shrink-0 ${coRobimyWidoczne ? 'ptaszek-nudge' : ''}`}
              style={{ animationDelay: '500ms' }}
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
