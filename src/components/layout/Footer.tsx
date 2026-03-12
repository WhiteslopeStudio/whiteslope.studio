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
  Instagram,
  Facebook,
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
                Tworzymy profesjonalne strony internetowe i aplikacje dla firm i osób prywatnych.
                <span className="text-white font-semibold"> Jakość na lata.</span>
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-6 mb-6 text-xs">
                <div className="flex items-center text-gray-400">
                  <Award className="w-4 h-4 mr-1" />
                  <span>100% zadowolonych klientów</span>
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
                <span className="text-gray-400 text-xs ml-2">na podstawie 3 opinii</span>
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
                  { name: 'Polityka cookies', href: '/privacy&cookies/cookiesPolicy' },
                  { name: 'API dla AI', href: '/api/whiteslope-info', isApi: true }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className={`transition-colors duration-300 text-sm flex items-center group ${
                        (item as any).isApi 
                          ? 'text-gray-300 hover:text-gray-300/70' 
                          : 'text-gray-400 hover:text-white'
                      }`}
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
                      <div className="w-1 h-1 bg-gray-600 rounded-full mr-3 flex-shrink-0" />
                      {service}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a 
                  href="/pricing" 
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm font-semibold group"
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
                  <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{APP_CONFIG.email}</div>
                    <div className="text-gray-500 text-xs">Odpowiadamy w 24h</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{APP_CONFIG.phone}</div>
                    <div className="text-gray-500 text-xs">Pon-Pt 9:00-17:00</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">Białystok, Polska</div>
                    <div className="text-gray-500 text-xs">Działamy zdalnie</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="/contact?tab=meeting"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold active:scale-95 hover:scale-105 hover:bg-blue-500 transition-all duration-300 text-sm shadow-lg hover:shadow-blue-600/25"
              >
                <span>Skontaktuj się</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>

              <div className="flex space-x-3 mt-6">
                <a
                  href="https://www.instagram.com/whiteslopestudio/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cities section - full width horizontal */}
        <div className="py-6 border-b border-gray-800/50">
          <div className="text-center mb-4">
            <h4 className="text-white font-semibold text-sm mb-4">Strony Internetowe dostarczamy na całym Podlasiu</h4>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-7xl mx-auto">
              {[
                "Białystok", "Suwałki", "Łomża", "Augustów",
                "Bielsk Podlaski", "Grajewo", "Zambrów", "Hajnówka",
                "Sokółka", "Łapy", "Siemiatycze", "Wasilków",
                "Kolno", "Mońki", "Wysokie Mazowieckie",
                "Czarna Białostocka", "Choroszcz", "Ciechanowiec",
                "Supraśl", "Zabłudów", "Tykocin", "Drohiczyn"
              ].map((city) => {
                const citySlug = city.toLowerCase()
                  .replace(/[ąćęłńóśźż]/g, (match) => ({
                    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
                    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z'
                  }[match] || match))
                  .replace(/\s+/g, '-')
                  .replace(/[^\w-]/g, '');
                
                return (
                  <a
                    key={city}
                    href={`/${citySlug}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm px-2 py-1 rounded hover:bg-gray-800/30"
                  >
                    {city}
                  </a>
                );
              })}
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