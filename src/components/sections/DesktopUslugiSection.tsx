'use client';

import Link from 'next/link';
import { 
  LayoutGrid, 
  Search, 
  Code, 
  Palette, 
  FileText, 
  Smartphone,
  ArrowRight 
} from 'lucide-react';

// ✅ IMPORT DANYCH z data.tsx
import { MAIN_SERVICES } from '@/lib/data';

// ✅ IMPORT TYPU z types.ts (TAM GDZIE POWINIEN BYĆ!)
import type { MainService } from '@/lib/types';

// Typ dla kluczy ikon
type ServiceIconId = 'website' | 'optimization' | 'ai-integration' | 'graphics' | 'individual' | 'email-marketing';

export default function DesktopUslugiSection() {
  
  // Funkcja obsługująca kliknięcie w usługę
  const handleServiceClick = (serviceId: string) => {
    console.log('Kliknięto usługę:', serviceId);
    // Tutaj możesz dodać swoją logikę, np. przekierowanie
  };

  return (
    <div 
      className="w-full py-4 backdrop-blur-sm"
      style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient()
        `
      }}
    >
      <div className="container mx-auto px-4">
        
        {/* Karuzela usług */}
        <div 
          className="flex gap-3 overflow-x-auto p-4 justify-center"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {MAIN_SERVICES.map((service: MainService) => {
            // Mapowanie ikon
            const iconMap: Record<ServiceIconId, any> = {
              'website': LayoutGrid,
              'optimization': Search,
              'ai-integration': Code,
              'graphics': Palette,
              'individual': FileText,
              'email-marketing': Smartphone,
            };
            
            const IconComponent = iconMap[service.id as ServiceIconId] || LayoutGrid;

            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="pt-2 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-gray-500 active:scale-95"
                style={{
                  width: '90px',
                  height: '100px',
                  background: '#1e1e1eff',
                  border: '1px solid #303030ff',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '8px',
                }}
              >
                {/* Ikonka usługi */}
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#232323ff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#42aaffff',
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                
                {/* Tytuł usługi */}
                <span 
                  className="text-center leading-tight text-[12px] font-semibold"
                  style={{ 
                    fontFamily: 'inherit',
                    color: '#e0e0e0ff',
                    padding: '0 4px',
                  }}
                >
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Kreska i link do wszystkich usług */}
        <div className="mt-2">
          <div className="w-full h-px bg-white/10 mb-2" />
          <div className="flex justify-center">
            <Link 
              href="/pricing"
              className="group flex items-top gap-2 hover:text-[#fd9f91] transition-colors duration-300 text-sm font-medium text-gray-500"
            >
              <span>Wszystkie usługi</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}