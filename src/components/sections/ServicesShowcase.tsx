'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Używamy Phosphor Icons dla naturalnego, luksusowego sznytu
import { Robot, Target, VideoCamera, ShoppingCart, ArrowRight , Database, FileText, Lightning, Link} from "@phosphor-icons/react";
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { ThreeDProjectWall } from '@/components/ui/3d-marquee'; // Ta biblioteka, o którą prosiłeś

const PURPLE_LIGHT = '#a78bfa'; // Spokojny, jasny fiolet
const GRAY_LIGHT = '#a1a1a1';
const GRAY_BORDER = '#262626';

// DANE USŁUG I PROJEKTÓW DO ŚCIANY MARQUEE
const AUTOMATION_PROJECTS = [
  { 
    id: 'ads', 
    title: 'Analiza Meta Ads', 
    icon: Target, 
    image: '/_resources/Automations/Automation8nWorkflow.webp', 
    description: 'n8n + AI Media Buyer w Twojej firmie.', 
    longDescription: 'Zmień n8n w AI-powered media buyera. Automatycznie pobieramy dane z Meta Ads, a Gemini AI kategoryzuje kreacje i wypluwa gotowe wnioski do Google Sheets.' 
  },
  { 
    id: 'video', 
    title: 'Marketing Video AI', 
    icon: VideoCamera, 
    image: '/_resources/Automations/Automation2.webp', 
    description: 'Trend-based video generation.', 
    longDescription: 'Budujemy workflowy łączące Seedance AI, Perplexity i GPT, aby generować filmy marketingowe na podstawie aktualnych trendów całkowicie automatycznie.' 
  },
  { 
    id: 'crm', 
    title: 'Wdrożenia CRM', 
    icon: Database, 
    image: '/_resources/Automations/Automation3.webp', // Możesz podmienić na dedykowaną fotkę
    description: 'HubSpot, Pipedrive, automatyzacja.', 
    longDescription: 'Projektujemy i wdrażamy systemy CRM, które same dbają o porządek w danych. Koniec z ręcznym wpisywaniem klientów – n8n zrobi to za Ciebie.' 
  },
  { 
    id: 'docs', 
    title: 'Obieg Dokumentów', 
    icon: FileText, 
    image: '/_resources/Automations/Automation2.webp', 
    description: 'Make/Zapier i wyciąganie danych.', 
    longDescription: 'Automatyzujemy czytanie faktur, segregowanie umów i przesyłanie ich do odpowiednich folderów lub systemów księgowych. 100% precyzji, 0% nudy.' 
  },
  { 
    id: 'leads', 
    title: 'Zarządzanie Leadami', 
    icon: Lightning, 
    image: '/_resources/Automations/Automation3.webp', 
    description: 'Ścieżki sprzedażowe i powiadomienia.', 
    longDescription: 'Każdy lead z Twojej strony trafia natychmiast do handlowca z kompletem informacji. System sam pilnuje follow-upów i statusów sprzedaży.' 
  },
  { 
    id: 'api', 
    title: 'Integracje Systemów (API)', 
    icon: Link, 
    image: '/_resources/Automations/Automation8nWorkflow.webp', 
    description: 'Łączymy narzędzia, które ze sobą nie gadają.', 
    longDescription: 'Budujemy niestandardowe mosty API między Twoimi ulubionymi narzędziami. Jeśli coś nie ma wbudowanej integracji – my ją stworzymy w n8n.' 
  },
  { 
    id: '360', 
    title: 'E-commerce 360°', 
    icon: ShoppingCart, 
    image: '/_resources/Automations/Automation3.webp', 
    description: 'Zdjęcia produktów zamienione w wideo.', 
    longDescription: 'Zwiększ sprzedaż w swoim sklepie. n8n błyskawicznie konwertuje statyczne zdjęcia produktów na profesjonalne prezentacje wideo 360°.' 
  },
  {
    id: 'ai_strategy',
    title: 'Briefy kreatywne AI',
    icon: Robot,
    image: '/_resources/Automations/Automation8nWorkflow.webp', 
    description: 'Generowanie pomysłów przez AI.', 
    longDescription: 'Wykorzystujemy zebrane dane o reklamach, aby AI sugerowało nowe skrypty i briefy kreatywne dla Twoich twórców wideo.'
  }
];

