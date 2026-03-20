'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { ArrowUpRight } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';


const AnimatedElement = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

const AnimatedText = ({
  text,
  startDelay = 0,
  wordDelay = 0,
  className = '',
  as: Component = 'span',
}: {
  text: string;
  startDelay?: number;
  wordDelay?: number;
  className?: string;
  as?: any;
}) => {
  const words = text.split(' ');
  return (
    <Component className={className}>
      {words.map((word, index) => (
        <AnimatedElement
          key={index}
          delay={startDelay + index * wordDelay}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </AnimatedElement>
      ))}
    </Component>
  );
};


// Zakładam, że masz zaimportowany typ, np: import { MainService } from '@/lib/types';
const serviceCards = [
  {
    title: 'Web Development',
    description: 'Tworzenie stron internetowych i platform SaaS dla startupów. Profesjonalny UI/UX.',
    glowColor: '#418aff',
    href: '/pricing/website',
    tags: ['#strony', '#saas', '#ui/ux', '#email marketing'],
  },
  {
    title: 'Automatyzacja',
    description: 'Integracja automatyzacji przyspiesza workflow w firmie kilkukrotnie. Oszczędzaj czas i pieniądze.',
    glowColor: '#a855f7',
    href: '/pricing/ai-integration',
    tags: ['#workflow', '#integracje', '#api'],
  },
  {
    title: 'Integracja AI',
    description: 'Chat, który sam odpowiada na pytania klientów. Automatyczne rezerwacje i asystent sklepowy.',
    glowColor: '#06b6d4',
    href: '/pricing/ai-integration',
    tags: ['#chatbot', '#llm', '#asystent'],
  },
  {
    title: 'Marketing & Video',
    description: 'Filmy, które zwracają uwagę. Skierowane pod Twoich klientów i realną sprzedaż.',
    glowColor: '#eab308',
    href: '/pricing/video-marketing',
    tags: ['#video', '#content', '#ugc'],
  },
];

