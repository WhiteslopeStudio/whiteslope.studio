'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, Globe, Zap, TrendingUp, DollarSign, Phone } from 'lucide-react';
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
 * Elegancki design dla klientów premium - PRAWY DOLNY RÓG
 * Z CZERWONYM BADGE POWIADOMIENIA!
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: 'Cześć! Jestem **Asystent Whiteslope**!\n\nZapytaj mnie o nasze usługi:\n• Strony internetowe\n• Integracje AI (takie jak ja!)\n• Grafika i design\n• Modernizacja stron\n\nSam jestem dowodem na to, co możemy zrobić dla Twojej strony!',
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

  // OBSŁUGA OTWARCIA CHATBOTA
  const handleOpenChat = () => {
    setIsOpen(true);

    localStorage.setItem('whiteslope_chatbot_clicked', 'true');
  };

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
  // FLOATING BUTTON (zamknięty chatbot) - PRAWY DOLNY RÓG
  // ==========================================
  if (!isOpen) {
    return (
      <div className="fixed bottom-3 right-1 md:bottom-6 md:right-6 z-50 pointer-events-none">
        <button 
          onClick={handleOpenChat}
          className="group relative pointer-events-auto"
          aria-label="Otwórz AI asystenta WhiteSlope"
        >
          

          {/* GŁÓWNY PRZYCISK Z KOLOREM #8265db */}
          <div 
            className="relative px-5 py-3 rounded-full backdrop-blur-xl shadow-2xl hover:shadow-[0_8px_32px_rgba(130,101,219,0.4)] transition-all duration-300 hover:scale-105 flex items-center gap-3 hover:cursor-pointer border border-[#8265db]/30 scale-[0.80] md:scale-100"
            style={{
              backgroundColor: '#8265db',
            }}
          >
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundColor: 'rgba(130, 101, 219, 0.2)',
              }}
            ></div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg>

            
            <span className="text-sm font-medium text-white relative z-10">Zapytaj Asystenta</span>
          </div>
        </button>
      </div>
    );
  }

  // ==========================================
  // CHAT WINDOW (otwarty chatbot) - PRAWY DOLNY RÓG
  // ==========================================
  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Chat window - PRAWY DOLNY RÓG */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <div className="w-[420px] sm:w-[460px] md:w-[500px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] backdrop-blur-3xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-8 fade-in duration-300">
          
          {/* HEADER */}
          <div className="relative bg-white/5 border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* AVATAR BOX z nowym kolorem */}
                <div 
                  className="w-10 h-10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: '#8265db',
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-white"
                  >
                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-base">Asystent Whiteslope</h2>
                  <p className="text-white/50 text-xs">Jestem tutaj, aby pomóc!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all duration-200 hover:scale-105"
                aria-label="Zamknij chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* USER MESSAGE */}
                  {msg.role === 'user' && (
                    <div 
                      className="px-4 py-3 rounded-2xl rounded-tr-md shadow-lg border"
                      style={{
                        backgroundColor: '#8265db',
                        borderColor: 'rgba(130, 101, 219, 0.3)',
                      }}
                    >
                      <p className="text-white text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  )}

                  {/* BOT MESSAGE */}
                  {msg.role === 'bot' && (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-md shadow-lg">
                      {/* Bot avatar + name */}
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                        <div 
                          className="w-6 h-6 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: '#8265db',
                          }}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-3 h-3 text-white"
                          >
                            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-white/50 font-medium">Asystent Whiteslope</span>
                      </div>
                      
                      {/* Message content with markdown */}
                      <div className="text-white/90 text-sm leading-relaxed prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                            em: ({node, ...props}) => <em className="text-white/80 italic" {...props} />,
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
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-md shadow-lg">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <div 
                      className="w-6 h-6 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center animate-pulse"
                      style={{
                        backgroundColor: '#8265db',
                      }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-3 h-3 text-white"
                      >
                        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-white/50 font-medium">Asystent Whiteslope pisze...</span>
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
                    : 'backdrop-blur-xl border hover:scale-105 active:scale-95'
                }`}
                style={
                  loading || !input.trim() 
                    ? {} 
                    : {
                        backgroundColor: '#8265db',
                        borderColor: 'rgba(130, 101, 219, 0.3)',
                        color: 'white'
                      }
                }
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
            <div className="flex gap-2 mb-3 flex-wrap">
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
            
            {/* WhiteSlope branding footer */}
            <div className="pt-2 border-t border-white/20">
              <div className="text-xs text-white/90 text-center space-y-1 font-medium">
                <p className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  Powered by <span className="text-white font-bold">WhiteSlope</span> AI
                </p>
                <p className="flex items-center justify-center gap-2">
                  <a href="/pricing/ai-integration" className="text-white/80 hover:text-white underline transition-colors duration-200 flex items-center gap-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-3 h-3"
                    >
                      <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                    </svg>
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
    </>
  );
}