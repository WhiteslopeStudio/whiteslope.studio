'use client';

import React from 'react';

export default function ServicesIntro() {
  return (
    <section id="services" className="w-full bg-white pt-[90px] pb-0 px-[24px]">
      <div className="w-full max-w-[1580px] mx-auto flex flex-col">
        
        <h2 className="text-[28px] md:text-[32px] font-[400] text-zinc-950 leading-[1.05] tracking-tight m-0 p-0 ml-[52px]">
        W czym możemy Ci pomóc? 
  
  
  {/* Ikona z relative -top-1 dla lekkiego podniesienia */}
  <span className="ml-4 inline-block relative top-2">
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563eb" strokeWidth="2"></path>
      <path d="M12 3.05554C14.455 5.25282 16 8.44597 16 12C16 15.554 14.455 18.7471 12 20.9444" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"></path>
      <path d="M12.0625 21C9.57126 18.8012 8 15.5841 8 12C8 8.41592 9.57126 5.19883 12.0625 3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"></path>
      <path d="M3 12H21" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  </span>
</h2>

      </div>
    </section>
  );
}