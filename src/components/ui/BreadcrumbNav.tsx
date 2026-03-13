'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BreadcrumbNavProps {
  serviceName: string;
  serviceId: string;
}

export default function BreadcrumbNav({ serviceName, serviceId }: BreadcrumbNavProps) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 group text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Cennik</span>
      </Link>

      <ChevronRight className="w-4 h-4 text-white/40" />

      <span className="text-white/70 text-sm font-medium">{serviceName}</span>
    </div>
  );
}
