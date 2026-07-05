'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

export function PricingCta() {
  const ctaButton = useInteractiveButton();

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Gotowy, żeby <u>rozpocząć</u>?
          </h2>
          <p className="text-lg text-white/60 font-light mb-10 max-w-2xl mx-auto">
            Każdy wielki projekt zaczyna się od pierwszej rozmowy. Opowiedz nam o swoich planach, a my dobierzemy odpowiednie rozwiązanie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              onMouseMove={ctaButton.handleMouseMove}
              onMouseEnter={ctaButton.handleMouseEnter}
              onMouseLeave={ctaButton.handleMouseLeave}
              className="inline-flex items-center justify-center gap-2 rounded-full h-14 px-10 text-sm font-semibold text-white transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              style={{
                background: `radial-gradient(circle at ${ctaButton.mousePosition.x}% ${ctaButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)`,
              }}
            >
              Porozmawiajmy o projekcie
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}