export default function AutomationShowcase() {
  // Ustawiamy domyślnie pierwszą usługę, żeby opis nigdy nie był pusty
  const [hoveredService, setHoveredService] = useState(AUTOMATION_PROJECTS[0]);

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden border-t" style={{ borderColor: GRAY_BORDER }}>
      
      {/* TŁO SIATKA */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${GRAY_LIGHT} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[900px]">
        
        {/* --- LEWO: TREŚĆ (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-6 md:px-12 lg:px-16 z-10 py-4">
          
          {/* LOGO FIOLETOWE DO LEWEJ */}
          <div className="w-full flex justify-start mb-16">
             <img 
              src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI.webp"
              className="h-14 md:h-16 object-contain"
              alt="Logo Automation"
            />
          </div>

          <h2 
            className="text-[#ffffff] text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8 uppercase"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
       
            }}
          >
            Automatyzacja procesów i  <br /> 
            <span style={{ color: PURPLE_LIGHT }}>ekosystemy AI</span>
          </h2>

          <h3 className="text-white text-xl md:text-2xl font-bold leading-snug mb-12 max-w-xl opacity-90">
             Budujemy rozwiązania, które łączą <span style={{ color: PURPLE_LIGHT }}>kod z inteligencją AI</span>, eliminując nudę i błędy z Twojej codzienności.
          </h3>

          {/* TAGI USŁUG (Hashtagi style z Instant Hover) */}
          <div className="flex flex-wrap gap-2 mb-12 border-b pb-12" style={{ borderColor: GRAY_BORDER }}>
            {AUTOMATION_PROJECTS.map((service) => {
              const isActive = hoveredService.id === service.id;
              
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service)}
                  className="group relative inline-flex items-center justify-center px-6 py-3 border cursor-pointer select-none overflow-hidden transition-none"
                  style={{ 
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#000000' : GRAY_LIGHT,
                    borderColor: isActive ? '#ffffff' : GRAY_BORDER,
                  }}
                >
                  <div className="relative flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-tight">{service.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* OPIS USŁUGI (Zostaje po zjechaniu) */}
          <div className="min-h-[160px] w-full mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12" style={{ backgroundColor: PURPLE_LIGHT }} />
                <p className="text-base font-bold uppercase tracking-tighter" style={{ color: PURPLE_LIGHT }}>
                  {hoveredService.description}
                </p>
              </div>
              <p className="text-lg md:text-xl leading-relaxed max-w-md" style={{ color: GRAY_LIGHT }}>
                {hoveredService.longDescription}
              </p>
            </div>
          </div>

          {/* PRZYCISKI CTA (Primary Fioletowy) */}
          <div className="flex flex-wrap gap-6 mt-auto w-full pt-8 border-t" style={{ borderColor: GRAY_BORDER }}>
            <PrimaryButton 
              href="/pricing/ai-integration" 
              className="!bg-[#a78bfa] !text-black !border-[#a78bfa] hover:!bg-white hover:!text-black transition-none"
            >
              Wyceń proces AI
            </PrimaryButton>
            
            <SecondaryButton href="/pricing/ai-integration">
              Jak to działa?
            </SecondaryButton>
          </div>
        </div>

        {/* --- PRAWO: Ściana Projektów Marquee (50%) --- */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden order-first lg:order-last">
          {/* Używamy ThreeDProjectWall, biblioteki o którą prosiłeś */}
          <div className="absolute inset-0 lg:-right-32 h-full w-[110%]">
            <ThreeDProjectWall projects={AUTOMATION_PROJECTS} />
          </div>
          {/* Subtelny "cień" pod ścianą dla efektu głębi */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}