import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

export function PricingFaq() {
  return (
    <section className="py-24 px-6 border-b border-white/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <u>Często</u> zadawane pytania
          </h2>
        </div>

        <div className="space-y-0">
          {FAQ_DATA.slice(0, 6).map((faq) => (
            <details key={faq.id} className="group border-b border-white/10">
              <summary className="py-6 cursor-pointer flex items-center justify-between text-left hover:text-white/80 transition-colors list-none">
                <span className="font-medium text-white text-lg pr-4">
                  {faq.question}
                </span>
                <Plus className="w-6 h-6 text-white/50 transform group-open:rotate-45 transition-all duration-300 flex-shrink-0" />
              </summary>
              <div className="pb-6 overflow-hidden">
                <p className="text-white/60 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12 pt-8">
          <p className="text-white/50 mb-4 font-light">Masz inne pytania?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
            <u>Napisz do nas</u>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}