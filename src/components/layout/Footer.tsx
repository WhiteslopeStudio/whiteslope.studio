import { 
  Mail, 
  Phone, 
  MapPin,
  Star,
  ArrowRight,
  ExternalLink,
  Award,
  Zap,
  Linkedin,
  Github,
} from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black relative overflow-hidden"
      style={{
        background: 'linear-gradient(0deg, #080808ff 0%, #080808ff 100%)'
      }}
    >  
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main footer content */}
        <div className="py-16 border-b border-gray-800/50">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Image 
                src="/_resources/logoWhiteSlope.webp"
                alt="Whiteslope Logo"
                width={250}
                height={150}
                className="mb-8 w-auto object-contain"
              />
              
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Tworzymy profesjonalne strony internetowe i aplikacje webowe szybsze niż chińczycy z Temu. 
                <span className="text-white font-semibold"> Jakość na lata.</span>
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-6 mb-6 text-xs">
                <div className="flex items-center text-[#DD9C90]">
                  <Award className="w-4 h-4 mr-1" />
                  <span>100% projektowania</span>
                </div>
                <div className="flex items-center text-[#DD9C90]">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>24h odpowiedzi</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-white text-sm font-semibold">5.0</span>
                <span className="text-gray-400 text-xs ml-2">na podstawie 1 opinii</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Nawigacja</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Start', href: '/#home' },
                  { name: 'Portfolio', href: '/#portfolio' },
                  { name: 'Usługi', href: '/#services' },
                  { name: 'Proces', href: '/#process' },
                  { name: 'Opinie', href: '/#testimonials' },
                  { name: 'Polityka prywatności', href: '/privacy&cookies/privacyPolicy' },
                  { name: 'Polityka cookies', href: '/privacy&cookies/cookiesPolicy' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="text-gray-400 hover:text-[#DD9C90] transition-colors duration-300 text-sm flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Nasze Usługi</h4>
              <ul className="space-y-3">
                {[
                  'Strony wizytówkowe',
                  'Strony biznesowe', 
                  'Sklepy internetowe',
                  'Aplikacje webowe',
                  'Optymalizacja SEO',
                  'Konsultacje'
                ].map((service) => (
                  <li key={service}>
                    <div className="text-gray-400 text-sm flex items-center">
                      <div className="w-1 h-1 bg-[#DD9C90] rounded-full mr-3 flex-shrink-0" />
                      {service}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a 
                  href="/pricing" 
                  className="inline-flex items-center text-[#DD9C90] hover:text-[#DD9C90]/80 transition-colors text-sm font-semibold group"
                >
                  <span>Zobacz pełną ofertę</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Kontakt</h4>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#DD9C90] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{APP_CONFIG.email}</div>
                    <div className="text-gray-500 text-xs">Odpowiadamy w 24h</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#DD9C90] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{APP_CONFIG.phone}</div>
                    <div className="text-gray-500 text-xs">Pon-Pt 9:00-17:00</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#DD9C90] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">Białystok, Polska</div>
                    <div className="text-gray-500 text-xs">Działamy zdalnie</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="/contact?tab=meeting"
                className="inline-flex items-center bg-[#DD9C90] text-black px-6 py-3 rounded-lg font-bold 
                active:scale-95 hover:scale-105 hover:bg-[#DD9C90]/90 transition-all duration-300 text-sm shadow-lg hover:shadow-[#DD9C90]/25"
              >
                <span>Skontaktuj się</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>

              {/* Social Media */}
              <div className="flex space-x-3 mt-6">
                <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-[#DD9C90] rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-black" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-[#DD9C90] rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Github className="w-4 h-4 text-gray-400 group-hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="flex items-center text-gray-500 text-sm">
              <span>© {currentYear} {APP_CONFIG.name}. Wszystkie prawa zastrzeżone.</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </a>
              <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                Cennik
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};