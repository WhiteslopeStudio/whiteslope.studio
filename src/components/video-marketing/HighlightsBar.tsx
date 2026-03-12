'use client';

import { colors } from './theme';

const highlights = [
  {
    id: '01',
    text: 'Filmy promocyjne na stronę internetową',
  },
  {
    id: '02',
    text: 'Content UGC Beauty itp.',
  },
  {
    id: '03',
    text: 'Montaż filmów i rolek w motion graphics',
  },
  {
    id: '04',
    text: 'Menadżer dedykowany do zarządzania twórcami',
  },
];

export default function HighlightsBar() {
  return (
    <div className="relative my-3  py-4 overflow-x-clip">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40rem] h-[10rem] rounded-full blur-[130px] pointer-events-none"
        style={{ backgroundColor: `${colors.neonPink}22` }}
      />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
        {highlights.map((item) => (
          <div key={item.id} className="min-h-[56px]">
            <p className="text-sm font-semibold tracking-[0.18em]">
              <span style={{ color: colors.neonPink }}>#</span>
              <span className="text-white">{item.id}</span>
            </p>
            <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
