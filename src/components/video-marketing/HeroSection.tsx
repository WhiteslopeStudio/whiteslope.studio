'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaPinterestP, FaYoutube } from 'react-icons/fa6';
import { colors, fonts, headingStyle, ctaBaseClass, ctaSecondaryBaseClass, sectionCtas } from './theme';

// Podświetlenie ważnych słów kluczowych w opisie "Co to jest UGC?" - pogrubione, na różowym tle,
// z lekko zaokrąglonymi rogami (nie ostre/kwadratowe, ale też nie w pełni owalne).
function SlowoKluczowe({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bold rounded-md px-1" style={{ backgroundColor: `${colors.neonPink}30` }}>
      {children}
    </span>
  );
}

export default function HeroSection() {
  const sekcjaRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sekcjaRef}
      className="relative overflow-x-hidden"
      style={{
        backgroundColor: colors.sectionBg.hero,
      }}
    >
      {/* DESKTOP LAYOUT - lg and above. Dwie kolumny: lewa (H1/H2/CTA/social) przypięta do lewej krawędzi sekcji,
          prawa - blok SEO "Co to jest UGC?" też justowany do lewej krawędzi SWOJEJ połowy. */}
      {/* min-height zamiast sztywnego height - na mniejszych monitorach treść (H1 4 linie + H2 + CTA + social)
          może potrzebować więcej miejsca niż 60vh; przy sztywnym height i overflow-hidden było to ucinane
          od góry i wchodziło pod fixed header. Teraz box może urosnąć, więc nic nie nachodzi na header. */}
      {/* min-h-[90vh] na mniejszych ekranach (laptopy), 2xl (1536px+, mniej więcej powyżej 21") - 75vh, żeby
          sekcja nie robiła się przesadnie wysoka na dużych monitorach */}
      <div
        className="hidden lg:flex items-center relative max-w-[1640px] min-h-[90vh] 2xl:min-h-[85vh] mx-auto px-6 md:px-12 pt-32 pb-12"
      >
        {/* Lewa kolumna - tekst przypięty do lewej krawędzi */}
        <div className="w-1/2 h-full flex flex-col justify-center items-start px-8 xl:px-12 z-10">
          <motion.h1
            className="text-4xl xl:text-6xl 2xl:text-7xl font-normal mb-6 text-black"
            style={headingStyle}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Video Marketing
            <br />
            i Content UGC
            <br />
            dla lepszej
            <br />
            konwersji
          </motion.h1>

          <motion.h2
            className="font-bold text-xl lg:text-2xl mb-8 text-black/80 max-w-2xl leading-relaxed"
            style={{ fontFamily: fonts.body }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Angażuj lepiej swoich przyszłych klientów. Pokaż się profesjonalnie w sieci z idealnymi materiałami video.
          </motion.h2>

          <div className="flex items-center gap-4">
            <motion.button
              className={ctaBaseClass}
              style={{
                backgroundColor: sectionCtas.hero.primary.bgColor,
                color: sectionCtas.hero.primary.textColor,
                fontFamily: fonts.cta,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{
                boxShadow: `0 20px 60px rgba(247, 37, 133, 0.6)`,
              }}
              onClick={() => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {sectionCtas.hero.primary.label}
              <ArrowRight size={20} />
            </motion.button>

            <motion.a
              href={sectionCtas.hero.secondary!.href}
              className={ctaSecondaryBaseClass}
              style={{
                backgroundColor: sectionCtas.hero.secondary!.bgColor,
                color: sectionCtas.hero.secondary!.textColor,
                border: sectionCtas.hero.secondary!.border,
                fontFamily: fonts.cta,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sectionCtas.hero.secondary!.label}
              <ArrowRight size={20} />
            </motion.a>
          </div>

          {/* Social icons - przy lewej krawędzi, pod przyciskami */}
          <motion.div
            className="flex items-center gap-5 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.087 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76c-.198.51-.333 1.09-.372 1.944C.01 5.556 0 5.83 0 8c0 2.172.01 2.444.048 3.297.039.852.174 1.434.372 1.943.205.527.478.974.923 1.417.444.445.89.719 1.417.923.51.198 1.09.333 1.943.372C5.556 15.99 5.829 16 8 16c2.172 0 2.444-.01 3.297-.048.852-.039 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.943.038-.853.048-1.125.048-3.297 0-2.171-.01-2.444-.048-3.297-.039-.853-.174-1.434-.372-1.943a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.09-.333-1.943-.372C10.444.01 10.172 0 8 0m0 1.441c2.134 0 2.389.008 3.232.046.78.035 1.204.166 1.485.275.371.144.636.317.914.595.278.278.451.543.595.914.109.281.24.705.275 1.485.038.843.046 1.098.046 3.232s-.008 2.389-.046 3.232c-.035.78-.166 1.204-.275 1.485a2.46 2.46 0 0 1-.595.914 2.46 2.46 0 0 1-.914.595c-.281.109-.705.24-1.485.275-.843.038-1.098.046-3.232.046s-2.389-.008-3.232-.046c-.78-.035-1.204-.166-1.485-.275a2.46 2.46 0 0 1-.914-.595 2.46 2.46 0 0 1-.595-.914c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.098-.046-3.232s.008-2.389.046-3.232c.035-.78.166-1.204.275-1.485.144-.371.317-.636.595-.914.278-.278.543-.451.914-.595.281-.109.705-.24 1.485-.275.843-.038 1.098-.046 3.232-.046" />
                <path d="M8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892m0 6.776a2.668 2.668 0 1 1 0-5.336 2.668 2.668 0 0 1 0 5.336m4.271-6.945a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaYoutube size={30} />
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M9 0h3.5a5.5 5.5 0 0 0 3.5 3.5V7a9 9 0 0 1-3.5-.7v5.2A4.5 4.5 0 1 1 8 7V10a1.5 1.5 0 1 0 1 1.4z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPinterestP size={30} />
            </motion.a>
          </motion.div>
        </div>

        {/* Prawa kolumna - blok SEO "Co to jest UGC?", też justowany do lewej krawędzi swojej połowy */}
        <motion.div
          className="w-1/2 h-full flex flex-col justify-center items-start px-8 xl:px-12 z-10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Nasz Dział VIDEO - awatary ekipy + krótki opis, nad blokiem "Co to jest UGC?" */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-3 shrink-0">
              <a
                href="https://www.instagram.com/damian_bogdanowicz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"
              >
                <img
                  src="/_resources/videoMarketing/Damian.webp"
                  alt="Damian"
                  className="w-full h-full object-cover"
                />
              </a>
              <a
                href="https://www.instagram.com/mateusz.malewski.10/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"
              >
                <img src="/_resources/videoMarketing/Mati.webp" alt="Mateusz" className="w-full h-full object-cover" />
              </a>
              <a
                href="https://www.instagram.com/magdajzkv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"
              >
                <img
                  src="/_resources/videoMarketing/magda/MAGDA_PERSON.webp"
                  alt="Magda"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <p className="text-sm xl:text-base text-black/70" style={{ fontFamily: fonts.body }}>
              <span className="font-semibold text-black">Nasz Dział VIDEO</span> - Kręcimy, montujemy i tworzymy
              content UGC. Poznaj ekipę, z którą to robimy:
            </p>
          </div>

          <h3
            className="text-2xl xl:text-3xl font-bold mb-4 text-black"
            style={{ fontFamily: fonts.heading }}
          >
            Co to jest UGC?
          </h3>
          <p
            className="text-base xl:text-lg leading-relaxed text-black/80 max-w-xl"
            style={{ fontFamily: fonts.body }}
          >
            UGC (User Generated Content) to autentyczne treści wideo i foto tworzone przez prawdziwych twórców. Jako{' '}
            <SlowoKluczowe>dział UGC agencji</SlowoKluczowe>, <SlowoKluczowe>Whiteslope Studio</SlowoKluczowe> łączy
            marki z doświadczonymi <SlowoKluczowe>twórcami</SlowoKluczowe>, którzy nagrywają naturalny, angażujący{' '}
            <SlowoKluczowe>content</SlowoKluczowe> dopasowany do social mediów - Instagram, TikTok, YouTube Shorts.
            Taki materiał wygląda jak polecenie znajomych, nie jak reklama, dzięki czemu buduje zaufanie i realnie
            przekłada się na <SlowoKluczowe>lepszą sprzedaż</SlowoKluczowe>. Nasze{' '}
            <SlowoKluczowe>treści social media</SlowoKluczowe> są <SlowoKluczowe>user friendly</SlowoKluczowe>,
            lekkie w odbiorze i gotowe do publikacji od ręki.
          </p>
        </motion.div>
      </div>

      {/* MOBILE LAYOUT - below lg. min-h-[100svh], żeby sekcja wypełniała cały ekran telefonu (na fulla).
          justify-center by tu nie zadziałało dobrze - całość treści (h1+h2+cta+social+UGC) jest znacznie
          wyższa niż ekran, więc wyśrodkowanie CAŁEGO bloku ciągnęło h1 w górę, pod nawigację. Zamiast tego
          justify-start + duży padding-top liczony w vh, żeby SAM h1 lądował mniej więcej na środku ekranu,
          niezależnie od tego ile treści jest pod nim. */}
      <div className="flex lg:hidden flex-col items-center justify-start min-h-[100svh] px-8 pt-[24vh] pb-14">
        <motion.h1
          className="text-4xl md:text-5xl font-normal mb-6 text-black text-center"
          style={headingStyle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Video Marketing
          <br />
          i Content UGC
          <br />
          dla lepszej
          <br />
          konwersji
        </motion.h1>

        <motion.h2
          className="font-bold text-lg md:text-xl mb-8 text-black/80 text-center max-w-2xl leading-relaxed"
          style={{ fontFamily: fonts.body }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Angażuj lepiej swoich przyszłych klientów. Pokaż się profesjonalnie w sieci z idealnymi materiałami video.
        </motion.h2>

        <motion.div
          className="flex flex-col gap-3 w-full mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className={`${ctaBaseClass} justify-center`}
            style={{
              backgroundColor: sectionCtas.hero.primary.bgColor,
              color: sectionCtas.hero.primary.textColor,
              fontFamily: fonts.cta,
            }}
            whileHover={{
              boxShadow: `0 20px 60px rgba(247, 37, 133, 0.6)`,
            }}
            onClick={() => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {sectionCtas.hero.primary.label}
            <ArrowRight size={20} />
          </motion.button>

          <motion.a
            href={sectionCtas.hero.secondary!.href}
            className={`${ctaSecondaryBaseClass} justify-center`}
            style={{
              backgroundColor: sectionCtas.hero.secondary!.bgColor,
              color: sectionCtas.hero.secondary!.textColor,
              border: sectionCtas.hero.secondary!.border,
              fontFamily: fonts.cta,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sectionCtas.hero.secondary!.label}
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>

        {/* Mobile - Social Icons */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.087 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76c-.198.51-.333 1.09-.372 1.944C.01 5.556 0 5.83 0 8c0 2.172.01 2.444.048 3.297.039.852.174 1.434.372 1.943.205.527.478.974.923 1.417.444.445.89.719 1.417.923.51.198 1.09.333 1.943.372C5.556 15.99 5.829 16 8 16c2.172 0 2.444-.01 3.297-.048.852-.039 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.943.038-.853.048-1.125.048-3.297 0-2.171-.01-2.444-.048-3.297-.039-.853-.174-1.434-.372-1.943a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.09-.333-1.943-.372C10.444.01 10.172 0 8 0m0 1.441c2.134 0 2.389.008 3.232.046.78.035 1.204.166 1.485.275.371.144.636.317.914.595.278.278.451.543.595.914.109.281.24.705.275 1.485.038.843.046 1.098.046 3.232s-.008 2.389-.046 3.232c-.035.78-.166 1.204-.275 1.485a2.46 2.46 0 0 1-.595.914 2.46 2.46 0 0 1-.914.595c-.281.109-.705.24-1.485.275-.843.038-1.098.046-3.232.046s-2.389-.008-3.232-.046c-.78-.035-1.204-.166-1.485-.275a2.46 2.46 0 0 1-.914-.595 2.46 2.46 0 0 1-.595-.914c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.098-.046-3.232s.008-2.389.046-3.232c.035-.78.166-1.204.275-1.485.144-.371.317-.636.595-.914.278-.278.543-.451.914-.595.281-.109.705-.24 1.485-.275.843-.038 1.098-.046 3.232-.046" />
              <path d="M8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892m0 6.776a2.668 2.668 0 1 1 0-5.336 2.668 2.668 0 0 1 0 5.336m4.271-6.945a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaYoutube size={30} />
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M9 0h3.5a5.5 5.5 0 0 0 3.5 3.5V7a9 9 0 0 1-3.5-.7v5.2A4.5 4.5 0 1 1 8 7V10a1.5 1.5 0 1 0 1 1.4z"/>
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPinterestP size={30} />
          </motion.a>
        </motion.div>

        {/* Mobile - tylko "Co to jest UGC?", bez bloku "Nasz Dział VIDEO" */}
        <motion.div
          className="w-full mt-12 pt-10 border-t border-black/10 flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3
            className="text-2xl font-bold mb-4 text-black"
            style={{ fontFamily: fonts.heading }}
          >
            Co to jest UGC?
          </h3>
          <p
            className="text-base leading-relaxed text-black/80"
            style={{ fontFamily: fonts.body }}
          >
            UGC (User Generated Content) to autentyczne treści wideo i foto tworzone przez prawdziwych twórców. Jako{' '}
            <SlowoKluczowe>dział UGC agencji</SlowoKluczowe>, <SlowoKluczowe>Whiteslope Studio</SlowoKluczowe> łączy
            marki z doświadczonymi <SlowoKluczowe>twórcami</SlowoKluczowe>, którzy nagrywają naturalny, angażujący{' '}
            <SlowoKluczowe>content</SlowoKluczowe> dopasowany do social mediów - Instagram, TikTok, YouTube Shorts.
            Taki materiał wygląda jak polecenie znajomych, nie jak reklama, dzięki czemu buduje zaufanie i realnie
            przekłada się na <SlowoKluczowe>lepszą sprzedaż</SlowoKluczowe>. Nasze{' '}
            <SlowoKluczowe>treści social media</SlowoKluczowe> są <SlowoKluczowe>user friendly</SlowoKluczowe>,
            lekkie w odbiorze i gotowe do publikacji od ręki.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
