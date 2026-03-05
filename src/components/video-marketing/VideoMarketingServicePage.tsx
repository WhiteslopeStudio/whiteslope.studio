import Link from 'next/link';
import HeroSection from './HeroSection';

export default function VideoMarketingServicePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-6 pt-8">
        <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
          ← Wróć do cennika
        </Link>
      </div>

      <HeroSection />
      
      {/* Placeholder for future sections */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-light mb-4">Upsell Section</h2>
            <p className="text-white/60">Coming soon - szczegółowa sekcja upsell będzie tutaj</p>
          </div>
        </div>
      </section>
    </div>
  );
}