function ServiceCard({
  title,
  description,
  index,
  glowColor,
  href,
  tags,
}: {
  title: string;
  description: string;
  index: number;
  glowColor: string;
  href: string;
  tags: string[];
}) {
  return (
    <a
      href={href}
      className="group relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl flex flex-col justify-end"
    >
      <DottedGlowBackground
        className="opacity-100"
        opacity={0.6}
        gap={6}
        radius={1.2}
        color={glowColor}
        glowColor={glowColor}
        backgroundOpacity={0}
        speedMin={0.4}
        speedMax={1.2}
        speedScale={1}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        }}
      />

      <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
        <ArrowRight className="w-3.5 h-3.5 text-black -rotate-45" />
      </div>

      <div className="relative z-10 p-5">
        <span
          className="text-white/40 text-xs mb-2 block"
          style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 700 }}
        >
          0{index + 1}
        </span>
        <h3
          className="text-2xl text-white"
          style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 700 }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-gray-300 mt-2 leading-relaxed"
          style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 400 }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40"
              style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function HeroSection({ cityOverride }: { cityOverride?: string } = {}) {
  const mainButton = useInteractiveButton();
  const secondaryButton = useInteractiveButton();
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section
      className="relative bg-black pt-40 md:pt-67"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
        overflow: 'clip',
      }}
    >
      {/* TŁO */}
      <div className="absolute inset-0 pointer-events-none">
        <AuroraBackground className="absolute inset-0 h-full w-full" showRadialGradient={false}>
          <></>
        </AuroraBackground>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6">

        {/* GÓRNA CZĘŚĆ — tekst + video */}
        <div className="grid grid-cols-1 min-[1290px]:grid-cols-[1fr_1fr] gap-12 min-[1290px]:gap-16 items-center">

          <div className="relative flex flex-col items-start text-left space-y-6">

            <AnimatedElement delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span
                  className="text-gray-300"
                  style={{
                    fontSize: 'clamp(0.5rem, 10vw, 0.7rem)',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                    fontWeight: 700,
                    fontFamily: '"Gothic A1", sans-serif',
                  }}
                >
                  Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie firm z Podlasia.
                </span>
              </div>
            </AnimatedElement>

            <h2
              className="text-white"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 4.7rem)',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                fontFamily: '"Gothic A1", sans-serif',
              }}
            >
              <AnimatedText text="Pokaż się online" startDelay={200} wordDelay={120} />
              <br />
              <AnimatedText text="z dobrej strony!" startDelay={560} wordDelay={120} />
            </h2>

            <AnimatedElement delay={920}>
              <p
                className="text-gray-400 leading-relaxed max-w-lg"
                style={{
                  fontSize: 'clamp(0.7rem, 10vw, 1.2rem)',
                  lineHeight: '1.5',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  fontFamily: '"Gothic A1", sans-serif',
                }}
              >
                Tworzymy strony internetowe dla biznesów i osób prywatnych. Pozwól sobie pozwalać na więcej wraz ze stroną!
              </p>
            </AnimatedElement>

            <div className="relative flex flex-col sm:flex-row items-start gap-4 pt-2">
              <div className="absolute -bottom-10 left-4 w-[16rem] h-[6rem] rounded-full bg-blue-300/10 blur-[70px] pointer-events-none" />

              <AnimatedElement delay={1100}>
                <PrimaryButton href="/pricing/website">Stwórzmy stronę</PrimaryButton>
              </AnimatedElement>

              <AnimatedElement delay={1250}>
                <SecondaryButton href="/contact#contact-form">Bezpłatna konsultacja</SecondaryButton>
              </AnimatedElement>
            </div>
          </div>

          <AnimatedElement delay={600} className="w-full min-[1290px]:mt-0 mt-12">
            <div
              className="hero-video relative rounded-2xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: '16/9',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07] pointer-events-none z-10" />
              <iframe
                key={isMuted ? 'muted' : 'unmuted'}
                src={`https://www.youtube.com/embed/_4TJyWuqkUk?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=_4TJyWuqkUk&showinfo=0&rel=0&modestbranding=1`}
                title="Whiteslope Studio reel"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </AnimatedElement>
        </div>

        {/* KARTY USŁUG */}
        <AnimatedElement delay={1400} className="w-full mt-40">
          <p
              className="text-white/80 text-2xl mb-6 tracking-widest"
              style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 400, letterSpacing: '0.2em' }}
            >
              Usługi
            </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {serviceCards.map((card, index) => (
              <ServiceCard key={index} index={index} {...card} />
            ))}
          </div>
        </AnimatedElement>

        {/* 🛠️ NAPIS NA DOLE Z MASKOWANYM DOTTED GLOW */}
<div className="relative w-full mt-24 py-16 overflow-hidden rounded-3xl group">
  
  {/* Dotted Background z maską radialną (zanikanie na rogach) */}
  <div 
    className="absolute inset-0 pointer-events-none"
    style={{
      // Maska: środek i dół są widoczne (black), boki i góra zanikają (transparent)
      maskImage: 'radial-gradient(ellipse at center bottom, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center bottom, black 20%, transparent 80%)',
    }}
  >
    <DottedGlowBackground
      className="opacity-100"
      opacity={0.4}
      gap={6}
      radius={1.2}
      colorDarkVar="--color-neutral-500"
      glowColorDarkVar="--color-sky-500"
      backgroundOpacity={0}
      speedMin={0.4}
      speedMax={1.2}
      speedScale={1}
    />
  </div>

  {/* Napis - Duży (H3), Biały, Szeroki */}
  <h3
    className="relative z-10 text-center text-white/90 select-none "
    style={{
      fontFamily: '"Special Gothic Expanded One", sans-serif',      
      fontWeight: 400,
      // Rozmiar H3 - duży i czytelny
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      textShadow: '0 0 40px rgba(255,255,255,0.1)',
      color: '#dbe6f7',
    }}
  >
    <AnimatedText
      text="Kompleksowo przez internetową przestrzeń"
      startDelay={1600}
      wordDelay={100}
    />
  </h3>

  {/* Delikatna poświata pod tekstem dla głębi */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-sky-500/5 blur-[120px] pointer-events-none" />
</div>

      </div>
    </section>
  );
}

export { HeroSection };