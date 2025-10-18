'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Globe, Zap, TrendingUp, MessageCircle, Phone, DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

/**
 * Premium Glass Chatbot Component
 * Elegancki design dla klientów premium
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: 'Cześć! Jestem **WhiteSlope AI**!\n\nZapytaj mnie o nasze usługi:\n• Strony internetowe\n• Integracje AI (takie jak ja!)\n• Grafika i design\n• Modernizacja stron\n\nSam jestem dowodem na to, co możemy zrobić dla Twojej strony!',
      buttons: [
        {
          text: 'Zobacz cennik',
          href: '/pricing',
          variant: 'primary',
        },
        {
          text: 'Integracje AI',
          href: '/pricing/ai-integration',
          variant: 'secondary',
        },
        {
          text: 'Umów konsultację',
          href: '/contact?tab=meeting',
          variant: 'outline',
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL DO DOŁU
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: data.response,
          buttons: data.buttons || []
        }]);

        if (data.cached) {
          console.log('Response from cache');
        } else if (data.fallback) {
          console.log('Fallback response');
        } else if (data.apiUsed) {
          console.log('Gemini API response');
        }
        
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: data.response || 'Ups, coś poszło nie tak... Spróbuj ponownie!',
          buttons: data.buttons || [
            {
              text: 'Kontakt bezpośredni',
              href: '/contact?tab=meeting',
              variant: 'primary'
            }
          ]
        }]);
      }
      
    } catch (error) {
      console.error('Błąd chatbota:', error);
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: '**Nie mogę się połączyć z serwerem...**\n\nAle widzisz potencjał? Taki chatbot może działać na TWOJEJ stronie!\n\nSkontaktuj się z nami po więcej informacji!',
        buttons: [
          {
            text: 'Chcę taki chatbot!',
            href: '/contact?tab=quote&service=ai-integration',
            variant: 'primary'
          },
          {
            text: 'Kontakt',
            href: '/contact?tab=meeting',
            variant: 'secondary'
          }
        ]
      }]);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ==========================================
  // FLOATING BAR (zamknięty chatbot) - DÓŁ STRONY
  // ==========================================
  if (!isOpen) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative pointer-events-auto"
          aria-label="Otwórz AI asystenta WhiteSlope"
        >
          <div className="relative w-14 h-14 rounded-full backdrop-blur-xl bg-white/25 border border-white/20 shadow-2xl hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-110 flex items-center justify-center hover:cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="w-6 h-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
          </div>

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 backdrop-blur-xl bg-black/80 border border-white/20 text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl">
            Zapytaj AI o nasze usługi
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </button>
      </div>
    );
  }

  // ==========================================
  // CHAT WINDOW (otwarty chatbot)
  // ==========================================
  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Chat window - szeroki jak Claude */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-24 pointer-events-none">
        <div className="w-[768px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-10rem)] backdrop-blur-2xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
          
          {/* HEADER */}
          <div className="relative bg-white/5 border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base tracking-tight">WhiteSlope AI</h3>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                    Twój ekspert digital
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white hover:bg-white/10 rounded-2xl p-2 transition-all duration-200 group"
                aria-label="Zamknij chat"
              >
                <X className="hover:cursor-pointer w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* MESSAGES CONTAINER + szary scrollbar */}
          <style dangerouslySetInnerHTML={{__html: `
            .chat-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .chat-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 10px;
            }
            .chat-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
            .chat-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.4);
            }
          `}} />
          <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05)'
          }}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`} 
                style={{animationDelay: `${i * 50}ms`}}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl whitespace-pre-line break-words shadow-lg transition-all duration-200 ${
                  msg.role === 'user' 
                    ? 'backdrop-blur-xl bg-white/20 border border-white/30 text-white font-medium rounded-br-md' 
                    : 'backdrop-blur-xl bg-white/5 border border-white/10 text-white rounded-bl-md hover:bg-white/10'
                }`}>
                  
                  {/* Bot message header */}
                  {msg.role === 'bot' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                      <div className="w-6 h-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-white/50 font-medium tracking-wide">WhiteSlope AI</span>
                    </div>
                  )}
                  
                  {/* Message content */}
                  <div className="text-white/90">
                    <ReactMarkdown
                      components={{
                        strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                        em: ({node, ...props}) => <em className="italic" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                        li: ({node, ...props}) => <li className="ml-2" {...props} />,
                        a: ({node, ...props}) => (
                          <a 
                            className="underline hover:text-white transition-colors" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            {...props} 
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Dynamic buttons */}
                  {msg.role === 'bot' && msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                      {msg.buttons.map((button, btnIndex) => (
                        <a
                          key={btnIndex}
                          href={button.href}
                          className={`
                            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95
                            ${button.variant === 'primary' 
                              ? 'backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30' 
                              : button.variant === 'secondary'
                              ? 'backdrop-blur-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
                              : 'border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                            }
                          `}
                          target="_self"
                          rel="noopener"
                        >
                          {button.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-md shadow-lg">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <div className="w-6 h-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-white/50 font-medium">WhiteSlope AI pisze...</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <p className="text-white/30 text-xs mt-2">Analizuję...</p>
                </div>
              </div>
            )}
            
            {/* AUTO SCROLL TARGET */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-4 backdrop-blur-xl bg-white/5 border-t border-white/10">
            
            {/* Input field + send button */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Zapytaj o nasze usługi..."
                  className="w-full p-3 pr-14 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 text-sm"
                  disabled={loading}
                  maxLength={500}
                />
                {input.length > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 text-xs">
                    {input.length}/500
                  </div>
                )}
              </div>
              <button 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`p-3 rounded-full transition-all duration-200 ${
                  loading || !input.trim()
                    ? 'backdrop-blur-xl bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    : 'backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:scale-105 active:scale-95'
                }`}
                aria-label="Wyślij wiadomość"
              >
                {loading ? (
                  <div className="hover:cursor-pointer animate-spin w-5 h-5 border-2 border-white/30 border-t-white/60 rounded-full"></div>
                ) : (
                  <Send className="hover:cursor-pointer w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex gap-2 mb-3 flex-wrap ">
              <button 
                onClick={() => setInput("Jakie usługi oferujecie?")}
                className="hover:cursor-pointer text-xs px-3 py-1.5 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <Globe className="w-3 h-3" />
                Usługi
              </button>
              <button 
                onClick={() => setInput("Ile kosztuje strona internetowa?")}
                className="hover:cursor-pointer text-xs px-3 py-1.5 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <DollarSign className="w-3 h-3" />
                Cennik
              </button>
              <button 
                onClick={() => setInput("Jak wygląda proces współpracy?")}
                className="hover:cursor-pointer text-xs px-3 py-1.5 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <TrendingUp className="w-3 h-3" />
                Proces
              </button>
            </div>
            
            {/* WhiteSlope branding footer - BARDZIEJ BIAŁY */}
            <div className="pt-2 border-t border-white/20">
              <div className="text-xs text-white/90 text-center space-y-1 font-medium">
                <p className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  Powered by <span className="text-white font-bold">WhiteSlope</span> AI
                </p>
                <p className="flex items-center justify-center gap-2">
                  <a href="/pricing/ai-integration" className="text-white/80 hover:text-white underline transition-colors duration-200 flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    Chcesz taki chatbot?
                  </a>
                  <span className="text-white/40">•</span>
                  <a href="/contact?tab=meeting" className="text-white/80 hover:text-white underline transition-colors duration-200 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Konsultacja
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kółeczko na dole */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
        <button 
          onClick={() => setIsOpen(false)}
          className="relative pointer-events-auto group"
          aria-label="Zamknij chat"
        >
          <div className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-110 flex items-center justify-center">
            <X className="hover:cursor-pointer w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </>
  );
}