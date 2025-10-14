'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { HOMEPAGE_MENU_ITEMS, SUBPAGES_MENU_ITEMS, APP_CONFIG, MAIN_SERVICES } from '@/lib/constants';
import { useMobileDetection } from '@/utils/hooks';
import { Search } from 'lucide-react'; // Dodaj do importów na górze
import { useSearchEngine } from '@/utils/hooks/useSearchEngine'; // Dodaj do importów


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffersDropdownOpen, setIsOffersDropdownOpen] = useState(false); // NEW: Stan dla dropdown Oferty
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const offersDropdownRef = useRef<HTMLDivElement>(null); // NEW: Ref dla dropdown Oferty
  const isMobile = useMobileDetection();
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSearchEngine();

  const isHomepage = pathname === "/";



  // Separate sections from pages
  const sections = HOMEPAGE_MENU_ITEMS.filter(
    (item) => item.type === "section" && item.href !== "#home"
  );
  const pages = isHomepage
    ? HOMEPAGE_MENU_ITEMS.filter((item) => item.type === "page")
    : SUBPAGES_MENU_ITEMS;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      // NEW: Zamykanie dropdown Oferty
      if (
        offersDropdownRef.current &&
        !offersDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOffersDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll detection and section tracking (only on homepage)
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

  // Sprawdź czy jesteśmy na konkretnej usłudze (nie na głównym /pricing)
  const isOnServicePage =
    pathname.startsWith("/pricing/") && pathname !== "/pricing";

  // Get active state for menu items
  const getActiveState = (item: any) => {
    if (item.type === "section") {
      return activeSection === item.href.substring(1);
    } else {
      return pathname === item.href;
    }
  };

  // Handle menu clicks
  const handleMenuClick = (href: string, type: string) => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsOffersDropdownOpen(false);

    if (type === "section") {
      if (isHomepage) {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  // Handle home click
  const handleHomeClick = () => {
    if (isHomepage) {
      const element = document.getElementById("home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/");
    }
  };

  

  // NEW: Sprawdź czy jesteśmy na stronie oferty
  const isOnPricingPage = pathname.startsWith("/pricing");

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={handleHomeClick}
              >
                <img
                  src="/_resources/logoWhiteSlope.webp"
                  alt="WhiteSlope Studio"
                  className="h-5 w-auto object-contain"
                />
              </motion.div>

              {/* Search Button - przylepiony do logo */}
              {!isMobile && (
                <motion.button
                  onClick={open}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Szukaj - WhiteSearch</span>
                  <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700 rounded">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </motion.button>
              )}
            </div>

            {/* Desktop Menu */}
            {!isMobile && (
              

              <nav className="flex items-center space-x-1">
                {/* Sections Dropdown - only on homepage */}
                {isHomepage && (
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <motion.button
                      onClick={() => router.push("/home")}
                      className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                        sections.some((item) => getActiveState(item))
                          ? "text-white bg-white/5"
                          : "text-[#a3a3a3] hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>
                        {activeSection === "home"
                          ? "Home"
                          : sections.find(
                              (item) => item.href.substring(1) === activeSection
                            )?.label || "Sekcje"}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </motion.div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-[#171717]/95 backdrop-blur-lg border border-[#404040] rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="py-2">
                            {sections.map((item) => (
                              <button
                                key={item.href}
                                onClick={() =>
                                  handleMenuClick(item.href, item.type)
                                }
                                className={`block w-full text-left px-4 py-3 transition-all duration-200 hover:cursor-pointer ${
                                  getActiveState(item)
                                    ? "text-white"
                                    : "text-[#d4d4d4]  hover:text-white"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* OFERTA DROPDOWN */}
                <div
                  className="relative"
                  ref={offersDropdownRef}
                  onMouseEnter={() => setIsOffersDropdownOpen(true)}
                  onMouseLeave={() => setIsOffersDropdownOpen(false)}
                >
                  <motion.button
                    onClick={() => router.push("/pricing")}
                    className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                      isOnServicePage
                        ? "text-white "
                        : "text-[#a3a3a3] hover:text-white "
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Oferta</span>
                    <motion.div
                      animate={{ rotate: isOffersDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </motion.div>
                  </motion.button>

                  {/* Offers Dropdown Menu */}
                  <AnimatePresence>
                    {isOffersDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#171717]/95 backdrop-blur-lg border border-[#404040] rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="py-2">
                          {MAIN_SERVICES.map((service: { label: string; href: string }) => (
                            <button
                              key={service.href}
                              onClick={() => {
                                setIsOffersDropdownOpen(false);
                                router.push(service.href);
                              }}
                              className={`block w-full text-left px-4 py-3 transition-all duration-200 hover:cursor-pointer ${
                                pathname === service.href
                                  ? " text-white"
                                  : "text-[#d4d4d4]  hover:text-white"
                              }`}
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Page Links */}
                {pages.map((item, index) => (
                  <motion.button
                    key={`${item.label}-${pathname}`}
                    onClick={() => handleMenuClick(item.href, item.type)}
                    className={`block w-full text-left mx-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                        item.label === 'Kontakt'
                          ? 'bg-white text-black'
                          : getActiveState(item)
                          ? 'bg-white/10 text-white'
                          : 'text-[#d4d4d4] hover:text-white'
                      }`}
                    transition={{
                      duration: 0.5,
                      delay: (isHomepage ? 0.2 : 0) + index * 0.1,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Social Media Icons */}
              <div className="flex items-center gap-4 mr-4 mx-4">
                <a
                  href="https://instagram.com/twoj_profil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full  transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>

                <a
                  href="https://facebook.com/twoj_profil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 ounded-full transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-[#171717]/95 backdrop-blur-lg border-l border-[#404040] shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col min-h-full pt-24 pb-8 px-6">
                {/* Logo in mobile menu */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center space-x-3 mb-8 pb-6 border-b border-[#404040]"
                >
                  <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded-lg">
                    WS
                  </div>
                  <span className="text-lg font-bold text-white">
                    {APP_CONFIG.name}
                  </span>
                </motion.div>

                {/* Menu Items */}
                <div className="flex-1 space-y-2">
                  {/* Sections - only on homepage */}
                  {isHomepage && (
                    <>
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#737373] text-xs uppercase tracking-wide px-4 py-2 border-b border-[#262626]"
                      >
                        Sekcje strony
                      </motion.div>

                      {sections.map((item, index) => (
                        <motion.button
                          key={`${item.label}-mobile-section`}
                          onClick={() => handleMenuClick(item.href, item.type)}
                          className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                            getActiveState(item)
                              ? "bg-white/10 text-white"
                              : "text-[#d4d4d4] hover:text-white"
                          }`}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05 + 0.1,
                          }}
                          whileHover={{ x: 10 }}
                        >
                          {item.label}
                        </motion.button>
                      ))}

                      <div className="h-4" />
                    </>
                  )}

                  {/* NEW: OFERTA w mobile menu */}
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
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push(service.href);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                        pathname === service.href
                          ? "bg-white/10 text-white"
                          : "text-[#d4d4d4] hover:text-white"
                      }`}
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
                    Podstrony
                  </motion.div>

                  {/* Pages */}
                  {pages.map((item, index) => (
                    <motion.button
                      key={`${item.label}-mobile-page`}
                      onClick={() => handleMenuClick(item.href, item.type)}
                      className={`block w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-300 hover:cursor-pointer ${
                        getActiveState(item)
                          ? "bg-white/10 text-white"
                          : "text-[#d4d4d4]  hover:text-white"
                      }`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: (isHomepage ? 0.4 : 0.1) + index * 0.05,
                      }}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* Contact Info + Social Media */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="border-t border-[#404040] pt-6 space-y-4"
                >
                  <div className="text-center text-[#737373] text-sm">
                    Skontaktuj się z nami
                  </div>
                  <div className="text-center">
                    <a
                      href={`mailto:${APP_CONFIG.email}`}
                      className="text-white hover:text-[#d4d4d4] transition-colors text-sm hover:cursor-pointer"
                    >
                      {APP_CONFIG.email}
                    </a>
                  </div>
                  <div className="text-center">
                    <a
                      href={`tel:${APP_CONFIG.phone}`}
                      className="text-white hover:text-[#d4d4d4] transition-colors text-sm hover:cursor-pointer"
                    >
                      {APP_CONFIG.phone}
                    </a>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex justify-center gap-4 pt-2">
                    <a
                      href="https://instagram.com/twoj_profil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://facebook.com/twoj_profil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                    >
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
