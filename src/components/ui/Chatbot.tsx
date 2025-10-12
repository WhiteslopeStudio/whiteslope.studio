'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface ChatButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
  buttons?: ChatButton[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: '👋 Cześć! Jestem AI chatbotem WhiteSlope!\n\n💡 Zapytaj mnie o nasze usługi tworzenia stron internetowych i integracji AI!\n\nSam jestem dowodem na to, co możemy zrobić dla Twojej strony! 🚀',
      buttons: [
        {
          text: '💰 Zobacz cennik',
          href: '/pricing',
          variant: 'primary',
          icon: '💰'
        },
        {
          text: '🤖 Integracje AI',
          href: '/pricing/ai-integration',
          variant: 'secondary',
          icon: '🤖'
        },
        {
          text: '📞 Umów konsultację',
          href: '/contact?tab=meeting',
          variant: 'outline',
          icon: '📞'
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Use buttons from API if available, otherwise generate locally
        const buttons = data.buttons || generateContextButtons(currentInput, data.response);
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: data.response,
          buttons: buttons
        }]);
      } else {
        const buttons = data.buttons || generateContextButtons(currentInput, data.response || '');
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: data.response || '😴 Ups, coś poszło nie tak... Spróbuj ponownie!',
          buttons: buttons
        }]);
      }
      
    } catch (error) {
      console.error('Błąd chatbota:', error);
      const fallbackButtons = generateContextButtons(currentInput, '');
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: '😴 Nie mogę się połączyć z serwerem...\n\n💡 Ale widzisz potencjał? Taki chatbot może działać na TWOJEJ stronie!\n\n📞 Skontaktuj się z nami po więcej informacji!',
        buttons: fallbackButtons
      }]);
    }
    
    setLoading(false);
  };

  // Funkcja analizująca kontekst i generująca przyciski
  const generateContextButtons = (userMessage: string, botResponse: string): ChatButton[] => {
    const message = (userMessage + ' ' + botResponse).toLowerCase();
    const buttons: ChatButton[] = [];

    // AI/Chatbot related
    if (message.includes('ai') || message.includes('chatbot') || message.includes('sztuczn') || message.includes('inteligenc') || message.includes('automatyz')) {
      buttons.push({
        text: '🤖 Integracje AI',
        href: '/pricing/ai-integration',
        variant: 'primary',
        icon: '🤖'
      });
    }

    // Pricing/Cost related
    if (message.includes('cen') || message.includes('koszt') || message.includes('ile') || message.includes('budżet') || message.includes('prici')) {
      buttons.push({
        text: '💰 Zobacz cennik',
        href: '/pricing',
        variant: 'secondary',
        icon: '💰'
      });
    }

    // Website/Development related
    if (message.includes('stron') || message.includes('website') || message.includes('witryn') || message.includes('rozwój') || message.includes('tworzenie')) {
      buttons.push({
        text: '🌐 Strony internetowe',
        href: '/pricing/website',
        variant: 'secondary',
        icon: '🌐'
      });
    }

    // Ecommerce/Shop related
    if (message.includes('sklep') || message.includes('ecommerce') || message.includes('sprzedaż') || message.includes('produkty')) {
      buttons.push({
        text: '🛒 Sklepy online',
        href: '/pricing/ecommerce',
        variant: 'secondary',
        icon: '🛒'
      });
    }

    // Contact/Meeting related
    if (message.includes('kontakt') || message.includes('spotkanie') || message.includes('rozmow') || message.includes('konsultacj') || message.includes('umówi')) {
      buttons.push({
        text: '📞 Umów konsultację',
        href: '/contact?tab=meeting',
        variant: 'primary',
        icon: '📞'
      });
    }

    // General services
    if (message.includes('usług') || message.includes('offer') || message.includes('co robi') || message.includes('specjalizuj')) {
      buttons.push({
        text: '💼 Nasze usługi',
        href: '/pricing',
        variant: 'outline',
        icon: '💼'
      });
    }

    // Always add contact if no other buttons or if asking about chatbot specifically
    if (buttons.length === 0 || message.includes('taki chatbot') || message.includes('chcesz chatbot')) {
      buttons.push({
        text: '💬 Chcę taki chatbot!',
        href: '/contact?tab=quote&service=ai-integration',
        variant: 'primary',
        icon: '💬'
      });
    }

    // Limit to max 3 buttons to avoid clutter
    return buttons.slice(0, 3);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Floating button when closed - WhiteSlope branding
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-black/90 backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          aria-label="Otwórz AI asystenta WhiteSlope"
        >
          {/* Gradient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-pink-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          <MessageSquare className="w-6 h-6 relative z-10" />
          
          {/* Pulse animation z WhiteSlope kolorami */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300/30 to-pink-400/30 rounded-2xl animate-ping opacity-20"></div>
          
          {/* AI badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold text-black animate-bounce">
            AI
          </div>
          
          {/* Tooltip z WhiteSlope styling */}
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-black/95 backdrop-blur-xl border border-white/20 text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 group-hover:translate-y-0">
            💬 Zapytaj AI o nasze usługi!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
          </div>
        </button>
      </div>
    );
  }

  // Chat window when open - WhiteSlope design
  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header z WhiteSlope branding */}
      <div className="relative bg-gradient-to-r from-orange-300/10 to-pink-400/10 border-b border-white/10 p-4">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-300/5 to-pink-400/5 blur-xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-300 to-pink-400 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-black font-bold" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">SLOPUŚ AI</h3>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Twój ekspert digital marketingu
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-2xl p-2 transition-all duration-200 group"
            aria-label="Zamknij chat"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Messages container z WhiteSlope styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30 backdrop-blur-sm custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{animationDelay: `${i * 50}ms`}}>
            <div className={`max-w-[85%] p-4 rounded-2xl whitespace-pre-line break-words shadow-lg transition-all duration-200 hover:shadow-xl ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-orange-300 to-pink-400 text-black font-medium rounded-br-md border-l-4 border-orange-200' 
                : 'bg-white/10 backdrop-blur-sm text-white rounded-bl-md border border-white/20 hover:bg-white/15'
            }`}>
              {msg.role === 'bot' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-xs text-white/60 font-medium">SLOPUŚ</span>
                </div>
              )}
              <div className={msg.role === 'user' ? 'text-black' : 'text-white'}>
                {msg.content}
              </div>
              
              {/* Dynamic buttons for bot messages */}
              {msg.role === 'bot' && msg.buttons && msg.buttons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                  {msg.buttons.map((button, btnIndex) => (
                    <a
                      key={btnIndex}
                      href={button.href}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95
                        ${button.variant === 'primary' 
                          ? 'bg-gradient-to-r from-orange-300 to-pink-400 text-black hover:shadow-lg' 
                          : button.variant === 'secondary'
                          ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                          : 'border border-white/30 text-white/80 hover:text-white hover:border-white/50'
                        }
                      `}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{button.icon}</span>
                      {button.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl rounded-bl-md shadow-lg">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                  <MessageSquare className="w-3 h-3 text-black" />
                </div>
                <span className="text-xs text-white/60 font-medium">SLOPUŚ pisze...</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
              <p className="text-white/40 text-xs mt-2">Analizuję Twoją wiadomość...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input area z WhiteSlope styling */}
      <div className="p-4 bg-black/50 backdrop-blur-sm border-t border-white/10 rounded-b-2xl">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Zapytaj o nasze usługi, cennik, proces..."
              className="w-full p-4 pr-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-orange-300 focus:bg-white/15 transition-all duration-200"
              disabled={loading}
              maxLength={500}
            />
            {input.length > 0 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 text-xs">
                {input.length}/500
              </div>
            )}
          </div>
          <button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`group p-4 rounded-2xl transition-all duration-200 ${
              loading || !input.trim()
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-300 to-pink-400 text-black hover:shadow-lg hover:scale-105 active:scale-95'
            }`}
            aria-label="Wyślij wiadomość"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white/60 rounded-full"></div>
            ) : (
              <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button 
            onClick={() => setInput("Jakie usługi oferujecie?")}
            className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-2xl transition-all duration-200"
            disabled={loading}
          >
            💼 Usługi
          </button>
          <button 
            onClick={() => setInput("Ile kosztuje strona internetowa?")}
            className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-2xl transition-all duration-200"
            disabled={loading}
          >
            💰 Cennik
          </button>
          <button 
            onClick={() => setInput("Jak wygląda proces współpracy?")}
            className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-2xl transition-all duration-200"
            disabled={loading}
          >
            🔄 Proces
          </button>
        </div>
        
        {/* WhiteSlope branding */}
        <div className="pt-3 border-t border-white/10">
          <div className="text-xs text-white/40 text-center space-y-1">
            <p>⚡ Powered by <span className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent font-bold">WhiteSlope</span> AI</p>
            <p>
              <a href="/pricing/ai-integration" className="text-orange-300 hover:text-pink-400 underline font-medium transition-colors duration-200">
                Chcesz taki chatbot?
              </a> • {' '}
              <a href="/contact?tab=meeting" className="text-orange-300 hover:text-pink-400 underline font-medium transition-colors duration-200">
                Umów konsultację
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}