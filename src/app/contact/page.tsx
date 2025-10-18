'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, Star, Shield, Zap,
  Calendar, FileText, MessageSquare, Briefcase, ChevronDown,
  ChevronUp, X
} from 'lucide-react';
import { useAdvancedInView, useMobileDetection } from '@/utils/hooks';
import { MAIN_SERVICES, getServicePackages } from '@/lib/data';

// ==========================================
// 📝 TYPES & TAB CONFIGURATION
// ==========================================

type TabType = 'meeting' | 'quote' | 'question' | 'project';

interface BaseFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface MeetingFormData extends BaseFormData {
  preferredDate: string;
  preferredTime: string;
  meetingType: 'online' | 'phone' | 'onsite';
  topic: string;
}

interface QuoteFormData extends BaseFormData {
  service: string;
  package: string;
  timeline: string;
  description: string;
  hasExistingSite: boolean;
  currentSiteUrl: string;
}

interface QuestionFormData extends BaseFormData {
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

interface ProjectFormData extends BaseFormData {
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements: string[];
  inspirations: string;
  hasExistingSite: boolean;
  currentSiteUrl: string;
}

const TAB_CONFIG = {
  meeting: {
    id: 'meeting',
    title: 'Umów spotkanie',
    subtitle: 'Darmowa konsultacja',
    description: 'Porozmawiajmy o Twoich potrzebach podczas bezpłatnej konsultacji',
    icon: Calendar,
    color: '#10B981'
  },
  quote: {
    id: 'quote',
    title: 'Zapytaj o cenę',
    subtitle: 'Szybka wycena',
    description: 'Wybierz usługę i otrzymaj szczegółową wycenę w 24h',
    icon: FileText,
    color: '#3B82F6'
  },
  question: {
    id: 'question',
    title: 'Zadaj pytanie',
    subtitle: 'Wsparcie i porady',
    description: 'Masz pytanie techniczne lub potrzebujesz porady?',
    icon: MessageSquare,
    color: '#F59E0B'
  },
  project: {
    id: 'project',
    title: 'Zgłoś projekt',
    subtitle: 'Szczegółowy brief',
    description: 'Opowiedz nam o swoim projekcie - stworzymy wycenę na miarę',
    icon: Briefcase,
    color: '#8B5CF6'
  }
} as const;

// ==========================================
// 📋 FORM CONFIGURATIONS
// ==========================================

const MEETING_TIMES = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const TIMELINES = [
  'Jak najszybciej', 'Do 2 tygodni', 'Do 1 miesiąca', 
  '1-3 miesiące', '3-6 miesięcy', 'Nie jestem pewien'
];

const MEETING_TYPES = [
  { value: 'online', label: 'Online (Google Meet/Zoom)' },
  { value: 'phone', label: 'Rozmowa telefoniczna' },
  { value: 'onsite', label: 'Spotkanie w biurze (Białystok)' }
];

const PROJECT_TYPES = [
  'Strona internetowa - wizytówka',
  'Strona internetowa - biznesowa',
  'Sklep internetowy',
  'Portal/Blog',
  'Aplikacja webowa',
  'Redesign istniejącej strony',
  'Optymalizacja/SEO',
  'Migracja strony',
  'Inne - opiszę w szczegółach'
];

const PROJECT_BUDGETS = [
  'Do 2000 zł',
  '2000-5000 zł', 
  '5000-10000 zł',
  '10000-20000 zł',
  'Powyżej 20000 zł',
  'Nie jestem pewien - potrzebuję wyceny'
];

const PROJECT_REQUIREMENTS = [
  'Responsywny design (dostosowanie do urządzeń mobilnych)',
  'System zarządzania treścią (CMS)',
  'Formularz kontaktowy',
  'Galeria zdjęć/portfolio',
  'Blog/aktualności',
  'Mapa Google',
  'Integracja z social media',
  'Newsletter/mailing',
  'Sklep internetowy/płatności online',
  'Rezerwacja online/kalendarz',
  'Panel administracyjny',
  'Wielojęzyczność',
  'Optymalizacja SEO',
  'Analityka (Google Analytics)',
  'Chat online',
  'Logowanie użytkowników',
  'API/integracje zewnętrzne',
  'Hosting i domena'
];

// ==========================================
// 🎨 REUSABLE COMPONENTS
// ==========================================

const FormField: React.FC<{
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, required, error, children }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const Select: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: string[] | { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, options, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-left text-white focus:outline-none focus:border-white transition-colors hover:cursor-pointer ${className}`}
      >
        <div className="flex items-center justify-between">
          <span className={value ? 'text-white' : 'text-[#737373]'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-[#737373] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#171717] border border-[#404040] rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {options.map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(optionValue);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-white hover:bg-[#262626] hover:cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// GŁÓWNY KOMPONENT Z LOGIKĄ - musi być wydzielony
function ContactContent() {
  const searchParams = useSearchParams();
  const [ref, inView] = useAdvancedInView() as [React.RefObject<HTMLDivElement>, boolean];
  const isMobile = useMobileDetection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ==========================================
  // 🎉 SUCCESS TOAST STATES
  // ==========================================
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // ==========================================
  // 📋 FORM STATES
  // ==========================================
  
  const [meetingForm, setMeetingForm] = useState<MeetingFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    meetingType: 'online',
    topic: ''
  });

  const [quoteForm, setQuoteForm] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    package: '',
    timeline: '',
    description: '',
    hasExistingSite: false,
    currentSiteUrl: ''
  });

  const [questionForm, setQuestionForm] = useState<QuestionFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: [],
    inspirations: '',
    hasExistingSite: false,
    currentSiteUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // URL parameters handling
  const serviceParam = searchParams.get('service');
  const packageParam = searchParams.get('package');
  const tabParam = searchParams.get('tab') as TabType;

  // ==========================================
  // � STATE MANAGEMENT
  // ==========================================
  
  // Active tab state with URL parameter initialization
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (tabParam && Object.keys(TAB_CONFIG).includes(tabParam)) {
      return tabParam;
    }
    if (serviceParam || packageParam) {
      return 'quote';
    }
    return 'meeting';
  });

  // ==========================================
  // �🔄 URL PARAMETER EFFECTS
  // ==========================================
  
  // Auto-fill quote form from URL parameters
  useEffect(() => {
    if (serviceParam || packageParam) {
      setQuoteForm(prev => ({
        ...prev,
        service: serviceParam || prev.service,
        package: packageParam || prev.package
      }));
    }
  }, [serviceParam, packageParam]);

  // Auto-switch tab from URL parameter
  useEffect(() => {
    if (tabParam && TAB_CONFIG[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // ==========================================
  // 🔍 VALIDATION FUNCTIONS
  // ==========================================
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
  };

  const validateMeetingForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!meetingForm.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane (minimum 2 znaki)';
    } else if (meetingForm.name.trim().length < 2) {
      newErrors.name = 'Imię i nazwisko musi mieć minimum 2 znaki';
    }

    if (!meetingForm.email.trim()) {
      newErrors.email = 'Adres email jest wymagany';
    } else if (!validateEmail(meetingForm.email)) {
      newErrors.email = 'Podaj prawidłowy adres email (np. jan@example.com)';
    }

    if (meetingForm.phone && !validatePhone(meetingForm.phone)) {
      newErrors.phone = 'Podaj prawidłowy numer telefonu (minimum 9 cyfr)';
    }

    if (!meetingForm.preferredDate) {
      newErrors.preferredDate = 'Wybierz preferowaną datę spotkania';
    }

    if (!meetingForm.preferredTime) {
      newErrors.preferredTime = 'Wybierz preferowaną godzinę spotkania';
    }

    if (!meetingForm.topic.trim()) {
      newErrors.topic = 'Opisz temat spotkania (minimum 10 znaków)';
    } else if (meetingForm.topic.trim().length < 10) {
      newErrors.topic = 'Temat spotkania musi mieć minimum 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuoteForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!quoteForm.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane (minimum 2 znaki)';
    } else if (quoteForm.name.trim().length < 2) {
      newErrors.name = 'Imię i nazwisko musi mieć minimum 2 znaki';
    }

    if (!quoteForm.email.trim()) {
      newErrors.email = 'Adres email jest wymagany';
    } else if (!validateEmail(quoteForm.email)) {
      newErrors.email = 'Podaj prawidłowy adres email (np. jan@example.com)';
    }

    if (quoteForm.phone && !validatePhone(quoteForm.phone)) {
      newErrors.phone = 'Podaj prawidłowy numer telefonu (minimum 9 cyfr)';
    }

    if (!quoteForm.service) {
      newErrors.service = 'Wybierz rodzaj usługi z listy';
    }

    if (!quoteForm.package) {
      newErrors.package = 'Wybierz pakiet z dostępnych opcji';
    }

    if (!quoteForm.timeline) {
      newErrors.timeline = 'Wybierz termin realizacji projektu';
    }

    if (!quoteForm.description.trim()) {
      newErrors.description = 'Opis projektu jest wymagany (minimum 20 znaków)';
    } else if (quoteForm.description.trim().length < 20) {
      newErrors.description = 'Opis projektu musi mieć minimum 20 znaków';
    }

    if (quoteForm.hasExistingSite && quoteForm.currentSiteUrl && !quoteForm.currentSiteUrl.startsWith('http')) {
      newErrors.currentSiteUrl = 'Podaj prawidłowy adres URL (zaczynający się od http:// lub https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestionForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!questionForm.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane (minimum 2 znaki)';
    } else if (questionForm.name.trim().length < 2) {
      newErrors.name = 'Imię i nazwisko musi mieć minimum 2 znaki';
    }

    if (!questionForm.email.trim()) {
      newErrors.email = 'Adres email jest wymagany';
    } else if (!validateEmail(questionForm.email)) {
      newErrors.email = 'Podaj prawidłowy adres email (np. jan@example.com)';
    }

    if (questionForm.phone && !validatePhone(questionForm.phone)) {
      newErrors.phone = 'Podaj prawidłowy numer telefonu (minimum 9 cyfr)';
    }

    if (!questionForm.subject.trim()) {
      newErrors.subject = 'Temat pytania jest wymagany (minimum 3 znaki)';
    } else if (questionForm.subject.trim().length < 3) {
      newErrors.subject = 'Temat pytania musi mieć minimum 3 znaki';
    }

    if (!questionForm.message.trim()) {
      newErrors.message = 'Treść pytania jest wymagana (minimum 10 znaków)';
    } else if (questionForm.message.trim().length < 10) {
      newErrors.message = 'Treść pytania musi mieć minimum 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProjectForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!projectForm.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane (minimum 2 znaki)';
    } else if (projectForm.name.trim().length < 2) {
      newErrors.name = 'Imię i nazwisko musi mieć minimum 2 znaki';
    }

    if (!projectForm.email.trim()) {
      newErrors.email = 'Adres email jest wymagany';
    } else if (!validateEmail(projectForm.email)) {
      newErrors.email = 'Podaj prawidłowy adres email (np. jan@example.com)';
    }

    if (projectForm.phone && !validatePhone(projectForm.phone)) {
      newErrors.phone = 'Podaj prawidłowy numer telefonu (minimum 9 cyfr)';
    }

    if (!projectForm.projectType) {
      newErrors.projectType = 'Wybierz typ projektu z listy';
    }

    if (!projectForm.budget) {
      newErrors.budget = 'Wybierz budżet dla projektu';
    }

    if (!projectForm.timeline) {
      newErrors.timeline = 'Wybierz termin realizacji projektu';
    }

    if (!projectForm.description.trim()) {
      newErrors.description = 'Opis projektu jest wymagany (minimum 20 znaków)';
    } else if (projectForm.description.trim().length < 20) {
      newErrors.description = 'Opis projektu musi mieć minimum 20 znaków';
    }

    if (projectForm.hasExistingSite && projectForm.currentSiteUrl && !projectForm.currentSiteUrl.startsWith('http')) {
      newErrors.currentSiteUrl = 'Podaj prawidłowy adres URL (zaczynający się od http:// lub https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // 🎉 SUCCESS TOAST FUNCTION
  // ==========================================
  
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  // ==========================================
  // 📤 FORM SUBMIT HANDLERS
  // ==========================================

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateMeetingForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'meeting',
          formData: meetingForm,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }
      
      // Reset formularza po sukcesie
      setMeetingForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        preferredDate: '',
        preferredTime: '',
        meetingType: 'online',
        topic: ''
      });
      
      showSuccess('Spotkanie zostało zarezerwowane! Skontaktujemy się z Tobą w ciągu 24h.');
      
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateQuoteForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'quote',
          formData: quoteForm,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }
      
      // Reset formularza po sukcesie
      setQuoteForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        package: '',
        timeline: '',
        description: '',
        hasExistingSite: false,
        currentSiteUrl: ''
      });
      
      showSuccess('Zapytanie o wycenę wysłane! Otrzymasz ofertę w ciągu 24-48h.');
      
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateQuestionForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'question',
          formData: questionForm,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }
      
      // Reset formularza po sukcesie
      setQuestionForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
      
      showSuccess('Pytanie zostało wysłane! Odpowiedź otrzymasz zgodnie z priorytetem.');
      
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateProjectForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'project',
          formData: projectForm,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }
      
      // Reset formularza po sukcesie
      setProjectForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        requirements: [],
        inspirations: '',
        hasExistingSite: false,
        currentSiteUrl: ''
      });
      
      showSuccess('Projekt został zgłoszony! Przygotujemy propozycję w ciągu 72h.');
      
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white mt-10">
      {/* Hero Section */}
      <section className="pt-32 pb-0 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4/5">
          <div className="bg-gradient-to-r from-white/1 via-white/3 to-white/1 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-semibold text-white mb-6 text-5xl md:text-5xl">
              
              <span className="font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">Porozmawiajmy o Twoim projekcie</span>
            </h1>
            <p className="text-[#a3a3a3] max-w-3xl mx-auto mb-8 leading-relaxed text-lg md:text-lg">
              Wybierz sposób kontaktu dopasowany do Twoich potrzeb.{' '}
              <span className="text-white font-semibold">Odpowiadamy w ciągu 24h</span> i zawsze zaczynamy od bezpłatnej konsultacji.
            </p>
            
            
          </div>
        </div>
      </section>

      {/* Tabs Navigation - Apple Style */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          
          {/* DESKTOP TABS - ukryj na mobile */}
          <div className="hidden md:block bg-white/5 backdrop-blur-md rounded-full p-1.5 mb-8 border border-white/10 max-w-3xl mx-auto">
            <div className="flex gap-1">
              {Object.entries(TAB_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                const isActive = activeTab === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as TabType)}
                    className={`flex-1 relative px-4 py-2.5 rounded-full transition-all duration-300 text-center hover:cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-lg'
                        : 'text-[#a3a3a3] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#737373]'}`} />
                      <span className="font-medium text-sm whitespace-nowrap">
                        {config.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE TAB SELECTOR - Trigger Button */}
          <div className="md:hidden mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                {React.createElement(TAB_CONFIG[activeTab].icon, {
                  className: 'w-5 h-5 text-white'
                })}
                <div className="text-left">
                  <div className="font-semibold text-white">{TAB_CONFIG[activeTab].title}</div>
                  <div className="text-xs text-[#737373]">{TAB_CONFIG[activeTab].subtitle}</div>
                  
                </div>
              </div>
              
              <ChevronDown className="w-5 h-5 text-[#737373]" />
            </button>
          </div>

          {/* MOBILE BOTTOM SHEET */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Bottom Sheet */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 bg-[#171717] rounded-t-3xl border-t border-white/10 z-50 md:hidden"
                  style={{ maxHeight: '80vh' }}
                >
                  {/* Handle Bar */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-white/20 rounded-full" />
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white">Wybierz rodzaj kontaktu</h3>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  

                  {/* Tab Options */}
                  <div className="overflow-y-auto px-6 py-4 space-y-2" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                    {Object.entries(TAB_CONFIG).map(([key, config]) => {
                      const Icon = config.icon;
                      const isActive = activeTab === key;
                      
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setActiveTab(key as TabType);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                            isActive
                              ? 'bg-white text-black'
                              : 'bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isActive ? 'bg-black/10' : 'bg-white/5'
                            }`}>
                              <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-white'}`} />
                            </div>
                            <div className="flex-1">
                              <div className={`font-bold mb-0.5 ${isActive ? 'text-black' : 'text-white'}`}>
                                {config.title}
                              </div>
                              <div className={`text-sm ${isActive ? 'text-black/60' : 'text-[#737373]'}`}>
                                {config.subtitle}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          

          {/* Current Active Tab Info - tylko gdy NIE MA parametrów */}
          {!(serviceParam || packageParam) && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">{TAB_CONFIG[activeTab].title}</h2>
                <p className="text-[#737373] text-lg mb-4">{TAB_CONFIG[activeTab].description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 min-w-8xl">
        <div className="container mx-auto px-6 justify-left items-left">
          <div className="grid gap-12 grid-cols-1 lg:grid-cols-4">


            {/* Contact Info */}
            <div 
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Dane kontaktowe</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Email</div>
                      <a 
                        href="mailto:kontakt@whiteslope.studio" 
                        className="text-[#737373] hover:text-white transition-colors hover:cursor-pointer"
                      >
                        kontakt@whiteslope.studio
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Telefon</div>
                      <a 
                        href="tel:+48662581368" 
                        className="text-[#737373] hover:text-white transition-colors hover:cursor-pointer"
                      >
                        +48 662 581 368
                      </a>
                      <a 
                        href="tel:+48731721760" 
                        className="text-[#737373] hover:text-white transition-colors hover:cursor-pointer"
                      >
                        , +48 731 721 760
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Lokalizacja</div>
                      <div className="text-[#737373]">Białystok, Polska</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Godziny pracy</div>
                      <div className="text-[#737373]">Pon - Pt: 9:00 - 17:00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white mb-4">Pilny projekt?</h3>
                <p className="text-[#d4d4d4] text-sm mb-4">
                  Zadzwoń bezpośrednio i omówimy szczegóły.
                </p>
                <a
                  href="tel:+48662581368"
                  className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-[#d4d4d4] transition-colors inline-flex items-center gap-2 hover:cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Zadzwoń teraz
                </a>
              </div>
            </div>

            {/* Form Container */}
            <motion.div
              id="contact-form"
              className="col-span-3 pt-20 -mt-20"
            >
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                
                {/* Active Tab Form Area */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    {React.createElement(TAB_CONFIG[activeTab].icon, {
                      className: 'w-8 h-8 text-white'
                    })}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {(quoteForm.service && quoteForm.package) && activeTab === 'quote' 
                          ? 'Wybrany pakiet' 
                          : TAB_CONFIG[activeTab].title
                        }
                      </h3>
                      <p className="text-[#737373]">
                        {(quoteForm.service && quoteForm.package) && activeTab === 'quote'
                          ? 'Sprawdź szczegóły i wypełnij formularz'
                          : TAB_CONFIG[activeTab].subtitle
                        }
                      </p>
                    </div>
                  </div>
                </div>      

                {/* Form Content */}
                {activeTab === 'meeting' && (
                  <form onSubmit={handleMeetingSubmit} className="space-y-6">

                    {/* Basic Info Row */}
                    <div id="contact-form-meeting" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Imię i nazwisko" required error={errors.name}>
                        <input
                          type="text"
                          value={meetingForm.name}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Jan Kowalski"
                        />
                      </FormField>

                      <FormField label="Email" required error={errors.email}>
                        <input
                          type="email"
                          value={meetingForm.email}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="jan@example.com"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Telefon" error={errors.phone}>
                        <input
                          type="tel"
                          value={meetingForm.phone}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="+48 123 456 789"
                        />
                      </FormField>

                      <FormField label="Firma/Organizacja" error={errors.company}>
                        <input
                          type="text"
                          value={meetingForm.company}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Nazwa firmy"
                        />
                      </FormField>
                    </div>

                    {/* Meeting Preferences */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-white" />
                        Preferencje spotkania
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField label="Preferowana data" required error={errors.preferredDate}>
                          <input
                            type="date"
                            value={meetingForm.preferredDate}
                            onChange={(e) => setMeetingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                          />
                        </FormField>

                        <FormField label="Preferowana godzina" required error={errors.preferredTime}>
                          <Select
                            value={meetingForm.preferredTime}
                            onChange={(value) => setMeetingForm(prev => ({ ...prev, preferredTime: value }))}
                            options={MEETING_TIMES}
                            placeholder="Wybierz godzinę"
                          />
                        </FormField>

                        <FormField label="Rodzaj spotkania" required error={errors.meetingType}>
                          <Select
                            value={meetingForm.meetingType}
                            onChange={(value) => setMeetingForm(prev => ({ ...prev, meetingType: value as 'online' | 'phone' | 'onsite' }))}
                            options={MEETING_TYPES}
                            placeholder="Wybierz rodzaj"
                          />
                        </FormField>
                      </div>
                    </div>

                    {/* Topic Description */}
                    <FormField label="Temat spotkania" required error={errors.topic}>
                      <textarea
                        value={meetingForm.topic}
                        onChange={(e) => setMeetingForm(prev => ({ ...prev, topic: e.target.value }))}
                        rows={4}
                        className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors resize-none"
                        placeholder="Opisz pokrótce czego dotyczy spotkanie, jakie masz pytania lub o czym chciałbyś porozmawiać..."
                      />
                    </FormField>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#d4d4d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5" />
                            Wyślij
                          </>
                        )}
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                      <p className="text-blue-300 text-sm">
                        💡 Po wysłaniu formularza skontaktujemy się z Tobą w ciągu 24 godzin, aby potwierdzić szczegóły spotkania
                      </p>
                    </div>
                  </form>
                )}

                {/* Quote Form */}
                {activeTab === 'quote' && (
                  <form onSubmit={handleQuoteSubmit} className="space-y-6">

                    {/* Selected Package Box - kompaktowy */}
                    {activeTab === 'quote' && quoteForm.service && quoteForm.package && (
                      <div className="mb-6 bg-white rounded-2xl shadow-2xl p-5 w-full">
                        {(() => {
                          const selectedService = MAIN_SERVICES.find(s => s.id === quoteForm.service);
                          const selectedPackage = getServicePackages(quoteForm.service).find(p => p.id === quoteForm.package);
                          
                          
                          if (selectedService && selectedPackage) {
                            return (
                              <div>
                                
                                
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-2xl font-bold text-black mb-2">
                                      {selectedService.title} - {selectedPackage.name}
                                    </div>
                                    <div className="text-xl font-bold text-black mb-2">
                                      {selectedPackage.price}
                                    </div>
                                    <div className="text-gray-700 text-sm leading-relaxed">
                                      {selectedPackage.description}
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end">
                                    <a
                                      href={`/pricing/${quoteForm.service}#${quoteForm.package}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-gray-600 hover:text-black underline transition-colors"
                                    >
                                      Zobacz szczegóły pakietu →
                                    </a>
                                  </div>
                                  
                                  <div className="bg-gray-100 rounded-lg p-3">
                                    <p className="text-xs text-gray-700">
                                      <strong className="text-black">To cena orientacyjna.</strong> Po wypełnieniu formularza otrzymasz szczegółową wycenę dostosowaną do Twoich potrzeb.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}
                    
                    {/* Service Selection */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">                    
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Rodzaj usługi" required error={errors.service}>
                          <Select
                            value={quoteForm.service}
                            onChange={(value) => {
                              setQuoteForm(prev => ({ ...prev, service: value, package: '' }));
                            }}
                            options={MAIN_SERVICES.map(service => ({
                              value: service.id,
                              label: service.title
                            }))}
                            placeholder="Wybierz usługę"
                          />
                        </FormField>

                        <FormField label="Pakiet" required error={errors.package}>
                          <Select
                            value={quoteForm.package}
                            onChange={(value) => setQuoteForm(prev => ({ ...prev, package: value }))}
                            options={
                              quoteForm.service 
                                ? getServicePackages(quoteForm.service).map(pkg => ({
                                    value: pkg.id,
                                    label: `${pkg.name} - ${pkg.price}`
                                  }))
                                : []
                            }
                            placeholder={quoteForm.service ? "Wybierz pakiet" : "Najpierw wybierz usługę"}
                          />
                        </FormField>
                      </div>
                    </div>


                    {/* Basic Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Imię i nazwisko" required error={errors.name}>
                        <input
                          type="text"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Jan Kowalski"
                        />
                      </FormField>

                      <FormField label="Email" required error={errors.email}>
                        <input
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="jan@example.com"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Telefon" error={errors.phone}>
                        <input
                          type="tel"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="+48 123 456 789"
                        />
                      </FormField>

                      <FormField label="Firma/Organizacja" error={errors.company}>
                        <input
                          type="text"
                          value={quoteForm.company}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Nazwa firmy"
                        />
                      </FormField>
                    </div>

                    

                    {/* Additional Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Termin realizacji" required error={errors.timeline}>
                        <Select
                          value={quoteForm.timeline}
                          onChange={(value) => setQuoteForm(prev => ({ ...prev, timeline: value }))}
                          options={TIMELINES}
                          placeholder="Wybierz termin"
                        />
                      </FormField>

                      <FormField label="Czy masz już stronę internetową?">
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-white hover:cursor-pointer">
                            <input
                              type="radio"
                              name="hasExistingSite"
                              checked={quoteForm.hasExistingSite === true}
                              onChange={() => setQuoteForm(prev => ({ ...prev, hasExistingSite: true }))}
                              className="focus:ring-white"
                            />
                            Tak
                          </label>
                          <label className="flex items-center gap-2 text-white hover:cursor-pointer">
                            <input
                              type="radio"
                              name="hasExistingSite"
                              checked={quoteForm.hasExistingSite === false}
                              onChange={() => setQuoteForm(prev => ({ ...prev, hasExistingSite: false, currentSiteUrl: '' }))}
                              className="focus:ring-white"
                            />
                            Nie
                          </label>
                        </div>
                      </FormField>
                    </div>

                    {/* Current Site URL if exists */}
                    {quoteForm.hasExistingSite && (
                      <FormField label="Adres obecnej strony" error={errors.currentSiteUrl}>
                        <input
                          type="url"
                          value={quoteForm.currentSiteUrl}
                          onChange={(e) => setQuoteForm(prev => ({ ...prev, currentSiteUrl: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="https://example.com"
                        />
                      </FormField>
                    )}

                    {/* Project Description */}
                    <FormField label="Opis projektu" required error={errors.description}>
                      <textarea
                        value={quoteForm.description}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors resize-none"
                        placeholder="Opisz swój projekt, cele, funkcjonalności, grupę docelową itp..."
                      />
                    </FormField>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#d4d4d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5" />
                            {(serviceParam || packageParam) ? 'Poproś o wycenę' : 'Wyślij zapytanie'}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-300 text-sm">
                        {(serviceParam || packageParam) 
                          ? '📋 Otrzymasz spersonalizowaną ofertę w ciągu 24 godzin z dokładną wyceną i harmonogramem'
                          : '📋 Otrzymasz szczegółową wycenę w ciągu 48 godzin wraz z harmonogramem prac'
                        }
                      </p>
                    </div>
                  </form>
                )}

                {/* Question Form */}
                {activeTab === 'question' && (
                  <form onSubmit={handleQuestionSubmit} className="space-y-6">
                    
                    {/* Basic Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Imię i nazwisko" required error={errors.name}>
                        <input
                          type="text"
                          value={questionForm.name}
                          onChange={(e) => setQuestionForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Jan Kowalski"
                        />
                      </FormField>

                      <FormField label="Email" required error={errors.email}>
                        <input
                          type="email"
                          value={questionForm.email}
                          onChange={(e) => setQuestionForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="jan@example.com"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Telefon" error={errors.phone}>
                        <input
                          type="tel"
                          value={questionForm.phone}
                          onChange={(e) => setQuestionForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="+48 123 456 789"
                        />
                      </FormField>

                      <FormField label="Firma/Organizacja" error={errors.company}>
                        <input
                          type="text"
                          value={questionForm.company}
                          onChange={(e) => setQuestionForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Nazwa firmy"
                        />
                      </FormField>
                    </div>

                    {/* Question Details */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-white" />
                        Szczegóły pytania
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField label="Temat pytania" required error={errors.subject}>
                          <input
                            type="text"
                            value={questionForm.subject}
                            onChange={(e) => setQuestionForm(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                            placeholder="np. Pytanie o hosting, Problem z formularzem, itp."
                          />
                        </FormField>

                        <FormField label="Priorytet" required error={errors.priority}>
                          <Select
                            value={questionForm.priority}
                            onChange={(value) => setQuestionForm(prev => ({ ...prev, priority: value as 'low' | 'medium' | 'high' }))}
                            options={[
                              { value: 'low', label: '🟢 Niski - odpowiedź w 48h' },
                              { value: 'medium', label: '🟡 Średni - odpowiedź w 24h' },
                              { value: 'high', label: '🔴 Wysoki - odpowiedź w 4h' }
                            ]}
                            placeholder="Wybierz priorytet"
                          />
                        </FormField>
                      </div>

                      <FormField label="Treść pytania" required error={errors.message}>
                        <textarea
                          value={questionForm.message}
                          onChange={(e) => setQuestionForm(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors resize-none"
                          placeholder="Opisz szczegółowo swoje pytanie, problem lub wątpliwość. Im więcej szczegółów podasz, tym lepiej będziemy mogli Ci pomóc..."
                        />
                      </FormField>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <h5 className="font-semibold text-blue-300 mb-2">💡 Wskazówki dla lepszej odpowiedzi:</h5>
                      <ul className="text-blue-300 text-sm space-y-1">
                        <li>• Opisz kontekst - o jaką stronę lub projekt chodzi</li>
                        <li>• Podaj konkretne przykłady lub zrzuty ekranu</li>
                        <li>• Wskaż jaki efekt chcesz osiągnąć</li>
                        <li>• Jeśli to błąd - opisz kroki do odtworzenia problemu</li>
                      </ul>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#d4d4d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-5 h-5" />
                            Wyślij pytanie
                          </>
                        )}
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                      <p className="text-orange-300 text-sm">
                        📧 Otrzymasz odpowiedź na podany adres email zgodnie z wybranym priorytetem
                      </p>
                    </div>
                  </form>
                )}

                {/* Project Form */}
                {activeTab === 'project' && (
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    
                    {/* Basic Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Imię i nazwisko" required error={errors.name}>
                        <input
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Jan Kowalski"
                        />
                      </FormField>

                      <FormField label="Email" required error={errors.email}>
                        <input
                          type="email"
                          value={projectForm.email}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="jan@example.com"
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Telefon" error={errors.phone}>
                        <input
                          type="tel"
                          value={projectForm.phone}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="+48 123 456 789"
                        />
                      </FormField>

                      <FormField label="Firma/Organizacja" error={errors.company}>
                        <input
                          type="text"
                          value={projectForm.company}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                          placeholder="Nazwa firmy"
                        />
                      </FormField>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-white" />
                        Szczegóły projektu
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField label="Typ projektu" required error={errors.projectType}>
                          <Select
                            value={projectForm.projectType}
                            onChange={(value) => setProjectForm(prev => ({ ...prev, projectType: value }))}
                            options={PROJECT_TYPES}
                            placeholder="Wybierz typ projektu"
                          />
                        </FormField>

                        <FormField label="Budżet" required error={errors.budget}>
                          <Select
                            value={projectForm.budget}
                            onChange={(value) => setProjectForm(prev => ({ ...prev, budget: value }))}
                            options={PROJECT_BUDGETS}
                            placeholder="Wybierz budżet"
                          />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField label="Termin realizacji" required error={errors.timeline}>
                          <Select
                            value={projectForm.timeline}
                            onChange={(value) => setProjectForm(prev => ({ ...prev, timeline: value }))}
                            options={TIMELINES}
                            placeholder="Wybierz termin"
                          />
                        </FormField>

                        <FormField label="Czy masz już stronę internetową?">
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-white hover:cursor-pointer">
                              <input
                                type="radio"
                                name="hasExistingSiteProject"
                                checked={projectForm.hasExistingSite === true}
                                onChange={() => setProjectForm(prev => ({ ...prev, hasExistingSite: true }))}
                                className="focus:ring-white"
                              />
                              Tak
                            </label>
                            <label className="flex items-center gap-2 text-white hover:cursor-pointer">
                              <input
                                type="radio"
                                name="hasExistingSiteProject"
                                checked={projectForm.hasExistingSite === false}
                                onChange={() => setProjectForm(prev => ({ ...prev, hasExistingSite: false, currentSiteUrl: '' }))}
                                className="focus:ring-white"
                              />
                              Nie
                            </label>
                          </div>
                        </FormField>
                      </div>

                      {/* Current Site URL if exists */}
                      {projectForm.hasExistingSite && (
                        <FormField label="Adres obecnej strony" error={errors.currentSiteUrl}>
                          <input
                            type="url"
                            value={projectForm.currentSiteUrl}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, currentSiteUrl: e.target.value }))}
                            className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
                            placeholder="https://example.com"
                          />
                        </FormField>
                      )}
                    </div>

                    {/* Project Requirements */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="font-semibold text-white mb-4">📋 Wymagania funkcjonalne</h4>
                      <p className="text-[#737373] text-sm mb-4">Wybierz funkcjonalności, które są potrzebne w Twoim projekcie:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {PROJECT_REQUIREMENTS.map((requirement, index) => (
                          <label key={index} className="flex items-start gap-3 text-white hover:cursor-pointer hover:bg-[#262626] p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={projectForm.requirements.includes(requirement)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProjectForm(prev => ({
                                    ...prev,
                                    requirements: [...prev.requirements, requirement]
                                  }));
                                } else {
                                  setProjectForm(prev => ({
                                    ...prev,
                                    requirements: prev.requirements.filter(req => req !== requirement)
                                  }));
                                }
                              }}
                              className="mt-0.5 rounded accent-blue-500"
                            />
                            <span className="text-sm">{requirement}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <FormField label="Opis projektu" required error={errors.description}>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={5}
                        className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors resize-none"
                        placeholder="Opisz szczegółowo swój projekt - cele biznesowe, grupę docelową, funkcjonalności, styl wizualny itp..."
                      />
                    </FormField>

                    {/* Inspirations */}
                    <FormField label="Inspiracje i referencje" error={errors.inspirations}>
                      <textarea
                        value={projectForm.inspirations}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, inspirations: e.target.value }))}
                        rows={3}
                        className="w-full bg-[#171717] border border-[#404040] rounded-xl px-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors resize-none"
                        placeholder="Podaj linki do stron, które Ci się podobają lub opisz styl wizualny jaki chcesz osiągnąć..."
                      />
                    </FormField>

                    {/* Project Summary */}
                    {(projectForm.projectType || projectForm.budget || projectForm.requirements.length > 0) && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h5 className="font-semibold text-white mb-3">📋 Podsumowanie projektu:</h5>
                        <div className="space-y-2 text-sm">
                          {projectForm.projectType && (
                            <div className="text-[#d4d4d4]">
                              <span className="text-white font-medium">Typ:</span> {projectForm.projectType}
                            </div>
                          )}
                          {projectForm.budget && (
                            <div className="text-[#d4d4d4]">
                              <span className="text-white font-medium">Budżet:</span> {projectForm.budget}
                            </div>
                          )}
                          {projectForm.timeline && (
                            <div className="text-[#d4d4d4]">
                              <span className="text-white font-medium">Termin:</span> {projectForm.timeline}
                            </div>
                          )}
                          {projectForm.requirements.length > 0 && (
                            <div className="text-[#d4d4d4]">
                              <span className="text-white font-medium">Wybrane funkcjonalności:</span> {projectForm.requirements.length} pozycji
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#d4d4d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-5 h-5" />
                            Wyślij projekt
                          </>
                        )}
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                      <p className="text-purple-300 text-sm">
                        🚀 Po wysłaniu formularza przygotujemy dla Ciebie szczegółową propozycję wraz z harmonogramem i wyceną w ciągu 72 godzin
                      </p>
                    </div>
                  </form>
                )}

                {/* Placeholder for remaining tabs - currently none */}
                {!['meeting', 'quote', 'question', 'project'].includes(activeTab) && (
                  <div className="text-center py-12">
                    <h4 className="text-xl font-bold text-white mb-4">Formularz w budowie</h4>
                    <p className="text-[#737373] mb-6">
                      Formularz dla zakładki: <span className="text-white font-semibold">{TAB_CONFIG[activeTab].title}</span>
                      <br />
                      {TAB_CONFIG[activeTab].description}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <a
                        href="mailto:kontakt@whiteslope.pl"
                        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#d4d4d4] transition-colors inline-flex items-center gap-2 hover:cursor-pointer"
                      >
                        <Mail className="w-5 h-5" />
                        Napisz email
                      </a>
                      <a
                        href="tel:+48662581368"
                        className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 hover:cursor-pointer"
                      >
                        <Phone className="w-5 h-5" />
                        Zadzwoń
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold mb-1">Sukces!</div>
              <div className="text-sm text-white/90">{successMessage}</div>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="ml-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// EKSPORT DOMYŚLNY Z SUSPENSE - TO JEST KLUCZOWA ZMIANA
export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Ładowanie formularza...</p>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}