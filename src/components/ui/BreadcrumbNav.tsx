'use client';

import Link from 'next/link';

interface BreadcrumbNavProps {
  serviceName: string;
  serviceId: string;
}

// Styl skopiowany z /pricing/[service] - minimalny, uppercase, szeroki tracking, bez ramek/tła
export default function BreadcrumbNav({ serviceName, serviceId }: BreadcrumbNavProps) {
  return (
    <div className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-extralight">
      <Link href="/pricing" className="text-gray-500 hover:text-white transition-colors duration-300">
        Cennik
      </Link>
      <span className="text-gray-800 select-none">/</span>
      <span className="text-gray-300 select-none">{serviceName}</span>
    </div>
  );
}
