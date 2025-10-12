'use client';
import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '👋 Cześć! Jestem AI chatbotem. Zapytaj mnie o cokolwiek!\n\n💡 Sam jestem dowodem na to, co możemy zrobić dla Twojej strony!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: '😴 Ups, coś poszło nie tak...' 
      }]);
    }
    
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110"
      >
        <span className="text-2xl">💬</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">🤖 AI Asystent</h3>
          <p className="text-xs opacity-90">Zobacz jak AI może pomóc Twojej firmie!</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t rounded-b-2xl">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Napisz wiadomość..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-all"
          >
            📤
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          💡 Chcesz taki chatbot? <a href="/pricing" className="text-blue-600 underline font-semibold">Zobacz ofertę</a>
        </p>
      </div>
    </div>
  );
}