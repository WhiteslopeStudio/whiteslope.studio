
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ArrowLeft, Star, Clock, Phone, Mail, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MAIN_SERVICES, SERVICE_PACKAGES, getServicePackages } from '@/lib/data';
import { MainService, ServicePackage } from '@/lib/types';
import LottieAnimation from '@/components/ui/LottieAnimation';

// Sprawdzamy czy service ID istnieje w MAIN_SERVICES
const validServiceIds = MAIN_SERVICES.map(s => s.id);

// Mapowanie usług do animacji Lottie
const serviceAnimations = {
  'website': '/\_resources/website.json',
  'optimization': '/\_resources/fixing.json',
  'ai-integration': '/\_resources/ai.json',
  'graphics': '/\_resources/graphic.json',
  'individual': '/\_resources/invidual.json',
};

// Static params dla SSG
export async function generateStaticParams() {
  return validServiceIds.map((serviceId) => ({
    service: serviceId,
  }));
}

// Dynamic metadata z lepszym SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service: serviceId } = await params;
  const service = MAIN_SERVICES.find(s => s.id === serviceId);
  const packages = getServicePackages(serviceId);
  
  if (!service) {
    return {
      title: 'Usługa nie znaleziona - WHITESLOPE',
      description: 'Usługa o podanym identyfikatorze nie została znaleziona.',
    };
  }

  const priceRange = packages.length > 0 
    ? `od ${packages[packages.length - 1].price}` 
    : service.price;

  return {
    title: `${service.title} - Pakiety ${priceRange} | WHITESLOPE`,
    description: `${service.description} Sprawdź nasze ${packages.length} pakiety: ${priceRange}. Darmowa konsultacja, przejrzyste ceny, profesjonalne wykonanie.`,
    keywords: `${service.title}, ${service.subtitle}, cennik, pakiety, ${serviceId}, strony internetowe, web development, WHITESLOPE`,
    authors: [{ name: 'WHITESLOPE' }],
    creator: 'WHITESLOPE',
    publisher: 'WHITESLOPE',
    alternates: {
      canonical: `/pricing/${serviceId}`,
    },
    openGraph: {
      title: `${service.title} - Pakiety ${priceRange} | WHITESLOPE`,
      description: `${service.description} Sprawdź ${packages.length} dostępne pakiety.`,
      url: `/pricing/${serviceId}`,
      siteName: 'WHITESLOPE',
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Pakiety ${priceRange}`,
      description: service.description,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceId } = await params;
  const service = MAIN_SERVICES.find(s => s.id === serviceId);
  const packages = getServicePackages(serviceId);
  
  if (!service || packages.length === 0) {
    notFound();
  }

  const animationPath = serviceAnimations[service.id as keyof typeof serviceAnimations];
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* WATERMARK - tylko na desktop */}
      <div className="hidden lg:flex absolute inset-0 z-0 pointer-events-none items-start justify-center pt-24">
        <h1 
          className="text-[15vw] font-normal leading-none tracking-tighter whitespace-nowrap opacity-25"
          style={{
            background: 'linear-gradient(to bottom, #707070 0%, #303030 50%, transparent 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {service.title.toUpperCase()}
        </h1>
      </div>

      {/* Back Navigation */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-light">Wróć do cennika</span>
          </Link>
        </div>
      </div>

      {/* Packages Section - ZACZYNA SIĘ OD TEGO */}
      <section className="relative z-10 pt-40 pb-16">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-normal mb-4">
              Dostępne pakiety
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
              Każdy pakiet został starannie zaprojektowany, aby zapewnić maksymalną wartość dla Twojego biznesu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-8xl mx-auto">
            {packages.map((pkg, index) => (
              <Link
                key={pkg.id}
                href={`/contact?tab=quote&service=${service.id}&package=${pkg.id}#contact-form`}
                className="block rounded-2xl border border-white/10 bg-[#0f0f0f] hover:border-white/20 p-6 transition-all duration-500 cursor-pointer"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-normal text-[#fd9f91] mb-3">{pkg.name}</h3>
                  <div className="text-4xl font-semibold text-white mb-3">{pkg.price}</div>
                  <p className="text-gray-300 leading-relaxed mb-4 font-light">{pkg.description}</p>
                  
                  <div className="inline-flex items-center gap-2 bg-[#c3c4c2]/10 border border-[#c3c4c2]/30 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-[#c3c4c2]" />
                    <span className="text-[#c3c4c2] text-sm font-medium">Realizacja: {pkg.timeline} (orientacyjnie)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-medium text-white mb-4">Co otrzymasz:</h4>
                  <div className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 flex-shrink-0 text-[#aafd91]" />
                        <span className="text-gray-300 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 bg-white/2 text-white">
                    <span>Wybierz</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  
                  <div className='text-center justify-center'>
                    <span className="text-gray-300 text-sm">
                      lub umów darmową konsultację
                    </span>
                  </div>

                  
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Bez zobowiązań • Profesjonalne doradztwo • Przejrzyste ceny
                </p>
              </Link>
            ))}
          </div>

          {/* Custom Solution CTA - BEZ BACKGROUND I BORDER */}
          <div className="text-center mt-16">
            <div className="p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-normal text-white mb-4">
                Żaden pakiet nie odpowiada Twoim potrzebom?
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed font-light">
                Stwórzmy razem <span className="text-[#fd9f91] font-medium">rozwiązanie na miarę</span> Twojego biznesu. 
                Darmowa konsultacja i indywidualna wycena.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#fd9f91] text-black px-8 py-4 rounded-full font-medium hover:bg-[#fc8a7a] transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Umów konsultację
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features - BEZ BACKGROUND I BORDER */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-normal mb-4">
                Dlaczego warto wybrać <br/>
                <span className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent font-normal">
                  {service.title.toLowerCase()}
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
                Poznaj wszystkie korzyści, które otrzymasz wybierając tę usługę
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#fd9f91]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-[#fd9f91]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            
            <h2 className="text-4xl md:text-5xl font-thin mb-6 leading-tight">
              Rozpocznijmy
              <br />
              <span className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent font-normal">
                współpracę
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 font-light max-w-2xl mx-auto">
              Nie czekaj dłużej! Skontaktuj się z nami już dziś i otrzymaj 
              <span className="text-[#fd9f91] font-medium"> darmową konsultację</span>. 
              Pomożemy Ci wybrać idealny pakiet i zrealizować Twoje cele biznesowe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mx-auto mb-8">
              <Link 
                href={`/contact?tab=quote&service=${service.id}`}
                className="flex items-center justify-center gap-2 bg-[#fd9f91] text-black px-6 py-4 rounded-full font-medium hover:bg-[#fc8a7a] transition-all duration-300 whitespace-nowrap"
              >
                <Mail className="w-5 h-5" />
                Wyślij zapytanie
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a 
                href="tel:+48662581368"
                className="flex items-center justify-center gap-2 border border-[#fffff0] text-white px-6 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Zadzwoń teraz
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-[#fd9f91] font-medium mb-2">Szybka odpowiedź</div>
                <div className="text-gray-400 text-sm font-light">Skontaktujemy się w ciągu 24h</div>
              </div>
              <div className="text-center">
                <div className="text-[#fd9f91] font-medium mb-2">Bezpłatna wycena</div>
                <div className="text-gray-400 text-sm font-light">Szczegółowa kalkulacja kosztów</div>
              </div>
              <div className="text-center">
                <div className="text-[#fd9f91] font-medium mb-2">Bez zobowiązań</div>
                <div className="text-gray-400 text-sm font-light">Konsultacja całkowicie za darmo</div>
              </div>
            </div>

            <div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-light">Porównaj wszystkie usługi w cenniku</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}