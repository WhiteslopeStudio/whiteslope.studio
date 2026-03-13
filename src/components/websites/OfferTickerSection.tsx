'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const OFFER_ITEMS = [
  { label: 'WEB DEVELOPMENT', href: '/pricing/website' },
  { label: 'VIDEO MARKETING', href: '/pricing/video-marketing' },
  { label: 'CHATBOTY AI', href: '/pricing/ai-integration' },
  { label: 'GRAFIKA', href: '/pricing/graphics' },
  { label: 'OPTYMALIZACJA', href: '/pricing/optimization' },
  { label: 'PROJEKTY INDYWIDUALNE', href: '/pricing/individual' },
];

const GROUP_COPIES = 6;
const SHIFT_PERCENT = -(100 / GROUP_COPIES);

function OfferGroup({ groupId, isPrimary = false }: { groupId: string; isPrimary?: boolean }) {
  return (
    <div className="flex items-center gap-6 md:gap-8 flex-nowrap" aria-hidden={!isPrimary}>
      {OFFER_ITEMS.map((item) => (
        <div key={`${groupId}-${item.label}`} className="inline-flex items-center gap-6 md:gap-8 shrink-0">
          <Link
            href={item.href}
            className="inline-block text-sm md:text-base tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors whitespace-nowrap font-medium"
          >
            {item.label}
          </Link>
          <img
            src="/_resources/whiteslope studio literka sygnet2.png"
            alt="WhiteSlope sygnet"
            width={32}
            height={32}
            className="w-8 h-8 object-contain opacity-95 shrink-0"
          />
        </div>
      ))}
    </div>
  );
}

export default function OfferTickerSection() {
  return (
    <section className="bg-blue-600 py-5 md:py-6 overflow-hidden">
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex items-center w-max gap-6 md:gap-8 whitespace-nowrap"
          animate={{ x: ['0%', `${SHIFT_PERCENT}%`] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {Array.from({ length: GROUP_COPIES }).map((_, index) => (
            <OfferGroup key={`offer-group-${index}`} groupId={`g-${index}`} isPrimary={index === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
