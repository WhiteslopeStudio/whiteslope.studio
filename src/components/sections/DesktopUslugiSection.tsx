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
      <div className="container mx-auto px-2">
        
        {/* Karuzela usług */}
        <div 
          className="flex gap-6 overflow-x-auto p-4 justify-center"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {MAIN_SERVICES.map((service: MainService, index: number) => {
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
              <Link
                key={service.id}
                href={`/pricing/${service.id}`} 
                onClick={() => handleServiceClick(service.id)}
                className="group p-5 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-108 hover:shadow-xl active:scale-95 relative"
                style={{
                  width: '110px',
                  height: '120px',
                  background: 'rgba(24, 24, 24, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '10px',
                  animation: `fadeInUp 0.6s ease-out ${1.5 + index * 0.2}s both`,
                }}
              >
                {/* Czerwona kropka dla pierwszego boxa */}
                {index === 0 && (
                <div
                    className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
                    style={{
                    transform: 'translate(50%, -50%)',
                    opacity: 0.8,
                    }}
                />
                )}
                
                {/* Ikonka usługi */}
                <div 
                  className="transition-colors duration-300 text-[#c2c2c2] group-hover:text-white"
                  style={{
                    width: '55px',
                    height: '55px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent className="w-5 h-5 font-semibold" />
                </div>
                
                {/* Tytuł usługi */}
                <span 
                  className="text-center leading-tight text-[12px] font-bold transition-colors duration-300 text-[#c2c2c2] group-hover:text-white"
                  style={{ 
                    fontFamily: 'inherit',
                    padding: '0 4px',
                  }}
                >
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Kreska i link do wszystkich usług */}
        <div className="mt-2">
          
          <div className="flex justify-center">
            <Link 
              href="/pricing"
              className="group flex items-top gap-2 text-[#999999] hover:text-[#fd9f91] transition-colors duration-300 text-sm font-medium"
            >
              <span>Cała oferta</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
      </div>

      {/* Animacja CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}