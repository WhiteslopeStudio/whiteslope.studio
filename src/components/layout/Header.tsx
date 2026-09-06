'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  Search,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { HOMEPAGE_MENU_ITEMS, SUBPAGES_MENU_ITEMS, APP_CONFIG, MAIN_SERVICES, KATEGORIE_MEGA_MENU } from '@/lib/constants';
import { useMobileDetection } from '@/utils/hooks';
import { useSearchEngine } from '@/utils/hooks/useSearchEngine';



export const Header = () => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const toggleMenu = (key: string) => {
  setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
};
const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffersDropdownOpen, setIsOffersDropdownOpen] = useState(false);
  const [activeMegaColumn, setActiveMegaColumn] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  // O tyle pikseli header jest zsunięty w dół, żeby nie nachodzić na pasek promocyjny.
  // Pasek jest w normalnym flow strony, więc przy scrollu offset maleje do zera i header
  // wraca na samą górę - dzięki temu nigdy nie zasłania więcej treści niż wcześniej.
  const [gornyOffset, setGornyOffset] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const offersDropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSearchEngine();
  // przechowuje id kategorii najechanej myszką w mega menu, null = nic nie najechane
  const [aktywnaKategoriaMenu, setAktywnaKategoriaMenu] = useState<string | null>(null);

  // czyści najechaną kategorię - odpalane przy opuszczeniu całego panelu albo kliknięciu pozycji
  const resetujemy_aktywna_kategorie = () => setAktywnaKategoriaMenu(null);

  const isHomepage = pathname === "/";

  const sections = HOMEPAGE_MENU_ITEMS.filter(
    (item) => item.type === "section" && item.href !== "#home"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        offersDropdownRef.current &&
        !offersDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOffersDropdownOpen(false);
        setActiveMegaColumn(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Próg przejścia z przezroczystego/rozmytego headera (w hero) na pełny,
      // czarny pasek - dopiero po przewinięciu ok. 75% wysokości ekranu,
      // żeby header był transparentny/rozmyty przez większość hero.
      setIsScrolled(window.scrollY > window.innerHeight * 0.75);

      // Header podąża za paskiem promocyjnym: dopóki pasek jest widoczny u góry,
      // header stoi pod nim; po przewinięciu paska wskakuje na top: 0.
      const pasek = document.getElementById('promo-bar');
      const wysokoscPaska = pasek?.offsetHeight ?? 0;
      setGornyOffset(Math.max(0, wysokoscPaska - window.scrollY));

      if (!isHomepage) return;

      const sectionIds = sections.map((item) => item.href.substring(1));
      let current = "home";
      const scrollPosition = window.scrollY + 150;

      sectionIds.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Wysokość paska zmienia się przy zmianie szerokości ekranu (1 albo 2 linie tekstu)
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomepage, sections]);

  const isOnServicePage =
    pathname.startsWith("/pricing/") && pathname !== "/pricing";

  const getActiveState = (item: any) => {
    if (item.type === "section") {
      return activeSection === item.href.substring(1);
    } else {
      return pathname === item.href;
    }
  };

  const handleMenuClick = (href: string, type: string) => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsOffersDropdownOpen(false);
    setActiveMegaColumn(null);

    if (type === "section") {
      if (isHomepage) {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!isHomepage) {
      router.push("/");
    }
  };

  return (
    <>
      {/* ref owijamy cały obszar headera + mega menu żeby clickOutside działał */}
      <div ref={offersDropdownRef}>
        <motion.header
          // Wariant mobilny vs desktopowy rozstrzyga CSS (breakpoint md), a nie JS.
          // Dzięki temu przy pierwszym renderze na telefonie nie miga wersja desktopowa,
          // która wcześniej pokazywała się do czasu wykonania efektu useMobileDetection.
          style={{ top: gornyOffset }}
          // Uwaga: transition tylko na kolorach/tle. Gdyby objęło "top", header
          // opóźniałby się o 300 ms przy każdym scrollu i skakał za paskiem.
          className={`fixed left-0 right-0 z-[50] transition-[background-color,border-color,box-shadow] duration-300 ${
            isScrolled
              ? "bg-black/87 backdrop-blur-xl border-b border-white/10 shadow-lg"
              : "bg-transparent border-b border-transparent md:bg-black/87 md:backdrop-blur-xl md:border-white/5"
          }`}
        >
          {/* Topbar promocyjny - wewnątrz fixed headera, żeby zawsze siedział na
              samej górze i nie rozjeżdżał offsetów podstron */}
          {/* Na mobile, dopóki nie przewinięto strony (jesteśmy w hero), zamiast
              pełnego czarnego paska dajemy tylko rozmycie, które gaśnie w dół -
              żeby wideo w tle hero było widoczne pod headerem. */}
          {!isScrolled && (
            <>
              <div
                className="absolute inset-0 z-0 pointer-events-none md:hidden"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
                }}
              />
              {/* Dodatkowe przyciemnienie gradientowe od góry - dla czytelności tekstu na jasnym wideo */}
              <div
                className="absolute inset-0 z-0 pointer-events-none md:hidden"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)' }}
              />
            </>
          )}

          {/* Niższy pasek na mobile (py-2.5), na desktopie bez zmian (py-4) */}
          <div className="relative z-10 container mx-auto px-6 py-2.5 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <motion.div
                  className="cursor-pointer relative overflow-hidden group transition-transform duration-300 hover:scale-105"
                  onClick={handleHomeClick}
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                >
                  <Image
                    src="/_resources/logoWhiteSlopeBlue.webp"
                    alt="WhiteSlope Studio"
                    width={916}
                    height={117}
                    priority
                    sizes="160px"
                    className="h-5 w-auto object-contain relative z-10 transition-all duration-300 group-hover:brightness-125"
                  />
                </motion.div>
              </div>

              {/* Desktop Menu - ukrywane CSS-em, nie JS-em (brak migotania na starcie) */}
              {(
                <nav className="hidden md:flex items-center gap-2 flex-1 justify-end">
                  <div className="flex items-center gap-1">

                    <button
                      onClick={() => router.push("/")}
                      className={`px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:scale-105 ${
                        pathname === "/"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                    >
                      Strona główna
                    </button>

                    {/* REALIZACJE */}
                    <button
                      onClick={() => router.push("/projects")}
                      className={`px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:scale-105 ${
                        pathname === "/projects"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                    >
                      Realizacje
                    </button>

                    {/* OFERTA — trigger mega menu */}
                    <div
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setIsOffersDropdownOpen(true)}
                      onMouseLeave={() => setIsOffersDropdownOpen(false)}
                    >
                      {/* niewidoczny obszar od góry headera do dołu — żeby mysz nie gubiła menu */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '-12px',
                          right: '-12px',
                          bottom: '-20px',
                          zIndex: 1,
                        }}
                      />
                      <button
                        className={`inline-flex items-center relative z-10 px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-1 hover:scale-105 ${
                          isOnServicePage
                            ? 'text-white'
                            : 'text-[#d4d4d4] hover:text-white'
                        }`}
                      >
                        <span>Oferta</span>
                        
                        {/* Natychmiastowa zmiana rotacji (bez transition), oś idealnie na środku */}
                        <ChevronDown 
                          className={`w-4 h-4 ml-1 origin-center ${isOffersDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                      </button>
                    </div>

                    {/* CENNIK */}
                    <button
                      onClick={() => router.push("/pricing")}
                      className={`px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:scale-105 ${
                        pathname === "/pricing"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                    >
                      Cennik
                    </button>
                    
                    


                    

                    

                    {/* aktualności */}
                    <button
                      onClick={() => router.push("/blog")}
                      className={`px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:scale-105 ${
                        pathname === "/blog"
                          ? "text-white"
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                    >
                      Aktualności
                    </button>

                    

                    

                    {/* kontakt */}
                    <button
                      onClick={() => router.push("/contact")}
                      className={`px-4 py-2 rounded-full font-base transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:scale-105 ${
                        pathname === "/contact"
                          ? "text-white"
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                    >
                      Kontakt
                    </button>
                  
                  </div>

                  

                  {/* PRAWA STRONA */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push("/contact")}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-200 border border-zinc-900 text-black hover:bg-white transition-all duration-300 hover:cursor-pointer whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="text-sm font-semibold text-black">Wyceń projekt</span>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-black" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={open}
                        aria-label="Szukaj na Whiteslope"
                        className="p-2 rounded-full bg-zinc-700/50 hover:bg-zinc-600/60 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Search className="w-4 h-4 text-white" />
                      </button>
                      <a
                        href="https://www.instagram.com/whiteslopestudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Whiteslope Studio na Instagramie"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Whiteslope Studio na Facebooku"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.youtube.com/@WhiteslopeStudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Whiteslope Studio na YouTube"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Youtube className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </nav>
              )}

              {/* Mobile Menu Button - również sterowany CSS-em */}
              {(
                <button
                  className="md:hidden p-2 text-white hover:cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}
            </div>
          </div>
        </motion.header>

        {/* MEGA MENU — poza motion.header, fixed pod headerem, pełna szerokość */}
        <AnimatePresence>
          {isOffersDropdownOpen && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="fixed left-0 right-0 z-[49] flex justify-center px-6"
              // Mega menu musi startować pod realną dolną krawędzią headera, a ta
              // przesuwa się w dół o wysokość paska promocyjnego (gornyOffset).
              style={{ top: gornyOffset + (isScrolled ? 65 : 69) }}
              onMouseEnter={() => setIsOffersDropdownOpen(true)}
              onMouseLeave={() => {
                setIsOffersDropdownOpen(false);
                setActiveMegaColumn(null);
              }}
            >
              <div
                style={{
                  width: 'min(1320px, calc(100vw - 48px))',
                  minWidth: '1200px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  background: 'rgba(0, 0, 0, 0.87)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                }}
              onMouseEnter={() => setIsOffersDropdownOpen(true)}
              onMouseLeave={() => {
                setIsOffersDropdownOpen(false);
                setActiveMegaColumn(null);
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '280px 1fr',
                  minHeight: '380px',
                }}
              >
                {/* lewy panel */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px 0 0 16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.88)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      marginBottom: '8px',
                    }}
                  >
                    Wdróż własny chatbot AI
                    <br />z Twoją bazą wiedzy
                  </h3>

                  <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                    Odbierz dostęp do naszego AI Chatbot Buildera. Ustaw styl odpowiedzi i przetestuj go przed wdrożeniem.
                  </p>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '20px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.93)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase' as const,
                        marginBottom: '10px',
                      }}
                    >
                      Skonfiguruj chatbota AI — darmowy dostęp
                    </p>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #000000',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f2f2f2';
                        e.currentTarget.style.borderColor = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.borderColor = '#000000';
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 500, color: '#000000' }}>
                        Odbierz dostęp do AI Buildera
                      </span>
                      <span style={{ fontSize: '12px', color: '#000000' }}>→</span>
                    </button>

                    <p style={{ fontSize: '10px', color: 'rgba(233, 233, 233, 0.86)', lineHeight: 1.5, marginTop: '10px' }}>
                      Wyrażam zgodę na przetwarzanie danych zgodnie z Polityką Prywatności.
                    </p>
                  </div>
                </div>

                {/* prawa strona — nawigacja kategorii + rozwijana lista pozycji */}
                <div
                  style={{
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '0 16px 16px 0',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '240px 1fr',
                      flex: 1,
                      height: '340px',        // ← zmiana: było minHeight, teraz height
                      overflow: 'hidden',     // ← zabezpieczenie: gdyby coś było za wysokie, zostanie ucięte, a nie rozepchnie panelu
                    }}
                    onMouseLeave={resetujemy_aktywna_kategorie}
                  >

                    {/* wąska kolumna z 3 kategoriami głównymi, styl jak w sklepach internetowych */}
                    <div
                      style={{
                        borderRight: '1px solid #efefef',
                        padding: '24px 0',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {KATEGORIE_MEGA_MENU.map((kategoria) => {
                        const czyAktywna = aktywnaKategoriaMenu === kategoria.id;
                        return (
                          <button
                            key={kategoria.id}
                            onMouseEnter={() => setAktywnaKategoriaMenu(kategoria.id)}
                            onClick={() => {
                              setIsOffersDropdownOpen(false);
                              resetujemy_aktywna_kategorie();
                              router.push(kategoria.href);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              textAlign: 'left',
                              background: czyAktywna ? '#dddddd' : 'transparent',
                              border: 'none',
                              borderLeft: czyAktywna ? '2px solid #111' : '2px solid transparent',
                              padding: '14px 22px',
                              cursor: 'pointer',
                              transition: 'background 0.15s, border-color 0.15s',
                            }}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 500, color: '#000000' }}>
                              {kategoria.title}
                            </span>
                            <span style={{ fontSize: '20px', fontWeight: 900, color: czyAktywna ? '#000000' : '#252525' }}>›</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* prawa część: pozycje aktywnej kategorii albo znak wodny w tle, gdy nic nie jest najechane */}
                    <div style={{ position: 'relative', padding: '24px 32px' }}>

                      {!aktywnaKategoriaMenu && (
                        <Image
                          src="/_resources/logoWhiteSlope.webp"
                          alt=""
                          width={916}
                          height={117}
                          sizes="600px"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '600px',
                            height: 'auto',
                            filter: 'invert(1)',
                            opacity: 0.1,
                            pointerEvents: 'none',
                          }}
                        />
                      )}

                      {aktywnaKategoriaMenu && (() => {
                        const kategoria = KATEGORIE_MEGA_MENU.find((k) => k.id === aktywnaKategoriaMenu);
                        if (!kategoria) return null;

                        return (
                          <div>
                            {/* <p
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase' as const,
                                color: '#111',
                                paddingBottom: '12px',
                                borderBottom: '1.5px solid #111',
                                marginBottom: '14px',
                              }}
                            >
                              {kategoria.title}
                            </p> */}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                              {kategoria.items.map((pozycja, indeks) => (
                                <button
                                  key={`${pozycja.href}-${indeks}`}
                                  onClick={() => {
                                    setIsOffersDropdownOpen(false);
                                    resetujemy_aktywna_kategorie();
                                    router.push(pozycja.href);
                                  }}
                                  // Zmienione: hover:bg-zinc-200 (szary) oraz rounded-none (ostre kąty)
                                  className="group block w-full h-[64px] text-left bg-[#f8f9fb] hover:bg-zinc-100 border-none rounded-none py-[10px] px-[12px] cursor-pointer transition-colors duration-150"
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    
                                    {/* Tytuł pozostaje z efektem niebieskiego podkreślenia */}
                                    <span 
                                      className="text-[18px] font-medium text-[#00132d] transition-colors group-hover:text-blue-900 group-hover:underline underline-offset-4 decoration-blue-600"
                                    >
                                      {pozycja.label}
                                    </span>
                                    
                                    {pozycja.badge && (
                                      <span
                                        className={pozycja.badgeColor ?? 'bg-slate-100 text-slate-700 border border-slate-200 group-hover:text-blue-600'}
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 700,
                                          letterSpacing: '0.06em',
                                          textTransform: 'uppercase',
                                          padding: '2px 6px',
                                          borderRadius: '999px',
                                        }}
                                      >
                                        {pozycja.badge}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Opis */}
                                  <div className="text-[12px] text-[#6b7280] mt-[4px] group-hover:text-blue-900">
                                    {pozycja.desc}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                  </div>

                  {/* stopka — bez zmian względem tego, co już masz */}
                  <div
                    style={{
                      marginTop: '20px',
                      padding: '16px 32px 0',
                      borderTop: '1px solid #efefef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Image
                      src="/_resources/whiteslope studio literka sygnet2.png"
                      alt="Whiteslope Studio"
                      width={500}
                      height={500}
                      style={{
                        height: '30px',
                        width: 'auto',
                        filter: 'grayscale(1) brightness(10) invert(0) sepia(1) hue-rotate(200deg) saturate(8) brightness(0.6)',
                      }}
                    />

                    <button
                      onClick={() => {
                        setIsOffersDropdownOpen(false);
                        resetujemy_aktywna_kategorie();
                        router.push('/contact');
                      }}
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#fff',
                        background: '#111',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        marginBottom: '13px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#111'; }}
                    >
                      Bezpłatna konsultacja →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex"
          >
            {/* Tło na cały ekran - Menu z pełną szerokością */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 h-full w-full bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Pasek górny z napisem Menu i przyciskiem zamykania */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-100 shrink-0">
                <span className="text-[18px] font-bold text-zinc-950 tracking-tight">
                  Menu
                </span>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors"
                >
                  <X className="w-7 h-7" strokeWidth={1.5} />
                </button>
              </div>

              {/* GŁÓWNA LISTA */}
              <div className="flex flex-col px-0 py-2">
                
                {/* 1. Strona główna */}
                <button
                  onClick={() => { setIsMenuOpen(false); setLastClickedItem('Strona główna'); router.push("/"); }}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname === "/" ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Strona główna
                </button>

                {/* 2. Realizacje */}
                <button
                  onClick={() => { setIsMenuOpen(false); setLastClickedItem('Realizacje'); router.push("/projects"); }}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname === "/projects" ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Realizacje
                </button>

                {/* 3. OFERTA (Rozwijana) */}
                <button
                  onClick={() => toggleMenu('oferta')}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname.startsWith('/pricing/website') || pathname.startsWith('/saas') || pathname.startsWith('/fixes') || pathname.startsWith('/erp') || pathname.startsWith('/seo') || pathname.startsWith('/pricing/ai-integration/chatbot') || pathname.startsWith('/pricing/video-marketing') ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Oferta
                  <ChevronRight className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${expandedMenus['oferta'] ? 'rotate-90' : ''}`} />
                </button>

                {/* WNĘTRZE OFERTY */}
                {/* Zmiana height:"auto" -> maxHeight: liczba - framer-motion animujac do "auto"
                    musi na kazdej klatce mierzyc realna wysokosc (wymuszony synchroniczny layout),
                    co pokazal profiler jako realny koszt watku glownego. maxHeight z gory znanej
                    wartosci nie wymaga mierzenia - ten sam efekt wizualny, bez kosztu pomiaru. */}
                <AnimatePresence>
                  {expandedMenus['oferta'] && (
                    <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      animate={{ maxHeight: 1400, opacity: 1 }}
                      exit={{ maxHeight: 0, opacity: 0 }}
                      className="overflow-hidden bg-zinc-50/50"
                    >
                      
                      {/* 3.1 Web development */}
                      <button
                        onClick={() => toggleMenu('webdev')}
                        className="flex items-center justify-between w-full text-left pl-10 pr-6 py-4 border-b border-zinc-200/60 text-zinc-900 font-medium active:bg-zinc-100 transition-colors"
                      >
                        Web development
                        <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${expandedMenus['webdev'] ? 'rotate-90' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedMenus['webdev'] && (
                          <motion.div
                            initial={{ maxHeight: 0, opacity: 0 }}
                            animate={{ maxHeight: 320, opacity: 1 }}
                            exit={{ maxHeight: 0, opacity: 0 }}
                            className="overflow-hidden bg-zinc-100/50"
                          >
                            {[
                              { label: 'Strony internetowe', href: '/pricing/website' },
                              { label: 'Aplikacje SaaS', href: '/pricing/website' },
                              { label: 'Poprawki istniejących stron', href: '/pricing/website' },
                              { label: 'Systemy do zarządzania firmą ERP', href: '/pricing/website' },
                              { label: 'Pozycjonowanie SEO', href: '/pricing/website' },
                            ].map((item, index, array) => {
                              // Logika unikania wielokrotnego podświetlenia na tym samym URL
                              const isMatchedPath = pathname === item.href;
                              const isFirstMatch = isMatchedPath && index === array.findIndex(i => i.href === pathname);
                              const isActive = lastClickedItem === item.label || (!lastClickedItem && isFirstMatch);

                              return (
                                <button 
                                  key={item.label} 
                                  onClick={() => { setLastClickedItem(item.label); setIsMenuOpen(false); router.push(item.href); }} 
                                  className={`block w-full text-left pl-14 pr-6 py-3.5 border-b border-zinc-200/50 text-[15px] active:bg-zinc-200/50 transition-colors ${isActive ? "text-[#0057ff] font-semibold" : "text-zinc-600"}`}
                                >
                                  {item.label}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 3.2 Automatyzacja & AI */}
                      <button
                        onClick={() => toggleMenu('ai')}
                        className="flex items-center justify-between w-full text-left pl-10 pr-6 py-4 border-b border-zinc-200/60 text-zinc-900 font-medium active:bg-zinc-100 transition-colors"
                      >
                        Automatyzacja & AI
                        <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${expandedMenus['ai'] ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedMenus['ai'] && (
                          <motion.div
                            initial={{ maxHeight: 0, opacity: 0 }}
                            animate={{ maxHeight: 380, opacity: 1 }}
                            exit={{ maxHeight: 0, opacity: 0 }}
                            className="overflow-hidden bg-zinc-100/50"
                          >
                            {[
                              { label: 'Chatbot AI - pomoc techniczna 24/7', href: '/pricing/ai-integration/chatbot' },
                              { label: 'Chatbot AI - doradca e-commerce', href: '/pricing/ai-integration/chatbot' },
                              { label: 'Chatbot AI - asystent ds. Rezerwacji spotkań', href: '/pricing/ai-integration/chatbot' },
                              { label: 'Obieg dokumentów i danych', href: '/pricing/ai-integration/chatbot' },
                              { label: 'Zarządzanie leadami', href: '/pricing/ai-integration/chatbot' },
                              { label: 'Integracje Systemów (API)', href: '/pricing/ai-integration/chatbot' },
                            ].map((item, index, array) => {
                              const isMatchedPath = pathname === item.href;
                              const isFirstMatch = isMatchedPath && index === array.findIndex(i => i.href === pathname);
                              const isActive = lastClickedItem === item.label || (!lastClickedItem && isFirstMatch);

                              return (
                                <button 
                                  key={item.label} 
                                  onClick={() => { setLastClickedItem(item.label); setIsMenuOpen(false); router.push(item.href); }} 
                                  className={`block w-full text-left pl-14 pr-6 py-3.5 border-b border-zinc-200/50 text-[15px] active:bg-zinc-200/50 transition-colors ${isActive ? "text-[#0057ff] font-semibold" : "text-zinc-600"}`}
                                >
                                  {item.label}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 3.3 Marketing & Video */}
                      <button
                        onClick={() => toggleMenu('marketing')}
                        className="flex items-center justify-between w-full text-left pl-10 pr-6 py-4 border-b border-zinc-200/60 text-zinc-900 font-medium active:bg-zinc-100 transition-colors"
                      >
                        Marketing & Video
                        <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${expandedMenus['marketing'] ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedMenus['marketing'] && (
                          <motion.div
                            initial={{ maxHeight: 0, opacity: 0 }}
                            animate={{ maxHeight: 320, opacity: 1 }}
                            exit={{ maxHeight: 0, opacity: 0 }}
                            className="overflow-hidden bg-zinc-100/50"
                          >
                            {[
                              { label: 'Email marketing', href: '/pricing/video-marketing' },
                              { label: 'Video Marketing', href: '/pricing/video-marketing' },
                              { label: 'Grafika 2D i 3D', href: '/pricing/video-marketing' },
                              { label: 'Produkcja treści UGC', href: '/pricing/video-marketing' },
                              { label: 'Obróbka i postprodukcja dźwięku', href: '/pricing/video-marketing' },
                            ].map((item, index, array) => {
                              const isMatchedPath = pathname === item.href;
                              const isFirstMatch = isMatchedPath && index === array.findIndex(i => i.href === pathname);
                              const isActive = lastClickedItem === item.label || (!lastClickedItem && isFirstMatch);

                              return (
                                <button 
                                  key={item.label} 
                                  onClick={() => { setLastClickedItem(item.label); setIsMenuOpen(false); router.push(item.href); }} 
                                  className={`block w-full text-left pl-14 pr-6 py-3.5 border-b border-zinc-200/50 text-[15px] active:bg-zinc-200/50 transition-colors ${isActive ? "text-[#0057ff] font-semibold" : "text-zinc-600"}`}
                                >
                                  {item.label}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Cennik */}
                <button
                  onClick={() => { setIsMenuOpen(false); setLastClickedItem('Cennik'); router.push("/pricing"); }}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname === "/pricing" ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Cennik
                </button>

                {/* 5. Aktualności */}
                <button
                  onClick={() => { setIsMenuOpen(false); setLastClickedItem('Aktualności'); router.push("/blog"); }}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname === "/blog" ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Aktualności
                </button>

                {/* 6. Kontakt */}
                <button
                  onClick={() => { setIsMenuOpen(false); setLastClickedItem('Kontakt'); router.push("/contact"); }}
                  className={`flex items-center justify-between w-full text-left px-6 py-4 border-b border-zinc-100 bg-white font-medium active:bg-zinc-50 transition-colors ${pathname === "/contact" ? "text-[#0057ff]" : "text-zinc-950"}`}
                >
                  Kontakt
                </button>

                {/* Ikonki społecznościowe */}
                <div className="flex justify-center gap-5 pt-8 pb-4">
                  <a href="https://www.youtube.com/@WhiteslopeStudio" target="_blank" rel="noopener noreferrer" aria-label="Whiteslope Studio na YouTube" className="p-2.5 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-all duration-300 active:scale-95">
                    <Youtube className="w-5 h-5 text-zinc-700" />
                  </a>
                  <a href="https://www.instagram.com/whiteslopestudio/" target="_blank" rel="noopener noreferrer" aria-label="Whiteslope Studio na Instagramie" className="p-2.5 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-all duration-300 active:scale-95">
                    <Instagram className="w-5 h-5 text-zinc-700" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL" target="_blank" rel="noopener noreferrer" aria-label="Whiteslope Studio na Facebooku" className="p-2.5 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-all duration-300 active:scale-95">
                    <Facebook className="w-5 h-5 text-zinc-700" />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
