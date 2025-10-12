"use client";

import Link from 'next/link';
import React from 'react';
import { ArrowRight, Check, Phone, Mail, Plus } from 'lucide-react';
import { MAIN_SERVICES, FAQ_DATA } from '@/lib/data';

export default function CennikPage() {
  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      
      {/* WATERMARK - tylko na desktop */}
      <div className="hidden lg:flex absolute inset-0 z-0 pointer-events-none items-start justify-center pt-24">
        <h1 
          className="text-[15vw] font-normal leading-none tracking-tighter whitespace-nowrap opacity-25"
          style={{
            fontFamily: 'inherit',
            background: 'linear-gradient(to bottom, #707070 0%, #303030 50%, transparent 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CENNIK
        </h1>
      </div>

      {/* ZAWARTOŚĆ */}
      <div className="relative z-10 pt-80 pb-16">
        
        {/* MOBILE HEADER - widoczny nagłówek */}
        <div className="block lg:hidden text-center mb-12 mt-20">
          <h1 
            className="text-6xl font-normal text-white mb-4"
            style={{ fontFamily: 'inherit' }}
          >
            CENNIK
          </h1>
          <p 
            className="text-xl text-white font-light"
            style={{ fontFamily: 'inherit' }}
          >
            Nasze usługi
          </p>
        </div>
        
        {/* SEKCJA USŁUG */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-8xl mx-auto">
              
              {/* MOBILE LAYOUT - prosta kolumna */}
              <div className="block lg:hidden">
                <div className="space-y-6">
                  {MAIN_SERVICES.map((service, index) => (
                    <Link 
                      key={service.id} 
                      href={`/pricing/${service.id}`}
                      className="block cursor-pointer rounded-2xl border p-6 transition-all duration-300"
                      style={{ backgroundColor: '#1a1a1a', borderColor: '#666666' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#888888';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#666666';
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-2xl font-normal mb-2 text-white" style={{ fontFamily: 'inherit' }}>
                          {service.title}
                        </h3>
                        <p className="text-lg font-light text-gray-300" style={{ fontFamily: 'inherit' }}>
                          {service.subtitle}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-3xl font-normal text-[#fd9f91] mb-1" style={{ fontFamily: 'inherit' }}>
                          {service.price}
                        </div>
                        <p className="text-base font-light text-gray-400" style={{ fontFamily: 'inherit' }}>
                          Cena zależy od zakresu
                        </p>
                      </div>

                      <p className="text-lg mb-4 leading-relaxed font-light text-gray-300" style={{ fontFamily: 'inherit' }}>
                        {service.description}
                      </p>
                      
                      <div className="mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-2">
                            <Check className="w-4 h-4 flex-shrink-0 text-[#fd9f91]" />
                            <span className="text-base font-light text-gray-300" style={{ fontFamily: 'inherit' }}>
                              {feature.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #666666' }}>
                        <span className="text-base text-gray-400" style={{ fontFamily: 'inherit' }}>
                          Zobacz szczegóły
                        </span>
                        <ArrowRight className="w-5 h-5 text-[#fd9f91]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* DESKTOP LAYOUT - zachowany obecny design ale ulepszony */}
              <div className="hidden lg:block">
                {/* Main Grid - 1/3 i 2/3 */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  
                  {/* LEWA STRONA - 1/3 - Tekst nagłówkowy */}
                  <div className="col-span-1 flex flex-col justify-between">
                    <div>
                      <h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-thin mb-6 leading-tight tracking-tight"
                        style={{ fontFamily: 'inherit' }}
                      >
                        Posłuchaj głosu rozsądku i 
                        
                        <br />
                        <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                          zacznijmy tworzyć
                        </span>
                      </h2>
                      
                      <p 
                        className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-light"
                        style={{ fontFamily: 'inherit' }}
                      >
                        Każda usługa to gwarancja najwyższej jakości i profesjonalnego wsparcia
                      </p>
                    </div>

                    {/* Cytat testimonial */}
                    <div className="mt-16 pt-8" style={{ borderTop: '1px solid #404040' }}>
                      <div className="space-y-4">
                        <h3 
                          className="text-xl font-normal text-white leading-tight mb-4"
                          style={{ fontFamily: 'inherit' }}
                        >
                          Staramy się być transparentni w każdym aspekcie współpracy.
                        </h3>
                        
                        <blockquote className="relative">
                          <p 
                            className="text-lg text-gray-300 leading-relaxed font-light italic"
                            style={{ fontFamily: 'inherit' }}
                          >
                            "Każdy projekt to nowe wyzwanie. Dokładamy wszelkich starań, 
                            żeby proces był przejrzysty i komunikacja - klarowna."
                          </p>
                        </blockquote>
                        
                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#404040' }}>
                            <span className="text-white text-xs font-medium" style={{ fontFamily: 'inherit' }}>W</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white" style={{ fontFamily: 'inherit' }}>
                              Zespół Whiteslope
                            </p>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRAWA STRONA - 2/3 - Główna usługa */}
                  <Link 
                    href={`/pricing/${MAIN_SERVICES[0]?.id || 'website'}`}
                    className="col-span-2 block cursor-pointer rounded-3xl overflow-hidden border relative min-h-[500px] group hover:scale-[1.01] transition-all duration-700"
                    style={{ backgroundColor: '#0f0f0f', borderColor: '#666666' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#888888';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#666666';
                    }}
                  >
                    
                    {/* Subtelny glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fd9f91]/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
                    
                      <div className="p-8 flex flex-col h-full relative z-10">
                      
                      {/* Header z subtelnym badge */}
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-4">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium tracking-wide" style={{ fontFamily: 'inherit' }}>
                            GŁÓWNA USŁUGA
                          </span>
                        </div>
                        
                        <h3 
                          className="text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-4 leading-tight"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {MAIN_SERVICES[0]?.title || "Strona internetowa"}
                        </h3>
                        <p 
                          className="text-2xl text-white font-light"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {MAIN_SERVICES[0]?.subtitle || "Kompleksowe rozwiązanie"}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div 
                          className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#fd9f91] mb-3"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {MAIN_SERVICES[0]?.price || "od 2499 zł"}
                        </div>
                        <p 
                          className="text-xl text-white font-light"
                          style={{ fontFamily: 'inherit' }}
                        >
                          Cena zależy od zakresu projektu
                        </p>
                      </div>

                      {/* Description */}
                      <p 
                        className="text-xl lg:text-2xl text-white mb-8 leading-relaxed font-light"
                        style={{ fontFamily: 'inherit' }}
                      >
                        {MAIN_SERVICES[0]?.description || "Profesjonalna strona internetowa dostosowana do Twoich potrzeb."}
                      </p>

                      {/* Features - kompaktowe */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 flex-1">
                        {(MAIN_SERVICES[0]?.features || []).slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-[#fd9f91]/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-[#fd9f91]" />
                            </div>
                            <span 
                              className="text-white text-lg font-light"
                              style={{ fontFamily: 'inherit' }}
                            >
                              {feature.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Footer */}
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xl text-white" style={{ fontFamily: 'inherit' }}>
                            Kliknij aby zobaczyć szczegóły
                          </span>
                          <ArrowRight className="w-7 h-7 text-[#fd9f91] group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* POZOSTAŁE USŁUGI - 50% 50% ale ujednolicone */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  
                  {/* Usługi 2-końca - ujednolicone z lepszym kontrastem */}
                  {MAIN_SERVICES.slice(1).map((service, index) => (
                    <Link 
                      key={service.id} 
                      href={`/pricing/${service.id}`}
                      className="block cursor-pointer rounded-2xl border min-h-[380px] flex flex-col transition-all duration-500"
                      style={{ backgroundColor: '#1a1a1a', borderColor: '#666666' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#888888';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#666666';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <div className="p-6 flex flex-col h-full">
                        
                        <div className="mb-4">
                          <h3 className="text-3xl font-normal mb-3 text-white" style={{ fontFamily: 'inherit' }}>
                            {service.title}
                          </h3>
                          <p className="text-xl font-light mb-4 text-gray-200" style={{ fontFamily: 'inherit' }}>
                            {service.subtitle}
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <div className="text-4xl font-normal mb-2 text-[#fd9f91]" style={{ fontFamily: 'inherit' }}>
                            {service.price}
                          </div>
                          <p className="text-lg font-light text-gray-300" style={{ fontFamily: 'inherit' }}>
                            Cena zależy od zakresu
                          </p>
                        </div>

                        {/* Description dla pozostałych usług */}
                        <p 
                          className="text-lg mb-6 leading-relaxed font-light text-gray-200"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {service.description}
                        </p>
                        
                        <div className="flex-1 mb-6">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 mb-3">
                              <Check className="w-5 h-5 flex-shrink-0 text-[#fd9f91]" />
                              <span className="text-lg font-light text-gray-200" style={{ fontFamily: 'inherit' }}>
                                {feature.title}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Footer z hover effect */}
                        <div className="mt-auto pt-4" style={{ borderTop: '1px solid #666666' }}>
                          <div className="flex items-center justify-between">
                            <span className="text-lg text-gray-300" style={{ fontFamily: 'inherit' }}>
                              Zobacz szczegóły
                            </span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 text-[#fd9f91]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* CTA CARD - ostatnia pozycja */}
                  <div className="rounded-2xl min-h-[380px] flex flex-col justify-center p-6 border" style={{ backgroundColor: '#000000', borderColor: '#000000ff' }}>
                    <h3 
                      className="text-3xl font-normal mb-4 text-center text-white"
                      style={{ fontFamily: 'inherit' }}
                    >
                      Potrzebujesz czegoś innego?
                    </h3>
                    <p 
                      className="text-xl mb-6 font-light text-center leading-relaxed text-gray-200"
                      style={{ fontFamily: 'inherit' }}
                    >
                      Każdy projekt jest unikalny. Umów się na bezpłatną konsultację i opowiedz nam o swoich potrzebach.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 text-lg text-white"
                        style={{ fontFamily: 'inherit', backgroundColor: '#282828ff' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#232323ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#282828ff';
                        }}
                      >
                        <Mail className="w-5 h-5" />
                        Porozmawiajmy
                      </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            
            <div className="text-center mb-16">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4"
                style={{ fontFamily: 'inherit' }}
              >
                FAQ
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-0">
              {FAQ_DATA.slice(0, 6).map((faq, index) => (
                <details 
                  key={faq.id} 
                  className="group border-b border-gray-800 transition-all duration-500"
                >
                  <summary 
                    className="py-6 cursor-pointer flex items-center justify-between text-left hover:text-gray-300 transition-colors duration-300"
                    style={{ fontFamily: 'inherit' }}
                  >
                    <span className="font-normal text-white text-lg pr-4">{faq.question}</span>
                    <div className="relative">
                      <Plus 
                        className="w-6 h-6 text-white transform group-open:rotate-45 group-open:scale-110 transition-all duration-500 ease-out flex-shrink-0" 
                        style={{
                          transformOrigin: 'center',
                        }}
                      />
                    </div>
                  </summary>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-out group-open:pb-6"
                    style={{
                      maxHeight: '0',
                      opacity: '0',
                    }}
                  >
                    <div className="transform transition-all duration-500 ease-out group-open:translate-y-0 translate-y-2">
                      <p 
                        className="text-gray-400 leading-relaxed font-light"
                        style={{ fontFamily: 'inherit' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  
                  {/* CSS dla płynnego rozwijania */}
                  <style jsx>{`
                    details[open] .overflow-hidden {
                      max-height: 200px !important;
                      opacity: 1 !important;
                    }
                  `}</style>
                </details>
              ))}
            </div>

            <div className="text-center mt-12">
              <p 
                className="text-gray-400 mb-6"
                style={{ fontFamily: 'inherit' }}
              >
                Nie znalazłeś odpowiedzi na swoje pytanie?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
                style={{ fontFamily: 'inherit' }}
              >
                Zadaj pytanie
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              
              <h2 
                className="text-4xl md:text-6xl font-thin mb-6 leading-tight"
                style={{ fontFamily: 'inherit' }}
              >
                Rozpocznijmy
                <br />
                <span className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent font-normal">
                  współpracę
                </span>
              </h2>
              
              <p 
                className="text-lg text-gray-300 mb-8 font-light max-w-2xl mx-auto"
                style={{ fontFamily: 'inherit' }}
              >
                Każdy wielki projekt zaczyna się od rozmowy. 
                Opowiedz nam o swoich planach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-[#fd9f91] text-black px-8 py-4 rounded-full font-medium hover:bg-[#fc8a7a] transition-all duration-300 hover:scale-105"
                  style={{ fontFamily: 'inherit' }}
                >
                  <Mail className="w-5 h-5" />
                  Napisz do nas
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <a 
                  href="tel:+48123456789"
                  className="flex items-center justify-center gap-2 border border-[#fd9f91] text-[#fd9f91] px-8 py-4 rounded-full font-medium hover:bg-[#fd9f91] hover:text-black transition-all duration-300"
                  style={{ fontFamily: 'inherit' }}
                >
                  <Phone className="w-5 h-5" />
                  Zadzwoń
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// export default function CennikPage() {
//   const [activeService, setActiveService] = useState<string>('website');
  
//   const currentService = MAIN_SERVICES.find(s => s.id === activeService);
  
//   return (
//     <div className="min-h-screen bg-black text-white">
      
//       {/* Hero Section */}
//       <section className="pt-24 pb-16 bg-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
//               <span className="text-red-500">Przejrzyste</span> ceny,{' '}
//               <br className="hidden sm:block" />
//               <span className="text-orange-500">zero</span> ukrytych kosztów
//             </h1>
            
//             <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
//               Wybierz usługę idealną dla Twojego biznesu. Co widzisz w cenie - to płacisz. 
//               Bez dodatkowych opłat, bez niespodzianek.
//             </p>

//             {/* Quick stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16 opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
//               <div className="text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-[#FA8072] mb-2">20+</div>
//                 <div className="text-sm text-gray-400">Zrealizowanych projektów</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-[#FA8072] mb-2">100%</div>
//                 <div className="text-sm text-gray-400">Zadowolonych klientów</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-[#FA8072] mb-2">24h</div>
//                 <div className="text-sm text-gray-400">Czas odpowiedzi</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

   

//       {/* Pricing Cards for Selected Service */}
//       <section className="pb-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          

        
//           {/* Featured Services - Main Focus */}
//           <div className="mb-20">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//                 Wybierz <span className="text-red-500">Usługę</span> 
//               </h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//                 Profesjonalne rozwiązania dostosowane do potrzeb Twojego biznesu. 
//                 Każdy pakiet to gwarancja najwyższej jakości.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
//               {MAIN_SERVICES.map((service, index) => {
//                 const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons];
//                 const isPopular = service.highlighted;
                
//                 return (
//                   <div
//                     key={service.id}
//                     className={`
//                       relative group bg-gradient-to-br from-white/10 to-white/5 
//                       rounded-3xl border transition-all duration-500 hover:scale-[1.02]
//                       ${isPopular 
//                         ? 'border-[#FA8072]/50 bg-gradient-to-br from-[#FA8072]/20 to-[#FA8072]/5 xl:col-span-2' 
//                         : 'border-white/20 hover:border-[#FA8072]/30'
//                       }
//                     `}
//                   >
//                     {/* Popular Badge */}
//                     {isPopular && (
//                       <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
//                         <div className="bg-gradient-to-r from-[#FA8072] to-red-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
//                           🔥 NAJPOPULARNIEJSZY
//                         </div>
//                       </div>
//                     )}

//                     <div className={`p-6 sm:p-8 lg:p-10 ${isPopular ? 'xl:flex xl:items-center xl:gap-12' : ''}`}>
//                       {/* Header */}
//                       <div className={`${isPopular ? 'xl:flex-1' : ''}`}>
//                         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//                           <div className="flex items-center gap-4">
//                             <div className={`
//                               w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0
//                               ${isPopular ? 'bg-[#FA8072]/30' : 'bg-[#FA8072]/20'}
//                             `}>
//                               <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#FA8072]" />
//                             </div>
//                             <div>
//                               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
//                                 {service.title}
//                               </h3>
//                               <p className="text-gray-400 text-base sm:text-lg">{service.subtitle}</p>
//                             </div>
//                           </div>
                          
//                           {/* Price - Mobile */}
//                           <div className="sm:hidden">
//                             <div className="text-3xl font-bold text-[#FA8072] mb-1">
//                               {service.price}
//                             </div>
//                             <p className="text-gray-400 text-sm">Cena może się różnić</p>
//                           </div>
//                         </div>

//                         {/* Price - Desktop */}
//                         <div className="hidden sm:block mb-6">
//                           <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FA8072] mb-2">
//                             {service.price}
//                           </div>
//                           <p className="text-gray-400 text-sm sm:text-base">Cena może się różnić w zależności od zakresu</p>
//                         </div>

//                         {/* Description */}
//                         <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
//                           {service.description}
//                         </p>

//                         {/* Key Features */}
//                         <div className="mb-6 sm:mb-8">
//                           <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Co otrzymasz:</h4>
//                           <div className="grid grid-cols-1 gap-2 sm:gap-3">
//                             {service.features.slice(0, isPopular ? 6 : 4).map((feature, idx) => (
//                               <div key={idx} className="flex items-start gap-3">
//                                 <div className="w-5 h-5 bg-[#FA8072]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                                   <Check className="w-3 h-3 text-[#FA8072]" />
//                                 </div>
//                                 <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{feature}</span>
//                               </div>
//                             ))}
//                             {service.features.length > (isPopular ? 6 : 4) && (
//                               <div className="text-gray-400 text-sm mt-1 sm:mt-2 ml-8">
//                                 + {service.features.length - (isPopular ? 6 : 4)} więcej funkcji
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* CTA Section */}
//                       <div className={`${isPopular ? 'xl:flex-shrink-0 xl:w-80' : ''}`}>
//                         {/* CTA Button */}
//                         <Link
//                           href={`/pricing/${service.id}`}
//                           className={`
//                             block w-full text-center py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-base sm:text-lg
//                             transition-all duration-300 group-hover:scale-105 mb-3 sm:mb-4
//                             ${isPopular 
//                               ? 'bg-[#FA8072] text-white hover:bg-[#FA8072]/90 shadow-lg hover:shadow-[#FA8072]/25' 
//                               : 'bg-white/10 text-white border-2 border-[#FA8072]/50 hover:bg-[#FA8072] hover:border-[#FA8072]'
//                             }
//                           `}
//                         >
//                           <div className="flex items-center justify-center gap-2">
//                             <span>Zobacz szczegółowe pakiety</span>
//                             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                           </div>
//                         </Link>

//                         {/* Additional Info */}
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm text-gray-400">
//                             Darmowa konsultacja • Bez ukrytych kosztów
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Contact CTA below services */}
//             <div className="text-center mt-16">
//               <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
//                 <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
//                   Nie jesteś pewny który pakiet wybrać?
//                 </h3>
//                 <p className="text-gray-300 mb-6 text-lg">
//                   Umów się na darmową konsultację. Pomożemy Ci wybrać idealne rozwiązanie.
//                 </p>
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center gap-2 bg-[#FA8072] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#FA8072]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#FA8072]/25"
//                 >
//                   Darmowa konsultacja
//                   <ArrowRight className="w-5 h-5" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Why Choose Us */}
//           <div className="bg-gray-900/30 rounded-2xl p-8 mb-20 border border-gray-800">
//             <div className="text-center mb-8">
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Dlaczego <span className="text-red-500">WHITESLOPE</span>?
//               </h2>
//               <p className="text-gray-400 text-xl">Co wyróżnia nas od konkurencji</p>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-[#FA8072]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Zap className="w-6 h-6 text-[#FA8072]" />
//                 </div>
//                 <h3 className="font-semibold text-white mb-2">Najnowsze technologie</h3>
//                 <p className="text-sm text-gray-400">Next.js, React - gwarancja wydajności</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-[#FA8072]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-6 h-6 text-[#FA8072]" />
//                 </div>
//                 <h3 className="font-semibold text-white mb-2">100% Bezpieczeństwo</h3>
//                 <p className="text-sm text-gray-400">SSL, regularne aktualizacje</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-[#FA8072]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Users className="w-6 h-6 text-[#FA8072]" />
//                 </div>
//                 <h3 className="font-semibold text-white mb-2">Wsparcie 24/7</h3>
//                 <p className="text-sm text-gray-400">Odpowiadamy w ciągu 24h</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-[#FA8072]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Award className="w-6 h-6 text-[#FA8072]" />
//                 </div>
//                 <h3 className="font-semibold text-white mb-2">Gwarancja jakości</h3>
//                 <p className="text-sm text-gray-400">100% zadowolenia klientów</p>
//               </div>
//             </div>
//           </div>

//           {/* FAQ Section */}
//           <div className="mb-20">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Często zadawane <span className="text-red-500">pytania</span>
//               </h2>
//               <p className="text-gray-400 text-xl">
//                 Znajdź odpowiedzi na najczęstsze pytania
//               </p>
//             </div>

//             <div className="max-w-3xl mx-auto space-y-4">
//               {FAQ_DATA.slice(0, 6).map((faq, index) => (
//                 <details key={faq.id} className="bg-white/5 rounded-xl border border-white/10">
//                   <summary className="p-6 cursor-pointer hover:bg-white/5 transition-colors">
//                     <span className="font-semibold text-white">{faq.question}</span>
//                   </summary>
//                   <div className="px-6 pb-6">
//                     <p className="text-gray-400">{faq.answer}</p>
//                   </div>
//                 </details>
//               ))}
//             </div>
//           </div>

//           {/* Final CTA */}
//           <div className="text-center bg-gradient-to-r from-[#FA8072]/20 to-[#FA8072]/10 rounded-2xl p-8 border border-[#FA8072]/30">
//             <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Gotowy na <span className="text-red-500">następny krok</span>?
//             </h3>
//             <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-xl leading-relaxed">
//               Skontaktuj się z nami już dziś i otrzymaj darmową konsultację. 
//               Odpowiemy na wszystkie pytania i pomożemy wybrać idealny pakiet.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link 
//                 href="/contact"
//                 className="bg-[#FA8072] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#FA8072]/90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#FA8072]/25 hover:scale-105"
//               >
//                 Darmowa konsultacja
//                 <ArrowRight className="w-5 h-5" />
//               </Link>
              
//               <Link 
//                 href="/portfolio"
//                 className="border-2 border-gray-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-600 hover:border-gray-500 transition-all duration-300"
//               >
//                 Zobacz portfolio
//               </Link>
//             </div>

//             <p className="text-sm text-gray-400 mt-6">
//               Zadzwonimy w ciągu 24h • Bezpłatna wycena • Bez zobowiązań
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }