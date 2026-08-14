'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

const USLUGI_MENU = [
  { name: 'Strony internetowe', href: '/pricing/website' },
  { name: 'Integracje AI', href: '/pricing/ai-integration/chatbot' },
  { name: 'Automatyzacje procesow', href: '/pricing/ai-integration/chatbot' },
  { name: 'Marketing', href: '/pricing/video-marketing' },
];

interface BreadcrumbDropdownProps {
  aktualnaEtykieta: string;
}

// Ten sam breadcrumb z dropdownem co na /pricing/website - skopiowany 1:1 pod wzgledem stylu.
export default function BreadcrumbDropdown({ aktualnaEtykieta }: BreadcrumbDropdownProps) {
  return (
    <div className="absolute top-24 left-0 w-full z-[20]">
      <div className="w-full max-w-[1640px] mx-auto px-6 md:px-12 flex justify-start">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#050505] rounded-lg text-[13px] md:text-sm font-medium text-white/90">
          <Link
            href="/"
            className="text-white/80 hover:text-white/90 transition-colors duration-300 cursor-pointer"
          >
            Whiteslope
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />

          <div className="relative group">
            <div className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors duration-300 cursor-default py-1">
              {aktualnaEtykieta}
              <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="absolute top-full left-0 mt-2 w-max min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#050505] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[70]">
              <ul className="flex flex-col py-1.5">
                {USLUGI_MENU.map((usluga) => (
                  <li key={usluga.name}>
                    <Link
                      href={usluga.href}
                      className="block px-5 py-2.5 text-[13px] text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {usluga.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
