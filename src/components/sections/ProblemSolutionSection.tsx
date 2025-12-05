"use client";

import { 
  AlertCircle, CheckCircle2, TrendingUp, Zap, Search, Clock, 
  ArrowRight, Target, BarChart3, Rocket, MousePointer, LineChart,
  Plus, Minus,
  Link,
  X,
  Check,
  Sparkles,
  Bot
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Hook do wykrywania mobile
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Hook do automatycznego rozwijania na mobile przy przewijaniu (tylko dla desktopu)
const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement | null>, isMobile: boolean) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobile || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      {
        threshold: [0, 0.3, 0.5],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, isMobile]);

  return isVisible;
};

export const ProblemSolutionSection = () => {
  const isMobile = useMobileDetection();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Refy dla każdej karty - potrzebne do wykrywania przewijania
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Sprawdzanie czy karty są widoczne na ekranie (tylko na desktopie)
  const isCard1Visible = useIntersectionObserver(card1Ref, isMobile);
  const isCard2Visible = useIntersectionObserver(card2Ref, isMobile);
  const isCard3Visible = useIntersectionObserver(card3Ref, isMobile);

  // Automatyczne rozwijanie na mobile gdy karta jest widoczna (tylko dla desktopu)
  useEffect(() => {
    if (!isMobile) {
      if (isCard1Visible) setExpandedCard(0);
      else if (isCard2Visible) setExpandedCard(1);
      else if (isCard3Visible) setExpandedCard(2);
    }
  }, [isCard1Visible, isCard2Visible, isCard3Visible, isMobile]);

  // DANE - Problemy
  const problems = [
    {
      icon: <Clock className="w-5 h-5 text-red-500" />,
      title: "Nie masz czasu na stronę internetową?",
      description: "Prowadzisz biznes i nie masz kiedy zająć się stworzeniem czy aktualizacją strony.",
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: "Internet wydaje Ci się skomplikowany?",
      description: "Nie wiesz, jak stworzyć stronę i zacząć promować swoją firmę w sieci.",
    },
    {
      icon: <Search className="w-5 h-5 text-red-500" />,
      title: "Twoja firma jest niewidoczna online?",
      description: "Klienci nie znajdują Twojej firmy w internecie, a Ty chcesz to zmienić.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-red-500" />,
      title: "Nie wiesz, co działa na Twojej stronie?",
      description: "Nie masz pojęcia, ilu ludzi odwiedza Twoją stronę i co można poprawić.",
    },
    {
      icon: <Zap className="w-5 h-5 text-red-500" />,
      title: "Boisz się, że strona to za drogo?",
      description: "Myślisz, że stworzenie strony to duży wydatek, na który Cię nie stać.",
    },
  ];

  // DANE - Rozwiązania
  const solutions = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      title: "Wspieramy Cię w oszczędności czasu",
      description: "Pomagamy stworzyć prostą stronę, abyś mógł skupić się na rozwoju swojego biznesu.",
    },
    {
      icon: <Target className="w-5 h-5 text-green-500" />,
      title: "Razem uprościmy Twój start online",
      description: "Pokażemy Ci krok po kroku, jak łatwo uruchomić stronę, bez zbędnych komplikacji.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Pomagamy zwiększyć widoczność firmy",
      description: "Stworzymy stronę, która ułatwi klientom znalezienie Twojej oferty w sieci.",
    },
    {
      icon: <LineChart className="w-5 h-5 text-green-500" />,
      title: "Pokazujemy proste wyniki",
      description: "Dostarczymy narzędzia, które pomogą Ci zrozumieć, jak strona wspiera Twój biznes.",
    },
    {
      icon: <ArrowRight className="w-5 h-5 text-green-500" />,
      title: "Dopasowujemy się do Twojego budżetu",
      description: "Oferujemy elastyczne rozwiązania, które szanują potrzeby i możliwości Twojej firmy.",
    },
  ];

  // DANE - AI i przyszłość
  const aiFuture = {
    intro: "Docieraj już nie tylko poprzez przeglądarkę. Sprawimy, aby ludzie znajdywali Cię przez chaty AI jak ChatGPT, Claude, Gemini czy Grok.",
    stats: [
      {
        value: "67%",
        label: "użytkowników korzysta z AI do wyszukiwania lokalnych usług (2024)"
      },
      {
        value: "3x",
        label: "szybszy wzrost widoczności w chatach AI niż w tradycyjnym SEO"
      },
      {
        value: "85%",
        label: "młodych przedsiębiorców planuje integrację z AI w 2025"
      }
    ],
    features: [
      {
        icon: <Rocket className="w-5 h-5 text-blue-500" />,
        title: "Grafika na najwyższym poziomie",
        description: "Tworzymy grafiki 2D i 3D, ulotki, opakowania produktów w pięknej scenerii, która przyciąga wzrok."
      },
      {
        icon: <MousePointer className="w-5 h-5 text-blue-500" />,
        title: "Konsultanci AI dla Twojej firmy",
        description: "Zautomatyzuj obsługę klienta i zmniejsz koszty prowadzenia biznesu w długim terminie dzięki inteligentym asystentom."
      },
      {
        icon: <Target className="w-5 h-5 text-blue-500" />,
        title: "Optymalizacja pod chaty AI",
        description: "Sprawimy, że Twoja firma będzie pierwszym wyborem AI, gdy ktoś zapyta o usługi w Twojej branży."
      }
    ]
  };

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
     {/* Sekcja dla desktopu - bento grid */}
