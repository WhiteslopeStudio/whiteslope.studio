'use client';

import { ShieldCheck, Sparkle } from 'lucide-react';

export default function SafeAiMobile() {
  return (
    <section className="relative w-full bg-white py-[60px] overflow-hidden flex flex-col">
      
      {/* --- TŁO: Limonkowe Paski Gradientowe --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.6]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[30%] right-[-20%] w-[70%] h-[40%] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col">
        
        {/* --- DEKORACYJNE PARTICLES (Plusiki i Iskierki) --- */}
        <div className="relative w-full h-[40px] mb-2">
          <Sparkle className="absolute left-2 top-2 text-[#D4FF00] w-6 h-6 fill-[#D4FF00]" />
          <Sparkle className="absolute left-12 top-6 text-violet-400 w-4 h-4 fill-violet-400 opacity-70" />
          
          {/* Custom SVG Plus */}
          <svg className="absolute right-8 top-0 text-violet-500 opacity-80" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <svg className="absolute right-2 top-8 text-[#D4FF00] opacity-90" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        {/* --- NAGŁÓWEK --- */}
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-8">
          Chatbot AI <span className="font-[900] text-violet-500">nie psuje</span> wizerunku marki,<br />
          pod warunkiem że jest <span className="font-[900]">dobrze wykonany</span>.
        </h2>

        {/* --- KARTA Z TEKSTEM --- */}
        <div className="w-full bg-zinc-50 rounded-[32px] p-6 flex flex-col relative shadow-sm">
          
          {/* Ikona tarczy */}
          {/* <div className="w-[40px] h-[40px] rounded-full bg-purple-100 border border-purple-100 flex items-center justify-center text-violet-600 shadow-sm mb-5">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div> */}

          <p className="text-[15px] font-medium text-zinc-700 leading-relaxed mb-5">
            <span className="font-[900] text-zinc-950">Nasz zespół czuwa</span> nad całym procesem. Konfigurujemy <span className="font-[900] text-zinc-950">ścisłe bariery</span> dla bota, aby nie było szans, że odpowie coś <u className="decoration-2 underline-offset-2 decoration-purple-400/60 font-[900] text-zinc-950">niezgodnego z prawdą</u> na temat Twojej firmy.
          </p>

          <div className="h-[1px] w-full bg-zinc-200 mb-5" />

          <p className="text-[15px] font-medium text-zinc-700 leading-relaxed">
            W razie <span className="font-[900] text-zinc-950">skomplikowanych pytań</span> rozmowa przekierowywana jest do obsługi klienta, aby człowiek mógł zająć się tematem i natychmiast przychodzi <span className="font-[900] text-zinc-950">powiadomienie na e-mail</span>.
          </p>

        </div>

      </div>
    </section>
  );
}