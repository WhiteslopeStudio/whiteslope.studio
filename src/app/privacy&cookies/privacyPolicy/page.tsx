'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
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

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl text-white font-light">
              Polityka Prywatności
            </h1>
          </div>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-orange-300 to-pink-400 mb-6"></div>
          
          <p className="text-white/60 text-sm font-light mb-2">
            Ostatnia aktualizacja: 5 października 2025
          </p>
          <p className="text-white/70 text-base leading-relaxed font-light">
            Whiteslope szanuje prywatność użytkowników i zobowiązuje się do ochrony danych osobowych 
            zgodnie z RODO oraz obowiązującymi przepisami prawa.
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
              1. Administrator danych
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>
                Administratorem danych osobowych jest <strong className="text-white/90">Whiteslope</strong>, 
                firma specjalizująca się w tworzeniu profesjonalnych stron internetowych i aplikacji webowych.
              </p>
              <p className="text-white/60 text-sm">
                Kontakt w sprawach ochrony danych: <span className="text-white/80">kontakt@whiteslope.com</span>
              </p>
            </div>
          </div>

          {/* Sekcja 2 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              2. Jakie dane zbieramy
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-4">
              <p>W ramach prowadzonej działalności zbieramy następujące kategorie danych:</p>
              
              <div className="pl-4 border-l-2 border-white/10 space-y-3">
                <p>
                  <strong className="text-white/90">Dane kontaktowe:</strong> imię, nazwisko, adres e-mail, 
                  numer telefonu podawane dobrowolnie przez formularz kontaktowy lub podczas komunikacji.
                </p>
                <p>
                  <strong className="text-white/90">Dane techniczne:</strong> adres IP, typ przeglądarki, 
                  system operacyjny, informacje o urządzeniu, czas odwiedzin strony.
                </p>
                <p>
                  <strong className="text-white/90">Dane projektowe:</strong> informacje o projektach stron 
                  internetowych, wymagania techniczne, pliki i materiały dostarczone w ramach współpracy.
                </p>
                <p>
                  <strong className="text-white/90">Dane płatności:</strong> dane niezbędne do wystawienia 
                  faktury (NIP, adres firmy) - nie przechowujemy danych kart płatniczych.
                </p>
              </div>
            </div>
          </div>

          {/* Sekcja 3 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              3. Cele przetwarzania danych
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>Dane osobowe przetwarzamy w następujących celach:</p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Realizacja umów na tworzenie stron internetowych i aplikacji webowych</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Komunikacja z klientami i odpowiedzi na zapytania ofertowe</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Świadczenie usług wsparcia technicznego i konserwacji stron</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Prowadzenie dokumentacji księgowej i podatkowej</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Marketing bezpośredni (po wyrażeniu zgody)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Analiza ruchu na stronie i optymalizacja doświadczeń użytkownika</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sekcja 4 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              4. Podstawy prawne przetwarzania
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>Przetwarzanie danych odbywa się na podstawie:</p>
              
              <div className="pl-4 border-l-2 border-white/10 space-y-3">
                <p>
                  <strong className="text-white/90">Art. 6 ust. 1 lit. b RODO</strong> - wykonanie umowy 
                  lub podjęcie działań na żądanie osoby przed zawarciem umowy
                </p>
                <p>
                  <strong className="text-white/90">Art. 6 ust. 1 lit. c RODO</strong> - wypełnienie 
                  obowiązków prawnych (np. przepisy podatkowe)
                </p>
                <p>
                  <strong className="text-white/90">Art. 6 ust. 1 lit. f RODO</strong> - uzasadniony 
                  interes administratora (np. dochodzenie roszczeń)
                </p>
                <p>
                  <strong className="text-white/90">Art. 6 ust. 1 lit. a RODO</strong> - zgoda użytkownika 
                  (marketing, newslettery)
                </p>
              </div>
            </div>
          </div>

          {/* Sekcja 5 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              5. Okres przechowywania danych
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>
                Dane przechowujemy przez okres niezbędny do realizacji celów, dla których zostały zebrane:
              </p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Dane umowne: przez czas trwania umowy + 6 lat (obowiązki księgowe)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Zgody marketingowe: do momentu wycofania zgody</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Zapytania niezakończone umową: do 12 miesięcy</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span>Dane techniczne/analityczne: do 26 miesięcy</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sekcja 6 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              6. Udostępnianie danych
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>Dane mogą być udostępniane następującym kategoriom odbiorców:</p>
              
              <div className="pl-4 border-l-2 border-white/10 space-y-3">
                <p>
                  <strong className="text-white/90">Podwykonawcy techniczni:</strong> firmy hostingowe, 
                  dostawcy infrastruktury chmurowej (AWS, Google Cloud, Vercel)
                </p>
                <p>
                  <strong className="text-white/90">Narzędzia analityczne:</strong> Google Analytics, 
                  narzędzia do analizy ruchu na stronie
                </p>
                <p>
                  <strong className="text-white/90">Usługi płatności:</strong> operatorzy płatności 
                  i systemy fakturowania
                </p>
                <p>
                  <strong className="text-white/90">Podmioty uprawnione:</strong> organy państwowe 
                  w zakresie wymaganym prawem
                </p>
              </div>
              
              <p className="pt-2">
                Nie sprzedajemy i nie udostępniamy danych osobowych w celach marketingowych podmiotom trzecim.
              </p>
            </div>
          </div>

          {/* Sekcja 7 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              7. Twoje prawa
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>Zgodnie z RODO przysługują Ci następujące prawa:</p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo dostępu</strong> do swoich danych osobowych</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do sprostowania</strong> nieprawidłowych danych</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do usunięcia</strong> danych ("prawo do bycia zapomnianym")</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do ograniczenia</strong> przetwarzania</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do przenoszenia</strong> danych</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do sprzeciwu</strong> wobec przetwarzania</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/50">•</span>
                  <span><strong className="text-white/90">Prawo do wycofania zgody</strong> w dowolnym momencie</span>
                </li>
              </ul>
              
              <p className="pt-3 text-white/80">
                W celu realizacji swoich praw skontaktuj się z nami: <strong>kontakt@whiteslope.com</strong>
              </p>
            </div>
          </div>

          {/* Sekcja 8 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              8. Bezpieczeństwo danych
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light space-y-3">
              <p>Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo danych:</p>
              
              <div className="pl-4 border-l-2 border-white/10 space-y-2">
                <p>• Szyfrowanie połączeń SSL/TLS</p>
                <p>• Regularne kopie zapasowe danych</p>
                <p>• Kontrola dostępu i autoryzacja wielopoziomowa</p>
                <p>• Monitorowanie i audyty bezpieczeństwa</p>
                <p>• Szyfrowanie danych wrażliwych</p>
                <p>• Szkolenia pracowników w zakresie ochrony danych</p>
              </div>
            </div>
          </div>

          {/* Sekcja 9 */}
          <div>
            <h2 className="text-xl md:text-2xl text-white font-bold mb-4">
              9. Zmiany polityki prywatności
            </h2>
            <div className="w-16 h-px bg-white/20 mb-4"></div>
            <div className="text-white/70 text-base leading-relaxed font-light">
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                O wszelkich istotnych zmianach poinformujemy użytkowników za pośrednictwem strony internetowej 
                lub drogą mailową. Aktualna wersja zawsze dostępna jest na naszej stronie.
              </p>
            </div>
          </div>

          {/* Stopka dokumentu */}
          <div className="pt-8 mt-8 border-t border-white/10">
            <p className="text-white/50 text-sm font-light text-center">
              Whiteslope Studio - Profesjonalne tworzenie stron internetowych
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};