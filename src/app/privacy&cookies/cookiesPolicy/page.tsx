'use client';

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useState, useEffect } from 'react';

// Hook do wykrywania widoczności sekcji
const useInView = () => {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, inView] as const;
};

export default function CookiesPolicyPage() {
  const [ref, inView] = useInView();

  return (
    <section 
      ref={ref}
      className="py-20 bg-black relative overflow-hidden"
      style={{
        background: 'linear-gradient(0deg, #080808ff 0%, #080808ff 100%)'
      }}
    >
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl text-white font-light">
              Polityka Cookies
            </h1>
          </div>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-orange-300 to-pink-400 mb-6"></div>
          
          <p className="text-white/60 text-sm font-light mb-2">
            Ostatnia aktualizacja: 5 października 2025
          </p>
          <p className="text-white/70 text-base leading-relaxed font-light">
            Niniejszy dokument wyjaśnia, w jaki sposób Whiteslope wykorzystuje pliki cookies 
            na stronie internetowej oraz jak można zarządzać ustawieniami cookies.
          </p>
        </motion.div>

        {/* Treść dokumentu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-10"
        >
          
          {/* Sekcja 1 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              1. Czym są pliki cookies?
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>
                Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas 
                przeglądania stron internetowych. Zawierają informacje umożliwiające rozpoznanie 
                urządzenia podczas kolejnych wizyt oraz zapamiętanie preferencji użytkownika.
              </p>
              <p>
                Cookies są standardowym narzędziem stosowanym przez większość współczesnych stron 
                internetowych, w tym przez Whiteslope, w celu poprawy funkcjonalności i doświadczeń 
                użytkowników.
              </p>
            </div>
          </div>

          {/* Sekcja 2 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              2. Rodzaje wykorzystywanych cookies
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-6">
              
              {/* 2.1 */}
              <div>
                <h3 className="text-lg text-white font-bold mb-3">
                  2.1. Niezbędne pliki cookies <span className="text-green-400 text-sm font-normal">(Wymagane)</span>
                </h3>
                <div className="pl-4 border-l-2 border-white/10 space-y-2">
                  <p>
                    Te pliki są konieczne do podstawowego działania strony i nie wymagają zgody użytkownika.
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Cel:</strong> Zapewnienie bezpieczeństwa sesji, 
                    zapamiętywanie wyborów użytkownika w formularzu kontaktowym, obsługa systemu CMS
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Przykłady:</strong> session_id, csrf_token, cookie_consent
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Okres przechowywania:</strong> Sesja / do 30 dni
                  </p>
                </div>
              </div>

              {/* 2.2 */}
              <div>
                <h3 className="text-lg text-white font-bold mb-3">
                  2.2. Analityczne pliki cookies <span className="text-white/50 text-sm font-normal">(Opcjonalne)</span>
                </h3>
                <div className="pl-4 border-l-2 border-white/10 space-y-2">
                  <p>
                    Umożliwiają analizę ruchu na stronie i sposób korzystania z niej przez użytkowników.
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Cel:</strong> Analiza statystyk odwiedzin, 
                    śledzenie popularności podstron, optymalizacja UX/UI, testowanie wariantów A/B
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Narzędzia:</strong> Google Analytics 4, Hotjar, Microsoft Clarity
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Okres przechowywania:</strong> do 26 miesięcy
                  </p>
                </div>
              </div>

              {/* 2.3 */}
              <div>
                <h3 className="text-lg text-white font-bold mb-3">
                  2.3. Funkcjonalne pliki cookies <span className="text-white/50 text-sm font-normal">(Opcjonalne)</span>
                </h3>
                <div className="pl-4 border-l-2 border-white/10 space-y-2">
                  <p>
                    Zapamiętują wybory i preferencje użytkownika dla lepszego doświadczenia.
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Cel:</strong> Zapamiętywanie preferencji językowych, 
                    ustawień motywu (tryb ciemny/jasny), rozmiaru czcionki, preferowanego układu strony
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Przykłady:</strong> language_preference, theme_mode, layout_config
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Okres przechowywania:</strong> do 12 miesięcy
                  </p>
                </div>
              </div>

              {/* 2.4 */}
              <div>
                <h3 className="text-lg text-white font-bold mb-3">
                  2.4. Marketingowe pliki cookies <span className="text-white/50 text-sm font-normal">(Opcjonalne)</span>
                </h3>
                <div className="pl-4 border-l-2 border-white/10 space-y-2">
                  <p>
                    Służą do śledzenia użytkowników i wyświetlania spersonalizowanych reklam.
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Cel:</strong> Remarketing, targetowanie reklam, 
                    kampanie Google Ads, Facebook Ads, LinkedIn Ads
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Narzędzia:</strong> Google Ads, Meta Pixel, LinkedIn Insight Tag
                  </p>
                  <p className="text-white/60 text-sm">
                    <strong className="text-white/80">Okres przechowywania:</strong> do 24 miesięcy
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Sekcja 3 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              3. Cookies stron trzecich
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>
                Nasza strona może wykorzystywać cookies pochodzące od zewnętrznych dostawców usług:
              </p>
              
              <div className="space-y-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white/90 font-medium mb-1">Google Analytics</p>
                  <p className="text-white/60 text-sm">
                    Analiza ruchu i zachowań użytkowników. 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white/80 underline ml-1">
                      Polityka prywatności Google
                    </a>
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white/90 font-medium mb-1">Google Fonts</p>
                  <p className="text-white/60 text-sm">
                    Dostarczanie czcionek wykorzystywanych na stronie
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white/90 font-medium mb-1">YouTube / Vimeo</p>
                  <p className="text-white/60 text-sm">
                    Odtwarzanie materiałów wideo (jeśli osadzone na stronie)
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white/90 font-medium mb-1">Facebook / Meta</p>
                  <p className="text-white/60 text-sm">
                    Pixel śledzący dla kampanii reklamowych i remarketingu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja 4 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              4. Zarządzanie cookies
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-4">
              
              <div>
                <h3 className="text-lg text-white/90 font-bold mb-3">
                  4.1. Banner cookies
                </h3>
                <p>
                  Podczas pierwszej wizyty na stronie wyświetlany jest banner umożliwiający wyrażenie zgody 
                  lub odmowę na poszczególne kategorie cookies. Ustawienia można zmienić w każdym momencie 
                  klikając link "Ustawienia cookies" w stopce strony.
                </p>
              </div>

              <div>
                <h3 className="text-lg text-white/90 font-bold mb-3">
                  4.2. Ustawienia przeglądarki
                </h3>
                <p className="mb-2">
                  Większość przeglądarek domyślnie akceptuje cookies, ale można to zmienić w ustawieniach:
                </p>
                <ul className="space-y-1 pl-4">
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong className="text-white/90">Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong className="text-white/90">Firefox:</strong> Opcje → Prywatność i bezpieczeństwo → Ciasteczka</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong className="text-white/90">Safari:</strong> Preferencje → Prywatność → Zarządzaj danymi witryn</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong className="text-white/90">Edge:</strong> Ustawienia → Prywatność → Pliki cookie</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-white/90 font-bold mb-3">
                  4.3. Narzędzia zewnętrzne
                </h3>
                <p>
                  Możesz również skorzystać z narzędzi do zarządzania cookies oferowanych przez organizacje trzecie:
                </p>
                <ul className="space-y-1 pl-4 mt-2">
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span className="text-white/60 text-sm">
                      <a href="https://www.youronlinechoices.com/pl/" target="_blank" rel="noopener noreferrer" className="text-white/80 underline">
                        Your Online Choices
                      </a> - rezygnacja z reklam behawioralnych
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span className="text-white/60 text-sm">
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-white/80 underline">
                        Google Analytics Opt-out
                      </a> - wyłączenie śledzenia Google Analytics
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Sekcja 5 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              5. Konsekwencje wyłączenia cookies
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>
                Całkowite zablokowanie cookies może wpłynąć na funkcjonalność strony:
              </p>
              
              <div className="pl-4 border-l-2 border-white/10 space-y-2">
                <p>• Brak możliwości zalogowania się lub wysłania formularza kontaktowego</p>
                <p>• Konieczność ponownego ustawiania preferencji przy każdej wizycie</p>
                <p>• Problemy z korzystaniem z niektórych funkcji interaktywnych</p>
                <p>• Utrata możliwości personalizacji doświadczeń</p>
              </div>
              
              <p className="pt-2">
                Wyłączenie cookies analitycznych i marketingowych nie wpływa na podstawową funkcjonalność strony.
              </p>
            </div>
          </div>

          {/* Sekcja 6 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              6. Aktualizacje polityki
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light">
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies w związku 
                z rozwojem technologii internetowych, zmianami w przepisach prawa lub rozszerzeniem 
                zakresu usług. O istotnych zmianach użytkownicy będą informowani poprzez komunikat 
                na stronie internetowej.
              </p>
            </div>
          </div>

          {/* Sekcja 7 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              7. Kontakt
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-2">
              <p>
                W przypadku pytań dotyczących wykorzystania plików cookies prosimy o kontakt:
              </p>
              <div className="pl-4 pt-2">
                <p className="text-white/80">
                  <strong>Email:</strong> kontakt@whiteslope-studio.pl
                </p>
                <p className="text-white/80">
                  <strong>Whiteslope</strong> - Profesjonalne tworzenie stron internetowych
                </p>
              </div>
            </div>
          </div>

          {/* Stopka dokumentu */}
          <div className="pt-8 mt-8 border-t border-white/10">
            <p className="text-white/50 text-sm font-light text-center">
              Whiteslope Studio- Profesjonalne tworzenie stron internetowych
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};