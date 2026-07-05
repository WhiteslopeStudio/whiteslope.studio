'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffersDropdownOpen, setIsOffersDropdownOpen] = useState(false);
  const [activeMegaColumn, setActiveMegaColumn] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(window.scrollY > 50);

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
            isScrolled
              ? "bg-black/87 backdrop-blur-xl border-b border-white/10 shadow-lg"
              : "bg-black/87 backdrop-blur-xl border-b border-white/5"
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <motion.div
                  className="cursor-pointer relative overflow-hidden group transition-transform duration-300 hover:scale-105"
                  onClick={handleHomeClick}
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                >
                  <img
                    src="/_resources/logoWhiteSlope.webp"
                    alt="WhiteSlope Studio"
                    className="h-5 w-auto object-contain relative z-10 transition-all duration-300 group-hover:brightness-125"
                  />
                </motion.div>
              </div>

              {/* Desktop Menu */}
              {!isMobile && (
                <nav className="flex items-center gap-2 flex-1 justify-end">
                  <div className="flex items-center gap-1">

                    <motion.button
                      onClick={() => router.push("/")}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4  ${
                        pathname === "/"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Strona główna
                    </motion.button>

                    {/* REALIZACJE */}
                    <motion.button
                      onClick={() => router.push("/projects")}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4  ${
                        pathname === "/projects"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Realizacje
                    </motion.button>

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
                      <motion.button
                        onClick={() => router.push('/pricing')}
                        className={`inline-flex items-center relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-1 ${
                          isOnServicePage
                            ? 'text-white'
                            : 'text-[#d4d4d4] hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>Oferta</span>
                        
                        {/* Natychmiastowa zmiana rotacji (bez transition), oś idealnie na środku */}
                        <ChevronDown 
                          className={`w-4 h-4 ml-1 origin-center ${isOffersDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                      </motion.button>
                    </div>

                    {/* CENNIK */}
                    <motion.button
                      onClick={() => router.push("/pricing")}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4  ${
                        pathname === "/pricing"
                          ? "text-white "
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Cennik
                    </motion.button>
                    
                    


                    

                    

                    {/* aktualności */}
                    <motion.button
                      onClick={() => router.push("/blog")}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4  ${
                        pathname === "/blog"
                          ? "text-white"
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Aktualności
                    </motion.button>

                    

                    

                    {/* kontakt */}
                    <motion.button
                      onClick={() => router.push("/contact")}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer hover:underline hover:underline-offset-4  ${
                        pathname === "/contact"
                          ? "text-white"
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Kontakt
                    </motion.button>
                  
                  </div>

                  

                  {/* PRAWA STRONA */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={open}
                      className="flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-200 border border-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-200 transition-all duration-300 hover:cursor-pointer whitespace-nowrap"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Search className="w-4 h-4 flex-shrink-0 text-black" />
                      <span className="text-sm font-medium text-black">Znajdź na Whiteslope</span>
                      <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-white text-black/70 border border-white/20 rounded flex-shrink-0">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                      <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-white text-black/70 border border-white/20 rounded flex-shrink-0">
                        <span className="text-xs">Ctrl</span>K
                      </kbd>
                    </motion.button>

                    

                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.instagram.com/whiteslopestudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.youtube.com/@WhiteslopeStudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                      >
                        <Youtube className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </nav>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.button
                  className="p-2 rounded-full bg-[#262626] text-[#d4d4d4] hover:text-white hover:cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.button>
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
              style={{ top: isScrolled ? '65px' : '69px' }}
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
                        <img
                          src="/_resources/logoWhiteSlope.webp"
                          alt=""
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '600px',
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
                    <img
                      src="/_resources/whiteslope studio literka sygnet2.png"
                      alt="Whiteslope Studio"
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
            className="fixed inset-0 z-40"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-[#171717]/95 backdrop-blur-lg border-l border-[#404040] shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col min-h-full pt-24 pb-8 px-6">
                <div className="flex-1 space-y-2 pt-15">
                  <motion.button
                    onClick={() => { setIsMenuOpen(false); router.push("/"); }}
                    className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === "/" ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    whileHover={{ x: 10 }}
                  >
                    Start
                  </motion.button>

                  <motion.button
                    onClick={() => { setIsMenuOpen(false); router.push("/projects"); }}
                    className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === "/projects" ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    whileHover={{ x: 10 }}
                  >
                    Realizacje
                  </motion.button>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-[#737373] text-xs uppercase tracking-wide px-4 py-2 border-b border-[#262626]"
                  >
                    Oferta
                  </motion.div>

                  {MAIN_SERVICES.map((service: { label: string; href: string }, index: number) => (
                    <motion.button
                      key={`${service.href}-mobile`}
                      onClick={() => { setIsMenuOpen(false); router.push(service.href); }}
                      className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === service.href ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                      whileHover={{ x: 10 }}
                    >
                      {service.label}
                    </motion.button>
                  ))}

                  <div className="h-4" />

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-[#737373] text-xs uppercase tracking-wide px-4 py-2 border-b border-[#262626]"
                  >
                    Inne
                  </motion.div>

                  <motion.button
                    onClick={() => { setIsMenuOpen(false); router.push("/blog"); }}
                    className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === "/blog" ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    whileHover={{ x: 10 }}
                  >
                    Blog
                  </motion.button>

                  <motion.button
                    onClick={() => { setIsMenuOpen(false); router.push("/pricing"); }}
                    className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === "/pricing" ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ x: 10 }}
                  >
                    Cennik
                  </motion.button>

                  <motion.button
                    onClick={() => { setIsMenuOpen(false); router.push("/contact"); }}
                    className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${pathname === "/contact" ? "bg-white/10 text-white" : "text-[#d4d4d4] hover:text-white"}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.45 }}
                    whileHover={{ x: 10 }}
                  >
                    Kontakt
                  </motion.button>
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="border-t border-[#404040] pt-6 space-y-4"
                >
                  <div className="text-center text-[#737373] text-sm">Skontaktuj się z nami</div>
                  <div className="text-center">
                    <a href={`mailto:${APP_CONFIG.email}`} className="text-white hover:text-[#d4d4d4] transition-colors text-sm hover:cursor-pointer">
                      {APP_CONFIG.email}
                    </a>
                  </div>
                  <div className="text-center">
                    <a href={`tel:${APP_CONFIG.phone}`} className="text-white hover:text-[#d4d4d4] transition-colors text-sm hover:cursor-pointer">
                      {APP_CONFIG.phone}
                    </a>
                  </div>

                  <div className="flex justify-center gap-4 pt-2">
                    <a href="https://www.instagram.com/whiteslopestudio/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:cursor-pointer">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:cursor-pointer">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};