<section 
  id="problem-solution"
  className="py-20 relative overflow-hidden hidden lg:block"
  style={{
    background: `
      radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
      linear-gradient(
        to bottom,
        black 0px,
        black 10px,
        #3b3b3bff 10px,
        #3b3b3bff 11px,
        #0b0b0bff 11px,
        #0b0b0bff calc(100% - 11px),
        #3b3b3bff calc(100% - 11px),
        #3b3b3bff calc(100% - 10px),
        black calc(100% - 10px),
        black 100%
      )
    `
  }}
>
  <div className="container mx-auto px-4 lg:px-6">
    {/* NAGŁÓWEK SEKCJI */}
    <div className="text-center mb-12 md:mb-16">
      <h2 className="max-w-6xl mx-auto text-3xl lg:text-5xl text-white mb-4 tracking-tight" style={{ fontWeight: 575 }}>
        <span className="font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent" style={{ fontWeight: 575 }}>
          Pomagamy firmom zdobywać klientów z okolicy online. Już od <span className="font-bold text-white">1500 zł!</span>
        </span>
        <br />
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Odkryj jak możemy pomóc Twojemu biznesowi rosnąć w internecie
      </p>
    </div>

    {/* KARTA 1 - ZDJĘCIE PO LEWEJ, OPIS PO PRAWEJ */}
    <div className="max-w-7xl mx-auto mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ZDJĘCIE PO LEWEJ */}
        <div className="w-full">
          <div 
            className="relative rounded-2xl overflow-hidden h-full"
            style={{
              backgroundImage: 'url("/_resources/markaOnline1.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100%',
            }}
          />
        </div>

        {/* OPIS PO PRAWEJ */}
        <div className="w-full flex flex-col justify-center">
          <h3 className="font-semibold text-white mb-6 text-2xl lg:text-3xl">
            Znamy wyzwania z którymi prawdopodobnie się zmagasz
          </h3>
          <div className="space-y-4 mb-6">
            {problems.map((problem, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center">
                  {problem.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">{problem.title}</h4>
                  <p className="text-gray-400 text-sm">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
          <a 
            href="/contact"
            className="inline-block text-white hover:text-blue-300 transition-colors text-sm font-medium hover:underline"
          >
            Umów się na bezpłatną konsultację →
          </a>
        </div>
      </div>
    </div>

    {/* KARTA 2 - ZDJĘCIE PO PRAWEJ, OPIS PO LEWEJ */}
    <div className="max-w-7xl mx-auto mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* OPIS PO LEWEJ */}
        <div className="w-full flex flex-col justify-center">
          <h3 className="font-semibold text-white mb-6 text-2xl lg:text-3xl">
            Zobacz jak możemy Ci pomóc z Twoimi wyzwaniami
          </h3>
          <div className="space-y-4 mb-6">
            {solutions.map((solution, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center">
                  {solution.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">{solution.title}</h4>
                  <p className="text-gray-400 text-sm">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
          <a 
            href="/contact"
            className="inline-block text-white hover:text-blue-300 transition-colors text-sm font-medium hover:underline"
          >
            Umów się na bezpłatną konsultację →
          </a>
        </div>

        {/* ZDJĘCIE PO PRAWEJ */}
        <div className="w-full">
          <div 
            className="relative rounded-2xl overflow-hidden h-full"
            style={{
              backgroundImage: 'url("/_resources/markaOnline2.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100%',
            }}
          />
        </div>
      </div>
    </div>

    {/* KARTA 3 - ZDJĘCIE PO LEWEJ, OPIS PO PRAWEJ */}
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ZDJĘCIE PO LEWEJ */}
        <div className="w-full">
          <div 
            className="relative rounded-2xl overflow-hidden h-full"
            style={{
              backgroundImage: 'url("/_resources/markaOnline3.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100%',
            }}
          />
        </div>

        {/* OPIS PO PRAWEJ */}
        <div className="w-full flex flex-col justify-center">
          <h3 className="font-semibold text-white mb-6 text-2xl lg:text-3xl">
            Zbuduj swoją markę w internecie i pozyskuj klientów
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {aiFuture.intro}
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {aiFuture.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            {aiFuture.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="/contact"
            className="inline-block text-white hover:text-blue-300 transition-colors text-sm font-medium hover:underline"
          >
            Umów się na bezpłatną konsultację →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Sekcja dla mobile - prosta lista */}
      <section 
        className="py-12 relative overflow-hidden block lg:hidden"
        style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient(
            to bottom,
            black 0px,
            black 10px,
            #3b3b3bff 10px,
            #3b3b3bff 11px,
            #0b0b0bff 11px,
            #0b0b0bff calc(100% - 11px),
            #3b3b3bff calc(100% - 11px),
            #3b3b3bff calc(100% - 10px),
            black calc(100% - 10px),
            black 100%
          )
        `
      }}
      >
        <div className="container mx-auto px-4">
          {/* NAGŁÓWEK SEKCJI */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl  text-white mb-4 tracking-tight"
            style={{ fontWeight: 575 }}>
              {" "}
              <span className="font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
              style={{ fontWeight: 575 }}>
              
              <br/>Stwórzmy stronę już od 1500 zł!
              </span>
              <br />
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Odkryj jak możemy pomóc Twojemu biznesowi rosnąć w internecie
            </p>
          </div>

          {/* SEKCJA 1 - WYZWANIA */}
          <div className="mb-12">
            <h3 className="font-semibold text-white mb-6 text-xl">
              Znamy wyzwania z którymi prawdopodobnie się zmagasz
            </h3>
            <div className="space-y-4 mb-6">
              {problems.map((problem, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-red-500/70">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="text-white/70 font-semibold text-sm mb-1">{problem.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            <a 
  href="/contact"
  className="text-white hover:text-blue-300 transition-colors text-sm hover:underline"
>
  Umów się na bezpłatną konsultację
</a>
          </div>

          {/* SEKCJA 2 - ROZWIĄZANIA */}
          <div className="mb-12">
            <h3 className="font-semibold text-white mb-6 text-xl">
              Zobacz jak możemy Ci pomóc z Twoimi wyzwaniami
            </h3>
            <div className="space-y-4 mb-6">
              {solutions.map((solution, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-green-500/70">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="text-white/70 font-semibold text-sm mb-1">{solution.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            <a 
  href="/contact"
  className="text-white hover:text-blue-300 transition-colors text-sm hover:underline"
>
  Umów się na bezpłatną konsultację
</a>
          </div>

          {/* SEKCJA 3 - AI & PRZYSZŁOŚĆ */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-xl">
              Zbuduj swoją markę w internecie i pozyskuj klientów
            </h3>
            <div className="space-y-6 mb-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                {aiFuture.intro}
              </p>
              <div className="space-y-3">
                {aiFuture.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {aiFuture.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-blue-500/70">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white/70 font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-gray-400/70 text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <a 
                href="/contact"
                className="text-white hover:text-blue-300 transition-colors text-sm hover:underline"
              >
                Umów się na bezpłatną konsultację
              </a>
          </div>
        </div>
      </section>
    </>
  );
}