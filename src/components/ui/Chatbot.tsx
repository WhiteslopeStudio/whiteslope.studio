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
          href: '/pricing/ai-integration/chatbot',
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
      <div className="fixed bottom-3 right-3 md:bottom-8 md:right-8 z-50 pointer-events-none">
        <button 
          onClick={handleOpenChat}
          className="cursor-pointer pointer-events-auto flex items-center justify-center w-[48px] h-[48px] md:w-[52px] md:h-[52px] bg-[#161616] hover:bg-black border border-zinc-800 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-200 hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)] hover:scale-105"
          aria-label="Otwórz AI asystenta WhiteSlope"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300">
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
          </svg>
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
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Chat window - PRAWY DOLNY RÓG */}
      <div className="fixed top-0 right-0 bottom-0 z-50 pointer-events-none">
        <div className="w-[min(94vw,560px)] h-full max-w-[calc(100vw-1rem)] md:max-w-[560px] backdrop-blur-xl bg-white border-l border-zinc-200 shadow-[0_30px_90px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-right-10 fade-in duration-300">
          
          {/* HEADER */}
          <div className="relative bg-white border-b border-zinc-200 p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #1a75ff 0%, #0057ff 60%, #004ae6 100%)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg>
                </div>
                <div>
                  <h2 className="text-zinc-950 font-semibold text-base md:text-lg">Asystent Whiteslope</h2>
                  <p className="text-zinc-500 text-xs md:text-sm">Jestem tutaj, aby pomóc!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:cursor-pointer p-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-500 hover:text-zinc-900 transition-all duration-200 hover:scale-105"
                aria-label="Zamknij chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-white scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent hover:scrollbar-thumb-zinc-400">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* USER MESSAGE */}
                  {msg.role === 'user' && (
                    <div 
                      className="px-4 py-3 rounded-2xl rounded-tr-md shadow-sm border"
                      style={{
                        background: 'linear-gradient(135deg, #1a75ff 0%, #0057ff 100%)',
                        borderColor: 'rgba(0, 87, 255, 0.18)',
                      }}
                    >
                      <p className="text-white text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  )}

                  {/* BOT MESSAGE */}
                  {msg.role === 'bot' && (
                    <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl rounded-tl-md shadow-sm">
                      {/* Bot avatar + name */}
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-200">
                        <div 
                          className="w-6 h-6 rounded-xl flex items-center justify-center shadow-sm"
                          style={{
                            background: 'linear-gradient(135deg, #1a75ff 0%, #0057ff 100%)',
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg>
                        </div>
                        <span className="text-xs text-zinc-500 font-medium">Asystent Whiteslope</span>
                      </div>
                      
                      {/* Message content with markdown */}
                      <div className="text-zinc-800 text-sm leading-relaxed prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            strong: ({node, ...props}) => <strong className="text-zinc-950 font-semibold" {...props} />,
                            em: ({node, ...props}) => <em className="text-zinc-700 italic" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                            li: ({node, ...props}) => <li className="ml-2" {...props} />,
                            a: ({node, ...props}) => (
                              <a 
                                className="underline text-blue-700 hover:text-zinc-950 transition-colors" 
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
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-zinc-200">
                          {msg.buttons.map((button, btnIndex) => (
                            <a
                              key={btnIndex}
                              href={button.href}
                              className={`
                                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95
                                ${button.variant === 'primary' 
                                  ? 'bg-blue-600 border border-blue-600 text-white hover:bg-blue-500' 
                                  : button.variant === 'secondary'
                                  ? 'bg-zinc-100 border border-zinc-200 text-zinc-800 hover:bg-zinc-200'
                                  : 'border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-zinc-300'
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
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-200">
                    <div 
                      className="w-6 h-6 rounded-xl flex items-center justify-center animate-pulse"
                      style={{
                        background: 'linear-gradient(135deg, #1a75ff 0%, #0057ff 100%)',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Asystent Whiteslope pisze...</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <p className="text-zinc-400 text-xs mt-2">Analizuję...</p>
                </div>
              </div>
            )}
            
            {/* AUTO SCROLL TARGET */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-4 md:p-5 bg-white border-t border-zinc-200">
            
            {/* Input field + send button */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Zapytaj o nasze usługi..."
                  className="w-full p-3 pr-14 bg-white border border-zinc-200 rounded-full text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm shadow-sm"
                  disabled={loading}
                  maxLength={500}
                />
                {input.length > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 text-xs">
                    {input.length}/500
                  </div>
                )}
              </div>
              <button 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`p-3 rounded-full transition-all duration-200 ${
                  loading || !input.trim()
                    ? 'bg-zinc-100 border border-zinc-200 text-zinc-300 cursor-not-allowed'
                    : 'border hover:scale-105 active:scale-95'
                }`}
                style={
                  loading || !input.trim() 
                    ? {} 
                    : {
                        backgroundColor: '#0057ff',
                        borderColor: 'rgba(0, 87, 255, 0.18)',
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
                className="hover:cursor-pointer text-xs px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <Globe className="w-3 h-3" />
                Usługi
              </button>
              <button 
                onClick={() => setInput("Ile kosztuje strona internetowa?")}
                className="hover:cursor-pointer text-xs px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <DollarSign className="w-3 h-3" />
                Cennik
              </button>
              <button 
                onClick={() => setInput("Jak wygląda proces współpracy?")}
                className="hover:cursor-pointer text-xs px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-full transition-all duration-200 flex items-center gap-1"
                disabled={loading}
              >
                <TrendingUp className="w-3 h-3" />
                Proces
              </button>
            </div>
            
            {/* WhiteSlope branding footer */}
            <div className="pt-2 border-t border-zinc-200">
              <div className="text-xs text-zinc-700 text-center space-y-1 font-medium">
                <p className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  Powered by <span className="text-zinc-950 font-bold">WhiteSlope</span> AI
                </p>
                <p className="flex items-center justify-center gap-2">
                  <a href="/pricing/ai-integration/chatbot" className="text-zinc-600 hover:text-zinc-950 underline transition-colors duration-200 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg>
                    Chcesz taki chatbot?
                  </a>
                  <span className="text-zinc-400">•</span>
                  <a href="/contact?tab=meeting" className="text-zinc-600 hover:text-zinc-950 underline transition-colors duration-200 flex items-center gap-1">
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